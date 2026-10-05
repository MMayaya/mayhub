/* Grade 8 Social Sciences Geography, Term 4, Week 6: People and Transport in Urban Areas. */
(function (global) {
    'use strict';

    const concepts = [
        ['Road transport', 'Movement of people or goods on roads using vehicles such as cars, buses and trucks.'],
        ['Specialised road vehicle', 'A road vehicle designed for particular cargo, such as fuel or chilled food.'],
        ['Rail transport', 'Movement of people or goods by train along fixed railway lines.'],
        ['Bulky goods', 'Large, heavy loads such as coal, cement or iron ore.'],
        ['Door-to-door delivery', 'Taking goods directly from their starting place to their destination.'],
        ['Transport network', 'The various transport routes that join different places together.'],
        ['Integrated transport', 'Different transport modes connected so a journey can move easily between them.'],
        ['Integrated ticketing', 'A system that lets one ticket be used across different transport modes.'],
        ['Bus Rapid Transit (BRT)', 'An urban bus system designed to move many passengers quickly, often using dedicated lanes.'],
        ['Transit', 'Carrying people or goods from one place to another.'],
        ['Private transport', 'Transport owned and used by individuals.'],
        ['Public transport', 'Transport that carries members of the public.'],
        ['Minibus taxi', 'A usually privately owned vehicle that carries members of the public.'],
        ['Traffic congestion', 'A traffic jam that slows road travel.'],
        ['Rush hour', 'A busy period when many people travel to or from work or school.'],
        ['Air pollution', 'Harmful substances in the air, including emissions from many motor vehicles.'],
        ['Synchronised traffic lights', 'Traffic lights timed to work together to keep vehicles moving.'],
        ['Car-free zone', 'An urban area where ordinary private cars are restricted or not allowed.'],
        ['Park-and-ride', 'Leaving a car at a parking area and completing the journey by public transport.'],
        ['Subsidised public transport', 'Public transport whose operating costs are partly paid by government.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Which is an advantage of road transport for a short journey?', 'Flexible routes and direct delivery', 'It is restricted to fixed railway lines', 'It carries goods only across oceans', 'It cannot reach a market'),
        mc('Which vehicle keeps perishable goods cold on a road journey?', 'A refrigerated truck', 'A petrol tanker', 'A passenger train', 'A cement mixer'),
        mc('Why is rail suitable for coal, cement and iron ore?', 'Trains can carry large quantities of heavy goods', 'Trains are designed only for tiny parcels', 'Rail lines reach every front door', 'Trains travel on ordinary roads'),
        mc('What limits rail transport for some deliveries?', 'Trains must follow fixed lines and may need a road vehicle for the final section', 'Trains can travel to every farm without tracks', 'Trains carry no passengers', 'Rail cannot move bulk goods'),
        mc('Which comparison between road and rail is accurate?', 'Road is flexible for direct delivery; rail suits heavy loads over longer distances', 'Road is fixed to rails; rail is door-to-door', 'Both modes work only at sea', 'Neither can carry passengers'),
        mc('What is a transport network?', 'Different transport routes joining places together', 'Only one vehicle travelling alone', 'A single warehouse of goods', 'Only the roads inside a car park'),
        mc('Why must road, rail and other modes connect well?', 'One journey may use several modes before reaching its destination', 'Every journey uses one mode only', 'Connection always slows travel', 'No goods ever change vehicles'),
        mc('At which levels can transport networks operate?', 'Local, regional, provincial, national and international', 'Only inside one street', 'Only internationally', 'Only at school level'),
        mc('What is integrated transport?', 'Modes working together so passengers can change easily', 'Keeping buses and trains permanently separate', 'Using a different ticket for every stop', 'Replacing all roads with airports'),
        mc('Why might a city choose Bus Rapid Transit instead of building new rail?', 'Buses can be cheaper and more flexible', 'Buses can carry no passengers', 'BRT needs an ocean harbour', 'Rail is always free to build'),
        mc('What is private transport?', 'Transport owned and used by individuals', 'Only transport owned by a government', 'Only trains open to everyone', 'Only a bus with an integrated ticket'),
        mc('How did increased car ownership influence suburbs?', 'People could live farther from work and cities spread outward', 'All homes moved into city centres', 'Roads became unnecessary', 'Every commuter stopped travelling'),
        mc('Why do many people value private cars?', 'They offer flexibility over routes, stops and timing', 'They always avoid congestion', 'They run only on a fixed timetable', 'They are public buses'),
        mc('How can cycling help a crowded city?', 'It can reduce the number of cars on roads', 'It always requires more parking than cars', 'It adds more exhaust emissions', 'It replaces every train'),
        mc('Why can a minibus taxi be called public transport although privately owned?', 'It carries members of the public', 'It is owned by every passenger', 'It never carries paying travellers', 'It moves only goods'),
        mc('Which is an advantage of minibus taxis mentioned in the lesson?', 'They reach some places other systems miss', 'They never become crowded', 'They run only in weekday office hours', 'They cannot stop to collect passengers'),
        mc('Which is a possible disadvantage of minibus taxis?', 'Passengers may wait until a taxi is full', 'They can never reach townships', 'They are always empty', 'They do not carry passengers'),
        mc('Why can transport cost be a serious problem for commuters?', 'Longer journeys and fare increases use a large share of income', 'Travelling never costs money', 'Urbanisation shortens every trip', 'Low-income commuters are never affected'),
        mc('What is one urban effect of many motor vehicle exhaust fumes?', 'Air pollution that can harm health', 'Cleaner air in every street', 'The end of all traffic', 'An increase in rail capacity'),
        mc('What are two major causes of traffic congestion in the lesson?', 'Too many cars and inefficient traffic systems', 'Only bicycles and trains', 'Too few roads and no commuters anywhere', 'Only refrigerated trucks')
    ];

    const extraChoice = [
        mc('Which two respiratory illnesses are linked to polluted air in the lesson?', 'Asthma and bronchitis', 'Broken bones and tooth decay', 'Malaria and measles', 'Dehydration and sunburn'),
        mc('When does rush hour usually make roads especially busy?', 'When many people travel to or from work and school', 'Only in the middle of the night', 'Only on empty public holidays', 'Only when trains are full'),
        mc('How can synchronised traffic lights improve flow?', 'They change in a coordinated sequence so vehicles stop less often', 'They all turn red permanently', 'They remove every intersection', 'They close roads to buses'),
        mc('How can a traffic circle help reduce stops?', 'Vehicles can keep moving while entering traffic gives way', 'Every vehicle must stop at a red light inside it', 'It moves cars underground', 'It is used only by trains'),
        mc('What can a one-way road system do in a busy area?', 'Move more vehicles in the same direction', 'Allow cars to drive in every direction at once', 'Replace all public transport', 'Stop pedestrians using pavements'),
        mc('What is the purpose of car-pool and bus lanes?', 'Encourage more people to travel in fewer vehicles', 'Reserve all roads for one-person cars', 'Make buses join the slowest traffic', 'Carry oil and gas'),
        mc('What is a rapid transit system designed to do?', 'Move large numbers of people quickly around a city', 'Transport only bulk iron ore', 'Replace every walking route', 'Slow all buses at intersections'),
        mc('Why might a bus lane speed up public transport?', 'It separates buses from much ordinary traffic', 'It forces every bus into car queues', 'It is a lane for parked cars', 'It removes all bus stops'),
        mc('How can bicycle lanes encourage urban cycling?', 'They separate cyclists from motor traffic', 'They require riders to use highways with trucks', 'They remove all bicycle parking', 'They make cycling impossible'),
        mc('What is a car-free zone?', 'An area where ordinary private cars are restricted or excluded', 'A road reserved only for cars', 'A car park at a station', 'A highway for fuel tankers'),
        mc('Why might a city restrict cars on alternating registration-number days?', 'To reduce how many cars enter at the same time', 'To increase every traffic jam', 'To replace all buses with cars', 'To keep all streets closed forever'),
        mc('What does subsidising public transport mean?', 'Government helps pay some operating costs', 'Passengers must buy the buses', 'Every ride is automatically free', 'Private cars are paid to enter cities'),
        mc('How does a park-and-ride journey work?', 'Drive to parking, leave the car, then continue by public transport', 'Drive into the city and park at every stop', 'Ride a train first and then buy a car', 'Keep driving the whole journey without parking'),
        mc('Which is a goal of a good future transport network?', 'Affordable, reliable travel with less congestion and pollution', 'Longer delays for every commuter', 'No connections between modes', 'More harmful vehicle emissions'),
        mc('Which advantage does rail have over road traffic congestion?', 'Trains avoid ordinary road queues', 'Trains must wait at every car traffic light', 'Trains always travel on car lanes', 'Rail is restricted to short doorstep deliveries'),
        mc('Why can some electric trains pollute less than many separate road vehicles?', 'Many passengers or goods share one train journey', 'Electric trains burn more petrol at each stop', 'Rail carries only one person', 'The lesson says rail produces no impacts at all'),
        mc('What else might a commuter consider besides the fare?', 'Journey time, comfort and convenience', 'Only the paint colour of the bus', 'Only the number of car parks', 'Only the vehicle’s country of manufacture'),
        mc('Which South African city is named as introducing BRT?', 'Johannesburg', 'Kimberley', 'Sishen', 'Saldanha Bay'),
        mc('Why are minibus taxis useful after normal office hours?', 'They may operate during evenings and weekends', 'They work only before sunrise', 'They cannot reach urban areas', 'They are always owned by the government'),
        mc('What can integrated ticketing let a passenger do?', 'Use one ticket across different transport modes', 'Use a separate ticket for each intersection', 'Travel without any transport route', 'Turn a bus into a train')
    ];

    const trueFalseFacts = [
        ['Road transport can provide flexible routes and direct delivery.', true, 'Road vehicles can take goods directly to many destinations.'],
        ['Rail transport is useful for large passenger numbers and heavy bulk goods.', true, 'Trains can carry many passengers or large loads at once.'],
        ['A transport network connects different routes and places.', true, 'The routes work together like a connected web.'],
        ['Integrated transport makes changing from one mode to another easier.', true, 'Road, rail and rapid transit can connect during one journey.'],
        ['BRT can be more flexible and less costly than building a new railway.', true, 'This is one reason cities may introduce BRT.'],
        ['A minibus taxi can be privately owned while carrying members of the public.', true, 'Ownership and public service describe different aspects.'],
        ['Cycling can help reduce the number of cars on urban roads.', true, 'Cycle lanes can make this alternative safer.'],
        ['Vehicle exhaust can contribute to air pollution and respiratory problems.', true, 'The lesson links polluted air to illnesses including asthma and bronchitis.'],
        ['Synchronised traffic lights are timed to work together.', true, 'Coordination can reduce repeated stopping.'],
        ['Park-and-ride combines a car trip with public transport.', true, 'Commuters park before continuing by another mode.'],
        ['Trains can travel directly to every home without railway lines.', false, 'Rail follows fixed lines and may need road transport for final delivery.'],
        ['Road is the best mode for every heavy long-distance load.', false, 'Rail can be more economical for bulky goods over long distances.'],
        ['A transport network can operate only at national level.', false, 'Networks also operate locally, regionally, provincially and internationally.'],
        ['Integrated ticketing requires a different ticket for every transport mode.', false, 'It can allow one ticket across several modes.'],
        ['Every minibus taxi is government-owned.', false, 'The vehicles are normally privately owned.'],
        ['Growing car use has removed all traffic congestion from cities.', false, 'More vehicles can increase congestion.'],
        ['A cheaper trip is always preferred even if it is much slower.', false, 'Commuters may also value time, comfort and convenience.'],
        ['A traffic circle requires vehicles to stop at traffic lights at every entry.', false, 'It can keep traffic moving while entering vehicles give way.'],
        ['Car-free zones invite more private cars into central areas.', false, 'They restrict or exclude ordinary private cars.'],
        ['A public transport subsidy means commuters alone pay every operating cost.', false, 'Government helps pay part of the cost.']
    ];

    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allSnake = multipleChoice.concat(extraChoice).map(item => ({
        q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a)
    }));
    const snake = Object.fromEntries([1, 2, 3, 4].map((number, index) => ['game' + number, allSnake.slice(index * 10, index * 10 + 10)]));

    const factPairs = [
        ['Petrol tanker', 'Specialised road vehicle for liquid fuel'],
        ['Refrigerated truck', 'Specialised road vehicle for products that must stay cold'],
        ['Fixed tracks', 'Reason a train cannot reach every farm or home directly'],
        ['Full train load', 'Condition that helps rail operate efficiently'],
        ['Short journey', 'Distance over which road is often cheaper and quicker'],
        ['Spider’s web', 'Comparison used for many connected transport routes'],
        ['Local network', 'Transport routes within a city or town'],
        ['Multi-mode journey', 'Trip that may use truck, train, ship and another truck'],
        ['Rapid rail and buses', 'Modes cities may connect in an integrated system'],
        ['Dedicated bus lane', 'Road space that can help buses move through congestion'],
        ['Car ownership', 'Transport change that let suburbs spread farther from workplaces'],
        ['Bicycle lane', 'Separated space that can make urban cycling safer'],
        ['Minibus taxi availability', 'Service that may reach places other modes miss'],
        ['Waiting for a full taxi', 'Possible delay for minibus taxi passengers'],
        ['Longer commute', 'Journey that can increase a household’s transport spending'],
        ['Asthma and bronchitis', 'Respiratory illnesses linked to polluted air in the lesson'],
        ['Traffic circle', 'Junction that can keep vehicles moving as entrants give way'],
        ['One-way road', 'Route carrying vehicles in one direction through a busy area'],
        ['Bus lane', 'Lane reserved mainly for buses to avoid some car traffic'],
        ['Reserved lane enforcement', 'Cameras can help identify vehicles using protected lanes illegally']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => [
        'unit' + (index + 1), concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 2, 3, 5, 8, 9, 10, 12, 14, 17, 20, 22, 25, 29, 32];
    const hints = [
        'Think about short, direct journeys.', 'This mode can pull many wagons.',
        'A train cannot leave its tracks.', 'Imagine routes joining like a web.',
        'Different modes should connect.', 'Buses can use existing roads.',
        'Individuals own it.', 'Consider route and schedule freedom.',
        'It serves the public even if privately owned.', 'Consider long journeys and fares.',
        'Look for two breathing-related illnesses.', 'These lights change in sequence.',
        'A separate lane can keep buses moving.', 'Ordinary private cars are restricted.',
        'The car stays in a parking area before the next leg.'
    ];
    const allChoice = multipleChoice.concat(extraChoice);
    const millionaire = millionaireIndexes.map((index, rank) => {
        const item = allChoice[index];
        return { q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[rank] };
    });

    const jeopardy = allChoice.map((item, index) => ({
        category: 'Round ' + (index < 20 ? 'One' : 'Two'),
        q: item.q,
        a: item.a.slice(3)
    }));

    global.UrbanTransportWeek6 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
