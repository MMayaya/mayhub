#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const questDirectory = path.join(root, 'Geography', 'Term-3', 'Grade-10', 'Games', 'Assessment Games', 'GeoQuest');
const htmlPath = path.join(questDirectory, 'GeoQuest.html');
const dataPath = path.join(questDirectory, 'stage1-data.js');
const stage2DataPath = path.join(questDirectory, 'stage2-data.js');
const stage3DataPath = path.join(questDirectory, 'stage3-data.js');
const stage3SourcePath = path.join(questDirectory, 'sources', 'population-pyramid-country-k.jpg');
const stage3GeneratorPath = path.join(questDirectory, 'generate-stage3-source.py');
const scriptPath = path.join(questDirectory, 'geoquest.js');
const stylePath = path.join(questDirectory, 'geoquest.css');
const landingPath = path.join(questDirectory, '..', 'assessment-games.html');

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

for (const filePath of [htmlPath, dataPath, stage2DataPath, stage3DataPath, stage3SourcePath, stage3GeneratorPath, scriptPath, stylePath, landingPath]) {
    assert(fs.existsSync(filePath), `Missing file: ${filePath}`);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const script = fs.readFileSync(scriptPath, 'utf8');
const styles = fs.readFileSync(stylePath, 'utf8');
const landing = fs.readFileSync(landingPath, 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: 'stage1-data.js' });
vm.runInNewContext(fs.readFileSync(stage2DataPath, 'utf8'), sandbox, { filename: 'stage2-data.js' });
vm.runInNewContext(fs.readFileSync(stage3DataPath, 'utf8'), sandbox, { filename: 'stage3-data.js' });
const data = sandbox.window.Grade10GeoQuestStage1Data;
const stage2Data = sandbox.window.Grade10GeoQuestStage2Data;
const stage3Data = sandbox.window.Grade10GeoQuestStage3Data;

assert(data && Array.isArray(data.terms) && Array.isArray(data.definitions), 'Stage 1 data is unavailable.');
assert(data.terms.length === 8 && new Set(data.terms).size === 8, 'The compass must contain eight unique paper terms.');
assert(data.definitions.length === 7, 'Stage 1 must contain seven assessed movements.');
assert(new Set(data.definitions.map(definition => definition.id)).size === 7, 'Stage 1 definition ids must be unique.');

const expectedAnswers = new Set(['International migration', 'Immigration', 'Emigration', 'Regional migration', 'Rural-urban migration', 'Urbanisation', 'Migration']);
assert(data.definitions.every(definition => expectedAnswers.has(definition.answer)), 'A Stage 1 answer falls outside the assessed answer set.');
assert(new Set(data.definitions.map(definition => definition.answer)).size === 7, 'Every assessed answer must appear exactly once.');
assert(data.terms.filter(term => !expectedAnswers.has(term)).join('|') === 'Rural depopulation', 'The paper distractor must be Rural depopulation.');
for (const definition of data.definitions) {
    assert(definition.prompt && definition.feedback, `Incomplete definition: ${definition.id}`);
    assert(data.terms.includes(definition.answer), `Answer outside the compass: ${definition.id}`);
    assert(!/\b1\.1(?:\.\d+)?\b/.test(definition.prompt), `Exam numbering is exposed: ${definition.id}`);
    assert(!/Which geographical term means/i.test(definition.prompt), `Redundant wording remains: ${definition.id}`);
}

assert(stage2Data && Array.isArray(stage2Data.terms) && Array.isArray(stage2Data.descriptions), 'Stage 2 data is unavailable.');
assert(stage2Data.terms.length === 8 && new Set(stage2Data.terms).size === 8, 'Stage 2 must contain eight unique Column B terms.');
assert(stage2Data.descriptions.length === 8, 'Stage 2 must contain eight Column A descriptions.');
assert(new Set(stage2Data.descriptions.map(description => description.id)).size === 8, 'Stage 2 description ids must be unique.');
const expectedStage2Answers = {
    'literacy-rate': 'Literacy rate',
    'push-factors': 'Push factors',
    'population-density': 'Population density',
    'infant-mortality-rate': 'Infant mortality rate',
    'population-distribution': 'Population distribution',
    'pull-factors': 'Pull factors',
    census: 'Census',
    'economically-active': 'Economically active'
};
for (const description of stage2Data.descriptions) {
    assert(expectedStage2Answers[description.id] === description.answer, `Incorrect Stage 2 answer: ${description.id}`);
    assert(stage2Data.terms.includes(description.answer), `Stage 2 answer outside Column B: ${description.id}`);
    assert(description.prompt && description.feedback, `Incomplete Stage 2 row: ${description.id}`);
    assert(!/\b1\.2(?:\.\d+)?\b/.test(description.prompt), `Stage 2 exam numbering is exposed: ${description.id}`);
    assert(!/Which geographical term means/i.test(description.prompt), `Redundant Stage 2 wording remains: ${description.id}`);
}
assert(stage2Data.descriptions.find(description => description.id === 'population-distribution').prompt === 'The spread of people over an area.', 'The close-up wording for population distribution is not preserved.');
assert(stage2Data.descriptions.find(description => description.id === 'pull-factors').prompt === 'Factors that attract people towards a particular area.', 'The close-up wording for pull factors is not preserved.');
assert(stage2Data.descriptions.find(description => description.id === 'census').prompt.includes('count all the people who live in a country'), 'The close-up wording for census is not preserved.');

