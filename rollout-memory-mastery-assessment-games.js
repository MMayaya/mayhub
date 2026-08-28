#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const siteRoot = __dirname;
const templateFile = path.join(
    siteRoot,
    'Geography',
    'Term-3',
    'Grade-11',
    'Games',
    'Assessment Games',
    'Trade Patterns',
    'match1.html'
);

const assessmentRoots = [
    path.join(siteRoot, 'Social-Sciences', 'Term-3', 'Grade-8', 'Games', 'History Assessment Games'),
    path.join(siteRoot, 'Geography', 'Term-3', 'Grade-10', 'Games', 'Assessment Games'),
    path.join(siteRoot, 'Geography', 'Term-3', 'Grade-11', 'Games', 'Assessment Games')
];

function locateDeclaration(source, variableName) {
    const declarationPattern = new RegExp('(?:const|let|var)\\s+' + variableName + '\\s*=');
    const match = declarationPattern.exec(source);
    if (!match) throw new Error('Could not find ' + variableName + ' declaration');

    const valueStart = source.indexOf('{', match.index + match[0].length);
    if (valueStart < 0) throw new Error('Could not find the start of ' + variableName);

    let depth = 0;
    let quote = null;
    let escaped = false;
    for (let index = valueStart; index < source.length; index++) {
        const character = source[index];
        if (quote) {
            if (escaped) escaped = false;
            else if (character === '\\') escaped = true;
            else if (character === quote) quote = null;
            continue;
        }
        if (character === '"' || character === "'" || character === '`') {
            quote = character;
            continue;
        }
        if (character === '{') depth++;
        else if (character === '}') {
            depth--;
            if (depth === 0) return { start: valueStart, end: index + 1 };
        }
    }
    throw new Error('Could not find the end of ' + variableName);
}

function readLiteral(source, variableName, file) {
    const location = locateDeclaration(source, variableName);
    const literal = source.slice(location.start, location.end);
    try {
        return vm.runInNewContext('(' + literal + ')', Object.create(null), { timeout: 1000 });
    } catch (error) {
        throw new Error('Could not parse ' + variableName + ' in ' + file + ': ' + error.message);
    }
}

function replaceDeclaration(source, variableName, value) {
    const location = locateDeclaration(source, variableName);
    return source.slice(0, location.start) + JSON.stringify(value, null, 4) + source.slice(location.end);
}

function requiredMatch(source, pattern, label, file) {
    const match = pattern.exec(source);
    if (!match) throw new Error('Could not find ' + label + ' in ' + file);
    return match[1];
}

function attribute(source, name, file) {
    return requiredMatch(source, new RegExp('\\b' + name + '="([^"]*)"'), name, file);
}

function pageDetails(source, file) {
    const grade = attribute(source, 'data-certificate-grade', file);
    const subject = attribute(source, 'data-certificate-subject', file);
    const term = attribute(source, 'data-certificate-term', file);
    const topic = attribute(source, 'data-certificate-topic', file);
    const game = attribute(source, 'data-certificate-game', file);
    return {
        grade,
        subject,
        term,
        topic,
        game,
        metricStyle: (source.match(/\bdata-certificate-metric-style="([^"]*)"/) || [])[1] || 'split-duration',
        title: requiredMatch(source, /<title>([\s\S]*?)<\/title>/i, 'page title', file),
        heading: requiredMatch(source, /<h1 class="game-title">([\s\S]*?)<\/h1>/i, 'game heading', file),
        subtitle: requiredMatch(source, /<p class="game-subtitle">([\s\S]*?)<\/p>/i, 'game subtitle', file),
        revision: (/<p style="font-size: 0\.78rem; color: #52606d; margin-top: 0\.45rem;">([\s\S]*?)<\/p>/i.exec(source) || [])[1]
            || grade + ' ' + subject + ' ' + term + ' revision'
    };
}

function preparePage(template, original, file) {
    const details = pageDetails(original, file);
    const gameData = readLiteral(original, 'gameData', file);
    if (!gameData || !Array.isArray(gameData.topic1) || gameData.topic1.length !== 20) {
        throw new Error(file + ' must contain exactly 10 Memory Match pairs');
    }

    const identifiers = new Map();
    gameData.topic1.forEach((card, index) => {
        if (!card || card.id === undefined || !String(card.text || '').trim()) {
            throw new Error(file + ' has an invalid Memory Match card at position ' + (index + 1));
        }
        identifiers.set(String(card.id), (identifiers.get(String(card.id)) || 0) + 1);
    });
    if (identifiers.size !== 10 || [...identifiers.values()].some(count => count !== 2)) {
        throw new Error(file + ' must contain 10 identifiers appearing exactly twice');
    }

    let output = template;
    output = output.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + details.title + '</title>');
    output = output.replace(
        /<body[^>]*>/i,
        '<body data-certificate-grade="' + details.grade + '"'
            + ' data-certificate-subject="' + details.subject + '"'
            + ' data-certificate-term="' + details.term + '"'
            + ' data-certificate-topic="' + details.topic + '"'
            + ' data-certificate-game="' + details.game + '"'
            + ' data-certificate-layout="compact-subject"'
            + ' data-certificate-preview-preset="memory-mastery"'
            + (details.metricStyle ? ' data-certificate-metric-style="' + details.metricStyle + '"' : '')
            + '>'
    );
    output = output.replace(/<h1 class="game-title">[\s\S]*?<\/h1>/i, '<h1 class="game-title">' + details.heading + '</h1>');
    output = output.replace(/<p class="game-subtitle">[\s\S]*?<\/p>/i, '<p class="game-subtitle">' + details.subtitle + '</p>');
    output = output.replace(
        /<p style="font-size: 0\.78rem; color: #52606d; margin-top: 0\.45rem;">[\s\S]*?<\/p>/i,
        '<p style="font-size: 0.78rem; color: #52606d; margin-top: 0.45rem;">' + details.revision + '</p>'
    );
    return replaceDeclaration(output, 'gameData', gameData);
}

const pages = assessmentRoots.flatMap(root => fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(root, entry.name, 'match1.html'))
    .filter(file => fs.existsSync(file)))
    .sort((left, right) => left.localeCompare(right));

if (pages.length !== 15) {
    throw new Error('Expected 15 assessment Memory Match pages, found ' + pages.length);
}

const template = fs.readFileSync(templateFile, 'utf8');
if (!template.includes('Certificate of Memory Mastery') || !template.includes('data-certificate-preview-preset="memory-mastery"')) {
    throw new Error('The Trade Patterns Memory Mastery template is incomplete');
}

const originals = new Map(pages.map(file => [file, fs.readFileSync(file, 'utf8')]));
for (const file of pages) {
    fs.writeFileSync(file, preparePage(template, originals.get(file), file), 'utf8');
    console.log('Updated ' + path.relative(siteRoot, file));
}

console.log('Memory Mastery rollout completed for ' + pages.length + ' assessment games.');
