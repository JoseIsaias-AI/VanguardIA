export class SceneFuturo extends Phaser.Scene {
  constructor() {
    super("SceneFuturo");
  }

  preload() {
    this.load.image("CFuturo", "assets/fases/sceneOne/labDestruido.png");
    this.load.spritesheet("bauanimado", "assets/objetos/bau.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image(
      "armarioD",
      "assets/objetos/sceneOne/partTwo/armarioDestruido.png",
    );
    this.load.image(
      "alvoD",
      "assets/objetos/sceneOne/partTwo/alvoDestruido.png",
    );
    this.load.image(
      "mesa1D",
      "assets/objetos/sceneOne/partTwo/mesa1Destruida.png",
    );
    this.load.image(
      "mesa2D",
      "assets/objetos/sceneOne/partTwo/mesa2Destruida.png",
    );
    this.load.image(
      "mesa3D",
      "assets/objetos/sceneOne/partTwo/mesa3Destruida.png",
    );
    this.load.image("piaD", "assets/objetos/sceneOne/partTwo/piaDestruida.png");
    this.load.image(
      "reservasCrioD",
      "assets/objetos/sceneOne/partTwo/reservasCrioDestruidas.png",
    );
    this.load.image(
      "comptCimaD",
      "assets/objetos/sceneOne/partTwo/comptCimaDestruido.png",
    );
    this.load.image(
      "comptBaixoD",
      "assets/objetos/sceneOne/partTwo/comptBaixoDestruido.png",
    );
    this.load.image(
      "criogeniaD",
      "assets/objetos/sceneOne/partTwo/criogeniaDestruida.png",
    );
    this.load.image("camara", "assets/objetos/sceneOne/partOne/camara.png"); // camara criogenica
  }

  create() {
    this.scaleMapa = 3;
    this.progressoHistoria = 0;

    // MAPA FUTURO
    this.mapa = this.add.image(600, 400, "CFuturo").setScale(this.scaleMapa);

    // criando uma barreira no laboratorio -> paredes //
    let larguraParede = this.mapa.displayWidth; // define a largura da parede como o tamanho do mapa
    let alturaParede = 720; // o mapa é mais alto que a barreira das paredes entao defino uma altura
    let centroX = this.mapa.x; // posiciona as barreiras no x
    let centroY = 283; // posiciona as barreiras no y
    let espessura = 30; // espessura das barreiras
    this.paredes = this.physics.add.staticGroup(); // define this.paredes como um staticGroup - nao se move, nao é afetado pela gravidade nem por colisões dinamicas - que possui fisica

    this.objetosColisao = this.physics.add.staticGroup(); // adiciona um grupo para os perifericos do laboratório

    let paredeCima = this.add.rectangle(
      // cria a barreira superior adiconando um retangulo
      centroX, // posiciona no x
      centroY - alturaParede / 2 + espessura / 2, // posiciona no y
      larguraParede, // largura do retangulo
      espessura, // altura do retangulo
      0xff0000, // cor
      0, // deixa a opacidade no 0
    );
    this.physics.add.existing(paredeCima, true); // adiciona fisica ao retangulo
    this.paredes.add(paredeCima); // adiciona o retangulo ao grupo paredes

    let paredeBaixo = this.add.rectangle(
      // barreira inferior
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
      // barreira esquerda
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
      // barreira direita
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
    this.armarioD = this.add
      .image(220, 10, "armarioD")
      .setScale(3.25)
      .setDepth(1); // armário do laboratório
    this.armarioD2 = this.add
      .image(980, 10, "armarioD")
      .setScale(3.25)
      .setDepth(1); // armário 2 do laboratório
    this.alvoD = this.add.image(215, 275, "alvoD").setScale(3).setDepth(1); // mesa de alvo
    this.alvoD2 = this.add.image(965, 375, "alvoD").setScale(3.1).setDepth(1); // mesa de alvo
    this.criogeniaD = this.add
      .image(600, 6, "criogeniaD")
      .setScale(3)
      .setDepth(1); // criogenia
    this.mesa1D = this.add.image(190, 140, "mesa1D").setScale(3).setDepth(1); // mesa 1
    this.mesa1Db = this.add.image(993, 518, "mesa1D").setScale(3).setDepth(1); // mesa 2
    this.mesa2D = this.add.image(343, 20, "mesa2D").setScale(3).setDepth(1); // mesa 2
    this.mesa3D = this.add.image(858, 18, "mesa3D").setScale(3).setDepth(1); // mesa 3
    this.piaD = this.add.image(203, 470, "piaD").setScale(3).setDepth(1); // pia
    this.reservasCrioD = this.add
      .image(1023, 165, "reservasCrioD")
      .setScale(3)
      .setDepth(1); // reservas da criogenia
    this.comutador1Dprt1 = this.add
      .image(385, 220, "comptCimaD")
      .setScale(3)
      .setDepth(3); // comutador 1 parte 1
    this.comutador1Dprt2 = this.add
      .image(385, 260, "comptBaixoD")
      .setScale(3)
      .setDepth(1); // comutador 1 parte 2
    this.comutador2Dprt1 = this.add
      .image(812, 220, "comptCimaD")
      .setScale(3)
      .setDepth(3); // comutador 2 parte 1
    this.comutador2Dprt2 = this.add
      .image(812, 260, "comptBaixoD")
      .setScale(3)
      .setDepth(1); // comutador 2 parte 2
    this.comutador3Dprt1 = this.add
      .image(385, 410, "comptCimaD")
      .setScale(3)
      .setDepth(3); // comutador 3 parte 1
    this.comutador3Dprt2 = this.add
      .image(385, 450, "comptBaixoD")
      .setScale(3)
      .setDepth(1); // comutador 3 parte 2
    this.comutador4Dprt1 = this.add
      .image(812, 410, "comptCimaD")
      .setScale(3)
      .setDepth(3); // comutador 4 parte 1
    this.comutador4Dprt2 = this.add
      .image(812, 450, "comptBaixoD")
      .setScale(3)
      .setDepth(1); // comutador 4 parte 2
    this.camara = this.physics.add
      .staticImage(600, 20, "camara")
      .setScale(0.25)
      .refreshBody(); // camara criogenica

    // adiciona colisão a todos os objetos do laboratório pela função criarColisao
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

    // colisão apenas na parte de baixo dos computadores
    this.criarColisao(this.comutador1Dprt2);
    this.criarColisao(this.comutador2Dprt2);
    this.criarColisao(this.comutador3Dprt2);
    this.criarColisao(this.comutador4Dprt2);
    this.criarColisao(this.camara);

    // PLAYER
    this.Principal = this.physics.add
      .sprite(400, 300, "sophia")
      .setScale(2)
      .setCollideWorldBounds(true);
    this.Principal.setDepth(2); // define que o personagem fica na frente dos objetos
    this.Principal.body.setAllowGravity(false); // desativa a gravidade para o personagem, já que é um jogo top-down
    this.Principal.setSize(30, 25); // ajusta o tamanho do corpo de colisão para ser menor que a sprite
    this.Principal.setOffset(15, 30); // ajusta o offset do corpo de colisão para centralizar melhor
    this.physics.add.collider(this.Principal, this.camara); // adiciona colisão entre o personagem e a camara criogenica
    this.physics.add.collider(this.Principal, this.paredes); // adiciona colisão entre o personagem e as paredes
    this.physics.add.collider(this.Principal, this.objetosColisao); // adiciona colisão entre o personagem e os objetos do laboratório

    // ===== VARIÁVEIS DE INTERAÇÃO =====
    this.podeInteragir = false;

    // ===== ÍCONE DA TECLA E =====
    this.containerTecla = this.add.container(0, 0);

    let largura = 140;
    let altura = 40;

    let iconeTecla = this.add.graphics();
    iconeTecla.fillStyle(0xffffff, 1);
    iconeTecla.lineStyle(2, 0x000000, 1);
    iconeTecla.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTecla.strokeRoundedRect(
      -largura / 2,
      -altura / 2,
      largura,
      altura,
      10,
    );

    let letra = this.add
      .text(0, 0, "Aperte E", {
        fontSize: "20px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.containerTecla.add([iconeTecla, letra]);
    this.containerTecla.setVisible(false);

    // animação flutuando
    this.tweens.add({
      targets: this.containerTecla,
      y: "+=5",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // BAÚ
    this.bau = this.physics.add
      .staticSprite(600, 300, "bauanimado")
      .setScale(2.3)
      .refreshBody();

    this.physics.add.collider(this.Principal, this.bau);

    this.bauAberto = false;

    if (!this.anims.exists("fechado")) {
      this.anims.create({
        key: "fechado",
        frames: [{ key: "bauanimado", frame: 0 }],
        frameRate: 1,
      });

      this.anims.create({
        key: "abrindo",
        frames: this.anims.generateFrameNumbers("bauanimado", {
          start: 0,
          end: 1,
        }),
        frameRate: 2,
        repeat: 0,
      });
    }

    this.bau.play("fechado");

    if (!this.anims.exists("left")) {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("sophia", {
          start: 24,
          end: 29,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("sophia", {
          start: 16,
          end: 21,
        }),
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
        frames: this.anims.generateFrameNumbers("sophia", {
          start: 8,
          end: 15,
        }),
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

    let distancia = Phaser.Math.Distance.Between(
      this.Principal.x,
      this.Principal.y,
      this.bau.x,
      this.bau.y,
    );

    // MOSTRAR ÍCONE E
    if (distancia < 120 && !this.bauAberto) {
      this.podeInteragir = true;
      this.containerTecla.setVisible(true);
      this.containerTecla.setPosition(this.bau.x, this.bau.y - 60);
    } else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    // INTERAÇÃO
    if (
      this.podeInteragir &&
      Phaser.Input.Keyboard.JustDown(this.teclaE) &&
      !this.bauAberto
    ) {
      this.bauAberto = true;
      this.containerTecla.setVisible(false); // esconde o ícone
      this.bau.play("abrindo");

      this.time.delayedCall(800, () => {
        console.log("Baú aberto!");

      this.progressoHistoria = 1;

      if (this.progressoHistoria === 0) {
        this.viajarNoTempo();
      } else if (this.progressoHistoria === 1) {
        this.scene.start("Scene02");
      }
      });
    }
  }

  criarColisao(objeto, reduzirAltura = 1) {
    // objeto é a imagmem do objeto, reduzirAltura é um multiplicador para deixar a colisão menor que a imagem se necessário
    this.physics.add.existing(objeto, true); // cria fisica e diz que é um corpo estático (true)

    let alturaOriginal = objeto.displayHeight; // pega a altura original da imagem para calcular o novo tamanho do corpo de colisão

    objeto.body.setSize(
      // ajusta o tamanho do corpo de colisão para ser igual ao da imagem, mas com a altura reduzida se necessário
      objeto.displayWidth,
      alturaOriginal * reduzirAltura,
    );

    objeto.body.setOffset(
      // centraliza o offset
      0, // deixa o offset x em 0 para alinhar com a imagem
      alturaOriginal * (1 - reduzirAltura), // colisão vertical
    );

    this.objetosColisao.add(objeto); // adiciona o objeto ao grupo de objetos
  }
}
