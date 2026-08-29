'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const gameDirectory = path.join(root, 'Social-Sciences', 'Term-3', 'Grade-8', 'Games', 'History Assessment Games', 'HistoryQuest');
const htmlPath = path.join(gameDirectory, 'HistoryQuest.html');
const dataPath = path.join(gameDirectory, 'stage1-data.js');
const stage2DataPath = path.join(gameDirectory, 'stage2-data.js');
const stage3DataPath = path.join(gameDirectory, 'stage3-data.js');
const stage4DataPath = path.join(gameDirectory, 'stage4-data.js');
const stage5DataPath = path.join(gameDirectory, 'stage5-data.js');
const stage6DataPath = path.join(gameDirectory, 'stage6-data.js');
const scriptPath = path.join(gameDirectory, 'historyquest.js');
const stylePath = path.join(gameDirectory, 'historyquest.css');
const landingPath = path.join(gameDirectory, '..', 'history-assessment-games.html');
const sourcePath = path.join(gameDirectory, 'sources', 'berlin-conference-cartoon.jpg');
const stage2SourcePath = path.join(gameDirectory, 'sources', 'causes-of-colonisation.jpg');
const stage3SourcePath = path.join(gameDirectory, 'sources', 'patterns-of-colonisation.jpg');
const stage4SourcePath = path.join(gameDirectory, 'sources', 'results-of-colonisation.jpg');
const stage5SourcePath = path.join(gameDirectory, 'sources', 'ashanti-resistance.jpg');

