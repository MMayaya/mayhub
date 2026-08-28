#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const assessmentRoot = path.join(
    siteRoot,
    'Social-Sciences',
    'Term-3',
    'Grade-8',
    'Games',
    'History Assessment Games'
);
const referenceTopic = 'The Berlin Conference';
const topics = [
    { name: 'Causes of Colonisation', landing: 'CausesColonisation.html' },
    { name: 'Patterns and Rapid Conquest', landing: 'PatternsRapidConquest.html' },
    { name: 'Results of Colonisation', landing: 'ResultsColonisation.html' },
    { name: 'The Ashanti Kingdom', landing: 'AshantiKingdomAssessment.html' },
    { name: referenceTopic, landing: 'BerlinConference.html' }
];
const games = {
    'drag1.html': ['gameData', 'categoryTitles'],
    'jeopardy1.html': ['questionBank'],
    'match1.html': ['gameData'],
    'millionaire1.html': ['questions'],
    'snake1.html': ['questionDB'],
    'spin1.html': ['gameData']
};
const falseStatementReplacements = {
    'Causes of Colonisation': {
        'Britain looked outside Europe for additional raw materials.': {
            q: 'Britain depended only on European sources and did not seek raw materials abroad.',
            exp: 'Britain looked beyond Europe for additional raw materials.'
        },
        'The telegraph helped colonial authorities communicate and coordinate activities.': {
            q: 'The telegraph made colonial communication slower and more difficult.',
            exp: 'The telegraph enabled faster communication and coordination.'
        }
    },
    'Patterns and Rapid Conquest': {
        'South Africa and Nigeria were examples of British colonies.': {
            q: 'South Africa and Nigeria both remained independent of British colonial rule.',
            exp: 'Both territories came under British colonial control.'
        },
        'Belgium was associated with colonial control of the Congo.': {
            q: 'Belgium had no colonial connection with the Congo.',
            exp: 'The Congo was placed under Belgian colonial control.'
        }
    },
    'Results of Colonisation': {
        'Traditional rulers were sometimes replaced or co-opted into colonial systems.': {
            q: 'Colonial authorities never replaced or co-opted traditional rulers.',
            exp: 'Colonial authorities used both replacement and co-option.'
        }
    },
    'The Ashanti Kingdom': {
        'Kumasi was the capital of the Ashanti Kingdom.': {
            q: 'Accra, rather than Kumasi, was the capital of the Ashanti Kingdom.',
            exp: 'Kumasi was the capital of the Ashanti Kingdom.'
        },
        'Portuguese traders reached the West African coast in the late 1600s.': {
            q: 'Portuguese traders first reached the West African coast only in the late 1800s.',
            exp: 'Portuguese contact with the West African coast began centuries earlier.'
        },
        'A British visitor entered Kumasi in 1817 and later wrote about Ashantee.': {
            q: 'A British visitor first entered Kumasi in 1718 and later wrote about Ashantee.',
            exp: 'The recorded visit took place in 1817.'
        }
    },
    'The Berlin Conference': {
        'The conference met from November 1884 until February 1885.': {
            q: 'The Berlin Conference met from November 1885 until February 1886.',
            exp: 'It opened in November 1884 and concluded in February 1885.'
        },
        'Leopold II of Belgium requested international discussion of African claims.': {
            q: 'Leopold II of Belgium opposed any international discussion of African claims.',
            exp: 'Leopold II requested international discussion of African claims.'
        },
        'Bilateral agreements affecting African claims were made before and after the conference.': {
            q: 'No bilateral agreements affecting African claims were made before or after the conference.',
            exp: 'Bilateral agreements affected African claims both before and after the meeting.'
        }
    }
};

function locateDeclaration(source, name) {
    const declarationPattern = new RegExp('\\bconst\\s+' + name + '\\s*=\\s*');
    const match = declarationPattern.exec(source);
    if (!match) throw new Error('Missing const ' + name);
    const literalStart = match.index + match[0].length;
    const opening = source[literalStart];
    if (opening !== '{' && opening !== '[') throw new Error('Unsupported literal for const ' + name);
    const stack = [opening];
    let quote = '';
    let escaped = false;
    let literalEnd = -1;
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
            if (stack.pop() !== expected) throw new Error('Unbalanced literal for const ' + name);
            if (!stack.length) {
                literalEnd = index + 1;
                break;
            }
        }
    }
    if (literalEnd < 0) throw new Error('Unclosed literal for const ' + name);
    const semicolon = source.indexOf(';', literalEnd);
    if (semicolon < 0) throw new Error('Missing semicolon for const ' + name);
    return {
        declarationStart: match.index,
        declarationEnd: semicolon + 1,
        literal: source.slice(literalStart, literalEnd)
    };
}

function readLiteral(source, name) {
    const located = locateDeclaration(source, name);
    return vm.runInNewContext('(' + located.literal + ')', Object.create(null), { timeout: 1000 });
}

