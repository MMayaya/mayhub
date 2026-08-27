(function () {
    'use strict';

    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL('.', scriptUrl);
    const logoUrl = new URL('May Learning Hub Logo.png', siteRoot).href;
    let activeResult = null;
    let replayAction = null;
    let previousBodyOverflow = '';

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
        .mayhub-cert-message {
            max-width: 475px;
            margin: .35rem auto 0;
            color: var(--award-dark);
            font-size: .98rem;
            font-weight: 800;
            line-height: 1.45;
        }
        .mayhub-cert-detail {
            max-width: 470px;
            margin: .55rem auto 0;
            color: #536273;
            font-size: .82rem;
            line-height: 1.4;
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
        .mayhub-cert-footer-item { border-top: 1px solid #6f7d89; padding-top: .4rem; }
        .mayhub-cert-footer strong { display: block; color: #17324d; font-size: .9rem; }
        .mayhub-cert-signature { font-family: 'Segoe Script', 'Brush Script MT', cursive; font-size: 1.05rem !important; }
        .mayhub-cert-footer span {
            display: block;
            color: #637180;
            font-size: .72rem;
            letter-spacing: .06em;
            text-transform: uppercase;
        }
        .mayhub-cert-actions {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: .7rem;
            margin-top: 1rem;
        }
        .mayhub-cert-btn {
            border: none;
            border-radius: 10px;
            padding: .85rem 1.05rem;
            font-size: .95rem;
            font-weight: 850;
            cursor: pointer;
            box-shadow: 0 5px 14px rgba(0, 0, 0, .22);
        }
        .mayhub-cert-share { background: #25d366; color: #072d16; }
        .mayhub-cert-replay { background: #ffc107; color: #2f2500; }
        .mayhub-cert-close { background: #fff; color: #003f75; }
        .mayhub-cert-note { margin-top: .7rem; color: #e4eff9; font-size: .78rem; }
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
            .mayhub-cert-message { font-size: .76rem; }
            .mayhub-cert-detail { margin-top: .35rem; font-size: .68rem; }
            .mayhub-cert-footer { gap: .8rem; padding-top: .8rem; }
            .mayhub-cert-footer strong { font-size: .72rem; }
            .mayhub-cert-signature { font-size: .82rem !important; }
            .mayhub-cert-footer span { font-size: .58rem; }
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
                <p class="mayhub-cert-kicker">Grade 8 Social Sciences History</p>
                <h2 class="mayhub-cert-title" id="mayhubCertTitle">Certificate of Participation</h2>
                <p class="mayhub-cert-award" id="mayhubCertAward">May Learning Hub Participation Award</p>
                <p class="mayhub-cert-presented">This certificate is proudly presented to</p>
                <p class="mayhub-cert-name" id="mayhubCertName">Guest Learner</p>
                <p class="mayhub-cert-body" id="mayhubCertScoredBody">for completing <strong id="mayhubCertGame">The Berlin Conference</strong> in the <strong id="mayhubCertCategory">selected</strong> category.</p>
                <p class="mayhub-cert-body" id="mayhubCertParticipationBody" style="display: none;">for successful participation in the <strong id="mayhubCertParticipationCategory">selected</strong> activity on <strong id="mayhubCertTopic">The Berlin Conference</strong>.</p>
                <div class="mayhub-cert-score" id="mayhubCertScoreWrap">
                    <div><strong id="mayhubCertScore">0/10</strong><span>Correct</span></div>
                </div>
                <p class="mayhub-cert-message" id="mayhubCertMessage"></p>
                <p class="mayhub-cert-detail" id="mayhubCertDetail"></p>
                <div class="mayhub-cert-footer">
                    <div class="mayhub-cert-footer-item">
                        <strong id="mayhubCertDate"></strong>
                        <span>Date awarded</span>
                    </div>
                    <div class="mayhub-cert-footer-item">
                        <strong class="mayhub-cert-signature">May Learning Hub</strong>
                        <span>Signed by May Learning Hub</span>
                    </div>
                </div>
            </article>
            <div class="mayhub-cert-actions">
                <button class="mayhub-cert-btn mayhub-cert-share" id="mayhubCertShare" type="button">Share on WhatsApp</button>
                <button class="mayhub-cert-btn mayhub-cert-replay" id="mayhubCertReplay" type="button">Play Again</button>
                <button class="mayhub-cert-btn mayhub-cert-close" id="mayhubCertClose" type="button">Close</button>
            </div>
            <p class="mayhub-cert-note">WhatsApp will open its sharing screen. Choose <strong>My status</strong> or a contact.</p>
        </div>
    `;
    document.body.appendChild(overlay);

    const certificate = document.getElementById('mayhubCertificate');
    const scoreWrap = document.getElementById('mayhubCertScoreWrap');
    const shareButton = document.getElementById('mayhubCertShare');
    const replayButton = document.getElementById('mayhubCertReplay');
    const closeButton = document.getElementById('mayhubCertClose');

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

    function show(options) {
        const isParticipation = options.mode === 'participation';
        const learnerName = options.name?.trim() || getSignedInLearnerName();
        const total = Number(options.total) || 0;
        const correct = Math.max(0, Number(options.correct) || 0);
        const percentage = total > 0 ? (correct / total) * 100 : null;
        const award = isParticipation
            ? {
                className: 'tier-participation',
                title: 'Certificate of Participation',
                award: 'May Learning Hub Participation Award',
                message: options.message || 'Awarded in recognition of active participation.'
            }
            : getAward(percentage);
        const awardDate = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });

        activeResult = {
            name: learnerName,
            mode: isParticipation ? 'participation' : 'scored',
            gameTitle: options.gameTitle || 'The Berlin Conference',
            topic: options.topic || 'The Berlin Conference',
            category: options.category || 'Assessment Game',
            correct,
            total,
            percentage: percentage === null ? null : Math.round(percentage),
            award: award.award,
            date: awardDate,
            detail: options.detail || ''
        };
        replayAction = typeof options.onReplay === 'function' ? options.onReplay : null;

        certificate.className = 'mayhub-certificate ' + award.className;
        document.getElementById('mayhubCertTitle').textContent = award.title;
        document.getElementById('mayhubCertAward').textContent = award.award;
        document.getElementById('mayhubCertName').textContent = learnerName || 'Guest Learner';
        document.getElementById('mayhubCertGame').textContent = activeResult.gameTitle;
        document.getElementById('mayhubCertCategory').textContent = activeResult.category;
        document.getElementById('mayhubCertParticipationCategory').textContent = activeResult.category;
        document.getElementById('mayhubCertTopic').textContent = activeResult.topic;
        document.getElementById('mayhubCertScoredBody').style.display = isParticipation ? 'none' : 'block';
        document.getElementById('mayhubCertParticipationBody').style.display = isParticipation ? 'block' : 'none';
        document.getElementById('mayhubCertDate').textContent = awardDate;
        document.getElementById('mayhubCertMessage').textContent = award.message;
        document.getElementById('mayhubCertDetail').textContent = activeResult.detail;
        document.getElementById('mayhubCertDetail').style.display = activeResult.detail ? 'block' : 'none';
        scoreWrap.style.display = isParticipation ? 'none' : 'grid';
        document.getElementById('mayhubCertScore').textContent = correct + '/' + total;

        replayButton.style.display = replayAction ? 'inline-block' : 'none';
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'flex';
        setTimeout(() => shareButton.focus(), 50);

        if (window.MayHubSounds) {
            if (isParticipation) window.MayHubSounds.playPass?.();
            else if (percentage >= 50) window.MayHubSounds.playPass?.();
            else window.MayHubSounds.playFail?.();
        }
    }

    function hide() {
        overlay.style.display = 'none';
        document.body.style.overflow = previousBodyOverflow;
    }

    function requestShareName() {
        if (activeResult.name) return activeResult.name;
        const enteredName = window.prompt('Please enter your name and surname to include with your WhatsApp certificate:', '');
        if (enteredName === null) return '';
        const shareName = enteredName.trim();
        if (!shareName) {
            window.alert('Please enter your name and surname before sharing.');
            return '';
        }
        activeResult.name = shareName;
        document.getElementById('mayhubCertName').textContent = shareName;
        return shareName;
    }

    function share() {
        if (!activeResult) return;
        const shareName = requestShareName();
        if (!shareName) return;
        const lines = [
            '🏆 May Learning Hub Certificate',
            shareName,
            'Grade 8 Social Sciences History - The Berlin Conference',
            activeResult.award,
            activeResult.gameTitle + ' — ' + activeResult.category
        ];
        if (activeResult.mode === 'scored') {
            lines.push(activeResult.correct + '/' + activeResult.total + ' (' + activeResult.percentage + '%)');
        }
        if (activeResult.detail) lines.push(activeResult.detail);
        lines.push('Awarded: ' + activeResult.date, window.location.href);
        window.open('https://wa.me/?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener,noreferrer');
    }

    shareButton.addEventListener('click', share);
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
        hide
    };
})();
