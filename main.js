import { WelcomeScene } from "./src/scenes/Welcome.js";
import { Fase01 } from "./src/scenes/fase-01.js";
import { Fase02 } from "./src/scenes/fase-02.js";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: "#262540",
    pixelArt: true,
    roundPixel: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false  
        }
    },
    scene: [WelcomeScene, Fase01, Fase02]
};

const game = new Phaser.Game(config);