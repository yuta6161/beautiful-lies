// Veil's Interactive Magic - 美しい嘘から醜い真実への変化を制御
// "心の色が、嘘をついてる"

class RealisticMirrorSystem {
    constructor(veilMagic) {
        this.veilMagic = veilMagic;
        this.cells = [];
        this.shatteredCount = 0;
        this.totalCells = 20;
        this.autoTriggerThreshold = Math.floor(this.totalCells * 0.6); // 60%で自動発動
        this.isShattered = false;
        this.mirrorLayer = null;
        this.crackLayer = null;
        this.centerX = 0;
        this.centerY = 0;
        this.crackPaths = [];
    }

    createRealisticMirror() {
        if (this.isShattered) {
            console.log('🪞 Mirror already shattered, skipping...');
            return;
        }
        
        console.log('🪞 Creating realistic broken mirror effect - 画面全体が一つの鏡として割れます...');
        this.isShattered = true;
        
        try {
            // Step 1: 画面全体に鏡レイヤーを作成
            console.log('🪞 Step 1: Creating full-screen continuous mirror layer...');
            this.createMirrorLayer();
            
            // Step 2: 中央から放射状にひび割れを生成
            console.log('🪞 Step 2: Generating radial cracks from center...');
            this.generateRadialCracks();
            
            // Step 3: ひび割れパターンは既にgenerateRadialCracks()で生成済み
            console.log('🪞 Step 3: Irregular fragments already created in generateRadialCracks()');
            
            // Step 4: ひび割れアニメーション
            console.log('🪞 Step 4: Starting crack animation...');
            this.animateCrackFormation();
            
            console.log('🪞 ✅ Realistic continuous mirror system fully initialized!');
        } catch (error) {
            console.error('❌ Error in createRealisticMirror:', error);
            throw error;
        }
    }

