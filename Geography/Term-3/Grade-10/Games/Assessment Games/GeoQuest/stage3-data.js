window.Grade10GeoQuestStage3Data = {
    sourceTitle: 'Population Pyramid',
    sourceImage: 'sources/population-pyramid-country-k.jpg',
    sourceAlt: 'A regenerated black-and-white population pyramid for fictional Country K, with a broad youthful base and a narrow elderly top.',
    questions: [
        {
            id: 'population-pyramid-definition',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which statement best defines a population pyramid?',
            instruction: 'Select one definition.',
            options: [
                'A graph showing the age and sex structure of a population',
                'A map showing where settlements are located',
                'A table comparing births and deaths in different countries',
                'A diagram showing the movement of people between places'
            ],
            correctAnswers: ['A graph showing the age and sex structure of a population'],
            feedback: 'A population pyramid is a graph that displays the age and sex composition of a population.'
        },
        {
            id: 'country-development-level',
            marks: 1,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 1,
            prompt: 'Which country category is represented by the pyramid?',
            instruction: 'Select one category after studying its overall shape.',
            options: [
                'Developing country',
                'Developed country',
                'Country with no population growth',
                'Country with an ageing majority'
            ],
            correctAnswers: ['Developing country'],
            feedback: 'The broad base and rapid narrowing are typical of a developing country with high birth rates and relatively few elderly people.'
        },
        {
            id: 'infant-mortality-evidence',
            marks: 2,
            mode: 'single',
            selectLimit: 1,
            pointsPerCorrect: 2,
            prompt: 'Which feature provides the clearest evidence of high infant and child mortality?',
            instruction: 'Select the observation best supported by the source.',
            options: [
                'The pyramid narrows rapidly above the youngest age groups, showing that many children do not survive into later cohorts',
                'The male and female sides use different shading patterns',
                'Females slightly outnumber males in the oldest group',
                'The horizontal axis is measured in percentages'
            ],
            correctAnswers: ['The pyramid narrows rapidly above the youngest age groups, showing that many children do not survive into later cohorts'],
            feedback: 'The sharp reduction from the very broad base into later childhood cohorts indicates that many children do not survive to older ages.'
        },
        {
            id: 'life-expectancy-reasons',
            marks: 4,
            mode: 'multiple',
            selectLimit: 2,
            pointsPerCorrect: 2,
            prompt: 'The small elderly population suggests low life expectancy. Select TWO possible reasons.',
            instruction: 'Choose any two defensible reasons.',
            options: [
                'Limited access to quality healthcare',
                'Infectious diseases and poor sanitation',
                'Malnutrition and food insecurity',
                'Poverty and unsafe living conditions',
                'Universal access to advanced medical care',
                'Very high pensions and living standards'
            ],
            correctAnswers: [
                'Limited access to quality healthcare',
                'Infectious diseases and poor sanitation',
                'Malnutrition and food insecurity',
                'Poverty and unsafe living conditions'
            ],
            feedback: 'Low life expectancy may result from weak healthcare access, disease, poor sanitation, malnutrition, poverty or unsafe living conditions.'
        },
        {
            id: 'government-planning',
            marks: 6,
            mode: 'multiple',
            selectLimit: 3,
            pointsPerCorrect: 2,
            prompt: 'How can this population pyramid help the government plan? Select THREE uses.',
            instruction: 'Choose any three valid planning decisions.',
            options: [
                'Plan schools, classrooms and teachers for the large young population',
                'Plan maternal, child-health and other healthcare services',
                'Estimate future training and employment needs',
                'Plan housing, water, sanitation and other basic services',
                'Prepare pensions and elderly-care services for older groups',
                'Choose the colours of the national flag',
                'Predict the exact daily weather for every settlement'
            ],
            correctAnswers: [
                'Plan schools, classrooms and teachers for the large young population',
                'Plan maternal, child-health and other healthcare services',
                'Estimate future training and employment needs',
                'Plan housing, water, sanitation and other basic services',
                'Prepare pensions and elderly-care services for older groups'
            ],
            feedback: 'Population pyramids help governments anticipate demand for education, healthcare, jobs, housing, services and support for different age groups.'
        }
    ]
};
