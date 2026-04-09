import { hudTeclaE } from "./hudTeclaE.js";

// Classe para gerenciar caixas de diálogo no jogo, permitindo exibir falas de personagens, nomes, e 
// controlar a velocidade da digitação do texto, além de destacar o personagem que está falando e tocar sons de digitação.

export default class caixaDialogo {
    // O construtor recebe a cena onde a caixa de diálogo será exibida e um objeto de configuração opcional para 
    // personalizar a aparência e comportamento da caixa de diálogo.
    constructor(scene, config = {}) {
        this.scene = scene;

        const larguraJogo = scene.scale.width;
        const alturaJogo = scene.scale.height;

        // Configurações padrão para a caixa de diálogo, que podem ser sobrescritas pelo objeto de configuração passado como parâmetro
        const larguraCaixa = config.larguraCaixa ?? 1300; //largura
        const alturaCaixa = config.alturaCaixa ?? 220; // altura
        const xCaixa = config.xCaixa ?? (larguraJogo - larguraCaixa) / 2; // posição horizontal centralizada
        const yCaixa = config.yCaixa ?? (alturaJogo - alturaCaixa - 50); // posição vertical próxima à parte inferior da tela
        const profundidadeBase = config.profundidadeBase ?? 1000; // profundidade para garantir que a caixa de diálogo fique acima de outros elementos do jogo
        const scrollFactor = config.scrollFactor ?? 0; // fator de rolagem para controlar o comportamento de rolagem da caixa de diálogo

        // Configurações de estilo para o texto da caixa de diálogo, que podem ser personalizadas através do objeto de configuração
        this.fonte = config.fonte ?? "'Courier New', Courier, monospace";
        this.corTexto = config.corTexto ?? "#ccffff";
        this.corNome = config.corNome ?? "#00ffff";
        this.delayDigitacao = config.delayDigitacao ?? 30;
        this.larguraTexto = config.larguraTexto ?? (larguraCaixa - 80);
        this.alturaTexto = config.alturaTexto ?? (alturaCaixa - 60);
        this.tamanhosFonte = config.tamanhosFonte ?? [32, 30, 28, 26, 24, 22, 20];

        // Criação dos elementos gráficos para a caixa de diálogo, incluindo o fundo da caixa, o texto do diálogo, o nome do personagem e o indicador da tecla "E" para avançar o diálogo
        this.caixaDialogo = scene.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15); // fundo da caixa de diálogo com bordas arredondadas
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15); // borda da caixa de diálogo
        this.caixaDialogo.setScrollFactor(scrollFactor).setDepth(profundidadeBase).setVisible(false);

        // Criação do texto para exibir o diálogo e o nome do personagem, com estilos personalizados e posicionamento dentro da caixa de diálogo
        this.textoDialogo = scene.add.text(xCaixa + 40, yCaixa + 30, "", {
            fontSize: "32px",
            fontFamily: this.fonte,
            color: this.corTexto,
            wordWrap: { width: this.larguraTexto },
            lineSpacing: 10,
        }).setScrollFactor(scrollFactor).setDepth(profundidadeBase + 1).setVisible(false);

        // Criação do texto para exibir o nome do personagem, com estilo personalizado e posicionamento acima da caixa de diálogo
        this.labelNome = scene.add.text(xCaixa + 16, yCaixa - 28, "", {
            fontSize: "32px",
            fontFamily: this.fonte,
            color: this.corNome,
            fontStyle: "bold",
            backgroundColor: "#1a1a1a",
            padding: { left: 8, right: 8, top: 3, bottom: 3 },
        }).setScrollFactor(scrollFactor).setDepth(profundidadeBase + 2).setVisible(false);

        // Criação do indicador da tecla "E" para avançar o diálogo, posicionado no canto inferior direito da caixa de diálogo
        this.indicadorTeclaE = new hudTeclaE(scene, {
            x: xCaixa + larguraCaixa - 70,
            y: yCaixa + alturaCaixa - 32,
            depth: profundidadeBase + 3,
            scrollFactor,
        });

        // Inicialização de variáveis para controlar tudo que envolve as caixas de textos
        this.somDigitando = null;
        this.audioPendente = false;
        this._digitandoLoadStarted = false;
        this._inicializarAudio();
        this.falas = [];
        this.indiceDialogo = 0;
        this.textoAtualArmazenado = "";
        this.timerEscrever = null;
        this.estaEscrevendo = false;
        this.callbackFimDialogo = null;

        this.interagir = this.interagir.bind(this);
    }

    // Função para ajustar o tamanho da fonte do texto do diálogo para garantir que ele caiba dentro da caixa de diálogo, testando diferentes tamanhos de fonte até encontrar um que funcione
    ajustarTextoDialogo(textoCompleto) {
        for (const tamanho of this.tamanhosFonte) {
            const lineSpacing = tamanho >= 32 ? 10 : tamanho >= 30 ? 8 : tamanho >= 26 ? 6 : 4;

            this.textoDialogo.setStyle({
                fontSize: `${tamanho}px`,
                fontFamily: this.fonte,
                color: this.corTexto,
                wordWrap: { width: this.larguraTexto },
                lineSpacing,
            });

            this.textoDialogo.setText(textoCompleto); // Define o texto para calcular a altura real do texto renderizado
            if (this.textoDialogo.height <= this.alturaTexto) {
                this.textoDialogo.setText("");
                return;
            }
        }

        // Se nenhum tamanho de fonte couber, use o menor tamanho e ajuste o espaçamento entre linhas para tentar maximizar o espaço disponível
        this.textoDialogo.setStyle({
            fontSize: "20px",
            fontFamily: this.fonte,
            color: this.corTexto,
            wordWrap: { width: this.larguraTexto },
            lineSpacing: 4,
        });
        this.textoDialogo.setText("");
    }

    // Função para iniciar um diálogo, recebendo uma lista de falas (cada fala pode conter texto, nome do personagem e 
    // referência ao personagem) e um callback opcional para ser chamado quando o diálogo terminar
    iniciarDialogo(listaDeFalas, callbackFim) {
        this.falas = listaDeFalas;
        this.indiceDialogo = 0;
        this.callbackFimDialogo = callbackFim ?? null;
        this.mostrarProximaFala();
    }

    // Função para mostrar uma mensagem única, sem a estrutura de múltiplas falas, permitindo exibir um texto completo com um nome opcional
    mostrarMensagem(textoCompleto, nome = "") {
        this.falas = [];
        this.indiceDialogo = 0;
        this.callbackFimDialogo = null;
        this.mostrarConteudo(textoCompleto, nome);
    }

    // Função para mostrar a próxima fala do diálogo, verificando se ainda há falas disponíveis e exibindo o conteúdo da fala atual
    mostrarProximaFala() {
        const falaAtual = this.falas[this.indiceDialogo];
        if (!falaAtual) {
            this.encerrarDialogo();
            return;
        }

        this.mostrarConteudo( 
            falaAtual.texto ?? "",
            falaAtual.nome ?? "",
            falaAtual.personagem ?? null
        );
    }

    // Função para exibir o conteúdo de uma fala, configurando a caixa de diálogo, o texto, o nome do personagem e 
    // destacando o personagem que está falando, além de iniciar a animação de digitação do texto
    mostrarConteudo(textoCompleto, nome = "", personagemFalando = null) {
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setVisible(true).setText("");
        this.indicadorTeclaE.mostrar();

        if (nome && nome.trim() !== "") { // Verifica se o nome é válido antes de exibi-lo
            this.labelNome.setText(nome);
            this.labelNome.setVisible(true);
        } else {
            this.labelNome.setVisible(false).setText("");
        }

        this.ajustarTextoDialogo(textoCompleto); // Ajusta o tamanho da fonte do texto para garantir que ele caiba dentro da caixa de diálogo
        this.textoAtualArmazenado = textoCompleto;
        this.estaEscrevendo = true;

        if (this.falas.length > 0) {
            this.destacarPersonagemFalando(personagemFalando);
        }

        if (this.timerEscrever) {
            this.timerEscrever.remove();
            this.timerEscrever = null;
        }

        if (!textoCompleto || textoCompleto.length === 0) { // Se o texto estiver vazio, exibe a caixa de diálogo sem animação de digitação
            this.estaEscrevendo = false;
            return;
        }

        this._iniciarSonsDigitacao(); // Inicia a reprodução do som de digitação quando a animação de digitação começar
        
        // Variável para controlar o índice da letra atual sendo exibida, e criação de um timer para simular a digitação do texto, exibindo uma letra de cada vez com um atraso configurável
        let letraAtual = 0;
        this.timerEscrever = this.scene.time.addEvent({
            delay: this.delayDigitacao,
            callback: () => {
                this.textoDialogo.text += textoCompleto[letraAtual];
                letraAtual++;

                if (letraAtual >= textoCompleto.length) {
                    this.estaEscrevendo = false;
                    this.timerEscrever = null;
                    this._pararSonsDigitacao();
                }
            },
            repeat: textoCompleto.length - 1,
        });
    }

    // Função para destacar o personagem que está falando, escurecendo os outros personagens para dar ênfase ao personagem atual
    destacarPersonagemFalando(personagemFalando) {
        const todosPersonagens = new Set();
        this.falas.forEach((fala) => {
            if (fala.personagem) {
                todosPersonagens.add(fala.personagem);
            }
        });

        todosPersonagens.forEach((personagem) => personagem.setTint(0x888888));

        if (personagemFalando) {
            personagemFalando.clearTint();
        }
    }

    // Funções para gerenciar os sons de digitação
    _inicializarAudio() {
        if (this.scene.cache.audio.exists("digitando")) {
            this._criarSomDigitando();
            return;
        }

        if (this._digitandoLoadStarted) {
            return;
        }

        // Inicia o carregamento do som de digitação, garantindo que ele seja carregado apenas uma vez, e configurando 
        this._digitandoLoadStarted = true;
        this.scene.load.audio("digitando", "public/assets/efeitosSonoros/digitando.mp3");
        this.scene.load.once("complete", () => {
            this._criarSomDigitando();
            if (this.audioPendente) {
                this.audioPendente = false;
                this._iniciarSonsDigitacao();
            }
        });
        this.scene.load.start();
    }

    // Função para criar o objeto de som para o efeito de digitação, configurando-o para tocar em loop e com um volume reduzido
    _criarSomDigitando() {
        if (!this.somDigitando && this.scene.cache.audio.exists("digitando")) {
            this.somDigitando = this.scene.sound.add("digitando", { loop: true, volume: 0.5 });
        }
    }

    // Função para iniciar a reprodução do som de digitação, verificando se o som já está carregado e pronto para tocar
    _iniciarSonsDigitacao() {
        if (this.somDigitando && !this.somDigitando.isPlaying) {
            this.somDigitando.play();
        } else if (!this.somDigitando) {
            this.audioPendente = true;
        }
    }

    // Função para parar a reprodução do som de digitação
    _pararSonsDigitacao() {
        if (this.somDigitando && this.somDigitando.isPlaying) {
            this.somDigitando.stop();
        }
    }

    // Função para interagir com a caixa de diálogo, avançando para a próxima fala ou encerrando o diálogo se não houver mais falas
    interagir() {
        if (this.pularDigitacao()) {
            return;
        }

        if (!this.falas.length) {
            this.ocultarMensagem();
            return;
        }

        this.indiceDialogo++;

        if (this.indiceDialogo < this.falas.length) {
            this.mostrarProximaFala();
        } else {
            this.encerrarDialogo();
        }
    }

    // Função para pular a animação de digitação e exibir o texto completo imediatamente, caso o jogador queira avançar mais rápido
    pularDigitacao() {
        if (!this.estaEscrevendo) {
            return false;
        }

        if (this.timerEscrever) {
            this.timerEscrever.remove();
            this.timerEscrever = null;
        }

        this._pararSonsDigitacao(); 
        this.textoDialogo.setText(this.textoAtualArmazenado);
        this.estaEscrevendo = false;
        return true;
    }

    // Função para ocultar a caixa de diálogo e limpar o texto, além de parar qualquer animação de digitação em andamento e esconder o indicador da tecla "E"
    ocultarMensagem() {
        if (this.timerEscrever) {
            this.timerEscrever.remove();
            this.timerEscrever = null;
        }

        this._pararSonsDigitacao();

        // Resetar variáveis e esconder elementos da caixa de diálogo
        this.estaEscrevendo = false;
        this.textoAtualArmazenado = "";
        this.caixaDialogo.setVisible(false);
        this.textoDialogo.setVisible(false).setText("");
        this.labelNome.setVisible(false).setText("");
        this.indicadorTeclaE.esconder();
    }

    // Função para encerrar o diálogo, limpando as falas, resetando o índice do diálogo
    encerrarDialogo() {
        this.ocultarMensagem();

        this.falas.forEach((fala) => {
            if (fala.personagem) {
                fala.personagem.clearTint();
            }
        });

        this.falas = [];
        this.indiceDialogo = 0;

        const callbackFimDialogo = this.callbackFimDialogo;
        this.callbackFimDialogo = null;

        // Chama o callback de fim de diálogo, se houver, para permitir que a cena ou o jogo realizem ações adicionais quando o diálogo terminar
        if (callbackFimDialogo) {
            callbackFimDialogo();
        }
    }
}
