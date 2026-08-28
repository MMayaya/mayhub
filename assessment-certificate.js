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
        .mayhub-cert-footer-item { padding-top: .4rem; }
        .mayhub-cert-footer strong {
            display: block;
            padding-bottom: .35rem;
            color: #17324d;
            border-bottom: 1px solid #6f7d89;
            font-size: .9rem;
        }
        .mayhub-cert-signature { font-family: 'Segoe Script', 'Brush Script MT', cursive; font-size: 1.05rem !important; }
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
                <p class="mayhub-cert-site-line">Get your certificate at www.maylearninghub.co.za</p>
            </article>
            <div class="mayhub-cert-actions">
                <button class="mayhub-cert-btn mayhub-cert-share" id="mayhubCertShare" type="button">Share Certificate on WhatsApp</button>
                <button class="mayhub-cert-btn mayhub-cert-download" id="mayhubCertDownload" type="button">Download Certificate</button>
                <button class="mayhub-cert-btn mayhub-cert-replay" id="mayhubCertReplay" type="button">Play Again</button>
                <button class="mayhub-cert-btn mayhub-cert-close" id="mayhubCertClose" type="button">Close</button>
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
            title: award.title,
            award: award.award,
            message: award.message,
            tierClass: award.className,
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

    function certificatePalette(result) {
        const palettes = {
            'tier-bronze': { main: '#b87333', dark: '#6f3b16', soft: '#f7e8d8' },
            'tier-silver': { main: '#9aa6b2', dark: '#4e5a66', soft: '#edf1f4' },
            'tier-gold': { main: '#d4af37', dark: '#755b08', soft: '#fff6cf' },
            'tier-platinum': { main: '#c7d8e2', dark: '#165173', soft: '#eaf7ff' },
            'tier-participation': { main: '#1268ad', dark: '#003f75', soft: '#d9efff' }
        };
        return palettes[result.tierClass] || palettes['tier-bronze'];
    }

    function drawCenteredWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
        const words = String(text).split(/\s+/);
        const lines = [];
        let line = '';
        words.forEach(word => {
            const testLine = line ? line + ' ' + word : word;
            if (ctx.measureText(testLine).width > maxWidth && line) {
                lines.push(line);
                line = word;
            } else {
                line = testLine;
            }
        });
        if (line) lines.push(line);
        lines.slice(0, maxLines).forEach((lineText, index) => ctx.fillText(lineText, x, y + (index * lineHeight)));
        return y + (Math.min(lines.length, maxLines) * lineHeight);
    }

    function loadCertificateLogo() {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null);
            image.crossOrigin = 'anonymous';
            image.src = logoUrl;
        });
    }

    function drawCertificateBrandFallback(ctx, palette) {
        ctx.save();
        ctx.fillStyle = '#0b4f8a';
        ctx.strokeStyle = palette.dark;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(275, 100);
        ctx.lineTo(275, 205);
        ctx.quadraticCurveTo(188, 270, 100, 205);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 27px "Segoe UI", sans-serif';
        ctx.fillText('May Learning', 188, 145);
        ctx.font = 'bold 31px "Segoe UI", sans-serif';
        ctx.fillText('Hub', 188, 184);
        ctx.restore();
    }

    function canvasToPngBlob(canvas) {
        return new Promise((resolve, reject) => {
            try {
                canvas.toBlob(blob => {
                    if (blob) resolve(blob);
                    else reject(new Error('The browser returned an empty certificate image.'));
                }, 'image/png');
            } catch (error) {
                reject(error);
            }
        });
    }

    async function createCertificateImage(learnerName, includeExternalLogo = true) {
        if (!activeResult) throw new Error('No completed result is available.');
        const result = activeResult;
        const participation = result.mode === 'participation';
        const palette = certificatePalette(result);
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1697;
        const ctx = canvas.getContext('2d');
        const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        background.addColorStop(0, participation ? palette.soft : '#fffdf7');
        background.addColorStop(0.5, '#ffffff');
        background.addColorStop(1, palette.soft);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 30;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        ctx.strokeStyle = palette.dark;
        ctx.lineWidth = 5;
        ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);
        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 2;
        ctx.strokeRect(82, 82, canvas.width - 164, canvas.height - 164);

        const canUseExternalLogo = includeExternalLogo && window.location.protocol !== 'file:';
        const logo = canUseExternalLogo ? await loadCertificateLogo() : null;
        if (logo) ctx.drawImage(logo, 95, 85, 200, 200);
        else drawCertificateBrandFallback(ctx, palette);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '94px "Segoe UI Emoji", sans-serif';
        ctx.fillText('🏆', 1010, 175);

        ctx.fillStyle = palette.dark;
        ctx.font = 'bold 25px "Segoe UI", sans-serif';
        ctx.fillText('GRADE 8 SOCIAL SCIENCES HISTORY', 600, 285);
        ctx.fillStyle = '#17324d';
        ctx.font = 'bold 62px Georgia, serif';
        let nextY = drawCenteredWrappedText(ctx, result.title, 600, 370, 900, 72, 2);

        ctx.fillStyle = palette.soft;
        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 4;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(250, nextY + 10, 700, 66, 33);
        else ctx.rect(250, nextY + 10, 700, 66);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = palette.dark;
        ctx.font = 'bold 24px "Segoe UI", sans-serif';
        ctx.fillText(result.award.toUpperCase(), 600, nextY + 43);

        nextY += 135;
        ctx.fillStyle = '#536273';
        ctx.font = 'italic 28px Georgia, serif';
        ctx.fillText('This certificate is proudly presented to', 600, nextY);
        nextY += 72;
        ctx.fillStyle = '#17324d';
        ctx.font = 'bold italic 49px Georgia, serif';
        nextY = drawCenteredWrappedText(ctx, learnerName, 600, nextY, 850, 58, 2);
        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(205, nextY + 4);
        ctx.lineTo(995, nextY + 4);
        ctx.stroke();

        nextY += 70;
        ctx.fillStyle = '#263442';
        ctx.font = '29px Georgia, serif';
        const bodyText = participation
            ? 'for successful participation in the ' + result.category + ' activity on ' + result.topic + '.'
            : 'for completing ' + result.gameTitle + ' in the ' + result.category + ' category.';
        nextY = drawCenteredWrappedText(ctx, bodyText, 600, nextY, 840, 43, 4);

        if (!participation) {
            const sealY = Math.max(nextY + 115, 900);
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = palette.main;
            ctx.lineWidth = 18;
            ctx.beginPath();
            ctx.arc(600, sealY, 112, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = palette.dark;
            ctx.font = 'bold 62px "Segoe UI", sans-serif';
            ctx.fillText(result.correct + '/' + result.total, 600, sealY - 10);
            ctx.font = 'bold 20px "Segoe UI", sans-serif';
            ctx.fillText('CORRECT', 600, sealY + 54);
            nextY = sealY + 160;
        } else {
            nextY += 70;
        }

        ctx.fillStyle = palette.dark;
        ctx.font = 'bold 27px "Segoe UI", sans-serif';
        nextY = drawCenteredWrappedText(ctx, result.message, 600, nextY, 850, 40, 4);
        if (result.detail) {
            ctx.fillStyle = '#536273';
            ctx.font = '22px "Segoe UI", sans-serif';
            drawCenteredWrappedText(ctx, result.detail, 600, nextY + 15, 820, 34, 2);
        }

        const footerY = 1450;
        ctx.strokeStyle = '#6f7d89';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(150, footerY);
        ctx.lineTo(500, footerY);
        ctx.moveTo(700, footerY);
        ctx.lineTo(1050, footerY);
        ctx.stroke();
        ctx.fillStyle = '#17324d';
        ctx.font = 'bold 25px "Segoe UI", sans-serif';
        ctx.fillText(result.date, 325, footerY - 34);
        ctx.font = 'italic 29px "Segoe Script", cursive';
        ctx.fillText('May Learning Hub', 875, footerY - 34);
        ctx.fillStyle = '#637180';
        ctx.font = '18px "Segoe UI", sans-serif';
        ctx.fillText('DATE AWARDED', 325, footerY + 36);
        ctx.fillText('SIGNED BY MAY LEARNING HUB', 875, footerY + 36);
        ctx.fillStyle = palette.dark;
        ctx.font = 'bold 20px "Segoe UI", sans-serif';
        ctx.fillText('Get your certificate at www.maylearninghub.co.za', 600, 1585);

        const safeName = learnerName.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Learner';
        const safeGame = result.gameTitle.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Assessment-Game';
        const fileName = 'May-Learning-Hub-' + safeName + '-' + safeGame + '-Certificate.png';
        try {
            const blob = await canvasToPngBlob(canvas);
            return { blob, fileName };
        } catch (error) {
            if (includeExternalLogo && logo) return createCertificateImage(learnerName, false);
            throw error;
        }
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
        hide
    };
})();
