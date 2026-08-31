/*
 * Builds the static May Learning Hub search catalogue.
 *
 * Run from the repository root:
 *   node scripts/build-universal-search-index.js
 *
 * The generated file is ordinary JavaScript so it also works when index.html
 * is opened directly from disk, where fetch() access to a JSON file may be
 * restricted by the browser.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'universal-search-index.js');

const skippedDirectories = new Set([
  '.agents',
  '.codex',
  '.git',
  '.idea',
  '.openai',
  'data',
  'data.local-only',
  'node_modules',
  'pdfjs',
  'tmp'
]);

const skippedRootPages = new Set([
  'admin.html',
  'certificate-history.html',
  'presentation-launcher.html',
  'profile-dashboard.html',
  'reset-password.html',
  'signin.html',
  'signup.html'
]);

const gameNames = {
  'spin1.html': 'Spin the Wheel',
  'spinthewheel.html': 'Spin the Wheel',
  'snake1.html': 'Snake Challenge',
  'millionaire1.html': 'Millionaire Challenge',
  'match1.html': 'Memory Match',
  'jeopardy1.html': 'Jeopardy',
  'drag1.html': 'Drag and Drop',
  'hangman1.html': 'Hangman'
};

function walk(directory, results = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.isDirectory()) continue;
    if (entry.isDirectory() && skippedDirectories.has(entry.name.toLowerCase())) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath, results);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (extension === '.html' || extension === '.pdf') results.push(absolutePath);
  }
  return results;
}

function decodeEntities(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    hellip: '…',
    laquo: '“',
    ldquo: '“',
    lsquo: '‘',
    lt: '<',
    nbsp: ' ',
    ndash: '–',
    quot: '"',
    raquo: '”',
    rdquo: '”',
    rsquo: '’'
  };

  return String(value || '')
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)))
    .replace(/&([a-z]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity);
}

function plainText(value) {
  return decodeEntities(String(value || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function humanise(value) {
  return decodeURIComponent(String(value || ''))
    .replace(/\.(?:html?|pdf)$/i, '')
    .replace(/^\d+[.)_-]*\s*/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function encodeRelativePath(relativePath) {
  return relativePath
    .split(path.sep)
    .map(segment => encodeURIComponent(segment))
    .join('/');
}

function getHtmlMetadata(absolutePath) {
  const html = fs.readFileSync(absolutePath, 'utf8');
  const withoutCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const headings = [];
  const headingPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;

  while ((match = headingPattern.exec(withoutCode)) && headings.length < 12) {
    const heading = plainText(match[2]);
    if (heading && !headings.includes(heading)) headings.push(heading);
  }

  return {
    title: plainText(titleMatch ? titleMatch[1] : ''),
    description: plainText(descriptionMatch ? descriptionMatch[1] : ''),
    headings
  };
}

function getPathContext(relativePath) {
  const normalisedPath = relativePath.replace(/\\/g, '/');
  const segments = normalisedPath.split('/');
  const lowerSegments = segments.map(segment => segment.toLowerCase());
  const subjectSegment = segments.find(segment => /^(geography|life-sciences|social-sciences)$/i.test(segment));
  const subject = subjectSegment
    ? humanise(subjectSegment)
    : lowerSegments.includes('maths')
      ? 'Mathematics'
      : normalisedPath.startsWith('Collaboration Hub/')
        ? 'Collaboration Hub'
        : 'May Learning Hub';
  const gradeMatch = normalisedPath.match(/Grade[- ]?(\d+)/i);
  const termMatch = normalisedPath.match(/Term[- ]?(\d+)/i);
  const fileName = segments[segments.length - 1];
  const extension = path.extname(fileName).toLowerCase();
  const baseName = fileName.toLowerCase();
  const isGame = lowerSegments.includes('games') || normalisedPath.includes('/Games/');
  const isAssessmentGame = /assessment games/i.test(normalisedPath);
  let category = 'Pages';
  let type = 'Page';

  if (/\/Notes\/notes\.html$/i.test(normalisedPath)) {
    category = 'Notes';
    type = 'Presentation';
  } else if (/\/Activities\//i.test(normalisedPath)) {
    category = 'Activities';
    type = /activities\.html$/i.test(fileName) ? 'Activities Page' : 'Activity';
  } else if (/LearningGuides/i.test(normalisedPath)) {
    category = 'Guides';
    type = 'Learning Guide';
  } else if (isGame) {
    category = 'Games';
    type = gameNames[baseName]
      || (/quest\.html$/i.test(fileName) ? humanise(fileName) : '')
      || (/games\.html$/i.test(fileName) ? (isAssessmentGame ? 'Assessment Games' : 'Games Page') : '')
      || (isAssessmentGame ? 'Assessment Game' : 'Learning Game');
  } else if (extension === '.pdf') {
    category = 'Documents';
    if (/memo|_mg\b|memorandum/i.test(fileName)) type = 'Memorandum';
    else if (/qp|question|exam/i.test(fileName) || /exam-hub/i.test(normalisedPath)) type = 'Exam Paper';
    else if (/atp/i.test(fileName)) type = 'Annual Teaching Plan';
    else if (/poa/i.test(fileName)) type = 'Programme of Assessment';
    else if (/caps/i.test(fileName)) type = 'CAPS Document';
    else type = 'Document';
  }

  const ignoredTopicFolders = /^(notes|games|activities|assessment games|history assessment games|learningguides|documents|revisionq|spin the wheel)$/i;
  const candidateFolders = segments
    .slice(0, -1)
    .filter(segment => !ignoredTopicFolders.test(segment))
    .filter(segment => !/^(term[- ]?\d+|grade[- ]?\d+|geography|life-sciences|social-sciences|collaboration hub|maths)$/i.test(segment));
  const topic = humanise(candidateFolders[candidateFolders.length - 1] || '');

  return {
    normalisedPath,
    subject,
    grade: gradeMatch ? Number(gradeMatch[1]) : null,
    term: termMatch ? Number(termMatch[1]) : null,
    category,
    type,
    topic,
    fileName
  };
}

