import { Fase01 } from "./scenes/fase-01.js";
import { Fase02 } from "./scenes/fase-02.js";
import { Welcome } from "./scenes/Welcome.js";

// Configuração final do Phaser
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: "arcade",
        arcade: 
        { gravity: { y: 0 }, 
        debug: false } 
    },
    scene: [Welcome, Fase01, Fase02] // Lista as cenas na ordem de execução
};

const game = new Phaser.Game(config); //Inicia o jogo