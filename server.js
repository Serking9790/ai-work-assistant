const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Assicurati che tra le virgolette ci sia la tua chiave (inizia con AIza...)
const genAI = new GoogleGenerativeAI("AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        
        // Questo comando è più robusto per estrarre il testo
        const text = response.candidates[0].content.parts[0].text;
        
        res.json({ reply: text });
        
    } catch (error) {
        console.error("Errore dettagliato:", error);
        // Se c'è un errore, lo mandiamo all'app così lo leggi sullo schermo
        res.json({ reply: "Errore: " + error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server online`);
});

