
import { WelcomeScene } from "./src/scenes/Welcome.js";
import { SceneLabBranco01 } from "./src/scenes/SceneLabBranco01.js";
import { SceneLabBranco02 } from "./src/scenes/sceneLabBranco02.js"
import { SceneRetornoLab } from "./src/scenes/SceneRetornoLab.js"
import { SceneLabCristal } from "./src/scenes/SceneLabCristal.js";
import { FaseUm } from "./src/scenes/FaseUm.js";
import { FaseDois } from "./src/scenes/FaseDois.js"; 
import { minigame1Fase2 } from "./src/scenes/minigame1Fase2.js"; 
import { transicao1para2 } from "./src/scenes/transicao1para2.js";
import { fase4 } from "./src/scenes/fase4IAgenerativa.js"; 


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


<<<<<<< HEAD
    scene: [WelcomeScene, SceneLabBranco01, SceneLabBranco02, FaseUm, transicao1para2, FaseDois]
    //scene: [fase4]                                                  //transico
    //scene: [FaseDois]
=======
    //scene: [WelcomeScene, SceneLabBranco01, SceneLabBranco02, FaseUm, transicao1para2,SceneLabCristal, SceneRetornoLab, FaseDois, ]
    scene: [fase4]
    //scene: [SceneRetornoLab]
>>>>>>> 9506fadd86ef06de26e6dc66ce409af24b319b31
    

};

const game = new Phaser.Game(config);
