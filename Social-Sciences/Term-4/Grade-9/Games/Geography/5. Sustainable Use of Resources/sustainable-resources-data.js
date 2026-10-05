/* Grade 9 Social Sciences Geography, Term 4, Week 5.
 * Based on the supplied Sustainable Use of Resources lesson.
 * Questions include practical applications of its fishing, grazing and shared-action examples.
 * No source image is required to understand or answer any question.
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Sustainable resource use', 'Meeting current resource needs without compromising the ability of future generations to meet theirs.'],
        ['Unsustainable resource use', 'Exploiting resources in ways that deplete them or cause environmental harm.'],
        ['Conservation', 'Protecting natural resources and preventing unnecessary loss or damage.'],
        ['Efficiency', 'Achieving useful results while using less energy or material and creating less waste.'],
        ['Future generations', 'People who will live after us and will also need access to resources.'],
        ['Fishing quotas', 'Limits on the quantity of fish that may be caught.'],
        ['Bycatch', 'Animals unintentionally caught while fishers target a different species.'],
        ['Breeding grounds', 'Habitats where organisms reproduce and which need protection to support fish populations.'],
        ['Rotational grazing', 'Moving livestock between grazing areas so vegetation has time to recover.'],
        ['Cover crops', 'Plants grown to cover and protect soil, including on land being restored.'],
        ['Recycling', 'Processing waste materials so they can be made into new products.'],
        ['Reusing', 'Using an item again instead of discarding it after one use.'],
        ['Carbon footprint', 'The greenhouse-gas emissions associated with a person, product or activity.'],
        ['Sustainable sourcing', 'Choosing business supplies obtained through environmentally responsible resource practices.'],
        ['Efficient production', 'Manufacturing goods in ways that reduce wasted materials and energy.'],
        ['Environmental regulations', 'Rules intended to protect the environment and guide responsible resource use.'],
        ['Incentives', 'Benefits or rewards that encourage people or organisations to adopt sustainable practices.'],
        ['Research and development', 'Investigating and developing improved technologies, including more sustainable ways to use resources.'],
        ['National resource preservation', 'Protecting a country’s natural resources for continued and future use.'],
        ['Shared responsibility', 'Individuals, businesses and governments all playing a part in sustainable resource use.']
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
        mc('Which goal defines sustainable resource use?', 'Meeting today’s needs while protecting future generations’ ability to meet theirs', 'Using every available resource as quickly as possible', 'Meeting current needs regardless of future damage', 'Stopping every form of economic activity'),
        mc('Which situation is a sign of unsustainable resource use?', 'Rapid resource depletion and environmental degradation', 'Reduced waste and resource conservation', 'Vegetation recovering between grazing periods', 'Fishing within limits that support population recovery'),
        mc('What is the purpose of conservation?', 'Protecting resources and preventing unnecessary damage or loss', 'Increasing unnecessary waste', 'Removing all limits on extraction', 'Using up resources before others can use them'),
        mc('A factory uses less material to make the same number of products. Which principle does this illustrate?', 'Efficiency', 'Rapid depletion', 'Environmental degradation', 'Increased bycatch'),
        mc('Why must sustainable resource use consider future generations?', 'They will also need resources to meet their needs', 'Only people alive today will ever use resources', 'Natural resources become unnecessary in the future', 'Future generations can always replace depleted resources immediately'),
        mc('What do fishing quotas and catch limits control?', 'The quantity of fish that may be caught', 'The amount of grazing vegetation removed', 'The number of products recycled', 'The amount of timber used in a factory'),
        mc('Which fishing practice is intended to reduce bycatch?', 'Using selective fishing gear', 'Using gear that catches every species indiscriminately', 'Removing protection from breeding grounds', 'Ignoring all catch limits'),
        mc('Why protect fish breeding grounds?', 'They help fish reproduce and support future populations', 'They prevent fish from ever reproducing', 'They allow unlimited catches without recovery', 'They replace the need for any fish population'),
        mc('How does rotational grazing help the land?', 'It gives vegetation time to recover between grazing periods', 'It keeps livestock on one area until all vegetation is gone', 'It prevents plants from ever regrowing', 'It removes the need to consider herd size'),
        mc('Which approach can help restore degraded grazing land?', 'Reforestation and planting cover crops', 'Removing all remaining plant cover', 'Increasing livestock numbers without checking land capacity', 'Keeping damaged land under continuous heavy grazing'),
        mc('What distinguishes recycling from simply throwing an item away?', 'Waste materials are processed into new products', 'The item must be used only once', 'All materials are dumped without further use', 'New resources are always extracted instead'),
        mc('Which everyday action is an example of reusing?', 'Using a suitable container again instead of discarding it', 'Discarding the container after one use', 'Producing more waste deliberately', 'Replacing every reusable item immediately'),
        mc('Which individual action can help lower a carbon footprint?', 'Conserving energy', 'Leaving unused appliances running', 'Increasing unnecessary energy consumption', 'Refusing all energy-saving practices'),
        mc('What does a sustainable sourcing policy guide a business to do?', 'Choose supplies obtained through responsible resource practices', 'Choose supplies without considering environmental harm', 'Buy only the most wasteful materials available', 'Avoid checking how any resources were obtained'),
        mc('Which business strategy directly reduces waste during manufacturing?', 'Using efficient production methods', 'Discarding usable inputs during every production cycle', 'Increasing waste to improve the brand image', 'Ignoring the amount of material used'),
        mc('Which government action helps protect natural resources?', 'Enacting environmental protection laws', 'Removing every rule about resource damage', 'Encouraging uncontrolled resource depletion', 'Preventing research into sustainable technologies'),
        mc('Why might a government provide incentives for sustainable practices?', 'To encourage people and businesses to adopt them', 'To reward unnecessary environmental damage', 'To make conservation less attractive', 'To prevent investment in renewable energy'),
        mc('What is the aim of investing in research and development of sustainable technologies?', 'Finding improved ways to use resources responsibly', 'Stopping all improvements in resource use', 'Increasing waste in every new technology', 'Replacing conservation with uncontrolled extraction'),
        mc('Which outcome is linked to government support for sustainable resource use?', 'National resource preservation', 'Guaranteed depletion of every resource', 'An end to all sustainable industries', 'Removal of environmental leadership'),
        mc('Who shares responsibility for sustainable resource use in the lesson?', 'Individuals, businesses and governments', 'Governments alone', 'Businesses alone', 'Individuals alone')
    ];

    const extraChoice = [
        mc('A community meets its needs while keeping resources available for its children. How is its resource use best described?', 'Sustainable', 'Unsustainable', 'Wasteful by definition', 'Unrelated to future needs'),
        mc('Which pair of indicators warns that resources are being used unsustainably?', 'Rapid depletion and environmental degradation', 'Conservation and efficient use', 'Resource recovery and reduced waste', 'Habitat protection and careful management'),
        mc('Why is managing renewable resources part of sustainability?', 'They need opportunities to replenish rather than being used faster than they recover', 'They never need time to recover', 'Renewable resources cannot be overused', 'Their supply is unlimited in every location'),
        mc('Two businesses produce the same useful output. Which uses resources more efficiently?', 'The one using fewer inputs and creating less waste', 'The one wasting more inputs for the same output', 'The one discarding usable materials deliberately', 'The one refusing to measure any inputs'),
        mc('Which decision best considers both environmental health and human well-being?', 'Using resources carefully so they support people now and in the future', 'Depleting resources regardless of the effects on people', 'Treating environmental damage as always beneficial', 'Ignoring every future resource need'),
        mc('Catch totals repeatedly exceed scientific advice about fish recovery. What is the concern?', 'Fish populations may not recover fast enough to sustain the catches', 'Exceeding advice guarantees that fish populations grow', 'Scientific advice is intended only for grazing land', 'Unlimited catches cannot affect future populations'),
        mc('A net unintentionally catches animals other than the fish being targeted. What is this called?', 'Bycatch', 'Rotational grazing', 'Reforestation', 'Recycling'),
        mc('Which result is expected from responsible fishing practices?', 'Long-term viability of fish populations and more stable fishing livelihoods', 'Immediate depletion of all fish stocks', 'Permanent damage to every breeding habitat', 'Increased bycatch as the main goal'),
        mc('What does maintaining an appropriate herd size help a farmer avoid?', 'More grazing pressure than the land can sustain', 'Every opportunity for vegetation to recover', 'All benefits of rotational grazing', 'The protection of soil by plants'),
        mc('Which outcomes are associated with sustainable grazing techniques?', 'Improved soil health, biodiversity and agricultural productivity', 'Less vegetation recovery and more soil damage', 'Reduced biodiversity as the main objective', 'Unlimited grazing without considering plant recovery'),
        mc('How can choosing sustainably produced goods influence businesses?', 'It can encourage more responsible industry practices', 'It guarantees that businesses ignore customers', 'It always increases demand for over-exploited resources', 'It prevents sustainable sourcing from being used'),
        mc('Which student action puts the lesson’s shared responsibility into practice?', 'Planning ways to save energy and reduce waste at school', 'Waiting for every other group to act first', 'Increasing waste to make the problem more visible', 'Refusing to consider resource use in daily life'),
        mc('Which business investment is a sustainability strategy in the lesson?', 'Renewable energy', 'Equipment designed only to increase waste', 'Materials obtained through uncontrolled depletion', 'Production methods that ignore resource efficiency'),
        mc('Which set lists advantages businesses may gain from sustainable practices?', 'Long-term cost savings, a positive brand image and regulatory compliance', 'Guaranteed short-term profits with no investment', 'Unlimited permission to damage resources', 'More waste as the only business advantage'),
        mc('Why can recycling and reuse decrease demand for over-exploited resources?', 'They make further use of existing materials instead of requiring only new supplies', 'They require every usable item to be discarded immediately', 'They make resource conservation impossible', 'They always increase the need for new raw materials'),
        mc('Which choice is an incentive rather than a prohibition?', 'Offering support or rewards for adopting sustainable practices', 'Banning a damaging activity through a law', 'Ignoring all resource use', 'Declaring that no one should conserve resources'),
        mc('How can government support for sustainable industries benefit the economy?', 'It can encourage economic growth through responsible industries', 'It guarantees that all industries stop operating', 'It makes environmental protection incompatible with every job', 'It requires all businesses to increase waste'),
        mc('Which action illustrates a government’s role in sustainable technology development?', 'Funding research into more resource-efficient technologies', 'Preventing all research on conservation', 'Removing support for every sustainable innovation', 'Requiring scientists to increase environmental damage'),
        mc('Why is leaving sustainability entirely to one group inadequate?', 'The lesson assigns complementary roles to individuals, businesses and governments', 'Only consumers ever use natural resources', 'Businesses have no control over sourcing or production', 'Governments cannot influence resource protection'),
        mc('Which combined approach best follows the lesson?', 'Individuals reduce waste, businesses source responsibly and governments protect resources', 'Individuals increase waste while businesses and governments ignore damage', 'Governments make laws while everyone else avoids responsibility', 'Businesses adopt a slogan while continuing uncontrolled depletion')
    ];

    const trueFalseFacts = [
        ['Sustainable resource use: meeting current needs without undermining future generations’ needs.', true, 'Sustainability considers both current and future resource needs.'],
        ['Unsustainable resource use always prevents resource depletion and environmental harm.', false, 'Unsustainable use can deplete resources or cause environmental damage.'],
        ['Conservation and efficiency are principles of sustainable resource use.', true, 'The lesson lists both alongside renewable resource management.'],
        ['Rapid depletion is evidence that resources are being replenished sufficiently.', false, 'Rapid depletion is an indicator of unsustainable use.'],
        ['Selective fishing gear can reduce bycatch.', true, 'Selective gear aims to reduce unintended catches.'],
        ['Fishing quotas are intended to make every catch unlimited.', false, 'Quotas and catch limits restrict the quantity that may be caught.'],
        ['Protecting breeding grounds supports the long-term viability of fish populations.', true, 'Breeding habitats help populations reproduce and recover.'],
        ['Rotational grazing means keeping livestock on the same damaged area without a recovery period.', false, 'It moves livestock between areas to allow vegetation recovery.'],
        ['Maintaining appropriate herd sizes can support sustainable grazing.', true, 'Grazing pressure should remain within what the land can sustain.'],
        ['Cover crops restore land by removing all remaining vegetation.', false, 'Cover crops add plant cover to help protect the soil.'],
        ['Recycling and reusing materials can reduce waste.', true, 'Both actions make further use of materials rather than immediately discarding them.'],
        ['Energy conservation means deliberately increasing unnecessary energy consumption.', false, 'It means reducing unnecessary energy use.'],
        ['Individuals can encourage sustainable industry practices through their purchasing choices.', true, 'Choosing sustainably made products can encourage more responsible production.'],
        ['Sustainable sourcing requires businesses to ignore how supplies were obtained.', false, 'It considers whether resources were obtained responsibly.'],
        ['Efficient production methods can help businesses reduce waste.', true, 'They reduce the materials and energy wasted during production.'],
        ['Sustainable business practices guarantee immediate profits without any investment.', false, 'The lesson describes potential long-term savings, not guaranteed immediate profits.'],
        ['Governments can encourage sustainable practices through laws and incentives.', true, 'They can protect resources and support responsible practices.'],
        ['Research and development has no role in improving sustainable technologies.', false, 'Governments can invest in research and development of such technologies.'],
        ['Sustainable resource use is a shared responsibility.', true, 'Individuals, businesses and governments all have roles.'],
        ['Only governments need to take action for sustainability.', false, 'Individuals and businesses also need to play their parts.']
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
        ['Needs today', 'Current requirements that sustainable resource use should meet'],
        ['Future resource supply', 'Availability that should not be undermined by meeting present needs'],
        ['Environmental degradation', 'Damage to the natural environment that can indicate unsustainable use'],
        ['Rapid depletion', 'Resources being used up quickly, a warning sign in the lesson'],
        ['Renewable resource management', 'Responsible use that allows naturally replenishing resources to recover'],
        ['Selective fishing gear', 'Equipment designed to reduce unintended catches'],
        ['Appropriate herd size', 'A livestock number suited to what grazing land can support'],
        ['Reforestation', 'Re-establishing tree cover to help restore damaged land'],
        ['Vegetation recovery', 'Plant regrowth allowed between rotational grazing periods'],
        ['Stable fishing livelihoods', 'A community benefit when fish populations remain viable over time'],
        ['Energy conservation', 'Reducing unnecessary energy use to help lower emissions'],
        ['Renewable energy investment', 'A business strategy using naturally replenishing energy resources'],
        ['Sustainable products', 'Goods chosen because their resource use is environmentally responsible'],
        ['Positive brand image', 'A reputation benefit businesses may gain through responsible practices'],
        ['Long-term cost savings', 'A potential business advantage of reducing resource waste over time'],
        ['Individuals', 'People who can reduce waste and choose sustainably made products'],
        ['Businesses', 'Organisations that can improve sourcing and production methods'],
        ['Governments', 'Authorities that can enact protection laws and support sustainable technologies'],
        ['Sustainable industries', 'Economic activities that can support growth while using resources responsibly'],
        ['Environmental leadership', 'A wider role governments can play in global environmental efforts']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [10, 11, 2, 5, 8, 6, 12, 13, 15, 16, 0, 24, 25, 33, 39];
    const hints = [
        'Recycling changes waste materials into materials for new products.',
        'Reusing means another use rather than immediate disposal.',
        'Conservation protects rather than deliberately wastes.',
        'A quota sets a limit on what may be caught.',
        'Plants need a recovery period after grazing.',
        'Choose equipment that avoids unintended species.',
        'Think about unnecessary energy use and associated emissions.',
        'Consider how a business obtains its supplies.',
        'Governments can set rules to protect resources.',
        'An incentive makes a responsible action more attractive.',
        'The needs of people now and in the future both matter.',
        'Environmental health and human well-being are linked.',
        'Compare the catch with the rate fish populations can recover.',
        'The lesson describes potential long-term advantages, not guaranteed instant profits.',
        'All three groups need to act in complementary ways.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What is sustainable resource use?', 'Meeting current needs without compromising future generations’ ability to meet theirs'],
        ['What is unsustainable resource use?', 'Exploiting resources in ways that deplete them or cause environmental harm'],
        ['What does conservation aim to do?', 'Protect resources and prevent unnecessary loss or damage'],
        ['What does efficiency mean in resource use?', 'Achieving useful output with less energy or material and less waste'],
        ['Why must resource decisions consider future generations?', 'People living after us will also need resources'],
        ['Name two indicators of unsustainable resource use from the lesson.', 'Rapid resource depletion and environmental degradation'],
        ['Name the three sustainable resource-use principles listed in the lesson.', 'Conservation, efficiency and renewable resource management'],
        ['Why do renewable resources still need careful management?', 'They must be allowed to replenish rather than being used faster than they recover'],
        ['A producer makes the same output using fewer materials. Which principle is being applied?', 'Efficiency'],
        ['How can environmental damage undermine human well-being?', 'People depend on healthy environments and resources for their needs and livelihoods'],
        ['What do fishing quotas and catch limits restrict?', 'The quantity of fish that may be caught'],
        ['What is bycatch?', 'Animals unintentionally caught while fishers target another species'],
        ['Which type of fishing equipment can reduce bycatch?', 'Selective fishing gear'],
        ['Why is protecting breeding grounds important for sustainable fishing?', 'It supports reproduction and future fish populations'],
        ['Name two benefits of sustainable fishing practices from the lesson.', 'Long-term viability of fish populations and stability for fishing communities'],
        ['What is rotational grazing?', 'Moving livestock between areas to allow vegetation recovery'],
        ['Why should a herd’s size suit the grazing land?', 'To avoid grazing pressure exceeding what the land can sustain'],
        ['Name two restoration techniques for degraded grazing land from the lesson.', 'Reforestation and planting cover crops'],
        ['Name three outcomes of sustainable grazing techniques in the lesson.', 'Improved soil health, enhanced biodiversity and increased agricultural productivity'],
        ['Why is repeatedly catching more fish than scientific recovery advice supports a concern?', 'Fish populations may not recover fast enough to sustain the catches'],
        ['How does recycling differ from reusing?', 'Recycling processes waste into new products; reusing uses an item again'],
        ['What does a carbon footprint describe?', 'Greenhouse-gas emissions associated with a person, product or activity'],
        ['Which individual action in the lesson can lower a carbon footprint?', 'Energy conservation'],
        ['How can purchasing sustainably made products influence industry?', 'It can encourage businesses to adopt more responsible practices'],
        ['Why can recycling and reuse reduce demand for over-exploited resources?', 'Existing materials are used further instead of relying entirely on new resource extraction'],
        ['What does sustainable sourcing mean for a business?', 'Obtaining supplies through responsible resource-use practices'],
        ['Which energy investment is a sustainable business strategy in the lesson?', 'Investment in renewable energy'],
        ['How can efficient production reduce a business’s waste?', 'By reducing wasted materials and energy while producing goods'],
        ['Name three potential business advantages of sustainable practices in the lesson.', 'Long-term cost savings, positive brand image and compliance with environmental regulations'],
        ['Suggest one school action consistent with the lesson’s carbon-footprint activity.', 'Conserve energy, for example switching off unused lights or equipment'],
        ['What is the purpose of environmental protection laws?', 'To protect natural resources and guide responsible practices'],
        ['What is an incentive for sustainable behaviour?', 'A benefit or reward that encourages a sustainable practice'],
        ['Why can governments support research into sustainable technologies?', 'To develop improved, more responsible ways to use resources'],
        ['What does national resource preservation mean?', 'Protecting a country’s natural resources for continued and future use'],
        ['How can sustainable industries benefit a country’s economy?', 'They can support economic growth through responsible resource use'],
        ['Which three groups share responsibility for sustainable resource use?', 'Individuals, businesses and governments'],
        ['Why should individuals not leave all sustainability action to governments?', 'Individuals also influence resource use through waste, energy and purchasing choices'],
        ['Why should businesses not leave all sustainability action to consumers?', 'Businesses control important choices about sourcing, energy and production'],
        ['Give one policy role and one investment role for governments in the lesson.', 'Enacting resource-protection laws and investing in sustainable technology research'],
        ['Describe a combined sustainability approach involving all three groups.', 'Individuals reduce waste, businesses improve sourcing and production, and governments protect resources and support sustainable practices']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.SustainabilityWeek5 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
