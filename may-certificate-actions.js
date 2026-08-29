(function () {
    'use strict';

    if (window.MayCertificateActions && window.MayCertificateActions.version) return;

    const VERSION = '1.1.0';
    const PROTOCOL_VERSION = 1;
    const PNG_MIME_TYPE = 'image/png';
    const MAX_CERTIFICATE_BYTES = 12 * 1024 * 1024;
    const MODERN_REPLY_TIMEOUT_MS = 10000;
    const CERTIFICATE_DOWNLOAD_CACHE = 'may-learning-certificate-downloads';
    const SERVICE_WORKER_VERSION = '40-historyquest-grand-total';
    const pendingRequests = new Map();
    const actionsScriptSource = document.currentScript && document.currentScript.src ? document.currentScript.src : '';
    const actionsSiteRoot = actionsScriptSource ? new URL('.', actionsScriptSource) : null;
    let installedModernBridge = null;
    let previewLoaderPromise = null;

    function isLocalPreviewEnvironment() {
        const host = String(window.location.hostname || '').toLowerCase();
        return window.location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
    }

    function activateLoadedPreview(action) {
        if (!window.MayCertificatePreview) return;
        if (action === 'toggle') window.MayCertificatePreview.toggle();
        else window.MayCertificatePreview.open();
    }

    function loadCertificatePreview(action) {
        if (!isLocalPreviewEnvironment()) return Promise.resolve(false);
        if (window.MayCertificatePreview) {
            activateLoadedPreview(action);
            return Promise.resolve(true);
        }
        if (!actionsSiteRoot || !document.head || typeof document.createElement !== 'function') return Promise.resolve(false);
        if (!previewLoaderPromise) {
            previewLoaderPromise = new Promise((resolve, reject) => {
                const existing = document.getElementById?.('mayhubCertificatePreviewScript');
                if (existing) {
                    existing.addEventListener('load', () => resolve(Boolean(window.MayCertificatePreview)), { once: true });
                    existing.addEventListener('error', () => reject(new Error('Certificate preview could not be loaded.')), { once: true });
                    return;
                }
                const script = document.createElement('script');
                script.id = 'mayhubCertificatePreviewScript';
                script.src = new URL('certificate-preview.js', actionsSiteRoot).href;
                script.onload = () => resolve(Boolean(window.MayCertificatePreview));
                script.onerror = () => reject(new Error('Certificate preview could not be loaded.'));
                document.head.appendChild(script);
            }).catch(error => {
                previewLoaderPromise = null;
                throw error;
            });
        }
        return previewLoaderPromise.then(loaded => {
            if (loaded) activateLoadedPreview(action);
            return loaded;
        });
    }

    function installCertificatePreviewShortcut() {
        if (!isLocalPreviewEnvironment() || typeof document.addEventListener !== 'function') return;
        document.addEventListener('keydown', event => {
            if (event.repeat || !event.ctrlKey || !event.altKey || String(event.key).toLowerCase() !== 'c') return;
            event.preventDefault();
            loadCertificatePreview('toggle').catch(error => console.error('Certificate preview shortcut failed:', error));
        });
        const query = new URLSearchParams(String(window.location.search || ''));
        const requested = /^(?:1|true)$/i.test(query.get('certificatePreview') || '');
        if (!requested) return;
        const openRequestedPreview = () => loadCertificatePreview('open')
            .catch(error => console.error('Certificate preview could not start:', error));
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', openRequestedPreview, { once: true });
        } else {
            window.setTimeout(openRequestedPreview, 0);
        }
    }

    function createActionError(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    function isTopLevelTrustedHttpsPage() {
        if (window.top !== window || window.location.protocol !== 'https:') return false;
        const host = window.location.hostname.toLowerCase();
        return host === 'maylearninghub.co.za' || host.endsWith('.maylearninghub.co.za');
    }

    function getModernBridge() {
        if (!isTopLevelTrustedHttpsPage()) return null;
        const bridge = window.MayLearningHubNative;
        return bridge && typeof bridge.postMessage === 'function' ? bridge : null;
    }

    function createSecureRequestId() {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
            const bytes = new Uint8Array(16);
            window.crypto.getRandomValues(bytes);
            bytes[6] = (bytes[6] & 0x0f) | 0x40;
            bytes[8] = (bytes[8] & 0x3f) | 0x80;
            const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0'));
            return hex.slice(0, 4).join('') + '-' +
                hex.slice(4, 6).join('') + '-' +
                hex.slice(6, 8).join('') + '-' +
                hex.slice(8, 10).join('') + '-' +
                hex.slice(10).join('');
        }
        throw createActionError('Secure request identifiers are unavailable in this browser.', 'secure_random_unavailable');
    }

    function parseNativeResponse(event) {
        try {
            const response = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (!response || response.version !== PROTOCOL_VERSION || typeof response.requestId !== 'string') return null;
            return response;
        } catch {
            return null;
        }
    }

    function handleModernResponse(event) {
        const response = parseNativeResponse(event);
        if (!response) return false;
        const pending = pendingRequests.get(response.requestId);
        if (!pending) return false;
        pendingRequests.delete(response.requestId);
        clearTimeout(pending.timeoutId);
        pending.resolve({
            version: PROTOCOL_VERSION,
            requestId: response.requestId,
            accepted: response.accepted === true,
            code: typeof response.code === 'string' ? response.code : 'unavailable'
        });
        return true;
    }

    function installModernResponseHandler(bridge) {
        if (installedModernBridge === bridge) return;
        const previousHandler = typeof bridge.onmessage === 'function' ? bridge.onmessage : null;
        bridge.onmessage = function (event) {
            const handled = handleModernResponse(event);
            if (!handled && previousHandler) {
                try { previousHandler.call(bridge, event); } catch (error) { console.warn('Earlier native message handler failed:', error); }
            }
        };
        installedModernBridge = bridge;
    }

    function sendModernRequest(bridge, action, payload) {
        installModernResponseHandler(bridge);
        const requestId = createSecureRequestId();
        const envelope = {
            version: PROTOCOL_VERSION,
            requestId,
            action,
            payload
        };

        return new Promise(resolve => {
            const timeoutId = setTimeout(() => {
                if (!pendingRequests.has(requestId)) return;
                pendingRequests.delete(requestId);
                resolve({ version: PROTOCOL_VERSION, requestId, accepted: false, code: 'timeout', uncertain: true });
            }, MODERN_REPLY_TIMEOUT_MS);

            pendingRequests.set(requestId, { resolve, timeoutId });
            try {
                bridge.postMessage(JSON.stringify(envelope));
            } catch (error) {
                pendingRequests.delete(requestId);
                clearTimeout(timeoutId);
                resolve({ version: PROTOCOL_VERSION, requestId, accepted: false, code: 'unavailable', error });
            }
        });
    }

    function sanitizeFileName(value) {
        const supplied = String(value || 'May-Learning-Hub-Certificate.png');
        const baseName = supplied.split(/[\\/]/).pop().replace(/[\u0000-\u001f\u007f<>:"|?*]+/g, '-').trim();
        const limited = (baseName || 'May-Learning-Hub-Certificate.png').slice(0, 140);
        return /\.png$/i.test(limited) ? limited : limited + '.png';
    }

    function normalizeOptions(options) {
        if (!options || !(options.blob instanceof Blob)) {
            throw createActionError('A certificate PNG Blob is required.', 'invalid_blob');
        }
        const blob = options.blob;
        const requestedMimeType = String(options.mimeType || blob.type || '').toLowerCase();
        if (requestedMimeType !== PNG_MIME_TYPE || (blob.type && blob.type.toLowerCase() !== PNG_MIME_TYPE)) {
            throw createActionError('Only PNG certificates can be saved or shared.', 'invalid_mime_type');
        }
        if (!blob.size) throw createActionError('The certificate image is empty.', 'empty_certificate');
        if (blob.size > MAX_CERTIFICATE_BYTES) {
            throw createActionError('The certificate image is too large to process safely.', 'certificate_too_large');
        }
        return {
            blob,
            fileName: sanitizeFileName(options.fileName),
            mimeType: PNG_MIME_TYPE,
            shareText: typeof options.shareText === 'string' ? options.shareText.slice(0, 12000) : '',
            fallbackUrl: typeof options.fallbackUrl === 'string' && /^https:\/\//i.test(options.fallbackUrl)
                ? options.fallbackUrl
                : '',
            fallbackMessage: typeof options.fallbackMessage === 'string' ? options.fallbackMessage.slice(0, 500) : ''
        };
    }

    function yieldForRendering() {
        return new Promise(resolve => {
            if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(() => resolve());
            else setTimeout(resolve, 0);
        });
    }

    async function validatePngSignature(asset) {
        await yieldForRendering();
        const header = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(new Uint8Array(reader.result));
            reader.onerror = () => reject(reader.error || createActionError('The certificate could not be read.', 'blob_read_failed'));
            reader.readAsArrayBuffer(asset.blob.slice(0, 8));
        });
        const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        if (header.length !== pngSignature.length || pngSignature.some((byte, index) => header[index] !== byte)) {
            throw createActionError('The generated certificate is not a valid PNG image.', 'invalid_png');
        }
    }

    async function blobToNativePayload(asset) {
        await yieldForRendering();
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(reader.error || createActionError('The certificate could not be read.', 'blob_read_failed'));
            reader.readAsDataURL(asset.blob);
        });
        const separatorIndex = dataUrl.indexOf(',');
        const base64 = separatorIndex >= 0 ? dataUrl.slice(separatorIndex + 1) : '';
        if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
            throw createActionError('The generated certificate data is malformed.', 'invalid_base64');
        }
        if (base64.length > Math.ceil(MAX_CERTIFICATE_BYTES * 4 / 3) + 8) {
            throw createActionError('The encoded certificate is too large to send safely.', 'certificate_too_large');
        }
        return {
            fileName: asset.fileName,
            mimeType: PNG_MIME_TYPE,
            base64,
            dataUrl: 'data:' + PNG_MIME_TYPE + ';base64,' + base64,
            ...(asset.shareText ? { shareText: asset.shareText } : {})
        };
    }

    function getLegacyBridge(action) {
        const bridge = window.MayLearningHub;
        const methodName = action === 'saveCertificate' ? 'saveCertificate' : 'shareCertificate';
        const token = window.__mayLearningHubCertificateToken;
        if (!bridge || typeof bridge[methodName] !== 'function') return null;
        if (typeof token !== 'string' || !token.trim()) return null;
        return { bridge, methodName, token };
    }

    function sendLegacyRequest(action, payload) {
        const legacy = getLegacyBridge(action);
        if (!legacy) return null;
        const legacyPayload = {
            ...payload,
            type: action === 'saveCertificate' ? 'mayhub-save-certificate' : 'mayhub-share-certificate',
            bridgeToken: legacy.token
        };
        try {
            const accepted = legacy.bridge[legacy.methodName](JSON.stringify(legacyPayload));
            if (accepted === false) return null;
            return { ok: true, action, mode: 'legacy-native', code: 'accepted' };
        } catch (error) {
            console.warn('Legacy certificate bridge unavailable:', error);
            return null;
        }
    }

    function isLikelyWebView() {
        const userAgent = navigator.userAgent || '';
        const androidWebView = /\bwv\b|;\s*wv\)|Android.*Version\/[\d.]+.*Chrome\/[\d.]+.*Mobile Safari/i.test(userAgent);
        const iosWebView = /(iPhone|iPad|iPod)/i.test(userAgent) && !/Safari/i.test(userAgent);
        return androidWebView || iosWebView || /WebView|MayLearningHub/i.test(userAgent);
    }

    function triggerBrowserDownload(asset) {
        const objectUrl = URL.createObjectURL(asset.blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = asset.fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
        return { ok: true, mode: 'browser-download', code: 'accepted' };
    }

    function supportsFileShare(file) {
        if (!navigator.share || !navigator.canShare) return false;
        try { return navigator.canShare({ files: [file] }); } catch { return false; }
    }

    function getServiceWorkerVersion(controller) {
        if (!controller || typeof MessageChannel !== 'function') return Promise.resolve('');
        return new Promise(resolve => {
            const channel = new MessageChannel();
            const timeoutId = setTimeout(() => resolve(''), 1500);
            channel.port1.onmessage = event => {
                clearTimeout(timeoutId);
                resolve(event.data && event.data.version ? event.data.version : '');
            };
            try {
                controller.postMessage({ type: 'MAYHUB_GET_SW_VERSION' }, [channel.port2]);
            } catch {
                clearTimeout(timeoutId);
                resolve('');
            }
        });
    }

    async function ensureCertificateServiceWorker() {
        if (!('serviceWorker' in navigator) || !('caches' in window) || !/^https?:$/.test(window.location.protocol)) return false;
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
            try { await registration.update(); } catch {}
            await navigator.serviceWorker.ready;
            let version = await getServiceWorkerVersion(navigator.serviceWorker.controller);
            if (version !== SERVICE_WORKER_VERSION) {
                if (registration.waiting) registration.waiting.postMessage({ type: 'MAYHUB_SKIP_WAITING' });
                await new Promise(resolve => {
                    const timeoutId = setTimeout(resolve, 6000);
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        clearTimeout(timeoutId);
                        resolve();
                    }, { once: true });
                });
                version = await getServiceWorkerVersion(navigator.serviceWorker.controller);
            }
            return version === SERVICE_WORKER_VERSION;
        } catch (error) {
            console.warn('Certificate service worker unavailable:', error);
            return false;
        }
    }

    async function triggerSameSiteDownload(asset) {
        if (!await ensureCertificateServiceWorker()) return null;
        try {
            let downloadId;
            try { downloadId = createSecureRequestId(); } catch { downloadId = Date.now().toString(36); }
            const safePathName = asset.fileName.replace(/[^a-z0-9._-]+/gi, '-');
            const downloadUrl = new URL('/certificate-download/' + downloadId + '/' + encodeURIComponent(safePathName), window.location.origin);
            const downloadCache = await caches.open(CERTIFICATE_DOWNLOAD_CACHE);
            await downloadCache.put(downloadUrl.href, new Response(asset.blob, {
                status: 200,
                headers: {
                    'Content-Type': PNG_MIME_TYPE,
                    'Content-Disposition': 'attachment; filename="' + safePathName + '"',
                    'Cache-Control': 'no-store, max-age=0'
                }
            }));
            const link = document.createElement('a');
            link.href = downloadUrl.href;
            link.download = safePathName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => downloadCache.delete(downloadUrl.href), 300000);
            return { ok: true, mode: 'same-site-download', code: 'accepted' };
        } catch (error) {
            console.warn('Same-site certificate download failed:', error);
            return null;
        }
    }

    function openFallbackUrl(url) {
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    async function browserSave(asset) {
        if (isLikelyWebView()) {
            const sameSite = await triggerSameSiteDownload(asset);
            if (sameSite) return sameSite;
            throw createActionError('This WebView does not provide a supported certificate download channel.', 'webview_download_unavailable');
        }
        return triggerBrowserDownload(asset);
    }

    async function browserShare(asset) {
        if (typeof File === 'function') {
            const file = new File([asset.blob], asset.fileName, { type: PNG_MIME_TYPE, lastModified: Date.now() });
            if (supportsFileShare(file)) {
                try {
                    await navigator.share({
                        title: 'May Learning Hub Certificate',
                        text: asset.shareText,
                        files: [file]
                    });
                    return { ok: true, mode: 'browser-file-share', code: 'accepted' };
                } catch (error) {
                    if (error && error.name === 'AbortError') return { ok: false, mode: 'cancelled', code: 'cancelled' };
                }
            }
        }

        const downloadResult = isLikelyWebView()
            ? await triggerSameSiteDownload(asset)
            : triggerBrowserDownload(asset);
        if (!downloadResult) {
            throw createActionError('This WebView cannot download the certificate for sharing.', 'webview_share_unavailable');
        }
        if (asset.fallbackMessage) window.alert(asset.fallbackMessage);
        openFallbackUrl(asset.fallbackUrl);
        return { ok: true, mode: 'download-share-fallback', code: 'accepted' };
    }

    async function perform(action, options) {
        const asset = normalizeOptions(options);
        await validatePngSignature(asset);
        let nativePayload = null;
        const modernBridge = getModernBridge();

        if (modernBridge) {
            nativePayload = await blobToNativePayload(asset);
            const response = await sendModernRequest(modernBridge, action, nativePayload);
            if (response.accepted) {
                return { ok: true, action, mode: 'modern-native', code: response.code, requestId: response.requestId };
            }
            if (response.code === 'timeout') {
                throw createActionError('The Android app did not confirm the certificate action. Please try once more.', 'native_timeout');
            }
            if (response.code === 'untrusted_origin') {
                throw createActionError('The Android app rejected this website origin.', 'untrusted_origin');
            }
            if (response.code === 'invalid_request') {
                throw createActionError('The Android app rejected the certificate request as invalid.', 'invalid_request');
            }
        }

        const legacyBridge = getLegacyBridge(action);
        if (legacyBridge) {
            if (!nativePayload) nativePayload = await blobToNativePayload(asset);
            const legacyResult = sendLegacyRequest(action, nativePayload);
            if (legacyResult) return legacyResult;
        }

        const browserResult = action === 'saveCertificate'
            ? await browserSave(asset)
            : await browserShare(asset);
        return { ...browserResult, action };
    }

    window.MayCertificateActions = Object.freeze({
        version: VERSION,
        save(options) { return perform('saveCertificate', options); },
        share(options) { return perform('shareCertificate', options); },
        openPreview() { return loadCertificatePreview('open'); },
        isPreviewAvailable() { return isLocalPreviewEnvironment(); },
        isModernNativeAvailable() { return Boolean(getModernBridge()); },
        pendingCount() { return pendingRequests.size; }
    });
    installCertificatePreviewShortcut();
})();
