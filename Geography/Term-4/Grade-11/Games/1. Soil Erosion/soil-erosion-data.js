/* Grade 11 Geography, Term 4, Topic 1: Soil Erosion.
 * Based on Topic 1.pdf, including the soil-formation diagrams, erosion photographs,
 * South African examples and conservation illustrations. All prompts are self-contained.
 * Soil forms slowly and is effectively non-renewable on human timescales, not literally
 * impossible to form again. Desertification refers specifically to degradation in drylands.
 * Primary-source checks:
 * https://www.fao.org/newsroom/detail/Saving-our-soils/en
 * https://www.fao.org/agriculture/crops/thematic-sitemap/theme/spi/soil-biodiversity/the-nature-of-soil/how-is-soil-formed/en/
 * https://www.unccd.int/article-1-use-terms
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Soil', 'The loose surface material in which plants grow, containing mineral particles and organic remains.'],
        ['Topsoil', 'The upper soil layer, shown as the A horizon, which is especially important for plant growth.'],
        ['Weathering', 'The breakdown of rock into smaller particles that contribute to soil formation.'],
        ['Sheet erosion', 'The removal of a thin layer of soil across a broad surface by flowing water.'],
        ['Gully erosion', 'The removal of soil by concentrated flowing water that cuts deep channels into the land.'],
        ['Deforestation', 'The removal of trees, reducing the roots and vegetation that protect and anchor soil.'],
        ['Overgrazing', 'Livestock removing vegetation faster than it can recover, leaving the soil exposed.'],
        ['Soil compaction', 'The pressing together of soil particles, which can reduce water absorption and increase runoff.'],
        ['Overcropping', 'Intensive repeated cultivation without enough recovery or protection of the soil.'],
        ['Crop rotation', 'Growing different crops in sequence on the same land as part of sustainable soil management.'],
        ['Soil degradation', 'A decline in soil quality and productive capacity, of which erosion is one form.'],
        ['Reduced crop yields', 'A decrease in the amount harvested as erosion removes productive soil.'],
        ['Siltation', 'The build-up of deposited sediment in rivers or dams after eroded material is transported there.'],
        ['Desertification', 'Land degradation in arid, semi-arid or dry sub-humid areas, to which soil erosion can contribute.'],
        ['Rural depopulation', 'A decline in the number of people living in rural areas, which migration to towns can cause.'],
        ['Contour ploughing', 'Ploughing across a slope along lines of equal height to help slow runoff.'],
        ['Terracing', 'Creating step-like platforms on a slope to reduce the speed of water and soil loss.'],
        ['Windbreaks', 'Rows of trees or shrubs planted to reduce wind speed and protect soil.'],
        ['Revegetation', 'Re-establishing plant cover on damaged or bare land to help stabilise the soil.'],
        ['Strip farming', 'Growing crops in alternating strips with protective vegetation or other crops to help reduce erosion.']
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
        mc('Which description best explains what soil is?', 'Loose surface material containing mineral particles and organic remains', 'Only solid, unweathered bedrock', 'Only water flowing in a river channel', 'Only the living leaves above the ground'),
        mc('Which soil horizon is commonly called topsoil?', 'The A horizon', 'The B horizon, known as subsoil', 'The C horizon, consisting of parent material', 'The unweathered bedrock beneath the profile'),
        mc('What is the difference between weathering and erosion?', 'Weathering breaks rock down; erosion removes and transports material', 'Weathering transports all material; erosion only forms new rock', 'Both refer only to the planting of trees', 'Weathering occurs only after soil is deposited in dams'),
        mc('Rainwater removes a thin layer of soil across a field without cutting deep channels. Identify the process.', 'Sheet erosion', 'Gully erosion', 'Terracing', 'Soil formation'),
        mc('Deep channels develop where flowing water cuts into exposed land. Identify the process.', 'Gully erosion', 'Sheet erosion only', 'Crop rotation', 'Windbreak planting'),
        mc('How can deforestation increase soil erosion?', 'It removes vegetation and roots that protect and anchor the soil', 'It creates terraces along every hillside', 'It always increases protective ground cover', 'It prevents rainwater from reaching any soil'),
        mc('A herd removes grass faster than it can grow back. Which land-use problem is this?', 'Overgrazing', 'Crop rotation', 'Wetland conservation', 'Contour ploughing'),
        mc('Repeated trampling presses soil particles together. Why can this increase erosion?', 'Less water can soak in, so more may flow over the surface', 'Compacted soil always absorbs water faster', 'Trampling automatically creates new fertile topsoil', 'Compaction prevents any runoff from forming'),
        mc('Which practice can leave cultivated soil vulnerable through excessive repeated use?', 'Overcropping without adequate soil protection', 'Re-establishing vegetation on bare ground', 'Conserving wetland vegetation', 'Planting windbreaks beside exposed fields'),
        mc('Which practice changes the crops grown on the same field over successive seasons?', 'Crop rotation', 'Deforestation', 'Gully erosion', 'Soil compaction'),
        mc('Why is soil erosion considered a form of soil degradation?', 'It removes productive soil and reduces the land’s capacity to support growth', 'It always increases soil depth and fertility', 'It creates a permanent protective cover over every field', 'It only changes the colour of crops without affecting the land'),
        mc('How can the loss of topsoil affect food production?', 'It can reduce soil depth and crop yields', 'It guarantees larger harvests every season', 'It immediately replaces all lost nutrients', 'It increases productive farmland in every affected area'),
        mc('Eroded soil is deposited in a dam. Which effect is this?', 'Siltation', 'Weathering of bedrock in place', 'Contour ploughing', 'Crop rotation'),
        mc('In which setting is land degradation specifically called desertification?', 'Arid, semi-arid or dry sub-humid areas', 'Only permanently frozen polar ice', 'Every ocean basin regardless of land conditions', 'Any place solely because it contains a town'),
        mc('Farmers leave a rural area as declining land productivity reduces their livelihoods. What may result?', 'Rural depopulation', 'Increased soil depth caused by migration', 'Automatic restoration of all damaged land', 'A guaranteed rise in rural employment'),
        mc('Which direction of ploughing helps slow runoff on a slope?', 'Across the slope along contour lines', 'Directly down the slope in long uninterrupted furrows', 'Only along the fastest downhill water channels', 'In any direction after all protective cover is removed'),
        mc('A farmer creates step-like platforms on a steep hillside. Which conservation method is this?', 'Terracing', 'Overgrazing', 'Deforestation', 'Siltation'),
        mc('Which method directly reduces wind speed over an exposed field?', 'Planting windbreaks', 'Removing all trees beside the field', 'Increasing livestock trampling', 'Ploughing long channels downhill'),
        mc('Planting grasses on damaged bare land is an example of which method?', 'Revegetation', 'Overcropping', 'Soil compaction', 'Deforestation'),
        mc('Which method alternates strips of crops and protective vegetation to reduce erosion?', 'Strip farming', 'Gully erosion', 'Rural depopulation', 'Uncontrolled overgrazing')
    ];

    const extraChoice = [
        mc('Which two materials contribute to the formation of soil in the lesson’s diagrams?', 'Weathered mineral particles and accumulated organic remains', 'Only fresh paint and concrete', 'Only river water and plastic litter', 'Only unbroken rock without organisms or organic material'),
        mc('Why is soil treated as effectively non-renewable on human timescales?', 'It forms very slowly and can be lost much faster than it is replaced', 'It never changes and cannot be eroded', 'A full mature soil profile always reforms after one storm', 'Organic remains cannot become part of soil'),
        mc('Moss and lichens colonise rock, followed by organic remains and larger plants. What does this sequence illustrate?', 'The gradual development of soil over time', 'The immediate formation of a mature soil profile in one day', 'Silt being removed from a reservoir', 'The building of a windbreak beside a mature field'),
        mc('A dry, bare field loses fine soil during strong winds. Which agent is responsible?', 'Wind', 'Only water flowing through a gully', 'Only crop rotation', 'Only wetland conservation'),
        mc('A thin soil layer is lost over a wide field and deep channels form in another field. Which comparison is correct?', 'The first shows sheet erosion; the second shows gully erosion', 'Both show terracing', 'The first shows gully erosion; the second shows soil formation', 'Both show windbreak planting'),
        mc('Construction clears vegetation and leaves loose soil exposed before heavy rain. Which explanation fits the lesson?', 'Disturbed, unprotected soil may be washed away by runoff', 'Construction always prevents erosion regardless of cover', 'Exposed soil absorbs all rain without any runoff', 'Clearing vegetation immediately restores a mature soil profile'),
        mc('Many animals use the same bare path repeatedly. What is the most relevant erosion risk?', 'Trampling can compact soil and increase surface runoff', 'The path automatically becomes a wetland', 'Every animal movement guarantees immediate desertification', 'Trampling replaces all lost vegetation with trees'),
        mc('Which change is most likely to reduce erosion risk on heavily grazed land?', 'Reducing excessive grazing pressure so vegetation can recover', 'Adding more animals while the grass cannot recover', 'Removing the remaining ground cover', 'Encouraging continuous trampling of the same exposed paths'),
        mc('Why can a lack of crop rotation increase vulnerability to soil degradation?', 'Repeated use without suitable rotation can weaken soil condition and protection', 'Rotation is the same process as erosion into a dam', 'Using the same crop always guarantees complete soil recovery', 'Rotation works only by removing all roots from the ground'),
        mc('Expansion of farming and urban areas can accelerate erosion when it does what?', 'Disturbs soil and removes protective vegetation without adequate conservation', 'Always preserves every part of the original vegetation cover', 'Automatically eliminates every form of surface runoff', 'Makes land-use decisions unrelated to soil condition'),
        mc('Which chain correctly links erosion with food insecurity?', 'Loss of productive soil can reduce harvests and the availability of food', 'Loss of topsoil always increases harvests and reduces food prices', 'Dam siltation replaces every household’s food supply', 'Rural migration always creates more fertile soil'),
        mc('Sediment enters a river after topsoil is washed off nearby land. Which consequence is possible?', 'Poorer water quality and harm to aquatic habitats', 'Guaranteed improvement in every aquatic habitat', 'Immediate recovery of the original soil on the field', 'The end of all river sediment deposition'),
        mc('Why can the build-up of sediment be a problem for a dam?', 'It can reduce the space available for storing water', 'It always increases the dam’s storage space', 'It stops all erosion throughout the catchment', 'It turns deposited sediment into a windbreak'),
        mc('Which social and economic effects can follow declining agricultural productivity?', 'Lower rural incomes, job losses and greater poverty', 'Guaranteed higher employment and income for every farmer', 'Immediate recovery of all lost farmland', 'The elimination of every need for food purchases'),
        mc('Which relationship can make soil loss worse after vegetation is removed?', 'More exposed soil and runoff can cause further erosion', 'Less vegetation always leads to less exposed soil', 'Runoff automatically restores the removed plant cover', 'Erosion increases roots without any regrowth'),
        mc('Small barriers are placed across eroding channels to slow water and trap sediment. Which measure is this?', 'Check dams', 'Windbreaks beside a field', 'Crop rotation between seasons', 'Rural depopulation'),
        mc('A protective fabric is used to help stabilise exposed soil while vegetation becomes established. Which measure is this?', 'Geotextiles', 'Overgrazing', 'Deforestation', 'Continuous cultivation without soil protection'),
        mc('Which wetland function supports soil and water conservation?', 'Vegetation can slow water and help trap sediment', 'Wetlands guarantee the end of all erosion in every catchment', 'Removing wetland cover always improves sediment retention', 'Wetland conservation is the same as compacting bare soil'),
        mc('Why does the lesson recommend education and training for land users?', 'To support informed farming practices and effective soil conservation', 'To replace all practical land management with certificates alone', 'To make soil condition irrelevant to farming decisions', 'To encourage overgrazing without considering vegetation recovery'),
        mc('Which plan best combines the lesson’s technical and community approaches?', 'Protect plant cover, control grazing, use suitable conservation methods and train land users', 'Use one windbreak while encouraging all other damaging practices', 'Remove wetlands, clear trees and increase grazing pressure', 'Change land ownership and assume soil recovers without management')
    ];

    const trueFalseFacts = [
        ['Soil contains both mineral particles and organic remains.', true, 'The lesson describes soil as a mixture, not only rock or only organic matter.'],
        ['A mature soil profile is normally replaced completely within days after erosion.', false, 'Soil formation is slow, so rapid soil loss cannot be quickly replaced.'],
        ['Weathering contributes particles that help form soil.', true, 'Weathered rock supplies mineral material.'],
        ['Sheet erosion: water cuts deep, concentrated channels into the land.', false, 'Deep channels describe gully erosion; sheet erosion removes a thin layer over a wider surface.'],
        ['Wind can remove exposed topsoil, especially in dry conditions.', true, 'Dry, unprotected soil is vulnerable to wind erosion.'],
        ['Deforestation protects soil by removing the roots that anchor it.', false, 'Removing trees reduces this protection and can increase erosion.'],
        ['Overgrazing can leave soil exposed when vegetation cannot recover.', true, 'Excessive grazing removes protective plant cover.'],
        ['Soil compaction usually improves water absorption and eliminates runoff.', false, 'Compaction can reduce absorption and increase surface runoff.'],
        ['Construction can increase erosion when it disturbs soil and removes protective cover.', true, 'Exposed, disturbed soil may be more easily removed.'],
        ['Every animal migration causes desertification regardless of vegetation or soil conditions.', false, 'Large numbers and trampling can create risks, but outcomes depend on local conditions and land use.'],
        ['Loss of productive topsoil can reduce crop yields.', true, 'Reduced soil depth and quality can lower harvests.'],
        ['Siltation increases a dam’s water-storage space by adding sediment.', false, 'Deposited sediment occupies storage space.'],
        ['Soil erosion can contribute to food insecurity and lower rural incomes.', true, 'Lower productivity can affect food supplies and livelihoods.'],
        ['All erosion in every climatic region is called desertification.', false, 'Desertification specifically concerns land degradation in dryland areas.'],
        ['Migration from rural areas to towns can contribute to rural depopulation.', true, 'Departure reduces the number of people living in rural areas.'],
        ['Contour ploughing directs all furrows straight down the steepest slope.', false, 'Contour ploughing follows lines of equal height across the slope.'],
        ['Terraces can slow runoff and reduce soil loss on slopes.', true, 'Their step-like form interrupts rapid downslope water movement.'],
        ['Windbreaks are planted mainly to increase wind speed over bare soil.', false, 'They reduce wind speed and help protect exposed soil.'],
        ['Revegetation can help stabilise damaged soil.', true, 'Restored plant cover and roots provide protection.'],
        ['Land reform alone automatically restores every eroded soil without further management.', false, 'The lesson also requires informed land use, training and practical conservation measures.']
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
        ['Organic matter', 'Plant and animal remains that accumulate and become part of soil'],
        ['Parent material', 'Underlying material from which the soil’s mineral component develops'],
        ['Soil formation', 'Slow development of a soil profile from weathered material and organic remains'],
        ['Wind erosion', 'Removal and transport of exposed soil particles by moving air'],
        ['Runoff', 'Water flowing over the land surface that can carry loosened soil away'],
        ['Livestock trampling', 'Repeated animal footsteps that can press exposed soil together'],
        ['Construction disturbance', 'Soil being loosened or exposed by building activities'],
        ['Loss of plant cover', 'Removal of the vegetation that shields the ground from erosion'],
        ['Bare cultivated ground', 'A farm surface left without protective vegetation after soil disturbance'],
        ['Species imbalance', 'Too many animals of one type placing excessive pressure on local vegetation and soil'],
        ['Food insecurity', 'Difficulty obtaining enough food, which declining harvests can worsen'],
        ['Habitat loss', 'Damage to or disappearance of living spaces used by plants and animals'],
        ['Aquatic habitat damage', 'Harm to river living spaces when eroded sediment changes water conditions'],
        ['Greater poverty', 'Worsening lack of resources when rural incomes and livelihoods decline'],
        ['Higher food prices', 'An increase in food costs that can follow reduced agricultural supplies'],
        ['Check dams', 'Small barriers across eroding channels that slow water and trap sediment'],
        ['Geotextiles', 'Protective fabrics used to help stabilise soil'],
        ['Wetland conservation', 'Protecting waterlogged habitats whose vegetation can slow flow and trap sediment'],
        ['Biodiversity', 'The variety of living organisms supported by careful land management'],
        ['Farmer training', 'Teaching land users informed and practical soil-management methods']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 2, 3, 5, 6, 7, 10, 12, 13, 15, 16, 18, 21, 32, 39];
    const hints = [
        'Look for a mixture of mineral material and organic remains.',
        'Compare breaking material down with carrying it to another place.',
        'The soil is being removed broadly, not through a deep channel.',
        'Think about what roots and plant cover do before trees are removed.',
        'Compare the speed at which grass is eaten with its speed of recovery.',
        'Consider whether water can enter soil whose particles are pressed together.',
        'Focus on the loss of productive soil rather than only a change in appearance.',
        'Eroded material has been transported and deposited in a water body.',
        'The definition is linked to dryland environments.',
        'Contour lines join places at the same height.',
        'The method changes a steep slope into a series of steps.',
        'The land is being covered with growing plants again.',
        'Compare the slow rate of formation with the speed at which soil can be lost.',
        'Deposited material occupies part of the reservoir.',
        'Choose a plan that combines protective techniques with informed land use.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What is soil made of according to the lesson?', 'Mineral particles, including weathered rock and clay, together with organic remains'],
        ['Explain soil erosion without referring to a photograph.', 'The removal and transport of soil, especially topsoil, by agents such as water or wind'],
        ['Which soil horizon is commonly called topsoil?', 'The A horizon'],
        ['What role does weathering play in soil formation?', 'It breaks rock down into mineral particles that become part of soil'],
        ['How do plant and animal remains contribute to soil development?', 'They add organic material that accumulates and mixes with mineral particles'],
        ['Why is soil considered effectively non-renewable on human timescales?', 'It forms slowly and can be lost much faster than it can be replaced'],
        ['How does sheet erosion differ from gully erosion?', 'Sheet erosion removes a thin layer over a broad surface; gully erosion cuts deep channels'],
        ['Name two physical agents that can remove soil.', 'Water and wind; ice is also identified in the introduction'],
        ['Describe a field most vulnerable to wind removing its topsoil.', 'A dry, bare or poorly covered field exposed to strong winds'],
        ['What does the gradual sequence from rock, to organic remains, to larger plants illustrate?', 'Soil formation over time'],
        ['Why can removing trees increase the risk of soil erosion?', 'It removes protective cover and roots that anchor soil'],
        ['What is overgrazing?', 'Animals consume vegetation faster than it can recover, leaving the ground exposed'],
        ['Explain how animal trampling can increase runoff.', 'It can compact soil, reduce water absorption and leave more water flowing over the surface'],
        ['Why should animal numbers be considered when managing erosion risk?', 'Excessive numbers can put pressure on vegetation and compact exposed soil'],
        ['How can construction activities make soil more vulnerable to water erosion?', 'They can disturb soil and remove its protective vegetation cover'],
        ['What is crop rotation?', 'Growing different crops in sequence on the same land'],
        ['Why can repeated intensive cultivation without adequate protection damage soil?', 'It can weaken soil condition and leave it vulnerable to erosion and degradation'],
        ['How can expanding farming or urban areas accelerate erosion?', 'Land clearance and soil disturbance can increase soil loss if conservation is inadequate'],
        ['A grazed field has bare patches and compacted animal paths. Name two linked erosion risks.', 'Loss of vegetation cover and reduced infiltration that increases runoff'],
        ['Why is it inaccurate to say that all farming inevitably causes severe soil erosion?', 'Risk depends on land-use methods, soil protection and local conditions; conservation can reduce it'],
        ['How can soil erosion reduce agricultural productivity?', 'It removes productive topsoil and reduces the soil depth or quality available for crops'],
        ['Explain one link between lower harvests and food insecurity.', 'Reduced food production can make enough food less available or harder to afford'],
        ['What is siltation?', 'The build-up of deposited sediment in a water body such as a river or dam'],
        ['Why can siltation reduce a dam’s useful water-storage capacity?', 'The deposited sediment takes up space that could otherwise store water'],
        ['Give one way eroded sediment can affect a river ecosystem.', 'It can worsen water quality or damage aquatic habitats and organisms'],
        ['Name two economic problems that declining agricultural productivity can cause.', 'Lower incomes, unemployment or greater poverty; any two'],
        ['Why may declining land productivity encourage rural-to-urban migration?', 'People may leave in search of livelihoods when farming no longer supports them adequately'],
        ['What does rural depopulation mean?', 'A decline in the number of people living in rural areas'],
        ['In what climatic environments is land degradation called desertification?', 'Arid, semi-arid and dry sub-humid areas'],
        ['Describe how vegetation loss and runoff can reinforce soil erosion.', 'Reduced cover leaves soil exposed and can increase runoff, causing further soil removal'],
        ['How does contour ploughing help conserve soil?', 'Furrows follow lines of equal height across a slope and help slow runoff'],
        ['Describe terracing and its purpose on sloping land.', 'Step-like platforms break up a slope to slow water movement and reduce soil loss'],
        ['What is the purpose of planting windbreaks?', 'To reduce wind speed and protect exposed soil from wind erosion'],
        ['How does revegetation help damaged land?', 'Re-established plant cover and roots help protect and stabilise soil'],
        ['Explain the basic layout of strip farming.', 'Alternating strips of crops and protective vegetation or other crops that help reduce erosion'],
        ['What do check dams do in eroding channels?', 'Slow the movement of water and trap sediment'],
        ['What are geotextiles used for in soil conservation?', 'Protective fabrics help stabilise exposed soil'],
        ['Why does wetland conservation support the management of soil loss?', 'Wetland vegetation can slow water and trap sediment'],
        ['Name two non-structural approaches to better soil management from the lesson.', 'Education and training, informed scientific farming or policies supporting sustainable land use; any two'],
        ['Why should changes in land ownership be accompanied by training and conservation practices?', 'Ownership changes alone do not restore soil; effective land management is still needed']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.SoilErosionTopic1 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
