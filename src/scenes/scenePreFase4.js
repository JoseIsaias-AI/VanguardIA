/*Esta cena consiste em um momento de transição entre fases, no qual o jogador sai do minigame de plataformas(fase3), sai da sala das 
portas e vem para o HUB do cristal e agora precisa fabricar o cristal, mas para isso ele precisa treinar uma IA generativa e o 
minigame consiste na limpeza dos ruídos*/

import { registrarTeclaMenu } from '../menu.js'; //importa o Menu

export class scenePreFase4 extends Phaser.Scene {
  constructor() {
    super("scenePreFase4");
  }

  preload() {
    this.load.image("labEscuro2", "assets/Fases/sceneLabCristal/labCristalEscuro.png");
    this.load.spritesheet("objetosLab1", "assets/Fases/preFase4/objetosLabCristal1.png", {frameWidth: 320, frameHeight: 213});
    this.load.image("mascaraPrefase4", "assets/Fases/preFase4/mascaraPrefase4.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("cutscene_1", "assets/Fases/preFase4/1.png");
    this.load.image("cutscene_2", "assets/Fases/preFase4/2.png");
    this.load.image("cutscene_3", "assets/Fases/preFase4/3.png");
    this.load.image("cutscene_4", "assets/Fases/preFase4/4.png");
    this.load.image("cutscene_5", "assets/Fases/preFase4/5.png");
  }

  create() {
    registrarTeclaMenu(this);

    this.lendoMensagem = false;
    this.scaleMapa = 3;

    this.mapa = this.add.image(600, 400, "labEscuro2").setScale(this.scaleMapa).setDepth(-1);

    // Objeto do lab — fica parado no frame 0 ate a interacao com o Asimov
    this.objetosLab1 = this.add.sprite(600, 400, "objetosLab1", 0).setScale(this.scaleMapa).setDepth(1);

    this.anims.create({
      key: "objetosLab1_anim",
      frames: this.anims.generateFrameNumbers("objetosLab1", { start: 0, end: 18 }),
      frameRate: 12,
      repeat: 3
    });
    this.add.image(600, 400, "mascaraPrefase4").setScale(this.scaleMapa).setDepth(0).setAlpha(0);

    // Sistema de colisão por canvas (máscara invisível)
    try {
      this.collisionImage = this.textures.get("mascaraPrefase4").getSourceImage();
      this.collisionCanvas = document.createElement("canvas");
      this.collisionCanvas.width = this.collisionImage.width;
      this.collisionCanvas.height = this.collisionImage.height;
      this.collisionCtx = this.collisionCanvas.getContext("2d");
      this.collisionCtx.drawImage(this.collisionImage, 0, 0);
    } catch (e) {
      console.warn("Colisão: rode em servidor local para funcionar corretamente.", e);
    }

    // SOPHIA (jogável)
    this.Principal = this.physics.add.sprite(400, 300, "sophia").setScale(1.5).setCollideWorldBounds(true);
    this.Principal.body.setAllowGravity(false);
    //this.Principal.setOffset(15, 30);

    // ASIMOV (NPC)
    this.asimov = this.physics.add.sprite(900, 250, "asimov").setScale(2);
    this.asimov.body.setAllowGravity(false);
    this.asimov.setOffset(8, 16);
    this.asimov.setImmovable(true);
    this.physics.add.collider(this.Principal, this.asimov);

    // Animações Sophia
    if (!this.anims.exists("left")) {
      this.anims.create({ key: "left",  frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "front", frames: this.anims.generateFrameNumbers("sophia", { start: 0,  end: 7  }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "back",  frames: this.anims.generateFrameNumbers("sophia", { start: 8,  end: 15 }), frameRate: 10, repeat: -1 });
    }

    // Animações Asimov
    if (!this.anims.exists("asimov_front")) {
      this.anims.create({ key: "asimov_front", frames: this.anims.generateFrameNumbers("asimov", { start: 0,  end: 1  }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "asimov_back",  frames: this.anims.generateFrameNumbers("asimov", { start: 7,  end: 9  }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "asimov_side",  frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }), frameRate: 4, repeat: -1 });
    }
    this.asimov.play("asimov_front");

    // Ícone tecla E (Asimov)
    this.podeInteragirAsimov = false;
    this.containerTeclaAsimov = this.add.container(0, 0).setDepth(200);
    let largura = 140, altura = 40;
    let icone = this.add.graphics();
    icone.fillStyle(0xffffff, 1).lineStyle(2, 0x000000, 1);
    icone.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    icone.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letraE = this.add.text(0, 0, "Aperte E", { fontSize: "20px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTeclaAsimov.add([icone, letraE]);
    this.containerTeclaAsimov.setVisible(false);
    this.tweens.add({ targets: this.containerTeclaAsimov, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    /* Caixa de diálogo */
    const lj = this.cameras.main.width;
    const aj = this.cameras.main.height;
    const margem = 20;
    const lc = lj - margem * 2;
    const ac = 140;
    const xc = margem;
    const yc = aj - ac - margem;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.92);
    this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xc, yc, lc, ac, 10);
    this.caixaDialogo.strokeRoundedRect(xc, yc, lc, ac, 10);
    this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

    this.textoDialogo = this.add.text(xc + 16, yc + 22, "", {
      fontSize: "32px", fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff", wordWrap: { width: lc - 32 }, lineSpacing: 6
    }).setScrollFactor(0).setDepth(1001).setVisible(false);

    this.labelNome = this.add.text(xc + 12, yc - 18, "", {
      fontSize: "32px", fontFamily: "'Courier New', Courier, monospace",
      color: "#00ffff", fontStyle: "bold", backgroundColor: "#1a1a1a",
      padding: { left: 6, right: 6, top: 2, bottom: 2 }
    }).setScrollFactor(0).setDepth(1002).setVisible(false);

    /* Caixa de diálogo ajustada */
    /* Caixa de diálogo ajustada para ocupar todo o comprimento */
 
    // Controles
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

    this.cameras.main.startFollow(this.Principal).setZoom(2);
  }

  update() {
    if (!this.Principal) return;

    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0);
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
      return;
    }

    if (this.aguardandoLeitura) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.notificacaoLeitura.destroy();
        this.aguardandoLeitura = false;
        this.exibirCutscenes();
      }
      return;
    }

    if (this.emCutscene) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.cutsceneIndex++;
        if (this.cutsceneIndex < this.sequenciaCutscene.length) {
          this.imgCutscene.setTexture(this.sequenciaCutscene[this.cutsceneIndex]);
        } else {
          this.imgCutscene.destroy();
          if (this.folhasFundo) this.folhasFundo.forEach(f => f.destroy());
          if (this.filtroEscuro) this.filtroEscuro.destroy();
          this.emCutscene = false;
          this.transicaoParaFase4();
        }
      }
      return;
    }

    this.Principal.setVelocity(0);
    let velocidade = 150;
    let movimentacao = false;
    let nx = this.Principal.x;
    let ny = this.Principal.y;

    const margem = 16;
    const offsetPes = 28;

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      if (!this.colidiuComVerde(nx - margem, ny + offsetPes)) {
        this.Principal.setVelocityX(-velocidade);
      }
      this.Principal.anims.play("left", true);
      movimentacao = true;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      if (!this.colidiuComVerde(nx + margem, ny + offsetPes)) {
        this.Principal.setVelocityX(+velocidade);
      }
      this.Principal.anims.play("right", true);
      movimentacao = true;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      if (!this.colidiuComVerde(nx, ny + offsetPes - margem)) {
        this.Principal.setVelocityY(-velocidade);
      }
      if (!movimentacao) this.Principal.anims.play("back", true);
      movimentacao = true;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      if (!this.colidiuComVerde(nx, ny + offsetPes + margem)) {
        this.Principal.setVelocityY(+velocidade);
      }
      if (!movimentacao) this.Principal.anims.play("front", true);
      movimentacao = true;
    }

    if (!movimentacao) this.Principal.anims.stop();
    if (movimentacao) this.Principal.body.velocity.normalize().scale(velocidade);

    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      let yInicial = this.Principal.y;
      this.tweens.add({
        targets: this.Principal, y: yInicial - 40, duration: 300,
        yoyo: true, ease: "Sine.easeOut",
        onComplete: () => { this.Principal.y = yInicial; this.pulando = false; }
      });
    }

    this.Principal.setDepth(this.Principal.y);
    this.asimov.setDepth(this.asimov.y);

    let distAsimov = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, this.asimov.x, this.asimov.y);

    if (!this.interagiu && distAsimov < 120) {
      this.podeInteragirAsimov = true;
      this.containerTeclaAsimov.setVisible(true).setPosition(this.asimov.x, this.asimov.y - 80);
    } else {
      this.podeInteragirAsimov = false;
      this.containerTeclaAsimov.setVisible(false);
    }

    if (this.podeInteragirAsimov && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.containerTeclaAsimov.setVisible(false);
      this.tweens.killTweensOf(this.containerTeclaAsimov);
      this.podeInteragirAsimov = false;
      this.interagiu = true;
      this.falando_asimov = true;
      this.dialogoIndex = 0;
      this.dialogos = [
        { nome: "Asimov", texto: "Sophia, preciso iniciar a fabricação do cristal. Mas há um erro crítico." },
        { nome: "Sophia", texto: "O que houve, Asimov?" },
        { nome: "Asimov", texto: "Você precisa limpar os dados ruidosos do meu sistema antes." },
        { nome: "Sophia", texto: "Por que isso afeta o cristal?" },
        { nome: "Asimov", texto: "Leia os documentos sobre IA Generativa naquela bancada. Você vai entender." },
      ];
      this.mostrarMensagem(this.dialogos[0].texto, this.dialogos[0].nome);
    }
  }

  mostrarMensagem(textoCompleto, nome = "") {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true).setText("");
    this.textoAtualArmazenado = textoCompleto;
    if (nome && nome.trim() !== "") {
      this.labelNome.setText(nome).setVisible(true);
    } else {
      this.labelNome.setVisible(false);
    }
    let letraAtual = 0;
    if (this.timerEscrever) this.timerEscrever.remove();
    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => { this.textoDialogo.text += textoCompleto[letraAtual]; letraAtual++; },
      repeat: textoCompleto.length - 1
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
    if (this.falando_asimov) {
      this.dialogoIndex++;
      if (this.dialogoIndex < this.dialogos.length) {
        this.mostrarMensagem(this.dialogos[this.dialogoIndex].texto, this.dialogos[this.dialogoIndex].nome);
        return;
      }
      this.falando_asimov = false;
      this.objetosLab1.play("objetosLab1_anim");
      this.objetosLab1.once("animationcomplete", () => {
        this.notificacaoLeitura = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height - 60,
          "Aperte E para ler as informações",
          { fontSize: "20px", fontFamily: "'Courier New', Courier, monospace", color: "#ffffff",
            backgroundColor: "#000000", padding: { left: 10, right: 10, top: 6, bottom: 6 } }
        ).setScrollFactor(0).setDepth(300).setOrigin(0.5);
        this.aguardandoLeitura = true;
      });
    }
  }

  exibirCutscenes() {
    const sequencia = ["cutscene_1", "cutscene_2", "cutscene_3", "cutscene_4", "cutscene_5"];
    this.cutsceneIndex = 0;
    this.emCutscene = true;

    const lj = this.cameras.main.width;
    const aj = this.cameras.main.height;
    const cx = lj / 2;
    const cy = aj / 2;
    const escala = 0.18;

    // fundo escuro semi-transparente
    this.filtroEscuro = this.add.rectangle(cx, cy, lj, aj, 0x000000, 0.6)
      .setScrollFactor(0)
      .setDepth(495);

    // folhas de fundo: de tras para frente, cada uma levemente rotacionada e deslocada
    const pilha = [
      { dx:  10, dy: -8,  rot:  7 },
      { dx:  -7, dy:  9,  rot: -5 },
      { dx:   5, dy:  6,  rot:  3 },
      { dx:  -4, dy: -5,  rot: -2 },
    ];

    this.folhasFundo = pilha.map((p, i) =>
      this.add.image(cx + p.dx, cy + p.dy, sequencia[i + 1])
        .setScrollFactor(0)
        .setDepth(496 + i)
        .setScale(escala)
        .setAngle(p.rot)
        .setTint(0x555555)
    );

    this.imgCutscene = this.add.image(cx, cy, sequencia[0])
      .setScrollFactor(0)
      .setDepth(500)
      .setScale(escala);

    this.sequenciaCutscene = sequencia;
  }

  transicaoParaFase4() {
    this.Principal.setVelocity(0);
    this.Principal.anims.stop();
    this.cameras.main.stopFollow();

    // Para de seguir a Sophia e move a câmera lentamente até a cabeça do Asimov com zoom
    this.tweens.add({
      targets: this.cameras.main,
      scrollX: this.asimov.x - this.cameras.main.width / 2,
      scrollY: this.asimov.y - this.cameras.main.height / 2,
      zoom: 20,
      duration: 5000,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.cameras.main.fadeOut(800);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("faseQuatro");
        });
      }
    });
  }

  colidiuComVerde(xMundo, yMundo) {
    if (!this.collisionCtx) return false;
    let origemX = 600 - (this.collisionImage.width * this.scaleMapa) / 2;
    let origemY = 400 - (this.collisionImage.height * this.scaleMapa) / 2;
    let xLocal = (xMundo - origemX) / this.scaleMapa;
    let yLocal = (yMundo - origemY) / this.scaleMapa;
    if (xLocal < 0 || yLocal < 0 || xLocal >= this.collisionImage.width || yLocal >= this.collisionImage.height)
      return false;
    let pixel = this.collisionCtx.getImageData(Math.floor(xLocal), Math.floor(yLocal), 1, 1).data;
    // detecta #7ed957: R~126, G~217, B~87
    return pixel[3] > 0 && pixel[1] > 180 && pixel[0] > 80 && pixel[0] < 180 && pixel[2] < 120;
  }
}
