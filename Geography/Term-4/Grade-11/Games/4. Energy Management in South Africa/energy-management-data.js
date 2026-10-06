/* Grade 11 Geography, Term 4, Topic 4: Energy Management in South Africa.
 * Based on the complete Topic 4.pdf: changing energy needs, greener economies,
 * sustainable lifestyles, shared responsibilities and energy efficiency.
 * Questions are self-contained. Population is a factor in demand, not its sole
 * determinant. Conservation reduces demand; it does not build generating capacity.
 * Electricity access can support business and employment, not guarantee either.
 * COP 17 is explicitly treated as the historical Durban meeting in 2011.
 * Primary checks:
 * https://www.unep.org/explore-topics/green-economy/about-green-economy
 * https://www.unep.org/explore-topics/green-economy/why-does-green-economy-matter/what-inclusive-green-economy
 * https://unfccc.int/process-and-meetings/conferences/past-conferences/durban-climate-change-conference-november-2011/cop-17/cop-17-reports
 * https://unfccc.int/cop5/convkp/conv.html
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Electricity demand', 'The amount of electrical energy required by people, businesses and other users.'],
        ['Electricity supply', 'The electrical energy made available to consumers for their activities.'],
        ['Generating capacity', 'The maximum electrical power that generating equipment can produce under specified conditions.'],
        ['Energy conservation', 'Reducing unnecessary energy use, such as switching off lights that are not needed.'],
        ['Energy security', 'The ability to obtain sufficient, dependable energy to meet a country’s needs.'],
        ['Green economy', 'An economy that improves well-being and fairness while reducing environmental risks and using resources efficiently.'],
        ['Social equity', 'Fairness in access to opportunities and benefits across society.'],
        ['Resource efficiency', 'Obtaining useful results while reducing the amount of natural resources used or wasted.'],
        ['Sustainable living', 'A lifestyle that aims to reduce the use and waste of the Earth’s natural resources.'],
        ['Carbon footprint', 'The greenhouse-gas emissions associated with a person, activity or organisation.'],
        ['Environmental legislation', 'Laws that set requirements for protecting the environment, including limits on harmful emissions.'],
        ['Recycling', 'Processing suitable used materials so they can be made into new products.'],
        ['Waste management', 'Organising how unwanted materials are reduced, collected, treated or safely disposed of.'],
        ['Environmental education', 'Helping people understand environmental issues and how to act more sustainably.'],
        ['Think globally, act locally', 'Consider the planet’s environmental well-being and take useful action in your own community.'],
        ['Energy efficiency', 'Providing a useful service with less energy input than a less-efficient alternative.'],
        ['Energy-saving lighting', 'Lighting equipment designed to provide useful illumination while using less electricity.'],
        ['Fuel-efficient transport', 'Transport that uses less fuel for a comparable journey or transport service.'],
        ['Solar water heating', 'Using energy from sunlight to heat water, reducing reliance on conventional heating energy.'],
        ['Low-carbon technology', 'Equipment or processes designed to reduce carbon-related emissions compared with more emission-intensive alternatives.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('Which term describes the electricity required by homes, businesses and public services?', 'Electricity demand', 'Electricity supply', 'Recycling', 'Environmental legislation'),
        mc('Which term describes the electricity made available for consumers to use?', 'Electricity supply', 'Carbon footprint', 'Electricity demand', 'Social equity'),
        mc('What does generating capacity describe?', 'The maximum power generating equipment can produce under specified conditions', 'The number of people who attended COP 17', 'The amount of litter recycled by a school', 'The total number of light switches in a building'),
        mc('An empty classroom’s lights are switched off because they are not needed. Identify the action.', 'Energy conservation', 'Increasing generating capacity by building a power station', 'Increasing unnecessary electricity demand', 'Expanding the use of imported fuel'),
        mc('Which goal best describes energy security?', 'Sufficient, dependable energy to meet the country’s needs', 'Electricity demand without any available supply', 'Reliance on wasteful consumption in every building', 'Avoiding all investment in energy supply'),
        mc('Which combination best describes a green economy?', 'Improved well-being and fairness with lower environmental risks and efficient resource use', 'Higher income regardless of pollution or inequality', 'Unlimited resource consumption with no concern for people', 'Environmental protection with no concern for social outcomes'),
        mc('A programme considers whether poorer communities can also benefit from cleaner energy. Which principle is central?', 'Social equity', 'Generating capacity alone', 'Waste disposal alone', 'Unlimited consumption'),
        mc('A business provides the same useful output while wasting fewer natural resources. Which principle is illustrated?', 'Resource efficiency', 'Resource depletion as a goal', 'Unnecessary energy consumption', 'Pollution without management'),
        mc('Which description best matches sustainable living?', 'Reducing unnecessary use and waste of natural resources in everyday life', 'Using more resources whenever possible', 'Leaving all environmental action to other people', 'Assuming only businesses affect the environment'),
        mc('Which concept links the greenhouse-gas emissions associated with a learner’s transport, energy use and diet?', 'Carbon footprint', 'Electricity supply alone', 'Population size alone', 'Recycling collection frequency'),
        mc('A government introduces requirements to reduce carbon emissions. Which tool is it using?', 'Environmental legislation', 'Personal transport choices only', 'A business’s voluntary recycling bin only', 'An individual’s private electricity bill'),
        mc('Suitable used paper is processed into new paper products. Identify the practice.', 'Recycling', 'Generating electricity', 'Increasing fuel consumption', 'Discarding all materials without sorting'),
        mc('A factory improves how it reduces, collects and deals with unwanted materials. Identify the responsibility.', 'Waste management', 'Increasing electricity wastage', 'Ignoring emissions', 'Replacing every environmental law'),
        mc('A municipality teaches residents and businesses how to reduce energy and water waste. Identify the activity.', 'Environmental education', 'Increasing waste generation', 'Expanding unnecessary demand', 'Ending community participation'),
        mc('Which action best expresses “Think globally, act locally”?', 'Considering global environmental health while reducing waste in your own community', 'Waiting for distant countries to solve every local problem', 'Ignoring the planet while increasing local pollution', 'Believing local actions cannot contribute to wider goals'),
        mc('Two appliances provide the same useful service, but one uses less electricity. Which concept explains the difference?', 'Energy efficiency', 'Population growth', 'Higher energy demand by definition', 'Greater waste by definition'),
        mc('Which choice illustrates the lesson’s promotion of energy-efficient appliances?', 'A lamp that gives comparable useful lighting with less electricity', 'Leaving every lamp on in an empty room', 'Buying a lamp only because it wastes more electricity', 'Keeping inefficient equipment because it has no label'),
        mc('For a comparable transport service, which improvement fits the lesson’s aim?', 'Using less fuel', 'Using more fuel without improving the service', 'Ignoring fuel consumption when planning transport', 'Making every journey longer without a reason'),
        mc('What is the purpose of a solar geyser?', 'Using sunlight to heat water', 'Converting all household litter into drinking water', 'Producing coal for a thermal power station', 'Increasing water wastage in every building'),
        mc('Which example is identified in the lesson as a low-carbon technology?', 'Solar water heating', 'Leaving unneeded lights on', 'Discarding recyclable materials unsorted', 'Increasing emissions without changing the service')
    ];
    const extraChoice = [
        mc('Which factor affecting South Africa’s energy needs is highlighted in the lesson?', 'Population size', 'The colour of recycling bins alone', 'The name of a school alone', 'The city that hosted a past conference alone'),
        mc('Why can electricity provision support the growth of local businesses?', 'It provides energy for equipment and business activities', 'It guarantees every business succeeds without any other resources', 'It removes the need for customers or workers', 'It means businesses no longer require any equipment'),
        mc('How can growth of electricity-supported local businesses benefit a community?', 'It can create employment opportunities', 'It guarantees that every resident immediately gets a job', 'It automatically removes all environmental risks', 'It means all energy conservation must stop'),
        mc('What distinction between conservation and new generating capacity is correct?', 'Conservation reduces unnecessary demand; new generating equipment can add capacity', 'Switching off a light physically builds a new power station', 'Conservation requires wasting more electricity', 'New generating capacity always means consumers use less energy'),
        mc('Which response addresses both energy supply and wasteful consumption?', 'Invest in suitable cleaner supply while improving conservation and efficiency', 'Increase supply but require everyone to waste it', 'Reduce every essential service instead of managing waste', 'Avoid investment and ignore how energy is used'),
        mc('Which proposal best fits the social and environmental aims of a green economy?', 'Cleaner, resource-efficient development that also improves people’s well-being', 'Production that lowers costs only by ignoring pollution', 'Projects that protect resources but exclude poorer communities by design', 'Development that treats environmental damage as irrelevant'),
        mc('Which decision takes social equity seriously when planning greener living?', 'Consider how different communities can access and benefit from improvements', 'Consider only benefits for the wealthiest households', 'Assume all households have identical resources and choices', 'Exclude fairness from every environmental decision'),
        mc('Why is reducing water and electricity waste in a public building useful?', 'It reduces unnecessary resource use while preserving the building’s useful services', 'It requires closing every service offered by the building', 'It makes resource efficiency impossible', 'It guarantees that no environmental risks exist anywhere'),
        mc('Which change applies the sustainable-living section to daily choices?', 'Review transport, energy use and diet to reduce unnecessary environmental pressure', 'Change only the name of a household’s electricity account', 'Ignore transport and focus solely on the colour of appliances', 'Assume diet and energy use can never affect environmental pressure'),
        mc('Two activities provide a similar useful service. Why compare their carbon footprints?', 'To identify which is associated with lower greenhouse-gas emissions', 'To find which activity has the longest name', 'To prove emissions never matter in sustainable living', 'To decide which activity uses the largest recycling bin'),
        mc('Which action shows a government leading by example?', 'Reduce waste and unnecessary water and electricity use in its own buildings', 'Demand greener behaviour while wasting resources in every public building', 'Leave all environmental education to households alone', 'Replace emissions rules with unrestricted pollution'),
        mc('A business sorts suitable waste for recycling and improves how the remainder is handled. Which assessment is correct?', 'It addresses both recycling and broader waste management', 'It increases waste by definition', 'It makes government and individual responsibilities unnecessary', 'It guarantees that no other environmental improvements are needed'),
        mc('Which responsibility belongs to businesses as well as government and individuals?', 'Reducing unnecessary resource use and environmental harm', 'Hosting every international climate conference', 'Passing national legislation independently', 'Deciding the law without government involvement'),
        mc('Which city hosted COP 17 in South Africa in 2011?', 'Durban', 'Cape Town', 'Pretoria', 'Johannesburg'),
        mc('What is the climate convention’s overall objective described in the lesson?', 'Stabilise greenhouse-gas concentrations to avoid dangerous human interference with the climate', 'Increase emissions regardless of climate effects', 'Make recycling the only environmental action allowed', 'Replace all local environmental responsibility with a conference'),
        mc('Which pair correctly separates behaviour change from an equipment upgrade?', 'Switch off unnecessary lights: behaviour; install more efficient lamps: equipment', 'Install efficient lamps: behaviour only; leave lights on: efficiency upgrade', 'Waste more water: equipment; avoid wastage: higher demand', 'Build a power station: switching behaviour; recycle paper: generating capacity'),
        mc('A school wants to keep rooms adequately lit while reducing electricity use. Which plan is suitable?', 'Use efficient lamps and switch off lighting in unoccupied rooms', 'Keep all inefficient lamps on whether or not rooms are occupied', 'Choose lamps solely because they use the most electricity', 'Remove every necessary light without considering safe use'),
        mc('How can well-used shared transport contribute to more sustainable travel?', 'It can reduce the fuel used per passenger compared with separate journeys', 'Every shared vehicle uses no energy at all', 'It guarantees that all transport emissions disappear', 'It makes the distance and occupancy of a journey irrelevant'),
        mc('Which comparison best explains more efficient electricity generation?', 'Less energy input is needed for a comparable amount of useful electricity output', 'More fuel is always burned for the same output', 'All demand is removed by changing a station’s name', 'Efficiency means electricity can be generated without any energy input'),
        mc('Which plan best combines the three improvement areas in the lesson?', 'Better consumption habits, efficient appliances and suitable lower-carbon technologies', 'Only increased waste with no equipment changes', 'Only conferences without local action', 'Only more electricity supply without any attention to consumption')
    ];
    const trueFalseFacts = [
        ['Population size is one factor affecting a country’s energy needs.', true, 'The lesson highlights population size; economic activities and usage patterns also matter.'],
        ['Electricity provision guarantees that every new business will succeed.', false, 'Electricity can support business activities, but success depends on other factors too.'],
        ['Growth of local businesses can help create employment opportunities.', true, 'This is a potential benefit of electricity-supported economic activity.'],
        ['Switching off an unnecessary light physically increases a power station’s installed generating capacity.', false, 'It reduces unnecessary demand; it does not add generating equipment.'],
        ['Maintaining suitable electricity supply matters for economic activity and people’s well-being.', true, 'Inadequate supply can create economic losses and hardship.'],
        ['A green economy considers environmental risks but ignores social fairness.', false, 'Improved well-being and social equity are central parts of the lesson’s definition.'],
        ['A green economy aims to use resources efficiently and reduce carbon-related emissions.', true, 'It is described as low carbon and resource efficient.'],
        ['Sustainable living means using as many natural resources as possible.', false, 'It aims to reduce unnecessary use and waste of natural resources.'],
        ['Transport, energy use and diet can affect a person’s carbon footprint.', true, 'These are the lifestyle areas identified in the lesson.'],
        ['Resource efficiency means wasting more resources to provide the same useful result.', false, 'Efficiency reduces the resources needed or wasted for useful results.'],
        ['Governments can use legislation and education to support greener behaviour.', true, 'The lesson identifies both roles.'],
        ['Recycling and responsible waste management are duties for individuals only, not businesses.', false, 'Businesses and governments also have responsibilities.'],
        ['Government buildings can demonstrate responsible use of electricity and water.', true, 'Public buildings can lead by avoiding wastage and managing materials responsibly.'],
        ['“Think globally, act locally” means ignoring environmental issues in your own community.', false, 'It encourages local action with the planet’s well-being in mind.'],
        ['COP 17 was hosted in Durban, South Africa, in 2011.', true, 'This is a historical event mentioned in the lesson.'],
        ['An appliance is more energy efficient simply because it uses more electricity for the same useful service.', false, 'Greater efficiency means less energy input for a comparable useful service.'],
        ['Switching off unneeded lights is an example of changing consumption behaviour.', true, 'It avoids unnecessary electricity use.'],
        ['Solar water heating uses coal combustion as its solar energy input.', false, 'It uses energy from sunlight to heat water.'],
        ['Fuel-efficient transport can provide a comparable transport service with less fuel.', true, 'Reducing fuel input for a useful transport service improves efficiency.'],
        ['Energy management is the government’s responsibility alone.', false, 'The lesson gives roles to governments, businesses and individuals.']
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
        ['Population growth', 'An increase in the number of people, which can raise the need for energy services'],
        ['Local business development', 'The creation or expansion of community enterprises that electricity can help support'],
        ['Employment opportunities', 'Potential jobs associated with the creation and growth of local businesses'],
        ['Economic losses from poor supply', 'Reduced production or interrupted business activity when electricity is inadequate'],
        ['Clean-energy investment', 'Providing resources to develop energy options with lower environmental harm'],
        ['Human well-being', 'People’s quality of life, which greener development aims to improve'],
        ['Low-carbon economy', 'Economic activity organised to reduce carbon-related emissions'],
        ['Natural resources', 'Materials and energy inputs from the Earth that sustainable lifestyles aim to use responsibly'],
        ['Consumption patterns', 'The habits and choices that shape how people use goods, energy and other resources'],
        ['Environmental risks', 'Potential harm to natural systems that greener development aims to reduce'],
        ['Government leadership', 'Public authorities setting a responsible example through the management of their own buildings'],
        ['Responsible business practice', 'A company reducing emissions, water and electricity waste, and improving how it handles materials'],
        ['Individual community action', 'A person helping reduce waste or resource use in the place where they live'],
        ['COP 17', 'The seventeenth Conference of the Parties, hosted in Durban in 2011'],
        ['Climate convention objective', 'Stabilising greenhouse-gas concentrations to avoid dangerous human interference with the climate system'],
        ['Switching off unneeded lights', 'A behaviour change that reduces unnecessary electricity use in an unoccupied room'],
        ['Reducing water wastage', 'Avoiding needless water use in homes, public buildings or businesses'],
        ['Efficient power generation', 'Producing comparable useful electricity output with less energy input than a less-efficient process'],
        ['Shared transport choices', 'Using suitable, well-occupied transport to reduce separate vehicle journeys where practical'],
        ['Managing appliance use', 'Avoiding unnecessary operation of equipment while keeping essential services available']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 3, 5, 8, 10, 11, 14, 15, 18, 23, 25, 33, 34, 39];
    const hints = [
        'Separate what consumers require from what is made available to them.',
        'This describes the electricity consumers can obtain, not their requirement for it.',
        'The classroom avoids using energy when the service is not needed.',
        'Include social outcomes and environmental outcomes, not just one side.',
        'Consider everyday resource use and avoidable waste.',
        'Public authorities can make enforceable rules.',
        'The used material is processed into another product.',
        'The phrase links concern for the planet with action close to home.',
        'Compare the energy input for the same useful service.',
        'The device gets its heating energy from the Sun.',
        'Reducing demand does not install new generating machinery.',
        'The lesson combines well-being, fairness and responsible resource use.',
        'Think of the KwaZulu-Natal city that hosted the 2011 meeting.',
        'The aim concerns greenhouse-gas concentrations and the climate system.',
        'Combine behaviour, efficient equipment and lower-carbon technology.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What is electricity demand?', 'The electrical energy required by consumers such as homes, businesses and services'],
        ['Which population factor affecting energy needs is highlighted in the lesson?', 'Population size'],
        ['Why might a growing population increase the need for energy services?', 'More people can require electricity for homes, services and economic activities'],
        ['How can electricity access help a small local business?', 'It can power equipment and support the business’s activities'],
        ['What community benefit can follow the creation and growth of local businesses?', 'Employment opportunities'],
        ['Give one possible economic consequence of an inadequate electricity supply.', 'Interrupted business activity, lower production or other economic losses'],
        ['Why can energy supply problems create hardship for poorer communities?', 'They can disrupt essential services, livelihoods and local economic activity'],
        ['How does energy conservation differ from adding generating equipment?', 'Conservation reduces unnecessary use or demand; generating equipment can add production capacity'],
        ['Why does reliable electricity matter for economic development?', 'Businesses and services need dependable energy for their activities'],
        ['Name two complementary responses to energy pressure described in the lesson.', 'Conservation or efficiency, and investment in cleaner energy supply'],
        ['What social outcomes should a green economy aim to improve?', 'Human well-being and social equity'],
        ['Name two environmental characteristics of a green economy.', 'Lower carbon-related emissions and more efficient resource use or reduced environmental risks'],
        ['What does social equity mean in greener development?', 'Fairness in access to opportunities and benefits across society'],
        ['A factory keeps useful output the same but wastes fewer resources. What principle does this demonstrate?', 'Resource efficiency'],
        ['What is sustainable living?', 'A lifestyle that reduces unnecessary use and waste of the Earth’s natural resources'],
        ['What does a person’s carbon footprint describe?', 'Greenhouse-gas emissions associated with their activities and choices'],
        ['Name the three lifestyle areas identified for reducing a carbon footprint.', 'Transportation, energy consumption and diet'],
        ['Why does a green economy need to consider poorer communities, not only cleaner technology?', 'Social fairness and improved well-being are part of its aims'],
        ['What are consumption patterns?', 'The habits and choices that shape the use of goods, energy and other resources'],
        ['How does avoiding unnecessary water and electricity use support sustainable living?', 'It reduces resource use and wastage while preserving useful services'],
        ['Name two ways governments can encourage greener behaviour.', 'Environmental legislation and environmental education'],
        ['How can government buildings lead by example?', 'Recycle suitable waste and avoid unnecessary electricity and water use'],
        ['Give two environmental improvements a business can make.', 'Reduce emissions, recycle, improve waste management, or reduce water and electricity waste; any two'],
        ['What is recycling?', 'Processing suitable used materials into new products'],
        ['Why is waste management broader than recycling alone?', 'It includes reducing, collecting, treating and safely disposing of materials, not only processing recyclables'],
        ['Explain “Think globally, act locally” in the environmental context.', 'Consider the planet’s well-being and take useful action in your own community'],
        ['Which South African city hosted COP 17 in 2011?', 'Durban'],
        ['What does COP 17 refer to?', 'The seventeenth Conference of the Parties'],
        ['What is the climate convention’s objective described in the lesson?', 'Stabilise greenhouse-gas concentrations to avoid dangerous human interference with the climate system'],
        ['Why are individuals still responsible even when government and business act?', 'Their everyday choices and community actions also affect resource use and environmental harm'],
        ['What is energy efficiency?', 'Providing a comparable useful service with less energy input than a less-efficient alternative'],
        ['Give one behaviour change that avoids electricity waste.', 'Switch off unneeded lights or avoid unnecessary operation of appliances while preserving essential services'],
        ['Why is replacing an inefficient lamp different from switching an unneeded lamp off?', 'Replacement improves equipment efficiency; switching off avoids unnecessary consumption'],
        ['What should be compared when deciding which of two lamps is more efficient?', 'The electricity required for a comparable amount of useful lighting'],
        ['What does fuel-efficient transport aim to reduce for a comparable service?', 'The fuel required'],
        ['How can suitable, well-used shared transport reduce resource use?', 'It can reduce fuel per passenger and the need for separate vehicle journeys'],
        ['What is the energy input for solar water heating?', 'Sunlight'],
        ['Name a low-carbon technology example listed in the lesson.', 'A solar geyser or more fuel-efficient power-generation equipment'],
        ['What does more efficient power generation mean when useful output stays comparable?', 'Less energy input is needed to produce that output'],
        ['Summarise the three key areas for improving energy efficiency in the lesson.', 'Changing consumption behaviour, using efficient appliances and adopting suitable lower-carbon technologies']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.EnergyManagementTopic4 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
