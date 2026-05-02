const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo";

app.post('/api/chat', async (req, res) => {
    try {
        // Ho cambiato "v1beta" in "v1" -> è più stabile
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: req.body.message }] }]
            })
        });

        const data = await response.json();
        
        // Aggiungiamo un controllo extra per vedere cosa risponde Google se fallisce
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            res.json({ reply: data.candidates[0].content.parts[0].text });
        } else {
            res.json({ error: "Google dice: " + (data.error ? data.error.message : "Nessun contenuto generato") });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log("Server Pronto"));

