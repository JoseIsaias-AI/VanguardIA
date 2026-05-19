# Desenvolvimento do Jogo Educacional Vanguardia como Estratégia PBL para o Ensino Integrado de Cinemática, Cálculo e Programação

**Autores:** Grupo Vanguardia - Inteli, Instituto de Tecnologia e Liderança  
**Curso/Módulo:** Módulo 1 - 2026  
**Instituição:** Inteli - Instituto de Tecnologia e Liderança  

## Resumo

O ensino de Física, Matemática e Programação frequentemente é fragmentado em disciplinas isoladas, dificultando que estudantes percebam a relação entre modelos teóricos, representação matemática e implementação computacional. Nesse contexto, metodologias ativas, como a Aprendizagem Baseada em Problemas ou Projetos (PBL), podem favorecer a construção de conhecimento por meio da resolução de desafios reais e da produção de artefatos funcionais. Este artigo apresenta o desenvolvimento do jogo educacional **Vanguardia**, criado no Inteli como estudo de caso de aplicação de PBL ao desenvolvimento de jogos digitais. Embora a narrativa do jogo seja voltada ao ensino introdutório de Inteligência Artificial, sua construção exigiu a integração direta de conceitos de cinemática, cálculo e programação web, especialmente na modelagem de movimento, colisões, saltos, trajetórias parabólicas e lógica de interação. A metodologia envolveu análise documental do Game Design Document (GDD), inspeção do código-fonte, descrição das mecânicas implementadas e análise dos registros de playtests. O jogo foi desenvolvido com HTML5, JavaScript, Phaser 3, assets 2D, áudio, vídeo e lógica modular baseada em cenas. Os resultados indicam que o desenvolvimento do Vanguardia permitiu transformar equações de movimento uniforme e uniformemente variado em comportamento interativo, além de gerar um protótipo funcional avaliado positivamente pelos usuários, com média 7,4/10 em testes com público-alvo e percepção média de aprendizagem de 4,0/5. Conclui-se que o desenvolvimento de jogos em PBL favorece a aprendizagem interdisciplinar ao converter conceitos abstratos em problemas concretos de design, matemática e implementação.

**Palavras-chave:** PBL; jogos educacionais; cinemática; programação web; aprendizagem interdisciplinar; Phaser.

## Abstract

The teaching of Physics, Mathematics, and Programming is often fragmented into isolated subjects, making it difficult for students to understand the relationship between theoretical models, mathematical representation, and computational implementation. In this context, active methodologies such as Problem-Based or Project-Based Learning (PBL) can support knowledge construction through the solution of real challenges and the production of functional artifacts. This paper presents the development of the educational game **Vanguardia**, created at Inteli as a case study of PBL applied to digital game development. Although the game's narrative focuses on introductory Artificial Intelligence concepts, its development required the direct integration of kinematics, calculus, and web programming, especially in movement modeling, collision systems, jumps, parabolic trajectories, and interaction logic. The methodology included documentary analysis of the Game Design Document (GDD), source-code inspection, description of implemented mechanics, and analysis of playtest records. The game was developed using HTML5, JavaScript, Phaser 3, 2D assets, audio, video, and modular scene-based logic. Results suggest that developing Vanguardia enabled students to transform equations of uniform and uniformly accelerated motion into interactive behavior, while producing a functional prototype positively evaluated by users, with an average score of 7.4/10 in target-user tests and an average perceived learning score of 4.0/5. The study concludes that PBL-based game development supports interdisciplinary learning by turning abstract concepts into concrete design, mathematical, and programming problems.

**Keywords:** PBL; educational games; kinematics; web programming; interdisciplinary learning; Phaser.

## 1. Introdução

O ensino de Física, Matemática e Programação apresenta um desafio recorrente: conceitos que possuem forte relação entre si costumam ser apresentados de modo separado. Em Física, por exemplo, o estudo da cinemática exige compreensão de grandezas como posição, velocidade, aceleração, tempo e trajetória. Em Matemática, esses mesmos conceitos aparecem por meio de funções, variação, limites, derivadas e modelagem. Em Programação, por sua vez, eles precisam ser convertidos em variáveis, funções, laços de atualização, eventos, colisões e comportamento visual. Quando essas áreas são trabalhadas de maneira desconectada, o estudante pode decorar fórmulas sem compreender sua aplicação prática ou escrever código sem reconhecer o modelo matemático que o sustenta.

Jogos digitais oferecem um ambiente fértil para enfrentar esse problema, pois suas mecânicas dependem de sistemas físicos e matemáticos visíveis: personagens se movem, saltam, colidem, aceleram, desaceleram e reagem a comandos do jogador. Ao desenvolver um jogo, o estudante deixa de tratar a equação como objeto abstrato e passa a utilizá-la como instrumento de funcionamento de uma experiência interativa. A relação entre teoria e prática torna-se imediata: se a velocidade está alta demais, o personagem fica difícil de controlar; se a aceleração é mal definida, o salto não parece natural; se a colisão falha, o jogador atravessa objetos; se o tempo da animação está incorreto, a trajetória não atinge o destino planejado.

