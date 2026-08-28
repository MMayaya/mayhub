#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const assessmentRoot = path.join(siteRoot, 'Geography', 'Term-3', 'Grade-10', 'Games', 'Assessment Games');
const referenceRoot = path.join(
    siteRoot,
    'Social-Sciences',
    'Term-3',
    'Grade-8',
    'Games',
    'History Assessment Games',
    'The Berlin Conference'
);
const spinReferenceFile = path.join(assessmentRoot, 'Migration Concepts', 'spin1.html');

const topics = [
    {
        name: 'Migration Concepts',
        landing: 'MigrationConcepts.html',
        storageStem: 'MigrationConcepts',
        subtitle: 'Revise migration terminology, migration types, urbanisation, and push-and-pull factors.',
        conceptIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 13, 14],
        millionaireIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16],
        applicationIndexes: [60, 61, 62, 63, 64, 65, 66, 67, 68, 79]
    },
    {
        name: 'Population Measures',
        landing: 'PopulationMeasures.html',
        storageStem: 'PopulationMeasures',
        subtitle: 'Revise census data, population rates, density, distribution, and natural increase.',
        conceptIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 10, 11],
        millionaireIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18],
        applicationIndexes: [60, 61, 62, 63, 64, 65, 66, 67, 68, 72]
    },
    {
        name: 'Population Structure',
        landing: 'PopulationStructure.html',
        storageStem: 'PopulationStructure',
        subtitle: 'Revise population pyramids, age groups, life expectancy, and government planning.',
        conceptIndexes: [0, 3, 6, 7, 8, 9, 10, 13, 15, 16],
        millionaireIndexes: [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17],
        applicationIndexes: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        applicationOptions: {
            'A pyramid has a very broad base and narrows quickly upward. Is it typical of a developing or developed country?': [
                'A developing country',
                'A developed country',
                'A country with no young people',
                'A country with zero population growth'
            ],
            'What does a broad pyramid base normally indicate?': [
                'A high birth rate and a large youthful population',
                'A low birth rate and an ageing population',
                'Equal numbers in every age group',
                'High immigration as the only cause'
            ],
            'What does a very narrow pyramid apex normally indicate?': [
                'Few elderly people and relatively low life expectancy',
                'Many elderly people and very high life expectancy',
                'A perfectly stable population',
                'A high birth rate by itself'
            ],
            'Which population group is represented by the youngest bars?': [
                'Young dependants',
                'Working-age population',
                'Elderly dependants',
                'Recent migrants only'
            ],
            'Which group normally supplies most of the labour force?': [
                'Working-age population',
                'Young dependants',
                'Elderly dependants',
                'Infants only'
            ],
            'In a population pyramid, which group is represented by the oldest age bars?': [
                'Elderly dependants',
                'Young dependants',
                'Working-age population',
                'Newborns only'
            ],
            'Why does a youthful population create demand for schools?': [
                'Many children require classrooms, teachers and learning materials',
                'Fewer children require more universities',
                'Older people require only factories',
                'It removes the need for public services'
            ],
            'Give one health-related reason for low life expectancy.': [
                'Poor healthcare, disease, malnutrition or unsafe water',
                'A high number of schools',
                'Improved sanitation and nutrition',
                'A large working-age population'
            ],
            'How can pyramid data help government plan healthcare?': [
                'It shows the age groups and likely health services required',
                'It gives the names of every patient',
                'It replaces the need for a national budget',
                'It shows only the location of hospitals'
            ]
        }
    },
    {
        name: 'Population Change and Distribution',
        landing: 'PopulationChangeDistribution.html',
        storageStem: 'PopulationChangeDistribution',
        subtitle: 'Revise natural increase calculations and physical and human factors affecting distribution.',
        conceptIndexes: [0, 1, 4, 5, 9, 10, 11, 12, 13, 16],
        millionaireIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16],
        applicationIndexes: [60, 61, 62, 63, 64, 65, 66, 67, 68, 79],
        applicationOptions: {
            'A country has a birth rate of 7.44 and death rate of 9.83. Calculate its natural increase.': [
                '-2.39 per 1,000',
                '2.39 per 1,000',
                '17.27 per 1,000',
                '-17.27 per 1,000'
            ],
            'South Africa has a birth rate of 21.33 and death rate of 13.90. Calculate the natural increase.': [
                '7.43 per 1,000',
                '35.23 per 1,000',
                '-7.43 per 1,000',
                '5.90 per 1,000'
            ],
            'Nigeria has a birth rate of 36.07 and death rate of 16.31. Calculate the natural increase.': [
                '19.76 per 1,000',
                '52.38 per 1,000',
                '-19.76 per 1,000',
                '20.31 per 1,000'
            ],
            'Japan has -2.39, South Africa 7.43 and Nigeria 19.76 per 1,000. Which country has the fastest natural growth?': [
                'Nigeria',
                'Japan',
                'South Africa',
                'All three grow at the same rate'
            ]
        }
    },
    {
        name: 'Rural-Urban Migration',
        landing: 'RuralUrbanMigration.html',
        storageStem: 'RuralUrbanMigration',
        subtitle: 'Revise rural-urban migration, young migrants, economic causes, and effects on rural areas.',
        conceptIndexes: [0, 2, 3, 4, 5, 6, 7, 8, 9, 14],
        millionaireIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        applicationIndexes: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        applicationOptions: {
            'Which active age group is most likely to move to cities for work?': [
                'Young adults of working age',
                'Retired elderly people',
                'Children under ten',
                'People outside the labour force only'
            ],
            'Give one economic reason why young adults move to urban areas.': [
                'More jobs, higher wages or better career opportunities',
                'Fewer employment opportunities',
                'Lower wages in cities',
                'Less access to markets and services'
            ],
            'A rural scene contains cultivated fields and grazing livestock. Which economic sector is dominant?': [
                'Agriculture',
                'Manufacturing',
                'Financial services',
                'Information technology'
            ],
            'Name two visual features that would show agriculture dominates a rural scene.': [
                'Any two of crop fields, livestock, farm buildings, tractors or farming tools',
                'Traffic lights and office towers',
                'Harbours and container ships only',
                'Airports and shopping centres'
            ],
            'How can rural-urban migration reduce farm production?': [
                'It removes young and skilled agricultural workers',
                'It immediately increases the rural labour supply',
                'It creates more cultivated land automatically',
                'It guarantees higher rainfall'
            ],
            'How can migration change the age structure of a rural community?': [
                'The remaining population becomes older on average',
                'The remaining population becomes entirely younger',
                'Every age group becomes equal in size',
                'Age structure is never affected by migration'
            ],
            'Why may rural schools or shops close after migration?': [
                'The smaller population provides too few learners or customers',
                'The rural population suddenly doubles',
                'More customers arrive from every city',
                'Farm output always increases'
            ],
            'What happens to rural labour supply when many young adults leave?': [
                'It decreases',
                'It increases immediately',
                'It remains exactly the same',
                'It becomes entirely mechanised overnight'
            ]
        }
    }
];

