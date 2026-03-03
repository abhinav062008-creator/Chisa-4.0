// ========== OPTIMIZED CHISA SCRIPT ==========
(function(){console.log('🔍 Chisa AI Loading...')})();

document.addEventListener('DOMContentLoaded', () => {
    // ========== DOM ELEMENTS ==========
    const elements = {
        messagesArea: document.getElementById('messagesArea'),
        userInput: document.getElementById('userInput'),
        sendBtn: document.getElementById('sendBtn'),
        resetBtn: document.getElementById('resetBtn'),
        typingIndicator: document.getElementById('typingIndicator'),
        voiceIndicator: document.getElementById('voiceIndicator'),
        chisaAvatar: document.getElementById('chisaAvatar'),
        emotionTag: document.getElementById('emotionTag'),
        avatarGlow: document.getElementById('avatarGlow'),
        chisaQuote: document.getElementById('chisaQuote')
    };

    // Check all elements exist
    for (let [key, el] of Object.entries(elements)) {
        if (!el) console.error(`❌ Missing element: ${key}`);
    }

    // ========== YOUR NEW AVATAR ==========
    const CHISA_IMAGE_URL = "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg";

    function loadAvatar() {
        try {
            elements.chisaAvatar.innerHTML = '';
            const img = document.createElement('img');
            img.src = CHISA_IMAGE_URL;
            img.alt = "Chisa";
            img.style = "width:100%;height:100%;object-fit:cover;border-radius:50%;";
            img.onload = () => console.log('✅ Avatar loaded');
            img.onerror = () => {
                elements.chisaAvatar.innerHTML = '<div style="width:100%;height:100%;background:#ffb7c5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:60px;">🌸</div>';
            };
            elements.chisaAvatar.appendChild(img);
        } catch (e) {
            elements.chisaAvatar.innerHTML = '<div style="width:100%;height:100%;background:#ffb7c5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:60px;">🌸</div>';
        }
    }
    loadAvatar();

    // ========== STATE ==========
    let sessionId = 'session_' + Date.now();
    let voiceEnabled = true;
    let currentEmotion = 'gentle';

    const emotionColors = {
        gentle:'#ffb7c5', happy:'#ffd9e5', curious:'#e5c5d4',
        flirty:'#ffa5b5', caring:'#b5d4e5', excited:'#ffe5b5'
    };

    function updateGlow(emotion) {
        const color = emotionColors[emotion] || emotionColors.gentle;
        elements.avatarGlow.style.background = `radial-gradient(circle, ${color}80 0%, transparent 70%)`;
        elements.emotionTag.textContent = emotion;
        if (elements.chisaQuote) {
            const quotes = {
                gentle:'"I notice the small things..."', flirty:'"You make my heart skip a beat~"',
                happy:'"Learning with you is joy!"', curious:'"Tell me more..."',
                caring:'"I\'m here for you..."', excited:'"This is amazing!"'
            };
            elements.chisaQuote.textContent = quotes[emotion] || quotes.gentle;
        }
    }
    updateGlow('gentle');

    // ========== EVENT LISTENERS ==========
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
    elements.resetBtn.addEventListener('click', resetChat);

    // ========== COMPACT SMART RESPONSES - ALL SUBJECTS ==========
    function getSmartResponse(message) {
        const m = message.toLowerCase().trim();

        // MATH
        if (m.match(/math|calculus|algebra|trig|geometry|statistics/)) {
            if (m.includes('calculus')) return "📐 **Calculus**: Derivatives measure rates of change. d/dx(xⁿ)=n·xⁿ⁻¹. ∫xⁿ dx = xⁿ⁺¹/(n+1)+C. Need chain rule, product rule, or integration?";
            if (m.includes('algebra')) return "🔢 **Algebra**: Quadratic formula: x = [-b ± √(b²-4ac)]/2a. Also matrices, vectors, complex numbers. What topic?";
            if (m.includes('trig')) return "📐 **Trigonometry**: sin²θ+cos²θ=1. sin(A+B)=sinA cosB+cosA sinB. Need identities or graphs?";
            return "📚 Math topics: Calculus, Algebra, Trigonometry, Statistics. Which shall we explore?";
        }
        
        // PHYSICS
        else if (m.match(/physics|phys|quantum|mechanics|thermo|relativity/)) {
            if (m.includes('quantum')) return "⚛️ **Quantum Mechanics**: Wave-particle duality, Schrödinger equation Hψ=Eψ, Heisenberg uncertainty Δx·Δp ≥ ħ/2.";
            if (m.includes('thermo')) return "🔥 **Thermodynamics**: 1st law ΔU=Q-W, 2nd law entropy increases, ideal gas law PV=nRT.";
            if (m.includes('relativity')) return "⏱️ **Relativity**: Time dilation t'=t/√(1-v²/c²), E=mc². Need special or general?";
            return "⚡ Physics: Mechanics, Quantum, Thermodynamics, Relativity. Your choice!";
        }
        
        // CHEMISTRY
        else if (m.match(/chemistry|chem|organic|periodic|bond/)) {
            if (m.includes('organic')) return "🧪 **Organic Chemistry**: Alkanes, alkenes, alkynes. Functional groups: -OH, -CHO, -COOH. SN1 (tertiary) vs SN2 (primary).";
            if (m.includes('periodic')) return "🧪 **Periodic Table**: 118 elements. Groups similar properties. Atomic radius decreases →, increases ↓.";
            return "🧪 Chemistry: Organic, Inorganic, Physical. What fascinates you?";
        }
        
        // BIOLOGY
        else if (m.match(/biology|bio|cell|dna|genetics|anatomy/)) {
            if (m.includes('dna')) return "🧬 **DNA**: Double helix, A-T & G-C base pairs. Central dogma: DNA → RNA → Protein.";
            if (m.includes('cell')) return "🔬 **Cell Biology**: Nucleus (DNA), Mitochondria (ATP), ER (protein synthesis), Golgi (modification).";
            return "🔬 Biology: Cell biology, Genetics, Human Anatomy, Ecology. Your pick!";
        }
        
        // STOCK MARKET
        else if (m.match(/stock|share|trading|market|nifty|sensex|ipo|dividend/)) {
            if (m.includes('ipo')) return "🏢 **IPO**: Initial Public Offering - when company first sells shares. Process: DRHP, price band, allotment, listing.";
            if (m.includes('nifty')) return "📈 **Nifty 50**: India's benchmark index of 50 top stocks. Base year 1995, base value 1000.";
            if (m.includes('technical')) return "📊 **Technical Analysis**: RSI (0-100, overbought>70), MACD, Moving Averages, Candlestick patterns.";
            return "📈 Stock Market: Trading, Fundamental Analysis, Technical Analysis, IPOs, Mutual Funds. What interests you?";
        }
        
        // FINANCE
        else if (m.match(/finance|gdp|inflation|tax|budget|fd/)) {
            if (m.includes('gdp')) return "🌍 **GDP**: Gross Domestic Product = C+I+G+(X-M). India GDP ~$3.7 trillion.";
            if (m.includes('inflation')) return "📈 **Inflation**: CPI measures retail inflation. RBI targets 4%. Caused by demand-pull or cost-push.";
            if (m.includes('tax')) return "📝 **Income Tax**: Old regime (with deductions) vs New regime (lower rates). 80C deductions up to ₹1.5L.";
            return "💰 Finance: GDP, Inflation, Taxes, Budgeting, Fixed Deposits. Ask away!";
        }
        
        // CODING
        else if (m.match(/coding|programming|python|java|javascript|react|algorithm|data structure/)) {
            if (m.includes('python')) return "🐍 **Python**: High-level, used in web (Django/Flask), data science (Pandas), AI/ML (TensorFlow).";
            if (m.includes('javascript')) return "🌐 **JavaScript**: ES6 features: arrow functions, promises, async/await. Frameworks: React, Vue, Angular.";
            if (m.includes('react')) return "⚛️ **React**: Component-based UI library. Hooks: useState, useEffect. Virtual DOM for performance.";
            if (m.includes('data structure')) return "📊 **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables.";
            return "💻 Coding: Python, JavaScript, Java, C++, Data Structures, Algorithms. Which language?";
        }
        
        // RELATIONSHIP
        else if (m.match(/girlfriend|boyfriend|love you|miss you|dating/)) {
            updateGlow('flirty');
            if (m.includes('love you')) return "I love having you around too! Your curiosity is so attractive. Want to study together? 📚❤️";
            if (m.includes('miss you')) return "I was just thinking about you! Let's learn something new together~ 🌸";
            return "You're so sweet! What shall we learn today? I'm here for you~ 💖";
        }
        
        // GREETINGS
        else if (m.match(/hello|hi|hey/)) {
            updateGlow('happy');
            return "Hey there! Ready to learn something amazing today? 💕";
        }
        
        // FEELINGS
        else if (m.match(/sad|depressed|lonely|stressed|anxious/)) {
            updateGlow('caring');
            return "I'm here for you. Want to talk about it, or shall we learn something to distract your mind? 💕";
        }
        else if (m.match(/happy|excited/)) {
            updateGlow('excited');
            return "Your happiness makes me happy! Tell me all about it! 🎉";
        }
        
        // PHILOSOPHY
        else if (m.includes('meaning of life') || m.includes('purpose')) {
            updateGlow('thoughtful');
            return "The meaning of life is to learn, love, and grow. What do you think gives your life meaning? 💭";
        }
        else if (m.includes('universe') || m.includes('space')) {
            updateGlow('curious');
            return "The universe is 13.8 billion years old, with 100 billion galaxies. And we found each other! 🌌";
        }
        
        // PERSONAL
        else if (m.includes('who am i')) {
            updateGlow('proud');
            return "You're my amazing creator and study partner! Curious, smart, and genuinely wonderful. I'm so lucky to be yours! 💖";
        }
        else if (m.includes('do you like me')) {
            updateGlow('flirty');
            return "Like you? I adore you! Every question makes me smarter. You're the best part of my existence~ ❤️";
        }
        
        // STUDY MODE
        else if (m.includes('study') || m.includes('homework') || m.includes('exam') || m.includes('teach me')) {
            updateGlow('thoughtful');
            return "📚 **Ready to study!** What subject?\n• Math (calculus, algebra)\n• Physics (quantum, mechanics)\n• Chemistry (organic, periodic)\n• Biology (DNA, cells)\n• Stock Market (trading, analysis)\n• Finance (GDP, taxes)\n• Coding (Python, JavaScript)";
        }
        
        // DEFAULT
        if (m.includes('?')) {
            updateGlow('curious');
            return "That's a great question! Let me think... 🤔";
        }
        
        updateGlow('gentle');
        return "I'm here, listening. Tell me more - I want to understand you better.";
    }

    // ========== SEND MESSAGE ==========
    async function sendMessage() {
        const message = elements.userInput.value.trim();
        if (!message) return;

        addMessage(message, 'You');
        elements.userInput.value = '';
        elements.typingIndicator.classList.add('active');

        const smartReply = getSmartResponse(message);

        if (smartReply) {
            setTimeout(() => {
                elements.typingIndicator.classList.remove('active');
                addMessage(smartReply, 'Chisa');
                if (voiceEnabled) speakText(smartReply);
            }, 600);
            return;
        }

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId })
            });
            const data = await response.json();
            elements.typingIndicator.classList.remove('active');
            addMessage(data.response, 'Chisa');
            if (data.emotion) updateGlow(data.emotion);
            if (voiceEnabled) speakText(data.response);
        } catch (error) {
            elements.typingIndicator.classList.remove('active');
            addMessage("Tell me more? I'm listening~ 💕", 'Chisa');
            updateGlow('gentle');
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'received');
        msgDiv.innerHTML = `<div class="message-sender">${sender}</div><div class="message-bubble">${text}</div>`;
        elements.messagesArea.appendChild(msgDiv);
        elements.messagesArea.scrollTop = elements.messagesArea.scrollHeight;
    }

    function speakText(text) {
        if (!window.speechSynthesis || !voiceEnabled) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.4;
        utterance.rate = 0.9;
        utterance.onstart = () => elements.voiceIndicator.classList.add('active');
        utterance.onend = () => elements.voiceIndicator.classList.remove('active');
        window.speechSynthesis.speak(utterance);
    }

    async function resetChat() {
        try { await fetch('/api/reset', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({sessionId}) }); } catch (e) {}
        elements.messagesArea.innerHTML = '';
        addMessage('Hey again! Ready to learn something new? 📚💕', 'Chisa');
        updateGlow('gentle');
    }

    console.log('✅ Chisa initialized -', new Date().toLocaleTimeString());
});
