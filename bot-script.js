document.addEventListener("DOMContentLoaded", () => {
    const botToggle = document.getElementById('bot-toggle');
    const botWindow = document.getElementById('bot-window');
    const msgContainer = document.getElementById('bot-messages');
    const botInput = document.getElementById('bot-input');
    const sendBtn = document.getElementById('bot-send');

    // Toggle Window
    botToggle.addEventListener('click', () => {
        botWindow.classList.toggle('active');
    });

    // Handle Send
    async function sendMessage(text) {
        if (!text.trim()) return;

        // User Message
        appendMessage(text, 'user-msg');
        botInput.value = '';

        // Show Typing
        const typingId = 'typing-' + Date.now();
        appendMessage('AI is thinking...', 'bot-msg typing', typingId);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            
            document.getElementById(typingId).remove();
            appendMessage(data.reply, 'bot-msg');
        } catch (err) {
            document.getElementById(typingId).textContent = "Error connecting to server.";
        }
    }

    function appendMessage(text, className, id = '') {
        const div = document.createElement('div');
        div.className = `msg ${className}`;
        if (id) div.id = id;
        div.textContent = text;
        msgContainer.appendChild(div);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', () => sendMessage(botInput.value));
    botInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(botInput.value);
    });

    // Handle Suggestions
    window.askBot = (topic) => sendMessage(topic);
});