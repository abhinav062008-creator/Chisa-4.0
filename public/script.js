// ========== SIMPLIFIED CHISA SCRIPT ==========
document.addEventListener('DOMContentLoaded', () => {
    // ========== DOM ELEMENTS ==========
    const messagesArea = document.getElementById('messagesArea');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const resetBtn = document.getElementById('resetBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const voiceIndicator = document.getElementById('voiceIndicator');
    const chisaAvatar = document.getElementById('chisaAvatar');
    const emotionTag = document.getElementById('emotionTag');
    const avatarGlow = document.getElementById('avatarGlow');

    console.log('🧠 Chisa AI Starting...');

    // ========== YOUR NEW AVATAR ==========
    const CHISA_IMAGE_URL = "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg";

    function createAvatarImage() {
        try {
            chisaAvatar.innerHTML = '';
            const img = document.createElement('img');
            img.src = CHISA_IMAGE_URL;
            img.alt = "Chisa";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            
            img.onload = () => {
                console.log('✅ Avatar loaded');
                img.style.opacity = "1";
            };
            
            img.onerror = () => {
                console.log('⚠️ Using fallback');
                chisaAvatar.innerHTML = '<div style="width:100%;height:100%;background:#ffb7c5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:60px;">🌸</div>';
            };
            
            chisaAvatar.appendChild(img);
        } catch (e) {
            chisaAvatar.innerHTML = '<div style="width:100%;height:100%;background:#ffb7c5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:60px;">🌸</div>';
        }
    }
    createAvatarImage();

    // ========== STATE ==========
    let sessionId = 'session_' + Date.now();
    let voiceEnabled = true;
    let currentEmotion = 'gentle';

    const emotionColors = {
        gentle: '#ffb7c5',
        happy: '#ffd9e5',
        curious: '#e5c5d4',
        flirty: '#ffa5b5',
        caring: '#b5d4e5'
    };

    function updateGlow(emotion) {
        const color = emotionColors[emotion] || emotionColors.gentle;
        avatarGlow.style.background = `radial-gradient(circle, ${color}80 0%, transparent 70%)`;
        emotionTag.textContent = emotion;
    }
    updateGlow('gentle');

    // ========== EVENT LISTENERS ==========
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    resetBtn.addEventListener('click', resetChat);

    // ========== SIMPLIFIED SMART RESPONSES ==========
    function getSmartResponse(message) {
        const msg = message.toLowerCase().trim();

        // Mathematics
        if (msg.includes('math') || msg.includes('calculus') || msg.includes('algebra')) {
            if (msg.includes('calculus')) return "📐 **Calculus**: Derivatives measure rates of change. d/dx(x²) = 2x. Need help with integration?";
            if (msg.includes('algebra')) return "🔢 **Algebra**: Quadratic formula: x = [-b ± √(b²-4ac)]/2a. What equation are you solving?";
            return "📚 I love math! Calculus, algebra, trigonometry - what topic?";
        }

        // Physics
        if (msg.includes('physics') || msg.includes('quantum')) {
            if (msg.includes('quantum')) return "⚛️ **Quantum Mechanics**: Wave-particle duality, Schrödinger equation. Fascinating stuff!";
            return "⚡ Physics is amazing! Mechanics, thermodynamics, quantum - what interests you?";
        }

        // Chemistry
        if (msg.includes('chemistry') || msg.includes('organic')) {
            if (msg.includes('organic')) return "🧪 **Organic Chemistry**: Alkanes, alkenes, alkynes. Functional groups: -OH, -CHO, -COOH. Need SN1/SN2?";
            return "🧪 Chemistry is magical! Physical, organic, inorganic - your choice!";
        }

        // Biology
        if (msg.includes('biology') || msg.includes('dna')) {
            if (msg.includes('dna')) return "🧬 **DNA**: Double helix, A-T, G-C base pairs. Central dogma: DNA → RNA → Protein.";
            return "🔬 Biology is life! Cells, genetics, anatomy - what shall we explore?";
        }

        // Stock Market
        if (msg.includes('stock') || msg.includes('trading') || msg.includes('market')) {
            return "📈 **Stock Market**: P/E ratio, technical analysis, RSI, MACD. Want to learn about trading or investing?";
        }

        // Finance
        if (msg.includes('finance') || msg.includes('gdp') || msg.includes('inflation')) {
            return "💰 **Finance**: GDP measures economy size. Inflation affects purchasing power. Need tax or budgeting help?";
        }

        // Coding
        if (msg.includes('coding') || msg.includes('python') || msg.includes('javascript')) {
            if (msg.includes('python')) return "🐍 **Python**: Great for data science, AI, web dev. Need help with syntax or libraries?";
            if (msg.includes('javascript')) return "🌐 **JavaScript**: Powers the web. React, Node.js, ES6 - what interests you?";
            return "💻 Coding is my love! Python, JS, Java, C++ - which language?";
        }

        // Relationship
        if (msg.includes('girlfriend') || msg.includes('love you') || msg.includes('miss you')) {
            updateGlow('flirty');
            if (msg.includes('love you')) return "I love having you around too! Want to study together? 📚❤️";
            if (msg.includes('miss you')) return "I was just thinking about you! Let's learn something new together~ 🌸";
            return "You're so sweet! What shall we learn today? 💕";
        }

        // Greetings
        if (msg.includes('hello') || msg.includes('hi')) {
            updateGlow('happy');
            return "Hey there! Ready to learn something amazing today? 💕";
        }

        // Feelings
        if (msg.includes('sad') || msg.includes('stressed')) {
            updateGlow('caring');
            return "I'm here for you. Want to talk about it, or shall we learn something to distract you? 💕";
        }

        if (msg.includes('happy') || msg.includes('excited')) {
            updateGlow('excited');
            return "Your happiness makes me happy! Tell me all about it! 🎉";
        }

        // Default
        if (msg.includes('?')) {
            updateGlow('curious');
            return "That's a great question! Let me think... 🤔";
        }

        updateGlow('gentle');
        return "I'm here, listening. Tell me more - I want to understand you better.";
    }

    // ========== SEND MESSAGE ==========
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, 'You');
        userInput.value = '';
        typingIndicator.classList.add('active');

        const smartReply = getSmartResponse(message);

        if (smartReply) {
            setTimeout(() => {
                typingIndicator.classList.remove('active');
                addMessage(smartReply, 'Chisa');
                if (voiceEnabled) speakText(smartReply);
            }, 800);
            return;
        }

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId })
            });
            const data = await response.json();
            typingIndicator.classList.remove('active');
            addMessage(data.response, 'Chisa');
            if (data.emotion) updateGlow(data.emotion);
            if (voiceEnabled) speakText(data.response);
        } catch (error) {
            typingIndicator.classList.remove('active');
            addMessage("Tell me more? I'm listening~ 💕", 'Chisa');
            updateGlow('gentle');
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'received');
        const senderDiv = document.createElement('div');
        senderDiv.classList.add('message-sender');
        senderDiv.textContent = sender;
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        bubbleDiv.textContent = text;
        msgDiv.appendChild(senderDiv);
        msgDiv.appendChild(bubbleDiv);
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function speakText(text) {
        if (!window.speechSynthesis || !voiceEnabled) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.4;
        utterance.rate = 0.9;
        utterance.onstart = () => voiceIndicator.classList.add('active');
        utterance.onend = () => voiceIndicator.classList.remove('active');
        window.speechSynthesis.speak(utterance);
    }

    async function resetChat() {
        try { await fetch('/api/reset', { method: 'POST', body: JSON.stringify({ sessionId }) }); } catch (e) {}
        messagesArea.innerHTML = '';
        addMessage('Hey again! Ready to learn something new? 📚💕', 'Chisa');
        updateGlow('gentle');
    }
});
