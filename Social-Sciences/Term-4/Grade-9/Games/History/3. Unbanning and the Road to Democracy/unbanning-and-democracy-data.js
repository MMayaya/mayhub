/* Grade 9 Social Sciences History, Term 4, Week 3: unbanning and the road to democracy.
 * Based on the supplied Week 3 lesson, including its ballot-paper and voting photographs.
 * Corrected lesson typo: unbanning was announced on 2 February 1990, not in 1989.
 * Date check: https://www.sanews.gov.za/south-africa/sa-marks-24th-anniversary-mandela-prison-release
 * Mandela biography: https://www.gov.za/mandela100/biography
 * Violence is described without attributing responsibility to every member of a community or party.
 */
(function (global) {
    'use strict';

    const concepts = [
        ['Deadlock', 'A situation in which neither the government nor the resistance can defeat the other or make decisive progress.'],
        ['Civil war', 'An armed conflict between opposing groups within the same country.'],
        ['State of Emergency', 'A period when the government gives security forces extra powers to control unrest.'],
        ['Unbanning', 'Removing the legal prohibition that prevents a political organisation from operating openly.'],
        ['FW de Klerk', 'The president who announced the unbanning of the ANC, PAC and SACP in February 1990.'],
        ['Nelson Mandela', 'The anti-apartheid leader released in 1990 after 27 years in prison who helped guide the transition to democracy.'],
        ['Political prisoner', 'A person imprisoned because of political beliefs or activities.'],
        ['Censorship', 'Official restrictions on publishing or sharing information, including images.'],
        ['Reconciliation', 'Rebuilding peaceful relationships between people or groups divided by conflict.'],
        ['Political leadership', 'Guiding people and political organisations towards decisions and common goals.'],
        ['Negotiation', 'Discussion between opposing sides to reach an agreement.'],
        ['National Party', 'The governing party that negotiated with the ANC and other parties during the transition.'],
        ['Inkatha', 'The movement whose supporters were involved in conflict with ANC supporters during the negotiation period.'],
        ['Boipatong massacre', 'The June 1992 attack on residents in the Boipatong area that threatened the political negotiations.'],
        ['Distrust', 'A lack of confidence in the intentions or actions of another person or group.'],
        ['Election', 'A process in which voters choose political representatives.'],
        ['Democracy', 'A system in which people participate in government, including choosing representatives through elections.'],
        ['Parliament', 'The law-making body made up of political representatives.'],
        ['Ballot paper', 'The document on which a voter records a choice in an election.'],
        ['Voting rights', 'The right of eligible citizens to take part in choosing political representatives.']
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
        mc('Why was South Africa’s political conflict described as a deadlock in the late 1980s?', 'Neither the government nor the resistance could defeat the other', 'The resistance had already replaced the government', 'All parties had agreed to stop political activity', 'There was no conflict in the townships'),
        mc('What does unbanning a political movement allow it to do?', 'Operate openly and legally', 'Replace Parliament without an election', 'Ban every opposing organisation', 'Place all its members in detention'),
        mc('Who announced the unbanning of political organisations in February 1990?', 'FW de Klerk', 'PW Botha', 'Nelson Mandela', 'Tsietsi Mashinini'),
        mc('On which date was the unbanning of the ANC, PAC and SACP announced?', '2 February 1990', '11 February 1990', 'June 1992', 'April 1994'),
        mc('Which set of political organisations was unbanned in 1990?', 'ANC, PAC and SACP', 'Barclays, the Olympic committee and the USSR', 'Parliament, the Cabinet and the courts', 'Morris Isaacson, the SSRC and the UDF only'),
        mc('For approximately how long had Nelson Mandela been imprisoned before his release?', '27 years', '7 years', '17 years', '37 years'),
        mc('On which date was Mandela released from prison?', '11 February 1990', '2 February 1990', 'June 1992', 'April 1994'),
        mc('What restriction affected public images of Mandela during apartheid?', 'Publishing his photograph was restricted by banning and censorship', 'His photograph had to appear on every ballot paper', 'Only sports photographs were allowed', 'He was required to publish a daily newspaper'),
        mc('How did Mandela contribute to the transition described in the lesson?', 'He helped work towards a peaceful end to apartheid', 'He opposed every attempt to reach a political agreement', 'He introduced the ban on the ANC in 1990', 'He stopped the April 1994 election from taking place'),
        mc('What does the lesson highlight about Mandela’s leadership?', 'It inspired people in South Africa and around the world', 'It had no influence outside his prison', 'It was concerned only with sporting boycotts', 'It guaranteed that no violence occurred after 1990'),
        mc('Which governing party negotiated with the ANC and other parties from 1990 to 1994?', 'The National Party', 'The Soviet Communist Party', 'The British Olympic committee', 'Barclays Bank'),
        mc('How did widespread violence affect the political negotiations?', 'It created distrust and threatened to make the talks fail', 'It made agreement automatic', 'It ended all political differences peacefully', 'It had no effect on the talks'),
        mc('Between supporters of which two movements was there serious conflict during the negotiations?', 'Inkatha and the ANC', 'The USA and the USSR', 'Barclays and the National Party', 'The PAC and the Olympic committee'),
        mc('In which month and year did the Boipatong massacre take place?', 'June 1992', 'February 1990', 'April 1994', 'June 1976'),
        mc('According to the lesson, why did some groups linked to the government encourage violence?', 'To create distrust and disrupt the negotiations', 'To make all parties trust each other immediately', 'To organise a peaceful voter-registration campaign', 'To ensure that every political prisoner was released that day'),
        mc('What did the negotiating parties eventually agree to hold?', 'An election for a democratic parliament', 'A new ban on all political movements', 'A permanent State of Emergency instead of elections', 'An international sporting competition to choose a president'),
        mc('In which month and year was South Africa’s first democratic election held?', 'April 1994', 'February 1990', 'June 1992', 'April 1989'),
        mc('What is the purpose of a ballot paper?', 'To record a voter’s choice in an election', 'To announce a ban on a political party', 'To order a State of Emergency', 'To record only the number of political prisoners'),
        mc('Which action represents participation in a democratic election?', 'Choosing political representatives by voting', 'Using violence to prevent people from voting', 'Allowing only the governing party to choose representatives', 'Refusing all peaceful political discussion'),
        mc('Which sequence correctly describes the transition covered in the lesson?', 'Unbanning and Mandela’s release, negotiations, the 1994 election', 'The 1994 election, Mandela’s imprisonment, unbanning in 1989', 'The Boipatong massacre, the 1976 uprising, Mandela’s release in 1985', 'Mandela’s release, permanent prohibition of the ANC, no election')
    ];

    const extraChoice = [
        mc('Which situation suggests the danger of a civil war?', 'Armed political conflict between groups inside the same country', 'A peaceful election with different political parties', 'A foreign bank selling business assets', 'A university refusing an academic exchange'),
        mc('Why did the political deadlock create an incentive for negotiations?', 'Neither side could secure its aims by defeating the other', 'The government had already ended all resistance', 'The resistance no longer had any political goals', 'All parties had already elected a democratic parliament'),
        mc('How did unbanning help prepare the way for talks?', 'It allowed previously prohibited organisations to participate openly', 'It prevented political organisations from speaking in public', 'It automatically completed the democratic election', 'It required every party to stop operating'),
        mc('What does SACP stand for?', 'South African Communist Party', 'South African Cultural Parliament', 'Soweto African Council of Police', 'South African Coalition of Presidents'),
        mc('How did the late-1980s deadlock differ from a victory by the government?', 'The government had not crushed the resistance', 'The resistance had stopped opposing apartheid', 'There was no longer any State of Emergency', 'Every opponent had accepted apartheid'),
        mc('What changed for Mandela when he was released from prison?', 'He could take part openly in public political life', 'He became the leader of the National Party', 'He introduced a new ban on all photographs', 'He had already completed the 1994 election that day'),
        mc('A newspaper is prohibited from publishing a political leader’s photograph. What does this illustrate?', 'Censorship', 'A democratic election', 'Reconciliation', 'An international sports boycott'),
        mc('Which action best reflects the peaceful leadership highlighted in Mandela’s story?', 'Encouraging discussion between people divided by conflict', 'Encouraging attacks to end every negotiation', 'Preventing all opposing parties from speaking', 'Replacing every political disagreement with force'),
        mc('Why did Mandela’s release matter beyond simply leaving prison?', 'It enabled an important liberation leader to participate in the transition', 'It meant apartheid had ended completely before any negotiations', 'It made political parties unnecessary', 'It guaranteed that all South Africans already had a democratic vote in 1990'),
        mc('What is reconciliation in the context of a divided society?', 'Rebuilding peaceful relationships after conflict', 'Intensifying distrust between political groups', 'Prohibiting all political organisations', 'Choosing representatives without allowing voters a choice'),
        mc('What does negotiation require opposing political sides to do?', 'Discuss differences and work towards agreement', 'Agree that only violence can decide the future', 'Avoid speaking to each other under any circumstances', 'Cancel every possibility of compromise'),
        mc('Why could distrust make political talks more difficult?', 'Parties may doubt whether the other side will honour an agreement', 'Distrust guarantees that every promise will be kept', 'It immediately removes all disagreement', 'It makes an election unnecessary'),
        mc('Which event in 1992 is used in the lesson to illustrate violence threatening negotiations?', 'The Boipatong massacre', 'The unbanning announcement', 'Mandela’s release from prison', 'The first democratic election'),
        mc('How many people were killed at Boipatong, according to the lesson?', '45', '15', '27', '94'),
        mc('What does the continuation of talks despite violence show?', 'Parties kept working towards a political agreement despite serious obstacles', 'No violence had occurred during the transition', 'Every negotiation had ended permanently in 1990', 'The election had taken place before talks began'),
        mc('What is Parliament’s role in a democratic system?', 'It is the body of representatives that makes laws', 'It is a document on which a voter marks a choice', 'It is a prison for political leaders', 'It is an order banning opposition parties'),
        mc('What do voting rights enable eligible citizens to do?', 'Help choose political representatives', 'Choose a government only through force', 'Prevent every other citizen from voting', 'Replace ballot papers with detention orders'),
        mc('Why does a democratic ballot need to offer voters a genuine choice?', 'Voters should be able to select among political alternatives', 'The authorities must decide every voter’s answer beforehand', 'It should prevent voters from expressing preferences', 'It should contain only the number of prisoners released'),
        mc('What did the April 1994 election represent in the lesson’s account?', 'A major outcome of the negotiated transition towards democracy', 'The start of Mandela’s 27-year imprisonment', 'The event that caused the 1990 unbanning announcement', 'The replacement of all negotiations by a new ban'),
        mc('Why is it inaccurate to describe the whole 1990-to-1994 transition as free of conflict?', 'Violence and breakdowns threatened the talks even as negotiations continued', 'Every party agreed immediately without disagreement', 'There was no fighting between supporters of political movements', 'The Boipatong massacre happened only after the transition ended')
    ];

    const trueFalseFacts = [
        ['The late-1980s deadlock meant neither the government nor the resistance could defeat the other.', true, 'The government could not crush resistance, while the resistance could not overthrow it.'],
        ['Unbanning: permanently prohibiting a political organisation from operating.', false, 'Unbanning removes a prohibition and allows open political activity.'],
        ['FW de Klerk announced the unbanning of the ANC, PAC and SACP in February 1990.', true, 'The announcement was made on 2 February 1990.'],
        ['Mandela was released before the February 1990 unbanning announcement.', false, 'The announcement came on 2 February; Mandela was released on 11 February.'],
        ['Mandela had spent approximately 27 years in prison before his release.', true, 'His release followed nearly three decades of imprisonment.'],
        ['Publishing Mandela’s photograph was freely permitted throughout his imprisonment under apartheid.', false, 'Banning and censorship restricted publication of his image.'],
        ['Mandela’s leadership helped the movement towards a peaceful end to apartheid.', true, 'The lesson highlights his contribution to peaceful political change.'],
        ['Mandela’s release meant that the first democratic election had already happened in 1990.', false, 'The democratic election took place in April 1994, after negotiations.'],
        ['The National Party negotiated with the ANC and other political parties.', true, 'Several parties participated in the search for a political settlement.'],
        ['Political negotiations removed all violence immediately after 1990.', false, 'Violence continued and sometimes threatened or disrupted the talks.'],
        ['Conflict between Inkatha and ANC supporters was one danger during the negotiation period.', true, 'The lesson describes serious violence involving supporters of the two movements.'],
        ['The Boipatong massacre took place in April 1994.', false, 'It took place in June 1992.'],
        ['Distrust between parties could threaten a negotiated agreement.', true, 'Distrust made cooperation and confidence in the talks more difficult.'],
        ['The negotiating parties decided to cancel elections permanently.', false, 'They eventually agreed to an election for a democratic parliament.'],
        ['Talks continued despite serious violence and interruptions.', true, 'The parties kept working towards the agreement that led to the election.'],
        ['South Africa’s first democratic election took place in April 1990.', false, 'The first democratic election was held in April 1994.'],
        ['A ballot paper lets a voter record a political choice.', true, 'It is used to mark the voter’s choice in an election.'],
        ['Parliament is the container in which completed ballots are placed.', false, 'Parliament is a law-making body; a ballot box receives completed ballots.'],
        ['Democratic elections allow voters to help choose their representatives.', true, 'Choosing representatives is a key form of democratic participation.'],
        ['The 1994 election happened before Mandela’s release and the unbanning of political movements.', false, 'Unbanning and release came in 1990, followed by negotiations and the election in 1994.']
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
        ['2 February 1990', 'Date of de Klerk’s unbanning announcement'],
        ['ANC', 'African National Congress, one of the organisations unbanned in 1990'],
        ['SACP', 'South African Communist Party, unbanned alongside the ANC and PAC'],
        ['PAC', 'Pan Africanist Congress, included in the 1990 unbanning announcement'],
        ['Late 1980s', 'Period when the government and resistance reached the deadlock described in the lesson'],
        ['11 February 1990', 'Date on which Mandela was released from prison'],
        ['27 years', 'Approximate length of Mandela’s imprisonment'],
        ['Banned photographs', 'Images of Mandela that could not be freely published under apartheid'],
        ['Worldwide inspiration', 'Influence of Mandela’s leadership beyond South Africa'],
        ['Return to public politics', 'Opportunity for Mandela to take part openly in political life after release'],
        ['1990 to 1994', 'Period when negotiations and widespread political violence occurred together'],
        ['June 1992', 'Month and year of the Boipatong massacre'],
        ['45 people', 'Boipatong death toll stated in the lesson'],
        ['Threat to talks', 'Risk that violence would make political negotiations fail'],
        ['Trust building', 'Developing confidence needed to cooperate and honour political agreements'],
        ['April 1994', 'Month and year of South Africa’s first democratic election'],
        ['Voter queue', 'Line of people waiting for their turn to vote'],
        ['Ballot box', 'Container into which completed ballot papers are placed'],
        ['Voter choice', 'Selecting a political option on the election ballot'],
        ['Continued talks', 'Parties persisting with discussions despite violence and interruptions']
    ];
    const matchingSets = [0, 1, 2, 3].map(index => concepts.slice(index * 5, index * 5 + 5).concat(factPairs.slice(index * 5, index * 5 + 5)));
    const match = Object.fromEntries(matchingSets.map((pairs, index) => ['topic' + (index + 1),
        pairs.flatMap(([term, meaning], id) => [{ id: id + 1, text: term }, { id: id + 1, text: meaning }])
    ]));
    const drag = Object.fromEntries([0, 1, 2, 3].map(index => ['unit' + (index + 1),
        concepts.slice(index * 5, index * 5 + 5).map(([item, match]) => ({ item, match }))
    ]));

    const millionaireIndexes = [1, 2, 5, 17, 3, 6, 10, 13, 16, 0, 22, 31, 34, 19, 39];
    const hints = [
        'Unbanning removes a legal restriction.',
        'Distinguish the president making the announcement from the leader being released.',
        'The period was nearly three decades.',
        'Think of the document voters mark.',
        'The announcement preceded Mandela’s release by nine days.',
        'Mandela’s release came after the unbanning announcement.',
        'The governing party represented the existing apartheid state.',
        'This attack took place during the negotiations, two years before the election.',
        'The election followed several years of negotiations.',
        'Neither side could achieve a decisive victory.',
        'Open legal participation made political discussion easier.',
        'Consider whether a party believes promises will be kept.',
        'Continuing talks required overcoming the danger created by violence.',
        'Put the 1990 events before the negotiations and the 1994 election.',
        'A negotiated outcome did not mean that the whole transition was peaceful.'
    ];
    const millionaire = millionaireIndexes.map((choiceIndex, rank) => {
        const item = allChoice[choiceIndex];
        const right = item.a.slice(3);
        const options = [right, ...item.options.map(option => option.slice(3)).filter(option => option !== right)];
        for (let i = 0; i < rank % 4; i++) options.push(options.shift());
        return { q: item.q, options, a: options.indexOf(right), hint: hints[rank] };
    });

    const jeopardyPrompts = [
        ['What was the political deadlock in South Africa by the late 1980s?', 'Neither the government nor the resistance could defeat the other'],
        ['What does civil war mean?', 'Armed conflict between opposing groups within one country'],
        ['What did a State of Emergency give security forces?', 'Extra powers to control unrest'],
        ['What does unbanning mean?', 'Removing the legal prohibition on an organisation’s activities'],
        ['Who announced the 1990 unbanning of political organisations?', 'FW de Klerk'],
        ['On which date was the unbanning announcement made?', '2 February 1990'],
        ['Name the three political organisations highlighted in the unbanning announcement.', 'ANC, PAC and SACP'],
        ['What does SACP stand for?', 'South African Communist Party'],
        ['Why did deadlock encourage a negotiated solution?', 'Neither side could secure its aims by defeating the other'],
        ['How did unbanning help open the way for negotiations?', 'It allowed previously prohibited organisations to participate openly'],
        ['Who was released in 1990 after about 27 years in prison?', 'Nelson Mandela'],
        ['On which date was Mandela released?', '11 February 1990'],
        ['Approximately how many years had Mandela been imprisoned?', '27 years'],
        ['What is a political prisoner?', 'A person imprisoned because of political beliefs or activities'],
        ['What publishing restriction affected Mandela’s photograph under apartheid?', 'His image could not be freely published because of banning and censorship'],
        ['What is censorship?', 'Official restrictions on publishing or sharing information'],
        ['How did Mandela help the transition to democracy?', 'He helped guide the search for a peaceful end to apartheid'],
        ['What new opportunity did release give Mandela in political life?', 'The ability to participate openly in public politics'],
        ['What does reconciliation mean?', 'Rebuilding peaceful relationships after conflict'],
        ['How did Mandela’s leadership affect people beyond South Africa?', 'It inspired people around the world'],
        ['Which governing party negotiated with the ANC and other parties?', 'The National Party'],
        ['What does negotiation mean?', 'Discussion aimed at reaching agreement'],
        ['Between which years did the negotiation period covered in the lesson take place?', '1990 to 1994'],
        ['Why did widespread violence threaten the talks?', 'It increased distrust and could cause negotiations to fail'],
        ['Supporters of which two movements were involved in serious conflict during the talks?', 'Inkatha and the ANC'],
        ['Which June 1992 attack is discussed as a danger to the negotiations?', 'The Boipatong massacre'],
        ['How many people were killed at Boipatong, according to the lesson?', '45'],
        ['According to the lesson, what did groups linked to the government hope to achieve by encouraging violence?', 'Distrust and the failure of negotiations'],
        ['What does distrust mean?', 'Lacking confidence in another person’s or group’s intentions'],
        ['Why does a negotiated agreement depend on trust?', 'Parties need confidence that others will cooperate and honour it'],
        ['What did the parties eventually agree to hold despite the violence?', 'An election for a democratic parliament'],
        ['In which month and year did South Africa hold its first democratic election?', 'April 1994'],
        ['What is an election?', 'A process in which voters choose political representatives'],
        ['What is Parliament?', 'The law-making body of political representatives'],
        ['What is a ballot paper used for?', 'Recording a voter’s political choice'],
        ['What is a ballot box used for?', 'Receiving completed ballot papers'],
        ['What do voting rights allow eligible citizens to do?', 'Help choose their political representatives'],
        ['Why is a genuine choice important in a democratic election?', 'Voters must be able to select among political alternatives'],
        ['Put these events in order: the 1994 election, unbanning and Mandela’s release, negotiations.', 'Unbanning and Mandela’s release, negotiations, the 1994 election'],
        ['Why should the transition to the 1994 election not be described as completely free of conflict?', 'Violence and breakdowns threatened the negotiations along the way']
    ];
    const jeopardy = jeopardyPrompts.map(([q, a], index) => ({ category: 'Round ' + (index < 20 ? 'One' : 'Two'), q, a }));
    global.UnbanningWeek3 = { spin, snake, match, drag, millionaire, jeopardy };
})(window);
