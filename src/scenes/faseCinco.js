import { registrarTeclaMenu } from '../menu.js';
import caixasDialogo from './caixasDialogo.js'; // Importação do sistema de diálogos

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

        // Instancia o sistema de diálogos universal
        this.sistemaDialogo = new caixasDialogo(this);
        this.lendoMensagem = false;

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

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

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
            fontSize: '37px', color: '#44ff44', fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(2000).setVisible(false);

        this.textoErros = this.add.text(30, 30, "Erros: 0", {
            fontSize: '37px', color: '#ff4444', fontFamily: 'Courier New', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(2000).setVisible(false);

        this.textoTimer = this.add.text(this.cameras.main.centerX, 80, `Tempo: ${this.tempoTotal}`, {
            fontSize: '40px', fill: '#ffff00', fontFamily: 'Courier New', stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5).setDepth(2000).setVisible(false);

        // Quando a tela terminar de clarear, começa a cena
        this.cameras.main.once("camerafadeincomplete", () => {
            this.iniciarCutsceneInicial();
        });
    }

    // Verifica entrada a cada frame para avançar no diálogo inicial
    update() {
        if (this.lendoMensagem && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            // Só permite pular com o "E" se não for a fase de jogo ativo
            if (!this.jogoAtivo) {
                this.sistemaDialogo.interagir();
            }
        }
    }

    // Inicia a conversa e mostra os personagens
    iniciarCutsceneInicial() {
        this.asimov.setVisible(true);
        this.sophia.setVisible(true);

        const dialogosIniciais = [
            { nome: "Asimov", personagem: this.asimov, texto: "Você conseguiu, Sophia, agora a humanidade possui novamente acesso às suas informações gerais." },
            { nome: "Sophia", personagem: this.sophia, texto: "Que bom que conseguimos, mas, tenho uma preocupação: a sociedade atual continuará utilizando a IA de modo indevido, não como a ferramenta que ela deveria ser. Tem algo que possamos fazer para ajudar a sociedade em relação a isso?" },
            { nome: "Asimov", personagem: this.asimov, texto: "Para evitar que essa ferramenta continue sendo utilizada indevidamente, podemos abordar a ética na criação de prompts com as pessoas da atualidade." },
            { nome: "Sophia", personagem: this.sophia, texto: "Asimov, mas o que são prompts?" },
            { nome: "Asimov", personagem: this.asimov, texto: "Prompts são instruções, perguntas ou comandos dados para IA gerar respostas, que também podem demonstrar intenções do usuário." },
            { nome: "Asimov", personagem: this.asimov, texto: "Na época atual, a humanidade costuma utilizar a IA para substituir o pensamento crítico, entretanto, a partir da criação de prompts éticos, a IA pode ser utilizada para amplificar a inteligência humana, não substituí-la." },
            { nome: "Asimov", personagem: this.asimov, texto: "Para que você entenda melhor, posso citar alguns exemplos de prompts e você me indica se é uma aplicação correta ou incorreta da Inteligência Artificial." },
        ];

        this.lendoMensagem = true;
        this.sistemaDialogo.iniciarDialogo(dialogosIniciais, () => {
            this.transicaoPosicoes();
        });
    }

    // Transição visual antes de começar o minigame
    transicaoPosicoes() {
        // Move asimov para o centro
        this.tweens.add({
            targets: this.asimov,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY - 100,
            duration: 1200,
            ease: 'Cubic.io',
            onStart: () => {
                this.sophia.setVisible(false); // Esconde a Sophia
            },
            onComplete: () => {
                // Mostra o aviso e começa o jogo
                const aviso = [{ nome: "Asimov", personagem: this.asimov, texto: this.mensagemPrePerguntas }];
                
                this.sistemaDialogo.iniciarDialogo(aviso, () => {
                    this.lendoMensagem = false; // Desativa a tecla E temporariamente
                    this.time.delayedCall(1000, () => this.minigamePerguntas());
                });
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

        const perguntaDesafio = [{ nome: "Sistema de Prompt", personagem: null, texto: sorteio.texto }];
        
        // Aqui nós não passamos callback para o iniciarDialogo. 
        // O diálogo vai mostrar o texto e ficar aguardando o jogador clicar nos botões que criaremos abaixo.
        this.lendoMensagem = true; 
        this.sistemaDialogo.iniciarDialogo(perguntaDesafio); 

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

        // Esconde a caixa de diálogo após o clique
        this.sistemaDialogo.encerrarDialogo();
        this.lendoMensagem = false;

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
        this.jogoAtivo = false; // Desativa o jogo e permite que o "E" funcione no encerramento
        
        if (this.timerGlobal) this.timerGlobal.remove();
        this.textoTimer.setVisible(false);
        if (this.btnAntietico) this.btnAntietico.destroy();
        if (this.btnEtico) this.btnEtico.destroy();

        let mensagemFinal = this.pontuacao >= this.metaPontuacao 
            ? `Incrível, Sophia! Sua pontuação foi ${this.pontuacao}. Você demonstrou uma ética impecável, parabéns!`
            : `Você fez ${this.pontuacao} pontos. Infelizmente ainda não é o suficiente para garantir a segurança. Tente novamente.`;

        const falaResultado = [{ nome: "Asimov", personagem: this.asimov, texto: mensagemFinal }];

        this.lendoMensagem = true;
        this.sistemaDialogo.iniciarDialogo(falaResultado, () => {
            this.lendoMensagem = false;
            
            // O que acontece depois do resultado?
            if (this.pontuacao >= this.metaPontuacao) {
                this.finalizarCena();
            } else {
                this.reiniciarMinigame();
            }
        });
    }

    // Reinicia o minigame para nova tentativa
    reiniciarMinigame() {
        this.pontuacao = 0;
        this.contErros = 0;
        this.tempoTotal = 60; // Tempo menor para a segunda tentativa, baseado no seu original
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
