//Cena dedicada apenas para os créditos finais do jogo, 
// onde é exibido um vídeo e o jogador pode optar por pular o vídeo clicando ou 
// pressionando qualquer tecla, ou assistir até o final para depois ser redirecionado para a cena de welcome

export class sceneCreditos extends Phaser.Scene {
  constructor() { super({ key: 'sceneCreditos' }); }

  // aqui são carregados os arquivos necessários para a cena, no caso somente o vídeo dos créditos
  preload() {
    this.load.video('creditoFinal', 'public/assets/cutscene1/CreditoFinal.mp4');
  }

  //aqui é onde a cena é criada, o vídeo é adicionado e configurado para tocar, e também é configurado para que o jogador possa pular o vídeo clicando ou pressionando qualquer tecla
  create() {
    const larguraTela = this.scale.width;
    const alturaTela = this.scale.height;

    this.cameras.main.setBackgroundColor(0x000000);

    // Adiciona o vídeo centralizado e ajusta seu tamanho para preencher a tela
    const video = this.add.video(larguraTela / 2, alturaTela / 2, 'creditoFinal');
    video.setDisplaySize(larguraTela, alturaTela);
    video.play();

    // Quando o vídeo terminar, inicia a transição para a cena de welcome
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

  // Função para pular o vídeo e iniciar a transição para a cena de welcome
  pular(video) {
    video.stop();
    this.cameras.main.fadeOut(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('welcomeScene');
    });
  }
}
