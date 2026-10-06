/* Grade 11 Geography, Term 4, Topic 2: Conventional Energy Sources.
 * Based on Topic 2.pdf, including the thermal-generation diagrams, mining
 * illustrations, coal-field map, advantages/disadvantages and planning section.
 * Questions are self-contained. Undated emission totals and old electricity-mix
 * percentages are not presented as current statistics. Medupi and Kusile are
 * identified by location, not described as still under construction.
 * Primary checks:
 * https://www.eia.gov/energyexplained/electricity/how-electricity-is-generated.php
 * https://www.eia.gov/energyexplained/coal/coal-and-the-environment.php
 * https://www.epa.gov/nps/abandoned-mine-drainage
 * https://www.epa.gov/acidrain/what-acid-rain
 * https://www.eskom.co.za/kusile-unit-6-achieves-commercial-operation-unlocking-full-9600mw-capacity-across-eskoms-flagship-stations/
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Conventional energy sources', 'Established sources used extensively for electricity generation, including coal in South Africa.'],
        ['Coal', 'A solid fossil fuel burned to provide heat in the thermal-generation process described in this lesson.'],
        ['Fossil fuel', 'An energy resource formed from ancient organic material over geological time, such as coal.'],
        ['Thermal power station', 'A plant that uses heat to produce steam which drives equipment that generates electricity.'],
        ['Coal pulverisation', 'Crushing coal into a fine powder before it is burned in the power station.'],
        ['Boiler', 'The equipment in which heat from burning coal turns water into steam.'],
        ['Steam', 'Water in its gaseous form used to drive turbine blades in a coal-fired power station.'],
        ['Turbine', 'A machine with blades that are turned by moving steam and drive the generator.'],
        ['Generator', 'Equipment that converts the turbine’s mechanical movement into electrical energy.'],
        ['Power lines', 'Conductors that carry electricity from the generating system towards consumers.'],
        ['Opencast mining', 'Removing coal from a surface excavation, which can greatly alter the landscape.'],
        ['Underground mining', 'Extracting coal below the surface through shafts or tunnels, with risks to workers.'],
        ['Acid mine drainage', 'Acidic, often metal-rich water produced by reactions involving exposed sulphur-bearing rocks, water and oxygen.'],
        ['Mine rehabilitation', 'Work to restore or stabilise land and reduce environmental damage after mining.'],
        ['Environmental despoliation', 'Damage to or degradation of the natural environment, including damage caused by mining.'],
        ['Carbon dioxide', 'A greenhouse gas released when coal burns that contributes to global warming.'],
        ['Acid rain', 'Acidic precipitation associated with atmospheric reactions involving sulphur dioxide and nitrogen oxides.'],
        ['Fly ash', 'Fine solid residue from burning coal that must be captured or safely managed.'],
        ['Hydroelectric power', 'Electricity generated using moving water to drive a turbine.'],
        ['Energy planning', 'Choosing how future electricity needs will be met while considering supply, costs and environmental effects.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        for (let i = 0, shift = mc.count++ % 4; i < shift; i++) options.push(options.shift());
        return { q, options: options.map((choice, index) => String.fromCharCode(65 + index) + ') ' + choice), a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Which established source is the main focus of this lesson on electricity generation in South Africa?', 'Coal', 'Ocean-wave energy', 'Solar panels alone', 'Wind turbines alone'),
        mc('What role does coal perform in the thermal-generation process?', 'It burns to supply heat', 'It carries electricity along power lines', 'It turns directly into copper wire', 'It replaces the turbine blades'),
        mc('Which description explains why coal is a fossil fuel?', 'It formed from ancient organic material over geological time', 'It is replaced completely after every rainfall event', 'It is produced instantly by an electrical generator', 'It consists only of steam inside a boiler'),
        mc('Which process makes a coal-fired power station a thermal power station?', 'Heat produces steam that drives generating equipment', 'Wind alone pushes the station’s power lines', 'Coal directly becomes an electrical current without machinery', 'Rainfall creates electricity inside the coal bunker'),
        mc('What happens during coal pulverisation?', 'Coal is crushed into a fine powder', 'Steam is cooled back into water', 'Electricity is carried to consumers', 'A mined landscape is rehabilitated'),
        mc('Which equipment uses heat to turn water into steam?', 'The boiler', 'The generator', 'The transmission line', 'The coal conveyor'),
        mc('What drives the turbine blades in the coal-fired system?', 'Moving steam', 'Fly ash stored on the ground', 'Copper power lines', 'Rock exposed in an opencast mine'),
        mc('What is the turbine’s role in this system?', 'Its rotation drives the generator', 'It carries electricity directly to every house', 'It dissolves metals in mine water', 'It crushes coal before combustion'),
        mc('Which equipment converts mechanical movement into electrical energy?', 'The generator', 'The coal bunker', 'The boiler', 'The ash-disposal area'),
        mc('After generation, how is electricity carried towards homes and factories?', 'Through power lines and the electricity network', 'Through acid mine drainage channels', 'Inside the coal conveyor alone', 'Inside an ash-storage heap'),
        mc('A large surface excavation is made to extract coal. Which mining method is this?', 'Opencast mining', 'Underground mining through deep tunnels', 'Hydroelectric generation', 'Power-line transmission'),
        mc('Workers extract coal through shafts and tunnels below the surface. Which method is this?', 'Underground mining', 'Opencast mining only', 'Mine rehabilitation', 'Coal pulverisation inside a power station'),
        mc('Acidic water containing dissolved metals flows from exposed sulphur-bearing rocks at a mine. Identify the problem.', 'Acid mine drainage', 'Clean cooling water by definition', 'Electrical transmission', 'Hydroelectric power'),
        mc('Which action is an example of mine rehabilitation?', 'Restoring or stabilising damaged mined land', 'Expanding an exposed pit without restoring it', 'Releasing polluted drainage into a stream', 'Removing remaining vegetation after mining ends'),
        mc('Which example shows environmental despoliation from coal mining?', 'Natural land and habitats damaged by a large excavation', 'Electricity supplied through maintained power lines', 'Steam turning a turbine inside a plant', 'Successful restoration of a disturbed site'),
        mc('Which gas released by burning coal is a major greenhouse gas?', 'Carbon dioxide', 'Only water vapour from every cooling tower', 'Fly ash', 'Solid coal before it burns'),
        mc('Which pair of emissions contributes to acid rain?', 'Sulphur dioxide and nitrogen oxides', 'Only clean cooling water and steam', 'Only solid coal and copper wire', 'Only sand and gravel from a river'),
        mc('Which coal-burning waste is a fine solid residue rather than a gas?', 'Fly ash', 'Carbon dioxide', 'Sulphur dioxide', 'Nitrogen oxides'),
        mc('What supplies the turbine-driving energy in hydroelectric generation?', 'Moving water', 'Burning powdered coal', 'Acid mine drainage', 'A solid ash heap'),
        mc('What is a central purpose of long-term electricity planning?', 'Providing suitable generating capacity to meet future demand sustainably', 'Choosing a fuel without considering future demand', 'Ignoring costs and all environmental effects', 'Assuming one old percentage forecast can never change')
    ];

    const extraChoice = [
        mc('Why does the lesson identify coal reserves as an advantage for South Africa?', 'Local fuel availability has supported coal-based electricity generation', 'Large reserves mean coal is renewable', 'Coal reserves prevent every type of pollution', 'Coal reserves remove the need for generating equipment'),
        mc('Which factor helps explain South Africa’s established use of coal power?', 'Existing mines, power stations and related infrastructure', 'The absence of any need to transport fuel', 'Coal reforming immediately after extraction', 'Generators operating without any energy input'),
        mc('A learner says coal is renewable because South Africa has large reserves. Which response is correct?', 'Large reserves do not change the fact that coal forms too slowly to be renewed on human timescales', 'Every abundant resource is renewable', 'Burning coal automatically replaces the extracted amount', 'An electricity network makes the fuel renewable'),
        mc('Coal reaches the power station but cannot be prepared as a fine powder. Which equipment should be checked first?', 'The pulverising mill', 'The transmission line', 'The generator’s electrical output cable', 'The mine-rehabilitation equipment'),
        mc('Why should an advantage of coal supply not be treated as proof that coal power has no disadvantages?', 'Fuel availability does not remove waste, pollution or construction challenges', 'Any available fuel produces no waste', 'Having coal automatically prevents landscape damage', 'Existing infrastructure guarantees that all electricity is free'),
        mc('Which sequence correctly summarises coal-fired electricity generation?', 'Coal burns, water becomes steam, steam turns a turbine, the turbine drives a generator', 'A generator crushes coal, power lines boil water, ash turns into steam', 'Coal enters power lines, electricity creates a mine, the mine drives the turbine', 'A turbine makes coal, cooling water carries electricity directly to houses'),
        mc('Steam leaves the turbine and is cooled back into water. Which component performs this task?', 'The condenser', 'The coal bunker', 'The pulverising mill', 'The electrical transmission line'),
        mc('What role does the cooling system shown in the generation diagram perform?', 'It removes waste heat and helps cool steam back into water', 'It produces all electricity without the generator', 'It turns fly ash directly into coal', 'It replaces coal mining with acid rain'),
        mc('The turbine turns but the generator is not functioning. Which stage is most directly affected?', 'Conversion of mechanical movement into electrical energy', 'The formation of coal reserves underground', 'The excavation of an opencast mine', 'The development of acid mine drainage'),
        mc('Which energy-conversion sequence best fits the coal-fired process?', 'Chemical energy to heat, then mechanical movement, then electrical energy', 'Electrical energy to coal reserves, then to rainfall', 'Only mechanical energy to coal, without heat', 'Only light energy directly to acid mine drainage'),
        mc('Why can opencast mining cause major landscape damage?', 'It removes surface material and changes landforms and habitats', 'It takes place only inside an electrical generator', 'It always leaves every surface feature untouched', 'It is the same process as restoring an old mining site'),
        mc('Which distinction between acid mine drainage and acid rain is correct?', 'Mine drainage involves acidic water from exposed rocks; acid rain involves reactions of pollutants in the atmosphere', 'Both are only clean steam used by the turbine', 'Acid rain is a solid ash heap; mine drainage is an electrical cable', 'Mine drainage is produced only when a power line carries electricity'),
        mc('Why can acid mine drainage harm plants and animals?', 'It can acidify soil and water and carry toxic dissolved metals', 'It always neutralises all pollution in rivers', 'It provides the same water quality as an uncontaminated stream', 'It prevents all chemical reactions in exposed rocks'),
        mc('Which response best recognises the difficulty of restoring mined land?', 'Rehabilitation is important, but restoration can be challenging and requires continued care', 'Every mined landscape restores itself immediately', 'A restoration requirement proves no environmental damage occurred', 'Closing a mine guarantees that polluted drainage stops instantly'),
        mc('Which risk to people is highlighted for underground coal mining?', 'Safety dangers and chronic health problems', 'Only reduced electricity prices', 'Guaranteed protection from dust and accidents', 'Only the loss of a hydroelectric turbine'),
        mc('Why can air pollution from coal power affect areas away from the source?', 'Winds can carry emitted gases and particles beyond the power station', 'All emissions stop exactly at the boundary fence', 'Carbon dioxide remains permanently inside the coal bunker', 'Power lines prevent air from moving'),
        mc('Which province is strongly associated with coal fields and coal power stations in the lesson?', 'Mpumalanga', 'Western Cape alone', 'Northern Cape alone', 'Free State alone'),
        mc('Why can coal-field location influence where a power station is built?', 'Access to fuel and the cost of transporting it matter', 'All coal fields occur at every possible building site', 'The generator can create coal from power lines', 'Mining locations determine the colour of every turbine'),
        mc('What geographical constraint can limit expansion of hydroelectric power in a relatively dry country?', 'Limited or variable water availability', 'The need to pulverise coal before every water flow', 'The absence of any connection between rivers and water', 'The requirement that every river contain fly ash'),
        mc('Which assessment best weighs the lesson’s advantages and disadvantages of coal power?', 'Consider fuel supply and existing infrastructure alongside pollution, waste and the cost of new capacity', 'Consider only fuel reserves and ignore all environmental effects', 'Assume every power station is reliable without maintenance', 'Treat an old planned energy mix as a guaranteed current outcome')
    ];

    const trueFalseFacts = [
        ['Coal is an established electricity-generation fuel in South Africa.', true, 'The lesson focuses on coal as a conventional source.'],
        ['Large coal reserves make coal a renewable resource.', false, 'Abundance does not change its very slow formation time.'],
        ['Coal is pulverised into a fine powder before burning in the described plant.', true, 'The mills prepare the coal for combustion.'],
        ['Coal enters power lines directly and changes into electricity without a power station.', false, 'The fuel supplies heat to a steam-driven generating process.'],
        ['Existing infrastructure helps explain South Africa’s use of coal power.', true, 'Mines, generating plants and related systems support its use.'],
        ['The generator’s main job is to boil water into steam.', false, 'The boiler produces steam; the generator produces electrical energy.'],
        ['Moving steam turns the turbine blades in the coal-fired system.', true, 'The turbine then drives the generator.'],
        ['The turbine is the same equipment as the coal-pulverising mill.', false, 'The turbine rotates under steam flow; the mill crushes coal.'],
        ['The condenser cools used steam back into water.', true, 'This is part of the steam and cooling cycle shown in the diagram.'],
        ['Power lines are used to transport solid fly ash to homes.', false, 'They carry electrical energy towards consumers.'],
        ['Opencast mining can alter landforms and damage habitats.', true, 'Surface excavation can cause major landscape disturbance.'],
        ['Underground coal mining has no health or safety risks for workers.', false, 'The lesson identifies significant dangers and chronic health risks.'],
        ['Acid mine drainage can contain dissolved metals harmful to organisms.', true, 'Acidic water can dissolve metals from exposed rocks.'],
        ['Mine rehabilitation means leaving damaged land untreated because restoration is always automatic.', false, 'Rehabilitation requires work to restore or stabilise the affected land.'],
        ['Coal mining and coal burning can both have environmental impacts.', true, 'Extraction damages land and water; combustion produces gases and solid waste.'],
        ['Carbon dioxide and fly ash are both gases.', false, 'Carbon dioxide is a gas; fly ash is a fine solid residue.'],
        ['Sulphur dioxide and nitrogen oxides can contribute to acid rain.', true, 'Atmospheric reactions involving these emissions produce acidic compounds.'],
        ['Coal-fired electricity has no construction costs or waste-management needs.', false, 'New plants are expensive and coal combustion generates waste.'],
        ['Water availability is an important factor in hydroelectric generation.', true, 'Moving water is needed to drive the turbine.'],
        ['A historical electricity-mix projection must be treated as a guaranteed description of today’s supply.', false, 'A dated plan is not the same as a measured current outcome.']
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
        ['Non-renewable resource', 'An energy resource not replaced quickly enough on human timescales, even when reserves are large'],
        ['Coal reserves', 'Known deposits of the solid fuel available for extraction'],
        ['Coal bunker', 'A storage container holding coal before it enters the preparation and burning process'],
        ['Coal conveyor', 'A moving belt carrying solid fuel into the power-station handling system'],
        ['Pulverising mill', 'The machine that crushes coal into fine powder'],
        ['Furnace', 'The combustion area where fuel burns to release heat'],
        ['Condenser', 'Equipment that cools steam leaving the turbine and turns it back into liquid water'],
        ['Cooling loop', 'A circulating-water system that carries waste heat away from the condenser'],
        ['Cooling tower', 'A structure that helps release waste heat from the cooling-water system'],
        ['Energy conversion', 'The change from the fuel’s chemical energy through heat and movement to electrical energy'],
        ['Dissolved metals', 'Metal substances carried in acidic mine water that may be toxic to living organisms'],
        ['Air pollution', 'Contamination of the atmosphere by harmful gases or particles'],
        ['Water acidification', 'An increase in water acidity that can follow polluted mine drainage'],
        ['Metal toxicity', 'Harm to living organisms from dissolved substances such as aluminium and manganese'],
        ['Mining health risks', 'Dangers to worker well-being, including long-term problems associated with underground extraction'],
        ['Sulphur dioxide', 'A sulphur-containing gas from coal combustion that contributes to acid rain'],
        ['Nitrogen oxides', 'Nitrogen-containing gases from combustion that can contribute to acid rain and smog'],
        ['Particulate matter', 'Small solid particles in the air that can create health and environmental risks'],
        ['Coal-field location', 'The geographical position of fuel deposits that influences transport and power-station siting'],
        ['Electricity demand', 'The amount of electrical energy consumers require, which guides future generating-capacity needs']
    ];
    const match = Object.fromEntries([0, 1, 2, 3].map(group => ['topic' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).concat(factPairs.slice(group * 5, group * 5 + 5)).flatMap(([term, meaning], index) => [
            { id: index + 1, text: term }, { id: index + 1, text: meaning }
        ])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(group => ['unit' + (group + 1),
        concepts.slice(group * 5, group * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [0, 1, 4, 5, 6, 8, 10, 12, 15, 16, 17, 25, 29, 31, 39];
    const hints = [
        'The lesson describes the solid fuel used extensively in established thermal generation.',
        'Think about the first energy change when the fuel burns.',
        'The mills change the size of the coal, not the form of steam.',
        'Separate the steam-producing equipment from the electricity-producing equipment.',
        'The blades are moved by the water after it has been heated into a gas.',
        'Look for the device connected to the rotating turbine.',
        'The extraction is visible at the surface rather than taking place in deep tunnels.',
        'Consider the combination of exposed rocks, acidic water and dissolved metals.',
        'This gas is associated with the greenhouse effect, not a solid ash residue.',
        'Look for the sulphur- and nitrogen-containing gases.',
        'Choose the solid residue left after coal combustion.',
        'Follow the order from fuel and heat to steam, rotation and electrical output.',
        'Trace the energy through burning, turbine movement and generation.',
        'One process begins at exposed mine rocks; the other involves the atmosphere.',
        'A balanced decision considers supply, infrastructure, waste, pollution and investment.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What makes coal an example of a conventional energy source in this lesson?', 'Its established, extensive use in electricity generation in South Africa'],
        ['Why is coal described as a fossil fuel?', 'It formed from ancient organic material over geological time'],
        ['Does having large coal reserves make coal renewable? Explain.', 'No; reserves do not change its very slow formation and replacement rate'],
        ['Name two reasons the lesson gives for South Africa’s established reliance on coal power.', 'Coal reserves and established coal-generation infrastructure'],
        ['What does the coal-pulverising mill do?', 'Crushes coal into a fine powder before combustion'],
        ['What role does a coal conveyor perform at a power station?', 'Carries solid coal through the handling system towards preparation or storage'],
        ['What is a coal bunker used for?', 'Holding coal before preparation and burning'],
        ['Why is a coal-fired plant called a thermal power station?', 'It uses heat to make steam that drives electricity-generating machinery'],
        ['Why does local fuel availability not prove that coal power has no environmental disadvantages?', 'Available coal still requires mining and burning, which can create damage, pollution and waste'],
        ['Why should claims that coal is always the cheapest option be assessed rather than assumed?', 'Costs depend on the plant, fuel supply, new investment and pollution or waste-management needs'],
        ['What is the boiler’s role in coal-fired electricity generation?', 'Heat from burning coal turns water into steam'],
        ['What causes the turbine blades to rotate in the described plant?', 'Moving steam from the boiler'],
        ['How are the turbine and generator connected in the generating process?', 'The turbine’s rotation drives the generator'],
        ['What energy conversion takes place in a generator?', 'Mechanical energy is converted into electrical energy'],
        ['Put these stages in order: generator output, coal burning, turbine rotation, steam production.', 'Coal burning, steam production, turbine rotation, generator output'],
        ['What happens to used steam in the condenser?', 'It is cooled and turns back into liquid water'],
        ['Why does the plant need a cooling-water system?', 'To remove waste heat and help condense steam back into water'],
        ['What is the purpose of power lines after electricity is generated?', 'To carry electricity through the network towards consumers'],
        ['A turbine rotates but a faulty generator produces no electricity. Which conversion is interrupted?', 'Mechanical movement into electrical energy'],
        ['Describe the main energy changes from coal to electricity.', 'Chemical energy in coal becomes heat, then mechanical movement, then electrical energy'],
        ['How does opencast coal mining differ from underground mining?', 'Opencast mining uses a surface excavation; underground mining uses shafts or tunnels below the surface'],
        ['Give two environmental effects of a large opencast mine.', 'Altered landforms, loss of habitats, vegetation damage or disturbed soils; any two'],
        ['What health and safety concerns does the lesson identify for underground mining?', 'Significant safety dangers and chronic health problems for workers'],
        ['What is acid mine drainage?', 'Acidic, often metal-rich water formed through reactions involving exposed sulphur-bearing rocks, water and oxygen'],
        ['Why can exposing certain mine rocks to air and water create a water-quality problem?', 'Acid-forming reactions can produce polluted drainage and dissolve metals'],
        ['How can acidic mine water affect plants and animals?', 'It can acidify soil and water and carry toxic dissolved metals'],
        ['Name two metals mentioned in the lesson as potentially harmful in acid mine drainage.', 'Aluminium and manganese'],
        ['What does mine rehabilitation aim to achieve?', 'Restore or stabilise mined land and reduce the environmental damage'],
        ['Why is a requirement to rehabilitate a mine not the same as proof of complete restoration?', 'Restoration can remain difficult and damage may need ongoing management'],
        ['What is environmental despoliation?', 'Damage to or degradation of the natural environment'],
        ['Which coal-combustion gas contributes strongly to global warming?', 'Carbon dioxide'],
        ['Name two groups of gases associated with acid rain from coal combustion.', 'Sulphur dioxide and nitrogen oxides'],
        ['How does acid rain differ from acid mine drainage?', 'Acid rain involves atmospheric pollutants and precipitation; mine drainage involves acidic water reacting with exposed rocks'],
        ['What is fly ash, and why must it be managed?', 'Fine solid residue from burning coal; unsafe handling can create health and environmental risks'],
        ['Why can pollution from a coal-fired station affect places beyond its boundary?', 'Wind can transport pollutants away from the source'],
        ['Which province is strongly associated with the coal fields highlighted in this lesson?', 'Mpumalanga'],
        ['In which provinces are Medupi and Kusile power stations located?', 'Medupi is in Limpopo; Kusile is in Mpumalanga'],
        ['Why can fuel transport influence the location of a coal power station?', 'The station needs a continuing fuel supply, and distance affects transport needs and costs'],
        ['Why can a relatively dry climate limit expansion of hydroelectric power?', 'Limited or variable water availability constrains the moving-water resource needed for generation'],
        ['What should a sustainable long-term electricity strategy balance?', 'Future demand and generating capacity, resource availability, costs and environmental impacts']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.ConventionalEnergyTopic2 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
