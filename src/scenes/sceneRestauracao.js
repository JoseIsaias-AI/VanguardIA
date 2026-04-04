import { registrarTeclaMenu } from '../menu.js';
import { SnowEffect } from './efeitoNeve.js';
import { movimentacaoSophia, criarAnimacaoSophia, criarAnimacaoAsimov, puloSophia, registrarControles } from './movimentacao.js';

export class sceneRestauracao extends Phaser.Scene {
  constructor() {
    super("sceneRestauracao");
  }

  preload() {
    this.load.video("cutscene2", "assets/Cutscene/CutScene2.mp4");
    this.load.image("cenarioNoite", "assets/fases/sceneLabCristal/labCristalEscuro.png");
    this.load.image("objetosLabEsc", "assets/objetos/sceneLabCristal/objetosLabCristal1.png");
    this.load.image("cenarioClaro", "assets/fases/sceneLabCristal/labCristalClaro.png");
    this.load.image("objLabClaro", "assets/objetos/sceneLabCristal/objetosLabCristal2.png");
    this.load.image("colisao", "assets/Fases/preFase4/mascaraPrefase4.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    registrarTeclaMenu(this);
    this.scene.launch("bgMusic");
    this.cameras.main.fadeIn(800, 0, 0, 0);

    this.lendoMensagem = false;
    this.podeInteragir = false;
    this.interagiu = false;
    this.temCristal = false;
    this.mapaRestaurado = false;
    this.scaleMapa = 2.8;

    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const centroX = this.cameras.main.centerX;
    const centroY = this.cameras.main.centerY;
    const zoom = 1.8;
    const larguraVista = larguraJogo / zoom;
    const alturaVista = alturaJogo / zoom;

    this.pontoRestauracaoX = centroX;
    this.pontoRestauracaoY = centroY;

    this.background = this.add.image(centroX, centroY, "cenarioNoite").setScale(this.scaleMapa);
    this.objetos = this.add.image(centroX, centroY, "objetosLabEsc").setScale(this.scaleMapa);
    new SnowEffect(this, { count: 150, depth: -2, speed: 0.4, wind: 0.1 });

    // DEBUG: visualização do mapa de colisão — remova quando terminar os ajustes
    //this.debugColisao = this.add.image(centroX, centroY, "colisao").setScale(this.scaleMapa).setAlpha(0.5).setDepth(9999);

    try {
      this.collisionImage = this.textures.get("colisao").getSourceImage();
      this.collisionCanvas = document.createElement("canvas");
      this.collisionCanvas.width = this.collisionImage.width;
      this.collisionCanvas.height = this.collisionImage.height;
      this.collisionCtx = this.collisionCanvas.getContext("2d");
      this.collisionCtx.drawImage(this.collisionImage, 0, 0);
    } catch (e) {
      console.warn("Colisão: rode em servidor local para funcionar corretamente.", e);
    }

    const surgirX = this.background.x - 100;
    const surgirY = this.background.y + 50;

    this.Principal = this.physics.add.sprite(surgirX, surgirY, "sophia").setScale(2);
    this.Principal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.Principal).setZoom(zoom);

    // Asimov fixo
    this.asimov = this.physics.add.sprite(1200, 380, "asimov").setScale(2);
    this.asimov.body.setAllowGravity(false);
    this.asimov.body.setImmovable(true);
    this.asimov.body.setSize(16, 6);
    this.asimov.setOffset(8, 15);
    this.physics.add.collider(this.Principal, this.asimov);
    if (!this.anims.exists("asimov_front")) {
      this.anims.create({ key: "asimov_front", frames: this.anims.generateFrameNumbers("asimov", { start: 0, end: 1 }), frameRate: 4, repeat: -1 });
    }
    this.asimov.play("asimov_front");

    // Ícone tecla E
    this.containerTecla = this.add.container(0, 0).setDepth(200);
    let largura = 140, altura = 40;
    let icone = this.add.graphics();
    icone.fillStyle(0xffffff, 1).lineStyle(2, 0x000000, 1);
    icone.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    icone.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letraE = this.add.text(0, 0, "Aperte E", { fontSize: "20px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTecla.add([icone, letraE]);
    this.containerTecla.setVisible(false);
    this.tweens.add({ targets: this.containerTecla, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    // Caixa de diálogo — mesmo modelo da scenePreFase4
    const larguraCaixa = 800, alturaCaixa = 100;
    const posXCaixa = (larguraJogo - larguraCaixa) / 2, posYCaixa = alturaJogo - alturaCaixa - 300;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(posXCaixa, posYCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(posXCaixa, posYCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

    this.textoDialogo = this.add.text(posXCaixa + 40, posYCaixa + 35, "", {
      fontSize: "18px", fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff", wordWrap: { width: larguraCaixa - 80 }, lineSpacing: 10
    }).setScrollFactor(0).setDepth(1001).setVisible(false);

    this.labelNome = this.add.text(posXCaixa + 16, posYCaixa - 28, "", {
      fontSize: "16px", fontFamily: "'Courier New', Courier, monospace",
      color: "#00ffff", fontStyle: "bold", backgroundColor: "#1a1a1a",
      padding: { left: 8, right: 8, top: 3, bottom: 3 }
    }).setScrollFactor(0).setDepth(1002).setVisible(false);

    registrarControles(this);

    criarAnimacaoSophia(this);
    criarAnimacaoAsimov(this);
  }

  colidiuComVerde(xMundo, yMundo) {
    if (!this.collisionCtx) return false;

    let origemX = this.cameras.main.centerX - (this.collisionImage.width * this.scaleMapa) / 2;
    let origemY = this.cameras.main.centerY - (this.collisionImage.height * this.scaleMapa) / 2;

    let xLocal = (xMundo - origemX) / this.scaleMapa;
    let yLocal = (yMundo - origemY) / this.scaleMapa;

    if (xLocal < 0 || yLocal < 0 || xLocal >= this.collisionImage.width || yLocal >= this.collisionImage.height)
      return false;

    let pixel = this.collisionCtx.getImageData(Math.floor(xLocal), Math.floor(yLocal), 1, 1).data;
    return pixel[3] > 0 && pixel[1] > 180 && pixel[0] > 80 && pixel[0] < 180 && pixel[2] < 120;
  }

  update() {
    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0);
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
      return;
    }

    const colisaoFn = (x, y) => {
      if (this.colidiuComVerde(x, y + 40)) return true;
      const dist = Phaser.Math.Distance.Between(x, y, this.asimov.x, this.asimov.y);
      return dist < 20;
    };

    movimentacaoSophia(this, this.Principal, { left: "sophia_esquerda", right: "sophia_direita", front: "sophia_frente", back: "sophia_tras" }, colisaoFn);
    puloSophia(this, this.Principal, colisaoFn);

    this.Principal.setDepth(this.Principal.y);
    this.asimov.setDepth(this.asimov.y);

    let distAsimov = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, this.asimov.x, this.asimov.y);
    let distCentro = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, this.pontoRestauracaoX, this.pontoRestauracaoY);

    if (!this.interagiu && distAsimov < 120) {
      this.podeInteragir = true;
      this.containerTecla.setVisible(true).setPosition(this.asimov.x, this.asimov.y - 80);
    } else if (this.temCristal && !this.mapaRestaurado && distCentro < 150) {
      this.podeInteragir = "centro";
      this.containerTecla.setVisible(true).setPosition(this.pontoRestauracaoX, this.pontoRestauracaoY - 40);
    } else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      if (!this.interagiu) {
        this.interagiu = true;
        this.temCristal = true;
        this.containerTecla.setVisible(false);
        this.mostrarMensagem(
          "Voce acaba de coletar o cristal capaz de restaurar a energia do laboratorio. " +
          "Va ate o centro do mapa e deposite ele.",
          "Asimov"
        );
      } else if (this.podeInteragir === "centro") {
        this.restaurarMundo();
      }
    }
  }

  restaurarMundo() {
    this.mapaRestaurado = true;
    this.cameras.main.flash(1000, 255, 255, 255);

    this.background.setTexture("cenarioClaro").setScale(1.85);
    this.objetos.setTexture("objLabClaro").setScale(this.scaleMapa);

    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("faseCinco");
      });
    });
  }

  mostrarMensagem(texto, nome = "") {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true).setText("");
    this.textoAtualArmazenado = texto;
    if (nome && nome.trim() !== "") {
      this.labelNome.setText(nome).setVisible(true);
    } else {
      this.labelNome.setVisible(false);
    }
    let letraAtual = 0;
    if (this.timerEscrever) this.timerEscrever.remove();
    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => { this.textoDialogo.text += texto[letraAtual]; letraAtual++; },
      repeat: texto.length - 1
    });
  }

  fecharMensagem() {
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
}
