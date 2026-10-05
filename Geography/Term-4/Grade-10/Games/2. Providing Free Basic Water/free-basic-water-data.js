/* Grade 10 Geography, Term 4, Topic 2: Providing Free Basic Water.
 * Based on the supplied lesson, including its treatment-plant and restoration photographs.
 * Questions do not require viewing the original PDF or identifying an unlabelled photograph.
 * Accuracy: 6 kl is a basic monthly household reference, not unlimited free water for everyone.
 * Water boards can supply treated bulk water; Rand Water is not a municipality.
 * Avoid obsolete board counts, customer totals, project rankings and construction predictions.
 * Checked against official sources:
 * https://www.gov.za/faq/government-services/how-do-i-access-free-basic-municipal-services
 * https://www.gov.za/documents/constitution/chapter-2-bill-rights
 * https://www.gov.za/about-sa/water-affairs
 * https://www.lhda.org.ls/projectphases/phaseii
 * https://www.dws.gov.za/iwrp/Vaal/default.aspx
 * https://www.dws.gov.za/iwrp/rs_wc_wss/sa.aspx
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Free Basic Water', 'A basic water allocation provided at no charge to eligible households under municipal support arrangements.'],
        ['Water infrastructure', 'Physical systems such as dams, pipes and treatment plants needed to supply water.'],
        ['Rural dispersion', 'The spread of small rural communities over large distances, making water-service delivery difficult.'],
        ['Urbanisation', 'Growth in the proportion of people living in urban areas, which can increase demand for water services.'],
        ['Sanitation', 'Systems and practices for safely managing human waste and protecting water supplies from contamination.'],
        ['Orange River Project', 'A scheme using Orange River water and dams such as Gariep and Vanderkloof for water supply, irrigation and hydropower.'],
        ['Lesotho Highlands Water Project', 'A dams-and-tunnels project that transfers water from Lesotho towards Gauteng and generates hydropower in Lesotho.'],
        ['Berg River Scheme', 'A Western Cape storage-and-transfer scheme associated with supplying water for Cape Town’s urban and industrial use.'],
        ['Tugela-Vaal Scheme', 'A scheme transferring water from the Tugela towards the Vaal system across the Drakensberg.'],
        ['Inter-basin transfer', 'Moving water from one river basin to another through infrastructure such as tunnels and canals.'],
        ['National government', 'The level of government that develops national water policies and plans major water-resource projects.'],
        ['Water boards', 'Organisations that provide bulk water services, including treatment and supply to municipalities.'],
        ['Municipality', 'A local authority responsible for ensuring water and sanitation services for its community.'],
        ['Water purification', 'Treating water to remove impurities and make it suitable for its intended use.'],
        ['Wastewater treatment', 'Treating used water, including sewage, to reduce contamination before appropriate reuse or release.'],
        ['Sustainable water use', 'Using water in ways that protect its long-term availability and quality.'],
        ['Water reuse', 'Using water again for a suitable purpose after any treatment required for that purpose.'],
        ['Pollution prevention', 'Keeping harmful waste and chemicals out of water supplies.'],
        ['Wetland restoration', 'Repairing degraded wetland areas so they can regain functions such as water storage and habitat support.'],
        ['Alien vegetation removal', 'Clearing invasive, water-demanding introduced plants to help protect water availability.']
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
        mc('A basic monthly household water allocation is expressed as 6 kilolitres. How many litres is this?', '6 000 litres', '600 litres', '60 litres', '60 000 litres'),
        mc('Why can supplying water to scattered rural communities be difficult?', 'Small settlements are far apart, making them harder to connect and reach', 'All rural communities are concentrated beside one treatment plant', 'Distance has no effect on the infrastructure needed', 'Rural households do not need water services'),
        mc('How can rapid urban growth strain water services?', 'Demand can grow faster than supply and sanitation infrastructure', 'It automatically reduces the number of people needing water', 'It removes the need for sewage treatment', 'It guarantees unlimited water without new infrastructure'),
        mc('Which sanitation problem can damage a community’s water supply?', 'Untreated sewage entering water sources', 'Safe treatment of wastewater before release', 'Protection of drinking-water pipes from contamination', 'Proper management of human waste'),
        mc('Why can implementing Free Basic Water be expensive and time-consuming?', 'Water infrastructure and services must be built, operated and maintained', 'Declaring a policy instantly creates all the required pipes and treatment plants', 'Free water never needs treatment or distribution', 'Every household is already beside the same water source'),
        mc('Which scheme uses Gariep and Vanderkloof dams on the Orange River?', 'The Orange River Project', 'The Lesotho Highlands Water Project', 'The Berg River Scheme', 'The Tugela-Vaal Scheme'),
        mc('Which project transfers water from Lesotho towards Gauteng?', 'The Lesotho Highlands Water Project', 'The Berg River Scheme', 'The Orange River Project’s Eastern Cape transfer', 'A wastewater-treatment plant in Cape Town'),
        mc('Which scheme in the lesson supports Cape Town’s urban and industrial water supply?', 'The Berg River Scheme', 'The Tugela-Vaal Scheme', 'The Lesotho Highlands Water Project', 'The Orange River Project’s Eastern Cape transfer'),
        mc('Which scheme transfers water from the Tugela towards the Vaal system across the Drakensberg?', 'The Tugela-Vaal Scheme', 'The Berg River Scheme', 'The Orange River Project', 'The Lesotho Highlands Water Project'),
        mc('What is the main feature of an inter-basin transfer?', 'Water is moved between different river basins', 'Water is used only within the same basin', 'Sewage is released untreated into a river', 'Water evaporates from a dam without being transferred'),
        mc('Which role belongs mainly to national government in the lesson’s water-service framework?', 'Developing water policies and planning major water-resource projects', 'Issuing every individual household’s municipal account directly', 'Choosing each household’s daily tap-use schedule', 'Personally operating every tap in the country'),
        mc('What is a key role of water boards?', 'Providing bulk water services, including treatment and supply to municipalities', 'Replacing every municipality’s local service responsibility', 'Providing only household telephone accounts', 'Guaranteeing unlimited untreated water for every user'),
        mc('Which body is responsible for ensuring local community water and sanitation services?', 'The municipality', 'Only individual household residents', 'Only a school governing body', 'Only a foreign water-transfer project'),
        mc('Why is water purification important in water provision?', 'It removes impurities so water is suitable for its intended use', 'It turns every river into an inter-basin tunnel', 'It increases contamination before distribution', 'It guarantees that no future quality checks are needed'),
        mc('What is the main purpose of wastewater treatment?', 'Reducing contamination in used water before appropriate reuse or release', 'Distributing untreated sewage as drinking water', 'Moving water between basins without considering quality', 'Replacing all water supply with a rainfall forecast'),
        mc('Which statement best describes sustainable water use?', 'Using water while protecting long-term availability and quality', 'Using up supplies without considering future needs', 'Allowing pollution as long as the volume of water increases', 'Treating all rivers as unlimited supplies'),
        mc('Which action illustrates responsible water reuse?', 'Using water again for a suitable purpose after any necessary treatment', 'Drinking untreated sewage directly', 'Discarding all reusable water regardless of quality', 'Reusing any water for any purpose without checking safety'),
        mc('Which action directly helps prevent water pollution?', 'Keeping sewage and harmful chemicals out of rivers', 'Discharging untreated sewage into a stream', 'Washing agricultural chemicals into a watercourse', 'Using a river as a waste-disposal channel'),
        mc('Which benefit is associated with restored wetlands?', 'Water storage, reduced erosion and wildlife habitat', 'The removal of every plant and habitat', 'A guarantee that all wetland water is safe to drink untreated', 'The prevention of every form of water storage'),
        mc('Why can removing invasive, water-demanding alien vegetation help water supply?', 'It can reduce water consumption by those plants', 'It creates rainfall whenever it is required', 'It eliminates every need for sustainable water use', 'It guarantees that water treatment is unnecessary')
    ];

    const extraChoice = [
        mc('Which description avoids overstating what Free Basic Water provides?', 'A basic free allocation for qualifying households, with municipal arrangements determining access', 'Unlimited free water for every household regardless of eligibility', '6 000 litres for every person every day', 'A guarantee that all use above the basic allocation is free'),
        mc('Which water-related right is recognised by South Africa’s Constitution?', 'Access to sufficient water', 'Unlimited free water for every industrial process', 'Permission to pollute a public water source', 'A private dam for every household'),
        mc('A town adds many homes but no additional water or sanitation capacity. What is the likely challenge?', 'Existing services may struggle to meet the increased demand', 'Demand must fall because the town has grown', 'More homes automatically purify sewage', 'Population growth removes the need for pipes'),
        mc('How can agriculture make providing usable water harder?', 'Farm chemicals entering rivers can pollute water supplies', 'All agricultural runoff automatically purifies water', 'Irrigation removes every pollutant from all rivers', 'Growing crops prevents any sewage from entering water'),
        mc('Why does water provision need to consider quality as well as quantity?', 'A large supply can still be unsuitable if it is contaminated', 'Water is safe whenever there is enough of it', 'Treatment matters only when there are no users', 'Quality has no relationship to water use'),
        mc('Which pair of dams in the lesson generates hydroelectric power on the Orange River?', 'Gariep and Vanderkloof', 'Katse and Theewaterskloof', 'Theewaterskloof and Berg River', 'Katse and a municipal treatment tank'),
        mc('Which combination captures the two main benefits of the Lesotho Highlands Water Project?', 'Water supply towards Gauteng and hydropower generation in Lesotho', 'Water supply only to Cape Town and no electricity generation', 'Water supply only to the Eastern Cape and sewage discharge to Gauteng', 'Removal of all dams and tunnels in Lesotho'),
        mc('Why is storing winter rainfall useful for Cape Town’s water supply?', 'Stored water can help supply the generally drier summer months', 'Cape Town’s summer always receives more rain than winter', 'Storing water stops all evaporation permanently', 'Stored water makes municipal distribution unnecessary'),
        mc('Which mountain range is crossed by the Tugela-Vaal transfer system?', 'The Drakensberg', 'The Himalayas', 'The Andes', 'The Alps'),
        mc('What do major water-transfer schemes have in common?', 'Infrastructure that helps move water to areas where it is needed', 'A guarantee that water demand never changes', 'A requirement that every household receives unlimited water', 'No need for construction, energy or maintenance'),
        mc('Which sequence correctly describes a common water-service arrangement?', 'National policy and planning; bulk supply by water boards; local services through municipalities', 'Individual households set national policy; schools replace water boards; rivers issue accounts', 'Municipal accounts create rainfall; untreated sewage provides the only bulk supply', 'Water boards remove every local authority’s responsibility for service delivery'),
        mc('Rand Water is best identified as which type of organisation?', 'A water board providing bulk water services', 'A municipality containing every South African town', 'A private household tap', 'A river basin in Lesotho'),
        mc('Why is it inaccurate to assume water bought from a water board is always untreated?', 'Water boards can treat water before supplying it in bulk', 'Water boards only send untreated sewage to households', 'Bulk supply excludes every form of treatment', 'Municipal billing prevents purification from happening'),
        mc('What is one local water-service task identified in the lesson?', 'Distributing water to customers and issuing accounts', 'Moving every household to Lesotho', 'Changing the length of winter', 'Setting the amount of rainfall in each river basin'),
        mc('A treatment plant receives contaminated used water. What must happen before safe reuse for a specified purpose?', 'Suitable treatment and quality checks for that intended use', 'It must be declared safe because it looks clear', 'It must be used as drinking water without assessment', 'It must bypass treatment so the volume stays unchanged'),
        mc('Which household action supports the lesson’s advice to reduce water waste?', 'Using only the water needed rather than leaving taps running unnecessarily', 'Leaving taps running whenever no one is using them', 'Increasing use because water transfers exist', 'Discharging unused clean water simply to empty storage'),
        mc('Which statement about treated wastewater is most accurate?', 'Its intended use determines the required treatment and quality standard', 'All treated wastewater is automatically drinking water', 'Clear appearance proves all water is safe for every purpose', 'Treatment is irrelevant whenever water will be reused'),
        mc('Which pairing correctly links water threats to sustainable responses?', 'Pollution: keep waste out of water; unnecessary consumption: reduce waste', 'Pollution: add more sewage; unnecessary consumption: leave taps running', 'Pollution: ignore water quality; unnecessary consumption: use more water', 'Pollution: remove wetlands; unnecessary consumption: increase high-water-demand plants'),
        mc('Why is wetland restoration a water-management measure rather than only a landscaping activity?', 'Wetlands can store water, help improve its quality and reduce erosion', 'Wetlands exist only to make a place look attractive', 'Wetlands guarantee drinking-water safety without treatment', 'Wetlands have no connection to water movement or wildlife'),
        mc('A catchment is invaded by plants that consume large amounts of water. Which action in the lesson responds to this?', 'Removing the invasive alien vegetation', 'Expanding the invasive plants across the catchment', 'Replacing wastewater treatment with untreated discharge', 'Reducing all water-quality monitoring')
    ];

    const trueFalseFacts = [
        ['South Africa’s Constitution recognises a right of access to sufficient water.', true, 'This right is different from a promise of unlimited free water.'],
        ['A 6 kilolitre basic water allocation equals 6 000 litres per person per day.', false, '6 kilolitres is 6 000 litres; the basic reference in the lesson is per household per month.'],
        ['Scattered rural communities can be difficult and expensive to reach with water services.', true, 'Their small size and large distances complicate infrastructure and service delivery.'],
        ['Rapid urban growth always reduces the demand placed on water and sanitation services.', false, 'Growing populations and settlements can increase demand and strain services.'],
        ['Untreated sewage and farm chemicals can contaminate water supplies.', true, 'These are pollution challenges identified in the lesson.'],
        ['The Lesotho Highlands Water Project transfers water mainly from Cape Town to Lesotho.', false, 'It transfers water from Lesotho towards Gauteng and supports hydropower generation in Lesotho.'],
        ['Gariep and Vanderkloof dams are associated with the Orange River Project.', true, 'They contribute to water management and hydroelectric generation on the Orange River.'],
        ['The Tugela-Vaal Scheme moves water from the Vaal towards the Tugela as its main supply direction.', false, 'The main transfer described is from the Tugela towards the Vaal system.'],
        ['The Berg River Scheme is associated with supplying Cape Town’s urban and industrial needs.', true, 'Winter water storage helps meet demand during generally drier summer months.'],
        ['Inter-basin transfer: water remaining only within one river basin.', false, 'It moves water between different river basins.'],
        ['National government develops water policies and plans major water-resource projects.', true, 'This is its broad role in the lesson’s service framework.'],
        ['Water boards never treat water before supplying municipalities.', false, 'Water boards can provide bulk treatment and supply treated water.'],
        ['Municipalities are responsible for ensuring local water and sanitation services.', true, 'Water boards can support them, but do not remove that local responsibility.'],
        ['Rand Water is the name of a municipality rather than a water board.', false, 'Rand Water is a water board and bulk water supplier.'],
        ['Water purification helps make water suitable for its intended use.', true, 'Treatment removes impurities and must meet the appropriate quality requirements.'],
        ['Any treated wastewater is automatically safe for drinking.', false, 'Reuse must match the treatment and quality standard required for the intended purpose.'],
        ['Sustainable water use includes reducing waste and preventing pollution.', true, 'It protects long-term water availability and quality.'],
        ['Restored wetlands have no role in water storage, erosion control or wildlife habitat.', false, 'These are functions of wetlands highlighted in the lesson.'],
        ['Removing invasive, water-demanding alien vegetation can help protect water availability.', true, 'Such plants can consume large amounts of catchment water.'],
        ['Free Basic Water means unlimited free supply to everyone, with no qualifying rules.', false, 'It is a basic allocation for eligible households, with municipal arrangements determining provision.']
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
        ['Six kilolitres', 'The volume equal to 6 000 litres, used as a basic monthly household water reference'],
        ['Constitutional water right', 'The recognised right of access to sufficient water'],
        ['Service-delivery costs', 'The expense of building, operating and maintaining water services'],
        ['Sewage contamination', 'Pollution caused when untreated human waste enters a water supply'],
        ['Agricultural pollution', 'Water-quality damage from farm chemicals entering rivers'],
        ['Gariep and Vanderkloof dams', 'Two Orange River dams used for hydroelectric generation in the lesson'],
        ['Katse Dam', 'A Lesotho dam associated with the Highlands Water Project’s stored water supply'],
        ['Theewaterskloof Dam', 'A storage dam on the Riviersonderend, also called the Sonderend River'],
        ['Drakensberg', 'The mountain range crossed by the Tugela-Vaal water-transfer system'],
        ['Winter rainfall storage', 'Holding water from Cape Town’s wetter season to help supply generally drier summers'],
        ['Bulk water supply', 'Delivery of large volumes of water to customers such as municipalities'],
        ['Distribution network', 'Connected pipes and storage facilities carrying water to users'],
        ['Municipal accounts', 'Bills issued to local customers for municipal services'],
        ['Potable water', 'Water meeting the required quality for drinking'],
        ['Treatment plant', 'A facility where water or wastewater is processed to improve its quality'],
        ['Reduced consumption', 'Using less water and avoiding unnecessary demand'],
        ['Water quality', 'The condition of water that determines its suitability for a particular use'],
        ['Erosion control', 'Limiting the loss of soil, a benefit associated with wetland protection'],
        ['Wildlife habitat', 'A living environment for animals and other organisms, which restored wetlands can support'],
        ['Wetland water storage', 'Holding water within wetland areas, one function supported by restoration']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 3, 5, 6, 7, 8, 10, 12, 15, 18, 25, 30, 32, 36];
    const hints = [
        'One kilolitre equals one thousand litres.',
        'Think about connecting small communities separated by large distances.',
        'Human waste needs safe management to protect water sources.',
        'Both named dams are on the Orange River.',
        'The project’s name identifies the country where the highland water is stored.',
        'This scheme serves the south-western Cape rather than Gauteng.',
        'The scheme’s name links its supplying river to the receiving system.',
        'National responsibilities involve the overall policy and major-project framework.',
        'Local service responsibility belongs to the local authority.',
        'Long-term water availability and quality both matter.',
        'Wetlands provide functions beyond the appearance of the landscape.',
        'Look for the two dams on the Orange River, not the Lesotho or Cape storage dams.',
        'Separate national planning, bulk supply and local delivery.',
        'Bulk suppliers can treat water before selling it to municipalities.',
        'Reuse must be appropriate for the treatment and quality of the water.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What does FBW stand for?', 'Free Basic Water'],
        ['Convert a basic water allocation of 6 kilolitres to litres.', '6 000 litres'],
        ['The basic water reference of 6 000 litres in the lesson applies to what household period?', 'Per household per month, not per person per day'],
        ['What water-related right is recognised by South Africa’s Constitution?', 'Access to sufficient water'],
        ['Why is supplying water to scattered rural communities difficult?', 'Small settlements are separated by large distances and are harder to connect and reach'],
        ['How can rapid urban growth affect water services?', 'It increases demand and can strain water and sanitation infrastructure'],
        ['Name two requirements that make water-service implementation costly.', 'Construction, operation, maintenance, treatment or distribution infrastructure; any two'],
        ['How can inadequate sanitation affect water supplies?', 'Untreated sewage can contaminate water sources'],
        ['How can agricultural chemicals affect rivers?', 'Runoff can carry them into rivers and pollute water supplies'],
        ['Which project includes Gariep and Vanderkloof dams?', 'The Orange River Project'],
        ['Name the two Orange River dams used for hydroelectric generation in the lesson.', 'Gariep and Vanderkloof'],
        ['Give two uses of Orange River Project water identified in the lesson.', 'Irrigation, urban water supply and hydroelectric generation; any two'],
        ['Which project transfers water from Lesotho towards Gauteng?', 'The Lesotho Highlands Water Project'],
        ['What electricity-related benefit does the Highlands Water Project provide to Lesotho?', 'Hydroelectric power generation'],
        ['Which Lesotho dam is named in the lesson’s Highlands Water Project example?', 'Katse Dam'],
        ['Which scheme supports Cape Town’s urban and industrial water supply in the lesson?', 'The Berg River Scheme'],
        ['Which dam on the Sonderend or Riviersonderend River is named in the Berg supply example?', 'Theewaterskloof Dam'],
        ['What is the supply direction of the Tugela-Vaal transfer described in the lesson?', 'From the Tugela towards the Vaal system'],
        ['Which mountain range is crossed by the Tugela-Vaal transfer system?', 'The Drakensberg'],
        ['What is an inter-basin transfer?', 'Moving water from one river basin to another'],
        ['Why is winter water storage useful for Cape Town?', 'It can support supply during the generally drier summer months'],
        ['Name two types of infrastructure used by major water-transfer schemes.', 'Dams, tunnels, canals or pumps; any two'],
        ['A household assumes FBW means unlimited free use. Explain the misunderstanding.', 'It is a basic allocation for eligible households, not unlimited free water for every user'],
        ['Why is a right of access to water not the same as an unlimited free allocation?', 'The right concerns access to sufficient water; free provision has a basic quantity and eligibility arrangements'],
        ['Which level of government develops national water policies and plans major resource projects?', 'National government'],
        ['What is a key bulk-supply role of water boards?', 'Treating and supplying large volumes of water, including to municipalities'],
        ['Who is responsible for ensuring local water and sanitation services?', 'The municipality or local water-services authority'],
        ['Rand Water is an example of which water-service organisation?', 'A water board or bulk water supplier'],
        ['Why can water bought from a water board already be treated?', 'Water boards can carry out bulk water treatment before supply'],
        ['Give two local water-service tasks discussed in the lesson.', 'Ensuring water provision or distribution, sanitation services and issuing customer accounts; any two'],
        ['What is the purpose of water purification?', 'Removing impurities so water is suitable for its intended use'],
        ['Why is wastewater treatment important before appropriate reuse or release?', 'It reduces contamination and pollution risks'],
        ['Does clear-looking reused water automatically qualify as drinking water? Explain.', 'No; safety depends on appropriate treatment and quality requirements, not appearance alone'],
        ['What does sustainable water use aim to protect over time?', 'Water availability and quality for continuing and future needs'],
        ['Give two sustainable water actions other than wetland restoration from the lesson.', 'Reduce waste, prevent pollution, appropriately treat and reuse water, or remove water-demanding alien vegetation; any two'],
        ['How can a household reduce avoidable water waste?', 'Use only the water needed, for example by not leaving unused taps running'],
        ['Why does preventing sewage pollution support water provision?', 'It protects water quality and reduces contamination of supplies'],
        ['Give two water-related functions of wetlands highlighted in the lesson.', 'Water storage, helping improve water quality or reducing erosion; any two'],
        ['How does restoring wetlands benefit wildlife?', 'It can restore or protect habitats for animals and other organisms'],
        ['Why can clearing invasive, water-demanding alien plants help a catchment?', 'It reduces those plants’ water consumption and can help protect water availability']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.FreeBasicWaterTopic2 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
