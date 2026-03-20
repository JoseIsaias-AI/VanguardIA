import { registrarTeclaMenu } from '../menu.js';

export class SceneRetornoLab extends Phaser.Scene {
  constructor() {
    super("SceneRetornoLab");
  }

  preload() {
    this.load.image("CFuturo", "../assets/Fases/sceneLabBranco01/labDestruido.png");
    this.load.image("armarioD", "assets/objetos/sceneLabBranco01/partTwo/armarioDestruido.png");
    this.load.image("alvoD", "assets/objetos/sceneLabBranco01/partTwo/alvoDestruido.png");
    this.load.image("mesa1D", "assets/objetos/sceneLabBranco01/partTwo/mesa1Destruida.png");
    this.load.image("mesa2D", "assets/objetos/sceneLabBranco01/partTwo/mesa2Destruida.png");
    this.load.image("mesa3D", "assets/objetos/sceneLabBranco01/partTwo/mesa3Destruida.png");
    this.load.image("piaD", "assets/objetos/sceneLabBranco01/partTwo/piaDestruida.png");
    this.load.image("reservasCrioD", "assets/objetos/sceneLabBranco01/partTwo/reservasCrioDestruidas.png");
    this.load.image("comptCimaD", "assets/objetos/sceneLabBranco01/partTwo/comptCimaDestruido.png");
    this.load.image("comptBaixoD", "assets/objetos/sceneLabBranco01/partTwo/comptBaixoDestruido.png");
    this.load.image("criogeniaD", "assets/objetos/sceneLabBranco01/partTwo/criogeniaDestruida.png");
    this.load.image("camara", "assets/objetos/sceneLabBranco01/partOne/camara.png");
  }

  create() {
    registrarTeclaMenu(this);

    this.scaleMapa = 3;

    const { width, height } = this.sys.game.config;
    const cx = width / 2;   // 960
    const cy = height / 2;  // 540

    // MAPA / FUNDO — centralizado na tela
    this.mapa = this.add.image(cx, cy, "CFuturo").setScale(this.scaleMapa);

    // OBJETOS — deslocados pelo mesmo offset aplicado ao mapa
    // (antes o mapa estava em 600,400 — agora está em 960,540)
    // offset: dx = +360, dy = +140
    const dx = cx - 600;
    const dy = cy - 400;

    this.armarioD        = this.add.image(220  + dx,  10  + dy, "armarioD").setScale(3.25).setDepth(1);
    this.armarioD2       = this.add.image(980  + dx,  10  + dy, "armarioD").setScale(3.25).setDepth(1);
    this.alvoD           = this.add.image(215  + dx,  275 + dy, "alvoD").setScale(3).setDepth(1);
    this.alvoD2          = this.add.image(965  + dx,  375 + dy, "alvoD").setScale(3.1).setDepth(1);
    this.criogeniaD      = this.add.image(600  + dx,  6   + dy, "criogeniaD").setScale(3).setDepth(1);
    this.mesa1D          = this.add.image(190  + dx,  140 + dy, "mesa1D").setScale(3).setDepth(1);
    this.mesa1Db         = this.add.image(993  + dx,  518 + dy, "mesa1D").setScale(3).setDepth(1);
    this.mesa2D          = this.add.image(343  + dx,  20  + dy, "mesa2D").setScale(3).setDepth(1);
    this.mesa3D          = this.add.image(858  + dx,  18  + dy, "mesa3D").setScale(3).setDepth(1);
    this.piaD            = this.add.image(203  + dx,  470 + dy, "piaD").setScale(3).setDepth(1);
    this.reservasCrioD   = this.add.image(1023 + dx,  165 + dy, "reservasCrioD").setScale(3).setDepth(1);
    this.comutador1Dprt1 = this.add.image(385  + dx,  220 + dy, "comptCimaD").setScale(3).setDepth(3);
    this.comutador1Dprt2 = this.add.image(385  + dx,  260 + dy, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador2Dprt1 = this.add.image(812  + dx,  220 + dy, "comptCimaD").setScale(3).setDepth(3);
    this.comutador2Dprt2 = this.add.image(812  + dx,  260 + dy, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador3Dprt1 = this.add.image(385  + dx,  410 + dy, "comptCimaD").setScale(3).setDepth(3);
    this.comutador3Dprt2 = this.add.image(385  + dx,  450 + dy, "comptBaixoD").setScale(3).setDepth(1);
    this.comutador4Dprt1 = this.add.image(812  + dx,  410 + dy, "comptCimaD").setScale(3).setDepth(3);
    this.comutador4Dprt2 = this.add.image(812  + dx,  450 + dy, "comptBaixoD").setScale(3).setDepth(1);
    this.camara          = this.add.image(600  + dx,  20  + dy, "camara").setScale(0.25).setDepth(1);
  }
}