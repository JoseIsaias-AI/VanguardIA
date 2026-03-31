import { registrarTeclaMenu } from '../menu.js';

import {
  registrarControles,
  movimentacaoSophia,
  puloSophia,
  criarAnimacaoSophia
} from '../scenes/movimentacao.js';

export class sceneLBPassado extends Phaser.Scene {
  constructor() {
    super("sceneLBPassado"); // define o nome da cena
  } 

 preload() {
    this.load.image("labB", "assets/fases/sceneLBPassado/labBranco.png");
    this.load.image("camara", "assets/objetos/sceneLBPassado/partOne/camara.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("watson", "assets/personagens/watson.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image("armario", "assets/objetos/sceneLBPassado/partOne/armario.png");
    this.load.image("alvo", "assets/objetos/sceneLBPassado/partOne/alvo.png");
    this.load.image("criogenia", "assets/objetos/sceneLBPassado/partOne/criogenia.png");
    this.load.image("mesa1", "assets/objetos/sceneLBPassado/partOne/mesa1.png");
    this.load.image("mesa2", "assets/objetos/sceneLBPassado/partOne/mesa2.png");
    this.load.image("mesa3", "assets/objetos/sceneLBPassado/partOne/mesa3.png");
    this.load.image("pia1", "assets/objetos/sceneLBPassado/partOne/pia1.png");
    this.load.image("reservasCrio", "assets/objetos/sceneLBPassado/partOne/reservasCrio.png");
    this.load.image("comptBaixo", "assets/objetos/sceneLBPassado/partOne/comptBaixo.png");
    this.load.image("comptCima", "assets/objetos/sceneLBPassado/partOne/comptCima.png");
    this.load.spritesheet("npc1", "assets/Personagens/npc1.png", { frameWidth: 30, frameHeight: 50 });
    this.load.spritesheet("npc2", "assets/Personagens/npc2.png", { frameWidth: 25, frameHeight: 48 });
    this.load.spritesheet("npc3", "assets/Personagens/npc3.png", { frameWidth: 29, frameHeight: 49 });
    this.load.image("npc4", "assets/Personagens/npc4.png");
  }

 create() {
    
   //Aqui, imprimimos se a cena foi criada e aplicamos a tecla de menu
    console.log("Cena criada");
    registrarTeclaMenu(this);

    // Inicia a cena de música de fundo (bgMusic) para música contínua na cena do laboratório passsado.
    this.scene.launch("bgMusic");

  // Aqui, iniciamos todas as funções, que estão separadas para melhor organização 
    this.estadosDaCena();

    this.createMapa();

    this.paredesDeColisao();

    this.createObjetos();

    this.createPlayer();

    this.createNPCs();

    this.createWatson();

    this.createHUD();

    this.createDialogo();

    registrarControles(this);

    criarAnimacaoSophia(this);

    // Aplicando as configurações da camera
    this.cameras.main.startFollow(this.Principal);
    this.cameras.main.setZoom(1.2);

    //Aqui, criamos a caixa de aviso para o menu
    this.exibirAviso("Pressione a tecla M para acessar o menu.");
  }

  //Aplicando as funções que se iniciam no create
 estadosDaCena() {
  //Aqui, iniciamos e organizamos os estados de cena, importante para o controle lógico da cena
  this.entrarNaCamara = false;
  this.lendoMensagem = false;
  this.podeInteragir = false;
  this.podeInteragirWatson = false;
  this.scaleMapa = 3;
}

 createMapa() {
  //Nessa função, criamos o mapa de fundo 
  this.mapa = this.add.image(600, 400, "labB")
    .setScale(this.scaleMapa)
    //Aqui, definimos que o mapa ficará por trás de tudo
    .setDepth(-1);
}

 paredesDeColisao() {
  //Aqui, criamos o grupo de colisão para as paredes
  this.paredes = this.physics.add.staticGroup();
  

  //Aqui, definimos as dimensões
  const larguraParede = this.mapa.displayWidth;
  const alturaParede = 720;
  const centroX = this.mapa.x;
  const centroY = 283;
  const espessura = 30;

  //Aqui, fazemos uma função para criar as paredes
  const criarParede = (x, y, w, h) => {
    let p = this.add.rectangle(x, y, w, h, 0xff0000, 0);
    this.physics.add.existing(p, true);
    this.paredes.add(p);
  };
  //Aqui, criamos as 4 paredes que delimitam o mapa
  criarParede(centroX, centroY - alturaParede / 2 + espessura / 2, larguraParede, espessura);
  criarParede(centroX, centroY + alturaParede / 2 - espessura / 2, larguraParede, espessura);
  criarParede(centroX - larguraParede / 2 + espessura / 2, centroY, espessura, alturaParede);
  criarParede(centroX + larguraParede / 2 - espessura / 2, centroY, espessura, alturaParede);
}

 createObjetos() {
  //Aqui, criamos o grupo de colisão para os objetos
  this.objetosColisao = this.physics.add.staticGroup();

  //Aqui, adicionamos cada objeto do cenário em seu devido lugar
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
  
  //Aqui, aplicamos colisão para os objetos
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
  ].forEach(obj => {
    this.criarColisao(obj);
    obj.setDepth(obj.y);
  });
}

