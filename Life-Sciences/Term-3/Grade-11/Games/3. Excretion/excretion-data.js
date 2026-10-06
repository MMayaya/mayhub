/* Grade 11 Life Sciences, Term 3, Topic 3: Excretion.
 * All 17 pages of Topic 3.pdf were reviewed, including organ diagrams, the
 * comparison table and the class activity. No unseen diagram is required.
 * Urinary-system anatomy, treatments and disease topics are left to Topic 4.
 * The lesson's large-intestine example is carefully qualified: certain metals
 * can leave by the digestive route; this does not make undigested food a
 * metabolic waste or imply that all metal elimination occurs in the colon.
 * Ammonia in urine is largely present as ammonium; the lesson's name is retained
 * without teaching that humans excrete most nitrogen as free ammonia.
 * Factual checks (not copied question banks):
 * https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work
 * https://openstax.org/books/biology-2e/pages/41-4-nitrogenous-wastes
 * https://archive.cdc.gov/www_atsdr_cdc_gov/csem/leadtoxicity/biologic_fate.html
 */
(function (global) {
    'use strict';
    const concepts = [
        ['Excretion', 'The removal from the body of metabolic wastes and substances present in excess.'],
        ['Metabolism', 'The chemical reactions taking place in living cells that can produce useful substances and waste.'],
        ['Metabolic waste', 'An unwanted by-product of chemical reactions in living cells.'],
        ['Waste accumulation', 'The build-up of unwanted substances when their removal does not keep pace with production.'],
        ['Waste transport', 'The movement of unwanted substances away from cells towards organs that remove them.'],
        ['Skin', 'The outer body organ that contributes to excretion by releasing sweat.'],
        ['Sweat', 'The liquid released through the skin containing water, salts and small amounts of urea.'],
        ['Lungs', 'The organs that remove carbon dioxide and some water during breathing.'],
        ['Carbon dioxide', 'The gaseous metabolic waste produced during aerobic cellular respiration.'],
        ['Water vapour', 'Water in its gaseous form, some of which leaves the body in exhaled air.'],
        ['Kidneys', 'The organs that remove wastes and excess water from blood to form urine.'],
        ['Urine', 'The liquid formed by the kidneys containing water and dissolved waste substances.'],
        ['Urea', 'A nitrogen-containing metabolic waste removed mainly in urine and in small amounts in sweat.'],
        ['Uric acid', 'A nitrogen-containing waste acid removed from the blood by the kidneys.'],
        ['Ammonia', 'A potentially harmful nitrogen-containing waste; in urine it is mainly present as ammonium.'],
        ['Large intestine', 'The digestive organ providing an exit route for some eliminated substances, including certain heavy metals.'],
        ['Heavy metals', 'Metallic substances that can be harmful if they accumulate, with certain types eliminated via the digestive route.'],
        ['Excess water', 'Water present beyond the amount the body needs to retain.'],
        ['Excess salts', 'Mineral salts present beyond the amounts the body needs to retain.'],
        ['Cellular respiration', 'The energy-releasing process in cells that produces carbon dioxide during its aerobic form.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('What is the removal of metabolic wastes from the body called?', 'Excretion', 'Ingestion', 'Absorption of food', 'Growth'),
        mc('What name describes the chemical reactions taking place in living cells?', 'Metabolism', 'Only breathing', 'Only sweating', 'Only swallowing'),
        mc('A cell makes an unwanted by-product during a chemical reaction. How is this by-product classified?', 'Metabolic waste', 'Undigested food in the intestine', 'A newly swallowed nutrient', 'A useful product in every case'),
        mc('Waste is produced faster than it is removed. What may occur?', 'Waste accumulation', 'The disappearance of all waste', 'The end of all cell reactions', 'Automatic removal without any organ'),
        mc('Blood carries a waste substance away from a cell towards a removal organ. Which part of the process is this?', 'Waste transport', 'Final elimination from the body', 'Ingestion', 'Food absorption'),
        mc('Which organ contributes to excretion by releasing sweat?', 'Skin', 'Lungs', 'Large intestine', 'Stomach'),
        mc('Which liquid contains water, salts and a small amount of urea as it leaves the skin?', 'Sweat', 'Exhaled air', 'Saliva alone', 'Undigested food'),
        mc('Which organs remove carbon dioxide made by respiring cells?', 'Lungs', 'Skin as the main carbon dioxide outlet', 'Kidneys as the main carbon dioxide outlet', 'Large intestine as the main carbon dioxide outlet'),
        mc('Which gaseous waste links cellular respiration with excretion by the lungs?', 'Carbon dioxide', 'Oxygen', 'Nitrogen absorbed from food', 'Urea gas'),
        mc('In what form can some water leave the body in exhaled air?', 'Water vapour', 'Solid ice in every breath', 'Uric acid', 'A heavy metal'),
        mc('Which organs remove wastes and excess water from blood to make urine?', 'Kidneys', 'Lungs', 'Skin', 'Large intestine'),
        mc('What is the waste-containing liquid formed by the kidneys called?', 'Urine', 'Sweat', 'Mucus', 'Exhaled air'),
        mc('Which nitrogen-containing waste is removed mainly in urine and in small amounts in sweat?', 'Urea', 'Carbon dioxide', 'Oxygen', 'A heavy metal'),
        mc('Which nitrogen-containing waste has acid in its name and is listed as a kidney waste in the lesson?', 'Uric acid', 'Carbon dioxide', 'Water vapour', 'Excess oxygen'),
        mc('Which listed waste is mainly present as ammonium when it leaves in urine?', 'Ammonia', 'Carbon dioxide', 'Urea', 'Water vapour'),
        mc('Which organ provides the digestive exit route for certain heavy metals described in the lesson?', 'Large intestine', 'Lungs', 'Skin', 'Heart'),
        mc('Which substance group is associated with the digestive elimination example in this lesson?', 'Heavy metals', 'Carbon dioxide from breathing', 'Only water vapour', 'Only oxygen'),
        mc('What is water beyond the amount the body needs to retain called?', 'Excess water', 'Uric acid', 'Carbon dioxide', 'Metabolism'),
        mc('Which substances can leave in sweat when present beyond the body’s needs?', 'Excess salts', 'Whole undigested food pieces', 'Rib bones', 'Large blood cells'),
        mc('Which process in cells produces the carbon dioxide later removed by the lungs?', 'Aerobic cellular respiration', 'Swallowing', 'Movement of food through the intestine alone', 'Sweat evaporation alone')
    ];
    const extraChoice = [
        mc('Why must metabolic wastes be removed rather than allowed to build up?', 'They can interfere with normal cell functioning', 'They are all essential nutrients at every concentration', 'Cells never make waste', 'Accumulation always improves cell activity'),
        mc('Which description correctly distinguishes excretion from producing waste?', 'Excretion removes waste; metabolism can produce it', 'Excretion creates every waste inside cells', 'Metabolism only removes undigested food', 'Neither process involves living cells'),
        mc('A waste molecule is still in the blood on its way to an organ. What still needs to happen?', 'It must be eliminated from the body', 'It must become undigested food', 'It must be kept in every cell', 'Its transport must be reversed permanently'),
        mc('Which example best shows removal of a metabolic waste?', 'Exhaling carbon dioxide made in cells', 'Taking oxygen into the lungs', 'Swallowing a mouthful of food', 'Absorbing a nutrient from the intestine'),
        mc('Why is excretion an ongoing process rather than a once-off event?', 'Living cells continually carry out reactions that produce waste', 'Every cell stops reacting after the first meal', 'Waste is made only before birth', 'Waste disappears when it enters blood'),
        mc('Which complete set of substances is associated with sweat in the lesson?', 'Water, salts and small amounts of urea', 'Only carbon dioxide and oxygen', 'Uric acid and whole blood cells only', 'Heavy metals and undigested food only'),
        mc('Why are the lungs classed as both gas-exchange and excretory organs?', 'They exchange gases and remove metabolic carbon dioxide', 'They form urine and digest food', 'They release all wastes only as sweat', 'They turn all nitrogen wastes into food'),
        mc('Which route carries carbon dioxide from its production site to removal?', 'Body cells to blood to lungs to outside', 'Outside to lungs to blood to body cells', 'Body cells directly to urine without blood', 'Skin to food to stomach to lungs'),
        mc('Which two substances leave through the lungs according to the lesson?', 'Carbon dioxide and some water', 'Urea and heavy metals as the main pair', 'Only uric acid and salts', 'Only oxygen and glucose'),
        mc('A learner says sweating removes no metabolic waste because most sweat is water. Which correction is best?', 'Sweat also carries a small amount of urea', 'Sweat contains only undigested food', 'Sweat is formed inside the lungs', 'Every drop of sweat is pure carbon dioxide'),
        mc('Which set matches the kidney waste list in the lesson?', 'Urea, uric acid, ammonia and water', 'Carbon dioxide, oxygen and undigested food', 'Only heavy metals and water vapour', 'Only useful nutrients and whole blood cells'),
        mc('Which comparison of urea removal is correct?', 'Mainly through kidneys, with small amounts through skin', 'Only through lungs as a gas', 'Only through the large intestine as undigested food', 'It cannot leave the body'),
        mc('What do urea, uric acid and ammonia have in common in this lesson?', 'They are nitrogen-containing wastes associated with kidney excretion', 'They are all gases exhaled by the lungs', 'They are all names for oxygen', 'They are all undigested food pieces'),
        mc('Which statement about water in excretion is correct?', 'It can leave through kidneys, skin and lungs', 'It leaves only through lungs', 'It cannot leave in urine', 'It leaves only as solid crystals'),
        mc('If removal of kidney wastes falls behind their production, what may happen?', 'Waste can build up and disrupt normal functioning', 'All waste becomes useful automatically', 'The lungs must form urine instead', 'Cells cease needing any waste removal'),
        mc('Which distinction prevents a mistake about the large intestine?', 'Undigested food removal is not the same as metabolic waste removal', 'All undigested food is made by cell metabolism', 'Every substance in faeces is carbon dioxide', 'The large intestine is the only excretory organ'),
        mc('Which comparison table entry needs correcting?', 'Lungs: main removal of urea in urine', 'Skin: water, salts and some urea in sweat', 'Kidneys: nitrogen wastes and water in urine', 'Large intestine: digestive exit route for certain metals'),
        mc('Skin and kidneys both contribute to which task described in this lesson?', 'Removing some water and urea', 'Removing undigested food only', 'Producing all carbon dioxide in the body', 'Taking oxygen into blood'),
        mc('What does the use of several excretory organs show?', 'Different organs contribute to removing different substances', 'One organ removes every substance in the same way', 'All wastes must leave through lungs', 'Only one waste is ever produced'),
        mc('Which sequence summarises the lesson most accurately?', 'Waste production in cells, transport, then removal', 'Waste removal, permanent storage, then production', 'Food swallowing, no reactions, no waste', 'Waste production, accumulation forever, no removal')
    ];
    const trueFalseFacts = [
        ['Excretion removes metabolic wastes from the body.', true, 'The waste is produced by chemical reactions in living cells.'],
        ['Metabolism produces only useful substances and never any waste.', false, 'Metabolic reactions can produce useful substances and waste products.'],
        ['Waste accumulation can interfere with normal cell functioning.', true, 'Removal prevents potentially harmful build-up.'],
        ['Transporting waste in blood always means it has already left the body.', false, 'Transport towards an organ and elimination from the body are different steps.'],
        ['Excretion involves more than one organ.', true, 'Skin, lungs and kidneys contribute; the lesson also discusses a digestive elimination route.'],
        ['Sweat contains water but no salts or urea.', false, 'It contains water, salts and a small amount of urea.'],
        ['The skin contributes to excretion by releasing sweat.', true, 'Sweat carries substances out through the skin.'],
        ['Carbon dioxide is the main nitrogen-containing waste in urine.', false, 'Carbon dioxide is not a nitrogen-containing waste; the lungs remove metabolic carbon dioxide.'],
        ['The lungs remove some water as well as carbon dioxide.', true, 'Some water leaves in exhaled air as water vapour.'],
        ['Aerobic cellular respiration removes carbon dioxide from the body without producing it.', false, 'It produces carbon dioxide in cells; transport and exhalation remove it.'],
        ['Kidneys remove wastes and excess water from blood to form urine.', true, 'Urine carries dissolved wastes and water out of the body.'],
        ['The lungs form the urine that contains urea.', false, 'Urine is formed by the kidneys, not the lungs.'],
        ['Urea can leave mainly in urine and in small amounts in sweat.', true, 'The kidney and skin routes both contribute to urea removal.'],
        ['Uric acid is another name for carbon dioxide.', false, 'Uric acid is a nitrogen-containing waste; carbon dioxide is a gaseous waste.'],
        ['Ammonia is listed among the kidney wastes in the lesson.', true, 'In urine, this is mainly in the ammonium form.'],
        ['The large intestine removes every kind of metabolic waste on its own.', false, 'Several organs have different removal roles; the intestine is not the only route.'],
        ['Certain heavy metals can leave through the digestive route described in the lesson.', true, 'This example does not mean all metals are removed only by this route.'],
        ['Undigested food and metabolic waste always mean the same thing.', false, 'Undigested food is not a by-product of chemical reactions inside body cells.'],
        ['Water can leave the body through kidneys, skin and lungs.', true, 'Urine, sweat and exhaled water vapour provide these routes.'],
        ['Metabolic waste needs removing only once in a person’s lifetime.', false, 'Living cells keep producing waste, so removal must continue.']
    ];
    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allChoice = multipleChoice.concat(extraChoice);
    const snake = Object.fromEntries([0, 1, 2, 3].map(group => ['game' + (group + 1),
        multipleChoice.slice(group * 5, group * 5 + 5).concat(extraChoice.slice(group * 5, group * 5 + 5)).map((item, index) => {
            const right = item.a.slice(3);
            const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
            for (let i = 0; i < index % 4; i++) options.push(options.shift());
            return { q: item.q, options, a: options.indexOf(right) };
        })
    ]));
    const factPairs = [
        ['Origin of metabolic waste', 'Chemical reactions inside living cells'],
        ['Reason for waste removal', 'Preventing harmful build-up that interferes with cell activity'],
        ['Transport before elimination', 'Waste moves from its production site towards a removal organ'],
        ['Ongoing excretion', 'Continued removal because metabolism keeps producing waste'],
        ['Several removal organs', 'Different organs contribute to eliminating different substances'],
        ['Sweat contents', 'Water, salts and small amounts of urea'],
        ['Lung excretory products', 'Carbon dioxide and some water'],
        ['Carbon dioxide journey', 'From respiring cells through blood to lungs and outside'],
        ['Dual role of lungs', 'Gas exchange as well as removal of metabolic carbon dioxide'],
        ['Skin nitrogen-waste contribution', 'A small amount of urea leaves in sweat'],
        ['Kidney waste group', 'Urea, uric acid, ammonia and water in the lesson’s list'],
        ['Nitrogen-containing examples', 'Urea, uric acid and ammonia, unlike carbon dioxide'],
        ['Main route for urea', 'Removal through the kidneys in urine'],
        ['Water in urine', 'Liquid that carries dissolved waste out of the body'],
        ['Ammonia in urine', 'Mostly the ammonium form, rather than free ammonia'],
        ['Digestive elimination example', 'Certain heavy metals can leave by the intestinal route'],
        ['Water-removal comparison', 'Kidneys, skin and lungs all contribute'],
        ['Urea-removal comparison', 'Mainly kidneys, with a small contribution from skin'],
        ['Undigested food distinction', 'Its removal is not the removal of a metabolic by-product'],
        ['Complete waste pathway', 'Production in cells, transport and elimination from the body']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 2, 5, 7, 8, 10, 12, 13, 20, 23, 26, 27, 35, 39];
    const hints = [
        'Choose the process that removes waste, rather than taking food in.',
        'Think of chemical reactions in living cells.',
        'Look for the unwanted product made inside a cell.',
        'Sweat leaves at the body surface.',
        'This organ pair removes a gaseous waste.',
        'It is the waste gas made during aerobic respiration.',
        'These organs make urine from wastes and extra water.',
        'This nitrogen waste has a small sweat route and a main urine route.',
        'Look for the kidney waste with acid in its name.',
        'Waste build-up can disturb cell activity.',
        'Choose a substance made by cells and then removed.',
        'The same organs exchange gases and remove a waste gas.',
        'Start in the cells, use blood for transport and finish at the lungs.',
        'Consider where the material originated: cells or undigested food.',
        'Follow the order from origin to transport to final removal.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['Define excretion, including where metabolic waste comes from.', 'Removal of wastes made by chemical reactions in cells, and substances present in excess, from the body'],
        ['What is metabolism, and how is it linked to waste production?', 'Metabolism is the chemical reactions in living cells; some reactions generate waste products'],
        ['Give four metabolic waste examples named in this lesson.', 'Carbon dioxide, ammonia, urea and uric acid'],
        ['Explain why metabolic waste should not accumulate inside cells.', 'It can interfere with normal cell activity and negatively affect cell functioning'],
        ['Distinguish moving waste away from cells from removing it from the body.', 'Transport carries it towards a removal organ; elimination takes it out of the body'],
        ['Why does the body need ongoing waste removal even between meals?', 'Cell metabolism continues and produces waste; it is not limited to times of eating'],
        ['Correct the claim: all products of metabolism are harmful waste.', 'Metabolism makes useful products as well as waste; not every product is waste'],
        ['A waste molecule has entered blood but not left the body. Which part of its removal is complete?', 'Transport away from its cell has begun; final elimination has not yet occurred'],
        ['Name the four organs or routes compared in the lesson.', 'Skin, lungs, kidneys and the large-intestine digestive route'],
        ['What evidence in the lesson shows that excretion is not a one-organ process?', 'Different organs remove different substances, such as skin releasing sweat and lungs removing carbon dioxide'],
        ['Name the three substances listed as components of sweat.', 'Water, salts and urea, with urea present in small amounts'],
        ['How does releasing sweat contribute to excretion?', 'It carries water, salts and small amounts of urea out through the skin'],
        ['Does the presence of only a small amount of urea in sweat make the skin non-excretory? Explain.', 'No; removing some metabolic urea still contributes to excretion'],
        ['Name the two substances the lungs remove in this lesson.', 'Carbon dioxide and some water'],
        ['Where is the carbon dioxide removed by the lungs produced?', 'In body cells during aerobic cellular respiration'],
        ['Trace the carbon dioxide pathway from a body cell to the outside.', 'Cell to blood to lungs, then outside in exhaled air'],
        ['Explain the two related roles of the lungs discussed in the lesson.', 'They perform gas exchange and excrete metabolic carbon dioxide and some water'],
        ['In what physical form does some water leave in exhaled air?', 'Water vapour'],
        ['Correct this organ-product pairing: skin produces urine.', 'Skin releases sweat; kidneys form urine'],
        ['A learner lists carbon dioxide and some water as a sweat pair. Which organ is that pair normally used for here?', 'The lungs; the sweat list is water, salts and small amounts of urea'],
        ['List the four kidney waste products named in the notes.', 'Urea, uric acid, ammonia and water'],
        ['Which liquid carries kidney wastes out of the body?', 'Urine'],
        ['Which organs remove waste substances and extra water from blood to make urine?', 'The kidneys'],
        ['Give three nitrogen-containing wastes from the kidney list.', 'Urea, uric acid and ammonia'],
        ['Compare how kidneys and skin contribute to urea removal.', 'Urea leaves mainly through kidneys in urine; a small amount also leaves through skin in sweat'],
        ['Correct the claim: kidneys mainly remove carbon dioxide by breathing it out.', 'Lungs remove carbon dioxide by exhalation; kidneys remove wastes and excess water in urine'],
        ['Does the kidney list mean urine contains only urea? Explain.', 'No; the lesson also lists uric acid, ammonia and water'],
        ['What is the usual form of the lesson’s ammonia waste in urine?', 'Mainly ammonium'],
        ['What could happen if nitrogen wastes were produced faster than they were removed?', 'They could accumulate and interfere with normal functioning'],
        ['Why is carbon dioxide not grouped with urea, uric acid and ammonia as a nitrogen waste?', 'Carbon dioxide contains no nitrogen; the other three are nitrogen-containing wastes'],
        ['Which substance group is used as the digestive elimination example in the notes?', 'Certain heavy metals'],
        ['Which digestive organ is linked to the final exit route for those metals in the lesson?', 'The large intestine'],
        ['Why is removing undigested food not the same as excreting metabolic waste?', 'Undigested food is not an unwanted by-product of reactions inside body cells'],
        ['A comparison table says: all waste leaves through the large intestine. Explain the error.', 'Several organs remove different substances; skin, lungs and kidneys have their own routes'],
        ['Name three organs through which water can leave the body.', 'Kidneys, skin and lungs'],
        ['Compare the forms in which water leaves through skin and lungs.', 'In liquid sweat through skin and as water vapour in exhaled air through lungs'],
        ['Match these three exits to organs: sweat, exhaled air and urine.', 'Sweat: skin; exhaled air: lungs; urine: kidneys'],
        ['What does excess mean in the phrases excess water and excess salts?', 'More than the amounts the body needs to retain'],
        ['A cell makes carbon dioxide and blood carries it to the lungs. Which step completes its excretion?', 'Exhalation removes that carbon dioxide from the body'],
        ['Summarise the overall waste-removal sequence in three steps.', 'Production during metabolism in cells, transport towards removal organs, then elimination from the body']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.ExcretionTopic3 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
