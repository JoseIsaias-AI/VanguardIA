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

        // --- Mapa de fundo ----------------------------------------------------
        this.mapa = this.add.image(w / 2, h / 2, "labDestruido").setScale(3);

        // --- Decoração do cenário (puramente visual, sem física) --------------
        // Mesmas posições relativas ao centro do mapa usadas na cena original.
        // setTint(0xaec0d1) aplica o tom azulado pós-apocalíptico do original.
        this.criarDecoracao();

        // --- Personagens ------------------------------------------------------
        // Sophia posicionada no centro-superior do mapa
        this.sophia = this.physics.add.sprite(this.mapa.x, this.mapa.y - 300, "sophia")
            .setScale(2)
            .setDepth(12);
        this.sophia.body.setAllowGravity(false); // top-down: sem gravidade
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
            const absX = this.mapa.x + obj.x;
            const absY = this.mapa.y + obj.y;

            this.add.image(absX, absY, obj.key)
                .setScale(obj.scale)
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
        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

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
        const camW = this.cameras.main.width;
        const camH = this.cameras.main.height;
        this.advanceBtnBg = this.add.rectangle(camW / 2, camH / 2, camW, camH, 0x000000, 0)
            .setDepth(200)
            .setScrollFactor(0)
            .setVisible(false)
            .setInteractive({ useHandCursor: true });

        // Label oculto mantido por compatibilidade estrutural
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

    // Inicia um diálogo a partir de uma fila (queue) de entradas
    // onFinish: callback chamado quando o diálogo termina completamente
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
        this.nameText.setText(entry.speaker || "...");
        this.dialogueText.setText(entry.text   || "");

        // Se a entrada tem autoMs: avança sozinha após N milissegundos
        if (entry.autoMs) {
            this.autoTimer = this.time.delayedCall(entry.autoMs, () => {
                if (this.isDialogueOpen && !this.awaitingChoice) {
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
    }
}