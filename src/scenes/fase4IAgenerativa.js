//nesta fase o jogador precisa limpar o ruído da imagem do cristal. Para isso ele precisa passar o mouse na tela, e isso vai limpar e alcançar a nitidez desejada.
//O jogador tem um tempo limitado para terminar essa fase
//O jogador precisa de uma nitide alta para passar de fase

export class fase4 extends Phaser.Scene {
    constructor () {
        super("fase4");
    }

    //carrega todas as imagens e sprites
    preload () {
        this.load.image('cristais', 'assets/Fases/Fase4/cristais.png');
        this.load.image('cristais2', 'assets/Fases/Fase4/cristais2.png');
        this.load.image('cristais3', 'assets/Fases/Fase4/cristais3.png');
        this.load.image('cristais4', 'assets/Fases/Fase4/cristais4.png');
        this.load.image('esponja', 'assets/Fases/Fase4/esponja.png');
        this.load.spritesheet('barra', 'assets/Fases/Fase4/barraProgresso.png', { frameWidth: 256, frameHeight: 128 });
    }

    //carrega todas as imagens e sprites
    create() {
        const { width, height } = this.sys.game.config; //a altura e o comprimento recebem valores definidos no sistema
        //altura - heigh
        //largura - width

        this.add.image(width / 2, height / 2, 'cristais').setDisplaySize(width, height); //adiciona a imagem real do cristal que fica no fundo de tudo

        // cria objetos sem adicioná-los à cena automaticamente por causa do False. Carrega a imagem da key.
        const img2 = this.make.image({ key: 'cristais2' }, false).setDisplaySize(width, height); 
        const img3 = this.make.image({ key: 'cristais3' }, false).setDisplaySize(width, height);
        const img4 = this.make.image({ key: 'cristais4' }, false).setDisplaySize(width, height);

        //fórmula de apagar utilizada encontrada no site da Phaser: https://phaser.io/examples/v3.85.0/game-objects/render-texture/view/erase-part-of-render-texture
        // cria o objeto com o renderTexture, dinâmica que pode ser desenhada e apagada em tempo real. Começa na posição x e y = 0
        this.desenho2 = this.add.renderTexture(0, 0, width, height);
        this.desenho2.draw(img2, width / 2, height / 2); //a imagem que estava na memória e não aparecia na tela, agora é desenhada na tela
        this.desenho3 = this.add.renderTexture(0, 0, width, height);
        this.desenho3.draw(img3, width / 2, height / 2);
        this.desenho4 = this.add.renderTexture(0, 0, width, height);
        this.desenho4.draw(img4, width / 2, height / 2);

        //pode ser feito dessa maneira também, diretamente ^
        //this.desenho2.draw(this.make.image({ key: 'cristais2' }, false).setDisplaySize(width, height), width / 2, height / 2);

        // criação de canvas - corresponde a uma tela de desenho em branco que é controlada pelo javascript. Ela não aparece visualmente ao usuaário, mas é possivel manipular os pixels
        const criarMapa = (w, h) => { //recebe a coordenada de largura e de altura
            const c = document.createElement('canvas'); // cria o canvas explicado acima e armazena na variavedl c
            c.width = w; c.height = h;
            return c.getContext('2d'); //o canvas tem que ser em 2D, por isso o context('2d')
        };
        this.mapa4 = criarMapa(width, height);
        this.mapa3 = criarMapa(width, height);
        this.mapa2 = criarMapa(width, height);

        const tamBorracha = 180; //tamanho borracha
        const borracha = this.make.image({ key: 'esponja' }, false).setDisplaySize(tamBorracha, tamBorracha); //cria o objeto da borracha mas não mostra na tela, esse aqui é somente para realizar a funç
        this.esponja = this.add.image(-100, -100, 'esponja').setDisplaySize(tamBorracha, tamBorracha).setDepth(10); //mostra a imagem na tela

        this.barra = this.add.sprite(width / 2, 120, 'barra', 0).setScale(3).setDepth(10); //adiciona a barra do overfitting
        this.anims.create({ //animação da passagem de frames
            key: 'barraProgresso4',
            frames: this.anims.generateFrameNumbers('barra', { start: 0, end: 66 }), // são 67 imagens da barra
            frameRate: 2.5, 
            repeat: 0
        });
        this.barraFrame = 0; //começa com o primeiro frame
        this.limpando = false;
        this.totalPixels = width * height; //resolução da tela
        this.cronometroIniciado = false;
        this.tempoRestante = 120; //2 minutos de contador
        this.jogoParado = false;

        this.textoTempo = this.add.text(20, height - 80, 'Tempo: 2:00', { //texto do tempo localizado no canto inferior esquerdo
            fontSize: '22px', //tamanho
            fill: '#ffffff', //cor
            stroke: '#000000', //cor do contorno
            strokeThickness: 4 //espessura do contorno das letras
        }).setDepth(10);

        this.textoNitidez = this.add.text(20, height - 40, 'Nitidez: 0%', { //texto da nitidez no canto inferior esquerdo
            fontSize: '22px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setDepth(10);

        this.desenhoAtiva = null; // renderTexture da camada que será apagada nessa sessão
        this.mapaAtivo = null; // mapa correspondente

        this.input.on('pointerdown', (pointer) => { //quando o jogador clicar com o botão esquerdo do mouse
            this.limpando = true;
            if (!this.cronometroIniciado) {
                this.cronometroIniciado = true;
                this.time.addEvent({ //cria um evento para o cronometro
                    delay: 1000,//de um em um segundo acontece repetindo 119 vezes que da um minuto
                    repeat: 119,
                    callback: () => { //chamada a cada segundo
                        this.tempoRestante--; 
                        const min = Math.floor(this.tempoRestante / 60); //arredonda pro numero inteiro inferior achando o número dos minutos. 100 / 60 = 1,66 -> 1
                        const seg = this.tempoRestante % 60; //o resto da divisão feita acima
                        this.textoTempo.setText(`Tempo: ${min}:${seg.toString().padStart(2, '0')}`); //o padStart faz com que o número inferior a 10 tenha um zero a sua esquerda
                        if (this.tempoRestante <= 0) {
                            this.mostrarMenu('Fim do tempo de treinamento.\nReinicie o tratamento desta imagem.');
                        }
                    }
                });
            }
            // determina qual camada apagar baseado no que JÁ foi apagado nesse ponto
            const x = Math.floor(pointer.x); // acessa a posição x atual do cursor
            const y = Math.floor(pointer.y); // acessa a posição y atual do cursor

            // retorna um valor booleano true caso o dado x e y do pixel de transparência não seja transparente. Se for retorna falso.
            /*  R - [0]
                G - [1]
                B - [2]
                A - [3]*/
            
            const apagado4 = this.mapa4.getImageData(x, y, 1, 1).data[3] > 0; 
            const apagado3 = this.mapa3.getImageData(x, y, 1, 1).data[3] > 0;
            const apagado2 = this.mapa2.getImageData(x, y, 1, 1).data[3] > 0;

            if (!apagado4) { //se a camada de cima estiver falsa, ou seja, não foi apagada ainda, então o desenhoAtiva recebe o desenho de cima. 
                this.desenhoAtiva = this.desenho4; //camada 4 se torna o alvo visual da borracha
                this.mapaAtivo = this.mapa4; //mapa 4 recebe a marcação lógica de pixels de limpeza no canvas invisível
            } else if (!apagado3) { //os comentários acima servem para o resto dos elses
                this.desenhoAtiva = this.desenho3;
                this.mapaAtivo = this.mapa3;
            } else if (!apagado2) {
                this.desenhoAtiva = this.desenho2;
                this.mapaAtivo = this.mapa2;
            } else {
                this.desenhoAtiva = null;
                this.mapaAtivo = null;
            }

            this.apagar(borracha, pointer.x, pointer.y, tamBorracha);
        });

        this.input.on('pointerup', () => { //quando o jogador solta o botão do mouse
            this.limpando = false;
            this.desenhoAtiva = null;
            this.mapaAtivo = null;
        });

        this.input.on('pointermove', (pointer) => { //a esponja move junto com o ponteiro do mouse
            this.esponja.setPosition(pointer.x, pointer.y); 
            if (pointer.isDown) {
                this.apagar(borracha, pointer.x, pointer.y, tamBorracha);
            }
        });
    }

    update() {
        if (this.jogoParado) return; //sai das atualizações  se o jogador perdeu o tempo

        if (this.limpando) { //enquanto estiver limpando a barra de progresso aumenta os frames e vai subindo
            this.barraFrame = Math.min(66, this.barraFrame + 0.1);
        } else {
            this.barraFrame = Math.max(0, this.barraFrame - 0.1); //enquanto estiver sem limpar a barra de progresso diminui os frames e vai subindo
        }
        this.barra.setFrame(Math.floor(this.barraFrame));

        if (Math.floor(this.barraFrame) >= 66) { //se os frames forem iguais a quantidade maxima, o jogador perde por Overfitting
            this.mostrarMenu('FALHA DE FABRICAÇÃO DO CRISTAL:\nO nível de ruído visual excedeu a tolerância desta etapa.\nInserir dados turvos comprometerá a generalização do\ntreinamento. A fabricação foi pausada.\nReinicie o tratamento desta imagem.');
        }

        // conta pixels apagados no mapa2 (última camada)
        const dados = this.mapa2.getImageData(0, 0, this.mapa2.canvas.width, this.mapa2.canvas.height).data; //consegue puxar os dados de toda a tela retirada do penultima imagem e isso corresponde ao que aparece da imagem do fundo
        let apagados = 0;
        for (let i = 3; i < dados.length; i += 4) { // a constante de dados acima retorna 4 dados: RGB e alpha, de 4 em 4 para pegar somente o alpha e aumenta o valor da variável apagados
            if (dados[i] > 0) apagados++;
        }
        const pct = Math.floor((apagados / this.totalPixels) * 100); //pega o número da porcentagem
        this.textoNitidez.setText(`Nitidez: ${pct}%`);
    }

    mostrarMenu(mensagem) {
        if (this.jogoParado) return;
        this.jogoParado = true;
        this.limpando = false;

        const { width, height } = this.sys.game.config;
        // tamanho do painel do texto
        const painelW = 800;
        const painelH = 320;

        this.input.off('pointermove'); //não acompanha o ponteiro

        const painel = this.add.rectangle(width / 2, height / 2, painelW, painelH, 0x8b7355).setDepth(20).setAlpha(0.92); //provisório o retângulo do fundo do texto
        this.add.text(width / 2, height / 2, mensagem, { //estilo do texto
            fontSize: '28px',
            fontStyle: 'bold',
            fontFamily: "'Courier New', Courier, monospace",
            fill: '#1a1a1a',
            align: 'center',
            wordWrap: { width: 760 }
        }).setOrigin(0.5).setDepth(21);

        this.input.once('pointerdown', () => { //caso haja um clique, restarta a cena
            this.scene.restart();
        });
    }

    apagar(borracha, x, y, tamBorracha) { //método para apagar os pixels da imagem
        if (!this.desenhoAtiva) return; //caso chegar na ultima imagem que não tem uma renderTexture
        const metade = tamBorracha / 2;
        this.desenhoAtiva.erase(borracha, x, y); //pega o molde do objeto apagador e faz com que apague com aquele molde nos pontos x e y
        //this.mapaAtivo.beginPath(); melhora no desempenho do navegador, mas estou testando ainda para ver se realmente é necessário
        this.mapaAtivo.arc(x, y, metade, 0, Math.PI * 2); //Cria um círculo perfeito na posição do mouse, sem isso ele não apaga a camada de baixo
        this.mapaAtivo.fill(); //anota a parte que ja esta limpa
    }
}
