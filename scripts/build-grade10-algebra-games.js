/*
 * Grade 10 Mathematics: Algebraic Expressions.
 * Source: the two scanned pages of ALGEBRAIC EXPRESSIONS GRADE 10.pdf.
 * The 44 inputs and memo answers below were transcribed by visual inspection.
 * This build verifies polynomial identities before adapting the Grade 11 Term 4
 * game templates. It never modifies the source PDF or the original templates.
 * Run: node scripts/build-grade10-algebra-games.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
const templates = path.join(root, 'Geography/Term-4/Grade-11/Games/1. Soil Erosion');
const output = path.join(root, 'Collaboration Hub/Maths/Grade 10/Algebraic Expressions');
const vars = ['x', 'y', 'a', 'b', 'm', 'n'];
const zero = '0,0,0,0,0,0';

// Exact integer polynomial arithmetic: no eval, floating-point sampling or CAS dependency.
function add(a, b, scale = 1) {
  const result = new Map(a);
  for (const [key, value] of b) {
    const coefficient = (result.get(key) || 0) + scale * value;
    if (coefficient) result.set(key, coefficient); else result.delete(key);
  }
  return result;
}
function multiply(a, b) {
  let result = new Map();
  for (const [ak, av] of a) for (const [bk, bv] of b) {
    const left = ak.split(',').map(Number), right = bk.split(',').map(Number);
    const key = left.map((exponent, i) => exponent + right[i]).join(',');
    result = add(result, new Map([[key, av * bv]]));
  }
  return result;
}
function polynomial(expression) {
  const tokens = expression.match(/\d+|[xyabmn]|[()+*^\-]/g) || [];
  assert.strictEqual(tokens.join(''), expression.replace(/\s/g, ''), 'Unsupported expression: ' + expression);
  let position = 0;
  function sum() {
    let value = product();
    while (tokens[position] === '+' || tokens[position] === '-') {
      const sign = tokens[position++] === '+' ? 1 : -1;
      value = add(value, product(), sign);
    }
    return value;
  }
  function product() {
    let value = factor();
    while (tokens[position] === '*') { position++; value = multiply(value, factor()); }
    return value;
  }
  function factor() {
    if (tokens[position] === '-') { position++; return add(new Map(), factor(), -1); }
    if (tokens[position] === '+') { position++; return factor(); }
    let value;
    const token = tokens[position++];
    if (token === '(') {
      value = sum(); assert.strictEqual(tokens[position++], ')', expression);
    } else if (/^\d+$/.test(token || '')) {
      value = Number(token) ? new Map([[zero, Number(token)]]) : new Map();
    } else {
      assert(vars.includes(token), 'Invalid token in ' + expression);
      const powers = vars.map(v => Number(v === token));
      value = new Map([[powers.join(','), 1]]);
    }
    if (tokens[position] === '^') {
      position++; const power = Number(tokens[position++]);
      assert(Number.isInteger(power) && power >= 0 && power <= 12);
      const base = value; value = new Map([[zero, 1]]);
      for (let i = 0; i < power; i++) value = multiply(value, base);
    }
    return value;
  }
  const result = sum(); assert.strictEqual(position, tokens.length, expression); return result;
}
function signature(value) { return JSON.stringify([...value].sort(([a], [b]) => a.localeCompare(b))); }
const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function exponent(value) { return String(value).split('').map(n => superscripts[Number(n)]).join(''); }
function displayExpression(value) {
  return value.replace(/\^(\d+)/g, (_, power) => exponent(power))
    .replace(/\*/g, '').replace(/-/g, ' − ').replace(/\+/g, ' + ')
    .replace(/\s+/g, ' ').replace(/\(\s+/g, '(').trim();
}
function displayPolynomial(value) {
  const terms = [...value].sort(([a], [b]) => {
    const ap = a.split(',').map(Number), bp = b.split(',').map(Number);
    for (let i = 0; i < vars.length; i++) if (ap[i] !== bp[i]) return bp[i] - ap[i];
    return 0;
  });
  return terms.map(([key, coefficient], index) => {
    const powers = key.split(',').map(Number);
    const literal = powers.map((power, i) => power ? vars[i] + (power > 1 ? exponent(power) : '') : '').join('');
    const magnitude = Math.abs(coefficient);
    const term = (literal && magnitude === 1 ? '' : magnitude) + literal;
    return (index ? (coefficient < 0 ? ' − ' : ' + ') : coefficient < 0 ? '−' : '') + term;
  }).join('') || '0';
}

