import { scenePreFase4 } from "./src/scenes/scenePreFase4.js";
import { welcomeScene } from "./src/scenes/Welcome.js";
import { sceneLBPassado } from "./src/scenes/sceneLBPassado.js";
import { sceneLBFuturo } from "./src/scenes/sceneLBFuturo.js";
import { SceneRetornoLab } from "./src/scenes/SceneRetornoLab.js";
import { SceneLabCristal } from "./src/scenes/SceneLabCristal.js";
import { faseUm } from "./src/scenes/FaseUm.js";
import { FaseDois } from "./src/scenes/FaseDois.js";
import { minigame1Fase2 } from "./src/scenes/minigame1Fase2.js";
import { transicao1para2 } from "./src/scenes/transicao1para2.js";
import { FaseDoischao } from "./src/scenes/ChãoCaindo.js";
import { faseQuatro } from "./src/scenes/faseQuatro.js";
import { menu } from "./src/menu.js";
import { BgMusic } from "./src/scenes/BgMusic.js";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: "#262540",
  pixelArt: true,
  roundPixel: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  audio: {
    disableWebAudio: false,
  },
  scene: [
    welcomeScene,
    sceneLBPassado,
    sceneLBFuturo,
    faseUm,
    transicao1para2,
    FaseDois,
    FaseDoischao,
    SceneRetornoLab,
    SceneLabCristal,
    minigame1Fase2,
    scenePreFase4,
    faseQuatro,
    menu,
    BgMusic,
  ],
};

const game = new Phaser.Game(config);