const gameVariables = {
    'drag1.html': ['gameData', 'categoryTitles'],
    'jeopardy1.html': ['questionBank'],
    'match1.html': ['gameData'],
    'millionaire1.html': ['questions'],
    'snake1.html': ['questionDB'],
    'spin1.html': ['gameData']
};

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

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function selectRecords(records, indexes, label) {
    if (!Array.isArray(records)) throw new Error(label + ' is not an array');
    if (records.length === indexes.length) return clone(records);
    return indexes.map(index => {
        if (!records[index]) throw new Error(label + ' is missing source index ' + index);
        return clone(records[index]);
    });
}

function plainOption(value) {
    return String(value).replace(/^[A-D]\)\s*/, '').trim();
}

function balanceTextOptions(records) {
    records.forEach((record, questionIndex) => {
        if (!Array.isArray(record.options) || record.options.length !== 4) return;
        const labelled = record.options.every(option => /^[A-D]\)\s*/.test(option));
        const correct = plainOption(record.a);
        const alternatives = record.options.map(plainOption).filter(option => option !== correct);
        if (alternatives.length !== 3) throw new Error('Could not identify one correct option for: ' + record.q);
        const target = questionIndex % 4;
        alternatives.splice(target, 0, correct);
        record.options = alternatives.map((option, index) => labelled ? String.fromCharCode(65 + index) + ') ' + option : option);
        record.a = record.options[target];
    });
}

function balanceNumericOptions(records) {
    records.forEach((record, questionIndex) => {
        if (!Array.isArray(record.options) || record.options.length !== 4) return;
        const correct = record.options[record.a];
        if (typeof correct !== 'string') throw new Error('Invalid answer index for: ' + record.q);
        const alternatives = record.options.filter((_, optionIndex) => optionIndex !== record.a);
        const target = questionIndex % 4;
        alternatives.splice(target, 0, correct);
        record.options = alternatives;
        record.a = target;
    });
}

function answerOf(record) {
    return typeof record.a === 'number' ? record.options?.[record.a] : record.a;
}

