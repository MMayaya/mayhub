/* Grade 10 Geography, Term 4, Topic 4: Flood Management.
 * Based on Week 4.pdf, including the flood-defence, warning-system, greenbelt,
 * floodplain and alternative-accommodation illustrations.
 * Questions are self-contained and do not require identifying an unseen image.
 * Measures reduce risk; no defence, warning or wetland guarantees complete protection.
 * Primary-source checks:
 * https://www.epa.gov/wetlands/incorporating-wetland-restoration-and-protection-planning-documents
 * https://www.weathersa.co.za/Documents/Corporate/ROADMAP_BOOKLET_FINAL_WEB_VERSION.pdf
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Flood risk management', 'Assessing the risk of flooding and taking measures to reduce its threat and effects.'],
        ['Flood risk assessment', 'Examining where flooding may occur and the harm it could cause before choosing protective measures.'],
        ['Flood defences', 'Built structures intended to hold back or control floodwater and reduce damage.'],
        ['Development policy', 'Planning rules that guide where new buildings may be placed, including restrictions in flood-prone areas.'],
        ['Floodplain', 'Low-lying land beside a river that may be covered when the river overflows.'],
        ['Flood forecasting', 'Estimating the possibility of future flooding using available weather and water information.'],
        ['Flood detection', 'Identifying signs that flooding is occurring or beginning.'],
        ['Flood monitoring', 'Repeated observation of water levels and conditions to track a developing flood.'],
        ['Flood warning', 'An alert informing people that flooding threatens or is affecting an area.'],
        ['Situation analysis', 'A team examining flood information to understand the event and decide how to respond.'],
        ['Stormwater drainage', 'A system of drains that carries rainwater runoff away from built-up areas.'],
        ['Greenbelt', 'A strip or area of protected vegetation that can encourage infiltration and reduce runoff.'],
        ['Infiltration', 'Water entering the soil from the ground surface instead of flowing over it.'],
        ['Wetland conservation', 'Protecting wetland areas so they can store extra water and slow its movement.'],
        ['Runoff', 'Water flowing over the land surface, which urban flood-management measures aim to reduce or manage.'],
        ['Low-lying land', 'Ground at a low elevation where water can collect and flood risk can be high.'],
        ['Risk awareness', 'People understanding that flooding may threaten their community and knowing the importance of warnings.'],
        ['Alternative accommodation', 'Replacement places to stay for people whose usual homes cannot be used after flooding.'],
        ['Emergency food provision', 'Arranging food supplies for people affected by a flood.'],
        ['Informal settlement', 'An area of informally developed housing where location and limited services can increase flood vulnerability.']
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
        mc('What is the main purpose of flood risk management?', 'Assessing flood risk and taking measures to reduce the threat and its effects', 'Waiting for damage without considering prevention or response', 'Increasing development in the most flood-prone locations', 'Replacing all flood information with guesses'),
        mc('Why should flood risk be assessed before protective measures are chosen?', 'The assessment helps identify the threat and the protection needed', 'It guarantees that no flood can ever happen', 'It makes monitoring and warnings unnecessary', 'It removes the need to consider where people live'),
        mc('A wall is built to help hold back floodwater from nearby buildings. Which measure is this?', 'A flood defence', 'A flood forecast', 'Alternative accommodation', 'Risk awareness alone'),
        mc('Which planning measure is recommended in the lesson for flood-prone areas?', 'Restricting new development where flooding threatens people and buildings', 'Encouraging all new housing on the most exposed floodplain', 'Replacing every wetland with buildings', 'Ignoring flood risk when approving development'),
        mc('Why does the lesson advise against development on floodplains?', 'A river may overflow onto this low-lying land', 'Floodplains are always above every surrounding hill', 'All river water must stay within its channel', 'Floodplains cannot receive water during a flood'),
        mc('A team estimates tomorrow’s flood risk using expected rain and river information. Which task is this?', 'Flood forecasting', 'Providing emergency food', 'Building replacement accommodation', 'Clearing a blocked drain'),
        mc('An observer identifies that floodwater has begun to cover normally dry land. Which task is this?', 'Flood detection', 'Restricting future building locations', 'Issuing food supplies', 'Creating a greenbelt'),
        mc('A team records water levels repeatedly as conditions change. Which task is being performed?', 'Flood monitoring', 'Housing development', 'Food distribution', 'Paving a wetland'),
        mc('What is the purpose of issuing a flood warning?', 'Informing people that flooding threatens or is affecting their area', 'Physically absorbing all floodwater', 'Increasing runoff from roads', 'Replacing every flood defence with a message'),
        mc('Why does a flood-management team analyse information about a developing flood?', 'To understand the situation and decide on a suitable response', 'To make the collected information unnecessary', 'To guarantee that all water levels stay unchanged', 'To replace every observation with an unrelated forecast'),
        mc('Why should urban stormwater drains be sufficient and kept clear?', 'They need space to carry runoff rather than let water back up', 'Litter improves the movement of water through them', 'Blocked drains always provide better flood protection', 'Drains work only when all vegetation is inside them'),
        mc('How can a greenbelt help manage flooding in an urban area?', 'It can encourage infiltration and reduce surface runoff', 'It makes all rainfall run faster over concrete', 'It eliminates every need for warnings', 'It works only by adding buildings to floodplains'),
        mc('What happens during infiltration?', 'Water soaks into the soil', 'Water flows only over tar without entering the ground', 'Residents receive alternative accommodation', 'A team sends a flood warning'),
        mc('Which wetland function supports flood management?', 'Storing extra water and slowing its flow', 'Guaranteeing that every flood is completely prevented', 'Increasing the speed of every floodwater flow', 'Replacing all temporary accommodation for victims'),
        mc('Which action in the lesson can help reduce rapid runoff in a town?', 'Maintaining vegetated greenbelts', 'Covering all remaining permeable land with concrete', 'Filling stormwater drains with litter', 'Removing wetlands to create more paved land'),
        mc('Which informal-settlement location is highlighted as high risk in the lesson?', 'Low-lying land where floodwater can collect', 'Any high area solely because it is high', 'An area identified only by the colour of its houses', 'A place assessed without considering water movement'),
        mc('What does creating flood-risk awareness aim to achieve?', 'Helping residents understand the threat and the importance of warnings', 'Persuading residents that low-lying land cannot flood', 'Replacing all flood information with rumours', 'Making forecasts and monitoring irrelevant'),
        mc('Why may flood victims need alternative accommodation?', 'Flooding may make their usual homes unsafe or unusable', 'Replacement housing stops all rain from falling', 'Temporary accommodation is a type of stormwater drain', 'It is used only to increase river runoff'),
        mc('Which basic need should be arranged alongside shelter for people affected by flooding?', 'Food supplies', 'More litter in drains', 'Extra paving on every greenbelt', 'New houses on the flooded riverbank'),
        mc('Which combination matches the lesson’s management approach for informal settlements?', 'Identify high-risk areas, forecast and monitor, warn residents and arrange support', 'Ignore the location, stop monitoring and wait for rumours', 'Rely only on paving over wetlands and blocking drains', 'Issue warnings but disregard all accommodation needs')
    ];

    const extraChoice = [
        mc('Which set contains the three broad flood-management measures described in the lesson?', 'Flood defences, warning systems and development policies', 'Only replacement housing, with no risk assessment', 'Only paved roads, with no warnings or planning', 'More floodplain housing, blocked drains and fewer wetlands'),
        mc('A town has a floodwall but no warnings or land-use controls. What is the strongest assessment?', 'The wall is one measure; it should not be treated as a guarantee of complete protection', 'The wall makes every other measure permanently unnecessary', 'All floods must now stop before entering the catchment', 'Every household is safe regardless of its location'),
        mc('Two proposed housing sites differ: one lies on a floodplain and one is outside the identified flood area. What should planning consider?', 'The assessed flood risk before deciding where development is permitted', 'Only the buildings’ paint colour', 'Only whether residents have heard the word flood', 'The assumption that all low-lying land is permanently dry'),
        mc('Which action addresses exposure to flooding rather than only announcing that a flood is possible?', 'Restricting new buildings in identified flood-prone areas', 'Reading a forecast without changing development decisions', 'Repeating a warning message without considering the building location', 'Noting a rising water level without assessing affected sites'),
        mc('Which statement about flood defences is most accurate?', 'They can reduce the threat, but do not guarantee that all flooding is prevented', 'They always stop every flood of any size', 'They replace every need for monitoring', 'They make floodplain location irrelevant'),
        mc('Which sequence best describes a rural early-warning system in the lesson?', 'Forecast risk, detect and monitor conditions, issue warnings and assess the situation', 'Provide a warning once, then stop observing conditions', 'Ignore forecasts and assess the event only through rumours', 'Build houses on the floodplain and remove all warning channels'),
        mc('A team receives one river reading and several later readings. Why are the repeated readings useful?', 'They reveal how conditions are changing over time', 'They guarantee that water levels cannot rise', 'They provide alternative accommodation automatically', 'They make communication with residents unnecessary'),
        mc('A flood warning is prepared but never reaches the threatened settlement. What part of the system has failed?', 'Communication of the warning to the people who need it', 'The ability of a greenbelt to promote infiltration', 'The supply of construction materials for a wall', 'The position of rainfall inside a weather forecast'),
        mc('What distinguishes forecasting from monitoring?', 'Forecasting estimates future risk; monitoring follows current conditions over time', 'Forecasting distributes food; monitoring approves housing', 'Both mean only clearing litter from drains', 'Monitoring always means predicting next year’s rain without observations'),
        mc('Why should a team assess flood information rather than merely collect it?', 'The information needs interpretation to guide the response', 'Collection proves that no flood threat exists', 'Analysis always replaces the need to warn residents', 'Only the colour of the information sheet matters'),
        mc('Rainwater backs up on a street because litter obstructs the drains. Which lesson measure addresses this?', 'Keeping stormwater drains clear and adequately provided', 'Adding more litter to hold water inside the road', 'Removing nearby greenbelts before inspecting the drains', 'Replacing warnings with extra paving'),
        mc('Which description best represents the greenbelt illustrated in the lesson?', 'A vegetated strip in a built-up area that can help manage runoff', 'A continuous concrete strip designed to block every form of infiltration', 'A temporary house for displaced residents', 'A message predicting the next flood'),
        mc('Why can more infiltration help reduce surface runoff?', 'Some water enters the soil instead of all flowing over the ground', 'All water must remain on the land surface', 'Infiltration means increasing the speed of water on tar', 'Infiltration sends every household a warning'),
        mc('An urban plan protects wetlands and maintains drains. Why can these measures be used together?', 'Wetlands can store and slow water while drains carry runoff away', 'Both measures work only by increasing drain blockages', 'Drains stop wetlands from ever holding water', 'Wetlands make it unnecessary to consider any urban water flow'),
        mc('Which maintenance action helps preserve the flood-management role of a stormwater drain?', 'Removing obstructing litter or vegetation from the drain', 'Placing branches across its opening', 'Filling its channel with rubbish', 'Allowing blockages to build up before every storm'),
        mc('Why should the location of an informal settlement be assessed rather than assuming every settlement has identical flood risk?', 'Low-lying position and local conditions affect the level of risk', 'All settlements are at the same height and have identical drainage', 'The number of warnings alone determines the ground elevation', 'Housing type guarantees that floods cannot occur'),
        mc('Families cannot return to flooded homes. Which lesson measure responds most directly to this housing need?', 'Providing alternative accommodation', 'Only collecting another rainfall reading', 'Adding a new greenbelt without arranging a place to stay', 'Only issuing the original warning again'),
        mc('Which pair addresses immediate basic needs after flood damage?', 'Food and shelter', 'Paint colour and road signs', 'Extra paving and blocked drains', 'Building restrictions and litter in drainage channels'),
        mc('A community meeting explains that nearby low-lying ground may flood. What is its main purpose?', 'Creating flood-risk awareness', 'Physically building a floodwall during the discussion', 'Automatically housing every affected family', 'Replacing all river monitoring with the meeting'),
        mc('Which plan combines prevention, warning and support for affected residents?', 'Limit exposed development, monitor and warn, and arrange food and accommodation', 'Only provide food after damage and ignore risk before the event', 'Only make a forecast and disregard warnings and shelter', 'Only build on the floodplain and rely on the houses to stop runoff')
    ];

    const trueFalseFacts = [
        ['Flood risk management combines assessment with measures to reduce the threat.', true, 'It is more than waiting for damage to occur.'],
        ['Building a flood defence guarantees that no flood can ever affect the area.', false, 'Defences reduce risk but do not guarantee complete protection.'],
        ['Development policies can reduce new building in flood-prone areas.', true, 'The lesson recommends avoiding development on floodplains.'],
        ['A floodplain is land beside a river that cannot be covered by overflowing water.', false, 'Floodplains can be inundated when a river overflows.'],
        ['A rural early-warning system should forecast risk and detect and monitor flooding.', true, 'These are tasks in the lesson’s rural management framework.'],
        ['Flood forecasting: giving food to victims after their homes have flooded.', false, 'Forecasting estimates future flood risk; food provision is relief support.'],
        ['Monitoring uses repeated observations to track changing conditions.', true, 'Repeated readings help a team follow the developing flood.'],
        ['A warning is useful to residents even if it is never communicated to them.', false, 'The alert needs to reach the people threatened by the flood.'],
        ['A management team analyses flood information to assess the situation.', true, 'Analysis helps it understand the threat and guide a response.'],
        ['Litter and vegetation blockages improve the capacity of stormwater drains.', false, 'Blockages obstruct water flow; the drains should be kept clear.'],
        ['Urban greenbelts can encourage infiltration and reduce runoff.', true, 'Vegetated, permeable ground can let water enter the soil.'],
        ['Infiltration: water flowing over concrete without entering the ground.', false, 'That is surface runoff; infiltration means water entering the soil.'],
        ['Maintained wetlands can store extra water and slow its movement.', true, 'These functions can help manage floodwater.'],
        ['Wetlands make it unnecessary to provide warnings, drainage or support for flood victims.', false, 'Wetlands are one part of a wider set of management measures.'],
        ['Food and shelter are basic needs to plan for when people are affected by floods.', true, 'The lesson includes support as well as measures that reduce risk.'],
        ['Informal settlements on low-lying land should be assumed to have no flood risk.', false, 'The lesson identifies low-lying locations as potential high-risk areas.'],
        ['Alternative accommodation may be needed when flood damage makes homes unusable.', true, 'Affected people need another place to stay.'],
        ['Risk awareness is the same task as physically clearing a blocked stormwater drain.', false, 'Awareness improves understanding; drain clearance removes an obstruction.'],
        ['Warning residents is included in both urban and informal-settlement flood management.', true, 'Communication is important across different settlement settings.'],
        ['Flood monitoring and forecasting replace every need for practical protection and relief.', false, 'Information should support warnings, protective measures and help for affected people.']
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
        ['Floodwall', 'A vertical protective barrier built to help hold back floodwater'],
        ['Land-use planning', 'Deciding which areas should be used for buildings or kept free of exposed development'],
        ['Risk-reduction measure', 'An action, such as a defence or warning system, intended to lessen a flood threat'],
        ['Riverbank', 'The side of a river channel that water may overtop during high flow'],
        ['Flood-prone area', 'A location identified as liable to be affected by flooding'],
        ['Weather forecast', 'Information about expected weather, such as rainfall, that can support a flood forecast'],
        ['Water-level reading', 'A measurement of how high the water is at a particular time'],
        ['Early-warning system', 'Linked forecasting, observation, assessment and alerting to inform people about flood danger'],
        ['Assessment team', 'People responsible for examining flood information and evaluating the situation'],
        ['Warning communication', 'Delivering a flood alert to residents who need to receive it'],
        ['Drain blockage', 'An obstruction such as litter or branches that restricts runoff passing through a drain'],
        ['Permeable ground', 'Land through which rainfall can enter the soil'],
        ['Water storage', 'Temporary holding of extra water, one flood-management function of wetlands'],
        ['Slower flow', 'Reduced water movement speed, an effect supported by wetland vegetation'],
        ['Drain maintenance', 'Keeping drainage openings and channels clear so they can carry stormwater'],
        ['Emergency shelter', 'Protected space arranged for people displaced by flood damage'],
        ['Flood victim', 'A person whose life, home or livelihood has been affected by a flood'],
        ['Residents', 'People living in the community that needs flood information and warnings'],
        ['Housing damage', 'Flood destruction that can make a home unsafe or unusable'],
        ['Relief planning', 'Organising assistance such as food and places to stay for affected people']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 3, 5, 7, 9, 10, 11, 13, 15, 18, 22, 25, 32, 39];
    const hints = [
        'Think about assessment followed by action, rather than waiting for damage.',
        'The measures should respond to the threat identified by the assessment.',
        'The location of new buildings affects their exposure to flooding.',
        'This task estimates what may happen next.',
        'Compare a single observation with readings collected repeatedly.',
        'Data needs interpretation before the team can decide what to do.',
        'Water needs open space through which to pass.',
        'Think about what vegetated ground allows rainwater to do.',
        'Wetlands can hold extra water and reduce its speed.',
        'Consider the elevation of the land and where water may collect.',
        'The lesson pairs this basic need with shelter.',
        'Compare the assessed exposure of the two proposed building sites.',
        'Look for a sequence that joins forecasting, observations, warnings and assessment.',
        'Water entering the soil is no longer all flowing over the surface.',
        'A complete plan needs action before a flood and support for people affected by it.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What two broad steps make up flood risk management?', 'Assess the risk and take measures to reduce the threat and its effects'],
        ['Name the three broad flood-management measures introduced in the lesson.', 'Flood defences, flood warning systems and development policies'],
        ['Why is risk assessment useful before protective action is chosen?', 'It identifies the possible threat and helps select suitable measures'],
        ['What is the role of a built flood defence?', 'To help hold back or control floodwater and reduce damage'],
        ['A protective wall is built between water and nearby buildings. Identify the management measure.', 'A floodwall or flood defence'],
        ['How can development policies help reduce flood exposure?', 'They can restrict new buildings in flood-prone areas'],
        ['Why does the lesson recommend avoiding development on floodplains?', 'A river can overflow onto the low-lying land beside its channel'],
        ['What is a floodplain?', 'Low-lying land beside a river that can be covered when the river overflows'],
        ['Does a floodwall guarantee complete protection from every flood? Explain.', 'No; it can reduce the threat but is not a guarantee against all flooding'],
        ['Give one physical measure and one planning measure for managing flood risk.', 'A flood defence such as a wall, and restrictions on development in flood-prone areas'],
        ['What does flood forecasting estimate?', 'The possibility of future flooding or future flood risk'],
        ['What is flood detection?', 'Identifying that flooding is beginning or occurring'],
        ['What is flood monitoring?', 'Repeated observation of water levels and conditions as they change'],
        ['How is monitoring different from forecasting?', 'Monitoring follows current conditions; forecasting estimates future risk'],
        ['Why are repeated water-level readings useful?', 'They show how water levels and flood conditions are changing over time'],
        ['What is the purpose of a flood warning?', 'To alert people that flooding threatens or is affecting their area'],
        ['Why must warnings reach the people living in a threatened area?', 'Residents need the information in order to understand the threat and respond'],
        ['What is the role of the team that analyses a developing flood?', 'To interpret information, assess the situation and guide a response'],
        ['Name four linked tasks of the rural early-warning system in the lesson.', 'Forecast flood risk, detect flooding, monitor flooding and issue warnings; situation assessment is also part of the system'],
        ['A forecast is prepared but no alert reaches the village. Which part of the early-warning process is missing?', 'Communication of a warning to the threatened residents'],
        ['Why should urban stormwater drains be kept clear of litter and obstructing vegetation?', 'Blockages restrict the flow of runoff and can cause water to back up'],
        ['What urban problem can result when stormwater drains are insufficient or blocked?', 'Runoff may not drain away effectively and can accumulate or flood the area'],
        ['What is a greenbelt?', 'A vegetated strip or area that can encourage infiltration and reduce runoff'],
        ['How does infiltration differ from runoff?', 'Infiltration is water entering soil; runoff is water flowing over the surface'],
        ['Why can keeping vegetated ground help reduce rapid runoff?', 'It allows some rainfall to enter the soil and can slow surface water movement'],
        ['Give two wetland functions that can help manage floodwater.', 'Storing extra water and slowing its flow'],
        ['Why should a town maintain wetlands instead of filling them with paving?', 'Maintained wetlands retain water-storage and flow-slowing functions'],
        ['How can wetlands and clear drains support the same urban flood-management plan?', 'Wetlands can store and slow water while drains carry runoff away'],
        ['Name two urban measures from the lesson besides warning residents.', 'Avoid floodplain development, maintain clear drains, create greenbelts or protect wetlands; any two'],
        ['Rainwater backs up behind litter in a street drain. Identify a relevant maintenance response.', 'Remove the obstructing litter and keep the stormwater drain clear'],
        ['Which informal-settlement locations are highlighted as high risk?', 'Low-lying areas where floodwater can collect'],
        ['Why should the location of a settlement be considered when assessing its flood risk?', 'Elevation, exposure and local water conditions affect how likely it is to flood'],
        ['Name three information-related measures for informal settlements from the lesson.', 'Forecast risk, detect flooding, monitor conditions, issue warnings or raise awareness; any three'],
        ['What does creating flood-risk awareness help residents understand?', 'The threat of flooding and the importance of information and warnings'],
        ['Why can alternative accommodation be necessary after a flood?', 'Homes may become unsafe or unusable, leaving people needing another place to stay'],
        ['Name two basic needs that should be secured for flood victims.', 'Food and shelter'],
        ['A family’s home is damaged and cannot be occupied. Which support measure responds to its housing need?', 'Alternative accommodation or emergency shelter'],
        ['A flood-awareness meeting and a flood warning are related but different. Explain.', 'The meeting builds understanding of risk; the warning alerts residents to a specific flood threat'],
        ['Does providing accommodation for victims replace the need for warnings and risk reduction? Explain.', 'No; support after damage should accompany measures that reduce risk and alert residents'],
        ['Outline a combined plan that reduces exposure, provides information and supports flood victims.', 'Restrict exposed development; forecast, monitor and warn; arrange food, shelter or alternative accommodation']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.FloodManagementTopic4 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
