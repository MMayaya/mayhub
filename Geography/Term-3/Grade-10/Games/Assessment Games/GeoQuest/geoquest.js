(function () {
    'use strict';

    const data = window.Grade10GeoQuestStage1Data;
    const terms = data?.terms || [];
    const definitions = data?.definitions || [];
    const totalQuestions = definitions.length;
    const stage2Data = window.Grade10GeoQuestStage2Data;
    const stage2Terms = stage2Data?.terms || [];
    const stage2Descriptions = stage2Data?.descriptions || [];
    const stage2Total = stage2Descriptions.length;
    const stage3Data = window.Grade10GeoQuestStage3Data;
    const stage3Questions = stage3Data?.questions || [];
    const stage3Total = stage3Questions.length;
    const stage3TotalMarks = stage3Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage4Data = window.Grade10GeoQuestStage4Data;
    const stage4Questions = stage4Data?.questions || [];
    const stage4Total = stage4Questions.length;
    const stage4TotalMarks = stage4Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage5Data = window.Grade10GeoQuestStage5Data;
    const stage5Questions = stage5Data?.questions || [];
    const stage5Total = stage5Questions.length;
    const stage5TotalMarks = stage5Questions.reduce((sum, question) => sum + question.marks, 0);
    const expeditionTotalMarks = 60;
    const expeditionAttemptLimit = 2;
    const expeditionCooldownMs = 6 * 60 * 60 * 1000;
    const storageVersion = 1;

    const elements = {
        intro: document.getElementById('introScreen'),
        game: document.getElementById('gameScreen'),
        result: document.getElementById('resultScreen'),
        begin: document.getElementById('beginButton'),
        resumeNote: document.getElementById('resumeNote'),
        score: document.getElementById('scoreValue'),
        progress: document.getElementById('progressFill'),
        counter: document.getElementById('definitionCounter'),
        prompt: document.getElementById('definitionPrompt'),
        previousTerm: document.getElementById('previousTermButton'),
        nextTerm: document.getElementById('nextTermButton'),
        termCard: document.getElementById('termCardButton'),
        candidateTerm: document.getElementById('candidateTerm'),
        carouselPosition: document.getElementById('carouselPosition'),
        feedback: document.getElementById('feedbackPanel'),
        feedbackTitle: document.getElementById('feedbackTitle'),
        feedbackText: document.getElementById('feedbackText'),
        next: document.getElementById('nextButton'),
        resultScore: document.getElementById('resultScore'),
        resultTitle: document.getElementById('resultTitle'),
        resultMessage: document.getElementById('resultMessage'),
        resultCorrect: document.getElementById('resultCorrect'),
        resultPercent: document.getElementById('resultPercent'),
        stage1Node: document.getElementById('stage1Node'),
        stage1Status: document.getElementById('stage1Status'),
        stage2Node: document.getElementById('stage2Node'),
        stage2Status: document.getElementById('stage2Status'),
        continueStage2: document.getElementById('continueStage2Button'),
        stage2Screen: document.getElementById('stage2Screen'),
        stage2Result: document.getElementById('stage2ResultScreen'),
        stage2Score: document.getElementById('stage2ScoreValue'),
        stage2Progress: document.getElementById('stage2ProgressFill'),
        stage2SelectionCount: document.getElementById('stage2SelectionCount'),
        columnBBank: document.getElementById('columnBBank'),
        stage2Rows: document.getElementById('stage2MatchRows'),
        checkStage2: document.getElementById('checkStage2Button'),
        stage2Feedback: document.getElementById('stage2FeedbackPanel'),
        stage2FeedbackTitle: document.getElementById('stage2FeedbackTitle'),
        stage2FeedbackText: document.getElementById('stage2FeedbackText'),
        stage2Next: document.getElementById('stage2NextButton'),
        stage2ResultScore: document.getElementById('stage2ResultScore'),
        stage2ResultTitle: document.getElementById('stage2ResultTitle'),
        stage2ResultMessage: document.getElementById('stage2ResultMessage'),
        stage2ResultCorrect: document.getElementById('stage2ResultCorrect'),
        stage2ResultPercent: document.getElementById('stage2ResultPercent'),
        stage2OverallScore: document.getElementById('stage2OverallScore'),
        stage3Node: document.getElementById('stage3Node'),
        stage3Status: document.getElementById('stage3Status'),
        continueStage3: document.getElementById('continueStage3Button'),
        stage3Screen: document.getElementById('stage3Screen'),
        stage3Result: document.getElementById('stage3ResultScreen'),
        stage3Score: document.getElementById('stage3ScoreValue'),
        stage3Progress: document.getElementById('stage3ProgressFill'),
        stage3Counter: document.getElementById('stage3Counter'),
        stage3Marks: document.getElementById('stage3Marks'),
        stage3Prompt: document.getElementById('stage3Prompt'),
        stage3Instruction: document.getElementById('stage3Instruction'),
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
        stage4Node: document.getElementById('stage4Node'),
        stage4Status: document.getElementById('stage4Status'),
        continueStage4: document.getElementById('continueStage4Button'),
        stage4Screen: document.getElementById('stage4Screen'),
        stage4Result: document.getElementById('stage4ResultScreen'),
        stage4Score: document.getElementById('stage4ScoreValue'),
        stage4Progress: document.getElementById('stage4ProgressFill'),
        stage4Counter: document.getElementById('stage4Counter'),
        stage4Marks: document.getElementById('stage4Marks'),
        stage4Prompt: document.getElementById('stage4Prompt'),
        stage4Instruction: document.getElementById('stage4Instruction'),
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
        stage5Node: document.getElementById('stage5Node'),
        stage5Status: document.getElementById('stage5Status'),
        continueStage5: document.getElementById('continueStage5Button'),
        stage5Screen: document.getElementById('stage5Screen'),
        stage5Result: document.getElementById('stage5ResultScreen'),
        stage5Score: document.getElementById('stage5ScoreValue'),
        stage5Progress: document.getElementById('stage5ProgressFill'),
        stage5Counter: document.getElementById('stage5Counter'),
        stage5Marks: document.getElementById('stage5Marks'),
        stage5Prompt: document.getElementById('stage5Prompt'),
        stage5Instruction: document.getElementById('stage5Instruction'),
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
        stage5OverallScore: document.getElementById('stage5OverallScore'),
        stage6Node: document.getElementById('stage6Node'),
        stage6Status: document.getElementById('stage6Status'),
        stage6Screen: document.getElementById('stage6Screen'),
        continueStage6: document.getElementById('continueStage6Button'),
        stage6ResultTitle: document.getElementById('stage6ResultTitle'),
        stage6ResultMessage: document.getElementById('stage6ResultMessage'),
        finalExpeditionScore: document.getElementById('finalExpeditionScore'),
        grandTotalPercent: document.getElementById('grandTotalPercent'),
        grandTotalComment: document.getElementById('grandTotalComment'),
        finalStageScores: [
            [document.getElementById('finalStage1Score'), document.getElementById('finalStage1Percent'), document.getElementById('finalStage1Comment')],
            [document.getElementById('finalStage2Score'), document.getElementById('finalStage2Percent'), document.getElementById('finalStage2Comment')],
            [document.getElementById('finalStage3Score'), document.getElementById('finalStage3Percent'), document.getElementById('finalStage3Comment')],
            [document.getElementById('finalStage4Score'), document.getElementById('finalStage4Percent'), document.getElementById('finalStage4Comment')],
            [document.getElementById('finalStage5Score'), document.getElementById('finalStage5Percent'), document.getElementById('finalStage5Comment')]
        ],
        viewCertificate: document.getElementById('viewCertificateButton'),
        newExpedition: document.getElementById('newExpeditionButton'),
        expeditionLimitPanel: document.getElementById('expeditionLimitPanel'),
        expeditionLimitTitle: document.getElementById('expeditionLimitTitle'),
        expeditionLimitStatus: document.getElementById('expeditionLimitStatus'),
        expeditionCountdown: document.getElementById('expeditionCountdown'),
        sourceButton: document.getElementById('headerSourceButton'),
        sourceOverlay: document.getElementById('sourceOverlay'),
        closeSource: document.getElementById('closeSourceButton'),
        sourceTitle: document.getElementById('sourceTitle'),
        sourceImage: document.getElementById('sourceImage'),
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
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:stage-1:' + encodeURIComponent(learnerId());
    }

    function stage2StorageKey() {
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:stage-2:' + encodeURIComponent(learnerId());
    }

    function stage3StorageKey() {
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:stage-3:' + encodeURIComponent(learnerId());
    }

    function stage4StorageKey() {
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:stage-4:' + encodeURIComponent(learnerId());
    }

    function stage5StorageKey() {
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:stage-5:' + encodeURIComponent(learnerId());
    }

    function attemptStorageKey() {
        return 'mayhubGrade10GeoQuest:v' + storageVersion + ':geography:term-3:attempt-ledger:' + encodeURIComponent(learnerId());
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

    function createState() {
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(definitions.map(definition => definition.id)),
            termOrders: Object.fromEntries(definitions.map(definition => [definition.id, shuffle(terms)])),
            positions: Object.fromEntries(definitions.map(definition => [definition.id, 0])),
            answers: {},
            awarded: {}
        };
    }

    function validState(candidate) {
        const byId = new Map(definitions.map(definition => [definition.id, definition]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== totalQuestions || new Set(candidate.order).size !== totalQuestions) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!candidate.termOrders || !candidate.order.every(id => {
            const order = candidate.termOrders[id];
            return Array.isArray(order) && order.length === terms.length && new Set(order).size === terms.length && order.every(term => terms.includes(term));
        })) return false;
        if (!candidate.positions || !candidate.order.every(id => Number.isInteger(candidate.positions[id]) && candidate.positions[id] >= 0 && candidate.positions[id] < terms.length)) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answer]) => byId.has(id) && terms.includes(answer))) return false;
        if (!candidate.awarded || !Object.entries(candidate.awarded).every(([id, mark]) => byId.has(id) && (mark === 0 || mark === 1))) return false;
        const awardedTotal = Object.values(candidate.awarded).reduce((sum, mark) => sum + mark, 0);
        return Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= totalQuestions
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= totalQuestions;
    }

    function loadState() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(storageKey()) || 'null');
            if (validState(saved)) return saved;
        } catch {}
        return createState();
    }

    let state = loadState();
    let suppressNextSelection = false;

    function createStage2State() {
        return {
            version: storageVersion,
            started: false,
            completed: false,
            locked: false,
            score: 0,
            order: shuffle(stage2Descriptions.map(description => description.id)),
            termOrder: shuffle(stage2Terms),
            answers: {}
        };
    }

    function validStage2State(candidate) {
        const byId = new Map(stage2Descriptions.map(description => [description.id, description]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage2Total || new Set(candidate.order).size !== stage2Total) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!Array.isArray(candidate.termOrder) || candidate.termOrder.length !== stage2Terms.length || new Set(candidate.termOrder).size !== stage2Terms.length) return false;
        if (!candidate.termOrder.every(term => stage2Terms.includes(term))) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answer]) => byId.has(id) && stage2Terms.includes(answer))) return false;
        if (new Set(Object.values(candidate.answers)).size !== Object.values(candidate.answers).length) return false;
        const calculatedScore = candidate.locked
            ? candidate.order.filter(id => candidate.answers[id] === byId.get(id).answer).length
            : 0;
        return typeof candidate.started === 'boolean'
            && typeof candidate.completed === 'boolean'
            && typeof candidate.locked === 'boolean'
            && (!candidate.completed || candidate.locked)
            && Number.isInteger(candidate.score)
            && candidate.score === calculatedScore
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
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(stage3Questions.map(question => question.id)),
            optionOrders: Object.fromEntries(stage3Questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage3State(candidate) {
        const byId = new Map(stage3Questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage3Total || new Set(candidate.order).size !== stage3Total) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!candidate.optionOrders || !candidate.order.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        })) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            return question
                && Array.isArray(answers)
                && answers.length <= question.selectLimit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        })) return false;
        if (!candidate.locked || !Object.entries(candidate.locked).every(([id, locked]) => byId.has(id) && typeof locked === 'boolean')) return false;
        if (!candidate.awarded || !Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        })) return false;
        const awardedTotal = Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0);
        return Number.isInteger(candidate.current)
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
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(stage4Questions.map(question => question.id)),
            optionOrders: Object.fromEntries(stage4Questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage4State(candidate) {
        const byId = new Map(stage4Questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage4Total || new Set(candidate.order).size !== stage4Total) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!candidate.optionOrders || !candidate.order.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        })) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            return question
                && Array.isArray(answers)
                && answers.length <= question.selectLimit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        })) return false;
        if (!candidate.locked || !Object.entries(candidate.locked).every(([id, locked]) => byId.has(id) && typeof locked === 'boolean')) return false;
        if (!candidate.awarded || !Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        })) return false;
        const awardedTotal = Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0);
        return Number.isInteger(candidate.current)
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
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(stage5Questions.map(question => question.id)),
            optionOrders: Object.fromEntries(stage5Questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage5State(candidate) {
        const byId = new Map(stage5Questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage5Total || new Set(candidate.order).size !== stage5Total) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!candidate.optionOrders || !candidate.order.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrders[id];
            return Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        })) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answers]) => {
            const question = byId.get(id);
            return question
                && Array.isArray(answers)
                && answers.length <= question.selectLimit
                && new Set(answers).size === answers.length
                && answers.every(answer => question.options.includes(answer));
        })) return false;
        if (!candidate.locked || !Object.entries(candidate.locked).every(([id, locked]) => byId.has(id) && typeof locked === 'boolean')) return false;
        if (!candidate.awarded || !Object.entries(candidate.awarded).every(([id, marks]) => {
            const question = byId.get(id);
            return question && Number.isInteger(marks) && marks >= 0 && marks <= question.marks;
        })) return false;
        const awardedTotal = Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0);
        return Number.isInteger(candidate.current)
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
    let zoom = 1;
    let previousBodyOverflow = '';
    let activeSource = null;
    let cooldownTimerId = 0;

    function uniqueAttemptId() {
        if (window.crypto?.randomUUID) return window.crypto.randomUUID();
        const bytes = new Uint32Array(4);
        if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
        else for (let index = 0; index < bytes.length; index++) bytes[index] = Math.floor(Math.random() * 0xffffffff);
        return Array.from(bytes, value => value.toString(16).padStart(8, '0')).join('-');
    }

    function expeditionIsComplete() {
        return state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed;
    }

    function createAttemptLedger() {
        const activeAttemptId = uniqueAttemptId();
        const alreadyCompleted = expeditionIsComplete();
        return {
            version: 1,
            completedAttempts: alreadyCompleted ? 1 : 0,
            cooldownUntil: 0,
            activeAttemptId,
            lastCompletedAttemptId: alreadyCompleted ? activeAttemptId : ''
        };
    }

    function validAttemptLedger(candidate) {
        return candidate
            && candidate.version === 1
            && Number.isInteger(candidate.completedAttempts)
            && candidate.completedAttempts >= 0
            && candidate.completedAttempts <= expeditionAttemptLimit
            && Number.isFinite(candidate.cooldownUntil)
            && candidate.cooldownUntil >= 0
            && typeof candidate.activeAttemptId === 'string'
            && candidate.activeAttemptId.length > 0
            && typeof candidate.lastCompletedAttemptId === 'string';
    }

    function loadAttemptLedger() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(attemptStorageKey()) || 'null');
            if (validAttemptLedger(saved)) return saved;
        } catch {}
        return createAttemptLedger();
    }

    let attemptLedger = loadAttemptLedger();

    function hasOwn(record, key) {
        return Object.prototype.hasOwnProperty.call(record, key);
    }

    function saveState() {
        try {
            window.localStorage.setItem(storageKey(), JSON.stringify(state));
        } catch {}
    }

    function saveStage2State() {
        try {
            window.localStorage.setItem(stage2StorageKey(), JSON.stringify(stage2State));
        } catch {}
    }

    function saveStage3State() {
        try {
            window.localStorage.setItem(stage3StorageKey(), JSON.stringify(stage3State));
        } catch {}
    }

    function saveStage4State() {
        try {
            window.localStorage.setItem(stage4StorageKey(), JSON.stringify(stage4State));
        } catch {}
    }

    function saveStage5State() {
        try {
            window.localStorage.setItem(stage5StorageKey(), JSON.stringify(stage5State));
        } catch {}
    }

    function saveAttemptLedger() {
        try {
            window.localStorage.setItem(attemptStorageKey(), JSON.stringify(attemptLedger));
        } catch {}
    }

    function refreshExpiredCooldown() {
        if (!attemptLedger.cooldownUntil || Date.now() < attemptLedger.cooldownUntil) return false;
        attemptLedger.completedAttempts = 0;
        attemptLedger.cooldownUntil = 0;
        attemptLedger.lastCompletedAttemptId = attemptLedger.activeAttemptId;
        saveAttemptLedger();
        return true;
    }

    function recordExpeditionCompletion() {
        refreshExpiredCooldown();
        if (attemptLedger.lastCompletedAttemptId === attemptLedger.activeAttemptId) return;
        attemptLedger.completedAttempts = Math.min(expeditionAttemptLimit, attemptLedger.completedAttempts + 1);
        attemptLedger.lastCompletedAttemptId = attemptLedger.activeAttemptId;
        if (attemptLedger.completedAttempts >= expeditionAttemptLimit) {
            attemptLedger.cooldownUntil = Date.now() + expeditionCooldownMs;
        }
        saveAttemptLedger();
    }

    function formatCountdown(milliseconds) {
        const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return [hours, minutes, remainingSeconds].map(value => String(value).padStart(2, '0')).join(':');
    }

    function updateExpeditionLimitUI() {
        refreshExpiredCooldown();
        const coolingDown = attemptLedger.cooldownUntil > Date.now();
        elements.expeditionLimitPanel.classList.toggle('is-cooling', coolingDown);
        elements.expeditionCountdown.hidden = !coolingDown;
        elements.newExpedition.disabled = coolingDown;

        if (coolingDown) {
            elements.expeditionLimitTitle.textContent = 'Two expeditions completed';
            elements.expeditionLimitStatus.textContent = 'Your next two expeditions become available when this six-hour learning break ends.';
            elements.expeditionCountdown.textContent = formatCountdown(attemptLedger.cooldownUntil - Date.now());
            elements.newExpedition.textContent = 'New Expedition Locked';
            if (!cooldownTimerId) cooldownTimerId = window.setInterval(updateExpeditionLimitUI, 1000);
            return;
        }

        if (cooldownTimerId) {
            window.clearInterval(cooldownTimerId);
            cooldownTimerId = 0;
        }
        const remaining = expeditionAttemptLimit - attemptLedger.completedAttempts;
        elements.expeditionLimitTitle.textContent = remaining === 1 ? 'One new expedition remains' : 'Two new expeditions are available';
        elements.expeditionLimitStatus.textContent = remaining === 1
            ? 'Your next completion will begin a six-hour learning break.'
            : 'Each new expedition reshuffles the questions and answer options.';
        elements.newExpedition.textContent = 'Start a New Expedition';
    }

    function resetStageMap() {
        elements.stage1Node.className = 'stage-node active';
        elements.stage1Node.setAttribute('aria-current', 'step');
        elements.stage1Status.textContent = 'Available now';
        [
            [elements.stage2Node, elements.stage2Status, 'Complete Stage 1 to unlock'],
            [elements.stage3Node, elements.stage3Status, 'Locked'],
            [elements.stage4Node, elements.stage4Status, 'Locked'],
            [elements.stage5Node, elements.stage5Status, 'Locked'],
            [elements.stage6Node, elements.stage6Status, 'Locked']
        ].forEach(([node, status, message]) => {
            node.className = 'stage-node locked' + (node === elements.stage6Node ? ' summary-stage' : '');
            node.removeAttribute('aria-current');
            status.textContent = message;
        });
    }

    function startNewExpedition() {
        refreshExpiredCooldown();
        if (attemptLedger.cooldownUntil > Date.now()) {
            updateExpeditionLimitUI();
            return;
        }
        if (!window.confirm('Start a new shuffled expedition? Your completed score will remain in certificate history, but the five game stages will restart.')) return;

        state = createState();
        stage2State = createStage2State();
        stage3State = createStage3State();
        stage4State = createStage4State();
        stage5State = createStage5State();
        attemptLedger.activeAttemptId = uniqueAttemptId();
        saveState();
        saveStage2State();
        saveStage3State();
        saveStage4State();
        saveStage5State();
        saveAttemptLedger();
        window.MayHubCertificates?.hide?.();
        elements.resumeNote.textContent = 'A fresh expedition is ready with reshuffled questions and answer choices.';
        resetStageMap();
        showScreen('intro');
    }

    function currentDefinition() {
        const id = state.order[state.current];
        return definitions.find(definition => definition.id === id);
    }

    function currentTermOrder() {
        const definition = currentDefinition();
        return definition ? state.termOrders[definition.id] : [];
    }

    function showScreen(name) {
        elements.intro.hidden = name !== 'intro';
        elements.game.hidden = name !== 'game';
        elements.result.hidden = name !== 'result';
        elements.stage2Screen.hidden = name !== 'stage2';
        elements.stage2Result.hidden = name !== 'stage2Result';
        elements.stage3Screen.hidden = name !== 'stage3';
        elements.stage3Result.hidden = name !== 'stage3Result';
        elements.stage4Screen.hidden = name !== 'stage4';
        elements.stage4Result.hidden = name !== 'stage4Result';
        elements.stage5Screen.hidden = name !== 'stage5';
        elements.stage5Result.hidden = name !== 'stage5Result';
        elements.stage6Screen.hidden = name !== 'stage6';
        activeSource = (name === 'stage3' || name === 'stage3Result')
            ? stage3Data
            : ((name === 'stage4' || name === 'stage4Result')
                ? stage4Data
                : ((name === 'stage5' || name === 'stage5Result') ? stage5Data : null));
        elements.sourceButton.hidden = !activeSource;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function moveTerm(direction) {
        const definition = currentDefinition();
        if (!definition || hasOwn(state.answers, definition.id)) return;
        const order = currentTermOrder();
        state.positions[definition.id] = (state.positions[definition.id] + direction + order.length) % order.length;
        saveState();
        renderQuestion();
    }

    function chooseTerm() {
        const definition = currentDefinition();
        if (suppressNextSelection) {
            suppressNextSelection = false;
            return;
        }
        if (!definition || hasOwn(state.answers, definition.id)) return;
        const order = currentTermOrder();
        const selected = order[state.positions[definition.id]];
        const correct = selected === definition.answer;
        state.answers[definition.id] = selected;
        state.awarded[definition.id] = correct ? 1 : 0;
        state.score = Object.values(state.awarded).reduce((sum, mark) => sum + mark, 0);
        saveState();
        if (correct) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderQuestion();
    }

    function renderQuestion() {
        const definition = currentDefinition();
        if (!definition) return;
        const order = currentTermOrder();
        const position = state.positions[definition.id];
        const selected = state.answers[definition.id];
        const locked = hasOwn(state.answers, definition.id);
        const candidate = order[position];

        elements.score.textContent = String(state.score);
        elements.progress.style.width = ((state.current + (locked ? 1 : 0)) / totalQuestions * 100) + '%';
        elements.counter.textContent = 'Movement ' + (state.current + 1) + ' of ' + totalQuestions;
        elements.prompt.textContent = definition.prompt;
        elements.candidateTerm.textContent = candidate;
        elements.carouselPosition.textContent = 'Term ' + (position + 1) + ' of ' + order.length;
        elements.previousTerm.disabled = locked;
        elements.nextTerm.disabled = locked;
        elements.termCard.disabled = locked;
        elements.termCard.className = 'term-card';

        if (locked && selected === definition.answer) elements.termCard.classList.add('correct');
        else if (locked) elements.termCard.classList.add('wrong');

        elements.feedback.hidden = !locked;
        elements.next.hidden = !locked;
        if (locked) {
            const correct = selected === definition.answer;
            elements.feedback.className = 'feedback-panel ' + (correct ? 'correct' : 'wrong');
            elements.feedbackTitle.textContent = correct ? 'Compass point secured' : 'Route correction';
            elements.feedbackText.textContent = correct
                ? definition.feedback
                : 'The correct term is ' + definition.answer + '. ' + definition.feedback;
            elements.next.textContent = state.current === totalQuestions - 1 ? 'Complete Stage 1' : 'Next Movement';
        }
    }

    function beginStage() {
        state.started = true;
        saveState();
        showScreen('game');
        renderQuestion();
    }

    function nextQuestion() {
        const definition = currentDefinition();
        if (!definition || !hasOwn(state.answers, definition.id)) return;
        state.current += 1;
        saveState();
        if (state.current >= totalQuestions) completeStage();
        else renderQuestion();
    }

    function completionCopy(percentage) {
        if (percentage === 100) return ['Migration compass mastered', 'Every movement and migration term was identified perfectly.'];
        if (percentage >= 80) return ['Excellent route reading', 'You showed an excellent command of the main migration concepts.'];
        if (percentage >= 50) return ['First route secured', 'Your migration foundations are sound and the Population Expedition is under way.'];
        return ['Compass needs recalibration', 'Revisit immigration, emigration and the different scales of migration before the next route.'];
    }

    function completeStage(playCompletionSound = true) {
        state.completed = true;
        state.current = totalQuestions;
        saveState();
        const percentage = Math.round(state.score / totalQuestions * 100);
        const [title, message] = completionCopy(percentage);
        elements.resultScore.textContent = state.score + '/' + totalQuestions;
        elements.resultTitle.textContent = title;
        elements.resultMessage.textContent = message;
        elements.resultCorrect.textContent = String(state.score);
        elements.resultPercent.textContent = percentage + '%';
        elements.stage1Node.className = 'stage-node completed';
        elements.stage1Node.removeAttribute('aria-current');
        elements.stage1Status.textContent = 'Complete: ' + state.score + '/' + totalQuestions;
        elements.stage2Node.className = 'stage-node available';
        elements.stage2Status.textContent = 'Available now';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('result');
    }

    function stage2Description(id) {
        return stage2Descriptions.find(description => description.id === id);
    }

    function stage2TermLabel(term) {
        const index = stage2State.termOrder.indexOf(term);
        return String.fromCharCode(65 + index) + ': ' + term;
    }

    function renderStage2Bank() {
        elements.columnBBank.replaceChildren();
        stage2State.termOrder.forEach((term, index) => {
            const item = document.createElement('div');
            item.className = 'column-b-term';
            const code = document.createElement('strong');
            code.textContent = String.fromCharCode(65 + index);
            const label = document.createElement('span');
            label.textContent = term;
            item.append(code, label);
            elements.columnBBank.appendChild(item);
        });
    }

    function updateStage2Answer(descriptionId, term) {
        if (stage2State.locked) return;
        if (term) stage2State.answers[descriptionId] = term;
        else delete stage2State.answers[descriptionId];
        saveStage2State();
        renderStage2();
    }

    function renderStage2() {
        const selectedTerms = new Set(Object.values(stage2State.answers));
        const completedMatches = Object.keys(stage2State.answers).length;
        elements.stage2Score.textContent = String(stage2State.locked ? stage2State.score : 0);
        elements.stage2SelectionCount.textContent = completedMatches + ' of ' + stage2Total + ' matched';
        elements.stage2Progress.style.width = (completedMatches / stage2Total * 100) + '%';
        renderStage2Bank();
        elements.stage2Rows.replaceChildren();

        stage2State.order.forEach((id, index) => {
            const description = stage2Description(id);
            const selected = stage2State.answers[id] || '';
            const correct = selected === description.answer;
            const row = document.createElement('tr');
            if (stage2State.locked) row.className = correct ? 'is-correct' : 'is-wrong';

            const descriptionCell = document.createElement('td');
            descriptionCell.dataset.label = 'Column A: Description';
            const descriptionWrap = document.createElement('div');
            descriptionWrap.className = 'match-description';
            const rowNumber = document.createElement('strong');
            rowNumber.textContent = String(index + 1);
            const prompt = document.createElement('p');
            prompt.textContent = description.prompt;
            descriptionWrap.append(rowNumber, prompt);
            descriptionCell.appendChild(descriptionWrap);

            const answerCell = document.createElement('td');
            answerCell.dataset.label = 'Column B: Your Match';
            if (stage2State.locked) {
                const answer = document.createElement('span');
                answer.className = 'match-answer';
                answer.textContent = stage2TermLabel(selected);
                answerCell.appendChild(answer);
                if (!correct) {
                    const correction = document.createElement('small');
                    correction.className = 'match-correction';
                    correction.textContent = 'Correct match: ' + stage2TermLabel(description.answer);
                    answerCell.appendChild(correction);
                }
            } else {
                const select = document.createElement('select');
                select.className = 'match-select';
                select.setAttribute('aria-label', 'Match for: ' + description.prompt);
                const placeholder = document.createElement('option');
                placeholder.value = '';
                placeholder.textContent = 'Choose a Column B term';
                select.appendChild(placeholder);
                stage2State.termOrder.forEach(term => {
                    const option = document.createElement('option');
                    option.value = term;
                    option.textContent = stage2TermLabel(term);
                    option.disabled = selectedTerms.has(term) && selected !== term;
                    option.selected = selected === term;
                    select.appendChild(option);
                });
                select.addEventListener('change', event => updateStage2Answer(id, event.target.value));
                answerCell.appendChild(select);
            }

            row.append(descriptionCell, answerCell);
            elements.stage2Rows.appendChild(row);
        });

        elements.checkStage2.disabled = completedMatches !== stage2Total || stage2State.locked;
        elements.checkStage2.hidden = stage2State.locked;
        elements.checkStage2.textContent = completedMatches === stage2Total ? 'Check My Table' : 'Complete all ' + (stage2Total - completedMatches) + ' remaining matches';
        elements.stage2Feedback.hidden = !stage2State.locked;
        elements.stage2Next.hidden = !stage2State.locked;
        if (stage2State.locked) {
            const percentage = Math.round(stage2State.score / stage2Total * 100);
            elements.stage2Feedback.className = 'feedback-panel ' + (percentage >= 50 ? 'correct' : 'wrong');
            elements.stage2FeedbackTitle.textContent = percentage === 100 ? 'Table mastered' : 'Table checked';
            elements.stage2FeedbackText.textContent = 'You matched ' + stage2State.score + ' of ' + stage2Total + ' descriptions correctly. The table now shows any corrections.';
        }
    }

    function beginStage2() {
        if (!state.completed) return;
        stage2State.started = true;
        saveStage2State();
        elements.stage2Node.className = 'stage-node active';
        elements.stage2Node.setAttribute('aria-current', 'step');
        elements.stage2Status.textContent = 'In progress';
        showScreen('stage2');
        renderStage2();
    }

    function checkStage2Table() {
        if (stage2State.locked || Object.keys(stage2State.answers).length !== stage2Total) return;
        stage2State.score = stage2State.order.filter(id => stage2State.answers[id] === stage2Description(id).answer).length;
        stage2State.locked = true;
        saveStage2State();
        if (stage2State.score === stage2Total) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage2();
    }

    function stage2CompletionCopy(percentage) {
        if (percentage === 100) return ['Population table mastered', 'Every description was matched to the correct population term.'];
        if (percentage >= 80) return ['Excellent signal reading', 'You matched the population measures and migration factors with excellent accuracy.'];
        if (percentage >= 50) return ['Second route secured', 'The main population signals are in place; review the corrected rows before the pyramid route.'];
        return ['Signals need rematching', 'Review density, distribution, population measures and migration factors before moving on.'];
    }

    function completeStage2(playCompletionSound = true) {
        if (!stage2State.locked) return;
        stage2State.completed = true;
        saveStage2State();
        const percentage = Math.round(stage2State.score / stage2Total * 100);
        const [title, message] = stage2CompletionCopy(percentage);
        elements.stage2ResultScore.textContent = stage2State.score + '/' + stage2Total;
        elements.stage2ResultTitle.textContent = title;
        elements.stage2ResultMessage.textContent = message;
        elements.stage2ResultCorrect.textContent = String(stage2State.score);
        elements.stage2ResultPercent.textContent = percentage + '%';
        elements.stage2OverallScore.textContent = (state.score + stage2State.score) + '/' + (totalQuestions + stage2Total);
        elements.stage1Node.className = 'stage-node completed';
        elements.stage1Status.textContent = 'Complete: ' + state.score + '/' + totalQuestions;
        elements.stage2Node.className = 'stage-node completed';
        elements.stage2Node.removeAttribute('aria-current');
        elements.stage2Status.textContent = 'Complete: ' + stage2State.score + '/' + stage2Total;
        elements.stage3Node.className = 'stage-node available';
        elements.stage3Status.textContent = 'Available now';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage2Result');
    }

    function currentStage3Question() {
        const id = stage3State.order[stage3State.current];
        return stage3Questions.find(question => question.id === id);
    }

    function beginStage3() {
        if (!stage2State.completed) return;
        stage3State.started = true;
        saveStage3State();
        elements.stage3Node.className = 'stage-node active';
        elements.stage3Node.setAttribute('aria-current', 'step');
        elements.stage3Status.textContent = 'In progress';
        showScreen('stage3');
        renderStage3();
    }

    function chooseStage3Option(option) {
        const question = currentStage3Question();
        if (!question || stage3State.locked[question.id]) return;
        const selected = stage3State.answers[question.id] || [];
        if (question.mode === 'single') {
            stage3State.answers[question.id] = [option];
            lockStage3Question();
            return;
        }
        const nextSelected = selected.includes(option)
            ? selected.filter(value => value !== option)
            : (selected.length < question.selectLimit ? [...selected, option] : selected);
        stage3State.answers[question.id] = nextSelected;
        saveStage3State();
        renderStage3();
    }

    function scoreStage3Question(question, selected) {
        if (question.mode === 'single') {
            return question.correctAnswers.includes(selected[0]) ? question.marks : 0;
        }
        const correctSelections = selected.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
    }

    function lockStage3Question() {
        const question = currentStage3Question();
        if (!question || stage3State.locked[question.id]) return;
        const selected = stage3State.answers[question.id] || [];
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage3Question(question, selected);
        stage3State.locked[question.id] = true;
        stage3State.awarded[question.id] = awarded;
        stage3State.score = Object.values(stage3State.awarded).reduce((sum, marks) => sum + marks, 0);
        saveStage3State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage3();
    }

    function renderStage3() {
        const question = currentStage3Question();
        if (!question) return;
        const selected = stage3State.answers[question.id] || [];
        const optionOrder = stage3State.optionOrders[question.id];
        const locked = Boolean(stage3State.locked[question.id]);
        const awarded = stage3State.awarded[question.id] || 0;

        elements.stage3Score.textContent = String(stage3State.score);
        elements.stage3Progress.style.width = ((stage3State.current + (locked ? 1 : 0)) / stage3Total * 100) + '%';
        elements.stage3Counter.textContent = 'Challenge ' + (stage3State.current + 1) + ' of ' + stage3Total;
        elements.stage3Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage3Prompt.textContent = question.prompt;
        elements.stage3Instruction.textContent = question.instruction;
        elements.stage3Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = locked;
            if (locked && isCorrect) button.classList.add('correct');
            else if (locked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = locked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage3Option(option));
            elements.stage3Answers.appendChild(button);
        });

        elements.confirmStage3.hidden = question.mode !== 'multiple' || locked;
        elements.confirmStage3.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage3.textContent = selected.length === question.selectLimit
                ? 'Lock ' + question.selectLimit + ' Choices'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage3Feedback.hidden = !locked;
        elements.stage3Next.hidden = !locked;
        if (locked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage3Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage3FeedbackTitle.textContent = awarded === question.marks
                ? 'Pyramid clue secured'
                : (awarded > 0 ? 'Partial clue secured' : 'Pyramid correction');
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

    function stage3CompletionCopy(percentage) {
        if (percentage === 100) return ['Population pyramid mastered', 'You interpreted every age, sex, mortality and planning signal perfectly.'];
        if (percentage >= 80) return ['Excellent pyramid reading', 'You interpreted the regenerated population pyramid with excellent geographical judgement.'];
        if (percentage >= 50) return ['Third route secured', 'You understand the main population-pyramid patterns and their planning value.'];
        return ['Pyramid needs another reading', 'Revisit population structure, mortality, life expectancy and government planning before the next route.'];
    }

    function completeStage3(playCompletionSound = true) {
        stage3State.completed = true;
        stage3State.current = stage3Total;
        saveStage3State();
        const percentage = Math.round(stage3State.score / stage3TotalMarks * 100);
        const [title, message] = stage3CompletionCopy(percentage);
        elements.stage3ResultScore.textContent = stage3State.score + '/' + stage3TotalMarks;
        elements.stage3ResultTitle.textContent = title;
        elements.stage3ResultMessage.textContent = message;
        elements.stage3ResultMarks.textContent = String(stage3State.score);
        elements.stage3ResultPercent.textContent = percentage + '%';
        elements.stage3OverallScore.textContent = (state.score + stage2State.score + stage3State.score) + '/' + (totalQuestions + stage2Total + stage3TotalMarks);
        elements.stage1Node.className = 'stage-node completed';
        elements.stage1Status.textContent = 'Complete: ' + state.score + '/' + totalQuestions;
        elements.stage2Node.className = 'stage-node completed';
        elements.stage2Status.textContent = 'Complete: ' + stage2State.score + '/' + stage2Total;
        elements.stage3Node.className = 'stage-node completed';
        elements.stage3Node.removeAttribute('aria-current');
        elements.stage3Status.textContent = 'Complete: ' + stage3State.score + '/' + stage3TotalMarks;
        elements.stage4Node.className = 'stage-node available';
        elements.stage4Status.textContent = 'Coming next';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage3Result');
    }

    function currentStage4Question() {
        const id = stage4State.order[stage4State.current];
        return stage4Questions.find(question => question.id === id);
    }

    function beginStage4() {
        if (!stage3State.completed) return;
        stage4State.started = true;
        saveStage4State();
        elements.stage4Node.className = 'stage-node active';
        elements.stage4Node.setAttribute('aria-current', 'step');
        elements.stage4Status.textContent = 'In progress';
        showScreen('stage4');
        renderStage4();
    }

    function chooseStage4Option(option) {
        const question = currentStage4Question();
        if (!question || stage4State.locked[question.id]) return;
        const selected = stage4State.answers[question.id] || [];
        if (question.mode === 'single') {
            stage4State.answers[question.id] = [option];
            lockStage4Question();
            return;
        }
        const nextSelected = selected.includes(option)
            ? selected.filter(value => value !== option)
            : (selected.length < question.selectLimit ? [...selected, option] : selected);
        stage4State.answers[question.id] = nextSelected;
        saveStage4State();
        renderStage4();
    }

    function scoreStage4Question(question, selected) {
        if (question.mode === 'single') {
            return question.correctAnswers.includes(selected[0]) ? question.marks : 0;
        }
        const correctSelections = selected.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
    }

    function lockStage4Question() {
        const question = currentStage4Question();
        if (!question || stage4State.locked[question.id]) return;
        const selected = stage4State.answers[question.id] || [];
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage4Question(question, selected);
        stage4State.locked[question.id] = true;
        stage4State.awarded[question.id] = awarded;
        stage4State.score = Object.values(stage4State.awarded).reduce((sum, marks) => sum + marks, 0);
        saveStage4State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage4();
    }

    function renderStage4() {
        const question = currentStage4Question();
        if (!question) return;
        const selected = stage4State.answers[question.id] || [];
        const optionOrder = stage4State.optionOrders[question.id];
        const locked = Boolean(stage4State.locked[question.id]);
        const awarded = stage4State.awarded[question.id] || 0;

        elements.stage4Score.textContent = String(stage4State.score);
        elements.stage4Progress.style.width = ((stage4State.current + (locked ? 1 : 0)) / stage4Total * 100) + '%';
        elements.stage4Counter.textContent = 'Challenge ' + (stage4State.current + 1) + ' of ' + stage4Total;
        elements.stage4Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage4Prompt.textContent = question.prompt;
        elements.stage4Instruction.textContent = question.instruction;
        elements.stage4Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = locked;
            if (locked && isCorrect) button.classList.add('correct');
            else if (locked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = locked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage4Option(option));
            elements.stage4Answers.appendChild(button);
        });

        elements.confirmStage4.hidden = question.mode !== 'multiple' || locked;
        elements.confirmStage4.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage4.textContent = selected.length === question.selectLimit
                ? 'Lock ' + question.selectLimit + ' Choices'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage4Feedback.hidden = !locked;
        elements.stage4Next.hidden = !locked;
        if (locked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage4Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage4FeedbackTitle.textContent = awarded === question.marks
                ? 'Balance clue secured'
                : (awarded > 0 ? 'Partial clue secured' : 'Balance correction');
            elements.stage4FeedbackText.textContent = 'You earned ' + awarded + ' of ' + question.marks + ' marks. ' + question.feedback;
            elements.stage4Next.textContent = stage4State.current === stage4Total - 1 ? 'Complete Stage 4' : 'Next Challenge';
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

    function stage4CompletionCopy(percentage) {
        if (percentage === 100) return ['Population balance mastered', 'You interpreted every rate, calculation and distribution factor with precision.'];
        if (percentage >= 80) return ['Excellent ledger reading', 'You used the population-change data with excellent geographical judgement.'];
        if (percentage >= 50) return ['Fourth route secured', 'You understand how births, deaths, natural increase and settlement factors connect.'];
        return ['Balance needs another look', 'Revisit population rates, natural increase and the factors shaping where people settle.'];
    }

    function completeStage4(playCompletionSound = true) {
        stage4State.completed = true;
        stage4State.current = stage4Total;
        saveStage4State();
        const percentage = Math.round(stage4State.score / stage4TotalMarks * 100);
        const [title, message] = stage4CompletionCopy(percentage);
        elements.stage4ResultScore.textContent = stage4State.score + '/' + stage4TotalMarks;
        elements.stage4ResultTitle.textContent = title;
        elements.stage4ResultMessage.textContent = message;
        elements.stage4ResultMarks.textContent = String(stage4State.score);
        elements.stage4ResultPercent.textContent = percentage + '%';
        elements.stage4OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score) + '/' + (totalQuestions + stage2Total + stage3TotalMarks + stage4TotalMarks);
        elements.stage1Node.className = 'stage-node completed';
        elements.stage1Status.textContent = 'Complete: ' + state.score + '/' + totalQuestions;
        elements.stage2Node.className = 'stage-node completed';
        elements.stage2Status.textContent = 'Complete: ' + stage2State.score + '/' + stage2Total;
        elements.stage3Node.className = 'stage-node completed';
        elements.stage3Status.textContent = 'Complete: ' + stage3State.score + '/' + stage3TotalMarks;
        elements.stage4Node.className = 'stage-node completed';
        elements.stage4Node.removeAttribute('aria-current');
        elements.stage4Status.textContent = 'Complete: ' + stage4State.score + '/' + stage4TotalMarks;
        elements.stage5Node.className = 'stage-node available';
        elements.stage5Status.textContent = 'Coming next';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage4Result');
    }

    function currentStage5Question() {
        const id = stage5State.order[stage5State.current];
        return stage5Questions.find(question => question.id === id);
    }

    function beginStage5() {
        if (!stage4State.completed) return;
        stage5State.started = true;
        saveStage5State();
        elements.stage5Node.className = 'stage-node active';
        elements.stage5Node.setAttribute('aria-current', 'step');
        elements.stage5Status.textContent = 'In progress';
        showScreen('stage5');
        renderStage5();
    }

    function chooseStage5Option(option) {
        const question = currentStage5Question();
        if (!question || stage5State.locked[question.id]) return;
        const selected = stage5State.answers[question.id] || [];
        if (question.mode === 'single') {
            stage5State.answers[question.id] = [option];
            lockStage5Question();
            return;
        }
        const nextSelected = selected.includes(option)
            ? selected.filter(value => value !== option)
            : (selected.length < question.selectLimit ? [...selected, option] : selected);
        stage5State.answers[question.id] = nextSelected;
        saveStage5State();
        renderStage5();
    }

    function scoreStage5Question(question, selected) {
        if (question.mode === 'single') {
            return question.correctAnswers.includes(selected[0]) ? question.marks : 0;
        }
        const correctSelections = selected.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections * question.pointsPerCorrect);
    }

    function lockStage5Question() {
        const question = currentStage5Question();
        if (!question || stage5State.locked[question.id]) return;
        const selected = stage5State.answers[question.id] || [];
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage5Question(question, selected);
        stage5State.locked[question.id] = true;
        stage5State.awarded[question.id] = awarded;
        stage5State.score = Object.values(stage5State.awarded).reduce((sum, marks) => sum + marks, 0);
        saveStage5State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage5();
    }

    function renderStage5() {
        const question = currentStage5Question();
        if (!question) return;
        const selected = stage5State.answers[question.id] || [];
        const optionOrder = stage5State.optionOrders[question.id];
        const locked = Boolean(stage5State.locked[question.id]);
        const awarded = stage5State.awarded[question.id] || 0;

        elements.stage5Score.textContent = String(stage5State.score);
        elements.stage5Progress.style.width = ((stage5State.current + (locked ? 1 : 0)) / stage5Total * 100) + '%';
        elements.stage5Counter.textContent = 'Challenge ' + (stage5State.current + 1) + ' of ' + stage5Total;
        elements.stage5Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage5Prompt.textContent = question.prompt;
        elements.stage5Instruction.textContent = question.instruction;
        elements.stage5Answers.replaceChildren();

        optionOrder.forEach(option => {
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'route-option';
            button.disabled = locked;
            if (locked && isCorrect) button.classList.add('correct');
            else if (locked && isSelected) button.classList.add('wrong');
            else if (isSelected) button.classList.add('selected');
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.setAttribute('aria-hidden', 'true');
            marker.textContent = locked ? (isCorrect ? '\u2713' : (isSelected ? '\u00d7' : '')) : (isSelected ? '\u2713' : '');
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage5Option(option));
            elements.stage5Answers.appendChild(button);
        });

        elements.confirmStage5.hidden = question.mode !== 'multiple' || locked;
        elements.confirmStage5.disabled = selected.length !== question.selectLimit;
        if (question.mode === 'multiple') {
            elements.confirmStage5.textContent = selected.length === question.selectLimit
                ? 'Lock ' + question.selectLimit + ' Choices'
                : 'Select ' + (question.selectLimit - selected.length) + ' More';
        }

        elements.stage5Feedback.hidden = !locked;
        elements.stage5Next.hidden = !locked;
        if (locked) {
            const resultClass = awarded === question.marks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong');
            elements.stage5Feedback.className = 'feedback-panel ' + resultClass;
            elements.stage5FeedbackTitle.textContent = awarded === question.marks
                ? 'Journey clue secured'
                : (awarded > 0 ? 'Partial clue secured' : 'Journey correction');
            elements.stage5FeedbackText.textContent = 'You earned ' + awarded + ' of ' + question.marks + ' marks. ' + question.feedback;
            elements.stage5Next.textContent = stage5State.current === stage5Total - 1 ? 'Complete Stage 5' : 'Next Challenge';
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

    function stage5CompletionCopy(percentage) {
        if (percentage === 100) return ['Rural-urban journey mastered', 'You connected migration, employment, farming and rural community impacts with precision.'];
        if (percentage >= 80) return ['Excellent journey reading', 'You interpreted the rural-urban source and its human impacts with strong geographical judgement.'];
        if (percentage >= 50) return ['Fifth route secured', 'You understand why people migrate to towns and cities and how rural communities can be affected.'];
        return ['Journey needs another look', 'Revisit the meaning of rural-urban migration, economic pull factors and its effects on rural areas.'];
    }

    function fullExpeditionScore() {
        return state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score;
    }

    const stagePerformanceComments = [
        ['Migration vocabulary mastered with precision.', 'Strong understanding of migration concepts.', 'The main migration terms are secure.', 'Give migration terminology more attention.'],
        ['Population indicators matched accurately.', 'Strong understanding of population signals.', 'The key population terms are secure.', 'Spend more time with population indicators and definitions.'],
        ['Excellent population-pyramid interpretation.', 'Strong analysis of population structure and planning.', 'The core population-pyramid ideas are secure.', 'Strengthen your reading of population structure and planning.'],
        ['Population-change evidence interpreted expertly.', 'Strong analysis of birth, death and distribution patterns.', 'The main population-balance ideas are secure.', 'Give population rates and distribution factors more attention.'],
        ['Excellent rural-urban migration judgement.', 'Strong understanding of urban pull factors and rural impacts.', 'The key rural-urban migration ideas are secure.', 'Strengthen the effects of migration on rural communities.']
    ];

    function stagePerformanceComment(stageIndex, percentage) {
        const comments = stagePerformanceComments[stageIndex];
        if (percentage === 100) return comments[0];
        if (percentage >= 80) return comments[1];
        if (percentage >= 50) return comments[2];
        return comments[3];
    }

    function expeditionSummaryCopy(percentage) {
        if (percentage === 100) return ['Population expedition mastered', 'Perfect performance across all five Grade 10 Geography stages.'];
        if (percentage >= 80) return ['Exceptional population expedition', 'You demonstrated an excellent command of the Term 3 Geography assessment themes.'];
        if (percentage >= 50) return ['Population expedition completed', 'You have a sound overall understanding of the five assessed population themes.'];
        return ['Expedition completed', 'Your stage profile shows which Grade 10 Geography themes need the most attention before the assessment.'];
    }

    function showFinalCertificate(playSound = true) {
        if (!window.MayHubCertificates) {
            window.alert('The certificate system is unavailable. Please refresh the page and try again.');
            return false;
        }
        window.MayHubCertificates.showScored({
            correct: fullExpeditionScore(),
            total: expeditionTotalMarks,
            category: 'Five-Stage Population Expedition',
            completionId: 'grade10-geoquest-' + attemptLedger.activeAttemptId,
            playSound
        });
        return true;
    }

    function showExpeditionSummary(openCertificate = true) {
        if (!expeditionIsComplete()) return;
        const totalScore = fullExpeditionScore();
        const overallPercentage = Math.round(totalScore / expeditionTotalMarks * 100);
        const [title, message] = expeditionSummaryCopy(overallPercentage);
        elements.stage6ResultTitle.textContent = title;
        elements.stage6ResultMessage.textContent = 'Your complete performance profile across the five assessed Grade 10 Geography stages.';
        elements.finalExpeditionScore.textContent = totalScore + '/' + expeditionTotalMarks;
        elements.grandTotalPercent.textContent = overallPercentage + '%';
        elements.grandTotalComment.textContent = message;

        const stageResults = [
            [state.score, totalQuestions],
            [stage2State.score, stage2Total],
            [stage3State.score, stage3TotalMarks],
            [stage4State.score, stage4TotalMarks],
            [stage5State.score, stage5TotalMarks]
        ];
        stageResults.forEach(([score, total], index) => {
            const percentage = Math.round(score / total * 100);
            const [scoreElement, percentElement, commentElement] = elements.finalStageScores[index];
            scoreElement.textContent = score + '/' + total;
            percentElement.textContent = percentage + '%';
            commentElement.textContent = stagePerformanceComment(index, percentage);
        });

        elements.stage6Node.className = 'stage-node active summary-stage';
        elements.stage6Node.setAttribute('aria-current', 'step');
        elements.stage6Status.textContent = 'Viewing final results';
        showScreen('stage6');
        updateExpeditionLimitUI();
        if (openCertificate) {
            if (overallPercentage >= 50) window.MayHubSounds?.playPass?.();
            else window.MayHubSounds?.playFail?.();
            window.setTimeout(() => {
                showFinalCertificate(false);
            }, 450);
        }
    }

    function completeStage5(playCompletionSound = true) {
        stage5State.completed = true;
        stage5State.current = stage5Total;
        saveStage5State();
        recordExpeditionCompletion();
        const percentage = Math.round(stage5State.score / stage5TotalMarks * 100);
        const [title, message] = stage5CompletionCopy(percentage);
        elements.stage5ResultScore.textContent = stage5State.score + '/' + stage5TotalMarks;
        elements.stage5ResultTitle.textContent = title;
        elements.stage5ResultMessage.textContent = message;
        elements.stage5ResultMarks.textContent = String(stage5State.score);
        elements.stage5ResultPercent.textContent = percentage + '%';
        elements.stage5OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score) + '/' + (totalQuestions + stage2Total + stage3TotalMarks + stage4TotalMarks + stage5TotalMarks);
        elements.stage1Node.className = 'stage-node completed';
        elements.stage1Status.textContent = 'Complete: ' + state.score + '/' + totalQuestions;
        elements.stage2Node.className = 'stage-node completed';
        elements.stage2Status.textContent = 'Complete: ' + stage2State.score + '/' + stage2Total;
        elements.stage3Node.className = 'stage-node completed';
        elements.stage3Status.textContent = 'Complete: ' + stage3State.score + '/' + stage3TotalMarks;
        elements.stage4Node.className = 'stage-node completed';
        elements.stage4Status.textContent = 'Complete: ' + stage4State.score + '/' + stage4TotalMarks;
        elements.stage5Node.className = 'stage-node completed';
        elements.stage5Node.removeAttribute('aria-current');
        elements.stage5Status.textContent = 'Complete: ' + stage5State.score + '/' + stage5TotalMarks;
        elements.stage6Node.className = 'stage-node available summary-stage';
        elements.stage6Status.textContent = 'Summary ready';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage5Result');
    }

    function updateZoom(nextZoom) {
        zoom = Math.min(2.5, Math.max(.75, Math.round(nextZoom * 100) / 100));
        elements.sourceImage.style.width = (zoom * 100) + '%';
        elements.zoomValue.textContent = Math.round(zoom * 100) + '%';
        if (zoom === 1) elements.sourceViewport.scrollTo({ top: 0, left: 0 });
    }

    function openSource() {
        if (!activeSource) return;
        elements.sourceTitle.textContent = activeSource.sourceTitle;
        elements.sourceImage.src = activeSource.sourceImage;
        elements.sourceImage.alt = activeSource.sourceAlt;
        updateZoom(1);
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        elements.sourceOverlay.hidden = false;
        elements.closeSource.focus();
    }

    function closeSource() {
        elements.sourceOverlay.hidden = true;
        document.body.style.overflow = previousBodyOverflow;
        elements.sourceButton.focus();
    }

    function initialise() {
        if (terms.length !== 8 || definitions.length !== 7 || new Set(terms).size !== terms.length) {
            elements.intro.querySelector('.intro-copy').textContent = 'Stage 1 could not be loaded. Please refresh the page.';
            elements.begin.disabled = true;
            return;
        }
        if (stage2Terms.length !== 8 || stage2Descriptions.length !== 8 || new Set(stage2Terms).size !== stage2Terms.length) {
            elements.continueStage2.disabled = true;
            elements.continueStage2.textContent = 'Stage 2 unavailable';
        }
        if (stage3Total !== 5 || stage3TotalMarks !== 15) {
            elements.continueStage3.disabled = true;
            elements.continueStage3.textContent = 'Stage 3 unavailable';
        }
        if (stage4Total !== 6 || stage4TotalMarks !== 15) {
            elements.continueStage4.disabled = true;
            elements.continueStage4.textContent = 'Stage 4 unavailable';
        }
        if (stage5Total !== 5 || stage5TotalMarks !== 15) {
            elements.continueStage5.disabled = true;
            elements.continueStage5.textContent = 'Stage 5 unavailable';
        }

        elements.begin.addEventListener('click', beginStage);
        elements.previousTerm.addEventListener('click', () => moveTerm(-1));
        elements.nextTerm.addEventListener('click', () => moveTerm(1));
        elements.termCard.addEventListener('click', chooseTerm);
        elements.next.addEventListener('click', nextQuestion);
        elements.continueStage2.addEventListener('click', beginStage2);
        elements.checkStage2.addEventListener('click', checkStage2Table);
        elements.stage2Next.addEventListener('click', () => completeStage2(true));
        elements.continueStage3.addEventListener('click', beginStage3);
        elements.confirmStage3.addEventListener('click', lockStage3Question);
        elements.stage3Next.addEventListener('click', nextStage3Question);
        elements.continueStage4.addEventListener('click', beginStage4);
        elements.confirmStage4.addEventListener('click', lockStage4Question);
        elements.stage4Next.addEventListener('click', nextStage4Question);
        elements.continueStage5.addEventListener('click', beginStage5);
        elements.confirmStage5.addEventListener('click', lockStage5Question);
        elements.stage5Next.addEventListener('click', nextStage5Question);
        elements.continueStage6.addEventListener('click', () => showExpeditionSummary(true));
        elements.viewCertificate.addEventListener('click', () => showFinalCertificate(true));
        elements.newExpedition.addEventListener('click', startNewExpedition);
        elements.sourceButton.addEventListener('click', openSource);
        elements.closeSource.addEventListener('click', closeSource);
        document.getElementById('zoomOutButton').addEventListener('click', () => updateZoom(zoom - .25));
        document.getElementById('zoomInButton').addEventListener('click', () => updateZoom(zoom + .25));
        document.getElementById('zoomResetButton').addEventListener('click', () => updateZoom(1));
        elements.sourceOverlay.addEventListener('click', event => { if (event.target === elements.sourceOverlay) closeSource(); });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !elements.sourceOverlay.hidden) {
                closeSource();
                return;
            }
            if (elements.game.hidden || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
            event.preventDefault();
            moveTerm(event.key === 'ArrowLeft' ? -1 : 1);
        });

        let touchStartX = null;
        elements.termCard.addEventListener('touchstart', event => {
            touchStartX = event.changedTouches[0]?.clientX ?? null;
            suppressNextSelection = false;
        }, { passive: true });
        elements.termCard.addEventListener('touchend', event => {
            if (touchStartX === null) return;
            const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
            touchStartX = null;
            if (Math.abs(distance) >= 42) {
                suppressNextSelection = true;
                window.setTimeout(() => { suppressNextSelection = false; }, 450);
                moveTerm(distance > 0 ? -1 : 1);
            }
        }, { passive: true });

        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed) {
            completeStage5(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.current >= stage5Total) {
            completeStage5(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.started) {
            beginStage5();
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed) {
            completeStage4(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.current >= stage4Total) {
            completeStage4(false);
        } else if (state.completed && stage2State.completed && stage3State.completed && stage4State.started) {
            beginStage4();
        } else if (state.completed && stage2State.completed && stage3State.completed) {
            completeStage3(false);
        } else if (state.completed && stage2State.completed && stage3State.current >= stage3Total) {
            completeStage3(false);
        } else if (state.completed && stage2State.completed && stage3State.started) {
            beginStage3();
        } else if (state.completed && stage2State.completed) {
            completeStage2(false);
        } else if (state.completed && stage2State.started) {
            beginStage2();
        } else if (state.completed) {
            completeStage(false);
        } else if (state.current >= totalQuestions) {
            completeStage(false);
        } else if (state.started) {
            elements.resumeNote.textContent = 'Your saved Migration Compass route is ready to continue.';
            showScreen('game');
            renderQuestion();
        } else {
            showScreen('intro');
        }
    }

    initialise();
})();
