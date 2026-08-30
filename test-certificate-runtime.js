#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const rendererSource = fs.readFileSync(path.join(siteRoot, 'may-certificate-renderer.js'), 'utf8');
const actionsSource = fs.readFileSync(path.join(siteRoot, 'may-certificate-actions.js'), 'utf8');
const pngBytes = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]);

function mockCanvas() {
    const drawnText = [];
    const gradient = { addColorStop() {} };
    const context = {
        drawnText,
        createLinearGradient: () => gradient,
        createRadialGradient: () => gradient,
        measureText: value => ({ width: String(value).length * 14 }),
        fillText: value => drawnText.push(String(value)),
        fillRect() {}, strokeRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
        quadraticCurveTo() {}, closePath() {}, fill() {}, stroke() {}, save() {},
        restore() {}, drawImage() {}, arc() {}, roundRect() {}, rect() {},
        translate() {}, rotate() {}, bezierCurveTo() {}
    };
    return {
        width: 0,
        height: 0,
        context,
        getContext: () => context,
        toBlob: callback => callback(new Blob([pngBytes], { type: 'image/png' }))
    };
}

async function testRenderer() {
    const canvases = [];
    class MockImage {
        set src(value) { this._src = value; queueMicrotask(() => this.onerror?.()); }
        get src() { return this._src; }
    }
    const window = {
        location: { protocol: 'https:' },
        setTimeout,
        clearTimeout
    };
    const document = {
        currentScript: { src: 'https://www.maylearninghub.co.za/may-certificate-renderer.js' },
        createElement(tagName) {
            assert.strictEqual(tagName, 'canvas');
            const canvas = mockCanvas();
            canvases.push(canvas);
            return canvas;
        }
    };
    const context = vm.createContext({ window, document, Image: MockImage, Blob, URL, Date, console, setTimeout, clearTimeout });
    vm.runInContext(rendererSource, context, { filename: 'may-certificate-renderer.js' });

    const scored = await window.MayCertificateRenderer.create({
        learnerName: 'Cwerha Mayaya',
        grade: 'Grade 11',
        subject: 'Geography',
        term: 'Term 3',
        topic: 'A Long but Valid Geography Assessment Topic Used to Verify Responsive Certificate Text',
        gameTitle: 'A Long but Valid Geography Assessment Challenge',
        category: 'Interpreting Development Indicators and Comparing Countries',
        mode: 'scored',
        correct: 8,
        total: 10,
        title: 'Certificate of Distinction',
        award: 'Gold Distinction Award',
        message: 'DISTINCTION — Excellent work!',
        tierClass: 'tier-gold',
        issuedAt: '2026-08-28T10:00:00.000Z'
    });
    assert.strictEqual(scored.blob.type, 'image/png');
    assert(scored.blob.size > 8);
    assert.strictEqual(scored.width, 1200);
    assert.strictEqual(scored.height, 1697);
    assert(scored.fileName.startsWith('May-Learning-Hub-Cwerha-Mayaya-'));
    assert(/-20260828-100000-Certificate\.png$/.test(scored.fileName), scored.fileName);
    assert(canvases[0].context.drawnText.some(text => text.includes('GRADE 11')));
    assert(canvases[0].context.drawnText.includes('8/10'));

    const compact = await window.MayCertificateRenderer.create({
        learnerName: 'Grade Ten Learner',
        grade: 'Grade 10',
        subject: 'Geography',
        term: 'Term 3',
        topic: 'Migration Concepts',
        gameTitle: 'Migration Concepts Spin-the-Wheel Game',
        category: 'Multiple Choice',
        layout: 'compact-subject',
        mode: 'scored',
        correct: 7,
        total: 10,
        issuedAt: '2026-08-28T10:00:00.500Z'
    });
    assert.strictEqual(compact.blob.type, 'image/png');
    assert(canvases[1].context.drawnText.includes('GRADE 10 GEOGRAPHY'));
    assert(canvases[1].context.drawnText.includes('TERM 3'));
    assert(canvases[1].context.drawnText.includes('M Learning Hub'));

    const participation = await window.MayCertificateRenderer.create({
        learnerName: 'Test Learner',
        grade: 'Grade 8',
        subject: 'Social Sciences History',
        term: 'Term 3',
        topic: 'The Berlin Conference',
        gameTitle: 'The Berlin Conference Memory Game',
        category: 'Memory Matching',
        mode: 'participation',
        issuedAt: '2026-08-28T10:00:01.000Z'
    });
    assert.strictEqual(participation.blob.type, 'image/png');
    assert(/-20260828-100001-Certificate\.png$/.test(participation.fileName));

    const memoryMastery = await window.MayCertificateRenderer.create({
        learnerName: 'Memory Learner',
        grade: 'Grade 11',
        subject: 'Geography',
        term: 'Term 3',
        topic: 'Trade Patterns',
        gameTitle: 'Trade Patterns Memory Match Challenge',
        category: '10-Pair Memory Match',
        layout: 'compact-subject',
        mode: 'participation',
        title: 'Certificate of Memory Mastery',
        award: 'Gold Excellent Recall Award',
        tierClass: 'tier-gold',
        metricLabel: 'Completed in',
        metricValue: '01:42',
        metricStyle: 'split-duration',
        issuedAt: '2026-08-28T10:00:02.000Z'
    });
    assert.strictEqual(memoryMastery.blob.type, 'image/png');
    assert(canvases[3].context.drawnText.includes('COMPLETED IN'));
    assert(canvases[3].context.drawnText.includes('01'));
    assert(canvases[3].context.drawnText.includes('42'));
    assert(canvases[3].context.drawnText.includes('MINUTES'));
    assert(canvases[3].context.drawnText.includes('SECONDS'));

    const premiumPreview = await window.MayCertificateRenderer.create({
        learnerName: 'Premium Certificate Learner',
        grade: 'Grade 11',
        subject: 'Geography',
        term: 'Term 3',
        topic: 'GeoQuest: The Development Expedition',
        gameTitle: 'GeoQuest: The Development Expedition',
        category: 'Five-Stage Geography Expedition',
        layout: 'premium-expedition',
        exportStyle: 'premium-preview',
        mode: 'scored',
        correct: 52,
        total: 60,
        title: 'Certificate of Distinction',
        award: 'Gold Distinction Award',
        message: 'DISTINCTION — Excellent work!',
        tierClass: 'tier-gold',
        issuedAt: '2026-08-28T10:00:03.000Z'
    });
    assert.strictEqual(premiumPreview.blob.type, 'image/png');
    assert(canvases[4].context.drawnText.includes('Certificate of Distinction'));
    assert(canvases[4].context.drawnText.includes('52/60'));
    assert(canvases[4].context.drawnText.includes('Presented in recognition of learning progress to'));

    await assert.rejects(
        () => window.MayCertificateRenderer.create({ mode: 'scored', correct: 0, total: 0 }),
        error => error && error.code === 'invalid_certificate_total'
    );
}

