#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const questRoot = path.join(siteRoot, 'Geography', 'Term-3', 'Grade-11', 'Games', 'Assessment Games', 'GeoQuest');
const failures = [];

function fail(message) {
    failures.push(message);
}

function read(file) {
    const target = path.join(questRoot, file);
    if (!fs.existsSync(target)) {
        fail('Missing ' + file);
        return '';
    }
    return fs.readFileSync(target, 'utf8');
}

function expectedTradeStatus(pack, country) {
    const exportShare = pack.exportPartners.find(([name]) => name === country)?.[1];
    const importShare = pack.importPartners.find(([name]) => name === country)?.[1];
    if (!Number.isFinite(exportShare) || !Number.isFinite(importShare)) return '';
    const exportValue = pack.exports * exportShare / 100;
    const importValue = pack.imports * importShare / 100;
    return exportValue > importValue ? 'Positive' : exportValue < importValue ? 'Negative' : 'Balanced';
}

function validatePack(packId, pack) {
    if (!pack || !Array.isArray(pack.questions) || pack.questions.length !== 8) {
        fail('Source Pack ' + packId + ' must contain eight questions');
        return;
    }
    const ids = new Set();
    pack.questions.forEach(question => {
        if (!question.id || ids.has(question.id)) fail('Source Pack ' + packId + ' has a missing or repeated question id');
        ids.add(question.id);
        if (!Array.isArray(question.options) || question.options.length !== 2) fail(packId + '/' + question.id + ' must contain two options');
        if (!question.options.includes(question.answer)) fail(packId + '/' + question.id + ' has an answer outside its options');
        if (!String(question.feedback || '').trim()) fail(packId + '/' + question.id + ' is missing feedback');
        if (/\b1\.1(?:\.\d+)?\b/.test(question.prompt)) fail(packId + '/' + question.id + ' exposes an examination question number');
    });

    const expectedBalance = Number((pack.exports - pack.imports).toFixed(2));
    if (Math.abs(expectedBalance - pack.balance) > .001) fail('Source Pack ' + packId + ' has an incorrect overall trade balance');
    const answer = id => pack.questions.find(question => question.id === id)?.answer;
    const valueAnswer = pack.exports > pack.imports ? 'Exports; imports' : 'Imports; exports';
    if (answer('trade-value') !== valueAnswer) fail('Source Pack ' + packId + ' trade-value answer conflicts with its totals');
    if (answer('usa-balance') !== expectedTradeStatus(pack, 'United States')) fail('Source Pack ' + packId + ' USA balance answer conflicts with its data');
    const germanyStatus = expectedTradeStatus(pack, 'Germany') === 'Positive' ? 'Surplus' : 'Deficit';
    if (answer('germany-balance') !== germanyStatus) fail('Source Pack ' + packId + ' Germany balance answer conflicts with its data');
    const germanyShare = pack.exportPartners.find(([name]) => name === 'Germany')?.[1];
    if (answer('germany-share') !== germanyShare.toFixed(1) + '%') fail('Source Pack ' + packId + ' Germany share answer conflicts with its data');

    const image = path.join(questRoot, pack.sourceImage);
    if (!fs.existsSync(image)) fail('Source Pack ' + packId + ' image is missing');
    else {
        const bytes = fs.readFileSync(image);
        if (bytes.length < 50000 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) fail('Source Pack ' + packId + ' is not a substantial JPEG source');
    }
}

const dataSource = read('source-packs.js');
const sandbox = { window: {} };
try { vm.runInNewContext(dataSource, sandbox, { filename: 'source-packs.js', timeout: 1000 }); }
catch (error) { fail('source-packs.js does not parse: ' + error.message); }
const packs = sandbox.window.GeoQuestStage1Packs || {};
if (Object.keys(packs).sort().join(',') !== 'A,B') fail('Exactly Source Packs A and B are required');
Object.entries(packs).forEach(([packId, pack]) => validatePack(packId, pack));

