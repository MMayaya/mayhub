/* Grade 8 Social Sciences History, Term 4, Week 3: women and the end of World War I. */
(function (global) {
    'use strict';

    const concepts = [
        ['War work', 'Work done to keep farms, factories and services operating while many men were fighting.'],
        ['Workforce shortage', 'A lack of workers after large numbers of men left civilian jobs for the armed forces.'],
        ['Military nurse', 'A woman who cared for wounded or injured soldiers during the war.'],
        ['Factory worker', 'A person who made goods, including wartime supplies, in a factory.'],
        ['Farm worker', 'A person whose work helped maintain food production during the war.'],
        ['Suffrage', 'The right to vote in political elections.'],
        ['Suffragette', 'A woman who campaigned for women’s right to vote in Britain.'],
        ['Civil disobedience', 'Deliberately refusing to obey certain laws as a form of protest.'],
        ['Hunger strike', 'Deliberately refusing food to draw attention to a cause.'],
        ['Emmeline Pankhurst', 'A leader of the British suffragette movement who campaigned for votes for women.'],
        ['Emily Wilding Davison', 'A suffragette fatally injured after running in front of the King’s horse at a race.'],
        ['Representation of the People Act 1918', 'The law that gave voting rights to all men aged 21 or over and certain qualifying women aged 30 or over.'],
        ['Armistice', 'An agreement that stops the fighting.'],
        ['Peace treaty', 'A formal agreement setting terms after the fighting has stopped.'],
        ['Treaty of Versailles', 'The main postwar peace agreement that imposed terms on Germany.'],
        ['Reparations', 'Payments required from a defeated country for damage caused by war.'],
        ['War Guilt Clause', 'The treaty condition requiring Germany to accept responsibility for the war.'],
        ['Territorial loss', 'The loss of land imposed on Germany after the war.'],
        ['Military restrictions', 'Limits placed on Germany’s ability to rebuild powerful armed forces.'],
        ['Weimar Republic', 'The new German republic whose government agreed to stop fighting in 1918.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Why did Britain need women in more civilian jobs during World War I?', 'Many men had left those jobs to fight', 'Factories had stopped operating', 'The war had ended before 1914', 'Women had been required to join combat units'),
        mc('Which belief limited many British women’s opportunities before the war?', 'A woman’s place was thought to be in the home', 'Women had equal employment choices', 'All women could vote', 'Girls were required to work in factories'),
        mc('Which women often had to work even before World War I?', 'Widows and women from poorer households', 'Only members of Parliament', 'Only soldiers', 'No women at all'),
        mc('Which wartime role involved caring for wounded soldiers?', 'Military nursing', 'Writing the peace treaty', 'Leading a trench attack', 'Inspecting German borders'),
        mc('Which jobs helped keep food and supplies available during the war?', 'Farm and factory work', 'Only trench fighting', 'Only treaty negotiations', 'Only election counting'),
        mc('How many women were employed in Britain in July 1914, according to the lesson?', '3 275 000', '4 741 000', '755', '21 000'),
        mc('How many women were employed in Britain in January 1918, according to the lesson?', '4 741 000', '3 275 000', '3 153', '30 000'),
        mc('What did women’s wartime work demonstrate?', 'They could perform jobs previously treated as men’s work', 'They could work only inside their homes', 'Factories did not need workers', 'No attitudes could change'),
        mc('What happened to some women’s employment when men returned after the war?', 'Competition and conflict over jobs increased', 'Every woman kept the same job automatically', 'All factories closed forever', 'No men returned to civilian life'),
        mc('What is suffrage?', 'The right to vote', 'An agreement to stop fighting', 'Payment for war damage', 'A factory tool'),
        mc('Who were the suffragettes?', 'Women campaigning for voting rights', 'Only nurses on the Western Front', 'German peace negotiators', 'Women opposed to every election'),
        mc('What is civil disobedience?', 'Deliberately breaking or refusing certain laws to protest', 'Signing an armistice', 'Paying reparations', 'Returning to domestic work'),
        mc('Which action was used by some suffragettes?', 'Chaining themselves to Parliament railings', 'Signing the Treaty of Versailles', 'Building German warships', 'Banning all elections'),
        mc('What is a hunger strike?', 'Refusing food to draw attention to a cause', 'A shortage of farm workers', 'A treaty penalty', 'A military order'),
        mc('Who was an important leader of the British suffragette movement?', 'Emmeline Pankhurst', 'John McCrae', 'Kaiser Wilhelm II', 'Sir Eric Geddes'),
        mc('What happened to suffragette Emily Wilding Davison?', 'She died after being injured at a horse race', 'She signed the armistice', 'She became German chancellor', 'She invented military nursing'),
        mc('Which women gained the parliamentary vote under the 1918 Act?', 'Certain women aged 30 or over who met qualifications', 'All women of every age', 'Only women under 21', 'No women at all'),
        mc('At what age could most men vote under the 1918 Act?', '21', '18', '30', '41'),
        mc('What is an armistice?', 'An agreement to stop fighting', 'A treaty payment', 'A voting protest', 'A factory job'),
        mc('What was the main postwar peace agreement with Germany?', 'Treaty of Versailles', 'Representation of the People Act', 'White Feather Agreement', 'Treaty of Delville Wood')
    ];

    const extraChoice = [
        mc('What was the common prewar expectation for many married women?', 'Managing the household and caring for children', 'Commanding the army', 'Voting in every election', 'Negotiating peace treaties'),
        mc('Which prewar jobs were available to some British women?', 'Domestic, office, teaching and clothing work', 'Only battlefield combat', 'Only treaty writing', 'Only naval command'),
        mc('Why did girls often receive less encouragement to pursue education?', 'People assumed they would mainly become wives and mothers', 'Education had become illegal', 'Girls already held every political office', 'They were all working in trenches'),
        mc('Why did women work in weapons factories during the war?', 'To produce materials needed for the war effort', 'To negotiate the peace treaty', 'To replace Parliament', 'To write the War Guilt Clause'),
        mc('Which group was not permitted to fight as soldiers in the British armed forces in this lesson?', 'Women serving as nurses', 'All men aged 21', 'German soldiers', 'Returning male workers'),
        mc('Which term means a political right to vote?', 'Suffrage', 'Reparations', 'Armistice', 'Conscription'),
        mc('What did suffragette hunger strikes often follow?', 'Arrest and imprisonment', 'Signing the armistice', 'Taking a factory job', 'Returning from a trench'),
        mc('Where did suffragettes sometimes chain themselves in protest?', 'To Parliament railings', 'To the Treaty of Versailles', 'To trench duckboards', 'To factory machines'),
        mc('What did World War I change about opinions of women’s abilities?', 'Their contributions challenged older assumptions', 'It proved they could not work outside home', 'It ended all political debate immediately', 'It made every job disappear'),
        mc('What extra condition applied to many women voters in 1918?', 'A property-related qualification', 'Military rank', 'Factory employment only', 'A German passport'),
        mc('What came after the armistice stopped the fighting?', 'Peace negotiations and a treaty', 'The start of World War I', 'A new trench attack', 'The first suffragette protest'),
        mc('What government agreed to stop fighting for Germany in 1918?', 'The Weimar government', 'The British Parliament', 'The South African Native Labour Corps', 'The suffragettes'),
        mc('Why did Germany have little say in the Treaty of Versailles?', 'The victorious countries dictated the terms', 'Germany wrote every condition', 'The treaty was signed before the war', 'Women voted on each clause'),
        mc('What were reparations?', 'Payments for war damage', 'Voting rights for all women', 'A type of nursing', 'A protest march'),
        mc('Which treaty term required Germany to accept responsibility for the war?', 'War Guilt Clause', 'Hunger Strike Clause', 'Factory Work Clause', 'Armistice Clause'),
        mc('What happened to some German territory under the treaty?', 'Germany lost land', 'Germany gained all of Britain', 'All borders disappeared', 'Germany lost no land at all'),
        mc('What happened to Germany’s armed forces under the treaty?', 'Their rebuilding was restricted', 'They could expand without limit', 'They were replaced by suffragettes', 'No military term was included'),
        mc('Why did many Germans resent the treaty?', 'It imposed harsh terms without equal negotiation', 'Germany gained every demand', 'It ended all payments', 'It gave Germany no responsibilities'),
        mc('What does a peace treaty do that an armistice does not?', 'Set terms for what happens after the fighting', 'Immediately create factory jobs', 'Grant suffrage automatically', 'Only stop gunfire'),
        mc('Which sequence best fits the end of World War I?', 'Armistice, peace talks, Treaty of Versailles', 'Treaty, war begins, armistice', 'Reparations, war begins, women enlist', 'Election, suffragettes, trenches')
    ];

    const trueFalseFacts = [
        ['Many British women took on new jobs as men left civilian work to fight.', true, 'The departure of men created worker shortages.'],
        ['Some women worked in factories and on farms during the war.', true, 'Women helped maintain manufacturing and food production.'],
        ['Women served as nurses caring for wounded soldiers.', true, 'Nursing was an important wartime role.'],
        ['The number of employed British women rose between July 1914 and January 1918 in the lesson.', true, 'The lesson gives 3 275 000 and 4 741 000 respectively.'],
        ['A suffragette campaigned for women’s voting rights.', true, 'Suffragettes sought women’s suffrage.'],
        ['Civil disobedience can involve deliberate lawbreaking as a protest.', true, 'It is deliberate refusal to obey certain laws for a cause.'],
        ['Emmeline Pankhurst helped lead the British suffragette movement.', true, 'Emmeline Pankhurst was a leading suffragette.'],
        ['The 1918 law gave voting rights to certain qualifying women aged 30 or over.', true, 'Women also needed to meet a qualification.'],
        ['An armistice stops the fighting.', true, 'An armistice is an agreement to stop fighting.'],
        ['The Treaty of Versailles required Germany to pay reparations.', true, 'Reparations were part of the treaty penalties.'],
        ['Before World War I, all British women had the parliamentary vote.', false, 'Women did not yet have the parliamentary vote.'],
        ['Women’s wartime work was limited to staying at home.', false, 'Women worked in nursing, factories, farms and other jobs.'],
        ['A hunger strike means eating more food to make a political point.', false, 'It means refusing food to draw attention to a cause.'],
        ['The 1918 voting law gave every British woman aged 21 or over the vote.', false, 'It enfranchised certain qualifying women aged 30 or over.'],
        ['In 1918 women and men voted under exactly the same age and qualification rules.', false, 'Women faced a higher age threshold and additional qualifications.'],
        ['Emily Wilding Davison negotiated Germany’s armistice.', false, 'She was a suffragette fatally injured at a horse race.'],
        ['A peace treaty and an armistice are exactly the same thing.', false, 'An armistice stops fighting; a treaty sets peace terms.'],
        ['Germany negotiated the Treaty of Versailles as an equal partner.', false, 'The victorious countries largely dictated the treaty terms.'],
        ['The War Guilt Clause gave Germany extra territory.', false, 'It required Germany to accept responsibility for the war.'],
        ['The Treaty of Versailles allowed Germany to rebuild an unlimited military.', false, 'The treaty restricted German armed forces.']
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

    const matchingSets = [
        [
            ['Women before the war', 'Generally had fewer rights and work opportunities than men'],
            ['Domestic work', 'Paid work in a household'],
            ['Worker shortage', 'A lack of workers after men left for military service'],
            ['Military nursing', 'Care for wounded soldiers'],
            ['Factory work', 'Making goods and wartime supplies'],
            ['Farm work', 'Helping to keep food production going'],
            ['July 1914', 'Date linked to 3 275 000 employed British women'],
            ['January 1918', 'Date linked to 4 741 000 employed British women'],
            ['Postwar job competition', 'Conflict as men returned to civilian employment'],
            ['Workplace independence', 'Greater freedom some women wanted to keep after the war']
        ],
        [
            ['Suffrage', 'The right to vote'],
            ['Suffragette', 'Woman campaigning for the vote'],
            ['Civil disobedience', 'Deliberate lawbreaking to protest'],
            ['Hunger strike', 'Refusing food to draw attention to a cause'],
            ['Emmeline Pankhurst', 'Leading British suffragette campaigner'],
            ['Emily Wilding Davison', 'Suffragette fatally injured at a horse race'],
            ['Parliament railings', 'Place where some suffragettes chained themselves'],
            ['Window breaking', 'Dramatic protest used by some suffragettes'],
            ['Imprisonment', 'Consequence faced by many suffragette protesters'],
            ['Public attention', 'What dramatic protests aimed to gain']
        ],
        [
            ['Representation of the People Act 1918', 'Law granting some women a parliamentary vote'],
            ['Women aged 30 or over', 'Female age group eligible for the vote if qualified in 1918'],
            ['Men aged 21 or over', 'Male age group given the vote under the 1918 Act'],
            ['Property qualification', 'Extra condition applying to many female voters in 1918'],
            ['Political inequality', 'Men and women still had different voting rules'],
            ['1918', 'Year World War I ended'],
            ['Weimar Republic', 'New German republic whose government stopped fighting'],
            ['Armistice', 'Agreement to stop fighting'],
            ['Peace treaty', 'Agreement setting conditions after fighting stops'],
            ['Treaty of Versailles', 'Main peace agreement with Germany after the war']
        ],
        [
            ['No equal negotiation', 'Germany had little say in the treaty conditions'],
            ['Reparations', 'Payments for damage caused by war'],
            ['Territorial loss', 'Land Germany had to give up'],
            ['War Guilt Clause', 'Condition requiring Germany to accept responsibility'],
            ['Military restrictions', 'Limits on rebuilding German armed forces'],
            ['Victorious countries', 'States that largely dictated the treaty terms'],
            ['Financial burden', 'Effect of reparations on Germany'],
            ['Resentment', 'Anger many Germans felt toward the treaty'],
            ['Peace terms', 'Conditions settled after an armistice'],
            ['Long-term consequences', 'Later instability to which treaty resentment contributed']
        ]
    ];
    const match = Object.fromEntries(matchingSets.map((pairs, index) => [
        'topic' + (index + 1),
        pairs.flatMap(([term, meaning], pairIndex) => [{ id: pairIndex + 1, text: term }, { id: pairIndex + 1, text: meaning }])
    ]));

    const dragPairs = [
        [['Military nurses', 'Cared for soldiers wounded in battle'], ['Factory workers', 'Made weapons and other wartime supplies'], ['Farm workers', 'Helped keep food production going'], ['Worker shortage', 'Developed when many men joined the armed forces'], ['Returning soldiers', 'Contributed to postwar competition for jobs']],
        [['Suffrage', 'The right to vote'], ['Civil disobedience', 'Deliberately disobeying laws as protest'], ['Hunger strike', 'Refusing food for a political cause'], ['Emmeline Pankhurst', 'Leader of the British suffragette movement'], ['Emily Wilding Davison', 'Died after being injured at a horse race']],
        [['1918 voting Act', 'Gave some qualified women aged 30 or over the vote'], ['Men aged 21 or over', 'Male group enfranchised under the 1918 law'], ['Property qualification', 'Condition attached to many women’s voting rights'], ['Armistice', 'Agreement to stop fighting'], ['Peace treaty', 'Agreement setting terms after the fighting']],
        [['Treaty of Versailles', 'Main peace agreement imposed on Germany'], ['Reparations', 'Payments for war damage'], ['Territorial loss', 'Germany giving up land'], ['War Guilt Clause', 'Germany accepting responsibility for the war'], ['Military restrictions', 'Limits on rebuilding German armed forces']]
    ];
    const drag = Object.fromEntries(dragPairs.map((pairs, index) => ['unit' + (index + 1), pairs.map(([item, match]) => ({ item, match }))]));

    const millionaireSelection = [
        multipleChoice[0], multipleChoice[2], multipleChoice[3], multipleChoice[4], multipleChoice[7],
        multipleChoice[9], multipleChoice[10], multipleChoice[11], multipleChoice[13], multipleChoice[14],
        multipleChoice[16], multipleChoice[18], multipleChoice[19], extraChoice[13], extraChoice[14]
    ];
    const hints = [
        'Think of men leaving civilian workplaces.', 'Some women had to earn an income before the war.',
        'These women treated injured soldiers.', 'Food and wartime materials were still needed.',
        'Their work challenged a stereotype.', 'It means the right to vote.',
        'This movement wanted a political voice.', 'A protest may deliberately disobey laws.',
        'The refusal concerns food.', 'Her first name is Emmeline, not Emily.',
        'Age alone was not enough for every woman.', 'This agreement stopped the fighting.',
        'Name the main peace agreement with Germany.', 'These were payments for war damage.',
        'This clause required Germany to accept responsibility.'
    ];
    const millionaire = millionaireSelection.map((item, index) => ({
        q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a), hint: hints[index]
    }));

    const jeopardyPrompts = [
        ['Why did World War I create worker shortages in Britain?', 'Many men left civilian jobs to join the armed forces'],
        ['What household role was traditionally expected of many married women?', 'Managing the home and caring for children'],
        ['Name one paid job open to some women before the war.', 'Domestic, office, teaching or clothing work'],
        ['Which wartime job involved caring for injured soldiers?', 'Military nursing'],
        ['Name one reason Britain needed women in factories.', 'To make weapons or other supplies while men were fighting'],
        ['What kind of work helped keep food production going?', 'Farm work'],
        ['How many British women were employed in July 1914 in the lesson?', '3 275 000'],
        ['How many British women were employed in January 1918 in the lesson?', '4 741 000'],
        ['What did women’s wartime work challenge?', 'The belief that women could not do demanding jobs'],
        ['Why was there conflict over jobs after the war?', 'Returning men and working women competed for jobs'],
        ['What is suffrage?', 'The right to vote'],
        ['Who were the suffragettes?', 'Women who campaigned for voting rights'],
        ['What is civil disobedience?', 'Deliberately refusing to obey certain laws as a protest'],
        ['Name one dramatic suffragette protest method.', 'Window breaking, marches, chaining to railings or disrupting meetings'],
        ['What is a hunger strike?', 'Refusing food to draw attention to a cause'],
        ['Which Pankhurst led the British suffragette movement?', 'Emmeline Pankhurst'],
        ['Which suffragette was fatally injured at a horse race?', 'Emily Wilding Davison'],
        ['What political change did some qualified women gain in 1918?', 'The parliamentary vote'],
        ['What was the minimum age for qualifying women voters under the 1918 Act?', '30'],
        ['What extra qualification applied to many women voters in 1918?', 'A property-related qualification'],
        ['At what age did men generally receive the vote under the 1918 Act?', '21'],
        ['Why were men and women not politically equal in 1918?', 'Women faced a higher age and property qualification'],
        ['What year did World War I end?', '1918'],
        ['What is an armistice?', 'An agreement to stop fighting'],
        ['Which German government agreed to stop fighting in 1918?', 'The Weimar government'],
        ['What is a peace treaty?', 'A formal agreement setting the terms after a war'],
        ['Name the main peace treaty with Germany after World War I.', 'Treaty of Versailles'],
        ['Why did Germany have little say in the Treaty of Versailles?', 'The victorious countries largely dictated its terms'],
        ['What were reparations?', 'Payments for war damage'],
        ['Which treaty condition required Germany to accept responsibility?', 'War Guilt Clause'],
        ['What happened to some German territory under the treaty?', 'Germany lost land'],
        ['How did the treaty limit Germany’s defence force?', 'It restricted rebuilding a powerful military'],
        ['Name one of the treaty’s major penalties besides reparations.', 'Territorial loss, the War Guilt Clause or military restrictions'],
        ['Why did reparations burden Germany?', 'They required large payments after the war'],
        ['Why did many Germans resent the treaty?', 'They faced harsh terms with little equal negotiation'],
        ['What is the difference between an armistice and a treaty?', 'An armistice stops fighting; a treaty sets peace terms'],
        ['How did wartime work affect some women’s independence?', 'It gave them paid work and broader opportunities'],
        ['Why did suffragettes use attention-grabbing protests?', 'To press the public and government to consider voting rights'],
        ['What helped persuade Parliament to expand women’s voting rights?', 'Long campaigning and women’s demonstrated wartime contribution'],
        ['What is one long-term effect of resentment over the treaty?', 'It contributed to later political instability in Germany']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));

    global.WWIWeek3 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
