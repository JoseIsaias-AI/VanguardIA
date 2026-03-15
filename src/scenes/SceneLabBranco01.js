export class SceneLabBranco01 extends Phaser.Scene {
  constructor() {
    super("SceneLabBranco01"); // define o nome da cena
  }

  preload() {
    this.load.image("labB", "assets/fases/sceneLabBranco01/labBranco.png");
    this.load.image("camara", "assets/objetos/sceneLabBranco01/partOne/camara.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("watson", "assets/personagens/watson.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image("armario", "assets/objetos/sceneLabBranco01/partOne/armario.png");
    this.load.image("alvo", "assets/objetos/sceneLabBranco01/partOne/alvo.png");
    this.load.image("criogenia", "assets/objetos/sceneLabBranco01/partOne/criogenia.png");
    this.load.image("mesa1", "assets/objetos/sceneLabBranco01/partOne/mesa1.png");
    this.load.image("mesa2", "assets/objetos/sceneLabBranco01/partOne/mesa2.png");
    this.load.image("mesa3", "assets/objetos/sceneLabBranco01/partOne/mesa3.png");
    this.load.image("pia1", "assets/objetos/sceneLabBranco01/partOne/pia1.png");
    this.load.image("reservasCrio", "assets/objetos/sceneLabBranco01/partOne/reservasCrio.png");
    this.load.image("comptBaixo", "assets/objetos/sceneLabBranco01/partOne/comptBaixo.png");
    this.load.image("comptCima", "assets/objetos/sceneLabBranco01/partOne/comptCima.png");
  }

  create() {
    this.entrarNaCamara = false;
    this.lendoMensagem = false;
    this.podeInteragir = false;
    this.podeInteragirWatson = false;
    this.scaleMapa = 3;

    this.mapa = this.add.image(600, 400, "labB").setScale(this.scaleMapa).setDepth(-1);

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

    // objetos — depth definido após criarColisao
    this.armario = this.add.image(220, 10, "armario").setScale(3.25);
    this.armario2 = this.add.image(980, 10, "armario").setScale(3.25);
    this.alvo = this.add.image(215, 275, "alvo").setScale(3);
    this.alvo2 = this.add.image(965, 375, "alvo").setScale(3.1);
    this.criogenia = this.add.image(600, 6, "criogenia").setScale(3);
    this.mesa1 = this.add.image(190, 140, "mesa1").setScale(3);
    this.mesa1b = this.add.image(993, 518, "mesa1").setScale(3);
    this.mesa2 = this.add.image(343, 20, "mesa2").setScale(3);
    this.mesa3 = this.add.image(858, 18, "mesa3").setScale(3);
    this.pia1 = this.add.image(203, 470, "pia1").setScale(3);
    this.reservasCrio = this.add.image(1023, 165, "reservasCrio").setScale(3);
    this.comutador1prt1 = this.add.image(385, 220, "comptCima").setScale(3);
    this.comutador1prt2 = this.add.image(385, 260, "comptBaixo").setScale(3);
    this.comutador2prt1 = this.add.image(812, 220, "comptCima").setScale(3);
    this.comutador2prt2 = this.add.image(812, 260, "comptBaixo").setScale(3);
    this.comutador3prt1 = this.add.image(385, 410, "comptCima").setScale(3);
    this.comutador3prt2 = this.add.image(385, 450, "comptBaixo").setScale(3);
    this.comutador4prt1 = this.add.image(812, 410, "comptCima").setScale(3);
    this.comutador4prt2 = this.add.image(812, 450, "comptBaixo").setScale(3);
    this.camara = this.physics.add.staticImage(600, 20, "camara").setScale(0.25).refreshBody();

    this.criarColisao(this.armario);
    this.criarColisao(this.armario2);
    this.criarColisao(this.mesa1);
    this.criarColisao(this.mesa1b);
    this.criarColisao(this.mesa2);
    this.criarColisao(this.mesa3);
    this.criarColisao(this.pia1);
    this.criarColisao(this.reservasCrio);
    this.criarColisao(this.alvo);
    this.criarColisao(this.alvo2);
    this.criarColisao(this.criogenia);
    this.criarColisao(this.comutador1prt2);
    this.criarColisao(this.comutador2prt2);
    this.criarColisao(this.comutador3prt2);
    this.criarColisao(this.comutador4prt2);

    // depth sorting: Y puro para todos os objetos estáticos
    [
      this.armario, this.armario2,
      this.alvo, this.alvo2,
      this.criogenia,
      this.mesa1, this.mesa1b,
      this.mesa2, this.mesa3,
      this.pia1, this.reservasCrio,
      this.comutador1prt1, this.comutador1prt2,
      this.comutador2prt1, this.comutador2prt2,
      this.comutador3prt1, this.comutador3prt2,
      this.comutador4prt1, this.comutador4prt2,
    ].forEach(obj => obj.setDepth(obj.y));

    // personagem principal
    this.Principal = this.physics.add.sprite(400, 300, "sophia").setScale(2).setCollideWorldBounds(true);
    this.Principal.body.setAllowGravity(false);
    this.Principal.setSize(30, 25);
    this.Principal.setOffset(15, 30);
    this.physics.add.collider(this.Principal, this.camara);
    this.physics.add.collider(this.Principal, this.paredes);
    this.physics.add.collider(this.Principal, this.objetosColisao);

    // WATSON (NPC)
    this.watson = this.physics.add.sprite(830, 80, "watson").setScale(2.3);
    this.watson.body.setAllowGravity(false);
    this.watson.setSize(30, 25);
    this.watson.setOffset(15, 30);
    this.watson.setImmovable(true);
    this.physics.add.collider(this.Principal, this.watson);

    if (!this.anims.exists("watson_front")) {
      this.anims.create({ key: "watson_front", frames: this.anims.generateFrameNumbers("watson", { start: 0, end: 1 }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "watson_back", frames: this.anims.generateFrameNumbers("watson", { start: 7, end: 9 }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "watson_side", frames: this.anims.generateFrameNumbers("watson", { start: 14, end: 16 }), frameRate: 4, repeat: -1 });
    }
    this.watson.play("watson_front");

    // HUD — tecla E câmara
    this.containerTecla = this.add.container(0, 0).setDepth(500);
    let largura = 140;
    let altura = 40;
    let iconeTecla = this.add.graphics();
    iconeTecla.fillStyle(0xffffff, 1);
    iconeTecla.lineStyle(2, 0x000000, 1);
    iconeTecla.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTecla.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letra = this.add.text(0, 0, "Aperte E", { fontSize: "20px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTecla.add([iconeTecla, letra]);
    this.containerTecla.setVisible(false);
    this.tweens.add({ targets: this.containerTecla, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    // HUD — tecla E watson
    this.containerTeclaWatson = this.add.container(0, 0).setDepth(500);
    let iconeTeclaWatson = this.add.graphics();
    iconeTeclaWatson.fillStyle(0xffffff, 1);
    iconeTeclaWatson.lineStyle(2, 0x000000, 1);
    iconeTeclaWatson.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTeclaWatson.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letraWatson = this.add.text(0, 0, "Aperte E", { fontSize: "20px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTeclaWatson.add([iconeTeclaWatson, letraWatson]);
    this.containerTeclaWatson.setVisible(false);
    this.tweens.add({ targets: this.containerTeclaWatson, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    // Caixa de diálogo
    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    // FIX: movida levemente para cima (80px de margem em vez de 40px)
    const yCaixa = alturaJogo - alturaCaixa - 140;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    // FIX: depth 1000 garante que a caixa fique acima de absolutamente tudo na cena
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
      // FIX: depth 1001 garante que o texto fique acima da caixa
      .setDepth(1001);
    //Aplicando os cursores de movimentação
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });
    //Aplicando os cursores de pulo
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pulando = false;
    
    //Aplicando o botão de interação
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    //Aplicando as configurações da camera
    this.cameras.main.startFollow(this.Principal);
    this.cameras.main.setZoom(1.2);

    if (!this.anims.exists("left")) {
      this.anims.create({ key: "left", frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "front", frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "back", frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
    }
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

    this.Principal.setVelocity(0, 0);

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

    //Aqui, adicionamos o pulo do personagem
     if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      let yInicial = this.Principal.y;

      this.tweens.add({
        targets: this.Principal,
        y: yInicial - 40,
        duration: 180,
        yoyo: true,
        ease: "Sine.easeOut",

        onComplete: () => {
        this.Principal.y = yInicial;
        this.pulando = false;
      }
    });

  }


    // depth sorting: Y puro — mesmo sistema dos objetos estáticos
    this.Principal.setDepth(this.Principal.y);
    this.watson.setDepth(this.watson.y);

    let targetX = this.camara.x;
    let targetY = this.camara.y;

    let distancia = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, targetX, targetY);
    let distanciaWatson = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, this.watson.x, this.watson.y);

    if (distancia < 140 && this.entrarNaCamara) {
      this.podeInteragir = true;
      this.containerTecla.setVisible(true);
      this.containerTecla.setPosition(targetX, targetY - 50);
    } else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    if (distanciaWatson < 120) {
      this.podeInteragirWatson = true;
      this.containerTeclaWatson.setVisible(true);
      this.containerTeclaWatson.setPosition(this.watson.x, this.watson.y - 80);
    } else {
      this.podeInteragirWatson = false;
      this.containerTeclaWatson.setVisible(false);
    }

    if (this.podeInteragir && this.entrarNaCamara && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.mostrarMensagem("SISTEMA: Iniciando criogenia...");
    }

    if (this.podeInteragirWatson && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.containerTeclaWatson.setVisible(false);
      this.falando_watson = true;
      this.dialogoWatsonIndex = 0;
      this.dialogoWatson = [
        "Sophia, temos que conversar.",
        "As simulações mostram um futuro que me assusta. A tecnologia que criamos para ajudar as pessoas... pode acabar sendo usada para controlá-las.",
        "E eu estou ficando velho. Quando eu não estiver mais aqui, vai ter que ser você, Sophia.",
        "Você é a única que pode proteger o que construímos. A única que pode salvar o mundo.",
      ];
      this.mostrarMensagem(this.dialogoWatson[this.dialogoWatsonIndex]);
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

    if (this.falando_watson) {
      this.dialogoWatsonIndex++;
      if (this.dialogoWatsonIndex < this.dialogoWatson.length) {
        this.mostrarMensagem(this.dialogoWatson[this.dialogoWatsonIndex]);
        return;
      }
      this.falando_watson = false;
      this.entrarNaCamara = true;
      return;
    }

    this.cameras.main.fadeOut(1000);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("SceneLabBranco02");
    });
  }

  criarColisao(objeto, reduzirAltura = 1) {
    this.physics.add.existing(objeto, true);
    let alturaOriginal = objeto.displayHeight;
    objeto.body.setSize(objeto.displayWidth, alturaOriginal * reduzirAltura);
    objeto.body.setOffset(0, alturaOriginal * (1 - reduzirAltura));
    this.objetosColisao.add(objeto);
  }
}