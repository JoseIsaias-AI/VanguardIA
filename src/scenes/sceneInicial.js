export class sceneInicial extends Phaser.Scene {
    constructor() {
        super("sceneInicial");
    }

    preload() {
        this.load.image("labBranco", "assets/Fases/sceneLBPassado/labBranco.png");
        this.load.image("objetosLab", "assets/Objetos/sceneLBPassado/partOne/objetosLabBNorm.png");
        this.load.spritesheet("watson", "assets/personagens/watson.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);

        const larguraJogo = this.cameras.main.width;
        const alturaJogo = this.cameras.main.height;

        this.scaleMapa = 4;

        this.mapa = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "labBranco").setScale(this.scaleMapa).setDepth(-1);
        this.objetos = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "objetosLab").setScale(this.scaleMapa).setDepth(-1);

        let escurecerFundo = this.add.rectangle(0, 0, larguraJogo, alturaJogo, 0x000000);
        escurecerFundo.setOrigin(0, 0).setAlpha(0.9).setDepth(-1);

        // Personagens posicionados e inicialmente invisíveis
        this.watson = this.add.sprite(larguraJogo - 300, alturaJogo - 250, "watson").setScale(20).setVisible(false);
        this.sophia = this.add.sprite(300, alturaJogo - 250, "sophia").setScale(18).setFlipX(true).setVisible(false);

        // Caixa de Diálogo
        const larguraCaixa = 1300;
        const alturaCaixa = 175; 
        const xCaixa = (larguraJogo - larguraCaixa) / 2;
        const yCaixa = alturaJogo - alturaCaixa - 50;

        this.caixaDialogo = this.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.setDepth(1000).setVisible(false);

        this.textoDialogo = this.add.text(xCaixa + 40, yCaixa + 35, "", {
            fontSize: "28px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#ccffff",
            wordWrap: { width: larguraCaixa - 80 },
            lineSpacing: 8,
        }).setDepth(1001).setVisible(false);

        this.labelNome = this.add.text(xCaixa + 16, yCaixa - 28, "", {
            fontSize: "22px",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#00ffff",
            fontStyle: "bold",
            backgroundColor: "#1a1a1a",
            padding: { left: 8, right: 8, top: 3, bottom: 3 },
        }).setDepth(1002).setVisible(false);

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // diálogos
        this.indiceDialogo = 0;
        this.dialogos = [
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Sophia, os resultados finais das simulações foram liberados para toda equipe." 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Minha preocupação em relação ao uso da tecnologia no futuro apenas aumenta e os testes expuseram a probabilidade crescente de grande uso indevido de tecnologias atuais e emergentes." 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Temo que no futuro os humanos possam ficar dependentes de algo maior ou até pior que isso…" 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Assim, preciso lhe pedir algo, eu e uma equipe montamos um projeto para que, caso haja uma crise tecnológica no futuro, teremos alguém preparado para consertar o problema." 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Deixaremos alguém congelado em uma câmara e, quando e se for necessário, essa pessoa será liberada para ajudar no que for necessário." 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Nós pensamos que para esse projeto ninguém seria melhor do que você, mas claro, apenas se você aceitar nossa proposta…" 
            },
            { 
                nome: "Sophia", 
                personagem: this.sophia,
                texto: "Não sabemos o que pode acontecer no futuro… Mas estarei preparada e aceito fazer parte dessa missão." 
            },
            { 
                nome: "Watson", 
                personagem: this.watson,
                texto: "Ótimo, então vamos nos reunir com o resto da equipe, ainda temos muitas coisas para planejar." 
            }
        ];

        this.cameras.main.once("camerafadeincomplete", () => {
            this.proximoPasso();
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.gerenciarInteracao();
        }
    }

    proximoPasso() {
        if (this.indiceDialogo < this.dialogos.length) {
            const falaAtual = this.dialogos[this.indiceDialogo];
            
            // Lógica de sumir um e aparecer outro
            this.watson.setVisible(false);
            this.sophia.setVisible(false);
            falaAtual.personagem.setVisible(true);

            this.mostrarMensagem(falaAtual.texto, falaAtual.nome);
        } else {
            this.finalizarCena();
        }
    }

    mostrarMensagem(textoCompleto, nome = "") {
        this.lendoMensagem = true;
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setVisible(true).setText("");
        this.labelNome.setVisible(true).setText(nome);
        this.textoAtualArmazenado = textoCompleto;

        let letraAtual = 0;
        if (this.timerEscrever) this.timerEscrever.remove();

        this.timerEscrever = this.time.addEvent({
            delay: 35,
            callback: () => {
                this.textoDialogo.text += textoCompleto[letraAtual];
                letraAtual++;
            },
            repeat: textoCompleto.length - 1,
        });
    }

    gerenciarInteracao() {
        // Se ainda estiver "digitando" o texto, completa ele instantaneamente
        if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
            this.timerEscrever.remove();
            this.textoDialogo.setText(this.textoAtualArmazenado);
            return;
        }

        // Se o texto já acabou, pula para o próximo diálogo do array
        this.indiceDialogo++;
        this.proximoPasso();
    }

    finalizarCena() {
        this.lendoMensagem = false;
        this.caixaDialogo.setVisible(false);
        this.textoDialogo.setVisible(false);
        this.labelNome.setVisible(false);

        this.cameras.main.fadeOut(1000);
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("sceneLBPassado");
        });
    }
} 