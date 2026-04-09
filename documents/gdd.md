<img src="./assets/logointeli.png">

# GDD - Game Design Document - Módulo 1 - Inteli

## Vanguardia

#### Nomes dos integrantes do grupo

- <a href="https://www.linkedin.com/in/ana-carvalho-27268634b">Ana Luiza Lima de Carvalho</a>
- <a href="https://www.linkedin.com/in/dante-cavalcante-rocha-4555993b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios">Dante Cavalcante Rocha</a>
- <a href="https://www.linkedin.com/in/eduardo-quessada-batistussi-68889028a/">Eduardo Quessada Batistussi</a> 
- <a href="https://www.linkedin.com/in/gustavo-gomes-437b94312/">Gustavo da Silva Gomes</a> 
- <a href="https://www.linkedin.com/in/joseisaias">José Isaías Menezes Santos</a>
- <a href="https://www.linkedin.com/in/leticia-antunes-0a3a843aa/">Leticia Antunes de Freitas</a> 
- <a href="https://www.linkedin.com/in/lucas-andrade-silva-1b7b82375">Lucas Andrade Silva</a> 
- <a href="https://www.linkedin.com/in/tiago-t-335a833aa/">Tiago Pires Tavolieri</a>

## Sumário

[1. Introdução](#c1)

[2. Visão Geral do Jogo](#c2)

[3. Game Design](#c3)

[4. Desenvolvimento do jogo](#c4)

[5. Casos de Teste](#c5)

[6. Conclusões e trabalhos futuros](#c6)

[7. Referências](#c7)

[Anexos](#c8)

<br>


# <a name="c1"></a>1. Introdução 

## 1.1. Plano Estratégico do Projeto

### 1.1.1. Contexto da indústria 

<div align = "justify">
Impulsionada pela pandemia, a indústria de jogos educativos tornou-se um dos nichos mais produzidos no Brasil ¹. Enquanto players consolidados mantêm o foco no ensino passivo via texto e vídeo, a tendência do mercado exige metodologias dinâmicas para ensinar essas tecnologias amplamente usadas pelas grandes empresas de IA. Aproveitando essa lacuna de engajamento prático, o IBM SkillsBuild, plataforma de cursos online, posiciona-se estrategicamente como uma plataforma gratuita de capacitação. A iniciativa de encontrar jogos educativos democratiza o aprendizado tecnológico de ponta, preparando estudantes e profissionais para as reais demandas interativas do mercado de trabalho.
</div>

#### 1.1.1.1. Modelo de 5 Forças de Porter 

**1. Ameaça de Novos Entrantes (Ameaça Média)**

<div align = "justify">
A criação de jogos educativos focados em Inteligência Artificial exige a superação de altas barreiras de entrada, principalmente no que tange ao conhecimento técnico. Para ingressar nesse mercado, uma nova empresa precisa dominar simultaneamente duas áreas complexas: o desenvolvimento de jogos (Game Design) e a própria engenharia de IA. A falta dessa expertise técnica rigorosa pode levar à criação de produtos com falhas conceituais, ensinando estruturas de IA de forma incorreta.

Apesar dessas barreiras técnicas protegerem o mercado, a alta atratividade e o "boom" da IA podem incentivar startups e novas empresas a investirem pesado em aprendizagem gamificada. A entrada de novos players tornaria o mercado mais competitivo, forçando constante inovação na atratividade dos jogos.

**2. Ameaça de Produtos Substitutos (Ameaça Alta)**

Existem plataformas de educação já consolidadas que distribuem ensino de tecnologia de diversas formas altamente acessíveis. Plataformas de vídeo gratuitas, como o YouTube (ex: canal Curso em Vídeo), ensinam de forma didática e estimulam a prática por meio de desafios. Paralelamente, plataformas de ensino remoto por assinatura, como Alura e AWS Skill Builder, além de bootcamps ágeis como a DIO, oferecem rotas de aprendizagem validadas pelo mercado.

Esses substitutos são altamente relevantes, possuem um vasto leque de didáticas diferentes e forte reconhecimento. Como o objetivo final do usuário é "aprender IA", metodologias não gamificadas tradicionais representam um alto risco de substituição pela sua praticidade e abundância.

**3. Poder de Barganha dos Fornecedores (Poder Alto)** 

Em projetos de tecnologia e desenvolvimento de software, a principal "matéria-prima" é o capital intelectual. O desenvolvimento de um jogo educativo de IA exige especialistas de nicho: engenheiros de IA, desenvolvedores de jogos experientes e Game Designers/roteiristas capazes de criar engajamento contínuo. O poder de barganha desses profissionais é altíssimo, pois são escassos e disputados por diversas indústrias globais. A gamificação deixou de ser apenas uma dinâmica isolada e tornou-se uma decisão estratégica de produto. Consequentemente, o valor de mercado desses especialistas é muito elevado — como evidenciado na matéria do site Exame ‘’A carreira de IA que ninguém te contou e pode pagar até R$ 1,5 milhão por ano”, no qual cargos como Engenheiro de Prompt podem atingir salários excepcionais devido à alta demanda ⁷.

**4. Poder de Barganha dos Clientes (Poder Médio)**

O público-alvo abrange desde estudantes do ensino médio e universitários até profissionais em transição de carreira que buscam uma introdução facilitada ao mundo da IA. Atualmente, a maioria dos cursos tradicionais exige a leitura prolongada de documentações complexas ou a visualização de vídeos com alta carga matemática, o que afasta o iniciante. Nesse cenário, um jogo educativo reduz a fricção do aprendizado prático, oferecendo uma proposta de valor quase única e diminuindo o poder do cliente por falta de equivalentes diretos. No entanto, o custo de troca (switching cost) no mercado de educação digital é baixíssimo; se o jogo não for engajador ou falhar em explicar a IA de maneira adequada e aplicável, o cliente pode facilmente migrar para os substitutos mencionados anteriormente, mantendo o poder de barganha em um nível médio.

**5. Rivalidade entre Concorrentes (Rivalidade Alta)** 

O mercado de ensino gamificado de IA tem olhado cada vez mais para um público maior e sem o conhecimento, porque não sabe manusear as plataformas. Isso limita avanços para conseguir vender suas próprias IAs e como todo negócio esse é um ramo muito lucrativo que tem rivalidade forte para conseguir a maior fatia. Entre os concorrentes destacam-se o AWS DeepRacer ², que utiliza um simulador 3D gamificado focado estritamente em Aprendizado por Reforço, e o Google Cloud Skills Boost ³, que utiliza laboratórios práticos e um sistema de badges (conquistas) para o ensino de IA na nuvem. Embora essas grandes empresas dominem nichos segmentados, suas ferramentas costumam ter limitações de uso atreladas a custos de infraestrutura (versões pagas após testes) ou focam exclusivamente em seus próprios ecossistemas corporativos.
</div>

### 1.1.2. Análise SWOT 

<div align = "center">
<sup>Figura 35: Análise SWOT relacionada à IBM.</sup><br>
<img src="./assets/analiseSwot.png" width="70%">
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

<div align = "justify">
**Forças**

As principais forças do projeto decorrem da parceria com a IBM, conferindo, por exemplo, credibilidade imediata ao jogo e contato com especialistas em IA, garantindo rigor técnico e relevância no aprendizado. Além da base já consolidada do Skills Build, que traz um eixo de conteúdos e dados para se apoiar. Soma-se a isso a própria composição da equipe, formada por integrantes que fazem parte do público-alvo e com diferentes níveis de conhecimento em IA, possibilitando testar internamente a clareza e a eficácia da abordagem pedagógica do jogo, validando o processo de ensino a partir da própria experiência de aprendizagem do grupo.

**Fraquezas**

As fraquezas são, em boa medida, o reverso das forças. A vinculação a uma big tech consolidada traz consigo processos burocráticos que podem ser restritivos para um projeto em fase inicial. Toda decisão relevante depende de validação institucional da IBM, o que pode comprometer a agilidade necessária nas primeiras etapas de desenvolvimento. Há também uma dependência de dados e de políticas internas da empresa — como regras de uso de marca, propriedade intelectual e compliance — que podem gerar atrasos e limitar a autonomia criativa da equipe.

**Oportunidades**

O crescimento acelerado do mercado de IA, aliado à lacuna de conhecimento no Brasil, representa uma grande oportunidade. Embora a maioria da população já tenha ouvido falar em IA e 75% afirmem utilizá-la no cotidiano, poucos sabem defini-la corretamente, revelando um amplo público potencial — especialmente entre jovens das classes C, D e E. Paralelamente, o mercado de gamificação educacional está em forte expansão, com projeções bilionárias e alto crescimento anual. Nesse cenário, um jogo educativo sobre IA nos posiciona como early adopters e contribui para democratizar o acesso ao conhecimento, alinhando-se ao ODS 4 da ONU ⁴.

**Ameaças**

A principal ameaça é a concorrência. Uma busca simples por "curso introdutório de IA" no Google retorna diversas opções gratuitas — como o curso do Centro Paula Souza —, e o próprio Skills Build original pode ser percebido como alternativa mais direta e tradicional. O fato de o jogo adotar uma abordagem pedagógica diferenciada é ao mesmo tempo um diferencial e um risco, já que parte do público pode preferir métodos de ensino convencionais, especialmente num primeiro contato com o tema. Outra ameaça relevante é a velocidade de obsolescência dos conteúdos. Em uma área em que avanços disruptivos ocorrem em questão de meses, manter o jogo atualizado exigirá um processo contínuo de revisão, o que representa um custo operacional significativo ⁴.
</div>

### 1.1.3. Missão / Visão / Valores 

<div align = "justify">
**Missão:**

Democratizar o acesso a conhecimentos sobre de IA para jovens de todas as classes sociais através da gamificação com um jogo web de fácil acesso ⁸.

**Visão:**

Ser um modelo nacional na implementação da gamificação para educação de IA de maneira inclusiva. 

**Valores:**

Educação lúdica, democratização da IA, inovação pedagógica, aprendizado por descoberta, lisura e ética em IA.
</div>

### 1.1.4. Proposta de Valor

<div align = "center">
<sup>Figura 35: Canvas proposta de valor.</sup><br>
<img src="./public/assets/canvasPropostadeValor.png"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

| Seção                  | Categoria              | Itens                                                                  |
|------------------------|------------------------|------------------------------------------------------------------------|
| Perfil do Cliente      | Público-alvo principal | Estudantes universitários e jovens com interesse em aprender sobre IA  |
| Perfil do Cliente      | Tarefas do cliente     | Aprender conceitos de IA (machine learning, redes neurais, IA generativa)<br>Aplicar conhecimento na prática<br>Aprender sobre ética em IA<br>Adquirir letramento básico sem base teórica avançada<br>|
| Perfil do Cliente      | Dores                  | Baixo engajamento em cursos assíncronos¹¹<br>Excesso de conteúdo teórico e dificuldade de aplicação prática<br>Evasão em cursos online<br>Desorientação em relação à IA<br>Pouco conhecimento dos termos<br>Não saber exatamente o que é IA<br>Falta de motivação sem progressão visível |
| Perfil do Cliente      | Ganhos                 | Aprendizado interativo e aplicado<br>Experiência imersiva<br>Maior retenção de conhecimento<br>Facilidade na compreensão<br>Entendimento geral sobre IA<br>Capacidade de produtividade com IA<br>Analogia entre história e aprendizado<br>Maior foco e motivação |
| Mapa de Valor          | Produtos e Serviços    | Jogo digital educacional com narrativa<br>Módulos gamificados (níveis, desafios, simulações)<br>Experiências inspiradas no IBM SkillsBuild<br>Sistema de progressão gradual<br>Puzzles interativos<br>Conteúdos simplificados e condensados |
| Mapa de Valor          | Aliviadores de Dores   | Substituição de conteúdo passivo por interação<br>Simulação prática<br>Feedback imediato<br>Transformação de conceitos abstratos em interações concretas<br>Uso de microdesafios para aumentar o engajamento<br>Visualização de processos de IA|
| Mapa de Valor          | Criadores de Ganho     | Narrativa imersiva<br>Progressão por níveis¹⁰<br>Aplicação prática dos conceitos<br>Puzzles sobre IA |

### 1.1.5. Descrição da Solução Desenvolvida 

<div align = "justify">
A solução desenvolvida consiste em um jogo educativo web gamificado voltado ao ensino introdutório de Inteligência Artificial, integrado ao contexto do IBM SkillsBuild. O projeto parte do diagnóstico de que os cursos online tradicionais sofrem com baixo engajamento, altas taxas de evasão e um modelo de aprendizado predominantemente passivo, incapaz de manter o interesse de jovens iniciantes. Esse problema é agravado pela natureza excessivamente técnica de grande parte do conteúdo sobre IA disponível, criando uma barreira de entrada significativa para o público-alvo identificado: jovens universitários de renda média-baixa, egressos de escola pública, com familiaridade cotidiana com tecnologia mas sem formação técnica formal na área.


A resposta a esse cenário é uma experiência narrativa e interativa protagonizada por Sophia, cientista que desperta em 2098 após décadas em criogenia, encontrando um mundo devastado pelo uso indevido de Inteligências Artificiais. Acompanhada pelo robô Asimov, ela precisa restaurar o laboratório em ruínas e reconstruir sistemas de IA com responsabilidade. Esse enredo contribui com o jogo, de modo que cada fase da jornada corresponde a um conceito real de Inteligência Artificial, transformando o aprendizado em consequência direta da progressão narrativa.

A primeira fase introduz ao jogador o conceito fundamental de reconhecimento de padrões em máquinas. O jogador assume o controle de Asimov e o guia por um percurso repleto de obstáculos, utilizando as teclas direcionais para mover o robô para cima e para baixo entre as faixas do cenário e a barra de espaço para realizar saltos. O intuito pedagógico é explícito, no qual ao executar esses desvios repetidamente, o jogador vivencia, na perspectiva do robô, o processo pelo qual uma máquina identifica e responde a padrões no ambiente, fundamento sobre o qual toda a Inteligência Artificial moderna se apoia.

Ao concluir esse percurso, Asimov encontra um baú com pistas sobre o cristal de energia necessário para restaurar o laboratório. No entanto, as informações que levam até ele estão escondidas atrás de uma das portas do laboratório, e nem Sophia nem Asimov sabem qual é a correta. Para resolver esse problema, o jogador acessa o processamento interno de Asimov e alimenta sua rede neural com três valores binários que representam, respectivamente, a cor da porta, sua identificação e o padrão de sua maçaneta. Esses valores são inseridos nos neurônios de entrada da rede, e o jogador clica nos nós da camada oculta para ativar o processamento. A partir disso, o próprio jogo exibe uma animação que representa o aprendizado da rede ao longo das épocas de treinamento, tornando visível um processo que normalmente permanece opaco. Em seguida, o jogador precisa acionar a Válvula Softmax, que representa a camada de ativação responsável por converter as saídas brutas da rede em probabilidades interpretáveis, e regular o valor de saída até que Asimov consiga identificar a porta correta com confiança suficiente¹⁴.

Ao abrir a porta, o chão cede e Sophia cai em um ambiente inferior. Para retornar, o jogador precisa subir por plataformas saltando entre elas, e ao longo desse percurso coleta documentos com imagens de cristais verdadeiros. Essa fase introduz a visão computacional e a lógica do seu treinamento, ou seja,  quanto mais imagens corretas Sophia recolhe, mais preciso será o sistema que guiará Asimov na etapa seguinte. A mecânica de coleta transmite de forma intuitiva o princípio de que a qualidade e a quantidade de dados de treino determinam a capacidade de um modelo de reconhecer corretamente o que lhe é apresentado ¹⁶ .

Na quarta fase, Asimov já possui as informações coletadas e inicia a geração interna de uma projeção do cristal. Contudo, o processo produz ruídos, imperfeições visuais que distorcem a imagem gerada. O jogador utiliza o cursor do mouse como se fosse uma esponja e arrasta-o sobre as manchas e distorções que aparecem na projeção, eliminando progressivamente as falhas até que a imagem atinja nitidez suficiente. Essa mecânica materializa dois conceitos centrais da IA moderna: o funcionamento de modelos generativos, que produzem saídas a partir de padrões aprendidos, e o problema do overfitting, em que ruídos e interferências nos dados de treinamento comprometem a qualidade do resultado gerado. O jogador não lê sobre esses conceitos ele usa-os com o mouse como se fosse a própria IA.

Com o cristal sintetizado, Sophia o transporta até o centro do laboratório para realizar a restauração final. Nesse momento, antes de depositar o cristal no núcleo energético, o jogador é confrontado com uma série de perguntas éticas sobre o uso da Inteligência Artificial, precisando clicar nas respostas corretas para concluir o jogo. Essa etapa posiciona a ética não como fator primordial e como condição de desfecho, pois o laboratório só é restaurado quando o jogador demonstra compreender que a tecnologia, por si só, não determina seus impactos. Quem a direciona, e com quais valores, é o que define se ela reconstrói ou destrói¹⁵.

A escolha por plataforma web, desenvolvida com HTML5, JavaScript e Phaser, elimina a necessidade de instalação e garante acesso imediato via navegador, reduzindo uma barreira relevante para o perfil socioeconômico do público-alvo. A progressão linear e sequencial entre as fases, na qual cada etapa só é desbloqueada após a conclusão da anterior, garante que o jogador construa gradualmente os conceitos antes de avançar, evitando que a experiência se torne superficial. A criação de valor do produto está em converter conceitos como reconhecimento de padrões, redes neurais, softmax, visão computacional, modelos generativos e ética em IA em ações concretas que o jogador executa e compreende pelo fazer, ampliando o alcance do IBM SkillsBuild a um público que dificilmente seria atingido por plataformas textuais tradicionais e contribuindo para a democratização do letramento em Inteligência Artificial.
</div>


### 1.1.6. Matriz de Riscos 

<div align = "center">
<sup>Figura 36: Matriz de riscos.</sup><br>
<img src="./assets/matrizDeRiscos.png" width="100%">
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

<div align = "justify">

As escalas utilizadas consideram, para probabilidade, os valores 10 como muito improvável, 30 como baixa, 50 como média, 70 como alta e 90 como muito alta. Para impacto, a classificação varia entre muito baixo, quando o impacto é irrelevante, baixo, quando afeta aspectos pontuais, moderado, quando prejudica a experiência, alto, quando prejudica significativamente o projeto, e muito alto, quando compromete o objetivo central.

No grupo de riscos muito altos, o R1 – Riscos Pedagógicos apresenta probabilidade 90 e impacto muito alto. Trata-se de um risco crítico de que o conteúdo educacional não gere aprendizado real, seja por inadequação ao nível do público, com excesso de abstração ou simplificação, falta de progressão lógica ou ausência de reforço prático. Isso pode resultar em baixa retenção, dificuldade de aplicação prática e sensação de não aprendizado, comprometendo a função central do projeto e gerando abandono e descrédito. Como plano de ação, propõem-se testes com usuários iniciantes e ajuste de ritmo e profundidade. Os indicadores incluem retenção de conhecimento e taxa de conclusão. Como oportunidade atrelada ao risco, há o desenvolvimento de um modelo pedagógico original baseado em aprendizagem ativa e simulação, integrando prática imediata, feedback contínuo, gamificação e storytelling.

Entre os riscos altos, o R2 – Complexidade na Simulação de IA apresenta probabilidade 50 e impacto muito alto. Há o risco de que a simulação de conceitos de IA se torne tecnicamente complexa a ponto de comprometer a clareza com que os usuários compreendem o conteúdo ou a própria viabilidade de transpor esses conceitos para o jogo, gerando abstrações confusas, simplificações incorretas ou dificuldades de implementação, o que pode resultar em experiências inconsistentes ou erros conceituais. O plano de ação envolve prototipagem iterativa e validação com especialistas, com indicadores voltados tanto à compreensão dos usuários quanto ao feedback técnico. Como oportunidade, destaca-se a criação de uma base simplificada e reutilizável para simulações educacionais de IA.

O R3 – Riscos Estratégicos para a IBM apresenta probabilidade 50 e impacto muito alto. Há a possibilidade de o projeto não gerar valor estratégico claro, seja por desalinhamento com os objetivos institucionais, baixa diferenciação ou limitada aplicabilidade prática, o que pode resultar na perda de apoio ou até na descontinuidade, um problema crítico, considerando a dependência direta do projeto em relação à IBM e à sua validação. Como plano de ação, propõe-se a definição clara da proposta de valor e a realização de benchmark, com indicadores voltados à percepção de valor e à comparação com alternativas, permitindo validar e demonstrar continuamente a relevância do projeto para a IBM. Como oportunidade, destaca-se o potencial de posicionar o projeto como referência em educação em IA para públicos iniciantes.

O R4 – Desalinhamento com o SkillsBuild possui probabilidade 50 e impacto muito alto. Mesmo com alinhamento inicial, pode haver divergência ao longo do desenvolvimento entre o produto e os objetivos pedagógicos da plataforma, gerando retrabalho ou necessidade de reestruturação. Divergências com parceiros institucionais ao longo de sprints são recorrentes, o que justifica a elevação da probabilidade. O plano de ação envolve revisões por sprint e mapeamento com o currículo, com indicadores de aderência ao conteúdo e aprovação da IBM. A oportunidade está em explorar liberdade criativa para inovar dentro da plataforma.

O R5 – Engajamento e Entretenimento apresenta probabilidade 70 e impacto alto. Há o risco de o produto não se mostrar suficientemente envolvente, seja por mecânicas repetitivas ou pela ausência de recompensas claras, o que pode levar ao abandono precoce por parte dos usuários. Em um produto gamificado, a falta de engajamento compromete diretamente a retenção e o aprendizado, tornando seu impacto alto. Como plano de ação, propõem-se testes de gameplay e a iteração contínua das mecânicas, utilizando indicadores como tempo de sessão e taxa de abandono, sempre com participantes alinhados ao público-alvo do projeto. Por outro lado, há uma oportunidade relevante em desenvolver um sistema de engajamento baseado em progressão e feedback imediato, capaz de aumentar a retenção e a experiência do usuário.

O R6 – Curva de Aprendizado Inadequada apresenta probabilidade 70 e impacto alto. Há o risco de a dificuldade escalar de maneira desbalanceada, gerando frustração ou tédio e comprometendo tanto o fluxo de aprendizagem quanto o engajamento do usuário. Uma curva desbalanceada leva ao abandono, consequência próxima ao comprometimento do objetivo central do projeto. Como plano de ação, propõe-se o ajuste contínuo da dificuldade do jogo com base em indicadores como tempo por fase e taxa de desistência, considerando testes com jogadores alinhados ao público-alvo. Como oportunidade, destaca-se a implementação de um sistema adaptativo capaz de personalizar a experiência de aprendizado conforme o desempenho do usuário.

O R7 – Storytelling Desconectado apresenta probabilidade 50 e impacto alto. Sendo o storytelling um pilar central do produto, sua desconexão dos objetivos pedagógicos prejudica significativamente a proposta, reduzindo imersão e retenção. O plano de ação é a integração narrativa, com indicadores de clareza percebida e índice de conclusão. A oportunidade está em usar storytelling como suporte direto ao aprendizado.

O R8 – Falta de Valor para o Usuário possui probabilidade 50 e impacto alto. Usuários que não percebem valor claro no produto tendem a abandoná-lo, afetando a adoção e a validação pela IBM. O plano de ação envolve testes de percepção, com indicadores como NPS e satisfação. A oportunidade é entregar valor tangível em forma de habilidades e compreensão real de IA.

O R9 – Obsolescência do Conteúdo tem probabilidade 70 e impacto moderado. O ritmo acelerado da área de IA torna real a chance de o conteúdo ficar desatualizado durante o próprio desenvolvimento, reduzindo relevância e credibilidade. O plano de ação consiste em atualizações periódicas, com indicador de atualidade. A oportunidade é criar uma arquitetura modular e atualizável.

O R10 – Experiência do Usuário, UX e UI apresenta probabilidade 50 e impacto moderado. Interfaces confusas ou pouco intuitivas podem dificultar a navegação e o entendimento, gerando fricção e erros. O plano de ação envolve testes de usabilidade, com indicadores como erros de navegação e tempo de aprendizado. A oportunidade é desenvolver uma experiência altamente orientada à aprendizagem, reduzindo a carga cognitiva desnecessária.

Por fim, nos riscos baixos, o R11 – Riscos de Design apresenta probabilidade 30 e impacto baixo. Elementos visuais podem não atingir o nível ideal de qualidade estética ou consistência, afetando a percepção de profissionalismo, mas sem comprometer a funcionalidade. O plano de ação é a iteração visual, com indicador de feedback qualitativo. A oportunidade está na construção de uma identidade visual marcante e coerente.

### 1.1.7. Objetivos, Metas e Indicadores 

**Objetivos**

| Nº | Objetivo Estratégico                                      | Descrição                                                                 |
|----|----------------------------------------------------------|---------------------------------------------------------------------------|
| 1  | Aumentar o engajamento de jovens com pouco conhecimento em IA | Criar uma experiência interativa mais interessante do que cursos tradicionais, incentivando a continuidade do uso. |
| 2  | Melhorar a aprendizagem de conceitos básicos de IA        | Garantir que o usuário compreenda ideias como reconhecimento de padrões, classificação de dados e noções iniciais de machine learning. |
| 3  | Despertar interesse pela área de Inteligência Artificial  | Fazer com que o usuário perceba que IA é acessível e se interesse em continuar aprendendo. |
| 4  | Incentivar o usuário a concluir o jogo                    | Utilizar elementos de jogo e narrativa para manter o usuário até o final da experiência. |

**Metas e Indicadores**

| Código | Tipo | Descrição | Meta | Prazo | Foco |
|--------|------|----------|------|------|------|
| M1 | Meta | Taxa de conclusão do jogo entre usuários que iniciaram | ≥ 70% | 4 semanas após lançamento | Engajamento |
| M2 | Meta | Taxa de evasão antes da terceira fase | ≤ 30% | 2 semanas após lançamento | Engajamento |
| M3 | Meta | Usuários que compartilham o jogo após concluir | ≥ 50% | Até 2 semanas após conclusão | Satisfação |
| M4 | Meta | Usuários que acessam conteúdos educacionais do SkillsBuild após concluirem o jogo | ≥ 30% | Após conclusão | Aprendizado |
| KPI 1 | KPI | Taxa de conclusão (usuários que finalizam / iniciam) | ≥ 70% | Avaliado após 2 semanas | Engajamento |
| KPI 2 | KPI | Taxa de abandono por fase e acumulada | ≤ 30% | Contínuo | Engajamento |
| KPI 3 | KPI | Tempo médio de uso para conclusão | ≥ 20 minutos | Contínuo | Engajamento |
| KPI 4 | KPI | Novos usuários via recomendação (alcance orgânico) | ≥ 50% | Até 1 mês | Alcance / Satisfação |
| KPI 5 | KPI | Taxa de recomendação do jogo (satisfação) | ≥ 60% | Pós-conclusão | Experiência do usuário |
| KPI 6 | KPI | Acesso ao IBM SkillsBuild após o jogo | ≥ 30% | Até 30 dias | Impacto educacional |

</div>

## 1.2. Requisitos do Projeto 

Os requisitos do projeto estabelecem as diretrizes essenciais para seu desenvolvimento, definindo o que deve ser entregue, como e sob quais condições. Eles servem como base para orientar a equipe em relação ao planejamento, implementação e validação, assegurando uma boa execução do projeto.

\# | Requisito  
--- | ---
1 | O jogo terá, em sua tela inicial, um botão de início e um informativo.
2 | O controle do personagem será realizado usando as teclas direcionais (→ ↑ ↓ ←) e as teclas WASD para navegação e a  interação com itens presentes no jogo será realizada com a tecla E.
3 | A ação de pular é realizada utilizando a tecla SPACE.
4 | Na cena inicial, o jogador só poderá interagir com a camâra de criogênia após interagir com o NPC Watson.
5 | O jogo trará um robô como guia que acompanhará ao jogador durante a progressão das fases
6 | O jogo contará com cinco fases jogáveis e outras cenas, divididas entre cenas de transição entre fases e cenas explicativas.
7 | O jogo deve ser desenvolvido de modo que o jogador poderá explorar os cenários e objetos inseridos.
8 | O jogo deve incluir minigames e desafios dentro das fases inseridas.
9 | Cada fase deve ser desenvolvida dentro de um fundamento da Inteligência Artificial.
10 | Caso o jogador não alcance o requisito mínimo de vitória de uma fase, a fase em que ele se encontra deve ser reiniciada.
11 | A fase um deve ser reiniciada caso o jogador colida com qualquer objeto, a não ser o baú no fim do mapa.
12 | Na fase três, o jogador não pode coletar a imagem errada, que será citada anteriormente.
13 | O jogador deve limpar 90% da imagem apresentada na fase quatro para que ele seja direcionado para a fase seguinte.
14 | A fase cinco deve ser reiniciada caso o jogador classifique corretamente menos de 70% das afirmações.
15 | As informações necessárias para executar uma fase corretamente devem ser apresentadas em cenas ou fases anteriores.

## 1.3. Público-alvo do Projeto 

<div align = "justify">
O público-alvo do jogo são jovens universitários com pouco ou nenhum contato aprofundado com tecnologia — especialmente com Inteligência Artificial. A maioria dessas pessoas limita sua experiência de AI ao uso casual de chatbots como ChatGPT, Gemini ou Claude, o que reflete bem a realidade, em que pesquisas, por exemplo, indicam que menos de 30% das empresas nos EUA de fato adotaram IA em seus processos, evidenciando que a expertise do grande público nessa área é frequentemente superestimada. Por ser um jogo introdutório, ele se encaixa tanto para estudantes de cursos que demandam apenas um uso superficial de IA quanto para calouros de cursos como Ciência da Computação, Engenharia de Software ou Engenharia da Computação que ainda não tiveram uma base sólida no tema, funcionando de forma análoga ao pré-cálculo adotado por diversas universidades para nivelar estudantes com lacunas matemáticas, mas para o uso de AI e sendo muito mais divertido e engajante ⁵.

O perfil mais representativo do nosso usuário é o de um jovem de renda média-baixa, criado fora dos grandes centros urbanos e egresso de escola pública, levando em conta que mais de 80% dos estudantes do ensino médio brasileiro vem de escolas públicas, o público potencial do jogo seria bem grande. Esse usuário potencial do jogo tem afinidade e desenvoltura com tecnologias acessíveis do cotidiano, como celulares e videogames, mas nunca teve a oportunidade de se aprofundar tecnicamente. Agora, ao ingressar na universidade, enfrenta pela primeira vez a necessidade de desenvolver uma compreensão mais sólida da área, e é exatamente para esse primeiro passo que o jogo foi pensado ⁶.
</div>

# <a name="c2"></a>2. Visão Geral do Jogo 

## 2.1. Objetivos do Jogo 

<div align = "justify">
O objetivo do jogo é restaurar o funcionamento do laboratório e proteger os dados essenciais para a humanidade. O objetivo lusório consiste em alcançar esse resultado respeitando as regras e limitações impostas pelo jogo, como desviar de obstáculos, resolver puzzles e utilizar corretamente as mecânicas específicas de cada fase, incluindo os controles de movimentação e os minigames propostos.

Além do objetivo narrativo e lusório, o projeto também possui um propósito educacional de apresentar conceitos básicos de Inteligência Artificial de forma interativa. Por meio das mecânicas, desafios e situações enfrentadas durante a gameplay, o jogador entra em contato com fundamentos de IA, como reconhecimento de padrões e tomada de decisão, adquirindo fluência básica no tema, além de estimular o interesse de estudantes universitários pela área e incentivar a busca por iniciativas educacionais relacionadas, como os próprios cursos oferecidos pelo IBM SkillsBuild.

## 2.2. Características do Jogo 

O jogo é uma historia repleta de acão onde a protagonista deverá passar por desafios e durantes eles irá aprender sobre os fundamentos basicos da IA. O jogo tem graficos simples feitos no Piskel. Os personagens são a peca chave para o jogo, todos tem um contexto, historia e motivacões, assim deixando o jogador mais conectado com o jogo. 

### 2.2.1. Gênero do Jogo 

O gênero do nosso jogo é de aventura, tendo modo história, ação e puzzles, tudo isso com o objetivo de ensinar.

### 2.2.2. Plataforma do Jogo 

O jogo será desenvolvido para plataforma Web, sendo executado diretamente no navegador por meio do framework Phaser, utilizando tecnologias baseadas em HTML5 e JavaScript. O acesso ocorrerá por meio de um link, sem necessidade de instalação prévia do jogo.

A experiência foi projetada principalmente para computadores (desktop e notebook) que utilizem sistemas operacionais como Windows, macOS ou Linux, desde que possuam um navegador moderno atualizado (como Chrome, Safari, Edge ou Firefox) compatível com aplicações em HTML5.

Embora o site possa ser acessado também por dispositivos móveis, o jogo não foi desenvolvido com interface responsiva, pois os controles utilizam teclado e mouse para movimentação e interação.

### 2.2.3. Número de jogadores 

Apenas um jogador. Nosso jogo é uma história onde apenas 1 jogador é controlável, a nossa protagonista Sophia.

### 2.2.4. Títulos semelhantes e inspirações 

Nós nos inspiramos em jogos baseados em minigames (o jeito que nós iremos ensinar o usuário) , Hollow Knight (Design, como a luz em torno do personagem), Spaceship Runner e Among Us ( Gráfico e puzzles) , a inteligência artificial Learn Ia (Desenvolvimento de habilidades de IA, baseado em textos).

### 2.2.5. Tempo estimado de jogo 

O tempo estimado do nosso jogo é de 13 minutos.

</div>

# <a name="c3"></a>3. Game Design 

## 3.1. Enredo do Jogo 

<div align = "justify">
Em um mundo onde a Inteligência Artificial ainda está em fase de desenvolvimento, surge a constante indagação sobre como essa tecnologia afetará o futuro da sociedade. A narrativa tem início em 2022, em um laboratório de pesquisa focado em aprendizado de máquina e robótica, repleto de profissionais renomados. Entre eles destaca-se Sophia, uma cientista brilhante reconhecida por sua curiosidade inata, mente analítica e criatividade na resolução de problemas. À frente do laboratório está Watson, cientista-chefe e orientador de Sophia, responsável por coordenar os projetos mais ambiciosos da equipe.

À medida que os sistemas evoluem, Watson começa a perceber um risco crescente: a tecnologia criada para auxiliar a humanidade poderia ser facilmente redirecionada para fins de controle e destruição. Ele identifica movimentações externas interessadas em assumir o comando dos projetos e teme que, no futuro, as tecnologias desenvolvidas no laboratório sejam utilizadas para atender interesses negativos. Sem conseguir interromper o avanço inevitável das pesquisas nem garantir que permaneceriam sob controle ético, Watson elabora um plano.

Ele convoca Sophia para uma conversa reservada e apresenta projeções baseadas em simulações internas do próprio laboratório. O diálogo gira em torno do perigo iminente no uso indevido de tecnologias emergentes no futuro. Para evitar esse cenário trágico, o líder pede que Sophia faça parte do projeto como a cientista que será congelada para despertar em um futuro, caso necessário. Embora receosa, a cientista aceita, pois dedicou toda a sua vida à ciência. 

Assim que o procedimento é iniciado, Watson ativa um protocolo secreto: caso um cenário de calamidade fosse detectado, um agente específico deveria despertar Sophia.

Esse agente é Asimov, um robô criado como experimento científico avançado para testes de aprendizagem autônoma e suporte operacional ao laboratório. Projetado para auxiliar equipes humanas de forma independente, Asimov possui arquitetura adaptativa e capacidade de evolução contínua por meio de dados.

Muitas décadas depois, a câmara criogênica se abre. Sophia desperta em 2098, em um mundo devastado pelo uso indevido de Inteligências Artificiais treinadas para obter poder e dominação. O antigo laboratório está em ruínas, tomado por sucatas e falhas estruturais. Asimov foi o responsável por ativar o protocolo de despertar Sophia ao detectar a calamidade global, cumprindo a última ordem direta de Watson. No entanto, ele também sofreu danos: parte de sua memória foi fragmentada e seu banco de dados encontra-se inacessível devido à falha no núcleo energético do mapa central do laboratório.

Ao analisar os sistemas restantes, Asimov explica que a única maneira de restaurar a infraestrutura e recuperar integralmente seu banco de dados é reativar o núcleo do mapa energético do laboratório. Para isso, é necessário um cristal específico, capaz de armazenar e redistribuir grandes cargas de energia para toda a estrutura. Sem essa fonte, o laboratório permanecerá inoperante e seu conhecimento perdido.

A busca começa na área de sucatas, onde podem existir registros antigos sobre o cristal. O ambiente, porém, está excessivamente poluído, tornando a entrada arriscada para Sophia. Além disso, Asimov perdeu parte de seus módulos de navegação e desvio de obstáculos. Para superar essa limitação, Sophia assume o controle remoto do robô, guiando-o manualmente pelos destroços. Ao concluir essa etapa, Asimov reaprende padrões de locomoção e recupera sua capacidade básica de navegação.

Entre os escombros, encontram um baú contendo a imagem de uma porta específica e seus padrões codificados em binário. A próxima fase consiste em localizar essa porta em uma sala com múltiplos caminhos e entradas visualmente semelhantes. O ambiente é escuro demais para Sophia distinguir os detalhes, mas Asimov consegue enxergar na ausência de luz. No entanto, ele não consegue diferenciar os padrões corretos. Sophia então o treina por meio de um sistema de reconhecimento de padrões, ensinando-o a classificar corretamente as características visuais até que ele consiga identificar a porta certa de forma independente.

Ao atravessarem a entrada certa, encontram um novo conjunto de dados: imagens e registros de cristais raros, divididos entre exemplares verdadeiros e falsos. Os cristais adequados são azuis, capazes de armazenar grandes cargas de energia; os inadequados apresentam colorações avermelhadas. Entretanto, antes que pudesse ver detalhadamente as imagens, o chão da sala de quebra e Sophia cai em outro laboratório, onde ela precisa coletar as imagens dos cristais corretos enquanto escala para a sala das portas para continuar sua missão.

Após esse processo, Sophia precisa levas as características para Asimov e insere-as em seu sistema, onde passa por um novo processo de aprendizado, simulando o comportamento de uma rede neural generativa. Ele começa a produzir múltiplas variações com ruídos e interferências. Cabe a Sophia ajustar os parâmetros: reduzir os níveis de erro e limpar as distorções até que o sistema gere um cristal idêntico ao modelo verdadeiro. 

Com o padrão final validado, o cristal é forjado e colocado no núcleo do mapa energético do laboratório. A energia da instalação é restaurada, reativando sistemas essenciais e recuperando integralmente o banco de dados de Asimov. Com sua capacidade de processamento ampliada e acesso total às informações originais, ele se torna novamente um agente autônomo avançado, pronto para auxiliar Sophia na reconstrução do conhecimento perdido.

Por fim, Asimov ensina para Sophia sobre a criação de prompts e a importância da ética no uso da Inteligência Artificial, exibindo exemplos de prompts aos quais a cientista tem que classificar entre aplicações corretas e incorretas para que consiga prosseguir com a missão. Sophia compreende que o problema nunca foi a tecnologia em si, mas a forma como ela é direcionada. 

Desse modo, mostrando Sophia ao lado de Asimov com o objetivo de ensinar sobre os fundamentos e a utilização ética da IA para a humanidade, o jogo encerra-se com um desfecho aberto, deixando ao jogador a sensação de que o verdadeiro desafio começa a partir dali.
</div>

## 3.2. Personagens 

### 3.2.1. Controláveis

### SOPHIA

<div align = "justify">
Sophia é uma das personagens controláveis e protagonista da narrativa. Cientista formada no laboratório liderado por Watson, destaca-se por sua inteligência analítica, curiosidade científica e capacidade de resolver problemas complexos. Ao despertar em 2098, encontra um mundo devastado pelo uso indevido da Inteligência Artificial e precisa utilizar suas habilidades em programação, análise de dados e reconstrução de sistemas para restaurar o laboratório. Ao longo do jogo, Sophia evolui de pesquisadora dependente do suporte tecnológico para uma agente ativa na reconstrução do conhecimento, assumindo decisões estratégicas, treinando modelos de IA e conduzindo processos de síntese e classificação que impactam diretamente a progressão da história.
</div>

<div align = "center">
<sup>Figura 2: Sprite de Sophia, a personagem principal.</sup><br>
<img src="../public/assets/personagens1/sophia.png"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

### ASIMOV

<div align = "justify">
Asimov também é personagem controlável em momentos específicos da jogabilidade. Criado originalmente como um experimento científico avançado para atuar como agente autônomo de suporte ao laboratório, ele possui arquitetura adaptativa e capacidade de aprendizado contínuo. Após décadas de abandono e danos estruturais, desperta Sophia seguindo a última ordem de Watson, mas apresenta falhas em memória e sistemas de navegação. Durante o jogo, o jogador assume o controle de Asimov na fase 1, enquanto seus sistemas são gradualmente restaurados por meio de treinamentos e inserção de dados. Sua evolução acompanha o avanço técnico da narrativa, tornando-se progressivamente mais autônomo e estratégico, consolidando-se como parceiro essencial na reconstrução do laboratório e na restauração do equilíbrio tecnológico.
</div>

<div align = "center">
<sup>Figura 3: Sprite de asimov, personagem secundário.</sup><br>
<img src="../public/assets/personagens1/asimov.png"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

### 3.2.2. Non-Playable Characters (NPC)

### WATSON

<div align = "justify">
Watson é o principal personagem não controlável da narrativa. Cientista-chefe do laboratório e orientador de Sophia em 2022, ele é o responsável por liderar os projetos de Inteligência Artificial que impulsionam a história. Visionário e experiente, Watson antecipa os riscos do uso indevido da tecnologia e toma a decisão crucial de submeter Sophia à criogenia como medida extrema para preservar o conhecimento original do laboratório. Antes do congelamento, ele programa em Asimov o protocolo de despertar, garantindo que, em caso de calamidade, Sophia teria a oportunidade de restaurar o equilíbrio perdido.

Embora não esteja presente fisicamente no futuro, Watson exerce forte influência sobre a narrativa por meio de registros, instruções deixadas nos sistemas e pelas consequências de suas decisões. Ele funciona como catalisador da jornada, sendo a figura que inicia os acontecimentos que estruturam todo o arco do jogo.
</div>

<div align = "center">
<sup>Figura 4: Sprite de Watson, NPC.</sup><br>
<img src="../public/assets/personagens1/watson.png"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>
</div>

### 3.2.3. Diversidade e Representatividade dos Personagens

<div align = "justify">
A construção dos personagens foi pensada para dialogar diretamente com o público-alvo: estudantes universitários interessados em Inteligência Artificial que buscam uma abordagem mais aplicada e menos teórica. A partir disso, foram analisados aspectos sociais relacionados ao público presente na área de tecnologia.

Mundialmente, cerca de 41% das mulheres deixam suas profissões de tecnologia justamente pelo fato dos ambientes de trabalho não serem inclusivos, o que prejudica a representatividade feminina em posições de liderança (Struckman, 2019). Diante disso, foram analisadas estatísticas sobre a presença feminina e referências na área.

De acordo com uma pesquisa realizada pela CNN Brasil, 83,3% do mercado é composto por homens, enquanto as mulheres ocupam apenas 12,3% dos cargos de tecnologia e somente 35% da mão-de-obra feminina de tecnologia ocupa cargos de liderança (Catho, 2021). Assim, em discussões, foi decidido fazer uma representação de uma mulher em uma posição de liderança na área de tecnologia, nossa personagem central na trama: Sophia. 

Ademais, também foi analisada uma pesquisa realizada em 2022 pelo PretaLab, as mulheres negras representam 28% da sociedade brasileira, onde 11% trabalham em empresas de tecnologia e apenas 3% estão matriculadas em cursos de pós-graduação. Para criação dessa personagem, foi tomada como inspiração Sônia Guimarães, pioneira entre as mulheres negras na ciência brasileira.

Em uma área historicamente marcada pela desigualdade de gênero, ela ocupa o lugar de protagonista técnica, estrategista e agente da reconstrução científica. Não é retratada como coadjuvante, mas como responsável pelas decisões críticas, pelo treinamento dos sistemas e pela restauração do laboratório. Sua trajetória simboliza a luta e a consolidação das mulheres em espaços de pesquisa, liderança e inovação, funcionando como referência positiva para jogadoras e jogadores. Além disso, Sophia representa o estudante que aprende pela prática: evolui ao testar hipóteses, ajustar modelos e corrigir falhas, demonstrando que o domínio da IA é construído progressivamente.

Asimov representa a dimensão tecnológica contemporânea. Ele simboliza as ferramentas de apoio ao aprendizado, como plataformas educacionais, ambientes de programação e sistemas inteligentes, que ampliam a capacidade humana sem substituir o raciocínio crítico. Sua evolução ao longo do jogo reforça a ideia de que tecnologia e ser humano devem atuar de forma complementar e ética.

Watson, por sua vez, representa a tradição científica e a responsabilidade institucional. Como cientista-chefe e orientador, ele simboliza a importância da pesquisa estruturada, da formação sólida e da reflexão ética no desenvolvimento tecnológico.

Dessa forma, o jogo promove representatividade de gênero, acadêmica e profissional, posicionando a ciência como espaço acessível, diverso e em constante transformação. A narrativa reforça que o avanço da Inteligência Artificial depende não apenas de inovação técnica, mas também de diversidade, responsabilidade e formação crítica.
</div>

## 3.3. Mundo do jogo

### 3.3.1. Locações Principais e/ou Mapas 

<div align = "justify">
O jogo tem cinco diferentes cenários e, entre eles, dois deles tem variações. A narrativa se inicia em um laboratório com diversos cientistas, prontos para iniciar o projeto que desenvolveram; esse ambiente é apresentado como um espaço moderno, organizado e com diversos equipamentos tecnológicos, transmitindo a sensação de progresso científico e inovação.

<div align = "center">

<sup>Figura 5: Laboratório Inicial antes da viagem no tempo.</sup><br>
<img src="./assets/labBrancoN.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

O cenário seguinte muda após um salto temporal, quando Sophia desperta da criogenia, o jogador encontra o mesmo laboratório, entretanto, com suas estruturas danificadas, equipamentos quebrados e um ambiente escuro para transmitir ao jogador a ideia de que algo ruim ocorreu naquele ambiente.

<div align = "center">

<sup>Figura 6: Laboratório Inicial depois da viagem no tempo.</sup><br>
<img src="./assets/labBrancoD.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

O segundo cenário apresentado é um corredor onde há vários equipamentos danificados acumulados ao ponto de serem obstáculos ao jogador, esse ambiente foi construído para que o robô, Asimov, navegue entre os destroços para aprender sobre os padrões de movimentação que deve ter e coletar pistas sobre a localização do cristal necessário para restaurar os sistemas do laboratório.

<div align = "center">

<sup>Figura 7: Cenário da Fase 01.</sup><br>
<img src="./assets/faseCorredor.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

Em seguida, Asimov volta para o laboratório destruído e depois leva Sophia para a sala das portas, onde deve ser localizada a sala em que está o baú com imagens de diferentes tipos de cristais, esse cenário é uma sala escura para instigar a exploração e como recurso para o fundamento apresentado nesta fase.

<div align = "center">

<sup>Figura 8: Cenário da Fase 02, sala das portas.</sup><br>
<img src="./assets/salaPortas.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

Após essa etapa, o jogador é levado à uma sala com diversos equipamentos ao fundo e plataformas pra que ele possa subir até outro mapa e coletar as imagens dos cristais corretos.

<div align = "center">

<sup>Figura 9: Cenário da Fase 03.</sup><br>
<img src="./assets/labFaseTres.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

Por fim, é apresentada no jogo a sala principal de controle do laboratório, onde se encontra o núcleo energético que o jogador deve inserir o cristal para reativar os sistemas, marcando um momento importante na reconstrução da tecnologia e no avanço da narrativa.

<div align = "center">

<sup>Figura 10: Laboratório Final antes da restauração.</sup><br>
<img src="./assets/labCristal1.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 11: Laboratório Final depois da restauração.</sup><br>
<img src="./assets/labCristal2.png" width = '70%'><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

</div>

### 3.3.2. Navegação pelo mundo 

**Controles de Movimento**

| Tecla | Ação |
| :--- | :--- |
| **↑** | Move o personagem para frente (+Y) |
| **→** | Move o personagem para a direita (+X) |
| **↓** | Move o personagem para trás (−Y) |
| **←** | Move o personagem para a direita (-X) |
| **W** | Move o personagem para frente (+Y) |
| **D** | Move o personagem para a direita (+X) |
| **S** | Move o personagem para trás (−Y) |
| **A** | Move o personagem para a direita (-X) |

---

**Interações**
A tecla **E** é utilizada para interagir com:
* **Itens do cenário**
* **NPCs**

---

**Tipo de Movimentação**
* **Perspectiva:** Terceira pessoa
* **Exploração:** Livre dentro do mapa da fase atual

---

**Estrutura e Funcionamento**

| Elemento | Funcionamento |
| :--- | :--- |
| **Estrutura das fases** | Linear |
| **Ordem das fases** | Sequencial e pré-definida |
| **Condição para avançar** | Concluir todas as tasks da fase |
| **Resultado do avanço** | Desbloqueio de nova área |
| **Progressão narrativa** | Acontece a cada fase concluída |

### 3.3.3. Condições climáticas e temporais 

<div align = "justify">
A existência de diferentes condições climáticas não foi uma possibilidade de aplicação dentro do enredo do jogo pois não foi considerado como fator de importância, devido aos ambientes do jogo se passarem em ambientes internos.

### 3.3.4. Concept Art 

Durante o planejamento do jogo, com o objetivo de obter melhor visualização da proposta dos assets e do encaminhamento do projeto, foram desenvolvidas diversas concept arts relacionadas as cenas e personagens.
</div>

<div align = "center">

<sup>Figura 7: Concept Art do Laboratório Inicial do jogo.</sup><br>
<img src="./assets/labInicial.png" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 8: Concept Art do minigame do robô entre sucatas.</sup><br>
<img src="./assets/lixaoRobo.png" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 9: Concept Art do minigame de Visão Computacional.</sup><br>
<img src="./assets/gameVisComp.png" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 10: Concept Art do minigame de limpeza de Ruídos.</sup><br>
<img src="./assets/gameRuidos.png" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 11: Primeira Concept Art de Asimov.</sup><br>
<img src="./assets/roboInicial.jpeg" width="60%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 12: Segunda Concept Art de Asimov.</sup><br>
<img src="./assets/roboInicial2.jpeg" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

### 3.3.5. Trilha sonora 

| Uso no Jogo          | Nome Original do Áudio           | Criador / Autor        | Duração | Categoria / Tags                                     | Fonte            | Arquivo                                | Ocorrência           |
|----------------------|----------------------------------|------------------------|---------|------------------------------------------------------|------------------|----------------------------------------|---------------------------------------------------------------------------------------------------|
| Trilha principal     | Big robot footstep 015           | Autoria própria        | -       | Musical, SpaceAmbientPad.                            | Autoria própria  |`assets/bgMusic.wav`.                   | Acontece por todo o jogo, do começo ao fim.                                                       |
| Trilha secundária    | Big robot footstep 015           | Autoria própria        | -       | Musical, SpaceAmbientPad.                            | Autoria própria  |`assets/bgMusicFases.mp3`               | Durante a fase 1, a fase 2, a fase 3, a fase 4                                                    |
| Robô batendo         | Big robot footstep 015           | AudioPapkin            | 0:01    | Film & special effects, BigRobotFootstep             | fiftysounds      |`assets/colisionSound.wav`              | Sempre que o Asimov bate nos obstáculos da fase 1                                                 |
| Robô andando         | Robot Walk                       | freesound_community    | 0:10    | Film & special effects, roboAndando                  | pixabay          |`assets/efeitosSonoros/roboAndando.m4a` | Quando o Asimov se movimenta para cima e para baixo na fase 1                                     |
| Pulo (Asimov)        | Cartoon jump                     | freesound_community    | 0:01    | Film & special effects, FunnyJumpGame                | pixabay          |`assets/efeitosSonoros/puloRobo.m4a`    | Durante a fase 1, quando o Asimov pula                                                            |
| Baú abrindo          | Wooden Trunk Latch 2             | floraphonic            | -       | Film & special effects, OpenLatchLockHandle          | fiftysounds      |`assets/efeitosSonoros/bauAbrindo.mp3`  | Ao finalizar a fase 1 e o jogador apertar E                                                       |
| Alavanca             | Film advance lever               | spinopel               | 0:01    | Film & special effects, PhotographerCamera           | pixabay          |`assets/efeitosSonoros/alavanca.mp3`    | Ao clicar na alavanca da fase 2                                                                   |
| Digitando            | Typing Keyboard ASMR             | DRAGON-STUDIO          | 0:08    | Film & special effects, TypingKeyboard               | fiftysounds      |`assets/efeitosSonoros/digitacao.mp3`.  | Durante a animação das digitações das caixas de texto                                             |
| Som Pop (Geral)      | Sfx Sharp Pop 2                  | FiftySounds            | -       | Corporate videos and games                           | pixabay          |`assets/efeitosSonoros/pop.mp3`         | Quando o jogador apertar a tecla E para acessar falas                                             |
| Som de Nós (Pop)     | Bottle Opening Wine Cork Pop     | Universfield           | -       | Film & special effects, Wine Cork Pop                | pixabay          |`assets/efeitosSonoros/popNos.mp3`.     | Acontece quando clica em algum nó da fase 2                                                       |
| Virar Carta          | flipCard                         | freesound_community    | -       | Film & special effects, CardCard-gameFlip            | pixabay          |`assets/efeitosSonoros/carta.mp3`.      | Cada clique nas cartas da fase um e nos documentos da pré fase 4                                  |
| Iniciar Jogo         | Game Start                       | FoxBoyTails            | 0:01    | Film & special effects, InterfaceUiStart             | pixabay          |`assets/efeitosSonoros/somIniciar.mp3`  | Som de cada botão do inicio, som da abertura do menu.                                             |
| Resposta Errada      | Error / Mistake Sound Effect     | Lesiakower             | 0:01    | Film & special effects, ErrorMistakeIncorrect        | pixabay          |`assets/efeitosSonoros/erro.mp3`.       | Quando é coletado o documento com cristal errado na fase 3 e quando erra a aplicação na fase 5    |
| Apagar (Borracha)    | Dry Erase                        | freesound_community    | 0:18    | Film & special effects, DisappointmentDry-erase      | pixabay          |`assets/efeitosSonoros/borracha.m4a`    | Ao apagar com a esponja na fase 4                                                                 |
| Luz / Som            | Healing Magic (4)                | Yodguard               | 0:08    | Film & special effects, Healing Magic                | pixabay          |`assets/efeitosSonoros/luzSom.mp3`      | Ao acavar a fase 4 e apertar no cristal do meio do mapa na cena restauração                       |
| Vitória              | Brass fanfare reverberated       | u_ss015dykrt           | 0:09    | Musical, FanfareSuccessTubing                        | pixabay          |`assets/efeitosSonoros/vitoriaSom.mp3`  | A cada passada de fase, toca esse som                                                             |



## 3.4. Inventário e Bestiário 

### 3.4.1. Inventário

\# | item |  | como obter | função 
--- | --- | --- | --- | --- 
1 | baú | <img src="../assets/Objetos/bau.png"> | estão em algumas fases do jogo | guardam recompensas e informações 
2 | envelope | <img src="../assets/Objetos/faseUm/envelopes.png"> | estará no primeiro baú | dá informações que serão utiliazadas em uma fase futura
3 | pergaminho | <img src = "../assets/Objetos/faseUm/pergaminho3.png"> | estará no primeiro baú | dá informações sobre a história do jogo 

### 3.4.2. Bestiário

A existência de inimigos não foi uma possibilidade acordada dentro do enredo do jogo devido ao grau de importância que o grupo concluiu para esse fator, pois o projeto trabalhado será mais focado na resolução de problemas lógicos.

## 3.5. Gameflow (Diagrama de cenas) 

<div align="center">
<sub>Figura 13: Storyboard de programação</sub><br>
<img src="./assets/diagramaDeCenas.jpg.png" width="85%"><br>
<sup>Fonte: Autoria própria (2026).</sup><br>
</div>

## 3.6. Regras do jogo 

<div align = "justify">
O objetivo geral do jogo é investigar um laboratório em ruínas no ano de 2098 e forjar um novo núcleo de energia capaz de reativar o banco de dados do robô Asimov. No prólogo, ocorre um salto temporal em que o jogador viaja para o futuro e estabelece o primeiro contato com a máquina. Nesse momento inicial, a câmara criogênica permanece bloqueada, exigindo que o jogador interaja com o cientista Watson e esgote todas as opções de diálogo disponíveis para liberar a transição temporal. Ao chegar em 2098, a progressão só é habilitada após o jogador ouvir integralmente as instruções iniciais de Asimov, garantindo a compreensão do contexto e das mecânicas básicas.

Na sequência, a segunda etapa se desenrola em um corredor do laboratório, onde o jogador deve encontrar pistas sobre o cristal de energia. Para isso percorre um trajeto linear repleto de detritos, no qual a precisão é essencial, pois qualquer colisão com obstáculos resulta em falha imediata e reinício do percurso. Apenas ao completar a travessia sem erros o jogador desbloqueia um baú contendo as informações necessárias para avançar. Em seguida a progressão conduz a uma fase centrada no treinamento de uma rede neural, na qual o jogador precisa treinar Asimov para identificar a porta correta em meio à escuridão, interpretando a saída do sistema. As pistas coletadas anteriormente são utilizadas para alimentar os neurônios da rede densa de Asimov, mas os dados iniciais são apresentados de forma bruta e ilegível. Para torná los compreensíveis é necessário interagir diretamente com os neurônios de Asimov para ativá los um a um, além de encontrar e ativar manualmente a válvula softmax responsável por converter os valores em probabilidades entre 0 e 100. Com essa leitura clara o jogador deve então ajustar corretamente o limiar de confiança, valores inadequados impedem o reconhecimento da porta correta enquanto o ajuste preciso filtra as probabilidades irrelevantes e permite a progressão.

Na terceira fase, o jogador enfrenta um desafio de classificação de cristais após cair em um buraco, devendo escalá-lo enquanto coleta apenas os cristais verdadeiros, identificados pela cor azul, e evita os falsos, representados em vermelho. A coleta de um cristal incorreto implica penalização e reinício da fase, sendo necessário reunir todos os cristais corretos para prosseguir. Na quarta etapa, o foco recai sobre a limpeza de um cristal imperfeito gerado por Asimov, utilizando um mecanismo de arrasto com o mouse para remover manchas e irregularidades. Durante esse processo, o jogador deve controlar a barra de overfitting, impedindo que atinja 100%, pois isso resulta no reinício da fase; da mesma forma, uma limpeza incompleta impede a conclusão do objetivo. Por fim, na quinta e última fase, o jogador deve avaliar diferentes prompts sob critérios de adequação e ética, classificando-os como apropriados ou não. Para concluir o jogo, é necessário acertar pelo menos sete das dez avaliações apresentadas, consolidando o aprendizado adquirido ao longo da experiência.

## 3.7. Mecânicas do jogo 

### Mecânicas principais

As mecânicas do jogo envolvem exploração do ambiente, interação com objetos e resolução de desafios relacionados à inteligência artificial. O jogador controla os personagens para investigar o laboratório, coletar informações e completar tarefas necessárias para avançar nas fases.

1. Exploração do ambiente e Desvio de Obstáculos
O jogador pode se movimentar livremente dentro do mapa inicial para explorar o laboratório. Na área de sucatas, a exploração muda para o controle de Asimov em um percurso linear, onde é estritamente necessário desviar de detritos.

Controles de Exploração Livre (Sophia):

Tecla W / Seta para Cima: Move para cima (Eixo Y+). Tecla S / Seta para Baixo: Move para baixo (Eixo Y-). Tecla D / Seta para a Direita: Move para a direita (Eixo X+).Tecla A / Seta para a Esquerda: Move para a esquerda (Eixo X-).Barra de Espaço: Pular. Controles na Sucata (Asimov):Tecla W / Seta para Cima: Move para a faixa de cima. Tecla S / Seta para Baixo: Move para a faixa de baixo.Barra de Espaço: Saltar obstáculos.

2. Interação com objetos e sistemas
Utilizando a tecla de interação, o jogador pode acessar baús, arquivos, máquinas e terminais do laboratório, além de conversar com o cientista Watson e com Asimov. Esses elementos liberam informações da narrativa ou ativam desafios necessários para continuar a fase.

Controles: Tecla "E" para interagir com personagens, avançar nos diálogos e interagir com objetos.

3. Treinamento da rede neural de Asimov e Válvula Softmax
Com as pistas coletadas, o jogador inicia o treinamento da rede neural. É obrigatório encontrar e ativar a Válvula Softmax para converter os dados brutos em probabilidades, além de definir o limiar de confiança exato na interface para que Asimov identifique a porta.

Controles:

Mouse (Movimento) + Clique Único: Para selecionar e ativar os neurônios na tela além de servir para interagir e abrir a Válvula Softmax.

Clique e Arraste (Slider): Para ajustar a barra do "limiar de confiança" de 0 a 100% na interface.

4. Investigação e coleta de informações
Na sala de arquivos, o jogador encontra documentos e imagens de diferentes cristais armazenados em um baú. Essas informações ajudam a identificar quais cristais possuem as características corretas.

Controles: Interação padrão (Tecla "E") para abrir o baú e ler as pistas.

5. Classificação de cristais
Na sala da esteira, o jogador deve analisar imagens de cristais e realizar a classificação entre cristais verdadeiros e falsos.

Controles (Cliques na Interface):

Botão "Guardar" (Verde): Para cristais verdadeiros (azuis, brilhantes e pontiagudos).

Botão "Incinerar" (Vermelho): Para cristais falsos (com imperfeições ou coloração diferente).

6. Extração de características e Forja Generativa
Após selecionar corretamente os cristais verdadeiros, eles são enviados para um extrator de características, que gera uma matriz de características com os padrões do cristal correto. Em seguida, inicia-se a forja generativa, onde o jogador deve eliminar ativamente os "ruídos" (imperfeições visuais) gerados pelo processo.

Controles:

Tecla "E": Para ativar o terminal do extrator de características.

Clique e Arraste (Botão Esquerdo do Mouse): Clicar e segurar em cima do esfregão e arrastar o mouse por todo o ruído (manchas no cristal em formação) para limpar as falhas até preencher a barra de pureza em 100%.

7. Restauração do laboratório
Após a forja e a identificação correta do cristal verdadeiro, Sophia pode levá-lo até a sala principal de controle, onde o cristal é depositado no centro do sistema energético do laboratório, restaurando parte da energia e permitindo a continuidade da narrativa.

Controles: Movimentação livre (WASD / Setas) para transportar o cristal e Tecla "E" no núcleo central para depositá-lo e acionar a vitória da fase.
</div>

## 3.8. Implementação Matemática de Animação/Movimento 


## 3.8.1 Parâmetros do Modelo

| Símbolo | Descrição                        | Valor       |
|---------|----------------------------------|-------------|
| xᵢ      | Posição inicial X                | 1065 px     |
| yᵢ      | Posição inicial Y                | 235 px      |
| xf      | Posição final X                  | 861 px      |
| yf      | Posição final Y                  | 235 px      |
| T       | Duração total da animação        | 2 s         |
| aᵧ      | Aceleração gravitacional do jogo | 200 px/s²   |

> **Nota sobre coordenadas:** No Phaser 3 o eixo Y cresce **para baixo**.
> Velocidade inicial negativa em Y = movimento **para cima** na tela.
> Aceleração positiva em Y = gravidade puxando **para baixo**.



## 3.8.2 Eixo X — Movimento Uniforme (MU)

No MU a aceleração é nula e a velocidade é constante. Partindo da definição de velocidade média:

$$
v_x = \frac{x_f - x_i}{T} = \frac{861 - 1065}{2} = -102 \text{ px/s}
$$

Equação horária da posição em X:

$$
x(t) = x_i + v_x \cdot t
$$

**Verificação:** $x(2) = 1065 + (-102)(2) = 861 \text{ px}$ ✓



## 3.8.3 Eixo Y — Movimento Uniformemente Variado (MUV)

Como $y_i = y_f = 235$ px, a pedra executa um arco simétrico — sobe e retorna ao mesmo nível.

**Aceleração (parâmetro de projeto):**

$$
a_y = +200 \text{ px/s}^2
$$

**Velocidade inicial em Y** — obtida impondo $y(T) = y_f$ na equação horária:

$$
y(T) = y_i + v_{y0} \cdot T + \frac{1}{2} \cdot a_y \cdot T^2 = y_f
$$

$$
v_{y0} \cdot T = y_f - y_i - \frac{1}{2} \cdot a_y \cdot T^2
$$

$$
v_{y0} = \frac{(y_f - y_i) - \frac{1}{2} \cdot a_y \cdot T^2}{T} = \frac{0 - \frac{1}{2} \cdot 200 \cdot 4}{2} = -200 \text{ px/s}
$$

**Equação horária da velocidade em Y:**

$$
v_y(t) = v_{y0} + a_y \cdot t
$$

**Equação horária da posição em Y:**

$$
y(t) = y_i + v_{y0} \cdot t + \frac{1}{2} \cdot a_y \cdot t^2
$$

**Verificações:**
- Pico em $t = 1$ s: $y(1) = 235 + (-200)(1) + \frac{1}{2}(200)(1) = 135 \text{ px}$ → sobe 100 px ✓
- Retorno em $t = 2$ s: $y(2) = 235 + (-200)(2) + \frac{1}{2}(200)(4) = 235 \text{ px}$ ✓



# 3.8.4 Visualização das Trajetórias

![Gráfico das trajetórias Δx(t) e Δy(t)](./assets/grafico_trajetorias.svg)

$$
\Delta x(t) = -102 \cdot t \quad | \quad \Delta y(t) = -200 \cdot t + \frac{1}{2} \cdot 200 \cdot t^2 \quad | \quad \Delta y(1) = -100 \text{ px (pico do arco)}
$$



# 3.8.5 Localização no Código-Fonte

- **Arquivo:** `faseTres.js`
- **Função:** launchStoneProjectile
- **Linhas de início:** linha 1 de 390 até linha 75 de 390; linha 183 de 390 até linha 188 de 390. 



# 3.8.6 Código — Implementação em Phaser 3 com JavaScript

Para acesso ao código direto para a linha do console.log da posição X, somente realizar o acesso a este link: https://git.inteli.edu.br/graduacao/2026-1a/t29/g03/-/blob/main/src/scenes/faseTres.js?ref_type=heads#L43

Para acesso ao código direto para a linha do console.log da posição Y, somente realizar o acesso a este link: https://git.inteli.edu.br/graduacao/2026-1a/t29/g03/-/blob/main/src/scenes/faseTres.js?ref_type=heads#L48

Para acesso ao código direto para a linha do inicio da função de matemática/física da bolinha, somente realizar o acesso a este link:https://git.inteli.edu.br/graduacao/2026-1a/t29/g03/-/blob/main/src/scenes/faseTres.js?ref_type=heads#L5

## 3.8.7 Tabela de Validação

| t (s) | x(t) px | vx (px/s) | y(t) px | vy(t) px/s | ay (px/s²) |
|-------|---------|-----------|---------|------------|------------|
| 0,000 | 1065,00 | −102,00   | 235,00  | −200,00    | 200,00     |
| 0,500 | 1014,00 | −102,00   | 185,00  | −100,00    | 200,00     |
| **1,000** | **963,00** | **−102,00** | **135,00** | **0,00** | **200,00** |
| 1,500 | 912,00  | −102,00   | 185,00  | +100,00    | 200,00     |
| 2,000 | 861,00  | −102,00   | 235,00  | +200,00    | 200,00     |

> Em **t = 1 s** (linha em negrito): $v_y = 0$ confirma o pico do arco.
> Em **t = 2 s**: $x = 861$ px e $y = 235$ px confirmam o retorno às coordenadas finais. ✓


Para garantir que a movimentação e a gravidade no jogo funcionem de maneira fluida e precisa, a lógica de programação foi estruturada com rigor científico. A modelagem matemática das equações de Movimento Uniforme (MU) e Movimento Uniformemente Variado (MUV) aplicadas ao motor gráfico foi baseada na obra Fundamentos de Física: Mecânica (HALLIDAY; RESNICK; WALKER, 2016)¹². Além disso, o suporte conceitual para a mecânica bidimensional e o cálculo exato de trajetórias parabólicas, como o tempo de voo e o impulso dos pulos, fundamentou-se no Curso de Física Básica: Mecânica (NUSSENZVEIG, 2013)¹³.


# <a name="c4"></a>4. Desenvolvimento do Jogo

## 4.1. Desenvolvimento preliminar do jogo 

<div align = "justify">
Na primeira sprint o grupo desenvolveu a versão inicial do jogo, tendo como foco os requisitos 1 e 2 do Game Design Document (GDD). A primeira versão é composta pela tela inicial, que contém o botão "Play" para que o jogador inicie o jogo.

No decorrer do desenvolvimento, foi construída a tela de uma das fases do jogo, em que o jogador poderá explorar a sala que o personagem está e interagir com um dos items.
</div>

<div align = "center">

<sup>Figura 14: Imagem do personagem da primeira fase.</sup><br>
<img src="./assets/telaFase.jpeg" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 15: Imagem do personagem interagindo com um item.</sup><br>
<img src="./assets/interacaoItem.jpeg" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Nesta tela também foram implementados um sistema de colisão básico — em apenas alguns pontos da tela — e um balão de chat.
</div>

<div align = "center">

<sup>Figura 16: Imagem da matriz de colisão na primeira tela.</sup><br>
<img src="./assets/matrizColisaoTeste.jpeg" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 17: Imagem do balão de chat na tela.</sup><br>
<img src="./assets/interacaoChat.jpeg" width="70%"><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Para os próximos passos, o grupo deseja implementar os requisitos 3 e 4, adicionar novas fases para implemnetar os requisitos 5 e 6. </div>

## 4.2. Desenvolvimento básico do jogo 

<div align = "justify">
Na segunda sprint o desenvolvimento do jogo foi focado na implementação da tela inicial do jogo, na elaboração dos backgrounds e periféricos das fases e na correção de bugs.

No decorrer do desenvolvimento da segunda sprint, ocorreram alterações estéticas referentes aos cenários das cenas já existentes, que foram estruturados a partir de softwares voltados ao design em pixel art. </div>

<div align = "center">

<sup>Figura 18: Imagem do Laboratório de Cristal ao começo do jogo.</sup><br>
<img src="../documents/assets/labCristal1.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 19: Imagem do Laboratório de Cristal ao fim do jogo.</sup><br>
<img src="./assets/labCristal2.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Além disso, foram refatorados: os sistemas de colisão para que, ao invés de utilizar um sistema baseado na detecção de diferentes cores, fosse utilizado funções de colisão do Phaser; e a mensagem de texto, para sugerir interação, e as caixas de diálogo, para que ficassem centralizadas e não atrapalhassem a jogabilidade.
</div>

<div align = "center">

<sup>Figura 20: Imagem do Laboratório da Cena 01 no jogo.</sup><br>
<img src="./assets/faseRefactor.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div> 

<div align = "justify">
Por fim, foram desenvolvidos os designs do background utilizado na Fase 01 e dos objetos utilizados como obstáculos na cena.
</div>

<div align = "center">

<sup>Figura 21: Background utilizado na Fase 01.</sup><br>
<img src="../assets/fases/faseUm/fundoFaseUm.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 22: Objetos utilizados na Fase 01.</sup><br>
<img src="../assets/objetos/faseUm/obstaculosFaseUm.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div> 

## 4.3. Desenvolvimento intermediário do jogo 

<div align = "justify">
Durante a Sprint 3, a equipe concentrou-se na implementação de elementos narrativos e mecânicos fundamentais para o funcionamento do jogo. As atividades foram conduzidas de forma paralela entre os membros da equipe e posteriormente integradas para compor a versão intermediária do jogo entregue nesta etapa.

Uma das frentes de desenvolvimento foi a implementação do sistema de diálogos, responsável por contextualizar a narrativa e orientar o jogador. Foram criados balões de fala para os personagens Dr. Watson e Asimov, permitindo que as interações apresentem a situação do mundo e introduzam conceitos iniciais relacionados aos fundamentos da Inteligência Artificial. Esse sistema também estabelece a progressão narrativa entre o laboratório inicial, o despertar no futuro e o início da primeira fase.
</div>

<div align = "center">

<sup>Figura 23: Dialogo com Asimov no futuro.</sup><br>
<img src="./assets/printDialogo.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Paralelamente, foi realizada a criação e instanciação dos NPCs no laboratório inicial, adicionando cientistas ao cenário para tornar o ambiente mais dinâmico e reforçar a ambientação de um laboratório ativo no início da narrativa. Esses personagens ajudam a compor o contexto da história antes do evento de criogenia da protagonista.
</div>

*imagem do laboratório inicial com os NPCs

<div align = "justify">
A Fase 1 foi implementada e apresenta o robô Asimov em um cenário destruído. O personagem avança automaticamente enquanto o jogador utiliza as setas do teclado para alternar entre três faixas do cenário e a tecla espaço para realizar saltos e evitar obstáculos. A interação com o ambiente utiliza um sistema de colisão baseado na leitura de pixels da imagem de obstáculos, que reinicia a posição do personagem em caso de impacto. Ao final do percurso, o jogador encontra um baú interativo, que ativa uma sequência narrativa responsável por dar continuidade à história.
</div>

<div align = "center">

<sup>Figura 24: Fase 1</sup><br>
<img src="./assets/printFase1.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Também foi desenvolvida a cutscene do despertar de Sophia, responsável por conectar narrativamente o passado e o futuro do jogo. A animação apresenta o momento em que Asimov desperta Sophia da criogenia em um laboratório destruído, iniciando a nova etapa da história. A cutscene foi produzida em animação 2D quadro a quadro, utilizando técnicas como onion skinning, onde é possível ver os frames passados e futuros,  para garantir maior fluidez nos movimentos. </div>

<div align = "center">

<sup>Figura 25: CutScene do despertar.</sup><br>
<img src="./assets/printCutScene2.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

## 4.4. Desenvolvimento final do MVP 

<div align = "justify">
Durante a quarta sprint, foram desenvolvidas quatro fases completas, junto com cenas de transição que ajudaram a tornar a história do jogo mais clara e interessante, conectando melhor os acontecimentos e melhorando a experiência do jogador. Também foram implementadas funções matemáticas e físicas que auxiliam no funcionamento do jogo e na progressão, além de sistemas de diálogo mais organizados, facilitando a interação entre os personagens. A trilha sonora foi adicionada às cenas e fases, contribuindo para a ambientação do jogo. As atividades foram divididas entre os integrantes do grupo de acordo com as habilidades de cada um, o que ajudou no andamento do trabalho.


Um dos principais pontos de desenvolvimento do grupo foram os sistemas de diálogo e  as dinâmicas voltadas ao funcionamento das fases. Foram desenvolvidos mais sistemas de diálogos para as fases e cenas pré-fase para melhor imersão do jogador na narrativa do jogo e para apresentação dos conceitos de IA de forma mais dinâmica. </div>

<div align = "center">

<sup>Figura 26: Caixa de diálogo.</sup><br>
<img src="./assets/faseRefactor.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Paralelamente, foram desenvolvidas as mecânicas das fases e os conceitos teóricos trabalhados em cada uma. A segunda fase do jogo aborda o funcionamento das Redes Neurais Artificiais de forma simples, começando com comparações com o cérebro humano e usando recursos visuais para mostrar como ocorre a entrada de dados, o processamento e o aprendizado no Deep Learning com redes neurais.


<div align = "center">

<sup>Figura 27: Fase 02.</sup><br>
<img src="./assets/faseRedes.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
A terceira fase  tem como objetivo ilustrar a necessidade de uma separação e coleta de dados bem realizada, nela foi desenvolvido um mini game de plataforma no qual o jogador tem que coletar os cristais corretos, com características previamente informadas e quantidade predefinida de quantos cristais devem ser coletados. Já a quarta fase foi criada com o intuito de ensinar sobre limpeza de dados, utilizando recursos visuais de limpeza de imagens e conceitos teóricos. </div>

<div align = "center">

<sup>Figura 28: Fase 03.</sup><br>
<img src="./assets/labFaseTres.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>


<sup>Figura 29: Fase 04.</sup><br>
<img src="./assets/faseQuatro.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Por fim, a quinta fase foi desenvolvida para finalizar o jogo para que, após a apresentação dos fundamentos da Inteligência Artificial, ensinar a definição de um prompt e a importância da ética na criação dele e treinar o conhecimento do usuário em relação ao assunto. Nessa parte do jogo, o usuário recebe exemplos de prompts reais submetidos às IAs e classificá-los entre corretos e incorretos, sendo necessário um mínimo de acertos para aferir o conhecimento do jogador. </div>

<div align = "center">

<sup>Figura 30: Fase 05.</sup><br>
<img src="./assets/faseCinco.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">

Também foram desenvolvidas cenas entre as fases com o objetivo de aumentar a imersão do jogador na história do jogo. Na primeira cena, acontece um diálogo entre Sophia e Watson, que apresenta o contexto do projeto criado por eles junto com os cientistas.
 
<div align = "center">

<sup>Figura 31: Caixa de diálogo inicial.</sup><br>
<img src="./assets/dialogoInicial.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">
Já na segunda cena há um diálogo entre Sophia e Asimov, onde o robô explica o contexto em que se encontra a humanidade após a viagem de Sophia. Além disso, também foram desenvolvidas as cenas da queda de Sophia antes da fase três, cenas de conversas entre Sophia e Asimov onde ele explica alguns conceitos importantes e a cena de restauração da energia do laboratório do jogo. </div>

<div align = "center">

<sup>Figura 32: Caixa de diálogo entre Asimov e Sophia.</sup><br>
<img src="./assets/dialogoContexto.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

<div align = "justify">

Por fim, também houve ajustes na tela inicial do jogo para que ficasse mais alinhada com a paleta de cores do projeto, deixando a interface mais consistente e agradável visualmente. Além disso, foi adicionado um menu com instruções dos controles, ajudando o usuário a entender melhor como realizar a movimentação e as ações dentro do jogo.

<div align = "center">

<sup>Figura 33: Nova tela inicial.</sup><br>
<img src="./assets/novaTelaInicial.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

<sup>Figura 34: Novo menu.</sup><br>
<img src="./assets/novoMenu.png" width = '70%' ><br>
<sub>Fonte: Autoria própria (2026). </sub><br>

</div>

## 4.5. Revisão do MVP 

*Descreva e ilustre aqui o desenvolvimento dos refinamentos e revisões da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar.*

# <a name="c5"></a>5. Testes

## 5.1. Casos de Teste 

| Pré-condição                                                                | Descrição do teste                                                   | Pós-condição                                                                                              |
|-----------------------------------------------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Estar na tela de início                                                     | Pressionar botão 'Options'                                           | Abrir menu do jogo                                                                                        |
| Jogo iniciado                                                               | Pressionar setas ou WASD                                             | Personagem se move corretamente nas direções designadas                                                   |
| Personagem próximo a obstáculo/colisão                                      | Movimentar personagem contra a parede/objeto                         | Personagem não atravessa a parede ou o objeto                                                             |
| Estar perto do personagem Watson                                            | Pressionar tecla E                                                   | Caixa de diálogo e textos são exibidos na tela                                                            |
| Função de diálogo ativada                                                   | Pressionar tecla E                                                   | Mudança do texto exibido na caixa de diálogo                                                              |
| Explicação por personagem finalizada                                        | Pressionar tecla E                                                   | Caixa de diálogo para de ser exibida                                                                      |
| Ter interagido com o personagem Watson e estar próximo da câmara criogência | Pressionar tecla E                                                   | Vídeo de transição é executado corretamento dentro do espaço designado e transferência para cena seguinte |
| Estar próximo de personagem Asimov                                          | Pressionar tecla E                                                   | Caixa de diálogo e textos são exibidos na tela                                                            |
| Ter dialogado com Asimov                                                    | Finalizar diálogo antes da Fase 01                                   | Sprite de Sophia não se sobrepõe à animação de Asimov andando automaticamente                             |
| Estar na fase 01                                                            | Apertar tecla SPACE                                                  | Personagem deve pular corretamente                                                                        |
| Estar na fase 01                                                            | Colidir com um obstáculo                                             | Reiniciar fase 01                                                                                         |
| Estar perto de um baú                                                       | Pressionar tecla E                                                   | Baú abrir e dar as informações necessárias                                                                |
| Ter coletado a carta vermelha                                               | Pressioná-la 9 vezes                                                 | Carta abrir e mostrar texto corretamente                                                                  |
| Estar na fase 02                                                            | Apertar nos neurônios de Asimov                                      | Os neurônios devem acender suas luzes na ordem certa com o clique em cima delas                           |
| Finalizar fase 02                                                           | Pressionar tecla E para abrir o baú                                  | Executar corretamente animação de chão quebrando e Sophia caindo                                          |
| Estar na fase 03                                                            | Apertar tecla SPACE e direcionar personagem na direção de plataforma | Personagem deve colidir corretamente com a plataforma                                                     |
| Chegar ao topo do cenário da fase 03                                        | Coletar todos os cristais corretos e pular em direção à corda        | Seguir para a próxima cena                                                                                |
| Dialogar com Asimov                                                         | Pressionar tecla E para ler documentos                               | Abrir corretamente documnetação e ser direcionado à fase 04                                               |
| Estar na fase 04                                                            | Pressionar botão direito do mouse e arrastar na imagem               | Nitidez crescente nos pontos selecionados da imagem                                                       |
| Realizar limpeza da imagem                                                  | Possuir nitidez de 99%                                               | Ser direcionado à cena seguinte                                                                           |
| Estar na fase cinco                                                         | Classificar afirmação como correta ou incorreta                      | Crescimento da contagem de acertos e erros                                                                |

## 5.2. Testes de jogabilidade (playtests) 

### 5.2.1 Registros de testes

**Testes de guerrilha**

Os testes foram conduzidos em ambiente de sala de aula, durante o horário da disciplina de UX Design. A amostra foi composta por alunos do primeiro ano de diferentes cursos do Inteli, com idades entre 17 e 20 anos, apresentando nível de conhecimento básico ou superficial em Inteligência Artificial. As sessões ocorreram em computadores equipados com sistema operacional Windows 11, utilizando o navegador Google Chrome como plataforma de execução.

| Nome | Felipe |
|-----------------------------------------|----|
| Já possuía experiência prévia com games? | Sim, é um jogador casual |
| Conseguiu iniciar o jogo? | Não |
| Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes |
| Conseguiu progredir no jogo? | Sim |
| Apresentou dificuldades? | Sim |
| Que nota deu ao jogo? | 7.0 |
| O que gostou no jogo? | Os mini games |
| O que poderia melhorar no jogo? | O personagem poderia se mover mais rápido. Bug da sala do cristal. Limpar o cristal com cliques não sobe a barra. Na questão das perguntas ele respondeu uma errado e deu certo |


| Nome | Luis |
| --- | --- |
| Já possuía experiência prévia com games? | Sim, é um jogador casual |
| Conseguiu iniciar o jogo? | Sim |
| Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes |
| Conseguiu progredir no jogo? | Sim  |
| Apresentou dificuldades? | Sim |
| Que nota deu ao jogo? | 9.0 |
| O que gostou no jogo? | Design e animações |
| O que poderia melhorar no jogo? | Colocar indicadores para orientar o jogador sobre o que deve fazer, reduzindo a necessidade de explicações longas. Diminuir principalmente os textos dos documentos, já que fogem da proposta do jogo, que deve ser mais lúdica. Se o conteúdo dos papéis não tiver função prática na jogabilidade, não há necessidade de mantê-los. Além disso, melhorar o áudio: conforme o diálogo avança, inserir sons adequados, como efeitos de pulo e interação, para enriquecer a experiência |


| Nome | João |
| --- | --- |
| Já possuía experiência prévia com games? | Sim, é um jogador casual |
| Conseguiu iniciar o jogo? | Sim |
| Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes |
| Conseguiu progredir no jogo? | Sim  |
| Apresentou dificuldades? | Sim |
| Que nota deu ao jogo? | 8.0 |
| O que gostou no jogo? | Gostou do Asimov e da dinâmica de explicação com o mesmo. Gostou da história, da ideia de que você está no laboratório e você precisa salvar o mundo |
| O que poderia melhorar no jogo? | Substituir assets que parecem não combinar com o jogo. Correção de bug entre a parede e o baú. Melhorar a explicação das mecânicas (especialmente algumas serem com o mouse e outras com o E). Explicar melhor sobre os prompts e selecionar eles com a setinha e não com o mouse. Criar uma tela de finalização do jogo. Diminuir textos muito longos e monótonos |


| Nome | Manuela |
| --- | --- |
| Já possuía experiência prévia com games? | Sim, é um jogador casual |
| Conseguiu iniciar o jogo? | Não |
| Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes |
| Conseguiu progredir no jogo? | Sim  |
| Apresentou dificuldades? | Sim |
| Que nota deu ao jogo? | 8.0 |
| O que gostou no jogo? | A historia ficou muito boa |
| O que poderia melhorar no jogo? | Mecânicas e teclas. O ultimo baú ela interagiu e não apareceu nada, Sophia por cima do papel e muito texto |


| Nome | Augusto |
| --- | --- |
| Já possuía experiência prévia com games? | Sim, é um jogador casual |
| Conseguiu iniciar o jogo? | Sim |
| Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes |
| Conseguiu progredir no jogo? | Sim  |
| Apresentou dificuldades? | Sim |
| Que nota deu ao jogo? | 7.0 |
| O que gostou no jogo? | O aprendizado está bem desenvolvido, com um bom equilíbrio entre design e informações. Os minigames são bem feitos e divertidos, especialmente nas partes como o cérebro do robô, contribuindo positivamente para a experiência geral de aprendizado no jogo. A movimentação do personagem também está muito boa — o pulo e a velocidade estão bem ajustados, tornando a jogabilidade fluida e agradável. Além disso, o cenário é interessante e interativo, com diversos objetos que enriquecem a exploração |
| O que poderia melhorar no jogo? | Há excesso de texto nas conversas, e não está claro qual personagem está falando. Uma solução é diferenciar as falas usando cores distintas nas caixas de diálogo, facilitando a identificação. Os arquivos da copiadora também estão muito grandes, o que acaba prejudicando a imersão do jogador. Além disso, os prompts não estão claros e acabam gerando confusão. No parkour, é importante deixar explícito que, ao pegar o item falso, o jogo deve ser reiniciado. Seria interessante adicionar uma cutscene de transição após o parkour, mostrando o personagem escalando até chegar à parte do baú. As transições, de modo geral, estão confusas e com informação demais em texto, o que quebra o ritmo do jogo — é importante reduzir e distribuir melhor essas informações. O cenário também pode ser mais conectado e exploratório, pois atualmente as áreas parecem soltas e pouco intuitivas. Tornar a progressão das fases mais linear pode ajudar na compreensão do jogador. Por fim, ajustar a contagem de acertos da fase 5 para 10 e, no geral, reduzir a quantidade de informação apresentada ao jogador para melhorar a experiência |


| Nome | Rafael |
--- | ---
Já possuía experiência prévia com games? | Sim, é um jogador casual
Conseguiu iniciar o jogo? | Sim
Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes
Conseguiu progredir no jogo? | Sim  
Apresentou dificuldades? | Sim
Que nota deu ao jogo? | 7.5
O que gostou no jogo? | Gostou da história do jogo (o que mais prendeu ele). Gostou da variedade de minigames
O que poderia melhorar no jogo? | Não entendia o que devia ser feito em alguns momentos do jogo (instruções vagas). Sofreu com lag. Diminuir a quantidade de texto dos diálogos


Nome | Ana 
--- | ---
Já possuía experiência prévia com games? | Sim, é um jogador casual
Conseguiu iniciar o jogo? | Sim
Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes
Conseguiu progredir no jogo? | Sim  
Apresentou dificuldades? | Sim
Que nota deu ao jogo? | 9.0
O que gostou no jogo? | Os minigames foram muito bem elogiados, destacando-se como um dos pontos fortes do jogo
O que poderia melhorar no jogo? | Algumas partes apresentam excesso de texto, o que pode prejudicar o ritmo do jogo. É recomendável resumir as informações e torná-las mais objetivas, especialmente no início, para não sobrecarregar o jogador logo nos primeiros momentos


Nome | Raissa 
--- | ---
Já possuía experiência prévia com games? | Não
Conseguiu iniciar o jogo? | Sim
Entendeu as regras e mecânicas do jogo? | Sim, entendeu em partes
Conseguiu progredir no jogo? | Sim  
Apresentou dificuldades? | Sim
Que nota deu ao jogo? | 7.0
O que gostou no jogo? | O jogo realmente ensina os conceitos de IA, apresentando um bom nível de aprofundamento nos diálogos. Por isso, eles acabam sendo um pouco mais longos. Além disso, o jogo possui uma certa complexidade e consegue engajar o jogador, já que as fases são variadas entre si. Isso é um ponto positivo, pois evita que a experiência se torne monótona
O que poderia melhorar no jogo? | Em relação a melhorias, acredito que o jogo poderia incluir instruções mais claras sobre como navegar e sobre as regras. Por exemplo, na parte em que o personagem precisa pular, inicialmente não fica evidente essa ação — pode-se pensar que ele atravessaria o portal automaticamente. Também há um bug em que o personagem atravessa o robô, o que prejudica a experiência. Outro ponto é em relação aos diálogos geradas por IA, sendo interessante revisá-los e reduzir um pouco o tamanho dos textos, pois a leitura pode se tornar cansativa


**Testes com público-alvo**

Os testes foram conduzidos em ambiente de sala de aula, durante o horário da disciplina de UX Design. A amostra foi composta por alunos do primeiro ano de diferentes cursos do Inteli, com idades entre 17 e 20 anos, apresentando nível de conhecimento básico ou superficial em Inteligência Artificial. As sessões ocorreram em computadores equipados com sistema operacional Windows 11, utilizando o navegador Google Chrome como plataforma de execução.

Número formulário | 1 
--- | ---
Qual a faixa sua etária? | 19 a 20 anos
Com qual gênero você se identifica? | Homem
Em que ano da faculdade você se encontra? | 1º ano
Qual a sua relação com jogo e vídeo games? | Jogo casualmente, algumas vezes na semana
O jogo foi frustrante ou irritante? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi entediante ou cansativo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
O jogo foi confuso ou desconexo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Qual sua nota para nosso jogo? (1 a 10) | 7
Achei o objetivo do jogo confuso? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Achei os comandos e interações confusos? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Os controles do jogo são desconfortáveis ou atrapalham a jogar? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
O objetivo do jogo é claro e faz sentido? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
Os minigames do jogo possuem comandos claros? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 5
Qual foi o melhor momento do jogo? | O minigames de limpar as informações
Qual foi o pior momento do jogo? | A parte final onde não houve instrução do que fazer
Você precisou de ajuda ou instrução e algum momento do jogo? Por quê? | Sim, porque não ficou claro o que fazer na parte do baú no final
Se você pudesse alterar, adicionar ou retirar algo do jogo, o quê seria? (Pergunta opcional) | Adicionar algo no baú final e aumentar a velocidade do jogador
Você conseguiu aprender com o jogo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 5
O que você achou do processo de aprendizado do jogo? | Legal


Número formulário | 2 
--- | ---
Qual a faixa sua etária? | 17 a 18 anos
Com qual gênero você se identifica? | Homem
Em que ano da faculdade você se encontra? | 1º ano
Qual a sua relação com jogo e vídeo games? | Jogo casualmente, algumas vezes na semana
O jogo foi frustrante ou irritante? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
O jogo foi entediante ou cansativo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi confuso ou desconexo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
Qual sua nota para nosso jogo? (1 a 10) | 8
Achei o objetivo do jogo confuso? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
Achei os comandos e interações confusos? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Os controles do jogo são desconfortáveis ou atrapalham a jogar? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O objetivo do jogo é claro e faz sentido? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 5
Os minigames do jogo possuem comandos claros? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Qual foi o melhor momento do jogo? | Gostei das dinâmicas de explicação e depois algum mini game com mecânicas aplicando essas informações. Além disso, gostei da relação com o Robô Asimov
Qual foi o pior momento do jogo? | Quando o jogo travou e tive que reiniciá-lo duas vezes, além de ter que ler um documento de textos grande
Você precisou de ajuda ou instrução e algum momento do jogo? Por quê? | Não
Se você pudesse alterar, adicionar ou retirar algo do jogo, o quê seria? (Pergunta opcional) | 
Você conseguiu aprender com o jogo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
O que você achou do processo de aprendizado do jogo? | Gostei muito do processo e é divertido e engajante, com uma história muito boa e bem pensada


Número formulário | 3 
--- | ---
Qual a faixa sua etária? | 17 a 18 anos
Com qual gênero você se identifica? | Mulher
Em que ano da faculdade você se encontra? | 1º ano
Qual a sua relação com jogo e vídeo games? | Jogo casualmente, algumas vezes na semana
O jogo foi frustrante ou irritante? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi entediante ou cansativo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi confuso ou desconexo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Qual sua nota para nosso jogo? (1 a 10) | 8
Achei o objetivo do jogo confuso? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Achei os comandos e interações confusos? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
Os controles do jogo são desconfortáveis ou atrapalham a jogar? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
O objetivo do jogo é claro e faz sentido? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
Os minigames do jogo possuem comandos claros? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Qual foi o melhor momento do jogo? | Não consegui pensar em um momento de destaque
Qual foi o pior momento do jogo? | Não teve um momento que me desagradou
Você precisou de ajuda ou instrução e algum momento do jogo? Por quê? | Sim, porque os comandos não estavam intuitivos com base na minha experiência com outros jogos
Se você pudesse alterar, adicionar ou retirar algo do jogo, o quê seria? (Pergunta opcional) | Alterar os comandos de diálogo: passar o diálogo no E não é comum, é usual isso ocorrer no Enter ou espaço. Além disso, o minigame é meio confuso e não retoma os comandos, perdendo a intuitividade. A única forma, no jogo inteiro, de saber os comandos é por meio da aba opções no menu inicial
Você conseguiu aprender com o jogo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
O que você achou do processo de aprendizado do jogo? | Sinto que não houve um aprendizado ativo no jogo


Número formulário | 4 
--- | ---
Qual a faixa sua etária? | 17 a 18 anos
Com qual gênero você se identifica? | Homem
Em que ano da faculdade você se encontra? | 1º ano
Qual a sua relação com jogo e vídeo games? | Jogo casualmente, algumas vezes na semana
O jogo foi frustrante ou irritante? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi entediante ou cansativo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi confuso ou desconexo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Qual sua nota para nosso jogo? (1 a 10) | 7
Achei o objetivo do jogo confuso? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Achei os comandos e interações confusos? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Os controles do jogo são desconfortáveis ou atrapalham a jogar? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O objetivo do jogo é claro e faz sentido? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Os minigames do jogo possuem comandos claros? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
Qual foi o melhor momento do jogo? | Quando eu entrei na sala e teve a cutscene do robô
Qual foi o pior momento do jogo? | Na fase dos codigos que eu tenho que colocar a bola no circulo
Você precisou de ajuda ou instrução e algum momento do jogo? Por quê? | Não
Se você pudesse alterar, adicionar ou retirar algo do jogo, o quê seria? (Pergunta opcional) | 
Você conseguiu aprender com o jogo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 3
O que você achou do processo de aprendizado do jogo? | Achei o jogo bem legal no sentido de jogar porém admito que quando estava jogando não reparei muito no aprendizado e foquei muito mais no jogo e nos minigames deixando um pouco de lado esse fator didático


Número formulário | 5 
--- | ---
Qual a faixa sua etária? | 19 a 20 anos
Com qual gênero você se identifica? | Homem
Em que ano da faculdade você se encontra? | 1º ano
Qual a sua relação com jogo e vídeo games? | Jogo raramente
O jogo foi frustrante ou irritante? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
O jogo foi entediante ou cansativo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
O jogo foi confuso ou desconexo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Qual sua nota para nosso jogo? (1 a 10) | 7
Achei o objetivo do jogo confuso? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Achei os comandos e interações confusos? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 2
Os controles do jogo são desconfortáveis ou atrapalham a jogar? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 1
O objetivo do jogo é claro e faz sentido? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
Os minigames do jogo possuem comandos claros? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 4
Qual foi o melhor momento do jogo? | O mais legal que achei foi a parte de pular e pegar os cristais azuis
Qual foi o pior momento do jogo? | A parte do jogo em que você limpa a tela, achei a menos intuitiva
Você precisou de ajuda ou instrução e algum momento do jogo? Por quê? | Sim, por falta de alguns detalhes no HUD que ainda não foram implementados mas estão no planejamento
Se você pudesse alterar, adicionar ou retirar algo do jogo, o quê seria? (Pergunta opcional) | Eu diminuiria o tamanho dos jornais que aparecem em uma parte do jogo, os textos são grandes
Você conseguiu aprender com o jogo? (1 a 5) - 1 discordo totalmente e 5 concordo totalmente | 5
O que você achou do processo de aprendizado do jogo? | Achei bem legal e com aprofundamento para as pessoas realmente adquirirem conhecimento

### 5.2.2 Melhorias

Com base nos testes de jogabilidade realizados, foi possível perceber de forma clara a utilidade e a usabilidade dos minigames, assim como a força do storytelling na construção da experiência. Os minigames se destacaram como o ponto mais positivo do jogo, sendo frequentemente elogiados pelos participantes, especialmente pela variedade de mecânicas e diversão, que tornou a experiência mais dinâmica e leve durante todo o jogo. Já a história do jogo também foi muito bem avaliada, sendo uma história bem construída e envolvente. Além disso, os participantes gostaram muito dos personagens e dos elementos visuais, com destaque para os designs e as cutscenes que foram feitas 100% à mão, trazendo um senso autêntico e esteticamente positivo.

No entanto, os testes também evidenciaram problemas relevantes, especialmente relacionados à experiência do usuário, como o excesso de texto, onde em momentos como conversas entre os personagens e documentos presentes no jogo exigiam muito tempo de leitura do usuário. Outro ponto também foi a falta de clareza nas instruções, que alguns dos participantes ficaram levemente perdidos e sem saber exatamente o que fazer. Problemas como inconsistência e ausência de elementos de HUD, além de bugs técnicos que impactaram a jogabilidade também foram vistos. Esses pontos foram recorrentes entre os feedbacks, indicando a necessidade de melhorias estruturais na comunicação com o jogador.

Diante desse cenário, torna-se necessário aprimorar a UX do jogo, com foco na redução da carga cognitiva do jogador. Isso pode ser alcançado por meio da diminuição e simplificação dos diálogos e textos apresentados, especialmente em momentos que exigem maior atenção, buscando equilibrar melhor a quantidade de informação sem comprometer a profundidade do conteúdo e sua proposta educacional. Também é fundamental refinar o sistema de HUD e de orientação ao jogador (player guidance), de modo a tornar mais claros os objetivos e as ações esperadas em cada fase. Isso envolve tanto a melhoria dos indicadores já existentes, que se mostraram pouco eficazes durante os testes, quanto a implementação de novos elementos de apoio nas fases que ainda não contam com esse suporte. Dessa forma, busca-se reduzir momentos de incerteza e proporcionar uma navegação mais intuitiva ao longo da experiência.

Além disso, é imprescindível realizar a correção dos bugs identificados durante os testes. Considerando que as avaliações foram conduzidas sobre uma versão MVP do jogo, a ocorrência desses problemas já era esperada. Dessa forma, o processo de refatoração do código, deve visar tanto a resolução de erros previamente conhecidos quanto a correção dos novos problemas identificados a partir dos testes realizados.


# <a name="c6"></a>6. Conclusões e trabalhos futuros 

O projeto cumpriu integralmente os objetivos estabelecidos na Seção 1, alcançando de forma consistente as metas propostas de aumentar o engajamento de jovens com pouco conhecimento em IA, ao mesmo tempo em que promoveu uma melhor compreensão dos conceitos básicos de Inteligência Artificial. Além disso, conseguiu despertar o interesse dos participantes pela área, tornando o aprendizado mais atrativo e acessível, e ainda incentivou os jogadores a prosseguirem até a conclusão do jogo.

Esses objetivos foram alcançados por meio de uma experiência cuidadosamente estruturada que combina storytelling envolvente e minigames educativos, criando uma dinâmica de aprendizado mais eficaz e estimulante do que a oferecida por cursos tradicionais. Os minigames são projetados de forma objetiva e acessível, facilitando a compreensão sem abrir mão do conteúdo essencial, enquanto o storytelling, além de cativante e coeso, atua como um elemento integrador que incorpora de maneira orgânica os conceitos de IA à narrativa. Essa articulação entre narrativa e interatividade contribui para uma experiência mais imersiva, permitindo que o público-alvo, jovens universitários, vá além do uso superficial de ferramentas como chats de LLMs, passando a compreender seus fundamentos e aplicações. Dessa forma, o aprendizado ocorre de maneira engajante e gamificada, promovendo não apenas maior compreensão do conteúdo, mas também motivação genuína para concluir o jogo e aprofundar seus conhecimentos na área.

Um aspecto fundamental para o alcance desses objetivos é o fato de o jogo ser executado diretamente no navegador, sem necessidade de instalação ou hardware específico. Essa decisão técnica está diretamente alinhada com a missão do projeto, definida na seção 1.1.3, de democratizar o acesso ao conhecimento sobre IA para jovens de todas as classes sociais. Ao rodar em qualquer navegador, o jogo elimina barreiras de entrada e garante que estudantes com acesso a dispositivos modestos possam vivenciar a mesma experiência que qualquer outro jogador, colocando em prática os valores de democratização da IA e educação lúdica que norteiam o projeto.

Os testes de guerrilha e com o público-alvo confirmaram que os principais pontos fortes do jogo são justamente os minigames e o storytelling. A sinergia entre esses dois elementos ficou evidente nas respostas coletadas nos formulários de teste. Ao ser perguntado sobre o melhor momento do jogo, um participante respondeu: "Gostei das dinâmicas de explicação e depois algum minigame com mecânicas aplicando essas informações. Além disso, gostei da relação com o Robô Asimov." A qualidade individual dos minigames também foi destacada, com outro participante citando como melhor momento "o minigame de limpar as informações". Outros elogios de outros pontos do jogo foram feitos por fora das aulas, como “Esse design está muito bom, vocês não fizeram por IA, né?” isso só confirma a autenticidade do nosso conteúdo.

Os testes também revelaram pontos de melhoria importantes, como o excesso de texto nos diálogos e problemas relacionados ao HUD, especialmente sua ausência em algumas fases, o que dificultava a compreensão dos jogadores sobre seus objetivos e ações esperadas. Além disso, foram identificados diversos bugs, incluindo falhas de colisão e de mecânica, que comprometiam a fluidez da gameplay e impactavam negativamente a experiência do usuário. Ambos os problemas foram endereçados na versão seguinte do jogo, com a implementação de HUDs nas fases que ainda não os possuíam, o aprimoramento dos elementos de interface já existentes, a redução do volume de texto nos diálogos para torná-los mais objetivos, e a correção dos bugs apontados pelos usuários durante os testes. Como resultado, obteve-se uma experiência mais dinâmica, menos cansativa e com orientações mais claras, contribuindo para uma interação mais intuitiva e satisfatória por parte dos jogadores.

Um feedback recorrente apontou que o jogo, em alguns momentos, prioriza a jogabilidade em detrimento do aprendizado, ilustrado pelo seguinte comentário de um participante: "Achei o jogo bem legal no sentido de jogar, porém admito que quando estava jogando não reparei muito no aprendizado e foquei muito mais no jogo e nos minigames, deixando um pouco de lado esse fator didático." Para endereçar esse ponto, propõe-se o desenvolvimento de um sistema de revisão contínua dos conteúdos dentro do próprio jogo. Isso incluiria um inventário de conquistas que registre os conceitos aprendidos, permitindo ao jogador revisitá-los a qualquer momento, bem como a retomada periódica de conteúdos de fases anteriores por meio de alertas ou interações no jogo. Adicionalmente, também correlacionar mais explicitamente os temas entre as fases, reforçando a percepção do aprendizado como um processo contínuo e progressivo. Essas melhorias poderiam ser implementadas em uma próxima versão em até duas semanas, sendo a primeira dedicada ao desenvolvimento das funcionalidades e a segunda à validação com o público-alvo, permitindo ajustes imediatos antes da publicação da versão atualizada.

No horizonte de longo prazo, o jogo pode evoluir em duas frentes principais, ampliando ainda mais seu potencial educacional e seu poder de engajamento a partir da base já validada nos testes realizados. A primeira consiste no aprofundamento do conteúdo educacional, com a expansão do número de fases e o aumento da densidade e complexidade dos conceitos abordados, permitindo uma progressão mais estruturada e uma cobertura mais abrangente no ensino de Inteligência Artificial. A segunda frente envolve tornar a narrativa mais interativa e imprevisível, incorporando decisões do jogador que impactem diretamente o desenrolar do enredo, seguindo um modelo adotado por jogos como Detroit: Become Human. Essa abordagem ampliaria significativamente as possibilidades de interação, tornando a experiência mais personalizada e imersiva, além de fortalecer tanto o storytelling quanto o processo de aprendizagem, uma vez que um maior nível de engajamento ativo tende a favorecer a fixação do conteúdo e estimular o interesse contínuo do jogador em explorar diferentes caminhos e desdobramentos dentro do jogo, mantendo coerência com os resultados positivos já observados ao longo do desenvolvimento do projeto.

Em sua forma atual, o projeto demonstra que é possível ensinar Inteligência Artificial de maneira acessível, envolvente e inclusiva. A combinação entre uma plataforma web de fácil acesso, minigames bem executados e um storytelling cativante forma uma base sólida que já entrega valor real ao seu público-alvo. Mais do que um jogo, o projeto representa um passo concreto em direção à visão estabelecida na seção 1.1.3: ser um modelo nacional na implementação da gamificação para a educação de IA de maneira inclusiva. Com as melhorias planejadas e o potencial de expansão identificado, o jogo está posicionado para crescer tanto em profundidade pedagógica quanto em alcance, consolidando-se como uma ferramenta relevante na democratização do conhecimento em IA para jovens brasileiros.

# <a name="c7"></a>7. Referências 


¹ ABRA. A indústria de games BR e o nicho de jogos educativos. Disponível em: https://abra.com.br/artigos/a-industria-de-games-br-e-o-nicho-de-jogos-educativos. Acesso em: 27 fev. 2026.

² AMAZON WEB SERVICES. AWS DeepRacer. Disponível em: https://aws.amazon.com/pt/deepracer/. Acesso em: 27 fev. 2026.

³ GOOGLE CLOUD. Google Cloud Skills Boost. Disponível em: https://www.cloudskillsboost.google/. Acesso em: 27 fev. 2026.

⁴ CENTRO PAULA SOUZA. CPS lança curso livre online gratuito sobre inteligência artificial. Disponível em: https://www.cps.sp.gov.br/cps-lanca-curso-livre-online-gratuito-sobre-inteligencia-artificial/. Acesso em: 27 fev. 2026.

⁵ ZAKI, Adam. Less than a third of companies follow AI adoption best practices. CFO.com, 2025. Disponível em: https://www.cfo.com/news/less-than-third-of-companies-following-all-of-mckinseys-ai-best-practices-/742279/. Acesso em: 27 fev. 2026.

⁶ NORONHA, Heloísa. Rede pública x rede privada: onde estudam os brasileiros, conforme o IBGE. CNN Brasil, 2025. Disponível em: https://www.cnnbrasil.com.br/educacao/rede-publica-x-rede-privada-onde-estudam-os-brasileiros-conforme-o-ibge/. Acesso em: 27 fev. 2026.

⁷ EXAME. A carreira de IA que ninguém te contou e pode pagar até R$ 1,5 milhão por ano. Exame, 2025. Disponível em: https://exame.com/carreira/a-carreira-de-ia-que-ninguem-te-contou-e-pode-pagar-ate-rs-150-mil-por-ano/. Acesso em: 27 fev. 2026.

⁸ MARKET DATA FORECAST. Gamification education market. Disponível em: https://www.marketdataforecast.com/market-reports/gamification-education-market. Acesso em: 27 fev. 2026.

⁹ SILVA, R. F. da; RODRIGUES, N. A. P.; TOMAZINI, S. M. Um Jogo para Apoiar o Ensino de Conceitos de IA e Visão Computacional na Educação Básica. RENOTE, 2026. Disponível em: https://seer.ufrgs.br/index.php/renote/article/view/153558. Acesso em: 27 mar. 2026.

¹⁰ MICROSOFT. Teaching AI Development Through Gamification. Microsoft Tech Community, 2026. Disponível em: https://techcommunity.microsoft.com/blog/azuredevcommunityblog/teaching-ai-development-through-gamification/4490755. Acesso em: 27 mar. 2026.

¹¹ MENDONÇA, A. P. B.; ALVES, L. R. G. Cursos Online Abertos e Massivos (MOOC) em contextos corporativos: uma revisão da literatura. Texto Livre, 2024. Disponível em: https://www.scielo.br/j/tl/a/RFbMyKKQGVfWxcTNFy8FLpn/?lang=pt. Acesso em: 27 mar. 2026.

¹² HALLIDAY, D.; RESNICK, R.; WALKER, J. Fundamentos de Física — Mecânica. Vol. 1, cap. 4. 10ª ed. LTC, 2016.

¹³ NUSSENZVEIG, H. M. Curso de Física Básica — Mecânica. Vol. 1, cap. 3. 5ª ed. Blucher, 2013.

¹⁴ GOODFELLOW, I.; BENGIO, Y.; COURVILLE, A. Deep Learning. Cambridge: MIT Press, 2016. Disponível em: https://www.deeplearningbook.org. Acesso em: 27 mar. 2026.

¹⁵ UNESCO. Recomendação sobre a ética da inteligência artificial. Paris: UNESCO, 2022. Disponível em: https://unesdoc.unesco.org/ark:/48223/pf0000381137_por. Acesso em: 27 mar. 2026.

¹⁶ AMAZON WEB SERVICES. O que é visão computacional? Disponível em: https://aws.amazon.com/pt/what-is/computer-vision/. Acesso em: 27 mar. 2026.

¹⁷ Fundação Instituto de Administração. Net Promoter Score (NPS): o que é, como calcular e exemplos. Disponível em: https://fia.com.br/blog/net-promoter-score-nps/. Acesso em: 6 abr. 2026.

# <a name="c8"></a>Anexos







*Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)*