const stage2Source = read('stage2-data.js');
const stage2Sandbox = { window: {} };
try { vm.runInNewContext(stage2Source, stage2Sandbox, { filename: 'stage2-data.js', timeout: 1000 }); }
catch (error) { fail('stage2-data.js does not parse: ' + error.message); }
const stage2 = stage2Sandbox.window.GeoQuestStage2Data || {};
const expectedStage2Answers = new Set([
    'Development',
    'GINI coefficient',
    'Life expectancy',
    'GDP (Gross Domestic Product)',
    'Sustainable development',
    'MEDCs',
    'Human Development Index (HDI)'
]);
if (!Array.isArray(stage2.terms) || stage2.terms.length !== 9 || new Set(stage2.terms).size !== 9) {
    fail('Stage 2 must contain nine unique compass terms');
}
if (!Array.isArray(stage2.definitions) || stage2.definitions.length !== 7) {
    fail('Stage 2 must contain seven definitions');
} else {
    const ids = new Set();
    const answers = new Set();
    stage2.definitions.forEach(definition => {
        if (!definition.id || ids.has(definition.id)) fail('Stage 2 has a missing or repeated definition id');
        ids.add(definition.id);
        if (!stage2.terms.includes(definition.answer)) fail('Stage 2 answer is outside the term bank: ' + definition.answer);
        if (answers.has(definition.answer)) fail('Stage 2 repeats an assessed answer: ' + definition.answer);
        answers.add(definition.answer);
        if (!String(definition.prompt || '').trim() || !String(definition.feedback || '').trim()) fail('Stage 2 definition ' + definition.id + ' is incomplete');
        if (/\b1\.2(?:\.\d+)?\b/.test(definition.prompt)) fail('Stage 2 exposes an examination question number');
    });
    if ([...expectedStage2Answers].some(answer => !answers.has(answer)) || answers.size !== expectedStage2Answers.size) {
        fail('Stage 2 assessed-answer set does not match the paper section');
    }
    const distractors = stage2.terms.filter(term => !answers.has(term)).sort();
    if (distractors.join('|') !== ['LEDCs', 'Resource management'].sort().join('|')) fail('Stage 2 term-bank distractors are incorrect');
}

const stage3Source = read('stage3-data.js');
const stage3Sandbox = { window: {} };
try { vm.runInNewContext(stage3Source, stage3Sandbox, { filename: 'stage3-data.js', timeout: 1000 }); }
catch (error) { fail('stage3-data.js does not parse: ' + error.message); }
const stage3 = stage3Sandbox.window.GeoQuestStage3Data || {};
if (!Array.isArray(stage3.questions) || stage3.questions.length !== 6) {
    fail('Stage 3 must contain six challenges');
} else {
    const ids = new Set();
    const expectedMarks = [2, 1, 2, 2, 4, 4];
    stage3.questions.forEach((question, index) => {
        if (!question.id || ids.has(question.id)) fail('Stage 3 has a missing or repeated question id');
        ids.add(question.id);
        if (question.marks !== expectedMarks[index]) fail('Stage 3 mark allocation is incorrect for ' + question.id);
        if (!['single', 'multiple'].includes(question.mode)) fail('Stage 3 has an invalid mode for ' + question.id);
        if (!Array.isArray(question.options) || question.options.length < 3 || new Set(question.options).size !== question.options.length) fail('Stage 3 options are invalid for ' + question.id);
        if (!Array.isArray(question.correctAnswers) || !question.correctAnswers.length || question.correctAnswers.some(answer => !question.options.includes(answer))) fail('Stage 3 correct answers are invalid for ' + question.id);
        if (!String(question.prompt || '').trim() || !String(question.instruction || '').trim() || !String(question.feedback || '').trim()) fail('Stage 3 challenge is incomplete: ' + question.id);
        if (/\b1\.3(?:\.\d+)?\b/.test(question.prompt)) fail('Stage 3 exposes an examination question number');
        if (question.mode === 'multiple' && (question.selectLimit !== 2 || question.pointsPerCorrect !== 2)) fail('Stage 3 multi-select marking is incorrect for ' + question.id);
    });
    if (stage3.questions.reduce((sum, question) => sum + question.marks, 0) !== 15) fail('Stage 3 must total 15 marks');
    if (stage3.questions.filter(question => question.mode === 'single').length !== 4 || stage3.questions.filter(question => question.mode === 'multiple').length !== 2) fail('Stage 3 interaction mix must be four single and two multi-select challenges');
    const strategies = stage3.questions.find(question => question.id === 'development-strategies');
    if (strategies?.correctAnswers.length !== 3) fail('Stage 3 must accept all three memorandum-aligned development strategies while learners select any two');
}
const stage3Image = path.join(questRoot, stage3.sourceImage || '');
if (!stage3.sourceImage || !fs.existsSync(stage3Image)) fail('Stage 3 source image is missing');
else {
    const bytes = fs.readFileSync(stage3Image);
    if (bytes.length < 100000 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) fail('Stage 3 source must be a substantial JPEG image');
}

