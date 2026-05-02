const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

// INCOLLA LA NUOVA CHIAVE QUI DENTRO
const API_KEY = "AIzaSyCGFe5T7F7CZHj6JxnGr1mkr01A6hb_EfI".trim();

app.post('/api/chat', async (req, res) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: req.body.message }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            res.json({ reply: data.candidates[0].content.parts[0].text });
        } else {
            // Se fallisce, ci facciamo dire DA GOOGLE il motivo vero
            res.json({ error: "Risposta Google: " + (data.error ? data.error.message : JSON.stringify(data)) });
        }
    } catch (error) {
        res.json({ error: "Errore Server: " + error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log("Server Pronto"));
