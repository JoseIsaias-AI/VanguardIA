export class fase4 extends Phaser.Scene {
    constructor () {
        super("fase4");
    }

    preload () {
        this.load.image('cristais', 'assets/Fases/Fase4/cristais.png');
        this.load.image('cristais2', 'assets/Fases/Fase4/cristais2.png');
        this.load.image('cristais3', 'assets/Fases/Fase4/cristais3.png');
        this.load.image('cristais4', 'assets/Fases/Fase4/cristais4.png');
        this.load.image('esponja', 'assets/Fases/Fase4/esponja.png');
        this.load.spritesheet('barra', 'assets/Fases/Fase4/barraProgresso.png', { frameWidth: 256, frameHeight: 128 });
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.image(width / 2, height / 2, 'cristais').setDisplaySize(width, height);

        const img2 = this.make.image({ key: 'cristais2' }, false).setDisplaySize(width, height);
        const img3 = this.make.image({ key: 'cristais3' }, false).setDisplaySize(width, height);
        const img4 = this.make.image({ key: 'cristais4' }, false).setDisplaySize(width, height);

        this.rt2 = this.add.renderTexture(0, 0, width, height);
        this.rt2.draw(img2, width / 2, height / 2);

        this.rt3 = this.add.renderTexture(0, 0, width, height);
        this.rt3.draw(img3, width / 2, height / 2);

        this.rt4 = this.add.renderTexture(0, 0, width, height);
        this.rt4.draw(img4, width / 2, height / 2);

        // canvas offscreen: pixels marcados = já apagados nessa camada
        const criarMapa = (w, h) => {
            const c = document.createElement('canvas');
            c.width = w; c.height = h;
            return c.getContext('2d');
        };
        this.mapa4 = criarMapa(width, height);
        this.mapa3 = criarMapa(width, height);
        this.mapa2 = criarMapa(width, height);

        const brushSize = 180;
        const brush = this.make.image({ key: 'esponja' }, false).setDisplaySize(brushSize, brushSize);
        this.esponja = this.add.image(-100, -100, 'esponja').setDisplaySize(brushSize, brushSize).setDepth(10);

        this.barra = this.add.sprite(width / 2, 120, 'barra', 0).setScale(3).setDepth(10);
        this.anims.create({
            key: 'barraProgresso4',
            frames: this.anims.generateFrameNumbers('barra', { start: 0, end: 66 }),
            frameRate: 2.5,
            repeat: 0
        });
        this.barraFrame = 0;
        this.limpando = false;
        this.totalPixels = width * height;
        this.cronometroIniciado = false;
        this.tempoRestante = 120;
        this.jogoParado = false;

        this.textoTempo = this.add.text(20, height - 80, 'Tempo: 2:00', {
            fontSize: '22px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10);

        this.textoNitidez = this.add.text(20, height - 40, 'Nitidez: 0%', {
            fontSize: '22px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10);

        this.rtAtiva = null; // renderTexture da camada que será apagada nessa sessão
        this.mapaAtivo = null; // mapa correspondente

        this.input.on('pointerdown', (pointer) => {
            this.limpando = true;
            if (!this.cronometroIniciado) {
                this.cronometroIniciado = true;
                this.time.addEvent({
                    delay: 1000,
                    repeat: 119,
                    callback: () => {
                        this.tempoRestante--;
                        const min = Math.floor(this.tempoRestante / 60);
                        const seg = this.tempoRestante % 60;
                        this.textoTempo.setText(`Tempo: ${min}:${seg.toString().padStart(2, '0')}`);
                        if (this.tempoRestante <= 0) {
                            this.mostrarMenu('Fim do tempo de treinamento.\nReinicie o tratamento desta imagem.');
                        }
                    }
                });
            }
            // determina qual camada apagar baseado no que JÁ foi apagado nesse ponto
            const x = Math.floor(pointer.x);
            const y = Math.floor(pointer.y);

            const apagado4 = this.mapa4.getImageData(x, y, 1, 1).data[3] > 0;
            const apagado3 = this.mapa3.getImageData(x, y, 1, 1).data[3] > 0;
            const apagado2 = this.mapa2.getImageData(x, y, 1, 1).data[3] > 0;

            if (!apagado4) {
                this.rtAtiva = this.rt4;
                this.mapaAtivo = this.mapa4;
            } else if (!apagado3) {
                this.rtAtiva = this.rt3;
                this.mapaAtivo = this.mapa3;
            } else if (!apagado2) {
                this.rtAtiva = this.rt2;
                this.mapaAtivo = this.mapa2;
            } else {
                this.rtAtiva = null;
                this.mapaAtivo = null;
            }

            this.apagar(brush, pointer.x, pointer.y, brushSize);
        });

        this.input.on('pointerup', () => {
            this.limpando = false;
            this.rtAtiva = null;
            this.mapaAtivo = null;
        });

        this.input.on('pointermove', (pointer) => {
            this.esponja.setPosition(pointer.x, pointer.y);
            if (pointer.isDown) {
                this.apagar(brush, pointer.x, pointer.y, brushSize);
            }
        });
    }

    update() {
        if (this.jogoParado) return;

        if (this.limpando) {
            this.barraFrame = Math.min(66, this.barraFrame + 0.1);
        } else {
            this.barraFrame = Math.max(0, this.barraFrame - 0.1);
        }
        this.barra.setFrame(Math.floor(this.barraFrame));

        if (Math.floor(this.barraFrame) >= 66) {
            this.mostrarMenu('FALHA DE FABRICAÇÃO DO CRISTAL:\nO nível de ruído visual excedeu a tolerância desta etapa.\nInserir dados turvos comprometerá a generalização do\ntreinamento. A fabricação foi pausada.\nReinicie o tratamento desta imagem.');
        }

        // conta pixels apagados no mapa2 (última camada)
        const dados = this.mapa2.getImageData(0, 0, this.mapa2.canvas.width, this.mapa2.canvas.height).data;
        let apagados = 0;
        for (let i = 3; i < dados.length; i += 4) {
            if (dados[i] > 0) apagados++;
        }
        const pct = Math.floor((apagados / this.totalPixels) * 100);
        this.textoNitidez.setText(`Nitidez: ${pct}%`);
    }

    mostrarMenu(mensagem) {
        if (this.jogoParado) return;
        this.jogoParado = true;
        this.limpando = false;

        const { width, height } = this.sys.game.config;
        const painelW = 800;
        const painelH = 320;

        this.input.off('pointermove');

        const painel = this.add.rectangle(width / 2, height / 2, painelW, painelH, 0x8b7355).setDepth(20).setAlpha(0.92);
        this.add.text(width / 2, height / 2, mensagem, {
            fontSize: '28px',
            fontStyle: 'bold',
            fontFamily: "'Courier New', Courier, monospace",
            fill: '#1a1a1a',
            align: 'center',
            wordWrap: { width: 760 }
        }).setOrigin(0.5).setDepth(21);

        this.input.once('pointerdown', () => {
            this.scene.restart();
        });
    }

    apagar(brush, x, y, brushSize) {
        if (!this.rtAtiva) return;
        const metade = brushSize / 2;
        this.rtAtiva.erase(brush, x, y);
        this.mapaAtivo.fillStyle = 'white';
        this.mapaAtivo.beginPath();
        this.mapaAtivo.arc(x, y, metade, 0, Math.PI * 2);
        this.mapaAtivo.fill();
    }
}
