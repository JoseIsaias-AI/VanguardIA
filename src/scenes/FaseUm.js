export class FaseUm extends Phaser.Scene {
    constructor () {
        super("FaseUm");
    }

    preload () {
        this.load.image('fundo', 'assets/fases/faseUm/faseRobo.png');
        this.load.spritesheet('asimov', 'assets/personagens/asimov.png', { frameWidth: 32,frameHeight: 32 });
        this.load.image('pedra', 'assets/objetos/faseUm/pedra.png');
        this.load.image('poste', 'assets/objetos/faseUm/poste.png');
        this.load.image('tronco', 'assets/objetos/faseUm/tronco.png');
    }

    create () {
        this.progressoHistoria = 0;
        this.lendoMensagem = false;
        this.podeInteragir = false;

        this.mapa = this.add.image(1010, 540, "fundo").setScale(3.0);
        
        this.asimov = this.physics.add.sprite(600, 450, "asimov").setScale(5).setCollideWorldBounds(true);
        //this.asimov.setGravityX(10000);

        this.obstaculos = this.physics.add.group();

        // 5. Configurar Colisões
        this.physics.add.collider(this.asimov, this.obstaculos, this.baterObstaculos, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        if (!this.anims.exists("asimov_left")) {
            this.anims.create({
                key: "asimov_right",
                frames: this.anims.generateFrameNumbers("asimov", {
                    start: 28,
                    end: 35,
                }),
                frameRate: 10,
                repeat: -1,
            });
        }

        this.asimov.play("asimov_right");
        this.time.addEvent({
            delay: 1500,
            callback: this.criarObstaculos,                
            callbackScope: this,
            loop: true
        });
        
    }

    update () {
        this.asimov.setVelocity(0);

        let velocidade = 150;
        let movimentacao = false;

        if (this.cursors.left.isDown) {
            this.asimov.setVelocityX(-velocidade);
            this.asimov.anims.play("asimov_left", true);
            movimentacao = true;
        } else if (this.cursors.right.isDown) {
            this.asimov.setVelocityX(+velocidade);
            this.asimov.anims.play("asimov_right", true);
            movimentacao = true;
        }

        if (this.cursors.up.isDown) {
            this.asimov.setVelocityY(-velocidade);
            if (!movimentacao) this.asimov.anims.play("asimov_back", true);
                movimentacao = true;
            } else if (this.cursors.down.isDown) {
                this.asimov.setVelocityY(+velocidade);
                if (!movimentacao) this.asimov.anims.play("asimov_front", true);
                movimentacao = true;
            }

            if (!movimentacao) this.asimov.anims.stop();
    }

    criarObstaculos() {
        if (this.finalizarJogo) return;

        const { width, height } = this.sys.game.config;
        const itens = ['pedra', 'poste', 'tronco'];
        const escolhido = Phaser.Utils.Array.GetRandom(itens);
        
        // Spawna na esquerda (x: -50) e move para a direita
        //let obs = this.obstaculos.create(-50, this.sys.game.config.height - 100, escolhido);
        let obs = this.obstaculos.create(width + 50, height - 100, escolhido);
        
        obs.setOrigin(0.5, 1); // Ajusta o pé do objeto no chão
        obs.setVelocityX(this.velocidade * 60); // Define a velocidade de vinda
        obs.setImmovable(true);
        obs.body.allowGravity = false;
    }

    baterObstaculos(player, obstacle) {
        this.physics.pause();
        this.finalizarJogo = true;
        player.setTint(0xff0000);
        player.anims.stop();
        
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 
            'GAME OVER\nPressione R para reiniciar', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 10 },
            align: 'center'
        }).setOrigin(0.5);
    }
}