// Veil's Interactive Magic - 美しい嘘から醜い真実への変化を制御
// "心の色が、嘘をついてる"

class MirrorShatterSystem {
    constructor(veilMagic) {
        this.veilMagic = veilMagic;
        this.shards = [];
        this.shatteredCount = 0;
        this.totalShards = 20;
        this.autoTriggerThreshold = Math.floor(this.totalShards * 0.6); // 60%で自動発動
        this.isShattered = false;
        this.shatterContainer = null;
    }

    createMirrorShatter() {
        if (this.isShattered) {
            console.log('🪞 Mirror already shattered, skipping...');
            return;
        }
        
        console.log('🪞 Creating mirror shatter effect...');
        this.isShattered = true;
        
        try {
            // コンテナを作成
            console.log('🪞 Step 1: Creating shatter container...');
            this.createShatterContainer();
            
            // ボロノイ図で20個の鏡面を生成
            console.log('🪞 Step 2: Generating 20 voronoi shards...');
            this.generateVoronoiShards();
            
            // 各鏡面にイベントリスナーを追加
            console.log('🪞 Step 3: Adding shard interactions...');
            this.addShardInteractions();
            
            // 鏡の割れる音効果
            console.log('🪞 Step 4: Playing shatter sound...');
            this.playShatterSound();
            
            console.log('🪞 ✅ Mirror shatter system fully initialized!');
            console.log(`🪞 Total shards created: ${this.shards.length}`);
        } catch (error) {
            console.error('❌ Error in createMirrorShatter:', error);
            throw error;
        }
    }

