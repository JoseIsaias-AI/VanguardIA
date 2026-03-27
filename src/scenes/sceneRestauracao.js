import { registrarTeclaMenu } from '../menu.js';

export class sceneRestauracao extends Phaser.Scene {
  constructor() {
    super("sceneRestauracao");
  }

  preload() {
    // Carregando cenários (Noite e Restaurado)
    this.load.video("cutscene2", "assets/Cutscene/CutScene2.mp4");
    this.load.image("cenarioNoite", "assets/fases/sceneLabCristal/labCristalEscuro.png"); 
    this.load.image("objetosLabEsc", "assets/objetos/sceneLabCristal/objetosLabCristal1.png");
    this.load.image("cenarioClaro", "assets/fases/sceneLabCristal/labCristalClaro.png"); 
    this.load.image("objLabClaro", "assets/objetos/sceneLabCristal/objetosLabCristal2.png");
    
    this.load.image("colisao", "assets/Objetos/sceneLabCristal/mapaColisao.png"); 

    this.load.spritesheet("bauAnimado", "assets/objetos/bau.png", { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("sophia","assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("asimov","assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    registrarTeclaMenu(this);
    this.scene.launch("bgMusic");
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.lendoMensagem = false;
    this.podeInteragir = false;
    this.progressoHistoria = 0;
    this.temCristal = false; 
    this.mapaRestaurado = false;
    this.scaleMapa = 2.8;

    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const centroX = this.cameras.main.centerX;
    const centroY = this.cameras.main.centerY;

    this.pontoRestauracaoX = centroX;
    this.pontoRestauracaoY = centroY;

    this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "cenarioNoite").setScale(this.scaleMapa);
    this.objetos = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "objetosLabEsc").setScale(this.scaleMapa);

    // Sistema de colisão via Canvas
    try {
      this.collisionImage = this.textures.get("colisao").getSourceImage();
      this.collisionCanvas = document.createElement("canvas");
      this.collisionCanvas.width = this.collisionImage.width;
      this.collisionCanvas.height = this.collisionImage.height;
      this.collisionCtx = this.collisionCanvas.getContext("2d");
      this.collisionCtx.drawImage(this.collisionImage, 0, 0);
    } catch (e) {
      console.warn("Erro ao carregar mapa de colisão. Certifique-se de usar um servidor local.", e);
    }

    const surgirX = this.background.x - 100; // 100 pixels à esquerda do centro
    const surgirY = this.background.y + 50;  // 50 pixels abaixo do centro

    this.sophia = this.add.sprite(surgirX, surgirY, "sophia").setScale(2);
    this.cameras.main.startFollow(this.sophia).setZoom(1.8);

    this.asimov = this.add.sprite(surgirX - 40, surgirY, "asimov").setScale(2);

    // Baú
    this.bauAnimado = this.add.sprite(875, 310, "bauAnimado").setScale(2.5);
    if (!this.anims.exists("fechado")) {
      this.anims.create({ key: "fechado", frames: [{ key: "bauAnimado", frame: 0 }], frameRate: 1 });
      this.anims.create({
        key: "abrindo",
        frames: this.anims.generateFrameNumbers("bauAnimado", { start: 0, end: 1 }),
        frameRate: 2,
        repeat: 0,
      });
    }
    this.bauAnimado.play("fechado");

    // HUD Tecla E
    this.containerTecla = this.add.container(0, 0).setVisible(false);
    let iconTecla = this.add.graphics().fillStyle(0xffffff, 1).lineStyle(2, 0x000000).fillRoundedRect(-15, -15, 30, 30, 5).strokeRoundedRect(-15, -15, 30, 30, 5);
    let letra = this.add.text(0, 0, "E", { fontSize: "25px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTecla.add([iconTecla, letra]);

    // Animação HUD
    this.tweens.add({ targets: this.containerTecla, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    // HUD Caixa de Diálogo
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 40;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9).lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15).strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

    this.textoDialogo = this.add.text(xCaixa + 50, yCaixa + 45, "", {
      fontSize: "26px",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff",
      wordWrap: { width: larguraCaixa - 200 },
      lineSpacing: 10
    }).setScrollFactor(0).setDepth(101);

    // Inputs
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.pulando = false;

    // Animações Personagem
    this.criarAnimacoes();
  }

  colidiuComVerde(xMundo, yMundo) {
    if (!this.collisionCtx) return false;
    
    const bgX = this.background.x;
    const bgY = this.background.y;
    const escalaAtual = this.background.scaleX; 

    let larguraReal = this.collisionImage.width * escalaAtual;
    let alturaReal = this.collisionImage.height * escalaAtual;

    // Calcula a quina superior esquerda do mapa na tela
    let origemX = bgX - larguraReal / 2;
    let origemY = bgY - alturaReal / 2;

    // Converte a posição do personagem para a posição dentro da imagem original (0 a largura da imagem)
    let xLocal = (xMundo - origemX) / escalaAtual;
    let yLocal = (yMundo - origemY) / escalaAtual;

    // Se estiver fora dos limites da imagem, considera colisão (impede de sair do mapa)
    if (xLocal < 0 || yLocal < 0 || xLocal >= this.collisionImage.width || yLocal >= this.collisionImage.height) {
        return true;
    }

    let pixel = this.collisionCtx.getImageData(Math.floor(xLocal), Math.floor(yLocal), 1, 1).data;
    
    // Verde puro: R=0, G=255, B=0. 
    // Ajustado para aceitar variações de tons de verde:
    return pixel[1] > 150 && pixel[0] < 100 && pixel[2] < 100;
}

  update() {
    if (this.lendoMensagem) {
      this.sophia.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
      return;
    }

    let velocidade = 3;
    let movimentacao = false;
    
    // Ponto de checagem na base dos pés do personagem
    let checkX = this.sophia.x;
    let checkY = this.sophia.y + 25; 

    // Movimentação com Colisão Preditiva
    if ((this.cursors.left.isDown || this.keys.A.isDown) && !this.colidiuComVerde(checkX - velocidade, checkY)) {
      this.sophia.x -= velocidade;
      this.sophia.anims.play("sophia_left", true);
      movimentacao = true;
    } else if ((this.cursors.right.isDown || this.keys.D.isDown) && !this.colidiuComVerde(checkX + velocidade, checkY)) {
      this.sophia.x += velocidade;
      this.sophia.anims.play("sophia_right", true);
      movimentacao = true;
    }

    if ((this.cursors.up.isDown || this.keys.W.isDown) && !this.colidiuComVerde(checkX, checkY - velocidade)) {
      this.sophia.y -= velocidade;
      if (!movimentacao) this.sophia.anims.play("sophia_back", true);
      movimentacao = true;
    } else if ((this.cursors.down.isDown || this.keys.S.isDown) && !this.colidiuComVerde(checkX, checkY + velocidade)) {
      this.sophia.y += velocidade;
      if (!movimentacao) this.sophia.anims.play("sophia_front", true);
      movimentacao = true;
    }

    if (!movimentacao) this.sophia.anims.stop();

    // --- LÓGICA DO ASIMOV SEGUIR COM ANIMAÇÕES DIRECIONAIS ---
    let distMin = 60; 
    let velAsimov = 2.4; 

    let dx = this.sophia.x - this.asimov.x;
    let dy = this.sophia.y - this.asimov.y;
    let distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia > distMin) {
      let vx = (dx / distancia) * velAsimov;
      let vy = (dy / distancia) * velAsimov;

      // Checa colisão antes de mover
      if (!this.colidiuComVerde(this.asimov.x + vx, this.asimov.y + vy + 10)) {
        this.asimov.x += vx;
        this.asimov.y += vy;

        // Determina qual animação tocar baseada no eixo de maior movimento
        if (Math.abs(vx) > Math.abs(vy)) {
          // Movimento prioritário na Horizontal
          if (vx > 0) this.asimov.anims.play("asimov_right", true);
          else this.asimov.anims.play("asimov_left", true);
        } 
        else {
          // Movimento prioritário na Vertical
          if (vy > 0) this.asimov.anims.play("asimov_front", true);
          else this.asimov.anims.play("asimov_back", true);
        }
      }
    } 
    else {
      // Quando para, ele fica de frente (ou você pode escolher o frame 0)
       this.asimov.anims.stop();
    }
    
    // --- SISTEMA DE PROFUNDIDADE (Y-SORTING) ---
    // Isso impede que um personagem "entre" no outro visualmente de forma errada
    this.sophia.setDepth(this.sophia.y);
    this.asimov.setDepth(this.asimov.y);

    // Lógica do Pulo
    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      let yInicial = this.sophia.y;
      this.tweens.add({
        targets: this.sophia,
        y: yInicial - 40,
        duration: 300,
        yoyo: true,
        ease: "Sine.easeOut",
        onComplete: () => { this.pulando = false; }
      });
    }

    // Interações
    let distBau = Phaser.Math.Distance.Between(this.sophia.x, this.sophia.y, this.bauAnimado.x, this.bauAnimado.y);
    let distCentro = Phaser.Math.Distance.Between(this.sophia.x, this.sophia.y, this.pontoRestauracaoX, this.pontoRestauracaoY);

    if (distBau < 60 && !this.temCristal) {
      this.podeInteragir = "bau";
      this.containerTecla.setVisible(true).setPosition(this.bauAnimado.x, this.bauAnimado.y - 50);
    } 
    else if (distCentro < 150 && this.temCristal && !this.mapaRestaurado) {
      this.podeInteragir = "centro";
      this.containerTecla.setVisible(true).setPosition(this.pontoRestauracaoX, this.pontoRestauracaoY - 40);
    } 
    else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      if (this.podeInteragir === "bau") {
        this.bauAnimado.play("abrindo");
        this.temCristal = true;
        this.mostrarMensagem("Você obteve o CRISTAL DE ENERGIA!\nLeve-o até o centro do mapa.");
      } 
      else if (this.podeInteragir === "centro") {
        this.restaurarMundo();
      }
    }
  }

