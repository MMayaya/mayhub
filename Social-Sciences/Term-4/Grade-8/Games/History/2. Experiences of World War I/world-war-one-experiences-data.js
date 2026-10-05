/* Grade 8 Social Sciences History, Term 4, Week 2: Experiences of World War I. */
(function (global) {
    'use strict';

    const concepts = [
        ['Propaganda', 'Messages deliberately used to promote a cause and influence people’s beliefs or emotions.'],
        ['Conscription', 'Compulsory military service required by law.'],
        ['Conscientious objector', 'A person who refuses military service because of deeply held moral, political or religious beliefs.'],
        ['Pacifist', 'A person who believes that fighting in war is wrong.'],
        ['Patriotic', 'Showing love for one’s country and a willingness to support or sacrifice for it.'],
        ['White feather', 'A symbol used in Britain to shame men who were not wearing military uniforms.'],
        ['Trench warfare', 'Fighting in which soldiers live and defend positions in long trenches.'],
        ['Western Front', 'The major World War I battle area along the France–Germany border.'],
        ['Sandbag', 'A bag filled with sand and placed on a trench edge for protection.'],
        ['Duckboard', 'A wooden board placed on the trench floor to help soldiers walk above mud.'],
        ['Dugout', 'A shelter cut into the side of a trench where soldiers could rest.'],
        ["No Man’s Land", 'The exposed area between opposing frontline trenches.'],
        ['Over the top', 'Climbing out of a trench to cross No Man’s Land during an attack.'],
        ['Trench foot', 'A foot condition caused by prolonged cold, wet and dirty trench conditions.'],
        ['Shell shock', 'Mental breakdown linked to the frightening experiences of battle.'],
        ['In Flanders Fields', 'A World War I poem by soldier John McCrae that remembered the dead and encouraged continued fighting.'],
        ['Remembrance Day', 'A day on 11 November when people remember those who died in war.'],
        ['Non-combatant', 'A person who supports a war effort without fighting with weapons.'],
        ['Delville Wood', 'A 1916 battle in France in which South African soldiers suffered heavy losses.'],
        ['SS Mendi', 'The ship that carried black South African labour corps members towards the Western Front in 1917.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('What was the main purpose of British wartime propaganda?', 'To influence support for the war', 'To make trenches dry', 'To end conscription', 'To count the wounded'),
        mc('How did some British propaganda portray Germans?', 'As a dangerous enemy', 'As neutral peacekeepers', 'As British allies', 'As trench builders for Britain'),
        mc('What did the insulting British label “the Hun” refer to?', 'Germans', 'South African labourers', 'British sailors', 'French farmers'),
        mc('In what year did Britain introduce conscription?', '1916', '1914', '1918', '1920'),
        mc('Why did Britain introduce conscription?', 'Voluntary enlistment could no longer replace heavy losses', 'The war had ended', 'There were too many volunteers', 'All trenches had closed'),
        mc('Who was a conscientious objector?', 'Someone who refused military service because of deeply held beliefs', 'A soldier who designed trenches', 'A person who wrote every recruitment poster', 'A general who commanded all fleets'),
        mc('Which set gives the three types of objectors described in the lesson?', 'Pacifist, political and religious', 'Naval, industrial and colonial', 'French, German and British', 'Medical, musical and farming'),
        mc('What did a white feather imply when given to a man without a uniform?', 'That he was being shamed as a coward', 'That he had won a medal', 'That he was a medical officer', 'That he was on leave'),
        mc('What is trench warfare?', 'Fighting from long trenches dug into the ground', 'Fighting only from ships', 'A war fought only by aircraft', 'A type of propaganda'),
        mc('Where was the Western Front mainly located?', 'Along the France–Germany border', 'Along the South African coast', 'Across the Indian Ocean', 'Only in Britain'),
        mc('What helped protect soldiers at the top of a trench?', 'Sandbags', 'Poppies', 'Pianos', 'White feathers'),
        mc('Why were duckboards placed on trench floors?', 'To help soldiers walk above the mud', 'To block recruitment posters', 'To fire machine guns', 'To cover the trench with flowers'),
        mc('What was a dugout?', 'A shelter cut into a trench side', 'The empty space between trenches', 'A ship crossing the Channel', 'A patriotic song'),
        mc('What was No Man’s Land?', 'The exposed area between opposing frontline trenches', 'A sheltered room inside a trench', 'An army training camp in Britain', 'A poem about Flanders'),
        mc('What did “going over the top” mean?', 'Climbing out of a trench to attack across No Man’s Land', 'Building sandbags above a ship', 'Writing a song for soldiers', 'Standing on a duckboard'),
        mc('What could result from cold, wet and dirty trench conditions?', 'Trench foot', 'A white feather', 'A new battleship', 'Conscription'),
        mc('What was shell shock?', 'A mental breakdown linked to battle experiences', 'A trench-building method', 'A wartime song', 'A ship’s engine fault'),
        mc('Who wrote “In Flanders Fields”?', 'John McCrae', 'Kaiser Wilhelm II', 'King George V', 'A Delville Wood general'),
        mc('What did the red poppy become a symbol of?', 'Remembering those who died in war', 'Compulsory enlistment', 'A stronger machine gun', 'South African trade'),
        mc('Which side did South Africa support during World War I?', 'Britain and the Allies', 'Germany and the Central Powers', 'Neither side at any point', 'Only the Ottoman Empire')
    ];

    const extraChoice = [
        mc('How many men volunteered for British armed forces during the war’s first two years?', 'More than 3 million', 'About 3 000', 'Exactly 160', 'Fewer than 100'),
        mc('Which men could initially be called up under Britain’s 1916 conscription system?', 'Single men aged 18 to 41, with some exceptions', 'All children under 18', 'Only women over 41', 'Every man in Europe'),
        mc('When did the white feather campaign begin?', 'Before conscription was introduced', 'Only after the war ended', 'Only in 1939', 'After Remembrance Day began'),
        mc('What was barbed wire intended to do near a trench?', 'Make enemy approaches and attacks harder', 'Keep trench floors dry', 'Carry letters home', 'Replace sandbags inside dugouts'),
        mc('About how many bullets could the machine guns described fire in one minute?', '600', '6', '60', '6 000'),
        mc('How far could the trench network extend behind the front line?', 'Up to about 8 km', 'Only 8 metres', 'About 80 km', 'Across an ocean'),
        mc('What approximate size does the lesson give for a Western Front trench?', '2 metres deep and 2 metres wide', '20 metres deep and 20 metres wide', '20 centimetres deep and wide', '8 kilometres deep and wide'),
        mc('Why were rats common in trenches?', 'Food waste and dead bodies attracted them', 'They were brought as official messengers', 'Duckboards produced them', 'Poppies were their only food'),
        mc('What helped soldiers stay connected with family life at home?', 'Writing letters', 'Crossing No Man’s Land', 'Building machine guns', 'Giving white feathers'),
        mc('Why did some pacifists criticise “In Flanders Fields”?', 'They felt it romanticised war', 'It described a naval battle', 'It opposed remembrance', 'It was written after World War II'),
        mc('Flanders is a region in which country?', 'Belgium', 'South Africa', 'Germany', 'Russia'),
        mc('On which date did World War I end?', '11 November 1918', '11 November 1914', '16 January 1917', '1 January 1916'),
        mc('How could wartime songs support propaganda?', 'By encouraging patriotism and enlistment', 'By drying trench floors', 'By preventing shell shock entirely', 'By replacing all newspapers'),
        mc('How did black, coloured and Indian South Africans mainly serve in the war?', 'As non-combatants doing support work', 'As British government ministers', 'As German emperors', 'As naval admirals only'),
        mc('Which task could a South African non-combatant perform?', 'Digging trenches or carrying stretchers', 'Writing the conscription law', 'Commanding all Allied forces', 'Inventing the white feather'),
        mc('In what year did South Africans fight at Delville Wood?', '1916', '1914', '1918', '1926'),
        mc('According to the lesson, how many of the 3 153 South Africans at Delville Wood survived?', '755', '3 153', '16 000', '600'),
        mc('When did the SS Mendi leave Cape Town?', '16 January 1917', '11 November 1918', '1 August 1914', '16 January 1927'),
        mc('Did the SS Mendi reach the Western Front?', 'No, it did not', 'Yes, without stopping', 'Yes, after the war', 'It was not carrying people'),
        mc('Where did many men carried by the SS Mendi come from?', 'Rural areas of the Eastern Cape', 'Only London', 'Only Flanders', 'Only France')
    ];

    const trueFalseFacts = [
        ['Britain used propaganda to influence public opinion during the war.', true, 'Propaganda was used to shape support for the war.'],
        ['Britain introduced conscription in 1916.', true, 'Britain introduced conscription in 1916.'],
        ['Conscientious objectors could refuse to fight for moral, political or religious reasons.', true, 'The lesson describes all three kinds of objection.'],
        ['A white feather was used to shame some men who were not in uniform.', true, 'It was associated with accusations of cowardice.'],
        ['Sandbags helped protect soldiers at the top of a trench.', true, 'Sandbags helped shield soldiers from enemy fire.'],
        ['Duckboards helped soldiers walk above muddy trench floors.', true, 'Duckboards were placed on trench floors.'],
        ['No Man’s Land lay between opposing frontline trenches.', true, 'It was the exposed area between opposing trenches.'],
        ['Shell shock could include anxiety and nightmares.', true, 'The lesson lists anxiety, sleeplessness and nightmares among its effects.'],
        ['John McCrae wrote “In Flanders Fields”.', true, 'John McCrae wrote the poem.'],
        ['Black South Africans served in support roles aboard the SS Mendi.', true, 'The Mendi carried black South African non-combatants.'],
        ['Conscription meant that military service was always voluntary.', false, 'Conscription meant compulsory military service.'],
        ['All conscientious objectors refused to fight for exactly the same reason.', false, 'Moral, political and religious reasons differed.'],
        ['A white feather was mainly a medal for bravery.', false, 'It was used to shame men perceived as not joining the army.'],
        ['Trenches kept soldiers completely safe from enemy attack.', false, 'Trenches offered protection but soldiers remained in danger.'],
        ['No Man’s Land was a sheltered place to rest.', false, 'It was exposed ground between opposing trenches.'],
        ['Trench foot was caused by warm, dry and clean conditions.', false, 'Cold, wet and dirty conditions could cause trench foot.'],
        ['“In Flanders Fields” was written to oppose all further fighting.', false, 'The poem remembered the dead and encouraged surviving soldiers to continue fighting.'],
        ['The poppy symbolised Britain’s introduction of conscription.', false, 'The poppy became a symbol of remembrance.'],
        ['South Africa supported Germany during World War I.', false, 'South Africa fought on Britain’s side.'],
        ['The SS Mendi successfully reached the Western Front.', false, 'The ship never reached the Western Front.']
    ];

    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allSnake = multipleChoice.concat(extraChoice).map(item => ({
        q: item.q,
        options: item.options.map(option => option.slice(3)),
        a: item.options.indexOf(item.a)
    }));
    const snake = Object.fromEntries([1, 2, 3, 4].map((number, index) => ['game' + number, allSnake.slice(index * 10, index * 10 + 10)]));

    const matchingSets = [
        [
            ['Propaganda', 'Messages designed to influence people’s opinions'],
            ['Conscription', 'Military service required by law'],
            ['Conscientious objector', 'Person refusing military service because of deep beliefs'],
            ['Pacifist', 'Person who believes war is wrong'],
            ['Political objector', 'Person refusing because of political views'],
            ['Religious objector', 'Person refusing because fighting conflicts with faith'],
            ['White feather', 'Symbol used to shame men who were not in uniform'],
            ['Patriotism', 'Love and support for one’s country'],
            ['Recruitment poster', 'Visual message urging men to enlist'],
            ['1916', 'Year Britain introduced conscription']
        ],
        [
            ['Trench warfare', 'Fighting from long ditches dug into the ground'],
            ['Western Front', 'War area mainly along the France–Germany border'],
            ['Sandbags', 'Bags on trench edges to protect from bullets'],
            ['Duckboards', 'Wooden boards above the mud on trench floors'],
            ['Dugout', 'Shelter cut into a trench side'],
            ['Barbed wire', 'Obstacle intended to slow enemy attackers'],
            ['Machine gun', 'Weapon that could fire hundreds of bullets per minute'],
            ["No Man’s Land", 'Exposed space between opposing frontline trenches'],
            ['Over the top', 'Climbing out of a trench to attack'],
            ['Support trench', 'Trench behind the front line for supplies or reinforcement']
        ],
        [
            ['Trench foot', 'Foot condition linked to cold, wet trench conditions'],
            ['Shell shock', 'Mental breakdown linked to frightening battle experiences'],
            ['Rats', 'Animals drawn to trench food waste and dead bodies'],
            ['Letters home', 'A connection between soldiers and their families'],
            ['John McCrae', 'Soldier who wrote “In Flanders Fields”'],
            ['Flanders', 'Region of Belgium associated with trench fighting'],
            ['Poppy', 'Flower that became a symbol of remembrance'],
            ['Remembrance Day', '11 November commemoration of war dead'],
            ['Romanticise', 'Present something as more attractive than it really is'],
            ['Wartime music', 'Songs that entertained and could encourage patriotism']
        ],
        [
            ['South Africa', 'Country that fought on Britain’s side'],
            ['Non-combatant', 'Participant who did not fight with weapons'],
            ['Black South African labourers', 'Men assigned support duties because they were barred from carrying weapons'],
            ['Delville Wood', '1916 battle in France with heavy South African losses'],
            ['3 153', 'South Africans who entered the Delville Wood battle in the lesson'],
            ['755', 'Delville Wood survivors according to the lesson'],
            ['SS Mendi', 'Ship carrying black South African labour corps members'],
            ['Eastern Cape', 'Rural region many men aboard the Mendi came from'],
            ['16 January 1917', 'Date the Mendi left Cape Town'],
            ['Native Labour Corps', 'South African unit whose 5th Battalion travelled on the Mendi']
        ]
    ];
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));

    const dragPairs = [
        [['Propaganda', 'Deliberate messaging intended to influence support for the war'], ['Conscription', 'Compulsory military service required by law'], ['Conscientious objector', 'Someone who refused service because of deep beliefs'], ['White feather', 'Symbol used to shame men not in military uniform'], ['Pacifist', 'Someone who believes war is wrong']],
        [['Sandbags', 'Bags protecting the top of a trench'], ['Duckboards', 'Wooden boards laid above the mud'], ['Dugout', 'Shelter cut into a trench side'], ["No Man’s Land", 'Exposed ground between opposing trenches'], ['Over the top', 'Leaving the trench to attack across exposed ground']],
        [['Trench foot', 'Foot condition associated with cold and wet'], ['Shell shock', 'Mental breakdown linked to battle experiences'], ['John McCrae', 'Writer of “In Flanders Fields”'], ['Poppy', 'Symbol used to remember the war dead'], ['Music', 'Entertainment that could also spread patriotic messages']],
        [['South Africa', 'Supported Britain during World War I'], ['Non-combatants', 'Served without fighting with weapons'], ['Delville Wood', '1916 battle with heavy South African losses'], ['SS Mendi', 'Ship carrying members of the South African Native Labour Corps'], ['Eastern Cape', 'Region from which many men aboard the Mendi came']]
    ];
    const drag = Object.fromEntries(dragPairs.map((pairs, index) => ['unit' + (index + 1), pairs.map(([item, match]) => ({ item, match }))]));

    const hints = [
        'Think of messages that shape opinions.', 'This was a portrayal of the enemy.', 'This was an insulting wartime name.',
        'It was introduced after voluntary enlistment became insufficient.', 'Think of military losses and new recruits.',
        'The reason was rooted in belief or principle.', 'There were three kinds of objection in the presentation.',
        'The feather was meant to shame, not reward.', 'Soldiers lived and fought in long ditches.',
        'It lay near France and Germany.', 'Look at the top edge of a trench.', 'They were placed on muddy floors.',
        'This was a place to rest inside the trench wall.', 'The ground lay between two front lines.',
        'This phrase describes leaving the trench to attack.'
    ];
    const millionaire = multipleChoice.slice(0, 15).map((item, index) => ({
        q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[index]
    }));

    const jeopardyPrompts = [
        ['What is propaganda?', 'Messages deliberately used to promote a cause and influence opinion'],
        ['Why did Britain need more soldiers by 1916?', 'Heavy losses made voluntary enlistment insufficient'],
        ['What did conscription require?', 'Military service by law for eligible men'],
        ['Name one medium British propaganda used.', 'Posters or newspapers'],
        ['What did British propaganda urge men to do?', 'Enlist and fight for their country'],
        ['What did the insulting label “the Hun” refer to?', 'Germans'],
        ['Who was a conscientious objector?', 'A person refusing military service because of deeply held beliefs'],
        ['Name the three types of objection described.', 'Pacifist, political and religious'],
        ['What did a pacifist believe?', 'That war or fighting was wrong'],
        ['What did a white feather communicate?', 'Shame or an accusation of cowardice'],
        ['What is trench warfare?', 'Fighting from trenches dug into the ground'],
        ['Where was the Western Front mainly situated?', 'Along the France–Germany border'],
        ['Why did soldiers keep their heads below trench tops?', 'To avoid enemy bullets and shells'],
        ['What protected the top of a trench?', 'Sandbags'],
        ['What helped soldiers walk above mud?', 'Duckboards'],
        ['Where could a soldier rest within a trench?', 'A dugout'],
        ['What obstructed enemy attacks near trenches?', 'Barbed wire'],
        ['Why were support trenches built behind the front line?', 'For supplies and reinforcements'],
        ['What was No Man’s Land?', 'Exposed ground between opposing frontline trenches'],
        ['What did “over the top” mean?', 'Climbing out of a trench to attack across No Man’s Land'],
        ['Which condition could wet boots and socks cause?', 'Trench foot'],
        ['Why were rats common in trenches?', 'Food waste and dead bodies attracted them'],
        ['What helped soldiers remain connected with family?', 'Writing letters'],
        ['What was shell shock?', 'Mental breakdown linked to the trauma of battle'],
        ['Name one symptom of shell shock.', 'Anxiety, nightmares, sleeplessness, muscle twitches or stomach cramps'],
        ['Who wrote “In Flanders Fields”?', 'John McCrae'],
        ['What did the poem encourage surviving soldiers to do?', 'Continue fighting'],
        ['Why did some pacifists criticise the poem?', 'They believed it romanticised war'],
        ['Which flower symbolises remembrance of the war dead?', 'The red poppy'],
        ['How could music support the war effort?', 'It could encourage patriotism or enlistment'],
        ['Which side did South Africa support in World War I?', 'Britain and the Allies'],
        ['What is a non-combatant?', 'A wartime participant who does not fight with weapons'],
        ['Why did black South African men serve mainly in support roles?', 'They were not allowed to carry weapons'],
        ['Name a support duty performed by men aboard the Mendi.', 'Digging trenches, carrying stretchers or repairing roads'],
        ['Where did South African soldiers fight at Delville Wood?', 'France'],
        ['In which year was the Battle of Delville Wood?', '1916'],
        ['How many of the 3 153 South Africans at Delville Wood survived, according to the lesson?', '755'],
        ['What ship carried black South African labour corps members in 1917?', 'The SS Mendi'],
        ['When did the SS Mendi leave Cape Town?', '16 January 1917'],
        ['Did the SS Mendi reach the Western Front?', 'No']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));

    global.WWIWeek2 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
