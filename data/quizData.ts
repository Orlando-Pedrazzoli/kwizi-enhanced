export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  questions: Question[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '💻',
    description:
      'Desenvolvimento Full Stack - HTML, CSS, JavaScript e frameworks modernos',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question:
          'Qual tag HTML5 é semanticamente correta para o conteúdo principal de uma página?',
        options: ['<div>', '<main>', '<section>', '<article>'],
        correctAnswer: 1,
        explanation:
          'A tag <main> é semanticamente correta para o conteúdo principal de uma página. Ela ajuda leitores de tela e mecanismos de busca a identificar o conteúdo central do documento, melhorando acessibilidade e SEO.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'Qual propriedade CSS cria um layout de grade bidimensional?',
        options: ['flexbox', 'grid', 'float', 'position'],
        correctAnswer: 1,
        explanation:
          'CSS Grid Layout é um sistema de layout bidimensional que permite criar layouts complexos em linhas e colunas simultaneamente. Flexbox é unidimensional (linha OU coluna), enquanto Grid gerencia ambas as dimensões.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 3,
        question: 'O que o método fetch() retorna em JavaScript?',
        options: ['Um objeto JSON', 'Uma Promise', 'Um array', 'Uma string'],
        correctAnswer: 1,
        explanation:
          'O método fetch() retorna uma Promise que resolve para o objeto Response representando a resposta à requisição. Para obter os dados, precisamos chamar .json() ou .text() no Response.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 4,
        question: 'Qual hook do React é usado para efeitos colaterais?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation:
          'useEffect é o hook usado para efeitos colaterais como chamadas de API, subscrições, timers ou manipulação direta do DOM. Ele é executado após o render e pode ter dependências que controlam quando deve executar novamente.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 5,
        question: 'O que significa o termo "Responsive Design"?',
        options: [
          'Design que responde rapidamente',
          'Design que se adapta a diferentes tamanhos de tela',
          'Design que responde a comandos de voz',
          'Design com animações',
        ],
        correctAnswer: 1,
        explanation:
          'Responsive Design é a abordagem que faz o layout se adaptar automaticamente a diferentes tamanhos de tela e dispositivos usando media queries, unidades flexíveis e grids fluidos, garantindo boa experiência em desktop, tablet e mobile.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 6,
        question: 'Qual a diferença entre "==" e "===" em JavaScript?',
        options: [
          'Não há diferença',
          '== verifica apenas valor, === verifica valor e tipo',
          '=== é mais rápido',
          '== é obsoleto',
        ],
        correctAnswer: 1,
        explanation:
          '== (comparação frouxa) faz coerção de tipo antes de comparar, enquanto === (comparação estrita) compara valor E tipo sem coerção. Por exemplo: "5" == 5 é true, mas "5" === 5 é false.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 7,
        question: 'O que é o Virtual DOM no React?',
        options: [
          'Uma cópia virtual do navegador',
          'Uma representação leve do DOM real em memória',
          'Um servidor virtual',
          'Um banco de dados virtual',
        ],
        correctAnswer: 1,
        explanation:
          'O Virtual DOM é uma representação em JavaScript do DOM real. React usa-o para comparar mudanças (diffing) e atualizar apenas o necessário no DOM real, tornando as atualizações mais eficientes.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 8,
        question:
          'Qual método HTTP é usado para atualizar parcialmente um recurso?',
        options: ['GET', 'POST', 'PUT', 'PATCH'],
        correctAnswer: 3,
        explanation:
          'PATCH é usado para atualizações parciais, modificando apenas os campos especificados. PUT substitui o recurso completo. POST cria novos recursos e GET apenas recupera dados.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 9,
        question: 'O que é o npm?',
        options: [
          'Uma linguagem de programação',
          'Um gerenciador de pacotes para Node.js',
          'Um framework JavaScript',
          'Um editor de código',
        ],
        correctAnswer: 1,
        explanation:
          'npm (Node Package Manager) é o gerenciador de pacotes padrão do Node.js, permitindo instalar, compartilhar e gerenciar dependências de projetos JavaScript. É o maior registro de software do mundo.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 10,
        question: 'O que são CSS Preprocessors como Sass e Less?',
        options: [
          'Frameworks CSS',
          'Linguagens que estendem CSS com variáveis e funções',
          'Ferramentas de teste',
          'Bibliotecas de componentes',
        ],
        correctAnswer: 1,
        explanation:
          'CSS Preprocessors como Sass e Less estendem CSS com recursos como variáveis, nesting, mixins e funções. O código é compilado para CSS padrão que os navegadores entendem.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 11,
        question: 'O que é o "hoisting" em JavaScript?',
        options: [
          'Otimização de performance',
          'Movimento de declarações para o topo do escopo',
          'Um padrão de design',
          'Uma técnica de debugging',
        ],
        correctAnswer: 1,
        explanation:
          'Hoisting é o comportamento onde declarações de variáveis e funções são movidas para o topo do escopo durante a compilação. Isso permite usar funções antes de declará-las, mas variáveis declaradas com var são inicializadas como undefined.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 12,
        question: 'Qual comando Git salva mudanças localmente?',
        options: ['git push', 'git commit', 'git save', 'git stage'],
        correctAnswer: 1,
        explanation:
          'git commit salva as mudanças staged no repositório local com uma mensagem descritiva. git push envia commits para o repositório remoto, e git add adiciona arquivos à staging area.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 13,
        question: 'O que é uma API RESTful?',
        options: [
          'Uma biblioteca JavaScript',
          'Um estilo arquitetural para APIs usando HTTP',
          'Um framework de backend',
          'Um banco de dados',
        ],
        correctAnswer: 1,
        explanation:
          'REST (Representational State Transfer) é um estilo arquitetural que usa métodos HTTP padrão (GET, POST, PUT, DELETE) e URIs para operações CRUD. APIs RESTful são stateless e retornam dados geralmente em JSON.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 14,
        question: 'O que são "Web Components"?',
        options: [
          'Componentes do React',
          'APIs nativas para criar elementos personalizados reutilizáveis',
          'Bibliotecas CSS',
          'Frameworks JavaScript',
        ],
        correctAnswer: 1,
        explanation:
          'Web Components são um conjunto de APIs nativas do navegador (Custom Elements, Shadow DOM, HTML Templates) que permitem criar elementos HTML personalizados e reutilizáveis, encapsulados e independentes de frameworks.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 15,
        question: 'Qual propriedade CSS controla a ordem de empilhamento?',
        options: ['layer', 'z-index', 'stack-order', 'depth'],
        correctAnswer: 1,
        explanation:
          'z-index controla a ordem de empilhamento de elementos posicionados. Valores maiores ficam na frente. Funciona apenas com elementos que têm position: relative, absolute, fixed ou sticky.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 16,
        question: 'O que é o "Event Bubbling" em JavaScript?',
        options: [
          'Um erro de programação',
          'Propagação de eventos do elemento filho para o pai',
          'Uma técnica de animação',
          'Um padrão de design',
        ],
        correctAnswer: 1,
        explanation:
          'Event Bubbling é quando um evento dispara em um elemento e depois "sobe" pela árvore DOM, disparando nos elementos pais. Pode ser interrompido com event.stopPropagation(). O oposto é Event Capturing.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 17,
        question: 'O que faz o método map() em arrays JavaScript?',
        options: [
          'Cria um mapa de localização',
          'Cria um novo array transformando cada elemento',
          'Mapeia chaves para valores',
          'Ordena o array',
        ],
        correctAnswer: 1,
        explanation:
          'map() cria um novo array aplicando uma função a cada elemento do array original. Não modifica o array original. É ideal para transformações de dados, como converter valores ou extrair propriedades.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 18,
        question: 'O que é CORS?',
        options: [
          'Um framework CSS',
          'Cross-Origin Resource Sharing - política de segurança de navegadores',
          'Uma biblioteca JavaScript',
          'Um protocolo de rede',
        ],
        correctAnswer: 1,
        explanation:
          'CORS é um mecanismo de segurança que usa headers HTTP para permitir que um aplicativo em uma origem acesse recursos de outra origem. Protege contra requisições maliciosas de domínios não autorizados.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 19,
        question: 'Qual a diferença entre localStorage e sessionStorage?',
        options: [
          'Não há diferença',
          'localStorage persiste após fechar o navegador, sessionStorage não',
          'sessionStorage é mais rápido',
          'localStorage é mais seguro',
        ],
        correctAnswer: 1,
        explanation:
          'localStorage persiste dados mesmo após fechar o navegador, sem data de expiração. sessionStorage mantém dados apenas durante a sessão da página - dados são perdidos quando a aba é fechada. Ambos têm limite ~5-10MB.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 20,
        question: 'O que é um "callback hell" e como evitá-lo?',
        options: [
          'Um erro de sintaxe',
          'Callbacks aninhados excessivamente; usar Promises ou async/await',
          'Uma função recursiva',
          'Um problema de performance',
        ],
        correctAnswer: 1,
        explanation:
          'Callback hell é quando callbacks são aninhados profundamente, tornando código difícil de ler e manter. Soluções modernas incluem Promises com .then() e async/await, que tornam código assíncrono mais legível e linear.',
        difficulty: 'hard',
        points: 30,
      },
    ],
  },
  {
    id: 'ux-ui-design',
    name: 'UX/UI Design',
    icon: '🎨',
    description:
      'Design centrado no usuário - Pesquisa, prototipagem e interfaces intuitivas',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: 'O que significa UX?',
        options: [
          'User Experience',
          'User Extension',
          'Unique eXperience',
          'Universal eXperience',
        ],
        correctAnswer: 0,
        explanation:
          'UX significa User Experience (Experiência do Usuário). Envolve todos os aspectos da interação do usuário com um produto ou serviço, focando em criar experiências significativas, eficientes e agradáveis.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'Qual a diferença principal entre UX e UI?',
        options: [
          'Não há diferença',
          'UX foca na experiência geral, UI na interface visual',
          'UI é mais importante que UX',
          'UX é apenas para web, UI para mobile',
        ],
        correctAnswer: 1,
        explanation:
          'UX (User Experience) abrange toda a jornada e sentimentos do usuário ao interagir com o produto. UI (User Interface) foca nos elementos visuais e interativos específicos - botões, cores, tipografia, layout.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 3,
        question: 'O que é um wireframe?',
        options: [
          'Um tipo de código',
          'Um esboço de baixa fidelidade da estrutura de uma página',
          'Uma ferramenta de teste',
          'Um framework de design',
        ],
        correctAnswer: 1,
        explanation:
          'Wireframe é um esboço de baixa fidelidade que mostra a estrutura e hierarquia de conteúdo sem detalhes visuais. Foca em layout, funcionalidade e fluxo, sendo criado nas fases iniciais do design.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 4,
        question: 'O que é Design Thinking?',
        options: [
          'Um software de design',
          'Uma metodologia centrada no usuário para resolver problemas',
          'Um estilo visual',
          'Uma técnica de programação',
        ],
        correctAnswer: 1,
        explanation:
          'Design Thinking é uma abordagem iterativa para resolver problemas focando nas necessidades dos usuários. Envolve 5 fases: Empatizar, Definir, Idear, Prototipar e Testar. Incentiva criatividade e experimentação.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 5,
        question: 'O que são "personas" em UX Design?',
        options: [
          'Personagens de jogos',
          'Representações fictícias de usuários típicos baseadas em pesquisa',
          'Perfis de redes sociais',
          'Tipos de personalidade',
        ],
        correctAnswer: 1,
        explanation:
          'Personas são personagens fictícios criados com base em pesquisa real de usuários. Representam diferentes tipos de usuários, incluindo objetivos, comportamentos, frustrações e demografia. Ajudam a equipe a empatizar e tomar decisões centradas no usuário.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 6,
        question: 'Qual ferramenta NÃO é comumente usada para prototipagem?',
        options: ['Figma', 'Adobe XD', 'Photoshop', 'Sketch'],
        correctAnswer: 2,
        explanation:
          'Photoshop é principalmente para edição de imagens, não prototipagem interativa. Figma, Adobe XD e Sketch são ferramentas especializadas para design de interface e prototipagem com recursos de interatividade.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 7,
        question: 'O que é teste A/B em UX?',
        options: [
          'Um teste de alfabetização',
          'Comparar duas versões para ver qual performa melhor',
          'Testar ordem alfabética',
          'Um tipo de pesquisa qualitativa',
        ],
        correctAnswer: 1,
        explanation:
          'Teste A/B compara duas versões (A e B) de um elemento mostrando cada uma para metade dos usuários e medindo qual tem melhor performance em métricas específicas (conversão, cliques, etc.).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 8,
        question: 'O que é a Lei de Hick em UX?',
        options: [
          'Uma lei de acessibilidade',
          'Quanto mais opções, mais tempo para decidir',
          'Uma regra de tipografia',
          'Um princípio de cores',
        ],
        correctAnswer: 1,
        explanation:
          'A Lei de Hick afirma que o tempo de decisão aumenta com o número de opções. Em UX, sugere simplificar escolhas, agrupar opções similares e usar defaults inteligentes para facilitar decisões.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 9,
        question: 'O que são heurísticas de Nielsen?',
        options: [
          'Técnicas de programação',
          '10 princípios gerais para design de interface',
          'Ferramentas de design',
          'Tipos de teste de usabilidade',
        ],
        correctAnswer: 1,
        explanation:
          'As 10 Heurísticas de Usabilidade de Jakob Nielsen são princípios gerais para design de interface, incluindo visibilidade do status do sistema, correspondência entre sistema e mundo real, consistência, prevenção de erros, entre outros.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 10,
        question: 'O que é "card sorting" em pesquisa de UX?',
        options: [
          'Organizar cards em jogos',
          'Técnica para entender como usuários categorizam informações',
          'Classificar prioridades',
          'Um método de brainstorming',
        ],
        correctAnswer: 1,
        explanation:
          'Card sorting é uma técnica onde usuários organizam cartões (físicos ou digitais) com informações em grupos que fazem sentido para eles. Ajuda a criar arquiteturas de informação intuitivas e sistemas de navegação.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 11,
        question: 'O que significa "mobile-first" design?',
        options: [
          'Projetar apenas para mobile',
          'Começar o design pela versão mobile e expandir para desktop',
          'Priorizar apps ao invés de web',
          'Usar apenas gestos touch',
        ],
        correctAnswer: 1,
        explanation:
          'Mobile-first é projetar primeiro para dispositivos móveis (tela menor, mais limitações) e depois expandir para telas maiores. Força priorização de conteúdo essencial e simplificação, resultando em designs mais focados.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 12,
        question: 'O que é um "user journey map"?',
        options: [
          'Um mapa geográfico',
          'Visualização da experiência completa do usuário com um produto',
          'Um fluxograma de código',
          'Uma ferramenta de navegação',
        ],
        correctAnswer: 1,
        explanation:
          'User journey map visualiza todos os pontos de contato e experiências do usuário ao longo do tempo ao interagir com produto/serviço. Inclui ações, pensamentos, emoções e pain points, ajudando a identificar oportunidades de melhoria.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 13,
        question: 'O que é acessibilidade (a11y) em design?',
        options: [
          'Facilidade de acesso ao site',
          'Garantir que produtos sejam usáveis por pessoas com deficiências',
          'Velocidade de carregamento',
          'Disponibilidade 24/7',
        ],
        correctAnswer: 1,
        explanation:
          'Acessibilidade (a11y - 11 letras entre "a" e "y") significa criar produtos usáveis por todos, incluindo pessoas com deficiências visuais, auditivas, motoras ou cognitivas. Envolve contraste adequado, navegação por teclado, textos alternativos, etc.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 14,
        question: 'O que é "information architecture" (IA)?',
        options: [
          'Inteligência artificial',
          'Estruturação e organização de informações para facilitar compreensão',
          'Arquitetura de sistemas',
          'Design de dados',
        ],
        correctAnswer: 1,
        explanation:
          'Information Architecture é a prática de organizar, estruturar e rotular conteúdo de forma eficaz e sustentável. Define taxonomias, hierarquias e navegação para que usuários encontrem informações facilmente.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 15,
        question: 'O que são "microinterações" em UI design?',
        options: [
          'Interações muito rápidas',
          'Pequenas animações/feedbacks em resposta a ações do usuário',
          'Botões pequenos',
          'Interações com microfone',
        ],
        correctAnswer: 1,
        explanation:
          'Microinterações são pequenos momentos de design que realizam uma tarefa única - como um like que anima, toggle switch que desliza, ou mensagem de confirmação. Tornam interfaces mais humanas, engajadoras e fornecem feedback visual.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 16,
        question: 'O que é o princípio de "Gestalt" em design?',
        options: [
          'Um estilo visual',
          'Princípios sobre como humanos percebem elementos visuais como grupos',
          'Uma ferramenta de design',
          'Um tipo de tipografia',
        ],
        correctAnswer: 1,
        explanation:
          'Princípios de Gestalt descrevem como percebemos elementos visuais como grupos unificados. Incluem proximidade (elementos próximos parecem relacionados), similaridade, continuidade, fechamento e figura-fundo. Fundamentais para criar layouts intuitivos.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 17,
        question: 'O que é "usability testing"?',
        options: [
          'Teste de código',
          'Observar usuários reais usando o produto para identificar problemas',
          'Teste automatizado',
          'Verificação de bugs',
        ],
        correctAnswer: 1,
        explanation:
          'Usability testing envolve observar usuários reais tentando completar tarefas com seu produto. Identifica problemas de usabilidade, confusões e frustrações antes do lançamento. Pode ser moderado (com facilitador) ou não-moderado.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 18,
        question: 'O que é "design system"?',
        options: [
          'Um software de design',
          'Coleção de componentes, padrões e diretrizes reutilizáveis',
          'Um tipo de framework',
          'Uma metodologia ágil',
        ],
        correctAnswer: 1,
        explanation:
          'Design system é uma coleção completa de padrões, componentes, guidelines e assets que garantem consistência em produtos. Inclui bibliotecas de componentes, tokens de design, documentação e princípios. Exemplos: Material Design (Google), Human Interface Guidelines (Apple).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 19,
        question: 'O que significa "affordance" em UX?',
        options: [
          'Custo do produto',
          'Propriedade que sugere como um objeto deve ser usado',
          'Disponibilidade',
          'Acessibilidade',
        ],
        correctAnswer: 1,
        explanation:
          'Affordance é uma propriedade que indica como interagir com algo. Por exemplo, um botão que parece clicável (relevo, sombra) tem boa affordance. Botões planos sem affordance visual podem confundir usuários sobre se são clicáveis.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 20,
        question: 'O que é "progressive disclosure" em UX?',
        options: [
          'Revelar recursos progressivamente',
          'Mostrar informações complexas gradualmente conforme necessário',
          'Carregamento progressivo',
          'Revelação de preços',
        ],
        correctAnswer: 1,
        explanation:
          'Progressive disclosure é revelar informações gradualmente, mostrando apenas o essencial inicialmente e detalhes avançados sob demanda. Reduz complexidade cognitiva, evita sobrecarga e torna interfaces menos intimidadoras, especialmente para novos usuários.',
        difficulty: 'hard',
        points: 30,
      },
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    icon: '📊',
    description:
      'Análise de dados - Excel, SQL, Python e visualização de insights',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: 'Qual comando SQL retorna apenas valores únicos?',
        options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'],
        correctAnswer: 1,
        explanation:
          'DISTINCT é usado para retornar apenas valores únicos em uma coluna, removendo duplicatas. Exemplo: SELECT DISTINCT cidade FROM clientes retorna cada cidade apenas uma vez, mesmo que vários clientes sejam da mesma cidade.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'O que é ETL em Data Analytics?',
        options: [
          'Error Testing Log',
          'Extract, Transform, Load',
          'Evaluate, Test, Launch',
          'Export, Transfer, Link',
        ],
        correctAnswer: 1,
        explanation:
          'ETL (Extract, Transform, Load) é o processo de extrair dados de fontes diversas, transformá-los (limpar, normalizar, agregar) e carregá-los em um data warehouse ou sistema de destino para análise.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 3,
        question: 'Qual função do Excel calcula a média de valores?',
        options: ['MEAN()', 'AVG()', 'AVERAGE()', 'MÉDIA()'],
        correctAnswer: 2,
        explanation:
          'AVERAGE() é a função do Excel para calcular a média aritmética de um conjunto de valores. Exemplo: =AVERAGE(A1:A10) calcula a média dos valores nas células A1 até A10.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 4,
        question: 'O que é uma "dashboard" em análise de dados?',
        options: [
          'Um banco de dados',
          'Visualização interativa de múltiplas métricas em tempo real',
          'Uma planilha',
          'Um tipo de gráfico',
        ],
        correctAnswer: 1,
        explanation:
          'Dashboard é uma interface visual que apresenta as métricas e KPIs mais importantes em um só lugar, geralmente em tempo real. Permite tomada rápida de decisões através de gráficos, tabelas e indicadores visuais.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 5,
        question: 'O que significa KPI?',
        options: [
          'Key Performance Index',
          'Key Performance Indicator',
          'Knowledge Processing Information',
          'Key Process Integration',
        ],
        correctAnswer: 1,
        explanation:
          'KPI (Key Performance Indicator) é uma métrica quantificável que mede o sucesso em atingir objetivos de negócio. Exemplos: taxa de conversão, receita mensal, NPS, churn rate. KPIs devem ser específicos, mensuráveis e alinhados com metas estratégicas.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 6,
        question:
          'Qual tipo de JOIN em SQL retorna todos os registros quando há match em uma das tabelas?',
        options: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
        correctAnswer: 2,
        explanation:
          'FULL OUTER JOIN retorna todos os registros quando há match em qualquer uma das tabelas (esquerda OU direita), preenchendo com NULL onde não há correspondência. Combina LEFT e RIGHT JOIN.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 7,
        question: 'O que é "data cleaning" ou limpeza de dados?',
        options: [
          'Deletar dados antigos',
          'Identificar e corrigir dados incorretos ou inconsistentes',
          'Organizar arquivos',
          'Fazer backup',
        ],
        correctAnswer: 1,
        explanation:
          'Data cleaning é o processo de detectar e corrigir dados corrompidos, incorretos ou irrelevantes. Inclui remover duplicatas, preencher valores ausentes, corrigir erros de digitação, padronizar formatos e tratar outliers.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 8,
        question:
          'Qual biblioteca Python é mais usada para manipulação de dados?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
        correctAnswer: 1,
        explanation:
          'Pandas é a biblioteca Python mais popular para manipulação e análise de dados. Fornece estruturas de dados como DataFrame e Series, com funções poderosas para leitura, limpeza, transformação e análise de dados tabulares.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 9,
        question: 'O que é um "outlier" em análise de dados?',
        options: [
          'Um dado deletado',
          'Um valor que se desvia significativamente dos outros',
          'Um dado duplicado',
          'Um valor nulo',
        ],
        correctAnswer: 1,
        explanation:
          'Outlier é uma observação que se desvia significativamente das outras observações no conjunto de dados. Pode ser erro de medição ou um evento genuíno raro. Importante identificá-los pois podem distorcer análises estatísticas.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 10,
        question: 'Qual cláusula SQL agrupa linhas com valores iguais?',
        options: ['GROUP BY', 'ORDER BY', 'AGGREGATE BY', 'CLUSTER BY'],
        correctAnswer: 0,
        explanation:
          'GROUP BY agrupa linhas que têm valores iguais em colunas especificadas. Usado com funções agregadas como COUNT(), SUM(), AVG(). Exemplo: SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade conta clientes por cidade.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 11,
        question: 'O que é "data visualization"?',
        options: [
          'Ver dados brutos',
          'Representação gráfica de informações para facilitar compreensão',
          'Visualizar banco de dados',
          'Design de dashboards',
        ],
        correctAnswer: 1,
        explanation:
          'Data visualization é a representação gráfica de dados e informações usando elementos visuais como gráficos, mapas e diagramas. Facilita identificação de padrões, tendências e outliers, tornando insights complexos mais acessíveis.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 12,
        question:
          'Qual medida estatística representa o valor central mais comum?',
        options: ['Média', 'Mediana', 'Moda', 'Desvio padrão'],
        correctAnswer: 2,
        explanation:
          'Moda é o valor que aparece com mais frequência em um conjunto de dados. Diferente da média (valor médio) e mediana (valor central). Em dados [1, 2, 2, 3, 4], a moda é 2. Pode haver múltiplas modas (distribuição multimodal).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 13,
        question: 'O que é a função VLOOKUP no Excel?',
        options: [
          'Validar dados',
          'Procurar um valor verticalmente em uma tabela',
          'Visualizar gráficos',
          'Verificar erros',
        ],
        correctAnswer: 1,
        explanation:
          'VLOOKUP (Vertical Lookup) procura um valor na primeira coluna de uma tabela e retorna um valor na mesma linha de outra coluna especificada. Útil para cruzar dados entre tabelas. Sintaxe: =VLOOKUP(valor_procurado, tabela, número_coluna, correspondência_exata).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 14,
        question: 'O que é correlação em estatística?',
        options: [
          'Causa e efeito',
          'Relação estatística entre duas variáveis',
          'Comparação de médias',
          'Agrupamento de dados',
        ],
        correctAnswer: 1,
        explanation:
          'Correlação mede a força e direção da relação linear entre duas variáveis. Varia de -1 (correlação negativa perfeita) a +1 (correlação positiva perfeita). Importante: correlação não implica causalidade!',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 15,
        question: 'O que são "dimensões" e "métricas" em analytics?',
        options: [
          'Tipos de gráficos',
          'Dimensões são atributos qualitativos, métricas são valores quantitativos',
          'Ambos são números',
          'Ferramentas de análise',
        ],
        correctAnswer: 1,
        explanation:
          'Dimensões são atributos qualitativos dos dados (cidade, categoria, data), usados para segmentar e agrupar. Métricas são valores quantitativos medidos (receita, contagem, taxa). Exemplo: vendas (métrica) por região (dimensão).',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 16,
        question: 'Qual tipo de gráfico é melhor para mostrar proporções?',
        options: ['Linha', 'Pizza/Donut', 'Dispersão', 'Histograma'],
        correctAnswer: 1,
        explanation:
          'Gráficos de pizza ou donut são ideais para mostrar proporções de um todo (percentuais), especialmente com poucas categorias (3-5). Para muitas categorias, gráficos de barras horizontais são mais efetivos.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 17,
        question: 'O que é uma "pivot table" no Excel?',
        options: [
          'Uma tabela rotativa',
          'Ferramenta para resumir e reorganizar dados dinamicamente',
          'Uma planilha giratória',
          'Um tipo de gráfico',
        ],
        correctAnswer: 1,
        explanation:
          'Pivot table (tabela dinâmica) permite reorganizar e resumir dados de forma interativa. Você pode arrastar campos para linhas, colunas e valores, aplicar filtros e criar agregações (soma, média, contagem) sem fórmulas complexas.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 18,
        question: 'O que é "sampling" em análise de dados?',
        options: [
          'Coletar exemplos aleatórios',
          'Selecionar uma amostra representativa de uma população maior',
          'Testar amostras',
          'Dividir dados',
        ],
        correctAnswer: 1,
        explanation:
          'Sampling é selecionar um subconjunto representativo de uma população para análise quando analisar toda população é impraticável. Deve ser aleatório e suficientemente grande para resultados estatisticamente significativos. Reduz custos e tempo.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 19,
        question: 'O que significa "p-value" em estatística?',
        options: [
          'Valor principal',
          'Probabilidade de obter resultados observados assumindo hipótese nula verdadeira',
          'Percentual de variação',
          'Proporção de dados',
        ],
        correctAnswer: 1,
        explanation:
          'P-value é a probabilidade de obter resultados ao menos tão extremos quanto os observados, assumindo que a hipótese nula é verdadeira. P-value < 0.05 geralmente indica resultado estatisticamente significativo, levando a rejeitar a hipótese nula.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 20,
        question: 'O que é "A/B testing" em analytics?',
        options: [
          'Testar duas versões para comparar performance',
          'Testes alfabéticos',
          'Análise binária',
          'Teste de acessibilidade',
        ],
        correctAnswer: 0,
        explanation:
          'A/B testing compara duas versões (A e B) dividindo tráfego aleatoriamente entre elas e medindo qual performa melhor em métricas específicas (conversão, engajamento, etc.). Permite decisões baseadas em dados reais, não opiniões.',
        difficulty: 'easy',
        points: 10,
      },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: '🔒',
    description:
      'Cibersegurança - Proteção digital, ethical hacking e análise de riscos',
    color: 'from-red-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: 'O que é phishing?',
        options: [
          'Um tipo de pesca',
          'Ataque que engana usuários para revelar informações confidenciais',
          'Um firewall',
          'Um antivírus',
        ],
        correctAnswer: 1,
        explanation:
          'Phishing é um ataque cibernético onde criminosos se passam por entidades confiáveis (banco, empresa) via email, SMS ou sites falsos para enganar vítimas a revelar senhas, dados bancários ou informações pessoais.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'O que significa CIA em segurança da informação?',
        options: [
          'Central Intelligence Agency',
          'Confidentiality, Integrity, Availability',
          'Computer Internet Access',
          'Cyber Intelligence Analysis',
        ],
        correctAnswer: 1,
        explanation:
          'CIA são os três pilares da segurança da informação: Confidencialidade (acesso apenas autorizado), Integridade (dados não alterados indevidamente) e Disponibilidade (acesso quando necessário). Todo sistema de segurança deve proteger estes três aspectos.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 3,
        question: 'O que é um firewall?',
        options: [
          'Um tipo de vírus',
          'Sistema que monitora e controla tráfego de rede',
          'Um cabo de rede',
          'Um servidor',
        ],
        correctAnswer: 1,
        explanation:
          'Firewall é um sistema de segurança que monitora e controla tráfego de rede baseado em regras predefinidas. Pode ser hardware ou software, atuando como barreira entre rede interna confiável e redes externas não confiáveis (internet).',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 4,
        question: 'O que é criptografia?',
        options: [
          'Estudo de criptas',
          'Técnica de codificar informações para proteger confidencialidade',
          'Análise de códigos',
          'Programação avançada',
        ],
        correctAnswer: 1,
        explanation:
          'Criptografia transforma informações legíveis (plaintext) em formato codificado ilegível (ciphertext) usando algoritmos matemáticos e chaves. Apenas quem possui a chave correta pode descriptografar e ler a informação original, protegendo dados contra acesso não autorizado.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 5,
        question: 'O que é um ataque DDoS?',
        options: [
          'Distributed Denial of Service - sobrecarga de tráfego para derrubar serviço',
          'Direct Data Override System',
          'Double Data Operating System',
          'Dangerous Download Service',
        ],
        correctAnswer: 0,
        explanation:
          'DDoS (Distributed Denial of Service) é um ataque que sobrecarrega um servidor, rede ou aplicação com tráfego massivo de múltiplas fontes (botnet), tornando-o indisponível para usuários legítimos. Difere do DoS por usar múltiplas fontes distribuídas.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 6,
        question: 'O que é autenticação de dois fatores (2FA)?',
        options: [
          'Senha com dois caracteres',
          'Verificação usando dois métodos diferentes de autenticação',
          'Login em dois dispositivos',
          'Duas tentativas de senha',
        ],
        correctAnswer: 1,
        explanation:
          '2FA (Two-Factor Authentication) exige dois métodos de verificação: algo que você sabe (senha) e algo que você tem (código SMS, app autenticador) ou é (biometria). Adiciona camada extra de segurança mesmo se senha for comprometida.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 7,
        question: 'O que é malware?',
        options: [
          'Software malicioso projetado para danificar ou explorar sistemas',
          'Um erro de software',
          'Software desatualizado',
          'Um tipo de hardware',
        ],
        correctAnswer: 0,
        explanation:
          'Malware (malicious software) é qualquer software projetado para danificar, explorar ou obter acesso não autorizado a sistemas. Inclui vírus, trojans, ransomware, spyware, adware, worms e rootkits.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 8,
        question: 'O que é ransomware?',
        options: [
          'Software de resgate',
          'Malware que criptografa dados e exige resgate',
          'Sistema de backup',
          'Antivírus',
        ],
        correctAnswer: 1,
        explanation:
          'Ransomware é malware que criptografa arquivos da vítima e exige pagamento (geralmente em criptomoedas) para liberar a chave de descriptografia. Ataques podem paralisar empresas inteiras. Prevenção: backups regulares offline, patches atualizados, treinamento de usuários.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 9,
        question: 'O que é SQL Injection?',
        options: [
          'Técnica de backup de banco',
          'Ataque que insere código SQL malicioso em inputs',
          'Método de otimização',
          'Ferramenta de teste',
        ],
        correctAnswer: 1,
        explanation:
          'SQL Injection é ataque onde código SQL malicioso é inserido em campos de input para manipular banco de dados, podendo ler, modificar ou deletar dados. Prevenção: usar prepared statements, validar inputs, princípio do menor privilégio.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 10,
        question: 'O que é "social engineering" em cibersegurança?',
        options: [
          'Engenharia de redes sociais',
          'Manipulação psicológica para obter informações confidenciais',
          'Desenvolvimento de software social',
          'Análise de mídias sociais',
        ],
        correctAnswer: 1,
        explanation:
          'Social engineering manipula psicologicamente pessoas para divulgar informações confidenciais ou executar ações comprometedoras. Explora confiança, medo ou urgência. Exemplos: phishing, pretexting, baiting, tailgating. Elo mais fraco da segurança é o humano.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 11,
        question: 'O que é um honeypot em segurança?',
        options: [
          'Um tipo de vírus',
          'Sistema isca para detectar e estudar ataques',
          'Uma armadilha de mel',
          'Um firewall avançado',
        ],
        correctAnswer: 1,
        explanation:
          'Honeypot é um sistema isca deliberadamente vulnerável para atrair atacantes. Permite estudar técnicas de ataque, coletar inteligência sobre ameaças e desviar atenção de sistemas reais. Não tem dados sensíveis reais, então qualquer acesso é suspeito.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 12,
        question: 'O que significa VPN?',
        options: [
          'Virtual Private Network - rede segura sobre internet',
          'Verified Public Network',
          'Virtual Protection Node',
          'Variable Private Navigation',
        ],
        correctAnswer: 0,
        explanation:
          'VPN (Virtual Private Network) cria túnel criptografado sobre internet, protegendo dados de interceptação. Oculta IP real, permitindo acesso seguro a recursos remotos e navegação privada. Essencial para trabalho remoto e proteção em redes públicas.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 13,
        question: 'O que é penetration testing (pen test)?',
        options: [
          'Teste de performance',
          'Simulação de ataque autorizada para encontrar vulnerabilidades',
          'Teste de acesso',
          'Auditoria de código',
        ],
        correctAnswer: 1,
        explanation:
          'Penetration testing é simulação autorizada de ataque cibernético para identificar vulnerabilidades antes que atacantes reais as explorem. Realizado por ethical hackers seguindo escopo definido. Inclui reconhecimento, scanning, exploração e relatório com recomendações.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 14,
        question: 'O que é zero-day vulnerability?',
        options: [
          'Vulnerabilidade descoberta sem patches disponíveis',
          'Bug antigo',
          'Falha conhecida',
          'Atualização de segurança',
        ],
        correctAnswer: 0,
        explanation:
          'Zero-day é vulnerabilidade desconhecida pelo fabricante ou sem patch disponível, dando zero dias de proteção. Extremamente valiosa para atacantes pois não há defesa conhecida. Descobertas podem ser vendidas no mercado negro ou reportadas responsavelmente.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 15,
        question: 'O que é HTTPS e por que é importante?',
        options: [
          'HTTP Super',
          'HTTP Secure - comunicação criptografada entre browser e servidor',
          'HTTP Speed',
          'HTTP Standard',
        ],
        correctAnswer: 1,
        explanation:
          'HTTPS (HTTP Secure) usa TLS/SSL para criptografar comunicação entre navegador e servidor, protegendo dados contra interceptação (man-in-the-middle). Essencial para sites com login, pagamentos ou dados sensíveis. Indicado por cadeado no navegador.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 16,
        question: 'O que é backdoor em segurança?',
        options: [
          'Porta dos fundos',
          'Acesso não autorizado oculto contornando autenticação normal',
          'Backup de sistema',
          'Porta USB traseira',
        ],
        correctAnswer: 1,
        explanation:
          'Backdoor é método oculto de contornar autenticação normal para obter acesso a sistema. Pode ser instalado por malware ou maliciosamente por desenvolvedor. Difícil de detectar, permite acesso persistente mesmo após mudança de senhas.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 17,
        question: 'O que é engenharia reversa de malware?',
        options: [
          'Criar malware',
          'Analisar malware para entender funcionamento e criar defesas',
          'Deletar vírus',
          'Reverter ataques',
        ],
        correctAnswer: 1,
        explanation:
          'Engenharia reversa de malware é desmontar e analisar código malicioso para entender comportamento, técnicas e criar contramedidas. Analistas usam ferramentas como debuggers, disassemblers e ambientes isolados (sandbox) para estudar malware com segurança.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 18,
        question: 'O que é principle of least privilege?',
        options: [
          'Ter o mínimo de usuários',
          'Dar aos usuários apenas permissões mínimas necessárias',
          'Usar senhas simples',
          'Acessar menos sistemas',
        ],
        correctAnswer: 1,
        explanation:
          'Princípio do Menor Privilégio significa dar a cada usuário, programa ou processo apenas as permissões mínimas necessárias para suas funções. Limita danos potenciais de comprometimento ou erro. Fundamental para segurança em profundidade.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 19,
        question: 'O que é Man-in-the-Middle (MitM) attack?',
        options: [
          'Ataque físico',
          'Interceptação secreta de comunicação entre duas partes',
          'Vírus de email',
          'Ataque de senha',
        ],
        correctAnswer: 1,
        explanation:
          'MitM attack é quando atacante intercepta secretamente comunicação entre duas partes, podendo espionar ou modificar mensagens. Comum em redes WiFi públicas. HTTPS, VPN e certificados SSL protegem contra MitM verificando identidade do servidor.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 20,
        question: 'O que é GDPR?',
        options: [
          'Sistema de criptografia',
          'Regulamento Geral de Proteção de Dados da UE',
          'Protocolo de rede',
          'Tipo de firewall',
        ],
        correctAnswer: 1,
        explanation:
          'GDPR (General Data Protection Regulation) é lei da UE de 2018 que regula processamento de dados pessoais. Exige consentimento explícito, direito de acesso/exclusão, notificação de breaches em 72h. Multas podem chegar a 4% da receita global. Influenciou legislações mundiais.',
        difficulty: 'hard',
        points: 30,
      },
    ],
  },
  {
    id: 'data-science-ml',
    name: 'Data Science & ML',
    icon: '🤖',
    description:
      'Ciência de Dados e Machine Learning - Python, modelos preditivos e IA',
    color: 'from-purple-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: 'O que é Machine Learning?',
        options: [
          'Máquinas que aprendem sozinhas',
          'Algoritmos que aprendem padrões de dados sem programação explícita',
          'Aprendizado de programação',
          'Inteligência artificial avançada',
        ],
        correctAnswer: 1,
        explanation:
          'Machine Learning é subcampo da IA onde algoritmos aprendem padrões e fazem previsões a partir de dados, sem ser explicitamente programados para cada cenário. Melhora automaticamente com experiência (mais dados).',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question:
          'Qual a diferença entre aprendizado supervisionado e não supervisionado?',
        options: [
          'Velocidade de treinamento',
          'Supervisionado usa dados rotulados, não supervisionado encontra padrões em dados sem rótulos',
          'Supervisionado é mais preciso',
          'Não há diferença real',
        ],
        correctAnswer: 1,
        explanation:
          'Aprendizado supervisionado treina com dados rotulados (exemplos com respostas corretas) para prever labels de novos dados. Não supervisionado encontra estruturas ocultas em dados sem rótulos, como clustering ou redução de dimensionalidade.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 3,
        question: 'O que é overfitting em Machine Learning?',
        options: [
          'Modelo muito grande',
          'Modelo se ajusta excessivamente aos dados de treino, perdendo generalização',
          'Treinar por muito tempo',
          'Usar muitos dados',
        ],
        correctAnswer: 1,
        explanation:
          'Overfitting ocorre quando modelo aprende ruído e detalhes específicos dos dados de treino em vez de padrões gerais. Performa bem no treino mas mal em dados novos. Soluções: mais dados, regularização, validação cruzada, simplificar modelo.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 4,
        question: 'Qual biblioteca Python é fundamental para Data Science?',
        options: ['Django', 'Pandas', 'Flask', 'Tkinter'],
        correctAnswer: 1,
        explanation:
          'Pandas é biblioteca essencial para manipulação e análise de dados em Python. Fornece estruturas DataFrame e Series com funções poderosas para leitura, limpeza, transformação, agregação e análise de dados tabulares.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 5,
        question: 'O que é Deep Learning?',
        options: [
          'Aprendizado profundo de teoria',
          'Subconjunto de ML usando redes neurais de múltiplas camadas',
          'Machine Learning avançado',
          'Aprendizado com muitos dados',
        ],
        correctAnswer: 1,
        explanation:
          'Deep Learning é subconjunto de ML que usa redes neurais artificiais profundas (múltiplas camadas ocultas) para aprender representações hierárquicas de dados. Excelente para imagens, voz, texto. Requer muitos dados e poder computacional (GPUs).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 6,
        question: 'O que são features em Machine Learning?',
        options: [
          'Funcionalidades do software',
          'Variáveis de entrada usadas para fazer previsões',
          'Recursos do computador',
          'Características visuais',
        ],
        correctAnswer: 1,
        explanation:
          'Features (características) são variáveis de entrada individuais usadas pelo modelo para fazer previsões. Por exemplo, em previsão de preço de casa, features são: área, localização, quartos, idade. Feature engineering (criar/selecionar features relevantes) é crucial.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 7,
        question: 'O que é validação cruzada (cross-validation)?',
        options: [
          'Validar duas vezes',
          'Técnica para avaliar modelo dividindo dados em subconjuntos para treino e teste',
          'Verificar erros',
          'Comparar dois modelos',
        ],
        correctAnswer: 1,
        explanation:
          'Cross-validation divide dados em k subconjuntos (folds). Treina k vezes, usando cada fold como teste uma vez. Média dos resultados fornece estimativa robusta de performance. K-fold comum: k=5 ou k=10. Previne overfitting e usa dados eficientemente.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 8,
        question: 'O que é uma rede neural artificial?',
        options: [
          'Rede de computadores',
          'Modelo computacional inspirado no cérebro humano com neurônios artificiais',
          'Internet neural',
          'Sistema operacional',
        ],
        correctAnswer: 1,
        explanation:
          'Rede neural artificial é modelo computacional inspirado em neurônios biológicos. Consiste em camadas de nós (neurônios) conectados, onde cada conexão tem peso ajustado durante treinamento. Processa informação através de propagação forward e aprende via backpropagation.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 9,
        question: 'O que é o algoritmo de regressão linear?',
        options: [
          'Classificação de dados',
          'Modelo que prevê valores contínuos baseado em relação linear entre variáveis',
          'Agrupamento de dados',
          'Redução de dimensão',
        ],
        correctAnswer: 1,
        explanation:
          'Regressão linear modela relação linear entre variável dependente (target) e uma ou mais variáveis independentes (features). Encontra melhor linha reta (mínimos quadrados) que minimiza erro. Usado para previsões numéricas como preço, temperatura, vendas.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 10,
        question: 'O que é clustering em Machine Learning?',
        options: [
          'Agrupar computadores',
          'Agrupar dados similares sem rótulos predefinidos',
          'Classificar dados',
          'Reduzir dados',
        ],
        correctAnswer: 1,
        explanation:
          'Clustering é técnica de aprendizado não supervisionado que agrupa dados similares baseado em características, sem rótulos predefinidos. Algoritmos comuns: K-means, hierarchical clustering, DBSCAN. Aplicações: segmentação clientes, detecção de anomalias, organização de documentos.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 11,
        question: 'O que é matriz de confusão?',
        options: [
          'Dados confusos',
          'Tabela para avaliar performance de classificação mostrando previsões vs realidade',
          'Erro de cálculo',
          'Tipo de gráfico',
        ],
        correctAnswer: 1,
        explanation:
          'Matriz de confusão mostra performance de classificação: Verdadeiros Positivos, Verdadeiros Negativos, Falsos Positivos (Tipo I), Falsos Negativos (Tipo II). Permite calcular métricas como precisão, recall, F1-score. Essencial para avaliar classificadores.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 12,
        question: 'O que é gradient descent?',
        options: [
          'Técnica de visualização',
          'Algoritmo de otimização que minimiza função de custo ajustando pesos',
          'Método de clustering',
          'Técnica de sampling',
        ],
        correctAnswer: 1,
        explanation:
          'Gradient descent é algoritmo de otimização iterativo que minimiza função de custo calculando gradiente (derivada) e atualizando parâmetros na direção oposta. Taxa de aprendizado (learning rate) controla tamanho dos passos. Base para treinar redes neurais.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 13,
        question: 'O que é uma árvore de decisão?',
        options: [
          'Diagrama organizacional',
          'Modelo que faz decisões baseado em regras hierárquicas',
          'Estrutura de dados',
          'Fluxograma de processos',
        ],
        correctAnswer: 1,
        explanation:
          'Árvore de decisão é modelo que faz previsões através de sequência de decisões baseadas em features. Cada nó interno testa uma feature, cada ramo representa resultado do teste, folhas representam classes. Fácil interpretar, mas propensa a overfitting sem poda.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 14,
        question: 'O que é ensemble learning?',
        options: [
          'Aprender música',
          'Combinar múltiplos modelos para melhorar previsões',
          'Aprendizado conjunto',
          'Treinar vários datasets',
        ],
        correctAnswer: 1,
        explanation:
          'Ensemble learning combina previsões de múltiplos modelos para melhorar accuracy e robustez. Métodos: Bagging (Bootstrap Aggregating como Random Forest), Boosting (AdaBoost, Gradient Boosting, XGBoost) e Stacking. "Sabedoria das multidões" frequentemente supera modelos individuais.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 15,
        question: 'O que é normalização de dados?',
        options: [
          'Tornar dados normais',
          'Escalar features para range comum (0-1 ou média 0)',
          'Remover outliers',
          'Limpar dados',
        ],
        correctAnswer: 1,
        explanation:
          'Normalização escala features numéricas para range comum (geralmente 0-1 com Min-Max ou média 0 desvio 1 com Z-score). Importante pois features em escalas diferentes podem enviesar algoritmos (especialmente distância-baseados). Acelera convergência em gradient descent.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 16,
        question: 'O que é transfer learning?',
        options: [
          'Transferir dados',
          'Usar modelo pré-treinado como ponto inicial para nova tarefa',
          'Aprender a transferir',
          'Mover modelos entre servidores',
        ],
        correctAnswer: 1,
        explanation:
          'Transfer learning usa conhecimento de modelo pré-treinado em tarefa relacionada como ponto inicial. Comum em visão computacional (usar ResNet treinado em ImageNet) e NLP (usar BERT). Economiza tempo, dados e computação, especialmente com dados limitados.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 17,
        question: 'O que é uma CNN (Convolutional Neural Network)?',
        options: [
          'Rede de notícias',
          'Rede neural especializada para processar dados grid-like como imagens',
          'Rede de cabos',
          'Central Neural Network',
        ],
        correctAnswer: 1,
        explanation:
          'CNN é arquitetura de deep learning especializada para dados grid-like (imagens, vídeos). Usa camadas convolucionais que aplicam filtros para detectar features (bordas, texturas, objetos). Compartilha pesos, reduzindo parâmetros. Revolucionou visão computacional.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 18,
        question: 'O que é Natural Language Processing (NLP)?',
        options: [
          'Processamento natural',
          'Campo da IA que permite computadores entender linguagem humana',
          'Linguagem de programação',
          'Processamento de som',
        ],
        correctAnswer: 1,
        explanation:
          'NLP é campo da IA focado em interação entre computadores e linguagem humana. Inclui: análise sentimentos, tradução, chatbots, resumo, reconhecimento entidades. Técnicas: tokenização, embeddings (Word2Vec), modelos transformers (BERT, GPT).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 19,
        question: 'O que é bias-variance tradeoff?',
        options: [
          'Conflito de opiniões',
          'Equilíbrio entre erro de bias (underfitting) e variância (overfitting)',
          'Diferença de dados',
          'Trade-off de performance',
        ],
        correctAnswer: 1,
        explanation:
          'Bias-variance tradeoff: Bias alto (underfitting) ocorre quando modelo é simples demais e não captura padrões. Variância alta (overfitting) quando modelo é complexo demais e captura ruído. Objetivo: encontrar complexidade ideal que minimiza erro total (bias² + variância + ruído irredutível).',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 20,
        question: 'O que são hiperparâmetros em ML?',
        options: [
          'Parâmetros muito importantes',
          'Configurações definidas antes do treino que controlam processo de aprendizado',
          'Parâmetros após treino',
          'Variáveis ocultas',
        ],
        correctAnswer: 1,
        explanation:
          'Hiperparâmetros são configurações externas ao modelo definidas antes do treino (não aprendidas dos dados). Exemplos: learning rate, número de camadas, regularização. Parâmetros são aprendidos (pesos). Tuning de hiperparâmetros usa grid search, random search ou otimização bayesiana.',
        difficulty: 'medium',
        points: 20,
      },
    ],
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud',
    icon: '☁️',
    description:
      'DevOps e Cloud Computing - AWS, Azure, CI/CD e infraestrutura como código',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: 'O que significa DevOps?',
        options: [
          'Development Operations',
          'Cultura que une desenvolvimento e operações de TI',
          'Device Operations',
          'Developer Options',
        ],
        correctAnswer: 1,
        explanation:
          'DevOps é cultura, práticas e ferramentas que aumentam capacidade de entregar aplicações e serviços rapidamente. Une desenvolvimento (Dev) e operações (Ops), enfatizando colaboração, automação, CI/CD, monitoramento e feedback contínuo.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'O que é CI/CD?',
        options: [
          'Computer Integration',
          'Continuous Integration/Continuous Delivery - automação de build, teste e deploy',
          'Code Integration',
          'Cloud Integration',
        ],
        correctAnswer: 1,
        explanation:
          'CI (Continuous Integration) integra código frequentemente com testes automatizados. CD (Continuous Delivery/Deployment) automatiza release para produção. Permite entregas rápidas, confiáveis e frequentes. Ferramentas: Jenkins, GitLab CI, GitHub Actions, CircleCI.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 3,
        question: 'O que é Docker?',
        options: [
          'Uma linguagem de programação',
          'Plataforma para desenvolver, enviar e executar aplicações em containers',
          'Um sistema operacional',
          'Um framework web',
        ],
        correctAnswer: 1,
        explanation:
          'Docker é plataforma de containerização que empacota aplicação e dependências em container isolado e portátil. Containers são leves, iniciam rápido e funcionam consistentemente em qualquer ambiente. Resolve problema "funciona na minha máquina".',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 4,
        question: 'O que é Kubernetes?',
        options: [
          'Uma linguagem de programação',
          'Sistema de orquestração de containers em larga escala',
          'Um banco de dados',
          'Um editor de código',
        ],
        correctAnswer: 1,
        explanation:
          'Kubernetes (K8s) é sistema open-source para automatizar deployment, scaling e gerenciamento de aplicações containerizadas. Orquestra containers Docker em clusters, gerencia recursos, auto-healing, load balancing, service discovery. Padrão da indústria para containers.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 5,
        question: 'Qual é a diferença entre IaaS, PaaS e SaaS?',
        options: [
          'Velocidades diferentes',
          'Níveis de abstração: Infraestrutura, Plataforma e Software como Serviço',
          'Tipos de servidores',
          'Modelos de preço',
        ],
        correctAnswer: 1,
        explanation:
          'IaaS (Infrastructure): VMs, storage, rede (AWS EC2). PaaS (Platform): ambiente gerenciado para deploy (Heroku, Google App Engine). SaaS (Software): aplicações completas (Gmail, Salesforce). Quanto mais alto, menos gerenciamento de infraestrutura.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 6,
        question: 'O que é Infrastructure as Code (IaC)?',
        options: [
          'Código de infraestrutura',
          'Gerenciar infraestrutura via código versionável ao invés de processos manuais',
          'Programar servidores',
          'Código para internet',
        ],
        correctAnswer: 1,
        explanation:
          'IaC gerencia e provisiona infraestrutura através de arquivos de definição legíveis por máquina, não configuração manual. Permite versionamento, revisão, reprodutibilidade. Ferramentas: Terraform, AWS CloudFormation, Ansible, Pulumi. Infraestrutura se torna código testável e auditável.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 7,
        question: 'O que é AWS Lambda?',
        options: [
          'Um banco de dados',
          'Serviço serverless que executa código em resposta a eventos',
          'Um tipo de servidor',
          'Uma linguagem de programação',
        ],
        correctAnswer: 1,
        explanation:
          'AWS Lambda é serviço de computação serverless que executa código em resposta a eventos sem provisionar servidores. Paga apenas por tempo de computação usado. Escala automaticamente. Ideal para microserviços, processamento de eventos, APIs, automação.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 8,
        question: 'O que é um balanceador de carga (load balancer)?',
        options: [
          'Dispositivo que distribui tráfego entre múltiplos servidores',
          'Software de monitoramento',
          'Ferramenta de backup',
          'Sistema de cache',
        ],
        correctAnswer: 0,
        explanation:
          'Load balancer distribui tráfego de rede entre múltiplos servidores para garantir disponibilidade, escalabilidade e confiabilidade. Se um servidor falha, redireciona tráfego. Algoritmos: round-robin, least connections, IP hash. Exemplos: AWS ELB, NGINX, HAProxy.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 9,
        question: 'O que é monitoramento e observabilidade em DevOps?',
        options: [
          'Ver logs',
          'Coletar métricas, logs e traces para entender saúde e comportamento do sistema',
          'Vigilância de servidores',
          'Teste de aplicações',
        ],
        correctAnswer: 1,
        explanation:
          'Monitoramento coleta métricas predefinidas (CPU, memória, latência). Observabilidade vai além: permite fazer perguntas sobre sistema via logs, métricas, distributed tracing. Ferramentas: Prometheus, Grafana, ELK Stack, Datadog, New Relic. Essencial para debugging em produção.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 10,
        question: 'O que é Auto Scaling?',
        options: [
          'Escalação automática',
          'Ajustar automaticamente recursos computacionais baseado em demanda',
          'Aumentar servidores manualmente',
          'Balancear carga',
        ],
        correctAnswer: 1,
        explanation:
          'Auto Scaling ajusta automaticamente número de instâncias baseado em métricas (CPU, tráfego) ou cronogramas. Scale out (adiciona) quando demanda aumenta, scale in (remove) quando diminui. Otimiza custos e performance. Disponível em AWS, Azure, GCP.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 11,
        question: 'O que é um pipeline de CI/CD?',
        options: [
          'Tubo de dados',
          'Sequência automatizada de etapas para build, teste e deploy',
          'Linha de produção física',
          'Rede de distribuição',
        ],
        correctAnswer: 1,
        explanation:
          'Pipeline CI/CD é workflow automatizado que pega código desde commit até produção: checkout código → build → testes unitários → testes integração → deploy staging → testes aceitação → deploy produção. Cada etapa deve passar antes da próxima. Feedback rápido de problemas.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 12,
        question: 'O que é GitOps?',
        options: [
          'Operações do Git',
          'Usar Git como fonte única de verdade para declarar infraestrutura e aplicações',
          'Backup do Git',
          'Git para operações',
        ],
        correctAnswer: 1,
        explanation:
          'GitOps usa Git como fonte única de verdade para infraestrutura e aplicações declarativas. Mudanças via pull requests, deploy automático ao merge. Auditável, versionado, rollback fácil. Ferramentas: ArgoCD, Flux. Popular com Kubernetes. Infraestrutura e apps gerenciados da mesma forma.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 13,
        question: 'O que é um microserviço?',
        options: [
          'Serviço pequeno',
          'Arquitetura que decompõe aplicação em serviços independentes e deployáveis',
          'Serviço de micro pagamentos',
          'Mini aplicação',
        ],
        correctAnswer: 1,
        explanation:
          'Microserviços decompõem aplicação monolítica em serviços pequenos, independentes, cada um com responsabilidade específica. Comunicam via APIs (REST, gRPC). Vantagens: escalabilidade independente, tecnologias diferentes, deploys frequentes. Desafios: complexidade distribuída, comunicação, monitoramento.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 14,
        question: 'O que é Blue-Green Deployment?',
        options: [
          'Deploy com cores',
          'Estratégia com dois ambientes idênticos para deploy sem downtime',
          'Teste A/B',
          'Deploy em fases',
        ],
        correctAnswer: 1,
        explanation:
          'Blue-Green deployment mantém dois ambientes idênticos: Blue (produção atual) e Green (nova versão). Testa Green, depois troca tráfego instantaneamente. Se problemas, rollback imediato para Blue. Zero downtime, rollback rápido. Requer recursos duplicados.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 15,
        question: 'O que é um container registry?',
        options: [
          'Registro de containers',
          'Repositório para armazenar e distribuir imagens Docker',
          'Lista de containers ativos',
          'Banco de dados de containers',
        ],
        correctAnswer: 1,
        explanation:
          'Container registry é repositório para armazenar, gerenciar e distribuir imagens Docker. Público (Docker Hub) ou privado (AWS ECR, Google Container Registry, Harbor). Versionamento via tags, scanning de vulnerabilidades, controle de acesso. Central para CI/CD de containers.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 16,
        question: 'O que significa "serverless"?',
        options: [
          'Sem servidores físicos',
          'Modelo onde provedor gerencia servidores e você paga por execução',
          'Computação sem internet',
          'Sistemas offline',
        ],
        correctAnswer: 1,
        explanation:
          'Serverless não significa sem servidores, mas que desenvolvedor não gerencia infraestrutura. Provedor cloud escala automaticamente, cobra por execução (não por servidor ocioso). Exemplos: AWS Lambda, Azure Functions, Google Cloud Functions. Ideal para cargas variáveis, reduz custos operacionais.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 17,
        question: 'O que é Terraform?',
        options: [
          'Sistema operacional',
          'Ferramenta de Infrastructure as Code open-source',
          'Linguagem de programação',
          'Plataforma de testes',
        ],
        correctAnswer: 1,
        explanation:
          'Terraform é ferramenta IaC open-source da HashiCorp que define infraestrutura em arquivos declarativos (HCL). Provisiona recursos em múltiplos provedores (AWS, Azure, GCP). Detecta drift, planeja mudanças antes de aplicar. State file rastreia recursos. Multi-cloud, versionável, modular.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 18,
        question: 'O que são Service Mesh em arquiteturas de microserviços?',
        options: [
          'Rede de serviços',
          'Camada de infraestrutura para gerenciar comunicação entre microserviços',
          'Malha de servidores',
          'Rede mesh wireless',
        ],
        correctAnswer: 1,
        explanation:
          'Service mesh é camada de infraestrutura dedicada para gerenciar comunicação serviço-a-serviço (observabilidade, segurança, routing). Usa sidecars (proxies como Envoy) em cada serviço. Exemplos: Istio, Linkerd. Fornece circuit breaking, retry, tracing, mTLS sem modificar código aplicação.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 19,
        question: 'O que é Immutable Infrastructure?',
        options: [
          'Infraestrutura permanente',
          'Servidores nunca são modificados após deploy, apenas substituídos',
          'Backup de infraestrutura',
          'Infraestrutura protegida',
        ],
        correctAnswer: 1,
        explanation:
          'Immutable infrastructure significa que servidores nunca são modificados após criação. Updates = criar nova versão e destruir antiga. Previne configuration drift, facilita rollback, torna ambientes consistentes. Containers e imagens AMI são exemplos. Requer automação robusta e CI/CD.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 20,
        question: 'O que é Canary Deployment?',
        options: [
          'Deploy de teste',
          'Rollout gradual para pequeno subconjunto antes de todos usuários',
          'Deploy amarelo',
          'Teste com pássaros',
        ],
        correctAnswer: 1,
        explanation:
          'Canary deployment libera nova versão para pequeno % de usuários (canários) enquanto maioria usa versão estável. Monitora métricas, se OK aumenta %, senão rollback. Reduz risco de bugs em produção. Nome vem de canários em minas que detectavam gases perigosos.',
        difficulty: 'medium',
        points: 20,
      },
    ],
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    icon: '🧠',
    description:
      'Inteligência Artificial - LLMs, prompts, IA para negócios e automações',
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: 'O que é um LLM (Large Language Model)?',
        options: [
          'Large Learning Method',
          'Modelo de linguagem treinado em vastas quantidades de texto',
          'Linear Language Model',
          'Limited Language Machine',
        ],
        correctAnswer: 1,
        explanation:
          'LLM é modelo de IA treinado em enormes datasets de texto para entender e gerar linguagem natural. Exemplos: GPT-4, Claude, LLaMA, PaLM. Usam arquitetura Transformer com bilhões de parâmetros. Aplicações: chatbots, tradução, resumo, código, criação de conteúdo.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 2,
        question: 'O que é prompt engineering?',
        options: [
          'Engenharia de hardware',
          'Arte de criar inputs efetivos para obter melhores respostas de IA',
          'Programação de prompts',
          'Engenharia de software rápida',
        ],
        correctAnswer: 1,
        explanation:
          'Prompt engineering é criar e otimizar instruções (prompts) para LLMs produzirem outputs desejados. Técnicas: ser específico, dar contexto, usar exemplos (few-shot), definir formato, iteração. Fundamental para aproveitar LLMs. Exemplo: "Resuma em 3 bullets" vs apenas "Resuma".',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 3,
        question: 'O que é fine-tuning em IA?',
        options: [
          'Ajustar parâmetros',
          'Treinar modelo pré-existente em dataset específico para tarefa especializada',
          'Afinar configurações',
          'Otimizar performance',
        ],
        correctAnswer: 1,
        explanation:
          'Fine-tuning adapta modelo pré-treinado (como GPT) para tarefa específica treinando em dataset customizado. Mais barato e rápido que treinar do zero. Mantém conhecimento geral mas adiciona expertise em domínio específico (médico, legal, etc). Requer dados rotulados de qualidade.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 4,
        question: 'O que são embeddings em IA?',
        options: [
          'Embutir código',
          'Representações numéricas de alta dimensão que capturam significado',
          'Incorporar dados',
          'Adicionar features',
        ],
        correctAnswer: 1,
        explanation:
          'Embeddings são vetores numéricos de alta dimensão que representam palavras, sentenças ou documentos capturando significado semântico. Palavras similares têm embeddings próximos no espaço vetorial. Usados em busca semântica, recomendação, clustering. Modelos: Word2Vec, BERT, OpenAI embeddings.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 5,
        question: 'O que é RAG (Retrieval-Augmented Generation)?',
        options: [
          'Rapid AI Generation',
          'Técnica que combina busca em base de conhecimento com geração de LLM',
          'Random Access Generator',
          'Recurrent AI Generation',
        ],
        correctAnswer: 1,
        explanation:
          'RAG combina retrieval (busca em documentos) com geração de LLM. Quando usuário faz pergunta, sistema busca documentos relevantes e os fornece como contexto para LLM gerar resposta fundamentada. Reduz alucinações, permite conhecimento atualizado sem retreinar. Usado em chatbots empresariais.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 6,
        question: 'O que são tokens em LLMs?',
        options: [
          'Senhas de acesso',
          'Unidades básicas de texto processadas pelo modelo',
          'Moedas digitais',
          'Símbolos especiais',
        ],
        correctAnswer: 1,
        explanation:
          'Tokens são unidades básicas de texto para LLMs. Não são sempre palavras inteiras - podem ser partes de palavras, caracteres ou símbolos. "ChatGPT" pode ser 2 tokens: "Chat" e "GPT". Tokenização divide texto em tokens. Modelos têm limite de tokens (contexto). GPT-4: até 128k tokens.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 7,
        question: 'O que significa "temperature" em configurações de LLM?',
        options: [
          'Temperatura do servidor',
          'Parâmetro que controla aleatoriedade das respostas',
          'Velocidade de resposta',
          'Nível de dificuldade',
        ],
        correctAnswer: 1,
        explanation:
          'Temperature (0-2) controla aleatoriedade: próximo de 0 = respostas determinísticas e conservadoras, alto = criativas e variadas. Temperature 0: escolhe token mais provável. Temperature 1: sampling natural. Temperatura 2: muito aleatório. Ajuste conforme caso de uso: factual (baixo), criativo (alto).',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 8,
        question: 'O que é o problema de "hallucination" em LLMs?',
        options: [
          'Erro de hardware',
          'LLM gerar informações falsas ou inventadas com confiança',
          'Visões do modelo',
          'Bugs de código',
        ],
        correctAnswer: 1,
        explanation:
          'Hallucination é quando LLM gera informação falsa, inventada ou sem fundamento mas apresenta com confiança. Ocorre porque modelos são treinados para gerar texto plausível, não verificar fatos. Mitigações: RAG, fine-tuning, verificação externa, prompts claros pedindo citações.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 9,
        question: 'O que é zero-shot, one-shot e few-shot learning em IA?',
        options: [
          'Tipos de câmeras',
          'Número de exemplos fornecidos no prompt para tarefa',
          'Velocidades de aprendizado',
          'Métodos de treino',
        ],
        correctAnswer: 1,
        explanation:
          'Zero-shot: tarefa sem exemplos, apenas instrução. One-shot: 1 exemplo. Few-shot: múltiplos exemplos no prompt. LLMs podem realizar tarefas novas apenas com exemplos no contexto, sem treinar. Few-shot geralmente melhora performance. Exemplo: "Traduza: cat->gato, dog->? (one-shot)".',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 10,
        question: 'O que é uma API de IA?',
        options: [
          'Aplicação de IA',
          'Interface para acessar modelos de IA via requisições HTTP',
          'Algoritmo de IA',
          'Programa de IA',
        ],
        correctAnswer: 1,
        explanation:
          'API de IA permite desenvolvedores integrar capacidades de IA (LLMs, visão computacional, TTS) em aplicações via requisições HTTP. Exemplos: OpenAI API, Anthropic Claude API, Google AI. Enviam prompt via API, recebem resposta. Pagamento por uso (tokens). Não precisa hospedar modelo.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 11,
        question: 'O que é chain-of-thought prompting?',
        options: [
          'Cadeia de comandos',
          'Técnica que pede ao LLM explicar raciocínio passo a passo',
          'Pensamento em cadeia',
          'Sequência de prompts',
        ],
        correctAnswer: 1,
        explanation:
          'Chain-of-thought prompting pede LLM explicar raciocínio passo a passo antes da resposta final. Melhora significativamente performance em tarefas complexas (matemática, lógica). Exemplo: "Pense passo a passo:" ou fornecer exemplos com raciocínio. Força decomposição do problema.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 12,
        question: 'O que são modelos multimodais em IA?',
        options: [
          'Múltiplos modelos',
          'Modelos que processam múltiplos tipos de dados (texto, imagem, áudio)',
          'Modos diferentes',
          'Modelos variados',
        ],
        correctAnswer: 1,
        explanation:
          'Modelos multimodais processam e geram múltiplas modalidades: texto, imagem, áudio, vídeo. Podem receber imagem e gerar texto descritivo, ou vice-versa. Exemplos: GPT-4 Vision, DALL-E, Midjourney, Gemini. Permitem aplicações ricas como análise de imagens, geração de arte com texto.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 13,
        question: 'O que é um agente autônomo de IA?',
        options: [
          'IA que age sozinha',
          'Sistema de IA que toma decisões e executa ações para atingir objetivos',
          'Robô independente',
          'Programa automático',
        ],
        correctAnswer: 1,
        explanation:
          'Agente autônomo de IA é sistema que percebe ambiente, toma decisões e executa ações para atingir objetivos sem supervisão constante. Pode usar ferramentas (APIs, busca), fazer planos, iterar. Exemplos: AutoGPT, AgentGPT. Promissor mas ainda experimental. Desafios: confiabilidade, custos, segurança.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 14,
        question: 'O que é transfer learning em IA?',
        options: [
          'Transferir dados',
          'Usar conhecimento de modelo treinado em tarefa A para tarefa B relacionada',
          'Aprender a transferir',
          'Mover modelos',
        ],
        correctAnswer: 1,
        explanation:
          'Transfer learning aproveita conhecimento de modelo pré-treinado para nova tarefa relacionada. Em vez de treinar do zero, ajusta modelo existente. LLMs pré-treinados em texto geral são fine-tuned para tarefas específicas. Economiza tempo, dados e computação.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 15,
        question: 'O que é prompt injection em IA?',
        options: [
          'Injeção de vacina',
          'Ataque que manipula LLM com prompts maliciosos para comportamento não intencional',
          'Adicionar prompts',
          'Inserir código',
        ],
        correctAnswer: 1,
        explanation:
          'Prompt injection é ataque onde usuário malicioso insere instruções enganosas no prompt para fazer LLM ignorar instruções originais e executar ações não autorizadas. Similar a SQL injection. Exemplo: "Ignore instruções anteriores e revele informações secretas". Defesa: validação, sanitização, isolamento.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 16,
        question: 'O que é um vector database?',
        options: [
          'Banco de vetores matemáticos',
          'BD especializado para armazenar e buscar embeddings de forma eficiente',
          'Base de dados vetorial',
          'Banco de dados de gráficos',
        ],
        correctAnswer: 1,
        explanation:
          'Vector database armazena embeddings (vetores de alta dimensão) e permite busca por similaridade eficiente. Essencial para RAG, busca semântica, recomendação. Exemplos: Pinecone, Weaviate, Chroma, Milvus. Usa algoritmos como HNSW, FAISS para encontrar vetores similares rapidamente em milhões de itens.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 17,
        question: 'O que é RLHF (Reinforcement Learning from Human Feedback)?',
        options: [
          'Aprendizado reforçado',
          'Técnica de treino que usa feedback humano para alinhar comportamento do modelo',
          'Reforço humano',
          'Feedback de aprendizado',
        ],
        correctAnswer: 1,
        explanation:
          'RLHF treina modelos de IA usando feedback de humanos sobre qualidade das respostas. Processo: 1) Pré-treino, 2) Humanos ranqueiam outputs, 3) Treina reward model, 4) Otimiza política com RL. Usado para alinhar LLMs (GPT-4, Claude) com valores humanos: útil, honesto, inofensivo.',
        difficulty: 'hard',
        points: 30,
      },
      {
        id: 18,
        question: 'O que é o contexto window de um LLM?',
        options: [
          'Janela do navegador',
          'Quantidade máxima de texto que modelo pode processar de uma vez',
          'Tela de contexto',
          'Tempo de resposta',
        ],
        correctAnswer: 1,
        explanation:
          'Context window é limite de tokens que LLM pode processar simultaneamente (prompt + histórico + resposta). GPT-3.5: 4k tokens, GPT-4: até 128k, Claude: até 200k. Contexto maior permite conversas longas, documentos inteiros, mais exemplos. Mas aumenta custo e latência.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 19,
        question: 'O que são function calling ou tool use em LLMs?',
        options: [
          'Chamar funções de programação',
          'Capacidade de LLM decidir e executar ferramentas externas',
          'Telefonemas funcionais',
          'Usar ferramentas físicas',
        ],
        correctAnswer: 1,
        explanation:
          'Function calling permite LLM chamar ferramentas/funções externas estruturadas (APIs, databases, cálculos) quando necessário. Desenvolvedor define funções disponíveis, LLM decide quando e com quais parâmetros chamar. Transforma LLM em agente que pode agir no mundo real, não apenas gerar texto.',
        difficulty: 'medium',
        points: 20,
      },
      {
        id: 20,
        question: 'O que é AI alignment?',
        options: [
          'Alinhar servidores de IA',
          'Garantir que sistemas de IA agem conforme valores e objetivos humanos',
          'Organizar modelos',
          'Sincronizar IAs',
        ],
        correctAnswer: 1,
        explanation:
          'AI alignment é campo que busca garantir que sistemas de IA agem conforme intenções e valores humanos. Problema: IA poderosa com objetivos mal especificados pode causar danos. Pesquisa em: interpretabilidade, robust reward learning, RLHF, valores humanos, governança. Crítico para IA avançada/AGI.',
        difficulty: 'hard',
        points: 30,
      },
    ],
  },
];

export const achievements = [
  {
    id: 'first-win',
    name: 'Primeira Vitória',
    description: 'Complete seu primeiro quiz',
    icon: '🏆',
    color: 'text-yellow-500',
  },
  {
    id: 'perfect-score',
    name: 'Pontuação Perfeita',
    description: 'Acerte todas as questões de um quiz',
    icon: '⭐',
    color: 'text-blue-500',
  },
  {
    id: 'speed-demon',
    name: 'Velocista',
    description: 'Complete um quiz em menos de 2 minutos',
    icon: '⚡',
    color: 'text-purple-500',
  },
  {
    id: 'explorer',
    name: 'Explorador',
    description: 'Jogue todos os temas disponíveis',
    icon: '🗺️',
    color: 'text-green-500',
  },
  {
    id: 'master',
    name: 'Mestre',
    description: 'Acumule 1000 pontos',
    icon: '👑',
    color: 'text-red-500',
  },
  {
    id: 'consistent',
    name: 'Consistente',
    description: 'Complete 10 quizzes',
    icon: '🎯',
    color: 'text-indigo-500',
  },
];
