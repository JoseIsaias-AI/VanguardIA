import { scenePreFase4 } from "./scenes/scenePreFase4.js";
import { welcomeScene } from "./scenes/welcome.js";
import { sceneInicial } from "./scenes/sceneInicial.js";
import { sceneLbPassado } from "./scenes/sceneLbPassado.js";
import { sceneLbFuturo } from "./scenes/sceneLbFuturo.js";
import { sceneRestauracao } from "./scenes/sceneRestauracao.js";
import { faseUm } from "./scenes/faseUm.js";
import { faseDois } from "./scenes/faseDois.js";
import { transicao1Para2 } from "./scenes/transicao1Para2.js";
import { faseTres } from "./scenes/faseTres.js";
import { chaoCaindo } from "./scenes/chaoCaindo.js";
import { faseQuatro } from "./scenes/faseQuatro.js";
import { faseCinco } from "./scenes/faseCinco.js";
import { sceneCreditos } from "./scenes/sceneCreditos.js";
import { menu } from "./menu.js";
import { bgMusic } from "./scenes/bgMusic.js";

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
  // scene: [faseCinco],

  scene: [
    welcomeScene,
    sceneInicial,
    sceneLbPassado,
    sceneLbFuturo,
    faseUm,
    transicao1Para2,
    faseDois,
    chaoCaindo,
    faseTres,
    scenePreFase4,
    faseQuatro,
    sceneRestauracao,
    faseCinco,
    sceneCreditos,
    menu,
    bgMusic,
  ],

};

const game = new Phaser.Game(config);
