const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'mock_db.sqlite');
const db = new sqlite3.Database(dbPath);

const initDB = () => {
    db.serialize(() => {
        // Create Tables
        db.run(`CREATE TABLE IF NOT EXISTS tips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            content TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            answer TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS tools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            type TEXT
        )`);

        // Seed data if empty
        db.get("SELECT COUNT(*) as count FROM tips", (err, row) => {
            if (row && row.count === 0) {
                const dummyTips = [
                    { t: "Proper Mortar Mix", c: "Masonry", cnt: "A common bricklaying mortar mix is 1 part cement, 1 part lime, and 6 parts sand." },
                    { t: "Concrete Slump Test", c: "Concrete", cnt: "A slump test measures consistency of fresh concrete before it sets. Target slump depends on the application, usually 3-5 inches for slabs." },
                    { t: "Roof Pitch Calculation", c: "Roofing", cnt: "Roof pitch is calculated by the number of inches it rises vertically for every 12 inches it extends horizontally." },
                    { t: "Stud Spacing", c: "Framing", cnt: "Standard wall stud spacing is typically 16 inches or 24 inches on center." },
                    { t: "Ladder Safety", c: "Safety", cnt: "Use the 4-to-1 rule for ladders: For every 4 feet of height to the point of support, the base should be 1 foot away from the wall." },
                    // Generating additional realistic construction tips
                    { t: "Rebar Tying", c: "Concrete", cnt: "Overlap rebar by at least 40 times its diameter when splicing." },
                    { t: "Brick Coursing", c: "Masonry", cnt: "Check the level and plumb of your brickwork every three to four courses." },
                    { t: "Flashing Installation", c: "Roofing", cnt: "Always install step flashing starting from the bottom to allow water to shed downwards." },
                    { t: "Nail Gun Safety", c: "Safety", cnt: "Disconnect the air hose before clearing a jam or performing maintenance on a nail gun." },
                    { t: "Drywall Screws", c: "Framing", cnt: "Screws should be placed every 16 inches on edges and 12 inches in the field of the drywall." },
                    { t: "Vapor Barrier", c: "Framing", cnt: "Install vapor barriers on the warm side of the insulation." },
                    { t: "Curing Concrete", c: "Concrete", cnt: "Moist cure concrete for at least 7 days to reach maximum strength." },
                    { t: "Mortar Board Prep", c: "Masonry", cnt: "Wet your mortar board before applying mortar to prevent it from drying out too fast." },
                    { t: "Roof Ventilation", c: "Roofing", cnt: "Ensure 1 sq ft of net free ventilation area for every 300 sq ft of attic floor space." },
                    { t: "Hearing Protection", c: "Safety", cnt: "Wear ear protection when noise exceeds 85 decibels." },
                    { t: "Squaring a Foundation", c: "Concrete", cnt: "Use the 3-4-5 rule to ensure corners are perfectly square (90 degrees)." },
                    { t: "Control Joints", c: "Concrete", cnt: "Place control joints in concrete slabs at distances 2 to 3 times the slab thickness in inches (in feet)." },
                    { t: "Tuckpointing", c: "Masonry", cnt: "Remove at least 3/4 inch of old mortar before repointing for a solid bond." },
                    { t: "Shingle Overhang", c: "Roofing", cnt: "Roofing shingles should overhang the drip edge by 1/4 to 3/4 inch." },
                    { t: "Joist Hangers", c: "Framing", cnt: "Fill every hole in a joist hanger with the manufacturer-specified nails." },
                    { t: "Hardhat Expiration", c: "Safety", cnt: "Most hardhats should be replaced every 5 years, or immediately if struck." },
                    { t: "Mixing Quikrete", c: "Concrete", cnt: "Add water gradually; concrete is easier to fix if it's too dry than too wet." },
                    { t: "Brick Weep Holes", c: "Masonry", cnt: "Install weep holes at the base of a brick veneer wall every 16 to 24 inches to allow moisture escape." },
                    { t: "Ice and Water Shield", c: "Roofing", cnt: "Extend ice and water shield at least 24 inches inside the interior wall line." },
                    { t: "Header Sizing", c: "Framing", cnt: "A general rule of thumb for headers is 1 inch of depth for every foot of span, but always check local codes." },
                    { t: "Scaffold Tags", c: "Safety", cnt: "Green tag means safe, yellow means caution/modifications, red means do not use." },
                    { t: "Pouring in Cold Weather", c: "Concrete", cnt: "Use accelerators or blankets if pouring concrete below 40°F (4°C)." },
                    { t: "Mortar Coloring", c: "Masonry", cnt: "Mix the pigment with the dry cement and sand before adding water for a uniform color." },
                    { t: "Underlayment Overlap", c: "Roofing", cnt: "Overlap roofing underlayment by at least 2 inches horizontally and 6 inches vertically." },
                    { t: "Fireblocking", c: "Framing", cnt: "Install fireblocking in concealed spaces of wood-framed walls every 10 feet vertically." }
                ];

                const stmt = db.prepare("INSERT INTO tips (title, category, content) VALUES (?, ?, ?)");
                dummyTips.forEach(tip => stmt.run(tip.t, tip.c, tip.cnt));
                stmt.finalize();
                console.log("Mock DB seeded with Tips.");
            }
        });

        db.get("SELECT COUNT(*) as count FROM history", (err, row) => {
            if (row && row.count === 0) {
                const dummyHistory = [
                    { q: "How many bricks for a 10x10 wall?", a: "For a standard 10x10 ft wall using standard modular bricks (approx 7 bricks per sq ft), you will need roughly 700 bricks. Don't forget to account for 5% waste!" },
                    { q: "Mortar mix ratio for brickwork", a: "Standard Type N mortar (for general use) is typically 1 part Portland cement, 1 part hydrated lime, and 6 parts sand." },
                    { q: "Concrete curing time", a: "Concrete typically sets in 24-48 hours enough to walk on, but it takes 28 days to reach its full rated strength." }
                ];
                
                const stmt = db.prepare("INSERT INTO history (question, answer) VALUES (?, ?)");
                dummyHistory.forEach(h => stmt.run(h.q, h.a));
                stmt.finalize();
                console.log("Mock DB seeded with past AI questions.");
            }
        });

        db.get("SELECT COUNT(*) as count FROM tools", (err, row) => {
            if (row && row.count === 0) {
                const dummyTools = [
                    { n: "Brick Estimator", d: "Calculate total bricks based on wall dimensions.", t: "masonry" },
                    { n: "Mortar Mix Calculator", d: "Calculate bags of cement and sand required.", t: "masonry" },
                    { n: "Concrete Slate / Area", d: "Calculate cubic yards for a poured concrete slab.", t: "concrete" },
                    { n: "Stud Calculator", d: "Estimate wall studs at 16 or 24 OC.", t: "framing" },
                    { n: "Roofing Square Calculator", d: "Estimate shingles needed for a roof area.", t: "roofing" },
                ];
                const stmt = db.prepare("INSERT INTO tools (name, description, type) VALUES (?, ?, ?)");
                dummyTools.forEach(t => stmt.run(t.n, t.d, t.t));
                stmt.finalize();
                console.log("Mock DB seeded with Tools.");
            }
        });

    });
};

module.exports = {
    db,
    initDB
};