const stage4Source = read('stage4-data.js');
const stage4Sandbox = { window: {} };
try { vm.runInNewContext(stage4Source, stage4Sandbox, { filename: 'stage4-data.js', timeout: 1000 }); }
catch (error) { fail('stage4-data.js does not parse: ' + error.message); }
const stage4 = stage4Sandbox.window.GeoQuestStage4Data || {};
if (!Array.isArray(stage4.questions) || stage4.questions.length !== 6) {
    fail('Stage 4 must contain six checkpoints');
} else {
    const ids = new Set();
    const expectedIds = ['promoting-free-trade', 'source-reason', 'country-groups', 'trade-regulations', 'free-trade-advantages', 'free-trade-disadvantage'];
    const expectedMarks = [1, 2, 2, 4, 4, 2];
    stage4.questions.forEach((question, index) => {
        if (!question.id || ids.has(question.id)) fail('Stage 4 has a missing or repeated question id');
        ids.add(question.id);
        if (question.id !== expectedIds[index]) fail('Stage 4 paper sequence is incorrect at checkpoint ' + (index + 1));
        if (question.marks !== expectedMarks[index]) fail('Stage 4 mark allocation is incorrect for ' + question.id);
        if (!['single', 'multiple'].includes(question.mode)) fail('Stage 4 has an invalid mode for ' + question.id);
        if (!Array.isArray(question.options) || question.options.length < 2 || new Set(question.options).size !== question.options.length) fail('Stage 4 options are invalid for ' + question.id);
        if (!Array.isArray(question.correctAnswers) || !question.correctAnswers.length || question.correctAnswers.some(answer => !question.options.includes(answer))) fail('Stage 4 correct answers are invalid for ' + question.id);
        if (!String(question.prompt || '').trim() || !String(question.instruction || '').trim() || !String(question.feedback || '').trim()) fail('Stage 4 checkpoint is incomplete: ' + question.id);
        if (/\b1\.4(?:\.\d+)?\b/.test(question.prompt)) fail('Stage 4 exposes an examination question number');
        if (question.mode === 'multiple' && (question.selectLimit !== 2 || question.pointsPerCorrect !== 2 || question.correctAnswers.length !== 2)) fail('Stage 4 multi-select marking is incorrect for ' + question.id);
    });
    if (stage4.questions.reduce((sum, question) => sum + question.marks, 0) !== 15) fail('Stage 4 must total 15 marks');
    if (stage4.questions.filter(question => question.mode === 'single').length !== 4 || stage4.questions.filter(question => question.mode === 'multiple').length !== 2) fail('Stage 4 interaction mix must be four single and two multi-select checkpoints');
}
const stage4Image = path.join(questRoot, stage4.sourceImage || '');
if (!stage4.sourceImage || !fs.existsSync(stage4Image)) fail('Stage 4 source image is missing');
else {
    const bytes = fs.readFileSync(stage4Image);
    if (bytes.length < 100000 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) fail('Stage 4 source must be a substantial JPEG image');
}

