const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Ho inserito la tua chiave qui sotto
const genAI = new GoogleGenerativeAI("AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        // Uso il nome corretto del modello per la versione v1
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log("Server in ascolto");
});
