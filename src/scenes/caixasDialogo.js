import { HudTeclaE } from "./hudTeclaE.js";

export default class CaixaDialogo {
    constructor(scene, config = {}) {
        this.scene = scene;

        const larguraJogo = scene.scale.width;
        const alturaJogo = scene.scale.height;

        const larguraCaixa = config.larguraCaixa ?? 1300;
        const alturaCaixa = config.alturaCaixa ?? 220;
        const xCaixa = config.xCaixa ?? (larguraJogo - larguraCaixa) / 2;
        const yCaixa = config.yCaixa ?? (alturaJogo - alturaCaixa - 50);
        const profundidadeBase = config.profundidadeBase ?? 1000;
        const scrollFactor = config.scrollFactor ?? 0;

        this.fonte = config.fonte ?? "'Courier New', Courier, monospace";
        this.corTexto = config.corTexto ?? "#ccffff";
        this.corNome = config.corNome ?? "#00ffff";
        this.delayDigitacao = config.delayDigitacao ?? 30;
        this.larguraTexto = config.larguraTexto ?? (larguraCaixa - 80);
        this.alturaTexto = config.alturaTexto ?? (alturaCaixa - 60);
        this.tamanhosFonte = config.tamanhosFonte ?? [32, 30, 28, 26, 24, 22, 20];

        this.caixaDialogo = scene.add.graphics();
        this.caixaDialogo.fillStyle(0x1a1a1a, 0.9);
        this.caixaDialogo.lineStyle(2, 0x00ffff, 1);
        this.caixaDialogo.fillRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo.strokeRoundedRect(xCaixa, yCaixa, larguraCaixa, alturaCaixa, 15);
        this.caixaDialogo
            .setScrollFactor(scrollFactor)
            .setDepth(profundidadeBase)
            .setVisible(false);

        this.textoDialogo = scene.add.text(xCaixa + 40, yCaixa + 30, "", {
            fontSize: "32px",
            fontFamily: this.fonte,
            color: this.corTexto,
            wordWrap: { width: this.larguraTexto },
            lineSpacing: 10,
        }).setScrollFactor(scrollFactor).setDepth(profundidadeBase + 1).setVisible(false);

        this.labelNome = scene.add.text(xCaixa + 16, yCaixa - 28, "", {
            fontSize: "32px",
            fontFamily: this.fonte,
            color: this.corNome,
            fontStyle: "bold",
            backgroundColor: "#1a1a1a",
            padding: { left: 8, right: 8, top: 3, bottom: 3 },
        }).setScrollFactor(scrollFactor).setDepth(profundidadeBase + 2).setVisible(false);

        this.indicadorTeclaE = new HudTeclaE(scene, {
            x: xCaixa + larguraCaixa - 70,
            y: yCaixa + alturaCaixa - 32,
            depth: profundidadeBase + 3,
            scrollFactor,
        });

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

            this.textoDialogo.setText(textoCompleto);
            if (this.textoDialogo.height <= this.alturaTexto) {
                this.textoDialogo.setText("");
                return;
            }
        }

        this.textoDialogo.setStyle({
            fontSize: "20px",
            fontFamily: this.fonte,
            color: this.corTexto,
            wordWrap: { width: this.larguraTexto },
            lineSpacing: 4,
        });
        this.textoDialogo.setText("");
    }

    iniciarDialogo(listaDeFalas, callbackFim) {
        this.falas = listaDeFalas;
        this.indiceDialogo = 0;
        this.callbackFimDialogo = callbackFim ?? null;
        this.mostrarProximaFala();
    }

    mostrarMensagem(textoCompleto, nome = "") {
        this.falas = [];
        this.indiceDialogo = 0;
        this.callbackFimDialogo = null;
        this._mostrarConteudo(textoCompleto, nome);
    }

    mostrarProximaFala() {
        const falaAtual = this.falas[this.indiceDialogo];
        if (!falaAtual) {
            this.encerrarDialogo();
            return;
        }

        this._mostrarConteudo(
            falaAtual.texto ?? "",
            falaAtual.nome ?? "",
            falaAtual.personagem ?? null
        );
    }

    _mostrarConteudo(textoCompleto, nome = "", personagemFalando = null) {
        this.caixaDialogo.setVisible(true);
        this.textoDialogo.setVisible(true).setText("");
        this.indicadorTeclaE.mostrar();

        if (nome && nome.trim() !== "") {
            this.labelNome.setText(nome);
            this.labelNome.setVisible(true);
        } else {
            this.labelNome.setVisible(false).setText("");
        }

        this.ajustarTextoDialogo(textoCompleto);
        this.textoAtualArmazenado = textoCompleto;
        this.estaEscrevendo = true;

        if (this.falas.length > 0) {
            this.destacarPersonagemFalando(personagemFalando);
        }

        if (this.timerEscrever) {
            this.timerEscrever.remove();
            this.timerEscrever = null;
        }

        if (!textoCompleto || textoCompleto.length === 0) {
            this.estaEscrevendo = false;
            return;
        }

        this._iniciarSonsDigitacao();

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

    _inicializarAudio() {
        if (this.scene.cache.audio.exists("digitando")) {
            this._criarSomDigitando();
            return;
        }

        if (this._digitandoLoadStarted) {
            return;
        }

        this._digitandoLoadStarted = true;
        this.scene.load.audio("digitando", "assets/efeitosSonoros/digitando.mp3");
        this.scene.load.once("complete", () => {
            this._criarSomDigitando();
            if (this.audioPendente) {
                this.audioPendente = false;
                this._iniciarSonsDigitacao();
            }
        });
        this.scene.load.start();
    }

    _criarSomDigitando() {
        if (!this.somDigitando && this.scene.cache.audio.exists("digitando")) {
            this.somDigitando = this.scene.sound.add("digitando", { loop: true, volume: 0.5 });
        }
    }

    _iniciarSonsDigitacao() {
        if (this.somDigitando && !this.somDigitando.isPlaying) {
            this.somDigitando.play();
        } else if (!this.somDigitando) {
            this.audioPendente = true;
        }
    }

    _pararSonsDigitacao() {
        if (this.somDigitando && this.somDigitando.isPlaying) {
            this.somDigitando.stop();
        }
    }

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

    ocultarMensagem() {
        if (this.timerEscrever) {
            this.timerEscrever.remove();
            this.timerEscrever = null;
        }

        this._pararSonsDigitacao();

        this.estaEscrevendo = false;
        this.textoAtualArmazenado = "";
        this.caixaDialogo.setVisible(false);
        this.textoDialogo.setVisible(false).setText("");
        this.labelNome.setVisible(false).setText("");
        this.indicadorTeclaE.esconder();
    }

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

        if (callbackFimDialogo) {
            callbackFimDialogo();
        }
    }
}
