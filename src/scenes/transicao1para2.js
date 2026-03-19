// =============================================================================
// CENA DE TRANSIÇÃO: transicao1para2
// Propósito: Exibir a cutscene final do laboratório destruído e redirecionar
//            o jogador para a cena "FaseDois".
// - O mapa e toda a decoração permanecem visíveis (sem interação nem colisão).
// - Não há exploração livre: o jogador apenas assiste à cutscene.
// - A tecla E (ou clique na tela) avança o diálogo.
// =============================================================================

export class transicao1para2 extends Phaser.Scene {
    constructor() {
        // Registra a cena com o identificador usado em this.scene.start(...)
        super("transicao1para2");
    }

    // -------------------------------------------------------------------------
    // PRELOAD: carrega todos os assets visuais do mapa + personagens
    // Os objetos são apenas decorativos aqui (sem física nem interação)
    // -------------------------------------------------------------------------
    preload() {
        // Mapa de fundo
        this.load.image("labDestruido", "assets/fases/sceneLabBranco01/labDestruido.png");

        // Spritesheets dos personagens
        this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });

        // Objetos decorativos do cenário (mesmos do original, mas sem física/interação)
        this.load.image("armarioD",      "assets/objetos/sceneLabBranco01/partTwo/armarioDestruido.png");
        this.load.image("alvoD",         "assets/objetos/sceneLabBranco01/partTwo/alvoDestruido.png");
        this.load.image("mesa1D",        "assets/objetos/sceneLabBranco01/partTwo/mesa1Destruida.png");
        this.load.image("mesa2D",        "assets/objetos/sceneLabBranco01/partTwo/mesa2Destruida.png");
        this.load.image("mesa3D",        "assets/objetos/sceneLabBranco01/partTwo/mesa3Destruida.png");
        this.load.image("piaD",          "assets/objetos/sceneLabBranco01/partTwo/piaDestruida.png");
        this.load.image("reservasCrioD", "assets/objetos/sceneLabBranco01/partTwo/reservasCrioDestruidas.png");
        this.load.image("comptCimaD",    "assets/objetos/sceneLabBranco01/partTwo/comptCimaDestruido.png");
        this.load.image("comptBaixoD",   "assets/objetos/sceneLabBranco01/partTwo/comptBaixoDestruido.png");
        this.load.image("criogeniaD",    "assets/objetos/sceneLabBranco01/partTwo/criogeniaDestruida.png");
        this.load.image("camara",        "assets/objetos/sceneLabBranco01/partOne/camara.png");
    }

    // -------------------------------------------------------------------------
    // CREATE: monta o cenário visual completo e inicia a cutscene
    // -------------------------------------------------------------------------
    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // --- Estado da cena ---------------------------------------------------
        // Apenas "cutscene" — não existe fase "exploration" nesta versão
        this.gamePhase      = "cutscene";
        this.isDialogueOpen = false;
        this.awaitingChoice = false;

<<<<<<< HEAD
        // --- Mapa de fundo ----------------------------------------------------
=======
        // Controle de perguntas feitas no diálogo inicial
        this.questionState = {
            askedRestore: false,
            askedPriority: false
        };

>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        this.mapa = this.add.image(w / 2, h / 2, "labDestruido").setScale(3);

        // --- Decoração do cenário (puramente visual, sem física) --------------
        // Mesmas posições relativas ao centro do mapa usadas na cena original.
        // setTint(0xaec0d1) aplica o tom azulado pós-apocalíptico do original.
        this.criarDecoracao();

<<<<<<< HEAD
        // --- Personagens ------------------------------------------------------
        // Sophia posicionada no centro-superior do mapa
