const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CONTROLLA CHE QUESTA CHIAVE SIA CORRETTA
const genAI = new GoogleGenerativeAI("LA_TUA_CHIAVE_QUI");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        // Mandiamo la risposta in modo che l'app la legga sicuramente
        res.json({ reply: text });
        
    } catch (error) {
        console.error("Errore Gemini:", error);
        res.json({ reply: "Errore della chiave API o di Google. Controlla i log su Render!" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server online`);
});
