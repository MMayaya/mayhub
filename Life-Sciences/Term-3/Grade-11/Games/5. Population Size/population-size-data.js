/* Grade 11 Life Sciences, Term 3, Topic 5: Population Size.
 * All 59 PDF pages were reviewed, including the population-change infographic,
 * limiting-factor comparison, yeast data and annotated growth curves.
 * Questions are standalone: numbers and curve descriptions are supplied in full.
 * Population calculations use counts over the same interval, not mixed rates.
 * Qualifications: carrying capacity can change with conditions; seasonal weather
 * is not automatically density-dependent. The lesson's death/extinction label is
 * retained for a possible decline, not an inevitable stage of logistic growth.
 * A declining local population is not necessarily extinction of its species.
 * Scientific checks only; no external questions, illustrations or prose copied:
 * https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth
 * https://openstax.org/books/biology-2e/pages/45-4-population-dynamics-and-regulation
 */
(function (global) {
    'use strict';
    const concepts = [
        ['Population', 'A group of organisms of the same species occupying the same area at the same time.'],
        ['Natality', 'The addition of new individuals to a population through births.'],
        ['Mortality', 'The loss of individuals from a population through death.'],
        ['Immigration', 'Movement of individuals into an existing population in an area.'],
        ['Emigration', 'Movement of individuals out of the population in an area.'],
        ['Carrying capacity', 'The population size an environment can support sustainably with its available resources.'],
        ['Environmental resistance', 'The combined effects of environmental conditions that restrict population growth.'],
        ['Population fluctuation', 'Repeated rises and falls in the number of individuals in a population over time.'],
        ['Limiting factor', 'An individual condition or resource that restricts population growth.'],
        ['Dynamic equilibrium', 'A state in which population gains and losses balance over time despite continuing individual changes.'],
        ['Density-dependent factor', 'A limiting influence whose effect on individuals depends on how crowded the population is.'],
        ['Density-independent factor', 'A limiting influence whose occurrence or direct effect does not depend on population crowding.'],
        ['Competition', 'The struggle between organisms for resources that are not available in sufficient amounts for all.'],
        ['Predation', 'An interaction in which one organism kills and eats another.'],
        ['Territorial behaviour', 'Defence of an area by organisms, which can restrict access to space and resources.'],
        ['Exponential growth', 'An accelerating population-growth pattern producing a J-shaped curve when resources are abundant.'],
        ['Logistic growth', 'Population growth that slows as resource limits are reached, producing an S-shaped curve.'],
        ['Lag phase', 'The initial slow-growth phase while a newly established population adjusts and individuals mature.'],
        ['Geometric/logarithmic phase', 'The rapid-growth phase of an establishing population while resistance is low and resources are plentiful.'],
        ['Stationary/equilibrium phase', 'The growth-curve phase in which net growth is low and numbers remain near carrying capacity.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('Which group forms one biological population?', 'Zebra of the same species in one reserve at the same time', 'All animals and plants in a reserve', 'Zebra in unrelated areas at different times', 'All organisms on Earth'),
        mc('Two foals are born into a herd. Which population parameter adds them?', 'Natality', 'Mortality', 'Immigration', 'Emigration'),
        mc('Individuals die during a period of food shortage. Which population parameter records this loss?', 'Mortality', 'Natality', 'Immigration', 'Emigration'),
        mc('Five frogs move into an existing population in a pond. Which parameter is involved?', 'Immigration', 'Emigration', 'Natality', 'Mortality'),
        mc('Birds leave a local population and settle elsewhere. Which parameter reduces the original population?', 'Emigration', 'Immigration', 'Natality', 'Mortality'),
        mc('What is the population size a habitat can support sustainably called?', 'Carrying capacity', 'Natality', 'Immigration', 'Population loss'),
        mc('Food shortage, competition and disease together slow population growth. What describes their combined limiting effect?', 'Environmental resistance', 'Unlimited resources', 'Natality alone', 'Immigration alone'),
        mc('A population repeatedly rises in favourable seasons and falls in unfavourable seasons. What is this pattern?', 'Population fluctuation', 'Constant exponential growth', 'Immigration only', 'Immediate species extinction'),
        mc('What is one condition that restricts population growth called?', 'A limiting factor', 'Unlimited reproductive potential', 'A population gain', 'A birth'),
        mc('Births and arrivals balance deaths and departures over time, although individuals keep changing. What state is this?', 'Dynamic equilibrium', 'No births or deaths', 'Unlimited exponential growth', 'Certain extinction'),
        mc('Competition for food becomes stronger as more animals crowd the same habitat. What type of influence is this?', 'Density-dependent', 'Density-independent', 'Independent of resource demand', 'Always a population gain'),
        mc('An earthquake affects a habitat without being caused by the crowding of its animals. What type of factor is it?', 'Density-independent', 'Density-dependent', 'Natality', 'Immigration'),
        mc('Many zebra need the same limited drinking-water supply. Which interaction is involved?', 'Competition', 'Unlimited resource supply', 'Natality', 'Emigration in every case'),
        mc('A lion kills and eats a zebra. Which interaction can regulate the prey population?', 'Predation', 'Immigration', 'Natality', 'Territorial defence by the zebra'),
        mc('An animal defends an area and excludes others from its resources. What behaviour is shown?', 'Territorial behaviour', 'Immigration', 'Exponential growth', 'Mortality in every case'),
        mc('A population-size curve becomes increasingly steep and has a J-shape. Which growth form is shown?', 'Exponential growth', 'Logistic growth', 'Stationary growth only', 'A decline phase'),
        mc('Growth slows as resources become limited and the curve levels near carrying capacity. Which growth form is shown?', 'Logistic growth', 'Unlimited exponential growth', 'Emigration only', 'A required extinction phase'),
        mc('A newly introduced herd grows slowly while individuals adjust and reach reproductive age. Which phase is this?', 'Lag phase', 'Geometric/logarithmic phase', 'Stationary/equilibrium phase', 'Death/decline phase'),
        mc('The establishing herd now grows rapidly, with abundant food and low resistance. Which phase is this?', 'Geometric/logarithmic phase', 'Lag phase', 'Stationary/equilibrium phase', 'Death/decline phase'),
        mc('A growth curve levels off and population numbers vary slightly near carrying capacity. Which phase is this?', 'Stationary/equilibrium phase', 'Lag phase', 'Geometric/logarithmic phase', 'Death/decline phase')
    ];
    const extraChoice = [
        mc('A population starts at 100. During one month, 8 are born, 12 arrive, 5 die and 7 leave. What is its final size?', '108 individuals', '132 individuals', '92 individuals', '120 individuals'),
        mc('During one season, 10 individuals are born and 5 arrive; 8 die and 7 leave. What is the net change?', '0 individuals', 'An increase of 15', 'A decrease of 15', 'An increase of 30'),
        mc('Which pair represents population gains?', 'Natality and immigration', 'Mortality and emigration', 'Natality and mortality', 'Immigration and emigration'),
        mc('Which pair represents population losses?', 'Mortality and emigration', 'Natality and immigration', 'Natality and emigration', 'Immigration and mortality'),
        mc('A herd starts at 250. Over one season, 20 are born, 5 arrive, 25 die and 10 leave. What happens?', 'It falls to 240', 'It rises to 275', 'It falls to 215', 'It stays at 250'),
        mc('A drought removes much of a habitat’s food and water. What may happen to its carrying capacity?', 'It may decrease', 'It must stay fixed forever', 'It must become unlimited', 'It becomes the same as natality'),
        mc('What commonly happens as a growing population approaches carrying capacity?', 'Competition and environmental resistance increase', 'Resources become unlimited', 'All deaths stop', 'Immigration becomes the only parameter'),
        mc('A habitat can support a population of 500 under current conditions. Its population is temporarily 520. Which statement is accurate?', 'Overshooting carrying capacity is possible, but the extra number may not be sustainable', 'Carrying capacity must mean 520 is impossible even briefly', 'The species must immediately become extinct', 'Carrying capacity no longer depends on resources'),
        mc('Which complete resource set is emphasised in the lesson?', 'Food, water, space and shelter', 'Only sunlight and oxygen for all animals', 'Only predator numbers', 'Only births and deaths'),
        mc('A herd grows after seasonal rain improves food and water supplies. What is the best interpretation?', 'Better resources can improve survival and reproduction', 'Rain is always a density-dependent factor', 'Every increase must be immigration', 'Carrying capacity cannot be affected by conditions'),
        mc('A contagious disease spreads more readily when many animals live close together. Why is its effect density-dependent?', 'Closer contact can increase transmission as crowding rises', 'It is caused only by earthquakes', 'Its spread is unrelated to contact', 'It adds offspring to the population'),
        mc('Which set contains density-independent examples used in the lesson?', 'Drought, floods and extreme temperatures', 'Crowding-related competition, disease spread and territorial exclusion', 'Natality, immigration and births', 'Food competition, predation and waste build-up'),
        mc('More individuals produce waste faster than the habitat can disperse it. How may this limit growth?', 'Waste accumulation can reduce survival or reproduction', 'Waste always increases food without limit', 'Waste removes all environmental resistance', 'The population must grow exponentially forever'),
        mc('Prey become easier for predators to find when prey density rises. Which explanation fits?', 'Predation can have a density-dependent effect', 'Predation is always a birth', 'Predator feeding cannot affect prey numbers', 'Prey density determines whether an earthquake occurs'),
        mc('Both 20-animal and 200-animal herds can be affected by the same severe drought. What does this illustrate?', 'A density-independent event can affect sparse and crowded populations', 'Only crowded populations encounter weather', 'Every drought is caused by competition', 'Both herds must lose exactly the same number'),
        mc('Yeast counts in successive periods are 20, 45, 83, 140 and 395. What is the increase between periods 4 and 5?', '255 cells', '535 cells', '140 cells', '395 cells'),
        mc('Why can rapid exponential growth not continue indefinitely in a finite habitat?', 'Resources become limited and wastes can accumulate', 'All offspring immediately leave every habitat', 'Environmental resistance must remain zero', 'Population numbers never require food or space'),
        mc('Which sequence matches the growth phases before a possible decline in the lesson?', 'Lag, rapid geometric growth, stationary equilibrium', 'Stationary, lag, rapid growth', 'Rapid growth, extinction, lag', 'Decline, stationary, unlimited growth'),
        mc('A severe drought causes a population to fall sharply. Which phase label does the lesson use for such decline?', 'Death/extinction phase', 'Lag phase', 'Geometric/logarithmic phase', 'Stationary/equilibrium phase'),
        mc('A population has stabilised near carrying capacity. Must it then become extinct?', 'No; decline is possible but not inevitable', 'Yes; every logistic curve ends in extinction', 'Yes; stationary means all individuals are dead', 'No; deaths can never occur after equilibrium')
    ];
    const trueFalseFacts = [
        ['A population includes organisms of the same species in one area at the same time.', true, 'A mixed collection of different species is not one population.'],
        ['Natality decreases a population by removing individuals.', false, 'Natality adds offspring through births.'],
        ['Immigration adds individuals to the population receiving them.', true, 'Their movement out of the original population is emigration there.'],
        ['Emigration and mortality are both population gains.', false, 'Both remove individuals from a local population.'],
        ['A population grows when births plus arrivals exceed deaths plus departures.', true, 'Compare all four parameters over the same time interval.'],
        ['Carrying capacity stays unchanged even when resources change.', false, 'The sustainable population size depends on conditions and available resources.'],
        ['Food, water, space and shelter can limit population size.', true, 'A habitat does not provide unlimited resources.'],
        ['Environmental resistance always increases the rate of population growth.', false, 'Its limiting effects restrict growth.'],
        ['Population size may fluctuate around a sustainable level.', true, 'Natural populations need not maintain exactly the same count every day.'],
        ['Dynamic equilibrium means that births, deaths and movement have all stopped.', false, 'These processes can continue while gains and losses balance over time.'],
        ['Competition can become stronger when more individuals share limited resources.', true, 'This is a density-dependent influence.'],
        ['An earthquake happens because the animal population becomes crowded.', false, 'It is a density-independent physical event.'],
        ['Close contact in a crowded population can promote disease transmission.', true, 'Disease spread can therefore have a density-dependent effect.'],
        ['A density-independent event must kill exactly the same number in every population.', false, 'The classification concerns dependence on crowding, not identical totals.'],
        ['Predation can contribute to regulating prey numbers.', true, 'Predators remove prey, and prey density can influence encounters.'],
        ['Exponential population growth is represented by an S-shaped curve.', false, 'It has a J-shaped curve; logistic growth is S-shaped.'],
        ['The lag phase may include adjustment to a habitat and maturation before reproduction.', true, 'These processes help explain initially slow growth.'],
        ['Resources and space are always unlimited during stationary equilibrium.', false, 'Resource limits and environmental resistance help slow net growth.'],
        ['The geometric/logarithmic phase is a period of rapid population growth.', true, 'Resources are plentiful and resistance is comparatively low in the lesson’s example.'],
        ['Every population must become extinct immediately after reaching carrying capacity.', false, 'A population can persist near carrying capacity; severe conditions may cause decline, but it is not inevitable.']
    ];
    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allChoice = multipleChoice.concat(extraChoice);
    const snake = Object.fromEntries([0, 1, 2, 3].map(group => ['game' + (group + 1),
        multipleChoice.slice(group * 5, group * 5 + 5).concat(extraChoice.slice(group * 5, group * 5 + 5)).map((item, index) => {
            const right = item.a.slice(3);
            const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
            for (let i = 0; i < index % 4; i++) options.push(options.shift());
            return { q: item.q, options, a: options.indexOf(right) };
        })
    ]));
    const factPairs = [
        ['Population size', 'The number of individuals of one species in the area being studied'],
        ['Four population parameters', 'Births, deaths, movement into an area and movement out of it'],
        ['Population gains', 'Births plus individuals arriving in the area'],
        ['Population losses', 'Deaths plus individuals departing from the area'],
        ['Net population change', 'Gains minus losses over the same time interval'],
        ['Habitat resources', 'Food, water, space and shelter needed to sustain individuals'],
        ['Resource scarcity', 'Short supplies that can reduce survival or reproduction'],
        ['Favourable season', 'Improved conditions that can support more survival and births'],
        ['Unfavourable season', 'Worsening conditions that can increase losses or reduce births'],
        ['Changing carrying capacity', 'A shift in sustainable numbers when habitat resources or conditions change'],
        ['Crowding-related disease spread', 'More frequent contact can increase transmission between individuals'],
        ['Waste accumulation', 'Build-up of unwanted products that can impair survival or reproduction'],
        ['Drought', 'Prolonged shortage of rain: a density-independent weather influence'],
        ['Flood', 'Inundation by excess water: a density-independent event'],
        ['Earthquake', 'Movement of the Earth’s crust, unrelated to animal crowding'],
        ['J-shaped curve', 'Graph rising increasingly steeply during exponential population growth'],
        ['S-shaped curve', 'Graph that rises then levels near carrying capacity during logistic growth'],
        ['Death/extinction phase', 'The lesson’s label for possible sharp decline under severe limiting conditions'],
        ['Growth-graph horizontal axis', 'Time, measured in days, weeks, months or years as appropriate'],
        ['Growth-graph vertical axis', 'Population size, shown as the number of individuals']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 2, 3, 4, 5, 10, 11, 15, 16, 20, 24, 30, 35, 39];
    const hints = [
        'One population belongs to one species in the same area and time.',
        'Births add offspring to the herd.',
        'This parameter records deaths.',
        'Think of movement IN.',
        'Think of movement OUT.',
        'The environment has a sustainable resource limit.',
        'Crowding increases pressure on shared food.',
        'An earthquake is not caused by animal numbers.',
        'An increasingly steep curve has the shape of J.',
        'Look for limitation and a plateau.',
        'Add 8 and 12, then subtract 5 and 7 from 100.',
        'Compare total additions of 25 with total losses of 35.',
        'More close contact can increase infection spread.',
        'Subtract the period-4 count from the period-5 count.',
        'Equilibrium does not require an inevitable collapse.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['State the species, area and time requirements for one population.', 'Individuals of the same species must occupy the same area at the same time'],
        ['Why do zebra, lions and grasses in one reserve not form one population?', 'They belong to different species; each species has its own population'],
        ['Distinguish natality from mortality.', 'Natality adds individuals through births; mortality removes individuals through death'],
        ['Distinguish immigration from emigration relative to the population being studied.', 'Immigration brings individuals into it; emigration takes individuals out of it'],
        ['Name the two parameters that add individuals and the two that remove them.', 'Gains: natality and immigration; losses: mortality and emigration'],
        ['Write a population-change relationship using all four parameters.', 'Change equals births plus immigration minus deaths minus emigration, over the same interval'],
        ['A population starts at 80. In a month, 12 are born, 6 arrive, 9 die and 4 leave. Calculate its final size.', '85 individuals: 80 + 12 + 6 - 9 - 4'],
        ['A herd has 18 births and 2 arrivals, with 13 deaths and 7 departures in one season. What is its net change?', 'Zero: gains and losses are both 20'],
        ['What does it mean to say population numbers are dynamic?', 'They can change over time through births, deaths, movement and changing conditions'],
        ['Explain why more births do not always mean an overall population increase.', 'Deaths and departures may still exceed births and arrivals combined'],
        ['Define carrying capacity and name two resources that help determine it.', 'The sustainable number a habitat can support; examples include food, water, space and shelter'],
        ['Explain environmental resistance using two examples.', 'Combined limiting influences restrict growth; examples include competition, resource shortage, disease and predation'],
        ['How can improved food and water supplies affect a habitat’s carrying capacity?', 'They can increase the number it can support sustainably, if other conditions allow'],
        ['What happens to resource demand as a population grows?', 'More individuals require resources, increasing total demand and often competition'],
        ['Distinguish a limiting factor from carrying capacity.', 'A limiting factor restricts growth; carrying capacity is the sustainable number supported by the habitat'],
        ['Why might a zebra population fall during a season with little food and water?', 'Survival or reproduction may decrease, deaths may rise, or individuals may leave'],
        ['Why may population numbers rise after conditions improve in spring or summer?', 'Improved resources can support survival and reproduction, allowing gains to exceed losses'],
        ['Explain why equilibrium does not mean that no individuals are born or die.', 'Births, deaths and movement can continue while gains and losses balance over time'],
        ['A habitat supports 300 individuals sustainably under current conditions. Its count briefly reaches 320. Explain this situation.', 'The population has overshot carrying capacity; 320 may not be supported sustainably'],
        ['Why is a population’s recent average count not automatically proof of carrying capacity?', 'Carrying capacity concerns sustainable resource support, not simply any observed average'],
        ['State the difference between density-dependent and density-independent limiting influences.', 'The former depend on crowding; the latter act without their occurrence or direct effect depending on crowding'],
        ['Explain why competition for a fixed food supply can strengthen as density rises.', 'More individuals share the same limited supply, leaving less available per individual'],
        ['How can population crowding promote the spread of a contagious disease?', 'More frequent close contact can increase transmission between individuals'],
        ['Give three physical events classified as density-independent in the lesson.', 'Examples include drought, floods, earthquakes and extreme temperatures'],
        ['Why can both a small herd and a large herd be affected by severe drought?', 'A drought does not depend on how crowded the animal population is'],
        ['How can predation contribute to regulating a prey population?', 'Predators remove prey; increased prey density may make encounters easier'],
        ['Explain how territorial behaviour can limit a population’s growth.', 'Defence of areas can restrict access to space, shelter or other resources'],
        ['How can waste build-up act as a limiting influence in a dense population?', 'More accumulated waste can impair survival or reproduction'],
        ['Must a density-independent disaster remove the same number from every population? Explain.', 'No; the classification concerns dependence on crowding, not identical numbers lost'],
        ['Why should seasonal fluctuation not automatically be called density-dependent?', 'Its cause matters: seasonal weather can be density-independent, while crowding-related competition is density-dependent'],
        ['Compare the characteristic shapes of exponential and logistic growth curves.', 'Exponential growth is J-shaped; logistic growth is S-shaped and levels near carrying capacity'],
        ['What conditions allow an initially rapid exponential increase?', 'Abundant resources, low environmental resistance and successful reproduction'],
        ['Why is indefinite exponential growth unlikely in a finite habitat?', 'Resources become limited and limiting effects such as competition and waste build-up increase'],
        ['Explain the slow growth of a newly introduced population during its lag phase.', 'Individuals adjust to the habitat and may need time to mature and reproduce'],
        ['What changes allow an establishing population to enter rapid geometric/logarithmic growth?', 'More individuals reproduce while resources remain plentiful and resistance remains low'],
        ['Explain why net growth slows in the stationary/equilibrium phase.', 'Limited resources and stronger environmental resistance make gains and losses more balanced'],
        ['Name the horizontal and vertical axes of a population-growth graph.', 'Horizontal: time; vertical: population size or number of individuals'],
        ['Yeast counts at periods 1 to 5 are 20, 45, 83, 140 and 395. Which interval has the largest increase, and how large is it?', 'Periods 4 to 5: an increase of 255 cells'],
        ['What does the lesson’s death/extinction phase label describe, and is that outcome unavoidable?', 'It describes possible severe population decline; it is not an inevitable outcome for every population'],
        ['A local population falls but some individuals remain. Does that prove extinction of the species? Explain.', 'No; decline is not complete disappearance, and local population loss differs from extinction of the whole species']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.PopulationSizeTopic5 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