No contexto do Inteli - Instituto de Tecnologia e Liderança, a metodologia PBL orienta a aprendizagem por meio de problemas, projetos, entregas progressivas e trabalho em equipe. O jogo **Vanguardia**, desenvolvido por estudantes do Módulo 1 em 2026, constitui um exemplo dessa abordagem. O projeto tem como produto final um jogo web educacional de aventura, com narrativa, fases, minigames, diálogos, cutscenes e mecânicas interativas. De acordo com a documentação do projeto, o jogo tem como propósito principal apresentar conceitos introdutórios de Inteligência Artificial, como reconhecimento de padrões, redes neurais, visão computacional, limpeza de dados, modelos generativos e ética em IA. Entretanto, para tornar essa experiência funcional, a equipe precisou aplicar conceitos de Física, Matemática e Programação em diferentes camadas do desenvolvimento.

Este artigo analisa o Vanguardia como um estudo de caso de aprendizagem interdisciplinar baseada em PBL. O foco não está apenas no conteúdo narrativo ensinado ao jogador, mas também no processo de desenvolvimento do jogo como estratégia pedagógica para integrar cinemática, cálculo e programação. A pergunta orientadora é: **de que modo o desenvolvimento de um jogo educacional em metodologia PBL pode favorecer a aprendizagem integrada de Física, Matemática e Programação?**

O objetivo geral deste trabalho é descrever e analisar como o desenvolvimento do Vanguardia mobilizou conceitos físico-matemáticos e computacionais na criação de mecânicas de jogo. Como objetivos específicos, busca-se: identificar as principais mecânicas relacionadas a movimento e interação; explicar a modelagem matemática utilizada em trajetórias, saltos e deslocamentos; relacionar essa modelagem à implementação em JavaScript e Phaser; analisar os resultados de testes com usuários; e discutir as contribuições e limitações do uso de jogos digitais como artefatos educacionais em PBL.

## 2. Fundamentação Teórica

### 2.1 Aprendizagem Baseada em Problemas e Projetos

A sigla PBL pode ser associada tanto à **Problem-Based Learning** quanto à **Project-Based Learning**. Embora existam diferenças conceituais entre essas abordagens, ambas compartilham princípios relevantes para o presente trabalho: centralidade do estudante, resolução de problemas complexos, investigação ativa, colaboração, tomada de decisão e produção de uma solução concreta. Savery (2006) define a aprendizagem baseada em problemas como uma abordagem centrada no estudante, na qual problemas autênticos são utilizados como ponto de partida para investigação e aprendizagem. Hmelo-Silver (2004) destaca que o PBL favorece o desenvolvimento de conhecimento flexível, habilidades de resolução de problemas, aprendizagem autodirigida e colaboração.

No contexto do desenvolvimento de jogos, esses princípios tornam-se particularmente adequados. Criar um jogo funcional exige que o grupo resolva problemas abertos e interdependentes: definir regras, construir narrativa, implementar mecânicas, testar hipóteses, equilibrar dificuldade, corrigir bugs e validar a experiência com usuários. O projeto não se resume a aplicar uma fórmula pronta; ele exige ciclos de tentativa, erro, revisão e melhoria. Assim, o PBL aproxima-se de uma prática de engenharia e design, na qual o conhecimento é mobilizado para produzir um artefato observável.

No Inteli, essa lógica aparece na organização por módulos, grupos, entregas e projetos reais. A própria descrição institucional da metodologia indica que os estudantes trabalham com metaprojetos, Learning Backlog e desenvolvimento em grupo de protótipos para problemas reais, incluindo, no primeiro módulo, desenvolvimento de games, algoritmos, técnicas de programação e cinemática aplicada a jogos (INTELI, 2026). O Vanguardia foi desenvolvido como produto educacional ao longo do trimestre, com documentação, prototipação, implementação, testes e revisão. Essa estrutura favorece a integração entre disciplinas porque obriga os estudantes a articular conhecimentos de diferentes áreas para responder a um desafio comum.

### 2.2 Jogos Educacionais e Aprendizagem Baseada em Jogos

Jogos educacionais são ambientes interativos projetados para combinar objetivos pedagógicos e objetivos lúdicos. A literatura sobre game-based learning sugere que jogos podem contribuir para motivação, engajamento, feedback imediato e aprendizagem situada, desde que a mecânica esteja alinhada ao conteúdo. Connolly et al. (2012), em revisão sistemática sobre jogos digitais e serious games, apontam evidências de impactos positivos em aprendizagem e engajamento, embora ressaltem a necessidade de avaliações bem estruturadas. Wouters et al. (2013), em meta-análise, identificam que serious games podem ser mais eficazes em aprendizagem do que métodos convencionais em determinados contextos, especialmente quando combinados com suporte pedagógico adequado.

No caso do Vanguardia, o jogo utiliza narrativa e minigames para transformar conceitos abstratos em ações. A rede neural torna-se um sistema visual com neurônios ativáveis; a visão computacional aparece como coleta de cristais verdadeiros; a limpeza de dados é representada por uma mecânica de remoção de ruídos com o mouse; e a ética em IA é trabalhada por meio da classificação de prompts como adequados ou inadequados. Ainda que o foco narrativo seja IA, a construção dessas interações depende de princípios físico-matemáticos e computacionais, como tempo, posição, velocidade, colisão, atualização por frame, entrada do usuário e estado de jogo.

