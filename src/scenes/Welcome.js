export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 1080;
    larguraJogo = 1920;

    constructor() {
        super("WelcomeScene");
    }

    preload () {
        this.load.image("cenario", "assets/menu/cenario.png");
        this.load.image("play", "assets/menu/play.png");
    }

    create () {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "cenario").setScale(1.5);
        this.play = this.add.image(this.larguraJogo/2, 610, "play").setScale(0.30).setInteractive();

        this.play.on( "pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.play.on( "pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.play.on( "pointerdown", () => {
            this.scene.start("SceneLabBranco01")
        })
    }

    update (){

    }

}