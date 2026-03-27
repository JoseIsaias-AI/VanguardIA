export class welcomeScene extends Phaser.Scene {
  alturaJogo = 1080;
  larguraJogo = 1920;

  constructor() {
    super("welcomeScene");
  }

  preload() {
    this.load.image("cenario", "assets/Menu/fundo_menu.png");
    this.load.image("play", "assets/Menu/start_button.png");
    this.load.image("logo", "assets/Menu/logo.png");
    this.load.image("options", "assets/Menu/options_button.png");
    this.load.spritesheet("asimov", "assets/Personagens/asimov.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "cenario")
      .setScale(0.62);
    this.chao = this.physics.add.staticGroup();

    this.chao
      .create(this.larguraJogo / 2, this.alturaJogo - 50)
      .setDisplaySize(this.larguraJogo, 483)
      .setVisible(false)
      .refreshBody();

    this.add.image(this.larguraJogo / 2, 350, "logo").setScale(0.7);

    this.direcao = -1; 

    this.anims.create({
      key: "andar",
      frames: this.anims.generateFrameNumbers("asimov", { start: 21, end: 27 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("asimov", { start: 0, end: 1 }), 
      frameRate: 1,
    });

    this.asimov = this.physics.add.sprite(1800, 710, "asimov");

    this.asimov.setScale(5); 
    this.asimov.setCollideWorldBounds(true);

    this.physics.add.collider(this.asimov, this.chao);

    this.estado = "andando";
    this.tempoTroca = 0;

    this.asimov.play("andar");
    this.asimov.setVelocityX(150 * this.direcao); 

    this.play = this.add
      .image(this.larguraJogo / 2, 610, "play")
      .setScale(0.65)
      .setInteractive();
    this.options = this.add
      .image(950, 770, "options")
      .setScale(0.65)
      .setInteractive();

    this.play.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });

    this.play.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    this.play.on("pointerdown", () => {
      this.scene.start("sceneLBPassado");
    });

    // Inicia a cena de música de fundo (bgMusic) que toca em loop para todo o jogo.
    this.scene.launch("bgMusic");
  }

  update(time) {
    
    if (this.asimov.x < 100) {
      this.direcao = 1;
      this.asimov.setFlipX(true);
      this.asimov.setVelocityX(150 * this.direcao); 
    }

    if (this.asimov.x > 1820) {
      this.direcao = -1;
      this.asimov.setFlipX(false);
      this.asimov.setVelocityX(150 * this.direcao); 
    }
    if (time > this.tempoTroca) {
      if (this.estado === "andando") {

        this.estado = "parado";
        this.asimov.setVelocityX(0);
        this.asimov.play("idle");

        this.tempoTroca = time + Phaser.Math.Between(1000, 3000);
      } else {

        this.estado = "andando";

        this.asimov.setVelocityX(150 * this.direcao);
        this.asimov.play("andar");

        this.tempoTroca = time + Phaser.Math.Between(2000, 5000);
      }
    }
  }
}