 createPlayer() {
  //Aqui, criamos a personagem principal na fase
  this.Principal = this.physics.add.sprite(400, 300, "sophia")
    .setScale(2)
    .setCollideWorldBounds(true);
  //Aqui, aplicamos colisão e física da personagem
  this.Principal.body.setAllowGravity(false);
  this.Principal.setSize(30, 25);
  this.Principal.setOffset(15, 30);
  //Aqui, configuramos os objetos nos quais a parsonagem colide
  this.physics.add.collider(this.Principal, this.camara);
  this.physics.add.collider(this.Principal, this.paredes);
  this.physics.add.collider(this.Principal, this.objetosColisao);
}

 createNPC(x, y, sprite, animKey) {
  //Aqui, fazemos uma função criadora para gerar NPC's com animação, física e colisão
  const npc = this.physics.add.sprite(x, y, sprite)
    .setScale(2)
    .setDepth(1000);

  //Aqui, aplicamos a física do NPC
    npc.body.setAllowGravity(false);
  npc.setImmovable(true);

  //Aqui, aplicamos a animação do NPC
  npc.play(animKey);

  //Aqui, fazemos os NPC's colidirem com o personagem principal
  this.physics.add.collider(this.Principal, npc);

  return npc;
}

 createNPCs() {
//Aqui, criamos as animações do NPC
  this.anims.create({
  key: "npc1_idle",
  frames: this.anims.generateFrameNumbers("npc1", { start: 0, end: 8 }),
  frameRate: 6,
  repeat: -1
});

this.anims.create({
  key: "npc2_idle",
  frames: this.anims.generateFrameNumbers("npc2", { start: 0, end: 16 }),
  frameRate: 6,
  repeat: -1
});

this.anims.create({
  key: "npc3_idle",
  frames: this.anims.generateFrameNumbers("npc3", { start: 0, end: 20 }),
  frameRate: 6,
  repeat: -1
});
//Aqui, criamos os NPC's usando a função criadora createNPC
this.npc1 = this.createNPC(290, 330, "npc1", "npc1_idle");
this.npc2 = this.createNPC(350, 50, "npc2", "npc2_idle");
this.npc3 = this.createNPC(820, 270, "npc3", "npc3_idle");
this.npc4 = this.createNPC(800, 455, "npc4", "npc4_idle");
}

