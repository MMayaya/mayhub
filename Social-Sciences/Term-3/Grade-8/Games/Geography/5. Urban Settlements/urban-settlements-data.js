(function () {
    "use strict";

    const makeQuestion = (q, answer, distractors, slot, hint) => {
        const options = distractors.slice(0, 3);
        options.splice(slot, 0, answer);
        return { q, options, a: slot, hint };
    };

    const quizPool = [
        makeQuestion("Which places are urban settlements?", "Towns and cities", ["Farms and forests", "Only mining camps", "Rivers and coastlines"], 0, "The presentation names two common urban settlement forms."),
        makeQuestion("What do urban settlements contain?", "Large numbers of people who live and work there", ["Only farmers", "No services", "Only industrial buildings"], 2, "Urban places combine homes and many kinds of work."),
        makeQuestion("Where do most urban residents work?", "In offices, shops, factories, services or street trading", ["Only on farms", "Only in forests", "Only on fishing boats"], 1, "Urban employment is varied."),
        makeQuestion("What happens as a settlement grows?", "More people, jobs, buildings and services develop", ["Every function disappears", "All buildings become farms", "Transport stops completely"], 3, "Growth makes a settlement more complex."),
        makeQuestion("Why are similar urban buildings often grouped together?", "They perform similar functions", ["They always have the same owner", "They were built on one day", "They all contain homes"], 0, "Function shapes the appearance of each area."),
        makeQuestion("What is land use?", "The different ways in which land is used", ["The number of residents in a city", "The height of every building", "The distance from a town to a farm"], 2, "This is the presentation's key-term definition."),
        makeQuestion("What is a land-use zone?", "A separate area mainly used for a particular purpose", ["A rural settlement outside a city", "A single building with many floors", "Any road in an urban area"], 1, "A zone has a recognisable function."),
        makeQuestion("Why does studying land use help geographers?", "It helps them understand the structure of an urban settlement", ["It gives the age of every resident", "It measures rainfall only", "It identifies every vehicle"], 3, "Land use explains how city parts fit together."),
        makeQuestion("Which area is mainly residential?", "An area containing many houses and flats", ["An area containing factories", "An area containing taxi ranks", "An area containing only shops"], 0, "Residential means used for housing."),
        makeQuestion("Which area is mainly industrial?", "An area containing factories", ["An area containing houses", "An area containing parks", "An area containing government offices"], 2, "Industry involves manufacturing and processing."),
        makeQuestion("Which area is mainly used for business?", "An area containing shops and offices", ["An area containing sports fields", "An area containing only houses", "An area containing refineries"], 1, "Buying, selling and office work happen here."),
        makeQuestion("What does CBD stand for?", "Central Business District", ["City Building Department", "Central Bus Division", "Community Business Development"], 3, "It is the main central business area."),
        makeQuestion("Where is the CBD usually located?", "Near the centre of an urban settlement", ["Only beyond the suburbs", "Inside a rural farming area", "Beside every heavy industry"], 0, "The word central is a clue."),
        makeQuestion("Why are CBD streets often busy?", "Many people travel there for work, shopping and services", ["No one lives or works nearby", "All factories are inside every CBD", "Only tourists may enter"], 2, "The CBD attracts many daily journeys."),
        makeQuestion("Which transport facilities may be found in a CBD?", "Taxi ranks, train stations and bus stations", ["Only airports", "Only farm tracks", "Sawmills and paper mills"], 1, "These facilities move many people into and out of the centre."),
        makeQuestion("Which additional function can the CBD perform?", "Government and administration", ["Forestry", "Fishing", "Crop farming"], 3, "Government buildings are often in or near the CBD."),
        makeQuestion("What is an industrial zone?", "An area where factories and industrial activities are concentrated", ["An area of houses only", "An area used only for sport", "A shopping centre car park"], 0, "Similar manufacturing activities are grouped here."),
        makeQuestion("Which feature best describes light industry?", "Smaller buildings and less heavy machinery", ["Large areas and bulky raw materials", "Only open-air recreation", "Houses with large gardens"], 2, "Compare it with heavy industry."),
        makeQuestion("Which is an example of light industry?", "Food processing", ["Oil refining", "Cement production", "Iron and steel production"], 1, "The slide also lists electrical work, packaging and clothing."),
        makeQuestion("Which is another example of light industry?", "Clothing manufacture", ["Cement manufacture", "Oil refining", "Iron smelting"], 3, "This type usually needs smaller buildings."),
        makeQuestion("Which feature best describes heavy industry?", "Large buildings, heavy machinery and bulky raw materials", ["Small shops and offices", "Houses and flats", "Parks and sports fields"], 0, "It uses more space and physically heavy resources."),
        makeQuestion("Which is an example of heavy industry?", "Oil refinery", ["Clothing factory", "Packaging plant", "Small electrical workshop"], 2, "The presentation also names cement and iron and steel."),
        makeQuestion("Which is another example of heavy industry?", "Cement factory", ["Food-processing plant", "Clothing factory", "Shopping centre"], 1, "This industry uses bulky raw materials and large facilities."),
        makeQuestion("How do light and heavy industry mainly differ?", "Building size, machinery and raw materials", ["The language workers speak", "The city's rainfall", "The number of parks nearby"], 3, "These three physical requirements are compared directly."),
        makeQuestion("What is a residential area?", "An area where people live", ["An area where minerals are mined", "A city-centre transport hub", "An area used only for factories"], 0, "This is the key-term definition."),
        makeQuestion("What proportion of land is often residential in cities?", "The largest proportion", ["No land", "Only the smallest street", "Exactly half in every city"], 2, "Housing commonly occupies more city land than any other use."),
        makeQuestion("Why do residential areas not all look the same?", "People live where they can afford to buy or rent", ["All houses must be identical", "Factories decide every house size", "Every suburb has the same income"], 1, "Income affects housing type and space."),
        makeQuestion("What generally characterises high-income residential areas?", "Larger houses and gardens", ["Only factories", "Smaller houses and gardens", "No services or roads"], 3, "Compare these areas with low-income housing."),
        makeQuestion("What generally characterises low-income residential areas?", "Smaller houses and gardens", ["Large office towers", "Oil refineries", "Only shopping centres"], 0, "These areas may also become crowded."),
        makeQuestion("What may happen in some low-income residential areas?", "They may become crowded", ["They become CBDs automatically", "They contain no residents", "They turn into forests"], 2, "Population and limited space can affect density."),
        makeQuestion("What is a suburb?", "A residential area away from the centre of an urban area", ["A factory at the CBD", "A rural fishing settlement", "A government office"], 1, "Residents often travel from it to work and services."),
        makeQuestion("Why do many suburb residents travel to other city areas?", "For work, business and services", ["To avoid all transport", "To mine minerals", "To manage forests"], 3, "Suburbs are mainly residential."),
        makeQuestion("Where are shopping centres common?", "In many middle- and high-income suburbs", ["Only in mining settlements", "Only in heavy-industrial zones", "Only at rubbish dumps"], 0, "The presentation links them to particular suburbs."),
        makeQuestion("What does a shopping centre provide?", "Many shops and services in one place", ["Only government administration", "Only factory machinery", "Only housing"], 2, "It lets residents obtain goods locally."),
        makeQuestion("Why is land left around many shopping centres?", "For cars, taxis and other transport", ["For heavy-industry raw materials", "For crop farming", "For forest planting"], 1, "Think about access and parking."),
        makeQuestion("How can shopping centres reduce travel to the CBD?", "Residents can obtain goods and services closer to home", ["They close all suburban roads", "They replace every workplace", "They move the CBD into a factory"], 3, "Local access reduces the need for central-city trips."),
        makeQuestion("What are services?", "Jobs people perform for other people", ["Only manufactured goods", "Areas where people live", "Natural resources under the ground"], 0, "This is the presentation's service definition."),
        makeQuestion("Which person provides an urban service?", "A plumber", ["A mineral deposit", "A residential building", "A sports field"], 2, "The presentation also gives mechanics and taxi drivers."),
        makeQuestion("Which is a municipal service facility?", "Water treatment works", ["A private garden", "A clothing factory", "A high-income house"], 1, "Municipalities also provide rubbish dumps and transport centres."),
        makeQuestion("What is the main purpose of service and transport areas?", "To help the urban settlement operate effectively", ["To grow crops", "To extract minerals", "To remove all movement"], 3, "They support everyday city functioning."),
        makeQuestion("What do transport centres do?", "Move people between different parts of the city", ["Manufacture steel", "Provide residential housing", "Plant forests"], 0, "They connect urban areas."),
        makeQuestion("Why is some urban land set aside for recreation?", "So people can relax, exercise, play sport or enjoy entertainment", ["To refine oil", "To process raw materials", "To contain only offices"], 2, "Recreation serves leisure and well-being."),
        makeQuestion("Which is an example of recreational land use?", "A sports stadium", ["A cement factory", "A taxi rank", "A block of flats"], 1, "The presentation also lists parks, zoos and sports fields."),
        makeQuestion("Which functional-area pairing is correct?", "CBD - business and administration", ["Industrial zone - housing", "Residential zone - manufacturing", "Recreation zone - municipal waste"], 3, "Match each zone to its main urban function."),
        makeQuestion("Which functional-area pairing is correct?", "Industrial zone - manufacturing", ["CBD - fishing", "Residential zone - oil refining", "Shopping centre - forestry"], 0, "Factories produce or process goods."),
        makeQuestion("Which functional-area pairing is correct?", "Residential zone - housing", ["Service area - crop farming", "Recreation zone - heavy machinery", "CBD - forestry"], 2, "Residential areas are where people live."),
        makeQuestion("Why do cities develop identifiable land-use zones?", "Different activities need different land and buildings, so similar functions group together", ["Every activity needs identical space", "All buildings are randomly arranged", "Cities contain only one function"], 1, "Factories, housing and business have different requirements."),
        makeQuestion("How do urban settlements differ from rural settlements?", "They have a greater variety of buildings, jobs and land-use zones", ["They rely only on natural resources", "They contain no housing", "They have fewer functions"], 3, "The conclusion compares the two settlement types."),
    ];

    const definitions = [
        { q: "Urban settlement", a: "A town or city containing many people who live and work there." },
        { q: "Land use", a: "The different ways in which land is used." },
        { q: "Land-use zone", a: "A separate part of an urban settlement where land is mainly used for a particular purpose or function." },
        { q: "Central Business District (CBD)", a: "The important business area, usually near the centre of an urban settlement, containing many shops and offices." },
        { q: "Business land use", a: "Land used for commercial activities such as shops and offices." },
        { q: "Administrative function", a: "The work of government and management carried out in an urban area." },
        { q: "Industrial zone", a: "An area where factories and other industrial activities are concentrated." },
        { q: "Light industry", a: "Industry using smaller buildings, less heavy machinery and fewer bulky raw materials." },
        { q: "Heavy industry", a: "Industry using large buildings or land areas, heavy machinery and bulky raw materials." },
        { q: "Manufacturing", a: "The making or processing of goods in industrial areas." },
        { q: "Residential area", a: "An area where people live." },
        { q: "High-income residential area", a: "A housing area that generally contains larger houses and gardens." },
        { q: "Low-income residential area", a: "A housing area that commonly contains smaller houses and gardens and may become crowded." },
        { q: "Suburb", a: "A residential area located away from the centre of an urban area." },
        { q: "Shopping centre", a: "A place containing many different shops and services together." },
        { q: "Service", a: "A job or task that a person performs for other people." },
        { q: "Municipal service", a: "A public facility or activity supplied by a municipality to help a settlement function." },
        { q: "Transport centre", a: "A facility that helps move people into, out of or between parts of an urban settlement." },
        { q: "Recreational area", a: "Urban land set aside for relaxation, exercise, sport or entertainment." },
        { q: "Functional area", a: "A part of an urban settlement that performs a particular main purpose." },
    ];

    const terms = [
        { q: "Town or city containing large numbers of people who live and work there.", a: "Urban settlement" },
        { q: "The different ways in which land is used.", a: "Land use" },
        { q: "Separate city area mainly used for one purpose.", a: "Land-use zone" },
        { q: "Main business area usually near the centre of a city.", a: "CBD" },
        { q: "Full name represented by the letters CBD.", a: "Central Business District" },
        { q: "Urban function performed by shops and offices.", a: "Business" },
        { q: "Urban function performed by government buildings.", a: "Administration" },
        { q: "Facilities such as taxi ranks, train stations and bus stations.", a: "Transport centres" },
        { q: "Area where factories are concentrated.", a: "Industrial zone" },
        { q: "Industry using smaller buildings and less heavy machinery.", a: "Light industry" },
        { q: "Industry using large buildings, heavy machinery and bulky raw materials.", a: "Heavy industry" },
        { q: "Light industry that prepares food products.", a: "Food processing" },
        { q: "Heavy industry that processes petroleum.", a: "Oil refinery" },
        { q: "Urban area containing houses, flats and accommodation.", a: "Residential area" },
        { q: "Residential area away from the urban centre.", a: "Suburb" },
        { q: "Place containing many shops and services in one location.", a: "Shopping centre" },
        { q: "Jobs performed for other people.", a: "Services" },
        { q: "Facility that cleans water for public use.", a: "Water treatment works" },
        { q: "Land used for parks, stadiums, zoos and sports fields.", a: "Recreational land" },
        { q: "Grouping that results when activities with similar functions locate together.", a: "Land-use zone" },
    ];

    const trueFalse = [
        { q: "Towns and cities are urban settlements.", options: ["True", "False"], a: "True", exp: "They contain many people who live and work there." },
        { q: "Most urban residents work only on farms.", options: ["True", "False"], a: "False", exp: "Urban work includes offices, shops, factories, services and street trading." },
        { q: "As settlements grow, their buildings, jobs and services may become more varied.", options: ["True", "False"], a: "True", exp: "Growth makes settlements more complex." },
        { q: "Land use means the number of people living in a city.", options: ["True", "False"], a: "False", exp: "Land use means the different ways land is used." },
        { q: "Similar urban activities are often grouped into zones.", options: ["True", "False"], a: "True", exp: "Grouping creates identifiable functional areas." },
        { q: "Factories are usually concentrated in an industrial zone.", options: ["True", "False"], a: "True", exp: "Industrial zones contain factories and industrial activities." },
        { q: "The CBD is usually near the centre of an urban settlement.", options: ["True", "False"], a: "True", exp: "Central Business District describes its usual location and function." },
        { q: "CBDs may contain taxi ranks, train stations and bus stations.", options: ["True", "False"], a: "True", exp: "Many people need transport into and out of the centre." },
        { q: "Government buildings are never located near the CBD.", options: ["True", "False"], a: "False", exp: "Important government buildings are often in or near it." },
        { q: "Light industry normally uses more bulky raw materials than heavy industry.", options: ["True", "False"], a: "False", exp: "Heavy industry uses heavy machinery and bulky raw materials." },
        { q: "Clothing and packaging factories are examples of light industry.", options: ["True", "False"], a: "True", exp: "They generally occupy smaller buildings." },
        { q: "Oil refineries and cement factories are examples of heavy industry.", options: ["True", "False"], a: "True", exp: "They need large areas, machinery and raw materials." },
        { q: "Residential areas contain houses, flats and other accommodation.", options: ["True", "False"], a: "True", exp: "Their main function is housing." },
        { q: "All residential areas look exactly the same.", options: ["True", "False"], a: "False", exp: "Income and affordability influence housing and garden size." },
        { q: "High-income residential areas generally have larger houses and gardens.", options: ["True", "False"], a: "True", exp: "Low-income areas commonly have smaller houses and gardens." },
        { q: "A suburb is a residential area away from the urban centre.", options: ["True", "False"], a: "True", exp: "Residents often travel elsewhere for work and services." },
        { q: "Shopping centres can reduce the need for residents to travel to the CBD.", options: ["True", "False"], a: "True", exp: "They provide shops and services closer to suburban homes." },
        { q: "Plumbers, car mechanics and taxi drivers provide services.", options: ["True", "False"], a: "True", exp: "Services are jobs performed for other people." },
        { q: "Parks, zoos and sports fields are recreational land uses.", options: ["True", "False"], a: "True", exp: "They support leisure, exercise and entertainment." },
        { q: "Different urban activities always need identical land and buildings.", options: ["True", "False"], a: "False", exp: "Their different requirements help create land-use zones." },
    ];

    const toSpinQuestion = ({ q, options, a }) => ({ q, options, a: options[a], exp: options[a] + "." });

    const jeopardy = [
        { name: "Urban Basics and Land Use", questions: [
            { points: 10, q: "What types of settlements are towns and cities?", a: "Urban settlements." },
            { points: 20, q: "Define land use.", a: "The different ways in which land is used." },
            { points: 30, q: "What is a land-use zone?", a: "A separate urban area where land is mainly used for a particular purpose or function." },
            { points: 40, q: "Give four types of work commonly found in urban settlements.", a: "Any four of office work, shops, factories, services, transport and street trading." },
            { points: 50, q: "Explain how buildings can reveal an area's land use.", a: "Housing indicates residential use, factories indicate industry, and shops or offices indicate business activity." },
        ]},
        { name: "CBD and Industry", questions: [
            { points: 10, q: "What does CBD stand for?", a: "Central Business District." },
            { points: 20, q: "Name two main CBD functions.", a: "Business and administration; it is also an important transport centre." },
            { points: 30, q: "Give three examples of light industry.", a: "Any three of electrical industries, food processing, packaging and clothing factories." },
            { points: 40, q: "Give three examples of heavy industry.", a: "Oil refining, cement production, and iron and steel industries." },
            { points: 50, q: "Differentiate between light and heavy industry.", a: "Light industry uses smaller buildings and less heavy machinery or bulky material; heavy industry uses large areas, heavy machinery and bulky raw materials." },
        ]},
        { name: "Homes and Shopping", questions: [
            { points: 10, q: "Define a residential area.", a: "An area where people live." },
            { points: 20, q: "What is a suburb?", a: "A residential area away from the centre of an urban area." },
            { points: 30, q: "How do high- and low-income residential areas generally differ?", a: "High-income areas generally have larger houses and gardens; low-income areas commonly have smaller houses and gardens and may be crowded." },
            { points: 40, q: "Why is land left around many shopping centres?", a: "For cars, taxis and other transport, including access and parking." },
            { points: 50, q: "How do suburban shopping centres change residents' journeys?", a: "They provide goods and services near homes, so residents do not always need to travel to the CBD." },
        ]},
        { name: "Services, Recreation and Zones", questions: [
            { points: 10, q: "What are services?", a: "Jobs that people perform for other people." },
            { points: 20, q: "Give three municipal service facilities.", a: "Rubbish dumps, water treatment works and transport centres." },
            { points: 30, q: "Give four examples of recreational land use.", a: "Parks, sports stadiums, zoos and sports fields." },
            { points: 40, q: "Match three urban zones to their functions.", a: "For example: CBD - business/administration; industrial - manufacturing; residential - housing; recreation - leisure/sport." },
            { points: 50, q: "Why do different parts of a city develop into different land-use zones?", a: "Activities require different land, buildings and access, so similar functions group together in identifiable areas." },
        ]},
    ];

    const matchingPairs = {
        topic1: [
            ["Urban Settlement", "Town or city where many people live and work."], ["Land Use", "Different ways in which land is used."], ["Land-Use Zone", "Separate area mainly used for one purpose."], ["Function", "Main purpose performed by an urban area."], ["Residential", "Land used for housing."], ["Business", "Land used for shops and offices."], ["Industrial", "Land used for factories and manufacturing."], ["Recreational", "Land used for leisure and sport."], ["Urban Growth", "Increase in people, jobs, buildings and services."], ["Functional Area", "Part of a city with a particular main purpose."],
        ],
        topic2: [
            ["CBD", "Business area usually near the city centre."], ["Shops and Offices", "Common buildings in a CBD."], ["Taxi Rank", "Road-transport centre for passengers."], ["Train Station", "Rail-transport centre for passengers."], ["Government Buildings", "Structures supporting administration."], ["Industrial Zone", "Area where factories are concentrated."], ["Light Industry", "Uses smaller buildings and less heavy machinery."], ["Heavy Industry", "Uses large buildings, machinery and bulky materials."], ["Food Processing", "Example of light industry."], ["Oil Refinery", "Example of heavy industry."],
        ],
        topic3: [
            ["Residential Area", "Area where people live."], ["High-Income Area", "Generally has larger houses and gardens."], ["Low-Income Area", "Commonly has smaller houses and gardens."], ["Crowding", "Possible condition in some low-income areas."], ["Suburb", "Residential area away from the urban centre."], ["Commuting", "Travelling to other city areas for work or services."], ["Shopping Centre", "Many shops and services in one place."], ["Parking Area", "Land around shops for cars and transport."], ["Goods", "Items residents obtain from shops."], ["Local Services", "Facilities that reduce journeys to the CBD."],
        ],
        topic4: [
            ["Service", "Job performed for another person."], ["Car Mechanic", "Person who repairs vehicles."], ["Plumber", "Person who works with water pipes."], ["Taxi Driver", "Person providing passenger transport."], ["Rubbish Dump", "Municipal waste facility."], ["Water Treatment Works", "Municipal facility that cleans water."], ["Transport Centre", "Facility that moves people between city areas."], ["Park", "Open recreational area."], ["Sports Stadium", "Venue for organised sport and spectators."], ["Zoo", "Recreational place where people view animals."],
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

    window.UrbanSettlementsData = {
        spin: {
            definitions,
            terms,
            multipleChoice: [0, 3, 4, 5, 6, 8, 11, 12, 14, 16, 17, 18, 20, 21, 24, 27, 30, 33, 36, 46].map((index) => toSpinQuestion(quizPool[index])),
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
