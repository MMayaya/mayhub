window.HistoryQuestStage3Data = {
    sourceTitle: 'Patterns of Colonisation',
    sourceImage: 'sources/patterns-of-colonisation.jpg',
    questions: [
        {
            id: 'largest-claim',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'According to the mapmaker’s ledger, which European power has the largest number of recorded African claims?',
            instruction: 'Compare the totals in the source and choose one power.',
            options: ['Britain', 'France', 'Portugal', 'Italy'],
            correctAnswers: ['Britain'],
            feedback: 'Britain has seven territories recorded on this source, the largest number shown.'
        },
        {
            id: 'british-territories',
            mode: 'multiple',
            selectLimit: 2,
            marks: 2,
            usesSource: true,
            prompt: 'Select TWO territories recorded as British claims.',
            instruction: 'Any two correct British territories secure the two marks.',
            options: ['South Africa', 'Botswana', 'Nigeria', 'Uganda', 'Ethiopia', 'Angola', 'Madagascar'],
            correctAnswers: ['South Africa', 'Botswana', 'Nigeria', 'Uganda'],
            feedback: 'The source records Egypt, Nigeria, Uganda, British East Africa, Rhodesia, Botswana and South Africa under Britain.'
        },
        {
            id: 'independent-state',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'Which country is identified as independent in the source?',
            instruction: 'Choose one country that remained outside European colonial rule.',
            options: ['Ethiopia', 'Liberia', 'Nigeria', 'Angola'],
            correctAnswers: ['Ethiopia', 'Liberia'],
            feedback: 'Ethiopia and Liberia are both identified as independent on the source.'
        },
        {
            id: 'fewer-colonies',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'Portugal and Italy have fewer recorded colonies than Britain. Which explanation is most reasonable?',
            instruction: 'Use the pattern in the source together with your historical knowledge.',
            options: [
                'They entered the colonial race later and faced stronger competition and geopolitical limits',
                'They controlled every African territory before Britain arrived',
                'They had no interest in overseas expansion at any time',
                'African countries voluntarily selected Britain as their ruler'
            ],
            correctAnswers: ['They entered the colonial race later and faced stronger competition and geopolitical limits'],
            feedback: 'A later entry, competition from established powers, geopolitical constraints and other economic priorities limited their expansion.'
        }
    ]
};
