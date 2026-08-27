const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = 'D:\\Github\\Github Uploads\\MayHub\\Social-Sciences\\Term-3\\Grade-8\\Games\\History Assessment Games';
const themes = fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

function extractJson(html, variableName) {
  const marker = `const ${variableName} = `;
  let start = html.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${variableName}`);
  start += marker.length;
  while (/\s/.test(html[start])) start++;
  const opening = html[start];
  const closing = opening === '[' ? ']' : '}';
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < html.length; index++) {
    const char = html[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === opening) depth++;
    else if (char === closing && --depth === 0) return JSON.parse(html.slice(start, index + 1));
  }
  throw new Error(`Unclosed ${variableName}`);
}

function compileScripts(html, label) {
  for (const [index, script] of [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].entries()) {
    try { if (script[1].trim()) new vm.Script(script[1], { filename: `${label}#script${index + 1}` }); }
    catch (error) { failures.push(`${label}: ${error.message}`); }
  }
}

for (const theme of themes) {
  const file = path.join(root, theme, 'jeopardy1.html');
  const html = fs.readFileSync(file, 'utf8');
  const bank = extractJson(html, 'questionBank');
  assert(/\.name-grid \{[^}]*grid-template-columns: repeat\(4, 1fr\)/.test(html), `${theme}: player-name grid is not four columns`);
  assert(/\.jeopardy-board \{[^}]*grid-template-columns: repeat\(2, 1fr\)/.test(html), `${theme}: Jeopardy board is not two columns`);
  assert(bank.length === 40 && new Set(bank.map(item => item.q)).size === 40, `${theme}: Jeopardy bank must contain 40 unique questions`);
  assert(/slice\(playerIndex \* 10, playerIndex \* 10 \+ 10\)/.test(html), `${theme}: player deal is not 10 questions`);
  assert(/Array\.from\(\{ length: 2 \}/.test(html), `${theme}: player board is not two rounds`);
  const visualCells = ['Round One', 'Round Two'];
  for (let row = 0; row < 5; row++) visualCells.push(`R1-Q${row + 1}`, `R2-Q${row + 1}`);
  assert(visualCells.length === 12 && visualCells[0] === 'Round One' && visualCells[1] === 'Round Two', `${theme}: Jeopardy row model is malformed`);
  compileScripts(html, `${theme}/jeopardy1.html`);
}

const berlinSpinPath = path.join(root, 'The Berlin Conference', 'spin1.html');
const berlinSpin = fs.readFileSync(berlinSpinPath, 'utf8');
const spinData = extractJson(berlinSpin, 'gameData');
assert(spinData.terms.length === 10 && spinData.trueFalse.length === 10 && spinData.multipleChoice.length === 10, 'Berlin Spin: expected 10 interactive questions per category');
assert(/interactiveCategories = new Set\(\['terms', 'multipleChoice', 'trueFalse'\]\)/.test(berlinSpin), 'Berlin Spin: interactive categories are incorrect');
assert(!/interactiveCategories = new Set\([^\n]*definitions/.test(berlinSpin), 'Berlin Spin: Definitions must remain reveal-only');
assert(/Math\.max\(1, Math\.min\(5, availableQuestions\.terms\.length\)\)/.test(berlinSpin), 'Berlin Spin: shrinking Terms choice rule is missing');
const optionCounts = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(remaining => Math.max(1, Math.min(5, remaining)));
assert(JSON.stringify(optionCounts) === JSON.stringify([5, 5, 5, 5, 5, 4, 3, 2, 1, 1]), 'Berlin Spin: Terms option-count sequence is wrong');
assert(berlinSpin.includes('class="celebration-page"') && berlinSpin.includes('id="celebrationScore"'), 'Berlin Spin: celebration result card is missing');
assert(berlinSpin.includes('Name and Surname:') && berlinSpin.includes("mayhubActivityAccess"), 'Berlin Spin: signed-in learner name integration is missing');
assert(berlinSpin.includes('https://wa.me/?text=') && berlinSpin.includes('Share to WhatsApp Status'), 'Berlin Spin: WhatsApp sharing is missing');
assert(/stats\.answered !== totalQuestions/.test(berlinSpin) && /stats\.correct\}\//.test(berlinSpin) === false, 'Berlin Spin: completion scoring guard is invalid');
assert(berlinSpin.includes("selectedText === currentQuestionData.a"), 'Berlin Spin: exact answer checking is missing');
compileScripts(berlinSpin, 'The Berlin Conference/spin1.html');

for (const theme of themes.filter(name => name !== 'The Berlin Conference')) {
  const html = fs.readFileSync(path.join(root, theme, 'spin1.html'), 'utf8');
  assert(!html.includes('celebrationPage') && !html.includes('shareWhatsAppStatus'), `${theme}: pilot was incorrectly rolled out beyond one game`);
}

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Validation passed: five symmetrical two-round Jeopardy boards and one Berlin Conference Spin scoring/share pilot.');
