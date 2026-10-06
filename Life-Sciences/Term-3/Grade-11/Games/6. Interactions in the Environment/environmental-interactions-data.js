/* Grade 11 Life Sciences, Term 3, Topic 6: Interactions in the Environment.
 * All 121 supplied PDF pages reviewed, including the second section on
 * symbiosis, human populations and human impacts. Prompts supply their own
 * scenarios; learners do not need an unseen graph or slide to answer.
 * Scientific qualifications: exclusion in a culture is not global extinction;
 * temporal partitioning uses a hypothetical example, not a fixed lion/day rule;
 * bilharzia larvae penetrate intact skin; GM benefits/risks depend on the trait;
 * wetlands and grey-water reuse do not guarantee safe drinking water.
 * Carbon footprints include greenhouse gases, not just CO2; BOD concerns
 * oxygen-consuming decomposition and is not a test for every pollutant.
 * Sources used only for scientific checks, not copied question banks:
 * https://openstax.org/books/biology/pages/45-6-community-ecology
 * https://www.who.int/news-room/fact-sheets/detail/schistosomiasis
 * https://www.who.int/news-room/questions-and-answers/item/food-genetically-modified
 * https://water.usgs.gov/nawqa/glos.html
 * https://www.usgs.gov/mission-areas/water-resources/science/groundwater-basics
 * https://ozone.unep.org/treaties/montreal-protocol
 */
