const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// La tua chiave è già qui
const genAI = new GoogleGenerativeAI("AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // PROVIAMO QUESTA VERSIONE CHE È LA PIÙ COMPATIBILE
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        // Se dà ancora errore, lo mandiamo indietro per leggerlo
        res.json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log("Server online");
});
