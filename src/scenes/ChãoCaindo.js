// Cena de transição após a abertura do baú:
// enquadra o local, toca a animação da queda da Sophia
// e depois encaminha o jogador para a próxima fase.
export class FaseDoischao extends Phaser.Scene {
  constructor() {
    super("FaseDoischao");
  }

  // Carrega o fundo da sala e o spritesheet usado na queda.
  preload() {
    this.load.image("portas", "assets/Fases/FaseDois/salaPortas.png");

    this.load.spritesheet("sophiaCaindo", "assets/Cutscene/animaçãoCaindo.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  // Configura câmera, UI, mapa e valores usados na cutscene.
  create() {
    // =========================
    // CONTROLE DE DIÁLOGO
    // =========================
    this.lendoMensagem = false;
    this.textoAtualArmazenado = "";
    this.timerEscrever = null;
    this._fecharMensagemOverride = null;

    // =========================
    // PRÓXIMA CENA
    // =========================
    // Nome da cena que será iniciada ao fim da transição.
    this.proximaCena = "fase4";

    // =========================
    // PONTO PRINCIPAL NO MAPA
    // =========================
    // Ponto visual de referência da região do baú dentro do mapa.
    this.pontoBauX = 680;
    this.pontoBauY = 380;

    // =========================
    // CONFIG DO MAPA
    // =========================
    this.escalaMapa = 2.5;
    this.larguraMapaOriginal = 320;
    this.alturaMapaOriginal = 245;

    // O mapa aparece escurecido para manter o clima da queda e do colapso do chão.
    this.background = this.add.image(0, 0, "portas")
      .setOrigin(0, 0)
      .setScale(this.escalaMapa)
      .setAlpha(0.2);

    this.larguraMapa = this.larguraMapaOriginal * this.escalaMapa;
    this.alturaMapa = this.alturaMapaOriginal * this.escalaMapa;

    this.background.setDisplaySize(this.larguraMapa, this.alturaMapa);

    this.physics.world.setBounds(0, 0, this.larguraMapa, this.alturaMapa);
    this.cameras.main.setBounds(0, 0, this.larguraMapa, this.alturaMapa);

    // =========================
    // ZOOM
    // =========================
    // ALTERE AQUI: zoom inicial da cena ChaoCaindo.
    this.zoomInicial = 2.4;
    // ALTERE AQUI: zoom usado caso voce queira reutilizar a aproximacao cinematica.
    this.zoomCutscene = 1;

    // =========================
    // CONFIG DA CÂMERA
    // =========================
    // Calcula o scroll final da câmera para olhar para a área do baú.
    this.cameraScrollX = this.larguraMapa - (this.cameras.main.width / this.zoomInicial);
    this.cameraScrollY = this.alturaMapa - (this.cameras.main.height / this.zoomInicial);

    this.cameraScrollX = Phaser.Math.Clamp(
      this.cameraScrollX,
      0,
      Math.max(0, this.larguraMapa - (this.cameras.main.width / this.zoomInicial))
    );

    this.cameraScrollY = Phaser.Math.Clamp(
      this.cameraScrollY,
      0,
      Math.max(0, this.alturaMapa - (this.cameras.main.height / this.zoomInicial))
    );

    // =========================
    // CONFIG DO SPRITE SOPHIA CAINDO
    // ALTERE SÓ AQUI
    // =========================
    this.sophiaCaindoOffsetX = -30; // esquerda/direita
    this.sophiaCaindoOffsetY = -10; // cima/baixo

    this.sophiaCaindoLargura = 295; // tamanho final em pixels
    this.sophiaCaindoAltura = 180;  // tamanho final em pixels

    // Configurações visuais centralizadas para facilitar ajustes da animação.
    this.sophiaCaindoDepth = 4100;
    this.sophiaCaindoAlphaInicial = 1;
    this.escurecimentoCena = 0.35;

    // =========================
    // ANIMAÇÃO
    // =========================
    if (!this.anims.exists("sophiaCaindo")) {
      this.anims.create({
        key: "sophiaCaindo",
        frames: this.anims.generateFrameNumbers("sophiaCaindo", { start: 0, end: 35 }),
        frameRate: 10,
        repeat: 0,
      });
    }

    // Cria a interface de diálogo usada depois da animação.
    this.criarUI();

    // =========================
    // INPUT
    // =========================
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // =========================
    // CÂMERA INICIAL
    // =========================
    this.cameras.main.setZoom(this.zoomInicial);
    this.cameras.main.setScroll(this.cameraScrollX, this.cameraScrollY);

    // =========================
    // FADE INICIAL
    // =========================
    this.fadeInicial = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      1
    )
      .setOrigin(0, 0)
      .setDepth(3999)
      .setScrollFactor(0);

    this.time.delayedCall(150, () => this.iniciarSequencia());
  }

  // Enquanto houver mensagem aberta, a tecla E fecha ou acelera o diálogo.
  update() {
    if (this.lendoMensagem && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.fecharMensagem();
    }
  }

  // Monta a caixa de diálogo fixa na tela.
  criarUI() {
    const larguraTela = this.cameras.main.width;
    const alturaTela = this.cameras.main.height;

    const margem = 20;
    const larguraCaixa = larguraTela - margem * 2;
    const alturaCaixa = 140;

    const xCaixa = margem;
    const yCaixa = alturaTela - alturaCaixa - margem;

    this.caixaDialogo = this.add.graphics()
      .setDepth(5000)
      .setVisible(false)
      .setScrollFactor(0);

    this.caixaDialogo.fillStyle(0x1a1a1a, 0.92);
    this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 10);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 10);

