window.Grade10GeoQuestStage5Data = {
    sourceTitle: 'The Rural-Urban Journey',
    sourceImage: 'sources/rural-urban-journey.jpg',
    sourceAlt: 'A regenerated black-and-white cartoon showing rural farming and livestock on the left, a young worker travelling on a road, and city jobs and buildings on the right.',
    questions: [
        {
            id: 'rural-urban-definition',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which statement best defines rural-urban migration?',
            instruction: 'Select one definition.',
            options: [
                'The movement of people from rural areas to urban areas to live or work',
                'The movement of people from one rural village to another',
                'The increase in the number of farm animals in a rural area',
                'The spread of people across a country without moving home'
            ],
            correctAnswers: ['The movement of people from rural areas to urban areas to live or work'],
            feedback: 'Rural-urban migration is movement from the countryside to towns and cities, commonly in search of work and opportunities.'
        },
        {
            id: 'likely-migrant-group',
            marks: 1,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 1,
            prompt: 'Which group is most likely to move along the road from the rural area to the urban area?',
            instruction: 'Use the source and your geographical knowledge.',
            options: ['Young adults of working age', 'Retired elderly people only', 'Newborn babies', 'People who already own city factories'],
            correctAnswers: ['Young adults of working age'],
            feedback: 'Young adults are often the most mobile group because they seek education, employment and higher incomes in urban areas.'
        },
        {
            id: 'economic-pull-factor',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which economic pull factor is shown on the urban side of the source?',
            instruction: 'Select the strongest economic reason for the move.',
            options: [
                'Job vacancies and the chance to earn an income',
                'More grazing land for cattle',
                'A lower population density in the city',
                'A guarantee that all city housing is free'
            ],
            correctAnswers: ['Job vacancies and the chance to earn an income'],
            feedback: 'The vacancies sign shows that access to jobs and income is an economic pull factor drawing migrants to urban areas.'
        },
        {
            id: 'agriculture-evidence',
            marks: 4,
            mode: 'multiple',
            selectLimit: 2,
            pointsPerCorrect: 2,
            prompt: 'Which TWO source details show that agriculture is important in the rural area?',
            instruction: 'Choose two pieces of visual evidence.',
            options: [
                'Cultivated crop rows in the field',
                'Cattle beside the rural homestead',
                'High-rise office buildings',
                'A work-vacancies sign',
                'The paved road leading to the city'
            ],
            correctAnswers: ['Cultivated crop rows in the field', 'Cattle beside the rural homestead'],
            feedback: 'The cultivated field and livestock are direct visual evidence that farming is an important rural economic activity.'
        },
        {
            id: 'rural-effects',
            marks: 6,
            mode: 'multiple',
            selectLimit: 3,
            pointsPerCorrect: 2,
            prompt: 'Rural-urban migration can harm rural communities. Select THREE likely negative effects.',
            instruction: 'Choose three connected impacts on the rural area.',
            options: [
                'Loss of young and economically active workers',
                'Labour shortages that can reduce agricultural production',
                'An ageing population and a higher dependency burden',
                'A shrinking customer base for rural services and businesses',
                'Automatic growth of rural job opportunities',
                'Guaranteed improvements to every rural road and clinic'
            ],
            correctAnswers: [
                'Loss of young and economically active workers',
                'Labour shortages that can reduce agricultural production',
                'An ageing population and a higher dependency burden',
                'A shrinking customer base for rural services and businesses'
            ],
            feedback: 'When young workers leave, rural areas can lose labour, production, customers and tax income while the dependency burden rises.'
        }
    ]
};
