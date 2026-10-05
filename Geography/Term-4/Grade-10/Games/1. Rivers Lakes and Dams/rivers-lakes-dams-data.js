/* Grade 10 Geography, Term 4, Topic 1: Rivers, Lakes and Dams.
 * Based on the supplied Topic 1 lesson, including the maps and dam-impact captions.
 * Rainfall seasons describe general patterns, not an absolute ban on rain in other seasons.
 * No current dam counts, capacity totals, rankings or source-dependent questions are used.
 * Scientific wording checked against DWS:
 * https://www.dws.gov.za/iwqs/eutrophication/NEMP/default.aspx
 * https://www.dws.gov.za/iwqs/rhp/state_of_rivers/state_of_umngeni_02/dams.html
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Semi-arid', 'A relatively dry climate with limited rainfall, but not as dry as an arid climate.'],
        ['Rainfall variability', 'Differences in the amount of rain received between places or times.'],
        ['Evaporation', 'The change of liquid water into water vapour, which can reduce stored water supplies.'],
        ['Summer rainfall', 'A rainfall pattern in which most rain falls in summer, typical of much of South Africa.'],
        ['Winter rainfall', 'A rainfall pattern in which most rain falls in winter, typical of the south-western Cape.'],
        ['River', 'A natural stream of water flowing through a channel.'],
        ['Natural lake', 'An inland body of standing water in a naturally formed basin.'],
        ['Dam', 'A constructed barrier that holds back water, commonly across a river.'],
        ['Reservoir', 'A body of water stored behind a dam.'],
        ['Inter-basin transfer', 'Moving water from one river basin to another through infrastructure such as tunnels and canals.'],
        ['Infiltration', 'The movement of water from the surface into the soil.'],
        ['Runoff', 'Water flowing over the land surface towards streams and rivers.'],
        ['Siltation', 'The accumulation of sediment in a water body, which can reduce a dam’s storage capacity.'],
        ['Acid mine drainage', 'Acidic water draining from mine workings that can pollute water supplies.'],
        ['Eutrophication', 'Excessive nutrient enrichment of water that can promote excessive algal growth.'],
        ['Irrigation', 'Supplying water to crops where rainfall alone is insufficient.'],
        ['Hydroelectric power', 'Electricity generated using the energy of moving water.'],
        ['Recreation', 'Leisure activities such as boating or fishing at a dam.'],
        ['Biodiversity', 'The variety of living organisms in an area or ecosystem.'],
        ['Fish migration', 'The movement of fish along a river, which a dam wall can obstruct.']
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
        mc('What does South Africa’s semi-arid character imply for water supply?', 'Rainfall is relatively limited, so water needs careful management', 'Rainfall is abundant and evenly spread throughout the country', 'All regions receive their rainfall mainly in winter', 'Evaporation has no effect on water supply'),
        mc('Which statement best describes rainfall across South Africa?', 'It varies across the country, with the west generally drier than the east', 'The west is generally wetter than the east', 'Every place receives the same amount each year', 'Rain falls only where large dams have been built'),
        mc('Which process directly removes water from a dam’s surface into the atmosphere?', 'Evaporation', 'Infiltration', 'Siltation', 'Inter-basin transfer'),
        mc('When does much of South Africa receive most of its rainfall?', 'Summer', 'Winter', 'Equally in every month', 'Only during the building of dams'),
        mc('Which region is associated with a winter-rainfall pattern?', 'The south-western Cape', 'The summer-rainfall interior', 'Every part of the east coast', 'All of South Africa without exception'),
        mc('Which description identifies a river?', 'A natural stream flowing through a channel', 'An artificial wall holding back water', 'A body of stored water behind a wall', 'An underground tunnel built to transfer water'),
        mc('Which feature distinguishes a natural lake from a reservoir behind a dam?', 'It occupies a naturally formed basin rather than being created by a dam wall', 'It must always contain salt water', 'It always generates hydroelectric power', 'It is the constructed wall across a river'),
        mc('What is the main purpose of a storage dam?', 'Holding back water so that supplies can be stored and managed', 'Increasing evaporation to empty a river basin', 'Ensuring that sediment never settles anywhere', 'Removing the need to manage water quality'),
        mc('What is the body of stored water behind a dam called?', 'A reservoir', 'A canal', 'A dam wall', 'A transfer tunnel'),
        mc('Which example in the lesson illustrates an inter-basin transfer?', 'Water moved from the Orange River basin to the Fish River basin', 'Water changing into vapour above a dam', 'Rain soaking into soil beside a river', 'Sediment settling on the floor of a reservoir'),
        mc('What effect do roads and pavements generally have on infiltration?', 'They reduce the amount of water entering the soil', 'They increase it by absorbing all rainfall', 'They convert infiltration into evaporation without runoff', 'They have exactly the same effect as exposed permeable soil'),
        mc('Water flows over a paved surface into a river. Which process is this?', 'Runoff', 'Infiltration', 'Hydroelectric generation', 'Fish migration'),
        mc('How can soil erosion reduce a dam’s storage capacity?', 'Eroded sediment settles in the reservoir and takes up storage space', 'Sediment dissolves every dam wall immediately', 'Erosion increases storage by creating more sediment', 'Eroded soil prevents any water from entering rivers'),
        mc('Which water-quality problem is directly associated with acidic drainage from mines?', 'Acid mine drainage', 'Winter rainfall', 'Inter-basin transfer', 'Hydroelectric power'),
        mc('Fertiliser nutrients enter a dam and encourage excessive algal growth. What is this process?', 'Eutrophication', 'Infiltration', 'Evaporation', 'Fish migration'),
        mc('Which use of a dam supplies water directly to crops?', 'Irrigation', 'Recreation', 'Fish migration', 'Sediment deposition'),
        mc('Which use of water involves generating electricity?', 'Hydroelectric power', 'Eutrophication', 'Infiltration', 'Recreation'),
        mc('Boating and leisure fishing at a dam are examples of which use?', 'Recreation', 'Inter-basin transfer', 'Acid mine drainage', 'Siltation'),
        mc('A dam changes river habitats and affects the species living there. Which aspect is most directly affected?', 'Biodiversity', 'The timing of every rainfall event', 'The number of river basins on Earth', 'The direction of all ocean currents'),
        mc('Which dam feature can directly obstruct fish moving upstream?', 'The dam wall', 'Rainfall on a distant field', 'A permeable soil surface', 'The Sun heating a reservoir')
    ];

    const extraChoice = [
        mc('Why does a dam not guarantee unlimited water for a semi-arid region?', 'It stores available water but does not create rainfall or prevent all losses', 'It permanently stops evaporation', 'It makes rainfall equally abundant everywhere', 'It replaces the need for any water to enter the basin'),
        mc('Which two natural factors in the lesson can limit water availability?', 'Limited rainfall and substantial evaporation', 'Algal growth and a constructed dam wall only', 'Boating and fishing only', 'Fish migration and recreation only'),
        mc('Which rainfall comparison matches the lesson’s broad west-to-east pattern?', 'Western areas generally receive less rain than eastern areas', 'Western areas generally receive more rain than eastern areas', 'The two sides always receive identical rainfall', 'Eastern areas receive no rainfall in any season'),
        mc('A summer-rainfall region enters its generally drier winter. Why can stored water matter?', 'It can help supply water between wetter periods', 'It changes winter into summer', 'It makes seasonal rainfall patterns disappear', 'It guarantees that all stored water is pollution-free'),
        mc('Which statement describes the south-western Cape without overstating its rainfall pattern?', 'Most rainfall occurs in winter, while summers are generally drier', 'It can never rain in any summer month', 'It receives its heaviest rainfall only in midsummer', 'Its rainfall is identical to every part of the interior'),
        mc('What infrastructure can move water between river basins?', 'Tunnels and canals', 'Dam-wall fishing platforms only', 'Algae and water weeds only', 'Road markings and pavements only'),
        mc('Why are inter-basin transfers useful where water availability is uneven?', 'They can move water between basins to help meet supply needs', 'They guarantee an unlimited supply in every basin', 'They remove every pollutant without treatment', 'They make every river receive identical rainfall'),
        mc('What is the clearest distinction between a dam and its reservoir?', 'The dam is the barrier; the reservoir is the stored water body', 'The dam is the stored water; the reservoir is the barrier', 'Both terms mean only a natural river channel', 'Both terms mean only a transfer tunnel'),
        mc('Which transfer scheme is named in the lesson as infrastructure affecting river flow?', 'Tugela-Vaal', 'A process called evaporation', 'A process called eutrophication', 'A process called siltation'),
        mc('A water-transfer canal diverts some river water. What can this change?', 'The quantity and rate of river flow', 'The total number of seasons in a year', 'Whether water can change into vapour', 'The definition of a natural lake'),
        mc('What is a likely result when permeable ground is replaced by extensive paving?', 'Less infiltration and more surface runoff', 'More infiltration and less surface runoff', 'No change to either process under any conditions', 'All rain becoming stored underground immediately'),
        mc('Why can urban pollution increase the cost of using water again?', 'Polluted water may need expensive treatment before reuse', 'Pollution always makes treatment unnecessary', 'Urban water cannot be treated under any circumstances', 'Pollution prevents water from flowing anywhere'),
        mc('Which human activity can add hazardous chemicals to a river?', 'Discharging untreated industrial waste', 'Boating with no waste discharge', 'Observing fish from the riverbank', 'Measuring rainfall with a gauge'),
        mc('How can water-demanding invasive alien vegetation affect streams?', 'It can reduce the water reaching streams by using more water', 'It guarantees increased stream flow in every season', 'It removes the need for rainfall', 'It prevents all evaporation from a reservoir'),
        mc('Which cause-and-effect chain correctly links farming to a water-quality problem?', 'Fertiliser runoff adds nutrients, which can promote eutrophication', 'Fertiliser runoff removes all nutrients and prevents algae in every case', 'Fertiliser runoff creates a dam wall across a river', 'Fertiliser runoff changes winter rainfall into summer rainfall'),
        mc('Which combination contains only beneficial uses of dams discussed in the lesson?', 'Urban water supply, irrigation and recreation', 'Community displacement, blocked fish migration and pollution', 'Siltation, untreated industrial waste and acid mine drainage', 'Reduced biodiversity, dam failure and crop loss downstream'),
        mc('Why might a community have to relocate when a reservoir is created?', 'The area behind the dam may flood land containing homes', 'Water storage always increases available residential land', 'Every reservoir is naturally formed with no land-use changes', 'Fish migration moves houses upstream'),
        mc('Which assessment of dams and flooding is most accurate?', 'Dams can reduce some flood peaks, but do not eliminate every flood risk', 'Dams guarantee that no downstream flooding can ever happen', 'Dams exist only to cause flooding and have no control function', 'A dam failure cannot affect downstream communities'),
        mc('Why can reduced downstream flow harm people and ecosystems?', 'Less water may be available for downstream users and river habitats', 'It automatically increases water for all downstream farms', 'It guarantees that downstream species are unaffected', 'It removes every need for water below the dam'),
        mc('Which potential impact of vegetation decaying in a reservoir is shown in the lesson?', 'Greenhouse-gas release and changes in water quality', 'A guarantee that no sediment can accumulate', 'The creation of additional rainfall in every season', 'The complete removal of all water-quality concerns')
    ];

    const trueFalseFacts = [
        ['South Africa’s relatively limited rainfall makes water management important.', true, 'The lesson describes the country as semi-arid, with uneven water availability.'],
        ['South Africa’s west coast generally receives more rainfall than its east coast.', false, 'The broad pattern in the lesson is a drier west and a wetter east.'],
        ['Evaporation can reduce the amount of water stored in a dam.', true, 'Liquid water changes into vapour and leaves the water surface.'],
        ['The south-western Cape is mainly a summer-rainfall region.', false, 'It is associated with winter rainfall and generally drier summers.'],
        ['Much of South Africa receives most of its rainfall during summer.', true, 'This is a general seasonal pattern, not a claim that no rain ever falls in winter.'],
        ['Inter-basin transfer: moving water only within the same river basin.', false, 'It moves water from one river basin to another.'],
        ['The Orange-to-Fish transfer moves water between different river basins.', true, 'It is the inter-basin transfer example in the lesson.'],
        ['Reservoir: the constructed wall that holds back river water.', false, 'The dam is the barrier; the reservoir is the stored water body behind it.'],
        ['Roads and pavements generally reduce infiltration and increase runoff.', true, 'Built surfaces restrict water entry into soil, so more can flow over the surface.'],
        ['Sediment accumulating in a dam increases the space available to store water.', false, 'Siltation takes up storage space and can reduce capacity.'],
        ['Acid mine drainage can pollute water with acidic drainage from mines.', true, 'The lesson identifies mining as a source of water-quality problems.'],
        ['Eutrophication: the loss of nutrients from water, preventing algal growth.', false, 'It involves excessive nutrient enrichment that can promote excessive algal growth.'],
        ['Water-demanding invasive alien vegetation can reduce stream flow.', true, 'Such vegetation can use more water and reduce the water reaching streams.'],
        ['Polluted urban water can always be reused without treatment.', false, 'Treatment may be necessary and expensive before reuse.'],
        ['Dams can provide water for crops and urban settlements.', true, 'Irrigation and supplying towns and cities are uses listed in the lesson.'],
        ['Hydroelectric power: electricity generated by burning water as a fuel.', false, 'It uses the energy of moving water to generate electricity.'],
        ['A dam wall can obstruct fish migration.', true, 'The wall can form a barrier to movement along the river.'],
        ['Building a dam always leaves downstream flow and habitats unchanged.', false, 'Dams can alter flow, sediment movement and river habitats.'],
        ['Reservoir creation can flood land and displace communities.', true, 'Flooding of land behind a dam is one potential social impact.'],
        ['Flood-control dams guarantee that every downstream flood risk is eliminated.', false, 'They can reduce some flood peaks, but flooding and dam-failure risks can remain.']
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
        ['West coast', 'The generally drier coastal side of South Africa in the lesson’s rainfall comparison'],
        ['East coast', 'The generally wetter coastal side of South Africa in the lesson’s rainfall comparison'],
        ['South-western Cape', 'The South African region associated with a winter-rainfall climate'],
        ['Uneven water supply', 'A water-management challenge caused by differences in rainfall between regions'],
        ['Water loss from storage', 'A consequence when evaporation removes water from reservoirs'],
        ['Orange River basin', 'The supplying basin in the Orange-to-Fish water-transfer example'],
        ['Fish River basin', 'The receiving basin in the Orange-to-Fish water-transfer example'],
        ['Tugela-Vaal scheme', 'The named water-transfer example discussed under changes to river flow'],
        ['Canal', 'An artificial open channel used to carry or transfer water'],
        ['Transfer tunnel', 'An underground passage used to carry water between locations'],
        ['Built surfaces', 'Roads and pavements that restrict water entry into the soil'],
        ['Industrial effluent', 'Liquid waste from factories that can carry hazardous chemicals into water'],
        ['Fertiliser runoff', 'Water from farmland carrying added crop nutrients into rivers or dams'],
        ['Invasive alien vegetation', 'Introduced plants with high water demand that can reduce stream flow'],
        ['Soil erosion', 'Removal of soil that can supply the sediment later deposited in dams'],
        ['Urban water supply', 'Using stored dam water to serve towns and cities'],
        ['Community displacement', 'People needing to relocate when a reservoir floods their settlement'],
        ['Flood attenuation', 'Reducing a flood peak by temporarily storing part of the incoming river water'],
        ['Dam failure', 'A breakdown of a water-holding barrier that can release water and cause downstream flooding'],
        ['Decaying reservoir vegetation', 'Flooded plant material whose decomposition can affect water quality and release greenhouse gases']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 5, 8, 2, 15, 4, 9, 12, 14, 16, 19, 30, 35, 37, 38];
    const hints = [
        'Think about what a relatively dry climate means for the amount of water available.',
        'Look for the natural feature in which water moves through a channel.',
        'Separate the stored water body from the wall that holds it back.',
        'Consider the change from liquid water to water vapour.',
        'This use takes stored water to farmland.',
        'The south-western Cape’s wetter season differs from much of the country.',
        'The key is movement between two different river basins.',
        'Deposited material takes up part of the space available for water.',
        'Added nutrients can stimulate algal growth.',
        'Moving water can provide energy for electricity generation.',
        'Think about what forms a physical obstacle across the river.',
        'Paving restricts water entry into soil, changing where rainwater goes.',
        'Distinguish a service provided by a dam from an environmental or social cost.',
        'Reducing a risk is different from removing every possible risk.',
        'People and ecosystems below a dam still depend on river water.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What does semi-arid mean?', 'Relatively dry, with limited rainfall, but not as dry as an arid climate'],
        ['How does the lesson compare rainfall on South Africa’s west and east coasts?', 'The west is generally drier and the east generally wetter'],
        ['Which process changes liquid water in a reservoir into water vapour?', 'Evaporation'],
        ['In which season does much of South Africa receive most of its rainfall?', 'Summer'],
        ['Which part of South Africa is associated with winter rainfall?', 'The south-western Cape'],
        ['What is a river?', 'A natural stream of water flowing through a channel'],
        ['How does a natural lake differ from a reservoir behind a dam?', 'The lake occupies a naturally formed basin; the reservoir is created by holding back water behind a dam'],
        ['What is a dam?', 'A constructed barrier that holds back water, commonly across a river'],
        ['What name is given to the stored water body behind a dam?', 'A reservoir'],
        ['What is an inter-basin transfer?', 'Moving water from one river basin to another'],
        ['Name the supplying and receiving river basins in the Orange-to-Fish transfer.', 'Orange River basin supplies water; Fish River basin receives it'],
        ['Name two types of infrastructure used in water transfers in the lesson.', 'Tunnels and canals'],
        ['What does infiltration mean?', 'Water moving from the ground surface into the soil'],
        ['What does runoff mean?', 'Water flowing over the land surface towards streams and rivers'],
        ['What is siltation?', 'Accumulation of sediment in a water body, which can reduce storage capacity'],
        ['What does AMD stand for in the lesson’s discussion of mining?', 'Acid mine drainage'],
        ['What is eutrophication?', 'Excessive nutrient enrichment of water that can promote excessive algal growth'],
        ['What use of dam water supplies crops?', 'Irrigation'],
        ['How is hydroelectric power generated?', 'Using the energy of moving water to generate electricity'],
        ['Give two recreational activities associated with dams.', 'Boating and leisure fishing'],
        ['Why can water remain scarce even where large storage dams exist?', 'Dams store available water but do not create rainfall or prevent all water losses'],
        ['Give two natural factors from the lesson that can limit water availability.', 'Limited or uneven rainfall and substantial evaporation'],
        ['Why can stored water be useful during a region’s drier season?', 'It can supply water between wetter periods when less rain is available'],
        ['Why can inter-basin transfers help with South Africa’s uneven water availability?', 'They move water between basins to help meet supply needs'],
        ['Name the transfer scheme mentioned under land-use effects on river flow.', 'Tugela-Vaal'],
        ['Explain how extensive roads and pavements change infiltration and runoff.', 'They reduce infiltration and generally increase surface runoff'],
        ['Link soil erosion to reduced dam storage capacity.', 'Eroded soil is carried to the dam and settles as sediment, taking up water-storage space'],
        ['Why can polluted city water be expensive to reuse?', 'It may need costly treatment before reuse'],
        ['Which industrial water pollutants are identified in the lesson?', 'Hazardous or poisonous chemicals; increased salinity, nutrients or sediments are also identified'],
        ['Explain how fertiliser runoff can lead to excessive algal growth.', 'It adds nutrients to water, promoting eutrophication'],
        ['How can water-demanding invasive alien vegetation reduce stream flow?', 'It uses more water, leaving less to reach streams'],
        ['How can dams and water-transfer infrastructure change a river?', 'They can alter the quantity or rate of flow and the movement of sediment'],
        ['Name two beneficial uses of dams other than irrigation.', 'Urban water supply, recreation, hydroelectric power or reducing flood peaks; any two'],
        ['How can creating a reservoir affect a settlement?', 'Flooded land behind the dam may force people to relocate'],
        ['Why can a dam wall affect fish populations?', 'It can obstruct migration and alter river habitats'],
        ['What does biodiversity refer to when discussing a dam’s environmental impacts?', 'The variety of living organisms in the affected area or ecosystem'],
        ['How can reduced flow below a dam affect downstream farmers?', 'Less water may be available for crop irrigation and production'],
        ['Why is it inaccurate to say a flood-control dam removes every flood risk?', 'Flood-control benefits are limited, and extreme inflows or dam failure can still cause flooding'],
        ['Give two potential effects of vegetation decomposing in a reservoir from the lesson.', 'Greenhouse-gas release and changes in water quality'],
        ['A proposed dam will supply a town but flood homes and alter river habitats. Give one benefit and two costs.', 'Benefit: urban water supply; costs: community displacement and ecosystem or biodiversity impacts']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.RiversLakesDamsTopic1 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