=======
        // Paredes
        this.paredes = this.physics.add.staticGroup();
        let larguraParede = this.mapa.displayWidth;
        let alturaParede = 720;
        let centroX = this.mapa.x;
        let centroY = this.mapa.y;
        let espessura = 30;

        let paredeCima = this.add.rectangle(
            centroX,
            centroY - alturaParede / 2 + espessura / 2,
            larguraParede, espessura, 0xff0000, 0,
        );
        this.physics.add.existing(paredeCima, true);
        this.paredes.add(paredeCima);

        let paredeBaixo = this.add.rectangle(
            centroX,
            centroY + alturaParede / 2 - espessura / 2,
            larguraParede, espessura, 0xff0000, 0,
        );
        this.physics.add.existing(paredeBaixo, true);
        this.paredes.add(paredeBaixo);

        let paredeEsquerda = this.add.rectangle(
            centroX - larguraParede / 2 + espessura / 2,
            centroY, espessura, alturaParede, 0xff0000, 0,
        );
        this.physics.add.existing(paredeEsquerda, true);
        this.paredes.add(paredeEsquerda);

        let paredeDireita = this.add.rectangle(
            centroX + larguraParede / 2 - espessura / 2,
            centroY, espessura, alturaParede, 0xff0000, 0,
        );
        this.physics.add.existing(paredeDireita, true);
        this.paredes.add(paredeDireita);

        // Personagens principais.
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        this.sophia = this.physics.add.sprite(this.mapa.x, this.mapa.y - 300, "sophia")
            .setScale(2)
            .setDepth(12);
        this.sophia.body.setAllowGravity(false); // top-down: sem gravidade
        this.sophia.setCollideWorldBounds(true);
        this.sophia.setSize(30, 25);
        this.sophia.setOffset(15, 30);
<<<<<<< HEAD
=======
        this.sophia.setInteractive({ useHandCursor: true });
        this.sophia.on("pointerdown", () => {
            if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
            this.startDialogue([{ speaker: "Sophia", text: "O laboratório inteiro ainda carrega marcas do colapso." }]);
        });
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31

        // Asimov começa abaixo e caminha até Sophia via Tween na cutscene
        this.asimov = this.physics.add.sprite(this.mapa.x, this.mapa.y + 200, "asimov")
            .setScale(3)
            .setDepth(12);
        this.asimov.body.setAllowGravity(false);
        this.asimov.setCollideWorldBounds(true);
        this.asimov.setSize(15, 12);
        this.asimov.setOffset(8, 16);
<<<<<<< HEAD

        // Cria todas as animações de walk/idle para ambos os personagens
=======
        this.asimov.setInteractive({ useHandCursor: true });
        this.asimov.on("pointerdown", () => {
            if (this.gamePhase !== "exploration" || this.isDialogueOpen) return;
            this.startDialogue([{ speaker: "Asimov", text: "Ainda há uma saída ao norte. Precisamos seguir." }]);
        });
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        this.createCharacterAnimations();

        // Poses iniciais: Sophia olhando para baixo, Asimov para a direita
        this.sophia.play("sophia-idle-down");
        this.asimov.play("asimov-idle-right");