### 2.3 Cinemática: Movimento Uniforme e Movimento Uniformemente Variado

A cinemática estuda o movimento dos corpos sem considerar diretamente suas causas. Dois modelos fundamentais são o Movimento Uniforme (MU) e o Movimento Uniformemente Variado (MUV). No MU, a velocidade é constante e a aceleração é nula. A posição em função do tempo pode ser representada por:

$$
x(t) = x_i + v_x \cdot t
$$

No MUV, a aceleração é constante e a velocidade varia linearmente com o tempo. As equações utilizadas são:

$$
v(t) = v_0 + a \cdot t
$$

$$
s(t) = s_0 + v_0 \cdot t + \frac{1}{2} a t^2
$$

Essas equações são fundamentais em jogos 2D, especialmente para saltos, quedas, projéteis e trajetórias parabólicas. Em um motor gráfico, a posição do objeto precisa ser recalculada continuamente ao longo do tempo. Assim, a cinemática deixa de ser apenas conteúdo de resolução algébrica e passa a ser uma regra que determina o comportamento visual do jogo.

### 2.4 Cálculo, Taxa de Variação e Modelagem

A relação entre cálculo e cinemática aparece na interpretação de velocidade e aceleração como taxas de variação. A velocidade pode ser compreendida como a taxa de variação da posição em relação ao tempo; a aceleração, como a taxa de variação da velocidade. Em termos intuitivos, quando a posição muda muito em pouco tempo, a velocidade é alta; quando a velocidade muda ao longo do tempo, há aceleração.

No desenvolvimento de jogos, esse raciocínio aparece de forma discreta. O computador não calcula o movimento em tempo contínuo, mas sim em atualizações sucessivas, geralmente no ciclo de atualização do motor. A cada frame, o jogo calcula o tempo decorrido, atualiza variáveis e reposiciona objetos. Desse modo, os estudantes precisam transpor a ideia matemática de função contínua para uma implementação computacional baseada em incrementos de tempo.

Além disso, o Vanguardia utiliza funções trigonométricas para movimento de plataformas. Na fase de plataformas, por exemplo, plataformas móveis são deslocadas com base em funções do tipo:

$$
y(t) = y_c + A \cdot \sin(t)
$$

Esse tipo de implementação evidencia a relação entre Matemática e experiência de jogo: amplitude, centro de oscilação e tempo controlam diretamente a dificuldade e o ritmo da fase.

### 2.5 Programação Web, JavaScript e Phaser

O Vanguardia foi desenvolvido para navegador com HTML5, JavaScript e Phaser 3. O HTML organiza a estrutura mínima da página e carrega o contêiner do jogo. O JavaScript implementa lógica, estados, cenas, eventos, movimentação, colisões e interação com teclado e mouse. O Phaser 3 atua como motor de jogo, oferecendo recursos para renderização, sprites, câmera, áudio, física Arcade, carregamento de assets, cenas e entrada do usuário.

Do ponto de vista pedagógico, essa escolha tecnológica tem duas vantagens. A primeira é o acesso: o jogo roda no navegador, sem instalação, reduzindo barreiras técnicas para usuários. A segunda é a transparência: o código em JavaScript permite observar diretamente como conceitos matemáticos são convertidos em funções, variáveis e atualizações de estado. O projeto também utiliza organização modular por arquivos, com cenas como `faseUm.js`, `faseDois.js`, `faseTres.js`, `faseQuatro.js`, `faseCinco.js`, `sceneLbPassado.js`, `sceneLbFuturo.js` e `main.js`.

## 3. Metodologia

### 3.1 Abordagem Pedagógica

A metodologia adotada no projeto foi baseada em PBL, com desenvolvimento colaborativo de um jogo digital como resposta a um desafio educacional. A equipe do Vanguardia trabalhou em grupo, produziu documentação, desenvolveu protótipos, implementou fases, realizou testes e revisou o MVP. O histórico de versões registrado no repositório indica uma evolução incremental:

| Versão | Data | Entrega principal |
|---|---:|---|
| 0.1.0 | 13/02/2026 | Primeira versão com duas cenas interativas |
| 0.2.0 | 27/02/2026 | Desenvolvimento de cena e parte visual |
| 0.3.0 | 13/03/2026 | Criação de fase, diálogos mais complexos e cutscene |
| 0.4.0 | 27/03/2026 | Finalização das fases, aprimoramento visual e trilha sonora |
| 0.5.0 | 10/04/2026 | Versão final do MVP, com mecânicas e cenas narrativas implementadas |

Essa progressão é coerente com a lógica PBL: o problema inicial não foi resolvido em uma única etapa, mas por ciclos de desenvolvimento e validação. A cada fase, os estudantes precisaram tomar decisões técnicas e pedagógicas, avaliando se as mecânicas eram compreensíveis, se o jogo estava funcional e se a proposta educacional permanecia clara.

### 3.2 Natureza do Estudo

Este trabalho caracteriza-se como um estudo de caso descritivo e qualitativo, apoiado por dados quantitativos simples extraídos dos playtests. Foram utilizadas quatro fontes principais:

