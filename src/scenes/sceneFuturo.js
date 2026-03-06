export class SceneFuturo extends Phaser.Scene {
  constructor() {
    super("SceneFuturo");
  }

  preload() {
    this.load.image("CFuturo", "assets/fases/sceneOne/labDestruido.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("asimov", "assets/personagens/asimov.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

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
    this.scaleMapa = 3;
    this.progressoHistoria = 0;
    this.lendoMensagem = false;

    // MAPA FUTURO
    this.mapa = this.add.image(600, 400, "CFuturo").setScale(this.scaleMapa);

    // criando uma barreira no laboratorio -> paredes //
    let larguraParede = this.mapa.displayWidth;
    let alturaParede = 720;
    let centroX = this.mapa.x;
    let centroY = 283;
    let espessura = 30;
    this.paredes = this.physics.add.staticGroup();
    this.objetosColisao = this.physics.add.staticGroup();

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

    // adicionando os objetos //
    this.armarioD = this.add.image(220, 10, "armarioD").setScale(3.25).setDepth(1);
    this.armarioD2 = this.add.image(980, 10, "armarioD").setScale(3.25).setDepth(1);
    this.alvoD = this.add.image(215, 275, "alvoD").setScale(3).setDepth(1);
    this.alvoD2 = this.add.image(965, 375, "alvoD").setScale(3.1).setDepth(1);
    this.criogeniaD = this.add.image(600, 6, "criogeniaD").setScale(3).setDepth(1);
    this.mesa1D = this.add.image(190, 140, "mesa1D").setScale(3).setDepth(1);
    this.mesa1Db = this.add.image(993, 518, "mesa1D").setScale(3).setDepth(1);
    this.mesa2D = this.add.image(343, 20, "mesa2D").setScale(3).setDepth(1);
    this.mesa3D = this.add.image(858, 18, "mesa3D").setScale(3).setDepth(1);
    this.piaD = this.add.image(203, 470, "piaD").setScale(3).setDepth(1);
    this.reservasCrioD = this.add.image(1023, 165, "reservasCrioD").setScale(3).setDepth(1);
    this.comutador1Dprt1 = this.add.image(385, 220, "comptCimaD").setScale(3).setDepth(3);
    this.comutador1Dprt2 = this.add.image(385, 260, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador2Dprt1 = this.add.image(812, 220, "comptCimaD").setScale(3).setDepth(3);
    this.comutador2Dprt2 = this.add.image(812, 260, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador3Dprt1 = this.add.image(385, 410, "comptCimaD").setScale(3).setDepth(3);
    this.comutador3Dprt2 = this.add.image(385, 450, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador4Dprt1 = this.add.image(812, 410, "comptCimaD").setScale(3).setDepth(3);
    this.comutador4Dprt2 = this.add.image(812, 450, "comptBaixoD").setScale(3).setDepth(1);
    this.camara = this.physics.add.staticImage(600, 20, "camara").setScale(0.25).refreshBody();

    // colisoes dos objetos
    this.criarColisao(this.armarioD);
    this.criarColisao(this.armarioD2);
    this.criarColisao(this.mesa1D);
    this.criarColisao(this.mesa1Db);
    this.criarColisao(this.mesa2D);
    this.criarColisao(this.mesa3D);
    this.criarColisao(this.piaD);
    this.criarColisao(this.reservasCrioD);
    this.criarColisao(this.alvoD);
    this.criarColisao(this.alvoD2);
    this.criarColisao(this.criogeniaD);
    this.criarColisao(this.comutador1Dprt2);
    this.criarColisao(this.comutador2Dprt2);
    this.criarColisao(this.comutador3Dprt2);
    this.criarColisao(this.comutador4Dprt2);
    this.criarColisao(this.camara);

    // PLAYER
    // FIX: depth não é fixo — será atualizado dinamicamente no update()
    this.Principal = this.physics.add
      .sprite(400, 300, "sophia")
      .setScale(2)
      .setCollideWorldBounds(true);
    this.Principal.body.setAllowGravity(false);
    this.Principal.setSize(30, 25);
    this.Principal.setOffset(15, 30);
    this.physics.add.collider(this.Principal, this.camara);
    this.physics.add.collider(this.Principal, this.paredes);
    this.physics.add.collider(this.Principal, this.objetosColisao);

    // ASIMOV (NPC)
    // FIX: depth não é fixo — será atualizado dinamicamente no update()
    this.asimov = this.physics.add
      .sprite(600, 300, "asimov")
      .setScale(3);
    this.asimov.body.setAllowGravity(false);
    this.asimov.setSize(15, 12);
    this.asimov.setOffset(8, 16);
    this.asimov.setImmovable(true);
    this.physics.add.collider(this.Principal, this.asimov);

    // animacoes do Asimov NPC
    if (!this.anims.exists("asimov_front")) {
      this.anims.create({
        key: "asimov_front",
        frames: this.anims.generateFrameNumbers("asimov", { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.create({
        key: "asimov_back",
        frames: this.anims.generateFrameNumbers("asimov", { start: 7, end: 9 }),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.create({
        key: "asimov_side",
        frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }),
        frameRate: 4,
        repeat: -1,
      });
    }

    this.asimov.play("asimov_front");

    // ===== VARIAVEIS DE INTERACAO =====
    this.podeInteragirAsimov = false;

    // ===== ICONE DA TECLA E (ASIMOV) =====
    this.containerTeclaAsimov = this.add.container(0, 0).setDepth(200);

    let largura = 140;
    let altura = 40;

    let iconeTeclaAsimov = this.add.graphics();
    iconeTeclaAsimov.fillStyle(0xffffff, 1);
    iconeTeclaAsimov.lineStyle(2, 0x000000, 1);
    iconeTeclaAsimov.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTeclaAsimov.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);

    let letraAsimov = this.add
      .text(0, 0, "Aperte E", {
        fontSize: "20px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.containerTeclaAsimov.add([iconeTeclaAsimov, letraAsimov]);
    this.containerTeclaAsimov.setVisible(false);

    this.tweens.add({
      targets: this.containerTeclaAsimov,
      y: "+=5",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 40;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

    this.textoDialogo = this.add
      .text(xCaixa + 40, yCaixa + 35, "", {
        fontSize: "26px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#ccffff",
        wordWrap: { width: larguraCaixa - 80 },
        lineSpacing: 10,
      })
      .setScrollFactor(0)
      .setDepth(101);

    if (!this.anims.exists("left")) {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "front",
        frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "back",
        frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // INPUT
    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.cameras.main.startFollow(this.Principal);
    this.cameras.main.fadeIn(1000);
  }

  update() {
    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0);
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.fecharMensagem();
      }
      return;
    }

    this.Principal.setVelocity(0);

    let velocidade = 150;
    let movimentacao = false;

    if (this.cursors.left.isDown) {
      this.Principal.setVelocityX(-velocidade);
      this.Principal.anims.play("left", true);
      movimentacao = true;
    } else if (this.cursors.right.isDown) {
      this.Principal.setVelocityX(+velocidade);
      this.Principal.anims.play("right", true);
      movimentacao = true;
    }

    if (this.cursors.up.isDown) {
      this.Principal.setVelocityY(-velocidade);
      if (!movimentacao) this.Principal.anims.play("back", true);
      movimentacao = true;
    } else if (this.cursors.down.isDown) {
      this.Principal.setVelocityY(+velocidade);
      if (!movimentacao) this.Principal.anims.play("front", true);
      movimentacao = true;
    }

    if (!movimentacao) this.Principal.anims.stop();

   
    this.Principal.setDepth(this.Principal.y);
    this.asimov.setDepth(this.asimov.y);

    // distancia ate o asimov
    let distanciaAsimov = Phaser.Math.Distance.Between(
      this.Principal.x,
      this.Principal.y,
      this.asimov.x,
      this.asimov.y,
    );

    // MOSTRAR ICONE E - ASIMOV
    if (distanciaAsimov < 120) {
      this.podeInteragirAsimov = true;
      this.containerTeclaAsimov.setVisible(true);
      this.containerTeclaAsimov.setPosition(this.asimov.x, this.asimov.y - 80);
    } else {
      this.podeInteragirAsimov = false;
      this.containerTeclaAsimov.setVisible(false);
    }

    // INTERACAO - ASIMOV
    if (
      this.podeInteragirAsimov &&
      Phaser.Input.Keyboard.JustDown(this.teclaE)
    ) {
      this.containerTeclaAsimov.setVisible(false);
      this.falando_asimov = true;
      this.dialogoAsimovIndex = 0;
      this.dialogoAsimov = [
        "Sophia… você despertou.",
        "Estamos no ano de 2098. O mundo foi devastado pelo uso das IAs para poder e dominação. Eu ativei seu despertar seguindo a última ordem de Watson.",
        "Mas fui danificado… parte da minha memória está inacessível.",
        "Para restaurar o laboratório e recuperar meu banco de dados, precisamos reativar o núcleo energético. Para isso, você deve encontrar um cristal de silício capaz de alimentar todo o sistema.",
      ];
      this.mostrarMensagem(this.dialogoAsimov[this.dialogoAsimovIndex]);
    }
  }

  mostrarMensagem(textoCompleto) {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true);
    this.textoDialogo.setText("");
    this.textoAtualArmazenado = textoCompleto;

    let letraAtual = 0;
    if (this.timerEscrever) this.timerEscrever.remove();

    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => {
        this.textoDialogo.text += textoCompleto[letraAtual];
        letraAtual++;
      },
      repeat: textoCompleto.length - 1,
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
    this.textoDialogo.setVisible(false);
    this.textoDialogo.setText("");

    if (this.falando_asimov) {
      this.dialogoAsimovIndex++;
      if (this.dialogoAsimovIndex < this.dialogoAsimov.length) {
        this.mostrarMensagem(this.dialogoAsimov[this.dialogoAsimovIndex]);
        return;
      }
      this.falando_asimov = false;
      this.scene.start('FaseUm');
    }
  }

  criarColisao(objeto, reduzirAltura = 1) {
    this.physics.add.existing(objeto, true);

    let alturaOriginal = objeto.displayHeight;

    objeto.body.setSize(
      objeto.displayWidth,
      alturaOriginal * reduzirAltura,
    );

    objeto.body.setOffset(
      0,
      alturaOriginal * (1 - reduzirAltura),
    );

    this.objetosColisao.add(objeto);
  }
}