class MockFileReader {
    readAsArrayBuffer(blob) {
        blob.arrayBuffer().then(result => {
            this.result = result;
            this.onload?.();
        }, error => {
            this.error = error;
            this.onerror?.();
        });
    }

    readAsDataURL(blob) {
        blob.arrayBuffer().then(result => {
            this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + Buffer.from(result).toString('base64');
            this.onload?.();
        }, error => {
            this.error = error;
            this.onerror?.();
        });
    }
}

function createActionsEnvironment(options = {}) {
    let id = 0;
    let browserClicks = 0;
    const appended = [];
    const documentListeners = new Map();
    const body = {
        appendChild(element) { appended.push(element); return element; }
    };
    const head = {
        appendChild(element) { appended.push(element); return element; }
    };
    const document = {
        body,
        head,
        currentScript: options.currentScript || null,
        readyState: 'complete',
        scripts: appended,
        addEventListener(type, listener) {
            const listeners = documentListeners.get(type) || [];
            listeners.push(listener);
            documentListeners.set(type, listeners);
        },
        getElementById(id) { return appended.find(element => element.id === id) || null; },
        createElement(tagName) {
            if (tagName === 'a') {
                return {
                    tagName: 'A',
                    style: {},
                    click() { browserClicks += 1; },
                    remove() {}
                };
            }
            if (tagName === 'script') return { tagName: 'SCRIPT', id: '', src: '', onload: null, onerror: null };
            throw new Error('Unexpected test element: ' + tagName);
        }
    };
    const navigator = {
        userAgent: options.userAgent || 'Mozilla/5.0',
        ...(options.navigator || {})
    };
    const location = {
        protocol: options.protocol || 'https:',
        hostname: options.hostname || 'www.maylearninghub.co.za',
        origin: options.origin || 'https://www.maylearninghub.co.za',
        search: options.search || ''
    };
    const runtimeSetTimeout = (callback, delay, ...args) => {
        const timer = setTimeout(callback, delay, ...args);
        if (delay >= 1000 && typeof timer.unref === 'function') timer.unref();
        return timer;
    };
    const window = {
        location,
        navigator,
        document,
        top: null,
        crypto: { randomUUID: () => '00000000-0000-4000-8000-' + String(++id).padStart(12, '0') },
        requestAnimationFrame: callback => runtimeSetTimeout(callback, 0),
        setTimeout: runtimeSetTimeout,
        clearTimeout,
        alert() {},
        ...(options.window || {})
    };
    window.top = window;
    const urlApi = class RuntimeURL extends URL {};
    urlApi.createObjectURL = () => 'blob:certificate';
    urlApi.revokeObjectURL = () => {};
    const context = vm.createContext({
        window,
        document,
        navigator,
        location,
        Blob,
        File: globalThis.File,
        FileReader: MockFileReader,
        URL: urlApi,
        URLSearchParams,
        Response,
        Uint8Array,
        Buffer,
        Date,
        console,
        setTimeout: runtimeSetTimeout,
        clearTimeout
    });
    vm.runInContext(actionsSource, context, { filename: 'may-certificate-actions.js' });
    return {
        window,
        navigator,
        getBrowserClicks: () => browserClicks,
        appended,
        dispatchDocumentEvent(type, event) {
            (documentListeners.get(type) || []).forEach(listener => listener(event));
        }
    };
}

