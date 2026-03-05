const express = require('express');
const cors = require('cors');
const { db, initDB } = require('./database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Database
initDB();

// ====== MOCK AI SERVICE ======
const generateMockAIResponse = (question) => {
    const qLower = question.toLowerCase();

    // Simple matching for mock logic
    if (qLower.includes('brick') && qLower.includes('10x10')) {
        return "Answer\nA standard 10x10 ft wall is 100 square feet. Using standard modular bricks (which usually require 7 bricks per square foot), you will need roughly 700 bricks.\n\nExplanation\nModular bricks are meant to be laid with a 3/8-inch mortar joint, measuring 3-5/8 x 2-1/4 x 7-5/8 inches.\n\nInstructions\n1. Multiply dimensions to find total square footage: 10 ft x 10 ft = 100 sq ft.\n2. Multiply by standard brick multiplier: 100 x 7 = 700 bricks.\n3. Always order 5% - 10% extra for waste and breakage.";
    }

    if (qLower.includes('mortar') && qLower.includes('ratio')) {
        return "Answer\nA standard residential bricklaying mortar mix ratio is 1:1:6.\n\nExplanation\nThis means 1 part Portland cement, 1 part hydrated lime, and 6 parts masonry sand.\n\nInstructions\n1. Measure 1 bucket of Portland cement.\n2. Measure 1 bucket of hydrated lime.\n3. Measure 6 buckets of clean masonry sand.\n4. Mix dry ingredients thoroughly, then gradually add clean water until a smooth, workable consistency is reached (often described as holding its shape on a trowel without dripping).";
    }

    if (qLower.includes('cure') || qLower.includes('curing')) {
        return "Answer\nConcrete typically takes 28 days to fully cure and reach its maximum rated strength.\n\nExplanation\nWhile it is often hard enough to walk on comfortably within 24 to 48 hours, the chemical curing process continues for weeks.\n\nInstructions\n1. Pour and finish the concrete.\n2. Keep the surface moist for at least the first 7 days (using sprinklers, wet burlap, or curing compounds).\n3. Avoid heavy loads (like driving vehicles on it) for at least 7 days, ideally 28 days.";
    }

    // Fallback response for any other question
    return `Answer\nBased on general construction standards, I recommend consulting the specific project blueprints, local building codes, or structural engineer's plan.\n\nExplanation\nAs an AI, if I don't recognize specific metrics like those in your query ("${question}"), defaulting to safety and standard code is paramount on the job site.\n\nInstructions\n1. Consult the foreman.\n2. Check the approved architectural drawings.\n3. Verify your measurements twice before cutting or pouring.`;
};

// ====== API Endpoints ======

// 1. Chat AI Endpoint
app.post('/api/chat', (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    // Mock API processing time delay
    setTimeout(() => {
        const answer = generateMockAIResponse(question);

        // Save to history
        const stmt = db.prepare("INSERT INTO history (question, answer) VALUES (?, ?)");
        stmt.run(question, answer, function (err) {
            if (err) {
                console.error("Error saving history", err);
            }
            res.json({ answer, historyId: this.lastID });
        });
        stmt.finalize();
    }, 1500); // 1.5s delay to mimic network & processing
});

// 2. Knowledge Base Endpoints
app.get('/api/kb', (req, res) => {
    const search = req.query.q;
    let query = "SELECT * FROM tips";
    let params = [];

    if (search) {
        query += " WHERE title LIKE ? OR content LIKE ? OR category LIKE ?";
        const term = `%${search}%`;
        params = [term, term, term];
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/kb', (req, res) => {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
        return res.status(400).json({ error: "Missing fields" });
    }
    const stmt = db.prepare("INSERT INTO tips (title, category, content) VALUES (?, ?, ?)");
    stmt.run(title, category, content, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, success: true });
    });
    stmt.finalize();
});

// 3. Tools List
app.get('/api/tools', (req, res) => {
    db.all("SELECT * FROM tools", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 4. Past Questions (History)
app.get('/api/history', (req, res) => {
    db.all("SELECT * FROM history ORDER BY id DESC LIMIT 20", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Construction MVP Backend running on port ${PORT}`);
});
