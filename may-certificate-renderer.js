(function () {
    'use strict';

    if (window.MayCertificateRenderer && window.MayCertificateRenderer.version) return;

    const VERSION = '1.0.0';
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
        return {
            learnerName: cleanText(options.learnerName || options.name, 'Guest Learner'),
            grade: cleanText(options.grade),
            subject: cleanText(options.subject),
            term: cleanText(options.term),
            layout: options.layout === 'compact-subject' ? 'compact-subject' : 'standard',
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

    async function renderCertificate(result, includeExternalLogo) {
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