1. análise documental do `README.md` e do `documents/gdd.md`;
2. inspeção do código-fonte do jogo, especialmente arquivos de cena e movimentação;
3. análise das tabelas de casos de teste e registros de playtests;
4. revisão bibliográfica sobre PBL, jogos educacionais, cinemática e programação aplicada ao ensino.

O estudo não realiza um experimento controlado com grupo de comparação nem aplicação de pré-teste e pós-teste. Portanto, as conclusões sobre aprendizagem devem ser interpretadas como indícios baseados em documentação, implementação e percepção dos participantes, não como prova estatística de eficácia educacional.

### 3.3 Desenvolvimento do Jogo

O Vanguardia é um jogo web 2D de aventura, história, ação e puzzles. O jogador acompanha Sophia, uma cientista que desperta em 2098 após décadas em criogenia, em um mundo afetado pelo uso indevido de Inteligência Artificial. A personagem é auxiliada por Asimov, robô que orienta parte da progressão narrativa e educacional. O objetivo narrativo é restaurar o laboratório e recuperar sistemas essenciais para a humanidade.

A progressão do jogo é organizada em cenas e fases. A primeira etapa estabelece contexto narrativo no laboratório. Em seguida, o jogador passa por uma fase de desvio de obstáculos com Asimov, uma fase de rede neural e válvula softmax, uma fase de plataformas e coleta de cristais, uma fase de limpeza de ruídos/overfitting e uma fase final de avaliação ética de prompts.

![Tela inicial do jogo Vanguardia](./assets/novaTelaInicial.png)

**Figura 1 - Tela inicial do jogo Vanguardia.** Fonte: Grupo Vanguardia (2026).

Embora as fases ensinem conceitos de IA ao jogador, sua implementação também constitui um exercício aplicado de Física, Matemática e Programação para os desenvolvedores. A fase de plataformas, por exemplo, exige controle de gravidade, salto, colisão e movimento oscilatório. A animação da pedra no cenário utiliza explicitamente equações de MU e MUV. A movimentação geral da personagem utiliza velocidade, desaceleração, limitação vetorial e normalização para impedir que o movimento diagonal ultrapasse a velocidade máxima.

### 3.4 Tecnologias Utilizadas

As principais tecnologias e recursos utilizados no Vanguardia foram:

| Tecnologia/Recurso | Função no projeto |
|---|---|
| HTML5 | Estrutura da página e contêiner do jogo |
| CSS | Ajuste básico de tela, margem, dimensão e centralização |
| JavaScript | Lógica de jogo, cenas, eventos, estados e interações |
| Phaser 3.55.2 | Motor de jogo 2D, renderização, input, áudio, física Arcade e gerenciamento de cenas |
| Canvas/DOM | Apoio a elementos visuais, leitura de pixels para colisão e exibição de mídias |
| PNG/GIF/MP4/MP3 | Assets visuais, animações, cutscenes, trilha sonora e efeitos |
| Piskel | Criação de sprites e elementos visuais em pixel art |

O arquivo `index.html` carrega o Phaser via CDN e inicia o jogo a partir de `public/src/main.js`. A configuração principal utiliza resolução de 1920x1080, `Phaser.AUTO`, escala `FIT`, centralização automática e física Arcade. As cenas são registradas em sequência, incluindo `welcomeScene`, `sceneInicial`, `sceneLbPassado`, `sceneLbFuturo`, `faseUm`, `faseDois`, `faseTres`, `faseQuatro`, `faseCinco` e `sceneCreditos`.

### 3.5 Modelagem Matemática Implementada

A documentação do projeto apresenta uma seção específica de implementação matemática de animação/movimento. O caso mais explícito é a animação de uma pedra na fase 3, implementada por meio da função `launchStoneProjectile` no arquivo `faseTres.js`. O modelo utiliza:

| Parâmetro | Valor |
|---|---:|
| Posição inicial X | 1065 px |
| Posição inicial Y | 235 px |
| Posição final X | 861 px |
| Posição final Y | 235 px |
| Duração total | 2 s |
| Aceleração vertical | 200 px/s² |

No eixo X, aplica-se Movimento Uniforme:

$$
v_x = \frac{x_f - x_i}{T} = \frac{861 - 1065}{2} = -102 \text{ px/s}
$$

Logo:

$$
x(t) = 1065 - 102t
$$

No eixo Y, aplica-se Movimento Uniformemente Variado. Considerando que a pedra parte de `y = 235` px e retorna ao mesmo nível em 2 segundos, com aceleração vertical positiva de 200 px/s², a velocidade inicial calculada é:

$$
v_{y0} = \frac{(y_f - y_i) - \frac{1}{2} a_y T^2}{T}
$$

$$
v_{y0} = \frac{0 - \frac{1}{2} \cdot 200 \cdot 4}{2} = -200 \text{ px/s}
$$

Assim:

$$
v_y(t) = -200 + 200t
$$

$$
y(t) = 235 - 200t + 100t^2
$$

No sistema de coordenadas do Phaser, o eixo Y cresce para baixo; portanto, velocidade vertical negativa representa movimento para cima na tela. O pico da trajetória ocorre em `t = 1 s`, quando `v_y = 0`, e a posição vertical atinge `y = 135` px, isto é, 100 px acima do ponto inicial.

