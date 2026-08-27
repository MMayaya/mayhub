const fs = require('fs');
const path = require('path');
const vm = require('vm');

const assessmentRoot = 'D:\\Github\\Github Uploads\\MayHub\\Social-Sciences\\Term-3\\Grade-8\\Games\\History Assessment Games';

for (const entry of fs.readdirSync(assessmentRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(assessmentRoot, entry.name, 'jeopardy1.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html
    .replace('.name-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }', '.name-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; }')
    .replace('.jeopardy-board { width: 100%; max-width: 1000px; display: grid; grid-template-columns: repeat(4, 1fr);', '.jeopardy-board { width: 100%; max-width: 1000px; display: grid; grid-template-columns: repeat(2, 1fr);');
  fs.writeFileSync(file, html, 'utf8');
}

const spinFile = path.join(assessmentRoot, 'The Berlin Conference', 'spin1.html');
let spinHtml = fs.readFileSync(spinFile, 'utf8');

const celebrationCss = `
        .score-tracker { display: none; width: fit-content; margin: 0 auto 1rem; padding: 0.55rem 1.1rem; border-radius: 999px; background: #e8f2ff; color: #003a75; border: 2px solid #80b3ff; font-weight: 800; }
        .celebration-page { display: none; position: relative; overflow: hidden; margin-top: 2rem; padding: 2.4rem 1.4rem; border-radius: 20px; color: #fff; background: linear-gradient(145deg, #002b5e, #0059b3 58%, #3385ff); box-shadow: 0 18px 45px rgba(0,43,94,0.28); animation: celebrationIn 0.65s ease both; }
        .celebration-content { position: relative; z-index: 2; max-width: 620px; margin: 0 auto; }
        .celebration-trophy { font-size: 4.2rem; line-height: 1; margin-bottom: 0.7rem; filter: drop-shadow(0 6px 10px rgba(0,0,0,.25)); animation: trophyBounce 1.1s ease both; }
        .celebration-page h2 { font-size: clamp(2rem, 6vw, 3rem); margin-bottom: 0.35rem; }
        .learner-name { font-size: 1.2rem; color: #dbeaff; margin-bottom: 1.1rem; font-weight: 700; }
        .score-ring { width: 150px; height: 150px; margin: 1rem auto; border-radius: 50%; display: grid; place-items: center; background: #fff; color: #003a75; border: 10px solid #ffc107; box-shadow: 0 8px 25px rgba(0,0,0,.25); }
        .score-ring strong { display: block; font-size: 2.8rem; line-height: 1; }
        .score-ring span { display: block; font-size: 0.9rem; margin-top: 0.3rem; font-weight: 800; text-transform: uppercase; }
        .celebration-message { font-size: 1.15rem; margin: 0.8rem auto 1.35rem; max-width: 520px; }
        .celebration-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem; }
        .celebration-btn { border: none; border-radius: 10px; padding: 0.9rem 1.15rem; font-size: 1rem; font-weight: 800; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .celebration-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.22); }
        .whatsapp-btn { background: #25d366; color: #072d16; }
        .replay-btn { background: #ffc107; color: #2f2500; }
        .category-btn { background: #fff; color: #003a75; }
        .share-note { margin-top: 0.9rem; color: #dbeaff; font-size: 0.83rem; }
        .confetti-piece { position: absolute; width: 11px; height: 22px; top: -30px; opacity: .9; animation: confettiFall 4.5s linear infinite; }
        .confetti-piece:nth-child(1) { left: 7%; background:#ffc107; animation-delay:.1s; transform:rotate(14deg); }
        .confetti-piece:nth-child(2) { left: 16%; background:#25d366; animation-delay:1.2s; }
        .confetti-piece:nth-child(3) { left: 27%; background:#ff5f57; animation-delay:.5s; }
        .confetti-piece:nth-child(4) { left: 39%; background:#fff; animation-delay:1.8s; }
        .confetti-piece:nth-child(5) { left: 51%; background:#ffc107; animation-delay:.9s; }
        .confetti-piece:nth-child(6) { left: 62%; background:#25d366; animation-delay:2.1s; }
        .confetti-piece:nth-child(7) { left: 73%; background:#ff5f57; animation-delay:.3s; }
        .confetti-piece:nth-child(8) { left: 84%; background:#fff; animation-delay:1.5s; }
        .confetti-piece:nth-child(9) { left: 93%; background:#ffc107; animation-delay:2.5s; }
        @keyframes celebrationIn { from { opacity:0; transform:translateY(22px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes trophyBounce { 0% { transform:scale(.5) rotate(-10deg); } 65% { transform:scale(1.12) rotate(5deg); } 100% { transform:scale(1); } }
        @keyframes confettiFall { from { transform:translateY(-40px) rotate(0); } to { transform:translateY(650px) rotate(720deg); } }
`;
spinHtml = spinHtml.replace('        @keyframes fadeIn', celebrationCss + '        @keyframes fadeIn');

spinHtml = spinHtml.replace(
  '            <button class="spin-btn" id="spinBtn" onclick="spinWheel()">SPIN THE WHEEL</button>',
  '            <div class="score-tracker" id="scoreTracker">Score: 0 / 0</div>\n            <button class="spin-btn" id="spinBtn" onclick="spinWheel()">SPIN THE WHEEL</button>'
);

const celebrationMarkup = `
        <section class="celebration-page" id="celebrationPage" aria-live="polite">
            <span class="confetti-piece"></span><span class="confetti-piece"></span><span class="confetti-piece"></span>
            <span class="confetti-piece"></span><span class="confetti-piece"></span><span class="confetti-piece"></span>
            <span class="confetti-piece"></span><span class="confetti-piece"></span><span class="confetti-piece"></span>
            <div class="celebration-content">
                <div class="celebration-trophy" aria-hidden="true">🏆</div>
                <h2>Challenge Complete!</h2>
                <p class="learner-name" id="celebrationLearner">Name and Surname: Signed-in learner</p>
                <div class="score-ring"><div><strong id="celebrationScore">0/10</strong><span>Correct</span></div></div>
                <p class="celebration-message" id="celebrationMessage"></p>
                <div class="celebration-actions">
                    <button class="celebration-btn whatsapp-btn" onclick="shareWhatsAppStatus()">Share to WhatsApp Status</button>
                    <button class="celebration-btn replay-btn" onclick="playCategoryAgain()">Play Again</button>
                    <button class="celebration-btn category-btn" onclick="chooseAnotherCategory()">Choose Another Category</button>
                </div>
                <p class="share-note">WhatsApp will open its share screen. Choose <strong>My status</strong> to post your result.</p>
            </div>
        </section>
`;
spinHtml = spinHtml.replace('    </main>', celebrationMarkup + '    </main>');

const logicStart = spinHtml.indexOf('const totalQuestions = 10;');
const logicEnd = spinHtml.indexOf('    </script>', logicStart);
if (logicStart < 0 || logicEnd < 0) throw new Error('Berlin Spin logic boundary not found.');

const pilotLogic = `const totalQuestions = 10;
        const sliceAngle = 360 / totalQuestions;
        const interactiveCategories = new Set(['terms', 'multipleChoice', 'trueFalse']);
        let currentCategoryKey = null;
        let currentCategoryLabel = '';
        let currentRotation = 0;
        let currentQuestionData = null;
        let targetQuestionIndex = null;
        let currentQuestionAnswered = true;
        let lastCompletedScore = null;

        const freshQuestionIndexes = () => Array.from({ length: totalQuestions }, (_, index) => index);
        const availableQuestions = {
            definitions: freshQuestionIndexes(),
            terms: freshQuestionIndexes(),
            multipleChoice: freshQuestionIndexes(),
            trueFalse: freshQuestionIndexes()
        };
        const categoryStats = {
            terms: { correct: 0, answered: 0 },
            multipleChoice: { correct: 0, answered: 0 },
            trueFalse: { correct: 0, answered: 0 }
        };
        const sliceColors = ['#0055ff', '#0088ff', '#00bfff', '#0044cc'];

        function shuffleItems(items) {
            const shuffled = [...items];
            for (let index = shuffled.length - 1; index > 0; index--) {
                const swapIndex = Math.floor(Math.random() * (index + 1));
                [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
            }
            return shuffled;
        }

        function buildWheel() {
            const wheelBg = document.getElementById('wheelBg');
            const wheelLabels = document.getElementById('wheelLabels');
            const gradientParts = [];
            wheelLabels.innerHTML = '';
            for (let index = 0; index < totalQuestions; index++) {
                const startAngle = index * sliceAngle;
                const endAngle = (index + 1) * sliceAngle;
                gradientParts.push(sliceColors[index % sliceColors.length] + ' ' + startAngle + 'deg ' + endAngle + 'deg');
                const label = document.createElement('div');
                label.className = 'label';
                label.style.transform = 'rotate(' + (startAngle + (sliceAngle / 2) - 90) + 'deg) translate(145px, -50%)';
                label.innerText = index + 1;
                wheelLabels.appendChild(label);
            }
            wheelBg.style.background = 'conic-gradient(' + gradientParts.join(', ') + ')';
        }

        function resetCategory(categoryKey) {
            availableQuestions[categoryKey] = freshQuestionIndexes();
            if (categoryStats[categoryKey]) categoryStats[categoryKey] = { correct: 0, answered: 0 };
            currentQuestionData = null;
            currentQuestionAnswered = true;
            lastCompletedScore = null;
        }

        function updateScoreTracker() {
            const tracker = document.getElementById('scoreTracker');
            if (!interactiveCategories.has(currentCategoryKey)) {
                tracker.style.display = 'none';
                return;
            }
            const stats = categoryStats[currentCategoryKey];
            tracker.style.display = 'block';
            tracker.innerText = 'Score: ' + stats.correct + ' / ' + stats.answered;
        }

        function selectCategory(categoryKey, btnElement) {
            currentCategoryKey = categoryKey;
            currentCategoryLabel = btnElement.innerText;
            if (availableQuestions[categoryKey].length === 0) resetCategory(categoryKey);
            document.querySelectorAll('.cat-btn').forEach(button => button.classList.remove('active'));
            btnElement.classList.add('active');
            document.querySelector('.category-selection').style.display = 'block';
            document.getElementById('celebrationPage').style.display = 'none';
            document.getElementById('wheelArea').style.display = 'block';
            document.getElementById('activeCategoryTitle').innerText = 'Category: ' + currentCategoryLabel;
            document.getElementById('questionCard').style.display = 'none';
            document.getElementById('remainingCount').innerText = availableQuestions[categoryKey].length + ' questions remaining';
            document.getElementById('spinBtn').disabled = false;
            document.getElementById('spinBtn').innerText = 'SPIN THE WHEEL';
            currentQuestionAnswered = true;
            currentRotation = 0;
            document.getElementById('wheel').style.transform = 'rotate(0deg)';
            updateScoreTracker();
        }

        function spinWheel() {
            if (!currentCategoryKey || (!currentQuestionAnswered && interactiveCategories.has(currentCategoryKey))) return;
            const spinBtn = document.getElementById('spinBtn');
            const wheel = document.getElementById('wheel');
            const questionCard = document.getElementById('questionCard');
            const available = availableQuestions[currentCategoryKey];
            if (available.length === 0) {
                if (interactiveCategories.has(currentCategoryKey)) showCelebration();
                else resetCategory(currentCategoryKey);
                return;
            }

            spinBtn.disabled = true;
            spinBtn.innerText = 'SPINNING...';
            MayHubSounds.startWheel();
            questionCard.style.display = 'none';

            const randomArrayIndex = Math.floor(Math.random() * available.length);
            targetQuestionIndex = available[randomArrayIndex];
            available.splice(randomArrayIndex, 1);
            document.getElementById('remainingCount').innerText = available.length + ' questions remaining';
            const sliceCenterAngle = (targetQuestionIndex * sliceAngle) + (sliceAngle / 2);
            const targetDegree = 360 - sliceCenterAngle;
            const currentBase = Math.ceil(currentRotation / 360) * 360;
            currentRotation = currentBase + 1800 + targetDegree;
            wheel.style.transform = 'rotate(' + currentRotation + 'deg)';

            setTimeout(() => {
                MayHubSounds.stopWheel();
                currentQuestionData = gameData[currentCategoryKey][targetQuestionIndex];
                currentQuestionAnswered = !interactiveCategories.has(currentCategoryKey);
                displayQuestion(totalQuestions - available.length, currentQuestionData);
                if (currentQuestionAnswered) {
                    spinBtn.disabled = false;
                    spinBtn.innerText = available.length ? 'SPIN AGAIN' : 'RESTART CATEGORY';
                } else {
                    spinBtn.disabled = true;
                    spinBtn.innerText = 'CHOOSE AN ANSWER';
                }
            }, 4000);
        }

        function buildTermChoices(correctAnswer) {
            const remainingAnswers = availableQuestions.terms
                .map(index => gameData.terms[index].a)
                .filter(answer => answer !== correctAnswer);
            const optionCount = Math.max(1, Math.min(5, availableQuestions.terms.length));
            return shuffleItems([correctAnswer, ...shuffleItems(remainingAnswers).slice(0, Math.max(0, optionCount - 1))]);
        }

        function displayQuestion(attemptNumber, data) {
            document.getElementById('qNumberTag').innerText = interactiveCategories.has(currentCategoryKey)
                ? 'Attempt ' + attemptNumber + ' of ' + totalQuestions
                : 'Card ' + attemptNumber + ' of ' + totalQuestions;
            document.getElementById('questionText').innerText = data.q;
            const optionsContainer = document.getElementById('mcOptions');
            const revealBtn = document.getElementById('revealBtn');
            const answerText = document.getElementById('answerText');
            optionsContainer.innerHTML = '';
            answerText.style.display = 'none';

            if (interactiveCategories.has(currentCategoryKey)) {
                revealBtn.style.display = 'none';
                optionsContainer.style.display = 'flex';
                const options = currentCategoryKey === 'terms' ? buildTermChoices(data.a) : data.options;
                options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.innerText = option;
                    button.onclick = () => checkInteractiveAnswer(button, option);
                    optionsContainer.appendChild(button);
                });
            } else {
                optionsContainer.style.display = 'none';
                revealBtn.style.display = 'inline-block';
                answerText.innerHTML = '<strong>Answer:</strong> ' + data.a;
            }
            document.getElementById('questionCard').style.display = 'block';
        }

        function checkInteractiveAnswer(clickedButton, selectedText) {
            if (currentQuestionAnswered) return;
            currentQuestionAnswered = true;
            document.querySelectorAll('.option-btn').forEach(button => button.disabled = true);
            const isCorrect = selectedText === currentQuestionData.a;
            const stats = categoryStats[currentCategoryKey];
            stats.answered++;
            if (isCorrect) stats.correct++;
            updateScoreTracker();

            const answerText = document.getElementById('answerText');
            if (isCorrect) {
                MayHubSounds.playCorrect();
                clickedButton.classList.add('correct');
                answerText.innerHTML = '<div style="color:#167333;font-weight:800;">Correct!</div> ' + (currentQuestionData.exp || '');
            } else {
                MayHubSounds.playWrong();
                clickedButton.classList.add('incorrect');
                const correctButton = [...document.querySelectorAll('.option-btn')].find(button => button.innerText === currentQuestionData.a);
                if (correctButton) correctButton.classList.add('correct');
                answerText.innerHTML = '<div style="color:#b42318;font-weight:800;">Not quite.</div> Correct answer: ' + currentQuestionData.a + '. ' + (currentQuestionData.exp || '');
            }
            answerText.style.display = 'block';

            const spinBtn = document.getElementById('spinBtn');
            if (availableQuestions[currentCategoryKey].length === 0) {
                spinBtn.disabled = true;
                spinBtn.innerText = 'CHALLENGE COMPLETE';
                setTimeout(showCelebration, 1100);
            } else {
                spinBtn.disabled = false;
                spinBtn.innerText = 'SPIN AGAIN';
            }
        }

        function revealAnswer() {
            document.getElementById('revealBtn').style.display = 'none';
            document.getElementById('answerText').style.display = 'block';
        }

        function getSignedInLearnerName() {
            for (const storage of [window.localStorage, window.sessionStorage]) {
                try {
                    const saved = JSON.parse(storage.getItem('mayhubActivityAccess') || 'null');
                    const fullName = saved?.profile?.fullName?.trim();
                    if (fullName) return fullName;
                    if (saved?.email) return saved.email.split('@')[0];
                } catch {}
            }
            return 'Signed-in learner';
        }

        function showCelebration() {
            const stats = categoryStats[currentCategoryKey];
            if (!stats || stats.answered !== totalQuestions) return;
            const learnerName = getSignedInLearnerName();
            lastCompletedScore = { name: learnerName, category: currentCategoryLabel, correct: stats.correct, total: totalQuestions };
            document.querySelector('.category-selection').style.display = 'none';
            document.getElementById('wheelArea').style.display = 'none';
            document.getElementById('celebrationLearner').innerText = 'Name and Surname: ' + learnerName;
            document.getElementById('celebrationScore').innerText = stats.correct + '/' + totalQuestions;
            const message = stats.correct === 10 ? 'Outstanding! You achieved a perfect score.'
                : stats.correct >= 8 ? 'Excellent work! You have a strong understanding of this topic.'
                : stats.correct >= 6 ? 'Good work! Review the missed answers and try for an even higher score.'
                : 'Keep practising—you can replay the category and improve your result.';
            document.getElementById('celebrationMessage').innerText = message;
            document.getElementById('celebrationPage').style.display = 'block';
            document.getElementById('celebrationPage').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function shareWhatsAppStatus() {
            if (!lastCompletedScore) return;
            const result = lastCompletedScore;
            const message = ['🏆 May Learning Hub Result', result.name, 'Grade 8 Social Sciences History - The Berlin Conference', result.category + ': ' + result.correct + '/' + result.total, window.location.href].join('\\n');
            window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
        }

        function playCategoryAgain() {
            resetCategory(currentCategoryKey);
            document.getElementById('celebrationPage').style.display = 'none';
            document.querySelector('.category-selection').style.display = 'block';
            document.getElementById('wheelArea').style.display = 'block';
            document.getElementById('questionCard').style.display = 'none';
            document.getElementById('remainingCount').innerText = totalQuestions + ' questions remaining';
            document.getElementById('spinBtn').disabled = false;
            document.getElementById('spinBtn').innerText = 'SPIN THE WHEEL';
            updateScoreTracker();
        }

        function chooseAnotherCategory() {
            document.getElementById('celebrationPage').style.display = 'none';
            document.querySelector('.category-selection').style.display = 'block';
            document.getElementById('wheelArea').style.display = 'none';
            document.querySelectorAll('.cat-btn').forEach(button => button.classList.remove('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        buildWheel();
`;

spinHtml = spinHtml.slice(0, logicStart) + pilotLogic + spinHtml.slice(logicEnd);
fs.writeFileSync(spinFile, spinHtml, 'utf8');

for (const [index, script] of [...spinHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].entries()) {
  if (script[1].trim()) new vm.Script(script[1], { filename: `BerlinConference/spin1.html#script${index + 1}` });
}

console.log('Fixed all Jeopardy grids and added the Berlin Conference Spin scoring pilot.');