    createShatterContainer() {
        // 既存のコンテナがあれば削除
        const existing = document.getElementById('mirror-shatter-overlay');
        if (existing) {
            existing.remove();
        }
        
        this.shatterContainer = document.createElement('div');
        this.shatterContainer.id = 'mirror-shatter-overlay';
        this.shatterContainer.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 10000 !important;
            pointer-events: auto !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
        `;
        
        console.log('🪞 Container created, appending to body...');
        document.body.appendChild(this.shatterContainer);
        console.log('🪞 Container appended successfully');
    }

    generateVoronoiShards() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        console.log(`🪞 Screen size: ${width}x${height}`);
        
        // ランダムな点を生成（ボロノイ図の中心点）
        const points = [];
        for (let i = 0; i < this.totalShards; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                id: i
            });
        }
        
        console.log(`🪞 Generated ${points.length} points`);
        
        // 各鏡面を作成
        points.forEach((point, index) => {
            try {
                console.log(`🪞 Creating shard ${index + 1}/${this.totalShards}`);
                const shard = this.createShard(point, index, width, height);
                this.shards.push(shard);
                
                if (this.shatterContainer) {
                    this.shatterContainer.appendChild(shard.element);
                    console.log(`🪞 Shard ${index + 1} added to container`);
                } else {
                    console.error('❌ Shatter container is null!');
                }
            } catch (error) {
                console.error(`❌ Error creating shard ${index}:`, error);
            }
        });
        
        console.log(`🪞 Total shards created: ${this.shards.length}`);
    }

    createShard(centerPoint, index, screenWidth, screenHeight) {
        // 不規則な多角形鏡面（より鏡らしく）
        const shardPath = this.calculateShardPath(centerPoint, index, screenWidth, screenHeight);
        const shardSize = 160 + Math.random() * 80; // サイズを大きく
        
        const shardElement = document.createElement('div');
        shardElement.className = 'mirror-shard';
        shardElement.dataset.shardId = index;
        shardElement.style.cssText = `
            position: absolute !important;
            left: ${centerPoint.x - shardSize/2}px !important;
            top: ${centerPoint.y - shardSize/2}px !important;
            width: ${shardSize}px !important;
            height: ${shardSize}px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            clip-path: ${shardPath} !important;
            background: 
                radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.3) 30%, 
                rgba(200, 200, 255, 0.2) 60%,
                rgba(255, 200, 255, 0.1) 100%),
                linear-gradient(${Math.random() * 360}deg, 
                rgba(255, 255, 255, 0.3), 
                rgba(200, 200, 255, 0.2),
                rgba(255, 200, 255, 0.2)) !important;
            backdrop-filter: blur(1px) !important;
            border: 1px solid rgba(255, 255, 255, 0.8) !important;
            box-shadow: 
                inset 0 0 20px rgba(255, 255, 255, 0.3),
                0 0 10px rgba(255, 255, 255, 0.2) !important;
            z-index: 10001 !important;
        `;
        
        // より控えめな番号表示（鏡らしさを保つため）
        shardElement.innerHTML = `<span style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0.7);
            font-weight: bold;
            font-size: 12px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            opacity: 0.8;
        ">${index + 1}</span>`;
        
        return {
            element: shardElement,
            centerPoint: centerPoint,
            index: index,
            isShattered: false,
            path: shardPath,
            size: shardSize
        };
    }

    calculateShardPath(center, index, width, height) {
        // より鏡らしい不規則な多角形を生成
        const sides = 5 + Math.floor(Math.random() * 4); // 5-8角形（より鏡らしく）
        const baseRadius = 60 + Math.random() * 40; // 基本半径
        const angleOffset = Math.random() * Math.PI * 2;
        
        let pathPoints = [];
        
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2 + angleOffset;
            
            // より激しい不規則性を追加（鏡の破片らしく）
            const radiusVariance = 0.5 + Math.random() * 1.0;
            const angleVariance = (Math.random() - 0.5) * 0.3; // 角度にも揺らぎ
            
            const actualAngle = angle + angleVariance;
            const actualRadius = baseRadius * radiusVariance;
            
            // 中心からの相対座標で計算（clipPathなので50%基準）
            const x = 50 + (Math.cos(actualAngle) * actualRadius / 160 * 50); // 160pxを基準に%変換
            const y = 50 + (Math.sin(actualAngle) * actualRadius / 160 * 50);
            
            // 0-100%の範囲に制限
            const clampedX = Math.max(5, Math.min(95, x));
            const clampedY = Math.max(5, Math.min(95, y));
            
            pathPoints.push(`${clampedX}% ${clampedY}%`);
        }
        
        return `polygon(${pathPoints.join(', ')})`;
    }

    addShardInteractions() {
        this.shards.forEach(shard => {
            shard.element.addEventListener('mouseenter', () => {
                if (!shard.isShattered) {
                    this.shatterShard(shard);
                }
            });
            
            // ホバー時の光る効果（多角形用）
            shard.element.addEventListener('mouseover', () => {
                if (!shard.isShattered) {
                    shard.element.style.background = `
                        radial-gradient(circle at 50% 50%, 
                        rgba(255, 255, 255, 0.8) 0%, 
                        rgba(255, 255, 255, 0.5) 30%, 
                        rgba(255, 200, 200, 0.4) 60%,
                        rgba(200, 200, 255, 0.3) 100%),
                        linear-gradient(${Math.random() * 360}deg, 
                        rgba(255, 255, 255, 0.4), 
                        rgba(255, 200, 200, 0.3),
                        rgba(200, 200, 255, 0.3))
                    `;
                    shard.element.style.transform = 'scale(1.05)';
                    shard.element.style.filter = 'brightness(1.2)';
                }
            });
            
            shard.element.addEventListener('mouseleave', () => {
                if (!shard.isShattered) {
                    shard.element.style.background = `
                        radial-gradient(circle at 50% 50%, 
                        rgba(255, 255, 255, 0.6) 0%, 
                        rgba(255, 255, 255, 0.3) 30%, 
                        rgba(200, 200, 255, 0.2) 60%,
                        rgba(255, 200, 255, 0.1) 100%),
                        linear-gradient(${Math.random() * 360}deg, 
                        rgba(255, 255, 255, 0.3), 
                        rgba(200, 200, 255, 0.2),
                        rgba(255, 200, 255, 0.2))
                    `;
                    shard.element.style.transform = 'scale(1)';
                    shard.element.style.filter = 'brightness(1)';
                }
            });
        });
    }

    shatterShard(shard) {
        if (shard.isShattered) return;
        
        console.log(`🔨 Shattering mirror shard ${shard.index}`);
        shard.isShattered = true;
        this.shatteredCount++;
        
        // 崩れ落ちアニメーション
        this.animateShardFall(shard);
        
        // 背景の部分的露出
        this.revealBackgroundBehind(shard);
        
        // 進行状況チェック
        this.checkProgress();
        
        // 破片の音
        this.playShardBreakSound();
    }

    animateShardFall(shard) {
        const element = shard.element;
        const fallDistance = window.innerHeight + 200;
        const rotationDegrees = (Math.random() - 0.5) * 720; // -360 to 360度
        const fallDuration = 1000 + Math.random() * 500; // 1-1.5秒
        
        // 重力落下アニメーション
        element.style.transition = `transform ${fallDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${fallDuration}ms ease`;
        element.style.transform = `translateY(${fallDistance}px) rotate(${rotationDegrees}deg) scale(0.5)`;
        element.style.opacity = '0';
        
        // アニメーション完了後に要素を削除
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, fallDuration);
    }

    revealBackgroundBehind(shard) {
        // 崩れた部分に黒い背景を露出させる
        const revealElement = document.createElement('div');
        revealElement.style.cssText = `
            position: absolute !important;
            left: ${shard.centerPoint.x - shard.size/2}px !important;
            top: ${shard.centerPoint.y - shard.size/2}px !important;
            width: ${shard.size}px !important;
            height: ${shard.size}px !important;
            background: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
            clip-path: ${shard.path} !important;
            opacity: 0 !important;
            transition: opacity 0.8s ease !important;
            z-index: 9999 !important;
            pointer-events: none !important;
        `;
        
        this.shatterContainer.appendChild(revealElement);
        
        // 徐々に背景を表示
        setTimeout(() => {
            revealElement.style.opacity = '1';
        }, 200);
    }

    checkProgress() {
        const progressPercentage = (this.shatteredCount / this.totalShards) * 100;
        console.log(`🪞 Progress: ${this.shatteredCount}/${this.totalShards} (${progressPercentage.toFixed(1)}%)`);
        
        // 60%達成で自動連鎖崩壊
        if (this.shatteredCount >= this.autoTriggerThreshold && !this.autoTriggered) {
            this.autoTriggered = true;
            console.log('🔥 Auto-trigger threshold reached! Starting chain reaction...');
            this.triggerChainReaction();
        }
        
        // 100%完了で真実モード移行
        if (this.shatteredCount >= this.totalShards) {
            this.completeShatter();
        }
    }

    triggerChainReaction() {
        // 残りの鏡面を順次自動で崩壊
        const remainingShards = this.shards.filter(shard => !shard.isShattered);
        
        remainingShards.forEach((shard, index) => {
            setTimeout(() => {
                this.shatterShard(shard);
            }, index * 200); // 0.2秒間隔で連鎖
        });
    }

    completeShatter() {
        console.log('💀 All mirrors shattered! Revealing complete truth...');
        
        setTimeout(() => {
            // シャッターコンテナを削除
            if (this.shatterContainer && this.shatterContainer.parentNode) {
                this.shatterContainer.style.transition = 'opacity 1s ease';
                this.shatterContainer.style.opacity = '0';
                
                setTimeout(() => {
                    this.shatterContainer.remove();
                }, 1000);
            }
            
            // 完全な真実モードに移行
            this.veilMagic.completeTransformation();
        }, 1000);
    }

    createCrackPattern() {
        // SVGクラックパターンをBase64エンコード
        const crackSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <defs>
                    <filter id="crack">
                        <feGaussianBlur stdDeviation="0.5"/>
                    </filter>
                </defs>
                <path d="M10,20 Q30,10 50,25 T90,30 L85,40 Q60,35 40,50 T15,45 Z" 
                      fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1" filter="url(#crack)"/>
                <path d="M20,60 Q40,70 60,55 T95,65 L90,75 Q70,70 50,85 T25,80 Z" 
                      fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" filter="url(#crack)"/>
            </svg>
        `;
        
        return btoa(crackSvg);
    }

    playShatterSound() {
        console.log('🎵 Playing mirror shatter sound');
    }

    playShardBreakSound() {
        console.log('🎵 Playing shard break sound');
    }
}

class VeilMagic {
    constructor() {
        this.isRevealed = false;
        this.clickCount = 0;
        this.revealThreshold = 3; // 3回クリックで真実が露出
        this.mirrorSystem = new MirrorShatterSystem(this);
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
        
        // 劇的な画面フラッシュ効果
        this.createScreenFlash();
        
        // メッセージ表示
        setTimeout(() => {
            this.createMessage("心の色が、嘘をついてる", "truth-revealed");
        }, 1000);
        
        // 新しい鏡の破片システムを開始（デバッグ付き）
        setTimeout(() => {
            console.log('🪞 Starting mirror shatter system...');
            try {
                this.mirrorSystem.createMirrorShatter();
                console.log('🪞 Mirror system started successfully');
            } catch (error) {
                console.error('❌ Mirror system error:', error);
                // エラーの場合は従来の方式に戻す
                this.fallbackToOldSystem();
            }
        }, 1500);
        
        // 音声効果（あれば）
        this.playSound('reveal');
    }

    fallbackToOldSystem() {
        console.log('🔄 Falling back to old transformation system');
        this.completeTransformation();
    }

    completeTransformation() {
        // 鏡がすべて崩れた後の完全な真実モード移行
        console.log('🌟 Complete transformation to truth mode');
        
        // CSSクラスを追加して視覚的変化
        document.body.classList.add('truth-revealed');
        document.documentElement.classList.add('truth-revealed');
        
        // 背景を強制的に黒に変更
        this.forceBackgroundChange();
        
        // 真実を露出させるアニメーション
        this.createRevealAnimation();
        
        // ナビゲーションメニューを真実版に変更
        this.updateNavigation();
        
        // 最終メッセージ
        setTimeout(() => {
            this.createMessage("すべての嘘が崩れ落ちた...", "final");
        }, 1000);
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

    createScreenFlash() {
        // 画面全体を白でフラッシュ
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 99999;
            opacity: 1;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
        }, 100);
    }

    forceBackgroundChange() {
        // 最強の方法: 動的CSSを注入
        this.injectTruthCSS();
        
        // 背景を強制的に黒に変更 - 複数の方法で確実に
        document.body.style.setProperty('background', 'linear-gradient(135deg, #000000, #1a0000, #330000)', 'important');
        document.body.style.setProperty('background-image', 'linear-gradient(135deg, #000000, #1a0000, #330000)', 'important');
        document.body.style.setProperty('background-color', '#000000', 'important');
        document.body.style.backgroundAttachment = 'fixed';
        
        // HTMLとDocumentの背景も変更
        document.documentElement.style.setProperty('background', '#000000', 'important');
        document.documentElement.style.setProperty('background-color', '#000000', 'important');
        
        // メインコンテナも変更
        const container = document.getElementById('veil-container');
        if (container) {
            container.style.setProperty('background', 'linear-gradient(135deg, #000000, #1a0000, #330000)', 'important');
        }
        
        // メインコンテンツの背景も変更
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.setProperty('background', 'linear-gradient(135deg, #000000, #1a0000, #330000)', 'important');
        }
        
        // すべてのセクションの背景も変更
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.setProperty('background', 'rgba(20, 20, 20, 0.95)', 'important');
            section.style.setProperty('border', '2px solid #ff6b6b', 'important');
            section.style.setProperty('box-shadow', '0 0 20px rgba(255, 107, 107, 0.5)', 'important');
        });
        
        // ヒーローセクションも変更
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            heroSection.style.setProperty('background', 'radial-gradient(circle, rgba(0,0,0,0.9), rgba(26,0,0,0.9))', 'important');
        }
        
        // すべての要素の背景を強制変更
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.tagName === 'BODY' || element.tagName === 'HTML') {
                element.style.setProperty('background', 'linear-gradient(135deg, #000000, #1a0000, #330000)', 'important');
                element.style.setProperty('background-color', '#000000', 'important');
            }
        });
    }

    injectTruthCSS() {
        // 既存の強制CSSを削除
        const existingStyle = document.getElementById('veil-truth-override');
        if (existingStyle) existingStyle.remove();
        
        // 新しい強制CSSを注入
        const style = document.createElement('style');
        style.id = 'veil-truth-override';
        style.textContent = `
            html, body, #veil-container, #main-content {
                background: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
                background-color: #000000 !important;
                background-image: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
            }
            
            body.truth-revealed {
                background: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
                background-color: #000000 !important;
                background-image: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
            }
            
            .content-section {
                background: rgba(20, 20, 20, 0.95) !important;
                border: 2px solid #ff6b6b !important;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.5) !important;
            }
        `;
        
        // CSSを最後に追加（最高優先度）
        document.head.appendChild(style);
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
    
    // 鏡システムのテスト用関数
    window.testMirrorSystem = () => {
        console.log('🧪 Testing mirror system...');
        try {
            window.veilMagic.mirrorSystem.createMirrorShatter();
        } catch (error) {
            console.error('❌ Mirror test failed:', error);
        }
    };
    
    console.log('🎭 VeilMagic initialized successfully!');
    console.log('🔧 Debug commands: revealTruth(), testMirrorSystem(), veilMessage("text")');
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