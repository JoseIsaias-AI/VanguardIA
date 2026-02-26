import { WelcomeScene } from "./src/scenes/Welcome.js";
import { Scene01 } from "./src/scenes/sceneOne.js";
import { Scene02 } from "./src/scenes/sceneTwo.js";

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
    scene: [WelcomeScene, Scene01, Scene02]
};

const game = new Phaser.Game(config);