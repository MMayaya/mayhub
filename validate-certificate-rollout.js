#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const defaultTarget = path.join(
    siteRoot,
    'Social-Sciences',
    'Term-3',
    'Grade-8',
    'Games',
    'History Assessment Games',
    'The Berlin Conference'
);
const targets = process.argv.slice(2).map(value => path.resolve(value));
if (!targets.length) targets.push(defaultTarget);

const failures = [];
const warnings = [];

function fail(file, message) {
    failures.push(path.relative(siteRoot, file) + ': ' + message);
}

function warn(file, message) {
    warnings.push(path.relative(siteRoot, file) + ': ' + message);
}

function collectHtmlFiles(target) {
    if (!fs.existsSync(target)) {
        failures.push(path.relative(siteRoot, target) + ': target does not exist');
        return [];
    }
    const stat = fs.statSync(target);
    if (stat.isFile()) return target.toLowerCase().endsWith('.html') ? [target] : [];
    return fs.readdirSync(target, { withFileTypes: true }).flatMap(entry => {
        const entryPath = path.join(target, entry.name);
        if (entry.isDirectory()) return collectHtmlFiles(entryPath);
        return entry.isFile() && entry.name.toLowerCase().endsWith('.html') ? [entryPath] : [];
    });
}

function count(source, pattern) {
    return (source.match(pattern) || []).length;
}

function attributeValue(source, name) {
    const match = source.match(new RegExp('\\b' + name + '=["\\\']([^"\\\']+)["\\\']', 'i'));
    return match ? match[1].trim() : '';
}

function readConstLiteral(file, source, name) {
    const declarationPattern = new RegExp('\\bconst\\s+' + name + '\\s*=\\s*');
    const match = declarationPattern.exec(source);
    if (!match) return null;
    const literalStart = match.index + match[0].length;
    const opening = source[literalStart];
    if (opening !== '{' && opening !== '[') return null;
    const stack = [opening];
    let quote = '';
    let escaped = false;
    for (let index = literalStart + 1; index < source.length; index++) {
        const character = source[index];
        if (quote) {
            if (escaped) escaped = false;
            else if (character === '\\') escaped = true;
            else if (character === quote) quote = '';
            continue;
        }
        if (character === '"' || character === "'" || character === '`') {
            quote = character;
            continue;
        }
        if (character === '{' || character === '[') stack.push(character);
        else if (character === '}' || character === ']') {
            const expected = character === '}' ? '{' : '[';
            if (stack.pop() !== expected) {
                fail(file, 'contains an unbalanced ' + name + ' data literal');
                return null;
            }
            if (!stack.length) {
                try {
                    return vm.runInNewContext('(' + source.slice(literalStart, index + 1) + ')', Object.create(null), { timeout: 1000 });
                } catch (error) {
                    fail(file, 'could not read ' + name + ' data: ' + error.message);
                    return null;
                }
            }
        }
    }
    fail(file, 'contains an unclosed ' + name + ' data literal');
    return null;
}

function validateTrueFalseBalance(file, records, label) {
    if (!Array.isArray(records) || !records.length) {
        fail(file, label + ' is missing');
        return;
    }
    const answers = records.map(record => typeof record.a === 'number' ? record.options?.[record.a] : record.a);
    const trueCount = answers.filter(answer => answer === 'True').length;
    const falseCount = answers.filter(answer => answer === 'False').length;
    if (trueCount + falseCount !== records.length) fail(file, label + ' contains an invalid answer');
    if (Math.abs(trueCount - falseCount) > 1) {
        fail(file, label + ' is imbalanced: ' + trueCount + ' True and ' + falseCount + ' False');
    }
}

function validateMultipleChoiceBalance(file, records, label) {
    if (!Array.isArray(records) || !records.length) {
        fail(file, label + ' is missing');
        return;
    }
    const counts = [0, 0, 0, 0];
    records.forEach((record, questionIndex) => {
        if (!Array.isArray(record.options) || record.options.length !== 4) {
            fail(file, label + ' question ' + (questionIndex + 1) + ' must have four options');
            return;
        }
        const answerIndex = typeof record.a === 'number' ? record.a : record.options.indexOf(record.a);
        if (answerIndex < 0 || answerIndex > 3) {
            fail(file, label + ' question ' + (questionIndex + 1) + ' has no valid correct option');
            return;
        }
        counts[answerIndex] += 1;
    });
    if (Math.max(...counts) - Math.min(...counts) > 1) {
        fail(file, label + ' answer positions are imbalanced: ' + counts.join(', '));
    }
}

