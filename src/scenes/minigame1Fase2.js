export class minigame1Fase2 extends Phaser.Scene {
    constructor () {
        super("minigame1Fase2");
    }

    //carregamento das imagens e sprites usados durante a fase1
    preload () {
        this.load.spritesheet('binarios', 'assets/Fases/FaseDois/NumerosBinarios.png', { frameWidth: 250, frameHeight: 150 });
        this.load.spritesheet('fundo', 'assets/Fases/FaseDois/spriteRedes.png', { frameWidth: 600, frameHeight: 340 });

        //this.load.image( 'fundo', 'assets/Fases/FaseDois/f.png');
    }

    create() {
        const { width, height } = this.sys.game.config;
        //this.fundo = this.add.image(width / 2, height / 2, "fundo").setScale(3.2).setOrigin(0.5);
        
        this.anims.create({
            key: 'animBinarios',
            frames: this.anims.generateFrameNumbers('binarios', { start: 0, end: 29 }),
            frameRate: 15,
            repeat: -1
        });
        
        this.listaBinarios = [];
        this.framesUsados = [];
        const espacamento = height / 16;
        
        for (let i = 0; i < 15; i++) {
            const xAleatorio = Phaser.Math.Between(80, width * 0.4);
            const yPosicao = espacamento * (i + 1);
            const binario = this.add.sprite(xAleatorio, yPosicao, 'binarios', 0).setScale(0.8);
            binario.play('animBinarios');
            binario.setInteractive();
            binario.parado = false;
            
            binario.on('pointerdown', () => {
                if (!binario.parado) {
                    let frameAtual = binario.anims.currentFrame.index;
                    let frameRepresentado = frameAtual >= 16 ? 32 - frameAtual : frameAtual;
                    
                    while (this.framesUsados.includes(frameRepresentado)) {
                        frameAtual = (frameAtual + 1) % 30;
                        frameRepresentado = frameAtual > 16 ? 32 - frameAtual : frameAtual;
                    }
                    
                    binario.stop();
                    binario.setFrame(frameAtual);
                    binario.parado = true;
                    this.framesUsados.push(frameRepresentado);
                }
            });
            
            this.listaBinarios.push(binario);
        }
    }
}
