// Veil's Interactive Magic - 美しい嘘から醜い真実への変化を制御
// "心の色が、嘘をついてる"

class VeilMagic {
    constructor() {
        this.isRevealed = false;
        this.clickCount = 0;
        this.revealThreshold = 3; // 3回クリックで真実が露出
        this.init();
    }

    init() {
        this.addEventListeners();
        this.createParticleEffect();
        this.addEasterEggs();
        console.log('🌟 Veil is watching... "心の色が、嘘をついてる"');
    }

    addEventListeners() {
        // メイン画像のクリックイベント
        const veilImage = document.getElementById('veil-main-image');
        if (veilImage) {
            veilImage.addEventListener('click', (e) => this.handleMainImageClick(e));
        }

        // 引用文のクリックイベント
        const quotes = document.querySelectorAll('.quote-item');
        quotes.forEach(quote => {
            quote.addEventListener('click', (e) => this.handleQuoteClick(e));
        });

        // ギャラリーアイテムのクリックイベント
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleGalleryClick(e));
        });

        // ナビゲーションのクリックイベント
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // ダブルクリックで強制真実露出
        document.addEventListener('dblclick', () => this.forceReveal());

        // スクロールイベント
        window.addEventListener('scroll', () => this.handleScroll());

        // キーボードイベント（隠しコマンド）
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleMainImageClick(e) {
        this.clickCount++;
        this.addClickEffect(e.target);
        
        console.log(`🔍 Click ${this.clickCount}/${this.revealThreshold}: Veil's truth is stirring...`);

        if (this.clickCount === 1) {
            this.showFirstHint();
        } else if (this.clickCount === 2) {
            this.showSecondHint();
        } else if (this.clickCount >= this.revealThreshold) {
            this.revealTruth();
        }
    }

    showFirstHint() {
        this.createMessage("あら...何かが見えてきたわね", "hint");
        this.addGlitchEffect();
    }

    showSecondHint() {
        this.createMessage("もう少しで真実に辿り着けそう...", "hint");
        this.createCrackEffect();
    }

    revealTruth() {
        if (this.isRevealed) return;
        
        console.log('💀 Truth revealed: "Beautiful lies are crumbling..."');
        this.isRevealed = true;
        
        // 真実を露出させるアニメーション
        this.createRevealAnimation();
        
        // CSSクラスを追加して視覚的変化
        document.body.classList.add('truth-revealed');
        
        // メッセージ表示
        this.createMessage("心の色が、嘘をついてる", "truth-revealed");
        
        // 音声効果（あれば）
        this.playSound('reveal');
        
        // ナビゲーションメニューを真実版に変更
        this.updateNavigation();
    }

    forceReveal() {
        console.log('🚀 Force reveal activated!');
        this.clickCount = this.revealThreshold;
        this.revealTruth();
    }

    handleQuoteClick(e) {
        const quote = e.currentTarget;
        const quoteText = quote.querySelector('p').textContent;
        
        // メイン引用文の場合、特別な効果
        if (quote.classList.contains('main-quote')) {
            this.createKaleidoscopeEffect();
            this.createMessage("これが私の真実よ", "special");
        } else {
            this.createMessage(`"${quoteText}" - あなたには何色に見える？`, "quote");
        }
        
        this.addClickEffect(quote);
    }

    handleGalleryClick(e) {
        const item = e.currentTarget;
        this.createMessage("記憶の色が、踊っているわ", "gallery");
        this.addClickEffect(item);
        
        // ギャラリー用特殊エフェクト
        this.createMemoryEffect(item);
    }

    handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        
        if (this.isRevealed) {
            // 真実が露出した後のナビゲーション
            this.createMessage("もう戻れないわよ", "warning");
        } else {
            // 通常のナビゲーション
            this.smoothScroll(target);
        }
    }

    handleScroll() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        if (this.isRevealed) {
            // スクロールに応じてグリッチエフェクトを調整
            this.adjustGlitchIntensity(scrollPercent);
        }
    }

    handleKeyboard(e) {
        // 隠しコマンド: "VEIL" と打つと特別なメッセージ
        const key = e.key.toLowerCase();
        if (!this.keySequence) this.keySequence = '';
        
        this.keySequence += key;
        if (this.keySequence.includes('veil')) {
            this.createMessage("よく見つけたわね... 隠者のメッセージよ", "secret");
            this.keySequence = '';
        }
        
        // 10文字以上で リセット
        if (this.keySequence.length > 10) {
            this.keySequence = '';
        }
    }

    createRevealAnimation() {
        // メイン画像にひび割れエフェクト
        const image = document.getElementById('veil-main-image');
        if (image) {
            image.style.animation = 'crack-spread 1s ease-out';
        }
        
        // 画面全体にグリッチエフェクト
        const glitchOverlay = document.getElementById('glitch-overlay');
        const crackOverlay = document.getElementById('crack-overlay');
        
        if (glitchOverlay) glitchOverlay.classList.remove('hidden');
        if (crackOverlay) crackOverlay.classList.remove('hidden');
        
        // 段階的な真実露出
        setTimeout(() => this.revealSecrets(), 500);
        setTimeout(() => this.revealMoreSecrets(), 1000);
        setTimeout(() => this.finalReveal(), 1500);
    }

    revealSecrets() {
        const truthElements = document.querySelectorAll('.truth-content');
        truthElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove('hidden');
                this.addAppearEffect(element);
            }, index * 200);
        });
    }

    revealMoreSecrets() {
        // ナビゲーションメニューを変更
        const navLinks = document.querySelectorAll('.nav-link');
        const truthLabels = ['Truth', 'Memories', 'Lies', 'Exit'];
        
        navLinks.forEach((link, index) => {
            if (truthLabels[index]) {
                link.textContent = truthLabels[index];
                link.style.color = '#ff6b6b';
            }
        });
    }

    finalReveal() {
        this.createMessage("ようこそ、真実の世界へ", "final");
        
        // 背景に特殊パーティクル効果
        this.createTruthParticles();
    }

    updateNavigation() {
        const nav = document.getElementById('nav-menu');
        if (nav && this.isRevealed) {
            nav.style.transform = 'skew(-2deg)';
            nav.style.filter = 'contrast(1.2)';
        }
    }

    createMessage(text, type = 'default') {
        // 既存のメッセージを削除
        const existingMessage = document.getElementById('veil-message');
        if (existingMessage) existingMessage.remove();
        
        // 新しいメッセージを作成
        const message = document.createElement('div');
        message.id = 'veil-message';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            padding: 15px 30px;
            border-radius: 25px;
            font-family: ${type === 'truth-revealed' ? "'Courier New', monospace" : "'Georgia', serif"};
            font-size: 1.1rem;
            color: ${type === 'truth-revealed' || type === 'warning' ? '#ff6b6b' : '#8b5a96'};
            background: ${type === 'truth-revealed' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
            border: 2px solid ${type === 'truth-revealed' || type === 'warning' ? '#ff6b6b' : '#dda0dd'};
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: all 0.5s ease;
            text-align: center;
            max-width: 80%;
        `;
        
        document.body.appendChild(message);
        
        // アニメーション
        setTimeout(() => message.style.opacity = '1', 100);
        
        // 自動削除
        setTimeout(() => {
            if (message.parentNode) {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            }
        }, 3000);
    }

    addClickEffect(element) {
        // クリックエフェクトを追加
        element.style.transform = 'scale(0.95)';
        element.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.filter = '';
        }, 150);
        
        // パーティクル効果
        this.createClickParticles(element);
    }

    addAppearEffect(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    createClickParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${this.isRevealed ? '#ff6b6b' : '#dda0dd'};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
                opacity: 1;
                transition: all 0.6s ease-out;
            `;
            
            document.body.appendChild(particle);
            
            // パーティクルをランダム方向に移動
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            setTimeout(() => {
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = '0';
            }, 50);
            
            setTimeout(() => particle.remove(), 600);
        }
    }

    createParticleEffect() {
        // 背景に浮遊パーティクルを作成
        setInterval(() => {
            if (Math.random() < 0.3) { // 30%の確率
                this.createFloatingParticle();
            }
        }, 2000);
    }

    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${this.isRevealed ? '#ff6b6b' : '#dda0dd'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            transition: all ${Math.random() * 10 + 5}s linear;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.top = '-10px';
            particle.style.left = `${Math.random() * window.innerWidth}px`;
        }, 100);
        
        setTimeout(() => particle.remove(), 15000);
    }

    addGlitchEffect() {
        document.body.style.animation = 'static-noise 0.1s 3';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }

    createCrackEffect() {
        const crackOverlay = document.getElementById('crack-overlay');
        if (crackOverlay) {
            crackOverlay.style.opacity = '0.1';
            crackOverlay.classList.remove('hidden');
            
            setTimeout(() => {
                crackOverlay.style.opacity = '0';
                setTimeout(() => crackOverlay.classList.add('hidden'), 500);
            }, 1000);
        }
    }

    createKaleidoscopeEffect() {
        const image = document.getElementById('veil-main-image');
        if (image) {
            image.style.animation = 'kaleidoscope-spin 2s ease-in-out';
            setTimeout(() => {
                image.style.animation = '';
            }, 2000);
        }
    }

    createMemoryEffect(element) {
        // 記憶の色彩効果
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#e74c3c'];
        let colorIndex = 0;
        
        const interval = setInterval(() => {
            element.style.borderColor = colors[colorIndex];
            element.style.boxShadow = `0 0 20px ${colors[colorIndex]}`;
            colorIndex = (colorIndex + 1) % colors.length;
        }, 200);
        
        setTimeout(() => {
            clearInterval(interval);
            element.style.borderColor = '';
            element.style.boxShadow = '';
        }, 2000);
    }

    smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    adjustGlitchIntensity(intensity) {
        const glitchOverlay = document.getElementById('glitch-overlay');
        if (glitchOverlay && this.isRevealed) {
            glitchOverlay.style.opacity = intensity * 0.2;
        }
    }

    createTruthParticles() {
        // 真実露出後の特殊パーティクル
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSpecialParticle();
            }, i * 100);
        }
    }

    createSpecialParticle() {
        const particle = document.createElement('div');
        particle.textContent = '心';
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 10}px;
            color: #ff6b6b;
            font-family: 'Courier New', monospace;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            opacity: ${Math.random() * 0.8 + 0.2};
            transition: all 3s ease-out;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 100);
        
        setTimeout(() => particle.remove(), 3000);
    }

    playSound(type) {
        // 音声ファイルがあれば再生
        // 現在は console.log でシミュレート
        console.log(`🎵 Playing sound: ${type}`);
    }

    addEasterEggs() {
        // イースターエッグ: 特定の時間にメッセージ
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 0 && hour < 6) {
            setTimeout(() => {
                this.createMessage("深夜の訪問者ね... 夢と現実の境界が薄くなる時間よ", "secret");
            }, 5000);
        }
        
        // イースターエッグ: コナミコマンド風
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.createMessage("隠されたコマンドを発見したのね... Veilは感心しているわ", "secret");
                this.createKaleidoscopeEffect();
                konamiCode = [];
            }
        });
    }
}

// CSS追加でアニメーションを定義
const additionalStyles = `
    @keyframes kaleidoscope-spin {
        0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
        50% { transform: rotate(180deg) scale(1.1); filter: hue-rotate(180deg); }
        100% { transform: rotate(360deg) scale(1); filter: hue-rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ページ読み込み完了後にVeilMagicを初期化
document.addEventListener('DOMContentLoaded', () => {
    window.veilMagic = new VeilMagic();
    
    // デバッグ用のグローバル関数
    window.revealTruth = () => window.veilMagic.forceReveal();
    window.veilMessage = (text) => window.veilMagic.createMessage(text, 'special');
});

// コンソールアート
console.log(`
    ✨ Beautiful Lies ✨
    
    "心の色が、嘘をついてる"
    
    🌟 Veil is watching you...
    💫 Click around to discover the truth
    🔍 Try typing "veil" or use arrow keys
    
    - Created with Claude Code
`);