import { scenePreFase4 } from "./src/scenes/scenePreFase4.js";
import { welcomeScene } from "./src/scenes/Welcome.js";
import { sceneInicial } from "./src/scenes/sceneInicial.js";
import { sceneLBPassado } from "./src/scenes/sceneLBPassado.js";
import { sceneLBFuturo } from "./src/scenes/sceneLBFuturo.js";
import { SceneRetornoLab } from "./src/scenes/SceneRetornoLab.js";
import { sceneRestauracao } from "./src/scenes/sceneRestauracao.js";
import { faseUm } from "./src/scenes/FaseUm.js";
import { FaseDois } from "./src/scenes/FaseDois.js";
import { minigame1Fase2 } from "./src/scenes/minigame1Fase2.js";
import { transicao1para2 } from "./src/scenes/transicao1para2.js";
import { faseTres } from "./src/scenes/faseTres.js";
import { FaseDoischao } from "../src/scenes/chaoCaindo.js";
import { faseQuatro } from "./src/scenes/faseQuatro.js";
import { faseCinco } from "./src/scenes/faseCinco.js";
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
  // scene: [FaseDoischao, faseTres],
  //scene: [sceneRestauracao,faseCinco, menu, BgMusic],
  //scene: [transicao1para2],
  //scene: [ sceneRestauracao],
  //scene: [sceneInicial, sceneLBPassado, sceneLBFuturo],


  scene: [
    welcomeScene,
    sceneInicial,
    sceneLBPassado,
    sceneLBFuturo,
    faseUm,
    transicao1para2,
    FaseDois,
    FaseDoischao,
    faseTres,
    SceneRetornoLab,
    minigame1Fase2,
    scenePreFase4,
    faseQuatro,
    sceneRestauracao,
    faseCinco,
    menu,
    BgMusic,
  ],

};

const game = new Phaser.Game(config);
