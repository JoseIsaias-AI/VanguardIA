/*Esta cena consiste em um momento de transição entre fases, no qual o jogador sai do minigame de plataformas(fase3), sai da sala das 
portas e vem para o HUB do cristal e agora precisa fabricar o cristal, mas para isso ele precisa treinar uma IA generativa e o 
minigame consiste na limpeza dos ruídos*/

import { registrarTeclaMenu } from '../menu.js'; //importa o Menu

export class scenePreFase4 extends Phaser.Scene {
  constructor() {
    super("scenePreFase4");
  }

  //------------------carregamento das imagens e sprites usados durante a fase1 -----------------------------
  preload() {
    this.load.image("labEscuro2", "assets/fases/sceneLabCristal/labCristalEscuro.png");
    this.load.spritesheet("objetosLab", "assets/Fases/preFase4/objetosLabCristal1.png", {frameWidth: 320, frameHeight: 213});
    this.load.image("mascaraPrefase4", "assets/Fases/preFase4/mascaraPrefase4.png");
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("asimov", "assets/personagens/asimov.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("cutscene_1", "assets/Fases/preFase4/1.png");
    this.load.image("cutscene_2", "assets/Fases/preFase4/2.png");
    this.load.image("cutscene_3", "assets/Fases/preFase4/3.png");
    this.load.image("cutscene_4", "assets/Fases/preFase4/4.png");
    this.load.image("cutscene_5", "assets/Fases/preFase4/5.png");
  }

 //------------------ criação das variáveis, instancia das imagens e criação de animações -----------------------------
  create() {
    registrarTeclaMenu(this);

    this.lendoMensagem = false;
    this.scaleMapa = 3; //escala que será usada no mapa e nos objetos da cena. Tudo seguindo essa variável padrão

    this.mapa = this.add.image(600, 400, "labEscuro2").setScale(this.scaleMapa).setDepth(-1); // criação do mapa abaixo de tudo

    // Objeto do lab — fica parado no frame 0 até a interacao com o Asimov
    this.objetosLab = this.add.sprite(600, 400, "objetosLab", 0).setScale(this.scaleMapa).setDepth(1);

    this.anims.create({ //como existe uma animação para os papeis da maquina perto do Asimov, iniciamos ela aqui que atualiza todos os objetos, mas sentimos apenas a percepção de mudança na máquina
      key: "objetosLab_anim",
      frames: this.anims.generateFrameNumbers("objetosLab", { start: 0, end: 18 }),
      frameRate: 12,
      repeat: 3
    });
    //--------- máscara super importante para a colisão, aparece invisivel, mas sempre está na cena -------
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

    // ---------------SOPHIA (jogável) --------------
    this.Principal = this.physics.add.sprite(400, 300, "sophia").setScale(1.5).setCollideWorldBounds(true);
    this.Principal.body.setAllowGravity(false);
    //this.Principal.setOffset(15, 30);

      // Animações Sophia de movimentação
    if (!this.anims.exists("left")) {
      this.anims.create({ key: "left",  frames: this.anims.generateFrameNumbers("sophia", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "right", frames: this.anims.generateFrameNumbers("sophia", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "front", frames: this.anims.generateFrameNumbers("sophia", { start: 0,  end: 7  }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "back",  frames: this.anims.generateFrameNumbers("sophia", { start: 8,  end: 15 }), frameRate: 10, repeat: -1 });
    }

    // ----------------ASIMOV (NPC) -----------------
    this.asimov = this.physics.add.sprite(900, 250, "asimov").setScale(2);
    this.asimov.body.setAllowGravity(false);
    this.asimov.setOffset(8, 16);
    this.asimov.setImmovable(true);
    this.physics.add.collider(this.Principal, this.asimov);

    // Animações Asimov para movimentação
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
    // estilização CSS para esse balão de interação e o texto interno
    icone.fillStyle(0xffffff, 1).lineStyle(2, 0x000000, 1);
    icone.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    icone.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letraE = this.add.text(0, 0, "Aperte E", { fontSize: "20px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
    this.containerTeclaAsimov.add([icone, letraE]);
    this.containerTeclaAsimov.setVisible(false); //é iniciada de forma invisivel
    this.tweens.add({ targets: this.containerTeclaAsimov, y: "+=5", duration: 800, yoyo: true, repeat: -1 });

    // ------------------------------------ Caixa de diálogo --------------------------------------------- 
    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 500, alturaCaixa = 90;
    const posXCaixa = (larguraJogo - larguraCaixa) / 2, posYCaixa = alturaJogo - alturaCaixa - 300;

    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(posXCaixa, posYCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.strokeRoundedRect(posXCaixa, posYCaixa, larguraCaixa, alturaCaixa, 15);
    this.caixaDialogo.setScrollFactor(0).setDepth(1000).setVisible(false);

    this.textoDialogo = this.add.text(posXCaixa + 40, posYCaixa + 35, "", {
      fontSize: "14px", fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff", wordWrap: { width: larguraCaixa - 80 }, lineSpacing: 10
    }).setScrollFactor(0).setDepth(1001).setVisible(false);

    this.labelNome = this.add.text(posXCaixa + 16, posYCaixa - 28, "", {
      fontSize: "14px", fontFamily: "'Courier New', Courier, monospace",
      color: "#00ffff", fontStyle: "bold", backgroundColor: "#1a1a1a",
      padding: { left: 8, right: 8, top: 3, bottom: 3 }
    }).setScrollFactor(0).setDepth(1002).setVisible(false);

    //---------------------------^^^^ FECHA sistema da caixa de diálogo ^^^^----------------------------------------
 
    // ----------------- Inserção de INPUTS do jogador: CONTROLES ------------------
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

    //ZOOM DA CÂMERA EM 2
    this.cameras.main.startFollow(this.Principal).setZoom(2); 
  }

  update() {
    if (!this.Principal) return;

    //Quando o jogador estiver lendo alguma mensagem esse IF pausa a animação do personagem
    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0);
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem(); //Tecla E selecionada para fechar as mensagens
      return;
    }

    //Este IF é usado para imagens com textos, mas que não são gerados por código. Ele também determina como fechar esta imagem 
    if (this.aguardandoLeitura) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.notificacaoLeitura.destroy();
        this.aguardandoLeitura = false;
        this.exibirCutscenes();
      }
      return;
    }

    //Este IF é usado quando o documento de explicação da IA generativa acontece.
    if (this.emCutscene) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) { //quando apertar a tecla E, vai para a proxima imagem programada
        this.cutsceneIndex++;
        if (this.cutsceneIndex < this.sequenciaCutscene.length) {
          this.imgCutscene.setTexture(this.sequenciaCutscene[this.cutsceneIndex]);
        } else {
          this.imgCutscene.destroy();
          if (this.folhasFundo) this.folhasFundo.forEach(f => f.destroy()); //elimina com as folhas já lidas
          if (this.filtroEscuro) this.filtroEscuro.destroy();
          this.emCutscene = false;
          this.transicaoParaFase4(); //chama a função programada com as açoes para mudar de cena
        }
      }
      return;
    }

    this.Principal.setVelocity(0);
    let velocidade = 150;
    let movimentacao = false;

    //------------------ VERIFICAÇÃO DIRECIONAL DOS PONTOS DE COLISÃO DO PERSONAGEM -------------------
    //variáveis para guardar a posição instantânea da personagem
    let posX = this.Principal.x;
    let posY = this.Principal.y;

    const margem = 16; //para não ficar colado aos objetos, tem essa margem
    const offsetPes = 28; //por ser um jogo com vista top down, o jogador pode, no eixo y, dar a sensação de estar passando para cima do objeto na parte superior.

    if (this.cursors.left.isDown || this.keys.A.isDown) { //--------quando o jogador vai para a esquerda ---------
      if (!this.colidiuComVerde(posX - margem, posY + offsetPes)) {
        this.Principal.setVelocityX(-velocidade);
      }
      this.Principal.anims.play("left", true);
      movimentacao = true;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) { //--------quando o jogador vai para a direita ---------
      if (!this.colidiuComVerde(posX + margem, posY + offsetPes)) {
        this.Principal.setVelocityX(+velocidade);
      }
      this.Principal.anims.play("right", true);
      movimentacao = true;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) { //--------quando o jogador vai para cima ---------
      if (!this.colidiuComVerde(posX, posY + offsetPes - margem)) {
        this.Principal.setVelocityY(-velocidade);
      }
      if (!movimentacao) this.Principal.anims.play("back", true);
      movimentacao = true;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) { //--------quando o jogador vai para baixo ---------
      if (!this.colidiuComVerde(posX, posY + offsetPes + margem)) {
        this.Principal.setVelocityY(+velocidade);
      }
      if (!movimentacao) this.Principal.anims.play("front", true);
      movimentacao = true;
    }
    //------------------------^^^^ Fechamento das verificação direcionais de colisão do personagem ^^^^-------------------------------

    if (!movimentacao) this.Principal.anims.stop();
    if (movimentacao) this.Principal.body.velocity.normalize().scale(velocidade);

    // ------------------ o que acontece quando o jogador aperta SPACE -------------------------
    if (Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.pulando) {
      this.pulando = true;
      let yInicial = this.Principal.y;
      this.tweens.add({
        targets: this.Principal, y: yInicial - 40, duration: 300,
        yoyo: true, ease: "Sine.easeOut",
        onComplete: () => { this.Principal.y = yInicial; this.pulando = false; }
      });
    }

    //define 
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
      this.objetosLab.play("objetosLab_anim");
      this.objetosLab.once("animationcomplete", () => {
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
    //this.textures.get('cutscene_1').setFilter(Phaser.Textures.FilterMode.LINEAR);
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