const stage5Source = read('stage5-data.js');
const stage5Sandbox = { window: {} };
try { vm.runInNewContext(stage5Source, stage5Sandbox, { filename: 'stage5-data.js', timeout: 1000 }); }
catch (error) { fail('stage5-data.js does not parse: ' + error.message); }
const stage5 = stage5Sandbox.window.GeoQuestStage5Data || {};
if (!Array.isArray(stage5.questions) || stage5.questions.length !== 5) {
    fail('Stage 5 must contain five aid operations');
} else {
    const ids = new Set();
    const expectedIds = ['development-aid', 'aid-routes', 'food-organisation', 'other-humanitarian-aid', 'humanitarian-decision'];
    const expectedMarks = [1, 4, 1, 1, 8];
    const expectedModes = ['single', 'multiple', 'single', 'single', 'multiple'];
    stage5.questions.forEach((question, index) => {
        if (!question.id || ids.has(question.id)) fail('Stage 5 has a missing or repeated question id');
        ids.add(question.id);
        if (question.id !== expectedIds[index]) fail('Stage 5 paper sequence is incorrect at operation ' + (index + 1));
        if (question.marks !== expectedMarks[index]) fail('Stage 5 mark allocation is incorrect for ' + question.id);
        if (question.mode !== expectedModes[index]) fail('Stage 5 has an invalid mode for ' + question.id);
        if (!Array.isArray(question.options) || question.options.length < 3 || new Set(question.options).size !== question.options.length) fail('Stage 5 options are invalid for ' + question.id);
        if (!Array.isArray(question.correctAnswers) || !question.correctAnswers.length || question.correctAnswers.some(answer => !question.options.includes(answer))) fail('Stage 5 correct answers are invalid for ' + question.id);
        if (!String(question.prompt || '').trim() || !String(question.instruction || '').trim() || !String(question.feedback || '').trim()) fail('Stage 5 operation is incomplete: ' + question.id);
        if (/\b1\.5(?:\.\d+)?\b/.test(question.prompt)) fail('Stage 5 exposes an examination question number');
        if (question.mode === 'single' && question.correctAnswers.length !== 1) fail('Stage 5 single-choice answer count is incorrect for ' + question.id);
        if (question.mode === 'multiple' && (question.selectLimit !== question.correctAnswers.length || question.pointsPerCorrect !== 2)) fail('Stage 5 multi-select marking is incorrect for ' + question.id);
    });
    if (stage5.questions.reduce((sum, question) => sum + question.marks, 0) !== 15) fail('Stage 5 must total 15 marks');
    if (stage5.questions.filter(question => question.mode === 'single').length !== 3 || stage5.questions.filter(question => question.mode === 'multiple').length !== 2) fail('Stage 5 interaction mix must be three single and two multi-select aid operations');
    if (stage5.questions[1]?.selectLimit !== 2 || stage5.questions[1]?.correctAnswers.length !== 2) fail('Stage 5 aid-route comparison must assess two distinctions');
    if (stage5.questions[4]?.selectLimit !== 4 || stage5.questions[4]?.correctAnswers.length !== 4) fail('Stage 5 humanitarian decision must assess four balanced motivation points');
}
const stage5Image = path.join(questRoot, stage5.sourceImage || '');
if (!stage5.sourceImage || !fs.existsSync(stage5Image)) fail('Stage 5 source image is missing');
else {
    const bytes = fs.readFileSync(stage5Image);
    if (bytes.length < 100000 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) fail('Stage 5 source must be a substantial JPEG image');
}

