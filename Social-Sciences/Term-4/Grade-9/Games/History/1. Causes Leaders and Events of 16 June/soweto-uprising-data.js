/* Grade 9 Social Sciences History, Term 4, Week 1: the Soweto uprising and resistance.
 * Based on the supplied Week 1 lesson, including its later repression and reform sections.
 * Student action committees preceded the later SSRC; disputed casualty ages/order are not tested.
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Black Consciousness', 'A movement encouraging black pride, self-confidence and resistance to racial oppression.'],
        ['Bantu Education', 'The apartheid system of unequal schooling imposed on black South Africans.'],
        ['Medium of instruction', 'The language used to teach school subjects.'],
        ['Tsietsi Mashinini', 'The Morris Isaacson student leader who helped organise the peaceful protest of 16 June 1976.'],
        ['SSRC', 'The Soweto Students Representative Council that coordinated student resistance after the June uprising began.'],
        ['Soweto uprising', 'The student protest beginning on 16 June 1976 that developed into wider resistance after police opened fire.'],
        ['Sam Nzima', 'The photographer who captured the famous image of the wounded Hector Pieterson being carried.'],
        ['Iconic image', 'A widely recognised picture that symbolises a much larger event or struggle.'],
        ['Hector Pieterson', 'The schoolboy whose image became a symbol of the students killed during the Soweto uprising.'],
        ['Exile', 'Living outside one’s country because remaining there is unsafe or because of political persecution.'],
        ['Repression', 'The use of state force and restrictions to suppress opposition.'],
        ['Detention without trial', 'Holding a person in custody without taking them to court for a trial.'],
        ['Banning', 'Officially prohibiting an organisation, publication or activity.'],
        ['State of Emergency', 'A special period in which the government gives the security forces expanded powers.'],
        ['Martyr', 'A person whose death becomes a powerful symbol of the cause they supported.'],
        ['Gradual reform', 'Limited changes introduced step by step without immediately removing an entire political system.'],
        ['Bantustan', 'A homeland created under apartheid to assign separate citizenship to black South Africans.'],
        ['Tricameral Parliament', 'The three-chamber parliament for White, Coloured and Indian representatives that excluded black Africans.'],
        ['Trade union', 'An organisation that represents workers and campaigns for their workplace rights.'],
        ['UDF', 'The United Democratic Front, a non-racial alliance of organisations opposing apartheid.']
    ];

    function mc(q, right, wrong1, wrong2, wrong3) {
        const options = [right, wrong1, wrong2, wrong3];
        const shift = mc.count++ % 4;
        for (let i = 0; i < shift; i++) options.push(options.shift());
        return {
            q,
            options: options.map((choice, i) => String.fromCharCode(65 + i) + ') ' + choice),
            a: String.fromCharCode(65 + options.indexOf(right)) + ') ' + right
        };
    }
    mc.count = 0;

    const multipleChoice = [
        mc('Which language policy did the Soweto students protest against in June 1976?', 'Compulsory use of Afrikaans to teach certain subjects', 'Permission to choose any teaching language', 'The removal of all school examinations', 'Compulsory university education for every learner'),
        mc('How did Steve Biko influence many student leaders?', 'His Black Consciousness ideas encouraged pride and resistance', 'He introduced the Afrikaans teaching directive', 'He commanded the police in Moema Street', 'He created the Tricameral Parliament'),
        mc('At which school was Tsietsi Mashinini a learner?', 'Morris Isaacson High School', 'Orlando Donaldson Community Hall', 'The Tricameral Parliament', 'A university in Conakry'),
        mc('What did the student meeting of 13 June 1976 help to organise?', 'A peaceful protest against the Afrikaans teaching policy', 'A celebration of Bantu Education', 'An election for the Tricameral Parliament', 'A campaign to end all schooling'),
        mc('What does SSRC stand for?', 'Soweto Students Representative Council', 'South African Security Reform Committee', 'Soweto School Reform Cabinet', 'Southern Students Railway Council'),
        mc('On which date did the Soweto student uprising begin?', '16 June 1976', '13 June 1990', '16 December 1983', '27 April 1994'),
        mc('What happened when police intercepted the student march?', 'Police opened fire on the students', 'All students were admitted to Parliament', 'The Afrikaans policy ended peacefully that morning', 'The march moved straight to Botswana'),
        mc('Who took the famous photograph of Hector Pieterson being carried?', 'Sam Nzima', 'Steve Biko', 'Tsietsi Mashinini', 'Abram Onkgopotse Tiro'),
        mc('Why did the photograph of Hector Pieterson become iconic?', 'It came to symbolise the wider struggle and the suffering of students', 'It announced the opening of a new school', 'It showed the signing of a peace treaty', 'It proved that nobody had been hurt'),
        mc('How did resistance develop after the Soweto uprising?', 'Protests spread to many other townships', 'It remained limited to a single classroom', 'It immediately ended all apartheid laws', 'It stopped every political organisation from resisting'),
        mc('What is detention without trial?', 'Holding someone in custody without a court trial', 'Releasing someone after a court hearing', 'Allowing someone to vote without registering', 'Employing someone without an interview'),
        mc('What happened to Steve Biko in 1977?', 'He died after being tortured in police custody', 'He became the president of the Tricameral Parliament', 'He led the 16 June march that year', 'He was elected to a Bantustan government'),
        mc('Why did many young people go into exile after the uprising?', 'To escape persecution and continue resistance abroad', 'To join the White chamber of Parliament', 'To support compulsory Afrikaans instruction', 'To abandon all political activity permanently'),
        mc('Which organisation’s armed wing was Umkhonto we Sizwe?', 'ANC', 'UDF', 'SSRC', 'Tricameral Parliament'),
        mc('What did a State of Emergency allow the government to do?', 'Give security forces wider powers to suppress unrest', 'Guarantee equal voting rights for all adults', 'Replace every police officer with a teacher', 'End detention and all political restrictions'),
        mc('How many chambers did the Tricameral Parliament have?', 'Three', 'One', 'Two', 'Four'),
        mc('Which group was excluded from the Tricameral Parliament?', 'Black Africans', 'White South Africans', 'Coloured South Africans', 'Indian South Africans'),
        mc('Why were the government’s limited reforms insufficient?', 'They left important apartheid inequalities and exclusions in place', 'They gave everyone equal power immediately', 'They abolished every Bantustan', 'They allowed no changes at all'),
        mc('Which alliance opposed apartheid and the Tricameral system?', 'United Democratic Front', 'Soweto Students Representative Council’s school debating club', 'The three parliamentary chambers', 'The apartheid security police'),
        mc('What change affected African trade unions during the reform period?', 'They gained legal recognition and some rights', 'They became a fourth parliamentary chamber', 'They were turned into Bantustans', 'They took control of every school')
    ];

    const extraChoice = [
        mc('Which teacher influenced Mashinini’s political thinking?', 'Abram Onkgopotse Tiro', 'Sam Nzima', 'Hector Pieterson', 'Hastings Ndlovu'),
        mc('Where did about 500 students meet on 13 June 1976?', 'Orlando Donaldson Community Hall', 'The Tricameral Parliament', 'A police station in Conakry', 'A Bantustan cabinet office'),
        mc('Which activity helped Mashinini develop his speaking skills at school?', 'Chairing the debating team', 'Taking press photographs', 'Running a parliamentary chamber', 'Commanding security forces'),
        mc('What was the intended character of the 16 June student protest?', 'Peaceful', 'A military invasion of another country', 'A campaign supporting apartheid schooling', 'A celebration of police powers'),
        mc('Why was compulsory Afrikaans instruction linked to a broader struggle?', 'It formed part of resentment against unequal apartheid education', 'It guaranteed identical opportunities for all learners', 'It ended racial classification in schools', 'It gave students representation in Parliament'),
        mc('In which street did police intercept the Soweto student march?', 'Moema Street', 'A street in Conakry', 'A road in Botswana', 'A street outside the Tricameral Parliament'),
        mc('Which pair of pupils is associated with the deaths during the Soweto uprising?', 'Hector Pieterson and Hastings Ndlovu', 'Tsietsi Mashinini and Sam Nzima', 'Steve Biko and Abram Tiro', 'Sam Nzima and Steve Biko'),
        mc('To which neighbouring country did Mashinini first flee?', 'Botswana', 'Guinea', 'Britain', 'India'),
        mc('In which city did Mashinini die in exile in 1990?', 'Conakry in Guinea', 'Soweto in South Africa', 'Gaborone in Botswana', 'London in Britain'),
        mc('Why was 16 June a turning point in resistance to apartheid?', 'It sparked wider youth resistance and drew attention to state violence', 'It completed the transition to democracy that day', 'It ended international interest in South Africa', 'It created the Tricameral Parliament immediately'),
        mc('What was the purpose of increased banning and detention powers?', 'To restrict opposition to the government', 'To guarantee freedom of political organisation', 'To give every detained person an immediate trial', 'To transfer power to the SSRC'),
        mc('Why did Steve Biko’s death cause international outrage?', 'It exposed the brutality of detention and repression', 'It showed that apartheid had already ended', 'It proved the Tricameral system was equal', 'It had no connection to political conditions'),
        mc('What does describing Biko as a martyr mean?', 'His death became a symbol of resistance to oppression', 'He created a new homeland', 'He took the photograph of Hector Pieterson', 'He headed a parliamentary chamber'),
        mc('Which liberation movement’s armed wing was APLA?', 'PAC', 'ANC', 'UDF', 'SSRC'),
        mc('How did army patrols and harsh repression affect many township residents?', 'They deepened anger and resistance', 'They guaranteed equal representation in Parliament', 'They removed all restrictions on organisations', 'They brought the June 1976 protest to a peaceful end before it began'),
        mc('Which three historical racial categories had chambers in the Tricameral Parliament?', 'White, Coloured and Indian', 'White, Indian and black African', 'Coloured, Indian and black African', 'White, Coloured and black African'),
        mc('Which chamber dominated the Tricameral Parliament?', 'The White chamber', 'The Indian chamber', 'The Coloured chamber', 'A black African chamber'),
        mc('How did Bantustan citizenship support apartheid’s exclusion of black South Africans?', 'It assigned them to separate homelands instead of equal national political rights', 'It gave them equal control of all three parliamentary chambers', 'It abolished racial classification', 'It guaranteed national voting rights to every adult'),
        mc('What did the UDF slogan “All rights here and now” demand?', 'Equal rights without being postponed or restricted to homelands', 'More powers to detain people without trial', 'A separate chamber for every school', 'The continuation of compulsory Afrikaans teaching'),
        mc('Why did the government encourage a more prosperous black middle class?', 'It hoped to gain loyalty and reduce resentment against the system', 'It planned to give the SSRC complete control of the country', 'It intended to end all business activity', 'It wanted trade unions to replace the police')
    ];

    const trueFalseFacts = [
        ['Compulsory Afrikaans instruction was a major grievance of the June 1976 students.', true, 'Students protested the Afrikaans teaching policy within the unequal Bantu Education system.'],
        ['Steve Biko personally led the Soweto march on 16 June 1976.', false, 'Biko’s ideas influenced students, but he did not personally lead that march.'],
        ['Tsietsi Mashinini was a learner at Morris Isaacson High School.', true, 'Mashinini became a leading student organiser while at Morris Isaacson.'],
        ['The meeting on 13 June was intended to organise support for Bantu Education.', false, 'The students organised opposition to the Afrikaans teaching policy and unequal education.'],
        ['The planned student protest on 16 June was peaceful.', true, 'The students planned a peaceful march before police opened fire.'],
        ['Sam Nzima was the student who organised the June 13 meeting.', false, 'Nzima was the photographer associated with the famous Hector Pieterson image.'],
        ['Hector Pieterson’s photograph became a symbol of the wider struggle.', true, 'The image drew attention to the suffering of students and apartheid violence.'],
        ['Resistance after the uprising stayed inside one Soweto classroom.', false, 'Protests spread to many townships over the following months.'],
        ['Mashinini left South Africa and lived in exile.', true, 'He fled to Botswana and later lived abroad.'],
        ['Exile means being held in custody without a trial.', false, 'Exile means living outside one’s country; detention without trial means being held without a court trial.'],
        ['Repression: state force and restrictions used to suppress opposition.', true, 'Repression includes measures such as banning, detention and force against opponents.'],
        ['Detention without trial guarantees a court trial before anyone is held.', false, 'It allows a person to be held without being taken to court for a trial.'],
        ['Steve Biko died in police custody in 1977.', true, 'His death following torture caused outrage in South Africa and abroad.'],
        ['Umkhonto we Sizwe was the armed wing of the PAC.', false, 'Umkhonto we Sizwe was the ANC’s armed wing; APLA was associated with the PAC.'],
        ['A State of Emergency expanded the powers of security forces.', true, 'The government used these additional powers to suppress opposition.'],
        ['The Tricameral Parliament provided equal representation for black Africans.', false, 'Black Africans were excluded from its three chambers.'],
        ['The White chamber dominated the Tricameral Parliament.', true, 'The system retained White political dominance despite the limited reforms.'],
        ['African trade unions became a fourth chamber of Parliament.', false, 'Trade unions gained legal recognition and some rights; they were not parliamentary chambers.'],
        ['The UDF brought different organisations together in a non-racial alliance.', true, 'The United Democratic Front opposed apartheid and the Tricameral system.'],
        ['The government’s gradual reforms immediately abolished apartheid.', false, 'The limited changes left apartheid’s central inequalities and exclusions in place.']
    ];

    const spin = {
        definitions: concepts.map(([q, a]) => ({ q, a })),
        terms: concepts.map(([a, q]) => ({ q, a })),
        multipleChoice,
        trueFalse: trueFalseFacts.map(([q, truth, exp]) => ({ q, options: ['True', 'False'], a: truth ? 'True' : 'False', exp }))
    };
    const allChoice = multipleChoice.concat(extraChoice);
    const allSnake = allChoice.map(item => ({
        q: item.q, options: item.options.map(option => option.slice(3)), a: item.options.indexOf(item.a)
    }));
    const snake = Object.fromEntries([1, 2, 3, 4].map((number, index) => ['game' + number, allSnake.slice(index * 10, index * 10 + 10)]));

    const factPairs = [
        ['Steve Biko', 'Black Consciousness leader whose ideas inspired students'],
        ['Abram Onkgopotse Tiro', 'Teacher who influenced Mashinini’s political thinking'],
        ['Morris Isaacson High School', 'School attended by Mashinini'],
        ['Orlando Donaldson Community Hall', 'Venue of the student planning meeting on 13 June'],
        ['13 June 1976', 'Date of the meeting that planned the peaceful student protest'],
        ['16 June 1976', 'Date on which the student march and Soweto uprising began'],
        ['Moema Street', 'Street where police intercepted the student march'],
        ['Hastings Ndlovu', 'Pupil killed in the uprising, remembered alongside Hector Pieterson'],
        ['Botswana', 'Neighbouring country to which Mashinini first fled'],
        ['Conakry', 'City in Guinea where Mashinini died in exile'],
        ['1977', 'Year of Steve Biko’s death in police custody'],
        ['ANC', 'Liberation movement associated with Umkhonto we Sizwe'],
        ['Umkhonto we Sizwe', 'Armed wing of the African National Congress'],
        ['PAC', 'Liberation movement associated with APLA'],
        ['APLA', 'Armed wing of the Pan Africanist Congress'],
        ['White chamber', 'Dominant chamber in the Tricameral Parliament'],
        ['Black African exclusion', 'Absence of black African representation in the three-chamber parliament'],
        ['All rights here and now', 'UDF slogan demanding rights without delay'],
        ['Non-racial alliance', 'Cooperation across racial divisions in opposition to apartheid'],
        ['Black middle-class opportunities', 'Limited business reforms intended to gain loyalty and reduce resentment']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => ['topic' + (index + 1),
        pairs.flatMap(([term, meaning], id) => [{ id: id + 1, text: term }, { id: id + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => ['unit' + (index + 1),
        concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [5, 7, 2, 0, 15, 10, 4, 20, 21, 9, 31, 16, 33, 37, 39];
    const hints = [
        'Remember the date now associated with Youth Day.',
        'Think of the photographer, not the student leaders.',
        'The community hall was a meeting venue, not his school.',
        'The objection concerned a compulsory teaching language.',
        'The prefix “tri” indicates the number.',
        'The expression describes custody without a court process.',
        'This was a council representing Soweto students.',
        'Mashinini was influenced by a teacher with the surname Tiro.',
        'The meeting took place at a community hall in Orlando.',
        'Think beyond Soweto to what happened in other townships.',
        'Consider what Biko’s treatment revealed about detention.',
        'There was no chamber for the majority black African population.',
        'Do not confuse APLA with the ANC’s Umkhonto we Sizwe.',
        'Separate homeland citizenship did not mean equal national rights.',
        'The government hoped limited economic opportunities would build support.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['Which compulsory teaching language helped trigger the June 1976 protest?', 'Afrikaans'],
        ['What apartheid schooling system did the students oppose?', 'Bantu Education'],
        ['What does “medium of instruction” mean?', 'The language used to teach school subjects'],
        ['Which student leader attended Morris Isaacson High School?', 'Tsietsi Mashinini'],
        ['Which school did Mashinini attend?', 'Morris Isaacson High School'],
        ['Which teacher influenced Mashinini’s political thinking?', 'Abram Onkgopotse Tiro'],
        ['Where did students meet to plan their protest on 13 June 1976?', 'Orlando Donaldson Community Hall'],
        ['What was the intended character of the planned 16 June march?', 'A peaceful protest'],
        ['Whose Black Consciousness ideas inspired many student leaders?', 'Steve Biko’s'],
        ['What does SSRC stand for?', 'Soweto Students Representative Council'],
        ['On which date did the Soweto uprising begin?', '16 June 1976'],
        ['In which street did police intercept the student march?', 'Moema Street'],
        ['How did police respond when they intercepted the march?', 'They opened fire on the students'],
        ['Who took the famous photograph of Hector Pieterson being carried?', 'Sam Nzima'],
        ['Name the pupil whose famous photograph became a symbol of the uprising.', 'Hector Pieterson'],
        ['Name another pupil killed in the uprising who is remembered alongside Hector Pieterson.', 'Hastings Ndlovu'],
        ['Why is the Hector Pieterson photograph described as iconic?', 'It symbolises the wider struggle and the suffering of students'],
        ['Where did protests spread after the Soweto uprising?', 'To many other townships'],
        ['To which neighbouring country did Mashinini first flee?', 'Botswana'],
        ['In which city in Guinea did Mashinini die in 1990?', 'Conakry'],
        ['What does political exile mean?', 'Living outside one’s country because of danger or political persecution'],
        ['What is government repression?', 'State force and restrictions used to suppress opposition'],
        ['What does detention without trial mean?', 'Holding someone in custody without a court trial'],
        ['What does it mean when an organisation is banned?', 'Its activities are officially prohibited'],
        ['What happened to Steve Biko while in police custody in 1977?', 'He died after being tortured'],
        ['Why did Biko’s death cause international outrage?', 'It exposed the brutality of state repression and detention'],
        ['Why is Biko remembered as a martyr?', 'His death became a symbol of the cause of resistance'],
        ['Which movement’s armed wing was Umkhonto we Sizwe?', 'The ANC'],
        ['Which movement’s armed wing was APLA?', 'The PAC'],
        ['What powers did a State of Emergency expand?', 'The powers of the police and other security forces'],
        ['How did harsh repression affect many township residents?', 'It deepened anger and resistance'],
        ['What did the government hope its limited reforms would reduce?', 'Resentment and unrest against apartheid'],
        ['What was a Bantustan?', 'An apartheid homeland assigning separate citizenship to black South Africans'],
        ['How many chambers did the Tricameral Parliament have?', 'Three'],
        ['Which historical racial categories had Tricameral parliamentary chambers?', 'White, Coloured and Indian'],
        ['Which group was excluded from the Tricameral Parliament?', 'Black Africans'],
        ['Which chamber dominated the Tricameral Parliament?', 'The White chamber'],
        ['What new status did African trade unions gain during the reforms?', 'Legal recognition and some rights'],
        ['What does UDF stand for?', 'United Democratic Front'],
        ['What did the UDF slogan “All rights here and now” demand?', 'Equal rights without delay or restriction to homelands']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));

    global.SowetoWeek1 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
