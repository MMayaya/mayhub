(function () {
    'use strict';

    const data = window.HistoryQuestStage1Data || { questions: [] };
    const stage2Data = window.HistoryQuestStage2Data || { questions: [] };
    const stage3Data = window.HistoryQuestStage3Data || { questions: [] };
    const stage4Data = window.HistoryQuestStage4Data || { questions: [] };
    const stage5Data = window.HistoryQuestStage5Data || { questions: [] };
    const stage6Data = window.HistoryQuestStage6Data || { questions: [] };
    const questions = data.questions || [];
    const stage2Questions = stage2Data.questions || [];
    const stage3Questions = stage3Data.questions || [];
    const stage4Questions = stage4Data.questions || [];
    const stage5Questions = stage5Data.questions || [];
    const stage6Questions = stage6Data.questions || [];
    const totalQuestions = questions.length;
    const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);
    const stage2Total = stage2Questions.length;
    const stage2TotalMarks = stage2Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage3Total = stage3Questions.length;
    const stage3TotalMarks = stage3Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage4Total = stage4Questions.length;
    const stage4TotalMarks = stage4Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage5Total = stage5Questions.length;
    const stage5TotalMarks = stage5Questions.reduce((sum, question) => sum + question.marks, 0);
    const stage6Total = stage6Questions.length;
    const stage6TotalMarks = stage6Questions.reduce((sum, question) => sum + question.marks, 0);
    const historyQuestTotalMarks = totalMarks + stage2TotalMarks + stage3TotalMarks + stage4TotalMarks + stage5TotalMarks + stage6TotalMarks;
    const storageVersion = 1;
    let zoom = 1;
    let previousBodyOverflow = '';
    let currentScreen = 'intro';

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
        stage6: document.getElementById('stage6Screen'),
        stage6Result: document.getElementById('stage6ResultScreen'),
        stage7: document.getElementById('stage7Screen'),
        stage1Node: document.getElementById('stage1Node'),
        stage2Node: document.getElementById('stage2Node'),
        stage3Node: document.getElementById('stage3Node'),
        stage4Node: document.getElementById('stage4Node'),
        stage5Node: document.getElementById('stage5Node'),
        stage6Node: document.getElementById('stage6Node'),
        stage7Node: document.getElementById('stage7Node'),
        stage1Status: document.getElementById('stage1Status'),
        stage2Status: document.getElementById('stage2Status'),
        stage3Status: document.getElementById('stage3Status'),
        stage4Status: document.getElementById('stage4Status'),
        stage5Status: document.getElementById('stage5Status'),
        stage6Status: document.getElementById('stage6Status'),
        stage7Status: document.getElementById('stage7Status'),
        begin: document.getElementById('beginButton'),
        resumeNote: document.getElementById('resumeNote'),
        score: document.getElementById('scoreValue'),
        progress: document.getElementById('progressFill'),
        counter: document.getElementById('signalCounter'),
        marks: document.getElementById('questionMarks'),
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
        resultMarks: document.getElementById('resultMarks'),
        resultPercent: document.getElementById('resultPercent'),
        continueStage2: document.getElementById('continueStage2Button'),
        stage2Score: document.getElementById('stage2ScoreValue'),
        stage2Progress: document.getElementById('stage2ProgressFill'),
        stage2Counter: document.getElementById('stage2Counter'),
        stage2Marks: document.getElementById('stage2Marks'),
        stage2Prompt: document.getElementById('stage2Prompt'),
        stage2Instruction: document.getElementById('stage2Instruction'),
        stage2Answers: document.getElementById('stage2AnswerGrid'),
        confirmStage2: document.getElementById('confirmStage2Button'),
        stage2Feedback: document.getElementById('stage2FeedbackPanel'),
        stage2FeedbackTitle: document.getElementById('stage2FeedbackTitle'),
        stage2FeedbackText: document.getElementById('stage2FeedbackText'),
        stage2Next: document.getElementById('stage2NextButton'),
        stage2ResultScore: document.getElementById('stage2ResultScore'),
        stage2ResultTitle: document.getElementById('stage2ResultTitle'),
        stage2ResultMessage: document.getElementById('stage2ResultMessage'),
        stage2ResultMarks: document.getElementById('stage2ResultMarks'),
        stage2ResultPercent: document.getElementById('stage2ResultPercent'),
        overallScore: document.getElementById('overallScore'),
        continueStage3: document.getElementById('continueStage3Button'),
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
        continueStage4: document.getElementById('continueStage4Button'),
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
        continueStage5: document.getElementById('continueStage5Button'),
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
        continueStage6: document.getElementById('continueStage6Button'),
        stage6Score: document.getElementById('stage6ScoreValue'),
        stage6Progress: document.getElementById('stage6ProgressFill'),
        stage6Counter: document.getElementById('stage6Counter'),
        stage6Marks: document.getElementById('stage6Marks'),
        stage6Section: document.getElementById('stage6Section'),
        stage6Prompt: document.getElementById('stage6Prompt'),
        stage6Instruction: document.getElementById('stage6Instruction'),
        stage6Answers: document.getElementById('stage6AnswerGrid'),
        confirmStage6: document.getElementById('confirmStage6Button'),
        stage6Feedback: document.getElementById('stage6FeedbackPanel'),
        stage6FeedbackTitle: document.getElementById('stage6FeedbackTitle'),
        stage6FeedbackText: document.getElementById('stage6FeedbackText'),
        stage6Next: document.getElementById('stage6NextButton'),
        stage6ResultScore: document.getElementById('stage6ResultScore'),
        stage6ResultTitle: document.getElementById('stage6ResultTitle'),
        stage6ResultMessage: document.getElementById('stage6ResultMessage'),
        stage6ResultMarks: document.getElementById('stage6ResultMarks'),
        stage6ResultPercent: document.getElementById('stage6ResultPercent'),
        stage6OverallScore: document.getElementById('stage6OverallScore'),
        continueStage7: document.getElementById('continueStage7Button'),
        stage7ResultTitle: document.getElementById('stage7ResultTitle'),
        stage7ResultMessage: document.getElementById('stage7ResultMessage'),
        finalHistoryScore: document.getElementById('finalHistoryScore'),
        historyGrandPercent: document.getElementById('historyGrandPercent'),
        historyGrandComment: document.getElementById('historyGrandComment'),
        viewHistoryCertificate: document.getElementById('viewHistoryCertificateButton'),
        historyFinalStageScores: [1, 2, 3, 4, 5, 6].map(stage => [
            document.getElementById('historyFinalStage' + stage + 'Score'),
            document.getElementById('historyFinalStage' + stage + 'Percent'),
            document.getElementById('historyFinalStage' + stage + 'Comment')
        ]),
        essaySteps: [...document.querySelectorAll('[data-essay-step]')],
        sourceButton: document.getElementById('headerSourceButton'),
        overlay: document.getElementById('sourceOverlay'),
        closeSource: document.getElementById('closeSourceButton'),
        sourceTitle: document.getElementById('sourceTitle'),
        sourceImage: document.getElementById('sourceImage'),
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
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-1:' + encodeURIComponent(learnerId());
    }

    function stage2StorageKey() {
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-2:' + encodeURIComponent(learnerId());
    }

    function stage3StorageKey() {
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-3:' + encodeURIComponent(learnerId());
    }

    function stage4StorageKey() {
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-4:' + encodeURIComponent(learnerId());
    }

    function stage5StorageKey() {
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-5:' + encodeURIComponent(learnerId());
    }

    function stage6StorageKey() {
        return 'mayhubHistoryQuest:v' + storageVersion + ':grade-8:history:term-3:stage-6:' + encodeURIComponent(learnerId());
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
            order: shuffle(questions.map(question => question.id)),
            optionOrder: Object.fromEntries(questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            awarded: {}
        };
    }

    function validState(candidate) {
        const byId = new Map(questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== totalQuestions || new Set(candidate.order).size !== totalQuestions) return false;
        if (!candidate.order.every(id => byId.has(id))) return false;
        if (!candidate.optionOrder || !candidate.order.every(id => {
            const question = byId.get(id);
            const order = candidate.optionOrder[id];
            return Array.isArray(order)
                && order.length === question.options.length
                && new Set(order).size === question.options.length
                && order.every(option => question.options.includes(option));
        })) return false;
        if (!candidate.answers || !Object.entries(candidate.answers).every(([id, answer]) => byId.has(id) && byId.get(id).options.includes(answer))) return false;
        if (!candidate.awarded || !Object.entries(candidate.awarded).every(([id, marks]) => byId.has(id) && Number.isInteger(marks) && marks >= 0 && marks <= byId.get(id).marks)) return false;
        const awardedTotal = Object.values(candidate.awarded).reduce((sum, marks) => sum + marks, 0);
        return Number.isInteger(candidate.current)
            && candidate.current >= 0
            && candidate.current <= totalQuestions
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= totalMarks;
    }

    function loadState() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(storageKey()) || 'null');
            if (validState(saved)) return saved;
        } catch {}
        return createState();
    }

    let state = loadState();

    function createStage2State() {
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: shuffle(stage2Questions.map(question => question.id)),
            optionOrders: Object.fromEntries(stage2Questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage2State(candidate) {
        const byId = new Map(stage2Questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage2Total || new Set(candidate.order).size !== stage2Total) return false;
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
            && candidate.current <= stage2Total
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= stage2TotalMarks;
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

    function createStage6State() {
        return {
            version: storageVersion,
            started: false,
            completed: false,
            current: 0,
            score: 0,
            order: stage6Questions.map(question => question.id),
            optionOrders: Object.fromEntries(stage6Questions.map(question => [question.id, shuffle(question.options)])),
            answers: {},
            locked: {},
            awarded: {}
        };
    }

    function validStage6State(candidate) {
        const byId = new Map(stage6Questions.map(question => [question.id, question]));
        if (!candidate || candidate.version !== storageVersion) return false;
        if (!Array.isArray(candidate.order) || candidate.order.length !== stage6Total) return false;
        if (!candidate.order.every((id, index) => id === stage6Questions[index].id)) return false;
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
            && candidate.current <= stage6Total
            && Number.isInteger(candidate.score)
            && candidate.score === awardedTotal
            && candidate.score >= 0
            && candidate.score <= stage6TotalMarks;
    }

    function loadStage6State() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(stage6StorageKey()) || 'null');
            if (validStage6State(saved)) return saved;
        } catch {}
        return createStage6State();
    }

    let stage6State = loadStage6State();

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

    function saveStage6State() {
        try { window.localStorage.setItem(stage6StorageKey(), JSON.stringify(stage6State)); } catch {}
    }

    function questionById(id) {
        return questions.find(question => question.id === id);
    }

    function currentQuestion() {
        return questionById(state.order[state.current]);
    }

    function stage2QuestionById(id) {
        return stage2Questions.find(question => question.id === id);
    }

    function currentStage2Question() {
        return stage2QuestionById(stage2State.order[stage2State.current]);
    }

    function stage3QuestionById(id) {
        return stage3Questions.find(question => question.id === id);
    }

    function currentStage3Question() {
        return stage3QuestionById(stage3State.order[stage3State.current]);
    }

    function stage4QuestionById(id) {
        return stage4Questions.find(question => question.id === id);
    }

    function currentStage4Question() {
        return stage4QuestionById(stage4State.order[stage4State.current]);
    }

    function stage5QuestionById(id) {
        return stage5Questions.find(question => question.id === id);
    }

    function currentStage5Question() {
        return stage5QuestionById(stage5State.order[stage5State.current]);
    }

    function stage6QuestionById(id) {
        return stage6Questions.find(question => question.id === id);
    }

    function currentStage6Question() {
        return stage6QuestionById(stage6State.order[stage6State.current]);
    }

    function updateStageMap(name) {
        elements.stage1Node.className = 'stage-node ' + (state.completed ? 'completed' : 'active');
        elements.stage1Node.toggleAttribute('aria-current', !state.completed);
        elements.stage1Status.textContent = state.completed ? 'Stage completed' : (state.started ? 'In progress' : 'Available now');

        const stage2IsCurrent = name === 'stage2';
        let stage2Class = 'locked';
        if (stage2State.completed) stage2Class = 'completed';
        else if (stage2IsCurrent) stage2Class = 'active';
        else if (state.completed) stage2Class = 'available';
        elements.stage2Node.className = 'stage-node ' + stage2Class;
        elements.stage2Node.toggleAttribute('aria-current', stage2IsCurrent && !stage2State.completed);
        elements.stage2Status.textContent = stage2State.completed
            ? 'Stage completed'
            : (stage2IsCurrent ? 'In progress' : (state.completed ? 'Ready to explore' : 'Complete Stage 1 to unlock'));

        const stage3IsCurrent = name === 'stage3';
        let stage3Class = 'locked';
        if (stage3State.completed) stage3Class = 'completed';
        else if (stage3IsCurrent) stage3Class = 'active';
        else if (stage2State.completed) stage3Class = 'available';
        elements.stage3Node.className = 'stage-node ' + stage3Class;
        elements.stage3Node.toggleAttribute('aria-current', stage3IsCurrent && !stage3State.completed);
        elements.stage3Status.textContent = stage3State.completed
            ? 'Stage completed'
            : (stage3IsCurrent ? 'In progress' : (stage2State.completed ? 'Ready to explore' : 'Complete Stage 2 to unlock'));

        const stage4IsCurrent = name === 'stage4';
        let stage4Class = 'locked';
        if (stage4State.completed) stage4Class = 'completed';
        else if (stage4IsCurrent) stage4Class = 'active';
        else if (stage3State.completed) stage4Class = 'available';
        elements.stage4Node.className = 'stage-node ' + stage4Class;
        elements.stage4Node.toggleAttribute('aria-current', stage4IsCurrent && !stage4State.completed);
        elements.stage4Status.textContent = stage4State.completed
            ? 'Stage completed'
            : (stage4IsCurrent ? 'In progress' : (stage3State.completed ? 'Ready to explore' : 'Complete Stage 3 to unlock'));

        const stage5IsCurrent = name === 'stage5';
        let stage5Class = 'locked';
        if (stage5State.completed) stage5Class = 'completed';
        else if (stage5IsCurrent) stage5Class = 'active';
        else if (stage4State.completed) stage5Class = 'available';
        elements.stage5Node.className = 'stage-node ' + stage5Class;
        elements.stage5Node.toggleAttribute('aria-current', stage5IsCurrent && !stage5State.completed);
        elements.stage5Status.textContent = stage5State.completed
            ? 'Stage completed'
            : (stage5IsCurrent ? 'In progress' : (stage4State.completed ? 'Ready to explore' : 'Complete Stage 4 to unlock'));

        const stage6IsCurrent = name === 'stage6';
        let stage6Class = 'locked';
        if (stage6State.completed) stage6Class = 'completed';
        else if (stage6IsCurrent) stage6Class = 'active';
        else if (stage5State.completed) stage6Class = 'available';
        elements.stage6Node.className = 'stage-node ' + stage6Class;
        elements.stage6Node.toggleAttribute('aria-current', stage6IsCurrent && !stage6State.completed);
        elements.stage6Status.textContent = stage6State.completed
            ? 'Stage completed'
            : (stage6IsCurrent ? 'In progress' : (stage5State.completed ? 'Ready to build' : 'Complete Stage 5 to unlock'));

        const stage7IsCurrent = name === 'stage7';
        elements.stage7Node.className = 'stage-node summary-stage ' + (stage7IsCurrent ? 'active' : (stage6State.completed ? 'available' : 'locked'));
        elements.stage7Node.toggleAttribute('aria-current', stage7IsCurrent);
        elements.stage7Status.textContent = stage7IsCurrent
            ? 'Viewing grand total'
            : (stage6State.completed ? 'Grand total ready' : 'Complete Stage 6 to unlock');
    }

    function showScreen(name) {
        currentScreen = name;
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
        elements.stage6.hidden = name !== 'stage6';
        elements.stage6Result.hidden = name !== 'stage6Result';
        elements.stage7.hidden = name !== 'stage7';
        elements.sourceButton.hidden = name === 'stage6' || name === 'stage6Result' || name === 'stage7';
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
        const awarded = correct ? question.marks : 0;
        state.answers[question.id] = selectedAnswer;
        state.awarded[question.id] = awarded;
        state.score += awarded;
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
        elements.counter.textContent = 'Challenge ' + (state.current + 1) + ' of ' + totalQuestions;
        elements.marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.progress.style.width = ((state.current + (isAnswered ? 1 : 0)) / totalQuestions * 100) + '%';
        elements.prompt.textContent = question.prompt;
        elements.sourceHint.textContent = question.usesSource ? 'Use the source and your historical knowledge.' : 'Use your historical knowledge.';
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
            elements.feedbackTitle.textContent = correct ? 'Historical clue confirmed' : 'Historical clue corrected';
            elements.feedbackText.textContent = question.feedback;
            elements.next.textContent = state.current === totalQuestions - 1 ? 'Complete Stage 1' : 'Next Challenge';
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
        if (score === totalMarks) return ['Perfect historical reading', 'You interpreted every clue correctly and decoded the Berlin table.'];
        if (score >= 7) return ['Excellent source work', 'You combined the cartoon and your historical knowledge with impressive accuracy.'];
        if (score >= 5) return ['The table decoded', 'You completed the stage successfully and secured the first HistoryQuest route.'];
        return ['The table needs another look', 'You completed the stage, but the Berlin Conference needs more revision before the expedition continues.'];
    }

    function completeStage(playCompletionSound = true) {
        state.completed = true;
        state.current = totalQuestions;
        saveState();
        const percentage = Math.round(state.score / totalMarks * 100);
        const [title, message] = completionCopy(state.score);
        elements.resultScore.textContent = state.score + '/' + totalMarks;
        elements.resultTitle.textContent = title;
        elements.resultMessage.textContent = message;
        elements.resultMarks.textContent = String(state.score);
        elements.resultPercent.textContent = percentage + '%';
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('result');
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

    function scoreStage2Question(question, selectedAnswers) {
        const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections);
    }

    function chooseStage2Option(option) {
        const question = currentStage2Question();
        if (!question || stage2State.locked[question.id]) return;
        const selected = [...(stage2State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage2State.answers[question.id] = [option];
            saveStage2State();
            lockStage2Question();
            return;
        }
        const selectedIndex = selected.indexOf(option);
        if (selectedIndex >= 0) selected.splice(selectedIndex, 1);
        else if (selected.length < question.selectLimit) selected.push(option);
        stage2State.answers[question.id] = selected;
        saveStage2State();
        renderStage2();
    }

    function lockStage2Question() {
        const question = currentStage2Question();
        if (!question || stage2State.locked[question.id]) return;
        const selected = stage2State.answers[question.id] || [];
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage2Question(question, selected);
        stage2State.awarded[question.id] = awarded;
        stage2State.score += awarded;
        stage2State.locked[question.id] = true;
        saveStage2State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage2();
    }

    function renderStage2() {
        if (stage2State.current >= stage2Total) {
            completeStage2();
            return;
        }
        const question = currentStage2Question();
        const selected = stage2State.answers[question.id] || [];
        const isLocked = Boolean(stage2State.locked[question.id]);
        const awarded = stage2State.awarded[question.id] || 0;
        elements.stage2Score.textContent = String(stage2State.score);
        elements.stage2Progress.style.width = ((stage2State.current + (isLocked ? 1 : 0)) / stage2Total * 100) + '%';
        elements.stage2Counter.textContent = 'Challenge ' + (stage2State.current + 1) + ' of ' + stage2Total;
        elements.stage2Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage2Prompt.textContent = question.prompt;
        elements.stage2Instruction.textContent = question.instruction;
        elements.stage2Answers.replaceChildren();

        const optionOrder = stage2State.optionOrders[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            button.type = 'button';
            button.className = 'route-option';
            if (isSelected) button.classList.add('selected');
            if (isLocked && isCorrect) button.classList.add('correct');
            if (isLocked && isSelected && !isCorrect) button.classList.add('wrong');
            button.disabled = isLocked;
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.textContent = isSelected || (isLocked && isCorrect) ? '✓' : '';
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage2Option(option));
            elements.stage2Answers.appendChild(button);
        });

        elements.confirmStage2.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage2.disabled = selected.length !== question.selectLimit;
        elements.confirmStage2.textContent = 'Lock ' + question.selectLimit + ' Choices';
        elements.stage2Feedback.hidden = !isLocked;
        elements.stage2Next.hidden = !isLocked;
        if (isLocked) {
            const fullMarks = awarded === question.marks;
            elements.stage2Feedback.className = 'feedback-panel ' + (fullMarks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong'));
            elements.stage2FeedbackTitle.textContent = fullMarks
                ? 'Cause chain confirmed'
                : (awarded > 0 ? awarded + ' of ' + question.marks + ' marks secured' : 'Cause chain corrected');
            elements.stage2FeedbackText.textContent = question.feedback;
            elements.stage2Next.textContent = stage2State.current === stage2Total - 1 ? 'Complete Stage 2' : 'Next Challenge';
        }
    }

    function nextStage2Question() {
        const question = currentStage2Question();
        if (!question || !stage2State.locked[question.id]) return;
        stage2State.current += 1;
        saveStage2State();
        if (stage2State.current >= stage2Total) completeStage2();
        else renderStage2();
    }

    function stage2CompletionCopy(score) {
        if (score === stage2TotalMarks) return ['Perfect cause chain', 'You connected every motive, technology and missionary aim correctly.'];
        if (score >= 6) return ['Excellent historical reasoning', 'You traced the main causes of colonisation with impressive accuracy.'];
        if (score >= 4) return ['Cause chain secured', 'You completed the stage successfully and secured the second HistoryQuest route.'];
        return ['The causes need another look', 'You completed the stage, but the motives for colonisation need more revision.'];
    }

    function completeStage2(playCompletionSound = true) {
        stage2State.completed = true;
        stage2State.current = stage2Total;
        saveStage2State();
        const percentage = Math.round(stage2State.score / stage2TotalMarks * 100);
        const [title, message] = stage2CompletionCopy(stage2State.score);
        elements.stage2ResultScore.textContent = stage2State.score + '/' + stage2TotalMarks;
        elements.stage2ResultTitle.textContent = title;
        elements.stage2ResultMessage.textContent = message;
        elements.stage2ResultMarks.textContent = String(stage2State.score);
        elements.stage2ResultPercent.textContent = percentage + '%';
        elements.overallScore.textContent = (state.score + stage2State.score) + '/' + (totalMarks + stage2TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage2Result');
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
        const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections);
    }

    function chooseStage3Option(option) {
        const question = currentStage3Question();
        if (!question || stage3State.locked[question.id]) return;
        const selected = [...(stage3State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage3State.answers[question.id] = [option];
            saveStage3State();
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
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage3Question(question, selected);
        stage3State.awarded[question.id] = awarded;
        stage3State.score += awarded;
        stage3State.locked[question.id] = true;
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
        elements.stage3Score.textContent = String(stage3State.score);
        elements.stage3Progress.style.width = ((stage3State.current + (isLocked ? 1 : 0)) / stage3Total * 100) + '%';
        elements.stage3Counter.textContent = 'Challenge ' + (stage3State.current + 1) + ' of ' + stage3Total;
        elements.stage3Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage3Prompt.textContent = question.prompt;
        elements.stage3Instruction.textContent = question.instruction;
        elements.stage3Answers.replaceChildren();

        const optionOrder = stage3State.optionOrders[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            button.type = 'button';
            button.className = 'route-option';
            if (isSelected) button.classList.add('selected');
            if (isLocked && isCorrect) button.classList.add('correct');
            if (isLocked && isSelected && !isCorrect) button.classList.add('wrong');
            button.disabled = isLocked;
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.textContent = isSelected || (isLocked && isCorrect) ? '✓' : '';
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage3Option(option));
            elements.stage3Answers.appendChild(button);
        });

        elements.confirmStage3.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage3.disabled = selected.length !== question.selectLimit;
        elements.confirmStage3.textContent = 'Lock ' + question.selectLimit + ' Choices';
        elements.stage3Feedback.hidden = !isLocked;
        elements.stage3Next.hidden = !isLocked;
        if (isLocked) {
            const fullMarks = awarded === question.marks;
            elements.stage3Feedback.className = 'feedback-panel ' + (fullMarks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong'));
            elements.stage3FeedbackTitle.textContent = fullMarks
                ? 'Route correctly mapped'
                : (awarded > 0 ? awarded + ' of ' + question.marks + ' marks secured' : 'Route corrected');
            elements.stage3FeedbackText.textContent = question.feedback;
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
        if (score === stage3TotalMarks) return ['Perfect route map', 'You interpreted every colonial pattern and independent state correctly.'];
        if (score >= 4) return ['Excellent map reading', 'You traced the colonial claims with impressive accuracy.'];
        if (score >= 3) return ['Routes mapped', 'You completed the stage successfully and secured the third HistoryQuest route.'];
        return ['The routes need another look', 'You completed the stage, but the patterns of colonisation need more revision.'];
    }

    function completeStage3(playCompletionSound = true) {
        stage3State.completed = true;
        stage3State.current = stage3Total;
        saveStage3State();
        const percentage = Math.round(stage3State.score / stage3TotalMarks * 100);
        const [title, message] = stage3CompletionCopy(stage3State.score);
        elements.stage3ResultScore.textContent = stage3State.score + '/' + stage3TotalMarks;
        elements.stage3ResultTitle.textContent = title;
        elements.stage3ResultMessage.textContent = message;
        elements.stage3ResultMarks.textContent = String(stage3State.score);
        elements.stage3ResultPercent.textContent = percentage + '%';
        elements.stage3OverallScore.textContent = (state.score + stage2State.score + stage3State.score) + '/' + (totalMarks + stage2TotalMarks + stage3TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage3Result');
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
        const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections);
    }

    function chooseStage4Option(option) {
        const question = currentStage4Question();
        if (!question || stage4State.locked[question.id]) return;
        const selected = [...(stage4State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage4State.answers[question.id] = [option];
            saveStage4State();
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
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage4Question(question, selected);
        stage4State.awarded[question.id] = awarded;
        stage4State.score += awarded;
        stage4State.locked[question.id] = true;
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
        elements.stage4Score.textContent = String(stage4State.score);
        elements.stage4Progress.style.width = ((stage4State.current + (isLocked ? 1 : 0)) / stage4Total * 100) + '%';
        elements.stage4Counter.textContent = 'Challenge ' + (stage4State.current + 1) + ' of ' + stage4Total;
        elements.stage4Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage4Prompt.textContent = question.prompt;
        elements.stage4Instruction.textContent = question.instruction;
        elements.stage4Answers.replaceChildren();

        const optionOrder = stage4State.optionOrders[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            button.type = 'button';
            button.className = 'route-option';
            if (isSelected) button.classList.add('selected');
            if (isLocked && isCorrect) button.classList.add('correct');
            if (isLocked && isSelected && !isCorrect) button.classList.add('wrong');
            button.disabled = isLocked;
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.textContent = isSelected || (isLocked && isCorrect) ? '✓' : '';
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage4Option(option));
            elements.stage4Answers.appendChild(button);
        });

        elements.confirmStage4.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage4.disabled = selected.length !== question.selectLimit;
        elements.confirmStage4.textContent = 'Lock ' + question.selectLimit + ' Choices';
        elements.stage4Feedback.hidden = !isLocked;
        elements.stage4Next.hidden = !isLocked;
        if (isLocked) {
            const fullMarks = awarded === question.marks;
            elements.stage4Feedback.className = 'feedback-panel ' + (fullMarks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong'));
            elements.stage4FeedbackTitle.textContent = fullMarks
                ? 'Consequence correctly traced'
                : (awarded > 0 ? awarded + ' of ' + question.marks + ' marks secured' : 'Consequence corrected');
            elements.stage4FeedbackText.textContent = question.feedback;
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

    function stage4CompletionCopy(score) {
        if (score === stage4TotalMarks) return ['Perfect consequence trail', 'You interpreted every result of colonisation with complete accuracy.'];
        if (score >= 6) return ['Excellent historical judgement', 'You connected the source clues to political and social consequences with impressive accuracy.'];
        if (score >= 4) return ['Consequences traced', 'You completed the stage successfully and secured the fourth HistoryQuest route.'];
        return ['The consequences need another look', 'You completed the stage, but the results of colonisation need more revision.'];
    }

    function completeStage4(playCompletionSound = true) {
        stage4State.completed = true;
        stage4State.current = stage4Total;
        saveStage4State();
        const percentage = Math.round(stage4State.score / stage4TotalMarks * 100);
        const [title, message] = stage4CompletionCopy(stage4State.score);
        elements.stage4ResultScore.textContent = stage4State.score + '/' + stage4TotalMarks;
        elements.stage4ResultTitle.textContent = title;
        elements.stage4ResultMessage.textContent = message;
        elements.stage4ResultMarks.textContent = String(stage4State.score);
        elements.stage4ResultPercent.textContent = percentage + '%';
        elements.stage4OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score) + '/' + (totalMarks + stage2TotalMarks + stage3TotalMarks + stage4TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage4Result');
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
        const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections);
    }

    function chooseStage5Option(option) {
        const question = currentStage5Question();
        if (!question || stage5State.locked[question.id]) return;
        const selected = [...(stage5State.answers[question.id] || [])];
        if (question.mode === 'single') {
            stage5State.answers[question.id] = [option];
            saveStage5State();
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
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage5Question(question, selected);
        stage5State.awarded[question.id] = awarded;
        stage5State.score += awarded;
        stage5State.locked[question.id] = true;
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
        elements.stage5Score.textContent = String(stage5State.score);
        elements.stage5Progress.style.width = ((stage5State.current + (isLocked ? 1 : 0)) / stage5Total * 100) + '%';
        elements.stage5Counter.textContent = 'Challenge ' + (stage5State.current + 1) + ' of ' + stage5Total;
        elements.stage5Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage5Prompt.textContent = question.prompt;
        elements.stage5Instruction.textContent = question.instruction;
        elements.stage5Answers.replaceChildren();

        const optionOrder = stage5State.optionOrders[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            button.type = 'button';
            button.className = 'route-option';
            if (isSelected) button.classList.add('selected');
            if (isLocked && isCorrect) button.classList.add('correct');
            if (isLocked && isSelected && !isCorrect) button.classList.add('wrong');
            button.disabled = isLocked;
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.textContent = isSelected || (isLocked && isCorrect) ? '✓' : '';
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage5Option(option));
            elements.stage5Answers.appendChild(button);
        });

        elements.confirmStage5.hidden = question.mode !== 'multiple' || isLocked;
        elements.confirmStage5.disabled = selected.length !== question.selectLimit;
        elements.confirmStage5.textContent = 'Lock ' + question.selectLimit + ' Choices';
        elements.stage5Feedback.hidden = !isLocked;
        elements.stage5Next.hidden = !isLocked;
        if (isLocked) {
            const fullMarks = awarded === question.marks;
            elements.stage5Feedback.className = 'feedback-panel ' + (fullMarks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong'));
            elements.stage5FeedbackTitle.textContent = fullMarks
                ? 'Archive clue confirmed'
                : (awarded > 0 ? awarded + ' of ' + question.marks + ' marks secured' : 'Archive clue corrected');
            elements.stage5FeedbackText.textContent = question.feedback;
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

    function stage5CompletionCopy(score) {
        if (score === stage5TotalMarks) return ['Perfect Ashanti archive', 'You interpreted every clue about the kingdom, resistance and colonial consequences correctly.'];
        if (score >= 6) return ['Excellent historical reading', 'You traced Ashanti strength and colonial change with impressive accuracy.'];
        if (score >= 4) return ['Ashanti archive secured', 'You completed the stage successfully and secured the fifth HistoryQuest route.'];
        return ['The archive needs another look', 'You completed the stage, but the Ashanti Kingdom needs more revision.'];
    }

    function completeStage5(playCompletionSound = true) {
        stage5State.completed = true;
        stage5State.current = stage5Total;
        saveStage5State();
        const percentage = Math.round(stage5State.score / stage5TotalMarks * 100);
        const [title, message] = stage5CompletionCopy(stage5State.score);
        elements.stage5ResultScore.textContent = stage5State.score + '/' + stage5TotalMarks;
        elements.stage5ResultTitle.textContent = title;
        elements.stage5ResultMessage.textContent = message;
        elements.stage5ResultMarks.textContent = String(stage5State.score);
        elements.stage5ResultPercent.textContent = percentage + '%';
        elements.stage5OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score) + '/' + (totalMarks + stage2TotalMarks + stage3TotalMarks + stage4TotalMarks + stage5TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage5Result');
    }

    function beginStage6() {
        if (!stage5State.completed) return;
        if (stage6State.completed) {
            completeStage6(false);
            return;
        }
        stage6State.started = true;
        saveStage6State();
        showScreen('stage6');
        renderStage6();
    }

    function scoreStage6Question(question, selectedAnswers) {
        const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer)).length;
        return Math.min(question.marks, correctSelections);
    }

    function chooseStage6Option(option) {
        const question = currentStage6Question();
        if (!question || stage6State.locked[question.id]) return;
        const selected = [...(stage6State.answers[question.id] || [])];
        const selectedIndex = selected.indexOf(option);
        if (selectedIndex >= 0) selected.splice(selectedIndex, 1);
        else if (selected.length < question.selectLimit) selected.push(option);
        stage6State.answers[question.id] = selected;
        saveStage6State();
        renderStage6();
    }

    function lockStage6Question() {
        const question = currentStage6Question();
        if (!question || stage6State.locked[question.id]) return;
        const selected = stage6State.answers[question.id] || [];
        if (selected.length !== question.selectLimit) return;
        const awarded = scoreStage6Question(question, selected);
        stage6State.awarded[question.id] = awarded;
        stage6State.score += awarded;
        stage6State.locked[question.id] = true;
        saveStage6State();
        if (awarded === question.marks) window.MayHubSounds?.playCorrect?.();
        else window.MayHubSounds?.playWrong?.();
        renderStage6();
    }

    function updateEssayBlueprint(isLocked) {
        elements.essaySteps.forEach((step, index) => {
            const completed = index < stage6State.current || (index === stage6State.current && isLocked);
            step.classList.toggle('completed', completed);
            step.classList.toggle('active', index === stage6State.current && !isLocked);
        });
    }

    function renderStage6() {
        if (stage6State.current >= stage6Total) {
            completeStage6();
            return;
        }
        const question = currentStage6Question();
        const selected = stage6State.answers[question.id] || [];
        const isLocked = Boolean(stage6State.locked[question.id]);
        const awarded = stage6State.awarded[question.id] || 0;
        elements.stage6Score.textContent = String(stage6State.score);
        elements.stage6Progress.style.width = ((stage6State.current + (isLocked ? 1 : 0)) / stage6Total * 100) + '%';
        elements.stage6Counter.textContent = 'Essay Part ' + (stage6State.current + 1) + ' of ' + stage6Total;
        elements.stage6Marks.textContent = question.marks + (question.marks === 1 ? ' mark' : ' marks');
        elements.stage6Section.textContent = question.section;
        elements.stage6Prompt.textContent = question.prompt;
        elements.stage6Instruction.textContent = question.instruction;
        elements.stage6Answers.replaceChildren();
        updateEssayBlueprint(isLocked);

        const optionOrder = stage6State.optionOrders[question.id] || question.options;
        optionOrder.forEach(option => {
            const button = document.createElement('button');
            const isSelected = selected.includes(option);
            const isCorrect = question.correctAnswers.includes(option);
            button.type = 'button';
            button.className = 'route-option essay-option';
            if (isSelected) button.classList.add('selected');
            if (isLocked && isCorrect) button.classList.add('correct');
            if (isLocked && isSelected && !isCorrect) button.classList.add('wrong');
            button.disabled = isLocked;
            const marker = document.createElement('span');
            marker.className = 'route-marker';
            marker.textContent = isSelected || (isLocked && isCorrect) ? '✓' : '';
            const label = document.createElement('span');
            label.textContent = option;
            button.append(marker, label);
            button.addEventListener('click', () => chooseStage6Option(option));
            elements.stage6Answers.appendChild(button);
        });

        elements.confirmStage6.hidden = isLocked;
        elements.confirmStage6.disabled = selected.length !== question.selectLimit;
        elements.confirmStage6.textContent = 'Lock ' + question.selectLimit + ' Statements';
        elements.stage6Feedback.hidden = !isLocked;
        elements.stage6Next.hidden = !isLocked;
        if (isLocked) {
            const fullMarks = awarded === question.marks;
            elements.stage6Feedback.className = 'feedback-panel ' + (fullMarks ? 'correct' : (awarded > 0 ? 'partial' : 'wrong'));
            elements.stage6FeedbackTitle.textContent = fullMarks
                ? question.section + ' secured'
                : (awarded > 0 ? awarded + ' of ' + question.marks + ' marks secured' : question.section + ' needs rebuilding');
            elements.stage6FeedbackText.textContent = question.feedback;
            elements.stage6Next.textContent = stage6State.current === stage6Total - 1 ? 'Complete Stage 6' : 'Build Next Essay Part';
        }
    }

    function nextStage6Question() {
        const question = currentStage6Question();
        if (!question || !stage6State.locked[question.id]) return;
        stage6State.current += 1;
        saveStage6State();
        if (stage6State.current >= stage6Total) completeStage6();
        else renderStage6();
    }

    function stage6CompletionCopy(score) {
        if (score === stage6TotalMarks) return ['Master essay architect', 'Your introduction, evidence and conclusion form a complete 15-mark historical argument.'];
        if (score >= 12) return ['Excellent essay blueprint', 'You selected a strong range of accurately explained causes and consequences.'];
        if (score >= 8) return ['Essay blueprint complete', 'Your argument has a workable structure and enough accurate historical content to pass this stage.'];
        return ['The blueprint needs strengthening', 'Review how introductions frame the topic, how evidence is explained and how conclusions summarise both sides.'];
    }

    const historyStagePerformanceComments = [
        ['Perfect interpretation of the Berlin Conference clues.', 'Strong understanding of the Berlin Conference and its purpose.', 'A sound foundation; revisit how Africa was divided without African representation.', 'Revisit the Berlin Conference, its participants and its rules for claiming territory.'],
        ['Every colonial motive was connected accurately.', 'Strong understanding of the economic, political and social causes of colonisation.', 'You identified the main motives; strengthen the links between industry, markets and empire.', 'Review why industrial powers wanted raw materials, markets, routes and influence.'],
        ['Every conquest route and independent state was identified correctly.', 'Strong map-based understanding of colonial control in Africa.', 'You read most territorial patterns correctly; revisit Ethiopia and Liberia.', 'Review the colonial powers, their territories and the African states that remained independent.'],
        ['Every consequence of colonial rule was traced accurately.', 'Strong understanding of the economic, political and social effects of colonisation.', 'You recognised the central consequences; revise how rule affected wealth and communities.', 'Review resource extraction, disrupted leadership, conflict, migration and disease.'],
        ['Excellent command of Ashanti strength, wealth and resistance.', 'Strong understanding of the Ashanti Kingdom and its response to British pressure.', 'You know the main Ashanti story; strengthen the links between gold, unity and resistance.', 'Review the Golden Stool, gold wealth, military organisation and British influence.'],
        ['A complete and historically accurate 15-mark essay blueprint.', 'A well-structured essay with strong causes, consequences and conclusion choices.', 'Your essay has a workable structure; add more accurately explained historical evidence.', 'Rebuild the introduction, evidence paragraphs and conclusion as one connected argument.']
    ];

    function historyStagePerformanceComment(stageIndex, percentage) {
        const comments = historyStagePerformanceComments[stageIndex];
        if (percentage === 100) return comments[0];
        if (percentage >= 80) return comments[1];
        if (percentage >= 50) return comments[2];
        return comments[3];
    }

    function historyGrandTotalCopy(percentage) {
        if (percentage === 100) return ['HistoryQuest mastered', 'Perfect performance across all six Grade 8 History stages.'];
        if (percentage >= 80) return ['Exceptional HistoryQuest expedition', 'You demonstrated an excellent command of the complete Term 3 History assessment.'];
        if (percentage >= 50) return ['HistoryQuest successfully completed', 'You have a sound overall understanding of the six assessed History sections.'];
        return ['HistoryQuest completed', 'Your stage profile shows exactly which History sections need more attention before the assessment.'];
    }

    function fullHistoryQuestScore() {
        return state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score + stage6State.score;
    }

    function showHistoryCertificate(playSound = true) {
        if (!window.MayHubCertificates) {
            window.alert('The certificate system is unavailable. Please refresh the page and try again.');
            return false;
        }
        const stageScoreKey = [state.score, stage2State.score, stage3State.score, stage4State.score, stage5State.score, stage6State.score].join('-');
        window.MayHubCertificates.showScored({
            correct: fullHistoryQuestScore(),
            total: historyQuestTotalMarks,
            category: 'Six-Stage History Expedition',
            completionId: 'historyquest-grand-total-' + stageScoreKey,
            playSound
        });
        return true;
    }

    function showHistoryGrandTotal(openCertificate = true) {
        if (!stage6State.completed) return;
        const totalScore = fullHistoryQuestScore();
        const overallPercentage = Math.round(totalScore / historyQuestTotalMarks * 100);
        const [title, message] = historyGrandTotalCopy(overallPercentage);
        elements.stage7ResultTitle.textContent = title;
        elements.stage7ResultMessage.textContent = 'Your complete performance profile across all six assessed Grade 8 History stages.';
        elements.finalHistoryScore.textContent = totalScore + '/' + historyQuestTotalMarks;
        elements.historyGrandPercent.textContent = overallPercentage + '%';
        elements.historyGrandComment.textContent = message;

        const stageResults = [
            [state.score, totalMarks],
            [stage2State.score, stage2TotalMarks],
            [stage3State.score, stage3TotalMarks],
            [stage4State.score, stage4TotalMarks],
            [stage5State.score, stage5TotalMarks],
            [stage6State.score, stage6TotalMarks]
        ];
        stageResults.forEach(([score, total], index) => {
            const percentage = Math.round(score / total * 100);
            const [scoreElement, percentElement, commentElement] = elements.historyFinalStageScores[index];
            scoreElement.textContent = score + '/' + total;
            percentElement.textContent = percentage + '%';
            commentElement.textContent = historyStagePerformanceComment(index, percentage);
        });

        showScreen('stage7');
        if (openCertificate) {
            if (overallPercentage >= 50) window.MayHubSounds?.playPass?.();
            else window.MayHubSounds?.playFail?.();
            window.setTimeout(() => showHistoryCertificate(false), 450);
        }
    }

    function completeStage6(playCompletionSound = true) {
        stage6State.completed = true;
        stage6State.current = stage6Total;
        saveStage6State();
        const percentage = Math.round(stage6State.score / stage6TotalMarks * 100);
        const [title, message] = stage6CompletionCopy(stage6State.score);
        elements.stage6ResultScore.textContent = stage6State.score + '/' + stage6TotalMarks;
        elements.stage6ResultTitle.textContent = title;
        elements.stage6ResultMessage.textContent = message;
        elements.stage6ResultMarks.textContent = String(stage6State.score);
        elements.stage6ResultPercent.textContent = percentage + '%';
        elements.stage6OverallScore.textContent = (state.score + stage2State.score + stage3State.score + stage4State.score + stage5State.score + stage6State.score) + '/' + (totalMarks + stage2TotalMarks + stage3TotalMarks + stage4TotalMarks + stage5TotalMarks + stage6TotalMarks);
        if (playCompletionSound && percentage >= 50) window.MayHubSounds?.playPass?.();
        else if (playCompletionSound) window.MayHubSounds?.playFail?.();
        showScreen('stage6Result');
    }

    function updateZoom(value) {
        zoom = Math.min(2.5, Math.max(0.75, value));
        elements.sourceImage.style.transform = 'scale(' + zoom + ')';
        elements.zoomValue.textContent = Math.round(zoom * 100) + '%';
    }

    function openSource() {
        const isStage2Source = currentScreen === 'stage2' || currentScreen === 'stage2Result';
        const isStage3Source = currentScreen === 'stage3' || currentScreen === 'stage3Result';
        const isStage4Source = currentScreen === 'stage4' || currentScreen === 'stage4Result';
        const isStage5Source = currentScreen === 'stage5' || currentScreen === 'stage5Result';
        const source = isStage5Source ? stage5Data : (isStage4Source ? stage4Data : (isStage3Source ? stage3Data : (isStage2Source ? stage2Data : data)));
        elements.sourceTitle.textContent = source.sourceTitle || 'HistoryQuest Source';
        elements.sourceImage.src = source.sourceImage || 'sources/berlin-conference-cartoon.jpg';
        elements.sourceImage.alt = isStage5Source
            ? 'Black-and-white illustrated archive showing the Ashanti Kingdom in modern Ghana, its Golden Stool, gold working, disciplined fighters, a British explorer presenting a book, redirected trade and missionary influence'
            : (isStage4Source
                ? 'Black-and-white editorial cartoon showing African resources flowing toward European and North American cities alongside visual clues for disrupted leadership, forced migration, rivalry, disease and military technology'
                : (isStage3Source
                ? 'Simplified black-and-white Africa map and ledger grouping colonial territories under Britain, France, Italy, Portugal and Belgium while identifying Ethiopia and Liberia as independent'
                : (isStage2Source
                ? 'Editorial cartoon linking European factories, empty raw-material boxes, steam transport, telegraph lines, markets and missionary activity to colonisation in Africa'
                : 'Editorial cartoon of European delegates dividing an Africa-shaped map at the Berlin Conference while an empty chair stands outside their group')));
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        elements.overlay.hidden = false;
        updateZoom(1);
        window.setTimeout(() => elements.closeSource.focus(), 0);
    }

    function closeSource() {
        if (elements.overlay.hidden) return;
        elements.overlay.hidden = true;
        document.body.style.overflow = previousBodyOverflow;
        elements.sourceButton.focus();
    }

    function initialise() {
        if (!totalQuestions || totalMarks !== 9 || stage2Total !== 4 || stage2TotalMarks !== 7 || stage3Total !== 4 || stage3TotalMarks !== 5 || stage4Total !== 5 || stage4TotalMarks !== 7 || stage5Total !== 6 || stage5TotalMarks !== 7 || stage6Total !== 4 || stage6TotalMarks !== 15 || historyQuestTotalMarks !== 50) {
            elements.begin.disabled = true;
            elements.resumeNote.textContent = 'HistoryQuest is temporarily unavailable.';
            return;
        }
        elements.begin.addEventListener('click', beginStage);
        elements.next.addEventListener('click', nextQuestion);
        elements.continueStage2.addEventListener('click', beginStage2);
        elements.confirmStage2.addEventListener('click', lockStage2Question);
        elements.stage2Next.addEventListener('click', nextStage2Question);
        elements.continueStage3.addEventListener('click', beginStage3);
        elements.confirmStage3.addEventListener('click', lockStage3Question);
        elements.stage3Next.addEventListener('click', nextStage3Question);
        elements.continueStage4.addEventListener('click', beginStage4);
        elements.confirmStage4.addEventListener('click', lockStage4Question);
        elements.stage4Next.addEventListener('click', nextStage4Question);
        elements.continueStage5.addEventListener('click', beginStage5);
        elements.confirmStage5.addEventListener('click', lockStage5Question);
        elements.stage5Next.addEventListener('click', nextStage5Question);
        elements.continueStage6.addEventListener('click', beginStage6);
        elements.confirmStage6.addEventListener('click', lockStage6Question);
        elements.stage6Next.addEventListener('click', nextStage6Question);
        elements.continueStage7.addEventListener('click', () => showHistoryGrandTotal(true));
        elements.viewHistoryCertificate.addEventListener('click', () => showHistoryCertificate(true));
        elements.sourceButton.addEventListener('click', openSource);
        elements.closeSource.addEventListener('click', closeSource);
        document.getElementById('zoomOutButton').addEventListener('click', () => updateZoom(zoom - 0.25));
        document.getElementById('zoomInButton').addEventListener('click', () => updateZoom(zoom + 0.25));
        document.getElementById('zoomResetButton').addEventListener('click', () => updateZoom(1));
        elements.overlay.addEventListener('click', event => { if (event.target === elements.overlay) closeSource(); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSource(); });

        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed && stage6State.completed) {
            completeStage6(false);
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed && stage6State.started) {
            showScreen('stage6');
            renderStage6();
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.completed) {
            completeStage5(false);
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed && stage5State.started) {
            showScreen('stage5');
            renderStage5();
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed && stage4State.completed) {
            completeStage4(false);
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed && stage4State.started) {
            showScreen('stage4');
            renderStage4();
            return;
        }
        if (state.completed && stage2State.completed && stage3State.completed) {
            completeStage3(false);
            return;
        }
        if (state.completed && stage2State.completed && stage3State.started) {
            showScreen('stage3');
            renderStage3();
            return;
        }
        if (state.completed && stage2State.completed) {
            completeStage2(false);
            return;
        }
        if (state.completed && stage2State.started) {
            showScreen('stage2');
            renderStage2();
            return;
        }
        if (state.completed) {
            completeStage(false);
            return;
        }
        if (state.started) {
            elements.begin.textContent = 'Resume Stage 1';
            elements.resumeNote.textContent = 'Your progress is saved on this device.';
        }
        updateStageMap(currentScreen);
    }

    initialise();
})();
