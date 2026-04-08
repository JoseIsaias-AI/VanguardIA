export class sceneCreditos extends Phaser.Scene {
  constructor() { super({ key: 'sceneCreditos' }); }

  preload() {
    this.load.video('creditoFinal', 'assets/cutscene/creditoFinal.mp4');
  }

  create() {
    const larguraTela = this.scale.width;
    const alturaTela = this.scale.height;

    this.cameras.main.setBackgroundColor(0x000000);

    const video = this.add.video(larguraTela / 2, alturaTela / 2, 'creditoFinal');
    video.setDisplaySize(larguraTela, alturaTela);
    video.play();

    video.once('complete', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('welcomeScene');
      });
    });

    // Clique ou tecla pula o vídeo
    this.input.keyboard.once('keydown', () => this.pular(video));
    this.input.once('pointerdown', () => this.pular(video));
  }

  pular(video) {
    video.stop();
    this.cameras.main.fadeOut(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('welcomeScene');
    });
  }
}