![Gráfico das trajetórias da pedra](./assets/grafico_trajetorias.svg)

**Figura 2 - Visualização das trajetórias Δx(t) e Δy(t).** Fonte: Grupo Vanguardia (2026).

Além dessa trajetória, o projeto utiliza outros elementos físico-matemáticos:

| Mecânica | Conceito físico-matemático | Implementação computacional |
|---|---|---|
| Movimento de Sophia | Velocidade, atrito, limitação vetorial | Multiplicação da velocidade por fator de atrito e `Phaser.Math.Clamp` |
| Movimento diagonal | Vetores e módulo | Normalização por `sqrt(vx² + vy²)` |
| Salto | MUV, impulso vertical e gravidade | `setVelocityY(-180)` e `setGravityY(200)` |
| Pedra em arco | MU no eixo X e MUV no eixo Y | Atualização por `delta` em função do tempo |
| Plataformas móveis | Função seno, amplitude e período | `posição = centro + amplitude * sin(t)` |
| Colisão | Geometria, bounding boxes e leitura de pixel | Física Arcade e análise de pixels de imagem |

### 3.6 Avaliação e Testes

A avaliação do MVP envolveu casos de teste funcionais e playtests. Os casos de teste verificaram navegação, movimentação, colisões, diálogos, transições, abertura de baús, ativação da rede neural, fase de plataformas, limpeza da imagem, classificação de prompts e créditos finais.

Os playtests foram conduzidos em ambiente de sala de aula, com estudantes do primeiro ano do Inteli, entre 17 e 20 anos, utilizando computadores com Windows 11 e navegador Google Chrome. A documentação registra dois grupos de avaliação: testes de guerrilha e testes com público-alvo. Os testes de guerrilha reuniram feedbacks qualitativos de oito participantes, com notas entre 7,0 e 9,0. Os testes com público-alvo reuniram cinco formulários com escalas de 1 a 5 e nota geral de 1 a 10.

## 4. Resultados

### 4.1 Produto Desenvolvido

O principal resultado foi um MVP funcional do jogo Vanguardia, executado diretamente no navegador. O jogo possui tela inicial, menu, cenas narrativas, fases interativas, cutscenes, trilha sonora, efeitos sonoros, diálogos e créditos. A arquitetura por cenas permite organizar a progressão do jogador e separar responsabilidades de código, o que favorece manutenção e expansão.

![Diagrama de cenas do jogo](./assets/diagramaDeCenas.jpg.png)

**Figura 3 - Diagrama de cenas do Vanguardia.** Fonte: Grupo Vanguardia (2026).

O jogo implementa uma sequência de desafios com objetivos educacionais específicos. Na fase de obstáculos, o jogador controla Asimov e precisa desviar de detritos, exercitando resposta rápida e reconhecimento de padrões. Na fase da rede neural, o jogador arrasta valores binários para neurônios de entrada, ativa camadas densas e aciona a válvula softmax. Na fase de plataformas, Sophia coleta cristais verdadeiros e evita cristais falsos. Na fase de limpeza, o jogador remove ruídos de uma imagem para aumentar sua nitidez sem ultrapassar o limite de overfitting. Na fase final, classifica prompts éticos e antiéticos, precisando atingir pelo menos 7 acertos em 10 perguntas.

### 4.2 Integração entre Física, Matemática e Programação

A integração interdisciplinar aparece principalmente quando as regras de movimento são implementadas. A função `launchStoneProjectile` traduz diretamente as equações de MU e MUV para código JavaScript. O trecho a seguir resume a lógica central:

```javascript
const ay = 200;
const vx = (xf - xi) / tempoTotal;
const vy0 = ((yf - yi) - 0.5 * ay * tempoTotal * tempoTotal) / tempoTotal;

const x = xi + vx * t;
const vy = vy0 + ay * t;
const y = yi + vy0 * t + 0.5 * ay * t * t;
```

Esse trecho evidencia uma aprendizagem que dificilmente se limita à memorização. Para que a pedra se mova corretamente, o estudante precisa compreender o significado de cada variável, a convenção do eixo Y, o efeito do tempo no movimento e o modo como a atualização por frame altera a posição visual do objeto.

Outro exemplo ocorre no arquivo `movimentacao.js`, em que a velocidade da personagem é reduzida por atrito e limitada por velocidade máxima. A normalização do vetor de velocidade evita que o movimento diagonal fique mais rápido que o movimento horizontal ou vertical:

```javascript
const mag = Math.sqrt(sprite.body.velocity.x ** 2 + sprite.body.velocity.y ** 2);
if (mag > velocidadeMax) {
  sprite.body.velocity.x = (sprite.body.velocity.x / mag) * velocidadeMax;
  sprite.body.velocity.y = (sprite.body.velocity.y / mag) * velocidadeMax;
}
```

Esse tipo de solução exige conhecimento matemático de vetores e módulo, além de raciocínio de programação para detectar e corrigir um problema comum em jogos 2D. O resultado pedagógico está justamente na necessidade de articular teoria e prática: o problema aparece como comportamento indesejado no jogo, e a solução exige formulação matemática e implementação computacional.

### 4.3 Resultados dos Testes com Usuários

