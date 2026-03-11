
import { WelcomeScene } from "./src/scenes/Welcome.js";
import { Scene01 } from "./src/scenes/sceneOne.js";
import { SceneFuturo } from "./src/scenes/sceneFuturo.js"
import { Scene02 } from "./src/scenes/sceneTwo.js";
import { FaseUm } from "./src/scenes/FaseUm.js";
import { FaseDois } from "./src/scenes/FaseDois.js"; 
import { minigame1Fase2 } from "./src/scenes/minigame1Fase2.js"; 

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


    scene: [WelcomeScene, Scene01, SceneFuturo, FaseUm, Scene02, FaseDois ]
    //scene: [minigame1Fase2]

};

const game = new Phaser.Game(config);