function validateRecordCount(file, records, expected, label) {
    if (!Array.isArray(records) || records.length !== expected) {
        fail(file, label + ' must contain ' + expected + ' records');
    }
}

function validateUniqueQuestions(file, records, label) {
    if (!Array.isArray(records)) return;
    const seen = new Set();
    records.forEach((record, index) => {
        const key = String(record?.q || '').trim().toLowerCase();
        if (!key) return;
        if (seen.has(key)) fail(file, label + ' repeats question ' + (index + 1));
        seen.add(key);
    });
}

function validateAnswerBalance(file, source) {
    const fileName = path.basename(file).toLowerCase();
    if (fileName === 'drag1.html') {
        const gameData = readConstLiteral(file, source, 'gameData');
        if (gameData) Object.entries(gameData).forEach(([key, records]) => validateRecordCount(file, records, 5, 'Drag ' + key));
    } else if (fileName === 'jeopardy1.html') {
        const questionBank = readConstLiteral(file, source, 'questionBank');
        if (questionBank) {
            validateRecordCount(file, questionBank, 40, 'Jeopardy question bank');
            validateUniqueQuestions(file, questionBank, 'Jeopardy question bank');
        }
    } else if (fileName === 'match1.html') {
        const gameData = readConstLiteral(file, source, 'gameData');
        if (gameData) Object.entries(gameData).forEach(([key, records]) => validateRecordCount(file, records, 20, 'Memory ' + key));
    } else if (fileName === 'spin1.html') {
        const gameData = readConstLiteral(file, source, 'gameData');
        if (!gameData) return;
        ['definitions', 'terms', 'multipleChoice', 'trueFalse'].forEach(key => {
            validateRecordCount(file, gameData[key], 10, 'Spin-the-Wheel ' + key);
            validateUniqueQuestions(file, gameData[key], 'Spin-the-Wheel ' + key);
        });
        validateTrueFalseBalance(file, gameData.trueFalse, 'Spin-the-Wheel True or False');
        validateMultipleChoiceBalance(file, gameData.multipleChoice, 'Spin-the-Wheel Multiple Choice');
    } else if (fileName === 'millionaire1.html') {
        const questions = readConstLiteral(file, source, 'questions');
        if (questions) {
            validateRecordCount(file, questions, 15, 'Millionaire');
            validateUniqueQuestions(file, questions, 'Millionaire');
            validateMultipleChoiceBalance(file, questions, 'Millionaire');
        }
    } else if (fileName === 'snake1.html') {
        const questionDB = readConstLiteral(file, source, 'questionDB');
        if (!questionDB) return;
        ['game1', 'game2', 'game3'].forEach((key, index) => {
            validateRecordCount(file, questionDB[key], 10, 'Snake category ' + (index + 1));
            validateUniqueQuestions(file, questionDB[key], 'Snake category ' + (index + 1));
            validateMultipleChoiceBalance(file, questionDB[key], 'Snake category ' + (index + 1));
        });
        validateRecordCount(file, questionDB.game4, 10, 'Snake True or False');
        validateUniqueQuestions(file, questionDB.game4, 'Snake True or False');
        validateTrueFalseBalance(file, questionDB.game4, 'Snake True or False');
    }
}