<<<<<<< HEAD
        // --- Câmera ----------------------------------------------------------
        this.cameras.main.setBounds(0, 0, w, h);
        this.cameras.main.startFollow(this.sophia); // câmera acompanha Sophia
        this.cameras.main.fadeIn(1000);             // fade-in suave de 1 segundo

        // --- Interface de diálogo --------------------------------------------
        this.createDialogueUI();

        // --- Controles: apenas a tecla E para avançar diálogo ----------------
        this.keys = this.input.keyboard.addKeys({
            E: Phaser.Input.Keyboard.KeyCodes.E
        });

        // --- Dispara a cutscene automaticamente ------------------------------
        this.startIntroCutscene();
    }

    // -------------------------------------------------------------------------
    // DECORAÇÃO: adiciona todos os objetos visuais do mapa sem física
    // Posições idênticas às do cenário original (relativas ao centro do mapa)
    // -------------------------------------------------------------------------
    criarDecoracao() {
        // Lista de objetos decorativos: mesmos keys, posições e escalas do original
        const decoracao = [
            { key: "mesa3D",        x: -410, y: -260, scale: 3.0  },
            { key: "mesa1D",        x: -257, y: -380, scale: 3.0  },
            { key: "mesa2D",        x:  258, y: -382, scale: 3.0  },
            { key: "mesa3D",        x:  393, y:  118, scale: 3.0  },
            { key: "piaD",          x: -397, y:   70, scale: 3.0  },
            { key: "criogeniaD",    x:    0, y: -394, scale: 3.0  },
            { key: "reservasCrioD", x:  423, y: -235, scale: 3.0  },
            { key: "armarioD",      x: -380, y: -390, scale: 3.25 },
            { key: "armarioD",      x:  380, y: -390, scale: 3.25 },
            { key: "alvoD",         x: -385, y: -125, scale: 3.0  },
            { key: "alvoD",         x:  365, y:  -25, scale: 3.1  },
            { key: "comptBaixoD",   x: -215, y: -140, scale: 3.0  },
            { key: "comptBaixoD",   x:  212, y: -140, scale: 3.0  },
            { key: "comptBaixoD",   x: -215, y:   50, scale: 3.0  },
            { key: "comptBaixoD",   x:  212, y:   50, scale: 3.0  },
            { key: "camara",        x:    0, y: -380, scale: 0.25 },
        ];

        decoracao.forEach((obj) => {
            // Converte posição relativa → absoluta usando o centro do mapa
=======
        // Camera
        this.cameras.main.setBounds(0, 0, w, h);
        this.cameras.main.startFollow(this.sophia);
        this.cameras.main.fadeIn(1000);

        // Colisões
        this.physics.add.collider(this.sophia, this.asimov, () => {
            this.asimov.setVelocity(0, 0);
        });
        this.physics.add.collider(this.sophia, this.paredes);
        this.physics.add.collider(this.asimov, this.paredes);

        // Objetos interagíveis
        this.interactables = [];
        this.objetosColisao = this.physics.add.staticGroup();
        this.createInteractables();

        // UI de dica de interação
        this.interactionHint = this.add.text(w / 2, h - 140, "", {
            fontSize: "18px",
            color: "#d6ebff",
            backgroundColor: "rgba(8,18,28,0.75)",
            padding: { left: 10, right: 10, top: 6, bottom: 6 }
        }).setOrigin(0.5).setDepth(80).setVisible(false).setScrollFactor(0);

        // Sistema de diálogo
        this.createDialogueUI();

        // Controles
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

        // Início da cutscene
        this.startIntroCutscene();
    }

    update() {
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

        if (this.isDialogueOpen && !this.awaitingChoice) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
                this.advanceDialogue();
            }
        }
    }

    createInteractables() {
        const data = [
            { key: "mesa3D",       x: -410, y: -260, scale: 3.0,  label: "computador",           text: "Os logs mostram falhas na rede global. O colapso foi em cascata." },
            { key: "mesa1D",       x: -257, y: -380, scale: 3.0,  label: "mesa",                  text: "Ferramentas cirúrgicas e circuitos... alguém improvisou reparos às pressas." },
            { key: "mesa2D",       x:  258, y: -382, scale: 3.0,  label: "telas quebradas",       text: "Os monitores queimaram, mas ainda há sinais de tentativa de evacuação." },
            { key: "mesa3D",       x:  393, y:  118, scale: 3.0,  label: "terminal",              text: "'Projeto Aurora suspenso'. Isso foi depois do congelamento." },
            { key: "piaD",         x: -397, y:   70, scale: 3.0,  label: "documentos",            text: "Papel envelhecido. 'Protocolos de contenção falharam'." },
            { key: "criogeniaD",   x:    0, y: -394, scale: 3.0,  label: "capsula criogênica",    text: "Minha cápsula... As leituras ficaram estáveis por décadas." },
            { key: "reservasCrioD",x:  423, y: -235, scale: 3.0,  label: "registro",              text: "Mensagem antiga: 'Se acordar, procure a saída norte'." },
            { key: "armarioD",     x: -380, y: -390, scale: 3.25, label: "armário destruído",     text: "Este armário guarda vestígios de equipamentos médicos abandonados. Tudo em ruínas." },
            { key: "armarioD",     x:  380, y: -390, scale: 3.25, label: "armário destruído",     text: "Outro armário, similar ao anterior. Materiais de laboratório espalhados pelo chão." },
            { key: "alvoD",        x: -385, y: -125, scale: 3.0,  label: "alvo destruído",        text: "Um alvo de treinamento, agora inutilizado. Lembra dos dias de simulações." },
            { key: "alvoD",        x:  365, y:  -25, scale: 3.1,  label: "alvo destruído",        text: "Mais um alvo, corroído pelo tempo. O laboratório era um lugar de testes rigorosos." },
            { key: "comptBaixoD",  x: -215, y: -140, scale: 3.0,  label: "computador destruído",  text: "Painéis de controle queimados. Não há energia para reativar." },
            { key: "comptBaixoD",  x:  212, y: -140, scale: 3.0,  label: "computador destruído",  text: "Outro terminal, com cabos expostos. O sistema central falhou aqui." },
            { key: "comptBaixoD",  x: -215, y:   50, scale: 3.0,  label: "computador destruído",  text: "Mais controles destruídos. Registros de emergência perdidos." },
            { key: "comptBaixoD",  x:  212, y:   50, scale: 3.0,  label: "computador destruído",  text: "Terminais similares, todos inoperantes. O colapso afetou tudo." },
            { key: "camara",       x:    0, y: -380, scale: 0.25, label: "câmera",                text: "Uma câmera de segurança antiga. Talvez ainda haja gravações, mas sem energia..." }
        ];

        data.forEach((obj) => {
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
            const absX = this.mapa.x + obj.x;
            const absY = this.mapa.y + obj.y;

            this.add.image(absX, absY, obj.key)
                .setScale(obj.scale)
<<<<<<< HEAD
                .setDepth(11)       // mesmo depth do original (abaixo dos personagens)
                .setTint(0xaec0d1); // tom azulado pós-apocalíptico
            // Sem setInteractive, sem physics.add.existing: puramente visual
        });
    }

    // =========================================================================
    // UPDATE: executado a cada frame
    // Apenas verifica tecla E para avançar diálogo. Sem movimento do jogador.
    // =========================================================================
    update() {
        // Depth dinâmico por Y: personagem mais baixo na tela fica "na frente"
        if (this.sophia) this.sophia.setDepth(this.sophia.y);
        if (this.asimov) this.asimov.setDepth(this.asimov.y);

        // Durante cutscene: mantém Sophia completamente parada
        if (this.gamePhase === "cutscene") {
            this.sophia.setVelocity(0, 0);
            // Asimov se move via Tween (controlado por startIntroCutscene)
        }

        // Tecla E avança o diálogo (quando não há escolha ativa)
        if (this.isDialogueOpen && !this.awaitingChoice) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
                this.advanceDialogue();
            }
        }
    }

    // =========================================================================
    // CUTSCENE PRINCIPAL
    // =========================================================================
    startIntroCutscene() {
        // Roteiro completo do diálogo desta cena
        this.cutsceneDialogue = [
            { speaker: "Sophia", text: "Asimov, você voltou! Conseguiu completar a missão?" },
            { speaker: "Asimov", text: "Missão concluída!" },
            { speaker: "Asimov", text: "Analisei os padrões do ambiente e agora consigo desviar de todos os obstáculos à minha frente." },
            {
                // autoMs: avança automaticamente após 4,5s sem precisar pressionar E
                speaker: "Asimov",
                text:    "Porém… meus sistemas ainda não estão totalmente restaurados.",
                autoMs:  4500
            },
            { speaker: "Sophia", text: "Entendo. Então… o que você encontrou? Tem algo para me mostrar?" },
            { speaker: "Asimov", text: "Sim. Durante a missão, coletei números binários e um pergaminho com instruções e a imagem de uma porta." },
            { speaker: "Asimov", text: "Essas informações indicam que precisamos seguir as pistas para encontrar o cristal capaz de restaurar a energia do laboratório." },
            { speaker: "Sophia", text: "E onde está esse cristal?" },
            { speaker: "Asimov", text: "Os dados indicam que ele está dentro de uma porta no laboratório.\nPara encontrá‑lo, precisamos localizar a porta correta." },
            { speaker: "Sophia", text: "Perfeito. Obrigada pelas informações, Asimov.\nVamos restaurar sua energia." },
            { speaker: "Asimov", text: "Objetivo atualizado: encontrar a porta correta do laboratório." },
            {
                // Mensagem do sistema: anuncia a transição e avança sozinha após 4s
                speaker: "Sistema",
                text:    "Asimov conduziu Sophia até a Sala das Portas.\nA próxima etapa começa agora...",
                autoMs:  4000
            }
        ];

        // Asimov caminha de baixo (mapa.y + 200) até 60px abaixo de Sophia via Tween
        this.playAnimIfNeeded(this.asimov, "asimov-walk-up");
        this.tweens.add({
            targets:  this.asimov,
            y:        this.sophia.y + 60, // para ao lado de Sophia
            x:        this.sophia.x,
            duration: 6800,               // 6,8 segundos de caminhada suave
            ease:     "Sine.inOut",       // aceleração/desaceleração natural

            onComplete: () => {
                // Para a animação de caminhar ao chegar
                this.updateAsimovAnimation(0, 0);

                // Inicia o diálogo; ao terminar, faz fade-out e muda de cena
                this.startDialogue(this.cutsceneDialogue, () => {
                    this.time.delayedCall(600, () => {
                        // Fade-out preto antes de ir para a próxima cena
                        this.cameras.main.fadeOut(1200, 0, 0, 0);
                        this.cameras.main.once("camerafadeoutcomplete", () => {
                            // *** TRANSIÇÃO PARA A CENA DO CRISTAL ***
                            this.scene.start('FaseDois');
                        });
                    });
                });
            }
        });
    }

    // =========================================================================
    // SISTEMA DE DIÁLOGO
    // =========================================================================

    // Cria toda a interface visual da caixa de diálogo
    createDialogueUI() {
        const larguraJogo  = this.cameras.main.width;
        const alturaJogo   = this.cameras.main.height;
        const larguraCaixa = 1000;
        const alturaCaixa  = 180;
        const xCaixa = (larguraJogo - larguraCaixa) / 2;
        const yCaixa = alturaJogo - alturaCaixa - 80; // posicionada no rodapé

        // Fundo escuro com borda ciano (igual ao original)
=======
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

            this.physics.add.existing(sprite, true);
            const body = sprite.body;
            body.setSize(sprite.displayWidth * 0.6, sprite.displayHeight * 0.4, true);
            this.objetosColisao.add(sprite);

            this.interactables.push({ ...obj, sprite, radius: 76 });
        });

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
        const yCaixa = alturaJogo - alturaCaixa - 80;

        // Caixa visual
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

