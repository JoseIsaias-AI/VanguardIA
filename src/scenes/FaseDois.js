import { registrarTeclaMenu } from '../menu.js';

export class FaseDois extends Phaser.Scene {

  constructor() {
    super("FaseDois");
  }

  preload() {
//Aqui, carregamos todos os arquivos que vamos usar
    this.load.image ("portas", "assets/Fases/FaseDois/salaPortas.png");
    this.load.image("RedeNeural", "assets/Fases/FaseDois/RedesNeurais.png")
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64});

  }

  create() {
    registrarTeclaMenu(this);

    //Aqui, criamos o mapa de fundo
    this.fundo = this.add.image(0, 0, "portas").setOrigin(0,0).setScale(3);
    let larguraMapa = this.fundo.width * 3;
    let alturaMapa = this.fundo.height * 3;

this.physics.world.setBounds(0, 0, larguraMapa, alturaMapa);
   
    // Aqui, criamos o personagem
    this.player = this.physics.add.sprite(100, 500, "sophia")
    this.player.setScale(2)
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(40,30,true);
    
    //Aqui, configuramos a camera para seguir o personagem
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, larguraMapa, alturaMapa);
    this.cameras.main.setZoom(2);

    //Aqui, criamos a variável para as paredes
    this.walls = this.physics.add.staticGroup();

    let s = 3; // Aqui, deixamos as coordenadas da colisão na mesma escala do mapa

// parede superior
this.walls.add(this.add.rectangle(160*s, 3*s, 320*s, 20*s));

// parede inferior
this.walls.add(this.add.rectangle(160*s, 240*s, 320*s, 30*s));

// parede direita
this.walls.add(this.add.rectangle(325*s, 90*s, 25*s, 250*s));

//Paredes da porta azul
this.walls.add(this.add.rectangle(110*s, 38*s, 1, 50*s, ));
this.walls.add(this.add.rectangle(100*s, 63*s, 10*s, 1*s,));
this.walls.add(this.add.rectangle(25*s, 63*s, 20*s, 1*s, ));

//Paredes da porta verde
this.walls.add(this.add.rectangle(208*s, 38*s, 1, 50*s));
this.walls.add(this.add.rectangle(223*s, 63*s, 10*s, 1*s));
this.walls.add(this.add.rectangle(295*s, 63*s, 20*s, 1*s));

//Paredes da porta vermelha
this.walls.add(this.add.rectangle(208*s, 194*s, 1, 89*s ));
this.walls.add(this.add.rectangle(223*s, 150*s, 10*s, 1*s ));
this.walls.add(this.add.rectangle(295*s, 150*s, 20*s, 1*s ));

//Aqui, adicionamos a colisão entre o personagem e as paredes
this.physics.world.enable(this.walls);

this.physics.add.collider(this.player, this.walls);

    // Aqui, definimos a velocidade do personagem
    this.speed = 150;

    // Aqui, definimos os controles do personagem (Setas + WASD)
    this.cursors = this.input.keyboard.createCursorKeys();

    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pulando = false;

    // Aqui, criamos as animações dos nossos sprites
    this.createAnimations();

  }

  createAnimations() {

    if (this.anims.exists("sophia-left")) return;

    this.anims.create({
      key: "sophia-left",
      frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "sophia-right",
      frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "sophia-front",
      frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "sophia-back",
      frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

  }

  update() {

    //Aqui, resetamos a velocidade sempre que não estiver nada sendo apertado
    let velocityX = 0;
    let velocityY = 0;

    // Aqui, fazemos o movimento horizontal do personagem
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      velocityX = -this.speed;
      this.player.anims.play("sophia-left", true);
    }
    else if (this.cursors.right.isDown || this.keys.D.isDown) {
      velocityX = this.speed;
      this.player.anims.play("sophia-right", true);
    }

    // Aqui, fazemos o movimento vertical do personagem
    if (this.cursors.up.isDown || this.keys.W.isDown) {
      velocityY = -this.speed;
      if (velocityX === 0) this.player.anims.play("sophia-back", true);
    }
    else if (this.cursors.down.isDown || this.keys.S.isDown) {
      velocityY = this.speed;
      if (velocityX === 0) this.player.anims.play("sophia-front", true);
    }

    // Aqui, aplicamos a velocidade ao jogador
    this.player.setVelocity(velocityX, velocityY);

    // Aqui,corrigimos a velocidade diagonal do personagem (Para ela não andar mais rápido na diagonal)
    this.player.body.velocity.normalize().scale(this.speed);

    // Aqui, fazemos a animação parar quando o personagem estiver parado
    if (velocityX === 0 && velocityY === 0) {
      this.player.anims.stop();
      this.player.setFrame(0);
    }
     // Aqui, adicionamos o pulo na fase
     if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {

     this.pulando = true;
     let yInicial = this.player.y;

     this.tweens.add({
      targets: this.player,
      y: yInicial - 40,
      duration: 180,
      yoyo: true,
      ease: "Sine.easeOut",

      onComplete: () => {
      this.player.y = yInicial;
      this.pulando = false;
    }
  });

}
  }

} 