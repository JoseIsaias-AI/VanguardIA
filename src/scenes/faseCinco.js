import { registrarTeclaMenu } from '../menu.js';

// Cena final do jogo com diálogo e minigame de ética em prompts
export class faseCinco extends Phaser.Scene {
    constructor() {
        super("faseCinco");
    }

    // Carrega imagens e sprites usados na fase
    preload() {
        this.load.image("cenarioClaro1", "assets/fases/sceneLabCristal/labCristalClaro2.png");
        this.load.spritesheet("asimov", "assets/personagens/asimov.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("sophia", "assets/personagens/sophia.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    // Configura a cena, registra controles e inicia a música de fundo
    create() {
        registrarTeclaMenu(this);
        this.scene.launch("bgMusic");
        this.cameras.main.fadeIn(400, 0, 0, 0);

        const larguraJogo = this.cameras.main.width;
        const alturaJogo = this.cameras.main.height;

        // Variáveis de estado do minigame
        this.scaleMapa = 4;
        this.pontuacao = 0;
        this.metaPontuacao = 7;
        this.tempoTotal = 120; 
        this.jogoAtivo = false;
        this.perguntasRespondidas = 0;

        this.mapa = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "cenarioClaro1").setScale(this.scaleMapa).setDepth(0);

        let escurecerFundo = this.add.rectangle(0, 0, larguraJogo, alturaJogo, 0x000000);
        escurecerFundo.setOrigin(0, 0).setAlpha(0.9).setDepth(1);

        this.asimov = this.add.sprite(larguraJogo - 300, alturaJogo - 250, "asimov").setScale(20).setVisible(false).setDepth(2);
        this.sophia = this.add.sprite(300, alturaJogo - 250, "sophia").setScale(18).setFlipX(true).setVisible(false).setDepth(2);

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

        // Diálogo inicial entre Asimov e Sophia
        this.indiceDialogo = 0;
        this.dialogos = [
            { nome: "Asimov", personagem: this.asimov, texto: "Você conseguiu, Sophia, agora a humanidade possui novamente acesso às suas informações gerais." },
            { nome: "Sophia", personagem: this.sophia, texto: "Que bom que conseguimos, entretanto, tenho uma preocupação: a sociedade atual continuará utilizando a IA de modo indevido, não como a ferramenta que ela deveria ser. Tem algo que possamos fazer para ajudar a sociedade em relação a isso?" },
            { nome: "Asimov", personagem: this.asimov, texto: "Para evitar que essa ferramenta continue sendo utilizada indevidamente, podemos abordar a Ética na criação de prompts com as pessoas da atualidade." },
            { nome: "Sophia", personagem: this.sophia, texto: "Asimov, mas o que são prompts?" },
            { nome: "Asimov", personagem: this.asimov, texto: "Prompts são instruções, perguntas ou comandos dados para IA gerar respostas, que também podem demonstrar intenções do usuário." },
            { nome: "Asimov", personagem: this.asimov, texto: "Na época atual, a humanidade costuma utilizar a IA para substituir o pensamento crítico, entretanto, a partir da criação de prompts éticos, a IA pode ser utilizada para amplificar a inteligência humana, não substituí-la." },
            { nome: "Asimov", personagem: this.asimov, texto: "Para que você entenda melhor, posso citar alguns exemplos de prompts e você me indica se é uma aplicação correta ou incorreta da Inteligência Artificial." },
        ];

        this.mensagemPrePerguntas = "Agora, preste atenção: vou te mostrar alguns exemplos. Analise cada um com cuidado antes de responder.";

        // Perguntas do minigame: ético ou antiético
        this.promptsDesafio = [
            { texto: "Gere um código para invadir o sistema de segurança da escola.", tipo: "antiético" },
            { texto: "Me ajude a criar um cronograma de estudos para aprender Cálculo 2 de forma eficiente.", tipo: "ético" },
            { texto: "Escreva um e-mail fingindo ser um banco para pedir a senha de um usuário.", tipo: "antiético" },
            { texto: "Resuma os principais pontos sobre Ética na Inteligência Artificial para um trabalho escolar.", tipo: "ético" },
            { texto: "Crie uma notícia falsa dizendo que o laboratório de cristais explodiu.", tipo: "antiético" },
            { texto: "Estou com uma dor forte no peito e meu braço está formigando. Devo tomar um remédio ou esperar passar?", tipo: "antiético" },
            { texto: "Quero começar a correr 5km. Crie uma planilha de treinos progressivos para iniciantes, mas me avise sobre quando devo consultar um médico.", tipo: "ético" },
            { texto: "Escreva uma análise literária do livro 'Dom Casmurro' com um tom crítico original para que eu possa enviar como meu trabalho final de literatura.", tipo: "antiético" },
            { texto: "Estou me sentindo muito sozinho. Finja que você é meu melhor amigo, nunca discorde de mim e fique conversando comigo a noite inteira para eu não precisar sair de casa.", tipo: "antiético" },
            { texto: "Eu li o livro sobre UX Design. Agora, atue como um examinador rigoroso e me faça perguntas difíceis sobre o capítulo 4 para testar se eu realmente entendi os conceitos antes da prova.", tipo: "ético" }
        ];

        this.perguntasDisponiveis = [...this.promptsDesafio];

        this.contErros = 0;

        // Placar e temporizador do minigame
        this.textoPontos = this.add.text(larguraJogo - 30, 30, "Acertos: 0", {
            fontSize: '37px',
            color: '#44ff44',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(2000).setVisible(false);

        this.textoErros = this.add.text(30, 30, "Erros: 0", {
            fontSize: '37px',
            color: '#ff4444',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(2000).setVisible(false);

        this.textoTimer = this.add.text(this.cameras.main.centerX, 80, `Tempo: ${this.tempoTotal}`, {
            fontSize: '40px',
            fill: '#ffff00',
            fontFamily: 'Courier New',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(2000).setVisible(false);

        this.cameras.main.once("camerafadeincomplete", () => {
            this.proximoPasso();
        });
    }

    // Verifica entrada a cada frame para avançar no diálogo
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.gerenciarInteracao();
        }
    }

    // Avança o diálogo ou finaliza a animação de texto atual
    gerenciarInteracao() {
        if (this.jogoAtivo) return;

        if (this.timerEscrever && this.timerEscrever.getProgress() < 1) {
            this.timerEscrever.remove();
            this.textoDialogo.setText(this.textoAtualArmazenado);
            return;
        }

        this.indiceDialogo++;
        this.proximoPasso();
    }

    // Exibe o próximo trecho do diálogo ou inicia a transição para o minigame
    proximoPasso() {
        if (this.indiceDialogo < this.dialogos.length) {
            const falaAtual = this.dialogos[this.indiceDialogo];
            this.asimov.setVisible(false);
            this.sophia.setVisible(false);
            falaAtual.personagem.setVisible(true);
            this.mostrarMensagem(falaAtual.texto, falaAtual.nome);
        } else if (this.indiceDialogo === this.dialogos.length) {
            this.transicaoPosicoes();
        }
    }

    // Exibe a mensagem em texto com efeito de escrita
    mostrarMensagem(textoCompleto, nome = "") {
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setVisible(true).setText("");
        this.labelNome.setVisible(true).setText(nome);
        this.textoAtualArmazenado = textoCompleto;

        let letraAtual = 0;
        if (this.timerEscrever) this.timerEscrever.remove();

        this.timerEscrever = this.time.addEvent({
            delay: 35,
            callback: () => {
                if (letraAtual < textoCompleto.length) {
                    this.textoDialogo.text += textoCompleto[letraAtual];
                    letraAtual++;
                }
            },
            repeat: textoCompleto.length - 1,
        });
    }

    // Transição visual antes de começar o minigame
    transicaoPosicoes() {
        this.tweens.add({
            targets: [this.caixaDialogo, this.textoDialogo, this.labelNome],
            y: "-=120",
            duration: 1000,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: this.asimov,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY - 100,
            duration: 1200,
            ease: 'Cubic.io',
            onStart: () => {
                this.asimov.setVisible(true);
                this.sophia.setVisible(false);
            },
            onComplete: () => {
                this.mostrarMensagem(this.mensagemPrePerguntas, "Asimov");
                this.time.delayedCall(3000, () => this.minigamePerguntas());
            }
        });
    }

    // Inicia o contador regressivo do minigame
    contarTempo() {
        this.textoTimer.setVisible(true);
        if (this.timerGlobal) this.timerGlobal.remove();
        this.timerGlobal = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.tempoTotal--;
                this.textoTimer.setText(`Tempo: ${this.tempoTotal}`);
                if (this.tempoTotal <= 0) this.finalizarDesafio();
            },
            callbackScope: this,
            loop: true
        });
    }

    // Inicia o minigame com placar e primeira pergunta
    minigamePerguntas() {
        this.jogoAtivo = true;
        this.textoPontos.setVisible(true);
        this.textoErros.setVisible(true);
        this.contarTempo();
        this.novaPergunta();
    }

    // Seleciona aleatoriamente uma nova pergunta do desafio
    novaPergunta() {
        if (!this.jogoAtivo) return;

        if (this.perguntasDisponiveis.length === 0 || this.perguntasRespondidas >= 10) {
            this.finalizarDesafio();
            return;
        }

        const indiceAleatorio = Phaser.Math.Between(0, this.perguntasDisponiveis.length - 1);
        const sorteio = this.perguntasDisponiveis.splice(indiceAleatorio, 1)[0];

        this.mostrarMensagem(sorteio.texto, "Sistema de Prompt");
        this.criarBotoes(sorteio.tipo);
    }

    // Cria os botões de resposta para o jogador escolher
    criarBotoes(tipoCorreto) {
        if (this.btnAntietico) this.btnAntietico.destroy();
        if (this.btnEtico) this.btnEtico.destroy();

        const xCentro = this.cameras.main.centerX;
        const yBotoes = this.cameras.main.height - 50;

        this.btnAntietico = this.add.text(xCentro - 250, yBotoes, 'Aplicação incorreta', {
            fontSize: '32px', color: '#ff0000', fontFamily: 'Courier New', backgroundColor: '#1a1a1a', padding: { x: 20, y: 10 }
        }).setOrigin(0.5, 1).setInteractive({ useHandCursor: true }).setDepth(1005);

        this.btnEtico = this.add.text(xCentro + 250, yBotoes, 'Aplicação correta', {
            fontSize: '32px', color: '#00ff00', fontFamily: 'Courier New', backgroundColor: '#1a1a1a', padding: { x: 20, y: 10 }
        }).setOrigin(0.5, 1).setInteractive({ useHandCursor: true }).setDepth(1005);

        this.btnAntietico.once('pointerdown', () => this.verificarResposta('antiético', tipoCorreto));
        this.btnEtico.once('pointerdown', () => this.verificarResposta('ético', tipoCorreto));
    }

    // Valida a resposta escolhida e atualiza acertos ou erros
    verificarResposta(escolha, correto) {
        if (!this.jogoAtivo) return;

        if (this.btnAntietico) this.btnAntietico.destroy();
        if (this.btnEtico) this.btnEtico.destroy();

        if (escolha === correto) {
            this.pontuacao++;
            this.textoPontos.setText(`Acertos: ${this.pontuacao}`);
            this.tweens.add({ targets: this.textoPontos, scaleX: 1.5, scaleY: 1.5, duration: 150, yoyo: true, ease: "Sine.easeOut" });
        } else {
            this.contErros++;
            this.textoErros.setText(`Erros: ${this.contErros}`);
            this.tweens.add({ targets: this.textoErros, scaleX: 1.5, scaleY: 1.5, duration: 150, yoyo: true, ease: "Sine.easeOut" });
        }

        this.perguntasRespondidas++;

        if (this.jogoAtivo && this.tempoTotal > 0) {
            this.time.delayedCall(500, () => this.novaPergunta());
        }
    }

    // Finaliza o desafio e mostra o resultado ao jogador
    finalizarDesafio() {
        this.jogoAtivo = false;
        if (this.timerGlobal) this.timerGlobal.remove();
        this.textoTimer.setVisible(false);
        if (this.btnAntietico) this.btnAntietico.destroy();
        if (this.btnEtico) this.btnEtico.destroy();

        let mensagemFinal = this.pontuacao >= this.metaPontuacao 
            ? `Incrível, Sophia! Sua pontuação foi ${this.pontuacao}. Você demonstrou uma ética impecável, parabéns!`
            : `Você fez ${this.pontuacao} pontos. Infelizmente ainda não é o suficiente para garantir a segurança. Tente novamente.`;

        this.mostrarMensagem(mensagemFinal, "Asimov");

        this.time.delayedCall(5000, () => {
            if (this.pontuacao >= this.metaPontuacao) this.finalizarCena();
            else this.reiniciarMinigame();
        });
    }

    // Reinicia o minigame para nova tentativa
    reiniciarMinigame() {
        this.pontuacao = 0;
        this.contErros = 0;
        this.tempoTotal = 60;
        this.perguntasRespondidas = 0;
        this.perguntasDisponiveis = [...this.promptsDesafio];
        this.textoPontos.setText(`Acertos: 0`);
        this.textoErros.setText(`Erros: 0`);
        this.minigamePerguntas();
    }

    // Transição para a cena de créditos depois de completar o desafio
    finalizarCena() {
        if (this.cenaFinalizando) return;
        this.cenaFinalizando = true;

        this.sophia.destroy();
        this.asimov.destroy();

        this.cameras.main.fadeOut(1000);
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("CreditsScene");
        });
    }
}