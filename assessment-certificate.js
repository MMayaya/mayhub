(function () {
    'use strict';

    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL('.', scriptUrl);
    const logoUrl = new URL('May Learning Hub Logo.png', siteRoot).href;
    const signatureUrl = new URL('May Learning Hub Signature-transparent.png', siteRoot).href;
    const historyScriptUrl = new URL('may-certificate-history.js', siteRoot).href;
    const historyPageUrl = new URL('certificate-history.html', siteRoot).href;
    let activeResult = null;
    let replayAction = null;
    let previousBodyOverflow = '';
    let historyReadyPromise = null;

    function ensureHistoryHelper() {
        if (window.MayCertificateHistory) return Promise.resolve(window.MayCertificateHistory);
        if (historyReadyPromise) return historyReadyPromise;
        historyReadyPromise = new Promise(resolve => {
            const script = document.createElement('script');
            script.src = historyScriptUrl;
            script.onload = () => resolve(window.MayCertificateHistory || null);
            script.onerror = () => resolve(null);
            document.head.appendChild(script);
        });
        return historyReadyPromise;
    }

    const style = document.createElement('style');
    style.textContent = `
        .mayhub-cert-overlay {
            position: fixed;
            inset: 0;
            z-index: 5000;
            display: none;
            align-items: flex-start;
            justify-content: center;
            overflow-y: auto;
            padding: 1.5rem 0.75rem;
            background: rgba(7, 28, 51, 0.82);
            backdrop-filter: blur(5px);
        }
        .mayhub-cert-wrap {
            width: min(100%, 610px);
            text-align: center;
            animation: mayhubCertIn .55s ease both;
        }
        .mayhub-certificate {
            --award: #b87333;
            --award-dark: #6f3b16;
            --award-soft: #f7e8d8;
            position: relative;
            min-height: 780px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            color: #263442;
            background: linear-gradient(145deg, #fffdf7, var(--award-soft));
            border: 12px solid var(--award);
            outline: 3px double var(--award-dark);
            outline-offset: -20px;
            box-shadow: 0 22px 55px rgba(0, 0, 0, .36);
        }
        .mayhub-certificate::before,
        .mayhub-certificate::after {
            content: '';
            position: absolute;
            width: 130px;
            height: 130px;
            border: 3px solid var(--award);
            opacity: .35;
            transform: rotate(45deg);
        }
        .mayhub-certificate::before { top: -82px; left: -82px; }
        .mayhub-certificate::after { right: -82px; bottom: -82px; }
        .mayhub-certificate.tier-bronze { --award: #b87333; --award-dark: #6f3b16; --award-soft: #f7e8d8; }
        .mayhub-certificate.tier-silver { --award: #9aa6b2; --award-dark: #4e5a66; --award-soft: #edf1f4; }
        .mayhub-certificate.tier-gold { --award: #d4af37; --award-dark: #755b08; --award-soft: #fff6cf; }
        .mayhub-certificate.tier-platinum { --award: #c7d8e2; --award-dark: #165173; --award-soft: #eaf7ff; }
        .mayhub-certificate.tier-participation {
            --award: #1268ad;
            --award-dark: #003f75;
            --award-soft: #eef8ff;
            background: linear-gradient(155deg, #cfeaff 0%, #f3faff 30%, #fff 58%, #e8f6ff 100%);
        }
        .mayhub-cert-header {
            width: 100%;
            min-height: 120px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1rem;
            position: relative;
            z-index: 1;
        }
        .mayhub-cert-logo {
            display: block;
            width: 128px;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 4px 5px rgba(0, 0, 0, .13));
        }
        .mayhub-cert-trophy {
            font-size: 4rem;
            line-height: 1;
            filter: drop-shadow(0 6px 8px rgba(0, 0, 0, .22));
            animation: mayhubTrophyIn .9s ease both;
        }
        .mayhub-cert-kicker {
            color: var(--award-dark);
            font-size: .82rem;
            font-weight: 900;
            letter-spacing: .2em;
            text-transform: uppercase;
        }
        .mayhub-cert-title {
            margin: .35rem 0 .7rem;
            color: #17324d;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: clamp(2.1rem, 6vw, 3rem);
            line-height: 1.08;
        }
        .mayhub-cert-award {
            display: inline-block;
            margin-bottom: 1.2rem;
            padding: .38rem 1.1rem;
            color: var(--award-dark);
            background: rgba(255, 255, 255, .62);
            border: 2px solid var(--award);
            border-radius: 999px;
            font-size: .82rem;
            font-weight: 900;
            letter-spacing: .08em;
            text-transform: uppercase;
        }
        .mayhub-cert-presented {
            color: #536273;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1rem;
            font-style: italic;
        }
        .mayhub-cert-name {
            width: 88%;
            margin: .45rem auto .8rem;
            padding-bottom: .35rem;
            color: #17324d;
            border-bottom: 2px solid var(--award);
            font-family: Georgia, 'Times New Roman', serif;
            font-size: clamp(1.65rem, 5vw, 2.35rem);
            font-weight: 700;
            font-style: italic;
        }
        .mayhub-cert-body {
            max-width: 455px;
            margin: 0 auto;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1rem;
            line-height: 1.65;
        }
        .mayhub-cert-score {
            width: 138px;
            height: 138px;
            flex: 0 0 auto;
            margin: 1.15rem auto .8rem;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: var(--award-dark);
            background: #fff;
            border: 9px double var(--award);
            box-shadow: 0 8px 20px rgba(0, 0, 0, .16);
        }
        .mayhub-cert-score strong { display: block; font-size: 2.55rem; line-height: 1; }
        .mayhub-cert-score span {
            display: block;
            margin-top: .25rem;
            font-size: .78rem;
            font-weight: 900;
            letter-spacing: .08em;
            text-transform: uppercase;
        }
        .mayhub-cert-metric {
            display: none;
            min-width: 245px;
            margin: 1rem auto .55rem;
            padding: .7rem 1.7rem .8rem;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 3px solid var(--award);
            border-radius: 18px;
            color: #fff;
            background: linear-gradient(145deg, #10263e, var(--award-dark));
            box-shadow: inset 0 0 0 2px rgba(255, 255, 255, .12), 0 10px 24px rgba(16, 38, 62, .24);
        }
        .mayhub-cert-metric-label {
            color: #d9efff;
            font-size: .68rem;
            font-weight: 900;
            letter-spacing: .24em;
            text-transform: uppercase;
        }
        .mayhub-cert-metric-value {
            margin-top: .12rem;
            font-family: Consolas, 'SFMono-Regular', 'Courier New', monospace;
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1;
            letter-spacing: .12em;
            font-variant-numeric: tabular-nums;
            text-shadow: 0 0 14px rgba(152, 225, 255, .48);
        }
        .mayhub-cert-metric-units {
            display: none;
            grid-template-columns: minmax(78px, 1fr) auto minmax(78px, 1fr);
            align-items: start;
            gap: .55rem;
            margin-top: .35rem;
        }
        .mayhub-cert-metric.is-split-duration { min-width: 330px; }
        .mayhub-cert-metric.is-split-duration .mayhub-cert-metric-value { display: none; }
        .mayhub-cert-metric.is-split-duration .mayhub-cert-metric-units { display: grid; }
        .mayhub-cert-metric-unit strong,
        .mayhub-cert-metric-separator {
            display: block;
            color: #fff;
            font-family: Consolas, 'SFMono-Regular', 'Courier New', monospace;
            font-size: 2.35rem;
            font-weight: 800;
            line-height: 1;
            font-variant-numeric: tabular-nums;
            text-shadow: 0 0 14px rgba(152, 225, 255, .48);
        }
        .mayhub-cert-metric-unit span {
            display: block;
            margin-top: .28rem;
            color: #d9efff;
            font-size: .62rem;
            font-weight: 900;
            letter-spacing: .12em;
            text-transform: uppercase;
        }
        .mayhub-cert-metric-separator { padding-top: .02rem; }
        .mayhub-cert-message {
            max-width: 475px;
            margin: .35rem auto 0;
            color: var(--award-dark);
            font-size: .98rem;
            font-weight: 800;
            line-height: 1.45;
        }
        .mayhub-cert-footer {
            width: 100%;
            margin-top: auto;
            padding-top: 1.4rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            align-items: end;
        }
        .mayhub-cert-footer-item { padding-top: .4rem; }
        .mayhub-cert-footer strong {
            display: block;
            padding-bottom: .35rem;
            color: #17324d;
            border-bottom: 1px solid #6f7d89;
            font-size: .9rem;
        }
        .mayhub-cert-signature {
            font-family: 'Segoe Script', 'Brush Script MT', cursive;
            font-size: 1.05rem !important;
        }
        .mayhub-cert-signature-text { font-style: normal; }
        .mayhub-cert-signature-image {
            display: none;
            width: min(100%, 220px);
            height: 45px;
            object-fit: contain;
            object-position: center bottom;
        }
        .mayhub-cert-footer span {
            display: block;
            margin-top: .35rem;
            color: #637180;
            font-size: .72rem;
            letter-spacing: .06em;
            text-transform: uppercase;
        }
        .mayhub-cert-site-line {
            margin-top: .8rem;
            color: var(--award-dark);
            font-size: .78rem;
            font-weight: 800;
        }
        .mayhub-cert-term-line {
            display: none;
            margin: .72rem 0 -.35rem;
            color: #96a1ad;
            font-size: .7rem;
            font-weight: 700;
            letter-spacing: .18em;
            text-transform: uppercase;
        }
        body[data-certificate-layout="compact-subject"] .mayhub-cert-signature {
            min-height: 52px;
            padding-bottom: 0;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            font-size: 1rem !important;
            font-weight: 400;
        }
        body[data-certificate-layout="compact-subject"] .mayhub-cert-signature-text { display: none; }
        body[data-certificate-layout="compact-subject"] .mayhub-cert-signature-image { display: block; }
        .mayhub-cert-actions {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: .7rem;
            margin-top: 1rem;
        }
        .mayhub-cert-history-row {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: .45rem .8rem;
            margin-top: .8rem;
            font-size: .9rem;
        }
        .mayhub-cert-history-link {
            color: #fff;
            font-weight: 850;
            text-underline-offset: 3px;
        }
        .mayhub-cert-history-note { color: #e0ebf7; }
        .mayhub-cert-btn {
            border: none;
            border-radius: 10px;
            padding: .85rem 1.05rem;
            font-size: .95rem;
            font-weight: 850;
            cursor: pointer;
            box-shadow: 0 5px 14px rgba(0, 0, 0, .22);
        }
        .mayhub-cert-btn:disabled { cursor: wait; opacity: .72; }
        .mayhub-cert-share { background: #25d366; color: #072d16; }
        .mayhub-cert-download { background: #1976d2; color: #fff; }
        .mayhub-cert-replay { background: #ffc107; color: #2f2500; }
        .mayhub-cert-close { background: #fff; color: #003f75; }
        .mayhub-cert-note { margin-top: .7rem; color: #e4eff9; font-size: .78rem; }
        .mayhub-cert-status {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        @keyframes mayhubCertIn {
            from { opacity: 0; transform: translateY(24px) scale(.97); }
            to { opacity: 1; transform: none; }
        }
        @keyframes mayhubTrophyIn {
            0% { transform: scale(.5) rotate(-10deg); }
            65% { transform: scale(1.12) rotate(5deg); }
            100% { transform: scale(1); }
        }
        @media (max-width: 600px) {
            .mayhub-cert-overlay { padding: .55rem .35rem 1rem; }
            .mayhub-certificate { min-height: 610px; padding: 1.15rem .9rem; border-width: 8px; outline-offset: -14px; }
            .mayhub-cert-header { min-height: 78px; }
            .mayhub-cert-logo { width: 82px; }
            .mayhub-cert-trophy { font-size: 2.7rem; }
            .mayhub-cert-kicker { font-size: .66rem; letter-spacing: .12em; }
            .mayhub-cert-title { margin-bottom: .45rem; font-size: 1.75rem; }
            .mayhub-cert-award { margin-bottom: .65rem; padding: .3rem .75rem; font-size: .65rem; }
            .mayhub-cert-presented { font-size: .82rem; }
            .mayhub-cert-name { margin: .25rem auto .5rem; font-size: 1.35rem; }
            .mayhub-cert-body { font-size: .79rem; line-height: 1.45; }
            .mayhub-cert-score { width: 104px; height: 104px; margin: .65rem auto .5rem; border-width: 6px; }
            .mayhub-cert-score strong { font-size: 1.9rem; }
            .mayhub-cert-score span { font-size: .63rem; }
            .mayhub-cert-metric { min-width: 195px; margin: .65rem auto .35rem; padding: .55rem 1rem .65rem; border-radius: 14px; }
            .mayhub-cert-metric-label { font-size: .55rem; }
            .mayhub-cert-metric-value { font-size: 1.85rem; }
            .mayhub-cert-metric.is-split-duration { min-width: 250px; }
            .mayhub-cert-metric-unit strong,
            .mayhub-cert-metric-separator { font-size: 1.75rem; }
            .mayhub-cert-metric-unit span { font-size: .52rem; }
            .mayhub-cert-message { font-size: .76rem; }
            .mayhub-cert-footer { gap: .8rem; padding-top: .8rem; }
            .mayhub-cert-footer strong { font-size: .72rem; }
            .mayhub-cert-signature { font-size: .82rem !important; }
            .mayhub-cert-signature-image { width: min(100%, 150px); height: 36px; }
            .mayhub-cert-footer span { font-size: .58rem; }
            .mayhub-cert-term-line { margin-top: .55rem; font-size: .58rem; }
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('section');
    overlay.className = 'mayhub-cert-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mayhubCertTitle');
    overlay.innerHTML = `
        <div class="mayhub-cert-wrap">
            <article class="mayhub-certificate tier-participation" id="mayhubCertificate">
                <header class="mayhub-cert-header">
                    <img class="mayhub-cert-logo" src="${logoUrl}" alt="May Learning Hub">
                    <span class="mayhub-cert-trophy" aria-hidden="true">🏆</span>
                </header>
                <p class="mayhub-cert-kicker" id="mayhubCertKicker">May Learning Hub Assessment</p>
                <h2 class="mayhub-cert-title" id="mayhubCertTitle">Certificate of Participation</h2>
                <p class="mayhub-cert-award" id="mayhubCertAward">May Learning Hub Participation Award</p>
                <p class="mayhub-cert-presented">This certificate is proudly presented to</p>
                <p class="mayhub-cert-name" id="mayhubCertName">Guest Learner</p>
                <p class="mayhub-cert-body" id="mayhubCertScoredBody">for completing <strong id="mayhubCertGame">the assessment game</strong> in the <strong id="mayhubCertCategory">selected</strong> category.</p>
                <p class="mayhub-cert-body" id="mayhubCertParticipationBody" style="display: none;">for successful participation in the <strong id="mayhubCertParticipationCategory">selected</strong> activity on <strong id="mayhubCertTopic">the selected topic</strong>.</p>
                <div class="mayhub-cert-score" id="mayhubCertScoreWrap">
                    <div><strong id="mayhubCertScore">0/10</strong><span>Correct</span></div>
                </div>
                <div class="mayhub-cert-metric" id="mayhubCertMetric">
                    <span class="mayhub-cert-metric-label" id="mayhubCertMetricLabel">Completed in</span>
                    <strong class="mayhub-cert-metric-value" id="mayhubCertMetricValue">00:00</strong>
                    <div class="mayhub-cert-metric-units" id="mayhubCertMetricUnits">
                        <div class="mayhub-cert-metric-unit"><strong id="mayhubCertMetricMinutes">00</strong><span>Minutes</span></div>
                        <span class="mayhub-cert-metric-separator" aria-hidden="true">:</span>
                        <div class="mayhub-cert-metric-unit"><strong id="mayhubCertMetricSeconds">00</strong><span>Seconds</span></div>
                    </div>
                </div>
                <p class="mayhub-cert-message" id="mayhubCertMessage"></p>
                <div class="mayhub-cert-footer">
                    <div class="mayhub-cert-footer-item">
                        <strong id="mayhubCertDate"></strong>
                        <span>Date awarded</span>
                    </div>
                    <div class="mayhub-cert-footer-item">
                        <strong class="mayhub-cert-signature">
                            <em class="mayhub-cert-signature-text">May Learning Hub</em>
                            <img class="mayhub-cert-signature-image" src="${signatureUrl}" alt="M Learning Hub signature">
                        </strong>
                        <span>Signed by May Learning Hub</span>
                    </div>
                </div>
                <p class="mayhub-cert-term-line" id="mayhubCertTerm"></p>
                <p class="mayhub-cert-site-line">Get your certificate at www.maylearninghub.co.za</p>
            </article>
            <div class="mayhub-cert-actions">
                <button class="mayhub-cert-btn mayhub-cert-share" id="mayhubCertShare" type="button">Share Certificate on WhatsApp</button>
                <button class="mayhub-cert-btn mayhub-cert-download" id="mayhubCertDownload" type="button">Download Certificate</button>
                <button class="mayhub-cert-btn mayhub-cert-replay" id="mayhubCertReplay" type="button">Play Again</button>
                <button class="mayhub-cert-btn mayhub-cert-close" id="mayhubCertClose" type="button">Close</button>
            </div>
            <div class="mayhub-cert-history-row">
                <a class="mayhub-cert-history-link" id="mayhubCertHistoryLink" href="${historyPageUrl}">My Certificates</a>
                <span class="mayhub-cert-history-note" id="mayhubCertHistoryNote"></span>
            </div>
            <p class="mayhub-cert-note">WhatsApp will open its sharing screen. Choose <strong>My status</strong> or a contact.</p>
            <p class="mayhub-cert-status" id="mayhubCertStatus" aria-live="polite"></p>
        </div>
    `;
    document.body.appendChild(overlay);

    const certificate = document.getElementById('mayhubCertificate');
    const scoreWrap = document.getElementById('mayhubCertScoreWrap');
    const shareButton = document.getElementById('mayhubCertShare');
    const downloadButton = document.getElementById('mayhubCertDownload');
    const replayButton = document.getElementById('mayhubCertReplay');
    const closeButton = document.getElementById('mayhubCertClose');
    const statusRegion = document.getElementById('mayhubCertStatus');
    const historyLink = document.getElementById('mayhubCertHistoryLink');
    const historyNote = document.getElementById('mayhubCertHistoryNote');

    function getSignedInLearnerName() {
        for (const storage of [window.localStorage, window.sessionStorage]) {
            try {
                const saved = JSON.parse(storage.getItem('mayhubActivityAccess') || 'null');
                const fullName = saved?.profile?.fullName?.trim();
                if (fullName) return fullName;
                if (saved?.email) return saved.email.split('@')[0];
            } catch {}
        }
        return '';
    }

    function getCertificateContext(options) {
        const data = document.body.dataset;
        return {
            grade: options.grade || data.certificateGrade || '',
            subject: options.subject || data.certificateSubject || '',
            term: options.term || data.certificateTerm || '',
            layout: options.layout || data.certificateLayout || 'standard',
            topic: options.topic || data.certificateTopic || 'Assessment Activity',
            gameTitle: options.gameTitle || data.certificateGame || 'Assessment Game'
        };
    }

    function getAward(percentage) {
        if (percentage === 100) {
            return {
                className: 'tier-platinum',
                title: 'Certificate of Excellence',
                award: 'Platinum Perfect Score Award',
                message: 'PERFECT SCORE — Exceptional work! You mastered every question in this challenge.'
            };
        }
        if (percentage >= 80) {
            return {
                className: 'tier-gold',
                title: 'Certificate of Distinction',
                award: 'Gold Distinction Award',
                message: 'DISTINCTION — Excellent work! You have an impressive understanding of this topic.'
            };
        }
        if (percentage >= 50) {
            return {
                className: 'tier-silver',
                title: 'Certificate of Achievement',
                award: 'Silver Pass Award',
                message: 'PASS — Well done! You passed the challenge. Keep practising to reach a distinction.'
            };
        }
        return {
            className: 'tier-bronze',
            title: 'Certificate of Perseverance',
            award: 'Bronze Progress Award',
            message: 'NOT YET PASSED — Do not give up. Review the answers, try again, and aim for at least 50%.'
        };
    }

    function createCompletionId(options, context, issuedAt) {
        if (options.completionId) return String(options.completionId).slice(0, 160);
        const signature = [location.pathname, context.gameTitle, options.category || 'Assessment Game', options.correct || 0, options.total || 0].join('|');
        try {
            const cached = JSON.parse(sessionStorage.getItem('mayhubLastCertificateCompletion') || 'null');
            if (cached?.signature === signature && issuedAt.getTime() - Number(cached.createdAt) < 300000) return cached.id;
        } catch {}
        const id = window.crypto?.randomUUID
            ? window.crypto.randomUUID()
            : 'cert-' + Date.now().toString(36) + '-' + Array.from(crypto.getRandomValues(new Uint32Array(3)), value => value.toString(36)).join('');
        try {
            sessionStorage.setItem('mayhubLastCertificateCompletion', JSON.stringify({ signature, id, createdAt: issuedAt.getTime() }));
        } catch {}
        return id;
    }

    async function updateHistory(options, result) {
        const helper = await ensureHistoryHelper();
        if (!helper || !result) return;
        if (!helper.isSignedIn()) {
            if (activeResult === result) {
                historyLink.textContent = 'Sign in to save certificate history';
                historyLink.href = new URL('signin.html?redirect=' + encodeURIComponent('/certificate-history.html') + '&notice=certificates', siteRoot).href;
                historyNote.textContent = 'Sign in to see your certificate history.';
            }
            return;
        }
        if (activeResult === result) {
            historyLink.textContent = 'My Certificates';
            historyLink.href = historyPageUrl;
            historyNote.textContent = options.skipHistoryRecord ? 'Opened from your history.' : 'Saved to your certificate history.';
        }
        if (!options.skipHistoryRecord) helper.record(result);
    }

    function show(options) {
        options = options || {};
        const isParticipation = options.mode === 'participation';
        const context = getCertificateContext(options);
        const learnerName = options.name?.trim() || getSignedInLearnerName();
        const total = Number(options.total) || 0;
        const correct = Math.max(0, Number(options.correct) || 0);
        const percentage = total > 0 ? (correct / total) * 100 : null;
        const award = isParticipation
            ? {
                className: /^tier-(?:bronze|silver|gold|platinum|participation)$/.test(options.tierClass || '')
                    ? options.tierClass
                    : 'tier-participation',
                title: options.certificateTitle || 'Certificate of Participation',
                award: options.awardLabel || 'May Learning Hub Participation Award',
                message: options.message || 'Awarded in recognition of active participation.'
            }
            : getAward(percentage);
        const issuedAt = options.issuedAt ? new Date(options.issuedAt) : new Date();
        const safeIssuedAt = Number.isNaN(issuedAt.getTime()) ? new Date() : issuedAt;
        const awardDate = options.date || safeIssuedAt.toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });

        activeResult = {
            completionId: createCompletionId(options, context, safeIssuedAt),
            name: learnerName,
            learnerName,
            mode: isParticipation ? 'participation' : 'scored',
            grade: context.grade,
            subject: context.subject,
            term: context.term,
            layout: context.layout,
            gameTitle: context.gameTitle,
            topic: context.topic,
            category: options.category || 'Assessment Game',
            categoryTitle: options.category || 'Assessment Game',
            subjectLine: [context.grade, context.subject].filter(Boolean).join(' '),
            termLabel: context.term,
            correct,
            total,
            percentage: percentage === null ? null : Math.round(percentage),
            title: award.title,
            certificateTitle: award.title,
            award: award.award,
            awardTitle: award.award,
            message: award.message,
            tierClass: award.className,
            metricLabel: String(options.metricLabel || '').trim(),
            metricValue: String(options.metricValue || '').trim(),
            metricStyle: options.metricStyle === 'split-duration' ? 'split-duration' : '',
            date: awardDate,
            issuedAt: safeIssuedAt.toISOString(),
            shareUrl: location.href
        };
        replayAction = typeof options.onReplay === 'function' ? options.onReplay : null;

        certificate.className = 'mayhub-certificate ' + award.className;
        document.getElementById('mayhubCertTitle').textContent = award.title;
        document.getElementById('mayhubCertAward').textContent = award.award;
        const kickerParts = context.layout === 'compact-subject'
            ? [context.grade, context.subject]
            : [context.grade, context.subject, context.term];
        document.getElementById('mayhubCertKicker').textContent = kickerParts.filter(Boolean).join(context.layout === 'compact-subject' ? ' ' : ' • ') || 'May Learning Hub Assessment';
        const termLine = document.getElementById('mayhubCertTerm');
        termLine.textContent = context.term;
        termLine.style.display = context.layout === 'compact-subject' && context.term ? 'block' : 'none';
        document.getElementById('mayhubCertName').textContent = learnerName || 'Guest Learner';
        document.getElementById('mayhubCertGame').textContent = activeResult.gameTitle;
        document.getElementById('mayhubCertCategory').textContent = activeResult.category;
        document.getElementById('mayhubCertParticipationCategory').textContent = activeResult.category;
        document.getElementById('mayhubCertTopic').textContent = activeResult.topic;
        document.getElementById('mayhubCertScoredBody').style.display = isParticipation ? 'none' : 'block';
        document.getElementById('mayhubCertParticipationBody').style.display = isParticipation ? 'block' : 'none';
        document.getElementById('mayhubCertDate').textContent = awardDate;
        document.getElementById('mayhubCertMessage').textContent = award.message;
        scoreWrap.style.display = isParticipation ? 'none' : 'grid';
        document.getElementById('mayhubCertScore').textContent = correct + '/' + total;
        const metric = document.getElementById('mayhubCertMetric');
        const hasMetric = Boolean(activeResult.metricValue);
        const durationMatch = activeResult.metricValue.match(/^(\d{1,2}):([0-5]\d)$/);
        const useSplitDuration = activeResult.metricStyle === 'split-duration' && Boolean(durationMatch);
        metric.style.display = hasMetric ? 'flex' : 'none';
        metric.classList.toggle('is-split-duration', useSplitDuration);
        document.getElementById('mayhubCertMetricLabel').textContent = activeResult.metricLabel || 'Completed in';
        document.getElementById('mayhubCertMetricValue').textContent = activeResult.metricValue;
        document.getElementById('mayhubCertMetricMinutes').textContent = useSplitDuration ? durationMatch[1].padStart(2, '0') : '00';
        document.getElementById('mayhubCertMetricSeconds').textContent = useSplitDuration ? durationMatch[2] : '00';

        replayButton.style.display = replayAction ? 'inline-block' : 'none';
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'flex';
        historyLink.textContent = 'My Certificates';
        historyLink.href = historyPageUrl;
        historyNote.textContent = 'Checking certificate history…';
        updateHistory(options, activeResult);
        setTimeout(() => shareButton.focus(), 50);

        if (options.playSound !== false && window.MayHubSounds) {
            if (isParticipation) window.MayHubSounds.playPass?.();
            else if (percentage >= 50) window.MayHubSounds.playPass?.();
            else window.MayHubSounds.playFail?.();
        }
    }

    function hide() {
        overlay.style.display = 'none';
        document.body.style.overflow = previousBodyOverflow;
    }

    function requestCertificateName(promptMessage) {
        if (activeResult.name) return activeResult.name;
        const enteredName = window.prompt(promptMessage, '');
        if (enteredName === null) return '';
        const learnerName = enteredName.trim();
        if (!learnerName) {
            window.alert('Please enter your name and surname to continue.');
            return '';
        }
        activeResult.name = learnerName;
        document.getElementById('mayhubCertName').textContent = learnerName;
        return learnerName;
    }

    function setActionBusy(button, busy, busyLabel) {
        if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.textContent;
        button.disabled = busy;
        button.textContent = busy ? busyLabel : button.dataset.defaultLabel;
    }

    function announce(message) {
        statusRegion.textContent = '';
        window.setTimeout(() => { statusRegion.textContent = message; }, 20);
    }

    function buildShareMessage() {
        return '🏆 I earned my May Learning Hub certificate!\nGet yours: https://www.maylearninghub.co.za';
    }

    async function createCertificateImage(learnerName) {
        if (!window.MayCertificateRenderer) {
            throw new Error('The certificate renderer is unavailable.');
        }
        return window.MayCertificateRenderer.create({
            ...activeResult,
            learnerName
        });
    }


    async function share() {
        if (!activeResult) return;
        const learnerName = requestCertificateName('Please enter your name and surname for the certificate:');
        if (!learnerName) return;
        const shareText = buildShareMessage();
        setActionBusy(shareButton, true, 'Preparing Certificate...');
        try {
            if (!window.MayCertificateActions) throw new Error('The certificate helper is unavailable.');
            const image = await createCertificateImage(learnerName);
            const outcome = await window.MayCertificateActions.share({
                blob: image.blob,
                fileName: image.fileName,
                mimeType: 'image/png',
                shareText,
                fallbackUrl: 'https://wa.me/?text=' + encodeURIComponent(shareText),
                fallbackMessage: 'Your certificate image has been downloaded. WhatsApp will now open; attach it and choose My status or a contact.'
            });
            if (outcome.mode === 'modern-native' || outcome.mode === 'legacy-native') {
                announce('Choose WhatsApp, then select My status or a contact.');
            } else if (outcome.mode === 'browser-file-share') {
                announce('Certificate image shared successfully.');
            } else if (outcome.mode === 'cancelled') {
                announce('Certificate sharing cancelled.');
            } else {
                announce('Certificate prepared for WhatsApp sharing.');
            }
        } catch (error) {
            console.error('Certificate sharing failed:', error);
            window.alert(error && error.code === 'native_timeout'
                ? 'The Android app did not confirm the sharing request. Please try once more.'
                : 'The certificate image could not be prepared. Please try again.');
        } finally {
            setActionBusy(shareButton, false, '');
        }
    }

    async function download() {
        if (!activeResult) return;
        const learnerName = requestCertificateName('Please enter your name and surname for the downloadable certificate:');
        if (!learnerName) return;
        setActionBusy(downloadButton, true, 'Preparing Download...');
        try {
            if (!window.MayCertificateActions) throw new Error('The certificate helper is unavailable.');
            const image = await createCertificateImage(learnerName);
            const outcome = await window.MayCertificateActions.save({
                blob: image.blob,
                fileName: image.fileName,
                mimeType: 'image/png'
            });
            if (outcome.mode === 'modern-native') announce('Certificate sent to the Android app for saving.');
            else if (outcome.mode === 'legacy-native') announce('Certificate sent to the app for saving.');
            else if (outcome.mode === 'same-site-download') announce('Certificate download started in the app.');
            else announce('Certificate downloaded as a PNG image.');
        } catch (error) {
            console.error('Certificate download failed:', error);
            window.alert(error && error.code === 'native_timeout'
                ? 'The Android app did not confirm the save request. Please try once more.'
                : 'The certificate could not be downloaded on this browser. Please try again.');
        } finally {
            setActionBusy(downloadButton, false, '');
        }
    }

    function showSaved(record) {
        if (!record) return;
        show({
            mode: record.mode,
            name: record.learnerName,
            certificateTitle: record.certificateTitle,
            awardLabel: record.awardTitle,
            message: record.message,
            tierClass: record.tierClass,
            gameTitle: record.gameTitle,
            topic: record.topic || record.gameTitle,
            layout: record.layout,
            category: record.categoryTitle,
            grade: record.grade || '',
            subject: record.subject || '',
            term: record.termLabel,
            correct: record.correct,
            total: record.total,
            metricLabel: record.metricLabel,
            metricValue: record.metricValue,
            metricStyle: /^\d{1,2}:[0-5]\d$/.test(String(record.metricValue || '')) ? 'split-duration' : '',
            date: record.date,
            issuedAt: record.issuedAt,
            completionId: record.completionId,
            skipHistoryRecord: true
        });
    }

    shareButton.addEventListener('click', share);
    downloadButton.addEventListener('click', download);
    closeButton.addEventListener('click', hide);
    replayButton.addEventListener('click', () => {
        const action = replayAction;
        hide();
        if (action) action();
    });
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape' && overlay.style.display === 'flex') hide();
    });

    window.MayHubCertificates = {
        showScored: options => show({ ...options, mode: 'scored' }),
        showParticipation: options => show({ ...options, mode: 'participation' }),
        showSaved,
        hide
    };
})();