function shouldInclude(relativePath) {
  const normalisedPath = relativePath.replace(/\\/g, '/');
  const rootName = normalisedPath.toLowerCase();
  if (!normalisedPath.includes('/') && skippedRootPages.has(rootName)) return false;
  if (/html5-unsupported\.html$/i.test(normalisedPath)) return false;
  if (/\.backup|before-simplification/i.test(normalisedPath)) return false;
  return true;
}

function chooseTitle(metadata, context) {
  const genericTitles = /^(learning hub|may learning hub|games|activities|presentation|notes|untitled)$/i;
  const usefulHeading = metadata.headings.find(heading => heading.length >= 3 && !genericTitles.test(heading));
  let title = usefulHeading || metadata.title || humanise(context.fileName);

  if (genericTitles.test(title) && context.topic) title = context.topic;
  if (context.type && gameNames[context.fileName.toLowerCase()] && context.topic) {
    title = `${context.topic}: ${context.type}`;
  } else if (context.type === 'Presentation' && context.grade && context.term) {
    title = `${context.subject} Grade ${context.grade} Term ${context.term} Presentation`;
  } else if (/^(games|activities)\.html$/i.test(context.fileName) && context.grade && context.term) {
    title = `${context.subject} Grade ${context.grade} Term ${context.term} ${context.type}`;
  }

  return title.replace(/\s+/g, ' ').trim();
}

function buildEntry(absolutePath, index) {
  const relativePath = path.relative(rootDir, absolutePath);
  const context = getPathContext(relativePath);
  const isHtml = path.extname(absolutePath).toLowerCase() === '.html';
  const metadata = isHtml ? getHtmlMetadata(absolutePath) : { title: '', description: '', headings: [] };
  const title = chooseTitle(metadata, context);
  const descriptors = [
    context.subject,
    context.grade ? `Grade ${context.grade}` : '',
    context.term ? `Term ${context.term}` : '',
    context.topic,
    context.type
  ].filter(Boolean);
  const description = metadata.description || descriptors.join(' · ');
  const keywords = [
    title,
    description,
    context.subject,
    context.topic,
    context.type,
    context.category,
    context.grade ? `grade ${context.grade}` : '',
    context.term ? `term ${context.term}` : '',
    ...metadata.headings,
    ...context.normalisedPath.split('/').map(humanise)
  ].filter(Boolean).join(' ');

  return {
    id: index + 1,
    title,
    href: encodeRelativePath(relativePath),
    subject: context.subject,
    grade: context.grade,
    term: context.term,
    category: context.category,
    type: context.type,
    topic: context.topic,
    description,
    keywords
  };
}

const files = walk(rootDir)
  .filter(filePath => shouldInclude(path.relative(rootDir, filePath)))
  .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

const entries = files.map(buildEntry);
const output = `/* Generated by scripts/build-universal-search-index.js. Do not edit by hand. */\nwindow.MAY_UNIVERSAL_SEARCH_INDEX = Object.freeze(${JSON.stringify(entries, null, 2)});\n`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Created ${path.basename(outputPath)} with ${entries.length} searchable resources.`);