(function (global) {
    'use strict';
    const concepts = [
        ['Predator', 'An animal that hunts, kills and eats another living animal.'],
        ['Prey', 'An animal that is hunted, killed and eaten by a predator.'],
        ['Time lag', 'A delay between a change in prey numbers and the response of the predator population.'],
        ['Intraspecific competition', 'Competition for limited resources between individuals of the same species.'],
        ['Interspecific competition', 'Competition for limited resources between individuals of different species.'],
        ['Competitive exclusion', 'One species outcompeting another when both occupy the same niche and depend on the same limited resources.'],
        ['Resource partitioning', 'Different species using shared resources in different ways, places or times to reduce competition.'],
        ['Mutualism', 'A close relationship between different species in which both organisms benefit.'],
        ['Commensalism', 'A close relationship between different species in which one benefits and the other is neither helped nor harmed.'],
        ['Parasitism', 'A close relationship in which a parasite benefits while its host is harmed.'],
        ['Population pyramid', 'A diagram showing the age and sex structure of a population.'],
        ['Carbon footprint', 'The total greenhouse-gas emissions associated with a person, activity or organisation.'],
        ['Deforestation', 'Removal of natural forests, often to make land available for other uses.'],
        ['Greenhouse effect', 'Warming caused when atmospheric gases absorb and re-emit outgoing heat.'],
        ['Ozone depletion', 'Reduction of protective ozone in the stratosphere, allowing more harmful ultraviolet radiation through.'],
        ['Biological oxygen demand (BOD)', 'The oxygen required by microorganisms to break down organic matter in water.'],
        ['Eutrophication', 'Nutrient enrichment of water that promotes excessive algal growth and can lead to oxygen depletion.'],
        ['Food security', 'Reliable access for all people to sufficient, safe and nutritious food for a healthy life.'],
        ['Biodiversity', 'The variety of genes, species and ecosystems in an area or on Earth.'],
        ['Recycling', 'Processing waste materials into new products or usable raw materials.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('A lion hunts and kills a springbok for food. What is the lion in this interaction?', 'Predator', 'Prey', 'Host of the springbok', 'Decomposer'),
        mc('An owl catches and eats a mouse. What is the mouse in this interaction?', 'Prey', 'Predator', 'Parasite of the owl', 'Decomposer'),
        mc('Prey numbers rise before predator numbers rise. What describes the delayed predator response?', 'Time lag', 'Ozone depletion', 'Commensalism', 'Deforestation'),
        mc('Two male antelope of the same species compete for mates. Which interaction is shown?', 'Intraspecific competition', 'Interspecific competition', 'Mutualism', 'Parasitism'),
        mc('Zebra and white rhino compete for limited grazing in one habitat. Which interaction is shown?', 'Interspecific competition', 'Intraspecific competition', 'Commensalism', 'Parasitism'),
        mc('In one culture, P. aurelia outcompetes P. caudatum for limited food until P. caudatum disappears. What does this illustrate?', 'Competitive exclusion', 'Mutualism', 'Parasitism', 'Unlimited coexistence in an identical niche'),
        mc('Two bird species feed in different parts of the same tree, reducing direct competition. What is this?', 'Resource partitioning', 'Competitive exclusion', 'Predation between the birds', 'Ozone depletion'),
        mc('An alga supplies food to a lichen fungus, and the fungus supplies moisture and shelter. Which relationship is shown?', 'Mutualism', 'Commensalism', 'Parasitism', 'Predation'),
        mc('An egret catches insects disturbed by cattle; in this example the cattle are unaffected. Which relationship is shown?', 'Commensalism', 'Mutualism', 'Parasitism', 'Intraspecific competition'),
        mc('A tapeworm absorbs nutrients inside a human intestine and harms its host. Which relationship is shown?', 'Parasitism', 'Mutualism', 'Commensalism', 'Resource partitioning'),
        mc('Which diagram groups a population by age and sex?', 'Population pyramid', 'Predator-prey curve only', 'Food web', 'Carbon-cycle diagram'),
        mc('What describes the greenhouse-gas emissions associated with a learner’s travel and energy use?', 'Carbon footprint', 'Population pyramid', 'Ozone layer', 'Carrying capacity'),
        mc('A natural forest is cleared permanently for housing. What is this process called?', 'Deforestation', 'Recycling', 'Resource partitioning', 'Mutualism'),
        mc('Atmospheric gases absorb outgoing heat and help keep Earth warm enough for life. Which process is this?', 'Natural greenhouse effect', 'Ozone depletion', 'Competitive exclusion', 'Eutrophication'),
        mc('CFCs damage protective stratospheric ozone. Which environmental problem is involved?', 'Ozone depletion', 'Resource partitioning', 'Commensalism', 'Monoculture'),
        mc('What does BOD measure in water?', 'Oxygen needed for microbial breakdown of organic matter', 'The number of fish species only', 'The amount of ultraviolet radiation', 'The age structure of a population'),
        mc('Fertiliser runoff adds nitrates and phosphates to a pond, causing an algal bloom. Which process is promoted?', 'Eutrophication', 'Deforestation', 'Temporal partitioning', 'Ozone depletion'),
        mc('Everyone in a community has reliable access to enough safe, nutritious food. What condition is described?', 'Food security', 'Monoculture', 'Competitive exclusion', 'Poaching'),
        mc('Which term covers the variety of genes, species and ecosystems?', 'Biodiversity', 'Natality alone', 'Carbon footprint', 'Biological oxygen demand'),
        mc('Waste paper is processed into new paper products. Which waste-management method is used?', 'Recycling', 'Poaching', 'Deforestation', 'Thermal pollution')
    ];
    const extraChoice = [
        mc('Why can predator numbers increase after prey become more abundant?', 'More food can improve predator survival and reproduction', 'Predators no longer need food', 'Every prey animal becomes a predator', 'Predator births must occur immediately'),
        mc('Prey numbers fall sharply. Which later response is possible in predators that depend on them?', 'Predator numbers decline as food becomes scarce', 'Predator numbers must grow without limit', 'Predators stop needing energy', 'Predator numbers change before any food shortage'),
        mc('Which condition usually makes competition for food stronger?', 'More individuals sharing a limited food supply', 'Unlimited food for every individual', 'No overlap in food requirements', 'Complete absence of organisms'),
        mc('A dominance hierarchy forms within a herd. What advantage may dominant individuals gain?', 'Better access to resources and mating opportunities', 'Freedom from every limiting factor', 'Ability to photosynthesise', 'Guaranteed unlimited population growth'),
        mc('Severe resource competition causes animals to leave a local population. Which parameter records this loss?', 'Emigration', 'Immigration', 'Natality', 'Mutualism'),
        mc('Forest plants occupy canopy, middle and undergrowth layers. Which pattern is shown?', 'Stratification', 'Ozone depletion', 'Poaching', 'Parasitism'),
        mc('In a hypothetical habitat, one predator species hunts mainly at dawn and another mainly at night. What reduces overlap?', 'Temporal resource partitioning', 'Identical feeding times', 'Intraspecific competition between the species', 'Both becoming decomposers'),
        mc('How do bilharzia larvae released by infected freshwater snails enter a human host?', 'They penetrate the skin during contact with infested water', 'They require an existing cut in every case', 'They are injected by mosquitoes', 'They enter only through inhaled air'),
        mc('Dodder uses haustoria to draw nutrients from another plant. Which organism is harmed in this association?', 'The host plant', 'The dodder alone', 'Both organisms always benefit', 'Neither organism is affected'),
        mc('What happened when P. aurelia and P. caudatum were grown in separate cultures in the lesson?', 'Both species survived and increased', 'Both species immediately died', 'P. caudatum hunted P. aurelia', 'The two species became one species'),
        mc('A population pyramid has a broad base. What does that directly show?', 'A large proportion of people in younger age groups', 'No children in the population', 'Only elderly people remain', 'Everyone is the same age'),
        mc('How can improved sanitation influence human population growth?', 'It can lower deaths from diseases spread by poor sanitation', 'It guarantees zero deaths forever', 'It removes all demand for food', 'It means immigration must stop'),
        mc('Why can deforestation contribute to increased atmospheric carbon dioxide?', 'Fewer trees remain to absorb CO2 by photosynthesis', 'Trees absorb CO2 only after they die', 'Deforestation creates the ozone layer', 'Photosynthesis adds only methane to the air'),
        mc('Which action can reduce a household’s carbon footprint?', 'Reducing fossil-fuel energy use through efficiency', 'Wasting electricity deliberately', 'Burning more coal for the same task', 'Removing every nearby tree'),
        mc('Which agreement was adopted in 1987 to phase out ozone-depleting substances?', 'Montreal Protocol', 'Competitive Exclusion Principle', 'A predator-prey cycle', 'A population census'),
        mc('Which statement about wetlands is accurate?', 'They can slow floodwater, trap sediments and support biodiversity', 'They make all water instantly safe to drink', 'They never support living organisms', 'They must always be drained to conserve water'),
        mc('Which farming practice is monoculture?', 'Growing one type of crop across a large area', 'Growing several different crops together', 'Restoring a diverse natural forest', 'Recycling glass bottles'),
        mc('Which statement about genetically modified crops is most accurate?', 'Benefits and risks depend on the particular modified trait and require assessment', 'All GM crops always cause allergies', 'Every GM crop has the same benefits', 'GM crops contain no DNA'),
        mc('Which method uses carefully selected, tested organisms to suppress an invasive plant?', 'Biological control', 'Mechanical removal only', 'Chemical spraying only', 'Uncontrolled introduction of any new species'),
        mc('Why can decomposing organic waste in landfill be useful for energy recovery?', 'It can produce methane that is captured and used as fuel', 'It produces only pure oxygen', 'It stops all greenhouse-gas emissions automatically', 'It makes radioactive waste safe')
    ];
    const trueFalseFacts = [
        ['Predator numbers may rise after prey numbers rise because reproduction takes time.', true, 'The delayed response is a time lag.'],
        ['Intraspecific competition occurs only between different species.', false, 'It occurs between individuals of the same species.'],
        ['Different species may compete for the same limited resource.', true, 'This is interspecific competition.'],
        ['Predator and prey populations must peak at exactly the same time.', false, 'Predator responses commonly lag behind changes in prey.'],
        ['Severe competition can increase mortality or encourage emigration.', true, 'Insufficient resources can reduce survival or cause individuals to leave.'],
        ['Competitive exclusion means two species with an identical niche always coexist indefinitely.', false, 'Competition for the same limited resources can exclude the weaker competitor.'],
        ['Resource partitioning can reduce competition between different species.', true, 'They may use different foods, places or times.'],
        ['Mutualism benefits one organism while harming the other.', false, 'Both partners benefit; benefit with harm describes parasitism.'],
        ['In commensalism, one species benefits and the other is neither helped nor harmed.', true, 'The lesson’s egret and unaffected cattle scenario illustrates this.'],
        ['Bilharzia larvae need a cut before they can enter human skin.', false, 'Larvae released by infected snails can penetrate intact skin in infested water.'],
        ['A population pyramid shows age groups and the sex structure of a population.', true, 'Its bars represent numbers or proportions within those groups.'],
        ['The natural greenhouse effect is unnecessary for keeping Earth warm enough for life.', false, 'It helps maintain suitable temperatures; its enhancement contributes to global warming.'],
        ['Deforestation can reduce both carbon uptake and transpiration by trees.', true, 'This can affect atmospheric CO2 and local water cycling.'],
        ['The ozone layer mainly protects Earth from sound waves.', false, 'Stratospheric ozone absorbs harmful ultraviolet radiation.'],
        ['Methane may be produced when organic waste decomposes without oxygen.', true, 'Landfills are one source; the gas can be captured for energy recovery.'],
        ['Higher BOD means less oxygen is needed to decompose organic matter.', false, 'Higher BOD indicates greater oxygen demand for microbial decomposition.'],
        ['Nitrates and phosphates in runoff can promote algal blooms.', true, 'Excessive nutrient input can drive eutrophication.'],
        ['A wetland guarantees that water leaving it is safe to drink.', false, 'Wetlands can improve water quality, but do not guarantee removal of every hazard.'],
        ['Recycling can reduce demand for newly extracted raw materials.', true, 'Recovering materials helps conserve resources.'],
        ['All genetically modified crops have identical environmental and health effects.', false, 'Effects depend on the trait, crop and environment and need case-by-case assessment.']
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
        ['Predation', 'One organism killing and eating another as food'],
        ['Competition', 'Organisms requiring the same resource when supplies are limited'],
        ['Dominance hierarchy', 'Social ranking that can give dominant animals better access to resources'],
        ['Separate Paramecium cultures', 'Both species survived without competing directly with each other'],
        ['Mixed Paramecium culture', 'P. aurelia outcompeted P. caudatum for shared limited resources'],
        ['Ecological niche', 'A species’ role, resource use and interactions in its environment'],
        ['Forest stratification', 'Canopy, middle and undergrowth plants occupying different vertical layers'],
        ['Temporal partitioning', 'Different species using a shared resource at different times'],
        ['Endoparasite', 'A parasite living inside the body of its host'],
        ['Haustoria', 'Dodder structures that penetrate a host plant and absorb nutrients'],
        ['Broad pyramid base', 'Many individuals in the younger age groups'],
        ['Improved sanitation', 'Cleaner water and sewage management that can reduce disease-related deaths'],
        ['Carbon sink', 'A system that takes up more carbon than it releases over a period'],
        ['Global warming', 'A long-term rise in Earth’s average surface temperature'],
        ['Landfill methane recovery', 'Capturing gas from decomposing waste to produce heat or electricity'],
        ['Aquifer', 'A permeable underground layer that stores and transmits usable groundwater'],
        ['Wetland', 'An area with waterlogged soil that can support biodiversity and buffer floods'],
        ['Monoculture', 'Growing a single type of crop over a large area'],
        ['Poaching', 'Illegal hunting or capture of wild animals'],
        ['Biological control', 'Using carefully selected organisms to suppress an unwanted species']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 3, 4, 7, 8, 9, 10, 13, 16, 20, 27, 34, 37, 39];
    const hints = [
        'Think of the animal doing the hunting.',
        'Think of the animal being eaten.',
        'Intra means within the same species.',
        'Inter means between different species.',
        'Both lichen partners gain something.',
        'Only the egret benefits in this scenario.',
        'The parasite gains nutrients; the host is harmed.',
        'This diagram groups people by age and sex.',
        'Heat absorption by atmospheric gases keeps Earth warmer.',
        'Excess plant nutrients promote rapid algal growth.',
        'Food supports survival and the production of offspring.',
        'Snails release larvae into freshwater; no cut is required.',
        'The agreement focuses on ozone-depleting chemicals.',
        'A modified trait must be assessed, not generalised to every crop.',
        'Organic decay can release a gas that can be used as fuel.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['Distinguish predator from prey using an owl eating a mouse.', 'The owl is the predator; the mouse is the prey'],
        ['Why can increasing springbok numbers support a later increase in lions?', 'More prey supplies food that can improve lion survival and reproduction'],
        ['Explain the delay between rising prey numbers and rising predator numbers.', 'Predators need time to respond, reproduce and produce surviving offspring: a time lag'],
        ['What can happen to predators after excessive hunting sharply reduces their prey?', 'Food scarcity may reduce predator survival and reproduction, lowering their numbers'],
        ['Why do predator-prey populations fluctuate rather than stay perfectly constant?', 'Changes in food availability and predation cause delayed rises and falls in their numbers'],
        ['Two buffalo of the same species compete for limited grazing. Name the competition type.', 'Intraspecific competition'],
        ['A zebra and a white rhino compete for limited grazing. Name the competition type.', 'Interspecific competition'],
        ['How may a dominance hierarchy affect access to mates within a herd?', 'Higher-ranking individuals may gain better access to mating opportunities'],
        ['Name two ways severe resource competition can reduce a local population.', 'It may increase deaths, reduce births or cause emigration; any two'],
        ['Why is food competition often density-dependent?', 'With a limited food supply, crowding can leave less food per individual'],
        ['In a mixed culture, P. caudatum disappears while P. aurelia persists. Explain the competitive outcome.', 'P. aurelia outcompeted P. caudatum for shared limited resources, causing competitive exclusion in that culture'],
        ['Why were waste products removed during the Paramecium culture experiment?', 'To reduce waste accumulation as a competing explanation for the population changes'],
        ['Does disappearance of P. caudatum from one culture prove that its species is extinct worldwide?', 'No; exclusion from one culture is a local population loss, not global species extinction'],
        ['How does using different sizes or types of prey help predator species coexist?', 'It partitions food resources and reduces direct competition'],
        ['Explain how forest undergrowth can coexist with taller canopy plants despite lower light.', 'Shade-adapted plants use lower light levels in a different layer, reducing direct competition for the same light conditions'],
        ['One hypothetical predator feeds at dawn, another at night. Name the form of partitioning.', 'Temporal resource partitioning: using the resource at different times'],
        ['An oxpecker gains food by removing ticks from a buffalo, which loses parasites. Classify this described interaction.', 'Mutualism: both organisms benefit in this tick-removal interaction'],
        ['In a lichen, what does the photosynthetic alga supply, and what does the fungus supply?', 'The alga supplies food; the fungus helps supply moisture and a protected environment'],
        ['A remora gains food scraps while the shark is unaffected in this scenario. Classify the relationship.', 'Commensalism: one benefits while the other is unaffected'],
        ['Name both hosts in the human bilharzia cycle and explain how larvae reach the human.', 'A freshwater snail and a human; larvae released by infected snails penetrate human skin in infested water'],
        ['How can improved agriculture, sanitation and vaccination support population growth?', 'Better food and disease prevention can reduce mortality and improve survival'],
        ['What two structural features of a population are directly displayed by a population pyramid?', 'Age structure and sex structure, shown as numbers or proportions'],
        ['A pyramid has many children and few elderly people. State one planning priority for this age structure.', 'Examples include schools, child healthcare and future employment; any relevant priority'],
        ['Why can rapid human population growth increase pressure on natural resources?', 'More people need food, water, land and energy, increasing demand and potentially pollution and habitat loss'],
        ['Give two practical ways of reducing a person’s carbon footprint.', 'Examples include efficient energy use, lower-emission transport, walking or cycling, and suitable renewable energy; any two'],
        ['Explain two links between forest removal and changes in climate or the water cycle.', 'Fewer trees absorb CO2, and reduced transpiration can reduce moisture returned to the atmosphere'],
        ['Distinguish the natural greenhouse effect from its human-enhanced effect.', 'The natural effect keeps Earth warm enough for life; additional greenhouse gases strengthen warming'],
        ['Explain why ozone depletion and global warming are not the same process.', 'Ozone depletion weakens protection from ultraviolet radiation; global warming is increased average temperature associated with enhanced heat trapping'],
        ['Why is methane capture useful at a landfill?', 'Recovered gas can supply energy and reduce methane released directly to the atmosphere, although burning it still produces CO2'],
        ['Why must radioactive waste be contained and carefully monitored?', 'Ionising radiation can harm organisms, so controlled management limits exposure and environmental contamination'],
        ['State one water-storage benefit and one ecological risk of building a dam.', 'It stores water; possible risks include flooded habitats, blocked fish migration or altered downstream flows'],
        ['Why should aquifers be protected from agricultural, domestic and industrial pollutants?', 'Pollutants can infiltrate permeable ground and contaminate groundwater used by people and ecosystems'],
        ['State two benefits of wetlands, without assuming that their water is safe to drink.', 'Examples include flood buffering, sediment trapping and habitat for biodiversity; any two'],
        ['Explain the chain from fertiliser runoff to fish deaths in eutrophication.', 'Extra nutrients cause algal growth; shading and decomposition can lower dissolved oxygen, harming fish'],
        ['Why can organic sewage raise BOD and reduce oxygen available to aquatic animals?', 'Microorganisms consume more dissolved oxygen while decomposing the added organic matter'],
        ['Why can heated water discharged into a river harm aquatic organisms?', 'Higher temperatures can stress sensitive species and reduce the amount of oxygen water can hold'],
        ['Explain two ways monoculture can threaten food security.', 'It can increase vulnerability to pests and reduce diversity; associated excessive chemical use can also harm soil or water'],
        ['Give one potential benefit of a GM crop and explain why all GM crops should not be judged identically.', 'A suitable trait may improve pest resistance or yield; benefits and risks depend on the particular modification and environment'],
        ['Name a biodiversity threat involving illegal wildlife capture and a sustainable way to reduce pressure on harvested indigenous plants.', 'Poaching; grow plants in nurseries or use sustainable harvesting rather than depleting wild populations'],
        ['Explain how recycling and controlling invasive plants can conserve resources.', 'Recycling reduces demand for new raw materials; invasive-plant control can protect water, land and native biodiversity']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.EnvironmentalInteractionsTopic6 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
