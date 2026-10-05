/* Grade 9 Social Sciences Geography, Term 4, Week 4.
 * Based on the supplied lesson's resource examples, energy illustrations,
 * overfishing case study and overgrazing consequences.
 * Renewable resources are not presented as unlimited: replenishment must keep pace with use.
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Natural resources', 'Materials or substances occurring in nature that people can use for economic benefit.'],
        ['Renewable resources', 'Resources that can be replenished naturally over relatively short periods when used responsibly.'],
        ['Non-renewable resources', 'Resources that do not replenish quickly enough to replace what people extract and use.'],
        ['Fossil fuels', 'Coal, oil and natural gas: non-renewable fuels formed from ancient organic material.'],
        ['Minerals', 'Naturally occurring solid materials in the Earth that can be extracted for economic use.'],
        ['Solar energy', 'Energy obtained from sunlight.'],
        ['Wind energy', 'Energy obtained from moving air.'],
        ['Water', 'A natural resource replenished through the water cycle, although local supplies can be overused.'],
        ['Timber', 'Wood from trees that can be renewed when forests are allowed to regrow.'],
        ['Biomass', 'Organic material from plants or animals that can be used as an energy resource.'],
        ['Overfishing', 'Catching fish faster than their populations can replace themselves.'],
        ['Fish stocks', 'Fish populations available in a particular area.'],
        ['Depletion', 'A reduction in the amount of a resource available.'],
        ['Marine ecosystem', 'A system of living organisms and their interactions with the sea environment.'],
        ['Atlantic cod', 'The fish whose Canadian fishery collapse is used as an example of overfishing in the lesson.'],
        ['Overgrazing', 'Livestock eating and damaging vegetation faster than it can recover.'],
        ['Soil erosion', 'The removal of soil by forces such as wind or flowing water.'],
        ['Desertification', 'The degradation of dryland into increasingly barren, desert-like conditions.'],
        ['Biodiversity', 'The variety of living organisms in an area.'],
        ['Sahel', 'The African region used in the lesson as an example of overgrazing contributing to desertification.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return {
            q,
            options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice),
            a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right
        };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('What makes a material a natural resource?', 'It occurs in nature and can be used by people', 'It must be manufactured in a factory', 'It must be impossible to use economically', 'It must always be a fossil fuel'),
        mc('Which description distinguishes renewable resources?', 'They can be replenished naturally over relatively short periods', 'They never need time to recover', 'They cannot be replaced naturally', 'They consist only of coal, oil and gas'),
        mc('Why are fossil fuels classified as non-renewable?', 'They do not reform quickly enough to replace what is used', 'They are replaced as quickly as every tank is filled', 'They are created by daily rainfall', 'They all come directly from moving air'),
        mc('Which group contains only fossil fuels?', 'Coal, oil and natural gas', 'Solar energy, wind energy and water', 'Timber, biomass and water', 'Wind energy, coal and sunlight'),
        mc('Which pair is listed as non-renewable in the lesson?', 'Minerals and metals', 'Water and timber', 'Wind and sunlight', 'Timber and biomass'),
        mc('Which renewable energy resource is captured by solar panels?', 'Sunlight', 'Coal deposits', 'Crude oil', 'Natural gas'),
        mc('What is the natural source of wind energy?', 'Moving air', 'An underground coal seam', 'Oil stored in a barrel', 'Metal ore in the ground'),
        mc('Which statement about renewable water supplies is most accurate?', 'Water is replenished naturally, but local supplies can still be overused', 'Every river has an unlimited supply at all times', 'Water is a fossil fuel', 'Using water faster than it is replenished cannot cause shortages'),
        mc('What helps timber remain a renewable resource?', 'Allowing trees to regrow to replace those harvested', 'Removing every tree before it can regrow', 'Treating trees as an unlimited supply', 'Replacing forests with coal mines'),
        mc('Which resource is organic material that can be used for energy?', 'Biomass', 'Metal ore', 'Crude oil only', 'Wind'),
        mc('When does fishing become overfishing?', 'Fish are caught faster than their populations replace themselves', 'Fish populations recover faster than fish are caught', 'Fishers catch no fish at all', 'Every fish caught is automatically replaced that day'),
        mc('What is a direct consequence of overfishing?', 'Depletion of fish stocks', 'An unlimited increase in fish stocks', 'The creation of new mineral deposits', 'The natural formation of fossil fuels'),
        mc('How can overfishing affect the sea environment?', 'It can disrupt marine ecosystems', 'It always improves every marine ecosystem', 'It affects only livestock grazing', 'It immediately restores all fish populations'),
        mc('Which community is most directly exposed to economic loss when local fish stocks collapse?', 'A community dependent on fishing', 'A community with no connection to fishing', 'A community supplied only by wind turbines', 'A community that uses no sea resources'),
        mc('Which case study of overfishing appears in the lesson?', 'The collapse of the Atlantic cod fishery in Canada', 'Overgrazing in the Sahel', 'Timber regrowth after harvesting', 'Solar panels collecting sunlight'),
        mc('What makes grazing excessive?', 'Livestock damage vegetation faster than it can recover', 'Vegetation recovers before it is grazed again', 'Animals graze without damaging the vegetation', 'The land remains well covered by recovering plants'),
        mc('Which soil problem can follow the loss of plant cover through overgrazing?', 'Soil erosion', 'The creation of coal deposits', 'An automatic increase in topsoil', 'The replacement of soil by fish stocks'),
        mc('Which consequence involves land becoming increasingly barren and desert-like?', 'Desertification', 'Timber regrowth', 'Renewable energy production', 'Recovery of fish populations'),
        mc('What can overgrazing do to biodiversity?', 'Reduce the variety of living organisms in an area', 'Guarantee that every species increases', 'Create an unlimited number of new species', 'Affect only fish in the sea'),
        mc('Which region illustrates overgrazing contributing to desertification in the lesson?', 'The Sahel', 'The Canadian Atlantic cod fishery', 'A solar-panel factory', 'An offshore oil platform')
    ];

    const extraChoice = [
        mc('A mine extracts a mineral deposit much faster than nature replaces it. How is the resource classified?', 'Non-renewable', 'Renewable on a daily basis', 'A marine ecosystem', 'A replenished fish stock'),
        mc('Which comparison correctly distinguishes the two resource types?', 'Renewable resources replenish relatively quickly; non-renewable resources do not', 'Non-renewable resources replenish each day; renewable resources never do', 'Both are always replaced immediately after use', 'Neither type occurs in nature'),
        mc('Which resource in the lesson comes from trees rather than fossil-fuel deposits?', 'Timber', 'Coal', 'Oil', 'Natural gas'),
        mc('Which example in the lesson is non-renewable?', 'Coal', 'Wind energy', 'Solar energy', 'Biomass'),
        mc('Why is being useful to people important to the definition of a natural resource?', 'A natural material becomes a resource when people can use it', 'Useful materials must all be artificial', 'Economic use means the material cannot occur naturally', 'Only materials that cannot be used are resources'),
        mc('Which pair consists of renewable energy examples from the lesson?', 'Solar energy and wind energy', 'Coal and oil', 'Oil and natural gas', 'Coal and minerals'),
        mc('A turbine turns because air moves past its blades. Which resource is it using?', 'Wind energy', 'Oil', 'Coal', 'Timber'),
        mc('Which energy resource is collected directly from sunshine rather than burning a fuel?', 'Solar energy', 'Coal', 'Oil', 'Natural gas'),
        mc('Why does the word renewable not mean a resource can always be used without limits?', 'Use can exceed the rate at which the resource is replenished', 'Renewable resources are all minerals', 'Renewable resources never recover naturally', 'Only non-renewable resources can be overused'),
        mc('Which contrast between timber and coal is correct?', 'Trees can regrow relatively quickly, while coal does not reform fast enough to replace use', 'Coal regrows each season, but trees never regrow', 'Both are obtained from moving air', 'Neither can be used economically'),
        mc('Fishers remove 1 000 fish while the population replaces only 600 during the same period. What is happening?', 'Overfishing', 'Recovery of the fish stock', 'Overgrazing', 'Timber regrowth'),
        mc('Why is a falling fish stock a warning about the use of a renewable resource?', 'Fish are being removed faster than the population can recover', 'Renewable resources can never be depleted', 'Fish stocks are always replaced immediately', 'All fishing increases the population'),
        mc('How can fewer fish threaten local fishing livelihoods?', 'There may be fewer fish to catch and sell', 'Every fishing household automatically earns more', 'Fishing communities stop needing fish to sell', 'A reduced catch immediately creates more fishing jobs'),
        mc('What is meant by disruption of a marine ecosystem?', 'The sea’s organisms and their interactions are disturbed', 'Trees are allowed to regrow after cutting', 'Livestock stop damaging vegetation', 'Minerals replenish faster than they are mined'),
        mc('What is the main lesson of the Atlantic cod fishery collapse?', 'Overusing fish resources can damage both populations and fishing livelihoods', 'Renewable fish resources can never run out locally', 'Fishing communities are unaffected by fish stocks', 'Overfishing is the same process as overgrazing'),
        mc('Livestock repeatedly graze a field before its plants recover. Which process is this?', 'Overgrazing', 'Overfishing', 'Replenishment of mineral deposits', 'Recovery of vegetation'),
        mc('Why can overgrazing make soil easier to erode?', 'It reduces the vegetation that protects the soil', 'It guarantees complete plant cover', 'It replaces the soil with renewable water', 'It makes all winds and rainfall stop'),
        mc('Which group lists three consequences of overgrazing from the lesson?', 'Soil erosion, desertification and biodiversity loss', 'Fish-stock recovery, timber regrowth and more topsoil', 'Mineral renewal, coal regrowth and more sunlight', 'Marine recovery, increased fish stocks and unlimited grazing'),
        mc('What is meant by a loss of biodiversity on grazing land?', 'There is less variety among the living organisms in the area', 'The number of types of organism always increases', 'Only the amount of oil underground changes', 'Every plant becomes more able to recover'),
        mc('What shared problem links overfishing and overgrazing?', 'Resources are used faster than living populations or vegetation can recover', 'Both create fossil fuels within days', 'Both guarantee unlimited natural recovery', 'Neither affects people who depend on natural resources')
    ];

    const trueFalseFacts = [
        ['Natural resources: useful materials or substances that occur in nature.', true, 'People use naturally occurring materials for economic benefit.'],
        ['Renewable resources: resources that cannot be replenished naturally.', false, 'Renewable resources can replenish naturally over relatively short periods.'],
        ['Coal, oil and natural gas are fossil fuels.', true, 'The lesson lists these three examples of fossil fuels.'],
        ['Minerals and metals are replaced as quickly as people extract them.', false, 'They are classified as non-renewable because replacement is too slow.'],
        ['Solar energy comes from sunlight.', true, 'Sunlight is the source of solar energy.'],
        ['Wind energy is obtained by burning coal.', false, 'Wind energy uses moving air rather than burning coal.'],
        ['Timber can be renewed when trees are allowed to regrow.', true, 'Regrowth must be able to replace harvested trees.'],
        ['Calling water renewable means every local water supply is unlimited.', false, 'Replenishment does not prevent local overuse or shortages.'],
        ['Biomass can be used as a renewable energy resource.', true, 'Biomass is organic material that can be renewed when managed responsibly.'],
        ['Overfishing occurs only when fish populations recover faster than the catch removes them.', false, 'Overfishing removes fish faster than their populations can replace themselves.'],
        ['Overfishing can deplete fish stocks.', true, 'The available fish population can decline when it cannot recover fast enough.'],
        ['Overfishing always improves the balance of marine ecosystems.', false, 'It can disrupt marine ecosystems by reducing fish populations.'],
        ['Fishing communities can suffer economic loss when fish stocks decline.', true, 'People dependent on fishing may have less catch to sell.'],
        ['The Atlantic cod fishery case study describes overgrazing in the Sahel.', false, 'The cod fishery collapse is the Canadian overfishing example.'],
        ['Overgrazing damages vegetation faster than it can recover.', true, 'Repeated excessive grazing prevents vegetation from recovering.'],
        ['Removing plant cover through overgrazing always protects the soil from erosion.', false, 'Reduced plant cover leaves soil more exposed to erosion.'],
        ['Desertification can be a consequence of overgrazing.', true, 'Damage to vegetation and land can contribute to desert-like conditions.'],
        ['A loss of biodiversity means an increase in the variety of living organisms.', false, 'Biodiversity loss means a reduction in that variety.'],
        ['The Sahel is used as an example of overgrazing contributing to desertification.', true, 'The lesson uses the Sahel to illustrate this consequence.'],
        ['Overfishing and overgrazing both leave natural recovery unaffected.', false, 'Both involve using living resources faster than they can recover.']
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
        ['Coal, oil and natural gas', 'The lesson’s three examples of fossil fuels'],
        ['Minerals and metals', 'Non-renewable materials extracted from the Earth'],
        ['Natural replenishment', 'The process that replaces renewable resources over time'],
        ['Slow replacement', 'Reason fossil fuels cannot be used indefinitely as a renewable supply'],
        ['Economic benefit', 'The useful value people gain by exploiting a natural resource'],
        ['Solar panel', 'Equipment that collects energy from sunlight'],
        ['Wind turbine', 'Equipment whose blades turn using moving air'],
        ['Forest regrowth', 'Process that can replace trees cut for timber'],
        ['Organic material', 'Plant or animal matter that makes up biomass'],
        ['Water cycle', 'Natural process that circulates and replenishes water'],
        ['Canada', 'Country of the Atlantic cod fishery case study'],
        ['Reduced catches', 'Fishing outcome when fewer fish are available'],
        ['Fishing community', 'People whose livelihoods can suffer when fish stocks collapse'],
        ['Too much fishing', 'Activity that removes fish faster than the population replaces them'],
        ['Ecosystem disruption', 'Disturbance of relationships between organisms in the sea'],
        ['Livestock', 'Grazing animals that can damage vegetation when too numerous for the land'],
        ['Reduced plant cover', 'Visible result when grazing damages vegetation faster than it regrows'],
        ['Exposed soil', 'Ground left less protected after vegetation is removed'],
        ['Desert-like land', 'Barren conditions associated with desertification'],
        ['Fewer kinds of organism', 'What biodiversity loss means for living things in an area']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 5, 6, 3, 9, 8, 10, 15, 4, 14, 19, 30, 23, 36, 39];
    const hints = [
        'Think about where the material comes from and whether people can use it.',
        'Solar panels collect energy from the Sun.',
        'A wind turbine uses air moving past its blades.',
        'All three examples must be fossil fuels.',
        'Look for plant or animal material.',
        'Harvesting must allow replacement trees to grow.',
        'Compare the speed of catching fish with the speed of their recovery.',
        'Compare vegetation damage with the rate of regrowth.',
        'These materials are mined and replaced very slowly.',
        'The fishing example is Canadian, not the grazing example in the Sahel.',
        'The lesson uses the Sahel for land degradation caused by excessive grazing.',
        'The catch removes more fish than the population replaces.',
        'Coal cannot be replaced on the short timescale of renewable resources.',
        'Plant cover helps protect soil.',
        'Both activities become excessive when use outpaces recovery.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What are natural resources?', 'Useful materials or substances that occur in nature'],
        ['What makes a resource renewable?', 'It can replenish naturally over relatively short periods'],
        ['What makes a resource non-renewable?', 'It does not replenish fast enough to replace extraction and use'],
        ['Name the three fossil fuels listed in the lesson.', 'Coal, oil and natural gas'],
        ['How are minerals and metals classified in the lesson?', 'Non-renewable resources'],
        ['Why does using a natural material for economic benefit make it a resource?', 'It has useful value to people'],
        ['Why can coal not be replaced as quickly as people use it?', 'It forms over a much longer period than the timescale of extraction and use'],
        ['Name two renewable resources from the lesson that do not involve burning fossil fuels.', 'Solar energy and wind energy; water and timber are also accepted renewable examples'],
        ['Which listed resource can regrow as trees after it is harvested?', 'Timber'],
        ['Why is the rate of replacement important when classifying resources?', 'It determines whether natural replenishment can replace what people use'],
        ['What is the source of solar energy?', 'Sunlight'],
        ['What natural movement provides wind energy?', 'Moving air'],
        ['What kind of material makes up biomass?', 'Organic material from plants or animals'],
        ['What process replenishes water naturally?', 'The water cycle'],
        ['What must happen to harvested forests for timber to remain renewable?', 'Trees must regrow to replace those harvested'],
        ['What does a solar panel collect?', 'Energy from sunlight'],
        ['What turns the blades of a wind turbine?', 'Moving air'],
        ['Why can a renewable resource still be depleted locally?', 'People may use it faster than it can be replenished'],
        ['How does tree regrowth differ from the replacement of a coal deposit?', 'Trees can regrow relatively quickly, while coal takes far longer to reform'],
        ['Why is an unlimited local water supply not guaranteed by calling water renewable?', 'Local use can exceed replenishment and cause shortages'],
        ['What is overfishing?', 'Catching fish faster than their populations replace themselves'],
        ['What are fish stocks?', 'Fish populations available in an area'],
        ['What happens to fish stocks when overfishing continues?', 'They become depleted or decline'],
        ['What is a marine ecosystem?', 'Organisms and their interactions with the sea environment'],
        ['Which fishery collapse is the lesson’s overfishing case study?', 'The Atlantic cod fishery in Canada'],
        ['How can declining fish stocks cause economic loss?', 'Fishing communities have fewer fish to catch and sell'],
        ['What does depletion of fish stocks mean?', 'A reduction in the fish population available'],
        ['Why are communities dependent on fishing affected by a fishery collapse?', 'Their food, work or income depends on the fish resource'],
        ['A fish population replaces 600 fish while fishers remove 1 000. What process does this illustrate?', 'Overfishing'],
        ['What environmental effect of overfishing is listed alongside fish-stock depletion?', 'Disruption of marine ecosystems'],
        ['What is overgrazing?', 'Livestock damaging vegetation faster than it can recover'],
        ['Name the three consequences of overgrazing given in the lesson.', 'Soil erosion, desertification and loss of biodiversity'],
        ['What is soil erosion?', 'The removal of soil, for example by wind or flowing water'],
        ['What is desertification?', 'Dryland degradation that creates increasingly barren, desert-like conditions'],
        ['What does biodiversity mean?', 'The variety of living organisms in an area'],
        ['Which region is used to illustrate overgrazing leading to desertification?', 'The Sahel'],
        ['Why can the loss of vegetation make soil more vulnerable to erosion?', 'There is less plant cover to protect the soil'],
        ['What does a loss of biodiversity mean for an area?', 'There is less variety of living organisms'],
        ['Why is repeated grazing before plants recover a problem?', 'Damage outpaces vegetation regrowth and reduces plant cover'],
        ['What do overfishing and overgrazing have in common?', 'Living resources are used faster than populations or vegetation can recover']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.ResourcesWeek4 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