function balanceTrueFalse(records, definitions) {
    const findDefinition = term => definitions.find(record => record.q === term);
    const termFromStatement = statement => String(statement).split(/\s—\s|:\s/)[0].trim();
    let trueCount = records.filter(record => answerOf(record) === 'True').length;
    let falseCount = records.filter(record => answerOf(record) === 'False').length;
    while (trueCount > 5) {
        const recordIndex = records.findLastIndex(record => answerOf(record) === 'True');
        const record = records[recordIndex];
        const term = termFromStatement(record.q);
        const definition = findDefinition(term);
        const wrongDefinition = definitions.find(candidate => candidate.q !== term && candidate.a !== definition?.a);
        if (!definition || !wrongDefinition) throw new Error('Could not rebalance True/False question for ' + term);
        record.q = term + ': ' + wrongDefinition.a;
        record.a = typeof record.a === 'number' ? record.options.indexOf('False') : 'False';
        record.exp = 'Correct meaning: ' + term + ': ' + definition.a;
        trueCount -= 1;
        falseCount += 1;
    }
    while (falseCount > 5) {
        const recordIndex = records.findLastIndex(record => answerOf(record) === 'False');
        const record = records[recordIndex];
        const term = termFromStatement(record.q);
        const definition = findDefinition(term);
        if (!definition) throw new Error('Could not rebalance True/False question for ' + term);
        record.q = term + ': ' + definition.a;
        record.a = typeof record.a === 'number' ? record.options.indexOf('True') : 'True';
        record.exp = 'Correct meaning: ' + term + ': ' + definition.a;
        falseCount -= 1;
        trueCount += 1;
    }
    if (trueCount !== 5 || falseCount !== 5) {
        throw new Error('True/False balance is ' + trueCount + ' True and ' + falseCount + ' False');
    }
}

function fixMigrationPilot(gameData) {
    if (gameData.definitions.length !== 10 || gameData.definitions[6]?.q !== 'Internal migration') return gameData;
    gameData.definitions[6] = { q: 'Urbanisation', a: 'An increase in the percentage of people living in urban areas.' };
    gameData.definitions[7] = { q: 'Rural depopulation', a: 'A reduction in the number of people living in rural areas.' };
    gameData.terms[6] = { q: 'An increase in the percentage of people living in urban areas.', a: 'Urbanisation' };
    gameData.terms[7] = { q: 'A reduction in the number of people living in rural areas.', a: 'Rural depopulation' };
    gameData.multipleChoice[6] = {
        q: 'Which geographical term means: An increase in the percentage of people living in urban areas.',
        options: ['A) Rural depopulation', 'B) Push factor', 'C) Urbanisation', 'D) Pull factor'],
        a: 'C) Urbanisation'
    };
    gameData.multipleChoice[7] = {
        q: 'Which geographical term means: A reduction in the number of people living in rural areas.',
        options: ['A) Urbanisation', 'B) Push factor', 'C) Pull factor', 'D) Rural depopulation'],
        a: 'D) Rural depopulation'
    };
    gameData.trueFalse[6] = {
        q: 'Urbanisation: An increase in the percentage of people living in urban areas.',
        options: ['True', 'False'],
        a: 'True',
        exp: 'Correct meaning: Urbanisation: An increase in the percentage of people living in urban areas.'
    };
    gameData.trueFalse[7] = {
        q: 'Rural depopulation: The place from which a migrant moves.',
        options: ['True', 'False'],
        a: 'False',
        exp: 'Correct meaning: Rural depopulation: A reduction in the number of people living in rural areas.'
    };
    return gameData;
}

function rephraseStandalone(value) {
    if (typeof value === 'string') {
        return value
            .replace(/^Which geographical term means:\s*/i, '')
            .replaceAll(' — ', ': ')
            .replaceAll('Which group is shown by the oldest age bars?', 'In a population pyramid, which group is represented by the oldest age bars?')
            .replaceAll('Which group is shown by the youngest bars?', 'In a population pyramid, which group is represented by the youngest age bars?');
    }
    if (Array.isArray(value)) return value.map(rephraseStandalone);
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rephraseStandalone(item)]));
    }
    return value;
}

function applicationClass(answer) {
    if (/^-?\d|\d[.,]\d/.test(answer)) return 'numeric';
    if (answer.length <= 58 && answer.trim().split(/\s+/).length <= 7) return 'brief';
    return 'detailed';
}

