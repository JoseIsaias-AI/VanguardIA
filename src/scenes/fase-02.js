// FASE 2 - A RESTAURAÇÃO

export class Fase02 extends Phaser.Scene {
    constructor() {
        super("Fase02");
    }

    preload() {
        // Carregando cenários (Noite e Restaurado)
        this.load.image('cenarioNoite', '../assets/Fases/cenarioEscuro.jpeg');
        this.load.image('cenarioClaro', '../assets/Fases/cenarioClaro.png');
        
        this.load.image('colisao', '../assets/mascara.png'); // Deixa a imagem do mapa de colisão visivelocidPlayer
        this.load.spritesheet('bauAnimado', '../assets/bau.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cientistaLider', '../assets/Personagens/cientLider.png', { frameWidth: 64, frameHeight: 64 });
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
            this.collisionCanvas = document.createElement('canvas'); // Cria um canvas invisívelocidPlayer em memória
            this.collisionCanvas.width = this.collisionImage.width;
            this.collisionCanvas.height = this.collisionImage.height;
            this.collisionCtx = this.collisionCanvas.getContext('2d');
            this.collisionCtx.drawImage(this.collisionImage, 0, 0);
        } catch (e) {
            console.warn("Aviso: Rodar em servidor local para colisão funcionar corretamente.", e);
        }

        // Baú
        this.bauAnimado = this.add.sprite(525, 200, "bauAnimado").setScale(2.3);
        // Garantindo que as anims existam caso Fase 1 não tenha carregado antes
        if (!this.anims.exists('fechado')) {
            this.anims.create({ key: "fechado", frames: [{ key: "bauAnimado", frame: 0 }], frameRate: 1 });
            this.anims.create({ key: "abrindo", frames: this.anims.generateFrameNumbers("bauAnimado", { start: 0, end: 1 }), frameRate: 2, repeat: 0 });
        }
        this.bauAnimado.play("fechado");

        this.cientistaLider = this.add.sprite(400, 300, 'cientistaLider').setScale(2);

        // Recriação da HUD (Tecla E e Diálogos) para a nova cena
        this.containerTecla = this.add.container(0, 0).setVisible(false);
        let iconTecla = this.add.graphics().fillStyle(0xFFFFFF, 1).lineStyle(2, 0x000000).fillRoundedRect(-15, -15, 30, 30, 5).strokeRoundedRect(-15, -15, 30, 30, 5);
        let letra = this.add.text(0, 0, "E", { fontSize: "25px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
        this.containerTecla.add([iconTecla, letra]);

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

        this.cameras.main.startFollow(this.cientistaLider).setZoom(1.2);

        if (!this.anims.exists('cient_left')) {
            this.anims.create({ key: "cient_left", frames: this.anims.generateFrameNumbers("cientistaLider", { start: 22, end: 27 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_right", frames: this.anims.generateFrameNumbers("cientistaLider", { start: 16, end: 21 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_front", frames: this.anims.generateFrameNumbers("cientistaLider", { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: "cient_back", frames: this.anims.generateFrameNumbers("cientistaLider", { start: 8, end: 15 }), frameRate: 10, repeat: -1 });
        }
    }

    // Checagem de cor no canvas invisívelocidPlayer
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
            this.cientistaLider.anims.stop();
            if (Phaser.Input.Keyboard.JustDown(this.teclaE)) this.fecharMensagem();
            return;
        }

        // Movimentação + Colisão
        let velocidPlayer = 3;
        let moviment = false;

        // Antes de mover, checa se a nova posição colidiria em algo "verde" na máscara de colisão
        if (this.cursors.left.isDown && !this.colidiuComVerde(this.cientistaLider.x - velocidPlayer, this.cientistaLider.y)) { this.cientistaLider.x -= velocidPlayer; this.cientistaLider.anims.play("cient_left", true); moviment = true; }
        else if (this.cursors.right.isDown && !this.colidiuComVerde(this.cientistaLider.x + velocidPlayer, this.cientistaLider.y)) { this.cientistaLider.x += velocidPlayer; this.cientistaLider.anims.play("cient_right", true); moviment = true; }
        if (this.cursors.up.isDown && !this.colidiuComVerde(this.cientistaLider.x, this.cientistaLider.y - velocidPlayer)) { this.cientistaLider.y -= velocidPlayer; this.cientistaLider.anims.play("cient_back", true); moviment = true; }
        else if (this.cursors.down.isDown && !this.colidiuComVerde(this.cientistaLider.x, this.cientistaLider.y + velocidPlayer)) { this.cientistaLider.y += velocidPlayer; this.cientistaLider.anims.play("cient_front", true); moviment = true; }
        if (!moviment) this.cientistaLider.anims.stop();

        // Lógica de interação
        let distBau = Phaser.Math.Distance.Between(this.cientistaLider.x, this.cientistaLider.y, this.bauAnimado.x, this.bauAnimado.y);
        let distCentro = Phaser.Math.Distance.Between(this.cientistaLider.x, this.cientistaLider.y, 600, 400); // Coordenada central do mapa

        if (distBau < 60 && !this.temCristal) {
            this.podeInteragir = "bau";
            this.containerTecla.setVisible(true).setPosition(this.bauAnimado.x, this.bauAnimado.y - 50);
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