function validateInlineScripts(file, source) {
    const scripts = [...source.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
    scripts.forEach((match, index) => {
        try {
            new vm.Script(match[1], { filename: file + '#inline-' + (index + 1) });
        } catch (error) {
            fail(file, 'inline JavaScript ' + (index + 1) + ' does not parse: ' + error.message);
        }
    });
}

function validateScriptPaths(file, source) {
    const scripts = [...source.matchAll(/<script[^>]+\bsrc=["']([^"']+)["'][^>]*>/gi)].map(match => match[1]);
    scripts.filter(src => !/^(?:https?:)?\/\//i.test(src) && !/^data:/i.test(src)).forEach(src => {
        let decoded = src.split(/[?#]/)[0];
        try { decoded = decodeURIComponent(decoded); } catch {}
        const resolved = path.resolve(path.dirname(file), decoded);
        if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
            fail(file, 'missing local script: ' + src);
        }
    });
}

function validateCertificatePage(file, source) {
    const rendererCount = count(source, /may-certificate-renderer\.js/gi);
    const actionsCount = count(source, /may-certificate-actions\.js/gi);
    const controllerCount = count(source, /assessment-certificate\.js/gi);
    const audioCount = count(source, /game-audio\.js/gi);
    const usesController = /MayHubCertificates\.show(?:Scored|Participation)\s*\(/.test(source);

    if (rendererCount !== 1) fail(file, 'must load may-certificate-renderer.js exactly once');
    if (actionsCount !== 1) fail(file, 'must load may-certificate-actions.js exactly once');
    if (audioCount !== 1) fail(file, 'must load game-audio.js exactly once for completion sounds');
    if (usesController && controllerCount !== 1) fail(file, 'controller-based games must load assessment-certificate.js exactly once');
    if (source.indexOf('may-certificate-renderer.js') > source.indexOf('may-certificate-actions.js')) {
        fail(file, 'renderer must load before certificate actions');
    }
    if (controllerCount && source.indexOf('may-certificate-actions.js') > source.indexOf('assessment-certificate.js')) {
        fail(file, 'certificate actions must load before the assessment controller');
    }

    for (const attribute of [
        'data-certificate-grade',
        'data-certificate-subject',
        'data-certificate-term',
        'data-certificate-topic',
        'data-certificate-game'
    ]) {
        if (!attributeValue(source, attribute)) fail(file, 'missing required metadata: ' + attribute);
    }
    if (/^Grade (?:10|11)$/.test(attributeValue(source, 'data-certificate-grade'))
        && attributeValue(source, 'data-certificate-subject') === 'Geography'
        && attributeValue(source, 'data-certificate-layout') !== 'compact-subject') {
        fail(file, 'Grade 10 and 11 Geography certificates must use the compact-subject layout');
    }
    if (/^Grade (?:10|11)$/.test(attributeValue(source, 'data-certificate-grade'))
        && attributeValue(source, 'data-certificate-subject') === 'Geography') {
        if (/Which geographical term means/i.test(source)) {
            fail(file, 'contains the removed “Which geographical term means” wording');
        }
        if (/"(?:q|exp)"\s*:\s*"[^"]* — [^"]*"/.test(source)) {
            fail(file, 'uses a dash instead of a colon between a term and its definition');
        }
    }

    if (/function\s+(?:certificatePalette|canvasToPngBlob|drawCertificateBrandFallback)\s*\(/.test(source)) {
        fail(file, 'contains duplicated certificate-rendering code');
    }
    if (count(source, /function\s+shareWhatsApp\s*\(/g) > 1) fail(file, 'contains duplicate WhatsApp handlers');
    if (count(source, /function\s+downloadCertificate\s*\(/g) > 1) fail(file, 'contains duplicate download handlers');

    const scoredCalls = [...source.matchAll(/MayHubCertificates\.showScored\s*\(\s*\{([\s\S]{0,1600}?)\}\s*\)/g)];
    scoredCalls.forEach(match => {
        if (!/\bcorrect\s*:/.test(match[1])) fail(file, 'a scored certificate call is missing correct');
        if (!/\btotal\s*:/.test(match[1])) fail(file, 'a scored certificate call is missing total');
    });
    if (/Can you beat my score|Grade 8 Social Sciences History - The Berlin Conference/.test(source)) {
        fail(file, 'contains an obsolete long certificate-sharing caption');
    }
    if (/\bdetail\s*:/.test(source)) {
        fail(file, 'contains a removed secondary certificate detail remark');
    }

    validateScriptPaths(file, source);
    validateInlineScripts(file, source);
    validateAnswerBalance(file, source);
}

function validateSharedFiles() {
    const sharedFiles = [
        'may-certificate-renderer.js',
        'may-certificate-actions.js',
        'certificate-preview.js',
        'assessment-certificate.js',
        'sw.js'
    ].map(name => path.join(siteRoot, name));
    sharedFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            fail(file, 'required shared file is missing');
            return;
        }
        try {
            new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file });
        } catch (error) {
            fail(file, 'JavaScript does not parse: ' + error.message);
        }
    });

    const controller = fs.readFileSync(path.join(siteRoot, 'assessment-certificate.js'), 'utf8');
    if (/Grade 8|The Berlin Conference/.test(controller)) {
        fail(path.join(siteRoot, 'assessment-certificate.js'), 'shared controller contains topic-specific wording');
    }
    if (!/MayCertificateRenderer\.create/.test(controller)) {
        fail(path.join(siteRoot, 'assessment-certificate.js'), 'shared controller does not use MayCertificateRenderer');
    }

    const helper = fs.readFileSync(path.join(siteRoot, 'may-certificate-actions.js'), 'utf8');
    const serviceWorker = fs.readFileSync(path.join(siteRoot, 'sw.js'), 'utf8');
    const helperVersion = helper.match(/SERVICE_WORKER_VERSION\s*=\s*'([^']+)'/);
    const workerVersion = serviceWorker.match(/SERVICE_WORKER_VERSION\s*=\s*'([^']+)'/);
    if (!helperVersion || !workerVersion || helperVersion[1] !== workerVersion[1]) {
        fail(path.join(siteRoot, 'sw.js'), 'service-worker version does not match the certificate action helper');
    }
    if (!serviceWorker.includes('/may-certificate-renderer.js')) {
        fail(path.join(siteRoot, 'sw.js'), 'shared renderer is not in the core offline assets');
    }
    if (!serviceWorker.includes('/certificate-preview.js')) {
        fail(path.join(siteRoot, 'sw.js'), 'certificate preview is not in the core offline assets');
    }
    const preview = fs.readFileSync(path.join(siteRoot, 'certificate-preview.js'), 'utf8');
    if (!/window\.location\.protocol === 'file:'/.test(preview) || !/localhost/.test(preview)) {
        fail(path.join(siteRoot, 'certificate-preview.js'), 'preview tool is missing its local-environment restriction');
    }
    if (!/certificatePreview/.test(helper) || !/event\.ctrlKey/.test(helper) || !/event\.altKey/.test(helper)) {
        fail(path.join(siteRoot, 'may-certificate-actions.js'), 'preview query parameter or keyboard shortcut loader is missing');
    }
    const coreAssetsBlock = serviceWorker.match(/const CORE_ASSETS\s*=\s*\[([\s\S]*?)\];/);
    if (!coreAssetsBlock) {
        fail(path.join(siteRoot, 'sw.js'), 'CORE_ASSETS is missing');
    } else {
        const coreAssets = [...coreAssetsBlock[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
        coreAssets.forEach(asset => {
            let decoded = asset.replace(/^\//, '');
            try { decoded = decodeURIComponent(decoded); } catch {}
            const assetFile = path.join(siteRoot, ...decoded.split('/'));
            if (!fs.existsSync(assetFile) || !fs.statSync(assetFile).isFile()) {
                fail(path.join(siteRoot, 'sw.js'), 'missing core offline asset: ' + asset);
            }
        });
    }
    if (/Berlin%20Conference\/(?:drag|jeopardy|match|millionaire|snake|spin)1\.html/.test(serviceWorker)) {
        fail(path.join(siteRoot, 'sw.js'), 'service worker still contains per-game Berlin Conference cache entries');
    }
    if (!/RUNTIME_CACHE_NAME/.test(serviceWorker) || !/requestUrl\.pathname\.endsWith\('\.html'\)/.test(serviceWorker)) {
        fail(path.join(siteRoot, 'sw.js'), 'service worker is not configured for scalable runtime HTML caching');
    }
}

validateSharedFiles();
const htmlFiles = [...new Set(targets.flatMap(collectHtmlFiles))];
let certificatePages = 0;
htmlFiles.forEach(file => {
    const source = fs.readFileSync(file, 'utf8');
    const isCertificatePage = /may-certificate-actions\.js|MayHubCertificates\.show(?:Scored|Participation)\s*\(|function\s+shareWhatsApp\s*\(/.test(source);
    if (!isCertificatePage) return;
    certificatePages += 1;
    validateCertificatePage(file, source);
});

if (!certificatePages) warnings.push('No certificate-enabled game pages were found in the supplied targets.');
warnings.forEach(message => console.warn('WARNING:', message));
if (failures.length) {
    failures.forEach(message => console.error('ERROR:', message));
    console.error('\nCertificate rollout validation failed with ' + failures.length + ' error(s).');
    process.exit(1);
}
console.log('Certificate rollout validation passed for ' + certificatePages + ' game page(s).');