const page = read('GeoQuest.html');
const logic = read('geoquest.js');
const styles = read('geoquest.css');
for (const required of ['geoquest.css', 'game-audio.js', 'may-certificate-renderer.js', 'may-certificate-actions.js', 'assessment-certificate.js', 'source-packs.js', 'stage2-data.js', 'stage3-data.js', 'stage4-data.js', 'stage5-data.js', 'geoquest.js']) {
    if (!page.includes(required)) fail('GeoQuest.html is missing ' + required);
}
for (const id of ['sourceOverlay', 'sourceImage', 'headerSourceButton', 'closeSourceButton', 'answerGrid', 'feedbackPanel', 'resultScreen', 'stage2Screen', 'termCardButton', 'stage2FeedbackPanel', 'stage2ResultScreen', 'overallScore', 'stage3Screen', 'stage3AnswerGrid', 'confirmStage3Button', 'stage3FeedbackPanel', 'stage3ResultScreen', 'stage3OverallScore', 'stage4Screen', 'stage4AnswerGrid', 'confirmStage4Button', 'stage4FeedbackPanel', 'stage4ResultScreen', 'stage4OverallScore', 'stage5Screen', 'stage5AnswerGrid', 'confirmStage5Button', 'stage5FeedbackPanel', 'stage5ResultScreen', 'continueStage6Button', 'stage6Screen', 'stage6Node', 'stage6Status', 'grandTotalPercent', 'grandTotalComment', 'finalExpeditionScore', 'finalStage1Score', 'finalStage2Score', 'finalStage3Score', 'finalStage4Score', 'finalStage5Score', 'finalStage1Comment', 'finalStage2Comment', 'finalStage3Comment', 'finalStage4Comment', 'finalStage5Comment', 'viewCertificateButton', 'newExpeditionButton', 'expeditionLimitPanel', 'expeditionCountdown']) {
    if (!page.includes('id="' + id + '"')) fail('GeoQuest.html is missing #' + id);
}
if ((page.match(/id="headerSourceButton"/g) || []).length !== 1 || !page.includes('floating-source-button')) fail('GeoQuest must have exactly one floating source control');
if (/Open Stage Source|Development source available|Black-and-white customs file|Humanitarian field brief|Preview Your Source|Inspect source|Review Stage 1 Source|Review Development Source|Review Customs Cartoon|Review Humanitarian Brief/.test(page + logic)) fail('GeoQuest still contains a redundant or inconsistent source control');
if (!logic.includes('localStorage.setItem(storageKey()')) fail('Saved learner progress is missing');
if (!logic.includes('localStorage.setItem(stage2StorageKey()')) fail('Saved Stage 2 learner progress is missing');
if (!logic.includes('localStorage.setItem(stage3StorageKey()')) fail('Saved Stage 3 learner progress is missing');
if (!logic.includes('localStorage.setItem(stage4StorageKey()')) fail('Saved Stage 4 learner progress is missing');
if (!logic.includes('localStorage.setItem(stage5StorageKey()')) fail('Saved Stage 5 learner progress is missing');
if (!logic.includes('shuffle(questions.map')) fail('Question shuffling is missing');
if (!logic.includes("question.options)]")) fail('Option shuffling is missing');
if (!logic.includes('termOrders:') || !logic.includes('shuffle(terms)')) fail('Stage 2 term-carousel shuffling is missing');
if (!logic.includes("showScreen('stage2')") || !logic.includes("showScreen('stage2Result')")) fail('Stage 2 navigation flow is incomplete');
if (!logic.includes("showScreen('stage3')") || !logic.includes("showScreen('stage3Result')")) fail('Stage 3 navigation flow is incomplete');
if (!logic.includes('correctSelections * question.pointsPerCorrect')) fail('Stage 3 partial marking is missing');
if (!logic.includes("showScreen('stage4')") || !logic.includes("showScreen('stage4Result')")) fail('Stage 4 navigation flow is incomplete');
if (!logic.includes("showScreen('stage5')") || !logic.includes("showScreen('stage5Result')")) fail('Stage 5 navigation flow is incomplete');
if (!logic.includes('state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score')) fail('Five-stage expedition scoring is missing');
if (!logic.includes('function showExpeditionSummary') || !logic.includes('stagePerformanceComment') || !styles.includes('.stage-report-list') || !page.includes('Stage 6: Expedition Summary')) fail('The separate Stage 6 summary with performance comments is missing');
if (!styles.includes('grid-template-columns:repeat(6,minmax(0,1fr))')) fail('The expedition map does not include six desktop columns');
const stage5ResultMarkup = page.slice(page.indexOf('id="stage5ResultScreen"'), page.indexOf('id="stage6Screen"'));
if (stage5ResultMarkup.includes('finalExpeditionScore') || stage5ResultMarkup.includes('grand-total-card')) fail('The grand total is still displayed inside the Stage 5 result screen');
if (/Stage totals are displayed without revealing|review wrong answers|review incorrect answers/i.test(page)) fail('The learner-facing results still contain an internal answer-review note');
if (!logic.includes('expeditionTotalMarks = 60')) fail('The grand expedition total must be 60 marks');
if (/Try Another Source Route|Replay Aid Operations|Replay Customs Control|Replay Development Routes|Replay the Term Trail/.test(page + logic)) fail('GeoQuest still exposes an individual-stage replay control');
if (!page.includes('Return to Question') || !styles.includes('.source-return-button')) fail('The source viewer must return from the same bottom-right control position');
if (!page.includes('May%20Learning%20Hub%20Logo.png') || !page.includes('class="quest-heading-logo"') || !styles.includes('.quest-heading-logo img')) fail('The title-height May Learning Hub logo is missing beside the GeoQuest heading');
if (!logic.includes('expeditionAttemptLimit = 2') || !logic.includes('expeditionCooldownMs = 6 * 60 * 60 * 1000')) fail('GeoQuest must allow two completions followed by a six-hour cooldown');
if (!logic.includes('formatCountdown') || !logic.includes('setInterval(updateExpeditionLimitUI, 1000)')) fail('The live cooldown countdown is missing');
if (!logic.includes('order: shuffle(questions.map(question => question.id))') || !logic.includes('optionOrders: Object.fromEntries')) fail('The expedition question and answer shuffling is missing');
if (!stage3Source.includes('Why are the benefits of GDP growth distributed unequally in many countries?')) fail('The shuffled Stage 3 dependent question is not self-contained');
if (!stage4Source.includes('Which source clue proves that the wealthy trade official is restricting rather than promoting free trade?')) fail('The shuffled Stage 4 dependent question is not self-contained');
if (!logic.includes('MayHubCertificates.showScored')) fail('Completed GeoQuest certificate integration is missing');
if (!/@media\(max-width:620px\)/.test(styles)) fail('Mobile layout rules are missing');
if (!styles.includes('.term-carousel') || !styles.includes('.term-card')) fail('Stage 2 carousel styling is missing');
if (!styles.includes('.route-grid') || !styles.includes('.route-option')) fail('Stage 3 route-card styling is missing');
if (!styles.includes('.gate-panel') || !styles.includes('.gate-orbit')) fail('Stage 4 monochrome styling is missing');
if (!styles.includes('.aid-panel') || !styles.includes('.aid-source') || !styles.includes('.final-result-panel') || !styles.includes('.certificate-button')) fail('Stage 5 aid or certificate styling is missing');
if (!styles.includes('.floating-source-button') || !styles.includes('position:fixed') || !styles.includes('bottom:max(') || !styles.includes('right:max(')) fail('The accessible bottom-right source control styling is missing');