function buildOptionLookup(questionDB) {
    const lookup = new Map();
    ['game1', 'game2'].forEach(key => {
        (questionDB[key] || []).forEach(record => {
            const correct = record.options?.[record.a];
            if (correct) lookup.set(plainOption(correct), record.options.map(plainOption));
        });
    });
    return lookup;
}

function buildApplicationQuestions(records, fullApplicationRecords, sourceQuestionDB, config) {
    const optionLookup = buildOptionLookup(sourceQuestionDB);
    const allAnswers = fullApplicationRecords.map(record => String(record.a));
    return records.map((record, questionIndex) => {
        const question = rephraseStandalone(String(record.q));
        const correct = String(record.a);
        const override = config.applicationOptions?.[question];
        let options = override ? clone(override) : clone(optionLookup.get(plainOption(correct)) || []);
        if (!options.length) {
            const classification = applicationClass(correct);
            const candidates = [
                ...allAnswers.filter(answer => answer !== correct && applicationClass(answer) === classification),
                ...allAnswers.filter(answer => answer !== correct)
            ];
            options = [correct];
            for (const candidate of candidates) {
                if (!options.includes(candidate)) options.push(candidate);
                if (options.length === 4) break;
            }
        }
        options = [...new Set(options.map(String))];
        if (!options.includes(correct)) options.unshift(correct);
        if (options.length < 4) throw new Error('Not enough application options for: ' + question);
        options = [correct, ...options.filter(option => option !== correct).slice(0, 3)];
        const target = questionIndex % 4;
        options.splice(target, 0, options.shift());
        return { q: question, options, a: target };
    });
}

function buildSpinData(source, config) {
    let sourceData = clone(readLiteral(source, 'gameData'));
    if (config.name === 'Migration Concepts') sourceData = fixMigrationPilot(sourceData);
    const result = {};
    for (const key of ['definitions', 'terms', 'multipleChoice', 'trueFalse']) {
        result[key] = selectRecords(sourceData[key], config.conceptIndexes, config.name + ' Spin ' + key);
    }
    result.definitions = rephraseStandalone(result.definitions);
    result.terms = rephraseStandalone(result.terms);
    result.multipleChoice = rephraseStandalone(result.multipleChoice);
    result.trueFalse = rephraseStandalone(result.trueFalse);
    balanceTextOptions(result.multipleChoice);
    balanceTrueFalse(result.trueFalse, result.definitions);
    return result;
}

function buildSnakeData(source, jeopardySource, spinData, config) {
    const sourceData = clone(readLiteral(source, 'questionDB'));
    const result = {
        game1: selectRecords(sourceData.game1, config.conceptIndexes, config.name + ' Snake game1'),
        game2: selectRecords(sourceData.game2, config.conceptIndexes, config.name + ' Snake game2')
    };
    if (sourceData.game3.length === 10 && sourceData.game4.length === 10 && sourceData.game4.every(record => record.options?.length === 2)) {
        result.game3 = clone(sourceData.game3);
        result.game4 = clone(sourceData.game4);
    } else {
        const questionBank = readLiteral(jeopardySource, 'questionBank');
        const fullApplications = questionBank.slice(60, 80);
        const selectedApplications = config.applicationIndexes.map(index => clone(questionBank[index]));
        result.game3 = buildApplicationQuestions(selectedApplications, fullApplications, sourceData, config);
        result.game4 = spinData.trueFalse.map(record => ({
            q: record.q,
            options: ['True', 'False'],
            a: record.a === 'True' ? 0 : 1
        }));
    }
    result.game1 = rephraseStandalone(result.game1);
    result.game2 = rephraseStandalone(result.game2);
    result.game3 = rephraseStandalone(result.game3);
    result.game4 = rephraseStandalone(result.game4);
    balanceNumericOptions(result.game1);
    balanceNumericOptions(result.game2);
    balanceNumericOptions(result.game3);
    const trueCount = result.game4.filter(record => answerOf(record) === 'True').length;
    const falseCount = result.game4.filter(record => answerOf(record) === 'False').length;
    if (trueCount !== 5 || falseCount !== 5) throw new Error(config.name + ' Snake True/False is not 5/5');
    return result;
}

function transformedData(fileName, variableName, source, sourceFiles, spinData, config) {
    if (fileName === 'spin1.html') return spinData;
    const value = clone(readLiteral(source, variableName));
    if (fileName === 'drag1.html') return rephraseStandalone(value);
    if (fileName === 'match1.html') return { topic1: rephraseStandalone(value.topic1) };
    if (fileName === 'jeopardy1.html') {
        if (value.length === 40) return rephraseStandalone(value);
        return rephraseStandalone([...value.slice(0, 20), ...value.slice(60, 80)]);
    }
    if (fileName === 'millionaire1.html') {
        const selected = selectRecords(value, config.millionaireIndexes, config.name + ' Millionaire');
        balanceNumericOptions(selected);
        return rephraseStandalone(selected);
    }
    if (fileName === 'snake1.html') {
        return buildSnakeData(source, sourceFiles['jeopardy1.html'], spinData, config);
    }
    return rephraseStandalone(value);
}

