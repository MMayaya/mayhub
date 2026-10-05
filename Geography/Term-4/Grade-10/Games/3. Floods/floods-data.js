/* Grade 10 Geography, Term 4, Topic 3: Floods (Causes and Characteristics).
 * Based on Week 3.pdf, including its forested/cleared hillside comparison.
 * Photograph prompts are expressed as self-contained situations, not image guesses.
 * Accuracy: malaria is mosquito-borne, not water-borne; a tsunami is not a storm surge.
 * Avoid an unsupported universal ranking of flood deaths against other weather hazards.
 * Checked against primary sources:
 * https://www.weather.gov/mrx/flood_and_flash?lv=true
 * https://www.who.int/health-topics/floods
 * https://www.noaa.gov/explainers/science-behind-tsunamis
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Flood', 'Water covering normally dry land, for example when a river overflows its banks.'],
        ['Flash flood', 'Flooding that develops very quickly, often after intense rain or a sudden release of water.'],
        ['Snowmelt', 'The melting of snow, which can add large amounts of water to rivers when it happens rapidly.'],
        ['Coastal flooding', 'Seawater covering normally dry, low-lying land near the coast.'],
        ['Storm surge', 'An abnormal rise in sea level caused by a storm, which can flood coastal land.'],
        ['Deforestation', 'Removal of forest cover, which can leave soil exposed and increase runoff and erosion.'],
        ['Poor farming practices', 'Unsuitable agricultural methods that damage vegetation or soil and can increase runoff.'],
        ['Dam failure', 'The collapse or breach of a dam, allowing stored water to escape suddenly.'],
        ['Rapid dam release', 'Letting stored dam water out too quickly, potentially flooding areas downstream.'],
        ['Urbanisation', 'Growth of towns and cities, often adding roofs and paved surfaces that increase runoff.'],
        ['Surface runoff', 'Water flowing over the land surface instead of soaking into the soil.'],
        ['Infiltration', 'The process of water entering the soil from the ground surface.'],
        ['Impermeable surface', 'A surface such as concrete or tar through which water cannot readily soak.'],
        ['Debris blockage', 'Accumulated material such as branches obstructing water flow, for example at a bridge.'],
        ['Sedimentation', 'The settling and build-up of eroded material in a river channel or dam.'],
        ['Infrastructure damage', 'Destruction or weakening of facilities such as roads, bridges and buildings.'],
        ['Agricultural losses', 'Flood damage to crops, farmland or farming resources.'],
        ['Business disruption', 'Interruption of trading and work when flooding damages premises or cuts access.'],
        ['Displacement', 'People being forced to leave their homes because flooding makes them unsafe or unusable.'],
        ['Water-borne disease', 'An illness spread through contaminated water, such as cholera.']
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
        mc('When does river water spill onto the land beside its channel?', 'When the channel cannot contain the amount of water flowing through it', 'Only when the river has stopped flowing completely', 'Whenever the channel has less water than usual', 'Only when all rainfall in the catchment has ended'),
        mc('A violent downpour causes water to rush through streets within a short time. What type of flood is this?', 'A flash flood', 'A gradual fall in river level', 'A period of normal infiltration', 'A seasonal drought'),
        mc('How can rapidly melting snow cause a flood?', 'It adds water to rivers faster than the channels may be able to carry it', 'It removes every source of river water', 'It turns the riverbed into an impermeable roof', 'It blocks all water from entering rivers'),
        mc('Which combination increases flooding risk on low-lying coastal land?', 'Strong onshore winds together with a high tide', 'Offshore winds together with a low tide', 'Low river levels and dry weather inland', 'Reduced seawater levels along the coast'),
        mc('Which description identifies a storm surge?', 'A storm-driven rise in sea level that can flood the coast', 'All water that soaks into soil during a storm', 'A rise in river water caused only by snowmelt', 'The gradual settling of silt in a dam'),
        mc('Why can clearing a forest increase flooding risk?', 'It can reduce infiltration and increase rapid runoff and soil erosion', 'It guarantees that all rain soaks into the soil', 'It adds tree roots that stabilise exposed slopes', 'It stops any eroded soil from reaching rivers'),
        mc('Which farming situation can increase runoff and erosion?', 'Overgrazing that leaves soil with little protective vegetation', 'Healthy plant cover protecting the soil', 'Tree roots stabilising the hillside', 'Vegetation slowing the movement of surface water'),
        mc('A poorly constructed dam collapses. Why can areas below it flood?', 'Stored water escapes suddenly and travels downstream', 'The collapse removes all water from the catchment', 'The broken wall instantly absorbs the reservoir', 'All downstream channels become deeper automatically'),
        mc('What can happen if a dam releases water too quickly?', 'Downstream channels may receive more water than they can contain', 'Water automatically remains inside the reservoir', 'Flooding becomes impossible below the dam', 'The released water flows only uphill'),
        mc('How can urbanisation increase flooding risk during heavy rain?', 'More roofs and paved surfaces can reduce infiltration and increase runoff', 'Concrete usually absorbs more water than soil with plant cover', 'More roads prevent all rain from reaching channels', 'Urban growth removes every impermeable surface'),
        mc('Which situation is an example of surface runoff?', 'Rainwater moving over a hillside towards a river', 'Water soaking down into the soil', 'Stored snow remaining frozen on a mountain', 'A river losing water only through evaporation'),
        mc('Water enters the soil instead of flowing over it. Which process is taking place?', 'Infiltration', 'Sedimentation', 'Storm surge', 'Dam failure'),
        mc('Which surface is least likely to let rainfall soak into the ground beneath it?', 'A concrete parking area', 'Unpaved soil with healthy plant cover', 'A grass-covered slope', 'An exposed patch of permeable soil'),
        mc('Branches collect against a bridge and obstruct a river. What may happen?', 'Water can back up and overflow its banks', 'The bridge automatically absorbs the river water', 'All upstream runoff stops being produced', 'The obstruction always enlarges the channel'),
        mc('How can eroded silt deposited in a river channel increase flood risk?', 'It can reduce the space available for carrying water', 'It guarantees that the river cannot overflow', 'It turns every paved surface into soil', 'It stops heavy rain from falling in the catchment'),
        mc('A flood washes away a road and damages a bridge. Which impact does this illustrate?', 'Infrastructure damage', 'Increased infiltration', 'A storm surge forming offshore', 'The removal of all agricultural losses'),
        mc('Which example is an agricultural impact of flooding?', 'Crops are destroyed and farmland is covered with silt', 'A shop cannot open because its entrance is underwater', 'A bridge becomes unsafe for traffic', 'A family leaves an unsafe home'),
        mc('A shop loses stock and cannot trade after a flood. Which impact is shown?', 'Business disruption', 'Rapid snowmelt', 'Reduced runoff', 'Debris accumulation before the rain'),
        mc('Families must leave homes made unsafe by flooding. What is this called?', 'Displacement', 'Infiltration', 'Urbanisation', 'Sedimentation'),
        mc('Why can the risk of water-borne disease rise after a flood?', 'Floodwater can contaminate water supplies and disrupt sanitation', 'Floodwater always makes drinking water safe', 'All diseases following floods are spread only by wind', 'Damage to sanitation cannot affect water quality')
    ];

    const extraChoice = [
        mc('Why can several days of heavy rainfall lead to a river flood?', 'Continuing rainfall adds water until river capacity may be exceeded', 'Each day of rain automatically lowers the river level', 'Rainfall keeps all water permanently inside the soil', 'A river cannot receive water from its surrounding catchment'),
        mc('What is a key characteristic of a flash flood?', 'Its rapid onset, sometimes within minutes or a few hours', 'It must take several years to develop', 'It occurs only after seawater rises at high tide', 'It always requires snow to melt first'),
        mc('A low-lying coastal settlement is flooded by waves after a sudden displacement of seawater. Which event is described?', 'A tsunami', 'Infiltration', 'Urbanisation', 'Sedimentation'),
        mc('Which distinction between a storm surge and a tsunami is correct?', 'A storm surge is storm-driven; a tsunami involves waves from sudden water displacement', 'A tsunami is simply another name for any high tide', 'All storm surges are caused by failing inland dams', 'A storm surge occurs only when a river loses water'),
        mc('Which pair contains only physical causes of flooding?', 'Prolonged heavy rainfall and rapid snowmelt', 'Deforestation and overgrazing', 'Urbanisation and poorly constructed dams', 'Rapid dam release and paving a hillside'),
        mc('Why can the removal of tree roots make a hillside more vulnerable?', 'The soil loses support and can erode more easily', 'The slope gains a stronger root network', 'All exposed soil becomes impermeable concrete', 'The river automatically carries less water'),
        mc('Two slopes receive similar rainfall. One has forest cover; the other is cleared and overgrazed. Which is generally more likely to produce rapid runoff?', 'The cleared and overgrazed slope', 'The forested slope solely because it has more roots', 'Both must have no runoff at all', 'The slope with the least rainfall, regardless of land cover'),
        mc('Which situation shows a human influence on flooding rather than a natural input of extra water?', 'A dam operator releasing stored water too rapidly', 'Snow melting rapidly during a warm spell', 'High rainfall continuing for several days', 'Strong onshore winds pushing seawater towards land'),
        mc('Why can densely built settlements add to flooding pressure during rain?', 'Paved surfaces and roofs send more rainfall into runoff', 'Population growth automatically improves soil infiltration', 'Buildings prevent water from entering every river', 'All urban roofs allow rain to pass straight into soil'),
        mc('Which chain best links poor farming practices to river flooding?', 'Loss of plant cover: more erosion: sediment build-up: reduced channel capacity', 'Loss of plant cover: no erosion: deeper channels: guaranteed flood prevention', 'More overgrazing: more tree roots: less exposed soil: no runoff', 'Bare soil: no rainfall: more infiltration: permanently empty rivers'),
        mc('Water collects on a tarred road during a storm. Why is rapid runoff likely?', 'The tar surface does not readily let the water soak through', 'Tar always stores all rain below the road', 'The road absorbs water faster than all surrounding soil', 'Rainwater on tar cannot move into drains or rivers'),
        mc('After vegetation removal, more rain flows over a slope rather than entering the soil. Which two processes have changed?', 'Surface runoff has increased and infiltration has decreased', 'Surface runoff has decreased and infiltration has increased', 'Both runoff and infiltration have stopped permanently', 'Sedimentation has turned into a high tide'),
        mc('A river is blocked at a bridge. Where can backed-up water first accumulate?', 'Upstream of the obstruction', 'Only in the sea, regardless of the river location', 'Only on a mountain above every water source', 'Inside roofs far outside the catchment'),
        mc('What does downstream mean in a river system?', 'In the direction in which the river water flows', 'Towards the river source against the flow', 'Straight upwards from the riverbed', 'Only beyond the coastline, never along the river'),
        mc('A channel is partly filled with deposited soil. What is the likely effect during the next high flow?', 'Less channel space can make overflow more likely', 'Deposition guarantees unlimited channel capacity', 'All surface runoff must become snowmelt', 'The river banks can no longer be overtopped'),
        mc('Why can a damaged road make a flood’s effects worse for a community?', 'It can interrupt travel, access and the movement of goods', 'It always improves access to homes and shops', 'It guarantees that flooded farms recover immediately', 'It removes the need for any transport'),
        mc('Floodwater removes fertile topsoil from a farm. Which loss does this represent?', 'Soil erosion affecting farming resources', 'The creation of new protective tree roots', 'A guaranteed increase in every crop yield', 'A reduction in all flood-related costs'),
        mc('Which statement best explains the economic cost of flooding?', 'Damage to property, farms and businesses can create repair costs and lost income', 'Only the river changes; people and buildings cannot be affected', 'Floods affect health but never livelihoods', 'Every damaged business automatically earns more income'),
        mc('Which statement correctly distinguishes two diseases associated with flood conditions?', 'Cholera can spread through contaminated water; malaria is mosquito-borne', 'Both malaria and cholera are spread only by drinking floodwater', 'Malaria is a type of soil erosion and cholera is a tidal event', 'Cholera is caused by concrete surfaces and malaria by bridge damage'),
        mc('Does every flood automatically cause an outbreak of cholera or malaria?', 'No; disease risk depends on local conditions, contamination and mosquito exposure', 'Yes; both diseases must occur after every flood everywhere', 'Yes; every flood makes all water carry malaria', 'No; floods can never be associated with any disease risk')
    ];

    const trueFalseFacts = [
        ['River flooding can occur when a channel cannot contain the water flowing through it.', true, 'The water may overflow the banks onto adjacent land.'],
        ['A flash flood must develop slowly over several months.', false, 'Flash floods develop quickly, often within minutes or hours.'],
        ['Heavy rainfall over several days can raise river levels and cause flooding.', true, 'Continuing rainfall can add more water than a channel can carry.'],
        ['Rapid snowmelt always reduces the amount of water entering a river.', false, 'Melting snow adds water and can increase river flow.'],
        ['Onshore winds and a high tide can contribute to flooding on low-lying coastal land.', true, 'They can push seawater onto normally dry coastal areas.'],
        ['A tsunami and a storm surge are exactly the same event.', false, 'A storm surge is storm-driven; tsunami waves result from sudden water displacement.'],
        ['Deforestation can increase runoff and soil erosion.', true, 'The removal of protective vegetation and roots can leave soil exposed.'],
        ['Overgrazing always increases protective vegetation and reduces erosion.', false, 'Overgrazing can remove cover, exposing soil to runoff and erosion.'],
        ['Dam failure can suddenly release stored water downstream.', true, 'A breach or collapse can allow a large volume of water to escape.'],
        ['Releasing dam water too quickly cannot affect places downstream.', false, 'A rapid release can exceed downstream channel capacity and cause flooding.'],
        ['Roofs, tar and concrete can increase runoff by limiting infiltration.', true, 'Water cannot readily soak through these surfaces into the soil below.'],
        ['Infiltration: water flowing over the land surface without entering the soil.', false, 'That describes surface runoff; infiltration is water entering the soil.'],
        ['Debris trapped at a bridge can obstruct flow and cause water to back up.', true, 'Accumulated material can reduce the open space through which water flows.'],
        ['Sediment filling part of a river channel always increases its water-carrying space.', false, 'Sediment build-up can reduce the space available and raise overflow risk.'],
        ['Floods can damage roads, farmland, homes and businesses.', true, 'The lesson describes physical damage and disruption to lives and livelihoods.'],
        ['A flooded shop losing stock is an example of increased infiltration.', false, 'It is an example of business damage and economic loss.'],
        ['Flood contamination of water supplies can increase the risk of cholera.', true, 'Cholera is associated with contaminated water or food and inadequate sanitation.'],
        ['Malaria is a water-borne disease contracted simply by drinking floodwater.', false, 'Malaria is mosquito-borne; flood conditions can sometimes create breeding sites.'],
        ['A cleared hillside can send eroded soil into rivers and dams.', true, 'Deposited silt can reduce storage or channel space and contribute to flooding.'],
        ['Every flood causes exactly the same damage and disease outbreaks everywhere.', false, 'Impacts depend on the event and local conditions; outbreaks are not automatic.']
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
        ['Prolonged rainfall', 'Heavy rain continuing for days and adding water to the river system'],
        ['Intense rainfall', 'A large amount of rain falling in a short time, often linked to flash flooding'],
        ['Onshore wind', 'Wind blowing from the sea towards the land, which can push coastal water inland'],
        ['High tide', 'The higher stage of the sea’s regular tidal cycle, which can worsen coastal flooding'],
        ['Tsunami', 'A series of waves caused by sudden water displacement, which can flood coastal land'],
        ['Exposed soil', 'Ground left without protective vegetation after clearing or poor land use'],
        ['Overgrazing', 'Excessive grazing that reduces plant cover and exposes soil to erosion'],
        ['Tree roots', 'The parts of trees that help stabilise soil on a forested hillside'],
        ['Roofing materials', 'Building coverings that shed rainfall rather than let it enter the soil directly'],
        ['Concrete paving', 'A built ground covering that restricts infiltration and promotes runoff'],
        ['Upstream', 'Towards the source of a river, opposite to its direction of flow'],
        ['Downstream', 'In the direction of river flow, including areas receiving released dam water'],
        ['Bridge obstruction', 'A restricted river crossing where trapped debris can make water back up'],
        ['Channel capacity', 'The amount of water a river channel can contain before it overflows'],
        ['Bank overflow', 'River water spilling beyond the sides of its channel onto neighbouring land'],
        ['Cholera', 'An example of a disease spread through contaminated food or water'],
        ['Malaria', 'A mosquito-borne disease whose risk can rise where floods leave mosquito-breeding pools'],
        ['Physical injury', 'Bodily harm that people can suffer during a flood'],
        ['Water contamination', 'Pollution of a water supply, which can increase illness risk after flooding'],
        ['Loss of life', 'Deaths resulting from a serious flood, including drowning']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 2, 3, 5, 7, 9, 10, 11, 13, 14, 24, 29, 36, 38];
    const hints = [
        'Compare the amount of flowing water with the space available in the channel.',
        'Focus on how quickly the flooding begins after the downpour.',
        'Snow becomes liquid water as it melts.',
        'Look for conditions that push seawater towards already low-lying land.',
        'Think about what happens when protective cover and tree roots are removed.',
        'The reservoir contains water that may escape when its wall breaks.',
        'Roofs and paving change what happens to rain reaching a settlement.',
        'The water is moving across the ground, not into it.',
        'This process takes rainfall below the ground surface.',
        'An obstruction leaves less room for the river water to pass.',
        'Deposited material takes up space inside the channel.',
        'Look for two natural sources of extra water rather than changes made by people.',
        'Follow the eroded soil from the bare hillside into the river channel.',
        'Look for damage to the soil resource used by farming.',
        'Do not confuse contamination of drinking water with transmission by mosquitoes.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What happens when a river’s water volume exceeds its channel capacity?', 'Water can overflow the banks and cover adjacent land'],
        ['What is the main timing feature of a flash flood?', 'It begins very quickly, often within minutes or hours'],
        ['How can several days of heavy rainfall lead to flooding?', 'Continuing rainfall raises river flow until channel capacity may be exceeded'],
        ['How can rapidly melting snow add to flood risk?', 'It quickly adds water to rivers and can overwhelm their capacity'],
        ['Name two conditions that can contribute to flooding on low-lying coastal land.', 'Strong onshore winds, a high tide, a storm surge or a tsunami; any two'],
        ['What is a storm surge?', 'A storm-driven abnormal rise in sea level that can flood coastal areas'],
        ['Is a tsunami simply another name for a storm surge? Explain.', 'No; tsunami waves arise from sudden water displacement, whereas storm surge is storm-driven'],
        ['What direction does an onshore wind blow?', 'From the sea towards the land'],
        ['How can a high tide make coastal flooding worse during strong onshore winds?', 'The sea level is already higher, so water can reach farther onto low-lying land'],
        ['A downpour is followed almost immediately by rushing floodwater. Identify the flood type.', 'A flash flood'],
        ['Give two human influences on flooding from the lesson.', 'Deforestation, poor farming, urbanisation, dam failure or rapid dam release; any two'],
        ['Explain the runoff effect of removing forest cover.', 'Rainwater can enter the soil less readily and flow more rapidly over exposed ground'],
        ['How can overgrazing contribute to a flood?', 'It reduces plant cover, increasing soil erosion and runoff'],
        ['What role do tree roots play on a forested hillside?', 'They stabilise soil and help limit erosion'],
        ['Why can a poorly constructed dam become a flood hazard?', 'It may fail and release stored water suddenly downstream'],
        ['Why can releasing dam water too quickly flood communities below the dam?', 'The release may exceed the downstream channel’s ability to carry the water'],
        ['Name two urban surfaces that limit infiltration.', 'Tar, concrete or roofing materials; any two'],
        ['Why can the growth of paved urban areas increase runoff?', 'More rainfall runs off surfaces that water cannot readily soak through'],
        ['Compare runoff from a forested slope with runoff from a cleared, overgrazed slope under similar rain.', 'The cleared slope generally produces faster or greater runoff because less protective cover and infiltration remain'],
        ['How can eroded soil from a cleared hillside affect a river downstream?', 'It can settle as silt, reduce channel space and make overflowing more likely'],
        ['What is infiltration?', 'Water entering the soil from the land surface'],
        ['What is surface runoff?', 'Water flowing over the ground rather than soaking into the soil'],
        ['What does impermeable mean when describing a paved surface?', 'Water cannot readily pass through it into the ground beneath'],
        ['Branches are trapped at a bridge. Explain one possible effect on the river.', 'The debris obstructs flow, making water back up and possibly overflow'],
        ['Which side of a bridge blockage can collect backed-up water: upstream or downstream?', 'Upstream of the obstruction'],
        ['What does downstream mean?', 'In the direction in which the river water flows'],
        ['How can sedimentation reduce a channel’s capacity?', 'Deposited material occupies space that would otherwise carry water'],
        ['Trace the link between bare soil, erosion and increased flood risk.', 'Runoff erodes exposed soil; the sediment enters channels and can reduce their carrying capacity'],
        ['Why does concrete paving often produce more runoff than vegetated, permeable ground?', 'It restricts infiltration, so more rainfall remains on the surface'],
        ['Can a sudden dam failure cause flooding even without rain at the affected place? Explain.', 'Yes; stored water can be released and flood areas downstream'],
        ['Name two types of infrastructure that floods can damage.', 'Roads, bridges, buildings or other built facilities; any two'],
        ['Give two agricultural losses that a flood can cause.', 'Crop destruction, damaged farmland, eroded topsoil or loss of farming resources; any two'],
        ['A shop loses its stock and closes after flooding. What kind of impact is this?', 'Business disruption or economic loss'],
        ['What is flood-related displacement?', 'People being forced to leave homes that flooding has made unsafe or unusable'],
        ['Explain one way damaged roads can disrupt livelihoods after a flood.', 'They can interrupt travel, access to work or shops, and the movement of goods'],
        ['Why can water-borne disease risk rise after a flood?', 'Floodwater can contaminate supplies and damage sanitation systems'],
        ['Name the water-borne disease given as an example in the lesson.', 'Cholera'],
        ['Why should malaria not be described as water-borne?', 'It is transmitted by mosquitoes rather than by simply drinking contaminated floodwater'],
        ['How can flood conditions sometimes increase malaria risk?', 'Remaining pools can provide mosquito-breeding sites where malaria transmission is possible'],
        ['Give one human impact and one economic impact of flooding.', 'A human impact such as injury, death or displacement, and an economic impact such as damaged crops, property or business income']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.FloodsTopic3 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