for (const file of ['geoquest.js', 'source-packs.js', 'stage2-data.js', 'stage3-data.js', 'stage4-data.js', 'stage5-data.js']) {
    try { new vm.Script(read(file), { filename: file }); }
    catch (error) { fail(file + ' does not parse: ' + error.message); }
}

const landing = fs.readFileSync(path.join(questRoot, '..', 'assessment-games.html'), 'utf8');
if (!landing.includes('GeoQuest/GeoQuest.html')) fail('The Grade 11 assessment landing page is missing the GeoQuest card');
const gameLinks = [...landing.matchAll(/<a href="([^"]+)" class="game-card"/g)].map(match => match[1]);
if (gameLinks.at(-1) !== 'GeoQuest/GeoQuest.html') fail('GeoQuest must be the final card on the Grade 11 assessment landing page');

const worker = fs.readFileSync(path.join(siteRoot, 'sw.js'), 'utf8');
const helper = fs.readFileSync(path.join(siteRoot, 'may-certificate-actions.js'), 'utf8');
for (const asset of ['GeoQuest/GeoQuest.html', 'GeoQuest/geoquest.css', 'GeoQuest/geoquest.js', 'GeoQuest/source-packs.js', 'GeoQuest/stage2-data.js', 'GeoQuest/stage3-data.js', 'GeoQuest/stage4-data.js', 'GeoQuest/stage5-data.js', 'trade-brief-a.jpg', 'trade-brief-b.jpg', 'development-crossroads.jpg', 'trade-gatekeepers.jpg', 'aid-operations-brief.jpg']) {
    if (!worker.includes(asset)) fail('Service worker is missing GeoQuest asset ' + asset);
}
for (const asset of ['/may-certificate-history.js', '/certificate-history.html', '/certificate-history-page.js']) {
    if (!worker.includes(asset)) fail('Service worker is missing certificate-history asset ' + asset);
}
const workerVersion = worker.match(/SERVICE_WORKER_VERSION\s*=\s*'([^']+)'/)?.[1];
const helperVersion = helper.match(/SERVICE_WORKER_VERSION\s*=\s*'([^']+)'/)?.[1];
if (!workerVersion || workerVersion !== helperVersion) fail('Service-worker and certificate-helper versions do not match');

if (/88\s?679\s?256\s?980|101\s?762\s?020\s?372/.test(dataSource + stage2Source + stage3Source + stage4Source + stage5Source + page + logic)) {
    fail('GeoQuest still contains the examination paper trade totals');
}

if (failures.length) {
    console.error('GeoQuest Stage 1-5 validation failed:\n- ' + failures.join('\n- '));
    process.exit(1);
}
console.log('GeoQuest Stage 1-6 validation passed: five assessment stages, a separate summary stage, 60 verified marks, saved progress, responsive interactions and certificate integration.');
