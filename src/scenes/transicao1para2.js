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

        // Fundo do laboratório (escurecido) - alterado para usar o novo asset labDestruido.png e removido o tint, assumindo que a imagem já representa o estado destruído
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
        this.sophia = this.physics.add.sprite(w * 0.52, h * 0.58, "sophia").setScale(1.5).setDepth(12);
        this.sophia.setCollideWorldBounds(true);
        this.sophia.body.setSize(this.sophia.width * 0.45, this.sophia.height * 0.55, true);
        this.sophia.setInteractive({ useHandCursor: true });
        this.sophia.on("pointerdown", () => {
        if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
        this.startDialogue([{ speaker: "Sophia", text: "Sophia: O laboratório inteiro ainda carrega marcas do colapso." }]);
        });

        this.asimov = this.physics.add.sprite(w / 2 - 200, h * 0.58, "asimov").setScale(1.2).setDepth(12);
        this.asimov.setCollideWorldBounds(true);
        this.asimov.body.setSize(this.asimov.width * 0.45, this.asimov.height * 0.55, true);
        this.asimov.setInteractive({ useHandCursor: true });
        this.asimov.on("pointerdown", () => {
        if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
        this.startDialogue([{ speaker: "Asimov", text: "Asimov: Ainda há uma saída ao norte. Precisamos seguir." }]);
        });
        this.createCharacterAnimations();
        this.sophia.play("sophia-idle-down");
        this.asimov.play("asimov-idle-right");

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

        // Cena majoritariamente escura, iluminada apenas ao redor de Sophia e Asimov.
        this.darkOverlay = this.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.32).setDepth(30);
        this.lightSophiaOuter = this.add.circle(this.sophia.x, this.sophia.y, 120, 0xbfd8f1, 0.2)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(31);
        this.lightSophiaInner = this.add.circle(this.sophia.x, this.sophia.y, 92, 0xe3f1ff, 0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(32);
        this.lightAsimovOuter = this.add.circle(this.asimov.x, this.asimov.y, 140, 0xaed4f6, 0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(31);
        this.lightAsimovInner = this.add.circle(this.asimov.x, this.asimov.y, 78, 0xd8ecff, 0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(32);

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
        this.updateCharacterLights();

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
        const w = this.scale.width;
        const h = this.scale.height;

        this.dialogueBox = this.add.rectangle(w / 2, h - 96, w - 50, 150, 0x08111d, 0.9)
        .setStrokeStyle(2, 0x5aa4d8, 0.9)
        .setDepth(90)
        .setScrollFactor(0)
        .setVisible(false);

        this.nameText = this.add.text(44, h - 156, "", {
        fontSize: "21px",
        color: "#9dd8ff",
        fontStyle: "bold"
        }).setDepth(91).setScrollFactor(0).setVisible(false);

        this.dialogueText = this.add.text(44, h - 124, "", {
        fontSize: "19px",
        color: "#e8f4ff",
        wordWrap: { width: w - 180 }
        }).setDepth(91).setScrollFactor(0).setVisible(false);

        this.advanceBtnBg = this.add.rectangle(w - 88, h - 38, 118, 36, 0x154469, 0.95)
        .setStrokeStyle(1, 0x89cfff, 0.9)
        .setDepth(92)
        .setScrollFactor(0)
        .setVisible(false)
        .setInteractive({ useHandCursor: true });

        this.advanceBtnLabel = this.add.text(w - 88, h - 38, "Avançar", {
        fontSize: "16px",
        color: "#e8f4ff"
        }).setOrigin(0.5).setDepth(93).setScrollFactor(0).setVisible(false);

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
        this.cutsceneDialogue = [
            {
                speaker: "Asimov",
                text: "Meu núcleo também sofreu danos. Parte da minha memória está fragmentada e o banco de dados central está inacessível.",
                autoMs: 3500
            },
            {
                speaker: "Asimov",
                text: "Você terá que me guiar remotamente nos destroços. Meus módulos de navegação e desvio de obstáculos ainda estão comprometidos.",
                autoMs: 3500
            },
            {
                speaker: "Sophia",
                text: "",
                choices: () => {
                    const choices = [];
                    if (!this.questionState.askedRestore) {
                        choices.push({
                            id: "restore",
                            label: "Como restauramos seus dados?",
                            response: "Como restauramos seus dados e a infraestrutura?"
                        });
                    }
                    if (!this.questionState.askedPriority) {
                        choices.push({
                            id: "priority",
                            label: "Qual é nossa prioridade agora?",
                            response: "Qual é a prioridade para estabilizar o laboratório?"
                        });
                    }
                    return choices;
                },
                afterChoice: (choice) => {
                    if (choice.id === "restore") {
                        this.questionState.askedRestore = true;
                        this.dialogueQueue.splice(this.dialogueCursor + 1, 0, {
                            speaker: "Asimov",
                            text: "Precisamos reativar o núcleo do mapa energético com um cristal de silício azul, pontiagudo e de alto brilho.",
                            autoMs: 3600
                        });
                    }
                    if (choice.id === "priority") {
                        this.questionState.askedPriority = true;
                        this.dialogueQueue.splice(this.dialogueCursor + 1, 0, {
                            speaker: "Asimov",
                            text: "A busca começa na área de sucatas. Lá podem existir registros antigos sobre o cristal correto.",
                            autoMs: 3200
                        });
                    }
                }
            },
            {
                speaker: "Sophia",
                text: "Entendido. Vamos para a sucata, restaurar seu aprendizado e recuperar o núcleo energético."
            }
        ];

        // Caminhada lenta do Asimov em direção à Sophia durante a narrativa.
        this.playAnimIfNeeded(this.asimov, "asimov-walk-right");
        this.tweens.add({
        targets: this.asimov,
        x: this.sophia.x - 60,
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
        // não copia: usamos o mesmo objeto para manter o estado entre
        // reapresentações
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
        const w = this.scale.width;
        const h = this.scale.height;

        let choicesList = entry.choices;
        if (typeof choicesList === "function") {
            choicesList = choicesList.call(this);
        }
        entry.choices = choicesList; // mantém referência para futuras chamadas

        choicesList.forEach((choice, index) => {
            // Posiciona os botões dentro da caixa de diálogo (abaixo do texto, mas dentro da área)
            const y = h - 140 - (index * 48);  // Ajustado para ficar dentro da dialogueBox (que vai de ~h-171 a h-21)
            const bg = this.add.rectangle(w / 2, y, w - 90, 40, 0x14334f, 0.96)
                .setStrokeStyle(1, 0x7cc3f5, 0.8)
                .setDepth(95)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(w / 2, y, `${index + 1}. ${choice.label}`, {
                fontSize: "17px",
                color: "#e8f5ff"
            }).setOrigin(0.5).setDepth(96).setScrollFactor(0);

            bg.on("pointerdown", () => {

                this.awaitingChoice = false;
                this.clearChoiceButtons();

                // **Sophia pergunta** – exibimos na hora.
                this.nameText.setText("Sophia");
                this.dialogueText.setText(choice.response);

                if (typeof entry.afterChoice === "function") {
                    entry.afterChoice(choice);
                }

                // elimina a opção usada
                if (Array.isArray(entry.choices)) {
                    entry.choices = entry.choices.filter(c => c.id !== choice.id);
                }

                // se ainda há perguntas, insere um novo “há algo mais?” logo
                // após a resposta que acabamos de adicionar
                const stillQuestions =
                    !this.questionState.askedRestore ||
                    !this.questionState.askedPriority;

                if (stillQuestions) {
                    this.dialogueQueue.splice(this.dialogueCursor + 2, 0, {
                        speaker: "Asimov",
                        text: "Há algo mais que deseja perguntar?",
                        choices: () => entry.choices,
                        afterChoice: entry.afterChoice  // reaproveita a mesma função
                    });
                }

                // avança para a resposta imediatamente (após um curtíssimo
                // intervalo para o jogador digerir a pergunta)
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