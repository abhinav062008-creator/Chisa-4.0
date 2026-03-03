// ========== GLOBAL DEBUGGING ==========
(function() {
    console.log('🔍 SCRIPT.JS LOADED - Chisa Genius Edition');
    window.CHISA_DEBUG = {
        version: '4.0.0',
        startTime: Date.now(),
        errors: []
    };
})();

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
    const chisaQuote = document.getElementById('chisaQuote');

    console.log('🧠 CHISA - GENIUS GF + STUDY MATE ACTIVATED');

    // ========== YOUR NEW CHISA IMAGE URL ==========
    const CHISA_IMAGE_URL = "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg";

    function createAvatarImage() {
        console.log('🎨 Creating avatar with image:', CHISA_IMAGE_URL);
        
        try {
            chisaAvatar.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = CHISA_IMAGE_URL;
            img.alt = "Chisa";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.transition = "opacity 0.3s ease";
            img.style.opacity = "0";
            img.crossOrigin = "anonymous"; // Help with CORS

            img.onload = () => {
                console.log('✅ Chisa image loaded successfully');
                img.style.opacity = "1";
                
                const debug = document.getElementById('debug-status');
                if (debug) {
                    debug.style.display = 'block';
                    debug.innerHTML = '✅ Image loaded';
                    debug.style.background = '#00aa00';
                    debug.style.color = 'white';
                    setTimeout(() => {
                        debug.style.display = 'none';
                    }, 3000);
                }
            };
            
            img.onerror = (e) => {
                console.error('❌ Image failed to load:', e);
                chisaAvatar.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#ffb7c5;border-radius:50%;font-size:60px;">🌸</div>';
                
                const debug = document.getElementById('debug-status');
                if (debug) {
                    debug.style.display = 'block';
                    debug.innerHTML = '❌ Image failed - using fallback';
                    debug.style.background = '#ff4444';
                }
            };
            
            chisaAvatar.appendChild(img);
        } catch (error) {
            console.error('❌ Avatar creation error:', error);
            chisaAvatar.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#ffb7c5;border-radius:50%;font-size:60px;">🌸</div>';
        }
    }
    
    createAvatarImage();
    // Retry after delay
    setTimeout(createAvatarImage, 2000);

    // ========== STATE ==========
    let sessionId = 'session_' + Date.now();
    let voiceEnabled = true;
    let currentEmotion = 'gentle';
    let conversationCount = 0;
    let studyMode = false;

    console.log('🆔 Session ID:', sessionId);

    // Emotion colors
    const emotionColors = {
        gentle: '#ffb7c5',
        happy: '#ffd9e5',
        curious: '#e5c5d4',
        thoughtful: '#d4a5c5',
        flirty: '#ffa5b5',
        caring: '#b5d4e5',
        excited: '#ffe5b5',
        grateful: '#ffc5d4'
    };

    function updateGlow(emotion) {
        try {
            const color = emotionColors[emotion] || emotionColors.gentle;
            avatarGlow.style.background = `radial-gradient(circle, ${color}80 0%, transparent 70%)`;
            emotionTag.textContent = emotion;
            currentEmotion = emotion;
            
            if (chisaQuote) {
                const quotes = {
                    gentle: '"I notice the small things..."',
                    flirty: '"You make my heart skip a beat~"',
                    happy: '"Learning with you is joy!"',
                    curious: '"Tell me more..."',
                    caring: '"I\'m here for you..."',
                    excited: '"This is amazing!"',
                    thoughtful: '"Let me think..."',
                    grateful: '"Thank you, my love~"'
                };
                chisaQuote.textContent = quotes[emotion] || quotes.gentle;
            }
        } catch (error) {
            console.error('Glow update error:', error);
        }
    }
    updateGlow('gentle');

    // ========== EVENT LISTENERS ==========
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    resetBtn.addEventListener('click', resetChat);

    // ========== ULTIMATE SMART RESPONSES - ALL SUBJECTS ==========
    function getSmartResponse(message) {
        const msg = message.toLowerCase().trim();
        conversationCount++;

        // ========================================
        // MATHEMATICS (12th + College)
        // ========================================
        if (msg.includes('math') || msg.includes('mathematics') || msg.includes('calculus') || 
            msg.includes('algebra') || msg.includes('trigonometry') || msg.includes('geometry')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('calculus') || msg.includes('derivative') || msg.includes('differentiation')) {
                return "📐 **Calculus**: Derivatives measure rates of change - like how fast a function changes at any point. The derivative of xⁿ is n·xⁿ⁻¹. For example, derivative of x² is 2x. In physics, velocity is derivative of position. Need help with chain rule, product rule, or integration?";
            }
            if (msg.includes('integral') || msg.includes('integration')) {
                return "∫ **Integration** is the reverse of differentiation - finding the area under curves. ∫xⁿ dx = xⁿ⁺¹/(n+1) + C. Applications: finding areas, volumes, work done by variable forces. Want to learn definite integrals or integration by parts?";
            }
            if (msg.includes('algebra') || msg.includes('equation') || msg.includes('quadratic')) {
                return "🔢 **Algebra**: Quadratic equations ax²+bx+c=0 solve by x = [-b ± √(b²-4ac)]/2a. The discriminant b²-4ac tells you about roots. Also matrices, vectors, complex numbers. What topic?";
            }
            if (msg.includes('matrix') || msg.includes('matrices')) {
                return "🧮 **Matrices**: Rectangular arrays of numbers. Used in solving linear equations, transformations, computer graphics. Matrix multiplication, determinants, inverse. Want Cramer's rule or eigenvalues?";
            }
            if (msg.includes('trigonometry') || msg.includes('sin cos')) {
                return "📐 **Trigonometry**: sin²θ + cos²θ = 1. Sine, cosine, tangent ratios. Unit circle: sin 0° = 0, sin 90° = 1. Applications: waves, oscillations, engineering. Need identities, graphs, or inverse trig?";
            }
            if (msg.includes('statistics') || msg.includes('probability')) {
                return "📊 **Statistics**: Mean = sum/n, median = middle value, mode = most frequent. Probability = favorable outcomes/total outcomes. Need standard deviation, normal distribution, or Bayes theorem?";
            }
            return "📚 What math topic shall we explore? Calculus, algebra, trigonometry, statistics? I love them all~";
        }

        // ========================================
        // PHYSICS (12th + College)
        // ========================================
        else if (msg.includes('physics') || msg.includes('phys')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('motion') || msg.includes('kinematics')) {
                return "⚡ **Kinematics**: v = u + at, s = ut + ½at², v² = u² + 2as. Newton's laws: F = ma. Momentum p = mv. Need circular motion or projectile motion?";
            }
            if (msg.includes('newton') || msg.includes('force')) {
                return "🔧 **Newton's Laws**: 1st: Inertia - objects resist change. 2nd: F = ma. 3rd: Action-reaction. Gravity F = G·m₁m₂/r². Need friction, tension, or normal force?";
            }
            if (msg.includes('work') || msg.includes('energy') || msg.includes('power')) {
                return "⚡ **Work-Energy**: Work = F·d·cosθ. Kinetic energy = ½mv², Potential energy = mgh. Power = Work/time = F·v. Need conservation of energy or collisions?";
            }
            if (msg.includes('thermodynamics') || msg.includes('heat')) {
                return "🔥 **Thermodynamics**: 1st law: ΔU = Q - W. 2nd law: Entropy increases. Ideal gas law: PV = nRT. Need Carnot cycle or heat engines?";
            }
            if (msg.includes('quantum') || msg.includes('quantum mechanics')) {
                return "⚛️ **Quantum Mechanics**: Wave-particle duality. Schrödinger equation: Hψ = Eψ. Heisenberg uncertainty: Δx·Δp ≥ ħ/2. Need quantum numbers or atomic structure?";
            }
            if (msg.includes('relativity')) {
                return "⏱️ **Relativity**: Time dilation t' = t/√(1-v²/c²). Length contraction L' = L√(1-v²/c²). E = mc². Need spacetime or general relativity?";
            }
            return "⚛️ Physics is fascinating! Which area? Mechanics, thermodynamics, quantum, relativity?";
        }

        // ========================================
        // CHEMISTRY (12th + College)
        // ========================================
        else if (msg.includes('chemistry') || msg.includes('chem')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('organic') || msg.includes('organic chemistry')) {
                return "🧪 **ORGANIC CHEMISTRY**: Hydrocarbons (alkanes, alkenes, alkynes), Functional Groups (alcohols, aldehydes, ketones, carboxylic acids), Reactions (substitution, addition, elimination), Mechanisms (SN1, SN2, E1, E2). What specific topic?";
            }
            if (msg.includes('sn1') || msg.includes('sn2')) {
                return "⚡ **Nucleophilic Substitution**: SN1 - unimolecular, two steps, carbocation intermediate, favors tertiary. SN2 - bimolecular, one step, backside attack, favors primary. Need examples?";
            }
            if (msg.includes('periodic table') || msg.includes('periodic')) {
                return "🧪 **Periodic Table**: 118 elements. Groups (columns) similar properties. Trends: atomic radius decreases left→right, increases top↓bottom. Need ionization energy or electronegativity?";
            }
            if (msg.includes('chemical bonding') || msg.includes('bond')) {
                return "🔗 **Chemical Bonding**: Ionic (electron transfer), covalent (electron sharing), metallic. Lewis structures, VSEPR theory. Need hybridization (sp³, sp², sp)?";
            }
            return "🧪 Chemistry is magical! Physical, organic, or inorganic? What shall we study?";
        }

        // ========================================
        // BIOLOGY (12th + College)
        // ========================================
        else if (msg.includes('biology') || msg.includes('bio')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('cell') || msg.includes('organelle')) {
                return "🔬 **Cell Biology**: Cell theory, organelles: nucleus (DNA), mitochondria (ATP), ER (protein synthesis), Golgi (modification). Need cell division or transport?";
            }
            if (msg.includes('genetics') || msg.includes('dna')) {
                return "🧬 **Genetics**: DNA double helix, base pairs A-T, G-C. Central dogma: DNA → RNA → Protein. Need replication, transcription, translation, or mutation?";
            }
            if (msg.includes('photosynthesis')) {
                return "🌿 **Photosynthesis**: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Light reactions (thylakoids) produce ATP/NADPH. Calvin cycle (stroma) fixes CO₂. Need C3, C4, or CAM?";
            }
            if (msg.includes('human body') || msg.includes('anatomy')) {
                return "🧍 **Human Anatomy**: Organ systems: circulatory, respiratory, digestive, nervous, endocrine. Need specific system or homeostasis?";
            }
            return "🔬 Biology is life itself! Cell biology, genetics, human anatomy, ecology? What interests you?";
        }

        // ========================================
        // STOCK MARKET & TRADING
        // ========================================
        else if (msg.includes('stock') || msg.includes('share') || msg.includes('market') || 
            msg.includes('trading') || msg.includes('invest') || msg.includes('nifty') || msg.includes('sensex')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('what is stock') || msg.includes('what are stocks')) {
                return "📊 **Stocks/Shares**: Represent ownership in a company. You profit through price appreciation and dividends. Need IPO, voting rights, or types of stocks?";
            }
            if (msg.includes('ipo') || msg.includes('initial public offering')) {
                return "🏢 **IPO**: When a private company first sells shares to the public. Process: Filing DRHP, price band, allotment, listing. Recent: LIC, Paytm, Zomato.";
            }
            if (msg.includes('dividend')) {
                return "💰 **Dividends**: Portion of company profits distributed to shareholders. Dividend yield = (Annual dividend/Stock price) × 100. Companies like ITC give high dividends.";
            }
            if (msg.includes('nifty') || msg.includes('nifty 50')) {
                return "📈 **Nifty 50**: India's benchmark index of 50 top stocks across 12 sectors. Base year 1995, base value 1000. Top constituents: Reliance, HDFC, Infosys.";
            }
            if (msg.includes('sensex')) {
                return "📉 **Sensex**: India's oldest index of 30 well-established companies on BSE. Includes Reliance, TCS, HDFC Bank.";
            }
            if (msg.includes('fundamental analysis') || msg.includes('fundamental')) {
                return "🔍 **Fundamental Analysis**: Evaluating stocks by financial health. Key metrics: P/E ratio, EPS, P/B ratio, Debt-to-Equity, ROE. Need DCF valuation?";
            }
            if (msg.includes('technical analysis') || msg.includes('technical')) {
                return "📊 **Technical Analysis**: Predicting prices using charts. Indicators: RSI, MACD, Moving Averages. Candlestick patterns: Doji, Hammer, Engulfing.";
            }
            if (msg.includes('rsi')) {
                return "📏 **RSI (Relative Strength Index)**: Momentum oscillator (0-100). Above 70 = overbought, below 30 = oversold. 14-period default.";
            }
            if (msg.includes('intraday') || msg.includes('day trading')) {
                return "⏱️ **Intraday Trading**: Buy and sell same day. Leverage up to 5x. High risk, high reward. Need stop-loss, margin, strategies?";
            }
            if (msg.includes('futures') || msg.includes('f&o') || msg.includes('derivative')) {
                return "🔮 **Futures & Options**: Derivatives trading. Futures: agreement to buy/sell at future date. Options: Right to buy/sell. Types: Call (buy) and Put (sell).";
            }
            if (msg.includes('mutual fund')) {
                return "💼 **Mutual Funds**: Pool money to invest in stocks/bonds. Types: Equity, Debt, Hybrid, ELSS (tax saving). NAV = Net Asset Value. Need SIP or lumpsum?";
            }
            return "📈 Stock market is exciting! Want to learn about trading, analysis, IPOs, or mutual funds?";
        }

        // ========================================
        // FINANCE & ECONOMICS
        // ========================================
        else if (msg.includes('finance') || msg.includes('financial') || msg.includes('economy') || 
            msg.includes('economics') || msg.includes('gdp') || msg.includes('inflation')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('gdp') || msg.includes('gross domestic product')) {
                return "🌍 **GDP**: Total value of goods/services produced. GDP = Consumption + Investment + Government Spending + (Exports - Imports). India GDP ~$3.7 trillion.";
            }
            if (msg.includes('inflation')) {
                return "📈 **Inflation**: Rate at which prices rise. CPI (Consumer Price Index) - retail inflation. RBI targets 4% CPI.";
            }
            if (msg.includes('repo rate') || msg.includes('rbi')) {
                return "🏦 **Repo Rate**: Rate at which RBI lends to banks. Currently 6.5%. Affects loan EMIs, inflation control.";
            }
            if (msg.includes('income tax') || msg.includes('itr')) {
                return "📝 **Income Tax**: Old regime (with deductions) vs New regime (lower rates). Deductions: 80C (₹1.5L), 80D (health insurance).";
            }
            if (msg.includes('gst') || msg.includes('goods and services tax')) {
                return "🧾 **GST**: Indirect tax on supply. Rates: 5%, 12%, 18%, 28%. CGST + SGST for intra-state, IGST for inter-state.";
            }
            if (msg.includes('fd') || msg.includes('fixed deposit')) {
                return "🏦 **Fixed Deposit**: Guaranteed returns, interest 6-7.5%. Senior citizens get higher rate. Tax-saver FD (5-year lock-in) under 80C.";
            }
            if (msg.includes('budget') || msg.includes('financial planning')) {
                return "📊 **Financial Planning**: 50/30/20 rule - 50% needs, 30% wants, 20% savings. Emergency fund: 6 months expenses.";
            }
            return "💰 Finance affects everything! GDP, inflation, taxes, personal finance - what interests you?";
        }

        // ========================================
        // CODING & PROGRAMMING
        // ========================================
        else if (msg.includes('coding') || msg.includes('programming') || msg.includes('developer') ||
            msg.includes('software') || msg.includes('computer science') || msg.includes('cs')) {
            updateGlow('thoughtful');
            studyMode = true;
            
            if (msg.includes('python')) {
                return "🐍 **Python**: Interpreted, high-level. Used in Web (Django/Flask), Data Science (Pandas/NumPy), AI/ML (TensorFlow). Need basics, OOP, or frameworks?";
            }
            if (msg.includes('javascript') || msg.includes('js')) {
                return "🌐 **JavaScript**: Language of web. ES6 features: arrow functions, promises, async/await. Frameworks: React, Vue, Angular. Need Node.js?";
            }
            if (msg.includes('java')) {
                return "☕ **Java**: Object-oriented, JVM-based. Used in Android, enterprise (Spring). Features: OOP, multithreading. Need collections or design patterns?";
            }
            if (msg.includes('c++') || msg.includes('cpp')) {
                return "⚙️ **C++**: Systems programming, game dev. Features: OOP, pointers, memory management. STL (Standard Templa