const input = [
  ['4a1', '3*x*(x+3)', '3*x^2+9*x'],
  ['4a2', '-3*a*(3*a^3-6*a^2+a)', '-9*a^4+18*a^3-3*a^2'],
  ['4a3', '(x+5)*(x+2)', 'x^2+7*x+10'],
  ['4a4', '(x-5)*(x-2)', 'x^2-7*x+10'],
  ['4a5', '(x+5)*(x-2)', 'x^2+3*x-10'],
  ['4a6', '(x-5)*(x+2)', 'x^2-3*x-10'],
  ['4a7', '(3*x-1)*(2*x+3)', '6*x^2+7*x-3'],
  ['4a8', '(7*m-2*n)*(3*m+4*n)', '21*m^2+22*m*n-8*n^2'],
  ['4a9', '(2*x^4-3*y^2)*(3*x^4+2*y^2)', '6*x^8-5*x^4*y^2-6*y^4'],
  ['4a10', '(4*x^4+3*y^5)*(2*x^4-4*y^3)', '8*x^8-16*x^4*y^3+6*x^4*y^5-12*y^8'],
  ['4b1', '(x+1)*(x^2+2*x+3)', 'x^3+3*x^2+5*x+3'],
  ['4b2', '(x-1)*(x^2-2*x+3)', 'x^3-3*x^2+5*x-3'],
  ['4b3', '(2*x+4)*(x^2-3*x+1)', '2*x^3-2*x^2-10*x+4'],
  ['4b4', '(2*x-4)*(x^2-3*x+1)', '2*x^3-10*x^2+14*x-4'],
  ['4b5', '(3*x-y)*(2*x^2+4*x*y-y^2)', '6*x^3+10*x^2*y-7*x*y^2+y^3'],
  ['4b6', '(a+2*b)*(4*a^2-3*a*b+b^2)', '4*a^3+5*a^2*b-5*a*b^2+2*b^3'],
  ['4b7', '(3*x-2*y)*(9*x^2+6*x*y+4*y^2)', '27*x^3-8*y^3'],
  ['4b8', '(3*x+2*y)*(9*x^2-6*x*y+4*y^2)', '27*x^3+8*y^3'],
  ['4c1', '2*x*(3*x-4*y)-(7*x^2-2*x*y)', '-x^2-6*x*y'],
  ['4c2', '(5*y+1)^2-(3*y+4)*(2-3*y)', '34*y^2+16*y-7'],
  ['4c3', '(2*x+y)^2-(3*x-2*y)^2+(x-4*y)*(x+4*y)', '-4*x^2+16*x*y-19*y^2'],
  ['4c4', 'x^6+(x^3-3*y)*(x^3+3*y)', '2*x^6-9*y^2'],
  ['4c5', '(3*a+b)*(3*a-b)*(2*a+5*b)', '18*a^3+45*a^2*b-2*a*b^2-5*b^3'],
  ['5a1', '(x+7)*(x-7)', 'x^2-49'],
  ['5a2', '(x-3)*(x+3)', 'x^2-9'],
  ['5a3', '(2*x-1)*(2*x+1)', '4*x^2-1'],
  ['5a4', '(9*x+4)*(9*x-4)', '81*x^2-16'],
  ['5a5', '(3*x-2*y)*(3*x+2*y)', '9*x^2-4*y^2'],
  ['5a6', '(4*a^3*b+3)*(4*a^3*b-3)', '16*a^6*b^2-9'],
  ['5a7', '(6-3*x^4*y)*(6+3*x^4*y)', '36-9*x^8*y^2'],
  ['5a8', '(3*x-2+y)*(3*x-2-y)', '9*x^2-12*x+4-y^2'],
  ['5a9', '(1-a^4)*(1-a^2)*(1+a^2)', '1-2*a^4+a^8'],
  ['5b1', '(x+5)^2', 'x^2+10*x+25'],
  ['5b2', '(x-5)^2', 'x^2-10*x+25'],
  ['5b3', '(2*a+3)^2', '4*a^2+12*a+9'],
  ['5b4', '(2*a-3)^2', '4*a^2-12*a+9'],
  ['5b5', '(a-4*b)^2', 'a^2-8*a*b+16*b^2'],
  ['5b6', '(-a-3*b)^2', 'a^2+6*a*b+9*b^2'],
  ['5b7', '(-3*a+5*b)^2', '9*a^2-30*a*b+25*b^2'],
  ['5b8', '3*(x-3*y)^2', '3*x^2-18*x*y+27*y^2'],
  ['5b9', '(2*(m-4*n))^2', '4*m^2-32*m*n+64*n^2'],
  ['5b10', '(x^3-3*y^6)^2', 'x^6-6*x^3*y^6+9*y^12'],
  ['5b11', '(2*a+3*b)^3', '8*a^3+36*a^2*b+54*a*b^2+27*b^3'],
  ['5b12', '(2*a-3*b)^3', '8*a^3-36*a^2*b+54*a*b^2-27*b^3']
];
assert.strictEqual(input.length, 44);

