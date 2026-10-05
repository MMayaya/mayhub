/* Grade 8 Social Sciences Geography, Term 4, Week 4: Trade and Transport Around the World. */
(function (global) {
    'use strict';

    const concepts = [
        ['Trade', 'The exchange of goods or labour.'],
        ['International trade', 'Trade that takes place between different countries.'],
        ['Import', 'A good brought into a country from another country.'],
        ['Export', 'A good sent out of a country to be sold elsewhere.'],
        ['Specialisation', 'Concentrating on products a place is well suited to produce.'],
        ['Transport', 'Moving people or goods from one place to another.'],
        ['Refrigerated transport', 'Transport that keeps fresh food cold during a journey.'],
        ['Spoiling', 'Food going bad or rotting.'],
        ['Labour', 'Work performed by people.'],
        ['Container', 'A large metal box used to protect and move many kinds of goods.'],
        ['Mode of transport', 'A particular way in which people or goods are moved.'],
        ['Container ship', 'A ship designed to carry many large metal containers.'],
        ['Oil tanker', 'A ship with enormous tanks used to transport oil.'],
        ['Oil refinery', 'A factory that processes crude oil into fuels such as petrol and diesel.'],
        ['Air transport', 'Travel by aircraft, especially useful for long-distance passengers and urgent light goods.'],
        ['Road transport', 'Movement by road that can provide direct door-to-door delivery.'],
        ['Rail transport', 'Movement by train, especially suitable for large quantities of heavy goods.'],
        ['Pipeline transport', 'Movement of oil or gas through pipes, pushed along by pumps.'],
        ['Perishable food', 'Fresh food that can spoil unless kept cool and moved promptly.'],
        ['Bulk goods', 'Large quantities of heavy goods such as coal and iron ore.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('What is trade?', 'The exchange of goods or labour', 'Only the movement of people', 'The rotting of food', 'The building of a railway'),
        mc('Why do places trade with each other?', 'They cannot all produce every good they need', 'Every place has identical resources', 'Transport is never needed', 'All goods grow in every climate'),
        mc('Why is cocoa traded between countries?', 'It grows well in only certain parts of the world', 'It grows equally well in every country', 'It cannot be transported', 'It is a type of fuel'),
        mc('What is international trade?', 'Trade between different countries', 'Trade within one household', 'Only buying at a local market', 'Transport without any goods'),
        mc('Which goods are imports for a country?', 'Goods entering it from another country', 'Goods leaving it for sale abroad', 'Goods that are never sold', 'Goods moving only within a city'),
        mc('Which goods are exports for a country?', 'Goods leaving it to be sold elsewhere', 'Goods entering it from abroad', 'Goods that have spoiled', 'Goods kept only at the factory'),
        mc('Why are trade and transport closely linked?', 'Goods must move from producers to buyers', 'Goods move without transport', 'All buyers live on farms', 'Transport replaces exchange'),
        mc('How does refrigeration help the trade in fresh food?', 'It keeps food cold and reduces spoilage on longer journeys', 'It turns food into fuel', 'It removes the need for farmers', 'It makes every journey shorter'),
        mc('Why can container transport lower costs?', 'Large loads can transfer efficiently among ships, trains and trucks', 'Each item needs its own ship', 'Containers cannot be stacked', 'Goods must be unpacked at every stop'),
        mc('Which mode carries many internationally traded goods over long distances?', 'Sea transport', 'Motorbike transport', 'Walking', 'Only air transport'),
        mc('What is a container ship built to carry?', 'Large metal containers', 'Only passengers', 'Gas through pipes', 'Only loose coal in wagons'),
        mc('What does an oil tanker carry?', 'Oil in enormous tanks', 'Passengers in train coaches', 'Petrol through inland pipes', 'Only letters and parcels'),
        mc('Why might diamonds travel by air?', 'They are light and valuable', 'They are very heavy bulk goods', 'They must travel through pipes', 'They cannot be packed'),
        mc('Why might flowers and fresh fish travel by air?', 'They need to reach markets quickly before spoiling', 'They are heavy ores', 'They are crude oil', 'They cannot be sold abroad'),
        mc('What is a key strength of road transport?', 'Direct door-to-door delivery', 'Moving gas through pipes', 'Crossing oceans without ports', 'Carrying only passengers'),
        mc('Which road vehicle is suited to letters and small parcels?', 'Motorbike', 'Container ship', 'Oil tanker', 'Ore train'),
        mc('Why is rail suitable for coal and iron ore?', 'A train can pull many wagons of heavy goods', 'A train carries only light flowers', 'It provides direct delivery to every house', 'It is a kind of aircraft'),
        mc('What does the Sishen–Saldanha railway connect?', 'Iron ore mines near Sishen to Saldanha Bay harbour', 'Mozambique gas fields to Secunda', 'A cocoa farm to a local market', 'Two airports for passengers'),
        mc('What moves oil or gas along a pipeline?', 'Special pumps', 'Container cranes', 'Train wagons', 'Motorbikes'),
        mc('Why can one product use several transport modes?', 'Different stages of its journey need different connections', 'Every mode has exactly the same purpose', 'Goods cannot move between vehicles', 'International trade uses roads only')
    ];

    const extraChoice = [
        mc('Which example in the lesson shows different climates encouraging trade?', 'Cocoa grown in certain regions and sold elsewhere', 'Iron ore carried by air to every home', 'Petrol grown on farms', 'Fish moved through gas pipelines'),
        mc('What can countries gain while specialising in one product?', 'Access to other goods through trade', 'Freedom from all transport', 'The same climate as all countries', 'No need for workers'),
        mc('What does importing mean from the buyer country’s viewpoint?', 'Bringing goods in from abroad', 'Sending goods out for sale', 'Producing nothing for trade', 'Moving workers only'),
        mc('What can international trade connect besides economies?', 'People’s everyday lifestyles and products', 'Only train tracks', 'Only inland mines', 'Only oil tanks'),
        mc('What made moving fresh food long distances difficult in the past?', 'It could spoil before reaching consumers', 'All markets refused farm products', 'All farms had aircraft', 'Containers were made of ice'),
        mc('How do many city residents travel to work?', 'By buses, trains, taxis or cars', 'Only by oil tanker', 'Only by container ship', 'Only through pipelines'),
        mc('What do workers exchange their labour for?', 'Money', 'Crude oil', 'Rail wagons', 'Containers'),
        mc('What can be moved between a ship, train and truck without unpacking every item?', 'A container', 'A refinery', 'A harbour', 'A railway line'),
        mc('What protects goods on a container ship?', 'Locked metal containers', 'Loose piles on the deck', 'Passenger seats', 'Underground pumps'),
        mc('Which transport mode is used mainly for long-distance passengers in this lesson?', 'Air', 'Pipeline', 'Oil tanker', 'Ore train'),
        mc('Which air cargo example is valuable and relatively light?', 'Jewellery', 'Coal', 'Iron ore', 'Ready-mixed cement'),
        mc('Which places can roads connect?', 'Farms, factories, shops, ports, stations and homes', 'Only airports', 'Only offshore oil fields', 'Only two countries'),
        mc('Which vehicle keeps perishable food cold on a road journey?', 'Refrigerator truck', 'Cement mixer', 'Fuel tanker', 'Motorbike'),
        mc('Which vehicle delivers ready-mixed cement to a building site?', 'Cement mixer', 'Oil tanker ship', 'Ore train', 'Passenger aircraft'),
        mc('Which two South African mining settlements grew with help from railways?', 'Kimberley and Johannesburg', 'Secunda and Maputo', 'Sishen and Mozambique', 'Every coastal harbour'),
        mc('About how long is the Sishen–Saldanha Ore Export Line in the lesson?', '861 km', '86 km', '18 km', '8 610 km'),
        mc('What does the Mozambique–Secunda pipeline move?', 'Gas', 'Iron ore', 'Flowers', 'Containers'),
        mc('Where are many oil refineries located in South Africa?', 'Near the coast where imported crude oil arrives', 'Only on inland cocoa farms', 'Only inside airports', 'Only at railway stations'),
        mc('What is a suitable mode for a large international shipment of goods?', 'Sea transport', 'A motorbike', 'A city taxi', 'A small parcel van'),
        mc('Which route could take a product from a factory to a shop abroad?', 'Truck, train, ship, then truck', 'Only pipeline for every product', 'Air only for all bulk coal', 'No transport between markets')
    ];

    const trueFalseFacts = [
        ['Trade is the exchange of goods or labour.', true, 'Trade may involve goods, skills or labour.'],
        ['Different places may trade because their resources and climates differ.', true, 'Places are not all suited to producing the same goods.'],
        ['Imports enter a country from abroad.', true, 'Imports are incoming goods.'],
        ['Exports leave a country to be sold elsewhere.', true, 'Exports are outgoing goods.'],
        ['Refrigerated transport can reduce the spoilage of fresh food.', true, 'Cold transport allows longer journeys for perishable products.'],
        ['Containers can transfer between ships, trains and trucks.', true, 'The same container may use several modes.'],
        ['Sea transport is suited to large quantities of internationally traded goods.', true, 'Ships carry large loads over long distances.'],
        ['Road transport can deliver goods directly to homes and shops.', true, 'Its door-to-door flexibility is an advantage.'],
        ['Rail transport is well suited to coal and iron ore.', true, 'Trains pull many wagons of heavy bulk goods.'],
        ['Pipelines can carry oil and gas continuously over long distances.', true, 'Pumps push liquids or gases through pipes.'],
        ['Every country can produce all the goods it needs without trade.', false, 'Resources, skills and climates differ among places.'],
        ['An export is a good brought into a country from abroad.', false, 'That is an import; exports leave the country.'],
        ['Fresh food cannot be transported farther with refrigeration.', false, 'Refrigeration helps prevent food from spoiling on longer journeys.'],
        ['A container must be emptied whenever it moves from ship to train.', false, 'The same container can transfer between modes.'],
        ['Most long-distance air transport in the lesson is for heavy iron ore.', false, 'Air transport is mainly used for people and some light, valuable or urgent goods.'],
        ['An oil tanker is a train for carrying coal.', false, 'An oil tanker is a ship with large tanks for oil.'],
        ['Road vehicles are useful only for carrying passengers.', false, 'Motorbikes, bakkies and trucks carry many types of goods.'],
        ['The Sishen–Saldanha line is mainly for transporting flowers.', false, 'It moves iron ore from mines to the harbour.'],
        ['Pipelines move gas by loading it into separate truck containers.', false, 'Pumps push gas along the pipeline itself.'],
        ['A product can use only one transport mode on its journey.', false, 'Goods may travel by truck, train and ship on one journey.']
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
        ['Cocoa', 'Crop used in chocolate that grows well in only certain regions'],
        ['Different climates', 'One reason places produce different goods'],
        ['Buying from abroad', 'An example of importing'],
        ['Selling abroad', 'An example of exporting'],
        ['Everyday products', 'Foods, films or phones made available in many countries through trade'],
        ['Fresh vegetables', 'Example of goods a farmer might take to a nearby market'],
        ['Cold storage on a journey', 'How refrigerated transport protects fresh food'],
        ['Container crane', 'Machine that loads containers onto ships'],
        ['City commuters', 'People who use transport to travel to work'],
        ['Cheaper freight', 'A benefit of efficient container transport'],
        ['Sea freight', 'Large loads carried internationally by ship'],
        ['Passenger aircraft', 'Fast travel between distant cities or countries'],
        ['Flowers', 'Short-lived goods that may need quick air delivery'],
        ['Motorbike delivery', 'Suitable for letters, medicines and small parcels'],
        ['Refrigerator truck', 'Specialised road vehicle for perishable food'],
        ['Cement mixer', 'Specialised vehicle for ready-mixed cement'],
        ['Ore Export Line', 'Another name for the Sishen–Saldanha railway'],
        ['Mozambique to Secunda', 'Route of the lesson’s cross-border gas pipeline'],
        ['Coastal refinery', 'Place where imported crude oil may be processed'],
        ['Connected modes', 'Different transport systems working together on one journey']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => [
        'unit' + (index + 1), concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 17, 18];
    const hints = [
        'People exchange goods or work.', 'Think about resources and climates.',
        'This trade crosses a national border.', 'Incoming goods enter a country.',
        'Outgoing goods leave a country.', 'Goods must reach buyers.',
        'Fresh produce stays cold.', 'Large boxes transfer between modes.',
        'Think of ships and large international loads.', 'This ship carries metal boxes.',
        'These small precious goods are valuable.', 'Think about door-to-door delivery.',
        'A train can pull many wagons.', 'The route runs from an iron ore mine to a harbour.',
        'These devices push material through pipes.'
    ];
    const millionaire = millionaireIndexes.map((index, rank) => {
        const item = multipleChoice[index];
        return { q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[rank] };
    });

    const jeopardy = multipleChoice.concat(extraChoice).map((item, index) => ({
        category: 'Round ' + (index < 20 ? 'One' : 'Two'),
        q: item.q,
        a: item.a.slice(3)
    }));

    global.TradeTransportWeek4 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
