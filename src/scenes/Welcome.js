export class Welcome extends Phaser.Scene {

    alturaJogo = 800;
    larguraJogo = 1200;

    constructor() {
        super("Welcome");
    }

    preload () {
        this.load.image("cenario", "../assets/TeladeLogin/Cenario.png");
        this.load.image("play", "../assets/TeladeLogin/Play.png");
    }

    create () {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "cenario");
        this.play = this.add.image(this.larguraJogo/2, 450, "play").setScale(0.225).setInteractive();

        this.play.on( "pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.play.on( "pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.play.on( "pointerdown", () => {
            this.scene.start("Fase01")
        })
    }

    update (){

    }

}