    this.textoDialogo = this.add.text(xCaixa + 16, yCaixa + 22, "", {
      fontSize: "32px",
      fontFamily: "'Courier New'",
      color: "#ccffff",
      wordWrap: { width: larguraCaixa - 32 },
    })
      .setDepth(5001)
      .setVisible(false)
      .setScrollFactor(0);

    this.labelNome = this.add.text(xCaixa + 12, yCaixa - 18, "", {
      fontSize: "32px",
      color: "#00ffff",
      fontStyle: "bold",
    })
      .setDepth(5002)
      .setVisible(false)
      .setScrollFactor(0);
  }

  // Exibe um texto com efeito de digitação e nome do personagem.
  mostrarMensagem(textoCompleto, nome = "") {
    this.lendoMensagem = true;
    this.textoAtualArmazenado = textoCompleto;

    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true).setText("");

    this.labelNome.setVisible(nome.trim() !== "");
    if (nome.trim() !== "") {
      this.labelNome.setText(nome);
    }

    let indice = 0;

    if (this.timerEscrever) {
      this.timerEscrever.remove();
    }

    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => {
        this.textoDialogo.text += textoCompleto[indice++];
      },
      repeat: textoCompleto.length - 1,
    });
  }

  // Fecha o diálogo atual ou acelera a escrita até o texto completo.
  fecharMensagem() {
    if (this._fecharMensagemOverride) {
      this._fecharMensagemOverride();
      return;
    }

    if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
      this.timerEscrever.remove();
      this.textoDialogo.setText(this.textoAtualArmazenado);
      return;
    }

    this.lendoMensagem = false;
    this.caixaDialogo.setVisible(false);
    this.textoDialogo.setVisible(false).setText("");
    this.labelNome.setVisible(false);
  }

  // Remove o fade inicial preto e inicia a parte principal da cutscene.
  iniciarSequencia() {
    this.tweens.add({
      targets: this.fadeInicial,
      alpha: 0,
      duration: 450,
      onComplete: () => {
        this.fadeInicial.destroy();
        this.tocarAnimacaoQueda();
      },
    });
  }

  // Método legado que fazia uma aproximação do baú antes da queda.
  // Foi mantido como referência, mas o fluxo atual vai direto para tocarAnimacaoQueda().
  destacarBau() {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: this.zoomCutscene,
      duration: 900,
    });

    this.tweens.add({
      targets: this.cameras.main,
      scrollX: this.cameraScrollX,
      scrollY: this.cameraScrollY,
      duration: 900,
      onComplete: () => {
        this.time.delayedCall(300, () => this.tocarAnimacaoQueda());
      },
    });
  }

  // Cria o sprite da queda, escurece a cena e toca a animação imediatamente.
  tocarAnimacaoQueda() {
    if (this.sophia) {
      this.sophia.setVisible(false);
    }

    // POSIÇÃO FINAL DO SPRITE
    const sophiaCaindoX = this.pontoBauX + this.sophiaCaindoOffsetX;
    const sophiaCaindoY = this.pontoBauY + this.sophiaCaindoOffsetY;

    this.spriteQueda = this.add.sprite(
      sophiaCaindoX,
      sophiaCaindoY,
      "sophiaCaindo"
    )
      .setDepth(this.sophiaCaindoDepth)
      .setDisplaySize(this.sophiaCaindoLargura, this.sophiaCaindoAltura)
      .setAlpha(this.sophiaCaindoAlphaInicial);

    this.overlayEscuro = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      this.escurecimentoCena
    )
      .setOrigin(0, 0)
      .setDepth(4050)
      .setScrollFactor(0);

    this.spriteQueda.play("sophiaCaindo");
    this.spriteQueda.once("animationcomplete", () => {
      this.time.delayedCall(300, () => this.encerrarCutscene());
    });
  }

  // Finaliza a animação com fade e entrega o controle para a próxima cena.
  encerrarCutscene() {
    this.tweens.add({
      targets: [this.spriteQueda, this.overlayEscuro],
      alpha: 1,
      duration: 700,
      onComplete: () => {
        this.mostrarMensagem("AAAH... o chao rachou!", "Sophia");

        this._fecharMensagemOverride = () => {
          if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
            this.timerEscrever.remove();
            this.textoDialogo.setText(this.textoAtualArmazenado);
            return;
          }

          this._fecharMensagemOverride = null;
          this.scene.start(this.proximaCena);
        };
      },
    });
  }
}
