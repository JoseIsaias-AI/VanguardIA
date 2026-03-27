export class faseTres extends Phaser.Scene {
    constructor () {
        super("faseTres");
    } 

preload(){
    //Aqui, carregamos os arquivos que vamos usar nessa fase
    this.load.image ("parede", "assets/Fases/faseTres/backgroundFase3Escuro.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64});
    this.load.image ("plataforma", "assets/Objetos/faseTres/Cano 1, Fase 3.png");
    this.load.image("plataformaMovel", "assets/Objetos/faseTres/Cano 2, Fase 3.png");
    this.load.image("cristalVerdadeiro", "assets/Objetos/FaseTres/cristalVerdadeiro.png");
    this.load.image("cristalFalso", "assets/Objetos/FaseTres/cristalFalso.png");

}
create() {    
    //Aqui, criamos o mapa de fundo
   this.fundo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "parede");

   // Aqui, criamos o personagem
    this.player = this.physics.add.sprite(1000, 870, "sophia")
    this.player.setScale(1.4)
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(30,45,true);

    //Aqui, definimos a velocidade e criamos uma variável para o pulo
    this.speed = 150;
    this.pulando = false;

    //Aqui, habilitamos as setas para a fase
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
    A: Phaser.Input.Keyboard.KeyCodes.A,
    D: Phaser.Input.Keyboard.KeyCodes.D
  });
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Aqui, configuramos as plataformas para a fase
    const criarPlataforma = (x, y) => {
      let p = this.plataformas.create(x, y, "plataforma");
      p.setScale(0.4);
      p.refreshBody();
      p.body.setSize(65, 23);
      p.body.setOffset(5, 38);
      };
   
    //Aqui, criamos essas plataformas na fase
    this.plataformas = this.physics.add.staticGroup();
    criarPlataforma(865, 870, "plataforma");
    criarPlataforma(1020, 820, "plataforma");
    criarPlataforma(980, 650, "plataforma");
    criarPlataforma(860, 600, "plataforma");
    criarPlataforma(990, 520, "plataforma");
    criarPlataforma(880, 720, "plataforma");
    criarPlataforma(850, 420, "plataforma");
    criarPlataforma(1040, 370, "plataforma");
    criarPlataforma(1060, 330, "plataforma");
    criarPlataforma(1090, 200, "plataforma");
    criarPlataforma(880, 280, "plataforma");

    //Aqui, criamos as plataformas que se moverão na vertical
    this.plataformasMoveis = this.physics.add.group({allowGravity: false, immovable: true});

    this.plataformaMovel = this.plataformasMoveis.create(1075, 730, "plataformaMovel");
    this.plataformaMovel.setScale(0.4);
    this.plataformaMovel.body.setAllowGravity(false);
    this.plataformaMovel.body.setImmovable(true);
    this.plataformaMovel.setSize( 160, 60);
    this.plataformaMovel.setOffset( 10, 98);

    this.plataformaMovel2 = this.plataformasMoveis.create(1075, 590, "plataformaMovel");
    this.plataformaMovel2.setScale(0.4);
    this.plataformaMovel2.body.setAllowGravity(false);
    this.plataformaMovel2.body.setImmovable(true);
    this.plataformaMovel2.setSize( 160, 60);
    this.plataformaMovel2.setOffset( 10, 98);

    //Aqui, criamos a plataforma que se moverá na horizontal
    this.plataformaHorizontal = this.plataformasMoveis.create(900, 480, "plataformaMovel");
    this.plataformaHorizontal.setScale(0.4);
    this.plataformaHorizontal.body.setAllowGravity(false);
    this.plataformaHorizontal.body.setImmovable(true);
    this.plataformaHorizontal.setSize(160, 60);
    this.plataformaHorizontal.setOffset(10, 98);

    //Aqui, criamos uma variável para criar o loop de movimento da plataforma
    this.tempoMovimento = 0;
    
    //Aqui, criamos a variável para as paredes de colisão
    this.walls = this.physics.add.staticGroup();

    // Aqui, criamos no jogo as paredes inferior, da direita, da esquerda e de cima, limitando o mapa
    this.walls.add(this.add.rectangle(1000, 970, 500, 99,));
    this.walls.add(this.add.rectangle(1171, 600, 100, 2000,));
    this.walls.add(this.add.rectangle(749, 600, 100, 2000,));
    this.walls.add(this.add.rectangle(1000, 135, 500, 1,));

    

    //Aqui, adicionamos a colisão entre o personagem e as paredes
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.plataformas);
    this.physics.add.collider(this.player, this.plataformasMoveis);

    this.createAnimations();

    //Aqui, criamos os grupos de cristais
    this.cristaisVerdadeiros = this.physics.add.group();
    this.cristaisFalsos = this.physics.add.group();

    //Aqui, criamos uma função para colocar os cristais no jogo e não repetir código
    const criarCristal = (grupo, x, y, sprite) => {
    let c = grupo.create(x, y, sprite);
     c.setScale(0.05);
     c.body.setAllowGravity(false);
     c.body.setSize(500, 500);
     c.body.setOffset(500, 800);
    };

    //Aqui, posicionamos os cristais
      // Cristais verdadeiros
      criarCristal(this.cristaisVerdadeiros, 900, 850, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1040, 800, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1020, 630, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1100, 720, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1100, 580, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1020, 500, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 900, 410, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 1070, 320, "cristalVerdadeiro");
      criarCristal(this.cristaisVerdadeiros, 910, 250, "cristalVerdadeiro");

      // Cristais falsos
      criarCristal(this.cristaisFalsos, 900, 580, "cristalFalso");
      criarCristal(this.cristaisFalsos, 930, 700, "cristalFalso");
      criarCristal(this.cristaisFalsos, 1140, 190, "cristalFalso");

    
    //Aqui, criamos os contadores para os cristais e fazemos eles aparecerem na tela
     this.contadorVerdadeiros = 0;
     this.contadorFalsos = 0;
     this.contadorTotal = 0;

     this.textoCristais = this.add.text(800, 450, "", {
      fontSize: "12px",
       fill: "#ffffff"
    }).setScrollFactor(0);

    //Aqui, detectamos a coleta dos cristais
     this.physics.add.overlap(this.player, this.cristaisVerdadeiros, this.coletarVerdadeiro, null, this);
     this.physics.add.overlap(this.player, this.cristaisFalsos, this.coletarFalso, null, this);
    
    //Aqui, configuramos a camera para seguir o personagem no eixo Y
    this.cameras.main.startFollow(this.player, true, 0, 1);
    this.cameras.main.setZoom(5);


    //Aqui, criamos a interação com a corda
    this.corda = this.add.rectangle(993, 140, 1, 70,);
    this.physics.add.existing(this.corda, true);
    this.subindoCorda = false;
    this.physics.add.overlap(this.player, this.corda, this.ativarCorda, null, this);
}

