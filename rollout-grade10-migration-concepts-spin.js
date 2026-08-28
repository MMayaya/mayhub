#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const pilotFile = path.join(siteRoot, 'Geography', 'Term-3', 'Grade-10', 'Games', 'Assessment Games', 'Migration Concepts', 'spin1.html');
const referenceFile = path.join(siteRoot, 'Social-Sciences', 'Term-3', 'Grade-8', 'Games', 'History Assessment Games', 'The Berlin Conference', 'spin1.html');
const selectedIndexes = [0, 1, 2, 3, 4, 5, 8, 9, 13, 14];

function locateDeclaration(source, name) {
    const match = new RegExp('\\bconst\\s+' + name + '\\s*=\\s*').exec(source);
    if (!match) throw new Error('Missing const ' + name);
    const literalStart = match.index + match[0].length;
    const opening = source[literalStart];
    if (opening !== '{' && opening !== '[') throw new Error('Unsupported const ' + name);
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
            if (stack.pop() !== expected) throw new Error('Unbalanced const ' + name);
            if (!stack.length) {
                const semicolon = source.indexOf(';', index + 1);
                if (semicolon < 0) throw new Error('Missing semicolon after const ' + name);
                return {
                    start: match.index,
                    end: semicolon + 1,
                    literal: source.slice(literalStart, index + 1)
                };
            }
        }
    }
    throw new Error('Unclosed const ' + name);
}

function readLiteral(source, name) {
    const declaration = locateDeclaration(source, name);
    return vm.runInNewContext('(' + declaration.literal + ')', Object.create(null), { timeout: 1000 });
}

function replaceDeclaration(source, name, value) {
    const declaration = locateDeclaration(source, name);
    const replacement = 'const ' + name + ' = ' + JSON.stringify(value, null, 4) + ';';
    return source.slice(0, declaration.start) + replacement + source.slice(declaration.end);
}

function selectQuestions(records) {
    if (records.length === 10) return records.map(record => JSON.parse(JSON.stringify(record)));
    return selectedIndexes.map(index => JSON.parse(JSON.stringify(records[index])));
}

function balanceMultipleChoice(records) {
    records.forEach((record, questionIndex) => {
        const correctText = String(record.a).replace(/^[A-D]\)\s*/, '');
        const alternatives = record.options
            .map(option => String(option).replace(/^[A-D]\)\s*/, ''))
            .filter(option => option !== correctText);
        if (alternatives.length !== 3) throw new Error('Invalid multiple-choice record: ' + record.q);
        const target = questionIndex % 4;
        alternatives.splice(target, 0, correctText);
        record.options = alternatives.map((option, index) => String.fromCharCode(65 + index) + ') ' + option);
        record.a = record.options[target];
    });
}

const original = fs.readFileSync(pilotFile, 'utf8');
const originalData = readLiteral(original, 'gameData');
const gameData = {
    definitions: selectQuestions(originalData.definitions),
    terms: selectQuestions(originalData.terms),
    multipleChoice: selectQuestions(originalData.multipleChoice),
    trueFalse: selectQuestions(originalData.trueFalse)
};
balanceMultipleChoice(gameData.multipleChoice);

const trueCount = gameData.trueFalse.filter(record => record.a === 'True').length;
const falseCount = gameData.trueFalse.filter(record => record.a === 'False').length;
if (trueCount !== 5 || falseCount !== 5) {
    throw new Error('Migration Concepts True/False selection must be 5 True and 5 False');
}

let output = fs.readFileSync(referenceFile, 'utf8')
    .replaceAll('The Berlin Conference', 'Migration Concepts')
    .replaceAll('Grade 8', 'Grade 10')
    .replaceAll('Social Sciences History', 'Geography')
    .replaceAll('BerlinConference.html', 'MigrationConcepts.html')
    .replaceAll('mayhubBerlinSpinProgress', 'mayhubMigrationConceptsSpinProgress')
    .replaceAll('mayhubBerlinSpinHistory', 'mayhubMigrationConceptsSpinHistory');

output = output.replace(
    /<link rel="canonical" href="[^"]+">/,
    '<link rel="canonical" href="https://www.maylearninghub.co.za/Geography/Term-3/Grade-10/Games/Assessment%20Games/Migration%20Concepts/spin1.html">'
);
output = output.replace(
    /<meta name="description" content="[^"]+">/,
    '<meta name="description" content="Test yourself with the Grade 10 Geography Migration Concepts Spin-the-Wheel assessment game from May Learning Hub.">'
);
output = output.replace(
    /<meta property="og:url" content="[^"]+">/,
    '<meta property="og:url" content="https://www.maylearninghub.co.za/Geography/Term-3/Grade-10/Games/Assessment%20Games/Migration%20Concepts/spin1.html">'
);
output = output.replace(
    /<p class="game-subtitle">[^<]*<\/p>/,
    '<p class="game-subtitle">Revise migration terminology, migration types, and push-and-pull concepts.</p>'
);
output = output.replace(
    '<h1 class="game-title">History Quiz: Migration Concepts</h1>',
    '<h1 class="game-title">Geography Quiz: Migration Concepts</h1>'
);
output = output.replace(
    /<body ([^>]*data-certificate-game="[^"]+")>/,
    '<body $1 data-certificate-layout="compact-subject">'
);
output = output.replace(
    ".certificate-signature { font-family: 'Segoe Script', 'Brush Script MT', cursive; font-size: 1.05rem !important; }",
    ".certificate-signature { font-family: 'Segoe Script', 'Brush Script MT', cursive; font-size: 1.05rem !important; }\n        body[data-certificate-layout=\"compact-subject\"] .certificate-signature { display: inline-block; font-family: 'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive; font-size: 1.48rem !important; font-weight: 400; letter-spacing: -.045em; transform: rotate(-3deg) skewX(-5deg); transform-origin: center; }\n        .certificate-term-line { margin-top: 0.72rem; color: #96a1ad; font-size: 0.7rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }"
);
output = output.replace(
    '<strong class="certificate-signature">May Learning Hub</strong>',
    '<strong class="certificate-signature">M. Learning Hub</strong>'
);
output = output.replace(
    '<p class="certificate-site-line">Get your certificate at www.maylearninghub.co.za</p>',
    '<p class="certificate-term-line" id="certificateTerm">Term 3</p>\n                    <p class="certificate-site-line">Get your certificate at www.maylearninghub.co.za</p>'
);
output = output.replace(
    "            term: document.body.dataset.certificateTerm || '',\n            topic:",
    "            term: document.body.dataset.certificateTerm || '',\n            layout: document.body.dataset.certificateLayout || 'standard',\n            topic:"
);
output = output.replace(
    "        document.getElementById('certificateKicker').innerText = [\n            certificateContext.grade,\n            certificateContext.subject,\n            certificateContext.term\n        ].filter(Boolean).join(' • ') || 'May Learning Hub Assessment';",
    "        document.getElementById('certificateKicker').innerText = [\n            certificateContext.grade,\n            certificateContext.subject\n        ].filter(Boolean).join(' ') || 'May Learning Hub Assessment';\n        document.getElementById('certificateTerm').innerText = certificateContext.term || '';"
);
output = replaceDeclaration(output, 'gameData', gameData);
fs.writeFileSync(pilotFile, output, 'utf8');

console.log('Updated ' + path.relative(siteRoot, pilotFile));
console.log('Migration Concepts Spin pilot contains 10 questions per category, 5 True and 5 False answers, and balanced multiple-choice positions.');