Nos testes com público-alvo, cinco participantes responderam ao formulário. A média da nota geral do jogo foi **7,4/10**. A percepção média de aprendizagem foi **4,0/5**, sugerindo que os participantes perceberam algum ganho educacional durante a experiência. Os indicadores médios foram:

| Indicador | Escala | Média |
|---|---:|---:|
| Nota geral do jogo | 1 a 10 | 7,4 |
| Percepção de aprendizagem | 1 a 5 | 4,0 |
| Frustração/irritação | 1 a 5 | 1,6 |
| Tédio/cansaço | 1 a 5 | 2,2 |
| Confusão/desconexão | 1 a 5 | 1,8 |
| Clareza do objetivo | 1 a 5 | 3,8 |
| Clareza dos minigames | 1 a 5 | 3,4 |
| Confusão em comandos/interações | 1 a 5 | 3,0 |
| Desconforto dos controles | 1 a 5 | 2,0 |

Os resultados indicam boa recepção geral, baixa frustração e percepção positiva de aprendizagem. Ao mesmo tempo, a média de confusão em comandos/interações aponta uma limitação importante de usabilidade. Parte dos jogadores relatou que os comandos não eram suficientemente intuitivos ou que algumas fases exigiam instruções mais claras.

Nos testes de guerrilha, a média aproximada das notas registradas foi **7,8/10** entre oito participantes. Os comentários positivos destacaram os minigames, a narrativa, a relação com Asimov, o design, as animações e a variedade de fases. As críticas recorrentes envolveram excesso de texto, necessidade de HUD mais claro, bugs de colisão, instruções vagas e ajustes de ritmo.

### 4.4 Aprendizagem Observada no Processo PBL

Além da recepção dos jogadores, o processo de desenvolvimento evidencia aprendizagem por parte da equipe. Ao construir o Vanguardia, os estudantes precisaram:

1. transformar um problema educacional em proposta de jogo;
2. dividir o produto em fases, cenas, mecânicas e assets;
3. representar conceitos abstratos por meio de interações visuais;
4. aplicar cinemática em trajetórias, saltos e plataformas;
5. utilizar cálculo como taxa de variação e atualização temporal;
6. programar estados, eventos, colisões, entradas e transições;
7. testar hipóteses com usuários reais;
8. revisar a interface com base em feedback.

Essa sequência é coerente com a proposta PBL porque o conhecimento surge da necessidade de resolver problemas concretos. A equipe não estudou MU e MUV apenas para resolver exercícios, mas para controlar uma animação. Não utilizou vetores apenas como conteúdo matemático, mas para limitar velocidade diagonal. Não escreveu JavaScript apenas como sintaxe, mas como meio de dar comportamento a personagens, objetos e sistemas.

## 5. Discussão

### 5.1 Pontos Fortes

O primeiro ponto forte do projeto é a integração entre conteúdo, mecânica e narrativa. O Vanguardia evita apresentar conceitos apenas em textos explicativos; ele tenta converter o conteúdo em ações do jogador. Essa decisão está alinhada à literatura sobre jogos educacionais, que ressalta a importância de feedback, interação e aprendizagem situada.

O segundo ponto forte é a aplicação concreta de Física e Matemática no desenvolvimento. A modelagem da pedra com MU e MUV é um exemplo claro de como uma equação pode deixar de ser abstrata e tornar-se parte de uma experiência visual. O estudante consegue verificar se a trajetória está correta observando o jogo, comparando valores e depurando o código.

O terceiro ponto forte é a estrutura iterativa do PBL. O histórico de versões mostra evolução progressiva do MVP, e os playtests permitiram identificar problemas reais de usabilidade. A aprendizagem, nesse caso, não ocorre apenas antes do desenvolvimento, mas durante todo o ciclo de construção, teste e revisão.

### 5.2 Limitações

A principal limitação do estudo é o tamanho da amostra. Os testes com público-alvo envolveram apenas cinco participantes, o que impede generalizações estatísticas. Além disso, não houve pré-teste e pós-teste para medir ganho de aprendizagem em Física, Matemática ou Programação. Os dados disponíveis indicam percepção de aprendizagem e qualidade da experiência, mas não comprovam, isoladamente, aumento de desempenho acadêmico.

Outra limitação é que o jogo, em sua narrativa final, está mais diretamente orientado ao ensino de Inteligência Artificial do que ao ensino explícito de cinemática. A relação com Física, Matemática e Programação aparece de forma mais intensa no processo de desenvolvimento e em algumas mecânicas específicas, especialmente movimento, salto, trajetória e plataformas. Para que o jogo ensine cinemática diretamente ao jogador, seria necessário tornar essas relações mais explícitas dentro da interface, por exemplo exibindo gráficos, variáveis, desafios de previsão de trajetória ou problemas de ajuste de parâmetros.

Também foram identificadas limitações de UX. Os feedbacks apontam excesso de texto, instruções pouco claras em alguns momentos, inconsistência de comandos e necessidade de HUD mais orientativo. Esses pontos são relevantes porque, em jogos educacionais, dificuldades de interface podem competir com o objetivo pedagógico e aumentar carga cognitiva desnecessária.

### 5.3 Comparação com Ensino Tradicional

