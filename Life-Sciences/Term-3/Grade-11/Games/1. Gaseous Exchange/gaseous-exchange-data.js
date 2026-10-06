/* Grade 11 Life Sciences, Term 3, Topic 1: Gaseous Exchange.
 * Based on all 40 pages of Topic 1.pdf, including process comparisons, exchange
 * routes, the six efficiency requirements and adaptations in six organism groups.
 * Diagram-dependent prompts name the structures and routes so no unseen image
 * is required. Oxygen requirements are qualified as aerobic respiration rather
 * than incorrectly claiming every living cell always needs oxygen.
 * No disease diagnosis, advanced respiratory calculations or later-topic content.
 * Primary checks:
 * https://openstax.org/books/biology-2e/pages/39-1-systems-of-gas-exchange
 * https://openstax.org/books/biology-2e/pages/39-2-gas-exchange-across-respiratory-surfaces
 * https://openstax.org/books/biology-2e/pages/8-3-using-light-energy-to-make-organic-molecules
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Cellular respiration', 'Chemical reactions in living cells that break down substances such as glucose and release energy for ATP production.'],
        ['Breathing', 'The mechanical movement of air into and out of the lungs.'],
        ['Inhalation', 'The breathing phase in which air moves into the lungs.'],
        ['Exhalation', 'The breathing phase in which air moves out of the lungs.'],
        ['Diffusion', 'The net movement of particles from a region of higher concentration to a region of lower concentration.'],
        ['Alveoli', 'Numerous small air sacs in mammalian lungs that provide a surface for gas exchange with blood.'],
        ['Capillaries', 'Tiny blood vessels close to exchange surfaces that carry gases between the lungs and body tissues.'],
        ['Squamous epithelium', 'The thin layer of flattened cells lining alveoli, which helps provide a short diffusion distance.'],
        ['Ventilation', 'Renewing air in the lungs to bring in oxygen-rich air and remove carbon dioxide.'],
        ['Thoracic cage', 'The framework of ribs, sternum and thoracic vertebrae that protects the lungs.'],
        ['Cell membrane', 'The boundary of an Amoeba across which oxygen enters and carbon dioxide leaves by diffusion.'],
        ['Stomata', 'Pores in plant surfaces that allow gases to move between the atmosphere and internal tissues.'],
        ['Moist skin', 'The earthworm’s exchange surface, where gases dissolve before diffusing into or out of the body.'],
        ['Unicellular organism', 'An organism consisting of a single cell.'],
        ['Earthworm', 'An elongated worm that exchanges respiratory gases through its damp body surface.'],
        ['Spiracles', 'External openings on an insect’s thorax and abdomen through which air enters and leaves its tube system.'],
        ['Tracheal tubes', 'Air passages in insects that deliver oxygen towards body cells without relying on blood to transport it.'],
        ['Gills', 'The exchange organs through which bony fish obtain dissolved oxygen from water.'],
        ['Gill filaments', 'Thin projections of fish gills that provide a large surface area for gaseous exchange.'],
        ['Operculum', 'The gill cover that protects the delicate gills of a bony fish.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('Which process breaks down glucose inside living cells to release energy for ATP production?', 'Cellular respiration', 'Breathing', 'Inhalation', 'Gas exchange across the alveolar wall'),
        mc('Which process is the mechanical movement of air into and out of lungs?', 'Breathing', 'Glucose breakdown inside cells', 'Diffusion across a membrane', 'ATP production inside cells'),
        mc('Air moves from the surroundings into the lungs. Identify the breathing phase.', 'Inhalation', 'Exhalation', 'Cellular respiration', 'Carbon dioxide production inside cells'),
        mc('Air moves from the lungs to the surroundings. Identify the breathing phase.', 'Exhalation', 'Inhalation', 'ATP production', 'Glucose breakdown'),
        mc('What determines the direction of net diffusion of a gas in the lesson’s explanation?', 'Its concentration gradient', 'The name of the organism alone', 'The presence of ribs alone', 'The colour of the exchange surface'),
        mc('Which structures provide numerous small gas-exchange air sacs in mammalian lungs?', 'Alveoli', 'Spiracles', 'Stomata', 'Gill filaments'),
        mc('Which structures form the rich blood-vessel network close to alveoli?', 'Capillaries', 'Stomata', 'Tracheal tubes', 'Gill covers'),
        mc('Why is a one-cell-thick alveolar lining useful?', 'It provides a short diffusion distance', 'It prevents any gas from passing through', 'It stores all the body’s ATP', 'It replaces the need for blood transport'),
        mc('Which process regularly replaces air in the lungs to support gas exchange?', 'Ventilation', 'Recycling ATP into glucose in the lungs', 'Closing every exchange surface permanently', 'Thickening the alveolar wall'),
        mc('Which structure protects mammalian lungs from physical damage?', 'The thoracic cage', 'The operculum', 'The spiracles', 'The stomata'),
        mc('Across which boundary does oxygen enter an Amoeba from its environment?', 'The cell membrane', 'An operculum', 'An alveolus', 'A gill filament'),
        mc('Which plant openings provide a pathway for gases between the air and internal tissues?', 'Stomata', 'Spiracles', 'Alveoli', 'Gill covers'),
        mc('Which surface is used by earthworms for gaseous exchange?', 'Moist skin', 'Alveoli inside lungs', 'Gills covered by an operculum', 'Spiracles connected to air tubes'),
        mc('What does unicellular mean?', 'Consisting of one cell', 'Having many lung alveoli', 'Having a bony gill cover', 'Containing a network of insect air tubes'),
        mc('Which organism in the lesson uses its elongated, moist body surface for gas exchange?', 'Earthworm', 'Amoeba', 'Bony fish', 'Mammal'),
        mc('Which openings allow air to enter and leave the insect’s tracheal system?', 'Spiracles', 'Stomata', 'Alveoli', 'Gill filaments'),
        mc('How are respiratory gases delivered to cells in the typical insect system described in the lesson?', 'Through air tubes rather than transport by blood', 'Only through blood after exchange in lungs', 'Through an operculum into mammalian alveoli', 'Through stomata in the insect’s skin'),
        mc('Which exchange organs allow bony fish to obtain oxygen from water?', 'Gills', 'Alveoli', 'Stomata', 'Mammalian lungs'),
        mc('What is a major advantage of numerous thin gill filaments?', 'A large surface area for diffusion', 'A longer diffusion distance by design', 'The complete prevention of water contact', 'Removal of the need for an exchange surface'),
        mc('What is the operculum of a bony fish?', 'The gill cover', 'The air sac in a lung', 'The opening of an insect air tube', 'The pore in a plant surface')
    ];
    const extraChoice = [
        mc('Why is oxygen supply important for cells carrying out aerobic respiration?', 'Oxygen is required for aerobic energy release', 'Oxygen is a substitute for glucose in every reaction', 'Oxygen is used only to move air mechanically', 'Oxygen prevents all ATP production'),
        mc('Why must excessive carbon dioxide be removed from cells and the body?', 'Its accumulation can increase acidity and disturb internal conditions', 'It always makes cell conditions more suitable at any concentration', 'It turns every cell into an alveolus', 'It replaces all the energy needed by cells'),
        mc('Which comparison correctly separates the three processes?', 'Cellular respiration: chemical; breathing: mechanical; gas exchange: physical diffusion', 'Cellular respiration: mechanical; breathing: chemical; gas exchange: glucose breakdown', 'All three are simply names for inhalation', 'All three take place only inside blood capillaries'),
        mc('Where does cellular respiration take place?', 'Inside living cells, including plant and animal cells', 'Only in the air outside the body', 'Only in the bony rib cage', 'Only on the outside of a fish’s gill cover'),
        mc('Which statement correctly connects breathing and gas exchange?', 'Breathing renews lung air; gases then diffuse across an exchange surface', 'Breathing chemically breaks down glucose inside every cell', 'Gas exchange mechanically moves the ribs instead of gases', 'Gas exchange and breathing are unrelated processes'),
        mc('At the lungs, which direction does oxygen diffuse?', 'From alveolar air into the blood', 'From body cells directly into the rib cage', 'From blood into alveoli as the main oxygen uptake route', 'From the sternum into plant stomata'),
        mc('At body tissues, which pair of gas movements is correct?', 'Oxygen: blood to cells; carbon dioxide: cells to blood', 'Oxygen: cells to blood; carbon dioxide: blood to cells as the uptake route', 'Both gases move only into the rib cage', 'Both gases stay permanently in the lungs'),
        mc('Why must a gas-exchange surface remain moist?', 'Gases dissolve in moisture before crossing the exchange surface', 'Moisture makes the surface completely impermeable to gases', 'Moisture stops diffusion by removing every gradient', 'Moisture replaces the need for all oxygen uptake'),
        mc('Which two muscle groups provide the ventilation mechanism described for humans?', 'Diaphragm and intercostal muscles', 'Gill rakers and an operculum', 'Stomata and guard cells', 'Gill filaments and tracheal tubes'),
        mc('Why does a close, rich capillary supply support exchange at alveoli?', 'Blood carries oxygen away and brings carbon dioxide towards the exchange surface', 'Capillaries make the exchange wall thicker', 'Blood prevents every gas from dissolving', 'Capillaries mechanically open stomata'),
        mc('Why can Amoeba exchange gases without lungs or a long-distance transport system?', 'Its single cell is directly exposed and diffusion distances are short', 'Its gill cover pumps blood through alveoli', 'Its cell contents are separated from the environment by many body layers', 'It obtains oxygen only through spiracles'),
        mc('For aerobic respiration in a dicot plant, which route described in the lesson brings oxygen to cells?', 'Air enters through stomata, then oxygen diffuses into plant cells', 'Air enters through gills, then an operculum produces ATP', 'Air enters through mammalian alveoli in every leaf', 'Oxygen remains outside because plants cannot respire'),
        mc('What would happen to gaseous exchange if an earthworm’s skin became dry?', 'Gas dissolution and exchange would become less effective', 'The skin would develop alveoli immediately', 'Blood transport would become unnecessary in every animal', 'Dryness would make gases dissolve more efficiently'),
        mc('Which organism-structure pair is correctly matched?', 'Amoeba: cell membrane', 'Earthworm: operculum-covered gills', 'Dicot plant: mammalian alveoli', 'Bony fish: plant stomata'),
        mc('Which contrast between Amoeba and a complex mammal is accurate?', 'Amoeba has short direct diffusion paths; mammals need specialised exchange and transport systems', 'Amoeba requires a larger lung network than a mammal', 'All mammalian cells are directly exposed to the outside environment', 'Neither organism has any need for gas exchange'),
        mc('Where are the spiracles described in the insect lesson located?', 'On the thorax and abdomen', 'Only inside mammalian alveoli', 'Only on a fish’s gill cover', 'Inside every plant chloroplast'),
        mc('Which comparison distinguishes the typical insect and mammalian systems?', 'Insects use air tubes towards cells; mammals transport respiratory gases in blood', 'Both depend on blood carrying gases from lung alveoli', 'Mammals use plant stomata and insects use bony gill covers', 'Insects have no route for carbon dioxide to leave'),
        mc('Which route follows oxygen uptake in a bony fish?', 'Dissolved oxygen in water crosses the gills into blood', 'Water oxygen enters stomata and then a mammalian rib cage', 'Blood oxygen first moves into the water to supply the fish', 'The operculum chemically creates oxygen from glucose'),
        mc('Which route follows carbon dioxide removal at mammalian lungs?', 'Carbon dioxide diffuses from blood into alveoli and is then exhaled', 'Carbon dioxide diffuses from alveoli into blood as the main removal route', 'Carbon dioxide moves from the ribs into glucose without diffusion', 'Carbon dioxide stays permanently in the cells that produced it'),
        mc('Which combination supports efficient exchange in both fish gills and mammalian alveoli?', 'Large exchange area and a short diffusion distance', 'Thick, dry, impermeable exchange surfaces', 'No contact with the gas-containing environment', 'A small area and a long diffusion path')
    ];
    const trueFalseFacts = [
        ['Cellular respiration is a chemical process that releases energy inside living cells.', true, 'It is different from the mechanical movement of air during breathing.'],
        ['Breathing and cellular respiration are exactly the same process.', false, 'Breathing moves air; cellular respiration involves chemical reactions inside cells.'],
        ['Inhalation moves air into the lungs.', true, 'Exhalation moves air out.'],
        ['Net diffusion moves gases up their concentration gradients without any other driving process.', false, 'In the lesson’s explanation, diffusion moves gases down their concentration gradients.'],
        ['Oxygen is required for aerobic respiration.', true, 'The oxygen requirement applies specifically to aerobic respiration.'],
        ['A thicker alveolar exchange wall gives gases a shorter diffusion distance.', false, 'A thin wall shortens the distance gases must cross.'],
        ['Numerous alveoli provide a large surface area for gaseous exchange.', true, 'A larger exchange area allows more gas to cross.'],
        ['At the lungs, the main oxygen uptake route is from blood into alveolar air.', false, 'Oxygen diffuses from alveolar air into the blood.'],
        ['The diaphragm and intercostal muscles help ventilate human lungs.', true, 'They provide the mechanical ventilation mechanism described in the lesson.'],
        ['The thoracic cage consists of the operculum and gill filaments.', false, 'It consists of ribs, sternum and thoracic vertebrae.'],
        ['Amoeba can exchange gases directly across its cell membrane.', true, 'Its single cell is exposed to the environment and diffusion distances are short.'],
        ['Stomata are the external openings of the insect tracheal system.', false, 'Stomata are plant pores; insect openings are spiracles.'],
        ['Earthworm skin must be moist for effective gaseous exchange.', true, 'Moisture allows gases to dissolve before crossing the surface.'],
        ['Plant cells do not carry out cellular respiration.', false, 'Plant cells respire; oxygen can enter through stomata for aerobic respiration.'],
        ['Drying an earthworm’s skin can reduce the effectiveness of gas exchange.', true, 'Gas dissolution and diffusion across the skin become less effective.'],
        ['In the typical insect system described, blood is the main carrier of respiratory gases.', false, 'Air tubes carry gases towards cells without relying on blood transport.'],
        ['Bony fish obtain dissolved oxygen from water through their gills.', true, 'Oxygen crosses the gills into the blood.'],
        ['The operculum is an air sac inside a mammalian lung.', false, 'It is the gill cover of a bony fish.'],
        ['At mammalian body tissues, oxygen diffuses from blood into cells.', true, 'Carbon dioxide moves from the cells into blood for transport back to the lungs.'],
        ['All the organisms in the lesson use alveoli as their exchange surface.', false, 'Different organisms use cell membranes, stomata, skin, tracheal systems, gills or alveoli.']
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
        ['ATP', 'The molecule that supplies usable chemical energy for cellular activities'],
        ['Glucose', 'The sugar broken down during the respiration process described in the lesson'],
        ['Aerobic respiration', 'The form of cellular energy release that requires oxygen'],
        ['Carbon dioxide accumulation', 'A build-up of this respiratory product that can increase acidity and disturb cell conditions'],
        ['Concentration gradient', 'A difference in the concentration of a substance between two regions'],
        ['Large exchange surface', 'An adaptation that provides more area across which oxygen and carbon dioxide can move'],
        ['Moist exchange lining', 'A layer that allows gases to dissolve and helps prevent exchange cells from drying out'],
        ['Short diffusion distance', 'The advantage supplied by a very thin exchange barrier'],
        ['Diaphragm and intercostal muscles', 'The muscle groups responsible for the ventilation mechanism described for humans'],
        ['Cardiovascular gas transport', 'Moving oxygen from the lungs towards tissues and carbon dioxide from tissues towards the lungs'],
        ['Amoeba oxygen route', 'Environment to the cell interior directly across the cell membrane'],
        ['Plant oxygen route', 'Atmosphere through stomata, then diffusion into plant cells for aerobic respiration'],
        ['Earthworm oxygen route', 'Oxygen dissolves in surface moisture before diffusing across the skin'],
        ['Simple organism advantage', 'A short path between the outside environment and the contents of a single exposed cell'],
        ['Dry earthworm skin', 'A condition that makes gas dissolution and skin-based exchange less effective'],
        ['Insect gas delivery', 'Air travels through spiracles and tubes towards cells instead of depending on blood as the carrier'],
        ['Bony fish oxygen route', 'Dissolved oxygen moves from water through gills into the blood'],
        ['Gill rakers', 'Structures associated with the gills that help keep damaging particles away from the delicate filaments'],
        ['Mammalian lung exchange', 'Oxygen moves from alveoli to blood while carbon dioxide moves from blood to alveoli'],
        ['Mammalian tissue exchange', 'Oxygen moves from blood to body cells while carbon dioxide moves from cells to blood']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [1, 2, 3, 5, 10, 11, 12, 15, 17, 19, 22, 25, 26, 29, 39];
    const hints = [
        'Think of air movement rather than chemical reactions inside a cell.',
        'The phase brings air in.',
        'The phase sends air out.',
        'Look for the many small sacs in mammalian lungs.',
        'Amoeba exchanges directly across its outer cell boundary.',
        'Choose the plant pore, not the insect opening.',
        'The earthworm exchanges through its body covering, which must remain damp.',
        'These insect openings connect the surroundings to the tube network.',
        'The fish gets oxygen from water rather than breathing through alveoli.',
        'This protective structure covers a bony fish’s delicate exchange organs.',
        'Match chemical reactions, air movement and diffusion to different processes.',
        'Follow oxygen uptake from the lung air towards the circulating blood.',
        'At tissues, cells take up oxygen and release carbon dioxide towards blood.',
        'Blood keeps gases moving between the exchange surface and the body.',
        'Compare how much area is available and how far gases must diffuse.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['How does cellular respiration differ from breathing?', 'Cellular respiration is chemical energy release inside cells; breathing is mechanical air movement into and out of lungs'],
        ['Which molecule supplies usable energy for cellular activities after energy is released during respiration?', 'ATP'],
        ['Which sugar is broken down in the cellular respiration example described in the lesson?', 'Glucose'],
        ['Which form of cellular respiration requires oxygen?', 'Aerobic respiration'],
        ['Why can excess carbon dioxide disrupt cell conditions?', 'Its accumulation can increase acidity and make internal conditions unsuitable'],
        ['Distinguish inhalation from exhalation.', 'Inhalation brings air into the lungs; exhalation sends air out'],
        ['What type of process is gaseous exchange: chemical, mechanical or physical?', 'Physical; it involves diffusion'],
        ['In which direction does net diffusion occur along a concentration gradient?', 'From higher to lower concentration'],
        ['Can plant cells carry out cellular respiration?', 'Yes; cellular respiration occurs in living plant cells as well as animal cells'],
        ['Name the two human gas-exchange sites identified in the lesson.', 'The lungs and the body tissues'],
        ['Which feature of alveoli provides a large exchange area?', 'Their large number and numerous small air sacs'],
        ['Why is a moist exchange surface useful?', 'Gases dissolve before crossing it, and moisture helps prevent the exchange cells drying out'],
        ['How does a thin surface improve gas exchange?', 'It provides a short diffusion distance'],
        ['What type of epithelium forms the thin alveolar lining?', 'Squamous epithelium'],
        ['Why is a rich capillary network close to alveoli important?', 'Blood carries oxygen away and brings carbon dioxide towards the surface, supporting continued exchange'],
        ['Name the two muscle groups used for human ventilation in the lesson.', 'Diaphragm and intercostal muscles'],
        ['Which bones form the protective thoracic cage described in the lesson?', 'Ribs, sternum and thoracic vertebrae'],
        ['Trace oxygen movement during exchange at the lungs.', 'From alveolar air across the exchange barrier into blood'],
        ['Trace carbon dioxide movement during exchange at the lungs.', 'From blood across the exchange barrier into alveoli, then out during exhalation'],
        ['What happens to oxygen and carbon dioxide during exchange at body tissues?', 'Oxygen moves from blood into cells; carbon dioxide moves from cells into blood'],
        ['Which surface does Amoeba use for gaseous exchange?', 'Its cell membrane'],
        ['Why is a specialised breathing system unnecessary for Amoeba?', 'Its single cell is directly exposed to the environment and diffusion distances are short'],
        ['What does unicellular mean?', 'Consisting of one cell'],
        ['Which plant openings allow gases to move between the atmosphere and internal tissues?', 'Stomata'],
        ['How can a dicot plant obtain oxygen for aerobic respiration through the route described?', 'Air enters through stomata and oxygen diffuses into plant cells'],
        ['Which part of an earthworm acts as its gas-exchange surface?', 'Its moist skin'],
        ['What happens to oxygen before it diffuses across earthworm skin?', 'It dissolves in the moisture on the surface'],
        ['Why does drying an earthworm’s skin reduce effective exchange?', 'Oxygen cannot dissolve as effectively and diffusion across the exchange surface is reduced'],
        ['How does an earthworm’s elongated body help its exchange system?', 'It provides a relatively large body surface area for exchange'],
        ['Why is direct diffusion across the outer surface alone insufficient for a complex mammal?', 'Many cells are far from the environment, so specialised exchange surfaces and transport are needed'],
        ['Name the external openings of the insect gas-exchange tube system.', 'Spiracles'],
        ['On which body regions are the insect spiracles described in the lesson located?', 'Thorax and abdomen'],
        ['How does the typical insect system deliver respiratory gases without relying on blood transport?', 'Air tubes carry oxygen towards cells and allow carbon dioxide to return towards the openings'],
        ['How does the insect system differ from the mammalian transport arrangement?', 'Insects deliver gases through air tubes; mammals use blood to carry gases between lungs and tissues'],
        ['Where do bony fish obtain the oxygen that enters their blood through the gills?', 'From oxygen dissolved in water'],
        ['Why are fish gills thin?', 'To give oxygen and carbon dioxide a short diffusion distance'],
        ['How do gill filaments support effective gaseous exchange?', 'They provide a large surface area'],
        ['What is the protective gill cover of a bony fish called?', 'The operculum'],
        ['Which mammalian exchange structures are numerous, thin and sac-like?', 'Alveoli'],
        ['List the six efficiency requirements identified in the lesson.', 'Large surface area, moisture, thin surface, effective transport where needed, ventilation and protection']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.GaseousExchangeTopic1 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
