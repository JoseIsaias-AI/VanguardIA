// =============================================================================
// CENA DE TRANSIÇÃO: transicao1para2
// Propósito: Exibir a cutscene final do laboratório destruído e redirecionar
//            o jogador para a cena "FaseDois".
// - O mapa e toda a decoração permanecem visíveis (sem interação nem colisão).
// - Não há exploração livre: o jogador apenas assiste à cutscene.
// - A tecla E (ou clique na tela) avança o diálogo.
// =============================================================================
import { registrarTeclaMenu } from '../menu.js';

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
        this.load.image("labDestruido", "assets/fases/sceneLBPassado/labDestruido.png");

        // Spritesheets dos personagens
        this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });

        // Objetos decorativos do cenário (mesmos do original, mas sem física/interação)
        this.load.image("armarioD",      "assets/objetos/sceneLBPassado/partTwo/armarioDestruido.png");
        this.load.image("alvoD",         "assets/objetos/sceneLBPassado/partTwo/alvoDestruido.png");
        this.load.image("mesa1D",        "assets/objetos/sceneLBPassado/partTwo/mesa1Destruida.png");
        this.load.image("mesa2D",        "assets/objetos/sceneLBPassado/partTwo/mesa2Destruida.png");
        this.load.image("mesa3D",        "assets/objetos/sceneLBPassado/partTwo/mesa3Destruida.png");
        this.load.image("piaD",          "assets/objetos/sceneLBPassado/partTwo/piaDestruida.png");
        this.load.image("reservasCrioD", "assets/objetos/sceneLBPassado/partTwo/reservasCrioDestruidas.png");
        this.load.image("comptCimaD",    "assets/objetos/sceneLBPassado/partTwo/comptCimaDestruido.png");
        this.load.image("comptBaixoD",   "assets/objetos/sceneLBPassado/partTwo/comptBaixoDestruido.png");
        this.load.image("criogeniaD",    "assets/objetos/sceneLBPassado/partTwo/criogeniaDestruida.png");
        this.load.image("camara",        "assets/objetos/sceneLBPassado/partOne/camara.png");
    }

    // -------------------------------------------------------------------------
    // CREATE: monta o cenário visual completo e inicia a cutscene
    // -------------------------------------------------------------------------
    create() {
        registrarTeclaMenu(this);

        // Inicia a cena de música de fundo (bgMusic) para manter a trilha sonora ativa durante a transição.
        this.scene.launch("bgMusic");

        const w = this.scale.width;
        const h = this.scale.height;

        // --- Estado da cena ---------------------------------------------------
        this.gamePhase      = "cutscene";
        this.isDialogueOpen = false;
        this.awaitingChoice = false;

        // --- Mapa de fundo ----------------------------------------------------
        this.mapa = this.add.image(w / 2, h / 2, "labDestruido").setScale(3);

        // --- Decoração do cenário (puramente visual, sem física) --------------
        this.criarDecoracao();

        // --- Personagens ------------------------------------------------------
        this.sophia = this.physics.add.sprite(this.mapa.x, this.mapa.y - 300, "sophia")
            .setScale(2)
            .setDepth(12);
        this.sophia.body.setAllowGravity(false);
        this.sophia.setCollideWorldBounds(true);
        this.sophia.setSize(30, 25);
        this.sophia.setOffset(15, 30);

        // Asimov começa abaixo e caminha até Sophia via Tween na cutscene
        this.asimov = this.physics.add.sprite(this.mapa.x, this.mapa.y + 200, "asimov")
            .setScale(3)
            .setDepth(12);
        this.asimov.body.setAllowGravity(false);
        this.asimov.setCollideWorldBounds(true);
        this.asimov.setSize(15, 12);
        this.asimov.setOffset(8, 16);

        // Cria todas as animações de walk/idle para ambos os personagens
        this.createCharacterAnimations();

        // Poses iniciais: Sophia olhando para baixo, Asimov para a direita
        this.sophia.play("sophia-idle-down");
        this.asimov.play("asimov-idle-right");

        // --- Câmera ----------------------------------------------------------
        this.cameras.main.setBounds(0, 0, w, h);
        this.cameras.main.startFollow(this.sophia);
        this.cameras.main.fadeIn(1000);

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
            const absX = this.mapa.x + obj.x;
            const absY = this.mapa.y + obj.y;

            this.add.image(absX, absY, obj.key)
                .setScale(obj.scale)
                .setDepth(11)       // abaixo dos personagens (depth ~300-500 deles)
                .setTint(0xaec0d1); // tom azulado pós-apocalíptico
        });
    }

    // =========================================================================
    // UPDATE: executado a cada frame
    // =========================================================================
    update() {
        // Depth dinâmico por Y — personagem mais baixo na tela fica "na frente"
        if (this.sophia) this.sophia.setDepth(this.sophia.y);
        if (this.asimov) this.asimov.setDepth(this.asimov.y);

        // Durante cutscene: mantém Sophia parada
        if (this.gamePhase === "cutscene") {
            this.sophia.setVelocity(0, 0);
        }

        // Tecla E avança o diálogo
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
        this.cutsceneDialogue = [
            { speaker: "Sophia", text: "Então, Asimov, como foi a missão?" },
            { speaker: "Asimov", text: "Obrigada pela ajuda, Sophia! Agora aprendi através da repetição de padrões e posso me movimentar sozinho." },
            { speaker: "Asimov", text: "Analisei os padrões do ambiente e agora consigo desviar de todos os obstáculos à minha frente." },
            {
                speaker: "Asimov",
                text:    "Porém… meus sistemas ainda não estão totalmente restaurados.",
                autoMs:  4500
            },
            { speaker: "Sophia", text: "Entendo. Então… o que você encontrou? Tem algo para me mostrar?" },
            { speaker: "Asimov", text: "Sim. Durante a missão, coletei números binários e um pergaminho com instruções." },
            { speaker: "Asimov", text: "Essas informações indicam que precisamos seguir as pistas para encontrar o cristal capaz de restaurar a energia do laboratório." },
            { speaker: "Sophia", text: "E onde está esse cristal?" },
            { speaker: "Asimov", text: "O pergaminho indica que ele está dentro de uma porta no laboratório.\nPara encontrá‑lo, precisamos localizar a porta correta." },
            { speaker: "Sophia", text: "Perfeito. Obrigada pelas informações, Asimov.\nVamos restaurar sua energia." },
            { speaker: "Asimov", text: "Objetivo atualizado: encontrar a porta correta do laboratório." },
            {
                speaker: "Sistema",
                text:    "Asimov conduziu Sophia até a Sala das Portas.\nA próxima etapa começa agora...",
                autoMs:  4000
            }
        ];

        // Asimov caminha até Sophia via Tween
        this.playAnimIfNeeded(this.asimov, "asimov-walk-up");
        this.tweens.add({
            targets:  this.asimov,
            y:        this.sophia.y + 60,
            x:        this.sophia.x,
            duration: 6800,
            ease:     "Sine.inOut",
            onComplete: () => {
                this.updateAsimovAnimation(0, 0);
                this.startDialogue(this.cutsceneDialogue, () => {
                    this.time.delayedCall(600, () => {
                        this.cameras.main.fadeOut(1200, 0, 0, 0);
                        this.cameras.main.once("camerafadeoutcomplete", () => {
                            this.scene.start("FaseDois");
                        });
                    });
                });
            }
        });
    }

    // =========================================================================
    // SISTEMA DE DIÁLOGO
    // =========================================================================
    createDialogueUI() {
        const larguraJogo  = this.cameras.main.width;
        const alturaJogo   = this.cameras.main.height;
        const larguraCaixa = 1000;
        const alturaCaixa  = 180;
        const xCaixa = (larguraJogo - larguraCaixa) / 2;
        const yCaixa = alturaJogo - alturaCaixa - 80;

        // -----------------------------------------------------------------------
        // HIERARQUIA DE DEPTH DA UI DE DIÁLOGO:
        //   900 → fundo da caixa (caixaDialogo)        ← atrás de tudo da UI
        //   901 → nameText (nome do falante)           ← na frente da caixa
        //   902 → dialogueText (texto da fala)         ← na frente da caixa
        //   950 → advanceBtnBg (clique na tela)        ← acima do texto
        //   951 → advanceBtnLabel (label oculto)
        // Todos usam setScrollFactor(0) para ficarem fixos na tela.
        // -----------------------------------------------------------------------

        // Fundo escuro com borda ciano — depth 900
        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.92);
        this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 10);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 10);
        this.caixaDialogo.setScrollFactor(0).setDepth(900).setVisible(false);
        // ↑ CORREÇÃO: antes estava 1000, causando a caixa cobrir o texto (depth 101)

        this.dialogueBox     = this.caixaDialogo;
        this.dialogueBoxRect = { x: xCaixa, y: yCaixa, width: larguraCaixa, height: alturaCaixa };

        // Nome do falante — depth 901 (na frente da caixa)
        this.nameText = this.add.text(xCaixa + 12, yCaixa - 18, "", {
            fontSize:        "32px",
            fontFamily:      "'Courier New', Courier, monospace",
            color:           "#00ffff",
            fontStyle:       "bold",
            backgroundColor: "#1a1a1a",
            padding: { left: 6, right: 6, top: 2, bottom: 2 }
        }).setScrollFactor(0).setDepth(901).setVisible(false);
        // ↑ CORREÇÃO: antes estava 101 (atrás da caixa que era 1000)

        // Texto da fala — depth 902 (na frente da caixa)
        this.textoDialogo = this.add.text(xCaixa + 16, yCaixa + 22, "", {
            fontSize:    "32px",
            fontFamily:  "'Courier New', Courier, monospace",
            color:       "#ccffff",
            wordWrap:    { width: larguraCaixa - 32 },
            lineSpacing: 6,
        }).setScrollFactor(0).setDepth(902).setVisible(false);
        // ↑ CORREÇÃO: antes estava 101 (atrás da caixa que era 1000)

        this.dialogueText = this.textoDialogo;

        // Retângulo invisível que captura cliques para avançar — depth 950
        const camW = this.cameras.main.width;
        const camH = this.cameras.main.height;
        this.advanceBtnBg = this.add.rectangle(camW / 2, camH / 2, camW, camH, 0x000000, 0)
            .setScrollFactor(0)
            .setDepth(950)
            .setVisible(false)
            .setInteractive({ useHandCursor: true });

        // Label oculto — mantido por compatibilidade estrutural — depth 951
        this.advanceBtnLabel = this.add.text(0, 0, "Avançar", {
            fontSize: "16px",
            color:    "#e8f4ff"
        }).setOrigin(0.5).setScrollFactor(0).setDepth(951).setVisible(false);

        // Clique na tela avança o diálogo
        this.advanceBtnBg.on("pointerdown", () => {
            if (this.isDialogueOpen && !this.awaitingChoice) {
                this.advanceDialogue();
            }
        });

        this.choiceButtons = [];
    }

    startDialogue(queue, onFinish) {
        this.dialogueQueue  = queue;
        this.dialogueCursor = -1;
        this.onDialogueEnd  = onFinish || null;
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

        // autoMs: avança sozinho após N milissegundos
        if (entry.autoMs) {
            this.autoTimer = this.time.delayedCall(entry.autoMs, () => {
                if (this.isDialogueOpen && !this.awaitingChoice) {
                    this.advanceDialogue();
                }
            });
        }
    }

    clearChoiceButtons() {
        this.choiceButtons.forEach((obj) => obj.destroy());
        this.choiceButtons.length = 0;
    }

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
    createCharacterAnimations() {
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

    playAnimIfNeeded(sprite, key) {
        if (!sprite.anims.currentAnim || sprite.anims.currentAnim.key !== key) {
            sprite.play(key, true);
        }
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
}