 createWatson(){
// Aqui, criamos o Watson, NPC principal
    this.watson = this.physics.add.sprite(830, 80, "watson").setScale(2.3);
    this.watson.body.setAllowGravity(false);
    this.watson.setSize(30, 25);
    this.watson.setOffset(15, 30);
    this.watson.setImmovable(true);
    this.physics.add.collider(this.Principal, this.watson);

    //Aqui, criamos as animações do Watson
    if (!this.anims.exists("watson_front")) {
      this.anims.create({ key: "watson_front", frames: this.anims.generateFrameNumbers("watson", { start: 0, end: 1 }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "watson_back", frames: this.anims.generateFrameNumbers("watson", { start: 7, end: 9 }), frameRate: 4, repeat: -1 });
      this.anims.create({ key: "watson_side", frames: this.anims.generateFrameNumbers("watson", { start: 14, end: 16 }), frameRate: 4, repeat: -1 });
    }
    this.watson.play("watson_front");
}

 createHUD(){
//Aqui, criamos o HUD da tecla E para a câmara
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

    //Aqui, criamos o HUD da tecla E para o Watson
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
}

 createDialogo(){
//Aqui, criamos as caixas de diálogo
    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1300;
    const alturaCaixa = 175;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 140;
    
    //Aqui, configuramos o design das caixas
    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

    this.textoDialogo = this.add
      .text(xCaixa + 40, yCaixa + 35, "", {
        fontSize: "28px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#ccffff",
        wordWrap: { width: larguraCaixa - 80 },
        lineSpacing: 10,
      })
      .setScrollFactor(0)
      .setDepth(1001)
      .setVisible(false);

    this.retanguloAviso = this.add.graphics();
    this.retanguloAviso.fillStyle(0x000000, 0.8); // Preto com 80% de opacidade
    this.retanguloAviso.fillRect(700, 900, 500, 30, 15); 
    this.retanguloAviso.setScrollFactor(0).setDepth(2000); // Fica fixo na tela e acima de tudo

    // Criando a Frase
    this.textoAviso = this.add.text(950, 910, "SISTEMA ATUALIZADO", {
        fontSize: '18px',
        fill: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);

    // Começam invisíveis
    this.retanguloAviso.setVisible(false);
    this.textoAviso.setVisible(false);

    // Label do nome do falante — aparece acima da borda esquerda da caixa
    this.labelNome = this.add
      .text(xCaixa + 16, yCaixa - 28, "", {
        fontSize: "22px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#00ffff",
        fontStyle: "bold",
        backgroundColor: "#1a1a1a",
        padding: { left: 8, right: 8, top: 3, bottom: 3 },
      })
      .setScrollFactor(0)
      .setDepth(1002)
      .setVisible(false);
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

  movimentacaoSophia(this, this.Principal, {
  left: "sophia_esquerda",
  right: "sophia_direita",
  front: "sophia_frente",
  back: "sophia_tras"
});

puloSophia(this, this.Principal);

    // depth sorting: Y puro — mesmo sistema dos objetos estáticos
    this.Principal.setDepth(this.Principal.y);
    this.watson.setDepth(this.watson.y);
    this.npc1.setDepth(this.npc1.y);
    this.npc2.setDepth(this.npc2.y);
    this.npc3.setDepth(this.npc3.y);
    this.npc4.setDepth(this.npc4.y);

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
      this.mostrarMensagem("SISTEMA: Iniciando criogenia...", "SISTEMA");
    }

    if (this.podeInteragirWatson && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.containerTeclaWatson.setVisible(false);
      this.falando_watson = true;
      this.dialogoWatsonIndex = 0;
      this.dialogoWatson = [
        "Sophia, boa sorte, estaremos torcendo para que você fique sempre bem.",
      ];
      this.mostrarMensagem(this.dialogoWatson[this.dialogoWatsonIndex], "Watson");
    }
}

  // nome: string com o nome do falante (ex: "Sophia", "Watson", "SISTEMA")
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

    if (this.falando_watson) {
      this.dialogoWatsonIndex++;
      if (this.dialogoWatsonIndex < this.dialogoWatson.length) {
        this.mostrarMensagem(this.dialogoWatson[this.dialogoWatsonIndex], "Watson");
        return;
      }
      this.falando_watson = false;
      this.entrarNaCamara = true;
      return;
    }

    this.cameras.main.fadeOut(1000);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("sceneLBFuturo");
    });
  }

  exibirAviso(frase) {
    this.textoAviso.setText(frase);
    this.retanguloAviso.setVisible(true);
    this.textoAviso.setVisible(true);

    // Faz o aviso sumir depois de 5 segundos
    this.time.delayedCall(5000, () => {
      this.retanguloAviso.setVisible(false);
      this.textoAviso.setVisible(false);
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