async function testCertificatePreviewLoader() {
    const environment = createActionsEnvironment({
        protocol: 'file:',
        hostname: '',
        origin: 'null',
        currentScript: { src: 'file:///D:/MayHub/may-certificate-actions.js' }
    });
    assert.strictEqual(environment.window.MayCertificateActions.isPreviewAvailable(), true);
    const previewPromise = environment.window.MayCertificateActions.openPreview();
    const previewScript = environment.appended.find(element => element.tagName === 'SCRIPT');
    assert(previewScript, 'local preview must load one shared script');
    assert(previewScript.src.endsWith('/certificate-preview.js'));
    let opened = 0;
    environment.window.MayCertificatePreview = { open() { opened += 1; } };
    previewScript.onload();
    assert.strictEqual(await previewPromise, true);
    assert.strictEqual(opened, 1);

    const keyboard = createActionsEnvironment({
        protocol: 'file:', hostname: '', origin: 'null',
        currentScript: { src: 'file:///D:/MayHub/may-certificate-actions.js' }
    });
    let prevented = false;
    keyboard.dispatchDocumentEvent('keydown', {
        repeat: false, ctrlKey: true, altKey: true, key: 'c',
        preventDefault() { prevented = true; }
    });
    const keyboardScript = keyboard.appended.find(element => element.tagName === 'SCRIPT');
    assert(keyboardScript, 'Ctrl + Alt + C must request the shared preview script');
    let toggled = 0;
    keyboard.window.MayCertificatePreview = { open() {}, toggle() { toggled += 1; } };
    keyboardScript.onload();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.strictEqual(prevented, true);
    assert.strictEqual(toggled, 1);

    const query = createActionsEnvironment({
        protocol: 'file:', hostname: '', origin: 'null', search: '?certificatePreview=1',
        currentScript: { src: 'file:///D:/MayHub/may-certificate-actions.js' }
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const queryScript = query.appended.find(element => element.tagName === 'SCRIPT');
    assert(queryScript, 'certificatePreview=1 must request the shared preview script');
    let queryOpened = 0;
    query.window.MayCertificatePreview = { open() { queryOpened += 1; }, toggle() {} };
    queryScript.onload();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.strictEqual(queryOpened, 1);

    const production = createActionsEnvironment();
    assert.strictEqual(production.window.MayCertificateActions.isPreviewAvailable(), false);
    assert.strictEqual(await production.window.MayCertificateActions.openPreview(), false);
}

function certificateAsset(overrides = {}) {
    return {
        blob: new Blob([pngBytes], { type: 'image/png' }),
        fileName: 'May-Learning-Hub-Test-Certificate.png',
        mimeType: 'image/png',
        shareText: '🏆 I earned my May Learning Hub certificate!\nGet yours: https://www.maylearninghub.co.za',
        ...overrides
    };
}

async function testModernBridge() {
    const requests = [];
    const bridge = {
        postMessage(raw) {
            const request = JSON.parse(raw);
            requests.push(request);
            if (requests.length === 2) {
                setTimeout(() => {
                    [requests[1], requests[0]].forEach(item => bridge.onmessage({
                        data: JSON.stringify({
                            version: 1,
                            requestId: item.requestId,
                            accepted: true,
                            code: 'accepted'
                        })
                    }));
                }, 0);
            }
        }
    };
    const environment = createActionsEnvironment({ window: { MayLearningHubNative: bridge } });
    const savePromise = environment.window.MayCertificateActions.save(certificateAsset());
    const sharePromise = environment.window.MayCertificateActions.share(certificateAsset());
    const [saved, shared] = await Promise.all([savePromise, sharePromise]);
    assert.strictEqual(saved.mode, 'modern-native');
    assert.strictEqual(shared.mode, 'modern-native');
    assert.notStrictEqual(saved.requestId, shared.requestId);
    assert.strictEqual(environment.window.MayCertificateActions.pendingCount(), 0);
    assert.strictEqual(environment.getBrowserClicks(), 0, 'accepted native requests must not trigger browser actions');
    assert.deepStrictEqual(requests.map(request => request.action).sort(), ['saveCertificate', 'shareCertificate']);
    requests.forEach(request => {
        assert.strictEqual(request.version, 1);
        assert(request.payload.base64);
        assert(request.payload.dataUrl.startsWith('data:image/png;base64,'));
        assert.strictEqual(request.payload.mimeType, 'image/png');
    });
}

async function testLegacyBridge() {
    let received = null;
    const environment = createActionsEnvironment({
        window: {
            __mayLearningHubCertificateToken: 'test-token',
            MayLearningHub: {
                saveCertificate(raw) { received = JSON.parse(raw); return true; }
            }
        }
    });
    const outcome = await environment.window.MayCertificateActions.save(certificateAsset());
    assert.strictEqual(outcome.mode, 'legacy-native');
    assert.strictEqual(received.bridgeToken, 'test-token');
    assert.strictEqual(received.type, 'mayhub-save-certificate');
    assert(received.base64);
    assert.strictEqual(environment.getBrowserClicks(), 0);
}

async function testBrowserFallback() {
    const environment = createActionsEnvironment();
    const outcome = await environment.window.MayCertificateActions.save(certificateAsset());
    assert.strictEqual(outcome.mode, 'browser-download');
    assert.strictEqual(environment.getBrowserClicks(), 1);
}

(async () => {
    await testRenderer();
    await testModernBridge();
    await testLegacyBridge();
    await testBrowserFallback();
    await testCertificatePreviewLoader();
    console.log('Certificate runtime tests passed: renderer, modern bridge, legacy bridge, browser fallback, and local-only preview loader.');
})().catch(error => {
    console.error(error && error.stack ? error.stack : error);
    process.exit(1);
});