const html = fs.readFileSync(htmlPath, 'utf8');
const script = fs.readFileSync(scriptPath, 'utf8');
const styles = fs.readFileSync(stylePath, 'utf8');
const landing = fs.readFileSync(landingPath, 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(stage2DataPath, 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(stage3DataPath, 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(stage4DataPath, 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(stage5DataPath, 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(stage6DataPath, 'utf8'), sandbox);
const data = sandbox.window.HistoryQuestStage1Data;
const stage2Data = sandbox.window.HistoryQuestStage2Data;
const stage3Data = sandbox.window.HistoryQuestStage3Data;
const stage4Data = sandbox.window.HistoryQuestStage4Data;
const stage5Data = sandbox.window.HistoryQuestStage5Data;
const stage6Data = sandbox.window.HistoryQuestStage6Data;

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

assert(data && Array.isArray(data.questions), 'Stage 1 data is unavailable.');
assert(data.questions.length === 7, 'Stage 1 must contain seven assessment questions.');
assert(data.questions.reduce((sum, question) => sum + question.marks, 0) === 9, 'Stage 1 must total nine marks.');
assert(new Set(data.questions.map(question => question.id)).size === data.questions.length, 'Question ids must be unique.');
assert(data.questions.filter(question => question.usesSource).length >= 4, 'At least four prompts must meaningfully use the source.');

for (const question of data.questions) {
    assert(Array.isArray(question.options) && question.options.length >= 2, `Question ${question.id} has too few options.`);
    assert(new Set(question.options).size === question.options.length, `Question ${question.id} has duplicate options.`);
    assert(question.options.includes(question.answer), `Question ${question.id} does not contain its answer.`);
    assert(Number.isInteger(question.marks) && question.marks > 0, `Question ${question.id} has invalid marks.`);
}

assert(stage2Data && Array.isArray(stage2Data.questions), 'Stage 2 data is unavailable.');
assert(stage2Data.questions.length === 4, 'Stage 2 must contain four assessment challenges.');
assert(stage2Data.questions.reduce((sum, question) => sum + question.marks, 0) === 7, 'Stage 2 must total seven marks.');
assert(new Set(stage2Data.questions.map(question => question.id)).size === stage2Data.questions.length, 'Stage 2 question ids must be unique.');
assert(stage2Data.questions.every(question => question.usesSource), 'Every Stage 2 challenge must use the new source.');
for (const question of stage2Data.questions) {
    assert(['single', 'multiple'].includes(question.mode), `Stage 2 question ${question.id} has an invalid mode.`);
    assert(Number.isInteger(question.selectLimit) && question.selectLimit > 0, `Stage 2 question ${question.id} has an invalid selection limit.`);
    assert(Array.isArray(question.options) && new Set(question.options).size === question.options.length, `Stage 2 question ${question.id} has invalid options.`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length === question.marks, `Stage 2 question ${question.id} must have one correct answer per mark.`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 2 question ${question.id} has an answer outside its options.`);
}

assert(stage3Data && Array.isArray(stage3Data.questions), 'Stage 3 data is unavailable.');
assert(stage3Data.questions.length === 4, 'Stage 3 must contain four assessment challenges.');
assert(stage3Data.questions.reduce((sum, question) => sum + question.marks, 0) === 5, 'Stage 3 must total five marks.');
assert(new Set(stage3Data.questions.map(question => question.id)).size === stage3Data.questions.length, 'Stage 3 question ids must be unique.');
assert(stage3Data.questions.every(question => question.usesSource), 'Every Stage 3 challenge must use the map source.');
for (const question of stage3Data.questions) {
    assert(['single', 'multiple'].includes(question.mode), `Stage 3 question ${question.id} has an invalid mode.`);
    assert(Number.isInteger(question.selectLimit) && question.selectLimit > 0, `Stage 3 question ${question.id} has an invalid selection limit.`);
    assert(Array.isArray(question.options) && new Set(question.options).size === question.options.length, `Stage 3 question ${question.id} has invalid options.`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= question.selectLimit, `Stage 3 question ${question.id} has too few accepted answers.`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 3 question ${question.id} has an answer outside its options.`);
}

assert(stage4Data && Array.isArray(stage4Data.questions), 'Stage 4 data is unavailable.');
assert(stage4Data.questions.length === 5, 'Stage 4 must contain five assessment challenges.');
assert(stage4Data.questions.reduce((sum, question) => sum + question.marks, 0) === 7, 'Stage 4 must total seven marks.');
assert(new Set(stage4Data.questions.map(question => question.id)).size === stage4Data.questions.length, 'Stage 4 question ids must be unique.');
assert(stage4Data.questions.every(question => question.usesSource), 'Every Stage 4 challenge must use the cartoon source.');
for (const question of stage4Data.questions) {
    assert(['single', 'multiple'].includes(question.mode), `Stage 4 question ${question.id} has an invalid mode.`);
    assert(Number.isInteger(question.selectLimit) && question.selectLimit > 0, `Stage 4 question ${question.id} has an invalid selection limit.`);
    assert(Array.isArray(question.options) && new Set(question.options).size === question.options.length, `Stage 4 question ${question.id} has invalid options.`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= question.selectLimit, `Stage 4 question ${question.id} has too few accepted answers.`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 4 question ${question.id} has an answer outside its options.`);
}

assert(stage5Data && Array.isArray(stage5Data.questions), 'Stage 5 data is unavailable.');
assert(stage5Data.questions.length === 6, 'Stage 5 must contain six assessment challenges.');
assert(stage5Data.questions.reduce((sum, question) => sum + question.marks, 0) === 7, 'Stage 5 must total seven marks.');
assert(new Set(stage5Data.questions.map(question => question.id)).size === stage5Data.questions.length, 'Stage 5 question ids must be unique.');
assert(stage5Data.questions.every(question => question.usesSource), 'Every Stage 5 challenge must use the illustrated archive source.');
for (const question of stage5Data.questions) {
    assert(['single', 'multiple'].includes(question.mode), `Stage 5 question ${question.id} has an invalid mode.`);
    assert(Number.isInteger(question.selectLimit) && question.selectLimit > 0, `Stage 5 question ${question.id} has an invalid selection limit.`);
    assert(Array.isArray(question.options) && new Set(question.options).size === question.options.length, `Stage 5 question ${question.id} has invalid options.`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= question.selectLimit, `Stage 5 question ${question.id} has too few accepted answers.`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 5 question ${question.id} has an answer outside its options.`);
}

assert(stage6Data && Array.isArray(stage6Data.questions), 'Stage 6 data is unavailable.');
assert(stage6Data.questions.length === 4, 'Stage 6 must contain four essay-building phases.');
assert(stage6Data.questions.reduce((sum, question) => sum + question.marks, 0) === 15, 'Stage 6 must total fifteen marks.');
assert(stage6Data.questions.map(question => question.section).join('|') === 'Introduction|Causes|Results|Conclusion', 'Stage 6 must preserve the essay structure.');
assert(stage6Data.questions.every(question => question.mode === 'multiple'), 'Every Stage 6 phase must use interactive statement selection.');
assert(stage6Data.questions.every(question => question.usesSource === false), 'Stage 6 must not depend on a source.');
for (const question of stage6Data.questions) {
    assert(Number.isInteger(question.selectLimit) && question.selectLimit === question.marks, `Stage 6 question ${question.id} must award one mark per selected statement.`);
    assert(Array.isArray(question.options) && new Set(question.options).size === question.options.length, `Stage 6 question ${question.id} has invalid options.`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= question.selectLimit, `Stage 6 question ${question.id} has too few accepted statements.`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 6 question ${question.id} has an answer outside its options.`);
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(new Set(ids).size === ids.length, 'HistoryQuest.html contains duplicate ids.');
const references = [...script.matchAll(/getElementById\('([^']+)'\)/g)].map(match => match[1]);
const missingIds = [...new Set(references)].filter(id => !ids.includes(id));
assert(missingIds.length === 0, `Missing HTML ids: ${missingIds.join(', ')}`);

const localLinks = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(match => match[1])
    .filter(value => !value.startsWith('#') && !value.startsWith('http') && !value.startsWith('data:'));
for (const value of localLinks) {
    const target = path.resolve(gameDirectory, decodeURIComponent(value));
    assert(fs.existsSync(target), `Broken local path: ${value}`);
}

assert(fs.existsSync(sourcePath) && fs.statSync(sourcePath).size > 100000, 'The Berlin Conference source image is missing or empty.');
assert(fs.existsSync(stage2SourcePath) && fs.statSync(stage2SourcePath).size > 100000, 'The Causes of Colonisation source image is missing or empty.');
assert(fs.existsSync(stage3SourcePath) && fs.statSync(stage3SourcePath).size > 100000, 'The Patterns of Colonisation source image is missing or empty.');
assert(fs.existsSync(stage4SourcePath) && fs.statSync(stage4SourcePath).size > 100000, 'The Results of Colonisation source image is missing or empty.');
assert(fs.existsSync(stage5SourcePath) && fs.statSync(stage5SourcePath).size > 100000, 'The Ashanti Resistance source image is missing or empty.');
assert(landing.includes('HistoryQuest/HistoryQuest.html'), 'The Grade 8 assessment page does not link to HistoryQuest.');
assert(html.includes('HistoryQuest: The African Expedition'), 'The HistoryQuest title is missing.');
assert(html.includes('Open Source') && html.includes('Return to Question'), 'The source controls are incomplete.');
assert(html.includes('Colonial Motives') && html.includes('stage2Screen') && html.includes('stage2ResultScreen'), 'The Stage 2 panels are incomplete.');
assert(html.includes('Conquest Routes') && html.includes('stage3Screen') && html.includes('stage3ResultScreen'), 'The Stage 3 panels are incomplete.');
assert(html.includes('Colonial Consequences') && html.includes('stage4Screen') && html.includes('stage4ResultScreen'), 'The Stage 4 panels are incomplete.');
assert(html.includes('Ashanti Resistance') && html.includes('stage5Screen') && html.includes('stage5ResultScreen'), 'The Stage 5 panels are incomplete.');
assert(html.includes('Essay Architect') && html.includes('stage6Screen') && html.includes('stage6ResultScreen'), 'The Stage 6 essay panels are incomplete.');
assert(html.includes('Grand Total') && html.includes('stage7Node') && html.includes('stage7Screen'), 'The Stage 7 Grand Total screen is incomplete.');
assert(html.includes('data-certificate-layout="premium-expedition"'), 'HistoryQuest does not use the premium certificate template.');
assert(html.includes('may-certificate-renderer.js') && html.includes('may-certificate-actions.js') && html.includes('assessment-certificate.js'), 'The shared certificate scripts are missing.');
assert(styles.includes('grid-template-columns:repeat(7,minmax(0,1fr))'), 'The seven HistoryQuest map stages are not symmetrical.');
assert(script.includes('shuffle(questions.map(question => question.id))'), 'Question shuffling is missing.');
assert(script.includes('shuffle(question.options)'), 'Answer-option shuffling is missing.');
assert(script.includes('shuffle(stage2Questions.map(question => question.id))'), 'Stage 2 question shuffling is missing.');
assert(script.includes('scoreStage2Question'), 'Stage 2 partial-mark scoring is missing.');
assert(script.includes("currentScreen === 'stage2' || currentScreen === 'stage2Result'"), 'Automatic source switching is missing.');
assert(script.includes('shuffle(stage3Questions.map(question => question.id))'), 'Stage 3 question shuffling is missing.');
assert(script.includes('scoreStage3Question'), 'Stage 3 accepted-answer scoring is missing.');
assert(script.includes("currentScreen === 'stage3' || currentScreen === 'stage3Result'"), 'Stage 3 source switching is missing.');
assert(script.includes('shuffle(stage4Questions.map(question => question.id))'), 'Stage 4 question shuffling is missing.');
assert(script.includes('scoreStage4Question'), 'Stage 4 accepted-answer scoring is missing.');
assert(script.includes("currentScreen === 'stage4' || currentScreen === 'stage4Result'"), 'Stage 4 source switching is missing.');
assert(script.includes('shuffle(stage5Questions.map(question => question.id))'), 'Stage 5 question shuffling is missing.');
assert(script.includes('scoreStage5Question'), 'Stage 5 accepted-answer scoring is missing.');
assert(script.includes("currentScreen === 'stage5' || currentScreen === 'stage5Result'"), 'Stage 5 source switching is missing.');
assert(script.includes('order: stage6Questions.map(question => question.id)'), 'Stage 6 essay order is not preserved.');
assert(script.includes('Object.fromEntries(stage6Questions.map(question => [question.id, shuffle(question.options)]))'), 'Stage 6 statement shuffling is missing.');
assert(script.includes('scoreStage6Question'), 'Stage 6 rubric scoring is missing.');
assert(script.includes("elements.sourceButton.hidden = name === 'stage6' || name === 'stage6Result'"), 'Stage 6 source-button suppression is missing.');
assert(script.includes('historyQuestTotalMarks !== 50'), 'The Stage 7 assessment total is not protected at 50 marks.');
assert(script.includes('showHistoryGrandTotal') && script.includes('fullHistoryQuestScore'), 'Stage 7 grand-total calculation is missing.');
assert(script.includes('historyFinalStageScores') && script.includes('historyStagePerformanceComment'), 'Stage 7 per-stage scores or comments are missing.');
assert(script.includes('MayHubCertificates.showScored') && script.includes("category: 'Six-Stage History Expedition'"), 'The premium HistoryQuest certificate action is missing.');
assert(script.includes('window.MayHubSounds?.playPass?.()'), 'Pass sound integration is missing.');
assert(script.includes('window.MayHubSounds?.playFail?.()'), 'Fail sound integration is missing.');

const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const helper = fs.readFileSync(path.join(root, 'may-certificate-actions.js'), 'utf8');
const swVersion = sw.match(/SERVICE_WORKER_VERSION = '([^']+)'/)?.[1];
const helperVersion = helper.match(/SERVICE_WORKER_VERSION = '([^']+)'/)?.[1];
assert(swVersion && swVersion === helperVersion, 'Shared offline versions are not aligned.');
for (const asset of ['HistoryQuest.html', 'historyquest.css', 'essay-stage.css', 'historyquest.js', 'stage1-data.js', 'stage2-data.js', 'stage3-data.js', 'stage4-data.js', 'stage5-data.js', 'stage6-data.js', 'berlin-conference-cartoon.jpg', 'causes-of-colonisation.jpg', 'patterns-of-colonisation.jpg', 'results-of-colonisation.jpg', 'ashanti-resistance.jpg']) {
    assert(sw.includes(asset), `Service worker does not cache ${asset}.`);
}

console.log('HistoryQuest Stages 1-7 validation passed: 30 assessment challenges, six stage reports, a verified 50-mark grand total, premium certificate integration, sounds and offline assets.');
