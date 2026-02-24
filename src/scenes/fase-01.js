// FASE 1 - O INÍCIO
export class Fase01 extends Phaser.Scene {

    // Define o nome dessa cena para o Phaser
    constructor() {
        super("Fase01");
    }

    preload() {
        // Carregando assets visuais estáticas do laboratório
        this.load.image('Lab1', '../assets/laboratórioBranco.png');
        this.load.image("Perifericos", '../assets/periféricosLaboratórioBranco.png');
        this.load.image('CFuturo', '../assets/Fases/laboratórioBranco.png');
        this.load.image('camara', '../assets/camara.png');

        // Carregando spritesheets
        this.load.spritesheet('Principal', '../assets/Personagens/cientPrincipal.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bauanimado', '../assets/bau.png', { frameWidth: 32, frameHeight: 32 });
    
    }

    create() {
        // Variáveis de estado
        this.lendoMensagem = false; // Bloqueia movimento se o jogador estiver lendo
        this.podeInteragir = false; // Indica se o jogador está próximo de um item interativo
        this.scaleMapa = 2.5;
        
        // Controle da narrativa: 0 = Falar com a Máquina, 1 = Abrir o Baú
        this.progressoHistoria = 0; 

        // Posicionamento do cenário
        this.mapa = this.add.image(600, 400, "Lab1").setScale(this.scaleMapa);
        this.mapa.setDepth(-10); // Garante que o chão fique atrás de tudo

        this.perifericos = this.add.image(600, 400, "Perifericos").setScale(this.scaleMapa);
        

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
        let iconeTecla = this.add.graphics();
        iconeTecla.fillStyle(0xFFFFFF, 1);
        iconeTecla.lineStyle(2, 0x000000, 1);
        iconeTecla.fillRoundedRect(-15, -15, 30, 30, 5);
        iconeTecla.strokeRoundedRect(-15, -15, 30, 30, 5);
        let letra = this.add.text(0, 0, "E", { fontSize: "25px", color: "#000000", fontStyle: "bold" }).setOrigin(0.5);
        this.containerTecla.add([iconeTecla, letra]);   // Adiciona desenho e texto ao container
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
        // Bloqueio do movimento. Se estiver lendo, o player não anda
        if (this.lendoMensagem) {
            this.Principal.anims.stop();
            if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
                this.fecharMensagem();
            }
            return;
        }

        // Lógica de movimento nos eixos X e Y
        let velocidPlayer = 3;
        let movimentacao = false;

        if (this.cursors.left.isDown) {
            this.Principal.x -= velocidPlayer;
            this.Principal.anims.play("left", true);
            movimentacao = true;
        } else if (this.cursors.right.isDown) {
            this.Principal.x += velocidPlayer;
            this.Principal.anims.play("right", true);
            movimentacao = true;
        }

        if (this.cursors.up.isDown) {
            this.Principal.y -= velocidPlayer;
            if (!movimentacao) this.Principal.anims.play("back", true);
            movimentacao = true;
        } else if (this.cursors.down.isDown) {
            this.Principal.y += velocidPlayer;
            if (!movimentacao) this.Principal.anims.play("front", true);
            movimentacao = true;
        }

        if (!movimentacao) this.Principal.anims.stop(); // Para a animação se o player soltar as teclas

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
                this.scene.start("Fase02");
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