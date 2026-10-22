/* Local integration test; requires the bundled Playwright package and Chrome. */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const assert = require('assert');
const vm = require('vm');
const { chromium } = require(process.env.MAYHUB_PLAYWRIGHT_PATH
  || 'C:/Users/MJMayaya/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const topicPath = 'Collaboration Hub/Maths/Grade 10/Algebraic Expressions';
const filenames = ['games.html', 'spin1.html', 'match1.html', 'drag1.html', 'jeopardy1.html', 'millionaire1.html', 'snake1.html'];

for (const name of filenames) {
  const html = fs.readFileSync(path.join(root, topicPath, name), 'utf8');
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!script[1].includes('src=')) new vm.Script(script[2], { filename: name });
  }
  assert(!/SoilErosion|Soil Erosion|Geography|Grade 11|Term 4/.test(html), 'Old topic in ' + name);
}
const server = http.createServer((request, response) => {
  let local;
  try { local = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end(); return; }
  const absolute = path.resolve(root, '.' + local);
  if (!absolute.startsWith(root + path.sep) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    response.writeHead(404); response.end(); return;
  }
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.woff': 'font/woff' };
  response.writeHead(200, { 'Content-Type': types[path.extname(absolute)] || 'application/octet-stream' });
  fs.createReadStream(absolute).pipe(response);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  const failures = [];
  try {
    browser = await chromium.launch({ executablePath: process.env.MAYHUB_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
    const context = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce', acceptDownloads: true });
    // Entire test is offline apart from localhost; no Analytics events or account writes.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return ['127.0.0.1', 'blob:'].includes(url.hostname) || url.protocol === 'blob:'
        ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => failures.push(error.message));
    page.on('dialog', dialog => dialog.accept('Test Learner'));
    const origin = 'http://127.0.0.1:' + server.address().port;
    const urlFor = name => origin + '/' + topicPath.split('/').map(encodeURIComponent).join('/') + '/' + name;
    async function load(name, width = 1280) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(urlFor(name), { waitUntil: 'load' });
    }
    async function certificate() {
      await page.locator('.mayhub-cert-overlay').waitFor({ state: 'visible' });
      const text = await page.locator('.mayhub-cert-overlay').innerText();
      assert(text.toLowerCase().includes('grade 10 mathematics'), text);
      assert(!text.includes('Grade 11') && !text.includes('Geography') && !text.includes('Term 4'));
      return text;
    }
    async function download(selector) {
      const waiting = page.waitForEvent('download', { timeout: 30000 });
      await page.locator(selector).click();
      const file = await waiting;
      assert(file.suggestedFilename().endsWith('.png'));
      const content = fs.readFileSync(await file.path());
      assert(content.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])));
      console.log('PASS PNG download:', file.suggestedFilename(), content.length, 'bytes');
    }

    for (const width of [1280, 375]) for (const name of filenames) {
      await load(name, width);
      const widthInfo = await page.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth }));
      assert(widthInfo.width <= widthInfo.viewport + 1, name + ' overflows at ' + width);
      if (name === 'games.html') assert.strictEqual(await page.locator('.topic-btn').count(), 6);
    }
    console.log('PASS: seven entry pages load on desktop/mobile without horizontal overflow.');

    await page.goto(origin + '/Collab-Hub.html#maths-grade10-algebraic-expressions');
    await page.waitForFunction(() => document.getElementById('maths-grade10-algebraic-expressions').closest('details').open);
    assert(await page.locator('a[href="Collaboration Hub/Maths/Grade 10/Algebraic Expressions/games.html"]').isVisible());
    console.log('PASS: Grade 10 Maths Hub navigation.');

    await load('spin1.html', 375);
    await page.locator('[data-category="terms"]').click();
    await page.locator('#spinBtn').click();
    await page.locator('#questionCard').waitFor({ state: 'visible' });
    for (let step = 0; step < 5; step++) {
      const correct = await page.evaluate(() => currentTermChoices[currentTermChoiceIndex] === currentQuestionData.a);
      if (correct) break;
      await page.locator('#nextTermBtn').click();
    }
    await page.locator('#termOptionDisplay').click();
    assert.strictEqual(await page.evaluate(() => categoryStats.terms.correct), 1);
    console.log('PASS: expression carousel accepts the correct expression.');
    await page.locator('[data-category="trueFalse"]').click();
    for (let i = 0; i < 20; i++) {
      await page.locator('#spinBtn').click();
      await page.locator('#questionCard').waitFor({ state: 'visible' });
      const answer = await page.evaluate(() => currentQuestionData.a);
      await page.locator('#mcOptions button').filter({ hasText: answer }).click();
    }
    await page.locator('#celebrationPage').waitFor({ state: 'visible' });
    assert.strictEqual(await page.evaluate(() => lastCompletedScore.correct), 20);
    assert((await page.locator('#celebrationPage').innerText()).toLowerCase().includes('grade 10 mathematics'));
    await download('#downloadCertificateBtn');
    console.log('PASS: full 20-question scored spin completion.');

    await load('spin1.html', 375);
    await page.locator('[data-category="definitions"]').click();
    // Fixture for the final reveal-only card: verify the participation branch.
    await page.evaluate(() => { availableQuestions.definitions = [0]; });
    await page.locator('#spinBtn').click();
    await page.locator('#questionCard').waitFor({ state: 'visible' });
    await page.locator('#revealBtn').click();
    await page.locator('#celebrationPage').waitFor({ state: 'visible' });
    assert.strictEqual(await page.locator('.certificate.tier-participation').count(), 1);
    assert((await page.locator('#celebrationPage').innerText()).toLowerCase().includes('certificate of participation'));
    console.log('PASS: reveal-only Worked Examples produces the blue participation certificate.');

    await load('spin1.html', 375);
    await page.locator('[data-category="multipleChoice"]').click();
    await page.evaluate(() => {
      currentQuestionData = gameData.multipleChoice[14];
      displayQuestion(1, currentQuestionData);
    });
    const cardSize = await page.locator('#questionCard').evaluate(el => ({ width: el.clientWidth, content: el.scrollWidth }));
    assert(cardSize.content <= cardSize.width + 1, 'Long algebra expression overflows');
    const questionPreview = path.join(os.tmpdir(), 'mayhub-grade10-algebra-question.png');
    await page.locator('#questionCard').screenshot({ path: questionPreview });
    console.log('Question screenshot:', questionPreview);

    for (let group = 1; group <= 4; group++) {
      await load('match1.html', 375);
      await page.evaluate(group => {
        const key = 'topic' + group;
        const button = [...document.querySelectorAll('.cat-btn')][group - 1];
        selectCategory(key, button);
        const cards = [...document.querySelectorAll('.memory-card')];
        for (let pair = 1; pair <= 10; pair++) {
          for (const card of cards.filter(card => card.dataset.pairId === String(pair))) card.click();
        }
      }, group);
      assert((await certificate()).toLowerCase().includes('certificate of memory mastery'));
      assert.strictEqual(await page.locator('#mayhubCertMetricUnits').isVisible(), true);
      if (group === 4) {
        const png = path.join(os.tmpdir(), 'mayhub-grade10-algebra-certificate.png');
        await page.screenshot({ path: png, fullPage: false });
        console.log('Certificate screenshot:', png);
      }
    }
    console.log('PASS: all four Memory Match sets complete with digital-duration certificates.');

    await load('drag1.html', 375);
    await page.evaluate(() => {
      selectCategory('unit1', document.querySelector('.cat-btn'));
      for (const item of [...document.querySelectorAll('.drag-item')]) {
        const zone = [...document.querySelectorAll('.drop-zone')].find(zone => zone.dataset.match === item.dataset.answer);
        item.click(); zone.click();
      }
      if (score !== 5) throw Error('Expected five first-attempt matches; got ' + score);
    });
    await certificate();
    await download('#mayhubCertDownload');
    console.log('PASS: Drag/Tap Match first-attempt scoring and certificate.');

    await load('jeopardy1.html');
    const questions = await page.evaluate(() => gameData.flatMap(player => player.flatMap(category => category.questions.map(q => q.q))));
    assert.strictEqual(questions.length, 40);
    assert.strictEqual(new Set(questions).size, 40);
    await page.evaluate(() => {
      for (let player = 0; player < 4; player++) {
        switchPlayer(player);
        const buttons = [...document.querySelectorAll('#board-' + player + ' .point-btn')];
        for (const button of buttons) { button.click(); revealAnswer(); judgeActivePlayer(true); }
      }
    });
    assert((await certificate()).toLowerCase().includes('certificate of participation'));
    console.log('PASS: unique Jeopardy allocations and 40-tile participation completion.');

    await load('millionaire1.html');
    await page.evaluate(() => { currentLevel = questions.length - 1; loadQuestion(); });
    await page.locator('.answer-btn[data-correct="true"]').click();
    await certificate();
    console.log('PASS: Millionaire final question and scored completion.');

    await load('snake1.html', 375);
    await page.evaluate(() => {
      startGame('game1');
      correctAnswers = totalQuestionsForGame;
      endGame(true);
    });
    await certificate();
    console.log('PASS: Snake completion and certificate context.');

    const indexContext = { window: {} }; vm.createContext(indexContext);
    for (const script of ['universal-search-index.js', 'universal-search.js']) vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), indexContext);
    const search = indexContext.window.MayUniversalSearch;
    const results = search.search('grade 10 algebraic expressions', search.buildCatalogue(), 'Games');
    assert.strictEqual(results.filter(entry => decodeURIComponent(entry.href).startsWith(topicPath)).length, 7);
    console.log('PASS: all seven new pages are searchable under Games.');
    assert.deepStrictEqual(failures, [], 'Uncaught page errors');
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
