(function () {
    'use strict';

    if (window.MayCertificatePreview && window.MayCertificatePreview.version) return;

    const VERSION = '1.0.0';
    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL('.', scriptUrl);
    const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
    const isAllowed = window.location.protocol === 'file:' || localHosts.has(window.location.hostname.toLowerCase());
    if (!isAllowed) return;

    let panel = null;
    let controllerPromise = null;

    const scoredPresets = [
        { id: 'scored-platinum', label: 'Platinum: Perfect Score', mode: 'scored', correct: 10, total: 10 },
        { id: 'scored-gold', label: 'Gold: Distinction', mode: 'scored', correct: 8, total: 10 },
        { id: 'scored-silver', label: 'Silver: Pass', mode: 'scored', correct: 6, total: 10 },
        { id: 'scored-bronze', label: 'Bronze: Progress', mode: 'scored', correct: 4, total: 10 },
        { id: 'participation', label: 'Participation Certificate', mode: 'participation' }
    ];

    const memoryPresets = [
        {
            id: 'memory-platinum', label: 'Memory Mastery: Platinum', mode: 'memory', duration: '01:15',
            tierClass: 'tier-platinum', awardLabel: 'Platinum Rapid Recall Award',
            message: 'RAPID RECALL — Exceptional focus, memory and matching efficiency.'
        },
        {
            id: 'memory-gold', label: 'Memory Mastery: Gold', mode: 'memory', duration: '02:10',
            tierClass: 'tier-gold', awardLabel: 'Gold Excellent Recall Award',
            message: 'EXCELLENT RECALL — Impressive concentration and memory performance.'
        },
        {
            id: 'memory-silver', label: 'Memory Mastery: Silver', mode: 'memory', duration: '03:20',
            tierClass: 'tier-silver', awardLabel: 'Silver Strong Recall Award',
            message: 'STRONG RECALL — A focused and thoughtful memory performance.'
        },
        {
            id: 'memory-bronze', label: 'Memory Mastery: Bronze', mode: 'memory', duration: '05:00',
            tierClass: 'tier-bronze', awardLabel: 'Bronze Determined Recall Award',
            message: 'DETERMINED RECALL — Persistence and concentration completed the challenge.'
        }
    ];

    function certificateContext() {
        const data = document.body?.dataset || {};
        return {
            grade: data.certificateGrade || 'Grade',
            subject: data.certificateSubject || 'Subject',
            term: data.certificateTerm || '',
            topic: data.certificateTopic || 'Assessment Topic',
            gameTitle: data.certificateGame || document.title || 'Assessment Game',
            layout: data.certificateLayout || 'standard',
            previewPreset: data.certificatePreviewPreset || ''
        };
    }

    function defaultLearnerName() {
        for (const storage of [window.localStorage, window.sessionStorage]) {
            try {
                const saved = JSON.parse(storage.getItem('mayhubActivityAccess') || 'null');
                const fullName = saved?.profile?.fullName?.trim();
                const emailName = String(saved?.email || '').split('@')[0];
                if (fullName || emailName) return fullName || emailName;
            } catch {}
        }
        return 'Certificate Test Learner';
    }

    function loadScriptOnce(source, readyCheck) {
        if (readyCheck()) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const existing = [...document.scripts].find(script => script.src === source);
            if (existing) {
                const waitStarted = Date.now();
                const waitForReady = () => {
                    if (readyCheck()) resolve();
                    else if (Date.now() - waitStarted > 5000) reject(new Error('The certificate controller did not become available.'));
                    else window.setTimeout(waitForReady, 50);
                };
                waitForReady();
                return;
            }
            const script = document.createElement('script');
            script.src = source;
            script.onload = () => readyCheck() ? resolve() : reject(new Error('The certificate controller did not initialise.'));
            script.onerror = () => reject(new Error('The certificate controller could not be loaded.'));
            document.head.appendChild(script);
        });
    }

    function ensureController() {
        if (window.MayHubCertificates) return Promise.resolve();
        if (!controllerPromise) {
            controllerPromise = loadScriptOnce(
                new URL('assessment-certificate.js', siteRoot).href,
                () => Boolean(window.MayHubCertificates)
            ).catch(error => {
                controllerPromise = null;
                throw error;
            });
        }
        return controllerPromise;
    }

    function addStyles() {
        if (document.getElementById('mayhubCertificatePreviewStyles')) return;
        const style = document.createElement('style');
        style.id = 'mayhubCertificatePreviewStyles';
        style.textContent = `
            .mayhub-preview-overlay {
                position: fixed; inset: 0; z-index: 9000; display: none; align-items: center; justify-content: center;
                padding: 1rem; background: rgba(5, 24, 45, .76); backdrop-filter: blur(6px);
                font-family: 'Segoe UI', Tahoma, sans-serif;
            }
            .mayhub-preview-panel {
                width: min(100%, 480px); max-height: calc(100vh - 2rem); overflow-y: auto; padding: 1.35rem;
                color: #17324d; background: linear-gradient(150deg, #fff, #edf7ff); border: 2px solid #207ac0;
                border-radius: 20px; box-shadow: 0 24px 65px rgba(0, 0, 0, .38);
            }
            .mayhub-preview-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
            .mayhub-preview-title { margin: 0; color: #004080; font-size: 1.35rem; line-height: 1.2; }
            .mayhub-preview-subtitle { margin: .3rem 0 0; color: #567086; font-size: .82rem; }
            .mayhub-preview-close { width: 36px; height: 36px; flex: 0 0 auto; border: 0; border-radius: 50%; color: #fff; background: #004080; cursor: pointer; font-size: 1.15rem; }
            .mayhub-preview-context { margin-bottom: 1rem; padding: .7rem .85rem; color: #31536f; background: #fff; border-left: 4px solid #3385ff; border-radius: 10px; font-size: .82rem; }
            .mayhub-preview-field { display: block; margin-bottom: .85rem; }
            .mayhub-preview-field > span { display: block; margin-bottom: .3rem; color: #254c6d; font-size: .76rem; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
            .mayhub-preview-input, .mayhub-preview-select {
                width: 100%; padding: .7rem .8rem; color: #17324d; background: #fff; border: 1px solid #9fbdd5;
                border-radius: 10px; font: inherit;
            }
            .mayhub-preview-row { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
            .mayhub-preview-note { margin: .15rem 0 1rem; color: #587184; font-size: .76rem; line-height: 1.45; }
            .mayhub-preview-button {
                width: 100%; padding: .82rem 1rem; border: 0; border-radius: 12px; color: #fff;
                background: linear-gradient(135deg, #0069b4, #004080); font-size: .95rem; font-weight: 850; cursor: pointer;
                box-shadow: 0 8px 18px rgba(0, 64, 128, .22);
            }
            .mayhub-preview-button:disabled { opacity: .62; cursor: wait; }
            .mayhub-preview-status { min-height: 1.3rem; margin-top: .65rem; color: #365d7b; font-size: .78rem; text-align: center; }
            @media (max-width: 520px) {
                .mayhub-preview-panel { padding: 1rem; border-radius: 15px; }
                .mayhub-preview-row { grid-template-columns: 1fr; gap: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function allPresets(context) {
        return context.previewPreset === 'memory-mastery'
            ? [...memoryPresets, ...scoredPresets]
            : scoredPresets;
    }

    function createPanel() {
        if (panel) return panel;
        addStyles();
        panel = document.createElement('section');
        panel.className = 'mayhub-preview-overlay';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-labelledby', 'mayhubPreviewTitle');
        panel.innerHTML = `
            <form class="mayhub-preview-panel" id="mayhubPreviewForm">
                <div class="mayhub-preview-header">
                    <div>
                        <h2 class="mayhub-preview-title" id="mayhubPreviewTitle">Certificate Preview</h2>
                        <p class="mayhub-preview-subtitle">Local developer mode</p>
                    </div>
                    <button class="mayhub-preview-close" id="mayhubPreviewClose" type="button" aria-label="Close preview panel">×</button>
                </div>
                <div class="mayhub-preview-context" id="mayhubPreviewContext"></div>
                <label class="mayhub-preview-field">
                    <span>Learner name</span>
                    <input class="mayhub-preview-input" id="mayhubPreviewName" type="text" maxlength="80" autocomplete="off">
                </label>
                <label class="mayhub-preview-field">
                    <span>Certificate preset</span>
                    <select class="mayhub-preview-select" id="mayhubPreviewPreset"></select>
                </label>
                <div class="mayhub-preview-row" id="mayhubPreviewScoreFields">
                    <label class="mayhub-preview-field">
                        <span>Correct</span>
                        <input class="mayhub-preview-input" id="mayhubPreviewCorrect" type="number" min="0" max="100" value="8">
                    </label>
                    <label class="mayhub-preview-field">
                        <span>Total</span>
                        <input class="mayhub-preview-input" id="mayhubPreviewTotal" type="number" min="1" max="100" value="10">
                    </label>
                </div>
                <label class="mayhub-preview-field" id="mayhubPreviewDurationField" style="display:none;">
                    <span>Digital completion time</span>
                    <input class="mayhub-preview-input" id="mayhubPreviewDuration" type="text" value="01:15" inputmode="numeric" pattern="[0-9]{1,2}:[0-5][0-9]">
                </label>
                <label class="mayhub-preview-field">
                    <span>Category</span>
                    <input class="mayhub-preview-input" id="mayhubPreviewCategory" type="text" maxlength="100">
                </label>
                <p class="mayhub-preview-note">This opens the real certificate. Use its Download and WhatsApp buttons to test the complete workflow.</p>
                <button class="mayhub-preview-button" id="mayhubPreviewOpen" type="submit">Preview Certificate</button>
                <p class="mayhub-preview-status" id="mayhubPreviewStatus" role="status" aria-live="polite"></p>
            </form>
        `;
        document.body.appendChild(panel);

        panel.querySelector('#mayhubPreviewClose').addEventListener('click', close);
        panel.addEventListener('click', event => { if (event.target === panel) close(); });
        panel.querySelector('#mayhubPreviewPreset').addEventListener('change', syncPresetFields);
        panel.querySelector('#mayhubPreviewForm').addEventListener('submit', showPreview);
        return panel;
    }

    function selectedPreset() {
        const context = certificateContext();
        const selectedId = panel.querySelector('#mayhubPreviewPreset').value;
        return allPresets(context).find(preset => preset.id === selectedId) || allPresets(context)[0];
    }

    function syncPresetFields() {
        const preset = selectedPreset();
        const scoreFields = panel.querySelector('#mayhubPreviewScoreFields');
        const durationField = panel.querySelector('#mayhubPreviewDurationField');
        scoreFields.style.display = preset.mode === 'scored' ? 'grid' : 'none';
        durationField.style.display = preset.mode === 'memory' ? 'block' : 'none';
        if (preset.mode === 'scored') {
            panel.querySelector('#mayhubPreviewCorrect').value = preset.correct;
            panel.querySelector('#mayhubPreviewTotal').value = preset.total;
        }
        if (preset.mode === 'memory') panel.querySelector('#mayhubPreviewDuration').value = preset.duration;
    }

    function populatePanel() {
        const context = certificateContext();
        panel.querySelector('#mayhubPreviewContext').textContent = [context.grade, context.subject, context.topic, context.gameTitle].filter(Boolean).join(' • ');
        const nameInput = panel.querySelector('#mayhubPreviewName');
        if (!nameInput.value) nameInput.value = defaultLearnerName();
        panel.querySelector('#mayhubPreviewCategory').value = context.previewPreset === 'memory-mastery'
            ? '10-Pair Memory Match'
            : 'Certificate Preview';
        const select = panel.querySelector('#mayhubPreviewPreset');
        const previous = select.value;
        select.innerHTML = '';
        allPresets(context).forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.id;
            option.textContent = preset.label;
            select.appendChild(option);
        });
        if ([...select.options].some(option => option.value === previous)) select.value = previous;
        syncPresetFields();
    }

    function normalizeDuration(value, fallback) {
        const match = String(value || '').trim().match(/^(\d{1,2}):([0-5]\d)$/);
        if (!match) return fallback;
        return match[1].padStart(2, '0') + ':' + match[2];
    }

    async function showPreview(event) {
        event.preventDefault();
        const button = panel.querySelector('#mayhubPreviewOpen');
        const status = panel.querySelector('#mayhubPreviewStatus');
        button.disabled = true;
        status.textContent = 'Preparing the real certificate preview…';
        try {
            await ensureController();
            const preset = selectedPreset();
            const name = panel.querySelector('#mayhubPreviewName').value.trim() || 'Certificate Test Learner';
            const category = panel.querySelector('#mayhubPreviewCategory').value.trim() || 'Certificate Preview';
            close();
            if (preset.mode === 'scored') {
                const total = Math.max(1, Number(panel.querySelector('#mayhubPreviewTotal').value) || 10);
                const correct = Math.min(total, Math.max(0, Number(panel.querySelector('#mayhubPreviewCorrect').value) || 0));
                window.MayHubCertificates.showScored({ name, correct, total, category });
            } else if (preset.mode === 'memory') {
                window.MayHubCertificates.showParticipation({
                    name,
                    category,
                    gameTitle: certificateContext().gameTitle.replace(/ Memory Game$/, ' Memory Match Challenge'),
                    certificateTitle: 'Certificate of Memory Mastery',
                    awardLabel: preset.awardLabel,
                    tierClass: preset.tierClass,
                    metricLabel: 'Completed in',
                    metricValue: normalizeDuration(panel.querySelector('#mayhubPreviewDuration').value, preset.duration),
                    message: preset.message
                });
            } else {
                window.MayHubCertificates.showParticipation({ name, category });
            }
            status.textContent = '';
        } catch (error) {
            console.error('Certificate preview failed:', error);
            open();
            status.textContent = 'Preview unavailable: ' + (error?.message || 'Please try again.');
        } finally {
            button.disabled = false;
        }
    }

    function open() {
        const activePanel = createPanel();
        populatePanel();
        activePanel.style.display = 'flex';
        document.body.dataset.mayhubPreviewOpen = 'true';
        window.setTimeout(() => activePanel.querySelector('#mayhubPreviewPreset').focus(), 30);
    }

    function close() {
        if (!panel) return;
        panel.style.display = 'none';
        delete document.body.dataset.mayhubPreviewOpen;
    }

    function toggle() {
        if (panel && panel.style.display === 'flex') close();
        else open();
    }

    window.MayCertificatePreview = Object.freeze({
        version: VERSION,
        open,
        close,
        toggle,
        isAllowed: () => true
    });
})();
