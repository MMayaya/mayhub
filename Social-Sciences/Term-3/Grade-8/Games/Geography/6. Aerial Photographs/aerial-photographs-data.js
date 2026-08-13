(function () {
    "use strict";

    const makeQuestion = (q, answer, distractors, slot, hint) => {
        const options = distractors.slice(0, 3);
        options.splice(slot, 0, answer);
        return { q, options, a: slot, hint };
    };

    const quizPool = [
        makeQuestion("What does an aerial photograph show?", "The land surface from above", ["Only underground rocks", "A written list of place names", "Only weather conditions"], 0, "Aerial photographs provide an overhead view."),
        makeQuestion("Why do geographers use aerial photographs?", "To identify the position and pattern of surface features", ["To hear sounds from a settlement", "To measure every person's income", "To replace all maps"], 2, "Patterns of roads, rivers and settlements are visible."),
        makeQuestion("Which features can be studied using aerial photographs?", "Settlements, roads, rivers, farms and forests", ["Only clouds", "Only political opinions", "Only building interiors"], 1, "Both natural and constructed features appear from above."),
        makeQuestion("Why must aerial photographs be interpreted carefully?", "Objects can look very different from above", ["They contain no visible features", "They always show only one colour", "They are all maps"], 3, "The viewing angle changes familiar appearances."),
        makeQuestion("What is an aerial photograph?", "A photograph of land taken from an aeroplane or drone", ["A map drawn by hand", "A photograph taken underground", "A written landscape description"], 0, "This is the presentation's definition."),
        makeQuestion("What are the two main aerial photograph types?", "Vertical and oblique", ["Natural and constructed", "Light and heavy", "Rural and urban"], 2, "They are classified by camera angle."),
        makeQuestion("What does vertical mean?", "Straight up or down at a right angle to the horizon", ["Sloping at an angle", "Two lines meeting gradually", "Moving parallel to the horizon"], 1, "Think of a directly downward camera."),
        makeQuestion("What does oblique mean?", "Sloping or positioned at an angle", ["Directly vertical", "The same distance apart", "Completely hidden"], 3, "An oblique camera is not pointing straight down."),
        makeQuestion("What does parallel mean?", "Two lines or surfaces remain the same distance apart", ["Two lines cross sharply", "A camera points sideways", "A feature becomes darker"], 0, "The distance between the lines remains constant."),
        makeQuestion("How is a vertical aerial photograph taken?", "The camera points directly down towards the ground", ["The camera points at the horizon", "The camera is placed on the ground", "The camera points upward"], 2, "Its view is from directly above."),
        makeQuestion("Where is the vertical camera described as being fixed?", "Underneath the aeroplane", ["Inside a railway station", "On a mountain", "Under the ground"], 1, "It looks downward from the aircraft."),
        makeQuestion("What is the vertical camera's position relative to the ground?", "Parallel to the ground", ["At a sharp angle to the ground", "Behind a building", "Perpendicular to the horizon only"], 3, "The camera body and ground surface remain aligned."),
        makeQuestion("What kind of view does a vertical photograph produce?", "A map-like view", ["A street-level view", "An underground cross-section", "A written diagram"], 0, "It shows the layout directly from above."),
        makeQuestion("What does a vertical photograph show particularly clearly?", "Roads, fields and settlement layouts", ["The inside of buildings", "People's occupations", "Sound and movement"], 2, "These features form visible spatial patterns."),
        makeQuestion("Which tasks suit vertical aerial photographs?", "Studying settlement, transport and land-use patterns", ["Listening to city traffic", "Testing soil in a laboratory", "Interviewing residents"], 1, "The map-like view supports geographical interpretation."),
        makeQuestion("Why are vertical photographs useful in Geography?", "They show layout and patterns clearly from above", ["They hide all roads", "They show only feature sides", "They contain no scale differences"], 3, "Their overhead view resembles a map."),
        makeQuestion("How is an oblique aerial photograph taken?", "The camera points at the ground at an angle", ["The camera points directly down", "The camera rests on the ground", "The camera points only upward"], 0, "Oblique means angled."),
        makeQuestion("What view does an oblique photograph provide?", "A view partly from above and partly from the side", ["A perfectly map-like view", "A view from underground", "A view containing no height"], 2, "It combines top and side views."),
        makeQuestion("Why are buildings easier to recognise on an oblique photograph?", "Some of their height and shape can be seen", ["All shadows disappear", "They become map symbols", "They have no surrounding features"], 1, "The angled view is more familiar."),
        makeQuestion("What is a disadvantage of an oblique photograph?", "Some objects may be hidden behind other features", ["It cannot show any buildings", "It always appears as a map", "It has no colour or shade"], 3, "The angle can block the line of sight."),
        makeQuestion("Which type gives the more map-like view?", "Vertical aerial photograph", ["Oblique aerial photograph", "Ground photograph", "Satellite weather chart"], 0, "It is taken directly from above."),
        makeQuestion("Which type gives a more familiar view of buildings and landforms?", "Oblique aerial photograph", ["Vertical aerial photograph", "Large-scale map", "Written survey"], 2, "Top and side details are visible."),
        makeQuestion("Which clue describes the outline or form of an object?", "Shape", ["Texture", "Shade", "Pattern"], 1, "A building may look rectangular while a river winds."),
        makeQuestion("Which clue describes an organised or scattered arrangement?", "Pattern", ["Shadow", "Colour", "Height"], 3, "Look at how features repeat or are distributed."),
        makeQuestion("Which clue describes whether a feature looks light or dark?", "Colour and shade", ["Shape only", "Pattern only", "Direction only"], 0, "Water and vegetation often differ in brightness."),
        makeQuestion("Which clue describes a smooth, rough or dotted appearance?", "Texture", ["Scale", "Direction", "Position"], 2, "Vegetation often creates a rough or dotted surface."),
        makeQuestion("What information can shadows provide?", "Object height, shape, size and direction", ["Only the object's name", "The number of residents", "The age of every road"], 1, "Tall objects cast noticeable shadows, and shadow direction relates to the sun."),
        makeQuestion("What are constructed features?", "Features built or changed by people", ["Features formed only by nature", "Features seen only on maps", "Features hidden below ground"], 3, "Human activity produces them."),
        makeQuestion("Which is a constructed feature?", "A bridge", ["A natural forest", "A river", "A mountain"], 0, "People build it to cross an obstacle."),
        makeQuestion("Which is another constructed feature?", "A railway", ["A hill", "A natural tree", "A river"], 2, "It is an organised transport route."),
        makeQuestion("What are natural features?", "Features formed by nature", ["Features built by people", "Only map symbols", "Only city buildings"], 1, "Rivers, forests and mountains are examples."),
        makeQuestion("Which is a natural feature?", "A river", ["An airport", "A bridge", "A power line"], 3, "Nature forms this flowing water feature."),
        makeQuestion("What shapes do natural features usually have?", "Irregular or uneven shapes", ["Perfect rectangles only", "Repeated right angles only", "Identical straight edges"], 0, "Natural boundaries tend not to be perfectly organised."),
        makeQuestion("How do rivers normally appear in shape?", "They bend and twist", ["They always run in straight lines", "They form perfect squares", "They meet every road at right angles"], 2, "Their route is irregular."),
        makeQuestion("How does a natural forest usually appear?", "With uneven edges and a scattered pattern", ["With straight edges and regular rows", "As a smooth rectangular building", "As parallel railway tracks"], 1, "Compare it with a planted forest."),
        makeQuestion("How does clear water usually appear?", "Darker than muddy water", ["Lighter than all soil", "Identical to every road", "Bright white in every photograph"], 3, "Muddy water reflects more sunlight."),
        makeQuestion("Why can muddy water appear lighter?", "It reflects more sunlight", ["It is always shallower", "It contains buildings", "It has regular rows"], 0, "Reflection affects its shade."),
        makeQuestion("How does wet soil compare with dry sandy soil?", "Wet soil appears darker", ["Wet soil always appears white", "Dry soil is always invisible", "They always have identical shade"], 2, "Moisture changes the surface's tone."),
        makeQuestion("How do trees usually appear on aerial photographs?", "Relatively dark", ["Always white", "Transparent", "Like straight roads"], 1, "Vegetation absorbs and shades light."),
        makeQuestion("How can a planted forest be recognised?", "Straight edges and a regular pattern", ["Uneven edges and scattered trees", "A single twisting line", "Large factory roofs"], 3, "People plant trees systematically."),
        makeQuestion("How can a natural forest be recognised?", "Uneven edges and a scattered pattern", ["Perfect rows and straight boundaries", "Right-angle road junctions", "Rectangular industrial roofs"], 0, "Its arrangement is less organised."),
        makeQuestion("What usually produces a longer, obvious shadow?", "A tall building or tree", ["A flat field", "A thin road marking", "Young short plants only"], 2, "Height affects shadow length."),
        makeQuestion("Where does a shadow fall?", "Opposite the position of the sun", ["Towards the sun", "Always north", "Along every road"], 1, "Use the light source to infer direction."),
        makeQuestion("What texture do shrubs and trees often create?", "A dotted or rough appearance", ["A polished straight line", "A smooth geometric field", "A blank white area"], 3, "Vegetation crowns create uneven texture."),
        makeQuestion("How may dense vegetation differ from sparse vegetation?", "Dense vegetation may appear darker", ["It always appears lighter", "It has no texture", "It appears as a railway"], 0, "Denser plant cover produces a darker tone."),
        makeQuestion("What shapes do constructed features often have?", "Straight edges and regular shapes", ["Only winding lines", "Only uneven boundaries", "No organised pattern"], 2, "Human design often creates geometry."),
        makeQuestion("How can main roads usually be recognised?", "They are fairly straight with relatively few sharp bends", ["They always twist like rivers", "They join only gradually", "They have planted trees in rows"], 1, "Road vehicles can negotiate sharper junctions than trains."),
        makeQuestion("How do secondary roads compare with main roads?", "They are generally narrower and may have more curves", ["They are always wider", "They never bend", "They are railway tracks"], 3, "They carry less traffic and follow local routes."),
        makeQuestion("How do roads often meet other roads?", "At right angles", ["Only in circles", "Only gradually", "Without touching"], 0, "Road junctions may make sharp turns."),
        makeQuestion("How do railway lines usually join?", "More gradually than roads", ["At sharper right angles", "Without curves", "Only at airports"], 2, "Trains cannot turn sharply."),
        makeQuestion("How are agricultural fields commonly arranged?", "In regular geometric patterns", ["Only as winding lines", "In random mountain shapes", "Without boundaries"], 1, "Cultivation divides land into organised plots."),
        makeQuestion("Why may different fields show different colours and shades?", "Crops and stages of growth differ", ["Every field has different rainfall daily", "Roads cross all of them", "Maps change their colour"], 3, "Plant type and maturity affect appearance."),
        makeQuestion("How do fields with tall plants compare with young-plant fields?", "They generally appear darker", ["They always appear lighter", "They have no texture", "They look like water"], 0, "Taller vegetation creates a darker tone."),
        makeQuestion("What texture does cultivated land often have?", "Fine and smooth", ["Very rough and dotted", "Jagged like mountains", "Hidden by buildings"], 2, "Regular cultivation produces an even surface."),
        makeQuestion("What is a map?", "A simplified and accurate representation of land", ["A photograph taken from a drone", "An angled photograph", "A shadow measurement"], 1, "It represents reality using a conventional system."),
        makeQuestion("What do maps use to represent information?", "Symbols, words, colours and numbers", ["Only photographs", "Only spoken directions", "Only shadows"], 3, "These conventional elements simplify the landscape."),
        makeQuestion("Why compare a photograph and map of the same area?", "To locate and identify features more accurately", ["To remove all symbols", "To hide land use", "To make roads less visible"], 0, "Each representation supplies different clues."),
        makeQuestion("Which aerial pattern may indicate a CBD?", "Dense buildings and busy roads", ["Scattered trees only", "Regular crop fields", "A winding river"], 2, "The business centre has concentrated development and traffic."),
        makeQuestion("Which aerial feature may indicate an industrial zone?", "Large factory buildings", ["Groups of small houses", "A natural forest", "A sports field"], 1, "Industrial structures occupy large sites."),
        makeQuestion("Which aerial pattern may indicate a residential area?", "Groups of houses", ["Oil tanks only", "A harbour only", "Dense natural vegetation"], 3, "Residential zones are dominated by housing."),
        makeQuestion("Which features may indicate transport functions?", "Large roads, railways or harbour facilities", ["Only shrubs", "Only crop fields", "Only mountain shadows"], 0, "They move people and goods."),
        makeQuestion("Which features may indicate recreational land use?", "Parks or sports grounds", ["Factory roofs", "Railway junctions", "Cultivated fields"], 2, "These spaces support leisure and sport."),
        makeQuestion("What is the best method for identifying urban land use from above?", "Use several clues together", ["Rely on one feature only", "Ignore roads and buildings", "Use colour alone"], 1, "Combined evidence is more reliable."),
    ];

    const definitions = [
        { q: "Aerial photograph", a: "A photograph of the land taken from an aeroplane or drone." },
        { q: "Vertical aerial photograph", a: "An aerial photograph taken with the camera pointing directly down towards the ground." },
        { q: "Oblique aerial photograph", a: "An aerial photograph taken with the camera pointing at the ground at an angle." },
        { q: "Vertical", a: "Straight up or down at a right angle to the horizon." },
        { q: "Oblique", a: "Sloping or positioned at an angle." },
        { q: "Parallel", a: "Remaining the same distance apart as two lines or surfaces continue." },
        { q: "Interpretation", a: "The careful use of visible clues to identify and understand features on an aerial photograph." },
        { q: "Shape", a: "The outline or form of a feature." },
        { q: "Pattern", a: "The organised, repeated or scattered arrangement of features." },
        { q: "Colour and shade", a: "The lightness, darkness or visible colour of a feature." },
        { q: "Texture", a: "The smooth, rough or dotted appearance of a surface." },
        { q: "Shadow", a: "A dark area created when an object blocks light, giving clues about height, size, shape and direction." },
        { q: "Natural feature", a: "A landscape feature formed by nature." },
        { q: "Constructed feature", a: "A feature built or changed by people." },
        { q: "Planted forest", a: "A forest planted systematically, often showing straight edges and a regular pattern." },
        { q: "Natural forest", a: "A naturally formed forest with uneven edges and a scattered pattern." },
        { q: "Main road", a: "A relatively wide road that is usually fairly straight with few sharp bends." },
        { q: "Secondary road", a: "A generally narrower road that may have more curves than a main road." },
        { q: "Cultivated land", a: "Land prepared and used to grow crops, often appearing fine, smooth and geometrically patterned." },
        { q: "Map", a: "A simplified and accurate representation of land using symbols, words, colours and numbers." },
    ];

    const terms = [
        { q: "Photograph of land captured from an aeroplane or drone.", a: "Aerial photograph" },
        { q: "Camera view pointing directly downward.", a: "Vertical aerial photograph" },
        { q: "Camera view pointing at the ground at an angle.", a: "Oblique aerial photograph" },
        { q: "Direction meaning straight up or down.", a: "Vertical" },
        { q: "Direction meaning sloping or angled.", a: "Oblique" },
        { q: "Relationship in which surfaces stay the same distance apart.", a: "Parallel" },
        { q: "Map-like aerial view that shows layout clearly.", a: "Vertical photograph" },
        { q: "Aerial view showing both tops and sides of features.", a: "Oblique photograph" },
        { q: "Clue based on regular or irregular outlines.", a: "Shape" },
        { q: "Clue based on organised or scattered arrangements.", a: "Pattern" },
        { q: "Clue based on light or dark appearance.", a: "Colour and shade" },
        { q: "Clue based on smooth, rough or dotted appearance.", a: "Texture" },
        { q: "Clue revealing height, size, shape and direction.", a: "Shadow" },
        { q: "Feature such as a river, forest, hill or mountain.", a: "Natural feature" },
        { q: "Feature such as a building, road, bridge or airport.", a: "Constructed feature" },
        { q: "Forest with straight edges and systematic rows.", a: "Planted forest" },
        { q: "Forest with uneven edges and scattered growth.", a: "Natural forest" },
        { q: "Transport routes that often meet at right angles.", a: "Roads" },
        { q: "Transport lines that join gradually because vehicles cannot turn sharply.", a: "Railways" },
        { q: "Simplified representation using symbols, words, colours and numbers.", a: "Map" },
    ];

    const trueFalse = [
        { q: "Aerial photographs show the land from above.", options: ["True", "False"], a: "True", exp: "They reveal the position and pattern of surface features." },
        { q: "An aerial photograph can be taken from an aeroplane or drone.", options: ["True", "False"], a: "True", exp: "Both platforms can carry the camera above the land." },
        { q: "A vertical aerial photograph is taken at an angle.", options: ["True", "False"], a: "False", exp: "Its camera points directly downward." },
        { q: "Vertical aerial photographs provide a map-like view.", options: ["True", "False"], a: "True", exp: "They clearly show layouts and patterns." },
        { q: "An oblique photograph shows only the tops of features.", options: ["True", "False"], a: "False", exp: "It shows features partly from above and partly from the side." },
        { q: "Objects can be hidden behind other features on an oblique photograph.", options: ["True", "False"], a: "True", exp: "The angled line of sight can cause blocking." },
        { q: "Shape, pattern, shade, texture and shadow are interpretation clues.", options: ["True", "False"], a: "True", exp: "Geographers combine these clues to recognise features." },
        { q: "Constructed features are formed entirely by nature.", options: ["True", "False"], a: "False", exp: "They are built or changed by people." },
        { q: "Natural features usually have irregular shapes.", options: ["True", "False"], a: "True", exp: "Rivers and natural forests often have uneven outlines." },
        { q: "Rivers normally form perfectly straight lines.", options: ["True", "False"], a: "False", exp: "They usually bend and twist." },
        { q: "Clear water often appears darker than muddy water.", options: ["True", "False"], a: "True", exp: "Muddy water reflects more sunlight and can look lighter." },
        { q: "Wet soil appears lighter than dry sandy soil.", options: ["True", "False"], a: "False", exp: "Wet soil generally appears darker." },
        { q: "Planted forests often show straight edges and regular patterns.", options: ["True", "False"], a: "True", exp: "The trees were planted systematically." },
        { q: "A shadow falls opposite the position of the sun.", options: ["True", "False"], a: "True", exp: "This relationship helps determine direction." },
        { q: "Dense vegetation may appear darker than sparse vegetation.", options: ["True", "False"], a: "True", exp: "Plant density affects tone and texture." },
        { q: "Constructed features often have straight edges and regular shapes.", options: ["True", "False"], a: "True", exp: "Human design creates organised patterns." },
        { q: "Railways commonly join at sharper angles than roads.", options: ["True", "False"], a: "False", exp: "Railways join gradually because trains cannot turn sharply." },
        { q: "Agricultural fields often form regular geometric patterns.", options: ["True", "False"], a: "True", exp: "Cultivation divides land into organised plots." },
        { q: "Maps use symbols, words, colours and numbers.", options: ["True", "False"], a: "True", exp: "They simplify and accurately represent the land." },
        { q: "Urban land use should be identified using only one clue.", options: ["True", "False"], a: "False", exp: "Several clues should be combined for a reliable interpretation." },
    ];

    const toSpinQuestion = ({ q, options, a }) => ({ q, options, a: options[a], exp: options[a] + "." });

    const jeopardy = [
        { name: "Types and Camera Angles", questions: [
            { points: 10, q: "Define an aerial photograph.", a: "A photograph of land taken from an aeroplane or drone." },
            { points: 20, q: "Name the two main aerial photograph types.", a: "Vertical and oblique aerial photographs." },
            { points: 30, q: "Describe the camera position for a vertical photograph.", a: "It points directly down and is fixed underneath the aeroplane, parallel to the ground." },
            { points: 40, q: "Describe the view in an oblique photograph.", a: "The camera points at an angle, showing features partly from above and partly from the side." },
            { points: 50, q: "Compare one advantage and one limitation of vertical and oblique photographs.", a: "Vertical views clearly show layouts and patterns; oblique views show familiar height and shape, but features may block one another." },
        ]},
        { name: "Natural Features and Clues", questions: [
            { points: 10, q: "Name five main aerial photograph interpretation clues.", a: "Shape, pattern, colour or shade, texture and shadow." },
            { points: 20, q: "How can a river be recognised from above?", a: "It usually bends and twists and water often appears dark." },
            { points: 30, q: "Why can muddy water appear lighter than clear water?", a: "Muddy water reflects more sunlight." },
            { points: 40, q: "Differentiate between planted and natural forests.", a: "Planted forests have straight edges and regular patterns; natural forests have uneven edges and scattered patterns." },
            { points: 50, q: "What four kinds of information can shadows provide?", a: "The height, shape and size of objects, as well as direction because shadows fall opposite the sun." },
        ]},
        { name: "Constructed Features", questions: [
            { points: 10, q: "Give four examples of constructed features.", a: "Any four of buildings, roads, railways, farms, mines, bridges, airports, harbours and power lines." },
            { points: 20, q: "How do constructed features generally differ in shape from natural features?", a: "They more often have straight edges, regular shapes and organised patterns." },
            { points: 30, q: "How can main and secondary roads be distinguished?", a: "Main roads are fairly straight and wider with few sharp bends; secondary roads are narrower and may curve more." },
            { points: 40, q: "Why do railways join more gradually than roads?", a: "Trains cannot turn sharply, whereas roads may meet at right angles." },
            { points: 50, q: "How can agricultural fields be recognised from above?", a: "They form regular geometric patterns, vary in colour with crops and growth, and often have a fine, smooth texture." },
        ]},
        { name: "Maps and Urban Land Use", questions: [
            { points: 10, q: "What is a map?", a: "A simplified and accurate representation of land." },
            { points: 20, q: "What four elements do maps use to represent information?", a: "Symbols, words, colours and numbers." },
            { points: 30, q: "Why compare an aerial photograph with a map of the same place?", a: "Together they help locate and identify features more accurately." },
            { points: 40, q: "Give one aerial clue for a CBD, industrial zone, residential area and recreational area.", a: "CBD: dense buildings/busy roads; industrial: large factories; residential: groups of houses; recreation: parks or sports grounds." },
            { points: 50, q: "Explain the best method for identifying urban land-use zones from above.", a: "Combine several clues from buildings, roads, open spaces, patterns, shade and texture instead of relying on one feature." },
        ]},
    ];

    const matchingPairs = {
        topic1: [
            ["Aerial Photograph", "Land photograph taken from an aeroplane or drone."], ["Vertical Photograph", "Camera points directly down."], ["Oblique Photograph", "Camera points at the ground at an angle."], ["Vertical", "Straight up or down."], ["Oblique", "Sloping or angled."], ["Parallel", "Same distance apart along the length."], ["Map-Like View", "View produced by a vertical photograph."], ["Side Detail", "Height and shape visible in an oblique view."], ["Blocked Feature", "Object hidden behind another in an angled view."], ["Geographical Interpretation", "Careful reading of visible landscape clues."],
        ],
        topic2: [
            ["Shape", "Outline or form of a feature."], ["Pattern", "Organised or scattered arrangement."], ["Shade", "Light or dark appearance."], ["Texture", "Smooth, rough or dotted appearance."], ["Shadow", "Clue to height, size, shape and direction."], ["River", "Natural feature that bends and twists."], ["Clear Water", "Usually appears darker than muddy water."], ["Wet Soil", "Appears darker than dry sandy soil."], ["Planted Forest", "Straight edges and a regular pattern."], ["Natural Forest", "Uneven edges and a scattered pattern."],
        ],
        topic3: [
            ["Constructed Feature", "Feature built or changed by people."], ["Natural Feature", "Feature formed by nature."], ["Main Road", "Fairly straight route with few sharp bends."], ["Secondary Road", "Narrower route that may curve more."], ["Road Junction", "Routes may meet at right angles."], ["Railway Junction", "Lines join gradually."], ["Agricultural Field", "Regular geometric cultivated area."], ["Tall Crops", "Generally make a field appear darker."], ["Cultivated Texture", "Fine and smooth appearance."], ["Regular Pattern", "Organised arrangement often made by people."],
        ],
        topic4: [
            ["Map", "Simplified accurate representation of land."], ["Map Symbols", "Conventional signs representing features."], ["CBD Clue", "Dense buildings and busy roads."], ["Industrial Clue", "Large factory buildings."], ["Residential Clue", "Groups of houses."], ["Transport Clue", "Large roads, railways or harbour facilities."], ["Recreation Clue", "Parks or sports grounds."], ["Photograph", "Shows land as it appears from above."], ["Several Clues", "Best basis for identifying a land-use zone."], ["Comparison", "Using a map and photograph to locate features accurately."],
        ],
    };

    const makeCards = (pairs) => pairs.flatMap(([left, right], index) => [
        { id: index + 1, text: left },
        { id: index + 1, text: right },
    ]);

    const drag = {
        unit1: matchingPairs.topic1.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit2: matchingPairs.topic2.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit3: matchingPairs.topic3.slice(0, 8).map(([item, match]) => ({ item, match })),
        unit4: matchingPairs.topic4.slice(0, 8).map(([item, match]) => ({ item, match })),
    };

    window.AerialPhotographsData = {
        spin: {
            definitions,
            terms,
            multipleChoice: [0, 3, 4, 5, 9, 12, 14, 16, 17, 19, 22, 24, 27, 30, 32, 35, 39, 46, 49, 62].map((index) => toSpinQuestion(quizPool[index])),
            trueFalse,
        },
        jeopardy,
        match: Object.fromEntries(Object.entries(matchingPairs).map(([key, pairs]) => [key, makeCards(pairs)])),
        millionaire: quizPool.slice(0, 30),
        snake: {
            game1: quizPool.slice(0, 10),
            game2: quizPool.slice(10, 20),
            game3: quizPool.slice(20, 30),
            game4: quizPool.slice(30, 40),
        },
        drag,
    };
})();