//Aqui, criamos uma função que ativa a animação da corda
ativarCorda() {
  if (this.subindoCorda) return;

  this.subindoCorda = true;

  // Aqui, travamos o movimento do jogador
  this.player.setVelocity(0, 0);
  this.player.body.allowGravity = false;

  this.player.anims.play("sophia-back", true);

  let startY = this.player.y;
  let alvoY = startY - 75;

  // Aqui, subimos a corda
  this.tweens.add({
    targets: this.player,
    y: alvoY,
    duration: 3000,
    onComplete: () => {

      //Aqui, fazemos o player andar para a esquerda depois de terminar de subir a corda
       this.player.anims.play("sophia-left", true);
      let startX = this.player.x;
      let alvoX = startX - 45;
      this.tweens.add({
        targets: this.player,
        x: alvoX,
        duration: 1000,
        onComplete: () => {
          this.scene.transition({
          target: "FaseQuatro",
          duration: 1000
});
        }
      });

    }
  });
}

//Aqui, temos as funções para coletar os cristais verdadeiros
coletarVerdadeiro(player, cristal) {
  cristal.destroy();
  this.contadorVerdadeiros++;
  this.contadorTotal++;
}
//Aqui, temos as funções para coletar os cristais falsos
coletarFalso(player, cristal) {
  cristal.destroy();
  this.contadorFalsos++;
  this.contadorTotal++;
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
      key: "sophia-back",
      frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
}

  update() {

   //Aqui, bloqueamos os controles do personagem durante a subida da corda
    if (this.subindoCorda) {
    this.player.setVelocity(0);
    return;
}
    //Aqui, atualizamos o contador da tela
    this.textoCristais.setText(
    "Verdadeiros: " + this.contadorVerdadeiros +
    "\nFalsos: " + this.contadorFalsos +
    "\nTotal: " + this.contadorTotal
  );

    //Aqui, travamos o eixo X da câmera no centro da tela
    this.cameras.main.scrollX = 960 - this.cameras.main.width / 2;

    //Aqui, resetamos a velocidade sempre que não estiver nada sendo apertado
    let velocityX = 0;

    // Aqui, fazemos o movimento horizontal do personagem
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      velocityX = -this.speed;
      this.player.anims.play("sophia-left", true);
    }
    else if (this.cursors.right.isDown || this.keys.D.isDown) {
      velocityX = this.speed;
      this.player.anims.play("sophia-right", true);
    }
    // Aqui, fazemos a animação parar quando o personagem estiver parado
    if (velocityX === 0) {
      this.player.anims.stop();
      this.player.setFrame(0);
    }

    // Aqui, aplicamos a velocidade e a gravidade ao jogador
    this.player.setGravityY(200);
    this.player.setVelocityX(velocityX);

     // Aqui, adicionamos o pulo na fase
    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && (this.player.body.blocked.down || this.player.body.touching.down)) {
    this.player.setVelocityY(-200);} 

     //Aqui, criamos o movimento das plataformas que se moverão na vertical
    this.tempoMovimento += 0.01;
     let meio = 730;
     let meio2 = 590
     let amplitude = 60;
    this.plataformaMovel.y = meio + amplitude * Math.sin(this.tempoMovimento);
    this.plataformaMovel.body.updateFromGameObject();
    this.plataformaMovel2.y = meio2 + amplitude * Math.sin(this.tempoMovimento);
    this.plataformaMovel2.body.updateFromGameObject();

    //Aqui, criamos o movimento da plataforma que se moverá na horizontal
    let centroX = 900;
    let amplitudeX = 50;
    this.plataformaHorizontal.x = centroX + amplitudeX * Math.sin(this.tempoMovimento);
    this.plataformaHorizontal.body.updateFromGameObject();
}
}




