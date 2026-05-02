<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white h-screen flex flex-col p-4">
    
    <header class="p-4 bg-blue-600 text-center font-bold rounded-t-lg shadow-lg">
        AI ASSISTANT 
    </header>

    <div id="box" class="flex-1 overflow-y-auto mb-4 border-x border-b border-gray-700 p-4 bg-gray-800/50 space-y-4">
        <div class="text-gray-400 italic">Sistema pronto. Scrivi un messaggio per iniziare.</div>
    </div>

    <div class="flex gap-2 bg-gray-800 p-2 rounded-lg border border-gray-700">
        <input id="inp" type="text" placeholder="Scrivi qui..." 
            class="flex-1 bg-transparent p-2 outline-none text-white">
        <button onclick="manda()" class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md font-bold transition-all">
            Invia
        </button>
    </div>

    <script>
    async function manda() {
        const i = document.getElementById('inp');
        const b = document.getElementById('box');
        const t = i.value.trim();
        
        if(!t) return;

        // Mostra messaggio utente
        b.innerHTML += `<div class="text-right"><span class="bg-blue-700 p-2 rounded-lg inline-block shadow">Tu: ${t}</span></div>`;
        i.value = "";
        
        // Crea area per la risposta
        const loading = document.createElement("div");
        loading.className = "text-left";
        loading.innerHTML = `<span class="bg-gray-700 p-2 rounded-lg inline-block animate-pulse">...sto interrogando l'IA...</span>`;
        b.appendChild(loading);
        b.scrollTop = b.scrollHeight;

        try {
            // Indirizzo del tuo server su Render
            const linkRender = "https://ai-work-assistant-1.onrender.com/api/chat";
            
            const r = await fetch(linkRender, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: t})
            });
            
            const d = await r.json();

            // Mostra la risposta o l'errore specifico di Google
            if (d.reply) {
                loading.innerHTML = `<span class="bg-gray-700 p-3 rounded-lg inline-block border border-blue-500 shadow-blue-900/20 shadow-lg">${d.reply}</span>`;
            } else if (d.error) {
                loading.innerHTML = `<span class="bg-red-900/30 text-red-400 p-3 rounded-lg inline-block border border-red-800">Errore Google: ${JSON.stringify(d.error)}</span>`;
            } else {
                loading.innerHTML = `<span class="bg-yellow-900/30 text-yellow-400 p-3 rounded-lg inline-block border border-yellow-800">Risposta strana: ${JSON.stringify(d)}</span>`;
            }
            
        } catch (e) {
            loading.innerHTML = `<span class="text-red-500 bg-red-900/20 p-2 rounded border border-red-900">Errore di connessione: ${e.message}. Assicurati che Render sia "Live"!</span>`;
        }
        
        b.scrollTop = b.scrollHeight;
    }

    // Invia con il tasto Invio della tastiera
    document.getElementById('inp').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') manda();
    });
    </script>
</body>
</html>
