const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permette all'app HTML di parlare col server

//
const genAI = new GoogleGenerativeAI(AIzaSyCGFe5T7F7CZHj6JxnGr1mkr01A6hb_EfI );

app.post('/api/chat', async (req, res) => {
    const { message, lat, lng } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Sei un assistente per le riparazioni. L'utente dice: "${message}". 
            La sua posizione è Lat: ${lat}, Lng: ${lng}.
            1. Analizza se può risolvere da solo. Se sì, dai 3 passi brevi.
            2. Se è un guasto tecnico o pericoloso, scrivi: "SERVE UN PROFESSIONISTA".
            3. Indica la categoria (Idraulico, Meccanico, Elettricista, ecc.).
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ reply: response.text() });

    } catch (error) {
        res.status(500).json({ error: "Errore dell'IA" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server attivo sulla porta ${port}`);
});

