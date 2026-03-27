import { registrarTeclaMenu } from "../menu.js";

export class faseCinco extends Phaser.Scene {
  constructor() {
    super("faseCinco");
  }

  preload() {
    this.load.image("faseCincoLabFundo", "assets/fases/sceneLabCristal/labCristalClaro.png");
    this.load.image("faseCincoLabObjetos", "assets/objetos/sceneLabCristal/objetosLabCristal2.png");

    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("asimov", "assets/personagens/asimov.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    registrarTeclaMenu(this);

    if (!this.scene.isActive("bgMusic")) {
      this.scene.launch("bgMusic");
    }

    this.scaleMapa = 3;
    this.velocidadeSophia = 180;
    this.pulando = false;

    this.mapaFundo = this.add.image(600, 400, "faseCincoLabFundo").setScale(this.scaleMapa);
    this.mapaObjetos = this.add.image(600, 400, "faseCincoLabObjetos").setScale(this.scaleMapa);

    const larguraMapa = this.mapaFundo.displayWidth;
    const alturaMapa = this.mapaFundo.displayHeight;
    const origemX = this.mapaFundo.x - larguraMapa / 2;
    const origemY = this.mapaFundo.y - alturaMapa / 2;

    this.physics.world.setBounds(origemX, origemY, larguraMapa, alturaMapa);
    this.cameras.main.setBounds(origemX, origemY, larguraMapa, alturaMapa);

    this.sophia = this.physics.add.sprite(560, 600, "sophia").setScale(2);
    this.sophia.setCollideWorldBounds(true);
    this.sophia.body.setAllowGravity(false);
    this.sophia.body.setSize(22, 10, true);

    this.asimov = this.physics.add.sprite(700, 420, "asimov").setScale(3);
    this.asimov.body.setAllowGravity(false);
    this.asimov.setCollideWorldBounds(true);
    this.asimov.setImmovable(true);
    this.asimov.setSize(15, 12);
    this.asimov.setOffset(8, 16);

    this.physics.add.collider(this.sophia, this.asimov);

    this.criarAnimacoes();
    this.asimov.play("asimov_front");

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cameras.main.startFollow(this.sophia);
    this.cameras.main.setZoom(1.8);
  }

  criarAnimacoes() {
    if (!this.anims.exists("sophia-left")) {
      this.anims.create({
        key: "sophia-left",
        frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "sophia-right",
        frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "sophia-front",
        frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "sophia-back",
        frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1,
      });
    }

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
  }

  update() {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      vx = -this.velocidadeSophia;
      this.sophia.anims.play("sophia-left", true);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      vx = this.velocidadeSophia;
      this.sophia.anims.play("sophia-right", true);
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      vy = -this.velocidadeSophia;
      if (vx === 0) {
        this.sophia.anims.play("sophia-back", true);
      }
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      vy = this.velocidadeSophia;
      if (vx === 0) {
        this.sophia.anims.play("sophia-front", true);
      }
    }

    this.sophia.setVelocity(vx, vy);
    this.sophia.body.velocity.normalize().scale(this.velocidadeSophia);

    if (vx === 0 && vy === 0) {
      this.sophia.anims.stop();
      this.sophia.setFrame(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      const yInicial = this.sophia.y;

      this.tweens.add({
        targets: this.sophia,
        y: yInicial - 40,
        duration: 250,
        yoyo: true,
        ease: "Sine.easeOut",
        onComplete: () => {
          this.sophia.y = yInicial;
          this.pulando = false;
        },
      });
    }

    this.sophia.setDepth(this.sophia.y);
    this.asimov.setDepth(this.asimov.y);
  }
}
