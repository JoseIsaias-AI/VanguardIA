// FASE 1 - O INÍCIO
class Fase1 extends Phaser.Scene {

    // Define o nome dessa cena para o Phaser
    constructor() {
        super("Fase1");
    }

    preload() {
        // Carregando assets visuais estáticas do laboratório
        this.load.image('CInicial', '../assets/Fases/lab1inicio1 - Copia.png');
        this.load.image('CFuturo', '../assets/Fases/lab1inicio - Copia.png');
        this.load.image('camara', '../assets/camara.png');

        // Carregando spritesheets
        this.load.spritesheet('Principal', '../assets/Personagens/Principal.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bauanimado', '../assets/bau-anim-Sheet.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Variáveis de estado
        this.lendoMensagem = false; // Bloqueia movimento se o jogador estiver lendo
        this.podeInteragir = false; // Indica se o jogador está próximo de um item interativo
        this.scaleMapa = 0.3;
        
        // Controle da narrativa: 0 = Falar com a Máquina, 1 = Abrir o Baú
        this.progressoHistoria = 0; 

        // Posicionamento do cenário
        this.mapa = this.add.image(600, 400, "CInicial").setScale(this.scaleMapa);
        this.mapa.setDepth(-10); // Garante que o chão fique atrás de tudo

        //  Criação do objetos interativos
        this.camara = this.add.image(600, 300, 'camara').setScale(0.2);

        // Baú (Inicia invisível, só aparece após a viagem no tempo)
        this.bau = this.add.sprite(600, 300, "bauanimado").setScale(2.3);
        this.bau.setVisible(false); 

        //  Personagem Principal
        this.Principal = this.add.sprite(400, 300, 'Principal').setScale(2);

        //  HUD (interface do usuário)
        
        // Cria um container da tecla "E" que aparece perto dos objetos
        this.containerTecla = this.add.container(0, 0);
        let quadrado = this.add.graphics();
        quadrado.fillStyle(0xFFFFFF, 1);
        quadrado.lineStyle(2, 0x000000, 1);
        quadrado.fillRoundedRect(-15, -15, 30, 30, 5);
        quadrado.strokeRoundedRect(-15, -15, 30, 30, 5);
        let letra = this.add.text(0, 0, "E", { fontSize: "25px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
        this.containerTecla.add([quadrado, letra]);   // Adiciona desenho e texto ao container
        this.containerTecla.setVisible(false);

        // Animação leve de "flutuar" para a tecla "E"
        this.tweens.add({
            targets: this.containerTecla,
            y: '+=5',
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Cria caixa de diálogo (HUD)
        // Importante: setScrollFactor(0) fixa o elemento na tela, ignorando a câmera
        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(4, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(150, 550, 900, 150, 15);
        this.caixaDialogo.strokeRoundedRect(150, 550, 900, 150, 15);
        this.caixaDialogo.setScrollFactor(0); 
        this.caixaDialogo.setVisible(false);
        this.caixaDialogo.setDepth(100); // Garante que o texto fique por cima de tudo

        this.textoDialogo = this.add.text(180, 580, "", {
            fontSize: "26px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#ccffff",
            wordWrap: { width: 840 },
            lineSpacing: 10
        }).setScrollFactor(0);
        this.textoDialogo.setDepth(101);

        //  Inputs e câmera
        this.cursors = this.input.keyboard.createCursorKeys(); // Define setas do teclado como cursor
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Define E para interação

        this.cameras.main.startFollow(this.Principal); // Define que a câmera deve seguir o jogador
        this.cameras.main.setZoom(1.2);

        // Configurações da animação
        // Se a animação 'left' ainda não existir (prevenção de erro ao trocar de cena)
        if (!this.anims.exists('left')) {
            this.anims.create({ key: "left", frames: this.anims.generateFrameNumbers("Principal", { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "right", frames: this.anims.generateFrameNumbers("Principal", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "front", frames: this.anims.generateFrameNumbers("Principal", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "back", frames: this.anims.generateFrameNumbers("Principal", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
            
            this.anims.create({ key: "fechado", frames: [{ key: "bauanimado", frame: 0 }], frameRate: 1 });
            this.anims.create({ key: "abrindo", frames: this.anims.generateFrameNumbers("bauanimado", { start: 0, end: 1 }), frameRate: 2, repeat: 0 });
        }
    }

    update() {
        // Bolqueio do movimento. Se estiver lendo, o player não anda
        if (this.lendoMensagem) {
            this.Principal.anims.stop();
            if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
                this.fecharMensagem();
            }
            return;
        }

        // Lógica de movimento nos eixos X e Y
        let velocidade = 3;
        let moveu = false;

        if (this.cursors.left.isDown) {
            this.Principal.x -= velocidade;
            this.Principal.anims.play("left", true);
            moveu = true;
        } else if (this.cursors.right.isDown) {
            this.Principal.x += velocidade;
            this.Principal.anims.play("right", true);
            moveu = true;
        }

        if (this.cursors.up.isDown) {
            this.Principal.y -= velocidade;
            if (!moveu) this.Principal.anims.play("back", true);
            moveu = true;
        } else if (this.cursors.down.isDown) {
            this.Principal.y += velocidade;
            if (!moveu) this.Principal.anims.play("front", true);
            moveu = true;
        }

        if (!moveu) this.Principal.anims.stop(); // Para a animação se o player soltar as teclas

        // LÓGICA DE PROXIMIDADE TEOREMA DE Pitágoras AULA DE MATEMATICA
        let targetX, targetY;
        
        // Verifica se estamos na parte da máquina ou do baú
        if (this.progressoHistoria === 0) {
            targetX = this.camara.x;
            targetY = this.camara.y;
        } else {
            targetX = this.bau.x;
            targetY = this.bau.y;
        }

        // Calcula a distância entre dois pontos (Personagem e Objeto)
        let distancia = Phaser.Math.Distance.Between(this.Principal.x, this.Principal.y, targetX, targetY);

        // Mostra o botão "E" se estiver perto do objeto
        if (distancia < 80) {
            this.podeInteragir = true;
            this.containerTecla.setVisible(true);
            this.containerTecla.setPosition(targetX, targetY - 50);
        } else {
            this.podeInteragir = false;
            this.containerTecla.setVisible(false);
        }

        // Ação ao apertar a tecla "E"
        if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            if (this.progressoHistoria === 0) {
                this.mostrarMensagem("SISTEMA: Iniciando criogenia...");
            } else {
                this.bau.play("abrindo");
                this.mostrarMensagem("MISSÃO: O mundo foi destruído.\nSua tarefa é achar o cristal e restaurar a energia da terra!");
            }
        }
    }

    // Função que cria o efeito de texto "digitado" letra por letra
    mostrarMensagem(textoCompleto) {
        this.lendoMensagem = true;
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setText("");

        let letraAtual = 0;
        if (this.timerEscrever) this.timerEscrever.remove();

        this.timerEscrever = this.time.addEvent({
            delay: 30,
            callback: () => {
                this.textoDialogo.text += textoCompleto[letraAtual];
                letraAtual++;
            },
            repeat: textoCompleto.length - 1
        });
    }

    fecharMensagem() {
        // Se apertar E enquanto ainda está escrevendo, ele termina de uma vez (opcional)
        if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
            this.timerEscrever.remove();
            // Truque pra parar o loop
        } else {
            this.lendoMensagem = false;
            this.caixaDialogo.setVisible(false);
            this.textoDialogo.setText("");

            // DECISÃO DE FLUXO Viajar no tempo ou Ir para Fase 2?
            if (this.progressoHistoria === 0) {
                this.viajarNoTempo();
            } else if (this.progressoHistoria === 1) {
                this.scene.start("Fase2");
            }
        }
    }

    viajarNoTempo() {
        this.lendoMensagem = true; // Trava o player na cut scene
        
        // Fade Out (Tela preta)
        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Troca de cenário e objetos
            this.mapa.setTexture("CFuturo");
            this.camara.setVisible(false);
            this.bau.setVisible(true);
            this.bau.play("fechado");

            // Atualiza fase da história
            this.progressoHistoria = 1;
            this.lendoMensagem = false;

            // Fade In (Volta imagem)
            this.cameras.main.fadeIn(2000, 0, 0, 0);
        });
    }
}

// FASE 2 - A RESTAURAÇÃO

class Fase2 extends Phaser.Scene {
    constructor() {
        super("Fase2");
    }

    preload() {
        // Carregando cenários (Noite e Restaurado)
        this.load.image('cenarioNoite', '../assets/Fases/cenarioanoite.jpeg');
        this.load.image('cenarioClaro', '../assets/Fases/cenarioCLARO.png'); 
        
        this.load.image('colisao', '../assets/mascara.png'); // Deixa a imagem do mapa de colisão invisível
        this.load.spritesheet('bauanimado', '../assets/bau-anim-Sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cientista', '../assets/Personagens/Cient-Lider.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.lendoMensagem = false;
        this.podeInteragir = false;
        this.temCristal = false; // Flag do inventário
        this.mapaRestaurado = false;
        this.scaleMapa = 0.8;
        this.background = this.add.image(600, 400, "cenarioNoite").setScale(this.scaleMapa);

        // Sistema de colisão 
        try {
            this.collisionImage = this.textures.get('colisao').getSourceImage();
            this.collisionCanvas = document.createElement('canvas'); // Cria um canvas invisível em memória
            this.collisionCanvas.width = this.collisionImage.width;
            this.collisionCanvas.height = this.collisionImage.height;
            this.collisionCtx = this.collisionCanvas.getContext('2d');
            this.collisionCtx.drawImage(this.collisionImage, 0, 0);
        } catch (e) {
            console.warn("Aviso: Rodar em servidor local para colisão funcionar corretamente.", e);
        }

        // Baú
        this.bauanimado = this.add.sprite(525, 200, "bauanimado").setScale(2.3);
        // Garantindo que as anims existam caso Fase 1 não tenha carregado antes
        if (!this.anims.exists('fechado')) {
            this.anims.create({ key: "fechado", frames: [{ key: "bauanimado", frame: 0 }], frameRate: 1 });
            this.anims.create({ key: "abrindo", frames: this.anims.generateFrameNumbers("bauanimado", { start: 0, end: 1 }), frameRate: 2, repeat: 0 });
        }
        this.bauanimado.play("fechado");

        this.cientista = this.add.sprite(400, 300, 'cientista').setScale(2);

        // Recriação da HUD (Tecla E e Diálogos) para a nova cena
        this.containerTecla = this.add.container(0, 0).setVisible(false);
        let quad = this.add.graphics().fillStyle(0xFFFFFF, 1).lineStyle(2, 0x000000).fillRoundedRect(-15, -15, 30, 30, 5).strokeRoundedRect(-15, -15, 30, 30, 5);
        let letra = this.add.text(0, 0, "E", { fontSize: "25px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
        this.containerTecla.add([quad, letra]);

        this.tweens.add({ targets: this.containerTecla, y: '+=5', duration: 800, yoyo: true, repeat: -1 });

        // HUD - Caixa de Diálogo - correção
        // Adicionado .setScrollFactor(0) para o texto não andar junto com o mapa
        // Adicionado .setDepth(100) para garantir que fique na frente de tudo
        this.caixaDialogo = this.add.graphics()
            .fillStyle(0x1a1a1a, 0.9)
            .lineStyle(4, 0x00ffff)
            .fillRoundedRect(150, 550, 900, 150, 15)
            .strokeRoundedRect(150, 550, 900, 150, 15)
            .setScrollFactor(0) 
            .setDepth(100)
            .setVisible(false);

        this.textoDialogo = this.add.text(180, 580, "", { 
            fontSize: "26px", 
            color: "#ccffff", 
            wordWrap: { width: 840 } 
        })
        .setScrollFactor(0) // Fixa o texto na tela
        .setDepth(101);     // Texto fica na frente da caixa

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.cameras.main.startFollow(this.cientista).setZoom(1.2);

        if (!this.anims.exists('cient_left')) {
            this.anims.create({ key: "cient_left", frames: this.anims.generateFrameNumbers("cientista", { start: 22, end: 27 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_right", frames: this.anims.generateFrameNumbers("cientista", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_front", frames: this.anims.generateFrameNumbers("cientista", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_back", frames: this.anims.generateFrameNumbers("cientista", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
        }
    }

    // Checagem de cor no canvas invisível
    colidiuComVerde(xMundo, yMundo) {
        if (!this.collisionCtx) return false;
        let origemX = 600 - (this.collisionImage.width * this.scaleMapa) / 2;
        let origemY = 400 - (this.collisionImage.height * this.scaleMapa) / 2;
        let xLocal = (xMundo - origemX) / this.scaleMapa;
        let yLocal = (yMundo - origemY) / this.scaleMapa;
        if (xLocal < 0 || yLocal < 0 || xLocal >= this.collisionImage.width || yLocal >= this.collisionImage.height) return false;
        let pixel = this.collisionCtx.getImageData(Math.floor(xLocal), Math.floor(yLocal), 1, 1).data;
        return (pixel[1] > 180 && pixel[0] < 80 && pixel[2] < 120);
    }

    update() {
        if (this.lendoMensagem) {
            this.cientista.anims.stop();
            if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
            return;
        }

        // Movimentação + Colisão
        let vel = 3;
        let moveu = false;

        // Antes de mover, checa se a nova posição colidiria em algo "verde" na máscara de colisão
        if (this.cursors.left.isDown && !this.colidiuComVerde(this.cientista.x - vel, this.cientista.y)) { this.cientista.x -= vel; this.cientista.anims.play("cient_left", true); moveu = true; }
        else if (this.cursors.right.isDown && !this.colidiuComVerde(this.cientista.x + vel, this.cientista.y)) { this.cientista.x += vel; this.cientista.anims.play("cient_right", true); moveu = true; }
        if (this.cursors.up.isDown && !this.colidiuComVerde(this.cientista.x, this.cientista.y - vel)) { this.cientista.y -= vel; this.cientista.anims.play("cient_back", true); moveu = true; }
        else if (this.cursors.down.isDown && !this.colidiuComVerde(this.cientista.x, this.cientista.y + vel)) { this.cientista.y += vel; this.cientista.anims.play("cient_front", true); moveu = true; }
        if (!moveu) this.cientista.anims.stop();

        // Lógica de interação
        let distBau = Phaser.Math.Distance.Between(this.cientista.x, this.cientista.y, this.bauanimado.x, this.bauanimado.y);
        let distCentro = Phaser.Math.Distance.Between(this.cientista.x, this.cientista.y, 600, 400); // Coordenada central do mapa

        if (distBau < 60 && !this.temCristal) {
            this.podeInteragir = "bau";
            this.containerTecla.setVisible(true).setPosition(this.bauanimado.x, this.bauanimado.y - 50);
        } 
        else if (distCentro < 80 && this.temCristal && !this.mapaRestaurado) {
            this.podeInteragir = "centro";
            this.containerTecla.setVisible(true).setPosition(600, 350);
        }
        else {
            this.podeInteragir = false;
            this.containerTecla.setVisible(false);
        }

        // Ação
        if (this.podeInteragir && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            if (this.podeInteragir === "bau") {
                this.bauanimado.play("abrindo");
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
        this.cameras.main.flash(1000, 255, 255, 255); // Brilho branco na tela
        this.background.setTexture("cenarioClaro"); // Muda o mapa para a versão restaurada
        this.mostrarMensagem("SISTEMA: Cristal depositado.\n\nO ecossistema foi restaurado com sucesso!");
    }

    mostrarMensagem(texto) {
        this.lendoMensagem = true;
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setText("");
        let letra = 0;
        this.time.addEvent({
            delay: 30,
            callback: () => { this.textoDialogo.text += texto[letra]; letra++; },
            repeat: texto.length - 1
        });
    }

    fecharMensagem() {
        this.lendoMensagem = false;
        this.caixaDialogo.setVisible(false);
        // CORREÇÃO Limpa o texto para não aparecer na próxima vez
        this.textoDialogo.setText("");
    }
}

// Configuração final do Phaser
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false } 
    },
    scene: [Fase1, Fase2] // Lista as cenas na ordem de execução
};

const game = new Phaser.Game(config); //Inicia o jogo