function addCompactCertificateLayout(source) {
    return source.replace(/<body([^>]*)>/, (match, attributes) => {
        if (/data-certificate-layout=/.test(attributes)) return match;
        return '<body' + attributes + ' data-certificate-layout="compact-subject">';
    });
}

function replaceDragButtonLabels(source, categoryTitles) {
    let output = source;
    Object.entries(categoryTitles).forEach(([key, title], index) => {
        const pattern = new RegExp("(<button class=\"cat-btn\" onclick=\"selectCategory\\('" + key + "', this\\)\">)[^<]*(</button>)");
        output = output.replace(pattern, '$1' + (index + 1) + '. ' + title + '$2');
    });
    return output;
}

function prepareSharedTemplate(reference, config) {
    let output = reference
        .replaceAll('Grade 8 Social Sciences History', 'Grade 10 Geography')
        .replaceAll('Grade 8 History', 'Grade 10 Geography')
        .replaceAll('Grade 8', 'Grade 10')
        .replaceAll('Social Sciences History', 'Geography')
        .replaceAll('R1,000,000 History Challenge', 'R1,000,000 Geography Challenge')
        .replaceAll('History Quiz', 'Geography Quiz')
        .replaceAll('The Berlin Conference', config.name)
        .replaceAll('BerlinConference.html', config.landing);
    output = output.replace(/<p class="game-subtitle">[^<]*<\/p>/, '<p class="game-subtitle">' + config.subtitle + '</p>');
    return addCompactCertificateLayout(output);
}

function prepareSpinTemplate(spinReference, config) {
    let output = spinReference
        .replaceAll('Migration Concepts', config.name)
        .replaceAll('Migration%20Concepts', encodeURIComponent(config.name))
        .replaceAll('MigrationConcepts.html', config.landing)
        .replaceAll('mayhubMigrationConceptsSpinProgress', 'mayhub' + config.storageStem + 'SpinProgress')
        .replaceAll('mayhubMigrationConceptsSpinHistory', 'mayhub' + config.storageStem + 'SpinHistory');
    output = output.replace(/<p class="game-subtitle">[^<]*<\/p>/, '<p class="game-subtitle">' + config.subtitle + '</p>');
    output = output.replace(
        /<meta name="description" content="[^"]+">/,
        '<meta name="description" content="Test yourself with the Grade 10 Geography ' + config.name + ' Spin-the-Wheel assessment game from May Learning Hub.">'
    );
    output = output.replace(
        /<meta property="og:description" content="[^"]+">/,
        '<meta property="og:description" content="Test yourself with this Grade 10 Geography Term 3 assessment challenge.">'
    );
    return addCompactCertificateLayout(output);
}

const spinReference = fs.readFileSync(spinReferenceFile, 'utf8');

for (const config of topics) {
    const topicDirectory = path.join(assessmentRoot, config.name);
    const sourceFiles = Object.fromEntries(
        Object.keys(gameVariables).map(fileName => [fileName, fs.readFileSync(path.join(topicDirectory, fileName), 'utf8')])
    );
    const spinData = buildSpinData(sourceFiles['spin1.html'], config);

    for (const [fileName, variables] of Object.entries(gameVariables)) {
        let output = fileName === 'spin1.html'
            ? prepareSpinTemplate(spinReference, config)
            : prepareSharedTemplate(fs.readFileSync(path.join(referenceRoot, fileName), 'utf8'), config);
        for (const variableName of variables) {
            const value = transformedData(fileName, variableName, sourceFiles[fileName], sourceFiles, spinData, config);
            output = replaceDeclaration(output, variableName, value);
            if (fileName === 'drag1.html' && variableName === 'categoryTitles') {
                output = replaceDragButtonLabels(output, value);
            }
        }
        const destination = path.join(topicDirectory, fileName);
        fs.writeFileSync(destination, output, 'utf8');
        console.log('Updated ' + path.relative(siteRoot, destination));
    }
}

console.log('Grade 10 Term 3 assessment rollout completed for ' + topics.length + ' topics and ' + (topics.length * Object.keys(gameVariables).length) + ' game pages.');