  restaurarMundo() {
    this.mapaRestaurado = true;
    this.cameras.main.flash(1000, 255, 255, 255); 

    this.background.setTexture("cenarioClaro").setScale(1.85); 
    this.objetos.setTexture("objLabClaro").setScale(this.scaleMapa);

    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start("faseCinco"); 
      });
    });
  }

  mostrarMensagem(texto) {
    this.lendoMensagem = true;
    this.caixaDialogo.setVisible(true);
    this.textoDialogo.setVisible(true).setText("");
    this.textoAtual = texto;
    if (this.timerEscrever) this.timerEscrever.remove();
    let letra = 0;
    this.timerEscrever = this.time.addEvent({
      delay: 30,
      callback: () => {
        if (letra < texto.length) {
          this.textoDialogo.text += texto[letra];
          letra++;
        }
      },
      repeat: texto.length - 1,
    });
  }

  fecharMensagem() {
    if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
      this.timerEscrever.remove();
      this.textoDialogo.setText(this.textoAtual);
      return;
    }
    this.lendoMensagem = false;
    this.caixaDialogo.setVisible(false);
    this.textoDialogo.setVisible(false).setText("");

    this.time.delayedCall(100, () => {
      this.podeInteragir = false; 
    });

  }

  criarAnimacoes() {
    if (!this.anims.exists("sophia_left")) {
      this.anims.create({ key: "sophia_left", frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "sophia_right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "sophia_front", frames: this.anims.generateFrameNumbers("sophia", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "sophia_back", frames: this.anims.generateFrameNumbers("sophia", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
    }

    if (!this.anims.exists("asimov_walk")) {
      this.anims.create({ key: "asimov_left", frames: this.anims.generateFrameNumbers("asimov", { start: 21, end: 27 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "asimov_right", frames: this.anims.generateFrameNumbers("asimov", { start: 28, end: 34 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "asimov_front", frames: this.anims.generateFrameNumbers("asimov", { start: 7, end: 9 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "asimov_back", frames: this.anims.generateFrameNumbers("asimov", { start: 14, end: 16 }), frameRate: 10, repeat: -1 });
    }
  }
}