assert(stage3Data && Array.isArray(stage3Data.questions), 'Stage 3 data is unavailable.');
assert(stage3Data.questions.length === 5, 'Stage 3 must contain five population-pyramid challenges.');
assert(stage3Data.questions.reduce((sum, question) => sum + question.marks, 0) === 15, 'Stage 3 must total fifteen marks.');
assert(new Set(stage3Data.questions.map(question => question.id)).size === 5, 'Stage 3 question ids must be unique.');
const expectedStage3Marks = [2, 1, 2, 4, 6];
const expectedStage3Modes = ['single', 'single', 'single', 'multiple', 'multiple'];
const expectedStage3Limits = [1, 1, 1, 2, 3];
stage3Data.questions.forEach((question, index) => {
    assert(question.marks === expectedStage3Marks[index], `Incorrect Stage 3 marks: ${question.id}`);
    assert(question.mode === expectedStage3Modes[index], `Incorrect Stage 3 mode: ${question.id}`);
    assert(question.selectLimit === expectedStage3Limits[index], `Incorrect Stage 3 selection limit: ${question.id}`);
    assert(Array.isArray(question.options) && question.options.length >= 4 && new Set(question.options).size === question.options.length, `Invalid Stage 3 options: ${question.id}`);
    assert(Array.isArray(question.correctAnswers) && question.correctAnswers.length >= question.selectLimit, `Invalid Stage 3 answer set: ${question.id}`);
    assert(question.correctAnswers.every(answer => question.options.includes(answer)), `Stage 3 answer outside its options: ${question.id}`);
    assert(question.prompt && question.instruction && question.feedback, `Incomplete Stage 3 challenge: ${question.id}`);
    assert(!/\b1\.3(?:\.\d+)?\b/.test(question.prompt), `Stage 3 exam numbering is exposed: ${question.id}`);
});
assert(stage3Data.questions.find(question => question.id === 'country-development-level').correctAnswers[0] === 'Developing country', 'Stage 3 country classification is incorrect.');
assert(stage3Data.questions.find(question => question.id === 'life-expectancy-reasons').correctAnswers.length >= 4, 'Stage 3 must accept several defensible life-expectancy reasons.');
assert(stage3Data.questions.find(question => question.id === 'government-planning').correctAnswers.length >= 5, 'Stage 3 must accept several defensible government-planning uses.');
const stage3Bytes = fs.readFileSync(stage3SourcePath);
assert(stage3Bytes.length > 150000 && stage3Bytes[0] === 0xFF && stage3Bytes[1] === 0xD8, 'The regenerated Stage 3 source is not a substantial JPEG.');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(new Set(ids).size === ids.length, 'GeoQuest.html contains duplicate ids.');
const references = [...script.matchAll(/getElementById\('([^']+)'\)/g)].map(match => match[1]);
const missingIds = [...new Set(references)].filter(id => !ids.includes(id));
assert(missingIds.length === 0, `Missing HTML ids: ${missingIds.join(', ')}`);

const localLinks = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(match => match[1])
    .filter(value => !value.startsWith('#') && !value.startsWith('http') && !value.startsWith('data:'));
for (const value of localLinks) {
    const target = path.resolve(questDirectory, decodeURIComponent(value));
    assert(fs.existsSync(target), `Broken local path: ${value}`);
}

const imports = [...styles.matchAll(/@import\s+url\("([^"]+)"\)/g)].map(match => match[1]);
for (const value of imports) {
    const target = path.resolve(questDirectory, decodeURIComponent(value));
    assert(fs.existsSync(target), `Broken stylesheet import: ${value}`);
}

assert(html.includes('GeoQuest: The Population Expedition'), 'The Grade 10 quest title is missing.');
assert(html.includes('Migration Compass') && html.includes('Population Signals'), 'The first two stage names are missing.');
assert(script.includes("elements.sourceButton.hidden = name !== 'stage3' && name !== 'stage3Result'"), 'The source button must remain hidden throughout Stages 1 and 2.');
assert(html.includes('id="stage2Screen"') && html.includes('id="stage2ResultScreen"'), 'The Stage 2 play or result screen is missing.');
assert(html.includes('<table class="match-table">') && html.includes('Column A: Description') && html.includes('Column B: Your Match'), 'The Stage 2 Table Match structure is missing.');
assert(html.includes('id="stage3Screen"') && html.includes('id="stage3ResultScreen"'), 'The Stage 3 play or result screen is missing.');
assert((html.match(/id="headerSourceButton"/g) || []).length === 1, 'GeoQuest must contain exactly one floating source button.');
assert(html.includes('Open Source') && html.includes('Return to Question'), 'The Stage 3 source controls are incomplete.');
assert(!/Black-and-white source|Regenerated source available|Population source available/i.test(html), 'An authoring note is exposed in the Stage 3 source controls.');
assert(script.includes('shuffle(definitions.map(definition => definition.id))'), 'Question shuffling is missing.');
assert(script.includes('shuffle(terms)'), 'Term-compass shuffling is missing.');
assert(script.includes('localStorage.setItem(storageKey()'), 'Saved progress is missing.');
assert(script.includes('shuffle(stage2Descriptions.map(description => description.id))'), 'Stage 2 row shuffling is missing.');
assert(script.includes('termOrder: shuffle(stage2Terms)'), 'Stage 2 Column B shuffling is missing.');
assert(script.includes('localStorage.setItem(stage2StorageKey()'), 'Saved Stage 2 progress is missing.');
assert(script.includes('new Set(Object.values(stage2State.answers))'), 'Stage 2 one-use matching protection is missing.');
assert(script.includes('function checkStage2Table') && script.includes('function completeStage2'), 'Stage 2 marking or completion logic is missing.');
assert(styles.includes('.match-table') && styles.includes('.column-b-bank') && styles.includes("content: attr(data-label)"), 'Responsive Table Match styling is incomplete.');
assert(script.includes('shuffle(stage3Questions.map(question => question.id))'), 'Stage 3 question shuffling is missing.');
assert(script.includes('Object.fromEntries(stage3Questions.map(question => [question.id, shuffle(question.options)]))'), 'Stage 3 option shuffling is missing.');
assert(script.includes('correctSelections * question.pointsPerCorrect'), 'Stage 3 partial marking is missing.');
assert(script.includes('localStorage.setItem(stage3StorageKey()'), 'Saved Stage 3 progress is missing.');
assert(script.includes("name !== 'stage3' && name !== 'stage3Result'"), 'The source button is not limited to Stage 3.');
assert(script.includes('function openSource') && script.includes('function closeSource') && script.includes('function updateZoom'), 'Stage 3 source overlay logic is incomplete.');
assert(styles.includes('.pyramid-panel') && styles.includes('.pyramid-orbit'), 'The Stage 3 visual theme is missing.');
assert(script.includes('playCorrect') && script.includes('playWrong') && script.includes('playPass') && script.includes('playFail'), 'Shared game sounds are incomplete.');
assert(landing.includes('GeoQuest/GeoQuest.html'), 'The Grade 10 assessment page does not link to GeoQuest.');
assert(landing.indexOf('GeoQuest/GeoQuest.html') < landing.indexOf('</main>'), 'The GeoQuest card is outside the games grid.');
assert(landing.indexOf('GeoQuest/GeoQuest.html') > landing.indexOf('Rural-Urban Migration/RuralUrbanMigration.html'), 'GeoQuest must be the last game card.');

const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
for (const asset of ['Grade-10/Games/Assessment%20Games/assessment-games.html', 'Grade-10/Games/Assessment%20Games/GeoQuest/GeoQuest.html', 'Grade-10/Games/Assessment%20Games/GeoQuest/geoquest.css', 'Grade-10/Games/Assessment%20Games/GeoQuest/geoquest.js', 'Grade-10/Games/Assessment%20Games/GeoQuest/stage1-data.js', 'Grade-10/Games/Assessment%20Games/GeoQuest/stage2-data.js', 'Grade-10/Games/Assessment%20Games/GeoQuest/stage3-data.js', 'Grade-10/Games/Assessment%20Games/GeoQuest/sources/population-pyramid-country-k.jpg']) {
    assert(worker.includes(asset), `Service worker does not cache ${asset}.`);
}
const helper = fs.readFileSync(path.join(root, 'may-certificate-actions.js'), 'utf8');
const workerVersion = worker.match(/SERVICE_WORKER_VERSION = '([^']+)'/)?.[1];
const helperVersion = helper.match(/SERVICE_WORKER_VERSION = '([^']+)'/)?.[1];
assert(workerVersion && workerVersion === helperVersion, 'Shared offline versions are not aligned.');

new Function(script);
console.log('Grade 10 GeoQuest Stages 1-3 validation passed: 30 verified marks, regenerated pyramid source, shuffled interactions, partial marking, saved progress, sounds and offline assets.');
