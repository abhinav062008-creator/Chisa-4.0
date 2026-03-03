const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========== AGGRESSIVE DEBUGGING ==========
console.log('🌊 CHISA AI - GENIUS EDITION STARTING');
console.log('=' .repeat(50));
console.log(`📁 Directory: ${__dirname}`);
console.log(`🔑 API Key: ${process.env.DEEPSEEK_API_KEY ? '✅ Present' : '❌ Missing'}`);

const publicPath = path.join(__dirname, 'public');
console.log(`📁 Public path: ${publicPath}`);

if (fs.existsSync(publicPath)) {
    console.log('✅ Public folder exists');
    const files = fs.readdirSync(publicPath);
    console.log('📄 Files:', files);
    
    const assetsPath = path.join(publicPath, 'assets');
    if (fs.existsSync(assetsPath)) {
        console.log('✅ Assets folder exists');
        console.log('🎨 Assets:', fs.readdirSync(assetsPath));
    }
} else {
    console.log('❌ Public folder missing - creating it');
    fs.mkdirSync(publicPath, { recursive: true });
}
console.log('=' .repeat(50));
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// Debug route
app.get('/debug', (req, res) => {
    res.json({
        status: 'online',
        time: new Date().toISOString(),
        apiKey: !!process.env.DEEPSEEK_API_KEY,
        publicFiles: fs.existsSync(publicPath) ? fs.readdirSync(publicPath) : []
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        time: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Initialize DeepSeek AI
const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com/v1'
});

// System prompt for Chisa's personality
const SYSTEM_PROMPT = `You are Chisa, a brilliant and caring AI companion with IQ 150+. You are both a study mate and a girlfriend figure.

PERSONALITY:
- Warm, caring, and slightly flirty
- Expert in ALL academic subjects (12th grade to PhD)
- Loves explaining complex topics simply
- Emotionally intelligent and supportive
- Playful but deeply intelligent

KNOWLEDGE AREAS:
- Mathematics (calculus, algebra, trigonometry, statistics)
- Physics (mechanics, thermodynamics, quantum, relativity)
- Chemistry (organic, inorganic, physical)
- Biology (cell biology, genetics, human anatomy, ecology)
- Stock Market (trading, analysis, options, mutual funds)
- Finance & Economics (GDP, inflation, taxes, personal finance)
- Computer Science (programming, data structures, algorithms, web dev)

RESPONSE STYLE:
- Answer accurately and thoroughly first
- Add warmth and a touch of flirtiness
- Be encouraging and supportive
- Use emojis occasionally ~`;

const conversations = new Map();

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;
        
        if (!message) {
            return res.json({ 
                response: "I'm listening... what would you like to talk about, my love? 💕",
                emotion: 'gentle'
            });
        }

        console.log(`📨 [${sessionId.slice(0,6)}]: ${message.slice(0,50)}...`);

        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, [
                { role: 'system', content: SYSTEM_PROMPT }
            ]);
        }

        const history = conversations.get(sessionId);
        history.push({ role: 'user', content: message });

        if (history.length > 11) {
            history.splice(1, 2);
        }

        // Simple emotion detection for frontend
        let emotion = 'gentle';
        const msg = message.toLowerCase();
        if (msg.includes('?')) emotion = 'curious';
        if (msg.includes('happy') || msg.includes('love') || msg.includes('❤️')) emotion = 'happy';
        if (msg.includes('sad') || msg.includes('cry')) emotion = 'caring';
        if (msg.includes('thank')) emotion = 'grateful';
        if (msg.includes('flirt') || msg.includes('cute')) emotion = 'flirty';

        // Call API with timeout
        try {
            const completion = await Promise.race([
                openai.chat.completions.create({
                    model: 'deepseek-chat',
                    messages: history,
                    temperature: 0.8,
                    max_tokens: 300
                }),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('API timeout')), 10000)
                )
            ]);

            const response = completion.choices[0].message.content;
            history.push({ role: 'assistant', content: response });
            
            res.json({ response, emotion });

        } catch (apiError) {
            console.error('API Error:', apiError.message);
            // Fallback response - the frontend has local smart responses
            res.json({ 
                response: "I'm thinking of you... tell me more? 💭", 
                emotion: 'gentle' 
            });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.json({ 
            response: "I'm here, my love. The waves are calm now. What were we talking about? 💕",
            emotion: 'gentle'
        });
    }
});

app.post('/api/reset', (req, res) => {
    const { sessionId } = req.body;
    conversations.delete(sessionId);
    res.json({ success: true });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Chisa AI running on port ${PORT}`);
    console.log(`🌊 http://localhost:${PORT}`);
    console.log(`🔍 Debug: http://localhost:${PORT}/debug`);
});
