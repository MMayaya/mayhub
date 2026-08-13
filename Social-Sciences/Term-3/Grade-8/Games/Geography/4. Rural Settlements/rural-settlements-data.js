(function () {
    "use strict";

    const makeQuestion = (q, answer, distractors, slot, hint) => {
        const options = distractors.slice(0, 3);
        options.splice(slot, 0, answer);
        return { q, options, a: slot, hint };
    };

    const quizPool = [
        makeQuestion("What is a settlement?", "A place where people live", ["A road joining two towns", "Land used only for farming", "A photograph taken from space"], 0, "Think about the shared purpose of farms, villages, towns and cities."),
        makeQuestion("Which three features can be used to compare settlements?", "Size, population and function", ["Rainfall, temperature and wind", "Latitude, longitude and altitude", "Colour, age and language"], 2, "The presentation introduces these three ways in which settlements vary."),
        makeQuestion("Which description best fits a rural settlement?", "A smaller settlement with fewer buildings and roads", ["A large settlement with many offices", "A place made only of factories", "Any settlement beside the sea"], 1, "Compare the amount of development in rural and urban areas."),
        makeQuestion("Which description best fits an urban settlement?", "A larger settlement with many buildings, roads and people", ["An isolated house surrounded by fields", "A place where everyone fishes", "A settlement without services"], 3, "Towns and cities are urban settlements."),
        makeQuestion("Which urban land use includes houses and flats?", "Residential", ["Industrial", "Recreational", "Business"], 0, "This is where people live."),
        makeQuestion("Factories belong to which urban land-use category?", "Industrial", ["Residential", "Recreational", "Agricultural"], 2, "This land is used to make or process goods."),
        makeQuestion("Shops and offices belong to which urban land-use category?", "Business", ["Residential", "Forestry", "Recreational"], 1, "Buying, selling and office work happen here."),
        makeQuestion("Parks and sports grounds are examples of which land use?", "Recreational", ["Industrial", "Business", "Mining"], 3, "People use these places in their free time."),
        makeQuestion("What is a satellite image?", "An image of Earth's surface captured by a satellite in space", ["A street-level sketch", "A photograph taken from an aeroplane", "A map drawn from memory"], 0, "The observing instrument is above Earth in space."),
        makeQuestion("What is an aerial photograph?", "A photograph taken from an aeroplane", ["An image captured by a satellite", "A drawing of a village", "A photograph taken underground"], 2, "Aerial refers to the air."),
        makeQuestion("Which feature can be identified when reading an aerial photograph?", "Roads and transport routes", ["The language spoken in every home", "The age of every resident", "The exact income of each worker"], 1, "Look for visible lines connecting places."),
        makeQuestion("Which is a natural feature visible on settlement images?", "A river", ["An office block", "A factory", "A sports stadium"], 3, "It is part of the physical environment."),
        makeQuestion("Where are rural settlements generally found?", "Outside large towns and cities", ["Only inside city centres", "Only beside factories", "Only in industrial regions"], 0, "The presentation contrasts rural areas with major urban centres."),
        makeQuestion("Which pair gives examples of rural settlements?", "Villages and farms", ["Cities and harbours", "Factories and offices", "Airports and stadiums"], 2, "Both examples are smaller and closely linked to the land."),
        makeQuestion("About how many South Africans live in rural areas according to the presentation?", "Four out of ten", ["One out of ten", "Nine out of ten", "All South Africans"], 1, "The slide gives the figure as a fraction out of ten."),
        makeQuestion("Which list contains the four rural settlement types based on economic activity?", "Farming, mining, forestry and fishing", ["Housing, offices, roads and parks", "Villages, towns, cities and capitals", "Rivers, coasts, forests and mountains"], 3, "Each item describes how people earn a living."),
        makeQuestion("What is the main occupation in a farming settlement?", "Producing food from the land", ["Building satellites", "Selling only imported goods", "Mining valuable minerals"], 0, "Crops and livestock are central to this settlement."),
        makeQuestion("Which pattern is typical of individual farms?", "Dispersed", ["Concentrated", "Industrial", "Coastal"], 2, "Families live on separate farms rather than in one group."),
        makeQuestion("Which pattern is typical of a farming village?", "Concentrated", ["Dispersed", "Isolated", "Industrial"], 1, "The houses are grouped together."),
        makeQuestion("What usually surrounds the grouped houses of a farming village?", "Fields and grazing land", ["Only factories", "A city centre", "An international airport"], 3, "Agricultural land lies around the settlement."),
        makeQuestion("Why does a mining settlement develop in a particular place?", "Valuable minerals are found there", ["It must be beside a lake", "It has many parks", "It is always near a forest"], 0, "The economic activity depends on a resource below the ground."),
        makeQuestion("What may happen after a mine opens?", "Workers settle nearby and houses and services develop", ["All roads disappear", "The area immediately becomes forest", "People move away because no jobs exist"], 2, "Employment attracts people to the area."),
        makeQuestion("What is forestry?", "Planting and managing forests for wood", ["Catching fish in lakes", "Growing crops in city centres", "Extracting minerals from rock"], 1, "This activity manages a renewable land resource."),
        makeQuestion("Which is a use of wood named in the presentation?", "Making paper", ["Producing gold", "Creating satellite images", "Catching fish"], 3, "Paper mills process this resource."),
        makeQuestion("Why are forestry settlements often near forests, sawmills or paper mills?", "These places provide work linked to wood", ["They provide ocean fishing", "They contain all mineral deposits", "They prevent any transport"], 0, "Location and livelihood are linked."),
        makeQuestion("Where do fishing settlements usually develop?", "Along coasts or beside large lakes", ["Only in deserts", "Only beside gold mines", "Inside dense city centres"], 2, "Access to water is essential."),
        makeQuestion("Which activity supports a fishing settlement?", "Catching and processing fish", ["Building aeroplanes", "Mining coal", "Managing office parks"], 1, "Both harvesting and preparing the resource provide work."),
        makeQuestion("Can settlements change their type over time?", "Yes, a rural settlement can grow into an urban settlement", ["No, settlement type never changes", "Only urban settlements can become farms", "Only fishing settlements can change"], 3, "The presentation shows a process of growth."),
        makeQuestion("Which combination can attract more people to a rural settlement?", "Jobs, transport and services", ["Fewer roads and fewer jobs", "The closure of all businesses", "Removing every service"], 0, "Growth follows new opportunities and connections."),
        makeQuestion("How did Johannesburg begin in the 1880s?", "As a mining settlement", ["As a forestry village", "As a fishing hamlet", "As an isolated farmstead only"], 2, "Its early growth was linked to minerals."),
        makeQuestion("What did Johannesburg become as workers and activities increased?", "One of South Africa's largest urban settlements", ["A settlement with no roads", "A small fishing village", "An uninhabited forest"], 1, "Housing, roads, businesses and services expanded."),
        makeQuestion("Which resource-location pair is correct?", "Fertile agricultural land - farming settlement", ["Mineral deposits - fishing settlement", "Forests - mining settlement", "Coastline - forestry settlement"], 3, "Match the resource to the livelihood it supports."),
        makeQuestion("Which resource most directly explains the location of a mining settlement?", "Mineral deposits", ["Sports grounds", "Office blocks", "Coastlines"], 0, "Mining extracts valuable material from the earth."),
        makeQuestion("Which resource most directly explains the location of a forestry settlement?", "Forests", ["Mineral deposits", "Large shopping centres", "Deep harbours only"], 2, "The settlement depends on wood."),
        makeQuestion("Which resource most directly explains the location of a fishing settlement?", "A coastline or large lake", ["A gold mine", "A paper mill", "A dry inland plateau"], 1, "The livelihood requires access to fish-bearing water."),
        makeQuestion("Why are satellite images and aerial photographs useful in settlement studies?", "They show patterns, land use and visible features from above", ["They reveal every resident's thoughts", "They replace all fieldwork", "They show only political borders"], 3, "The above view makes spatial arrangements visible."),
        makeQuestion("What are many rural livelihoods closely linked to?", "The land and natural environment", ["Only international airports", "Only urban offices", "Only shopping centres"], 0, "Farming, mining, forestry and fishing rely on local resources."),
        makeQuestion("Where are buildings commonly placed on an individual farm?", "Near the family's fields", ["Only in a distant city", "Inside a paper mill", "At the centre of every village"], 2, "The home and farm structures serve the surrounding land."),
        makeQuestion("What is the main difference between a satellite image and an aerial photograph?", "A satellite image comes from space; an aerial photograph comes from an aeroplane", ["Only aerial photographs show land", "Satellite images are always drawings", "There is no difference"], 1, "Focus on where each image is captured."),
        makeQuestion("What chiefly influences a rural settlement's location and main occupation?", "The physical environment and available resources", ["The colour of its roofs", "The number of sports teams", "The age of its roads only"], 3, "Resources make particular livelihoods possible."),
    ];

    const definitions = [
        { q: "Settlement", a: "A place where people live." },
        { q: "Rural settlement", a: "A smaller settlement, usually outside large towns and cities, with fewer buildings and roads and livelihoods linked to land or natural resources." },
        { q: "Urban settlement", a: "A larger settlement with many buildings, roads and people, including towns and cities." },
        { q: "Residential land use", a: "Urban land used for housing, such as houses and flats." },
        { q: "Industrial land use", a: "Urban land used by factories and industries to make or process goods." },
        { q: "Business land use", a: "Urban land used for shops, offices and other commercial activities." },
        { q: "Recreational land use", a: "Urban land used for leisure, parks and sports." },
        { q: "Satellite image", a: "An image of Earth's surface captured by a satellite in space." },
        { q: "Aerial photograph", a: "A photograph of the ground taken from an aeroplane." },
        { q: "Settlement pattern", a: "The visible arrangement of buildings, roads and open land in a settlement." },
        { q: "Farming settlement", a: "A rural settlement where producing food from the land is the main occupation." },
        { q: "Individual farm", a: "A farm where a family lives separately, with its house and buildings near its fields." },
        { q: "Farming village", a: "A rural settlement where houses are grouped together and fields or grazing land surround them." },
        { q: "Dispersed pattern", a: "A settlement pattern in which homes or farmsteads are spread apart." },
        { q: "Concentrated pattern", a: "A settlement pattern in which houses are grouped close together." },
        { q: "Mining settlement", a: "A settlement that develops where valuable minerals are found and mining provides work." },
        { q: "Forestry settlement", a: "A settlement whose livelihoods are linked to planting, managing or processing forests for wood." },
        { q: "Fishing settlement", a: "A settlement near a coast or large lake where people catch or process fish." },
        { q: "Livelihood", a: "The work or activity through which people support themselves and earn a living." },
        { q: "Natural resource", a: "A useful material or feature from nature, such as fertile land, minerals, forests or fish." },
    ];

    const terms = [
        { q: "A place where people live, ranging from a few houses to a city.", a: "Settlement" },
        { q: "Smaller place with fewer buildings and roads, usually linked to land-based work.", a: "Rural settlement" },
        { q: "Large place with many people, buildings, roads and services.", a: "Urban settlement" },
        { q: "Land-use zone containing houses and flats.", a: "Residential" },
        { q: "Land-use zone containing factories.", a: "Industrial" },
        { q: "Land-use zone containing shops and offices.", a: "Business" },
        { q: "Land-use zone containing parks and sports grounds.", a: "Recreational" },
        { q: "Object in space used to capture an image of Earth's surface.", a: "Satellite" },
        { q: "Above-ground image captured from space.", a: "Satellite image" },
        { q: "Ground photograph captured from an aeroplane.", a: "Aerial photograph" },
        { q: "A single family home and farm buildings separated from other farms.", a: "Isolated farmstead" },
        { q: "One of the rural settlement types listed with isolated farmsteads and villages.", a: "Hamlet" },
        { q: "Rural settlement with a group of houses.", a: "Village" },
        { q: "Economic activity that produces food from land.", a: "Farming" },
        { q: "Separate family farm with buildings near fields.", a: "Individual farm" },
        { q: "Grouped houses surrounded by fields and grazing land.", a: "Farming village" },
        { q: "Settlement activity based on valuable minerals.", a: "Mining" },
        { q: "Activity involving planting and managing forests for wood.", a: "Forestry" },
        { q: "Activity based on catching and processing fish.", a: "Fishing" },
        { q: "South African city that began as a mining settlement in the 1880s.", a: "Johannesburg" },
    ];

    const trueFalse = [
        { q: "Settlements vary in size, population and function.", options: ["True", "False"], a: "True", exp: "These are three important ways of comparing settlements." },
        { q: "All settlements have the same number of people.", options: ["True", "False"], a: "False", exp: "A settlement may range from a few houses to a large city." },
        { q: "Rural settlements usually have fewer roads and buildings than urban settlements.", options: ["True", "False"], a: "True", exp: "They are generally smaller and less built-up." },
        { q: "Factories are a form of residential land use.", options: ["True", "False"], a: "False", exp: "Factories are industrial land use." },
        { q: "Parks and sports areas are recreational land use.", options: ["True", "False"], a: "True", exp: "They are used for leisure and recreation." },
        { q: "A satellite image is taken from an aeroplane.", options: ["True", "False"], a: "False", exp: "A satellite image is captured from space; an aerial photograph is taken from an aeroplane." },
        { q: "Aerial photographs can show roads, buildings and open land.", options: ["True", "False"], a: "True", exp: "Their above view helps learners identify settlement features." },
        { q: "Rivers, coastlines and vegetation are natural features.", options: ["True", "False"], a: "True", exp: "They belong to the physical environment." },
        { q: "Villages and farms are examples of rural settlements.", options: ["True", "False"], a: "True", exp: "Both occur outside major urban centres." },
        { q: "The presentation states that four out of ten South Africans live in rural areas.", options: ["True", "False"], a: "True", exp: "That figure appears in the rural settlements section." },
        { q: "Individual farms usually form a concentrated pattern.", options: ["True", "False"], a: "False", exp: "Separate individual farms form a dispersed pattern." },
        { q: "Farming villages usually have grouped houses.", options: ["True", "False"], a: "True", exp: "Their houses are concentrated, with fields or grazing around them." },
        { q: "Mining settlements develop without any connection to mineral resources.", options: ["True", "False"], a: "False", exp: "They develop where valuable minerals are found." },
        { q: "A mine can attract workers and lead to new housing and services.", options: ["True", "False"], a: "True", exp: "A mining settlement may grow into a town or city." },
        { q: "Forestry supplies wood for building, paper and fuel.", options: ["True", "False"], a: "True", exp: "These uses of wood are named in the presentation." },
        { q: "Fishing settlements require access to water.", options: ["True", "False"], a: "True", exp: "They are commonly found along coasts or beside large lakes." },
        { q: "A rural settlement can never become urban.", options: ["True", "False"], a: "False", exp: "Jobs, transport and services can cause a rural settlement to grow." },
        { q: "Johannesburg began as a mining settlement in the 1880s.", options: ["True", "False"], a: "True", exp: "Mining attracted workers and other economic activities." },
        { q: "Forests are most directly linked to fishing settlements.", options: ["True", "False"], a: "False", exp: "Forests support forestry settlements; coasts and lakes support fishing." },
        { q: "The physical environment influences where rural settlements develop.", options: ["True", "False"], a: "True", exp: "Available resources shape settlement location and occupation." },
    ];

    const toSpinQuestion = ({ q, options, a }) => ({ q, options, a: options[a], exp: options[a] + "." });

    const jeopardy = [
        { name: "Settlement Basics", questions: [
            { points: 10, q: "What is a settlement?", a: "A place where people live." },
            { points: 20, q: "Name the three features by which settlements can vary.", a: "Size, population and function." },
            { points: 30, q: "Give two differences between rural and urban settlements.", a: "Rural settlements are smaller with fewer buildings and roads; urban settlements are larger with more buildings, roads and people." },
            { points: 40, q: "Name the four urban land-use categories shown in the presentation.", a: "Residential, business, industrial and recreational." },
            { points: 50, q: "Explain why settlement function is useful when classifying a place.", a: "Function identifies the main purpose or work of a settlement, such as farming, mining, forestry or fishing." },
        ]},
        { name: "Images and Land Use", questions: [
            { points: 10, q: "What is a satellite image?", a: "An image of Earth's surface captured by a satellite in space." },
            { points: 20, q: "What is an aerial photograph?", a: "A photograph taken from an aeroplane." },
            { points: 30, q: "Name four human features that can be identified on an aerial photograph.", a: "Any four of roads, houses, factories, shops, offices, parks and sports grounds." },
            { points: 40, q: "Name three natural features that may be visible from above.", a: "Rivers, coastlines and vegetation." },
            { points: 50, q: "How do satellite images and aerial photographs help geographers understand settlements?", a: "They reveal settlement patterns, transport routes, buildings, open land, land use and natural features from above." },
        ]},
        { name: "Rural Types and Patterns", questions: [
            { points: 10, q: "Name the four rural settlement types based on economic activity.", a: "Farming, mining, forestry and fishing settlements." },
            { points: 20, q: "What is the usual pattern of individual farms?", a: "A dispersed pattern, with families living on separate farms." },
            { points: 30, q: "Describe the layout of a farming village.", a: "Houses are grouped together, with fields, grazing land and sometimes pens or homesteads around them." },
            { points: 40, q: "Why are forestry and fishing settlements found in different environments?", a: "Forestry needs forests and wood-processing work, while fishing needs access to coasts or large lakes." },
            { points: 50, q: "Explain how natural resources connect all four rural settlement types.", a: "Farming uses fertile land, mining uses minerals, forestry uses forests and fishing uses fish from coasts or lakes." },
        ]},
        { name: "Settlement Change", questions: [
            { points: 10, q: "Which South African city began as a mining settlement in the 1880s?", a: "Johannesburg." },
            { points: 20, q: "What happens near a newly opened mine?", a: "Workers settle nearby, and houses, services and related economic activities develop." },
            { points: 30, q: "Name three developments that can attract people and help a rural settlement grow.", a: "Jobs, transport and services." },
            { points: 40, q: "Describe Johannesburg's change from its beginning to the present form named in the presentation.", a: "It began as a mining settlement and grew into one of South Africa's largest urban settlements." },
            { points: 50, q: "Explain how the physical environment can shape both a settlement's location and its growth.", a: "Resources attract particular work and people; increasing jobs, transport, housing and services can then expand the settlement." },
        ]},
    ];

    const matchingPairs = {
        topic1: [
            ["Settlement", "A place where people live."], ["Rural Settlement", "Smaller place with fewer buildings and roads."], ["Urban Settlement", "Larger place with many buildings, roads and people."], ["Population", "Number of people living in a place."], ["Function", "Main purpose or activity of a settlement."], ["Natural Environment", "Land, water, vegetation and other physical surroundings."], ["Village", "Grouped rural settlement."], ["Isolated Farmstead", "Single farm home separated from other homes."], ["Hamlet", "Small type of rural settlement."], ["Livelihood", "Work through which people support themselves."],
        ],
        topic2: [
            ["Satellite", "Object in space that captures images of Earth."], ["Satellite Image", "View of Earth's surface captured from space."], ["Aerial Photograph", "Ground photograph taken from an aeroplane."], ["Transport Routes", "Roads and other visible lines connecting places."], ["Residential", "Houses and flats."], ["Industrial", "Factories and industries."], ["Business", "Shops and offices."], ["Recreational", "Parks and sports grounds."], ["River", "Natural water feature visible from above."], ["Vegetation", "Natural plant cover visible on images."],
        ],
        topic3: [
            ["Farming", "Producing food from the land."], ["Individual Farm", "Separate family farm with buildings near fields."], ["Farming Village", "Grouped houses surrounded by farmland."], ["Dispersed Pattern", "Homes spread apart."], ["Concentrated Pattern", "Homes grouped close together."], ["Mining", "Work based on extracting valuable minerals."], ["Forestry", "Planting and managing forests for wood."], ["Fishing", "Catching and processing fish."], ["Sawmill", "Workplace that processes wood."], ["Paper Mill", "Workplace that turns wood material into paper."],
        ],
        topic4: [
            ["Johannesburg", "City that began as a mining settlement."], ["1880s", "Period when Johannesburg's mining settlement began."], ["Fertile Land", "Resource supporting farming settlements."], ["Mineral Deposits", "Resource supporting mining settlements."], ["Forests", "Resource supporting forestry settlements."], ["Coasts and Lakes", "Locations supporting fishing settlements."], ["Jobs", "Opportunities that attract people."], ["Transport", "Connections that help a settlement grow."], ["Services", "Facilities that develop as population increases."], ["Urban Growth", "Change from a small rural place into a larger town or city."],
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

    window.RuralSettlementsData = {
        spin: {
            definitions,
            terms,
            multipleChoice: [0, 2, 4, 5, 6, 7, 8, 9, 11, 14, 15, 17, 18, 20, 22, 24, 25, 27, 29, 39].map((index) => toSpinQuestion(quizPool[index])),
            trueFalse,
        },
        jeopardy,
        match: Object.fromEntries(Object.entries(matchingPairs).map(([key, pairs]) => [key, makeCards(pairs)])),
        millionaire: quizPool.slice(0, 30),
        snake: {
            game1: quizPool.slice(0, 10),
            game2: quizPool.slice(10, 20),
            game3: quizPool.slice(20, 30),
            game4: quizPool.slice(30, 40),
        },
        drag,
    };
})();
