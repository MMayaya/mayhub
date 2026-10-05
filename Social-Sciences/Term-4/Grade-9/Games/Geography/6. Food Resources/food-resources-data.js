/* Grade 9 Social Sciences Geography, Term 4, Week 6: Food Resources.
 * Based on the supplied lesson, including its food-security pillars and farming illustrations.
 * Golden Rice clarification: beta-carotene is converted by the body into vitamin A.
 * https://news.irri.org/2016/03/healthier-rice-to-combat-hidden-hunger.html?m=0
 * Organic farming wording avoids treating every chemical as a synthetic pesticide.
 * https://www.fao.org/platforms/green-agriculture/areas-of-work/natural-resources-biodiversity-green-production/organic-agriculture/
 * Questions are self-contained; potential benefits of technologies are not guaranteed outcomes.
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Food security', 'All people having physical and economic access, at all times, to enough safe and nutritious food.'],
        ['Availability', 'Having a sufficient supply of food.'],
        ['Access', 'Being able to obtain food physically and afford it economically.'],
        ['Utilisation', 'Using food safely and effectively to support proper nutrition and health.'],
        ['Stability', 'Maintaining food availability, access and utilisation consistently over time.'],
        ['Community gardens', 'Shared local growing spaces that can provide food and encourage community cooperation.'],
        ['Food banks', 'Organisations that distribute food to people in need, including safe surplus food that might otherwise be wasted.'],
        ['School feeding programmes', 'Organised provision of meals to help learners receive nutritious food.'],
        ['Agricultural subsidies', 'Government financial support that can help farmers and local food production.'],
        ['World Food Programme', 'The United Nations organisation that provides food assistance and works to address hunger.'],
        ['Mechanisation', 'Using machines in farming to reduce the amount of manual labour needed.'],
        ['Factory farming', 'Intensive livestock production with large numbers of animals kept at high stocking density.'],
        ['Genetic modification', 'Altering a plant’s DNA to produce desired traits.'],
        ['Bt maize (corn)', 'Genetically modified maize designed to resist certain insect pests.'],
        ['Golden Rice', 'Genetically modified rice that produces beta-carotene, which the body can convert to vitamin A.'],
        ['Sustainable farming', 'Farming that meets current needs without compromising future generations’ ability to meet theirs.'],
        ['Crop rotation', 'Growing different crops in a planned sequence on the same land to support soil health.'],
        ['Organic farming', 'Farming that prioritises ecological methods rather than routine use of synthetic fertilisers and pesticides.'],
        ['Agroforestry', 'Integrating trees and shrubs into farming systems.'],
        ['Drip irrigation', 'Delivering small amounts of water near plant roots to reduce water waste.']
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
        mc('Which situation best represents food security?', 'People consistently have access to enough safe and nutritious food', 'Food is plentiful but many people cannot obtain it', 'People can afford food only on one day of the year', 'Food is available but always unsafe to eat'),
        mc('Which food-security component concerns having enough food supply?', 'Availability', 'Access', 'Utilisation', 'Stability'),
        mc('A shop has food, but a household cannot afford it. Which component is most directly lacking?', 'Access', 'Availability at the shop', 'Mechanisation', 'Crop rotation'),
        mc('Which food-security component focuses on proper nutrition and healthy use of food?', 'Utilisation', 'Availability alone', 'Factory farming', 'Agricultural subsidies'),
        mc('Which component concerns maintaining food security over time?', 'Stability', 'Availability on one day only', 'Bycatch', 'Mechanisation'),
        mc('Which local initiative combines growing food with community cooperation?', 'A community garden', 'An international famine appeal', 'A national crop subsidy', 'A genetic modification laboratory'),
        mc('How can food banks reduce food waste?', 'Redistributing safe surplus food to people in need', 'Discarding all edible surplus food', 'Preventing food donations from reaching anyone', 'Replacing every local garden with a landfill'),
        mc('What is the main food-security purpose of school feeding programmes?', 'Helping learners receive nutritious meals', 'Replacing every learner’s education with farm work', 'Stopping children from eating during the school day', 'Increasing food waste in every school'),
        mc('How can agricultural subsidies support food security?', 'Helping farmers and boosting local production', 'Guaranteeing that no farmer ever needs to produce food', 'Preventing all local food production', 'Removing every form of support for farming'),
        mc('Which UN organisation in the lesson provides food assistance and addresses hunger?', 'The World Food Programme', 'A community garden committee', 'A local school governing body', 'A private seed shop'),
        mc('What does mechanisation change in farming?', 'Machines perform tasks that would otherwise require more manual labour', 'All machines are removed from farms', 'Farming stops needing any resources', 'Crops no longer need water'),
        mc('Which description identifies factory farming?', 'Intensive livestock production at high stocking density', 'Integrating trees into a crop field', 'Rotating crops between seasons', 'Providing meals to school learners'),
        mc('What is changed when a crop is genetically modified?', 'Its DNA to produce desired traits', 'Only the colour of its packaging', 'Only the price label in a shop', 'Only the location of the farm gate'),
        mc('Which trait is associated with Bt maize in the lesson?', 'Resistance to certain insect pests', 'An inability to grow under any conditions', 'A guarantee that no insects exist near the farm', 'The replacement of all crop DNA by a price label'),
        mc('What nutritional feature makes Golden Rice the example used in the lesson?', 'It produces beta-carotene that the body can convert to vitamin A', 'It contains every nutrient people need in unlimited amounts', 'It never needs to be grown or harvested', 'It replaces the need for all other food'),
        mc('Which goal defines sustainable farming?', 'Meeting present needs while protecting future generations’ ability to meet theirs', 'Maximising output regardless of future land damage', 'Using up every resource in one season', 'Stopping all food production permanently'),
        mc('How can crop rotation support sustainable farming?', 'Growing crops in a planned sequence can improve soil health', 'It requires every crop to grow without soil', 'It means keeping every crop unchanged forever', 'It prevents farmers from considering soil health'),
        mc('Which approach best describes organic farming in this lesson?', 'Prioritising ecological methods rather than routine synthetic fertilisers and pesticides', 'Using synthetic pesticides as the only farming method', 'Eliminating every natural substance from the farm', 'Replacing all soil with plastic packaging'),
        mc('What does agroforestry integrate into farming?', 'Trees and shrubs', 'Only shop price labels', 'Only factory buildings', 'No plants of any kind'),
        mc('Why is drip irrigation an appropriate sustainable technology?', 'It supplies water close to plant roots and reduces waste', 'It requires all fields to remain flooded continuously', 'It makes plants independent of water', 'It deliberately loses most water before reaching crops')
    ];

    const extraChoice = [
        mc('A household has food this week but loses access repeatedly during the year. Which pillar is most directly weak?', 'Stability', 'Mechanisation', 'Genetic modification', 'Agroforestry'),
        mc('A region cannot produce or obtain enough food to supply its people. Which component is directly threatened?', 'Availability', 'Crop rotation', 'Factory farming', 'Consumer labelling'),
        mc('Why is food security more than simply having a large food harvest?', 'People must also obtain safe, nutritious food consistently', 'A harvest automatically guarantees affordable food for every household', 'Food safety becomes irrelevant once production rises', 'Long-term access matters only to farmers'),
        mc('A meal provides too little nutritional value despite filling the plate. Which food-security component needs attention?', 'Utilisation', 'Mechanisation alone', 'Agricultural subsidies alone', 'Stocking density'),
        mc('Why do food-security discussions consider both physical and economic access?', 'People need to be able to reach food and afford it', 'Being able to see food always means being able to buy it', 'Economic access removes the need for any food supply', 'Physical access is the same thing as genetic modification'),
        mc('Which pairing gives the correct role of two local food initiatives?', 'Community gardens grow food; food banks distribute food assistance', 'Community gardens modify all crop DNA; food banks set every national farm policy', 'Community gardens provide only international disaster aid; food banks never redistribute food', 'Community gardens and food banks both exist only to waste food'),
        mc('Countries send food support to another country affected by famine. What is this?', 'International aid', 'Crop rotation', 'Factory farming', 'Mechanisation'),
        mc('Which Sustainable Development Goal shown in the lesson specifically concerns ending hunger?', 'Goal 2: Zero Hunger', 'Goal 7: Affordable and Clean Energy', 'Goal 11: Sustainable Cities and Communities', 'Goal 14: Life Below Water'),
        mc('Which combination best reflects food-security action at different scales?', 'Local gardens, national school meals and international food aid', 'Local gardens alone solving every global food problem', 'International aid replacing every local or national action', 'All food-security action being limited to one household'),
        mc('Why can agricultural policy support for sustainable practices matter beyond one harvest?', 'It can support lasting production without undermining future resources', 'It guarantees that every future harvest will be identical', 'It makes soil health irrelevant', 'It prevents any local food from being produced'),
        mc('Which farming technology helps manage the supply of water to crops?', 'Irrigation systems', 'Food-bank redistribution', 'School feeding programmes', 'A consumer price label'),
        mc('Which concern is associated with factory farming in the lesson?', 'Animal welfare and environmental effects such as pollution', 'The impossibility of producing any animal products', 'The complete absence of resource use', 'A guarantee that every animal has unlimited living space'),
        mc('Which statement about potential GM crop benefits is most accurate?', 'Some desired traits can help increase yields or reduce certain pesticide use', 'Every GM crop automatically solves every food-security problem', 'Every GM crop always has identical environmental effects', 'GM removes the need for any soil, water or farming management'),
        mc('Why is labelling part of the discussion about genetically modified food?', 'It helps consumers make informed choices', 'It changes a plant’s DNA after harvesting', 'It guarantees that every crop contains every vitamin', 'It replaces all environmental assessment'),
        mc('Which balanced assessment of factory farming follows the lesson?', 'It can improve production efficiency but raises welfare and environmental concerns', 'It has no possible benefits and no possible concerns', 'It guarantees higher welfare and zero pollution in every case', 'It is the same technique as crop rotation'),
        mc('How can solar-powered farming equipment contribute to sustainable production?', 'It uses a renewable energy source', 'It makes the farm independent of all natural resources', 'It prevents crops from needing water', 'It replaces all soil-health practices'),
        mc('A farmer grows different crops in sequence to protect soil health. Which technique is this?', 'Crop rotation', 'Factory farming', 'Food-bank distribution', 'Consumer labelling'),
        mc('A farm combines crops with trees and shrubs. Which technique is this?', 'Agroforestry', 'School feeding', 'Food-bank redistribution', 'High-density livestock housing'),
        mc('Which irrigation decision best reflects water conservation?', 'Delivering water near roots with a drip system instead of wasting it', 'Losing water before it reaches the crop', 'Leaving water running regardless of crop needs', 'Treating the water supply as unlimited in every location'),
        mc('How does sustainable farming support long-term food security?', 'It protects resources needed to keep producing food for future generations', 'It focuses only on the current crop and ignores future damage', 'It removes the need for safe and nutritious food', 'It makes access and affordability permanently irrelevant')
    ];

    const trueFalseFacts = [
        ['Food security includes access to enough safe and nutritious food at all times.', true, 'It includes quantity, safety, nutrition, access and consistency over time.'],
        ['Availability: every household being able to afford food, regardless of the supply.', false, 'Availability concerns supply; affordability is part of access.'],
        ['Utilisation concerns nutrition, health and the effective use of food.', true, 'Having food alone does not guarantee that it supports proper nutrition and health.'],
        ['Stability means food access needs to be maintained for only one day.', false, 'Stability concerns consistency over time.'],
        ['Community gardens can support healthy eating and community cooperation.', true, 'They provide opportunities to grow food and work together.'],
        ['Food banks reduce waste by discarding all safe surplus food.', false, 'They can redistribute safe surplus food to people in need.'],
        ['School feeding programmes can help learners receive nutritious meals.', true, 'They are one of the food-security initiatives in the lesson.'],
        ['Agricultural subsidies are designed only to stop local food production.', false, 'They can support farmers and boost local production.'],
        ['International food aid can help people affected by famine or disasters.', true, 'Countries and humanitarian organisations can provide assistance in crises.'],
        ['Zero Hunger is the Sustainable Development Goal about replacing all food with renewable energy.', false, 'Goal 2: Zero Hunger concerns ending hunger and improving food security.'],
        ['Mechanisation uses machines to reduce the manual labour required for some farming tasks.', true, 'Machinery can perform tasks that otherwise require more manual work.'],
        ['Factory farming is defined by very low stocking density and the absence of livestock.', false, 'It is intensive animal farming at high stocking density.'],
        ['Animal welfare and pollution are concerns raised about factory farming.', true, 'The lesson considers concerns alongside potential efficiency and cost benefits.'],
        ['Genetic modification means changing only the packaging around a harvested crop.', false, 'It changes a plant’s DNA to produce desired traits.'],
        ['Bt maize is designed to resist certain insect pests.', true, 'The pest-resistance trait is the example used in the lesson.'],
        ['Golden Rice replaces every other food and provides all nutrients in unlimited amounts.', false, 'It produces beta-carotene, which can be converted to vitamin A; it does not replace a varied diet.'],
        ['Crop rotation can help improve soil health.', true, 'Growing different crops in sequence is one sustainable technique in the lesson.'],
        ['Agroforestry requires all trees and shrubs to be removed from farmland.', false, 'It integrates trees and shrubs into farming systems.'],
        ['Drip irrigation can help conserve water.', true, 'It delivers water near plant roots and reduces waste.'],
        ['Sustainable farming ignores the resource needs of future generations.', false, 'It aims to meet current needs without compromising future ones.']
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
        ['Food safety', 'Food being suitable to eat without causing harm, a quality requirement of food security'],
        ['Affordability', 'Economic ability to obtain food, an aspect of access'],
        ['Physical access', 'Being able to reach or obtain food from shops or distribution points'],
        ['Nutritious food', 'Food providing nutrients needed to support health'],
        ['Four pillars', 'Availability, access, utilisation and stability considered together'],
        ['Surplus-food redistribution', 'Moving safe extra food to people who need assistance'],
        ['International aid', 'Support between countries during famines or disasters'],
        ['Goal 2: Zero Hunger', 'The Sustainable Development Goal specifically concerned with ending hunger'],
        ['Nutritious school meals', 'The food support provided through school feeding programmes'],
        ['Local food production', 'An activity community gardens and farmer support can strengthen'],
        ['Irrigation systems', 'Technology that manages the supply of water to crops'],
        ['Crop yield', 'The amount of crop produced, which farming technology can help improve'],
        ['High stocking density', 'Many livestock animals kept in a limited area in intensive farming'],
        ['Animal welfare', 'The well-being of livestock, a concern raised about factory farming'],
        ['Consumer choice', 'The ability to make informed food decisions, supported by clear labelling'],
        ['Soil health', 'A condition that crop rotation aims to improve'],
        ['Solar-powered equipment', 'Farming technology using energy from the Sun'],
        ['Water conservation', 'Careful water use supported by drip irrigation'],
        ['Future generations', 'People whose food-production resources should not be undermined today'],
        ['Informed food choices', 'Consumer decisions guided by understanding food resources and production']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [1, 5, 6, 10, 18, 2, 7, 8, 19, 12, 13, 14, 22, 33, 39];
    const hints = [
        'This pillar concerns having enough food supply.',
        'Think of neighbours growing food in a shared space.',
        'Safe extra food can be passed to people who need it.',
        'Machinery can carry out tasks previously done mainly by hand.',
        'This technique combines woody plants with farming.',
        'Having food in a shop is different from being able to afford it.',
        'The programme provides food to learners at school.',
        'Subsidies are a form of support for farmers.',
        'The water is delivered close to where plants take it up.',
        'The biological change is within the plant, not its packaging.',
        'This maize example concerns particular insect pests.',
        'The nutrient precursor in this rice can become vitamin A in the body.',
        'Food supply is only one of the four food-security pillars.',
        'Labels provide information to people choosing what to buy.',
        'Future food production also depends on the resources protected today.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What does food security mean?', 'All people having physical and economic access at all times to enough safe and nutritious food'],
        ['Name the four food-security pillars in the lesson.', 'Availability, access, utilisation and stability'],
        ['Which food-security pillar concerns sufficient supply?', 'Availability'],
        ['Which pillar concerns being able to obtain and afford food?', 'Access'],
        ['What does utilisation focus on in food security?', 'Nutrition, health and the safe, effective use of food'],
        ['What does stability mean in food security?', 'Maintaining food availability, access and utilisation over time'],
        ['Food is on sale, but a family cannot pay for it. Which pillar is most directly lacking?', 'Access'],
        ['A family repeatedly loses access to food during the year. Which pillar is most directly weak?', 'Stability'],
        ['Why is a large harvest alone insufficient to guarantee food security?', 'People must also obtain safe, nutritious food consistently'],
        ['Why does food security include both physical and economic access?', 'People need to be able to reach food and afford it'],
        ['Name two benefits community gardens can offer.', 'Local food production and healthy eating or community cooperation'],
        ['How can a food bank reduce waste while helping people?', 'Redistributing safe surplus food to those in need'],
        ['What do school feeding programmes aim to provide?', 'Nutritious meals for learners'],
        ['What is an agricultural subsidy?', 'Government financial support for farmers or agricultural production'],
        ['How can agricultural subsidies support local food security?', 'They can help farmers and boost local production'],
        ['What does WFP stand for?', 'World Food Programme'],
        ['What role does the World Food Programme play in the lesson?', 'Providing food assistance and addressing hunger'],
        ['What is international food aid?', 'Food support between countries, especially during famine or disasters'],
        ['Which Sustainable Development Goal specifically concerns ending hunger?', 'Goal 2: Zero Hunger'],
        ['Give one local, one national and one international food-security initiative from the lesson.', 'Community gardens or food banks; school meals or farmer support; international food aid or WFP assistance'],
        ['What is mechanisation in farming?', 'Using machines to reduce the manual labour needed for some tasks'],
        ['What is the purpose of an irrigation system?', 'Managing the supply of water to crops'],
        ['Name two ways science and technology can improve food production in the lesson.', 'Improved crop yields and enhanced nutritional content'],
        ['What is factory farming?', 'Intensive animal farming at high stocking density'],
        ['Name one possible efficiency or cost benefit of factory farming.', 'Increased production efficiency or potentially lower consumer costs'],
        ['Name two concerns raised about factory farming.', 'Animal welfare and environmental effects such as pollution or resource use'],
        ['What does genetic modification of crops change?', 'Plant DNA to produce desired traits'],
        ['What trait is associated with Bt maize or corn in the lesson?', 'Resistance to certain insect pests'],
        ['What feature of Golden Rice relates to vitamin A?', 'It produces beta-carotene, which the body can convert to vitamin A'],
        ['Why is labelling relevant to debates about GM food?', 'It supports informed consumer choice'],
        ['What is the aim of sustainable farming?', 'Meeting current food-production needs without compromising future generations'],
        ['What is crop rotation?', 'Growing different crops in a planned sequence on the same land'],
        ['Which soil-related benefit of crop rotation is highlighted in the lesson?', 'Improved soil health'],
        ['What approach to inputs does organic farming emphasise?', 'Ecological methods rather than routine synthetic fertilisers and pesticides'],
        ['What is agroforestry?', 'Integrating trees and shrubs into farming'],
        ['Why can drip irrigation conserve water?', 'It delivers water near roots and reduces waste'],
        ['Which renewable energy technology for farming is given in the lesson?', 'Solar-powered equipment'],
        ['How can protecting farming resources today improve future food security?', 'It preserves the land, water and other resources needed for continued food production'],
        ['Name two sustainable techniques other than drip irrigation from the lesson.', 'Crop rotation, organic farming, agroforestry or solar-powered equipment; any two'],
        ['Suggest one community action that supports food security in the lesson.', 'Developing a community garden, supporting a food bank or redistributing safe surplus food']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.FoodResourcesWeek6 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
