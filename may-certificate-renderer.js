(function () {
    'use strict';

    if (window.MayCertificateRenderer && window.MayCertificateRenderer.version) return;

    const VERSION = '1.5.0';
    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL('.', scriptUrl);
    const defaultLogoUrl = new URL('May Learning Hub Logo.png', siteRoot).href;
    const defaultSignatureUrl = new URL('May Learning Hub Signature-transparent.png', siteRoot).href;
    const logoPromises = new Map();
    const palettes = {
        'tier-bronze': { main: '#b87333', dark: '#6f3b16', soft: '#f7e8d8' },
        'tier-silver': { main: '#9aa6b2', dark: '#4e5a66', soft: '#edf1f4' },
        'tier-gold': { main: '#d4af37', dark: '#755b08', soft: '#fff6cf' },
        'tier-platinum': { main: '#c7d8e2', dark: '#165173', soft: '#eaf7ff' },
        'tier-participation': { main: '#1268ad', dark: '#003f75', soft: '#d9efff' }
    };
    const premiumThemes = {
        'tier-bronze': { start: '#fff5e9', middle: '#edc39e', end: '#c77d43', ribbon: 'PROGRESS' },
        'tier-silver': { start: '#fbfdff', middle: '#dce3e9', end: '#a7b1bb', ribbon: 'MERIT' },
        'tier-gold': { start: '#fffbea', middle: '#f4dc83', end: '#d4af37', ribbon: 'DISTINCTION' },
        'tier-platinum': { start: '#f7fcff', middle: '#d7eaf3', end: '#9fc8da', ribbon: 'EXCELLENCE' }
    };

    function rendererError(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    function cleanText(value, fallback = '') {
        const text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
        return text || fallback;
    }

    function normalizeOptions(options) {
        if (!options || typeof options !== 'object') {
            throw rendererError('Certificate metadata is required.', 'missing_certificate_metadata');
        }
        const mode = options.mode === 'participation' ? 'participation' : 'scored';
        const total = Math.max(0, Number(options.total) || 0);
        const correct = Math.min(total || Number.MAX_SAFE_INTEGER, Math.max(0, Number(options.correct) || 0));
        if (mode === 'scored' && total <= 0) {
            throw rendererError('A scored certificate requires a positive question total.', 'invalid_certificate_total');
        }
        const issuedAtDate = new Date(options.issuedAt || Date.now());
        const issuedAt = Number.isNaN(issuedAtDate.getTime()) ? new Date().toISOString() : issuedAtDate.toISOString();
        const date = cleanText(options.date) || new Date(issuedAt).toLocaleDateString('en-ZA', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        const layout = options.layout === 'compact-subject' || options.layout === 'premium-expedition'
            ? options.layout
            : 'standard';
        return {
            learnerName: cleanText(options.learnerName || options.name, 'Guest Learner'),
            grade: cleanText(options.grade),
            subject: cleanText(options.subject),
            term: cleanText(options.term),
            layout,
            topic: cleanText(options.topic, 'Assessment Activity'),
            gameTitle: cleanText(options.gameTitle, 'Assessment Game'),
            category: cleanText(options.category, 'Assessment Game'),
            mode,
            correct,
            total,
            title: cleanText(options.title, mode === 'participation' ? 'Certificate of Participation' : 'Certificate of Achievement'),
            award: cleanText(options.award, mode === 'participation' ? 'May Learning Hub Participation Award' : 'May Learning Hub Achievement Award'),
            message: cleanText(options.message, mode === 'participation' ? 'Awarded in recognition of active participation.' : 'Awarded in recognition of successful completion.'),
            tierClass: palettes[options.tierClass] ? options.tierClass : (mode === 'participation' ? 'tier-participation' : 'tier-bronze'),
            metricLabel: cleanText(options.metricLabel, options.metricValue ? 'Completed in' : ''),
            metricValue: cleanText(options.metricValue),
            metricStyle: options.metricStyle === 'split-duration' ? 'split-duration' : '',
            exportStyle: options.exportStyle === 'premium-preview' ? 'premium-preview' : '',
            date,
            issuedAt,
            logoUrl: cleanText(options.logoUrl, defaultLogoUrl),
            signatureUrl: cleanText(options.signatureUrl, defaultSignatureUrl)
        };
    }

    function wrapText(ctx, text, maxWidth) {
        const words = cleanText(text).split(/\s+/).filter(Boolean);
        const lines = [];
        let line = '';
        words.forEach(word => {
            const candidate = line ? line + ' ' + word : word;
            if (line && ctx.measureText(candidate).width > maxWidth) {
                lines.push(line);
                line = word;
            } else {
                line = candidate;
            }
        });
        if (line) lines.push(line);
        return lines.length ? lines : [''];
    }

    function shortenToWidth(ctx, text, maxWidth) {
        let shortened = String(text);
        while (shortened.length > 1 && ctx.measureText(shortened + '…').width > maxWidth) {
            shortened = shortened.slice(0, -1).trimEnd();
        }
        return shortened + (shortened === text ? '' : '…');
    }

    function drawFittedWrappedText(ctx, settings) {
        let size = settings.maxSize;
        let lines = [];
        while (size >= settings.minSize) {
            ctx.font = settings.font(size);
            lines = wrapText(ctx, settings.text, settings.maxWidth);
            if (lines.length <= settings.maxLines) break;
            size -= 2;
        }
        if (lines.length > settings.maxLines) {
            lines = lines.slice(0, settings.maxLines);
            lines[lines.length - 1] = shortenToWidth(ctx, lines[lines.length - 1], settings.maxWidth);
        }
        const lineHeight = Math.round(size * (settings.lineHeightRatio || 1.25));
        lines.forEach((line, index) => ctx.fillText(line, settings.x, settings.y + (index * lineHeight)));
        return settings.y + (lines.length * lineHeight);
    }

    function loadLogo(url) {
        if (logoPromises.has(url)) return logoPromises.get(url);
        const promise = new Promise(resolve => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null);
            image.crossOrigin = 'anonymous';
            image.src = url;
        });
        logoPromises.set(url, promise);
        return promise;
    }

    function drawBrandFallback(ctx, palette) {
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
                    if (blob && blob.type === 'image/png' && blob.size > 0) resolve(blob);
                    else reject(rendererError('The browser returned an empty or invalid certificate image.', 'invalid_certificate_png'));
                }, 'image/png');
            } catch (error) {
                reject(error);
            }
        });
    }

    function safeFilePart(value, fallback) {
        return cleanText(value, fallback)
            .replace(/[^a-z0-9]+/gi, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 42) || fallback;
    }

    function certificateFileName(result) {
        const timestamp = result.issuedAt.replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
        return [
            'May-Learning-Hub',
            safeFilePart(result.learnerName, 'Learner'),
            safeFilePart(result.gameTitle, 'Assessment-Game'),
            timestamp,
            'Certificate.png'
        ].join('-');
    }

    function drawPremiumCorner(ctx, x, y, sx, sy, accent) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(sx, sy);
        ctx.strokeStyle = '#b99a55';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 108); ctx.lineTo(0, 0); ctx.lineTo(108, 0);
        ctx.moveTo(16, 86); ctx.lineTo(16, 16); ctx.lineTo(86, 16);
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.translate(20, 20);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-7, -7, 14, 14);
        ctx.restore();
    }

    function drawTrophyCrest(ctx, x, y, accent, dark) {
        ctx.save();
        ctx.translate(x, y);
        ctx.shadowColor = 'rgba(11, 30, 53, .22)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = '#fffdf6';
        ctx.strokeStyle = '#b99a55';
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(0, 0, 72, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = dark;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.stroke();
        const cupGradient = ctx.createLinearGradient(-34, -40, 36, 42);
        cupGradient.addColorStop(0, '#fff4a8'); cupGradient.addColorStop(.42, accent); cupGradient.addColorStop(1, dark);
        ctx.fillStyle = cupGradient; ctx.strokeStyle = dark; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-31, -32); ctx.quadraticCurveTo(-27, 12, 0, 19);
        ctx.quadraticCurveTo(27, 12, 31, -32); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(-31, -18, 19, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
        ctx.beginPath(); ctx.arc(31, -18, 19, -Math.PI / 2, Math.PI / 2); ctx.stroke();
        ctx.fillStyle = dark; ctx.fillRect(-4, 18, 8, 22);
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(-24, 38, 48, 8, 4);
        else ctx.rect(-24, 38, 48, 8);
        ctx.fill();
        ctx.fillStyle = accent;
        ctx.beginPath();
        for (let point = 0; point < 10; point += 1) {
            const radius = point % 2 === 0 ? 11 : 5;
            const angle = -Math.PI / 2 + point * Math.PI / 5;
            const px = Math.cos(angle) * radius;
            const py = -10 + Math.sin(angle) * radius;
            if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.fill();
        ctx.restore();
    }

    function drawAwardRibbon(ctx, x, y, label, accent, dark) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = dark;
        ctx.beginPath(); ctx.moveTo(-205, -34); ctx.lineTo(-238, 0); ctx.lineTo(-205, 34); ctx.lineTo(205, 34); ctx.lineTo(238, 0); ctx.lineTo(205, -34); ctx.closePath(); ctx.fill();
        const ribbonGradient = ctx.createLinearGradient(-185, 0, 185, 0);
        ribbonGradient.addColorStop(0, dark); ribbonGradient.addColorStop(.5, accent); ribbonGradient.addColorStop(1, dark);
        ctx.fillStyle = ribbonGradient; ctx.fillRect(-205, -30, 410, 60);
        ctx.strokeStyle = '#fff4c4'; ctx.lineWidth = 2; ctx.strokeRect(-195, -21, 390, 42);
        ctx.fillStyle = '#fffdf4'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = 'bold 22px "Segoe UI", sans-serif'; ctx.fillText(label, 0, 0);
        ctx.restore();
    }

    function drawExpeditionWatermark(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.055;
        ctx.strokeStyle = '#17324d';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(600, 905, 360, 0, Math.PI * 2); ctx.stroke();
        [-240, -120, 0, 120, 240].forEach(offset => {
            ctx.beginPath(); ctx.ellipse(600, 905, Math.max(45, 360 - Math.abs(offset)), 360, 0, 0, Math.PI * 2); ctx.stroke();
        });
        [-180, -90, 0, 90, 180].forEach(offset => {
            ctx.beginPath(); ctx.ellipse(600, 905, 360, Math.max(40, 360 - Math.abs(offset)), 0, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.setLineDash([14, 14]);
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(240, 1160); ctx.bezierCurveTo(360, 980, 410, 1120, 520, 915);
        ctx.bezierCurveTo(630, 720, 765, 910, 940, 665); ctx.stroke();
        ctx.setLineDash([]);
        [[240,1160],[520,915],[940,665]].forEach(([x,y]) => {
            ctx.fillStyle = '#17324d'; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        });
        ctx.restore();
    }

    function drawTrackedText(ctx, text, x, y, spacing) {
        const value = cleanText(text);
        if (!value) return;
        const letters = Array.from(value);
        const glyphWidths = letters.map(letter => ctx.measureText(letter).width);
        const totalWidth = glyphWidths.reduce((sum, width) => sum + width, 0) + Math.max(0, letters.length - 1) * spacing;
        let cursor = x - totalWidth / 2;
        letters.forEach((letter, index) => {
            ctx.fillText(letter, cursor + glyphWidths[index] / 2, y);
            cursor += glyphWidths[index] + spacing;
        });
    }

    function drawPreviewCorner(ctx, x, y, rotation, accent) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = .68;
        ctx.strokeStyle = '#b99a55';
        ctx.lineWidth = 3;
        ctx.strokeRect(-78, -78, 156, 156);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-65, -65, 130, 130);
        ctx.restore();
    }

    function drawPreviewBeam(ctx, theme, accent) {
        ctx.save();
        const beamLeft = 72;
        const beamTop = 112;
        const beamWidth = 1056;
        const beamBottom = 795;
        const softBeam = ctx.createLinearGradient(0, beamTop, 0, beamBottom);
        softBeam.addColorStop(0, theme.start);
        softBeam.addColorStop(.4, theme.middle);
        softBeam.addColorStop(.72, 'rgba(255,255,255,.20)');
        softBeam.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = softBeam;
        ctx.filter = 'blur(30px)';
        ctx.globalAlpha = .24;
        ctx.beginPath();
        ctx.moveTo(beamLeft + beamWidth * .1, beamTop);
        ctx.lineTo(beamLeft + beamWidth, beamBottom);
        ctx.lineTo(beamLeft, beamBottom);
        ctx.closePath();
        ctx.fill();

        const focusedBeam = ctx.createLinearGradient(0, beamTop, 0, beamBottom);
        focusedBeam.addColorStop(0, theme.start);
        focusedBeam.addColorStop(.4, theme.middle);
        focusedBeam.addColorStop(.72, 'rgba(255,255,255,.2)');
        focusedBeam.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = focusedBeam;
        ctx.filter = 'blur(16px)';
        ctx.shadowColor = 'rgba(255,255,240,.88)';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = .82;
        ctx.beginPath();
        ctx.moveTo(beamLeft + beamWidth * .12, beamTop);
        ctx.lineTo(beamLeft + beamWidth * .88, beamBottom);
        ctx.lineTo(beamLeft + beamWidth * .12, beamBottom);
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.filter = 'none';

        const nameGlow = ctx.createRadialGradient(600, 666, 25, 600, 666, 410);
        nameGlow.addColorStop(0, 'rgba(255,255,255,.74)');
        nameGlow.addColorStop(.42, accent + '1f');
        nameGlow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = nameGlow;
        ctx.globalAlpha = 1;
        ctx.fillRect(130, 455, 940, 385);
        ctx.restore();
    }

    function drawPreviewTrophy(ctx, x, y, accent, dark, soft) {
        ctx.save();
        ctx.translate(x, y);
        ctx.shadowColor = 'rgba(11, 30, 53, .22)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 7;
        const face = ctx.createRadialGradient(-22, -28, 8, 0, 0, 76);
        face.addColorStop(0, '#fffdf2');
        face.addColorStop(.24, '#fffdf2');
        face.addColorStop(.58, soft);
        face.addColorStop(1, accent);
        ctx.fillStyle = face;
        ctx.strokeStyle = '#b99a55';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 66, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#0b1e35';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 53, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '54px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#17324d';
        ctx.fillText('🏆', 0, -2);
        ctx.fillStyle = dark;
        ctx.strokeStyle = '#fff8df';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(52, 49, 19, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff8df';
        ctx.font = 'bold 17px Georgia, serif';
        ctx.fillText('★', 52, 49);
        ctx.restore();
    }

    function drawPremiumPreviewRibbon(ctx, x, y, label, accent, dark) {
        ctx.save();
        ctx.translate(x, y);
        ctx.shadowColor = 'rgba(11, 30, 53, .2)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;
        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.moveTo(-210, -30); ctx.lineTo(-230, 0); ctx.lineTo(-210, 30);
        ctx.lineTo(210, 30); ctx.lineTo(230, 0); ctx.lineTo(210, -30);
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = 'transparent';
        const fill = ctx.createLinearGradient(-210, 0, 210, 0);
        fill.addColorStop(0, dark);
        fill.addColorStop(.5, accent);
        fill.addColorStop(1, dark);
        ctx.fillStyle = fill;
        ctx.fillRect(-206, -27, 412, 54);
        ctx.strokeStyle = 'rgba(255,248,213,.88)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-196, -19, 392, 38);
        ctx.fillStyle = '#fffdf4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '900 19px "Segoe UI", sans-serif';
        drawTrackedText(ctx, label.toUpperCase(), 0, 1, 3);
        ctx.restore();
    }

    async function renderPremiumPreviewCertificate(result, includeExternalLogo) {
        const palette = palettes[result.tierClass];
        const theme = premiumThemes[result.tierClass] || premiumThemes['tier-bronze'];
        const accent = palette.main;
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1697;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw rendererError('Canvas rendering is unavailable.', 'canvas_unavailable');

        const navy = '#0b1e35';
        const ink = '#344457';
        const gold = '#b99a55';
        const paper = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        paper.addColorStop(0, theme.start);
        paper.addColorStop(.54, theme.middle);
        paper.addColorStop(1, theme.end);
        ctx.fillStyle = paper;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const readingGlow = ctx.createRadialGradient(600, 815, 42, 600, 815, 780);
        readingGlow.addColorStop(0, 'rgba(255,255,255,.92)');
        readingGlow.addColorStop(.14, 'rgba(255,255,255,.92)');
        readingGlow.addColorStop(.37, 'rgba(255,255,255,.52)');
        readingGlow.addColorStop(.68, 'rgba(255,255,255,0)');
        ctx.fillStyle = readingGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = navy;
        ctx.lineWidth = 28;
        ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
        ctx.strokeStyle = gold;
        ctx.lineWidth = 4;
        ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);
        ctx.strokeStyle = gold;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);
        ctx.strokeStyle = 'rgba(185,154,85,.58)';
        ctx.lineWidth = 1;
        ctx.strokeRect(29, 29, canvas.width - 58, canvas.height - 58);
        drawPreviewCorner(ctx, 15, 15, Math.PI / 4, accent);
        drawPreviewCorner(ctx, 1185, 1682, Math.PI / 4, accent);
        drawPreviewBeam(ctx, theme, accent);

        const canLoadAssets = includeExternalLogo && /^(?:https?:|file:)$/.test(window.location.protocol);
        const [logo, signature] = await Promise.all([
            canLoadAssets ? loadLogo(result.logoUrl) : Promise.resolve(null),
            canLoadAssets ? loadLogo(result.signatureUrl) : Promise.resolve(null)
        ]);
        if (logo) ctx.drawImage(logo, 82, 78, 172, 172);
        else drawBrandFallback(ctx, palette);
        drawPreviewTrophy(ctx, 1040, 158, accent, palette.dark, palette.soft);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = navy;
        ctx.font = '900 21px "Segoe UI", sans-serif';
        drawTrackedText(ctx, [result.grade, result.subject].filter(Boolean).join(' ').toUpperCase(), 600, 252, 5);

        ctx.fillStyle = navy;
        let y = drawFittedWrappedText(ctx, {
            text: result.title,
            x: 600,
            y: 310,
            maxWidth: 850,
            maxLines: 2,
            maxSize: 61,
            minSize: 42,
            lineHeightRatio: 1.1,
            font: size => 'bold ' + size + 'px Georgia, "Times New Roman", serif'
        });

        const awardY = y + 46;
        ctx.fillStyle = navy;
        ctx.fillRect(285, awardY - 29, 630, 58);
        ctx.strokeStyle = gold;
        ctx.lineWidth = 2;
        ctx.strokeRect(295, awardY - 20, 610, 40);
        ctx.fillStyle = '#fff8df';
        ctx.font = '900 20px "Segoe UI", sans-serif';
        drawTrackedText(ctx, result.award.toUpperCase(), 600, awardY, 2.2);

        y = awardY + 88;
        ctx.fillStyle = '#6b7480';
        ctx.font = 'italic 26px Georgia, "Times New Roman", serif';
        ctx.fillText('Presented in recognition of learning progress to', 600, y);
        y += 66;

        ctx.fillStyle = navy;
        y = drawFittedWrappedText(ctx, {
            text: result.learnerName,
            x: 600,
            y,
            maxWidth: 810,
            maxLines: 1,
            maxSize: 56,
            minSize: 24,
            lineHeightRatio: 1.08,
            font: size => 'bold italic ' + size + 'px Georgia, "Times New Roman", serif'
        });
        ctx.strokeStyle = gold;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(205, y + 10);
        ctx.lineTo(995, y + 10);
        ctx.stroke();

        y += 66;
        ctx.fillStyle = ink;
        y = drawFittedWrappedText(ctx, {
            text: 'for completing ' + result.gameTitle + ' in the ' + result.category + ' category.',
            x: 600,
            y,
            maxWidth: 850,
            maxLines: 3,
            maxSize: 27,
            minSize: 20,
            lineHeightRatio: 1.42,
            font: size => size + 'px Georgia, "Times New Roman", serif'
        });

        const scoreY = Math.max(1020, Math.min(y + 155, 1085));
        ctx.save();
        ctx.shadowColor = 'rgba(11,30,53,.18)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = 'rgba(255,255,255,.86)';
        ctx.strokeStyle = gold;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.arc(600, scoreY, 142, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = navy;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(600, scoreY, 119, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.72)';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.arc(600, scoreY, 105, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = navy;
        ctx.font = 'bold 58px Georgia, "Times New Roman", serif';
        ctx.fillText(result.correct + '/' + result.total, 600, scoreY - 14);
        ctx.fillStyle = palette.dark;
        ctx.font = '900 20px "Segoe UI", sans-serif';
        drawTrackedText(ctx, 'MARKS', 600, scoreY + 48, 4);

        const messageY = scoreY + 184;
        ctx.fillStyle = palette.dark;
        drawFittedWrappedText(ctx, {
            text: result.message,
            x: 600,
            y: messageY,
            maxWidth: 850,
            maxLines: 3,
            maxSize: 23,
            minSize: 18,
            lineHeightRatio: 1.42,
            font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });
        drawPremiumPreviewRibbon(ctx, 865, 1390, theme.ribbon, accent, palette.dark);

        const footerY = 1482;
        ctx.strokeStyle = '#596779';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(145, footerY);
        ctx.lineTo(500, footerY);
        ctx.moveTo(700, footerY);
        ctx.lineTo(1055, footerY);
        ctx.stroke();
        ctx.fillStyle = navy;
        ctx.font = 'bold 23px "Segoe UI", sans-serif';
        ctx.fillText(result.date, 322, footerY - 34);
        if (signature) ctx.drawImage(signature, 720, footerY - 88, 310, 61);
        else {
            ctx.font = 'italic 35px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';
            ctx.fillText('M Learning Hub', 878, footerY - 38);
        }
        ctx.fillStyle = '#637180';
        ctx.font = '17px "Segoe UI", sans-serif';
        ctx.fillText('DATE AWARDED', 322, footerY + 35);
        ctx.fillText('SIGNED BY MAY LEARNING HUB', 878, footerY + 35);
        if (result.term) {
            ctx.fillStyle = '#99917e';
            ctx.font = '700 16px "Segoe UI", sans-serif';
            drawTrackedText(ctx, result.term.toUpperCase(), 600, 1574, 3);
        }
        ctx.fillStyle = navy;
        ctx.font = 'bold 18px "Segoe UI", sans-serif';
        ctx.fillText('Get your certificate at www.maylearninghub.co.za', 600, 1623);

        try {
            const blob = await canvasToPngBlob(canvas);
            return { blob, fileName: certificateFileName(result), width: canvas.width, height: canvas.height };
        } catch (error) {
            if (includeExternalLogo && (logo || signature)) return renderPremiumPreviewCertificate(result, false);
            throw error;
        }
    }

    async function renderPremiumExpeditionCertificate(result, includeExternalLogo) {
        const palette = palettes[result.tierClass];
        const theme = premiumThemes[result.tierClass] || premiumThemes['tier-bronze'];
        const accent = palette.main;
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1697;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw rendererError('Canvas rendering is unavailable.', 'canvas_unavailable');

        const navy = '#0b1e35';
        const ink = '#17324d';
        const gold = '#b99a55';
        ctx.fillStyle = navy;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const paper = ctx.createLinearGradient(80, 70, 1120, 1627);
        paper.addColorStop(0, theme.start); paper.addColorStop(.5, theme.middle); paper.addColorStop(1, theme.end);
        ctx.fillStyle = paper;
        ctx.fillRect(66, 66, 1068, 1565);
        const readingGlow = ctx.createRadialGradient(600, 780, 80, 600, 780, 650);
        readingGlow.addColorStop(0, 'rgba(255,255,255,.9)'); readingGlow.addColorStop(.58, 'rgba(255,255,255,.54)'); readingGlow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = readingGlow; ctx.fillRect(66, 66, 1068, 1565);
        ctx.strokeStyle = gold; ctx.lineWidth = 8; ctx.strokeRect(45, 45, 1110, 1607);
        ctx.strokeStyle = '#e5cf92'; ctx.lineWidth = 2; ctx.strokeRect(79, 79, 1042, 1539);
        ctx.strokeStyle = navy; ctx.lineWidth = 2; ctx.strokeRect(92, 92, 1016, 1513);
        drawPremiumCorner(ctx, 92, 92, 1, 1, accent);
        drawPremiumCorner(ctx, 1108, 92, -1, 1, accent);
        drawPremiumCorner(ctx, 92, 1605, 1, -1, accent);
        drawPremiumCorner(ctx, 1108, 1605, -1, -1, accent);
        drawExpeditionWatermark(ctx);

        ctx.save();
        ctx.filter = 'blur(22px)';
        const beamGlow = ctx.createLinearGradient(185, 178, 600, 720);
        beamGlow.addColorStop(0, theme.start);
        beamGlow.addColorStop(.38, theme.middle);
        beamGlow.addColorStop(.72, palette.main + '66');
        beamGlow.addColorStop(1, palette.main + '00');
        ctx.fillStyle = beamGlow;
        ctx.globalAlpha = .12;
        ctx.beginPath(); ctx.moveTo(185, 178); ctx.lineTo(975, 720); ctx.lineTo(225, 720); ctx.closePath(); ctx.fill();
        ctx.filter = 'blur(24px)';
        ctx.globalAlpha = .28;
        ctx.beginPath(); ctx.moveTo(185, 178); ctx.lineTo(900, 714); ctx.lineTo(300, 714); ctx.closePath(); ctx.fill();
        const beamCore = ctx.createLinearGradient(185, 178, 610, 705);
        beamCore.addColorStop(0, theme.start);
        beamCore.addColorStop(.45, theme.middle);
        beamCore.addColorStop(1, palette.main + '00');
        ctx.fillStyle = beamCore;
        ctx.filter = 'blur(16px)';
        ctx.globalAlpha = .72;
        ctx.beginPath(); ctx.moveTo(185, 178); ctx.lineTo(820, 705); ctx.lineTo(380, 705); ctx.closePath(); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
        ctx.restore();

        const canLoadAssets = includeExternalLogo && /^(?:https?:|file:)$/.test(window.location.protocol);
        const [logo, signature] = await Promise.all([
            canLoadAssets ? loadLogo(result.logoUrl) : Promise.resolve(null),
            canLoadAssets ? loadLogo(result.signatureUrl) : Promise.resolve(null)
        ]);
        if (logo) ctx.drawImage(logo, 105, 105, 165, 165);
        else drawBrandFallback(ctx, palette);
        drawTrophyCrest(ctx, 1003, 182, accent, palette.dark);

        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = gold;
        drawFittedWrappedText(ctx, {
            text: 'MAY LEARNING HUB  •  ' + (result.subject || 'ACADEMIC').toUpperCase() + ' HONOURS',
            x: 600, y: 154, maxWidth: 520, maxLines: 1,
            maxSize: 18, minSize: 12, font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });
        ctx.strokeStyle = gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(350, 181); ctx.lineTo(850, 181); ctx.stroke();
        ctx.fillStyle = navy;
        ctx.font = 'bold 24px "Segoe UI", sans-serif';
        ctx.fillText([result.grade, result.subject].filter(Boolean).join(' ').toUpperCase(), 600, 265);
        ctx.fillStyle = ink;
        let nextY = drawFittedWrappedText(ctx, {
            text: result.title, x: 600, y: 345, maxWidth: 820, maxLines: 2,
            maxSize: 66, minSize: 44, lineHeightRatio: 1.1,
            font: size => 'bold ' + size + 'px Georgia, serif'
        });
        ctx.fillStyle = navy;
        ctx.fillRect(250, nextY + 18, 700, 62);
        ctx.strokeStyle = gold; ctx.lineWidth = 2; ctx.strokeRect(260, nextY + 27, 680, 44);
        ctx.fillStyle = '#fff8df';
        drawFittedWrappedText(ctx, {
            text: result.award.toUpperCase(), x: 600, y: nextY + 49, maxWidth: 630, maxLines: 1,
            maxSize: 22, minSize: 15, font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });

        nextY += 145;
        ctx.fillStyle = '#66717d'; ctx.font = 'italic 27px Georgia, serif';
        ctx.fillText('Presented in recognition of learning progress to', 600, nextY);
        nextY += 68;
        ctx.fillStyle = ink;
        nextY = drawFittedWrappedText(ctx, {
            text: result.learnerName, x: 600, y: nextY, maxWidth: 820, maxLines: 1,
            maxSize: 52, minSize: 18, lineHeightRatio: 1.12,
            font: size => 'bold italic ' + size + 'px Georgia, serif'
        });
        ctx.strokeStyle = gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(225, nextY + 10); ctx.lineTo(975, nextY + 10); ctx.stroke();

        nextY += 68;
        ctx.fillStyle = '#344457';
        nextY = drawFittedWrappedText(ctx, {
            text: 'for completing ' + result.gameTitle + ' in the ' + result.category + ' category.',
            x: 600, y: nextY, maxWidth: 820, maxLines: 3, maxSize: 27, minSize: 20,
            lineHeightRatio: 1.42, font: size => size + 'px Georgia, serif'
        });

        const sealY = Math.max(nextY + 150, 1000);
        ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = gold; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(600, sealY, 138, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = navy; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(600, sealY, 119, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = accent; ctx.lineWidth = 9;
        ctx.beginPath(); ctx.arc(600, sealY, 104, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (result.correct / result.total)); ctx.stroke();
        const percentage = Math.round((result.correct / result.total) * 100);
        ctx.fillStyle = navy; ctx.font = 'bold 60px Georgia, serif'; ctx.fillText(percentage + '%', 600, sealY - 22);
        ctx.fillStyle = palette.dark; ctx.font = 'bold 23px "Segoe UI", sans-serif'; ctx.fillText(result.correct + ' / ' + result.total + ' MARKS', 600, sealY + 34);
        ctx.fillStyle = gold; ctx.font = 'bold 16px "Segoe UI", sans-serif'; ctx.fillText('EXPEDITION SCORE', 600, sealY + 70);
        for (let i = 0; i < 5; i += 1) {
            ctx.save(); ctx.translate(520 + i * 40, sealY + 113); ctx.rotate(Math.PI / 4);
            ctx.fillStyle = i < Math.ceil(percentage / 20) ? accent : '#d8d1bf'; ctx.fillRect(-6, -6, 12, 12); ctx.restore();
        }

        ctx.fillStyle = palette.dark;
        drawFittedWrappedText(ctx, {
            text: result.message, x: 600, y: sealY + 190, maxWidth: 840, maxLines: 3,
            maxSize: 24, minSize: 18, lineHeightRatio: 1.42,
            font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });
        drawAwardRibbon(ctx, 866, 1370, theme.ribbon, accent, palette.dark);

        const footerY = 1450;
        ctx.strokeStyle = '#596779'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(145, footerY); ctx.lineTo(500, footerY); ctx.moveTo(700, footerY); ctx.lineTo(1055, footerY); ctx.stroke();
        ctx.fillStyle = ink; ctx.font = 'bold 24px "Segoe UI", sans-serif'; ctx.fillText(result.date, 322, footerY - 34);
        if (signature) ctx.drawImage(signature, 720, footerY - 87, 310, 61);
        else { ctx.font = 'italic 36px "Brush Script MT", "Segoe Script", cursive'; ctx.fillText('M Learning Hub', 878, footerY - 38); }
        ctx.fillStyle = '#687483'; ctx.font = '17px "Segoe UI", sans-serif';
        ctx.fillText('DATE AWARDED', 322, footerY + 34); ctx.fillText('SIGNED BY MAY LEARNING HUB', 878, footerY + 34);
        if (result.term) { ctx.fillStyle = '#99917e'; ctx.font = '600 16px "Segoe UI", sans-serif'; ctx.fillText(result.term.toUpperCase(), 600, 1543); }
        ctx.fillStyle = navy; ctx.font = 'bold 19px "Segoe UI", sans-serif';
        ctx.fillText('Get your certificate at www.maylearninghub.co.za', 600, 1590);

        try {
            const blob = await canvasToPngBlob(canvas);
            return { blob, fileName: certificateFileName(result), width: canvas.width, height: canvas.height };
        } catch (error) {
            if (includeExternalLogo && (logo || signature)) return renderPremiumExpeditionCertificate(result, false);
            throw error;
        }
    }

    async function renderCertificate(result, includeExternalLogo) {
        if (result.mode === 'scored' && result.layout === 'premium-expedition') {
            if (result.exportStyle === 'premium-preview') {
                return renderPremiumPreviewCertificate(result, includeExternalLogo);
            }
            return renderPremiumExpeditionCertificate(result, includeExternalLogo);
        }
        const participation = result.mode === 'participation';
        const palette = palettes[result.tierClass];
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1697;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw rendererError('Canvas rendering is unavailable.', 'canvas_unavailable');

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

        const canUseLogo = includeExternalLogo && /^https?:$/.test(window.location.protocol);
        const logo = canUseLogo ? await loadLogo(result.logoUrl) : null;
        const canUseSignature = includeExternalLogo && /^(?:https?:|file:)$/.test(window.location.protocol);
        const signature = result.layout === 'compact-subject' && canUseSignature
            ? await loadLogo(result.signatureUrl)
            : null;
        if (logo) ctx.drawImage(logo, 95, 85, 200, 200);
        else drawBrandFallback(ctx, palette);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '94px "Segoe UI Emoji", sans-serif';
        ctx.fillText('🏆', 1010, 175);

        const kicker = result.layout === 'compact-subject'
            ? [result.grade, result.subject].filter(Boolean).join(' ') || 'MAY LEARNING HUB'
            : [result.grade, result.subject, result.term].filter(Boolean).join(' • ') || 'MAY LEARNING HUB';
        ctx.fillStyle = palette.dark;
        drawFittedWrappedText(ctx, {
            text: kicker.toUpperCase(), x: 600, y: 285, maxWidth: 850, maxLines: 1,
            maxSize: 25, minSize: 17, font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });

        ctx.fillStyle = '#17324d';
        let nextY = drawFittedWrappedText(ctx, {
            text: result.title, x: 600, y: 370, maxWidth: 900, maxLines: 2,
            maxSize: 62, minSize: 42, lineHeightRatio: 1.16,
            font: size => 'bold ' + size + 'px Georgia, serif'
        });

        ctx.fillStyle = palette.soft;
        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 4;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(250, nextY + 10, 700, 66, 33);
        else ctx.rect(250, nextY + 10, 700, 66);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = palette.dark;
        drawFittedWrappedText(ctx, {
            text: result.award.toUpperCase(), x: 600, y: nextY + 43, maxWidth: 650, maxLines: 1,
            maxSize: 24, minSize: 16, font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });

        nextY += 135;
        ctx.fillStyle = '#536273';
        ctx.font = 'italic 28px Georgia, serif';
        ctx.fillText('This certificate is proudly presented to', 600, nextY);
        nextY += 72;
        ctx.fillStyle = '#17324d';
        nextY = drawFittedWrappedText(ctx, {
            text: result.learnerName, x: 600, y: nextY, maxWidth: 850, maxLines: 2,
            maxSize: 49, minSize: 32, lineHeightRatio: 1.18,
            font: size => 'bold italic ' + size + 'px Georgia, serif'
        });
        ctx.strokeStyle = palette.main;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(205, nextY + 4);
        ctx.lineTo(995, nextY + 4);
        ctx.stroke();

        nextY += 70;
        ctx.fillStyle = '#263442';
        const bodyText = participation
            ? 'for successful participation in the ' + result.category + ' activity on ' + result.topic + '.'
            : 'for completing ' + result.gameTitle + ' in the ' + result.category + ' category.';
        nextY = drawFittedWrappedText(ctx, {
            text: bodyText, x: 600, y: nextY, maxWidth: 840, maxLines: 4,
            maxSize: 29, minSize: 21, lineHeightRatio: 1.48,
            font: size => size + 'px Georgia, serif'
        });

        if (result.metricValue) {
            nextY += 38;
            const durationMatch = result.metricValue.match(/^(\d{1,2}):([0-5]\d)$/);
            const useSplitDuration = result.metricStyle === 'split-duration' && Boolean(durationMatch);
            const metricX = 330;
            const metricY = nextY;
            const metricWidth = 540;
            const metricHeight = useSplitDuration ? 180 : 150;
            const metricGradient = ctx.createLinearGradient(metricX, metricY, metricX + metricWidth, metricY + metricHeight);
            metricGradient.addColorStop(0, '#10263e');
            metricGradient.addColorStop(1, palette.dark);
            ctx.fillStyle = metricGradient;
            ctx.strokeStyle = palette.main;
            ctx.lineWidth = 6;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') ctx.roundRect(metricX, metricY, metricWidth, metricHeight, 28);
            else ctx.rect(metricX, metricY, metricWidth, metricHeight);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#d9efff';
            ctx.font = 'bold 20px "Segoe UI", sans-serif';
            ctx.fillText(result.metricLabel.toUpperCase(), 600, metricY + 38);
            if (useSplitDuration) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 64px Consolas, "Courier New", monospace';
                ctx.fillText(durationMatch[1].padStart(2, '0'), 485, metricY + 104);
                ctx.fillText(':', 600, metricY + 104);
                ctx.fillText(durationMatch[2], 715, metricY + 104);
                ctx.fillStyle = '#d9efff';
                ctx.font = 'bold 17px "Segoe UI", sans-serif';
                ctx.fillText('MINUTES', 485, metricY + 141);
                ctx.fillText('SECONDS', 715, metricY + 141);
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 68px Consolas, "Courier New", monospace';
                ctx.fillText(result.metricValue, 600, metricY + 102);
            }
            nextY = metricY + metricHeight;
        }

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
        nextY = drawFittedWrappedText(ctx, {
            text: result.message, x: 600, y: nextY, maxWidth: 850, maxLines: 4,
            maxSize: 27, minSize: 19, lineHeightRatio: 1.48,
            font: size => 'bold ' + size + 'px "Segoe UI", sans-serif'
        });
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
        if (result.layout === 'compact-subject') {
            if (signature) {
                ctx.drawImage(signature, 720, footerY - 86, 310, 61);
            } else {
                ctx.font = 'italic 36px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';
                ctx.fillText('M Learning Hub', 875, footerY - 38);
            }
        } else {
            ctx.font = 'italic 29px "Segoe Script", cursive';
            ctx.fillText('May Learning Hub', 875, footerY - 34);
        }
        ctx.fillStyle = '#637180';
        ctx.font = '18px "Segoe UI", sans-serif';
        ctx.fillText('DATE AWARDED', 325, footerY + 36);
        ctx.fillText('SIGNED BY MAY LEARNING HUB', 875, footerY + 36);
        if (result.layout === 'compact-subject' && result.term) {
            ctx.fillStyle = '#96a1ad';
            ctx.font = '600 17px "Segoe UI", sans-serif';
            ctx.fillText(result.term.toUpperCase(), 600, 1538);
        }
        ctx.fillStyle = palette.dark;
        ctx.font = 'bold 20px "Segoe UI", sans-serif';
        ctx.fillText('Get your certificate at www.maylearninghub.co.za', 600, 1585);

        try {
            const blob = await canvasToPngBlob(canvas);
            return { blob, fileName: certificateFileName(result), width: canvas.width, height: canvas.height };
        } catch (error) {
            if (includeExternalLogo && logo) return renderCertificate(result, false);
            throw error;
        }
    }

    async function create(options) {
        const result = normalizeOptions(options);
        return renderCertificate(result, true);
    }

    window.MayCertificateRenderer = Object.freeze({
        version: VERSION,
        create
    });
})();