function formatDeclaration(name, value) {
    return 'const ' + name + ' = ' + JSON.stringify(value, null, 4) + ';';
}

function replaceDeclaration(source, name, declaration) {
    const located = locateDeclaration(source, name);
    return source.slice(0, located.declarationStart) + declaration + source.slice(located.declarationEnd);
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function relabelledOption(value, index, labelled) {
    const text = String(value).replace(/^[A-D]\)\s*/, '');
    return labelled ? String.fromCharCode(65 + index) + ') ' + text : text;
}

function balanceTextAnswerOptions(records) {
    records.forEach((record, index) => {
        if (!Array.isArray(record.options) || record.options.length !== 4) return;
        const labelled = record.options.every(option => /^[A-D]\)\s*/.test(option));
        const correctText = String(record.a).replace(/^[A-D]\)\s*/, '');
        const remaining = record.options
            .map(option => String(option).replace(/^[A-D]\)\s*/, ''))
            .filter(option => option !== correctText);
        if (remaining.length !== 3) throw new Error('Could not identify one correct option for: ' + record.q);
        const target = index % 4;
        remaining.splice(target, 0, correctText);
        record.options = remaining.map((option, optionIndex) => relabelledOption(option, optionIndex, labelled));
        record.a = record.options[target];
    });
}

function balanceNumericAnswerOptions(records) {
    records.forEach((record, index) => {
        if (!Array.isArray(record.options) || record.options.length !== 4) return;
        const correctText = record.options[record.a];
        if (typeof correctText !== 'string') throw new Error('Invalid correct answer index for: ' + record.q);
        const remaining = record.options.filter((_, optionIndex) => optionIndex !== record.a);
        const target = index % 4;
        remaining.splice(target, 0, correctText);
        record.options = remaining;
        record.a = target;
    });
}

function trueFalseAnswer(record) {
    return typeof record.a === 'number' ? record.options[record.a] : record.a;
}

function rebalanceTrueFalse(records, topic) {
    const replacements = falseStatementReplacements[topic] || {};
    const matched = new Set();
    Object.entries(replacements).forEach(([originalQuestion, replacement]) => {
        const record = records.find(candidate => candidate.q === originalQuestion || candidate.q === replacement.q);
        if (!record) return;
        matched.add(originalQuestion);
        record.q = replacement.q;
        if ('exp' in record) record.exp = replacement.exp;
        record.a = typeof record.a === 'number' ? record.options.indexOf('False') : 'False';
    });
    const missing = Object.keys(replacements).filter(question => !matched.has(question));
    if (missing.length) throw new Error(topic + ' is missing planned True/False statements: ' + missing.join(' | '));
    const trueCount = records.filter(record => trueFalseAnswer(record) === 'True').length;
    const falseCount = records.filter(record => trueFalseAnswer(record) === 'False').length;
    if (trueCount !== falseCount) {
        throw new Error(topic + ' True/False balance is ' + trueCount + ' True and ' + falseCount + ' False');
    }
}

function transformedData(fileName, variableName, source, topic) {
    const value = clone(readLiteral(source, variableName));
    if (fileName === 'spin1.html' && variableName === 'gameData') {
        balanceTextAnswerOptions(value.multipleChoice);
        rebalanceTrueFalse(value.trueFalse, topic);
    } else if (fileName === 'millionaire1.html' && variableName === 'questions') {
        balanceNumericAnswerOptions(value);
    } else if (fileName === 'snake1.html' && variableName === 'questionDB') {
        ['game1', 'game2', 'game3'].forEach(key => balanceNumericAnswerOptions(value[key]));
        rebalanceTrueFalse(value.game4, topic);
    }
    return value;
}

function migrateTopic(topic) {
    const referenceDirectory = path.join(assessmentRoot, referenceTopic);
    const topicDirectory = path.join(assessmentRoot, topic.name);
    for (const [fileName, variables] of Object.entries(games)) {
        const topicFile = path.join(topicDirectory, fileName);
        const original = fs.readFileSync(topicFile, 'utf8');
        const reference = fs.readFileSync(path.join(referenceDirectory, fileName), 'utf8');
        let output = topic.name === referenceTopic
            ? original
            : reference
                .replaceAll(referenceTopic, topic.name)
                .replaceAll('BerlinConference.html', topic.landing);
        for (const variableName of variables) {
            const value = transformedData(fileName, variableName, original, topic.name);
            output = replaceDeclaration(output, variableName, formatDeclaration(variableName, value));
        }
        fs.writeFileSync(topicFile, output, 'utf8');
        console.log('Updated ' + path.relative(siteRoot, topicFile));
    }
}

topics.forEach(migrateTopic);
console.log('Grade 8 Term 3 assessment rollout completed for ' + topics.length + ' topics and ' + (topics.length * Object.keys(games).length) + ' game pages.');
