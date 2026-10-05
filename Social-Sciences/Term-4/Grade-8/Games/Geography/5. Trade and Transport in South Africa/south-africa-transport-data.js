/* Grade 8 Social Sciences Geography, Term 4, Week 5: Trade and Transport in South Africa. */
(function (global) {
    'use strict';

    const concepts = [
        ['Transport network', 'Connected roads, railways, airports and harbours that move people and goods.'],
        ['National roads', 'Major road routes linking places across South Africa.'],
        ['Railways', 'Tracks and trains used to move people and goods, including heavy cargo.'],
        ['Airport', 'A place where aircraft arrive and depart, connecting distant places quickly.'],
        ['Harbour', 'The protected area and physical structures where ships dock and handle cargo.'],
        ['Port', 'A coastal area where ships load and offload goods.'],
        ['Natural harbour', 'A naturally sheltered coastal place where ships can stop.'],
        ['Import', 'A good brought into South Africa from another country.'],
        ['Export', 'A good sent from South Africa to be sold in another country.'],
        ['Algoa Bay', 'The bay on South Africa’s south coast around which Port Elizabeth developed.'],
        ['Terminal', 'A part of a harbour that specialises in one main function.'],
        ['Container terminal', 'A harbour area designed to receive, store and move shipping containers.'],
        ['Container', 'A large metal box for moving goods between ships and land transport.'],
        ['Refrigerated ship', 'A ship that keeps perishable cargo such as fruit cold on long journeys.'],
        ['Chilled warehouse', 'Cold storage used to keep fruit fresh before it is shipped.'],
        ['Bulk export', 'A heavy resource transported overseas in very large quantities.'],
        ['Manganese ore', 'A major heavy mineral export handled through Port Elizabeth harbour.'],
        ['Ore carrier', 'A specialised ship that carries large quantities of mineral ore.'],
        ['Conveyor belt', 'Equipment that moves manganese ore toward loading facilities.'],
        ['Pipeline', 'A pipe that moves liquid products such as oil between connected facilities.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Which four parts make up the South African transport network in the lesson?', 'National roads, railways, airports and harbours', 'Only rivers, canals, footpaths and farms', 'Only mines, factories, shops and schools', 'Only ships, taxis, pipelines and bicycles'),
        mc('Why is transport important to South African trade?', 'It moves goods between production areas, markets and ports', 'It removes the need for goods', 'It makes every product locally', 'It stops exports'),
        mc('How can goods from inland farms or mines reach a harbour?', 'By road or railway', 'Only by passenger liner', 'Only through an airport terminal', 'Without moving from the farm'),
        mc('Which facility connects South Africa quickly to distant places by air?', 'An airport', 'A manganese store', 'A conveyor belt', 'A chilled warehouse'),
        mc('Which facility lets large quantities of goods enter or leave by sea?', 'A harbour', 'A farm', 'A mine', 'A city bus stop'),
        mc('What is a port in this lesson?', 'A coastal area where ships load and offload goods', 'An inland mine for manganese', 'A road-only route to Gauteng', 'A warehouse that chills fruit'),
        mc('What is a harbour?', 'A protected area and structures where ships dock and handle cargo', 'A type of aircraft', 'A farm that grows wool', 'A pipeline that carries oil'),
        mc('Where did Port Elizabeth develop?', 'Around Algoa Bay on South Africa’s south coast', 'On the banks of the Vaal River', 'Beside a mine in Gauteng', 'At an inland airport'),
        mc('Why did Port Elizabeth become useful for trade?', 'Its natural harbour served ships and nearby farming areas', 'It had no access to the coast', 'Goods did not need transport', 'It had no surrounding producers'),
        mc('Why did ships stop near Algoa Bay in the early history of the harbour?', 'To collect fresh water and supplies', 'To mine coal under the sea', 'To load aircraft', 'To use an inland pipeline'),
        mc('Which listed product is exported through Port Elizabeth harbour?', 'Manganese ore', 'Imported car parts', 'Imported toys', 'Imported clothes'),
        mc('Which two countries are examples of destinations for manganese exports?', 'China and Japan', 'Brazil and Argentina', 'Egypt and Kenya', 'Canada and Mexico'),
        mc('Which manufactured product is also listed as an export?', 'Cars', 'Toys', 'Imported car parts', 'Imported petroleum products'),
        mc('Which farm products are listed among Port Elizabeth exports?', 'Wool, fruit and grain', 'Petroleum, toys and cars', 'Car parts, clothes and oil', 'Only fish and diamonds'),
        mc('Which listed item is imported through the harbour?', 'Car parts', 'Manganese ore', 'Locally grown grain', 'Exported wool'),
        mc('Which petroleum-related item is listed as an import?', 'Petroleum products', 'Manganese ore', 'Wool', 'Fruit'),
        mc('Which countries are mentioned as sources of many clothes, toys and household goods?', 'China and India', 'China and Japan', 'Mozambique and Botswana', 'France and Egypt'),
        mc('What does Port Elizabeth’s container terminal specialise in?', 'Handling shipping containers', 'Growing fruit', 'Mining manganese', 'Flying passengers'),
        mc('Which equipment loads and unloads containers at the harbour?', 'Special cranes', 'Farm tractors', 'Passenger buses', 'Oil pumps only'),
        mc('After containers are unloaded, what can take the goods inland?', 'Road or rail transport', 'Only another ocean liner', 'Only a refrigerated ship', 'No further transport')
    ];

    const extraChoice = [
        mc('Why do harbours handle different kinds of ships?', 'Different cargo and passengers need different vessels', 'Every product is carried in exactly the same way', 'All ships are built for fruit only', 'Land transport has no role'),
        mc('Which specialised ship is suited to large quantities of loose mineral ore?', 'A bulk or ore carrier', 'A passenger liner', 'A small fishing boat', 'A city ferry'),
        mc('Which vessel can bring oil to the harbour?', 'An oil tanker', 'An ore train', 'A bus', 'A refrigerator truck'),
        mc('Which vessel is designed mainly to carry travellers?', 'A passenger liner', 'An ore carrier', 'A container crane', 'A pipeline'),
        mc('Why is export fruit stored in chilled warehouses?', 'To keep it fresh before shipping', 'To turn it into manganese', 'To avoid all sea transport', 'To make it heavier'),
        mc('What protects fruit on its long sea journey?', 'A refrigerated ship', 'An open coal wagon', 'An oil pipeline', 'A passenger bus'),
        mc('What is a bulk export?', 'A heavy resource moved in very large quantities', 'A single small parcel', 'Only a passenger ticket', 'A box of imported toys'),
        mc('Which bulk export is especially important at Port Elizabeth?', 'Manganese ore', 'Flowers', 'Car parts', 'Clothes'),
        mc('What helps move manganese ore into the loading system?', 'Conveyor belts and lifting equipment', 'Passenger seating', 'Refrigerator shelves', 'Airport runways'),
        mc('Which ship carries manganese ore overseas?', 'A specialised ore carrier', 'A passenger aircraft', 'A taxi', 'A cement mixer'),
        mc('Why can a harbour not work alone?', 'Goods must also travel between the coast and inland areas', 'Ships can travel on roads', 'All buyers live inside the harbour', 'Imports never leave a ship'),
        mc('What makes road transport useful around Port Elizabeth harbour?', 'Trucks can reach businesses, farms and many destinations flexibly', 'Roads transport oil inside ships', 'Trucks cannot leave the port', 'Only mines use roads'),
        mc('Why is rail used for some harbour cargo?', 'It can move large quantities of heavy goods inland', 'It keeps fruit cold at sea', 'It docks ships', 'It replaces every road'),
        mc('Which inland areas are mentioned as rail links from Port Elizabeth?', 'The Free State and Gauteng', 'Only China and Japan', 'Only India and Europe', 'Only the open ocean'),
        mc('What do short pipelines at the harbour’s oil terminal move?', 'Oil between tanker facilities, storage and loading areas', 'Manganese ore to ships', 'Fresh fruit to shops', 'Passengers to airports'),
        mc('Which surrounding areas help supply cargo through the wider Algoa Bay region?', 'The Sundays River and Langkloof Valleys', 'Only the Sahara and Amazon', 'Only China and Japan', 'Only central Cape Town'),
        mc('Which route correctly describes exporting fruit?', 'Farm, truck, chilled warehouse, refrigerated ship', 'Ship, mine, airport, farm', 'Farm, oil tanker, ore carrier, train', 'Factory, pipeline, passenger liner, shop'),
        mc('Which route correctly describes exporting manganese?', 'Inland mine, transport, ore storage, conveyor, bulk carrier', 'Chilled warehouse, aeroplane, household shop', 'Toy factory, passenger liner, farm', 'Airport, taxi, oil pipeline, school'),
        mc('How can imported goods reach inland consumers?', 'Container ship, harbour cranes, road or rail, shops', 'Bulk carrier, fruit farm, mine, school', 'Oil pipeline, orchard, passenger liner, home', 'No transport after the ship docks'),
        mc('What best shows the link between trade and transport at Port Elizabeth?', 'Harbour facilities connect sea cargo with road, rail and pipeline routes', 'Cargo stays at the coast forever', 'Roads and ships never meet', 'The harbour has no import or export role')
    ];

    const trueFalseFacts = [
        ['South Africa’s transport network includes roads, railways, airports and harbours.', true, 'These are the four network parts named in the lesson.'],
        ['Port Elizabeth developed around Algoa Bay.', true, 'Algoa Bay is on South Africa’s south coast.'],
        ['Manganese ore, cars, wool, fruit and grain are listed as exports.', true, 'They are the five examples in the lesson.'],
        ['Car parts, petroleum products, clothes, toys and household items are listed as imports.', true, 'They arrive from other places through the harbour.'],
        ['A terminal is a part of a harbour specialising in one main function.', true, 'The lesson gives this as its key-term definition.'],
        ['Cranes help unload containers from ships.', true, 'Containers then move to land transport.'],
        ['Chilled warehouses help protect fruit before export.', true, 'The cold reduces spoilage before shipping.'],
        ['Manganese is a major bulk export handled at Port Elizabeth.', true, 'Special storage and loading equipment handle the heavy ore.'],
        ['Road and rail links carry harbour goods toward inland areas.', true, 'The harbour depends on connected land transport.'],
        ['Short pipelines at the oil terminal move oil between connected facilities.', true, 'Pipelines are suited to liquid cargo.'],
        ['The South African transport network consists only of airports.', false, 'It also includes roads, railways and harbours.'],
        ['A harbour is an inland field where aircraft land.', false, 'A harbour is a protected coastal docking and cargo area.'],
        ['Imported car parts are listed as a major export from Port Elizabeth.', false, 'Car parts are listed as imports.'],
        ['China and Japan are examples of sources of Port Elizabeth’s manganese ore.', false, 'They are examples of destinations for its exports.'],
        ['Every kind of cargo can be handled with identical ships and equipment.', false, 'Different cargo needs specialised vessels and facilities.'],
        ['Fruit is stored in open sun before a long refrigerated sea journey.', false, 'Chilled warehouses protect fruit before it is shipped.'],
        ['Manganese ore is usually packed as tiny individual parcels for export.', false, 'It is heavy bulk cargo handled in large quantities.'],
        ['Port Elizabeth harbour is disconnected from roads and railways.', false, 'Its road and rail links move cargo to and from inland areas.'],
        ['The harbour’s oil pipelines are mainly used to move wool and cars.', false, 'They move liquid oil between tanker, storage and loading areas.'],
        ['Imported containers reach inland shops without unloading or land transport.', false, 'Cranes unload them and road or rail takes goods inland.']
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
        ['Mines and farms', 'Production areas whose goods may need to travel far to markets'],
        ['Road and rail', 'Land modes connecting production areas with cities and harbours'],
        ['International markets', 'Overseas buyers reached through harbours and airports'],
        ['Harbour infrastructure', 'Facilities used to dock ships and handle cargo'],
        ['South Africa’s network', 'Links inland places, cities and coastal ports'],
        ['Port Elizabeth (Gqeberha)', 'Harbour case study on the south coast'],
        ['Vasco da Gama', 'Explorer who stopped at Algoa Bay on his journey toward India'],
        ['Fresh water stop', 'Early reason ships called at Algoa Bay'],
        ['China and Japan', 'Examples of destinations for manganese exports'],
        ['China and India', 'Sources of many imported clothes, toys and household items'],
        ['Special cranes', 'Equipment that loads and unloads containers'],
        ['Road or rail collection', 'Step after containers leave the terminal'],
        ['Fruit exports', 'Cargo protected by chilled storage and a refrigerated ship'],
        ['Container ship', 'Vessel used for cargo packed in metal boxes'],
        ['Specialised ships', 'Vessels suited to different cargo or passenger needs'],
        ['Manganese storage area', 'Special area for holding large quantities of ore'],
        ['Oil terminal', 'Harbour facility connecting oil tankers with short pipelines'],
        ['Harbour trucks', 'Vehicles linking the port with farms and businesses'],
        ['Free State and Gauteng', 'Examples of inland areas linked to Port Elizabeth by rail'],
        ['Sundays River and Langkloof', 'Valleys in the wider Algoa Bay trading region']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => [
        'unit' + (index + 1), concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 5, 7, 8, 10, 11, 14, 17, 19, 24, 26, 28, 32, 34];
    const hints = [
        'Think of four connected kinds of infrastructure.', 'Goods must travel from their source to buyers.',
        'Ships load and unload there.', 'This bay is on the south coast.',
        'The sheltered coastal location helped ships and nearby farms.', 'It is a heavy mineral.',
        'Both destinations are in eastern Asia.', 'These parts arrive from abroad.',
        'Metal boxes need a dedicated harbour facility.', 'Cargo continues by land.',
        'Cold storage protects a perishable farm export.', 'Think of heavy goods in large quantities.',
        'This equipment carries ore toward the ship.', 'Heavy cargo can travel in many train wagons.',
        'This carries liquid oil near the tanker facilities.'
    ];
    const millionaire = millionaireIndexes.map((index, rank) => {
        const item = multipleChoice.concat(extraChoice)[index];
        return { q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[rank] };
    });

    const jeopardy = multipleChoice.concat(extraChoice).map((item, index) => ({
        category: 'Round ' + (index < 20 ? 'One' : 'Two'),
        q: item.q,
        a: item.a.slice(3)
    }));

    global.SouthAfricaTransportWeek5 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