function hintFor(id) {
  if (id.startsWith('5a')) return 'Use (u + v)(u − v) = u² − v². Square the entire term, including its coefficient.';
  if (['5b11', '5b12'].includes(id)) return 'Use (u ± v)³ = u³ ± 3u²v + 3uv² ± v³, keeping the correct signs.';
  if (id.startsWith('5b')) return 'Use (u ± v)² = u² ± 2uv + v². Include the middle term and square each whole term.';
  if (id === '4c5') return 'First use (3a + b)(3a − b) = 9a² − b², then distribute the final bracket.';
  if (id.startsWith('4c')) return 'Expand each product first. A minus before brackets changes every sign; then collect like terms.';
  if (['4b7', '4b8'].includes(id)) return 'Distribute all six products. The mixed terms cancel; retain the two cube terms.';
  if (id.startsWith('4b')) return 'Multiply each term in the first bracket by all three terms in the second, then combine like terms.';
  if (['4a1', '4a2'].includes(id)) return 'Multiply every bracketed term by the outside monomial. Multiply coefficients and add exponents of like bases.';
  return 'Multiply all four term pairs, apply the signs carefully, then combine only like terms.';
}
const exercises = input.map(([id, expression, answer]) => {
  const expanded = polynomial(expression), expected = polynomial(answer);
  assert.strictEqual(signature(expanded), signature(expected), 'Memo mismatch: ' + id);
  return { id, expression: displayExpression(expression), answer: displayPolynomial(expanded), hint: hintFor(id), polynomial: expanded };
});
assert.strictEqual(new Set(exercises.map(item => item.answer)).size, 44, 'Repeated equivalent answers');