No ensino tradicional, conceitos como velocidade, aceleração e trajetória parabólica costumam ser apresentados por meio de fórmulas, exemplos no quadro e listas de exercícios. Essa abordagem é importante, mas pode fazer com que o estudante veja a Matemática como um conjunto de procedimentos isolados. No desenvolvimento de jogos, as mesmas equações ganham consequências imediatas: uma alteração na aceleração muda o salto; uma velocidade inicial incorreta faz o projétil errar o alvo; uma colisão mal definida quebra a jogabilidade.

Assim, o PBL aplicado a jogos não substitui o ensino conceitual, mas amplia suas possibilidades. A teoria continua necessária, porém passa a ser usada para resolver problemas concretos. O estudante aprende que modelar é escolher parâmetros, testar resultados, interpretar erros e ajustar a implementação.

### 5.4 Possibilidades de Melhoria

Para fortalecer o potencial educacional do Vanguardia em Física, Matemática e Programação, recomenda-se:

1. incluir uma fase ou modo de laboratório em que o jogador ajuste velocidade, aceleração e tempo para atingir alvos;
2. exibir gráficos de posição, velocidade e aceleração durante a trajetória;
3. criar desafios em que o jogador preveja o alcance de um projétil antes de executá-lo;
4. adicionar feedback visual sobre vetores de velocidade e aceleração;
5. registrar telemetria de erros, tempo por fase e tentativas;
6. aplicar pré-teste e pós-teste para medir aprendizagem;
7. adaptar controles e HUD para reduzir confusão;
8. criar uma versão mobile ou responsiva, caso o público-alvo exija acesso por celulares;
9. expandir o conteúdo para dinâmica, energia, colisões e forças;
10. criar apêndices interativos para explicar como trechos de código representam equações.

## 6. Conclusão

O desenvolvimento do Vanguardia demonstra que jogos digitais podem funcionar como artefatos integradores em metodologias PBL. Ao longo do projeto, os estudantes precisaram articular Física, Matemática e Programação para construir mecânicas funcionais de movimento, salto, trajetória, colisão e interação. A modelagem de MU e MUV na fase 3 é um exemplo direto dessa integração, pois transforma equações de cinemática em comportamento visual programado.

O objetivo do trabalho foi atingido parcialmente em dois níveis. No nível do desenvolvimento, o projeto mostra de forma consistente como o PBL favorece aprendizagem interdisciplinar, já que os conceitos foram mobilizados para resolver problemas reais do jogo. No nível do jogador, o Vanguardia obteve avaliação positiva e percepção de aprendizagem relevante, mas ainda são necessários instrumentos mais rigorosos para medir ganhos específicos em Física, Matemática e Programação.

Como impacto pedagógico, o projeto evidencia que aprender por meio da construção de jogos pode tornar conceitos abstratos mais concretos, motivar a investigação e aproximar teoria de prática. Como trabalho futuro, recomenda-se ampliar a coleta de dados, incluir avaliações antes e depois da experiência, explicitar mais os conceitos físico-matemáticos dentro do jogo e desenvolver novas fases voltadas a dinâmica, energia e programação interativa.

## 7. Referências

BARROWS, Howard S. A taxonomy of problem-based learning methods. **Medical Education**, v. 20, n. 6, p. 481-486, 1986. DOI: https://doi.org/10.1111/j.1365-2923.1986.tb01386.x.

CONNOLLY, Thomas M.; BOYLE, Elizabeth A.; MACARTHUR, Ewan; HAINEY, Thomas; BOYLE, James M. A systematic literature review of empirical evidence on computer games and serious games. **Computers & Education**, v. 59, n. 2, p. 661-686, 2012. DOI: https://doi.org/10.1016/j.compedu.2012.03.004.

ECMA INTERNATIONAL. **ECMAScript 2025 Language Specification**. 16th edition, 2025. Disponível em: https://tc39.es/ecma262/. Acesso em: 17 maio 2026.

GRUPO VANGUARDIA. **GDD - Game Design Document - Módulo 1 - Inteli**. São Paulo: Inteli, 2026. Disponível no repositório do projeto Vanguardia.

GRUPO VANGUARDIA. **README do projeto Vanguardia**. São Paulo: Inteli, 2026. Disponível em: https://graduacao.pages.git.inteli.edu.br/2026-1a/t29/g03/. Acesso em: 17 maio 2026.

HALLIDAY, David; RESNICK, Robert; WALKER, Jearl. **Fundamentos de Física: Mecânica**. 10. ed. Rio de Janeiro: LTC, 2016.

HMELO-SILVER, Cindy E. Problem-Based Learning: What and How Do Students Learn? **Educational Psychology Review**, v. 16, p. 235-266, 2004. DOI: https://doi.org/10.1023/B:EDPR.0000034022.16470.f3.

INTELI - INSTITUTO DE TECNOLOGIA E LIDERANÇA. **Metodologia do Inteli**. Disponível em: https://www.inteli.edu.br/metodologia-do-inteli/. Acesso em: 17 maio 2026.

MOZILLA. **MDN Web Docs: JavaScript**. Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript. Acesso em: 17 maio 2026.

NUSSENZVEIG, Herch Moysés. **Curso de Física Básica: Mecânica**. 5. ed. São Paulo: Blucher, 2013.

