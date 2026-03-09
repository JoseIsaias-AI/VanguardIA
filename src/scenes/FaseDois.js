export class FaseDois extends Phaser.Scene {
    constructor () {
        super("FaseDois");
    }

    preload () {
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    }

    create () {
        // Configurações da animação
    
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
  }

    }

    upload () {
        // Cria a movimentação de Sophia de acordo com o personagem e carrega seu Sprite
    this.Principal.setVelocity(0, 0);

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

    if (!movimentacao) this.Principal.anims.stop(); // Para a animação se o player soltar as teclas

    } 


