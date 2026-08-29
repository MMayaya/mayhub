window.HistoryQuestStage2Data = {
    sourceTitle: 'Causes of Colonisation',
    sourceImage: 'sources/causes-of-colonisation.jpg',
    questions: [
        {
            id: 'three-causes',
            mode: 'multiple',
            selectLimit: 3,
            marks: 3,
            usesSource: true,
            prompt: 'Select THREE causes of European colonisation of Africa.',
            instruction: 'Choose three motives shown or suggested by the source, then lock your choices.',
            options: [
                'Demand for raw materials',
                'Need for new markets',
                'Industrial Revolution',
                'Protection of African political independence',
                'End of European manufacturing',
                'A shortage of transport technology'
            ],
            correctAnswers: ['Demand for raw materials', 'Need for new markets', 'Industrial Revolution'],
            feedback: 'Industrial production increased the demand for raw materials and encouraged European industries to search for new markets.'
        },
        {
            id: 'technology',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'How did technological development contribute to colonisation?',
            instruction: 'Choose the best explanation.',
            options: [
                'It enabled faster travel, communication and stronger military control',
                'It prevented European ships from reaching Africa',
                'It made long-distance communication impossible',
                'It removed European interest in overseas territories'
            ],
            correctAnswers: ['It enabled faster travel, communication and stronger military control'],
            feedback: 'Steam transport, telegraphs, mapping and superior weapons helped European powers reach, coordinate and control distant territories.'
        },
        {
            id: 'industrial-revolution',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'What role did the Industrial Revolution play in colonisation?',
            instruction: 'Choose the statement that completes the cause-and-effect chain.',
            options: [
                'Factories required raw materials and new markets for manufactured goods',
                'Factories reduced production and required fewer resources',
                'Industrialisation ended competition between European countries',
                'Industrialisation transferred political control back to African rulers'
            ],
            correctAnswers: ['Factories required raw materials and new markets for manufactured goods'],
            feedback: 'European factories produced goods rapidly, increasing the demand for African raw materials and overseas markets.'
        },
        {
            id: 'religious-aims',
            mode: 'multiple',
            selectLimit: 2,
            marks: 2,
            usesSource: true,
            prompt: 'Select TWO religious aims associated with colonisation.',
            instruction: 'Choose two aims linked to missionary activity, then lock your choices.',
            options: [
                'Spread Christianity',
                'Promote European ideas described at the time as a “civilising mission”',
                'Strengthen every indigenous religion through colonial law',
                'Prevent missionaries from entering Africa',
                'Guarantee complete African political independence'
            ],
            correctAnswers: [
                'Spread Christianity',
                'Promote European ideas described at the time as a “civilising mission”'
            ],
            feedback: 'Missionaries aimed to spread Christianity and promoted European cultural ideas that colonisers described as a “civilising mission”.'
        }
    ]
};
