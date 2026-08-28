window.GeoQuestStage1Packs = {
    "A": {
        "label": "Azure Route Brief",
        "sourceImage": "sources/trade-brief-a.jpg",
        "exports": 96.45,
        "imports": 109.80,
        "balance": -13.35,
        "exportPartners": [
            ["China", 12.0],
            ["United States", 8.2],
            ["Germany", 5.8],
            ["Netherlands", 5.0],
            ["Botswana", 4.6]
        ],
        "importPartners": [
            ["China", 22.0],
            ["Germany", 9.1],
            ["United States", 5.5],
            ["India", 4.3],
            ["Saudi Arabia", 4.0]
        ],
        "questions": [
            {
                "id": "trade-value",
                "prompt": "Complete the statement: The value of South Africa's ___ is greater than the value of its ___.",
                "options": ["Exports; imports", "Imports; exports"],
                "answer": "Imports; exports",
                "feedback": "Imports are R109.80 billion, which is greater than exports of R96.45 billion.",
                "usesSource": true
            },
            {
                "id": "usa-balance",
                "prompt": "South Africa has a ___ trade balance with the United States in this source pack.",
                "options": ["Positive", "Negative"],
                "answer": "Positive",
                "feedback": "Exports to the United States are about R7.91 billion, while imports are about R6.04 billion.",
                "usesSource": true
            },
            {
                "id": "germany-share",
                "prompt": "What percentage of goods is exported from South Africa to Germany?",
                "options": ["5.8%", "9.1%"],
                "answer": "5.8%",
                "feedback": "Germany receives 5.8% of the exports shown in the briefing.",
                "usesSource": true
            },
            {
                "id": "germany-balance",
                "prompt": "South Africa has a trade ___ with Germany in this source pack.",
                "options": ["Surplus", "Deficit"],
                "answer": "Deficit",
                "feedback": "The estimated export value to Germany is lower than the estimated import value from Germany.",
                "usesSource": true
            },
            {
                "id": "balance-term",
                "prompt": "The relationship between the value of a country's exports and its imports is called the...",
                "options": ["Balance of trade", "Balance of payments"],
                "answer": "Balance of trade",
                "feedback": "Balance of trade compares the value of exported and imported goods.",
                "usesSource": false
            },
            {
                "id": "china-approach",
                "prompt": "China's economic development is strongly associated with an ___ approach to development.",
                "options": ["Import-led", "Export-led"],
                "answer": "Export-led",
                "feedback": "Export-led development expands production for sale in international markets.",
                "usesSource": false
            },
            {
                "id": "quotas",
                "prompt": "Limits set by governments on the amount of goods that may be imported are called...",
                "options": ["Quotas", "Subsidies"],
                "answer": "Quotas",
                "feedback": "A quota places a limit on the quantity of a product that may be imported.",
                "usesSource": false
            },
            {
                "id": "free-trade",
                "prompt": "Trade in goods and services without tariffs and quotas is known as...",
                "options": ["Fair trade", "Free trade"],
                "answer": "Free trade",
                "feedback": "Free trade removes or reduces restrictions such as tariffs and quotas.",
                "usesSource": false
            }
        ]
    },
    "B": {
        "label": "Emerald Route Brief",
        "sourceImage": "sources/trade-brief-b.jpg",
        "exports": 118.60,
        "imports": 104.20,
        "balance": 14.40,
        "exportPartners": [
            ["China", 11.7],
            ["Germany", 8.4],
            ["Japan", 5.9],
            ["Botswana", 5.4],
            ["United States", 5.1]
        ],
        "importPartners": [
            ["China", 20.4],
            ["Germany", 7.2],
            ["United States", 7.0],
            ["India", 4.7],
            ["Saudi Arabia", 3.5]
        ],
        "questions": [
            {
                "id": "trade-value",
                "prompt": "Complete the statement: The value of South Africa's ___ is greater than the value of its ___.",
                "options": ["Exports; imports", "Imports; exports"],
                "answer": "Exports; imports",
                "feedback": "Exports are R118.60 billion, which is greater than imports of R104.20 billion.",
                "usesSource": true
            },
            {
                "id": "usa-balance",
                "prompt": "South Africa has a ___ trade balance with the United States in this source pack.",
                "options": ["Positive", "Negative"],
                "answer": "Negative",
                "feedback": "Exports to the United States are about R6.05 billion, while imports are about R7.29 billion.",
                "usesSource": true
            },
            {
                "id": "germany-share",
                "prompt": "What percentage of goods is exported from South Africa to Germany?",
                "options": ["8.4%", "7.2%"],
                "answer": "8.4%",
                "feedback": "Germany receives 8.4% of the exports shown in the briefing.",
                "usesSource": true
            },
            {
                "id": "germany-balance",
                "prompt": "South Africa has a trade ___ with Germany in this source pack.",
                "options": ["Surplus", "Deficit"],
                "answer": "Surplus",
                "feedback": "The estimated export value to Germany is greater than the estimated import value from Germany.",
                "usesSource": true
            },
            {
                "id": "balance-term",
                "prompt": "The relationship between the value of a country's exports and its imports is called the...",
                "options": ["Balance of trade", "Balance of payments"],
                "answer": "Balance of trade",
                "feedback": "Balance of trade compares the value of exported and imported goods.",
                "usesSource": false
            },
            {
                "id": "china-approach",
                "prompt": "China's economic development is strongly associated with an ___ approach to development.",
                "options": ["Import-led", "Export-led"],
                "answer": "Export-led",
                "feedback": "Export-led development expands production for sale in international markets.",
                "usesSource": false
            },
            {
                "id": "quotas",
                "prompt": "Limits set by governments on the amount of goods that may be imported are called...",
                "options": ["Quotas", "Subsidies"],
                "answer": "Quotas",
                "feedback": "A quota places a limit on the quantity of a product that may be imported.",
                "usesSource": false
            },
            {
                "id": "free-trade",
                "prompt": "Trade in goods and services without tariffs and quotas is known as...",
                "options": ["Fair trade", "Free trade"],
                "answer": "Free trade",
                "feedback": "Free trade removes or reduces restrictions such as tariffs and quotas.",
                "usesSource": false
            }
        ]
    }
};