<<<<<<< HEAD
        // Alias usado pelos métodos de diálogo
        this.dialogueBox     = this.caixaDialogo;
        this.dialogueBoxRect = { x: xCaixa, y: yCaixa, width: larguraCaixa, height: alturaCaixa };

        // Texto da fala (fonte monoespaçada, cor azul-claro)
        this.textoDialogo = this.add.text(xCaixa + 40, yCaixa + 35, "", {
            fontSize:    "26px",
            fontFamily:  "'Courier New', Courier, monospace",
            color:       "#ccffff",
            wordWrap:    { width: larguraCaixa - 120 },
            lineSpacing: 10,
        }).setScrollFactor(0).setDepth(101).setVisible(false);
        this.dialogueText = this.textoDialogo;

        // Nome do personagem falante (acima da caixa)
        this.nameText = this.add.text(xCaixa + 44, yCaixa - 26, "", {
            fontSize:  "21px",
            color:     "#9dd8ff",
            fontStyle: "bold"
        }).setDepth(101).setScrollFactor(0).setVisible(false);

        // Retângulo invisível cobrindo a tela inteira — captura cliques para avançar
=======
        this.dialogueBoxRect = { x: xCaixa, y: yCaixa, width: larguraCaixa, height: alturaCaixa };

        // Texto do diálogo
        this.textoDialogo = this.add.text(xCaixa + 40, yCaixa + 35, "", {
            fontSize: "26px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#ccffff",
            wordWrap: { width: larguraCaixa - 120 },
            lineSpacing: 10,
        }).setScrollFactor(0).setDepth(1001).setVisible(false);

        // Aliases de compatibilidade
        this.dialogueBox = this.caixaDialogo;
        this.dialogueText = this.textoDialogo;

        // Label do nome do falante — acima da borda esquerda da caixa (padrão das outras cenas)
        this.nameText = this.add.text(xCaixa + 16, yCaixa - 28, "", {
            fontSize: "20px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#00ffff",
            fontStyle: "bold",
            backgroundColor: "#1a1a1a",
            padding: { left: 8, right: 8, top: 3, bottom: 3 },
        }).setScrollFactor(0).setDepth(1002).setVisible(false);

        // Botão de avanço invisível cobrindo toda a tela
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        const camW = this.cameras.main.width;
        const camH = this.cameras.main.height;
        this.advanceBtnBg = this.add.rectangle(camW / 2, camH / 2, camW, camH, 0x000000, 0)
            .setDepth(200)
            .setScrollFactor(0)
            .setVisible(false)
            .setInteractive({ useHandCursor: true });

