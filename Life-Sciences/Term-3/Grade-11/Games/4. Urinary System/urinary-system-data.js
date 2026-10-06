/* Grade 11 Life Sciences, Term 3, Topic 4: Urinary System.
 * All 86 pages of Topic 4.pdf were reviewed, including the nephron and ADH
 * diagrams, comparison tables and class activity. All prompts are standalone.
 * Scientific qualifications: reabsorption includes active AND passive transport;
 * water moves by osmosis, and active salt pumping is specified for the thick
 * ascending limb. Bilharzia larvae can penetrate intact skin. Transplant surgery
 * does not remove the need for continuing care and anti-rejection medicine.
 * Clinical prescriptions, rigid dialysis schedules and symptom-only diagnoses
 * are not taught. These are learning activities, not treatment instructions.
 * Factual checks, not copied question banks:
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/25-6-tubular-reabsorption
 * https://www.who.int/news-room/fact-sheets/detail/schistosomiasis
 * https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/kidney-transplant
 * https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/peritoneal-dialysis
 */
(function (global) {
    'use strict';
    const concepts = [
        ['Kidneys', 'The paired organs that filter blood, form urine and help regulate water, salts and blood pH.'],
        ['Ureter', 'The tube carrying urine from a kidney to the urinary bladder.'],
        ['Urinary bladder', 'The muscular organ that temporarily stores urine before it leaves the body.'],
        ['Urethra', 'The tube through which urine leaves the bladder and passes outside the body.'],
        ['Renal pelvis', 'The funnel-shaped collecting region that channels urine from the calyces into the ureter.'],
        ['Nephron', 'The microscopic functional unit of a kidney, consisting of a renal corpuscle and a renal tubule.'],
        ['Glomerulus', 'The capillary network inside Bowman’s capsule where blood is filtered under pressure.'],
        ['Bowman’s capsule', 'The cup-shaped structure surrounding the glomerulus and receiving its filtrate.'],
        ['Ultrafiltration', 'Pressure-driven movement of water and small solutes from glomerular blood into Bowman’s capsule.'],
        ['Tubular reabsorption', 'The selective return of useful substances and much of the water from kidney tubules to blood.'],
        ['Osmoregulation', 'Regulation of the body’s water and dissolved-solute balance.'],
        ['ADH', 'The hormone that increases water permeability in parts of the distal tubule and collecting ducts.'],
        ['Aldosterone', 'The adrenal hormone that increases sodium reabsorption by the kidney.'],
        ['Loop of Henle', 'The U-shaped part of a nephron that helps establish the medullary gradient for water conservation.'],
        ['Negative feedback', 'A control process in which a response reduces the original change from a normal condition.'],
        ['Kidney stones', 'Hard deposits formed when certain substances dissolved in urine crystallise and accumulate.'],
        ['Bilharzia', 'A parasitic-worm infection acquired when larvae penetrate skin during contact with infested freshwater.'],
        ['Kidney failure', 'A condition in which kidneys cannot adequately remove wastes and regulate fluid and salt balance.'],
        ['Haemodialysis', 'Treatment in which blood passes through an external dialyser to remove wastes and excess fluid.'],
        ['Peritoneal dialysis', 'Treatment using the abdominal lining as a membrane, with dialysis fluid placed in the abdomen.']
    ];
    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;
    const multipleChoice = [
        mc('Which organs filter blood and help regulate water, salts and blood pH?', 'Kidneys', 'Urinary bladder', 'Ureters', 'Urethra'),
        mc('Urine has just left a kidney. Which tube carries it to the bladder?', 'Ureter', 'Urethra', 'Renal artery', 'Renal vein'),
        mc('Where is urine temporarily stored before urination?', 'Urinary bladder', 'Renal artery', 'Glomerulus', 'Adrenal gland'),
        mc('Which structure carries urine from the bladder to the outside?', 'Urethra', 'Ureter', 'Renal vein', 'Collecting duct'),
        mc('Which funnel-shaped region receives urine from the calyces before the ureter?', 'Renal pelvis', 'Renal cortex', 'Renal capsule', 'Glomerulus'),
        mc('What is the microscopic functional unit of the kidney?', 'Nephron', 'Alveolus', 'Neuron', 'Villus'),
        mc('Which capillary network is enclosed by Bowman’s capsule?', 'Glomerulus', 'Renal pelvis', 'Collecting duct', 'Ureter'),
        mc('Which cup-shaped structure receives fluid filtered from the glomerulus?', 'Bowman’s capsule', 'Urinary bladder', 'Renal capsule', 'Adrenal gland'),
        mc('What is the pressure-driven filtration of small substances into Bowman’s capsule called?', 'Ultrafiltration', 'Tubular reabsorption', 'Tubular secretion', 'Urine storage'),
        mc('Glucose and much of the water return from tubular fluid to blood. Which process is this?', 'Tubular reabsorption', 'Ultrafiltration', 'Urination', 'Tubular secretion'),
        mc('What is regulation of the body’s water and dissolved-solute balance called?', 'Osmoregulation', 'Ventilation', 'Egestion', 'Digestion'),
        mc('Which hormone increases water permeability in parts of the distal tubule and collecting ducts?', 'ADH', 'Aldosterone', 'Insulin', 'Adrenaline'),
        mc('Which adrenal hormone increases sodium reabsorption by the kidney?', 'Aldosterone', 'ADH', 'Insulin', 'Thyroxine'),
        mc('Which U-shaped nephron region helps establish the medullary gradient for conserving water?', 'Loop of Henle', 'Bowman’s capsule', 'Renal pelvis', 'Urethra'),
        mc('Low blood water triggers a response that restores water balance and reduces that trigger. Which control process is shown?', 'Negative feedback', 'Permanent amplification', 'Egestion', 'Uncontrolled accumulation'),
        mc('What can form when certain dissolved substances in urine crystallise and accumulate?', 'Kidney stones', 'Nephrons', 'Red blood cells', 'ADH'),
        mc('Which infection is caused by parasitic worms whose larvae can penetrate skin in infested freshwater?', 'Bilharzia', 'A bacterial bladder infection', 'Kidney stones', 'Organ rejection'),
        mc('What describes kidneys no longer adequately removing wastes and regulating fluid balance?', 'Kidney failure', 'Normal ultrafiltration', 'Normal osmoregulation', 'Urine storage'),
        mc('Which treatment passes blood through a dialyser outside the body?', 'Haemodialysis', 'Peritoneal dialysis', 'Kidney transplantation', 'Normal tubular reabsorption'),
        mc('Which treatment places dialysis fluid in the abdomen and uses its lining as a membrane?', 'Peritoneal dialysis', 'Haemodialysis', 'Kidney transplantation', 'Bladder storage')
    ];
    const extraChoice = [
        mc('Which kidney region lies on the outside, just beneath the protective capsule?', 'Renal cortex', 'Renal medulla', 'Renal pelvis', 'Ureter'),
        mc('Which inner kidney region contains the renal pyramids?', 'Renal medulla', 'Renal cortex', 'Renal capsule', 'Urinary bladder'),
        mc('Which vessel brings blood from the aorta towards a kidney?', 'Renal artery', 'Renal vein', 'Ureter', 'Urethra'),
        mc('Which sequence correctly follows urine after it leaves the papillary ducts?', 'Calyces, renal pelvis, ureter, bladder, urethra', 'Urethra, bladder, ureter, pelvis, calyces', 'Renal vein, artery, bladder, ureter, urethra', 'Cortex, artery, glomerulus, vein, bladder'),
        mc('What is the role of the tough capsule around a kidney?', 'Protection and helping maintain its shape', 'Temporary storage of all urine', 'Carrying urine to the bladder', 'Releasing ADH into blood'),
        mc('How does a relatively narrow efferent arteriole assist glomerular filtration?', 'It helps maintain high pressure in the glomerulus', 'It carries urine straight to the bladder', 'It allows all blood cells into the filtrate', 'It prevents any blood leaving the glomerulus'),
        mc('Which substances normally remain in glomerular blood rather than entering the filtrate?', 'Blood cells and large plasma proteins', 'Water and urea', 'Glucose and amino acids', 'Small dissolved ions'),
        mc('Why do proximal-tubule cells have microvilli and many mitochondria?', 'Large absorption area and ATP for active transport', 'To store urine until urination', 'To manufacture blood cells in the filtrate', 'To prevent all water reabsorption'),
        mc('Additional hydrogen ions move from blood into the kidney tubule. Which process is this?', 'Tubular secretion, also called tubular excretion', 'Tubular reabsorption', 'Ultrafiltration into the bladder', 'Urine storage'),
        mc('Which statement correctly describes movement during tubular reabsorption?', 'Solutes use active or passive transport; water moves by osmosis', 'Every substance including water is actively pumped', 'All useful glucose must stay in urine', 'Blood cells are normally reabsorbed from filtrate'),
        mc('Where is ADH produced, and where is it released into blood?', 'Hypothalamus; posterior pituitary', 'Adrenal cortex; urinary bladder', 'Renal pelvis; glomerulus', 'Posterior pituitary; adrenal cortex'),
        mc('Blood water content falls and ADH rises. Which outcome is expected?', 'More water reabsorbed and a smaller volume of concentrated urine', 'Less water reabsorbed and a larger volume of dilute urine', 'All kidney filtration stops permanently', 'Blood cells are excreted as normal urine'),
        mc('Blood contains excess water and less ADH is released. Which outcome is expected?', 'Less water reabsorbed and a larger volume of dilute urine', 'More water reabsorbed and less urine', 'The ureter begins producing ADH', 'All sodium disappears from blood'),
        mc('Which comparison of the limbs of the loop of Henle is correct?', 'Water leaves the descending limb; the thick ascending limb pumps out salts and resists water movement', 'Both limbs actively pump water out', 'Only the ascending limb is freely permeable to water', 'Neither limb helps establish a medullary gradient'),
        mc('Blood becomes too acidic. Which kidney response helps restore a suitable pH?', 'Increased removal of hydrogen ions into urine', 'Returning every hydrogen ion to blood', 'Storing all urine indefinitely', 'Stopping all tubular secretion'),
        mc('A mineral deposit blocks a ureter. What is the most direct effect?', 'Urine flow from a kidney towards the bladder is obstructed', 'The lungs stop exchanging gases immediately', 'ADH is formed in the bladder', 'The glomerulus becomes a storage bladder'),
        mc('Which statement about a bacterial kidney infection is accurate?', 'It may spread upwards from an infection in the bladder', 'It is always caused by mineral crystals', 'It is the same condition as organ rejection', 'A symptom alone identifies its cause with certainty'),
        mc('What prevents blood cells from mixing freely with dialysis fluid in a dialyser?', 'A selectively permeable dialysis membrane', 'An open tube joining both liquids', 'The urinary bladder', 'The absence of all dissolved substances'),
        mc('Why is heparin used in the haemodialysis circuit described in the lesson?', 'To reduce blood clotting in the circuit', 'To produce kidney stones', 'To make the bladder release ADH', 'To replace every blood cell'),
        mc('Which comparison of a working kidney transplant and dialysis is correct?', 'A transplant needs a donor and continuing care; dialysis is repeated and needs no donated kidney', 'Neither needs continuing care', 'Dialysis always requires a donated kidney', 'A transplant guarantees that rejection cannot occur')
    ];
    const trueFalseFacts = [
        ['The ureters carry urine from the kidneys to the bladder.', true, 'Each kidney has a ureter leading to the bladder.'],
        ['The urethra is the tube carrying urine from a kidney to the bladder.', false, 'That tube is a ureter; the urethra carries urine out of the bladder.'],
        ['The urinary bladder temporarily stores urine.', true, 'Urine is formed by the kidneys, not by the bladder.'],
        ['The renal cortex is the inner region containing the renal pyramids.', false, 'The cortex is outer; the medulla is inner and contains the pyramids.'],
        ['Urine passes from the renal pelvis into the ureter.', true, 'The pelvis receives urine from the calyces and channels it into the ureter.'],
        ['The nephron is only a large urine-storage organ.', false, 'It is the microscopic functional unit of the kidney.'],
        ['High pressure in the glomerulus helps force small substances into Bowman’s capsule.', true, 'This pressure-driven process is ultrafiltration.'],
        ['Red blood cells and large plasma proteins normally enter Bowman’s capsule freely.', false, 'They are normally retained in the blood by the filtration barrier.'],
        ['Tubular reabsorption returns useful substances from tubular fluid to blood.', true, 'Much water and useful solutes are recovered rather than lost in urine.'],
        ['Water is actively pumped during all tubular reabsorption.', false, 'Water moves by osmosis; solute reabsorption can involve active or passive transport.'],
        ['ADH is produced in the hypothalamus and released from the posterior pituitary.', true, 'Its production site and release site are different.'],
        ['A rise in ADH normally causes a larger volume of more dilute urine.', false, 'More water is reabsorbed, producing less, more concentrated urine.'],
        ['Aldosterone increases sodium reabsorption by the kidney.', true, 'It is released by the adrenal cortex and helps regulate salt balance.'],
        ['The thick ascending limb of the loop of Henle is freely permeable to water.', false, 'It resists water movement while salts are transported out.'],
        ['Removing more hydrogen ions can help correct blood that has become too acidic.', true, 'Kidneys contribute to keeping blood pH within a suitable range.'],
        ['Kidney stones are always caused by parasitic worms.', false, 'They form from crystallised substances; bilharzia is caused by parasitic worms.'],
        ['Bilharzia larvae can penetrate skin during contact with infested freshwater.', true, 'A cut is not required for the larvae to enter.'],
        ['Peritoneal dialysis requires blood to pass through an external dialyser.', false, 'That describes haemodialysis; peritoneal dialysis uses the abdominal lining.'],
        ['Dialysis can remove nitrogenous wastes when kidneys cannot remove them adequately.', true, 'Wastes such as urea pass from blood into dialysis fluid.'],
        ['A successful kidney transplant removes any need for follow-up or anti-rejection medicine.', false, 'Transplant recipients still need continuing care and anti-rejection medicine.']
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
        ['Renal capsule', 'Tough outer covering that protects the kidney and helps maintain its shape'],
        ['Renal cortex', 'Outer kidney region containing the renal corpuscles and convoluted tubules'],
        ['Renal medulla', 'Inner kidney region containing renal pyramids'],
        ['Renal artery', 'Vessel carrying blood from the aorta towards a kidney'],
        ['Renal vein', 'Vessel carrying blood from a kidney towards the inferior vena cava'],
        ['Podocytes', 'Specialised cells on Bowman’s capsule forming part of the filtration barrier'],
        ['Proximal convoluted tubule', 'First convoluted tubule, where much of the filtrate’s useful content is recovered'],
        ['Tubular secretion', 'Transfer of additional substances from blood into the tubule; also called tubular excretion'],
        ['Microvilli', 'Tiny cell-surface projections that increase area for reabsorption'],
        ['Glomerular filtrate', 'Fluid entering Bowman’s capsule, including water, useful small solutes and waste'],
        ['High ADH response', 'More water reabsorbed, with a smaller volume of concentrated urine'],
        ['Low ADH response', 'Less water reabsorbed, with a larger volume of dilute urine'],
        ['Descending limb', 'Loop segment allowing water to leave by osmosis'],
        ['Thick ascending limb', 'Loop segment pumping salts out while resisting water movement'],
        ['Blood pH regulation', 'Kidney adjustment of ion removal to help maintain blood pH around 7.4'],
        ['Kidney infection', 'Infection that may develop when bacteria spread upwards from the bladder'],
        ['Kidney transplant', 'Placement of a donated kidney, with continuing follow-up and anti-rejection care'],
        ['Dialyser', 'External haemodialysis unit where wastes pass from blood into dialysis fluid'],
        ['Dialysis membrane', 'Selectively permeable barrier separating blood from dialysis fluid'],
        ['Heparin', 'Anticoagulant used to reduce clotting in the haemodialysis circuit']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));
    const millionaireIndexes = [0, 1, 2, 5, 6, 8, 9, 11, 12, 16, 25, 26, 29, 33, 39];
    const hints = [
        'These paired organs form urine and regulate blood composition.',
        'Distinguish kidney-to-bladder from bladder-to-outside.',
        'Choose storage, not formation or filtration.',
        'Think of a microscopic kidney unit.',
        'Look for a network of capillaries inside a cup.',
        'Pressure forces small substances through a filtration barrier.',
        'Useful substances return towards the blood.',
        'This hormone controls water permeability.',
        'The adrenal hormone controls sodium recovery.',
        'The cause is a parasitic worm, not crystals or bacteria.',
        'Resistance to blood leaving helps maintain filtration pressure.',
        'Large components normally stay on the blood side.',
        'Separate movement of water from movement of solutes.',
        'One limb allows water movement; the other builds the salt gradient.',
        'A donated kidney can work well but still needs continuing care.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });
    const jeopardyPrompts = [
        ['Name the four main types of structures in the human urinary system.', 'Two kidneys, two ureters, a urinary bladder and a urethra'],
        ['Distinguish the roles of a ureter and the urethra.', 'A ureter carries urine from a kidney to the bladder; the urethra carries it outside from the bladder'],
        ['Why is the urinary bladder not the organ that forms urine?', 'It stores urine temporarily; the kidneys form urine'],
        ['Identify the outer and inner regions of a kidney.', 'Outer renal cortex and inner renal medulla'],
        ['Describe the role of the renal capsule.', 'It protects the kidney and helps maintain its shape'],
        ['How are the renal pyramids, calyces and pelvis linked in urine drainage?', 'Urine leaves ducts at pyramid tips, enters calyces, then the renal pelvis'],
        ['Trace urine from the renal pelvis to outside the body.', 'Renal pelvis to ureter to urinary bladder to urethra to outside'],
        ['Compare the renal artery with the renal vein.', 'The renal artery brings blood from the aorta; the renal vein carries it away towards the inferior vena cava'],
        ['Give three homeostatic tasks of the kidneys besides nitrogenous-waste removal.', 'Regulating water balance, salt balance and blood pH'],
        ['Name the two major parts of a nephron.', 'Renal corpuscle, consisting of glomerulus and Bowman’s capsule, and renal tubule'],
        ['Contrast the functions of the glomerulus and Bowman’s capsule.', 'Glomerular capillaries filter blood under pressure; Bowman’s capsule receives the filtrate'],
        ['Which arteriole enters the glomerulus, and which one leaves?', 'The afferent arteriole enters; the efferent arteriole leaves'],
        ['Explain how arteriole diameter helps maintain glomerular filtration pressure.', 'The relatively wider afferent and narrower efferent arteriole help maintain high glomerular pressure'],
        ['Give three small substances that can enter glomerular filtrate.', 'Examples include water, glucose, amino acids, urea and small dissolved ions'],
        ['Why are whole blood cells and large plasma proteins normally absent from glomerular filtrate?', 'The filtration barrier normally retains these large components in blood'],
        ['Why must filtrate be modified rather than all passed directly out as urine?', 'It contains useful substances and much water that need returning to blood'],
        ['Explain how microvilli and mitochondria assist proximal-tubule function.', 'Microvilli increase reabsorption area; mitochondria provide ATP for active transport'],
        ['Distinguish tubular reabsorption from tubular secretion.', 'Reabsorption moves substances from tubule to blood; secretion moves additional substances from blood to tubule'],
        ['Correct the claim: all tubular reabsorption, including water movement, uses active pumping.', 'Solutes may move actively or passively; water is reabsorbed by osmosis'],
        ['Give two substances that can be secreted from blood into the tubule.', 'Examples include hydrogen ions, potassium ions, ammonium ions and certain drugs'],
        ['Define osmoregulation without naming a particular hormone.', 'Control of the body’s water and dissolved-solute balance'],
        ['Where is ADH made, and where is it released into the bloodstream?', 'Made in the hypothalamus and released by the posterior pituitary'],
        ['Link low blood water content to ADH and the urine produced.', 'More ADH increases water reabsorption, leading to less, more concentrated urine'],
        ['Link excess blood water to ADH and the urine produced.', 'Less ADH reduces water reabsorption, leading to more, more dilute urine'],
        ['How does increased ADH allow more water to return from tubular fluid to blood?', 'It increases water permeability in parts of the distal tubule and collecting ducts, allowing more osmosis'],
        ['Why is the ADH response an example of negative feedback?', 'The response restores water balance and reduces the original stimulus for altered ADH release'],
        ['Name aldosterone’s source and its main kidney effect.', 'The adrenal cortex releases it; it increases sodium reabsorption'],
        ['Compare the two limbs of the loop of Henle in conserving water.', 'Water leaves the descending limb by osmosis; salt leaves the water-resistant ascending limb, actively in its thick part'],
        ['Explain how a concentrated renal medulla favours water reabsorption.', 'Its high solute concentration gives it a low water potential, favouring water movement from permeable tubules by osmosis'],
        ['How can the kidneys help when blood becomes too acidic?', 'They can increase hydrogen-ion removal into urine, helping restore a suitable pH'],
        ['Explain how kidney stones may interfere with urine flow.', 'Crystallised deposits can block a ureter and obstruct drainage from a kidney'],
        ['How may a bladder infection be linked to a kidney infection?', 'Bacteria can spread upwards along the urinary tract to a kidney'],
        ['What causes bilharzia, and how can the infective stage enter the body?', 'Parasitic worms cause it; their larvae can penetrate skin during contact with infested freshwater'],
        ['What may accumulate when kidneys fail to remove waste and excess fluid adequately?', 'Nitrogenous wastes such as urea, excess water and salts'],
        ['Describe the principle of haemodialysis without giving treatment instructions.', 'Blood passes through an external dialyser; wastes move across a membrane into dialysis fluid and blood returns to the body'],
        ['What is the purpose of a partially permeable membrane in a dialyser?', 'It allows small dissolved wastes to cross while keeping blood cells separated from dialysis fluid'],
        ['State the functions of the roller pump, heparin and bubble trap in a haemodialysis circuit.', 'Pump moves blood; heparin reduces clotting; bubble trap helps prevent air bubbles returning with blood'],
        ['How does peritoneal dialysis differ from haemodialysis in the location of waste exchange?', 'Peritoneal dialysis uses the abdominal lining and fluid in the abdomen; haemodialysis uses an external dialyser'],
        ['Why must dialysis be repeated rather than removing all future waste in one treatment?', 'Cells continue producing wastes and fluid continues entering the body between treatments'],
        ['Compare a kidney transplant and dialysis in donor requirements and continuing care.', 'A transplant requires a donated kidney and follow-up with anti-rejection medicine; dialysis needs no donated kidney but repeated treatment']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.UrinarySystemTopic4 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
