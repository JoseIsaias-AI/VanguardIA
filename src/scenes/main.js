import { WelcomeScene } from "./Welcome.js";
import { Scene01 } from "./sceneOne.js";
import { SceneFuturo } from "./sceneFuturo.js"
import { Scene02 } from "./sceneTwo.js";
import { FaseUm } from "./FaseUm.js";
import { FaseDois } from "./FaseDois.js"; 
import { SceneFuturo2 } from "./sceneFuturo2.js"; 

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

scene: [WelcomeScene, Scene01, SceneFuturo, FaseUm, SceneFuturo2, Scene02, FaseDois ]
   
};

const game = new Phaser.Game(config);
