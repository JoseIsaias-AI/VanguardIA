export class Scene01 extends Phaser.Scene {
  constructor() {
    super("Scene01"); // define o nome da cena
  }

  preload() {
    // carrega as coisas na pagina

    this.load.image("labB", "assets/fases/sceneOne/labBranco.png"); // laboratório branco
    this.load.image("camara", "assets/objetos/sceneOne/partOne/camara.png"); // camara criogenica
    this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
      frameWidth: 64,
      frameHeight: 64,
    }); // spritesheet da sophia (player)
    this.load.spritesheet("watson", "assets/personagens/watson.png", {
      frameWidth: 64,
      frameHeight: 64,
    }); // spritesheet do watson (NPC)

    // objetos do laboratório branco
    this.load.image("armario", "assets/objetos/sceneOne/partOne/armario.png");
    this.load.image("alvo", "assets/objetos/sceneOne/partOne/alvo.png");
    this.load.image(
      "criogenia",
      "assets/objetos/sceneOne/partOne/criogenia.png",
    );
    this.load.image("mesa1", "assets/objetos/sceneOne/partOne/mesa1.png");
    this.load.image("mesa2", "assets/objetos/sceneOne/partOne/mesa2.png");
    this.load.image("mesa3", "assets/objetos/sceneOne/partOne/mesa3.png");
    this.load.image("pia1", "assets/objetos/sceneOne/partOne/pia1.png");
    this.load.image(
      "reservasCrio",
      "assets/objetos/sceneOne/partOne/reservasCrio.png",
    );
    this.load.image(
      "comptBaixo",
      "assets/objetos/sceneOne/partOne/comptBaixo.png",
    );
    this.load.image(
      "comptCima",
      "assets/objetos/sceneOne/partOne/comptCima.png",
    );
  }

  create() {
    // cria as coisas na cena

    // variáveis de estado //
    this.lendoMensagem = false; // bloqueia movimento se o jogador estiver lendo
    this.podeInteragir = false; // indica se o jogador está próximo de um item interativo
    this.podeInteragirWatson = false; // indica se o jogador está próximo do Watson
    this.scaleMapa = 3;

    // criando o mapa //
    this.mapa = this.add
      .image(600, 400, "labB")
      .setScale(this.scaleMapa)
      .setDepth(-1); // define this.mapa como a imagem do laboratorio e define que estara no fundo

    // criando uma barreira no laboratorio -> paredes //
    let larguraParede = this.mapa.displayWidth; // define a largura da parede como o tamanho do mapa
    let alturaParede = 720; // o mapa é mais alto que a barreira das paredes entao defino uma altura
    let centroX = this.mapa.x; // posiciona as barreiras no x
    let centroY = 283; // posiciona as barreiras no y
    let espessura = 30; // espessura das barreiras
    this.paredes = this.physics.add.staticGroup(); // define this.paredes como um staticGroup - nao se move, nao é afetado pela gravidade nem por colisões dinamicas - que possui fisica

    this.objetosColisao = this.physics.add.staticGroup(); // adiciona um grupo para os perifericos do laboratório

    let paredeCima = this.add.rectangle(
      // cria a barreira superior adiconando um retangulo
      centroX, // posiciona no x
      centroY - alturaParede / 2 + espessura / 2, // posiciona no y
      larguraParede, // largura do retangulo
      espessura, // altura do retangulo
      0xff0000, // cor
      0, // deixa a opacidade no 0
    );
    this.physics.add.existing(paredeCima, true); // adiciona fisica ao retangulo
    this.paredes.add(paredeCima); // adiciona o retangulo ao grupo paredes

    let paredeBaixo = this.add.rectangle(
      // barreira inferior
      centroX,
      centroY + alturaParede / 2 - espessura / 2,
      larguraParede,
      espessura,
      0xff0000,
      0,
    );
    this.physics.add.existing(paredeBaixo, true);
    this.paredes.add(paredeBaixo);

    let paredeEsquerda = this.add.rectangle(
      // barreira esquerda
      centroX - larguraParede / 2 + espessura / 2,
      centroY,
      espessura,
      alturaParede,
      0xff0000,
      0,
    );
    this.physics.add.existing(paredeEsquerda, true);
    this.paredes.add(paredeEsquerda);

    let paredeDireita = this.add.rectangle(
      // barreira direita
      centroX + larguraParede / 2 - espessura / 2,
      centroY,
      espessura,
      alturaParede,
      0xff0000,
      0,
    );
    this.physics.add.existing(paredeDireita, true);
    this.paredes.add(paredeDireita);

    // adicionando os objetos //
    this.armario = this.add
      .image(220, 10, "armario")
      .setScale(3.25)
      .setDepth(1); // armário do laboratório
    this.armario2 = this.add
      .image(980, 10, "armario")
      .setScale(3.25)
      .setDepth(1); // armário 2 do laboratório
    this.alvo = this.add.image(215, 275, "alvo").setScale(3).setDepth(1); // mesa de alvo
    this.alvo2 = this.add.image(965, 375, "alvo").setScale(3.1).setDepth(1); // mesa de alvo
    this.criogenia = this.add
      .image(600, 6, "criogenia")
      .setScale(3)
      .setDepth(1); // criogenia
    this.mesa1 = this.add.image(190, 140, "mesa1").setScale(3).setDepth(1); // mesa 1
    this.mesa1b = this.add.image(993, 518, "mesa1").setScale(3).setDepth(1); // mesa 2
    this.mesa2 = this.add.image(343, 20, "mesa2").setScale(3).setDepth(1); // mesa 2
    this.mesa3 = this.add.image(858, 18, "mesa3").setScale(3).setDepth(1); // mesa 3
    this.pia1 = this.add.image(203, 470, "pia1").setScale(3).setDepth(1); // pia
    this.reservasCrio = this.add
      .image(1023, 165, "reservasCrio")
      .setScale(3)
      .setDepth(1); // reservas da criogenia
    this.comutador1prt1 = this.add
      .image(385, 220, "comptCima")
      .setScale(3)
      .setDepth(3); // comutador 1 parte 1
    this.comutador1prt2 = this.add
      .image(385, 260, "comptBaixo")
      .setScale(3)
      .setDepth(1); // comutador 1 parte 2
    this.comutador2prt1 = this.add
      .image(812, 220, "comptCima")
      .setScale(3)
      .setDepth(3); // comutador 2 parte 1
    this.comutador2prt2 = this.add
      .image(812, 260, "comptBaixo")
      .setScale(3)
      .setDepth(1); // comutador 2 parte 2
    this.comutador3prt1 = this.add
      .image(385, 410, "comptCima")
      .setScale(3)
      .setDepth(3); // comutador 3 parte 1
    this.comutador3prt2 = this.add
      .image(385, 450, "comptBaixo")
      .setScale(3)
      .setDepth(1); // comutador 3 parte 2
    this.comutador4prt1 = this.add
      .image(812, 410, "comptCima")
      .setScale(3)
      .setDepth(3); // comutador 4 parte 1
    this.comutador4prt2 = this.add
      .image(812, 450, "comptBaixo")
      .setScale(3)
      .setDepth(1); // comutador 4 parte 2
    this.camara = this.physics.add
      .staticImage(600, 20, "camara")
      .setScale(0.25)
      .refreshBody(); // camara criogenica

    // adiciona colisão a todos os objetos do laboratório pela função criarColisao
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

    // colisão apenas na parte de baixo dos computadores
    this.criarColisao(this.comutador1prt2);
    this.criarColisao(this.comutador2prt2);
    this.criarColisao(this.comutador3prt2);
    this.criarColisao(this.comutador4prt2);

    // adiciona o personagem principal //
    this.Principal = this.physics.add
      .sprite(400, 300, "sophia")
      .setScale(2)
      .setCollideWorldBounds(true);
    // FIX: depth da Sophia não é fixo — será atualizado dinamicamente no update()
    this.Principal.body.setAllowGravity(false); // desativa a gravidade para o personagem, já que é um jogo top-down
    this.Principal.setSize(30, 25); // ajusta o tamanho do corpo de colisão para ser menor que a sprite
    this.Principal.setOffset(15, 30); // ajusta o offset do corpo de colisão para centralizar melhor

    this.physics.add.collider(this.Principal, this.camara); // adiciona colisão entre o personagem e a camara criogenica
    this.physics.add.collider(this.Principal, this.paredes); // adiciona colisão entre o personagem e as paredes
    this.physics.add.collider(this.Principal, this.objetosColisao); // adiciona colisão entre o personagem e os objetos do laboratório

    // WATSON (NPC)
    this.watson = this.physics.add
      .sprite(720, 100, "watson")
      .setScale(2.2)
      .setDepth(2);
    this.watson.body.setAllowGravity(false);
    this.watson.setSize(30, 25);
    this.watson.setOffset(15, 30);
    this.watson.setImmovable(true);
    this.physics.add.collider(this.Principal, this.watson);

    // animações do Watson NPC
    if (!this.anims.exists("watson_front")) {
      this.anims.create({
        key: "watson_front",
        frames: this.anims.generateFrameNumbers("watson", { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.create({
        key: "watson_back",
        frames: this.anims.generateFrameNumbers("watson", { start: 7, end: 9 }),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.create({
        key: "watson_side",
        frames: this.anims.generateFrameNumbers("watson", { start: 14, end: 16 }),
        frameRate: 4,
        repeat: -1,
      });
    }

    this.watson.play("watson_front");

    //  HUD (interface do usuário) //

    // cria um container da tecla "E" que aparece perto dos objetos
    // FIX: setDepth(200) garante que o balão fique por cima de todos os objetos do cenário
    this.containerTecla = this.add.container(0, 0).setDepth(200);
    let largura = 140;
    let altura = 40;
    let iconeTecla = this.add.graphics();
    iconeTecla.fillStyle(0xffffff, 1);
    iconeTecla.lineStyle(2, 0x000000, 1);
    iconeTecla.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTecla.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    let letra = this.add
      .text(0, 0, "Aperte E", {
        fontSize: "20px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.containerTecla.add([iconeTecla, letra]); // adiciona desenho e texto ao container
    this.containerTecla.setVisible(false);

    // Animação leve de "flutuar" para a tecla "E" da câmara
    this.tweens.add({
      targets: this.containerTecla,
      y: "+=5",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    
    // FIX: setDepth(200) garante que o balão fique por cima de todos os objetos do cenário
    this.containerTeclaWatson = this.add.container(0, 0).setDepth(200);

    let iconeTeclaWatson = this.add.graphics();
    iconeTeclaWatson.fillStyle(0xffffff, 1);
    iconeTeclaWatson.lineStyle(2, 0x000000, 1);
    iconeTeclaWatson.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);
    iconeTeclaWatson.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 10);

    let letraWatson = this.add
      .text(0, 0, "Aperte E", {
        fontSize: "20px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.containerTeclaWatson.add([iconeTeclaWatson, letraWatson]);
    this.containerTeclaWatson.setVisible(false);

    this.tweens.add({
      targets: this.containerTeclaWatson,
      y: "+=5",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Variáveis de posicionamento dinâmico
    const larguraJogo = this.cameras.main.width;
    const alturaJogo = this.cameras.main.height;
    const larguraCaixa = 1000;
    const alturaCaixa = 180;
    const xCaixa = (larguraJogo - larguraCaixa) / 2;
    const yCaixa = alturaJogo - alturaCaixa - 40; // 40px de margem do fundo

    // Cria caixa de diálogo (HUD)
    // Importante: setScrollFactor(0) fixa o elemento na tela, ignorando a câmera
    this.caixaDialogo = this.add.graphics();
    this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
    this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
    this.caixaDialogo.fillRoundedRect(
      xCaixa,
      yCaixa,
      larguraCaixa,
      alturaCaixa,
      15,
    );
    this.caixaDialogo.strokeRoundedRect(
      xCaixa,
      yCaixa,
      larguraCaixa,
      alturaCaixa,
      15,
    );
    this.caixaDialogo.setScrollFactor(0).setDepth(100).setVisible(false);

    this.textoDialogo = this.add
      .text(xCaixa + 40, yCaixa + 35, "", {
        fontSize: "26px",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#ccffff",
        wordWrap: { width: larguraCaixa - 80 },
        lineSpacing: 10,
      })
      .setScrollFactor(0)
      .setDepth(101);

    //  Inputs e câmera
    this.cursors = this.input.keyboard.createCursorKeys(); // Define setas do teclado como cursor
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Define E para interação

    this.cameras.main.startFollow(this.Principal); // Define que a câmera deve seguir o jogador
    this.cameras.main.setZoom(1.2);

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

  update() {
    // Bloqueio do movimento. Se estiver lendo, o player não anda
    if (this.lendoMensagem) {
      this.Principal.setVelocity(0, 0); // Garante que ele pare ao ler
      this.Principal.anims.stop();
      if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
        this.fecharMensagem();
      }
      return;
    }

    // Reseta a velocidade a cada frame para ele não deslizar eternamente
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

   
    this.Principal.setDepth(this.Principal.y);
    this.watson.setDepth(this.watson.y);

    let targetX = this.camara.x;
    let targetY = this.camara.y;

    // Calcula a distância entre dois pontos (Personagem e Objeto)
    let distancia = Phaser.Math.Distance.Between(
      this.Principal.x,
      this.Principal.y,
      targetX,
      targetY,
    );

    // distancia ate o watson
    let distanciaWatson = Phaser.Math.Distance.Between(
      this.Principal.x,
      this.Principal.y,
      this.watson.x,
      this.watson.y,
    );

    // Mostra o botão "E" se estiver perto da câmara
    if (distancia < 140) {
      this.podeInteragir = true;
      this.containerTecla.setVisible(true);
      this.containerTecla.setPosition(targetX, targetY - 50);
    } else {
      this.podeInteragir = false;
      this.containerTecla.setVisible(false);
    }

    // MOSTRAR ICONE E - WATSON
    if (distanciaWatson < 120) {
      this.podeInteragirWatson = true;
      this.containerTeclaWatson.setVisible(true);
      this.containerTeclaWatson.setPosition(this.watson.x, this.watson.y - 80);
    } else {
      this.podeInteragirWatson = false;
      this.containerTeclaWatson.setVisible(false);
    }

    // Ação ao apertar a tecla "E" na câmara
    if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
      this.mostrarMensagem("SISTEMA: Iniciando criogenia...");
    }

    // INTERACAO - WATSON
    if (
      this.podeInteragirWatson &&
      Phaser.Input.Keyboard.JustDown(this.teclaE)
    ) {
      this.containerTeclaWatson.setVisible(false);
      console.log("Interagiu com o Watson!");
      // aqui voce pode adicionar dialogo, cutscene, etc.
    }
  }

  // Função que cria o efeito de texto "digitado" letra por letra
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
    // Se apertar E enquanto ainda está escrevendo, ele termina de uma vez (opcional)
    if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
      this.timerEscrever.remove();
      this.textoDialogo.setText(this.textoAtualArmazenado);
      return; // Sai da função para não fechar a caixa ainda
    }

    // Se já terminou de digitar, aí sim fecha
    this.lendoMensagem = false;
    this.caixaDialogo.setVisible(false);
    this.textoDialogo.setVisible(false);
    this.textoDialogo.setText("");

    this.cameras.main.fadeOut(1000);

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("SceneFuturo");
    });
  }

  criarColisao(objeto, reduzirAltura = 1) {
    // objeto é a imagmem do objeto, reduzirAltura é um multiplicador para deixar a colisão menor que a imagem se necessário
    this.physics.add.existing(objeto, true); // cria fisica e diz que é um corpo estático (true)

    let alturaOriginal = objeto.displayHeight; // pega a altura original da imagem para calcular o novo tamanho do corpo de colisão

    objeto.body.setSize(
      // ajusta o tamanho do corpo de colisão para ser igual ao da imagem, mas com a altura reduzida se necessário
      objeto.displayWidth,
      alturaOriginal * reduzirAltura,
    );

    objeto.body.setOffset(
      // centraliza o offset
      0, // deixa o offset x em 0 para alinhar com a imagem
      alturaOriginal * (1 - reduzirAltura), // colisão vertical
    );

    this.objetosColisao.add(objeto); // adiciona o objeto ao grupo de objetos
  }
}