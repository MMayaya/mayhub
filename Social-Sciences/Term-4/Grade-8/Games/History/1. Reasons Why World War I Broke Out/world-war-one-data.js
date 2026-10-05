/* Grade 8 Social Sciences History, Term 4, Week 1: Causes of World War I. */
(function (global) {
    'use strict';

    const concepts = [
        ['World War I', 'A global war fought from 1914 to 1918, beginning in Europe and reaching other parts of the world.'],
        ['Allied Powers', 'The wartime side that included Britain, France and Russia at the start of the war.'],
        ['Central Powers', 'The wartime side that included Germany, Austria-Hungary and the Ottoman Empire.'],
        ['Colony', 'A territory controlled by another country.'],
        ['Empire', 'A group of territories ruled or controlled by one powerful country.'],
        ['Nationalism', 'Strong loyalty to one’s nation, sometimes combined with the belief that it is better than others.'],
        ['Rivalry', 'Competition between countries for power, wealth or prestige.'],
        ['Industrialisation', 'The growth of factories and machine-based production.'],
        ['Industrial economy', 'An economy in which factories and manufactured goods play a major role.'],
        ['Manufacturing', 'Making goods, often in factories with machines and workers.'],
        ['Economic rivalry', 'Competition between countries for markets, resources and industrial strength.'],
        ['Navy', 'A country’s armed forces at sea.'],
        ['Naval power', 'A country’s strength at sea, especially the size and ability of its warships.'],
        ['Trade route', 'A path used to move goods between places, including across seas.'],
        ['Kaiser', 'The title used by the German emperor.'],
        ['Dreadnought', 'A powerful new type of battleship introduced by Britain before World War I.'],
        ['Naval race', 'Competition between countries to build more and stronger warships.'],
        ['Colonisation', 'The process of taking control of another territory and ruling it.'],
        ['Propaganda', 'Messages designed to persuade people to support a cause or take action.'],
        ['Recruitment', 'The process of encouraging people to join the armed forces.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        // Rotate the answer to avoid a predictable correct-option position.
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('When did World War I take place?', '1914–1918', '1900–1904', '1924–1928', '1939–1945'),
        mc('Which group included Britain, France and Russia at the start of the war?', 'Allied Powers', 'Central Powers', 'Naval Powers', 'Colonial Governors'),
        mc('Which country fought with Austria-Hungary and the Ottoman Empire?', 'Germany', 'Britain', 'France', 'Russia'),
        mc('Why did a war beginning in Europe affect other continents?', 'European powers controlled colonies around the world', 'All countries were in Europe', 'No ships could cross oceans', 'Factories stopped making goods'),
        mc('Which event happened in 1917?', 'Russia withdrew and the United States entered the war', 'The war began', 'Britain introduced the first empire', 'The war ended'),
        mc('What is nationalism?', 'Strong loyalty to one’s nation', 'The building of a battleship', 'The making of factory goods', 'The ruling of a colony'),
        mc('Which set gives the four long-term causes explored in this topic?', 'Nationalism, industrial rivalry, naval rivalry and empires', 'Farming, drought, tourism and migration', 'Only the 1917 events', 'Only recruitment posters'),
        mc('Why did industrial growth increase tension between Britain and Germany?', 'Both competed to sell goods and gain markets', 'Neither made manufactured goods', 'They stopped using machines', 'They shared one factory'),
        mc('What did a stronger navy help a country protect?', 'Sea trade routes and overseas interests', 'Only inland farms', 'Only railway stations', 'Only school buildings'),
        mc('What was a Dreadnought?', 'A powerful new type of battleship', 'A recruitment poster', 'A factory machine', 'A land border'),
        mc('What does a naval race involve?', 'Building more and stronger warships than a rival', 'Counting colonial schools', 'Trading only on land', 'Stopping all sea travel'),
        mc('Why did European countries seek colonies?', 'For resources, wealth, markets and prestige', 'To end industrial production', 'To abandon sea routes', 'To avoid all competition'),
        mc('What is a colony?', 'A territory controlled by another country', 'A ship’s crew', 'A wartime poster', 'A factory product'),
        mc('What is propaganda?', 'A persuasive message supporting a cause', 'A type of warship', 'A sea route', 'A factory machine'),
        mc('What was the main purpose of wartime recruitment posters?', 'To encourage people to join the armed forces', 'To show factory prices', 'To sell battleships', 'To map the oceans'),
        mc('Who held the title Kaiser?', 'The German emperor', 'The British prime minister', 'A French factory owner', 'A Russian sailor'),
        mc('How did industrialisation support military competition?', 'Factories could produce weapons and ships', 'Factories prevented shipbuilding', 'It removed all rivalries', 'It stopped countries seeking resources'),
        mc('How were empires linked to competition before the war?', 'Powers competed for overseas territories and their benefits', 'All territories had the same ruler', 'Empires ended sea travel', 'Colonies could not provide resources'),
        mc('What does an empire consist of?', 'Territories controlled by a powerful state', 'One battleship only', 'A single recruitment poster', 'One factory only'),
        mc('What was the human result of World War I?', 'Millions of people died or were injured', 'No civilians were affected', 'No soldiers were injured', 'All rivalries disappeared immediately')
    ];

    const extraChoice = [
        mc('Britain and Germany competed especially in which two areas?', 'Industry and naval strength', 'Deserts and farming', 'Mountain climbing and sport', 'Only school education'),
        mc('Why did countries want to control the seas?', 'To protect trade and overseas possessions', 'To end all international trade', 'To avoid using ships', 'To make colonies independent'),
        mc('Which development made Britain and Germany compare their fleets?', 'The naval arms race', 'The end of shipbuilding', 'The withdrawal of all empires', 'The creation of one shared navy'),
        mc('What is meant by economic rivalry?', 'Competition for markets, resources and wealth', 'Cooperation with no competition', 'The naming of warships', 'Training only sailors'),
        mc('Which cause is most directly linked to pride in one’s country?', 'Nationalism', 'Industrialisation', 'Recruitment', 'Manufacturing'),
        mc('Which cause is most directly linked to factories and markets?', 'Industrial rivalry', 'Naval uniforms', 'A recruitment poster', 'A family relationship'),
        mc('Which cause is most directly linked to battleship building?', 'Naval rivalry', 'National flags', 'Colonial farming', 'Recruitment'),
        mc('Which cause is most directly linked to competition for overseas territories?', 'Colonisation and empires', 'Only the 1917 changes', 'Only the war’s end', 'Only factory machinery'),
        mc('What is a manufactured good?', 'An item made through production, often in a factory', 'A sea border', 'A title for an emperor', 'An overseas territory'),
        mc('A country seeking raw materials for factories may be interested in what?', 'Overseas colonies', 'Fewer resources', 'Closing every port', 'Ending all markets'),
        mc('Why could a colony become involved in a European war?', 'Its ruling power could draw it into the conflict', 'It was always an independent ally', 'Its people could not travel', 'It had no connection to Europe'),
        mc('Which pair were cousins despite their countries’ rivalry?', 'King George V and Kaiser Wilhelm II', 'King George V and a French president', 'Two British sailors', 'Two factory owners'),
        mc('What does a trade route across the sea carry?', 'Goods between places', 'Only factory smoke', 'Only national flags', 'Only land armies'),
        mc('Which phrase best describes the build-up to World War I?', 'Several connected long-term rivalries increased tension', 'One poster alone caused the war', 'There was no competition between powers', 'The war began after all empires vanished'),
        mc('Which wartime side did Russia initially belong to?', 'Allied Powers', 'Central Powers', 'Neither side', 'A naval league'),
        mc('Which wartime side did the Ottoman Empire belong to?', 'Central Powers', 'Allied Powers', 'A factory alliance', 'No side at any point'),
        mc('What changed for the United States in 1917?', 'It entered World War I', 'It ended the war alone', 'It joined the Central Powers', 'It stopped all sea trade'),
        mc('What changed for Russia in 1917?', 'It withdrew from the war', 'It joined Germany', 'It invented the Dreadnought', 'It began the war'),
        mc('What could a country gain by expanding an empire?', 'Prestige, resources and markets', 'A guarantee of no conflict', 'The end of manufacturing', 'The loss of every trade route'),
        mc('Which statement best links industry and naval power?', 'Industrial capacity helped countries build modern warships', 'Warships were built without materials', 'Ships ended the need for factories', 'Factories were unrelated to military strength')
    ];

    const trueFalseFacts = [
        ['World War I lasted from 1914 to 1918.', true, 'World War I lasted from 1914 to 1918.'],
        ['Britain, France and Russia were among the original Allied Powers.', true, 'Britain, France and Russia were among the original Allied Powers.'],
        ['Germany and Austria-Hungary fought on the Central Powers side.', true, 'Germany and Austria-Hungary were Central Powers.'],
        ['European colonies helped make the war global.', true, 'European powers controlled territories on other continents.'],
        ['Russia withdrew from the war in 1917.', true, 'Russia withdrew in 1917.'],
        ['The United States entered the war in 1917.', true, 'The United States entered in 1917.'],
        ['Nationalism involves strong loyalty to one’s nation.', true, 'Nationalism is strong loyalty to one’s nation.'],
        ['Britain and Germany competed in industrial production.', true, 'Industrial rivalry between Britain and Germany raised tension.'],
        ['A Dreadnought was a powerful battleship.', true, 'Britain introduced the Dreadnought as a powerful battleship.'],
        ['Colonies could provide resources and markets.', true, 'Colonies could provide resources, wealth and markets.'],
        ['World War I ended in 1914.', false, 'It began in 1914 and ended in 1918.'],
        ['The Ottoman Empire was one of the original Allied Powers.', false, 'The Ottoman Empire fought with the Central Powers.'],
        ['The war stayed entirely within Europe.', false, 'It affected other continents, including European colonies.'],
        ['Nationalism means having no loyalty to your country.', false, 'Nationalism means strong loyalty to one’s nation.'],
        ['Industrial rivalry was mainly a contest over school uniforms.', false, 'It concerned factories, manufactured goods, markets and economic strength.'],
        ['A navy is a country’s armed force on land.', false, 'A navy is a country’s armed force at sea.'],
        ['A naval race is a competition to build fewer ships.', false, 'Countries competed to build more and stronger warships.'],
        ['Colonisation means giving up control of overseas territory.', false, 'Colonisation means taking control of and ruling a territory.'],
        ['Recruitment posters were designed to discourage enlistment.', false, 'They were designed to encourage people to join the armed forces.'],
        ['King George V and Kaiser Wilhelm II were strangers with no family link.', false, 'They were cousins even though their countries were rivals.']
    ];

    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };

    function toSnake(question) {
        return { q: question.q, options: question.options.map(option => option.slice(3)), a: question.options.indexOf(question.a) };
    }
    const allSnake = multipleChoice.concat(extraChoice).map(toSnake);
    const snake = Object.fromEntries([1, 2, 3, 4].map((number, index) => ['game' + number, allSnake.slice(index * 10, index * 10 + 10)]));

    const matchingSets = [
        [
            ['World War I', 'Global conflict fought from 1914 to 1918'],
            ['1914', 'Year World War I began'],
            ['1918', 'Year World War I ended'],
            ['Allied Powers', 'Side including Britain, France and Russia at the start'],
            ['Central Powers', 'Side including Germany, Austria-Hungary and the Ottoman Empire'],
            ['European colonies', 'Overseas territories that helped make the war global'],
            ['Russia in 1917', 'Withdrew from World War I'],
            ['United States in 1917', 'Entered World War I'],
            ['Wartime human cost', 'Millions of deaths and injuries'],
            ['Four long-term causes', 'Nationalism, industry, navies and empires']
        ],
        [
            ['Nationalism', 'Strong loyalty to one’s nation'],
            ['National pride', 'Belief in the importance of one’s country'],
            ['Rivalry', 'Competition for power or advantage'],
            ['Industrialisation', 'Growth of factories and machine-based production'],
            ['Manufacturing', 'Making products, often in factories'],
            ['Industrial economy', 'Economy strongly based on factory production'],
            ['Economic rivalry', 'Competition for markets, resources and wealth'],
            ['Britain and Germany', 'Countries competing in industrial strength'],
            ['Market', 'Place or group of buyers for manufactured goods'],
            ['Raw materials', 'Resources used to make manufactured products']
        ],
        [
            ['Navy', 'Armed force that operates at sea'],
            ['Naval power', 'Military strength at sea'],
            ['Warship', 'Ship built for military action'],
            ['Dreadnought', 'Powerful new battleship type introduced by Britain'],
            ['Naval race', 'Competition to build stronger fleets'],
            ['Sea route', 'Path ships use across oceans'],
            ['Sea trade', 'Movement of goods by ship'],
            ['Kaiser', 'Title of the German emperor'],
            ['Fleet', 'Group of ships belonging to a navy'],
            ['Overseas protection', 'One reason empires wanted strong navies']
        ],
        [
            ['Empire', 'Territories ruled by a powerful country'],
            ['Colony', 'Territory controlled by another country'],
            ['Colonisation', 'Taking control of and ruling a territory'],
            ['Resources', 'Materials countries sought from colonies'],
            ['Prestige', 'Status gained by appearing powerful'],
            ['Colonial markets', 'Overseas buyers for industrial goods'],
            ['Propaganda', 'Persuasive messages supporting a cause'],
            ['Recruitment', 'Encouraging people to join armed forces'],
            ['Recruitment poster', 'Visual message encouraging enlistment'],
            ['King George V and Kaiser Wilhelm II', 'Cousins whose countries were rivals']
        ]
    ];
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));

    const dragPairs = [
        [['1914–1918', 'The years during which World War I was fought'], ['Allied Powers', 'Britain, France and Russia initially belonged to this side'], ['Central Powers', 'Germany and Austria-Hungary belonged to this side'], ['1917', 'The year Russia withdrew and the United States entered'], ['Global war', 'A conflict reaching beyond Europe through empires and colonies']],
        [['Nationalism', 'Pride in and strong loyalty to one’s nation'], ['Manufacturing', 'Making goods in factories'], ['Industrial rivalry', 'Competition over manufactured goods and markets'], ['Naval power', 'Strength at sea through ships and fleets'], ['Naval race', 'Competition to build stronger warships']],
        [['Dreadnought', 'The powerful battleship type introduced by Britain'], ['Kaiser', 'Title of the German emperor'], ['Trade route', 'A path along which goods are transported'], ['Colony', 'A territory ruled by another country'], ['Empire', 'Territories controlled by one powerful state']],
        [['Resources', 'Materials sought from colonies for production and wealth'], ['Prestige', 'Status a country hoped to gain by expanding its empire'], ['Propaganda', 'Persuasive messages used to support a cause'], ['Recruitment', 'Encouraging people to join the armed forces'], ['King George V and Kaiser Wilhelm II', 'Cousins whose countries nevertheless competed']]
    ];
    const drag = Object.fromEntries(dragPairs.map((pairs, index) => ['unit' + (index + 1), pairs.map(([item, match]) => ({ item, match }))]));

    const hints = [
        'Look for the opening and closing years of the conflict.',
        'Think of Britain’s wartime partners at the start.',
        'Think of Germany’s partners.',
        'Consider the reach of European empires.',
        'Two countries changed their participation that year.',
        'This cause is about loyalty and pride.',
        'Recall the four causes named in the presentation.',
        'Think of goods and markets.',
        'A navy operates at sea.',
        'This was a warship, not a poster.',
        'It was a contest to build fleets.',
        'Think of resources, markets and status.',
        'Another state rules this territory.',
        'It tries to persuade an audience.',
        'It invites people to enlist.'
    ];
    const millionaire = multipleChoice.slice(0, 15).map((item, index) => ({ q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[index] }));

    const jeopardyPrompts = [
        ['Name the war fought from 1914 to 1918.', 'World War I'],
        ['Name the side including Britain, France and Russia at the start.', 'Allied Powers'],
        ['Name the side including Germany, Austria-Hungary and the Ottoman Empire.', 'Central Powers'],
        ['Which country withdrew from World War I in 1917?', 'Russia'],
        ['Which country entered World War I in 1917?', 'The United States'],
        ['What made a European war affect people on other continents?', 'European colonies and empires'],
        ['What is a colony?', 'A territory controlled by another country'],
        ['What is an empire?', 'Territories ruled or controlled by one powerful country'],
        ['What is nationalism?', 'Strong loyalty to one’s nation'],
        ['Name the four long-term causes studied in this topic.', 'Nationalism, industrial rivalry, naval rivalry and empires'],
        ['What does industrialisation increase?', 'Factory and machine-based production'],
        ['Which two countries competed strongly in industry before the war?', 'Britain and Germany'],
        ['What were industrial countries trying to sell in more markets?', 'Manufactured goods'],
        ['Name one benefit a country sought from a colony.', 'Resources, wealth, markets or prestige'],
        ['What is a navy?', 'A country’s armed forces at sea'],
        ['What is a trade route?', 'A path used to move goods between places'],
        ['Name the powerful battleship type Britain introduced.', 'Dreadnought'],
        ['What is a naval race?', 'Competition to build more and stronger warships'],
        ['What title was used by the German emperor?', 'Kaiser'],
        ['Who was King George V’s German cousin?', 'Kaiser Wilhelm II'],
        ['Why could industrial rivalry make relations tense?', 'Countries competed for markets, wealth and industrial strength'],
        ['Why was control of the seas valuable?', 'It helped protect trade and overseas interests'],
        ['How could factories support a stronger navy?', 'They could produce materials and build warships'],
        ['Why did countries compete for overseas territories?', 'For resources, markets, wealth and prestige'],
        ['Which long-term cause is shown by stronger fleets and battleships?', 'Naval rivalry'],
        ['Which long-term cause is shown by strong national pride?', 'Nationalism'],
        ['Which long-term cause is shown by competition for factory markets?', 'Industrial rivalry'],
        ['Which long-term cause is shown by a contest for colonies?', 'Colonisation and empires'],
        ['How could a colony become drawn into a European war?', 'Through its connection to the ruling European power'],
        ['What did recruitment posters ask people to do?', 'Join the armed forces'],
        ['What is propaganda?', 'A message designed to persuade people to support a cause'],
        ['Why might a recruitment poster use patriotic words?', 'To appeal to nationalism and encourage enlistment'],
        ['What is the difference between an ally and a rival?', 'An ally cooperates; a rival competes'],
        ['What did Germany challenge Britain to do at sea?', 'Compete in building strong fleets and warships'],
        ['Why could losing access to sea routes worry an empire?', 'Its trade and overseas possessions might be threatened'],
        ['How did the quest for colonies connect to industry?', 'Colonies could supply resources and markets for manufactured goods'],
        ['Why did naval rivalry connect to imperial rivalry?', 'Navies protected sea routes to overseas colonies'],
        ['Why did family ties between rulers not prevent rivalry?', 'National interests and competition remained stronger than family links'],
        ['What was one human consequence of World War I?', 'Millions died or were injured'],
        ['Explain why no single long-term cause fully accounts for the war.', 'Nationalism, industry, navies and empires reinforced one another']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));

    global.WWIWeek1 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