<<<<<<< HEAD
        // Label oculto mantido por compatibilidade estrutural
=======
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
        this.advanceBtnLabel = this.add.text(0, 0, "Avançar", {
            fontSize: "16px",
            color:    "#e8f4ff"
        }).setOrigin(0.5).setDepth(201).setScrollFactor(0).setVisible(false);

        // Clique em qualquer lugar da tela também avança o diálogo
        this.advanceBtnBg.on("pointerdown", () => {
            if (this.isDialogueOpen && !this.awaitingChoice) {
                this.advanceDialogue();
            }
        });

        // Array de botões de escolha (não usados nesta cena, mantido por estrutura)
        this.choiceButtons = [];
    }

<<<<<<< HEAD
    // Inicia um diálogo a partir de uma fila (queue) de entradas
    // onFinish: callback chamado quando o diálogo termina completamente
=======
    createCharacterAnimations() {
        if (!this.anims.exists("sophia-walk-down")) {
            this.anims.create({ key: "sophia-walk-down",  frames: this.anims.generateFrameNumbers("sophia", { start: 0,  end: 7  }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-left",  frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-up",    frames: this.anims.generateFrameNumbers("sophia", { start: 8,  end: 15 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-idle-down",  frames: [{ key: "sophia", frame: 0  }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-left",  frames: [{ key: "sophia", frame: 24 }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-right", frames: [{ key: "sophia", frame: 16 }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-up",    frames: [{ key: "sophia", frame: 8  }], frameRate: 1 });
        }

        if (!this.anims.exists("asimov-walk-down")) {
            this.anims.create({ key: "asimov-walk-down",  frames: this.anims.generateFrameNumbers("asimov", { start: 7,  end: 9  }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-left",  frames: this.anims.generateFrameNumbers("asimov", { start: 21, end: 26 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-right", frames: this.anims.generateFrameNumbers("asimov", { start: 28, end: 34 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-up",    frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-idle-down",  frames: [{ key: "asimov", frame: 7  }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-left",  frames: [{ key: "asimov", frame: 21 }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-right", frames: [{ key: "asimov", frame: 28 }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-up",    frames: [{ key: "asimov", frame: 14 }], frameRate: 1 });
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
            { speaker: "Sophia", text: "Asimov, você voltou! Conseguiu completar a missão?" },
            { speaker: "Asimov", text: "Missão concluída." },
            { speaker: "Asimov", text: "Analisei os padrões do ambiente e agora consigo desviar de todos os obstáculos à minha frente." },
            { speaker: "Asimov", text: "Porém… meus sistemas ainda não estão totalmente restaurados.\nMinha lógica está operando a aproximadamente 60% da capacidade.", autoMs: 4500 },
            { speaker: "Sophia", text: "Entendo. Então… o que você encontrou? Tem algo para me mostrar?" },
            { speaker: "Asimov", text: "Sim. Durante a missão, coletei dados binários e um pergaminho com instruções." },
            { speaker: "Asimov", text: "Essas informações indicam que, para restaurar completamente minhas funções, preciso encontrar o cristal de energia que irá me reanimar." },
            { speaker: "Sophia", text: "E onde está esse cristal?" },
            { speaker: "Asimov", text: "Os dados indicam que ele está dentro de uma porta no laboratório.\nPara encontrá‑lo, precisamos localizar a porta correta." },
            { speaker: "Sophia", text: "Perfeito. Obrigada pelas informações, Asimov.\nVamos restaurar sua energia." },
            { speaker: "Asimov", text: "Objetivo atualizado: encontrar a porta correta do laboratório." },
            { speaker: "Sistema", text: "Parabéns!\nNova missão desbloqueada: Procure a porta correta.", autoMs: 4000 }
        ];

        this.playAnimIfNeeded(this.asimov, "asimov-walk-up");
        this.tweens.add({
            targets: this.asimov,
            y: this.sophia.y + 60,
            x: this.sophia.x,
            duration: 6800,
            ease: "Sine.inOut",
            onComplete: () => {
                this.updateAsimovAnimation(0, 0);
                this.startDialogue(this.cutsceneDialogue, () => {
                    this.time.delayedCall(400, () => this.startExploration());
                });
            }
        });
    }

>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
    startDialogue(queue, onFinish) {
        this.dialogueQueue  = queue;
        this.dialogueCursor = -1;         // começa em -1; advanceDialogue vai para 0
        this.onDialogueEnd  = onFinish || null;
        this.isDialogueOpen = true;

        // Torna visíveis todos os elementos da UI
        this.dialogueBox.setVisible(true);
        this.nameText.setVisible(true);
        this.dialogueText.setVisible(true);
        this.advanceBtnBg.setVisible(true);
        this.advanceBtnLabel.setVisible(true);

        this.advanceDialogue(); // exibe imediatamente a primeira entrada
    }

    // Avança para a próxima entrada da fila de diálogo
    advanceDialogue() {
        if (!this.isDialogueOpen || this.awaitingChoice) return;

        this.clearChoiceButtons();

        // Cancela timer de avanço automático se houver um ativo
        if (this.autoTimer) {
            this.autoTimer.remove(false);
            this.autoTimer = null;
        }

        this.dialogueCursor += 1;

        // Fim da fila: fecha o diálogo e dispara o callback final
        if (this.dialogueCursor >= this.dialogueQueue.length) {
            this.closeDialogue();
            if (this.onDialogueEnd) this.onDialogueEnd();
            return;
        }

        const entry = this.dialogueQueue[this.dialogueCursor];
<<<<<<< HEAD
        this.nameText.setText(entry.speaker || "...");
        this.dialogueText.setText(entry.text   || "");
=======

        // Atualiza o label do nome com o estilo padrão
        if (entry.speaker && entry.speaker.trim() !== "") {
            this.nameText.setText(entry.speaker);
            this.nameText.setVisible(true);
        } else {
            this.nameText.setVisible(false);
        }

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
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31

        // Se a entrada tem autoMs: avança sozinha após N milissegundos
        if (entry.autoMs) {
            this.autoTimer = this.time.delayedCall(entry.autoMs, () => {
                if (this.isDialogueOpen && !this.awaitingChoice) {
<<<<<<< HEAD
=======
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
        entry.choices = choicesList;

        const rect = this.dialogueBoxRect || { x: 50, y: this.scale.height - 430, width: this.scale.width - 100, height: 180 };
        const centerX = rect.x + rect.width / 2;

        let startY = rect.y + 60;
        try {
            const textBounds = this.dialogueText.getBounds();
            startY = Math.max(startY, textBounds.y + textBounds.height + 12);
        } catch (e) {}

        const availableHeight = rect.y + rect.height - startY - 12;
        let spacing = 48;
        if (choicesList.length * spacing > availableHeight && availableHeight > 0) {
            spacing = Math.max(28, availableHeight / choicesList.length);
        }

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
                this.nameText.setVisible(true);
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
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
                    this.advanceDialogue();
                }
            });
        }
    }

    // Remove da tela todos os botões de escolha ativos
    clearChoiceButtons() {
        this.choiceButtons.forEach((obj) => obj.destroy());
        this.choiceButtons.length = 0;
    }

    // Fecha e oculta todos os elementos da UI de diálogo
    closeDialogue() {
        this.isDialogueOpen  = false;
        this.awaitingChoice  = false;
        this.dialogueBox.setVisible(false);
        this.nameText.setVisible(false);
        this.dialogueText.setVisible(false);
        this.advanceBtnBg.setVisible(false);
        this.advanceBtnLabel.setVisible(false);
        this.clearChoiceButtons();
    }

    // =========================================================================
    // ANIMAÇÕES DOS PERSONAGENS
    // =========================================================================

<<<<<<< HEAD
    // Cria todas as animações de walk e idle para Sophia e Asimov
    // Guards (anims.exists) evitam recriar animações já existentes de outra cena
    createCharacterAnimations() {
        // --- Sophia: spritesheet 64x64, 8 frames por linha ---
        if (!this.anims.exists("sophia-walk-down")) {
            this.anims.create({ key: "sophia-walk-down",  frames: this.anims.generateFrameNumbers("sophia", { start: 0,  end: 7  }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-up",    frames: this.anims.generateFrameNumbers("sophia", { start: 8,  end: 15 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-walk-left",  frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "sophia-idle-down",  frames: [{ key: "sophia", frame: 0  }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-up",    frames: [{ key: "sophia", frame: 8  }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-right", frames: [{ key: "sophia", frame: 16 }], frameRate: 1 });
            this.anims.create({ key: "sophia-idle-left",  frames: [{ key: "sophia", frame: 24 }], frameRate: 1 });
        }

        // --- Asimov: spritesheet 32x32 ---
        if (!this.anims.exists("asimov-walk-down")) {
            this.anims.create({ key: "asimov-walk-down",  frames: this.anims.generateFrameNumbers("asimov", { start: 7,  end: 9  }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-up",    frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-right", frames: this.anims.generateFrameNumbers("asimov", { start: 28, end: 34 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-walk-left",  frames: this.anims.generateFrameNumbers("asimov", { start: 21, end: 26 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "asimov-idle-down",  frames: [{ key: "asimov", frame: 7  }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-up",    frames: [{ key: "asimov", frame: 14 }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-right", frames: [{ key: "asimov", frame: 28 }], frameRate: 1 });
            this.anims.create({ key: "asimov-idle-left",  frames: [{ key: "asimov", frame: 21 }], frameRate: 1 });
        }
    }

    // Só troca a animação se ela for diferente da atual (evita reiniciar o loop)
    playAnimIfNeeded(sprite, key) {
        if (!sprite.anims.currentAnim || sprite.anims.currentAnim.key !== key) {
            sprite.play(key, true);
        }
    }

    // Atualiza a animação de Asimov com base na velocidade normalizada (vx, vy)
    updateAsimovAnimation(vx, vy) {
        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
            // Parado: toca idle na última direção conhecida
            const facing = this.asimovFacing || "right";
            this.playAnimIfNeeded(this.asimov, `asimov-idle-${facing}`);
            return;
        }
        // Direção dominante: horizontal ou vertical
        if (Math.abs(vx) > Math.abs(vy)) {
            this.asimovFacing = vx > 0 ? "right" : "left";
        } else {
            this.asimovFacing = vy > 0 ? "down" : "up";
        }
        this.playAnimIfNeeded(this.asimov, `asimov-walk-${this.asimovFacing}`);
=======
    handlePlayerMovement() {
        if (this.isDialogueOpen) {
            this.sophia.setVelocity(0, 0);
            this.updateSophiaAnimation(0, 0);
            return;
        }

        const left  = this.cursors.left.isDown  || this.keys.A.isDown;
        const right = this.cursors.right.isDown || this.keys.D.isDown;
        const up    = this.cursors.up.isDown    || this.keys.W.isDown;
        const down  = this.cursors.down.isDown  || this.keys.S.isDown;

        let vx = 0, vy = 0;
        if (left)       vx = -1;
        else if (right) vx =  1;
        if (up)         vy = -1;
        else if (down)  vy =  1;

        const vec = new Phaser.Math.Vector2(vx, vy).normalize();
        this.sophia.setVelocity(vec.x * this.playerSpeed, vec.y * this.playerSpeed);
        this.updateSophiaAnimation(vec.x, vec.y);
    }

    handleAsimovFollower() {
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

        this.interactionHint.setText(`Pressione E para interagir com ${nearest.label}`);
        this.interactionHint.setVisible(true);

        if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            this.startDialogue([{ speaker: "Sophia", text: nearest.text }], () => {
                this.isObjectReading = false;
            });
            this.isObjectReading = true;
        }
    }

    findNearestInteractable() {
        let nearest = null;
        let nearestDist = Number.POSITIVE_INFINITY;

        this.interactables.forEach((obj) => {
            const d = Phaser.Math.Distance.Between(
                this.sophia.x, this.sophia.y,
                obj.sprite.x, obj.sprite.y
            );
            if (d <= obj.radius && d < nearestDist) {
                nearest = obj;
                nearestDist = d;
            }
        });

        return nearest;
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
    }
}