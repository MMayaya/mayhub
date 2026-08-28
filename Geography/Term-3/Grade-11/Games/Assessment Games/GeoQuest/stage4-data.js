window.GeoQuestStage4Data = {
    "sourceImage": "sources/trade-gatekeepers.jpg",
    "sourceLabel": "Original trade gatekeepers briefing",
    "sourceAlt": "Funny black-and-white cartoon showing a wealthy trade official charging a tariff toll and enforcing a two-box quota on smaller producers entering a global market",
    "questions": [
        {
            "id": "promoting-free-trade",
            "prompt": "Is the wealthy trade official promoting free trade?",
            "instruction": "Choose the answer supported by the source.",
            "marks": 1,
            "mode": "single",
            "options": ["Yes", "No"],
            "correctAnswers": ["No"],
            "feedback": "The official is not promoting free trade because entry to the market is controlled by trade restrictions."
        },
        {
            "id": "source-reason",
            "prompt": "Which source clue best supports your answer?",
            "instruction": "Choose the strongest source-based reason.",
            "marks": 2,
            "mode": "single",
            "options": [
                "The official imposes a tariff toll and limits imports with a two-box quota.",
                "The official allows every product to enter without taxes, limits or conditions.",
                "The official removes the market gate so all producers can compete equally."
            ],
            "correctAnswers": [
                "The official imposes a tariff toll and limits imports with a two-box quota."
            ],
            "feedback": "Tariffs and quotas restrict the movement of goods and therefore contradict free trade."
        },
        {
            "id": "country-groups",
            "prompt": "Who represents the two country groups in the source?",
            "instruction": "Choose the correct pairing.",
            "marks": 2,
            "mode": "single",
            "options": [
                "The wealthy official represents MEDCs; the smaller producers at the gate represent LEDCs.",
                "The smaller producers represent MEDCs; the wealthy official represents LEDCs.",
                "The chicken represents MEDCs; the cash register represents LEDCs."
            ],
            "correctAnswers": [
                "The wealthy official represents MEDCs; the smaller producers at the gate represent LEDCs."
            ],
            "feedback": "The powerful, wealthy gatekeeper represents more economically developed countries, while the restricted producers represent less economically developed countries."
        },
        {
            "id": "trade-regulations",
            "prompt": "Which explanations correctly describe regulations used to restrict free trade?",
            "instruction": "Select the tariff and quota explanations, then lock your choices.",
            "marks": 4,
            "mode": "multiple",
            "selectLimit": 2,
            "pointsPerCorrect": 2,
            "options": [
                "Tariffs are taxes on imported goods that make them more expensive and less competitive.",
                "Quotas limit the quantity of a particular good that may be imported.",
                "Tariffs remove every tax and charge from imported goods.",
                "Quotas guarantee that unlimited quantities of goods may enter a country."
            ],
            "correctAnswers": [
                "Tariffs are taxes on imported goods that make them more expensive and less competitive.",
                "Quotas limit the quantity of a particular good that may be imported."
            ],
            "feedback": "Tariffs raise the price of imports, while quotas restrict how much may enter, helping protect domestic producers from foreign competition."
        },
        {
            "id": "free-trade-advantages",
            "prompt": "Which are advantages of free trade for less economically developed countries?",
            "instruction": "Select two advantages, then lock your choices.",
            "marks": 4,
            "mode": "multiple",
            "selectLimit": 2,
            "pointsPerCorrect": 2,
            "options": [
                "It gives producers access to larger markets for their goods.",
                "It can create opportunities to attract foreign investment.",
                "It prevents local producers from selling goods outside their own towns.",
                "It guarantees that no foreign business will ever enter the country."
            ],
            "correctAnswers": [
                "It gives producers access to larger markets for their goods.",
                "It can create opportunities to attract foreign investment."
            ],
            "feedback": "Free trade can expand market access and encourage foreign investment in less economically developed countries."
        },
        {
            "id": "free-trade-disadvantage",
            "prompt": "What is one disadvantage of free trade for less economically developed countries?",
            "instruction": "Choose the strongest explanation.",
            "marks": 2,
            "mode": "single",
            "options": [
                "Local industries may collapse when they cannot compete with powerful producers from developed countries.",
                "Local industries are protected from every foreign competitor and therefore face no pressure.",
                "All imported products automatically become more expensive because free trade increases tariffs."
            ],
            "correctAnswers": [
                "Local industries may collapse when they cannot compete with powerful producers from developed countries."
            ],
            "feedback": "Strong foreign competition can overwhelm smaller local industries that lack the resources or scale to compete."
        }
    ]
};
