window.HistoryQuestStage4Data = {
    sourceTitle: 'Results of Colonisation',
    sourceImage: 'sources/results-of-colonisation.jpg',
    questions: [
        {
            id: 'cartoon-message',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'What is the main message of the source cartoon?',
            instruction: 'Study the direction of the resources and choose the strongest interpretation.',
            options: [
                'Europe and North America gained wealth by taking resources from Africa',
                'Africa became richer than every industrial region through colonisation',
                'European and North American cities returned all extracted wealth to Africa',
                'Colonisation ended the international demand for African minerals'
            ],
            correctAnswers: ['Europe and North America gained wealth by taking resources from Africa'],
            feedback: 'The cartoon shows African wealth flowing outward while Europe and North America become more prosperous.'
        },
        {
            id: 'other-region',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'Besides Europe, which other region is shown benefiting from Africa’s extracted wealth?',
            instruction: 'Use the skyline symbol at the end of the second conveyor.',
            options: ['North America', 'South America', 'Asia', 'Australia'],
            correctAnswers: ['North America'],
            feedback: 'The North American skyline, including the Statue of Liberty, is shown receiving African resources.'
        },
        {
            id: 'political-result',
            mode: 'single',
            selectLimit: 1,
            marks: 1,
            usesSource: true,
            prompt: 'Which political result is suggested by the overturned leadership stool and broken council circle?',
            instruction: 'Connect the visual clue to changes in African governance.',
            options: [
                'Traditional political structures were dismantled or manipulated to serve colonial interests',
                'Every indigenous ruler gained complete control over a larger territory',
                'Colonial rule strengthened all traditional councils without interference',
                'African political borders and leadership systems remained unchanged'
            ],
            correctAnswers: ['Traditional political structures were dismantled or manipulated to serve colonial interests'],
            feedback: 'Colonial governments often replaced, weakened or co-opted indigenous rulers and eroded traditional governance.'
        },
        {
            id: 'social-impacts',
            mode: 'multiple',
            selectLimit: 2,
            marks: 2,
            usesSource: true,
            prompt: 'Select TWO social impacts that African communities experienced under colonial rule.',
            instruction: 'Choose any two historically supported impacts. One mark is awarded for each correct choice.',
            options: [
                'Forced labour and migration changed where people lived',
                'New diseases affected African communities',
                'Colonial racial classifications reshaped social hierarchies',
                'All communities kept exactly the same social structures',
                'Forced movement ended and every family returned home immediately',
                'Colonisation removed every form of social inequality'
            ],
            correctAnswers: [
                'Forced labour and migration changed where people lived',
                'New diseases affected African communities',
                'Colonial racial classifications reshaped social hierarchies'
            ],
            feedback: 'Forced labour and migration caused demographic change, new diseases affected communities, and colonial racial categories reshaped social hierarchies.'
        },
        {
            id: 'rapid-conquest',
            mode: 'multiple',
            selectLimit: 2,
            marks: 2,
            usesSource: true,
            prompt: 'Select TWO conditions that helped European powers colonise Africa quickly.',
            instruction: 'Use the source clues and your historical knowledge. One mark is awarded for each correct choice.',
            options: [
                'Rivalries between some African leaders weakened united resistance',
                'Weapons such as the machine gun gave Europeans a military advantage',
                'New diseases and natural disasters weakened some communities',
                'European armies had no technological advantage at all',
                'Every African society willingly accepted colonial rule',
                'All African leaders formed one permanent alliance before conquest began'
            ],
            correctAnswers: [
                'Rivalries between some African leaders weakened united resistance',
                'Weapons such as the machine gun gave Europeans a military advantage',
                'New diseases and natural disasters weakened some communities'
            ],
            feedback: 'Rivalries, military technology, new diseases and natural disasters could weaken resistance and speed up conquest.'
        }
    ]
};
