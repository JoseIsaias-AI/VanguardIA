// FASE 2 - A RESTAURAÇÃO 

export class Scene02 extends Phaser.Scene {
  constructor() {
    super("Scene02");
  }

  preload() {
    // Carregando cenários (Noite e Restaurado)
    this.load.video("cutscene2", "assets/Cutscene/CutScene2.mp4");
    this.load.image("cenarioNoite", "assets/fases/sceneTwo/labCristalEscuro.png"); // laboratório com cristal
    this.load.image("objetosLabEsc", "assets/objetos/sceneTwo/objetosLabCristal1.png");
    this.load.image("cenarioClaro", "assets/fases/sceneTwo/labCristalClaro.png"); // laboratório com cristal claro
    this.load.image("objLabClaro", "assets/objetos/sceneTwo/objetosLabCristal2.png");
    this.load.spritesheet("bauAnimado", "assets/objetos/bau.png", { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("cientistaLider","assets/personagens/watson.png", { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    //Agora, colocando a cut scene no começo da fase
    this.cutscene = this.add.video(600, 400, "cutscene2");

this.cutscene.setScale(1.2);
this.cutscene.play();

this.cutscene.once("complete", () => {
    this.cutscene.destroy();
    this.iniciarFase();
}); }

iniciarFase() {


    this.lendoMensagem = false;
    this.podeInteragir = false;
    this.progressoHistoria = 0
    this.temCristal = false; // Flag do inventário
    this.mapaRestaurado = false;
    this.scaleMapa = 3.0;
    this.background = this.add
      .image(600, 400, "cenarioNoite")
      .setScale(this.scaleMapa);
    this.objetos = this.add
      .image(600, 400, "objetosLabEsc")
      .setScale(this.scaleMapa);

    // Sistema de colisão
    try {
      this.collisionImage = this.textures.get("colisao").getSourceImage();
      this.collisionCanvas = document.createElement("canvas"); // Cria um canvas invisívelocidade em memória
      this.collisionCanvas.width = this.collisionImage.width;
      this.collisionCanvas.height = this.collisionImage.height;
      this.collisionCtx = this.collisionCanvas.getContext("2d");
      this.collisionCtx.drawImage(this.collisionImage, 0, 0);
    } catch (e) {
      console.warn(
        "Aviso: Rodar em servidor local para colisão funcionar corretamente.",
        e,
      );
    }

    // Baú
    this.bauAnimado = this.add.sprite(520, 160, "bauAnimado").setScale(2.3);
    // Garantindo que as anims existam caso Fase 1 não tenha carregado antes
    if (!this.anims.exists("fechado")) {
      this.anims.create({
        key: "fechado",
        frames: [{ key: "bauAnimado", frame: 0 }],
        frameRate: 1,
      });
      this.anims.create({
        key: "abrindo",
        frames: this.anims.generateFrameNumbers("bauAnimado", {
          start: 0,
          end: 1,
        }),
        frameRate: 2,
        repeat: 0,
      });
    }
    this.bauAnimado.play("fechado");

    this.cientistaLider = this.add
      .sprite(400, 300, "cientistaLider")
      .setScale(2);

    // Recriação da HUD (Tecla E e Diálogos) para a nova cena
    this.containerTecla = this.add.container(0, 0).setVisible(false);
    let iconTecla = this.add
      .graphics()
      .fillStyle(0xffffff, 1)
      .lineStyle(2, 0x000000)
      .fillRoundedRect(-15, -15, 30, 30, 5)
      .strokeRoundedRect(-15, -15, 30, 30, 5);
    let letra = this.add
      .text(0, 0, "E", {
        fontSize: "25px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.containerTecla.add([iconTecla, letra]);

    this.tweens.add({
      targets: this.containerTecla,
      y: "+=5",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // HUD - Caixa de Diálogo - correção

    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 40; // 40px de margem do fundo

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

    this.textoDialogo = this.add.text(xCaixa + 50, yCaixa + 45, "", {
      fontSize: "26px", // Aumentado para melhor leitura em 1920px
      fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff",
      wordWrap: { width: larguraCaixa - 100 },
      lineSpacing: 10
    })
    .setScrollFactor(0) // Fixa o texto na tela
    .setDepth(101); // Texto fica na frente da caixa

    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.cameras.main.startFollow(this.cientistaLider).setZoom(1.2);

    if (!this.anims.exists("cient_left")) {
      this.anims.create({
        key: "cient_left",
        frames: this.anims.generateFrameNumbers("cientistaLider", {
          start: 22,
          end: 27,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "cient_right",
        frames: this.anims.generateFrameNumbers("cientistaLider", {
          start: 16,
          end: 21,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "cient_front",
        frames: this.anims.generateFrameNumbers("cientistaLider", {
          start: 0,
          end: 7,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "cient_back",
        frames: this.anims.generateFrameNumbers("cientistaLider", {
          start: 8,
          end: 15,
        }),
        frameRate: 10,
        repeat: -1,
      });
     } 
  }

  // Checagem de cor no canvas invisívelocidade
  colidiuComVerde(xMundo, yMundo) {
    if (!this.collisionCtx) return false;
    let origemX = 600 - (this.collisionImage.width * this.scaleMapa) / 2;
    let origemY = 400 - (this.collisionImage.height * this.scaleMapa) / 2;
    let xLocal = (xMundo - origemX) / this.scaleMapa;
    let yLocal = (yMundo - origemY) / this.scaleMapa;
    if (
      xLocal < 0 ||
      yLocal < 0 ||
      xLocal >= this.collisionImage.width ||
      yLocal >= this.collisionImage.height
    )
      return false;
    let pixel = this.collisionCtx.getImageData(
      Math.floor(xLocal),
      Math.floor(yLocal),
      1,
      1,
    ).data;
    return pixel[1] > 180 && pixel[0] < 80 && pixel[2] < 120;
  }

  update() {
    if (this.lendoMensagem) {
      this.cientistaLider.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
      return;
    }

    // movimentação + Colisão
    let velocidade = 3;
    let movimentacao = false;

    // Antes de mover, checa se a nova posição colidiria em algo "verde" na máscara de colisão
    if (this.cursors.left.isDown && !this.colidiuComVerde(this.cientistaLider.x - velocidade, this.cientistaLider.y)) { this.cientistaLider.x -= velocidade; this.cientistaLider.anims.play("cient_left", true); movimentacao = true; }
    else if (this.cursors.right.isDown && !this.colidiuComVerde(this.cientistaLider.x + velocidade, this.cientistaLider.y)) { this.cientistaLider.x += velocidade; this.cientistaLider.anims.play("cient_right", true); movimentacao = true; }
    if (this.cursors.up.isDown && !this.colidiuComVerde(this.cientistaLider.x, this.cientistaLider.y - velocidade)) { this.cientistaLider.y -= velocidade; this.cientistaLider.anims.play("cient_back", true); movimentacao = true; }
    else if (this.cursors.down.isDown && !this.colidiuComVerde(this.cientistaLider.x, this.cientistaLider.y + velocidade)) { this.cientistaLider.y += velocidade; this.cientistaLider.anims.play("cient_front", true); movimentacao = true; }
    if (!movimentacao) this.cientistaLider.anims.stop();

    // Lógica de interação
    let distBau = Phaser.Math.Distance.Between(
      this.cientistaLider.x,
      this.cientistaLider.y,
      this.bauAnimado.x,
      this.bauAnimado.y,
    );
    let distCentro = Phaser.Math.Distance.Between(
      this.cientistaLider.x,
      this.cientistaLider.y,
      600,
      400,
    ); // Coordenada central do mapa

    if (distBau < 60 && !this.temCristal) {
      this.podeInteragir = "bau";
      this.containerTecla
        .setVisible(true)
        .setPosition(this.bauAnimado.x, this.bauAnimado.y - 50);
    } else if (distCentro < 150 && this.temCristal && !this.mapaRestaurado) {
      this.podeInteragir = "centro";
      this.containerTecla.setVisible(true).setPosition(600, 350);
    } else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    // Ação
    if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      if (this.podeInteragir === "bau") {
        this.bauAnimado.play("abrindo");
        this.temCristal = true;
        this.mostrarMensagem(
          "Você obteve o CRISTAL DE ENERGIA!\nLeve-o até o centro do mapa.",
        );
      } else if (this.podeInteragir === "centro") {
        this.restaurarMundo();
      }
    }
  }

  restaurarMundo() {
    this.mapaRestaurado = true;
    this.cameras.main.flash(1000, 255, 255, 255); // Brilho branco na tela
    this.background.setTexture("cenarioClaro").setScale(2.0); // Muda o mapa para a versão restaurada
    this.objetos.setTexture("objLabClaro").setScale(this.scaleMapa);

    this.progressoHistoria = 1;
    
    this.mostrarMensagem(
      "SISTEMA: Cristal depositado.\nO ecossistema foi restaurado com sucesso!",
    );
  }

  mostrarMensagem(texto) {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true);
    this.textoDialogo.setText("");
    this.textoAtual = texto;

    if (this.timerEscrever) this.timerEscrever.remove();

    let letra = 0;
    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => {
        if (letra < texto.length) {
          this.textoDialogo.text += texto[letra]; 
          letra++; 
        }
      },
      repeat: texto.length - 1,
    });
  }

  fecharMensagem() {
    if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
      this.timerEscrever.remove();
      this.textoDialogo.setText(this.textoAtual);
      return; 
    }

    this.lendoMensagem = false;
    this.caixaDialogo.setVisible(false);
    this.textoDialogo.setVisible(false);
    // CORREÇÃO Limpa o texto para não aparecer na próxima vez
    this.textoDialogo.setText("");
  }
}