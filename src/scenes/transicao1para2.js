export class LaboratorioScene extends Phaser.Scene {
    constructor() {
        super("LaboratorioScene");
    }

    preload() {
        this.load.image("labDestruido", "assets/fases/sceneOne/labDestruido.png");
        this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("armarioD", "assets/objetos/sceneOne/partTwo/armarioDestruido.png");
        this.load.image("alvoD", "assets/objetos/sceneOne/partTwo/alvoDestruido.png");
        this.load.image("mesa1D", "assets/objetos/sceneOne/partTwo/mesa1Destruida.png");
        this.load.image("mesa2D", "assets/objetos/sceneOne/partTwo/mesa2Destruida.png");
        this.load.image("mesa3D", "assets/objetos/sceneOne/partTwo/mesa3Destruida.png");
        this.load.image("piaD", "assets/objetos/sceneOne/partTwo/piaDestruida.png");
        this.load.image("reservasCrioD", "assets/objetos/sceneOne/partTwo/reservasCrioDestruidas.png");
        this.load.image("comptCimaD", "assets/objetos/sceneOne/partTwo/comptCimaDestruido.png");
        this.load.image("comptBaixoD", "assets/objetos/sceneOne/partTwo/comptBaixoDestruido.png");
        this.load.image("criogeniaD", "assets/objetos/sceneOne/partTwo/criogeniaDestruida.png");
        this.load.image("camara", "assets/objetos/sceneOne/partOne/camara.png");
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Estado geral da cena.
        this.gamePhase = "cutscene"; // cutscene -> exploration
        this.isDialogueOpen = false;
        this.awaitingChoice = false;
        this.isObjectReading = false;

        // Controle de perguntas feitas no diálogo inicial
        this.questionState = {
            askedRestore: false,
            askedPriority: false
        };

        // Alterado para corresponder ao sceneFuturo.js: mapa escalado e posicionado
        this.mapa = this.add.image(w / 2, h / 2, "labDestruido").setScale(3);

        // Mundo físico.
        this.physics.world.setBounds(0, 0, w, h);

        // Adicionando barreiras (paredes) como no sceneFuturo.js
        this.paredes = this.physics.add.staticGroup();
        let larguraParede = this.mapa.displayWidth;
        let alturaParede = 720;
        let centroX = this.mapa.x;
        let centroY = this.mapa.y;
        let espessura = 30;

        let paredeCima = this.add.rectangle(
            centroX,
            centroY - alturaParede / 2 + espessura / 2,
            larguraParede,
            espessura,
            0xff0000,
            0,
        );
        this.physics.add.existing(paredeCima, true);
        this.paredes.add(paredeCima);

        let paredeBaixo = this.add.rectangle(
            centroX,
            centroY + alturaParede / 2 - espessura / 2,
            larguraParede,
            espessura,
            0xff0000,
            0,
        );
        this.physics.add.existing(paredeBaixo, true);
        this.paredes.add(paredeBaixo);

        let paredeEsquerda = this.add.rectangle(
            centroX - larguraParede / 2 + espessura / 2,
            centroY,
            espessura,
            alturaParede,
            0xff0000,
            0,
        );
        this.physics.add.existing(paredeEsquerda, true);
        this.paredes.add(paredeEsquerda);

        let paredeDireita = this.add.rectangle(
            centroX + larguraParede / 2 - espessura / 2,
            centroY,
            espessura,
            alturaParede,
            0xff0000,
            0,
        );
        this.physics.add.existing(paredeDireita, true);
        this.paredes.add(paredeDireita);

        // Personagens principais.
        this.sophia = this.physics.add.sprite(this.mapa.x, this.mapa.y - 300, "sophia")
            .setScale(2)
            .setDepth(12);
        this.sophia.setCollideWorldBounds(true);
        this.sophia.body.setAllowGravity(false);
        this.sophia.setSize(30, 25);
        this.sophia.setOffset(15, 30);
        this.sophia.setInteractive({ useHandCursor: true });
        this.sophia.on("pointerdown", () => {
            if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
            this.startDialogue([{ speaker: "Sophia", text: "Sophia: O laboratório inteiro ainda carrega marcas do colapso." }]);
        });

        this.asimov = this.physics.add.sprite(this.mapa.x, this.mapa.y - 100, "asimov")
            .setScale(3)
            .setDepth(12);
        this.asimov.setCollideWorldBounds(true);
        this.asimov.body.setAllowGravity(false);
        this.asimov.setSize(15, 12);
        this.asimov.setOffset(8, 16);
        this.asimov.setInteractive({ useHandCursor: true });
        this.asimov.on("pointerdown", () => {
            if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
            this.startDialogue([{ speaker: "Asimov", text: "Asimov: Ainda há uma saída ao norte. Precisamos seguir." }]);
        });
        this.createCharacterAnimations();
        this.sophia.play("sophia-idle-down");
        this.asimov.play("asimov-idle-right");

        // Camera: mesmo comportamento de sceneFuturo (seguir player, zoom e fadeIn)
        this.cameras.main.setBounds(0, 0, w, h);
        this.cameras.main.startFollow(this.sophia); // zoom padrão igual a sceneFuturo
        this.cameras.main.fadeIn(1000);

        // Colisão Sophia e Asimov
        this.physics.add.collider(this.sophia, this.asimov, () => {
            this.asimov.setVelocity(0,0);
        });

        // Adicionando colisões com as paredes
        this.physics.add.collider(this.sophia, this.paredes);
        this.physics.add.collider(this.asimov, this.paredes);

        // Objetos do preload adicionados na create() e marcados como interagíveis.
        this.interactables = [];
        this.objetosColisao = this.physics.add.staticGroup();
        this.createInteractables();

        // UI de dica de interação.
        this.interactionHint = this.add.text(w / 2, h - 140, "", {
        fontSize: "18px",
        color: "#d6ebff",
        backgroundColor: "rgba(8,18,28,0.75)",
        padding: { left: 10, right: 10, top: 6, bottom: 6 }
        }).setOrigin(0.5).setDepth(80).setVisible(false).setScrollFactor(0);

        // Sistema de diálogo (caixa, nome, fala, botão de avanço e botões de escolha).
        this.createDialogueUI();

        // Controles (WASD + setas + E + Enter).
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        E: Phaser.Input.Keyboard.KeyCodes.E,
        ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
        SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.playerSpeed = 170;

        // Início da cutscene não interativa: Asimov caminha até Sophia.
        this.startIntroCutscene();
    }

    update() {
        // manter depth dinâmico igual ao sceneFuturo (ordenar por Y)
        if (this.sophia) this.sophia.setDepth(this.sophia.y);
        if (this.asimov) this.asimov.setDepth(this.asimov.y);

        if (this.gamePhase === "exploration") {
        this.handlePlayerMovement();
        this.handleAsimovFollower();
        this.handleObjectInteraction();
        } else {
        this.sophia.setVelocity(0, 0);
        this.asimov.setVelocity(0, 0);
        }

        // Atalho para avançar diálogo quando permitido.
        if (this.isDialogueOpen && !this.awaitingChoice) {
        if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            this.advanceDialogue();
        }
        }
    }

    updateCharacterLights() {
        this.lightSophiaOuter.setPosition(this.sophia.x, this.sophia.y);
        this.lightSophiaInner.setPosition(this.sophia.x, this.sophia.y);
        this.lightAsimovOuter.setPosition(this.asimov.x, this.asimov.y);
        this.lightAsimovInner.setPosition(this.asimov.x, this.asimov.y);
    }

    createInteractables() {
        const w = this.scale.width;
        const h = this.scale.height;
        this.objectBodies = [];

        // Dados atualizados com posições relativas ao centro do mapa (inspirado em sceneFuturo.js, onde mapa está em 600,400)
        const data = [
            // Objetos existentes, ajustados para posições relativas
            { key: "mesa3D", x: -410, y: -260, scale: 3.0, label: "computador", text: "Sophia: Os logs mostram falhas na rede global. O colapso foi em cascata." },
            { key: "mesa1D", x: -257, y: -380, scale: 3.0, label: "mesa", text: "Sophia: Ferramentas cirúrgicas e circuitos... alguém improvisou reparos às pressas." },
            { key: "mesa2D", x: 258, y: -382, scale: 3.0, label: "telas quebradas", text: "Sophia: Os monitores queimaram, mas ainda há sinais de tentativa de evacuação." },
            { key: "mesa3D", x: 393, y: 118, scale: 3.0, label: "terminal", text: "Sophia: 'Projeto Aurora suspenso'. Isso foi depois do congelamento." },
            { key: "piaD", x: -397, y: 70, scale: 3.0, label: "documentos", text: "Sophia: Papel envelhecido. 'Protocolos de contenção falharam'." },
            { key: "criogeniaD", x: 0, y: -394, scale: 3.0, label: "capsula criogênica", text: "Sophia: Minha cápsula... As leituras ficaram estáveis por décadas." },
            { key: "reservasCrioD", x: 423, y: -235, scale: 3.0, label: "registro", text: "Sophia: Mensagem antiga: 'Se acordar, procure a saída norte'." },
            // Novos objetos, ajustados para posições relativas
            { key: "armarioD", x: -380, y: -390, scale: 3.25, label: "armário destruído", text: "Sophia: Este armário guarda vestígios de equipamentos médicos abandonados. Tudo em ruínas." },
            { key: "armarioD", x: 380, y: -390, scale: 3.25, label: "armário destruído", text: "Sophia: Outro armário, similar ao anterior. Materiais de laboratório espalhados pelo chão." },
            { key: "alvoD", x: -385, y: -125, scale: 3.0, label: "alvo destruído", text: "Sophia: Um alvo de treinamento, agora inutilizado. Lembra dos dias de simulações." },
            { key: "alvoD", x: 365, y: -25, scale: 3.1, label: "alvo destruído", text: "Sophia: Mais um alvo, corroído pelo tempo. O laboratório era um lugar de testes rigorosos." },
            { key: "comptBaixoD", x: -215, y: -140, scale: 3.0, label: "computador destruído", text: "Sophia: Painéis de controle queimados. Não há energia para reativar." },
            { key: "comptBaixoD", x: 212, y: -140, scale: 3.0, label: "computador destruído", text: "Sophia: Outro terminal, com cabos expostos. O sistema central falhou aqui." },
            { key: "comptBaixoD", x: -215, y: 50, scale: 3.0, label: "computador destruído", text: "Sophia: Mais controles destruídos. Registros de emergência perdidos." },
            { key: "comptBaixoD", x: 212, y: 50, scale: 3.0, label: "computador destruído", text: "Sophia: Terminais similares, todos inoperantes. O colapso afetou tudo." },
            { key: "camara", x: 0, y: -380, scale: 0.25, label: "câmera", text: "Sophia: Uma câmera de segurança antiga. Talvez ainda haja gravações, mas sem energia..." }
        ];

        data.forEach((obj) => {
            // calcula coordenadas absolutas a partir do centro do mapa
            const absX = this.mapa.x + obj.x;
            const absY = this.mapa.y + obj.y;

            const sprite = this.add.image(absX, absY, obj.key)
                .setScale(obj.scale)
                .setDepth(11)
                .setTint(0xaec0d1);

            sprite.setInteractive({ useHandCursor: true });
            sprite.on("pointerdown", () => {
                if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
                this.startDialogue([{ speaker: "Sophia", text: obj.text }], () => {
                    this.isObjectReading = false;
                });
                this.isObjectReading = true;
            });

            // física e colisão como no sceneFuturo.js
            this.physics.add.existing(sprite, true);
            const body = sprite.body;
            body.setSize(sprite.displayWidth * 0.6, sprite.displayHeight * 0.4, true);
            this.objetosColisao.add(sprite);

            // armazena as coordenadas do sprite para o teste de proximidade
            this.interactables.push({ ...obj, sprite, radius: 76 });
        });

        // colidem com Sophia/Asimov para bloqueio
        this.interactables.forEach((obj) => {
            this.physics.add.collider(this.sophia, obj.sprite);
            this.physics.add.collider(this.asimov, obj.sprite);
        });
    }

    createDialogueUI() {
        const larguraJogo = this.cameras.main.width;
        const alturaJogo = this.cameras.main.height;
        const larguraCaixa = 1000;
        const alturaCaixa = 180;
        const xCaixa = (larguraJogo - larguraCaixa) / 2;
        // mesmo deslocamento usado em sceneFuturo.js
        const yCaixa = alturaJogo - alturaCaixa - 80;

        // caixa visual igual ao sceneFuturo
        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

        // armazenar rect da caixa para posicionar escolhas dentro dela
        this.dialogueBoxRect = { x: xCaixa, y: yCaixa, width: larguraCaixa, height: alturaCaixa };

        // texto com mesma fonte/estilo do sceneFuturo
        this.textoDialogo = this.add.text(xCaixa + 40, yCaixa + 35, "", {
            fontSize: "26px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#ccffff",
            wordWrap: { width: larguraCaixa - 120 }, // menos largura para evitar estouros
            lineSpacing: 10,
        }).setScrollFactor(0).setDepth(101).setVisible(false);

        // compatibilidade com o restante do código (mantém nomes usados antes)
        this.dialogueBox = this.caixaDialogo;
        this.dialogueText = this.textoDialogo;

        // nome do falante (visualmente compatível e mantido para mecânica)
        this.nameText = this.add.text(xCaixa + 44, yCaixa - 26, "", {
            fontSize: "21px",
            color: "#9dd8ff",
            fontStyle: "bold"
        }).setDepth(101).setScrollFactor(0).setVisible(false);

        // botão Avançar (previamente posicionado na caixa) -> agora invisível e cobre a tela inteira
        const camW = this.cameras.main.width;
        const camH = this.cameras.main.height;
        // retângulo transparente cobrindo toda a tela — invisível visualmente, mas intercepta cliques
        this.advanceBtnBg = this.add.rectangle(camW / 2, camH / 2, camW, camH, 0x000000, 0)
            .setDepth(200)
            .setScrollFactor(0)
            .setVisible(false)
            .setInteractive({ useHandCursor: true });

        // rótulo deixado oculto (sem necessidade visual)
        this.advanceBtnLabel = this.add.text(0, 0, "Avançar", {
            fontSize: "16px",
            color: "#e8f4ff"
        }).setOrigin(0.5).setDepth(201).setScrollFactor(0).setVisible(false);

        this.advanceBtnBg.on("pointerdown", () => {
            if (this.isDialogueOpen && !this.awaitingChoice) {
                this.advanceDialogue();
            }
        });

        this.choiceButtons = [];
    }

    createCharacterAnimations() {
        // Animações da Sophia (8 frames por linha).
        if (!this.anims.exists("sophia-walk-down")) {
        this.anims.create({ key: "sophia-walk-down", frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "sophia-walk-left", frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "sophia-walk-right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "sophia-walk-up", frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
        // Adicionar animações idle (usando o primeiro frame de cada direção)
        this.anims.create({ key: "sophia-idle-down", frames: [{ key: "sophia", frame: 0 }], frameRate: 1 });
        this.anims.create({ key: "sophia-idle-left", frames: [{ key: "sophia", frame: 24 }], frameRate: 1 });
        this.anims.create({ key: "sophia-idle-right", frames: [{ key: "sophia", frame: 16 }], frameRate: 1 });
        this.anims.create({ key: "sophia-idle-up", frames: [{ key: "sophia", frame: 8 }], frameRate: 1 });
        }

        // Animações do Asimov (7 frames por linha).
        if (!this.anims.exists("asimov-walk-down")) {
        this.anims.create({ key: "asimov-walk-down", frames: this.anims.generateFrameNumbers("asimov", { start: 7, end: 9 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "asimov-walk-left", frames: this.anims.generateFrameNumbers("asimov", { start: 21, end: 26 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "asimov-walk-right", frames: this.anims.generateFrameNumbers("asimov", { start: 28, end: 34 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "asimov-walk-up", frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }), frameRate: 10, repeat: -1 });
        // Adicionar animações idle (usando o primeiro frame de cada direção)
        this.anims.create({ key: "asimov-idle-down", frames: [{ key: "asimov", frame: 7 }], frameRate: 1 });
        this.anims.create({ key: "asimov-idle-left", frames: [{ key: "asimov", frame: 21 }], frameRate: 1 });
        this.anims.create({ key: "asimov-idle-right", frames: [{ key: "asimov", frame: 28 }], frameRate: 1 });
        this.anims.create({ key: "asimov-idle-up", frames: [{ key: "asimov", frame: 14 }], frameRate: 1 });
        }
    }

    playAnimIfNeeded(sprite, key) {
        if (!sprite.anims.currentAnim || sprite.anims.currentAnim.key !== key) {
        sprite.play(key, true);
        }
    }

    updateSophiaAnimation(vx, vy) {
        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
        const facing = this.sophiaFacing || "down";
        this.playAnimIfNeeded(this.sophia, `sophia-idle-${facing}`);
        return;
        }

        if (Math.abs(vx) > Math.abs(vy)) {
        this.sophiaFacing = vx > 0 ? "right" : "left";
        } else {
        this.sophiaFacing = vy > 0 ? "down" : "up";
        }
        this.playAnimIfNeeded(this.sophia, `sophia-walk-${this.sophiaFacing}`);
    }

    updateAsimovAnimation(vx, vy) {
        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
        const facing = this.asimovFacing || "right";
        this.playAnimIfNeeded(this.asimov, `asimov-idle-${facing}`);
        return;
        }

        if (Math.abs(vx) > Math.abs(vy)) {
        this.asimovFacing = vx > 0 ? "right" : "left";
        } else {
        this.asimovFacing = vy > 0 ? "down" : "up";
        }
        this.playAnimIfNeeded(this.asimov, `asimov-walk-${this.asimovFacing}`);
    }

    startIntroCutscene() {
        // diálogo dividido em entradas menores
        this.cutsceneDialogue = [
            { speaker: "Sophia", text: "Asimov, você voltou! Conseguiu completar a missão?" },
            { speaker: "Asimov", text: "Missão concluída." },
            { speaker: "Asimov", text: "Analisei os padrões do ambiente e agora consigo desviar de todos os obstáculos à minha frente." },
            {
                speaker: "Asimov",
                text: "Porém… meus sistemas ainda não estão totalmente restaurados.\nMinha lógica está operando a aproximadamente 60% da capacidade.",
                autoMs: 4500
            },
            { speaker: "Sophia", text: "Entendo. Então… o que você encontrou? Tem algo para me mostrar?" },
            {
                speaker: "Asimov",
                text: "Sim. Durante a missão, coletei dados binários e um pergaminho com instruções."
            },
            {
                speaker: "Asimov",
                text: "Essas informações indicam que, para restaurar completamente minhas funções, preciso encontrar o cristal de energia que irá me reanimar."
            },
            { speaker: "Sophia", text: "E onde está esse cristal?" },
            {
                speaker: "Asimov",
                text: "Os dados indicam que ele está dentro de uma porta no laboratório.\nPara encontrá‑lo, precisamos localizar a porta correta."
            },
            {
                speaker: "Sophia",
                text: "Perfeito. Obrigada pelas informações, Asimov.\nVamos restaurar sua energia."
            },
            { speaker: "Asimov", text: "Objetivo atualizado: encontrar a porta correta do laboratório." },
            {
                speaker: "Sistema",
                text: "Parabéns!\nNova missão desbloqueada: Procure a porta correta.",
                autoMs: 4000
            }
        ];

        // caminhada lenta do Asimov de baixo para cima em direção à Sophia.
        this.playAnimIfNeeded(this.asimov, "asimov-walk-up");
        this.tweens.add({
        targets: this.asimov,
        y: this.sophia.y + 60,
        x: this.sophia.x,
        duration: 6800,
        ease: "Sine.inOut",
        onComplete: () => {
            this.updateAsimovAnimation(0, 0);
            // só abrimos o diálogo quando ele efetivamente chegar ao lado
            this.startDialogue(this.cutsceneDialogue, () => {
                this.time.delayedCall(400, () => this.startExploration());
            });
        }
        });
    }

    startDialogue(queue, onFinish) {
        this.dialogueQueue = queue;
        this.dialogueCursor = -1;
        this.onDialogueEnd = onFinish || null;
        this.isDialogueOpen = true;
        this.dialogueBox.setVisible(true);
        this.nameText.setVisible(true);
        this.dialogueText.setVisible(true);
        this.advanceBtnBg.setVisible(true);
        this.advanceBtnLabel.setVisible(true);
        this.advanceDialogue();
    }

    advanceDialogue() {
        if (!this.isDialogueOpen || this.awaitingChoice) return;

        this.clearChoiceButtons();
        if (this.autoTimer) {
        this.autoTimer.remove(false);
        this.autoTimer = null;
        }

        this.dialogueCursor += 1;
        if (this.dialogueCursor >= this.dialogueQueue.length) {
        this.closeDialogue();
        if (this.onDialogueEnd) this.onDialogueEnd();
        return;
        }

        const entry = this.dialogueQueue[this.dialogueCursor];
        this.nameText.setText(entry.speaker || "...");
        this.dialogueText.setText(entry.text || "");

        let choices = entry.choices;

        if (typeof choices === "function") {
        choices = choices.call(this);
        }

        if (choices && choices.length > 0) {
        this.awaitingChoice = true;
        this.advanceBtnBg.setVisible(false);
        this.advanceBtnLabel.setVisible(false);
        this.showChoices(entry);
        return;
        }

        this.awaitingChoice = false;
        this.advanceBtnBg.setVisible(true);
        this.advanceBtnLabel.setVisible(true);

        if (entry.autoMs) {
        this.autoTimer = this.time.delayedCall(entry.autoMs, () => {
            if (this.isDialogueOpen && !this.awaitingChoice) {
                this.advanceDialogue();
            }
        });
        }
    }

    showChoices(entry) {
        let choicesList = entry.choices;
        if (typeof choicesList === "function") {
            choicesList = choicesList.call(this);
        }
        entry.choices = choicesList; // mantém referência

        const rect = this.dialogueBoxRect || { x: 50, y: this.scale.height - 430, width: this.scale.width - 100, height: 180 };
        const centerX = rect.x + rect.width / 2;

        // calcular Y inicial para as choices garantindo que fiquem abaixo do texto do diálogo
        let startY = rect.y + 60;
        try {
            const textBounds = this.dialogueText.getBounds();
            const textBottom = textBounds.y + textBounds.height;
            // adiciona um pequeno padding abaixo do texto
            startY = Math.max(startY, textBottom + 12);
        } catch (e) {
            // se getBounds falhar, mantém o startY padrão
        }

        // ajustar espaçamento para caber dentro da caixa sem ultrapassar
        const availableHeight = rect.y + rect.height - startY - 12;
        let spacing = 48;
        if (choicesList.length * spacing > availableHeight && availableHeight > 0) {
            spacing = Math.max(28, availableHeight / choicesList.length);
        }

        // criar botões de escolha posicionados a partir de startY com o espaçamento calculado
        choicesList.forEach((choice, index) => {
            const y = startY + index * spacing;
            const bg = this.add.rectangle(centerX, y, rect.width - 80, Math.min(40, spacing - 6), 0x14334f, 0.96)
                .setStrokeStyle(1, 0x7cc3f5, 0.8)
                .setDepth(105)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(centerX, y, `${index + 1}. ${choice.label}`, {
                fontSize: "17px",
                color: "#e8f5ff"
            }).setOrigin(0.5).setDepth(106).setScrollFactor(0);

            bg.on("pointerdown", () => {
                this.awaitingChoice = false;
                this.clearChoiceButtons();
                this.nameText.setText("Sophia");
                this.dialogueText.setText(choice.response);

                if (typeof entry.afterChoice === "function") {
                    entry.afterChoice(choice);
                }

                if (Array.isArray(entry.choices)) {
                    entry.choices = entry.choices.filter(c => c.id !== choice.id);
                }

                const stillQuestions = !this.questionState.askedRestore || !this.questionState.askedPriority;
                if (stillQuestions) {
                    this.dialogueQueue.splice(this.dialogueCursor + 2, 0, {
                        speaker: "Asimov",
                        text: "",
                        hidden: true,
                        choices: () => entry.choices,
                        afterChoice: entry.afterChoice
                    });
                }

                this.time.delayedCall(1200, () => {
                    this.advanceDialogue();
                });
            });

            this.choiceButtons.push(bg, label);
        });
    }

    clearChoiceButtons() {
        this.choiceButtons.forEach((obj) => obj.destroy());
        this.choiceButtons.length = 0;
    }

    closeDialogue() {
        this.isDialogueOpen = false;
        this.awaitingChoice = false;
        this.dialogueBox.setVisible(false);
        this.nameText.setVisible(false);
        this.dialogueText.setVisible(false);
        this.advanceBtnBg.setVisible(false);
        this.advanceBtnLabel.setVisible(false);
        this.clearChoiceButtons();
    }

    startExploration() {
        this.gamePhase = "exploration";
        this.updateSophiaAnimation(0, 0);
        this.updateAsimovAnimation(0, 0);
    }

    handlePlayerMovement() {
        if (this.isDialogueOpen) {
        this.sophia.setVelocity(0, 0);
        this.updateSophiaAnimation(0, 0);
        return;
        }

        const left = this.cursors.left.isDown || this.keys.A.isDown;
        const right = this.cursors.right.isDown || this.keys.D.isDown;
        const up = this.cursors.up.isDown || this.keys.W.isDown;
        const down = this.cursors.down.isDown || this.keys.S.isDown;

        let vx = 0;
        let vy = 0;
        if (left) vx = -1;
        else if (right) vx = 1;
        if (up) vy = -1;
        else if (down) vy = 1;

        const vec = new Phaser.Math.Vector2(vx, vy).normalize();
        this.sophia.setVelocity(vec.x * this.playerSpeed, vec.y * this.playerSpeed);
        this.updateSophiaAnimation(vec.x, vec.y);
    }

    handleAsimovFollower() {
        // NPC seguidor: mantém uma distância pequena da Sophia.
        const desiredDistance = 60;
        const maxSpeed = 600;

        const dx = this.sophia.x - this.asimov.x;
        const dy = this.sophia.y - this.asimov.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > desiredDistance) {
        const dirX = dx / dist;
        const dirY = dy / dist;
        const speedFactor = Phaser.Math.Clamp((dist - desiredDistance) / 140, 0.25, 1);
        this.asimov.setVelocity(dirX * maxSpeed * speedFactor, dirY * maxSpeed * speedFactor);
        this.updateAsimovAnimation(dirX, dirY);
        } else {
        this.asimov.setVelocity(0, 0);
        this.updateAsimovAnimation(0, 0);
        }
    }

    handleObjectInteraction() {
        if (this.isDialogueOpen) {
        this.interactionHint.setVisible(false);
        return;
        }

        const nearest = this.findNearestInteractable();
        if (!nearest) {
        this.interactionHint.setVisible(false);
        return;
        }

        const prompt = `Pressione E para interagir com ${nearest.label}`;

        this.interactionHint.setText(prompt);
        this.interactionHint.setVisible(true);

        if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            this.startDialogue([
            { speaker: "Sophia", text: nearest.text }
            ], () => {
            this.isObjectReading = false;
            });
            this.isObjectReading = true;
        }
    }

    findNearestInteractable() {
        let nearest = null;
        let nearestDist = Number.POSITIVE_INFINITY;

        this.interactables.forEach((obj) => {
            // agora usamos as coordenadas reais do sprite
            const d = Phaser.Math.Distance.Between(
                this.sophia.x,
                this.sophia.y,
                obj.sprite.x,
                obj.sprite.y
            );
            if (d <= obj.radius && d < nearestDist) {
                nearest = obj;
                nearestDist = d;
            }
        });

        return nearest;
    }
}