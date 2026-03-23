export function registrarTeclaMenu(cena) {
    cena.input.keyboard.on('keydown-M', () => {
        if (cena.scene.isActive('menu')) return;
        //
        cena.scene.pause();
        cena.scene.launch('menu', { origem: cena.scene.key });
    });
}

export class menu extends Phaser.Scene {
    constructor() {
        super({ key: "menu", active: false });
    }

    preload() {
        this.load.spritesheet('objetosMenu', 'assets/Menu/infoMenu.png', { frameWidth: 320, frameHeight: 320 });
        this.load.image('controleBtn', 'assets/Menu/controle.png');
        this.load.image('voltarBtn', 'assets/Menu/voltar.png');
        this.load.image('sairBotao', 'assets/Menu/sair.png');
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0).setDepth(9).setInteractive();

        this.fundoMenu = this.add.sprite(width / 2, height / 2, "objetosMenu").setFrame(0).setScale(6.0).setDepth(10);
        this.instrucao = this.add.sprite(width / 2, height / 2, "objetosMenu").setFrame(6).setScale(6.0).setDepth(11).setVisible(false);

        this.controle = this.add.image(width / 2, height / 2 - 180, 'controleBtn').setScale(6.0).setDepth(12).setInteractive();
        this.voltar   = this.add.image(width / 2, height / 2 + 180, 'voltarBtn').setScale(6.0).setDepth(12).setInteractive();
        this.sair     = this.add.image(width / 2 + 350, height / 2 - 380, 'sairBotao').setScale(5.0).setDepth(12).setInteractive();

        this.controle.on('pointerdown', () => {
            this.fundoMenu.setVisible(false);
            this.controle.setVisible(false);
            this.voltar.setVisible(false);
            this.instrucao.setVisible(true);
        });

        this.voltar.on('pointerdown', () => this.fecharMenu(true));
        this.sair.on('pointerdown', () => this.fecharMenu(false));
        this.input.keyboard.once('keydown-M', () => this.fecharMenu(false));
    }

    fecharMenu(irParaWelcome) {
        const origem = this.scene.settings.data?.origem;
        this.scene.stop();
        if (irParaWelcome) {
            if (origem) this.scene.stop(origem);
            this.scene.start('WelcomeScene');
        } else {
            if (origem) this.scene.resume(origem);
        }
    }
}
