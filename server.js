const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyC0_Ofna61ohDgFQ614i6_2AsLrGyQyxZo");

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(req.body.message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        // Questo ci dirà esattamente qual è il problema!
        res.json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Server ok`));


