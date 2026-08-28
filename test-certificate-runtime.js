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
    const body = {
        appendChild(element) { appended.push(element); return element; }
    };
    const document = {
        body,
        createElement(tagName) {
            assert.strictEqual(tagName, 'a');
            return {
                style: {},
                click() { browserClicks += 1; },
                remove() {}
            };
        }
    };
    const navigator = {
        userAgent: options.userAgent || 'Mozilla/5.0',
        ...(options.navigator || {})
    };
    const location = {
        protocol: options.protocol || 'https:',
        hostname: options.hostname || 'www.maylearninghub.co.za',
        origin: options.origin || 'https://www.maylearninghub.co.za'
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
        Response,
        Uint8Array,
        Buffer,
        Date,
        console,
        setTimeout: runtimeSetTimeout,
        clearTimeout
    });
    vm.runInContext(actionsSource, context, { filename: 'may-certificate-actions.js' });
    return { window, navigator, getBrowserClicks: () => browserClicks, appended };
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
    console.log('Certificate runtime tests passed: renderer, modern bridge, legacy bridge, and browser fallback.');
})().catch(error => {
    console.error(error && error.stack ? error.stack : error);
    process.exit(1);
});
