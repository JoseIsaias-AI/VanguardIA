import { registrarTeclaMenu } from '../menu.js';

export class sceneLBFuturo extends Phaser.Scene {
  constructor() {
    super("sceneLBFuturo");
  }

  preload() {
    this.load.image("CFuturo", "assets/fases/sceneLBPassado/labDestruido.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("asimov", "assets/personagens/asimov.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.video(
      "cutscene2",
      "assets/Cutscene/CutScene2.mp4",
      "loadeddata",
      false,
      true
    );
    this.load.image("armarioD", "assets/objetos/sceneLBPassado/partTwo/armarioDestruido.png");
    this.load.image("alvoD", "assets/objetos/sceneLBPassado/partTwo/alvoDestruido.png");
    this.load.image("mesa1D", "assets/objetos/sceneLBPassado/partTwo/mesa1Destruida.png");
    this.load.image("mesa2D", "assets/objetos/sceneLBPassado/partTwo/mesa2Destruida.png");
    this.load.image("mesa3D", "assets/objetos/sceneLBPassado/partTwo/mesa3Destruida.png");
    this.load.image("piaD", "assets/objetos/sceneLBPassado/partTwo/piaDestruida.png");
    this.load.image("reservasCrioD", "assets/objetos/sceneLBPassado/partTwo/reservasCrioDestruidas.png");
    this.load.image("comptCimaD", "assets/objetos/sceneLBPassado/partTwo/comptCimaDestruido.png");
    this.load.image("comptBaixoD", "assets/objetos/sceneLBPassado/partTwo/comptBaixoDestruido.png");
    this.load.image("criogeniaD", "assets/objetos/sceneLBPassado/partTwo/criogeniaDestruida.png");
    this.load.image("camara", "assets/objetos/sceneLBPassado/partOne/camara.png");
  }

  create() {
    registrarTeclaMenu(this);
    this.videoDaFase();
  }

  videoDaFase() {
    this.cutscene = this.add.video(950, 550, "cutscene2");
    this.cutscene.setScale(1.05);
    this.cutscene.setDepth(999);
    this.cutscene.setMute(true);
    this.cutscene.play();

    this.cutscene.once("complete", () => {
      this.cutscene.destroy();
      this.iniciarFase();
    });
  }

  iniciarFase() {
    this.scaleMapa = 3;
    this.progressoHistoria = 0;
    this.lendoMensagem = false;

    // MAPA FUTURO
    this.mapa = this.add.image(600, 400, "CFuturo").setScale(this.scaleMapa).setDepth(-1);

    // paredes
    let larguraParede = this.mapa.displayWidth;
    let alturaParede = 720;
    let centroX = this.mapa.x;
    let centroY = 283;
    let espessura = 30;
    this.paredes = this.physics.add.staticGroup();
    this.objetosColisao = this.physics.add.staticGroup();

    let paredeCima = this.add.rectangle(centroX, centroY - alturaParede / 2 + espessura / 2, larguraParede, espessura, 0xff0000, 0);
    this.physics.add.existing(paredeCima, true);
    this.paredes.add(paredeCima);

    let paredeBaixo = this.add.rectangle(centroX, centroY + alturaParede / 2 - espessura / 2, larguraParede, espessura, 0xff0000, 0);
    this.physics.add.existing(paredeBaixo, true);
    this.paredes.add(paredeBaixo);

    let paredeEsquerda = this.add.rectangle(centroX - larguraParede / 2 + espessura / 2, centroY, espessura, alturaParede, 0xff0000, 0);
    this.physics.add.existing(paredeEsquerda, true);
    this.paredes.add(paredeEsquerda);

    let paredeDireita = this.add.rectangle(centroX + larguraParede / 2 - espessura / 2, centroY, espessura, alturaParede, 0xff0000, 0);
    this.physics.add.existing(paredeDireita, true);
    this.paredes.add(paredeDireita);

    // adicionando os objetos
    this.armarioD = this.add.image(220, 10, "armarioD").setScale(3.25);
    this.armarioD2 = this.add.image(980, 10, "armarioD").setScale(3.25);
    this.alvoD = this.add.image(215, 275, "alvoD").setScale(3);
    this.alvoD2 = this.add.image(965, 375, "alvoD").setScale(3.1);
    this.criogeniaD = this.add.image(600, 6, "criogeniaD").setScale(3);
    this.mesa1D = this.add.image(190, 140, "mesa1D").setScale(3);
    this.mesa1Db = this.add.image(993, 518, "mesa1D").setScale(3);
    this.mesa2D = this.add.image(343, 20, "mesa2D").setScale(3);
    this.mesa3D = this.add.image(858, 18, "mesa3D").setScale(3);
    this.piaD = this.add.image(203, 470, "piaD").setScale(3);
    this.reservasCrioD = this.add.image(1023, 165, "reservasCrioD").setScale(3);
    this.comutador1Dprt1 = this.add.image(385, 220, "comptCimaD").setScale(3);
    this.comutador1Dprt2 = this.add.image(385, 260, "comptBaixoD").setScale(3);
    this.comutador2Dprt1 = this.add.image(812, 220, "comptCimaD").setScale(3);
    this.comutador2Dprt2 = this.add.image(812, 260, "comptBaixoD").setScale(3);
    this.comutador3Dprt1 = this.add.image(385, 410, "comptCimaD").setScale(3);
    this.comutador3Dprt2 = this.add.image(385, 450, "comptBaixoD").setScale(3);
    this.comutador4Dprt1 = this.add.image(812, 410, "comptCimaD").setScale(3);
    this.comutador4Dprt2 = this.add.image(812, 450, "comptBaixoD").setScale(3);
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

    // depth sorting por Y
    [
      this.armarioD, this.armarioD2,
      this.alvoD, this.alvoD2,
      this.criogeniaD,
      this.mesa1D, this.mesa1Db,
      this.mesa2D, this.mesa3D,
      this.piaD, this.reservasCrioD,
      this.comutador1Dprt1, this.comutador1Dprt2,
      this.comutador2Dprt1, this.comutador2Dprt2,
      this.comutador3Dprt1, this.comutador3Dprt2,
      this.comutador4Dprt1, this.comutador4Dprt2,
    ].forEach(obj => {
      obj.setDepth(obj.y);
    });

    // PLAYER
    this.Principal = this.physics.add
      .sprite(600, 100, "sophia")
      .setScale(2)
      .setCollideWorldBounds(true);
    this.Principal.body.setAllowGravity(false);
    this.Principal.setSize(30, 25);
    this.Principal.setOffset(15, 30);
    this.physics.add.collider(this.Principal, this.camara);
    this.physics.add.collider(this.Principal, this.paredes);
    this.physics.add.collider(this.Principal, this.objetosColisao);

    // ASIMOV (NPC)
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

    // variaveis de interacao
    this.podeInteragirAsimov = false;

    // icone da tecla E (asimov)
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

    // Caixa de diálogo
    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 80;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

    this.textoDialogo = this.add
      .text(xCaixa + 40, yCaixa + 35, "", {
        fontSize: "26px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#ccffff",
        wordWrap: { width: larguraCaixa - 80 },
        lineSpacing: 10,
      })
      .setScrollFactor(0)
      .setDepth(1001)
      .setVisible(false);

    // Label do nome do falante — aparece acima da borda esquerda da caixa
    this.labelNome = this.add
      .text(xCaixa + 16, yCaixa - 28, "", {
        fontSize: "20px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#00ffff",
        fontStyle: "bold",
        backgroundColor: "#1a1a1a",
        padding: { left: 8, right: 8, top: 3, bottom: 3 },
      })
      .setScrollFactor(0)
      .setDepth(1002)
      .setVisible(false);

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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pulando = false;

    this.cameras.main.startFollow(this.Principal);
    this.cameras.main.fadeIn(1000);
  }

  update() {
    if (!this.Principal) return;

    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0);
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.fecharMensagem();
      }
      return;
    }

    // Aplicando a movimentação do personagem
    this.Principal.setVelocity(0);

    let velocidade = 150;
    let movimentacao = false;

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.Principal.setVelocityX(-velocidade);
      this.Principal.anims.play("left", true);
      movimentacao = true;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.Principal.setVelocityX(+velocidade);
      this.Principal.anims.play("right", true);
      movimentacao = true;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      this.Principal.setVelocityY(-velocidade);
      if (!movimentacao) this.Principal.anims.play("back", true);
      movimentacao = true;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      this.Principal.setVelocityY(+velocidade);
      if (!movimentacao) this.Principal.anims.play("front", true);
      movimentacao = true;
    }

    if (!movimentacao) this.Principal.anims.stop();

    // Aqui,corrigimos a velocidade diagonal do personagem (Para ela não andar mais rápido na diagonal)
    this.Principal.body.velocity.normalize().scale(velocidade);

    // Aplicando o pulo
    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      let yInicial = this.Principal.y;

      this.tweens.add({
        targets: this.Principal,
        y: yInicial - 40,
        duration: 300,
        yoyo: true,
        ease: "Sine.easeOut",

        onComplete: () => {
          this.Principal.y = yInicial;
          this.pulando = false;
        }
      });
    }

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
        "Para restaurar o laboratório e recuperar meu banco de dados, precisamos reativar o núcleo energético. Para isso, você deve encontrar um cristal azul capaz de alimentar todo o sistema.",
        "Como meu banco de dados está defeituoso, eu preciso que você me controle durante alguns obstáculos, e com os padrões, eu aprenderei a desviar dos obstáculos sozinho.",
      ];
      this.mostrarMensagem(this.dialogoAsimov[this.dialogoAsimovIndex], "Asimov");
    }
  }

  // nome: string com o nome do falante (ex: "Sophia", "Asimov", "SISTEMA")
  mostrarMensagem(textoCompleto, nome = "") {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true);
    this.textoDialogo.setText("");
    this.textoAtualArmazenado = textoCompleto;

    // Atualiza e exibe o label do nome
    if (nome && nome.trim() !== "") {
      this.labelNome.setText(nome);
      this.labelNome.setVisible(true);
    } else {
      this.labelNome.setVisible(false);
    }

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
    this.labelNome.setVisible(false);

    if (this.falando_asimov) {
      this.dialogoAsimovIndex++;
      if (this.dialogoAsimovIndex < this.dialogoAsimov.length) {
        this.mostrarMensagem(this.dialogoAsimov[this.dialogoAsimovIndex], "Asimov");
        return;
      }
      this.falando_asimov = false;
      this.animacaoFinalAsimov();
    }
  }

  animacaoFinalAsimov() {
    // toca a animação de andar para baixo
    this.asimov.play("asimov_front", true);

    // move o Asimov para baixo
    this.asimov.setVelocityY(50);

    // depois de 5 segundos para e muda de fase
    this.time.delayedCall(5000, () => {
      this.asimov.setVelocity(0);
      this.scene.start("faseUm");
    });
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