function wrongAnswers(item) {
  const entries = [...item.polynomial];
  const candidates = [];
  for (let i = 0; i < entries.length; i++) {
    const [key, coefficient] = entries[i];
    const flipped = new Map(item.polynomial); flipped.set(key, -coefficient); candidates.push(flipped);
    const omitted = new Map(item.polynomial); omitted.delete(key); candidates.push(omitted);
  }
  for (const delta of [1, -1, 2, -2]) {
    const adjusted = add(item.polynomial, new Map([[entries[0][0], delta]])); candidates.push(adjusted);
  }
  const seen = new Set([signature(item.polynomial)]);
  const answers = [];
  for (const candidate of candidates) {
    const key = signature(candidate);
    if (!seen.has(key)) { seen.add(key); answers.push(displayPolynomial(candidate)); }
    if (answers.length === 3) break;
  }
  assert.strictEqual(answers.length, 3); return answers;
}
function choice(index, labelled = false, positionIndex = index) {
  const item = exercises[index];
  const options = [item.answer, ...wrongAnswers(item)];
  for (let i = 0; i < positionIndex % 4; i++) options.push(options.shift());
  const answerIndex = options.indexOf(item.answer);
  return labelled ? {
    q: 'Expand and simplify: ' + item.expression,
    options: options.map((text, i) => String.fromCharCode(65 + i) + ') ' + text),
    a: String.fromCharCode(65 + answerIndex) + ') ' + item.answer,
    exp: item.hint
  } : { q: 'Expand and simplify: ' + item.expression, options, a: answerIndex, hint: item.hint };
}
const groups = [
  Array.from({ length: 10 }, (_, i) => i),
  Array.from({ length: 10 }, (_, i) => i + 10),
  Array.from({ length: 10 }, (_, i) => i + 23),
  [20, 21, 22, 33, 34, 35, 36, 37, 42, 43]
];
const spinIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 19, 20, 22, 23, 27, 32, 42];
const spin = {
  definitions: spinIndexes.map(i => ({ q: 'Expand and simplify: ' + exercises[i].expression,
    a: exercises[i].answer + '<br><small>' + exercises[i].hint + '</small>' })),
  terms: spinIndexes.map(i => ({ q: 'Find the expression that expands to: ' + exercises[i].answer, a: exercises[i].expression,
    exp: exercises[i].hint })),
  multipleChoice: spinIndexes.map((i, rank) => choice(i, true, rank)),
  trueFalse: spinIndexes.map((i, rank) => ({
    q: exercises[i].expression + ' = ' + (rank % 2 === 0 ? exercises[i].answer : wrongAnswers(exercises[i])[rank % 3]),
    options: ['True', 'False'], a: rank % 2 === 0 ? 'True' : 'False',
    exp: 'The simplified expression is ' + exercises[i].answer + '. ' + exercises[i].hint
  }))
};
const data = {
  exercises: exercises.map(({ polynomial: ignored, ...item }) => item),
  spin,
  snake: Object.fromEntries(groups.map((indexes, group) => ['game' + (group + 1), indexes.map((i, rank) => choice(i, false, rank))])),
  match: Object.fromEntries(groups.map((indexes, group) => ['topic' + (group + 1), indexes.flatMap((i, pair) => [
    { id: pair + 1, text: exercises[i].expression }, { id: pair + 1, text: exercises[i].answer }
  ])])),
  drag: Object.fromEntries(groups.map((indexes, group) => ['unit' + (group + 1), indexes.slice(0, 5).map(i => ({
    item: exercises[i].expression, match: exercises[i].answer
  }))])),
  millionaire: [0, 2, 3, 23, 25, 32, 35, 6, 10, 12, 7, 36, 18, 19, 42].map((i, rank) => choice(i, false, rank)),
  jeopardy: exercises.map((item, i) => ({ category: i < 22 ? 'Round One' : 'Round Two',
    q: 'Expand and simplify: ' + item.expression, a: item.answer }))
};

fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'algebra-expressions-data.js'),
  '/* Generated by scripts/build-grade10-algebra-games.js; all 44 polynomial identities verified. */\n' +
  'window.Grade10AlgebraExpressions = Object.freeze(' + JSON.stringify(data, null, 2) + ');\n', 'utf8');

