import { scenePreFase4 } from "./src/scenes/scenePreFase4.js";
import { welcomeScene } from "./src/scenes/welcome.js";
import { sceneInicial } from "./src/scenes/sceneInicial.js";
import { sceneLbPassado } from "./src/scenes/sceneLbPassado.js";
import { sceneLbFuturo } from "./src/scenes/sceneLbFuturo.js";
import { sceneRestauracao } from "./src/scenes/sceneRestauracao.js";
import { faseUm } from "./src/scenes/faseUm.js";
import { faseDois } from "./src/scenes/faseDois.js";
import { transicao1Para2 } from "./src/scenes/transicao1Para2.js";
import { faseTres } from "./src/scenes/faseTres.js";
import { chaoCaindo } from "./src/scenes/chaoCaindo.js";
import { faseQuatro } from "./src/scenes/faseQuatro.js";
import { faseCinco } from "./src/scenes/faseCinco.js";
import { sceneCreditos } from "./src/scenes/sceneCreditos.js";
import { menu } from "./src/menu.js";
import { bgMusic } from "./src/scenes/bgMusic.js";

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
  parent: 'game-container',
  dom: {
    createContainer: true // Isso é obrigatório para usar elementos DOM
  },
  //scene: [sceneInicial, sceneLbPassado, sceneLbFuturo],
  scene: [faseCinco],

  // scene: [
  //   welcomeScene,
  //   sceneInicial,
  //   sceneLbPassado,
  //   sceneLbFuturo,
  //   faseUm,
  //   transicao1Para2,
  //   faseDois,
  //   chaoCaindo,
  //   faseTres,
  //   scenePreFase4,
  //   faseQuatro,
  //   sceneRestauracao,
  //   faseCinco,
  //   sceneCreditos,
  //   menu,
  //   bgMusic,
  // ],

};

const game = new Phaser.Game(config);
