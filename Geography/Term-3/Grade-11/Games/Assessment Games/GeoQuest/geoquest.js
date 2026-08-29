(function () {
    'use strict';

    const packs = window.GeoQuestStage1Packs || {};
    const stage2Data = window.GeoQuestStage2Data || { terms: [], definitions: [] };
    const stage3Data = window.GeoQuestStage3Data || { questions: [] };
    const stage4Data = window.GeoQuestStage4Data || { questions: [] };
    const stage5Data = window.GeoQuestStage5Data || { questions: [] };
    const totalQuestions = 8;
    const stage2Total = 7;
    const stage3Total = 6;
    const stage3TotalMarks = 15;
    const stage4Total = 6;
    const stage4TotalMarks = 15;
    const stage5Total = 5;
    const stage5TotalMarks = 15;
    const expeditionTotalMarks = 60;
    const storageVersion = 1;
    let zoom = 1;
    let previousBodyOverflow = '';

    const elements = {
        intro: document.getElementById('introScreen'),
        game: document.getElementById('gameScreen'),
        result: document.getElementById('resultScreen'),
        stage2: document.getElementById('stage2Screen'),
        stage2Result: document.getElementById('stage2ResultScreen'),
        stage3: document.getElementById('stage3Screen'),
        stage3Result: document.getElementById('stage3ResultScreen'),
        stage4: document.getElementById('stage4Screen'),
        stage4Result: document.getElementById('stage4ResultScreen'),
        stage5: document.getElementById('stage5Screen'),
        stage5Result: document.getElementById('stage5ResultScreen'),
        stage1Node: document.getElementById('stage1Node'),
        stage2Node: document.getElementById('stage2Node'),
        stage3Node: document.getElementById('stage3Node'),
        stage4Node: document.getElementById('stage4Node'),
        stage5Node: document.getElementById('stage5Node'),
        stage1Status: document.getElementById('stage1Status'),
        stage2Status: document.getElementById('stage2Status'),
        stage3Status: document.getElementById('stage3Status'),
        stage4Status: document.getElementById('stage4Status'),
        stage5Status: document.getElementById('stage5Status'),
        headerSource: document.getElementById('headerSourceButton'),
        begin: document.getElementById('beginButton'),
        resumeNote: document.getElementById('resumeNote'),
        score: document.getElementById('scoreValue'),
        progress: document.getElementById('progressFill'),
        counter: document.getElementById('signalCounter'),
        prompt: document.getElementById('questionPrompt'),
        sourceHint: document.getElementById('sourceHint'),
        answers: document.getElementById('answerGrid'),
        feedback: document.getElementById('feedbackPanel'),
        feedbackTitle: document.getElementById('feedbackTitle'),
        feedbackText: document.getElementById('feedbackText'),
        next: document.getElementById('nextButton'),
        resultScore: document.getElementById('resultScore'),
        resultTitle: document.getElementById('resultTitle'),
        resultMessage: document.getElementById('resultMessage'),
        resultCorrect: document.getElementById('resultCorrect'),
        resultPercent: document.getElementById('resultPercent'),
        continueStage2: document.getElementById('continueStage2Button'),
        anotherRoute: document.getElementById('anotherRouteButton'),
        stage2Score: document.getElementById('stage2ScoreValue'),
        stage2Progress: document.getElementById('stage2ProgressFill'),
        definitionCounter: document.getElementById('definitionCounter'),
        definitionPrompt: document.getElementById('definitionPrompt'),
        previousTerm: document.getElementById('previousTermButton'),
        termCard: document.getElementById('termCardButton'),
        candidateTerm: document.getElementById('candidateTerm'),
        nextTerm: document.getElementById('nextTermButton'),
        carouselPosition: document.getElementById('carouselPosition'),
        stage2Feedback: document.getElementById('stage2FeedbackPanel'),
        stage2FeedbackTitle: document.getElementById('stage2FeedbackTitle'),
        stage2FeedbackText: document.getElementById('stage2FeedbackText'),
        stage2Next: document.getElementById('stage2NextButton'),
        stage2ResultScore: document.getElementById('stage2ResultScore'),
        stage2ResultTitle: document.getElementById('stage2ResultTitle'),
        stage2ResultMessage: document.getElementById('stage2ResultMessage'),
        stage2ResultCorrect: document.getElementById('stage2ResultCorrect'),
        stage2ResultPercent: document.getElementById('stage2ResultPercent'),
        overallScore: document.getElementById('overallScore'),
        replayStage2: document.getElementById('replayStage2Button'),
        continueStage3: document.getElementById('continueStage3Button'),
        stage3Score: document.getElementById('stage3ScoreValue'),
        stage3Progress: document.getElementById('stage3ProgressFill'),
        growthCounter: document.getElementById('growthCounter'),
        growthMarks: document.getElementById('growthMarks'),
        growthPrompt: document.getElementById('growthPrompt'),
        growthInstruction: document.getElementById('growthInstruction'),
        stage3Answers: document.getElementById('stage3AnswerGrid'),
        confirmStage3: document.getElementById('confirmStage3Button'),
        stage3Feedback: document.getElementById('stage3FeedbackPanel'),
        stage3FeedbackTitle: document.getElementById('stage3FeedbackTitle'),
        stage3FeedbackText: document.getElementById('stage3FeedbackText'),
        stage3Next: document.getElementById('stage3NextButton'),
        stage3ResultScore: document.getElementById('stage3ResultScore'),
        stage3ResultTitle: document.getElementById('stage3ResultTitle'),
        stage3ResultMessage: document.getElementById('stage3ResultMessage'),
        stage3ResultMarks: document.getElementById('stage3ResultMarks'),
        stage3ResultPercent: document.getElementById('stage3ResultPercent'),
        stage3OverallScore: document.getElementById('stage3OverallScore'),
        replayStage3: document.getElementById('replayStage3Button'),
        continueStage4: document.getElementById('continueStage4Button'),
        stage4Score: document.getElementById('stage4ScoreValue'),
        stage4Progress: document.getElementById('stage4ProgressFill'),
        gateCounter: document.getElementById('gateCounter'),
        gateMarks: document.getElementById('gateMarks'),
        gatePrompt: document.getElementById('gatePrompt'),
        gateInstruction: document.getElementById('gateInstruction'),
        stage4Answers: document.getElementById('stage4AnswerGrid'),
        confirmStage4: document.getElementById('confirmStage4Button'),
        stage4Feedback: document.getElementById('stage4FeedbackPanel'),
        stage4FeedbackTitle: document.getElementById('stage4FeedbackTitle'),
        stage4FeedbackText: document.getElementById('stage4FeedbackText'),
        stage4Next: document.getElementById('stage4NextButton'),
        stage4ResultScore: document.getElementById('stage4ResultScore'),
        stage4ResultTitle: document.getElementById('stage4ResultTitle'),
        stage4ResultMessage: document.getElementById('stage4ResultMessage'),
        stage4ResultMarks: document.getElementById('stage4ResultMarks'),
        stage4ResultPercent: document.getElementById('stage4ResultPercent'),
        stage4OverallScore: document.getElementById('stage4OverallScore'),
        replayStage4: document.getElementById('replayStage4Button'),
        continueStage5: document.getElementById('continueStage5Button'),
        stage5Score: document.getElementById('stage5ScoreValue'),
        stage5Progress: document.getElementById('stage5ProgressFill'),
        aidCounter: document.getElementById('aidCounter'),
        aidMarks: document.getElementById('aidMarks'),
        aidPrompt: document.getElementById('aidPrompt'),
        aidInstruction: document.getElementById('aidInstruction'),
        stage5Answers: document.getElementById('stage5AnswerGrid'),
        confirmStage5: document.getElementById('confirmStage5Button'),
        stage5Feedback: document.getElementById('stage5FeedbackPanel'),
        stage5FeedbackTitle: document.getElementById('stage5FeedbackTitle'),
        stage5FeedbackText: document.getElementById('stage5FeedbackText'),
        stage5Next: document.getElementById('stage5NextButton'),
        stage5ResultScore: document.getElementById('stage5ResultScore'),
        stage5ResultTitle: document.getElementById('stage5ResultTitle'),
        stage5ResultMessage: document.getElementById('stage5ResultMessage'),
        stage5ResultMarks: document.getElementById('stage5ResultMarks'),
        stage5ResultPercent: document.getElementById('stage5ResultPercent'),
        finalExpeditionScore: document.getElementById('finalExpeditionScore'),
        replayStage5: document.getElementById('replayStage5Button'),
        viewCertificate: document.getElementById('viewCertificateButton'),
        overlay: document.getElementById('sourceOverlay'),
        sourceImage: document.getElementById('sourceImage'),
        sourcePackLabel: document.getElementById('sourcePackLabel'),
        sourceTitle: document.getElementById('sourceTitle'),
        sourceViewport: document.getElementById('sourceViewport'),
        zoomValue: document.getElementById('zoomValue')
    };

    function learnerId() {
        for (const storage of [window.localStorage, window.sessionStorage]) {
            try {
                const saved = JSON.parse(storage.getItem('mayhubActivityAccess') || 'null');
                const identity = saved?.uid || saved?.email;
                if (identity) return String(identity);
            } catch {}
        }
        return 'guest';
    }

    function storageKey() {
        return 'mayhubGeoQuest:v' + storageVersion + ':grade-11:geography:term-3:stage-1:' + encodeURIComponent(learnerId());
    }

    function stage2StorageKey() {
        return 'mayhubGeoQuest:v' + storageVersion + ':grade-11:geography:term-3:stage-2:' + encodeURIComponent(learnerId());
    }

    function stage3StorageKey() {
        return 'mayhubGeoQuest:v' + storageVersion + ':grade-11:geography:term-3:stage-3:' + encodeURIComponent(learnerId());
    }

    function stage4StorageKey() {
        return 'mayhubGeoQuest:v' + storageVersion + ':grade-11:geography:term-3:stage-4:' + encodeURIComponent(learnerId());
    }

    function stage5StorageKey() {
        return 'mayhubGeoQuest:v' + storageVersion + ':grade-11:geography:term-3:stage-5:' + encodeURIComponent(learnerId());
    }

    function randomIndex(maximum) {
        if (window.crypto?.getRandomValues) {
            const values = new Uint32Array(1);
            window.crypto.getRandomValues(values);
            return values[0] % maximum;
        }
        return Math.floor(Math.random() * maximum);
    }

    function shuffle(values) {
        const copy = [...values];
        for (let index = copy.length - 1; index > 0; index--) {
            const swapIndex = randomIndex(index + 1);
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    }

    function requestedPack() {
        const requested = new URLSearchParams(window.location.search).get('sourcePack')?.toUpperCase();
        return Object.hasOwn(packs, requested) ? requested : '';
    }

    function createState(preferredPack) {
        const packIds = Object.keys(packs);
        const packId = preferredPack && Object.hasOwn(packs, preferredPack)
            ? preferredPack
            : packIds[randomIndex(packIds.length)];
        const questions = packs[packId].questions;
        return {
            version: storageVersion,
            packId,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(questions.map(question => question.id)),
            optionOrder: Object.fromEntries(questions.map(question => [question.id, shuffle(question.options)])),
            answers: {}
        };
    }

    function validState(candidate) {
        if (!candidate || candidate.version !== storageVersion || !Object.hasOwn(packs, candidate.packId)) return false;
        const ids = new Set(packs[candidate.packId].questions.map(question => question.id));
        return Array.isArray(candidate.order)
            && candidate.order.length === totalQuestions
            && candidate.order.every(id => ids.has(id))
            && candidate.optionOrder
            && Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= totalQuestions
            && Number.isInteger(candidate.score)
            && candidate.score >= 0
            && candidate.score <= totalQuestions;
    }

    function loadState() {
        const forced = requestedPack();
        try {
            const saved = JSON.parse(window.localStorage.getItem(storageKey()) || 'null');
            if (validState(saved) && (!forced || saved.packId === forced)) return saved;
        } catch {}
        return createState(forced);
    }

    let state = loadState();

    function createStage2State() {
        const definitions = stage2Data.definitions || [];
        const terms = stage2Data.terms || [];
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(definitions.map(definition => definition.id)),
            termOrders: Object.fromEntries(definitions.map(definition => [definition.id, shuffle(terms)])),
            positions: Object.fromEntries(definitions.map(definition => [definition.id, 0])),
            answers: {}
        };
    }

    function validStage2State(candidate) {
        if (!candidate || candidate.version !== storageVersion) return false;
        const definitionIds = new Set(stage2Data.definitions.map(definition => definition.id));
        const terms = new Set(stage2Data.terms);
        const validOrder = Array.isArray(candidate.order)
            && candidate.order.length === stage2Total
            && new Set(candidate.order).size === stage2Total
            && candidate.order.every(id => definitionIds.has(id));
        const validTermOrders = candidate.termOrders && candidate.order?.every(id => {
            const order = candidate.termOrders[id];
            return Array.isArray(order)
                && order.length === stage2Data.terms.length
                && new Set(order).size === stage2Data.terms.length
                && order.every(term => terms.has(term));
        });
        const validPositions = candidate.positions && candidate.order?.every(id => Number.isInteger(candidate.positions[id])
            && candidate.positions[id] >= 0
            && candidate.positions[id] < stage2Data.terms.length);
        const validAnswers = candidate.answers && Object.entries(candidate.answers).every(([id, answer]) => definitionIds.has(id) && terms.has(answer));
        return validOrder
            && validTermOrders
            && validPositions
            && validAnswers
            && Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= stage2Total
            && Number.isInteger(candidate.score)
            && candidate.score >= 0
            && candidate.score <= stage2Total;
    }

    function loadStage2State() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(stage2StorageKey()) || 'null');
            if (validStage2State(saved)) return saved;
        } catch {}
        return createStage2State();
    }

    let stage2State = loadStage2State();

    function createStage3State() {
        const questions = stage3Data.questions || [];
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: questions.map(question => question.id),
            optionOrders: Object.fromEntries(questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage3State(candidate) {
        if (!candidate || candidate.version !== storageVersion) return false;
        const questions = stage3Data.questions || [];
        const byId = new Map(questions.map(question => [question.id, question]));
        const validOrder = Array.isArray(candidate.order)
            && candidate.order.length === stage3Total
            && candidate.order.every((id, index) => id === questions[index]?.id);
        const validOptionOrders = candidate.optionOrders && candidate.order?.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return question
                && Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        });
        const validAnswers = candidate.answers && Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            const limit = question?.mode === 'multiple' ? question.selectLimit : 1;
            return question
                && Array.isArray(answers)
                && answers.length <= limit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        });
        const validAwarded = candidate.awarded && Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        });
        const awardedTotal = candidate.awarded ? Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0) : -1;
        return validOrder
            && validOptionOrders
            && validAnswers
            && validAwarded
            && candidate.locked
            && Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= stage3Total
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= stage3TotalMarks;
    }

    function loadStage3State() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(stage3StorageKey()) || 'null');
            if (validStage3State(saved)) return saved;
        } catch {}
        return createStage3State();
    }

    let stage3State = loadStage3State();

    function createStage4State() {
        const questions = stage4Data.questions || [];
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: questions.map(question => question.id),
            optionOrders: Object.fromEntries(questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage4State(candidate) {
        if (!candidate || candidate.version !== storageVersion) return false;
        const questions = stage4Data.questions || [];
        const byId = new Map(questions.map(question => [question.id, question]));
        const validOrder = Array.isArray(candidate.order)
            && candidate.order.length === stage4Total
            && candidate.order.every((id, index) => id === questions[index]?.id);
        const validOptionOrders = candidate.optionOrders && candidate.order?.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return question
                && Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        });
        const validAnswers = candidate.answers && Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            const limit = question?.mode === 'multiple' ? question.selectLimit : 1;
            return question
                && Array.isArray(answers)
                && answers.length <= limit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        });
        const validAwarded = candidate.awarded && Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        });
        const awardedTotal = candidate.awarded ? Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0) : -1;
        return validOrder
            && validOptionOrders
            && validAnswers
            && validAwarded
            && candidate.locked
            && Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= stage4Total
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= stage4TotalMarks;
    }

    function loadStage4State() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(stage4StorageKey()) || 'null');
            if (validStage4State(saved)) return saved;
        } catch {}
        return createStage4State();
    }

    let stage4State = loadStage4State();

    function createStage5State() {
        const questions = stage5Data.questions || [];
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: questions.map(question => question.id),
            optionOrders: Object.fromEntries(questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage5State(candidate) {
        if (!candidate || candidate.version !== storageVersion) return false;
        const questions = stage5Data.questions || [];
        const byId = new Map(questions.map(question => [question.id, question]));
        const validOrder = Array.isArray(candidate.order)
            && candidate.order.length === stage5Total
            && candidate.order.every((id, index) => id === questions[index]?.id);
        const validOptionOrders = candidate.optionOrders && candidate.order?.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return question
                && Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        });
        const validAnswers = candidate.answers && Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            const limit = question?.mode === 'multiple' ? question.selectLimit : 1;
            return question
                && Array.isArray(answers)
                && answers.length <= limit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        });
        const validAwarded = candidate.awarded && Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        });
        const awardedTotal = candidate.awarded ? Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0) : -1;
        return validOrder
            && validOptionOrders
            && validAnswers
            && validAwarded
            && candidate.locked
            && Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= stage5Total
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= stage5TotalMarks;
    }

    function loadStage5State() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(stage5StorageKey()) || 'null');
            if (validStage5State(saved)) return saved;
        } catch {}
        return createStage5State();
    }

    let stage5State = loadStage5State();

    function saveState() {
        try { window.localStorage.setItem(storageKey(), JSON.stringify(state)); } catch {}
    }

    function saveStage2State() {
        try { window.localStorage.setItem(stage2StorageKey(), JSON.stringify(stage2State)); } catch {}
    }

    function saveStage3State() {
        try { window.localStorage.setItem(stage3StorageKey(), JSON.stringify(stage3State)); } catch {}
    }

    function saveStage4State() {
        try { window.localStorage.setItem(stage4StorageKey(), JSON.stringify(stage4State)); } catch {}
    }

    function saveStage5State() {
        try { window.localStorage.setItem(stage5StorageKey(), JSON.stringify(stage5State)); } catch {}
    }

    function currentPack() {
        return packs[state.packId];
    }

    function questionById(id) {
        return currentPack().questions.find(question => question.id === id);
    }

    function currentQuestion() {
        return questionById(state.order[state.current]);
    }

    function stage2DefinitionById(id) {
        return stage2Data.definitions.find(definition => definition.id === id);
    }

    function currentStage2Definition() {
        return stage2DefinitionById(stage2State.order[stage2State.current]);
    }

    function stage3QuestionById(id) {
        return stage3Data.questions.find(question => question.id === id);
    }

    function currentStage3Question() {
        return stage3QuestionById(stage3State.order[stage3State.current]);
    }

    function stage4QuestionById(id) {
        return stage4Data.questions.find(question => question.id === id);
    }

    function currentStage4Question() {
        return stage4QuestionById(stage4State.order[stage4State.current]);
    }

    function stage5QuestionById(id) {
        return stage5Data.questions.find(question => question.id === id);
    }

    function currentStage5Question() {
        return stage5QuestionById(stage5State.order[stage5State.current]);
    }

    function updateStageMap(name) {
        const stage2IsCurrent = name === 'stage2' || name === 'stage2Result';
        elements.stage1Node.className = 'stage-node ' + (state.completed ? 'completed' : 'active');
        elements.stage1Node.toggleAttribute('aria-current', !state.completed);
        elements.stage1Status.textContent = state.completed ? 'Stage completed' : (state.started ? 'In progress' : 'Available now');

        let stage2Class = 'locked';
        if (stage2State.completed) stage2Class = 'completed';
        else if (stage2IsCurrent) stage2Class = 'active';
        else if (state.completed) stage2Class = 'available';
        elements.stage2Node.className = 'stage-node ' + stage2Class;
        elements.stage2Node.toggleAttribute('aria-current', stage2IsCurrent && !stage2State.completed);
        elements.stage2Status.textContent = stage2State.completed
            ? 'Stage completed'
            : (stage2IsCurrent ? 'In progress' : (state.completed ? 'Ready to explore' : 'Complete Stage 1 to unlock'));

        const stage3IsCurrent = name === 'stage3' || name === 'stage3Result';
        let stage3Class = 'locked';
        if (stage3State.completed) stage3Class = 'completed';
        else if (stage3IsCurrent) stage3Class = 'active';
        else if (stage2State.completed) stage3Class = 'available';
        elements.stage3Node.className = 'stage-node ' + stage3Class;
        elements.stage3Node.toggleAttribute('aria-current', stage3IsCurrent && !stage3State.completed);
        elements.stage3Status.textContent = stage3State.completed
            ? 'Stage completed'
            : (stage3IsCurrent ? 'In progress' : (stage2State.completed ? 'Ready to explore' : 'Complete Stage 2 to unlock'));

        const stage4IsCurrent = name === 'stage4' || name === 'stage4Result';
        let stage4Class = 'locked';
        if (stage4State.completed) stage4Class = 'completed';
        else if (stage4IsCurrent) stage4Class = 'active';
        else if (stage3State.completed) stage4Class = 'available';
        elements.stage4Node.className = 'stage-node ' + stage4Class;
        elements.stage4Node.toggleAttribute('aria-current', stage4IsCurrent && !stage4State.completed);
        elements.stage4Status.textContent = stage4State.completed
            ? 'Stage completed'
            : (stage4IsCurrent ? 'In progress' : (stage3State.completed ? 'Ready to explore' : 'Complete Stage 3 to unlock'));

        const stage5IsCurrent = name === 'stage5' || name === 'stage5Result';
        let stage5Class = 'locked';
        if (stage5State.completed) stage5Class = 'completed';
        else if (stage5IsCurrent) stage5Class = 'active';
        else if (stage4State.completed) stage5Class = 'available';
        elements.stage5Node.className = 'stage-node ' + stage5Class;
        elements.stage5Node.toggleAttribute('aria-current', stage5IsCurrent && !stage5State.completed);
        elements.stage5Status.textContent = stage5State.completed
            ? 'Expedition completed'
            : (stage5IsCurrent ? 'In progress' : (stage4State.completed ? 'Ready for final stage' : 'Complete Stage 4 to unlock'));
    }

    function showScreen(name) {
        elements.intro.hidden = name !== 'intro';
        elements.game.hidden = name !== 'game';
        elements.result.hidden = name !== 'result';
        elements.stage2.hidden = name !== 'stage2';
        elements.stage2Result.hidden = name !== 'stage2Result';
        elements.stage3.hidden = name !== 'stage3';
        elements.stage3Result.hidden = name !== 'stage3Result';
        elements.stage4.hidden = name !== 'stage4';
        elements.stage4Result.hidden = name !== 'stage4Result';
        elements.stage5.hidden = name !== 'stage5';
        elements.stage5Result.hidden = name !== 'stage5Result';
        elements.headerSource.hidden = name === 'stage2' || name === 'stage2Result';
        updateStageMap(name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function beginStage() {
        state.started = true;
        saveState();
        showScreen('game');
        renderQuestion();
    }

    function answerQuestion(selectedAnswer) {
        const question = currentQuestion();
        if (!question || Object.hasOwn(state.answers, question.id)) return;
        const correct = selectedAnswer === question.answer;
        state.answers[question.id] = selectedAnswer;
        if (correct) state.score += 1;
        saveState();
        if (correct) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderQuestion();
    }

    function renderQuestion() {
        if (state.current >= totalQuestions) {
            completeStage();
            return;
        }
        const question = currentQuestion();
        const selectedAnswer = state.answers[question.id];
        const isAnswered = selectedAnswer !== undefined;
        elements.score.textContent = String(state.score);
        elements.counter.textContent = 'Signal ' + (state.current + 1) + ' of ' + totalQuestions;
        elements.progress.style.width = ((state.current + (isAnswered ? 1 : 0)) / totalQuestions * 100) + '%';
        elements.prompt.textContent = question.prompt;
        elements.sourceHint.hidden = !question.usesSource;
        elements.answers.replaceChildren();

        const optionOrder = state.optionOrder[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'answer-option';
            button.textContent = option;
            button.disabled = isAnswered;
            if (isAnswered && option === question.answer) button.classList.add('correct');
            if (isAnswered && option === selectedAnswer && option !== question.answer) button.classList.add('wrong');
            button.addEventListener('click', () => answerQuestion(option));
            elements.answers.appendChild(button);
        });

        elements.feedback.hidden = !isAnswered;
        elements.next.hidden = !isAnswered;
        if (isAnswered) {
            const correct = selectedAnswer === question.answer;
            elements.feedback.className = 'feedback-panel ' + (correct ? 'correct' : 'wrong');
            elements.feedbackTitle.textContent = correct ? 'Signal confirmed' : 'Route correction';
            elements.feedbackText.textContent = question.feedback;
            elements.next.textContent = state.current === totalQuestions - 1 ? 'Complete Stage 1' : 'Next Signal';
        }
    }

    function nextQuestion() {
        const question = currentQuestion();
        if (!question || !Object.hasOwn(state.answers, question.id)) return;
        state.current += 1;
        saveState();
        if (state.current >= totalQuestions) completeStage();
        else renderQuestion();
    }

    function completionCopy(score) {
        if (score === totalQuestions) return ['Perfect navigation', 'Every trade signal was interpreted correctly. The first route is completely secure.'];
        if (score >= 7) return ['Excellent navigation', 'You read the briefing with impressive accuracy and secured the first route.'];
        if (score >= 4) return ['Route secured', 'You completed the stage successfully. Try the alternate source route to sharpen your trade interpretation.'];
        return ['Route needs another attempt', 'You completed the stage, but the trade signals need more practice before the next expedition stage.'];
    }

    function completeStage(playCompletionSound = true) {
        state.completed = true;
        state.current = totalQuestions;
        saveState();
        const [title, message] = completionCopy(state.score);
        const percentage = Math.round(state.score / totalQuestions * 100);
        elements.resultScore.textContent = state.score + '/' + totalQuestions;
        elements.resultTitle.textContent = title;
        elements.resultMessage.textContent = message;
        elements.resultCorrect.textContent = String(state.score);
        elements.resultPercent.textContent = percentage + '%';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('result');
    }

    function tryAnotherRoute() {
        const alternative = Object.keys(packs).find(packId => packId !== state.packId) || state.packId;
        state = createState(alternative);
        state.started = true;
        saveState();
        showScreen('game');
        renderQuestion();
    }

    function beginStage2() {
        if (!state.completed) return;
        if (stage2State.completed) {
            completeStage2(false);
            return;
        }
        stage2State.started = true;
        saveStage2State();
        showScreen('stage2');
        renderStage2();
    }

    function currentCandidateTerm() {
        const definition = currentStage2Definition();
        if (!definition) return '';
        const order = stage2State.termOrders[definition.id];
        return order[stage2State.positions[definition.id]];
    }

    function moveTerm(direction) {
        const definition = currentStage2Definition();
        if (!definition || Object.hasOwn(stage2State.answers, definition.id)) return;
        const order = stage2State.termOrders[definition.id];
        const currentPosition = stage2State.positions[definition.id];
        stage2State.positions[definition.id] = (currentPosition + direction + order.length) % order.length;
        saveStage2State();
        renderStage2();
    }

    function selectCandidateTerm() {
        const definition = currentStage2Definition();
        if (!definition || Object.hasOwn(stage2State.answers, definition.id)) return;
        const selectedAnswer = currentCandidateTerm();
        const correct = selectedAnswer === definition.answer;
        stage2State.answers[definition.id] = selectedAnswer;
        if (correct) stage2State.score += 1;
        saveStage2State();
        if (correct) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage2();
    }

    function renderStage2() {
        if (stage2State.current >= stage2Total) {
            completeStage2();
            return;
        }
        const definition = currentStage2Definition();
        const selectedAnswer = stage2State.answers[definition.id];
        const isAnswered = selectedAnswer !== undefined;
        const order = stage2State.termOrders[definition.id];
        const position = stage2State.positions[definition.id];
        const candidate = order[position];

        elements.stage2Score.textContent = String(stage2State.score);
        elements.stage2Progress.style.width = ((stage2State.current + (isAnswered ? 1 : 0)) / stage2Total * 100) + '%';
        elements.definitionCounter.textContent = 'Definition ' + (stage2State.current + 1) + ' of ' + stage2Total;
        elements.definitionPrompt.textContent = definition.prompt;
        elements.candidateTerm.textContent = candidate;
        elements.carouselPosition.textContent = 'Term ' + (position + 1) + ' of ' + order.length;
        elements.previousTerm.disabled = isAnswered;
        elements.nextTerm.disabled = isAnswered;
        elements.termCard.disabled = isAnswered;
        elements.termCard.className = 'term-card';
        if (isAnswered) elements.termCard.classList.add(selectedAnswer === definition.answer ? 'correct' : 'wrong');

        elements.stage2Feedback.hidden = !isAnswered;
        elements.stage2Next.hidden = !isAnswered;
        if (isAnswered) {
            const correct = selectedAnswer === definition.answer;
            elements.stage2Feedback.className = 'feedback-panel ' + (correct ? 'correct' : 'wrong');
            elements.stage2FeedbackTitle.textContent = correct ? 'Compass aligned' : 'Compass correction';
            elements.stage2FeedbackText.textContent = (correct ? '' : 'Correct term: ' + definition.answer + '. ') + definition.feedback;
            elements.stage2Next.textContent = stage2State.current === stage2Total - 1 ? 'Complete Stage 2' : 'Next Definition';
        }
    }

    function nextStage2Definition() {
        const definition = currentStage2Definition();
        if (!definition || !Object.hasOwn(stage2State.answers, definition.id)) return;
        stage2State.current += 1;
        saveStage2State();
        if (stage2State.current >= stage2Total) completeStage2();
        else renderStage2();
    }

    function stage2CompletionCopy(score) {
        if (score === stage2Total) return ['Perfect calibration', 'Every development concept was matched correctly. Your Concept Compass is fully aligned.'];
        if (score >= 6) return ['Excellent calibration', 'Your development vocabulary is precise and the expedition can continue confidently.'];
        if (score >= 4) return ['Compass calibrated', 'You completed the stage successfully. Replay it to strengthen the concepts you missed.'];
        return ['Compass needs recalibration', 'You completed the stage, but these development concepts need another careful route.'];
    }

    function completeStage2(playCompletionSound = true) {
        stage2State.completed = true;
        stage2State.current = stage2Total;
        saveStage2State();
        const [title, message] = stage2CompletionCopy(stage2State.score);
        const percentage = Math.round(stage2State.score / stage2Total * 100);
        elements.stage2ResultScore.textContent = stage2State.score + '/' + stage2Total;
        elements.stage2ResultTitle.textContent = title;
        elements.stage2ResultMessage.textContent = message;
        elements.stage2ResultCorrect.textContent = String(stage2State.score);
        elements.stage2ResultPercent.textContent = percentage + '%';
        elements.overallScore.textContent = (state.score + stage2State.score) + '/' + (totalQuestions + stage2Total);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage2Result');
    }

    function replayStage2() {
        stage2State = createStage2State();
        stage2State.started = true;
        saveStage2State();
        showScreen('stage2');
        renderStage2();
    }

    function beginStage3() {
        if (!stage2State.completed) return;
        if (stage3State.completed) {
            completeStage3(false);
            return;
        }
        stage3State.started = true;
        saveStage3State();
        showScreen('stage3');
        renderStage3();
    }

    function scoreStage3Question(question, selectedAnswers) {
        if (question.mode === 'multiple') {
            const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
            return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
        }
        return question.correctAnswers.includes(selectedAnswers[0]) ? question.marks : 0;
    }

    function chooseStage3Option(option) {
        const question = currentStage3Question();
        if (!question || stage3State.locked[question.id]) return;
        const selected = [...(stage3State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage3State.answers[question.id] = [option];
            lockStage3Question();
            return;
        }
        const selectedIndex = selected.indexOf(option);
        if (selectedIndex >= 0) selected.splice(selectedIndex, 1);
        else if (selected.length < question.selectLimit) selected.push(option);
        stage3State.answers[question.id] = selected;
        saveStage3State();
        renderStage3();
    }

    function lockStage3Question() {
        const question = currentStage3Question();
        if (!question || stage3State.locked[question.id]) return;
        const selected = stage3State.answers[question.id] || [];
        const required = question.mode === 'multiple' ? question.selectLimit : 1;
        if (selected.length !== required) return;
        const awarded = scoreStage3Question(question, selected);
        stage3State.locked[question.id] = true;
        stage3State.awarded[question.id] = awarded;
        stage3State.score += awarded;
        saveStage3State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage3();
    }

    function renderStage3() {
        if (stage3State.current >= stage3Total) {
            completeStage3();
            return;
        }
        const question = currentStage3Question();
        const selected = stage3State.answers[question.id] || [];
        const isLocked = Boolean(stage3State.locked[question.id]);
        const awarded = stage3State.awarded[question.id] || 0;
        const optionOrder = stage3State.optionOrders[question.id] || question.options;

        elements.stage3Score.textContent = String(stage3State.score);
        elements.stage3Progress.style.width = ((stage3State.current + (isLocked ? 1 : 0)) / stage3Total * 100) + '%';
        elements.growthCounter.textContent = 'Challenge ' + (stage3State.current + 1) + ' of ' + stage3Total;
        elements.growthMarks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.growthPrompt.textContent = question.prompt;
        elements.growthInstruction.textContent = question.instruction;
        elements.stage3Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = isLocked;
            if (isLocked && isCorrect) button.classList.add('correct');
            else if (isLocked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = isLocked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage3Option(option));
            elements.stage3Answers.appendChild(button);
        });

        elements.confirmStage3.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage3.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage3.textContent = selected.length === question.selectLimit
                ? 'Lock ' + question.selectLimit + ' Choices'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage3Feedback.hidden = !isLocked;
        elements.stage3Next.hidden = !isLocked;
        if (isLocked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage3Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage3FeedbackTitle.textContent = awarded === question.marks
                ? 'Crossroads cleared'
                : (awarded > 0 ? 'Partial route secured' : 'Route correction');
            elements.stage3FeedbackText.textContent = 'You earned ' + awarded + ' of ' + question.marks + ' marks. ' + question.feedback;
            elements.stage3Next.textContent = stage3State.current === stage3Total - 1 ? 'Complete Stage 3' : 'Next Challenge';
        }
    }

    function nextStage3Question() {
        const question = currentStage3Question();
        if (!question || !stage3State.locked[question.id]) return;
        stage3State.current += 1;
        saveStage3State();
        if (stage3State.current >= stage3Total) completeStage3();
        else renderStage3();
    }

    function stage3CompletionCopy(score) {
        const percentage = Math.round(score / stage3TotalMarks * 100);
        if (score === stage3TotalMarks) return ['Development masterstroke', 'You connected economic growth, inequality and human development with perfect accuracy.'];
        if (percentage >= 80) return ['Crossroads mastered', 'You interpreted the development source and its deeper consequences exceptionally well.'];
        if (percentage >= 50) return ['Crossroads cleared', 'You completed the stage successfully and showed a sound understanding of growth and human development.'];
        return ['Crossroads needs another route', 'You completed the stage, but the relationship between growth, inequality and human development needs more practice.'];
    }

    function completeStage3(playCompletionSound = true) {
        stage3State.completed = true;
        stage3State.current = stage3Total;
        saveStage3State();
        const [title, message] = stage3CompletionCopy(stage3State.score);
        const percentage = Math.round(stage3State.score / stage3TotalMarks * 100);
        elements.stage3ResultScore.textContent = stage3State.score + '/' + stage3TotalMarks;
        elements.stage3ResultTitle.textContent = title;
        elements.stage3ResultMessage.textContent = message;
        elements.stage3ResultMarks.textContent = String(stage3State.score);
        elements.stage3ResultPercent.textContent = percentage + '%';
        elements.stage3OverallScore.textContent = (state.score + stage2State.score + stage3State.score) + '/' + (totalQuestions + stage2Total + stage3TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage3Result');
    }

    function replayStage3() {
        stage3State = createStage3State();
        stage3State.started = true;
        saveStage3State();
        showScreen('stage3');
        renderStage3();
    }

    function beginStage4() {
        if (!stage3State.completed) return;
        if (stage4State.completed) {
            completeStage4(false);
            return;
        }
        stage4State.started = true;
        saveStage4State();
        showScreen('stage4');
        renderStage4();
    }

    function scoreStage4Question(question, selectedAnswers) {
        if (question.mode === 'multiple') {
            const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
            return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
        }
        return question.correctAnswers.includes(selectedAnswers[0]) ? question.marks : 0;
    }

    function chooseStage4Option(option) {
        const question = currentStage4Question();
        if (!question || stage4State.locked[question.id]) return;
        const selected = [...(stage4State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage4State.answers[question.id] = [option];
            lockStage4Question();
            return;
        }
        const selectedIndex = selected.indexOf(option);
        if (selectedIndex >= 0) selected.splice(selectedIndex, 1);
        else if (selected.length < question.selectLimit) selected.push(option);
        stage4State.answers[question.id] = selected;
        saveStage4State();
        renderStage4();
    }

    function lockStage4Question() {
        const question = currentStage4Question();
        if (!question || stage4State.locked[question.id]) return;
        const selected = stage4State.answers[question.id] || [];
        const required = question.mode === 'multiple' ? question.selectLimit : 1;
        if (selected.length !== required) return;
        const awarded = scoreStage4Question(question, selected);
        stage4State.locked[question.id] = true;
        stage4State.awarded[question.id] = awarded;
        stage4State.score += awarded;
        saveStage4State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage4();
    }

    function renderStage4() {
        if (stage4State.current >= stage4Total) {
            completeStage4();
            return;
        }
        const question = currentStage4Question();
        const selected = stage4State.answers[question.id] || [];
        const isLocked = Boolean(stage4State.locked[question.id]);
        const awarded = stage4State.awarded[question.id] || 0;
        const optionOrder = stage4State.optionOrders[question.id] || question.options;

        elements.stage4Score.textContent = String(stage4State.score);
        elements.stage4Progress.style.width = ((stage4State.current + (isLocked ? 1 : 0)) / stage4Total * 100) + '%';
        elements.gateCounter.textContent = 'Checkpoint ' + (stage4State.current + 1) + ' of ' + stage4Total;
        elements.gateMarks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.gatePrompt.textContent = question.prompt;
        elements.gateInstruction.textContent = question.instruction;
        elements.stage4Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = isLocked;
            if (isLocked && isCorrect) button.classList.add('correct');
            else if (isLocked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = isLocked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage4Option(option));
            elements.stage4Answers.appendChild(button);
        });

        elements.confirmStage4.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage4.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage4.textContent = selected.length === question.selectLimit
                ? 'Stamp ' + question.selectLimit + ' Choices'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage4Feedback.hidden = !isLocked;
        elements.stage4Next.hidden = !isLocked;
        if (isLocked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage4Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage4FeedbackTitle.textContent = awarded === question.marks
                ? 'Entry stamp approved'
                : (awarded > 0 ? 'Partial customs clearance' : 'Customs correction');
            elements.stage4FeedbackText.textContent = 'You earned ' + awarded + ' of ' + question.marks + ' marks. ' + question.feedback;
            elements.stage4Next.textContent = stage4State.current === stage4Total - 1 ? 'Complete Stage 4' : 'Next Checkpoint';
        }
    }

    function nextStage4Question() {
        const question = currentStage4Question();
        if (!question || !stage4State.locked[question.id]) return;
        stage4State.current += 1;
        saveStage4State();
        if (stage4State.current >= stage4Total) completeStage4();
        else renderStage4();
    }

    function stage4CompletionCopy(score) {
        const percentage = Math.round(score / stage4TotalMarks * 100);
        if (score === stage4TotalMarks) return ['Free-trade expert', 'Every market signal, regulation and trading relationship was interpreted perfectly.'];
        if (percentage >= 80) return ['Gatekeeper outsmarted', 'You analysed the trade cartoon and its restrictions with exceptional accuracy.'];
        if (percentage >= 50) return ['Market gate cleared', 'You completed the checkpoint successfully and understand the main opportunities and risks of free trade.'];
        return ['Customs file needs review', 'You completed the stage, but tariffs, quotas and unequal trading relationships need another look.'];
    }

    function completeStage4(playCompletionSound = true) {
        stage4State.completed = true;
        stage4State.current = stage4Total;
        saveStage4State();
        const [title, message] = stage4CompletionCopy(stage4State.score);
        const percentage = Math.round(stage4State.score / stage4TotalMarks * 100);
        elements.stage4ResultScore.textContent = stage4State.score + '/' + stage4TotalMarks;
        elements.stage4ResultTitle.textContent = title;
        elements.stage4ResultMessage.textContent = message;
        elements.stage4ResultMarks.textContent = String(stage4State.score);
        elements.stage4ResultPercent.textContent = percentage + '%';
        elements.stage4OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score) + '/' + (totalQuestions + stage2Total + stage3TotalMarks + stage4TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage4Result');
    }

    function replayStage4() {
        stage4State = createStage4State();
        stage4State.started = true;
        saveStage4State();
        showScreen('stage4');
        renderStage4();
    }

    function beginStage5() {
        if (!stage4State.completed) return;
        if (stage5State.completed) {
            completeStage5(false);
            return;
        }
        stage5State.started = true;
        saveStage5State();
        showScreen('stage5');
        renderStage5();
    }

    function scoreStage5Question(question, selectedAnswers) {
        if (question.mode === 'multiple') {
            const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
            return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
        }
        return question.correctAnswers.includes(selectedAnswers[0]) ? question.marks : 0;
    }

    function chooseStage5Option(option) {
        const question = currentStage5Question();
        if (!question || stage5State.locked[question.id]) return;
        const selected = [...(stage5State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage5State.answers[question.id] = [option];
            lockStage5Question();
            return;
        }
        const selectedIndex = selected.indexOf(option);
        if (selectedIndex >= 0) selected.splice(selectedIndex, 1);
        else if (selected.length < question.selectLimit) selected.push(option);
        stage5State.answers[question.id] = selected;
        saveStage5State();
        renderStage5();
    }

    function lockStage5Question() {
        const question = currentStage5Question();
        if (!question || stage5State.locked[question.id]) return;
        const selected = stage5State.answers[question.id] || [];
        const required = question.mode === 'multiple' ? question.selectLimit : 1;
        if (selected.length !== required) return;
        const awarded = scoreStage5Question(question, selected);
        stage5State.locked[question.id] = true;
        stage5State.awarded[question.id] = awarded;
        stage5State.score += awarded;
        saveStage5State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage5();
    }

    function renderStage5() {
        if (stage5State.current >= stage5Total) {
            completeStage5();
            return;
        }
        const question = currentStage5Question();
        const selected = stage5State.answers[question.id] || [];
        const isLocked = Boolean(stage5State.locked[question.id]);
        const awarded = stage5State.awarded[question.id] || 0;
        const optionOrder = stage5State.optionOrders[question.id] || question.options;

        elements.stage5Score.textContent = String(stage5State.score);
        elements.stage5Progress.style.width = ((stage5State.current + (isLocked ? 1 : 0)) / stage5Total * 100) + '%';
        elements.aidCounter.textContent = 'Operation ' + (stage5State.current + 1) + ' of ' + stage5Total;
        elements.aidMarks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.aidPrompt.textContent = question.prompt;
        elements.aidInstruction.textContent = question.instruction;
        elements.stage5Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = isLocked;
            if (isLocked && isCorrect) button.classList.add('correct');
            else if (isLocked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = isLocked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage5Option(option));
            elements.stage5Answers.appendChild(button);
        });

        elements.confirmStage5.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage5.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage5.textContent = selected.length === question.selectLimit
                ? 'Confirm ' + question.selectLimit + ' Points'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage5Feedback.hidden = !isLocked;
        elements.stage5Next.hidden = !isLocked;
        if (isLocked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage5Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage5FeedbackTitle.textContent = awarded === question.marks
                ? 'Operation secured'
                : (awarded > 0 ? 'Partial response secured' : 'Mission correction');
            elements.stage5FeedbackText.textContent = 'You earned ' + awarded + ' of ' + question.marks + ' marks. ' + question.feedback;
            elements.stage5Next.textContent = stage5State.current === stage5Total - 1 ? 'Complete the Grand Expedition' : 'Next Operation';
        }
    }

    function nextStage5Question() {
        const question = currentStage5Question();
        if (!question || !stage5State.locked[question.id]) return;
        stage5State.current += 1;
        saveStage5State();
        if (stage5State.current >= stage5Total) completeStage5();
        else renderStage5();
    }

    function fullExpeditionScore() {
        return state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score;
    }

    function stage5CompletionCopy(score) {
        const percentage = Math.round(score / stage5TotalMarks * 100);
        if (score === stage5TotalMarks) return ['Humanitarian mission mastered', 'You interpreted every aid concept, delivery route, organisation and crisis decision perfectly.'];
        if (percentage >= 80) return ['Mission accomplished', 'You completed the humanitarian briefing with exceptional judgement and accuracy.'];
        if (percentage >= 50) return ['Aid operation secured', 'You completed the final stage successfully and balanced the benefits and risks of humanitarian aid.'];
        return ['Aid plan needs review', 'The expedition is complete, but development aid and humanitarian-response decisions need another careful briefing.'];
    }

    function showFinalCertificate() {
        if (!window.MayHubCertificates) {
            window.alert('The certificate system is unavailable. Please refresh the page and try again.');
            return false;
        }
        window.MayHubCertificates.showScored({
            correct: fullExpeditionScore(),
            total: expeditionTotalMarks,
            category: 'Five-Stage Geography Expedition'
        });
        return true;
    }

    function completeStage5(openCertificate = true) {
        stage5State.completed = true;
        stage5State.current = stage5Total;
        saveStage5State();
        const [title, message] = stage5CompletionCopy(stage5State.score);
        const percentage = Math.round(stage5State.score / stage5TotalMarks * 100);
        elements.stage5ResultScore.textContent = stage5State.score + '/' + stage5TotalMarks;
        elements.stage5ResultTitle.textContent = title;
        elements.stage5ResultMessage.textContent = message;
        elements.stage5ResultMarks.textContent = String(stage5State.score);
        elements.stage5ResultPercent.textContent = percentage + '%';
        elements.finalExpeditionScore.textContent = fullExpeditionScore() + '/' + expeditionTotalMarks;
        showScreen('stage5Result');
        if (openCertificate) {
            window.setTimeout(() => {
                if (!showFinalCertificate()) {
                    if (percentage >= 50) window.MayHubSounds?.playPass?.();
                    else window.MayHubSounds?.playFail?.();
                }
            }, 450);
        }
    }

    function replayStage5() {
        stage5State = createStage5State();
        stage5State.started = true;
        saveStage5State();
        showScreen('stage5');
        renderStage5();
    }

    function updateZoom(nextZoom) {
        zoom = Math.min(2.5, Math.max(.75, Math.round(nextZoom * 100) / 100));
        elements.sourceImage.style.width = (zoom * 100) + '%';
        elements.zoomValue.textContent = Math.round(zoom * 100) + '%';
        if (zoom === 1) elements.sourceViewport.scrollTo({ top: 0, left: 0 });
    }

    function openSource(sourceKind = 'stage1') {
        if (sourceKind === 'stage5') {
            elements.sourceImage.src = stage5Data.sourceImage;
            elements.sourceImage.alt = stage5Data.sourceAlt;
            elements.sourcePackLabel.textContent = 'Final-stage briefing // Original rewritten source';
            elements.sourceTitle.textContent = 'Aid Operations Humanitarian Brief';
        } else if (sourceKind === 'stage4') {
            elements.sourceImage.src = stage4Data.sourceImage;
            elements.sourceImage.alt = stage4Data.sourceAlt;
            elements.sourcePackLabel.textContent = 'Stage 4 briefing // Original black-and-white source';
            elements.sourceTitle.textContent = 'Trade Gatekeepers Customs File';
        } else if (sourceKind === 'stage3') {
            elements.sourceImage.src = stage3Data.sourceImage;
            elements.sourceImage.alt = stage3Data.sourceAlt;
            elements.sourcePackLabel.textContent = 'Stage 3 briefing // Original regenerated source';
            elements.sourceTitle.textContent = 'Development Crossroads Source';
        } else {
            const pack = currentPack();
            elements.sourceImage.src = pack.sourceImage;
            elements.sourceImage.alt = pack.label + ': South African trade snapshot';
            elements.sourcePackLabel.textContent = 'Assigned briefing // Source Pack ' + state.packId;
            elements.sourceTitle.textContent = 'Trade Intelligence Source';
        }
        updateZoom(1);
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        elements.overlay.hidden = false;
        document.getElementById('closeSourceButton').focus();
    }

    function closeSource() {
        elements.overlay.hidden = true;
        document.body.style.overflow = previousBodyOverflow;
    }

    function initialise() {
        if (!Object.keys(packs).length) {
            elements.intro.querySelector('.intro-copy').textContent = 'The source packs could not be loaded. Please refresh the page.';
            elements.begin.disabled = true;
            return;
        }
        if (stage2Data.definitions.length !== stage2Total || stage2Data.terms.length !== 9) {
            elements.continueStage2.disabled = true;
            elements.continueStage2.textContent = 'Stage 2 unavailable';
        }
        if (stage3Data.questions.length !== stage3Total || stage3Data.questions.reduce((sum, question) => sum + question.marks, 0) !== stage3TotalMarks) {
            elements.continueStage3.disabled = true;
            elements.continueStage3.textContent = 'Stage 3 unavailable';
        }
        if (stage4Data.questions.length !== stage4Total || stage4Data.questions.reduce((sum, question) => sum + question.marks, 0) !== stage4TotalMarks) {
            elements.continueStage4.disabled = true;
            elements.continueStage4.textContent = 'Stage 4 unavailable';
        }
        if (stage5Data.questions.length !== stage5Total || stage5Data.questions.reduce((sum, question) => sum + question.marks, 0) !== stage5TotalMarks) {
            elements.continueStage5.disabled = true;
            elements.continueStage5.textContent = 'Final stage unavailable';
        }
        elements.headerSource.addEventListener('click', () => {
            if (!elements.stage5.hidden || !elements.stage5Result.hidden) openSource('stage5');
            else if (!elements.stage4.hidden || !elements.stage4Result.hidden) openSource('stage4');
            else if (!elements.stage3.hidden || !elements.stage3Result.hidden) openSource('stage3');
            else openSource('stage1');
        });
        elements.begin.addEventListener('click', beginStage);
        elements.next.addEventListener('click', nextQuestion);
        elements.continueStage2.addEventListener('click', beginStage2);
        elements.anotherRoute.addEventListener('click', tryAnotherRoute);
        elements.previousTerm.addEventListener('click', () => moveTerm(-1));
        elements.nextTerm.addEventListener('click', () => moveTerm(1));
        elements.termCard.addEventListener('click', selectCandidateTerm);
        elements.stage2Next.addEventListener('click', nextStage2Definition);
        elements.replayStage2.addEventListener('click', replayStage2);
        elements.continueStage3.addEventListener('click', beginStage3);
        elements.confirmStage3.addEventListener('click', lockStage3Question);
        elements.stage3Next.addEventListener('click', nextStage3Question);
        elements.replayStage3.addEventListener('click', replayStage3);
        elements.continueStage4.addEventListener('click', beginStage4);
        elements.confirmStage4.addEventListener('click', lockStage4Question);
        elements.stage4Next.addEventListener('click', nextStage4Question);
        elements.replayStage4.addEventListener('click', replayStage4);
        elements.continueStage5.addEventListener('click', beginStage5);
        elements.confirmStage5.addEventListener('click', lockStage5Question);
        elements.stage5Next.addEventListener('click', nextStage5Question);
        elements.replayStage5.addEventListener('click', replayStage5);
        elements.viewCertificate.addEventListener('click', showFinalCertificate);
        document.getElementById('closeSourceButton').addEventListener('click', closeSource);
        document.getElementById('zoomOutButton').addEventListener('click', () => updateZoom(zoom - .25));
        document.getElementById('zoomInButton').addEventListener('click', () => updateZoom(zoom + .25));
        document.getElementById('zoomResetButton').addEventListener('click', () => updateZoom(1));
        elements.overlay.addEventListener('click', event => { if (event.target === elements.overlay) closeSource(); });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !elements.overlay.hidden) {
                closeSource();
                return;
            }
            if (!elements.stage2.hidden && elements.overlay.hidden && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                event.preventDefault();
                moveTerm(event.key === 'ArrowLeft' ? -1 : 1);
            }
        });

        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed) {
            completeStage5(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.started) {
            showScreen('stage5');
            renderStage5();
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed) {
            completeStage4(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.started) {
            showScreen('stage4');
            renderStage4();
        } else if (state.completed && stage2State.completed && stage3State.completed) {
            completeStage3(false);
        } else if (state.completed && stage2State.completed && stage3State.started) {
            showScreen('stage3');
            renderStage3();
        } else if (state.completed && stage2State.completed) {
            completeStage2(false);
        } else if (state.completed && stage2State.started) {
            showScreen('stage2');
            renderStage2();
        } else if (state.completed) {
            completeStage(false);
        } else if (state.started) {
            elements.resumeNote.textContent = 'Your saved Stage 1 route is ready to continue.';
            showScreen('game');
            renderQuestion();
        } else {
            showScreen('intro');
        }
    }

    initialise();
})();