PEDERSEN, Morten K.; SVENTRUP, Mikkel; et al. DiffGame: Game-based Mathematics Learning for Physics. **arXiv**, 2016. Disponível em: https://arxiv.org/abs/1601.08016. Acesso em: 17 maio 2026.

PHASER. **Phaser 3 Documentation**. Disponível em: https://docs.phaser.io/phaser/getting-started/what-is-phaser. Acesso em: 17 maio 2026.

SAVERY, John R. Overview of Problem-based Learning: Definitions and Distinctions. **Interdisciplinary Journal of Problem-Based Learning**, v. 1, n. 1, 2006. DOI: https://doi.org/10.7771/1541-5015.1002.

SVENSSON, K.; ERIKSSON, U.; PENDRILL, A.-M. Programming and its affordances for physics education: A social semiotic and variation theory approach to learning physics. **Physical Review Physics Education Research**, v. 16, 010127, 2020. DOI: https://doi.org/10.1103/PhysRevPhysEducRes.16.010127.

WHATWG. **HTML Living Standard**. Disponível em: https://html.spec.whatwg.org/. Acesso em: 17 maio 2026.

WOUTERS, Pieter; VAN NIMWEGEN, Christof; VAN OOSTENDORP, Herre; VAN DER SPEK, Erik D. A meta-analysis of the cognitive and motivational effects of serious games. **Journal of Educational Psychology**, v. 105, n. 2, p. 249-265, 2013. DOI: https://doi.org/10.1037/a0031311.

## 8. Apêndices

### Apêndice A - Trecho de Código da Trajetória Parabólica

O trecho abaixo, presente em `public/src/scenes/faseTres.js`, implementa uma trajetória em arco combinando MU no eixo X e MUV no eixo Y:

```javascript
function launchStoneProjectile(scene, stone, xi, yi, xf, yf, duration) {
  const tempoTotal = duration;
  const ay = 200;
  const vx = (xf - xi) / tempoTotal;
  const vy0 = ((yf - yi) - 0.5 * ay * tempoTotal * tempoTotal) / tempoTotal;
  let elapsed = 0;

  function onUpdate(time, delta) {
    elapsed += delta / 1000;
    const t = Math.min(elapsed, tempoTotal);
    const x = xi + vx * t;
    const vy = vy0 + ay * t;
    const y = yi + vy0 * t + 0.5 * ay * t * t;

    stone.x = x;
    stone.y = y;

    if (t >= tempoTotal) {
      scene.events.off('update', onUpdate);
      stone.destroy();
      const novaPedra = scene.add.image(xi, yi, "pedra");
      scene.pedraFundo = novaPedra;
      launchStoneProjectile(scene, novaPedra, xi, yi, xf, yf, tempoTotal);
    }
  }

  scene.events.on('update', onUpdate);
}
```

### Apêndice B - Tabela de Validação da Trajetória

| t (s) | x(t) px | vx (px/s) | y(t) px | vy(t) px/s | ay (px/s²) |
|---:|---:|---:|---:|---:|---:|
| 0,000 | 1065,00 | -102,00 | 235,00 | -200,00 | 200,00 |
| 0,500 | 1014,00 | -102,00 | 185,00 | -100,00 | 200,00 |
| 1,000 | 963,00 | -102,00 | 135,00 | 0,00 | 200,00 |
| 1,500 | 912,00 | -102,00 | 185,00 | +100,00 | 200,00 |
| 2,000 | 861,00 | -102,00 | 235,00 | +200,00 | 200,00 |

### Apêndice C - Sugestões de Figuras para a Versão Final

| Figura | Arquivo sugerido | Uso no artigo |
|---|---|---|
| Tela inicial | `documents/assets/novaTelaInicial.png` | Apresentar identidade visual |
| Diagrama de cenas | `documents/assets/diagramaDeCenas.jpg.png` | Explicar fluxo do jogo |
| Fase 1 | `documents/assets/printFase1.png` | Mostrar mecânica de desvio |
| Fase de plataformas | `documents/assets/telaFase.jpeg` | Mostrar salto e coleta |
| Gráfico de trajetória | `documents/assets/grafico_trajetorias.svg` | Evidenciar MU e MUV |
| Tela de diálogo | `documents/assets/printDialogo.png` | Mostrar narrativa educacional |

### Apêndice D - Proposta de Instrumento de Avaliação Futuro

Para uma próxima versão do estudo, recomenda-se aplicar um pré-teste e um pós-teste com perguntas como:

1. Dada uma posição inicial, uma velocidade e um tempo, calcular a posição final em MU.
2. Identificar o instante em que um projétil atinge o ponto mais alto da trajetória.
3. Explicar por que uma velocidade vertical negativa representa subida no sistema de coordenadas do Phaser.
4. Relacionar derivada de posição com velocidade e derivada de velocidade com aceleração.
5. Interpretar um trecho simples de JavaScript que atualiza posição por tempo.
6. Ajustar parâmetros de velocidade e aceleração para que um objeto atinja um alvo.

Essas questões permitiriam medir de forma mais objetiva se a experiência com o jogo e com seu desenvolvimento contribui para aprendizagem de Física, Matemática e Programação.
