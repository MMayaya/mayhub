(function () {
    "use strict";

    const makeQuestion = (q, answer, distractors, slot, hint) => {
        const options = distractors.slice(0, 3);
        options.splice(slot, 0, answer);
        return { q, options, a: slot, hint };
    };

    const quizPool = [
        makeQuestion("What is urbanisation?", "An increasing proportion of a country's population living in towns and cities", ["The movement of industries into rural areas", "A decrease in all city populations", "The division of a city into land-use zones"], 0, "It describes a population shift towards urban settlements."),
        makeQuestion("What movement commonly causes urbanisation?", "Rural-to-urban migration", ["Movement from one suburb to another", "Movement from cities to farms only", "Daily travel to school"], 2, "People move from rural settlements to towns and cities."),
        makeQuestion("What happens to urban settlements as urbanisation continues?", "They grow and expand", ["They lose all services", "They become rural farms", "They remain unchanged"], 1, "More people settle in towns and cities."),
        makeQuestion("Which demand increases when cities grow?", "Housing, transport, schools, healthcare, water and electricity", ["Only fishing boats", "Only forest land", "Fewer public services"], 3, "A larger population needs more infrastructure and services."),
        makeQuestion("About what share of Africa's population lives in urban areas?", "Almost half", ["Almost none", "Exactly one tenth", "Every person"], 0, "The presentation describes the figure as close to one half."),
        makeQuestion("What challenge does rapid African urban growth create?", "Services must be provided for more people in a small area", ["Cities need fewer facilities", "Rural work disappears immediately", "No planning is required"], 2, "Governments and municipalities must support growing populations."),
        makeQuestion("What is migration?", "The movement of people from one place to another", ["The growth of buildings only", "The grouping of land-use zones", "The supply of electricity"], 1, "This is the presentation's key-term definition."),
        makeQuestion("What is a push factor?", "A condition that encourages people to leave an area", ["A service that attracts people", "A city building", "A transport route"], 3, "Push factors operate at the place of origin."),
        makeQuestion("What is a pull factor?", "A condition that attracts people towards another area", ["A reason to leave the current place", "A shortage of housing", "A physical barrier between suburbs"], 0, "Pull factors draw migrants to a destination."),
        makeQuestion("Which is a push factor?", "No work", ["More job opportunities", "Better services", "Good education"], 2, "It makes people want to leave where they live."),
        makeQuestion("Which is another push factor?", "War and political problems", ["Better safety", "Closer family", "More exciting lifestyle"], 1, "Conflict can force people to move."),
        makeQuestion("Which environmental condition is a push factor?", "Drought", ["Good education", "Better healthcare", "More jobs"], 3, "It makes livelihoods and living conditions difficult."),
        makeQuestion("Which is a pull factor?", "More job opportunities", ["Poverty", "Food shortages", "Flooding"], 0, "It attracts people seeking work."),
        makeQuestion("Which is another pull factor?", "Better safety and security", ["Drought", "War", "No work"], 2, "It promises safer living conditions."),
        makeQuestion("Which social attraction is a pull factor?", "Being closer to family members", ["Food shortages", "Flooding", "Poverty"], 1, "Family connections can attract migrants."),
        makeQuestion("Which is an economic reason for migration?", "Moving to find work", ["Escaping flooding", "Moving closer to family", "Escaping war"], 3, "Economic reasons concern jobs and income."),
        makeQuestion("Which is a social reason for migration?", "Seeking a better quality of life or being closer to family", ["Escaping a drought", "Escaping political problems", "Finding mineral deposits"], 0, "Social reasons relate to family and living conditions."),
        makeQuestion("Which is a political reason for migration?", "Escaping war or political problems", ["Finding work", "Attending a better school", "Escaping a flood"], 2, "Political instability can make people leave."),
        makeQuestion("Which is an environmental reason for migration?", "Moving because of flooding or drought", ["Moving for a job", "Moving closer to family", "Moving for entertainment"], 1, "Natural hazards and conditions affect where people can live."),
        makeQuestion("What follows difficult rural conditions in the urbanisation process?", "People decide to migrate", ["Urban populations decrease", "All services close", "Cities become farms"], 3, "Push factors lead to a migration decision."),
        makeQuestion("Which large settlements existed before European settlement in South Africa?", "Mapungubwe and Kaditshwene", ["Johannesburg and Kimberley", "Durban and East London", "Cape Town and Port Elizabeth"], 0, "Learners encountered these examples in earlier grades."),
        makeQuestion("What happened at the Cape in 1652?", "The Dutch East India Company established a permanent settlement", ["Gold was discovered", "The Union of South Africa formed", "Apartheid ended"], 2, "The settlement supplied passing ships."),
        makeQuestion("Why was the Cape settlement established?", "To provide passing ships with fresh food and water", ["To mine diamonds", "To create an informal settlement", "To build schools for mining towns"], 1, "It served voyages to and from the East."),
        makeQuestion("Why did Cape Town grow?", "Its harbour importance attracted people and activities", ["It had no contact with ships", "All residents left for farms", "Its roads and services closed"], 3, "The harbour function supported urban development."),
        makeQuestion("When were diamonds discovered in South Africa?", "During the 1860s", ["In 1652", "In 1910", "After 1994"], 0, "This discovery preceded gold."),
        makeQuestion("Why did people travel to diamond-mining areas?", "They hoped to make their fortunes", ["They sought beach recreation", "They were building harbour stations", "They wanted fewer jobs"], 2, "Mineral wealth attracted local and overseas migrants."),
        makeQuestion("Where did many early diamond miners live?", "Temporary tents and shacks", ["Large suburban houses", "Government offices", "Permanent hotels only"], 1, "The first mining camps were temporary."),
        makeQuestion("When was gold discovered?", "1886", ["1652", "1913", "1994"], 3, "The gold discovery followed diamonds in the 1860s."),
        makeQuestion("What happened to small mining camps?", "They rapidly became permanent settlements", ["They remained empty", "They changed into forests", "They lost all transport"], 0, "Mining attracted people and construction."),
        makeQuestion("Which towns developed through diamond and gold discoveries?", "Kimberley and Johannesburg", ["Mapungubwe and Kaditshwene", "Durban and East London only", "Cape Town and Pretoria only"], 2, "They became important mining towns."),
        makeQuestion("How did mining accelerate urbanisation?", "It created skilled and unskilled jobs that attracted migrants", ["It removed all economic activity", "It reduced settlement size", "It stopped overseas movement"], 1, "Workers moved to mining towns for employment."),
        makeQuestion("Which workers were needed besides miners?", "Builders, carpenters, engineers, shop workers and labourers", ["Only fishermen", "Only forestry workers", "No other workers"], 3, "Growing towns needed varied skills and services."),
        makeQuestion("Why were roads and railways built around mining towns?", "To transport people, equipment and goods efficiently", ["To separate every racial group", "To reduce all trade", "To replace harbour settlements"], 0, "Mining required strong transport connections."),
        makeQuestion("Which mining towns were linked to harbour settlements by rail?", "Johannesburg and Kimberley", ["Mapungubwe and Kaditshwene", "Only Cape Town", "Only rural farms"], 2, "Railways connected mineral areas with ports."),
        makeQuestion("Which harbour settlements are named as railway links?", "Durban, Port Elizabeth and East London", ["Johannesburg, Kimberley and Pretoria", "Mapungubwe and Kaditshwene", "Only Cape Town"], 1, "Mining goods were connected to coastal ports."),
        makeQuestion("How did mining affect farming?", "Farms produced food for growing urban populations", ["All farms became mines", "Urban residents stopped needing food", "Transport made farming impossible"], 3, "Expanding towns created demand for supplies."),
        makeQuestion("When was the Union of South Africa formed?", "1910", ["1652", "1886", "1948"], 0, "This occurred shortly before the Land Act."),
        makeQuestion("Who was excluded from political power in the new Union government?", "Black South Africans", ["All white South Africans", "All mine owners", "All harbour workers"], 2, "The presentation describes racial exclusion."),
        makeQuestion("What did the 1913 Land Act do?", "It divided land between black and white South Africans", ["It ended apartheid", "It created the Union", "It discovered gold"], 1, "It was an early racial land policy."),
        makeQuestion("What proportion of the country did the 1913 Land Act allocate to whites?", "More than 90%", ["Less than 10%", "Exactly half", "No land"], 3, "The remaining areas were reserved for black South Africans."),
        makeQuestion("What did racial land policies influence?", "Where different groups could live in rural and urban areas", ["The direction of every river", "The timing of gold discovery", "The number of doctors overseas"], 0, "Settlement patterns were controlled by race."),
        makeQuestion("When did racial policies become more severe under the Nationalist government?", "After its election in 1948", ["After 1652", "During the 1860s", "After 1994"], 2, "Apartheid was introduced after this election."),
        makeQuestion("What does apartheid mean?", "Separateness", ["Urban growth", "Migration", "Democracy"], 1, "The policy aimed to keep racial groups apart."),
        makeQuestion("How did apartheid affect residential areas?", "People were forced to live in separate areas by race", ["Everyone could live anywhere", "Cities lost all housing", "Only mines were controlled"], 3, "Residential zones were deliberately segregated."),
        makeQuestion("Which physical barriers separated racial zones?", "Railway lines, industrial areas and open land", ["Only schools", "Only hospitals", "Rivers in every case"], 0, "City layout was used to reinforce separation."),
        makeQuestion("What else did apartheid control besides housing?", "Entrances, transport and recreation areas", ["Only rainfall", "Only mineral quality", "Only farm crops"], 2, "Separate facilities restricted urban access."),
        makeQuestion("What changed in 1994?", "Apartheid ended and restrictions on where people could live were removed", ["The Land Act began", "Gold was discovered", "The Union formed"], 1, "Democracy allowed freer movement."),
        makeQuestion("What followed the removal of movement restrictions?", "More rural residents moved freely into towns and cities", ["All city growth stopped", "Mining towns disappeared", "Harbours closed"], 3, "Rural-to-urban migration increased."),
        makeQuestion("What pressure did post-1994 city growth increase?", "Pressure on urban land and services", ["Pressure on forests only", "Demand for fewer homes", "The need for fewer schools"], 0, "Rapid growth raises infrastructure demand."),
        makeQuestion("Why did informal settlements expand?", "Formal housing could not accommodate everyone arriving", ["Cities had too many empty formal homes", "All migrants were wealthy", "Roads replaced every house"], 2, "Some migrants built temporary homes or shared overcrowded housing."),
        makeQuestion("What causes serious urban problems during rapid growth?", "Population grows faster than services can be provided", ["Services grow faster than population", "No one migrates", "Cities have unlimited land"], 1, "Infrastructure provision cannot keep pace."),
        makeQuestion("What worsened the formal housing shortage?", "Poor planning and continued arrival of low-income migrants", ["A fall in urban population", "Too many empty schools", "The end of all migration"], 3, "Demand kept increasing while supply lagged."),
        makeQuestion("What is an informal house?", "A house often built by the people who live in it", ["A government office", "A permanent mine building", "A transport station"], 0, "This is the presentation's key-term definition."),
        makeQuestion("What is a shanty town?", "A settlement made mainly of shacks", ["A high-income suburb", "A central business district", "A formal mining town"], 2, "The term describes the dominant housing type."),
        makeQuestion("Which infrastructure may informal settlements lack?", "Proper roads, water systems and sanitation", ["Only harbours", "Only mines", "Only railways to ports"], 1, "Many developed without basic services."),
        makeQuestion("How many people may live in informal housing in South Africa?", "As many as ten million", ["Fewer than one hundred", "Exactly one thousand", "No people"], 3, "The presentation gives a maximum estimate."),
        makeQuestion("Which basic services may be in short supply?", "Clean water, toilets, roads, electricity, healthcare and schools", ["Diamonds and gold", "Harbours and mines only", "Forests and fishing grounds"], 0, "Rapid settlements need both infrastructure and social services."),
        makeQuestion("How does rapid growth affect clinics and hospitals?", "People may travel farther or wait longer for treatment", ["Healthcare demand disappears", "Every facility becomes empty", "No doctors are needed"], 2, "Existing facilities serve more people."),
        makeQuestion("What healthcare workers may be in short supply?", "Doctors and nurses", ["Builders and carpenters only", "Miners and traders", "Farmers and fishers"], 1, "Staff shortages add to pressure on care."),
        makeQuestion("How does urbanisation affect schools?", "Schools may become overcrowded", ["The number of learners always falls", "Every school becomes a hospital", "Education is no longer needed"], 3, "Growing populations include more children."),
        makeQuestion("Why can education provision lag behind urban growth?", "New schools cannot always be built as quickly as settlements grow", ["No children move to cities", "All schools close in 1994", "Transport replaces classrooms"], 0, "Construction and planning take time."),
        makeQuestion("How many doctors per 100,000 people are listed for Nigeria?", "19", ["75", "247", "10 million"], 2, "It is the lowest of the three listed figures."),
        makeQuestion("How many doctors per 100,000 people are listed for South Africa?", "75", ["19", "247", "1913"], 1, "It falls between Nigeria and the United States."),
        makeQuestion("How many doctors per 100,000 people are listed for the United States?", "247", ["19", "75", "90"], 3, "It is the highest figure on the slide."),
        makeQuestion("What does fewer doctors for a large population cause?", "Greater pressure on health services", ["Less demand for treatment", "More available appointments", "An end to urbanisation"], 0, "Availability affects access and waiting."),
        makeQuestion("How does urbanisation change the physical landscape?", "New houses, roads, schools, businesses and services are built", ["All constructed features disappear", "Settlements become natural forests", "Population changes without any building"], 2, "Population growth requires physical development."),
        makeQuestion("What can reveal urban growth from above?", "Aerial photographs and maps", ["Only interviews", "Only rainfall gauges", "Only written laws"], 1, "Changes in built-up areas and roads become visible."),
    ];

    const definitions = [
        { q: "Urbanisation", a: "The process in which an increasing proportion of a country's population lives in towns and cities." },
        { q: "Migration", a: "The movement of people from one place to another." },
        { q: "Rural-to-urban migration", a: "The movement of people from rural areas to towns and cities." },
        { q: "Push factor", a: "A condition that encourages people to leave the place where they currently live." },
        { q: "Pull factor", a: "A condition that attracts people towards another place." },
        { q: "Economic migration reason", a: "A reason for moving that relates to finding work or earning a living." },
        { q: "Social migration reason", a: "A reason for moving that relates to quality of life or being closer to family." },
        { q: "Political migration reason", a: "A reason for moving that relates to war or political problems." },
        { q: "Environmental migration reason", a: "A reason for moving that relates to disasters or conditions such as flooding and drought." },
        { q: "Harbour settlement", a: "A settlement whose growth and activities are strongly linked to a harbour and passing ships." },
        { q: "Mining settlement", a: "A settlement that develops around the extraction of minerals and related employment." },
        { q: "Apartheid", a: "A policy of separateness that kept South African racial groups apart." },
        { q: "Racial segregation", a: "The enforced separation of people into different areas or facilities according to race." },
        { q: "Democracy", a: "The post-1994 system under which apartheid residential and movement restrictions were removed." },
        { q: "Housing shortage", a: "A situation in which there are not enough formal homes for the people who need them." },
        { q: "Informal house", a: "A house often built by the people who live in it." },
        { q: "Shanty town", a: "A settlement made mainly of shacks." },
        { q: "Informal settlement", a: "A settlement of informal housing that may lack proper roads, water systems, sanitation and other services." },
        { q: "Basic services", a: "Essential facilities such as water, sanitation, electricity, healthcare, roads and schools." },
        { q: "Infrastructure", a: "The physical systems and facilities needed for a settlement to function." },
    ];

    const terms = [
        { q: "Increasing share of a population living in towns and cities.", a: "Urbanisation" },
        { q: "Movement of people from one place to another.", a: "Migration" },
        { q: "Movement from farms and villages towards towns and cities.", a: "Rural-to-urban migration" },
        { q: "Condition that makes people want to leave an area.", a: "Push factor" },
        { q: "Condition that attracts people to a destination.", a: "Pull factor" },
        { q: "Push factor caused by a lack of employment.", a: "No work" },
        { q: "Pull factor offering employment in a destination.", a: "More job opportunities" },
        { q: "Early South African harbour city supplied ships with food and water.", a: "Cape Town" },
        { q: "Mineral discovered during the 1860s.", a: "Diamonds" },
        { q: "Mineral discovered in 1886.", a: "Gold" },
        { q: "Diamond-mining town named in the presentation.", a: "Kimberley" },
        { q: "Gold-mining town named in the presentation.", a: "Johannesburg" },
        { q: "Country formed under a new government in 1910.", a: "Union of South Africa" },
        { q: "Law that racially divided South African land.", a: "1913 Land Act" },
        { q: "Policy introduced after 1948 meaning separateness.", a: "Apartheid" },
        { q: "Year in which apartheid ended and movement restrictions were removed.", a: "1994" },
        { q: "House often built by its occupants.", a: "Informal house" },
        { q: "Settlement made mainly from shacks.", a: "Shanty town" },
        { q: "Condition caused when formal homes cannot meet demand.", a: "Housing shortage" },
        { q: "Facilities including water, sanitation, electricity, healthcare and schools.", a: "Basic services" },
    ];

    const trueFalse = [
        { q: "Urbanisation means an increasing proportion of people live in urban settlements.", options: ["True", "False"], a: "True", exp: "It is a population shift towards towns and cities." },
        { q: "Migration is the movement of people from one place to another.", options: ["True", "False"], a: "True", exp: "Rural-to-urban movement is one type of migration." },
        { q: "Push factors attract people towards a new place.", options: ["True", "False"], a: "False", exp: "Push factors encourage departure; pull factors attract people." },
        { q: "No work, war, poverty, drought and flooding are push factors.", options: ["True", "False"], a: "True", exp: "They make people want or need to leave." },
        { q: "Better jobs, safety, services and education are pull factors.", options: ["True", "False"], a: "True", exp: "They attract people towards another place." },
        { q: "Cape Town developed partly because it supplied passing ships.", options: ["True", "False"], a: "True", exp: "The permanent Cape settlement began in 1652." },
        { q: "Gold was discovered before diamonds in South Africa.", options: ["True", "False"], a: "False", exp: "Diamonds were discovered in the 1860s and gold in 1886." },
        { q: "Mining created both skilled and unskilled jobs.", options: ["True", "False"], a: "True", exp: "It attracted people from rural areas and overseas." },
        { q: "Mining reduced the need for roads and railways.", options: ["True", "False"], a: "False", exp: "Transport was built to move people, equipment and goods." },
        { q: "Growing mining towns increased demand for farm food, shops and services.", options: ["True", "False"], a: "True", exp: "Urbanisation affected several parts of the economy." },
        { q: "The Union of South Africa was formed in 1910.", options: ["True", "False"], a: "True", exp: "Black South Africans were excluded from political power." },
        { q: "The 1913 Land Act allocated more than 90% of South Africa to whites.", options: ["True", "False"], a: "True", exp: "Remaining areas were reserved for black South Africans." },
        { q: "Apartheid means togetherness.", options: ["True", "False"], a: "False", exp: "It means separateness." },
        { q: "Apartheid barriers between residential zones included railways and industrial land.", options: ["True", "False"], a: "True", exp: "Open land was also used as a barrier." },
        { q: "Restrictions on where people could live were removed in 1994.", options: ["True", "False"], a: "True", exp: "Movement into towns and cities increased after apartheid." },
        { q: "Rapid urban growth always guarantees enough formal housing.", options: ["True", "False"], a: "False", exp: "Formal housing often cannot keep pace with arrivals." },
        { q: "A shanty town is a settlement made mainly of shacks.", options: ["True", "False"], a: "True", exp: "Its homes are mostly informal structures." },
        { q: "Informal settlements may lack water, sanitation, roads and electricity.", options: ["True", "False"], a: "True", exp: "Population growth can outpace infrastructure." },
        { q: "Rapid urbanisation can overcrowd clinics and schools.", options: ["True", "False"], a: "True", exp: "More residents require healthcare and education." },
        { q: "Aerial photographs and maps can reveal landscape changes caused by urbanisation.", options: ["True", "False"], a: "True", exp: "New buildings, roads and settlements are visible from above." },
    ];

    const toSpinQuestion = ({ q, options, a }) => ({ q, options, a: options[a], exp: options[a] + "." });

    const jeopardy = [
        { name: "Migration and Urbanisation", questions: [
            { points: 10, q: "Define urbanisation.", a: "An increasing proportion of a country's population living in towns and cities." },
            { points: 20, q: "Differentiate between push and pull factors.", a: "Push factors encourage people to leave; pull factors attract them to another place." },
            { points: 30, q: "Give four push factors shown in the presentation.", a: "Any four of no work, war/political problems, poverty, food shortages, drought and flooding." },
            { points: 40, q: "Give four pull factors shown in the presentation.", a: "Any four of jobs, safety/security, services, family, education and an exciting lifestyle." },
            { points: 50, q: "Describe the chain from rural difficulty to urbanisation.", a: "Push factors cause migration; urban opportunities attract migrants; more people settle in cities; urban population rises and urbanisation occurs." },
        ]},
        { name: "Growth of South African Cities", questions: [
            { points: 10, q: "Why did Cape Town begin growing after 1652?", a: "Its harbour settlement supplied passing ships with fresh food and water." },
            { points: 20, q: "When were diamonds and gold discovered?", a: "Diamonds in the 1860s and gold in 1886." },
            { points: 30, q: "How did temporary mining camps become urban settlements?", a: "Minerals attracted people and jobs, and permanent housing, shops, services and other buildings developed." },
            { points: 40, q: "Why did mining encourage roads and railways?", a: "Efficient transport was needed for workers, equipment and goods between mines, settlements and harbours." },
            { points: 50, q: "Explain how mining changed other economic sectors.", a: "Growing towns increased demand for farm food, transport, trade, shops and services for miners and families." },
        ]},
        { name: "Land Control and Democracy", questions: [
            { points: 10, q: "When was the Union of South Africa formed?", a: "1910." },
            { points: 20, q: "What did the 1913 Land Act do?", a: "It divided land by race, allocating more than 90% to whites and reserving remaining areas for black South Africans." },
            { points: 30, q: "How did apartheid influence city layout?", a: "It created separate racial residential zones divided by barriers such as railways, industrial areas and open land." },
            { points: 40, q: "How did apartheid control access beyond housing?", a: "Racial groups used separate entrances, transport and recreation areas, and desirable spaces were reserved for certain groups." },
            { points: 50, q: "How did democracy in 1994 affect urban growth?", a: "Residential and movement restrictions ended, more rural people moved freely to cities, and pressure on land and services increased." },
        ]},
        { name: "Rapid Growth Challenges", questions: [
            { points: 10, q: "Define an informal house and a shanty town.", a: "An informal house is often built by its occupants; a shanty town is a settlement made mainly of shacks." },
            { points: 20, q: "Why do informal settlements expand?", a: "Formal housing and planning cannot keep pace with low-income migration and rapid population growth." },
            { points: 30, q: "Name six services that rapid urban populations need.", a: "Housing, water, sanitation, electricity, healthcare and schools; roads and transport are also needed." },
            { points: 40, q: "How does rapid urbanisation pressure healthcare and education?", a: "Clinics face long waits and staff shortages, while schools overcrowd and classrooms cannot be built quickly enough." },
            { points: 50, q: "Explain the relationship between migration, urbanisation and informal settlements.", a: "Rural-to-urban migration raises city populations; when housing and services lag behind, migrants may build informal homes and settlements expand." },
        ]},
    ];

    const matchingPairs = {
        topic1: [
            ["Urbanisation", "Increasing share of people living in towns and cities."], ["Migration", "Movement from one place to another."], ["Push Factor", "Condition encouraging departure."], ["Pull Factor", "Condition attracting people elsewhere."], ["No Work", "Economic push factor."], ["Drought", "Environmental push factor."], ["Job Opportunities", "Economic pull factor."], ["Better Education", "Social pull factor."], ["War", "Political reason for migration."], ["Flooding", "Environmental reason for migration."],
        ],
        topic2: [
            ["Cape Town", "Harbour settlement supplying passing ships."], ["1652", "Year the permanent Cape settlement began."], ["Diamonds", "Mineral discovered during the 1860s."], ["Gold", "Mineral discovered in 1886."], ["Kimberley", "Important diamond-mining town."], ["Johannesburg", "Important gold-mining town."], ["Mining Jobs", "Work attracting local and overseas migrants."], ["Railways", "Transport linking mines to harbour settlements."], ["Farms", "Supplied food to growing towns."], ["Urban Services", "Activities serving miners and their families."],
        ],
        topic3: [
            ["1910", "Formation of the Union of South Africa."], ["1913 Land Act", "Law dividing land according to race."], ["More Than 90%", "Share of land allocated to whites."], ["1948", "Election followed by more severe racial controls."], ["Apartheid", "Policy meaning separateness."], ["Residential Segregation", "Forced racial separation of housing areas."], ["Physical Barriers", "Railways, industry and open land between zones."], ["Separate Facilities", "Controlled entrances, transport and recreation."], ["1994", "Year apartheid restrictions ended."], ["Democracy", "Change allowing freer movement into cities."],
        ],
        topic4: [
            ["Housing Shortage", "Too few formal homes for urban demand."], ["Informal House", "Home often built by its occupants."], ["Shanty Town", "Settlement made mainly of shacks."], ["Informal Settlement", "Area that may lack proper infrastructure."], ["Sanitation", "Safe toilets and waste systems."], ["Healthcare Pressure", "Longer travel or waiting for treatment."], ["School Overcrowding", "Too many learners for available facilities."], ["Doctors and Nurses", "Healthcare workers that may be scarce."], ["Basic Services", "Water, electricity, healthcare and education."], ["Urban Landscape Change", "New roads, housing, schools and businesses."],
        ],
    };

    const makeCards = (pairs) => pairs.flatMap(([left, right], index) => [
        { id: index + 1, text: left },
        { id: index + 1, text: right },
    ]);

    const drag = {
        unit1: matchingPairs.topic1.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit2: matchingPairs.topic2.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit3: matchingPairs.topic3.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit4: matchingPairs.topic4.slice(0, 8).map(([item, match]) => ({ item, match })),
    };

    window.UrbanisationData = {
        spin: {
            definitions,
            terms,
            multipleChoice: [0, 1, 4, 6, 7, 8, 9, 12, 15, 18, 21, 24, 27, 29, 32, 38, 42, 46, 52, 61].map((index) => toSpinQuestion(quizPool[index])),
            trueFalse,
        },
        jeopardy,
        match: Object.fromEntries(Object.entries(matchingPairs).map(([key, pairs]) => [key, makeCards(pairs)])),
        millionaire: quizPool.slice(0, 30),
        snake: {
            game1: [0, 1, 4, 6, 7, 8, 9, 12, 15, 18].map((index) => quizPool[index]),
            game2: [20, 21, 22, 23, 24, 27, 29, 30, 32, 35].map((index) => quizPool[index]),
            game3: [36, 38, 39, 41, 42, 43, 44, 45, 46, 47].map((index) => quizPool[index]),
            game4: [49, 50, 51, 52, 53, 54, 56, 57, 59, 60].map((index) => quizPool[index]),
        },
        drag,
    };
})();
