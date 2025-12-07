// Mock quiz questions organized by topic and difficulty
export const mockQuestions = {
    Space: {
        Easy: [
            {
                id: 1,
                question: "What is the closest planet to the Sun?",
                options: ["Venus", "Mercury", "Mars", "Earth"],
                correctAnswer: 1,
                explanation: "Mercury is the closest planet to the Sun, orbiting at an average distance of 57.9 million km."
            },
            {
                id: 2,
                question: "How many planets are in our solar system?",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1,
                explanation: "There are 8 planets in our solar system since Pluto was reclassified as a dwarf planet in 2006."
            },
            {
                id: 3,
                question: "What is the largest planet in our solar system?",
                options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
                correctAnswer: 2,
                explanation: "Jupiter is the largest planet, with a mass more than twice that of all other planets combined."
            },
            {
                id: 4,
                question: "What is the name of Earth's natural satellite?",
                options: ["Luna", "Moon", "Both A and B", "Selene"],
                correctAnswer: 2,
                explanation: "Earth's natural satellite is called the Moon, also known as Luna in Latin."
            },
            {
                id: 5,
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1,
                explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface."
            },
            {
                id: 6,
                question: "What is the name of our galaxy?",
                options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
                correctAnswer: 1,
                explanation: "We live in the Milky Way galaxy, a barred spiral galaxy."
            },
            {
                id: 7,
                question: "How long does it take for light from the Sun to reach Earth?",
                options: ["8 minutes", "1 hour", "1 day", "Instantly"],
                correctAnswer: 0,
                explanation: "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth."
            },
            {
                id: 8,
                question: "Which planet has the most moons?",
                options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correctAnswer: 1,
                explanation: "Saturn has the most confirmed moons with over 140 natural satellites."
            },
            {
                id: 9,
                question: "What is the hottest planet in our solar system?",
                options: ["Mercury", "Venus", "Mars", "Jupiter"],
                correctAnswer: 1,
                explanation: "Venus is the hottest planet due to its thick atmosphere creating a runaway greenhouse effect."
            },
            {
                id: 10,
                question: "What is a shooting star?",
                options: ["A falling star", "A meteor", "A comet", "A satellite"],
                correctAnswer: 1,
                explanation: "A shooting star is actually a meteor - a piece of space debris burning up in Earth's atmosphere."
            }
        ],
        Medium: [
            {
                id: 11,
                question: "What is the Kuiper Belt?",
                options: ["A region of asteroids", "A region of comets beyond Neptune", "A type of galaxy", "A constellation"],
                correctAnswer: 1,
                explanation: "The Kuiper Belt is a region beyond Neptune containing many icy bodies and dwarf planets."
            },
            {
                id: 12,
                question: "What is the Great Red Spot on Jupiter?",
                options: ["A volcano", "A giant storm", "An ocean", "A crater"],
                correctAnswer: 1,
                explanation: "The Great Red Spot is a massive storm that has been raging on Jupiter for at least 400 years."
            },
            {
                id: 13,
                question: "Which planet rotates on its side?",
                options: ["Neptune", "Uranus", "Saturn", "Jupiter"],
                correctAnswer: 1,
                explanation: "Uranus rotates on its side with an axial tilt of about 98 degrees."
            },
            {
                id: 14,
                question: "What is the name of the first artificial satellite?",
                options: ["Explorer 1", "Sputnik 1", "Vanguard 1", "Telstar 1"],
                correctAnswer: 1,
                explanation: "Sputnik 1, launched by the Soviet Union in 1957, was the first artificial satellite."
            },
            {
                id: 15,
                question: "What is the approximate age of the universe?",
                options: ["4.5 billion years", "13.8 billion years", "20 billion years", "100 billion years"],
                correctAnswer: 1,
                explanation: "The universe is approximately 13.8 billion years old according to current scientific estimates."
            },
            {
                id: 16,
                question: "What is a light-year?",
                options: ["A unit of time", "A unit of distance", "A unit of speed", "A unit of mass"],
                correctAnswer: 1,
                explanation: "A light-year is a unit of distance - the distance light travels in one year (about 9.46 trillion km)."
            },
            {
                id: 17,
                question: "Which spacecraft was the first to leave our solar system?",
                options: ["Voyager 1", "Pioneer 10", "New Horizons", "Cassini"],
                correctAnswer: 0,
                explanation: "Voyager 1, launched in 1977, became the first spacecraft to enter interstellar space in 2012."
            },
            {
                id: 18,
                question: "What is the name of Saturn's largest moon?",
                options: ["Europa", "Ganymede", "Titan", "Callisto"],
                correctAnswer: 2,
                explanation: "Titan is Saturn's largest moon and the only moon with a substantial atmosphere."
            },
            {
                id: 19,
                question: "What causes the Northern Lights (Aurora Borealis)?",
                options: ["Solar wind particles", "Moonlight reflection", "Volcanic activity", "Weather patterns"],
                correctAnswer: 0,
                explanation: "The Northern Lights are caused by solar wind particles colliding with Earth's magnetic field."
            },
            {
                id: 20,
                question: "What is the name of the boundary around a black hole?",
                options: ["Event horizon", "Singularity", "Photon sphere", "Accretion disk"],
                correctAnswer: 0,
                explanation: "The event horizon is the boundary beyond which nothing, not even light, can escape a black hole."
            }
        ],
        Hard: [
            {
                id: 21,
                question: "What is the Chandrasekhar limit?",
                options: ["Maximum mass of a white dwarf", "Speed of light", "Age of universe", "Size of black hole"],
                correctAnswer: 0,
                explanation: "The Chandrasekhar limit (1.4 solar masses) is the maximum mass a white dwarf can have before collapsing."
            },
            {
                id: 22,
                question: "What is dark energy?",
                options: ["Energy from black holes", "Mysterious force accelerating universe expansion", "Energy in dark matter", "Antimatter energy"],
                correctAnswer: 1,
                explanation: "Dark energy is a mysterious force causing the accelerated expansion of the universe."
            },
            {
                id: 23,
                question: "What is the Roche limit?",
                options: ["Distance where tidal forces destroy objects", "Maximum star size", "Minimum planet mass", "Speed limit in space"],
                correctAnswer: 0,
                explanation: "The Roche limit is the distance at which tidal forces from a celestial body will tear apart an orbiting object."
            },
            {
                id: 24,
                question: "What is a magnetar?",
                options: ["A type of neutron star", "A magnetic planet", "A type of galaxy", "A stellar remnant"],
                correctAnswer: 0,
                explanation: "A magnetar is a type of neutron star with an extremely powerful magnetic field."
            },
            {
                id: 25,
                question: "What is the cosmic microwave background radiation?",
                options: ["Radiation from stars", "Afterglow of Big Bang", "Solar radiation", "Galactic radiation"],
                correctAnswer: 1,
                explanation: "The CMB is the afterglow of the Big Bang, providing evidence for the universe's origin."
            },
            {
                id: 26,
                question: "What is Hawking radiation?",
                options: ["Radiation from stars", "Theoretical radiation from black holes", "Solar radiation", "Cosmic rays"],
                correctAnswer: 1,
                explanation: "Hawking radiation is theoretical radiation predicted to be emitted by black holes due to quantum effects."
            },
            {
                id: 27,
                question: "What is the Great Attractor?",
                options: ["A supermassive black hole", "A gravitational anomaly", "A galaxy cluster", "A cosmic structure"],
                correctAnswer: 1,
                explanation: "The Great Attractor is a gravitational anomaly pulling our galaxy and others toward it."
            },
            {
                id: 28,
                question: "What is the Oort Cloud?",
                options: ["A nebula", "A theoretical cloud of icy objects", "A type of galaxy", "An asteroid belt"],
                correctAnswer: 1,
                explanation: "The Oort Cloud is a theoretical spherical cloud of icy objects surrounding our solar system."
            },
            {
                id: 29,
                question: "What is a pulsar?",
                options: ["A pulsating star", "A rotating neutron star", "A type of planet", "A binary star"],
                correctAnswer: 1,
                explanation: "A pulsar is a highly magnetized rotating neutron star that emits beams of electromagnetic radiation."
            },
            {
                id: 30,
                question: "What is the Fermi Paradox?",
                options: ["A physics principle", "The contradiction about alien life", "A space phenomenon", "A mathematical equation"],
                correctAnswer: 1,
                explanation: "The Fermi Paradox questions why we haven't found evidence of alien civilizations despite high probability."
            }
        ]
    },
    Coding: {
        Easy: [
            {
                id: 31,
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
                correctAnswer: 0,
                explanation: "HTML stands for Hyper Text Markup Language, the standard markup language for web pages."
            },
            {
                id: 32,
                question: "Which symbol is used for single-line comments in JavaScript?",
                options: ["//", "/*", "#", "<!--"],
                correctAnswer: 0,
                explanation: "// is used for single-line comments in JavaScript."
            },
            {
                id: 33,
                question: "What is CSS used for?",
                options: ["Programming logic", "Styling web pages", "Database management", "Server-side scripting"],
                correctAnswer: 1,
                explanation: "CSS (Cascading Style Sheets) is used for styling and laying out web pages."
            },
            {
                id: 34,
                question: "Which data type is used to store true/false values?",
                options: ["String", "Integer", "Boolean", "Float"],
                correctAnswer: 2,
                explanation: "Boolean data type stores true or false values."
            },
            {
                id: 35,
                question: "What does API stand for?",
                options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Integration"],
                correctAnswer: 0,
                explanation: "API stands for Application Programming Interface, allowing software to communicate."
            },
            {
                id: 36,
                question: "Which of these is a programming language?",
                options: ["HTML", "CSS", "Python", "SQL"],
                correctAnswer: 2,
                explanation: "Python is a programming language, while HTML and CSS are markup/styling languages."
            },
            {
                id: 37,
                question: "What is a variable?",
                options: ["A constant value", "A container for storing data", "A function", "A loop"],
                correctAnswer: 1,
                explanation: "A variable is a container for storing data values that can change during program execution."
            },
            {
                id: 38,
                question: "Which symbol is used for assignment in most programming languages?",
                options: ["==", "=", "===", ":="],
                correctAnswer: 1,
                explanation: "The = symbol is used for assignment in most programming languages."
            },
            {
                id: 39,
                question: "What is a function?",
                options: ["A variable", "A reusable block of code", "A data type", "A comment"],
                correctAnswer: 1,
                explanation: "A function is a reusable block of code that performs a specific task."
            },
            {
                id: 40,
                question: "What does IDE stand for?",
                options: ["Integrated Development Environment", "Internet Development Editor", "Interactive Design Environment", "Integrated Design Editor"],
                correctAnswer: 0,
                explanation: "IDE stands for Integrated Development Environment, a software for building applications."
            }
        ],
        Medium: [
            {
                id: 41,
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correctAnswer: 1,
                explanation: "Binary search has O(log n) time complexity as it divides the search space in half each iteration."
            },
            {
                id: 42,
                question: "What is a closure in JavaScript?",
                options: ["A loop", "A function with access to outer scope", "A class", "An object"],
                correctAnswer: 1,
                explanation: "A closure is a function that has access to variables in its outer (enclosing) scope."
            },
            {
                id: 43,
                question: "What is the difference between '==' and '===' in JavaScript?",
                options: ["No difference", "=== checks type and value", "== is faster", "=== is deprecated"],
                correctAnswer: 1,
                explanation: "=== (strict equality) checks both type and value, while == only checks value with type coercion."
            },
            {
                id: 44,
                question: "What is polymorphism in OOP?",
                options: ["Multiple inheritance", "Objects taking many forms", "Data hiding", "Code reusability"],
                correctAnswer: 1,
                explanation: "Polymorphism allows objects to take many forms and be treated as instances of their parent class."
            },
            {
                id: 45,
                question: "What is a RESTful API?",
                options: ["A database", "An architectural style for web services", "A programming language", "A framework"],
                correctAnswer: 1,
                explanation: "REST is an architectural style for designing networked applications using HTTP methods."
            },
            {
                id: 46,
                question: "What is the purpose of async/await in JavaScript?",
                options: ["To handle synchronous code", "To handle asynchronous operations", "To create loops", "To define variables"],
                correctAnswer: 1,
                explanation: "async/await is used to handle asynchronous operations in a more readable, synchronous-looking way."
            },
            {
                id: 47,
                question: "What is a stack data structure?",
                options: ["FIFO structure", "LIFO structure", "Random access structure", "Tree structure"],
                correctAnswer: 1,
                explanation: "A stack is a LIFO (Last In, First Out) data structure."
            },
            {
                id: 48,
                question: "What is Git?",
                options: ["A programming language", "A version control system", "A database", "An IDE"],
                correctAnswer: 1,
                explanation: "Git is a distributed version control system for tracking changes in source code."
            },
            {
                id: 49,
                question: "What is the purpose of a constructor in OOP?",
                options: ["To destroy objects", "To initialize objects", "To copy objects", "To compare objects"],
                correctAnswer: 1,
                explanation: "A constructor is a special method used to initialize objects when they are created."
            },
            {
                id: 50,
                question: "What is the DOM?",
                options: ["A programming language", "Document Object Model", "Data Object Manager", "Dynamic Object Method"],
                correctAnswer: 1,
                explanation: "DOM (Document Object Model) is a programming interface for HTML and XML documents."
            }
        ],
        Hard: [
            {
                id: 51,
                question: "What is the space complexity of merge sort?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correctAnswer: 2,
                explanation: "Merge sort has O(n) space complexity due to the temporary arrays needed for merging."
            },
            {
                id: 52,
                question: "What is a race condition?",
                options: ["A fast algorithm", "Multiple threads accessing shared data", "A sorting algorithm", "A design pattern"],
                correctAnswer: 1,
                explanation: "A race condition occurs when multiple threads access shared data simultaneously, causing unpredictable results."
            },
            {
                id: 53,
                question: "What is memoization?",
                options: ["Memory management", "Caching function results", "Data encryption", "Code optimization"],
                correctAnswer: 1,
                explanation: "Memoization is an optimization technique that caches function results to avoid redundant calculations."
            },
            {
                id: 54,
                question: "What is the CAP theorem?",
                options: ["A sorting algorithm", "Consistency, Availability, Partition tolerance", "A design pattern", "A data structure"],
                correctAnswer: 1,
                explanation: "CAP theorem states distributed systems can only guarantee two of: Consistency, Availability, Partition tolerance."
            },
            {
                id: 55,
                question: "What is a B-tree?",
                options: ["A binary tree", "A self-balancing tree for databases", "A graph", "A linked list"],
                correctAnswer: 1,
                explanation: "A B-tree is a self-balancing tree data structure commonly used in databases and file systems."
            },
            {
                id: 56,
                question: "What is the purpose of a garbage collector?",
                options: ["To delete files", "To manage memory automatically", "To optimize code", "To handle errors"],
                correctAnswer: 1,
                explanation: "A garbage collector automatically manages memory by reclaiming memory occupied by unused objects."
            },
            {
                id: 57,
                question: "What is the difference between deep copy and shallow copy?",
                options: ["No difference", "Deep copy copies nested objects", "Shallow copy is faster", "Deep copy is deprecated"],
                correctAnswer: 1,
                explanation: "Deep copy creates copies of nested objects, while shallow copy only copies references to nested objects."
            },
            {
                id: 58,
                question: "What is a deadlock?",
                options: ["A locked file", "Circular wait for resources", "A security feature", "A data structure"],
                correctAnswer: 1,
                explanation: "A deadlock occurs when processes are waiting for each other to release resources, creating a circular wait."
            },
            {
                id: 59,
                question: "What is the purpose of a hash function in hash tables?",
                options: ["To sort data", "To map keys to array indices", "To encrypt data", "To compress data"],
                correctAnswer: 1,
                explanation: "A hash function maps keys to array indices for efficient data retrieval in hash tables."
            },
            {
                id: 60,
                question: "What is the Halting Problem?",
                options: ["A sorting problem", "Determining if a program will terminate", "A network issue", "A compilation error"],
                correctAnswer: 1,
                explanation: "The Halting Problem proves it's impossible to determine if an arbitrary program will terminate or run forever."
            }
        ]
    },
    History: {
        Easy: [
            {
                id: 61,
                question: "In which year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                correctAnswer: 2,
                explanation: "World War II ended in 1945 with the surrender of Japan in September."
            },
            {
                id: 62,
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
                correctAnswer: 1,
                explanation: "George Washington was the first President of the United States, serving from 1789 to 1797."
            },
            {
                id: 63,
                question: "Which ancient wonder is still standing?",
                options: ["Hanging Gardens of Babylon", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"],
                correctAnswer: 1,
                explanation: "The Great Pyramid of Giza is the only ancient wonder still standing today."
            },
            {
                id: 64,
                question: "When did the Titanic sink?",
                options: ["1910", "1911", "1912", "1913"],
                correctAnswer: 2,
                explanation: "The RMS Titanic sank on April 15, 1912, after hitting an iceberg."
            },
            {
                id: 65,
                question: "Who painted the Mona Lisa?",
                options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
                correctAnswer: 1,
                explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
            },
            {
                id: 66,
                question: "Which empire built Machu Picchu?",
                options: ["Aztec", "Maya", "Inca", "Olmec"],
                correctAnswer: 2,
                explanation: "Machu Picchu was built by the Inca Empire in the 15th century."
            },
            {
                id: 67,
                question: "In which year did Christopher Columbus reach the Americas?",
                options: ["1490", "1492", "1494", "1496"],
                correctAnswer: 1,
                explanation: "Christopher Columbus reached the Americas in 1492."
            },
            {
                id: 68,
                question: "Who was the first person to walk on the moon?",
                options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "Yuri Gagarin"],
                correctAnswer: 1,
                explanation: "Neil Armstrong was the first person to walk on the moon on July 20, 1969."
            },
            {
                id: 69,
                question: "Which country gifted the Statue of Liberty to the USA?",
                options: ["England", "Spain", "France", "Italy"],
                correctAnswer: 2,
                explanation: "France gifted the Statue of Liberty to the United States in 1886."
            },
            {
                id: 70,
                question: "When did the Berlin Wall fall?",
                options: ["1987", "1988", "1989", "1990"],
                correctAnswer: 2,
                explanation: "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era."
            }
        ],
        Medium: [
            {
                id: 71,
                question: "What was the name of the first civilization?",
                options: ["Egyptian", "Sumerian", "Indus Valley", "Chinese"],
                correctAnswer: 1,
                explanation: "The Sumerian civilization in Mesopotamia is considered the first civilization, emerging around 4500 BCE."
            },
            {
                id: 72,
                question: "Who was the longest-reigning British monarch before Elizabeth II?",
                options: ["Victoria", "George III", "Edward VII", "George V"],
                correctAnswer: 0,
                explanation: "Queen Victoria reigned for 63 years (1837-1901) before being surpassed by Elizabeth II."
            },
            {
                id: 73,
                question: "What was the Silk Road?",
                options: ["A road in China", "An ancient trade route", "A silk factory", "A river"],
                correctAnswer: 1,
                explanation: "The Silk Road was an ancient network of trade routes connecting East and West."
            },
            {
                id: 74,
                question: "Who wrote the Communist Manifesto?",
                options: ["Lenin", "Stalin", "Marx and Engels", "Trotsky"],
                correctAnswer: 2,
                explanation: "Karl Marx and Friedrich Engels wrote the Communist Manifesto in 1848."
            },
            {
                id: 75,
                question: "What was the Renaissance?",
                options: ["A war", "A cultural rebirth", "A plague", "A revolution"],
                correctAnswer: 1,
                explanation: "The Renaissance was a period of cultural, artistic, and intellectual rebirth in Europe (14th-17th centuries)."
            },
            {
                id: 76,
                question: "Who was Genghis Khan?",
                options: ["A Chinese emperor", "A Mongol conqueror", "A Japanese shogun", "An Indian king"],
                correctAnswer: 1,
                explanation: "Genghis Khan was the founder and first Great Khan of the Mongol Empire."
            },
            {
                id: 77,
                question: "What was the Black Death?",
                options: ["A war", "A plague", "A famine", "A revolution"],
                correctAnswer: 1,
                explanation: "The Black Death was a devastating plague that killed millions in Europe during the 14th century."
            },
            {
                id: 78,
                question: "Who was Cleopatra?",
                options: ["A Greek queen", "An Egyptian pharaoh", "A Roman empress", "A Persian queen"],
                correctAnswer: 1,
                explanation: "Cleopatra VII was the last active pharaoh of Ancient Egypt."
            },
            {
                id: 79,
                question: "What was the Cold War?",
                options: ["A winter war", "A political tension period", "A trade war", "A civil war"],
                correctAnswer: 1,
                explanation: "The Cold War was a period of geopolitical tension between the USA and USSR (1947-1991)."
            },
            {
                id: 80,
                question: "Who invented the printing press?",
                options: ["Leonardo da Vinci", "Johannes Gutenberg", "Benjamin Franklin", "Thomas Edison"],
                correctAnswer: 1,
                explanation: "Johannes Gutenberg invented the printing press around 1440."
            }
        ],
        Hard: [
            {
                id: 81,
                question: "What was the Treaty of Westphalia?",
                options: ["End of WWI", "End of Thirty Years' War", "End of WWII", "End of Napoleonic Wars"],
                correctAnswer: 1,
                explanation: "The Treaty of Westphalia (1648) ended the Thirty Years' War and established modern state sovereignty."
            },
            {
                id: 82,
                question: "Who was Hammurabi?",
                options: ["An Egyptian pharaoh", "A Babylonian king", "A Persian emperor", "A Greek philosopher"],
                correctAnswer: 1,
                explanation: "Hammurabi was a Babylonian king famous for his code of laws, one of the oldest legal codes."
            },
            {
                id: 83,
                question: "What was the Defenestration of Prague?",
                options: ["A battle", "Throwing officials out of a window", "A treaty", "A coronation"],
                correctAnswer: 1,
                explanation: "The Defenestration of Prague (1618) involved throwing Catholic officials out of a window, sparking the Thirty Years' War."
            },
            {
                id: 84,
                question: "What was the Meiji Restoration?",
                options: ["Chinese revolution", "Japanese modernization", "Korean independence", "Vietnamese war"],
                correctAnswer: 1,
                explanation: "The Meiji Restoration (1868) was a period of rapid modernization and westernization in Japan."
            },
            {
                id: 85,
                question: "Who were the Jacobins?",
                options: ["British nobles", "French revolutionaries", "German philosophers", "Italian artists"],
                correctAnswer: 1,
                explanation: "The Jacobins were radical revolutionaries during the French Revolution, led by Robespierre."
            },
            {
                id: 86,
                question: "What was the Scramble for Africa?",
                options: ["A race", "European colonization of Africa", "An African war", "A trade agreement"],
                correctAnswer: 1,
                explanation: "The Scramble for Africa was the rapid colonization of Africa by European powers in the late 19th century."
            },
            {
                id: 87,
                question: "What was the Magna Carta?",
                options: ["A map", "A charter limiting royal power", "A religious text", "A trade agreement"],
                correctAnswer: 1,
                explanation: "The Magna Carta (1215) was a charter that limited the power of the English monarchy."
            },
            {
                id: 88,
                question: "Who was Suleiman the Magnificent?",
                options: ["A Persian shah", "An Ottoman sultan", "A Mughal emperor", "An Egyptian pharaoh"],
                correctAnswer: 1,
                explanation: "Suleiman the Magnificent was the longest-reigning sultan of the Ottoman Empire (1520-1566)."
            },
            {
                id: 89,
                question: "What was the Hanseatic League?",
                options: ["A military alliance", "A commercial confederation", "A religious order", "A political party"],
                correctAnswer: 1,
                explanation: "The Hanseatic League was a commercial and defensive confederation of merchant guilds in Northern Europe."
            },
            {
                id: 90,
                question: "What was the Investiture Controversy?",
                options: ["A war", "A conflict over appointing bishops", "A trade dispute", "A succession crisis"],
                correctAnswer: 1,
                explanation: "The Investiture Controversy was a conflict between the Pope and Holy Roman Emperor over appointing church officials."
            }
        ]
    },
    Science: {
        Easy: [
            {
                id: 91,
                question: "What is the chemical symbol for water?",
                options: ["H2O", "CO2", "O2", "H2"],
                correctAnswer: 0,
                explanation: "Water's chemical formula is H2O, consisting of two hydrogen atoms and one oxygen atom."
            },
            {
                id: 92,
                question: "What is the speed of light?",
                options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
                correctAnswer: 0,
                explanation: "The speed of light in a vacuum is approximately 300,000 kilometers per second."
            },
            {
                id: 93,
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                correctAnswer: 1,
                explanation: "Mitochondria are known as the powerhouse of the cell, producing energy through cellular respiration."
            },
            {
                id: 94,
                question: "What is the most abundant gas in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correctAnswer: 2,
                explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
            },
            {
                id: 95,
                question: "What is the freezing point of water in Celsius?",
                options: ["0°C", "32°C", "100°C", "-32°C"],
                correctAnswer: 0,
                explanation: "Water freezes at 0°C (32°F) at standard atmospheric pressure."
            },
            {
                id: 96,
                question: "What is photosynthesis?",
                options: ["Animal respiration", "Plants making food from sunlight", "Water cycle", "Rock formation"],
                correctAnswer: 1,
                explanation: "Photosynthesis is the process by which plants convert sunlight into chemical energy (food)."
            },
            {
                id: 97,
                question: "How many bones are in the adult human body?",
                options: ["186", "206", "226", "246"],
                correctAnswer: 1,
                explanation: "The adult human body has 206 bones."
            },
            {
                id: 98,
                question: "What is the largest organ in the human body?",
                options: ["Heart", "Liver", "Skin", "Brain"],
                correctAnswer: 2,
                explanation: "The skin is the largest organ in the human body."
            },
            {
                id: 99,
                question: "What is gravity?",
                options: ["A type of energy", "A force of attraction", "A chemical reaction", "A form of light"],
                correctAnswer: 1,
                explanation: "Gravity is a force of attraction between objects with mass."
            },
            {
                id: 100,
                question: "What is DNA?",
                options: ["A protein", "Genetic material", "A vitamin", "An enzyme"],
                correctAnswer: 1,
                explanation: "DNA (Deoxyribonucleic Acid) is the genetic material that carries hereditary information."
            }
        ],
        Medium: [
            {
                id: 101,
                question: "What is the pH of pure water?",
                options: ["5", "7", "9", "11"],
                correctAnswer: 1,
                explanation: "Pure water has a pH of 7, which is neutral on the pH scale."
            },
            {
                id: 102,
                question: "What is Newton's First Law of Motion?",
                options: ["F=ma", "Object in motion stays in motion", "Action-reaction", "Gravity"],
                correctAnswer: 1,
                explanation: "Newton's First Law states that an object in motion stays in motion unless acted upon by an external force."
            },
            {
                id: 103,
                question: "What is the difference between mitosis and meiosis?",
                options: ["No difference", "Mitosis produces identical cells", "Meiosis is faster", "Mitosis only in plants"],
                correctAnswer: 1,
                explanation: "Mitosis produces two identical cells, while meiosis produces four genetically different cells."
            },
            {
                id: 104,
                question: "What is an isotope?",
                options: ["A type of molecule", "Atoms with different neutron numbers", "A chemical bond", "A type of energy"],
                correctAnswer: 1,
                explanation: "Isotopes are atoms of the same element with different numbers of neutrons."
            },
            {
                id: 105,
                question: "What is the Doppler Effect?",
                options: ["Light bending", "Change in wave frequency due to motion", "Gravity effect", "Magnetic field"],
                correctAnswer: 1,
                explanation: "The Doppler Effect is the change in frequency of a wave due to relative motion between source and observer."
            },
            {
                id: 106,
                question: "What is entropy?",
                options: ["Energy", "Measure of disorder", "Temperature", "Pressure"],
                correctAnswer: 1,
                explanation: "Entropy is a measure of disorder or randomness in a system."
            },
            {
                id: 107,
                question: "What is the function of ribosomes?",
                options: ["Energy production", "Protein synthesis", "DNA replication", "Waste removal"],
                correctAnswer: 1,
                explanation: "Ribosomes are responsible for protein synthesis in cells."
            },
            {
                id: 108,
                question: "What is the difference between speed and velocity?",
                options: ["No difference", "Velocity includes direction", "Speed is faster", "Velocity is outdated"],
                correctAnswer: 1,
                explanation: "Velocity is speed with direction, making it a vector quantity."
            },
            {
                id: 109,
                question: "What is an enzyme?",
                options: ["A vitamin", "A biological catalyst", "A hormone", "A protein"],
                correctAnswer: 1,
                explanation: "An enzyme is a biological catalyst that speeds up chemical reactions in living organisms."
            },
            {
                id: 110,
                question: "What is the uncertainty principle?",
                options: ["A math theorem", "Cannot know position and momentum precisely", "A chemistry law", "A biology concept"],
                correctAnswer: 1,
                explanation: "Heisenberg's Uncertainty Principle states you cannot simultaneously know a particle's exact position and momentum."
            }
        ],
        Hard: [
            {
                id: 111,
                question: "What is the Pauli Exclusion Principle?",
                options: ["Energy conservation", "No two electrons same quantum state", "Gravity law", "Chemical bonding"],
                correctAnswer: 1,
                explanation: "The Pauli Exclusion Principle states no two electrons can have the same set of quantum numbers."
            },
            {
                id: 112,
                question: "What is quantum entanglement?",
                options: ["Particle collision", "Correlated quantum states", "Nuclear fusion", "Chemical bonding"],
                correctAnswer: 1,
                explanation: "Quantum entanglement is a phenomenon where particles remain connected and affect each other instantly."
            },
            {
                id: 113,
                question: "What is the Krebs cycle?",
                options: ["Cell division", "Cellular respiration process", "Photosynthesis", "DNA replication"],
                correctAnswer: 1,
                explanation: "The Krebs cycle is a series of chemical reactions in cellular respiration that generates energy."
            },
            {
                id: 114,
                question: "What is Schrödinger's equation used for?",
                options: ["Classical mechanics", "Quantum mechanics wave function", "Thermodynamics", "Relativity"],
                correctAnswer: 1,
                explanation: "Schrödinger's equation describes how the quantum state of a physical system changes over time."
            },
            {
                id: 115,
                question: "What is the strong nuclear force?",
                options: ["Gravity", "Force binding atomic nuclei", "Electromagnetic force", "Weak force"],
                correctAnswer: 1,
                explanation: "The strong nuclear force binds protons and neutrons together in atomic nuclei."
            },
            {
                id: 116,
                question: "What is epigenetics?",
                options: ["Gene mutation", "Gene expression changes without DNA changes", "Genetic engineering", "Evolution"],
                correctAnswer: 1,
                explanation: "Epigenetics studies heritable changes in gene expression that don't involve changes to DNA sequence."
            },
            {
                id: 117,
                question: "What is the Carnot cycle?",
                options: ["Chemical reaction", "Idealized thermodynamic cycle", "Biological process", "Nuclear reaction"],
                correctAnswer: 1,
                explanation: "The Carnot cycle is an idealized thermodynamic cycle that represents the most efficient heat engine."
            },
            {
                id: 118,
                question: "What is supersymmetry?",
                options: ["Crystal structure", "Theoretical particle physics symmetry", "Chemical bonding", "Biological symmetry"],
                correctAnswer: 1,
                explanation: "Supersymmetry is a theoretical framework proposing a symmetry between fermions and bosons."
            },
            {
                id: 119,
                question: "What is the Higgs mechanism?",
                options: ["DNA replication", "Gives particles mass", "Chemical reaction", "Cell division"],
                correctAnswer: 1,
                explanation: "The Higgs mechanism explains how elementary particles acquire mass through the Higgs field."
            },
            {
                id: 120,
                question: "What is CRISPR?",
                options: ["A protein", "Gene-editing technology", "A virus", "A microscope"],
                correctAnswer: 1,
                explanation: "CRISPR is a revolutionary gene-editing technology that allows precise modification of DNA."
            }
        ]
    }
};

// Function to get questions by topic and difficulty
export const getQuestions = (topic, difficulty, count = 10) => {
    const questions = mockQuestions[topic]?.[difficulty] || [];
    return questions.slice(0, count);
};

// Function to get all topics
export const getTopics = () => Object.keys(mockQuestions);

// Function to get difficulties
export const getDifficulties = () => ['Easy', 'Medium', 'Hard'];