const categoryRenames = [
  ['Soil Processes', 'Bracket Basics'], ['Causes and Land Use', 'Multiply and Simplify'],
  ['Effects of Erosion', 'Difference of Squares'], ['Soil Conservation', 'Squares and Cubes']
];
function replaceRequired(text, from, to) {
  assert(text.includes(from), 'Template changed: missing ' + from); return text.replaceAll(from, to);
}
for (const file of ['spin1.html', 'jeopardy1.html', 'match1.html', 'millionaire1.html', 'snake1.html', 'drag1.html']) {
  let html = fs.readFileSync(path.join(templates, file), 'utf8');
  html = html.replaceAll('../../../../../', '../../../../');
  html = html.replaceAll('Geography/Term-4/Grade-11/Games/1.%20Soil%20Erosion', 'Collaboration%20Hub/Maths/Grade%2010/Algebraic%20Expressions');
  html = replaceRequired(html, 'window.SoilErosionTopic1', 'window.Grade10AlgebraExpressions');
  html = replaceRequired(html, 'soil-erosion-data.js', 'algebra-expressions-data.js');
  html = html.replaceAll('Soil Erosion', 'Algebraic Expressions').replaceAll('Grade 11', 'Grade 10').replaceAll('Geography', 'Mathematics');
  html = html.replaceAll('mayhubGrade11Term4SoilErosion', 'mayhubGrade10MathsAlgebraicExpressions');
  html = html.replaceAll('Grade-11', 'Grade-10').replaceAll('data-certificate-term="Term 4"', 'data-certificate-term=""');
  html = html.replaceAll(' Term 4', '').replaceAll('>Term 4<', '><');
  html = html.replaceAll('Explore soil formation, erosion processes, land-use pressures, effects and practical soil conservation.',
    'Expand brackets, simplify like terms and recognise special products. Work out each expression before choosing an answer.');
  html = html.replaceAll('soil erosion and conservation challenge', 'algebraic expressions challenge');
  for (const [from, to] of categoryRenames) html = html.replaceAll(from, to);
  html = html.replace('</head>', '    <link rel="stylesheet" href="maths-games.css">\n</head>');
  html = html.replace('<div class="nav-links">', '<div class="nav-links">\n            <a href="../../../../Collab-Hub.html#maths-grade10-algebraic-expressions">Maths Hub</a>\n            <a href="games.html">Games</a>');
  if (file === 'spin1.html') {
    html = html.replaceAll('Definitions', 'Worked Examples').replaceAll('Terms', 'Find the Expression');
    html = html.replace("'Term ' + (currentTermChoiceIndex", "'Expression ' + (currentTermChoiceIndex");
    html = html.replace('Term 1 of 5', 'Expression 1 of 5');
  }
  if (file === 'drag1.html') {
    html = replaceRequired(html, 'shuffledItems.forEach(entry => {', 'shuffledItems.forEach((entry, itemIndex) => {');
    html = replaceRequired(html, 'item.id = `drag-${cleanId(entry.item)}`;', 'item.id = `drag-${currentCategoryKey}-${itemIndex}`;');
    html = html.replace('Select the matching Mathematics answer.', 'Select the expression that gives this answer.');
    html = html.replace('You correctly identified all terms for the', 'You matched all expressions in the');
  }
  fs.writeFileSync(path.join(output, file), html, 'utf8');
}

const landingTemplate = fs.readFileSync(path.join(templates, 'SoilErosion.html'), 'utf8');
let landing = landingTemplate.replaceAll('../../../../../', '../../../../')
  .replaceAll('Soil Erosion', 'Algebraic Expressions').replaceAll('Grade 11', 'Grade 10')
  .replaceAll('Geography', 'Mathematics').replaceAll('Term 4 Content Games', 'Mathematics Content Games')
  .replaceAll(' Term 4', '').replaceAll('Explore soil formation, erosion processes, land-use pressures, effects and practical soil conservation.',
    'Practise expanding and simplifying brackets, differences of squares, squares and cubes using six interactive games.')
  .replaceAll('Flip the cards and match the definitions.', 'Remember and match expressions with their simplified answers.')
  .replaceAll('Pair each concept with its correct description on any device.', 'Match expressions to their expanded answers by dragging or tapping.');
landing = landing.replace('href="../games.html"', 'href="../../../../Collab-Hub.html#maths-grade10-algebraic-expressions"');
landing = landing.replace('class="active">Games</a>', 'class="active">Maths Hub</a>');
landing = landing.replace('</head>', '    <link rel="stylesheet" href="maths-games.css">\n</head>');
landing = landing.replace('<main class="games-container">', `<main class="games-container">
        <section class="maths-study-note" aria-labelledby="algebra-start-title">
            <h2 id="algebra-start-title">Before you play</h2>
            <p>Multiply each term in one bracket by every term in the other. Then collect like terms: terms must have the same variables and exponents to combine.</p>
            <p class="worked-example">(x + 5)(x + 2) = x² + 2x + 5x + 10 = x² + 7x + 10</p>
            <p>Remember (u + v)(u − v) = u² − v² and (u ± v)² = u² ± 2uv + v². A square is not just the sum of two squares. Keep a pen and paper nearby for the longer expressions.</p>
        </section>`);
fs.writeFileSync(path.join(output, 'games.html'), landing, 'utf8');
console.log('Verified all 44 scanned exercises against their memo answers.');
console.log('Built six Grade 10 Mathematics games: 20 cards per spin category, 10 memory pairs, 5 drag pairs, 15 Millionaire questions and 44 unique Jeopardy prompts.');
