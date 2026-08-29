window.GeoQuestStage5Data = {
    "sourceImage": "sources/aid-operations-brief.jpg",
    "sourceLabel": "Development Aid Source",
    "sourceAlt": "Newspaper-style humanitarian briefing about drought warnings, aid routes, emergency support, benefits and safeguards in the fictional Kumora Basin",
    "questions": [
        {
            "id": "development-aid",
            "prompt": "What does development aid refer to?",
            "instruction": "Choose the most accurate definition.",
            "marks": 1,
            "mode": "single",
            "options": [
                "Financial and technical assistance that supports economic, social and political development in developing countries.",
                "A tax placed on imported goods to protect domestic industries.",
                "A limit placed on the quantity of goods that may enter a country."
            ],
            "correctAnswers": [
                "Financial and technical assistance that supports economic, social and political development in developing countries."
            ],
            "feedback": "Development aid provides financial and technical support for longer-term development in developing countries."
        },
        {
            "id": "aid-routes",
            "prompt": "What is the difference between bilateral aid and multilateral aid?",
            "instruction": "Select the two correct explanations, then confirm your briefing.",
            "marks": 4,
            "mode": "multiple",
            "selectLimit": 2,
            "pointsPerCorrect": 2,
            "options": [
                "Bilateral aid is assistance given directly from one country to another.",
                "Multilateral aid pools support from several countries through an international organisation.",
                "Bilateral aid is supplied only by private shops to their local customers.",
                "Multilateral aid means one country acts alone without any international organisation."
            ],
            "correctAnswers": [
                "Bilateral aid is assistance given directly from one country to another.",
                "Multilateral aid pools support from several countries through an international organisation."
            ],
            "feedback": "Bilateral aid moves directly between two countries, while multilateral aid is coordinated through international organisations using support from several countries."
        },
        {
            "id": "food-organisation",
            "prompt": "Which humanitarian organisation plays an important role in supplying food to famine-affected countries?",
            "instruction": "Choose the correct organisation.",
            "marks": 1,
            "mode": "single",
            "options": [
                "World Food Programme (WFP)",
                "World Trade Organization (WTO)",
                "International Monetary Fund (IMF)"
            ],
            "correctAnswers": ["World Food Programme (WFP)"],
            "feedback": "The World Food Programme is a major humanitarian organisation providing emergency food assistance."
        },
        {
            "id": "other-humanitarian-aid",
            "prompt": "Apart from food, which is another form of humanitarian aid?",
            "instruction": "Choose one valid emergency response.",
            "marks": 1,
            "mode": "single",
            "options": [
                "Medical assistance, including medicines, equipment and healthcare services.",
                "A tariff increase on emergency imports.",
                "A quota that blocks relief supplies from entering."
            ],
            "correctAnswers": [
                "Medical assistance, including medicines, equipment and healthcare services."
            ],
            "feedback": "Humanitarian aid may also provide medical care, clean water, shelter and other urgent support."
        },
        {
            "id": "humanitarian-decision",
            "prompt": "Should humanitarian aid be granted when drought threatens a major humanitarian crisis?",
            "instruction": "Select four points that build the strongest balanced motivation, then confirm your decision.",
            "marks": 8,
            "mode": "multiple",
            "selectLimit": 4,
            "pointsPerCorrect": 2,
            "options": [
                "Yes: rapid aid can save lives and prevent severe malnutrition.",
                "Aid can stabilise vulnerable communities and reduce wider regional disruption.",
                "Delivery should be closely monitored to reduce corruption and misuse.",
                "Support should be designed carefully to avoid dependency or worsening conflict.",
                "Aid should be refused because famine never affects children or vulnerable households.",
                "Emergency supplies should be delayed until every risk has disappeared completely."
            ],
            "correctAnswers": [
                "Yes: rapid aid can save lives and prevent severe malnutrition.",
                "Aid can stabilise vulnerable communities and reduce wider regional disruption.",
                "Delivery should be closely monitored to reduce corruption and misuse.",
                "Support should be designed carefully to avoid dependency or worsening conflict."
            ],
            "feedback": "A strong response supports humanitarian aid because it saves lives and prevents malnutrition, while also recognising the need to monitor corruption, dependency and conflict risks."
        }
    ]
};
