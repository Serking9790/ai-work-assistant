const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo";

app.post('/api/chat', async (req, res) => {
    try {
        // VERSIONE v1beta + GEMINI-1.5-FLASH
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
            // Se c'è ancora un errore, stampiamo l'intero oggetto per capire
            res.json({ error: "Risposta Google: " + JSON.stringify(data) });
        }
    } catch (error) {
        res.json({ error: "Errore Server: " + error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log("Server Pronto"));
