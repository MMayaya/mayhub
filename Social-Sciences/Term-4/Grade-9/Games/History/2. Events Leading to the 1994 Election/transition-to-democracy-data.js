/* Grade 9 Social Sciences History, Term 4, Week 2: events leading to the 1994 election.
 * Based on the supplied nine-page lesson: international pressure, Soviet change and political solutions.
 * The lesson's investment statistic is explicitly attributed; Cold War changes are one factor, not the only cause.
 * Historical wording cross-check: https://history.state.gov/milestones/1989-1992/apartheid
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Trade sanctions', 'Restrictions on trade used to put economic pressure on the apartheid government.'],
        ['Foreign investment', 'Money invested in South African businesses or assets by investors from other countries.'],
        ['Disinvestment', 'Withdrawing investments or selling business assets in a country.'],
        ['International isolation', 'Reducing a country’s links with the rest of the world to put pressure on its government.'],
        ['Consumer boycott', 'Refusing to buy selected goods as a form of protest.'],
        ['Sports boycott', 'Refusing sporting contact or excluding a country from international competitions as a protest.'],
        ['Cultural boycott', 'Refusing cultural activities such as performances in a country as a protest.'],
        ['Academic boycott', 'Refusing academic cooperation or exchanges with a country as a protest.'],
        ['Cold War', 'The period of rivalry between the USA and the Soviet Union and their allies.'],
        ['Superpower', 'A country with great global political, economic and military influence.'],
        ['Mikhail Gorbachev', 'The Soviet leader who came to power in 1985 and introduced widespread reforms.'],
        ['USSR', 'The Soviet Union, the communist superpower that supported the ANC during the Cold War.'],
        ['Reform', 'A change intended to improve or alter an existing system.'],
        ['Anti-communism', 'Opposition to communism, used by the National Party to frame its defence of apartheid.'],
        ['ANC', 'The African National Congress, the liberation movement that received Soviet economic and military support.'],
        ['PW Botha', 'The apartheid president who suffered a stroke and resigned in 1989 after losing support within his party.'],
        ['FW de Klerk', 'The president who succeeded Botha and favoured a political solution to South Africa’s conflict.'],
        ['Political solution', 'Resolving political conflict through discussion and agreement rather than military force.'],
        ['Big business', 'Major companies and industries whose losses encouraged support for a political settlement.'],
        ['Strike action', 'Workers stopping work together to put pressure on employers or authorities.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return {
            q,
            options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice),
            a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right
        };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Why did the international community use trade sanctions against South Africa?', 'To put pressure on the apartheid government', 'To reward the government for racial segregation', 'To increase support for apartheid laws', 'To stop every form of protest abroad'),
        mc('What happened to foreign investment between 1970 and 1984, according to the lesson?', 'It dropped by 30%', 'It doubled', 'It stayed unchanged', 'It increased by 30%'),
        mc('Which British bank sold its South African assets?', 'Barclays Bank', 'The Soviet Union’s central bank', 'The African National Congress', 'The National Party'),
        mc('A company sells its South African assets in protest against apartheid. What is this an example of?', 'Disinvestment', 'Academic exchange', 'Strike action', 'Olympic participation'),
        mc('What was the aim of international anti-apartheid groups?', 'To isolate the apartheid state and increase pressure for change', 'To expand South Africa’s international sporting access', 'To defend racial segregation', 'To end criticism of the government'),
        mc('Which form of pressure affected South Africa’s Olympic participation?', 'A sports boycott', 'A rise in foreign investment', 'A school examination boycott', 'A new military alliance with the USSR'),
        mc('People refuse to buy goods associated with apartheid South Africa. What are they organising?', 'A consumer boycott', 'A cultural performance', 'A parliamentary election', 'A military reform'),
        mc('Why were musicians encouraged not to perform in South Africa?', 'To support a cultural boycott against apartheid', 'To increase the apartheid government’s popularity', 'To join the National Party’s leadership', 'To help Barclays buy more South African assets'),
        mc('Which two countries were the main Cold War rivals?', 'The USA and the Soviet Union', 'Britain and South Africa', 'Angola and Zaire', 'South Africa and Guinea'),
        mc('Why did the USA and the Soviet Union support different countries in Africa?', 'They competed for influence during the Cold War', 'They wanted to end all international contact with Africa', 'They had agreed to abolish all military assistance', 'They were the same political state'),
        mc('Who became the leader of the USSR in 1985?', 'Mikhail Gorbachev', 'PW Botha', 'FW de Klerk', 'Nelson Mandela'),
        mc('What did Gorbachev initially hope his reforms would do?', 'Save the Soviet communist system', 'Create apartheid in the Soviet Union', 'Make South Africa the only superpower', 'End all economic changes in the USSR'),
        mc('How did the end of the Cold War affect the apartheid government’s arguments?', 'It weakened the claim that repression was necessary to fight communism', 'It proved that apartheid provided equal rights', 'It made every opponent of apartheid a communist', 'It ended all internal resistance immediately'),
        mc('From which country did the ANC receive economic and military support during the Cold War?', 'The Soviet Union', 'Apartheid South Africa’s government', 'The National Party', 'Barclays Bank'),
        mc('How did the Soviet Union’s economic difficulties affect the ANC?', 'Its important source of external support weakened', 'It gained unlimited new Soviet funding', 'It became the government of the USSR', 'It no longer faced any political conflict'),
        mc('Which president suffered a stroke in 1989?', 'PW Botha', 'Mikhail Gorbachev', 'FW de Klerk', 'Nelson Mandela'),
        mc('Why was Botha pushed to resign, according to the lesson?', 'There was dissatisfaction with his leadership within the National Party', 'He had become the leader of the Soviet Union', 'He had been elected in the 1994 democratic election', 'He had taken control of Barclays Bank'),
        mc('Who succeeded PW Botha as president?', 'FW de Klerk', 'Mikhail Gorbachev', 'Steve Biko', 'Sam Nzima'),
        mc('What kind of solution did de Klerk believe was possible?', 'A political solution rather than a military one', 'Permanent military conflict without talks', 'Solving the conflict only through sports events', 'Ending the conflict by increasing racial exclusions'),
        mc('Why did big business support a political solution?', 'Strikes and sanctions were hurting business', 'Boycotts were increasing profits without interruption', 'It wanted to end all trade and investment permanently', 'It believed the conflict had no economic effects')
    ];

    const extraChoice = [
        mc('How could trade restrictions put pressure on the apartheid government?', 'They could damage trade and the economy', 'They guaranteed higher foreign investment', 'They removed the need for political change', 'They ended every strike inside the country'),
        mc('Which example is mainly a consumer boycott rather than a trade sanction?', 'Shoppers choose not to buy selected South African products', 'A government restricts trade with South Africa', 'A president resigns from office', 'A Soviet leader introduces reforms'),
        mc('Which action shows a withdrawal of foreign investment?', 'An overseas bank sells its South African business assets', 'A foreign bank expands all its South African investments', 'Workers resume production after a strike', 'A musician performs at a new South African concert'),
        mc('Which action would undermine international isolation of apartheid South Africa?', 'Increasing normal sporting and cultural contact with the apartheid state', 'Refusing to perform in South Africa', 'Restricting trade with South Africa', 'Withdrawing business investments'),
        mc('How did sanctions and disinvestment work together?', 'Both increased economic pressure, through different actions', 'Both were ways to provide new military support to the apartheid government', 'Both referred only to workers stopping work', 'Both involved South Africa winning Olympic medals'),
        mc('Which boycott concerns cooperation between universities and researchers?', 'An academic boycott', 'A sports boycott', 'A consumer boycott', 'A workers’ strike'),
        mc('Which action is a cultural boycott rather than a sports boycott?', 'A musician declines a South African performance', 'South Africa is excluded from an international sports event', 'A team refuses to play against South Africa', 'An Olympic competition excludes South Africa'),
        mc('Which pair of African countries is given as examples of superpower involvement in the lesson?', 'Angola and Zaire', 'Guinea and Botswana', 'Britain and the USA', 'The USSR and South Africa'),
        mc('What does “superpower” describe in this lesson?', 'A state with major worldwide influence and military and economic strength', 'Any country that hosts a music concert', 'A local sports club with many players', 'A bank that has sold its assets'),
        mc('Why did Cold War anti-communism affect some Western attitudes towards the apartheid government?', 'They regarded it as an ally against Soviet influence', 'They believed it was governed by the ANC', 'They wanted the Soviet Union to run South Africa', 'They had no political interests in Africa'),
        mc('Which statement best describes Gorbachev’s reforms and their outcome?', 'He aimed to save the Soviet system, but it eventually collapsed', 'He planned to create South African apartheid laws', 'He prevented every change in Soviet politics', 'He made the USSR and USA a single country'),
        mc('Why was calling opponents “communist” useful to the apartheid government?', 'It helped the government portray repression as a defence against communism', 'It guaranteed fair trials and equal political rights', 'It accurately described every opponent’s beliefs', 'It ended overseas criticism of apartheid'),
        mc('What changed for the ANC as Soviet support weakened?', 'It faced a changed balance of external support', 'It gained control of the National Party automatically', 'It received unlimited Soviet money', 'It became an Olympic sporting team'),
        mc('Why was the end of the Cold War relevant to South Africa’s political conflict?', 'It changed the international pressures and interests surrounding that conflict', 'It was the only cause of the end of apartheid', 'It removed every internal grievance about apartheid', 'It cancelled the need for political discussion'),
        mc('Which statement correctly explains the causes of apartheid’s collapse?', 'Several internal and external factors combined', 'Only one foreign leader’s decision mattered', 'South Africa’s internal resistance had no effect', 'Economic pressure had no connection to political change'),
        mc('Which sequence correctly describes the leadership change discussed in the lesson?', 'Botha’s stroke and loss of support, resignation, de Klerk’s presidency', 'De Klerk’s presidency, the 1994 election, Gorbachev’s arrival in 1985', 'Gorbachev becomes South African president, Botha becomes a musician', 'Barclays takes office, the National Party becomes the USSR'),
        mc('Which organisation was dissatisfied with Botha’s leadership?', 'The National Party', 'The Soviet Communist Party', 'The Olympic movement', 'Barclays Bank’s British customers'),
        mc('What is the main difference between a political and a military solution?', 'A political solution seeks agreement rather than victory through force', 'A political solution means refusing any discussion', 'A military solution always involves consumer boycotts', 'Both mean exactly the same approach'),
        mc('Which pressure on business came from inside South Africa?', 'Regular strike action', 'Overseas trade sanctions', 'A foreign bank withdrawing investment', 'International cultural boycotts'),
        mc('How did economic pressure help encourage a political settlement?', 'Business losses increased support for resolving the conflict through politics', 'It made all political disagreement disappear immediately', 'It removed the need to involve opposing groups', 'It made prolonged conflict cost nothing')
    ];

    const trueFalseFacts = [
        ['Trade sanctions were used to pressure the apartheid government.', true, 'Trade restrictions were one form of international economic pressure.'],
        ['Barclays Bank expanded all its South African assets as an anti-apartheid protest.', false, 'The lesson describes Barclays selling its South African assets.'],
        ['Foreign investment dropped between 1970 and 1984, according to the lesson.', true, 'The lesson gives a decline of 30% for this period.'],
        ['A consumer boycott means buying more goods to support the government being protested.', false, 'Consumers refuse to buy selected goods as a form of pressure.'],
        ['International isolation aimed to reduce normal contact with the apartheid state.', true, 'Campaigns used economic, sporting, academic and cultural pressure.'],
        ['Encouraging musicians not to perform in South Africa was a sports boycott.', false, 'Refusing performances was part of the cultural boycott.'],
        ['South Africa’s exclusion from international sporting events added pressure against apartheid.', true, 'Sporting exclusion formed part of international isolation.'],
        ['Academic boycotts were campaigns for universities to increase normal cooperation with apartheid South Africa.', false, 'They involved refusing academic cooperation as a protest.'],
        ['The USA and Soviet Union competed for influence in Africa during the Cold War.', true, 'Both superpowers supported countries as part of their rivalry.'],
        ['Gorbachev became the leader of South Africa in 1985.', false, 'He became the leader of the USSR in 1985.'],
        ['Gorbachev initially hoped reforms would save the Soviet communist system.', true, 'His intended goal was reform, but the Soviet system eventually collapsed.'],
        ['The collapse of Soviet communism was the only reason apartheid ended.', false, 'The lesson identifies several pressures contributing to political change.'],
        ['The National Party used anti-communism to frame its defence of apartheid.', true, 'It portrayed opposition and repression through an anti-communist argument.'],
        ['The ANC relied on Barclays Bank for military support during the Cold War.', false, 'The lesson identifies Soviet economic and military support for the ANC.'],
        ['Changes in the Soviet Union weakened an important source of support for the ANC.', true, 'Soviet difficulties reduced its ability to continue external assistance.'],
        ['PW Botha suffered a stroke only after the 1994 election.', false, 'The lesson dates his stroke and departure from office to 1989.'],
        ['FW de Klerk succeeded PW Botha as president.', true, 'De Klerk took over after Botha’s resignation.'],
        ['De Klerk believed that only a military solution was possible.', false, 'The lesson explains his belief in a political rather than military solution.'],
        ['Strikes and economic sanctions encouraged big business to support a political settlement.', true, 'They were hurting business and increased the incentive to resolve the conflict.'],
        ['Regular strike action was a form of pressure coming only from overseas.', false, 'Strikes were a source of internal pressure within South Africa.']
    ];
    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allChoice = multipleChoice.concat(extraChoice);
    const snakeQuestions = [0, 1, 2, 3].flatMap(index => multipleChoice.slice(index * 5, index * 5 + 5).concat(extraChoice.slice(index * 5, index * 5 + 5)));
    const snake = Object.fromEntries([1, 2, 3, 4].map((number, categoryIndex) => ['game' + number,
        snakeQuestions.slice(categoryIndex * 10, categoryIndex * 10 + 10).map((item, index) => {
            const right = item.a.slice(3);
            const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
            for (let i = 0; i < index % 4; i++) options.push(options.shift());
            return { q: item.q, options, a: options.indexOf(right) };
        })
    ]));

    const factPairs = [
        ['Barclays Bank', 'British bank that sold its South African assets'],
        ['30%', 'Foreign-investment decline stated in the lesson'],
        ['1970 to 1984', 'Period used for the lesson’s foreign-investment comparison'],
        ['Anti-apartheid groups', 'Campaigners who sought to isolate the apartheid state internationally'],
        ['Economic pressure', 'Financial costs and difficulties used to encourage political change'],
        ['Olympic Games', 'International sporting competition from which South Africa was excluded'],
        ['Musicians', 'Performers encouraged not to appear in apartheid South Africa'],
        ['USA', 'Western superpower that competed with the Soviet Union'],
        ['Africa', 'Continent in which the Cold War rivals competed for influence'],
        ['Angola and Zaire', 'African country examples used in the lesson to discuss superpower support'],
        ['1985', 'Year Gorbachev became the Soviet leader'],
        ['Saving the Soviet system', 'Gorbachev’s initial aim when introducing reforms'],
        ['Reduced Soviet assistance', 'Loss of an important source of the ANC’s external support'],
        ['Communist label', 'Description the apartheid government used against political opponents'],
        ['End of the Cold War', 'Change that weakened the government’s claim to be defending the country against Soviet communism'],
        ['1989', 'Year of Botha’s stroke and the presidential leadership change'],
        ['Loss of confidence in Botha', 'Party dissatisfaction that contributed to his resignation'],
        ['Economic sanctions', 'External restrictions that were hurting major South African businesses'],
        ['Leadership succession', 'De Klerk replacing Botha as president'],
        ['Military solution', 'An approach seeking to settle the conflict through force rather than political agreement']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => ['topic' + (index + 1),
        pairs.flatMap(([term, meaning], id) => [{ id: id + 1, text: term }, { id: id + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => ['unit' + (index + 1),
        concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 8, 2, 13, 10, 7, 24, 14, 15, 35, 36, 34, 31, 19, 39];
    const hints = [
        'Consider the intended effect on the apartheid government.',
        'Remember the two rival superpowers.',
        'The lesson names a British bank.',
        'The ANC’s source of support was a communist superpower.',
        'The Soviet leader’s surname begins with G.',
        'Performances belong to culture rather than sport.',
        'Both actions could create costs for the South African economy.',
        'Economic difficulties made continued assistance harder to afford.',
        'Distinguish Botha from the president who succeeded him.',
        'Start with the president who suffered the stroke.',
        'The dissatisfaction came from the party that governed apartheid South Africa.',
        'Think of combined causes, not one single event.',
        'The label was part of how repression was presented to supporters.',
        'Businesses were suffering economic losses.',
        'Higher costs made a political agreement more attractive.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What was the main purpose of trade sanctions against apartheid South Africa?', 'To pressure the apartheid government through restrictions on trade'],
        ['What is foreign investment?', 'Money invested by people or businesses from other countries'],
        ['By what percentage did foreign investment fall between 1970 and 1984, according to the lesson?', '30%'],
        ['Which British bank sold its South African assets?', 'Barclays Bank'],
        ['What is disinvestment?', 'Withdrawing investments or selling assets in a country'],
        ['What did international anti-apartheid groups try to achieve through isolation?', 'Reduce South Africa’s international links and pressure the government to change'],
        ['How can trade sanctions create economic pressure?', 'They restrict trade and can damage the economy'],
        ['What is a consumer boycott?', 'Refusing to buy selected products as a protest'],
        ['How is a consumer boycott different from a government trade sanction?', 'Consumers choose not to buy; governments impose trade restrictions'],
        ['How did sanctions and disinvestment reinforce each other?', 'They increased economic pressure through trade restrictions and withdrawn investments'],
        ['Which international sporting competition excluded apartheid South Africa?', 'The Olympic Games'],
        ['What is a sports boycott?', 'Refusing sporting contact or excluding a country from competitions as a protest'],
        ['Why were musicians asked not to perform in South Africa?', 'To support the cultural boycott against apartheid'],
        ['What is an academic boycott?', 'Refusing academic cooperation or exchanges as a protest'],
        ['Which kind of boycott includes refusal to hold musical performances?', 'A cultural boycott'],
        ['Name the two main Cold War superpowers.', 'The USA and the Soviet Union'],
        ['What is meant by the Cold War?', 'Rivalry between the USA and USSR and their allies'],
        ['Why did the superpowers provide support to countries in Africa?', 'They competed for influence in the continent'],
        ['Name the two African countries used as examples of superpower involvement in the lesson.', 'Angola and Zaire'],
        ['What does “superpower” mean?', 'A country with major global political, military and economic influence'],
        ['Who became leader of the USSR in 1985?', 'Mikhail Gorbachev'],
        ['What did Gorbachev initially hope his reforms would save?', 'The Soviet communist system'],
        ['What happened to the Soviet system despite Gorbachev’s intended reforms?', 'It eventually collapsed'],
        ['What is a reform?', 'A change intended to improve or alter an existing system'],
        ['What does USSR refer to?', 'The Soviet Union'],
        ['What political belief was the National Party strongly opposed to?', 'Communism'],
        ['How did the apartheid government use the label “communist”?', 'To portray opponents and repression as part of a fight against communism'],
        ['How did the end of the Cold War weaken a defence of apartheid?', 'It weakened the claim that repression was needed against Soviet communism'],
        ['Which superpower supported the ANC economically and militarily?', 'The Soviet Union'],
        ['How did Soviet difficulties affect the ANC’s support?', 'They weakened an important source of economic and military assistance'],
        ['Which president suffered a stroke in 1989?', 'PW Botha'],
        ['Which governing party became dissatisfied with Botha’s leadership?', 'The National Party'],
        ['What did Botha do after losing support within his party?', 'He resigned'],
        ['Who succeeded Botha as president?', 'FW de Klerk'],
        ['What kind of solution did de Klerk prefer to a military solution?', 'A political solution'],
        ['How is a political solution different from a military solution?', 'It seeks agreement through politics rather than victory through force'],
        ['Why did big business support a political solution?', 'Strikes and sanctions were causing business losses'],
        ['What is strike action?', 'Workers stopping work together to put pressure on employers or authorities'],
        ['Which source of pressure on business came from inside South Africa?', 'Regular strike action'],
        ['Why is it inaccurate to say one international event alone ended apartheid?', 'Several internal and external pressures combined to bring political change']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.DemocracyWeek2 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