    createMirrorLayer() {
        // 既存のレイヤーがあれば削除
        const existing = document.getElementById('realistic-mirror-overlay');
        if (existing) existing.remove();
        
        // 画面のサイズと中央点を設定
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.centerX = width / 2;
        this.centerY = height / 2;
        
        this.mirrorLayer = document.createElement('div');
        this.mirrorLayer.id = 'realistic-mirror-overlay';
        this.mirrorLayer.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 10000 !important;
            pointer-events: auto !important;
            background: 
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 80%),
                radial-gradient(ellipse at 30% 20%, rgba(200, 200, 255, 0.2) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 80%, rgba(255, 200, 255, 0.2) 0%, transparent 60%),
                linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(240, 240, 255, 0.05)) !important;
            backdrop-filter: blur(0.3px) !important;
            box-shadow: inset 0 0 100px rgba(255, 255, 255, 0.1) !important;
        `;
        
        document.body.appendChild(this.mirrorLayer);
        console.log(`🪞 Full-screen mirror layer created: ${width}x${height}, center: (${this.centerX}, ${this.centerY})`);
    }

    generateRadialCracks() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // ハイブリッド型現実的ひび割れシステム
        this.mainCracks = []; // メイン放射状ひび割れ
        this.branchCracks = []; // 枝分かれひび割れ
        this.allCrackLines = []; // 全ひび割れライン
        this.fragments = []; // 実際の破片領域
        
        // Step 1: メイン放射状ひび割れ（6-8本）
        const mainCrackCount = 7;
        for (let i = 0; i < mainCrackCount; i++) {
            const angle = (i / mainCrackCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
            const mainCrack = this.generateMainCrack(angle, width, height);
            this.mainCracks.push(mainCrack);
            this.allCrackLines.push(mainCrack);
        }
        
        // Step 2: 枝分かれひび割れ（現実的な横ひび割れ）
        this.generateRealisticBranches(width, height);
        
        // Step 3: 幾何学的分割で実際の破片領域を計算
        this.calculateGeometricFragments(width, height);
        
        console.log(`🪞 Generated realistic crack pattern: ${this.mainCracks.length} main + ${this.branchCracks.length} branch = ${this.fragments.length} fragments`);
    }

    generateMainCrack(angle, width, height) {
        // メイン放射状ひび割れ（中央から画面境界まで）
        const maxDistance = Math.sqrt(width * width + height * height);
        
        const endX = this.centerX + Math.cos(angle) * maxDistance;
        const endY = this.centerY + Math.sin(angle) * maxDistance;
        
        // 画面境界での終点を計算
        const { x: boundaryX, y: boundaryY } = this.calculateBoundaryIntersection(
            this.centerX, this.centerY, endX, endY, width, height
        );
        
        // メインひび割れは複数の点で構成（不規則性のため）
        const points = [`${this.centerX} ${this.centerY}`];
        
        // 中間点を追加（3-4個）
        const segments = 3 + Math.floor(Math.random() * 2);
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const x = this.centerX + (boundaryX - this.centerX) * t;
            const y = this.centerY + (boundaryY - this.centerY) * t;
            
            // 軽微な揺らぎ
            const deviation = 15 + Math.random() * 10;
            const devAngle = (Math.random() - 0.5) * 0.3;
            const devX = x + Math.cos(angle + devAngle) * deviation;
            const devY = y + Math.sin(angle + devAngle) * deviation;
            
            points.push(`${devX} ${devY}`);
        }
        
        points.push(`${boundaryX} ${boundaryY}`);
        
        return {
            type: 'main',
            startX: this.centerX,
            startY: this.centerY,
            endX: boundaryX,
            endY: boundaryY,
            points: points,
            angle: angle
        };
    }

    generateRealisticBranches(width, height) {
        // メインひび割れ間を繋ぐ現実的な枝分かれひび割れ
        const branchCount = 8 + Math.floor(Math.random() * 6); // 8-13本の枝分かれ
        
        for (let i = 0; i < branchCount; i++) {
            // ランダムに2つのメインひび割れを選択
            const crack1 = this.mainCracks[Math.floor(Math.random() * this.mainCracks.length)];
            const crack2 = this.mainCracks[Math.floor(Math.random() * this.mainCracks.length)];
            
            if (crack1 !== crack2) {
                const branch = this.createBranchBetweenMainCracks(crack1, crack2, width, height);
                if (branch) {
                    this.branchCracks.push(branch);
                    this.allCrackLines.push(branch);
                }
            }
        }
        
        console.log(`🪞 Created ${this.branchCracks.length} realistic branch cracks`);
    }

    createBranchBetweenMainCracks(crack1, crack2, width, height) {
        // 2つのメインひび割れの中間地点を繋ぐ枝分かれひび割れ
        if (!crack1.points || !crack2.points) return null;
        
        // メインひび割れの中間地点を選択
        const point1Index = 1 + Math.floor(Math.random() * (crack1.points.length - 2));
        const point2Index = 1 + Math.floor(Math.random() * (crack2.points.length - 2));
        
        const start = crack1.points[point1Index].split(' ').map(Number);
        const end = crack2.points[point2Index].split(' ').map(Number);
        
        // 距離が近すぎる場合はスキップ
        const distance = Math.hypot(end[0] - start[0], end[1] - start[1]);
        if (distance < 100) return null;
        
        // 不規則な曲線で繋ぐ
        const points = [`${start[0]} ${start[1]}`];
        const segments = 2 + Math.floor(Math.random() * 2); // 2-3セグメント
        
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const baseX = start[0] + (end[0] - start[0]) * t;
            const baseY = start[1] + (end[1] - start[1]) * t;
            
            // 曲線的な偏差
            const deviation = 20 + Math.random() * 30;
            const devAngle = Math.random() * Math.PI * 2;
            const actualX = baseX + Math.cos(devAngle) * deviation;
            const actualY = baseY + Math.sin(devAngle) * deviation;
            
            points.push(`${actualX} ${actualY}`);
        }
        
        points.push(`${end[0]} ${end[1]}`);
        
        return {
            type: 'branch',
            points: points,
            startX: start[0],
            startY: start[1],
            endX: end[0],
            endY: end[1]
        };
    }

    calculateBoundaryIntersection(startX, startY, endX, endY, width, height) {
        // 直線が画面境界と交差する点を計算
        const dx = endX - startX;
        const dy = endY - startY;
        
        // 各境界との交点を計算
        const intersections = [];
        
        // 上端 (y = 0)
        if (dy !== 0) {
            const t = -startY / dy;
            if (t > 0) {
                const x = startX + dx * t;
                if (x >= 0 && x <= width) {
                    intersections.push({ x, y: 0, distance: t });
                }
            }
        }
        
        // 下端 (y = height)
        if (dy !== 0) {
            const t = (height - startY) / dy;
            if (t > 0) {
                const x = startX + dx * t;
                if (x >= 0 && x <= width) {
                    intersections.push({ x, y: height, distance: t });
                }
            }
        }
        
        // 左端 (x = 0)
        if (dx !== 0) {
            const t = -startX / dx;
            if (t > 0) {
                const y = startY + dy * t;
                if (y >= 0 && y <= height) {
                    intersections.push({ x: 0, y, distance: t });
                }
            }
        }
        
        // 右端 (x = width)
        if (dx !== 0) {
            const t = (width - startX) / dx;
            if (t > 0) {
                const y = startY + dy * t;
                if (y >= 0 && y <= height) {
                    intersections.push({ x: width, y, distance: t });
                }
            }
        }
        
        // 最も近い交点を返す
        if (intersections.length > 0) {
            const closest = intersections.reduce((min, curr) => 
                curr.distance < min.distance ? curr : min
            );
            return { x: closest.x, y: closest.y };
        }
        
        // 交点が見つからない場合はそのまま返す
        return { x: endX, y: endY };
    }

    calculateGeometricFragments(width, height) {
        // 本格的な幾何学的分割アルゴリズム
        this.cells = [];
        this.fragments = [];
        this.intersections = [];
        
        console.log('🔬 Starting geometric fragmentation...');
        
        // Step 1: 全てのひび割れラインの交点を計算
        this.calculateAllIntersections(width, height);
        
        // Step 2: 交点とひび割れラインから閉じた領域を特定
        this.identifyClosedRegions(width, height);
        
        console.log(`🧮 Geometric calculation complete: ${this.intersections.length} intersections, ${this.fragments.length} regions`);
    }

    calculateAllIntersections(width, height) {
        // 全てのひび割れライン間の交点を計算
        const allSegments = [];
        
        // 全てのひび割れラインをセグメントに分解
        this.allCrackLines.forEach((crack, crackIndex) => {
            if (crack.points) {
                for (let i = 0; i < crack.points.length - 1; i++) {
                    const start = crack.points[i].split(' ').map(Number);
                    const end = crack.points[i + 1].split(' ').map(Number);
                    allSegments.push({
                        x1: start[0], y1: start[1],
                        x2: end[0], y2: end[1],
                        crackIndex: crackIndex,
                        segmentIndex: i
                    });
                }
            }
        });
        
        // 画面境界も追加
        allSegments.push(
            { x1: 0, y1: 0, x2: width, y2: 0, crackIndex: -1, segmentIndex: 0 }, // 上端
            { x1: width, y1: 0, x2: width, y2: height, crackIndex: -1, segmentIndex: 1 }, // 右端
            { x1: width, y1: height, x2: 0, y2: height, crackIndex: -1, segmentIndex: 2 }, // 下端
            { x1: 0, y1: height, x2: 0, y2: 0, crackIndex: -1, segmentIndex: 3 } // 左端
        );
        
        // 全ての交点を計算
        for (let i = 0; i < allSegments.length; i++) {
            for (let j = i + 1; j < allSegments.length; j++) {
                const intersection = this.calculateLineIntersection(
                    allSegments[i], allSegments[j]
                );
                if (intersection) {
                    this.intersections.push({
                        x: intersection.x,
                        y: intersection.y,
                        segment1: i,
                        segment2: j
                    });
                }
            }
        }
        
        this.allSegments = allSegments;
        console.log(`🔍 Found ${this.intersections.length} intersections from ${allSegments.length} segments`);
    }

    calculateLineIntersection(seg1, seg2) {
        // 2つの線分の交点を計算
        const { x1: x1, y1: y1, x2: x2, y2: y2 } = seg1;
        const { x1: x3, y1: y3, x2: x4, y2: y4 } = seg2;
        
        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(denominator) < 1e-10) return null; // 平行線
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            };
        }
        
        return null;
    }

    identifyClosedRegions(width, height) {
        // 簡略版: 主要な領域をマニュアルで特定
        // 本格的な実装では、グラフ理論的アプローチが必要
        
        const regions = [];
        
        // 中央領域（全てのメインひび割れに囲まれた部分）
        const centerRegion = this.createCenterRegion();
        if (centerRegion) regions.push(centerRegion);
        
        // メインひび割れ間の扇形領域
        for (let i = 0; i < this.mainCracks.length; i++) {
            const currentCrack = this.mainCracks[i];
            const nextCrack = this.mainCracks[(i + 1) % this.mainCracks.length];
            
            const sectorRegion = this.createSectorRegion(currentCrack, nextCrack, width, height);
            if (sectorRegion) regions.push(sectorRegion);
        }
        
        // 枝分かれひび割れで細分化された領域
        const subdivisionRegions = this.createSubdivisionRegions(width, height);
        regions.push(...subdivisionRegions);
        
        // 各領域から実際の破片要素を作成（改良版：重複排除＆サイズフィルタ）
        const validFragments = [];
        
        // Step 1: 全領域をサイズでソート（大きい順）
        const sortedRegions = regions.filter(region => region.boundary && region.boundary.length >= 3)
            .map(region => ({
                ...region,
                area: this.calculateRegionArea(region.boundary)
            }))
            .sort((a, b) => b.area - a.area);
        
        console.log(`🔍 Processing ${sortedRegions.length} regions, sorted by size...`);
        
        sortedRegions.forEach((region, index) => {
            // サイズフィルタ: 適切な最小面積制限
            const minArea = (window.innerWidth * window.innerHeight) / 400; // 画面の1/400に調整
            
            if (region.area >= minArea) {
                // 重複チェック: より厳密な距離ベース検査
                if (!this.isRegionOverlapping(region, validFragments)) {
                    const fragment = this.createGeometricFragment(region, validFragments.length);
                    if (fragment && fragment.element) {
                        validFragments.push(fragment);
                        this.fragments.push(fragment);
                        this.cells.push(fragment);
                        this.mirrorLayer.appendChild(fragment.element);
                        console.log(`✅ Fragment ${validFragments.length}: Area=${Math.round(region.area)}, Center=(${Math.round(region.centerX)}, ${Math.round(region.centerY)})`);
                    }
                } else {
                    console.log(`❌ Fragment skipped: overlapping with existing fragment`);
                }
            } else {
                console.log(`❌ Fragment skipped: too small (${Math.round(region.area)} < ${Math.round(minArea)})`);
            }
        });
        
        console.log(`🔍 Filtered: ${regions.length} → ${validFragments.length} valid fragments`);
        
        // 緊急フォールバック: 破片が1個も作られなかった場合
        if (validFragments.length === 0) {
            console.log(`⚠️ No fragments created! Creating emergency fallback fragments...`);
            this.createEmergencyFragments(width, height);
        }
    }

    createCenterRegion() {
        // 中央の小さな領域（全メインひび割れの開始点周辺）
        const centerSize = 30;
        const points = [];
        
        // 中央周りの小さな多角形
        const sides = 6;
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = this.centerX + Math.cos(angle) * centerSize;
            const y = this.centerY + Math.sin(angle) * centerSize;
            points.push(`${x}px ${y}px`);
        }
        
        return {
            type: 'center',
            boundary: points,
            centerX: this.centerX,
            centerY: this.centerY
        };
    }

    createSectorRegion(crack1, crack2, width, height) {
        // 2つのメインひび割れ間の扇形領域
        const points = [];
        
        // 中央点から開始
        points.push(`${this.centerX}px ${this.centerY}px`);
        
        // 最初のメインひび割れに沿って外側へ
        const midPoint1 = this.getPointOnCrack(crack1, 0.7);
        points.push(`${midPoint1.x}px ${midPoint1.y}px`);
        points.push(`${crack1.endX}px ${crack1.endY}px`);
        
        // 画面境界を回る
        const arcPoints = this.generateBoundaryArc(
            crack1.endX, crack1.endY, crack2.endX, crack2.endY, width, height
        );
        arcPoints.forEach(point => points.push(point));
        
        // 次のメインひび割れの終点
        points.push(`${crack2.endX}px ${crack2.endY}px`);
        
        // 2番目のメインひび割れに沿って中央へ
        const midPoint2 = this.getPointOnCrack(crack2, 0.7);
        points.push(`${midPoint2.x}px ${midPoint2.y}px`);
        
        return {
            type: 'sector',
            boundary: points,
            centerX: (crack1.endX + crack2.endX + this.centerX) / 3,
            centerY: (crack1.endY + crack2.endY + this.centerY) / 3
        };
    }

    createSubdivisionRegions(width, height) {
        // 枝分かれひび割れで細分化された追加領域
        const regions = [];
        const maxRegions = Math.max(0, this.totalCells - this.mainCracks.length - 1);
        
        // 簡略版: 枝分かれひび割れ周辺にランダムな小領域を作成
        this.branchCracks.slice(0, maxRegions).forEach((branch, index) => {
            const region = this.createBranchRegion(branch, index);
            if (region) regions.push(region);
        });
        
        return regions;
    }

    createBranchRegion(branch, index) {
        // 枝分かれひび割れ周辺の小領域
        if (!branch.points || branch.points.length < 2) return null;
        
        const midPoint = branch.points[Math.floor(branch.points.length / 2)].split(' ').map(Number);
        const size = 40 + Math.random() * 30;
        
        const points = [];
        const sides = 4 + Math.floor(Math.random() * 3); // 4-6角形
        
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const radius = size * (0.7 + Math.random() * 0.6);
            const x = midPoint[0] + Math.cos(angle) * radius;
            const y = midPoint[1] + Math.sin(angle) * radius;
            points.push(`${x}px ${y}px`);
        }
        
        return {
            type: 'branch',
            boundary: points,
            centerX: midPoint[0],
            centerY: midPoint[1]
        };
    }

    getPointOnCrack(crack, ratio) {
        // ひび割れライン上の指定比率の点を取得
        if (!crack.points || crack.points.length < 2) {
            return { x: crack.startX, y: crack.startY };
        }
        
        const index = Math.floor((crack.points.length - 1) * ratio);
        const point = crack.points[index].split(' ').map(Number);
        return { x: point[0], y: point[1] };
    }

    generateBoundaryArc(x1, y1, x2, y2, width, height) {
        // 画面境界に沿った弧状経路
        const points = [];
        const segments = 2;
        
        for (let i = 1; i <= segments; i++) {
            const t = i / (segments + 1);
            let x = x1 + (x2 - x1) * t;
            let y = y1 + (y2 - y1) * t;
            
            // 境界に押し付ける
            if (x <= 5) x = 0;
            else if (x >= width - 5) x = width;
            if (y <= 5) y = 0;
            else if (y >= height - 5) y = height;
            
            points.push(`${x}px ${y}px`);
        }
        
        return points;
    }

    createGeometricFragment(region, index) {
        // 幾何学的に計算された領域から破片要素を作成
        const clipPath = `polygon(${region.boundary.join(', ')})`;
        
        const cellElement = document.createElement('div');
        cellElement.className = 'mirror-cell';
        cellElement.dataset.cellId = index;
        cellElement.style.cssText = `
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            cursor: pointer !important;
            clip-path: ${clipPath} !important;
            background: inherit !important;
            transition: all 0.3s ease !important;
            z-index: 10001 !important;
        `;
        
        // デバッグ用の番号表示
        const label = document.createElement('span');
        label.style.cssText = `
            position: absolute;
            left: ${region.centerX}px;
            top: ${region.centerY}px;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.9);
            pointer-events: none;
            z-index: 10002;
        `;
        label.textContent = index + 1;
        cellElement.appendChild(label);
        
        // 個別破片専用のホバーイベントハンドラを設定
        cellElement.addEventListener('mouseenter', (e) => {
            if (!cellElement.dataset.isShattered) {
                console.log(`🖱️ Fragment ${index + 1} hovered`);
                cellElement.style.filter = 'brightness(1.4) drop-shadow(0 0 10px rgba(255,255,255,0.8))';
                cellElement.style.transform = 'scale(1.02)';
            }
        });
        
        cellElement.addEventListener('mouseleave', (e) => {
            if (!cellElement.dataset.isShattered) {
                cellElement.style.filter = '';
                cellElement.style.transform = '';
            }
        });
        
        cellElement.addEventListener('click', (e) => {
            e.stopPropagation(); // イベントの伝播を停止
            if (!cellElement.dataset.isShattered) {
                console.log(`💥 Fragment ${index + 1} clicked - starting fall animation`);
                this.shatterSingleFragment(cellElement, index);
            }
        });
        
        return {
            element: cellElement,
            index: index,
            isShattered: false,
            path: clipPath,
            region: region,
            centerX: region.centerX,
            centerY: region.centerY,
            area: region.area || this.calculateRegionArea(region.boundary)
        };
    }

    calculateRegionArea(boundary) {
        // 多角形の面積を計算（Shoelace formula）
        if (boundary.length < 3) return 0;
        
        let area = 0;
        for (let i = 0; i < boundary.length; i++) {
            const current = boundary[i].replace('px', '').split(' ').map(Number);
            const next = boundary[(i + 1) % boundary.length].replace('px', '').split(' ').map(Number);
            area += current[0] * next[1] - next[0] * current[1];
        }
        return Math.abs(area) / 2;
    }

    isRegionOverlapping(region, existingFragments) {
        // 改良版重複検出: より確実な距離＋面積チェック
        if (existingFragments.length === 0) return false;
        
        const regionCenter = { x: region.centerX, y: region.centerY };
        const regionRadius = Math.sqrt(region.area / Math.PI); // 面積から半径を推定
        
        for (const existing of existingFragments) {
            const existingCenter = { x: existing.centerX, y: existing.centerY };
            const existingRadius = Math.sqrt(existing.area / Math.PI);
            
            const distance = Math.hypot(
                regionCenter.x - existingCenter.x,
                regionCenter.y - existingCenter.y
            );
            
            // 重複判定: 2つの円の半径の合計より距離が短い場合
            const minSafeDistance = (regionRadius + existingRadius) * 0.8; // 20%重複許可で破片数確保
            
            if (distance < minSafeDistance) {
                console.log(`🔍 Overlap detected: distance=${Math.round(distance)} < safe=${Math.round(minSafeDistance)}`);
                return true; // 重複あり
            }
        }
        
        return false; // 重複なし
    }
    
    shatterSingleFragment(fragmentElement, fragmentIndex) {
        // 個別破片の崩落アニメーション（他に影響しない独立処理）
        if (fragmentElement.dataset.isShattered === 'true') {
            console.log(`⚠️ Fragment ${fragmentIndex + 1} already shattered`);
            return;
        }
        
        // 破片を破損状態にマーク
        fragmentElement.dataset.isShattered = 'true';
        
        console.log(`💥 Shattering fragment ${fragmentIndex + 1} independently...`);
        
        // 落下アニメーション用のランダム要素
        const fallDuration = 1000 + Math.random() * 500; // 1-1.5秒
        const rotationSpeed = 180 + Math.random() * 360; // 180-540度回転
        const horizontalDrift = (Math.random() - 0.5) * 100; // 左右への偏移
        
        // CSS変数でアニメーションを制御
        fragmentElement.style.setProperty('--fall-duration', `${fallDuration}ms`);
        fragmentElement.style.setProperty('--rotation-amount', `${rotationSpeed}deg`);
        fragmentElement.style.setProperty('--horizontal-drift', `${horizontalDrift}px`);
        
        // 落下アニメーション適用
        fragmentElement.style.animation = `
            mirror-fragment-fall var(--fall-duration) ease-in forwards
        `;
        
        // 破片カウンタを更新
        this.shatteredCount++;
        console.log(`📊 Shattered: ${this.shatteredCount}/${this.totalCells}`);
        
        // アニメーション完了後に要素を除去
        setTimeout(() => {
            if (fragmentElement && fragmentElement.parentNode) {
                fragmentElement.remove();
                console.log(`🗑️ Fragment ${fragmentIndex + 1} removed after fall`);
            }
            
            // 自動発動チェック
            if (this.shatteredCount >= this.autoTriggerThreshold) {
                console.log(`🔥 Auto-trigger threshold reached! Revealing truth...`);
                this.revealTruth();
            }
        }, fallDuration + 100);
    }
    
    createEmergencyFragments(width, height) {
        // 緊急時用の簡単な破片システム
        console.log(`🚨 Creating emergency fragments...`);
        
        const emergencyFragments = [];
        const fragmentCount = 12;
        
        for (let i = 0; i < fragmentCount; i++) {
            const angle = (i / fragmentCount) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const centerX = this.centerX + Math.cos(angle) * distance;
            const centerY = this.centerY + Math.sin(angle) * distance;
            
            // 簡単な四角形破片
            const size = 60 + Math.random() * 40;
            const boundary = [
                `${centerX - size}px ${centerY - size}px`,
                `${centerX + size}px ${centerY - size}px`,
                `${centerX + size}px ${centerY + size}px`,
                `${centerX - size}px ${centerY + size}px`
            ];
            
            const region = {
                type: 'emergency',
                boundary: boundary,
                centerX: centerX,
                centerY: centerY,
                area: size * size * 4
            };
            
            const fragment = this.createGeometricFragment(region, i);
            if (fragment && fragment.element) {
                emergencyFragments.push(fragment);
                this.fragments.push(fragment);
                this.cells.push(fragment);
                this.mirrorLayer.appendChild(fragment.element);
            }
        }
        
        console.log(`🆘 Emergency fragments created: ${emergencyFragments.length}`);
    }



    animateCrackFormation() {
        // ひび割れラインをSVGで描画
        this.createCrackSVG();
        
        // シンプルな衝撃アニメーション
        setTimeout(() => {
            this.showImpactEffect();
        }, 500);
        
        // ひび割れが徐々に現れる
        setTimeout(() => {
            this.revealCracks();
        }, 800);
        
        // インタラクション開始
        setTimeout(() => {
            this.enableCellInteractions();
        }, 1500);
    }

    createCrackSVG() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10002;
            opacity: 0;
        `;
        
        // 放射状のひび割れラインを描画
        this.drawRadialCracks(svg);
        
        this.crackLayer = svg;
        this.mirrorLayer.appendChild(svg);
        console.log('🪞 Radial crack SVG layer created');
    }

    drawRadialCracks(svg) {
        // 現実的なひび割れ（メイン＋枝分かれ）をSVGで描画
        this.allCrackLines.forEach((crack, index) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            if (crack.points) {
                // 複数点で構成されるひび割れライン
                let pathData = `M ${crack.points[0]}`;
                for (let i = 1; i < crack.points.length; i++) {
                    pathData += ` L ${crack.points[i]}`;
                }
                path.setAttribute('d', pathData);
            } else {
                // 単純な直線ひび割れ
                const pathData = `M ${crack.startX} ${crack.startY} L ${crack.endX} ${crack.endY}`;
                path.setAttribute('d', pathData);
            }
            
            // メインと枝分かれで線の太さを変える
            if (crack.type === 'main') {
                path.setAttribute('stroke', 'rgba(255, 255, 255, 0.9)');
                path.setAttribute('stroke-width', '2.5');
            } else {
                path.setAttribute('stroke', 'rgba(255, 255, 255, 0.7)');
                path.setAttribute('stroke-width', '1.5');
            }
            
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('opacity', '0');
            
            svg.appendChild(path);
        });
        
        console.log(`🪞 Drew ${this.allCrackLines.length} realistic crack lines (${this.mainCracks.length} main + ${this.branchCracks.length} branch)`);
    }


    showImpactEffect() {
        // 短い衝撃エフェクト
        const impact = document.createElement('div');
        impact.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
            z-index: 10003;
            animation: impact-pulse 0.3s ease-out;
        `;
        
        this.mirrorLayer.appendChild(impact);
        
        setTimeout(() => {
            impact.remove();
        }, 300);
    }

    revealCracks() {
        if (this.crackLayer) {
            // SVGレイヤーを表示
            this.crackLayer.style.transition = 'opacity 0.2s ease';
            this.crackLayer.style.opacity = '1';
            
            // 全てのひび割れラインを一気に表示（鏡が瞬時に割れる表現）
            const crackPaths = this.crackLayer.querySelectorAll('path');
            crackPaths.forEach((path, index) => {
                // 全てのひび割れを同時に表示
                path.style.opacity = '1';
                path.style.strokeDasharray = 'none';
                path.style.strokeDashoffset = '0';
            });
            
            console.log(`🪞 Instantly revealed all ${crackPaths.length} crack lines - 鏡が一瞬で割れました！`);
        }
    }

    enableCellInteractions() {
        this.cells.forEach(cell => {
            cell.element.addEventListener('mouseenter', () => {
                if (!cell.isShattered) {
                    this.shatterCell(cell);
                }
            });
            
            // ホバー時の光る効果
            cell.element.addEventListener('mouseover', () => {
                if (!cell.isShattered) {
                    cell.element.style.filter = 'brightness(1.3)';
                }
            });
            
            cell.element.addEventListener('mouseleave', () => {
                if (!cell.isShattered) {
                    cell.element.style.filter = 'brightness(1)';
                }
            });
        });
        
        console.log('🪞 Cell interactions enabled');
    }

    shatterCell(cell) {
        if (cell.isShattered) return;
        
        console.log(`🔨 Shattering mirror cell ${cell.index}`);
        cell.isShattered = true;
        this.shatteredCount++;
        
        // 落下アニメーション
        this.animateCellFall(cell);
        
        // 背景露出
        this.revealBackgroundBehind(cell);
        
        // 進行状況チェック
        this.checkProgress();
    }

    animateCellFall(cell) {
        const element = cell.element;
        const fallDistance = window.innerHeight + 200;
        const rotationDegrees = (Math.random() - 0.5) * 720;
        const fallDuration = 1000 + Math.random() * 500;
        
        element.style.transition = `transform ${fallDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${fallDuration}ms ease`;
        element.style.transform = `translateY(${fallDistance}px) rotate(${rotationDegrees}deg)`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, fallDuration);
    }

    revealBackgroundBehind(cell) {
        // 崩れた部分に黒い背景を露出
        const revealElement = document.createElement('div');
        revealElement.style.cssText = `
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(135deg, #000000, #1a0000, #330000) !important;
            clip-path: ${cell.path} !important;
            opacity: 0 !important;
            transition: opacity 0.8s ease !important;
            z-index: 9999 !important;
            pointer-events: none !important;
        `;
        
        this.mirrorLayer.appendChild(revealElement);
        
        setTimeout(() => {
            revealElement.style.opacity = '1';
        }, 200);
    }

    checkProgress() {
        const progressPercentage = (this.shatteredCount / this.totalCells) * 100;
        console.log(`🪞 Progress: ${this.shatteredCount}/${this.totalCells} (${progressPercentage.toFixed(1)}%)`);
        
        if (this.shatteredCount >= this.autoTriggerThreshold && !this.autoTriggered) {
            this.autoTriggered = true;
            console.log('🔥 Auto-trigger threshold reached! Starting chain reaction...');
            this.triggerChainReaction();
        }
        
        if (this.shatteredCount >= this.totalCells) {
            this.completeShatter();
        }
    }

    triggerChainReaction() {
        const remainingCells = this.cells.filter(cell => !cell.isShattered);
        
        remainingCells.forEach((cell, index) => {
            setTimeout(() => {
                this.shatterCell(cell);
            }, index * 200);
        });
    }

    completeShatter() {
        console.log('💀 All mirror cells shattered! Revealing complete truth...');
        
        setTimeout(() => {
            if (this.mirrorLayer && this.mirrorLayer.parentNode) {
                this.mirrorLayer.style.transition = 'opacity 1s ease';
                this.mirrorLayer.style.opacity = '0';
                
                setTimeout(() => {
                    this.mirrorLayer.remove();
                }, 1000);
            }
            
            this.veilMagic.completeTransformation();
        }, 1000);
    }
}

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
        this.realisticMirrorSystem = new RealisticMirrorSystem(this);
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
        
        // 新しいリアル鏡システムを開始（デバッグ付き）
        setTimeout(() => {
            console.log('🪞 Starting realistic mirror system...');
            try {
                this.realisticMirrorSystem.createRealisticMirror();
                console.log('🪞 Realistic mirror system started successfully');
            } catch (error) {
                console.error('❌ Realistic mirror system error:', error);
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