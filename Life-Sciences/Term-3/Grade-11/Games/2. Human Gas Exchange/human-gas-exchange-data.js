/* Grade 11 Life Sciences, Term 3, Topic 2: Human Gas Exchange.
 * Reviewed against all 71 pages of Topic 2.pdf, including labelled structures,
 * ventilation sequences, air-composition tables, transport, health and altitude.
 * All prompts are self-contained. Quiet exhalation is distinguished from forced
 * expiration; gas percentages are approximate lesson values, not clinical norms.
 * Health questions teach biology and prevention concepts, not diagnosis or first
 * aid procedures. Do not copy the source's incomplete resuscitation instructions
 * or imply that a skin test alone confirms active TB. Treatment duration varies.
 * Smoke-related ciliary damage is not attributed solely to nicotine.
 * Primary verification:
 * https://openstax.org/books/biology-2e/pages/39-3-breathing
 * https://openstax.org/books/biology-2e/pages/39-4-transport-of-gases-in-human-bodily-fluids
 * https://www.who.int/news-room/fact-sheets/detail/tuberculosis
 * https://www.fda.gov/tobacco-products/health-effects-tobacco-use/keep-your-air-clear-how-tobacco-can-harm-your-lungs
 * https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/first-aid-guidelines
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Nasal passages', 'The air passages in the nose that warm, moisten and help clean incoming air.'],
        ['Epiglottis', 'The flap that covers the airway entrance during swallowing to help prevent food entering the trachea.'],
        ['Trachea', 'The windpipe supported by C-shaped cartilage rings that carries air towards and away from the lungs.'],
        ['Bronchioles', 'The smaller branching air tubes within the lungs that lead towards groups of alveoli.'],
        ['Alveoli', 'The numerous small, thin-walled air sacs where gases are exchanged between lung air and blood.'],
        ['Diaphragm', 'The muscle separating the chest and abdominal cavities that flattens when it contracts during inhalation.'],
        ['External intercostal muscles', 'The muscles between the ribs that contract to raise the rib cage during normal inhalation.'],
        ['Inhalation', 'The breathing phase in which chest volume increases and air moves into the lungs.'],
        ['Exhalation', 'The breathing phase in which air moves out of the lungs as lung pressure rises above atmospheric pressure.'],
        ['Medulla oblongata', 'The brain region containing centres that help control breathing according to the body’s needs.'],
        ['Haemoglobin', 'The oxygen-binding protein inside red blood cells.'],
        ['Oxyhaemoglobin', 'The compound formed when oxygen binds reversibly to haemoglobin.'],
        ['Erythrocytes', 'Red blood cells that contain haemoglobin and carry most of the blood’s oxygen.'],
        ['Bicarbonate ions', 'The dissolved form in which most carbon dioxide is transported in the blood.'],
        ['Tissue fluid', 'The fluid around body cells through which gases pass between capillary blood and cells.'],
        ['Tuberculosis', 'An infectious disease caused by Mycobacterium tuberculosis that most often affects the lungs.'],
        ['Asthma', 'A condition characterised by episodes of bronchiolar narrowing associated with inflammation, muscle contraction and mucus.'],
        ['Emphysema', 'A lung condition involving destruction of alveolar walls, reduced exchange area and air trapping.'],
        ['Bronchitis', 'Inflammation of the bronchial airways, often accompanied by increased mucus and coughing.'],
        ['Carbon monoxide', 'The gas in cigarette smoke that binds strongly to haemoglobin and interferes with oxygen transport.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('Which passages warm, moisten and help clean air before it travels deeper into the breathing system?', 'Nasal passages', 'Oesophagus', 'Tissue fluid', 'Abdominal cavity'),
        mc('Which flap helps stop food entering the trachea during swallowing?', 'Epiglottis', 'Diaphragm', 'Alveolus', 'Pleural membrane'),
        mc('Which airway is supported by C-shaped cartilage rings?', 'Trachea', 'Smallest bronchioles', 'Alveoli', 'Blood capillaries'),
        mc('The bronchi branch into smaller tubes leading towards alveoli. What are these tubes called?', 'Bronchioles', 'Erythrocytes', 'Vocal cords', 'Pleural membranes'),
        mc('Where does oxygen cross from lung air into the surrounding blood?', 'Alveoli', 'Vocal cords', 'Oesophagus', 'Rib bones'),
        mc('Which muscle separates the thoracic and abdominal cavities?', 'Diaphragm', 'External intercostal muscle', 'Vocal cord', 'Bronchial cartilage ring'),
        mc('Which muscles contract to help move the ribs upwards and outwards during normal inhalation?', 'External intercostal muscles', 'Relaxed diaphragm fibres', 'Vocal cords', 'Goblet cells'),
        mc('Chest volume increases, lung pressure falls below atmospheric pressure and air enters. Identify the phase.', 'Inhalation', 'Exhalation', 'Swallowing', 'Carbon dioxide production'),
        mc('During quiet breathing, the diaphragm relaxes, chest volume decreases and air leaves. Identify the phase.', 'Exhalation', 'Inhalation', 'Oxygen binding in blood', 'Food digestion'),
        mc('Which brain region helps adjust breathing rate when carbon dioxide levels rise during exercise?', 'Medulla oblongata', 'Epiglottis', 'Trachea', 'Pleura'),
        mc('Which protein in red blood cells binds most of the oxygen transported by blood?', 'Haemoglobin', 'Mucus', 'Bicarbonate', 'Cartilage'),
        mc('What forms when oxygen combines reversibly with haemoglobin?', 'Oxyhaemoglobin', 'Carbon monoxide', 'Mucus', 'A cartilage ring'),
        mc('What are erythrocytes?', 'Red blood cells', 'Air sacs in the lungs', 'Cells that secrete airway mucus', 'Muscles between the ribs'),
        mc('In which form does most carbon dioxide travel in blood?', 'Bicarbonate ions', 'Oxyhaemoglobin', 'Oxygen dissolved in plasma', 'Air bubbles in arteries'),
        mc('Oxygen passes from capillary blood into a fluid around cells before entering the cells. Identify that fluid.', 'Tissue fluid', 'Pleural fluid', 'Airway mucus', 'Air in the trachea'),
        mc('Which respiratory disease is caused by Mycobacterium tuberculosis?', 'Tuberculosis', 'Hay fever', 'Emphysema', 'Asthma'),
        mc('Which condition involves inflamed, narrowed airways that can make breathing difficult?', 'Asthma', 'High-altitude acclimatisation', 'Normal inhalation', 'Formation of oxyhaemoglobin'),
        mc('Which condition destroys alveolar walls and reduces the area available for gas exchange?', 'Emphysema', 'Hay fever', 'Normal ventilation', 'Increased red blood cell production'),
        mc('What is inflammation of the bronchial airways with mucus build-up called?', 'Bronchitis', 'Exhalation', 'Oxyhaemoglobin formation', 'Normal pleural lubrication'),
        mc('Which gas in cigarette smoke competes strongly with oxygen for haemoglobin?', 'Carbon monoxide', 'Nitrogen', 'Water vapour', 'Oxygen')
    ];
    const extraChoice = [
        mc('Why do the open ends of the trachea’s C-shaped cartilage rings face the oesophagus?', 'They allow the oesophagus to expand as food passes', 'They allow food to enter the lungs', 'They stop the trachea carrying air', 'They make the alveolar wall thicker'),
        mc('Which cells secrete mucus in the lining of the trachea?', 'Goblet cells', 'Red blood cells', 'Diaphragm muscle cells', 'Cells in the rib bones'),
        mc('How do airway cilia help protect the lungs?', 'They move particle-laden mucus away from the lungs', 'They push food into the alveoli', 'They bind all oxygen in the blood', 'They contract to raise the ribs'),
        mc('What happens when the trachea divides into its two main bronchi?', 'One main bronchus enters each lung', 'Both bronchi enter only the right lung', 'Each bronchus becomes a blood vessel', 'The bronchi enter the abdominal cavity'),
        mc('Which pairing correctly describes the usual number of lung lobes?', 'Right lung: three; left lung: two', 'Right lung: two; left lung: three', 'Both lungs: one each', 'Both lungs: four each'),
        mc('Which sequence correctly explains normal inhalation?', 'Muscles contract; chest volume rises; lung pressure falls; air enters', 'Muscles relax; chest volume falls; lung pressure rises; air enters', 'Chest volume falls; lung pressure falls; air leaves', 'Lung pressure rises above atmospheric pressure; air enters'),
        mc('Which sequence correctly explains quiet exhalation?', 'Breathing muscles relax; chest volume falls; lung pressure rises; air leaves', 'Diaphragm contracts; chest volume rises; air leaves', 'Chest volume rises; lung pressure falls; air leaves', 'Air leaves only because haemoglobin stops binding oxygen'),
        mc('Why does air enter the lungs during inhalation?', 'Atmospheric pressure becomes higher than pressure inside the lungs', 'Lung pressure becomes higher than atmospheric pressure', 'Air always moves from lower pressure to higher pressure', 'The epiglottis pumps air through the blood'),
        mc('A simplified air-composition table gives oxygen as 20% inhaled and 16% exhaled. What is the decrease?', '4 percentage points', '4% of the original oxygen proportion', '16 percentage points', '36 percentage points'),
        mc('During vigorous exercise, muscles produce more carbon dioxide. Which response helps meet their increased needs?', 'Breathing and heart rates increase', 'Breathing stops while the heart rate falls', 'The bronchioles turn into blood vessels', 'The diaphragm permanently closes the trachea'),
        mc('Which route follows oxygen uptake at the lungs?', 'Alveolar air; moist lining; alveolar and capillary walls; blood', 'Blood; ribs; oesophagus; alveolar air', 'Alveolar air; epiglottis; abdominal muscles; food', 'Blood; pleural fluid; tracheal cartilage; outside air'),
        mc('At body tissues, in which direction does oxygen normally diffuse?', 'Blood to tissue fluid to body cells', 'Body cells to tissue fluid to blood as the supply route', 'Alveoli directly to cells without entering blood', 'Ribs to mucus to the trachea'),
        mc('Which route returns carbon dioxide produced by body cells towards the lungs?', 'Cells; tissue fluid; blood; lungs', 'Lungs; tissue fluid; cells; ribs', 'Cells; trachea directly; stomach', 'Airway mucus; epiglottis; cells'),
        mc('How can an increase in red blood cells help a person acclimatise to high altitude?', 'More haemoglobin can increase oxygen-carrying capacity', 'Red blood cells produce oxygen from nitrogen', 'It makes atmospheric pressure rise around the person', 'It removes the need for alveolar gas exchange'),
        mc('Which gas has a much higher proportion in exhaled air than in inhaled air?', 'Carbon dioxide', 'Nitrogen', 'Oxygen', 'Carbon monoxide in every normal breath'),
        mc('How can infectious pulmonary TB spread from one person to another?', 'By inhaling airborne bacteria released by an infectious person', 'Only by inheriting the disease from a parent', 'By breathing air that contains extra oxygen', 'Only by touching intact skin'),
        mc('What is the purpose of observing a TB patient take prescribed medicine in the treatment-support approach described?', 'To support adherence and completion of the prescribed treatment', 'To replace medicine with exercise alone', 'To make the bacteria resistant to every drug', 'To diagnose TB without any clinical assessment'),
        mc('Which condition is an allergic response that may cause sneezing and watery eyes after pollen exposure?', 'Hay fever', 'Emphysema', 'Tuberculosis', 'Formation of oxyhaemoglobin'),
        mc('What happens when cigarette smoke damages the cilia in respiratory passages?', 'Mucus and trapped particles are cleared less effectively', 'The airways become better at removing all particles', 'Haemoglobin begins to make oxygen from tar', 'The lungs gain a larger healthy exchange surface'),
        mc('Why can a foreign object lodged in the airway cause choking?', 'It obstructs the movement of air to and from the lungs', 'It increases the number of healthy alveoli', 'It changes nitrogen into oxygen', 'It makes haemoglobin release extra oxygen into the airway')
    ];
    const trueFalseFacts = [
        ['Nasal passages help warm, moisten and clean incoming air.', true, 'Blood vessels warm the air, while moisture and trapped-particle removal prepare it for the lungs.'],
        ['The epiglottis produces most of the mucus in the trachea.', false, 'Goblet cells secrete mucus; the epiglottis helps protect the airway during swallowing.'],
        ['Goblet cells secrete mucus that traps inhaled particles.', true, 'Cilia then move the particle-laden mucus away from the lungs.'],
        ['The smallest bronchioles are held open by C-shaped cartilage rings.', false, 'The trachea has C-shaped rings; the smallest bronchioles do not have cartilage rings.'],
        ['Thin alveolar walls give gases a short diffusion distance.', true, 'Oxygen and carbon dioxide cross the alveolar and capillary walls.'],
        ['The right lung usually has two lobes and the left lung three.', false, 'The right lung has three lobes; the left has two.'],
        ['The diaphragm contracts and flattens during normal inhalation.', true, 'This helps increase the volume of the thoracic cavity.'],
        ['During normal inhalation, the ribs move downwards and inwards.', false, 'They move upwards and outwards as the external intercostal muscles contract.'],
        ['Quiet exhalation involves a decrease in chest volume and a rise in lung pressure.', true, 'Air leaves when pressure in the lungs becomes higher than atmospheric pressure.'],
        ['Air entering the lungs during inhalation moves from lower pressure to higher pressure.', false, 'Air moves from higher atmospheric pressure to lower pressure inside the lungs.'],
        ['Most oxygen in blood is carried bound to haemoglobin.', true, 'A small amount is also dissolved in plasma.'],
        ['Bicarbonate ions are the main form in which oxygen travels in blood.', false, 'They are the main form of carbon dioxide transport.'],
        ['At body tissues, oxygen passes from blood through tissue fluid into cells.', true, 'Cells use oxygen for aerobic respiration, supporting continued oxygen diffusion into them.'],
        ['Carbon dioxide made in body cells reaches the alveoli without being transported in blood.', false, 'It enters tissue fluid and blood, which carries it back towards the lungs.'],
        ['High-altitude acclimatisation can include an increase in red blood cells.', true, 'This can increase the amount of haemoglobin available for oxygen transport.'],
        ['Tuberculosis is caused by a virus.', false, 'It is caused by Mycobacterium tuberculosis bacteria.'],
        ['A person with latent TB infection does not spread TB to others.', true, 'Latent infection differs from infectious active pulmonary TB.'],
        ['Destruction of alveolar walls in emphysema improves gas-exchange efficiency.', false, 'Loss of walls reduces exchange area and may trap air.'],
        ['Carbon monoxide in cigarette smoke can reduce the blood’s ability to carry oxygen.', true, 'It binds strongly to haemoglobin and interferes with oxygen transport.'],
        ['Asthma always widens the airways and improves airflow.', false, 'Inflammation, muscle contraction and mucus can narrow the airways and restrict airflow.']
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
        ['Larynx', 'The voice box containing vocal cords that vibrate as air passes'],
        ['Goblet cells', 'Airway-lining cells that secrete mucus to trap dust and other particles'],
        ['Cilia', 'Tiny hair-like projections that move particle-laden mucus away from the lungs'],
        ['Bronchi', 'The two main branches of the trachea, with one entering each lung'],
        ['Pleural fluid', 'The lubricating fluid between pleural membranes that reduces friction during breathing'],
        ['Air-pressure gradient', 'A difference that causes air to move from higher pressure towards lower pressure'],
        ['Inhalation volume change', 'Expansion of the thoracic cavity as the diaphragm flattens and the ribs rise'],
        ['Quiet exhalation volume change', 'Reduction of thoracic volume as the diaphragm relaxes and the ribs lower'],
        ['Nitrogen in inhaled and exhaled air', 'A gas whose proportion stays approximately the same in the lesson’s comparison'],
        ['Carbon dioxide in exhaled air', 'A gas whose proportion is higher after breathing because the body produces it'],
        ['Lung oxygen route', 'Oxygen moves from moist alveolar air spaces across thin walls into capillary blood'],
        ['Tissue carbon dioxide route', 'Carbon dioxide moves from body cells through tissue fluid into the blood'],
        ['Plasma oxygen transport', 'The small share of blood oxygen carried dissolved in the liquid part of blood'],
        ['High-altitude acclimatisation', 'An adjustment that can increase red blood cells and oxygen-carrying capacity'],
        ['High-altitude oxygen availability', 'Lower air pressure reduces the oxygen available for uptake from each breath'],
        ['Hay fever', 'An allergic response that can cause sneezing and watery eyes after pollen or dust exposure'],
        ['Lung cancer', 'Uncontrolled growth of abnormal lung cells that can form a tumour and obstruct airflow'],
        ['Tar', 'The smoke residue associated with damage to lung tissue and exposure to cancer-causing substances'],
        ['DOTS', 'The TB treatment-support approach in which taking prescribed medicine is directly observed'],
        ['Choking', 'Obstruction of the airway by foreign material, interfering with air movement']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 2, 3, 4, 5, 7, 9, 10, 13, 19, 25, 28, 33, 36];
    const hints = [
        'Incoming air is prepared in the nose.',
        'Think of the protective flap that closes during swallowing.',
        'This large airway needs support so that it does not collapse.',
        'These are smaller than the bronchi and lead towards air sacs.',
        'Choose the thin-walled lung structures surrounded by capillaries.',
        'This muscle forms a boundary between the chest and abdomen.',
        'Lower lung pressure draws air in.',
        'The breathing-control centres are in this part of the brain.',
        'This protein is inside red blood cells.',
        'Most carbon dioxide travels in a dissolved ionic form.',
        'This smoke gas binds strongly to haemoglobin.',
        'Follow contraction, expansion, pressure decrease and inward airflow.',
        'Subtract the two proportions and use percentage points.',
        'More red blood cells mean more of the oxygen-binding protein.',
        'The aim is to support completion of the prescribed medication.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['Name three ways nasal passages prepare incoming air.', 'They warm, moisten and help clean the air'],
        ['Explain how the epiglottis helps protect the breathing system during swallowing.', 'It covers the airway entrance and helps prevent food or liquid entering the trachea'],
        ['Where are the vocal cords found, and how do they produce sound?', 'In the larynx; they vibrate as air passes through'],
        ['Give two advantages of C-shaped cartilage rings in the trachea.', 'They support the airway and prevent collapse, while their open ends allow the oesophagus to expand'],
        ['Which cells secrete mucus in the tracheal lining, and what does the mucus do?', 'Goblet cells; the mucus traps dust and other foreign particles'],
        ['In which direction do airway cilia move particle-laden mucus?', 'Away from the lungs towards the throat'],
        ['Trace the airway route from the trachea to the gas-exchange air sacs.', 'Trachea to bronchi to bronchioles to alveoli'],
        ['What is the function of fluid between the pleural membranes?', 'It reduces friction between the lungs and chest wall during breathing'],
        ['What happens to the diaphragm during normal inhalation?', 'It contracts, flattens and moves down, increasing chest volume'],
        ['Describe rib movement and the muscle action that causes it during normal inhalation.', 'The external intercostal muscles contract and move the ribs upwards and outwards'],
        ['Describe the diaphragm and rib cage during quiet exhalation.', 'The diaphragm relaxes and rises; the ribs move downwards and inwards'],
        ['Explain why expansion of the thoracic cavity brings air into the lungs.', 'Expansion lowers lung pressure below atmospheric pressure, so air enters down the pressure difference'],
        ['Air moves between two regions of unequal pressure. In which direction does it flow?', 'From the region of higher pressure to the region of lower pressure'],
        ['A simplified table gives oxygen as 20% inhaled and 16% exhaled. Calculate the difference in percentage points.', 'Four percentage points'],
        ['Which gas stays at approximately 78% in both inhaled and exhaled air in the lesson’s table?', 'Nitrogen'],
        ['Explain the breathing response to increased carbon dioxide production during vigorous exercise.', 'Breathing-control centres including those in the medulla oblongata increase breathing rate and depth to help remove more carbon dioxide and supply oxygen'],
        ['Describe the direction of oxygen diffusion at an alveolus.', 'From alveolar air across the moist alveolar and capillary walls into blood'],
        ['Describe how carbon dioxide leaves the blood at the lungs.', 'It diffuses across the capillary and alveolar walls into alveoli and is then exhaled'],
        ['State the main and minor ways oxygen travels in blood.', 'Mainly bound to haemoglobin in red blood cells; a small amount is dissolved in plasma'],
        ['Why is reversible oxygen binding to haemoglobin useful?', 'It allows oxygen to be picked up at the lungs and released again at body tissues'],
        ['What is the main form of carbon dioxide transport in blood?', 'Bicarbonate ions'],
        ['Follow oxygen from tissue capillary blood into a body cell.', 'It is released from oxyhaemoglobin and diffuses from blood through tissue fluid into the cell'],
        ['Follow carbon dioxide from a respiring body cell into the circulation.', 'It diffuses from the cell through tissue fluid into capillary blood for transport towards the lungs'],
        ['Why can producing more red blood cells help during high-altitude acclimatisation?', 'More red blood cells provide more haemoglobin and can increase the blood’s oxygen-carrying capacity'],
        ['Name the organism that causes tuberculosis.', 'Mycobacterium tuberculosis, a bacterium'],
        ['How does infectious pulmonary TB spread through the air?', 'An infectious person releases airborne bacteria that another person may inhale'],
        ['Can someone with latent TB infection spread TB to others?', 'No; latent infection is not infectious, unlike infectious active pulmonary TB'],
        ['Why is completing a clinician-prescribed TB treatment course important?', 'It supports successful treatment and reduces the risk of relapse and drug resistance'],
        ['What is the purpose of directly observing prescribed medicine being taken in the DOTS approach?', 'To support treatment adherence and completion'],
        ['Why can good room ventilation help reduce TB transmission risk?', 'It helps dilute and remove airborne infectious particles'],
        ['How do airway inflammation, smooth-muscle contraction and mucus affect airflow in asthma?', 'They can narrow the airways and reduce airflow'],
        ['Name the allergic condition associated with sneezing and watery eyes after exposure to pollen.', 'Hay fever, also called allergic rhinitis'],
        ['Explain why damaged alveolar walls in emphysema reduce gas-exchange efficiency.', 'Wall destruction reduces the available exchange area and can contribute to air trapping'],
        ['How can bronchitis interfere with breathing?', 'Inflamed bronchial airways and accumulated mucus can narrow or obstruct airflow'],
        ['How can uncontrolled growth of abnormal lung cells interfere with ventilation?', 'A tumour can obstruct an airway and reduce airflow'],
        ['What harmful effects are associated with tar-containing cigarette smoke?', 'Damage to lung tissue and exposure to cancer-causing substances'],
        ['Why can damaged cilia contribute to a smoker’s cough?', 'Mucus and particles are cleared less effectively and accumulate in the airways'],
        ['Explain why carbon monoxide in cigarette smoke reduces oxygen delivery to tissues.', 'It binds strongly to haemoglobin and reduces the capacity available for oxygen transport'],
        ['What biological problem occurs when food becomes lodged in an airway during choking?', 'Airflow is obstructed, so ventilation and oxygen supply may be severely reduced'],
        ['What is the purpose of assisted ventilation when someone cannot breathe adequately on their own?', 'To support movement of air into and out of the lungs so gas exchange and oxygen delivery can continue']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.HumanGasExchangeTopic2 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
