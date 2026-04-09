// Classe para exibir um indicador visual de que o jogador pode interagir com algo usando a tecla "E", 
// com uma animação de pulsação para chamar a atenção do jogador, e métodos para mostrar, esconder e destruir o 
// indicador conforme necessário durante o jogo

export class hudTeclaE {
  constructor(scene, config = {}) {
    this.scene = scene;

    // Configurações padrão para a posição, profundidade, fator de rolagem e tamanho do indicador, que podem ser sobrescritas ao criar uma instância da classe
    const {
      x = 0,
      y = 0,
      depth = 1000,
      scrollFactor = 0,
      largura = 58,
      altura = 50,
    } = config;

    // Criação de um container para o indicador, que inclui um fundo gráfico e a letra "E" centralizada, com uma 
    // animação de pulsação configurada para chamar a atenção do jogador quando o indicador estiver visível
    this.container = scene.add.container(x, y).setDepth(depth).setScrollFactor(scrollFactor).setVisible(false).setAlpha(1);

    // Criação do fundo gráfico do indicador, com um estilo de preenchimento e contorno para destacar a letra "E" centralizada
    const fundo = scene.add.graphics();
    fundo.fillStyle(0x081018, 0.92);
    fundo.lineStyle(3, 0x00ffff, 1);
    fundo.fillRoundedRect(-largura / 2, -altura / 2, largura, altura, 12);
    fundo.strokeRoundedRect(-largura / 2, -altura / 2, largura, altura, 12);

    // Criação da letra "E" centralizada no indicador, com um estilo de fonte e cor para garantir boa legibilidade e destaque
    const letra = scene.add.text(0, 0, "E", {
      fontSize: "34px",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#ccffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.container.add([fundo, letra]);

    // Configuração da animação de pulsação do indicador, que alterna a opacidade entre 1 e 0.2 para criar um efeito visual 
    // chamativo, e que fica pausada por padrão para ser controlada pelos métodos mostrar e esconder
    this.tween = scene.tweens.add({
      targets: this.container,
      alpha: 0.2,
      duration: 520,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      paused: true,
    });
  }

  // Método para mostrar o indicador, que torna o container visível e inicia a animação de pulsação para chamar a atenção do jogador
  mostrar() {
    this.container.setVisible(true);
    this.container.setAlpha(1);
    this.tween.resume();
  }

  // Método para esconder que pausa a animação de pulsação
  esconder() {
    this.tween.pause();
    this.container.setAlpha(1);
    this.container.setVisible(false);
  }

  // Método que destrói o container e seus elementos filhos para liberar recursos quando o indicador não for mais necessário no jogo
  destruir() {
    this.tween.stop();
    this.container.destroy(true);
  }
}
