window.Grade10GeoQuestStage4Data = {
    sourceTitle: 'Population Change Ledger',
    sourceImage: 'sources/population-change-ledger.jpg',
    sourceAlt: 'A regenerated black-and-white table comparing crude birth rates, crude death rates and natural increase for three fictional countries.',
    questions: [
        {
            id: 'birth-rate-definition',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which statement correctly describes a crude birth rate?',
            instruction: 'Select one definition.',
            options: [
                'The number of live births per 1 000 people in a population in one year',
                'The total number of women who live in a country',
                'The number of people who move into a country each year',
                'The percentage of the population living in cities'
            ],
            correctAnswers: ['The number of live births per 1 000 people in a population in one year'],
            feedback: 'A crude birth rate is the number of live births per 1 000 people in a population in a year.'
        },
        {
            id: 'death-rate-definition',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which statement correctly describes a crude death rate?',
            instruction: 'Select one definition.',
            options: [
                'The number of deaths per 1 000 people in a population in one year',
                'The number of people older than 65 years in a country',
                'The total number of people in a square kilometre',
                'The number of children born in urban areas only'
            ],
            correctAnswers: ['The number of deaths per 1 000 people in a population in one year'],
            feedback: 'A crude death rate is the number of deaths per 1 000 people in a population in a year.'
        },
        {
            id: 'natural-decrease-country',
            marks: 1,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 1,
            prompt: 'Which country is experiencing a natural decrease in population?',
            instruction: 'Use the ledger to select one country.',
            options: ['Northmark', 'Riverland', 'Sunvale', 'All three countries'],
            correctAnswers: ['Northmark'],
            feedback: 'Northmark has a natural increase of -2.4, so its crude death rate is higher than its crude birth rate.'
        },
        {
            id: 'natural-decrease-reason',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Why does Northmark show a natural decrease?',
            instruction: 'Select the explanation supported by the ledger.',
            options: [
                'Its crude death rate is higher than its crude birth rate',
                'Its crude birth rate and crude death rate are equal',
                'Its crude birth rate is much higher than its crude death rate',
                'Its population density is zero'
            ],
            correctAnswers: ['Its crude death rate is higher than its crude birth rate'],
            feedback: 'Natural decrease occurs when deaths exceed births, as shown by Northmark’s negative natural-increase value.'
        },
        {
            id: 'riverland-natural-increase',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Calculate Riverland’s natural increase: 22.8 - 14.9.',
            instruction: 'Select the correct result per 1 000 people.',
            options: ['7.9', '-7.9', '37.7', '0.8'],
            correctAnswers: ['7.9'],
            feedback: 'Natural increase equals crude birth rate minus crude death rate: 22.8 - 14.9 = 7.9 per 1 000 people.'
        },
        {
            id: 'population-distribution-factors',
            marks: 6,
            mode: 'multiple',
            selectLimit: 3,
            pointsPerCorrect: 2,
            prompt: 'Which factors can influence where the world’s population is distributed? Select THREE.',
            instruction: 'Choose any three valid factors and think about why they affect settlement.',
            options: [
                'Reliable water supply',
                'Fertile soil for agriculture',
                'Favourable climate',
                'Employment and economic opportunities',
                'Accessible transport routes',
                'The colour of a country’s flag',
                'The number of letters in its name'
            ],
            correctAnswers: [
                'Reliable water supply',
                'Fertile soil for agriculture',
                'Favourable climate',
                'Employment and economic opportunities',
                'Accessible transport routes'
            ],
            feedback: 'People tend to concentrate where water, fertile land, suitable climate, jobs, resources and transport make settlement more viable.'
        }
    ]
};
