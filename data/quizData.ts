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
    id: 'programacao',
    name: 'Programação',
    icon: '💻',
    description: 'Teste seus conhecimentos em desenvolvimento de software',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: 'O que significa o princípio DRY em programação?',
        options: [
          'Do Repeat Yourself',
          "Don't Repeat Yourself",
          'Develop Rapidly Yearly',
          'Debug Right Yesterday'
        ],
        correctAnswer: 1,
        explanation: "DRY significa 'Don't Repeat Yourself' (Não se Repita). É um princípio fundamental da programação que enfatiza a redução da duplicação de código. Quando você segue o DRY, você evita repetir a mesma lógica em vários lugares do seu código, facilitando a manutenção e reduzindo bugs.",
        difficulty: 'easy',
        points: 10
      },
      {
        id: 2,
        question: 'Qual é a principal diferença entre let e var em JavaScript?',
        options: [
          'let é mais rápido que var',
          'var tem escopo de bloco, let tem escopo de função',
          'let tem escopo de bloco, var tem escopo de função',
          'Não há diferença'
        ],
        correctAnswer: 2,
        explanation: "A principal diferença é que 'let' tem escopo de bloco (block scope), enquanto 'var' tem escopo de função (function scope). Isso significa que uma variável declarada com 'let' só existe dentro do bloco {} onde foi declarada, enquanto 'var' é visível em toda a função. Por exemplo, em um loop for, uma variável 'let' não vaza para fora do loop, mas 'var' sim.",
        difficulty: 'medium',
        points: 20
      },
      {
        id: 3,
        question: 'O que é um closure em JavaScript?',
        options: [
          'Uma função que fecha o navegador',
          'Uma função que tem acesso ao escopo da função pai',
          'Uma função sem parâmetros',
          'Uma forma de fechar conexões HTTP'
        ],
        correctAnswer: 1,
        explanation: 'Um closure é uma função que tem acesso às variáveis do escopo externo (função pai) mesmo após a função pai ter terminado de executar. Isso acontece porque JavaScript mantém uma referência ao ambiente onde a função foi criada. Closures são muito úteis para criar funções privadas e factory functions.',
        difficulty: 'hard',
        points: 30
      },
      {
        id: 4,
        question: 'Qual é o padrão de design usado para criar uma única instância de uma classe?',
        options: [
          'Factory Pattern',
          'Observer Pattern',
          'Singleton Pattern',
          'Decorator Pattern'
        ],
        correctAnswer: 2,
        explanation: 'O Singleton Pattern garante que uma classe tenha apenas uma única instância e fornece um ponto global de acesso a ela. É útil quando você precisa controlar o acesso a recursos compartilhados, como uma conexão com banco de dados. No entanto, deve ser usado com cuidado, pois pode dificultar testes e criar dependências ocultas.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 5,
        question: 'O que é TypeScript?',
        options: [
          'Uma biblioteca JavaScript',
          'Um superset de JavaScript com tipagem estática',
          'Um framework de backend',
          'Uma linguagem de banco de dados'
        ],
        correctAnswer: 1,
        explanation: 'TypeScript é um superset de JavaScript desenvolvido pela Microsoft que adiciona tipagem estática opcional à linguagem. Isso significa que todo código JavaScript válido também é código TypeScript válido, mas TypeScript oferece recursos adicionais como tipos, interfaces e genéricos que ajudam a prevenir erros durante o desenvolvimento.',
        difficulty: 'easy',
        points: 10
      }
    ]
  },
  {
    id: 'ciencia',
    name: 'Ciências',
    icon: '🔬',
    description: 'Explore os mistérios da ciência',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: 'Qual é a velocidade da luz no vácuo?',
        options: [
          '300.000 km/s',
          '150.000 km/s',
          '450.000 km/s',
          '200.000 km/s'
        ],
        correctAnswer: 0,
        explanation: 'A velocidade da luz no vácuo é aproximadamente 299.792.458 metros por segundo, geralmente arredondada para 300.000 km/s. Esta é uma constante fundamental da física, representada pela letra "c". Nada no universo pode viajar mais rápido que a luz no vácuo, de acordo com a Teoria da Relatividade de Einstein.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 2,
        question: 'Quantos cromossomos possui uma célula humana normal?',
        options: [
          '23 cromossomos',
          '46 cromossomos',
          '48 cromossomos',
          '52 cromossomos'
        ],
        correctAnswer: 1,
        explanation: 'Uma célula humana normal possui 46 cromossomos, organizados em 23 pares. Desses, 22 pares são cromossomos autossômicos (iguais em homens e mulheres) e 1 par é de cromossomos sexuais (XX para mulheres e XY para homens). Recebemos 23 cromossomos da mãe e 23 do pai.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 3,
        question: 'O que é a fotossíntese?',
        options: [
          'Processo de respiração das plantas',
          'Processo de conversão de luz em energia química',
          'Processo de reprodução das plantas',
          'Processo de decomposição vegetal'
        ],
        correctAnswer: 1,
        explanation: 'A fotossíntese é o processo pelo qual as plantas, algas e algumas bactérias convertem energia luminosa (principalmente do sol) em energia química armazenada em moléculas de glicose. Usando CO2 e água, e com a ajuda da clorofila, as plantas produzem glicose e liberam oxigênio como subproduto. Este processo é fundamental para a vida na Terra.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 4,
        question: 'Qual é a partícula subatômica com carga negativa?',
        options: [
          'Próton',
          'Nêutron',
          'Elétron',
          'Fóton'
        ],
        correctAnswer: 2,
        explanation: 'O elétron é a partícula subatômica com carga negativa. Os prótons têm carga positiva, os nêutrons não têm carga (são neutros), e os fótons são partículas de luz sem carga e sem massa. Os elétrons orbitam o núcleo atômico e são responsáveis pelas ligações químicas e pela eletricidade.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 5,
        question: 'Qual é a teoria que explica a origem do universo?',
        options: [
          'Teoria da Relatividade',
          'Teoria do Big Bang',
          'Teoria da Evolução',
          'Teoria Quântica'
        ],
        correctAnswer: 1,
        explanation: 'A Teoria do Big Bang é a teoria cosmológica predominante que explica a origem do universo. Segundo ela, o universo começou há cerca de 13,8 bilhões de anos a partir de uma singularidade extremamente quente e densa, que expandiu rapidamente. Evidências como a radiação cósmica de fundo e o afastamento das galáxias sustentam essa teoria.',
        difficulty: 'medium',
        points: 20
      }
    ]
  },
  {
    id: 'historia',
    name: 'História',
    icon: '📜',
    description: 'Viaje no tempo através dos eventos históricos',
    color: 'from-amber-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: 'Em que ano ocorreu a Independência do Brasil?',
        options: [
          '1500',
          '1822',
          '1889',
          '1930'
        ],
        correctAnswer: 1,
        explanation: 'A Independência do Brasil foi proclamada em 7 de setembro de 1822 por Dom Pedro I às margens do Rio Ipiranga. Este evento marcou o fim do período colonial brasileiro e o início do Império do Brasil. O grito "Independência ou Morte" simbolizou a ruptura política com Portugal.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 2,
        question: 'Quem foi o primeiro presidente dos Estados Unidos?',
        options: [
          'Thomas Jefferson',
          'Abraham Lincoln',
          'George Washington',
          'John Adams'
        ],
        correctAnswer: 2,
        explanation: 'George Washington foi o primeiro presidente dos Estados Unidos, servindo de 1789 a 1797. Ele foi um dos pais fundadores da nação e comandante-chefe do Exército Continental durante a Guerra de Independência Americana. Washington estabeleceu muitos precedentes para o cargo presidencial e é considerado um dos maiores líderes americanos.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 3,
        question: 'Quando começou a Segunda Guerra Mundial?',
        options: [
          '1914',
          '1939',
          '1941',
          '1945'
        ],
        correctAnswer: 1,
        explanation: 'A Segunda Guerra Mundial começou oficialmente em 1º de setembro de 1939, quando a Alemanha nazista invadiu a Polônia. Isso levou a França e o Reino Unido a declararem guerra contra a Alemanha. A guerra durou até 1945 e foi o conflito mais devastador da história, envolvendo mais de 30 países e resultando em milhões de mortes.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 4,
        question: 'Qual civilização construiu as pirâmides de Gizé?',
        options: [
          'Maias',
          'Incas',
          'Egípcios',
          'Astecas'
        ],
        correctAnswer: 2,
        explanation: 'Os antigos egípcios construíram as famosas pirâmides de Gizé por volta de 2500 a.C. durante o Reino Antigo. A maior delas, a Grande Pirâmide de Quéops, foi uma das Sete Maravilhas do Mundo Antigo e a única que ainda existe. Essas estruturas monumentais serviam como túmulos para os faraós.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 5,
        question: 'Qual foi o período da Revolução Industrial?',
        options: [
          'Século XVI',
          'Século XVII',
          'Século XVIII-XIX',
          'Século XX'
        ],
        correctAnswer: 2,
        explanation: 'A Revolução Industrial ocorreu principalmente durante os séculos XVIII e XIX, começando na Inglaterra por volta de 1760. Este período marcou a transição de métodos de produção manual para máquinas, novas técnicas de fabricação de ferro e o uso crescente de energia a vapor. Teve profundos impactos sociais, econômicos e culturais que moldaram o mundo moderno.',
        difficulty: 'medium',
        points: 20
      }
    ]
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: '🌍',
    description: 'Descubra os segredos do nosso planeta',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: 'Qual é o maior oceano do mundo?',
        options: [
          'Oceano Atlântico',
          'Oceano Índico',
          'Oceano Pacífico',
          'Oceano Ártico'
        ],
        correctAnswer: 2,
        explanation: 'O Oceano Pacífico é o maior e mais profundo oceano do mundo, cobrindo aproximadamente 165 milhões de km² - mais de 30% da superfície terrestre. Ele é maior que toda a massa de terra do planeta combinada e contém mais da metade da água livre da Terra.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 2,
        question: 'Qual é o país com maior população do mundo?',
        options: [
          'Estados Unidos',
          'Índia',
          'China',
          'Brasil'
        ],
        correctAnswer: 1,
        explanation: 'A Índia ultrapassou a China em 2023 e atualmente é o país mais populoso do mundo, com mais de 1,4 bilhão de habitantes. A população indiana continua crescendo, enquanto a China experimentou uma desaceleração no crescimento populacional nas últimas décadas.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 3,
        question: 'Qual é o rio mais longo do mundo?',
        options: [
          'Rio Amazonas',
          'Rio Nilo',
          'Rio Yangtzé',
          'Rio Mississippi'
        ],
        correctAnswer: 1,
        explanation: 'O Rio Nilo é geralmente considerado o rio mais longo do mundo, com aproximadamente 6.650 km de extensão. Ele flui através de onze países na África antes de desaguar no Mar Mediterrâneo. No entanto, alguns estudos sugerem que o Amazonas pode ser mais longo, dependendo de como você mede suas nascentes.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 4,
        question: 'Qual é a capital da Austrália?',
        options: [
          'Sydney',
          'Melbourne',
          'Canberra',
          'Brisbane'
        ],
        correctAnswer: 2,
        explanation: 'Canberra é a capital da Austrália, não Sydney ou Melbourne como muitos pensam. A cidade foi planejada e construída especificamente para ser a capital, como um compromisso entre Sydney e Melbourne, que competiam pelo título. Canberra foi oficialmente nomeada capital em 1908.',
        difficulty: 'hard',
        points: 30
      },
      {
        id: 5,
        question: 'Quantos continentes existem na Terra?',
        options: [
          '5 continentes',
          '6 continentes',
          '7 continentes',
          '8 continentes'
        ],
        correctAnswer: 2,
        explanation: 'Existem 7 continentes na Terra: África, Antártida, Ásia, Europa, América do Norte, Oceania (ou Austrália) e América do Sul. No entanto, diferentes modelos geográficos podem contar de forma diferente - por exemplo, combinando Europa e Ásia em Eurásia, ou as Américas em um único continente.',
        difficulty: 'easy',
        points: 10
      }
    ]
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: '🔢',
    description: 'Desafie sua mente com números e lógica',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: 'Quanto é a raiz quadrada de 144?',
        options: [
          '10',
          '12',
          '14',
          '16'
        ],
        correctAnswer: 1,
        explanation: 'A raiz quadrada de 144 é 12, porque 12 × 12 = 144. A raiz quadrada de um número é o valor que, quando multiplicado por si mesmo, resulta no número original. É representada pelo símbolo √.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 2,
        question: 'Qual é o valor de π (pi) arredondado para 2 casas decimais?',
        options: [
          '3.12',
          '3.14',
          '3.16',
          '3.18'
        ],
        correctAnswer: 1,
        explanation: 'O valor de π (pi) é aproximadamente 3.14159..., geralmente arredondado para 3.14. Pi é uma constante matemática que representa a relação entre o perímetro de um círculo e seu diâmetro. É um número irracional, ou seja, tem infinitas casas decimais sem padrão repetitivo.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 3,
        question: 'Qual é a fórmula da área de um círculo?',
        options: [
          'π × r',
          'π × r²',
          '2 × π × r',
          'π × d'
        ],
        correctAnswer: 1,
        explanation: 'A fórmula para calcular a área de um círculo é A = π × r², onde r é o raio do círculo. Por exemplo, um círculo com raio de 5 cm tem área de aproximadamente 78,54 cm². A fórmula 2πr calcula o perímetro (circunferência), não a área.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 4,
        question: 'Qual é o resultado de 2³ (dois elevado ao cubo)?',
        options: [
          '6',
          '8',
          '9',
          '12'
        ],
        correctAnswer: 1,
        explanation: '2³ (dois elevado ao cubo ou dois à terceira potência) é igual a 8, porque é o resultado de 2 × 2 × 2. O expoente indica quantas vezes o número base deve ser multiplicado por si mesmo.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 5,
        question: 'Qual é o teorema que relaciona os lados de um triângulo retângulo?',
        options: [
          'Teorema de Tales',
          'Teorema de Pitágoras',
          'Teorema de Fermat',
          'Teorema de Euclides'
        ],
        correctAnswer: 1,
        explanation: 'O Teorema de Pitágoras estabelece que, em um triângulo retângulo, o quadrado da hipotenusa (lado oposto ao ângulo reto) é igual à soma dos quadrados dos outros dois lados (catetos). Matematicamente: a² + b² = c², onde c é a hipotenusa.',
        difficulty: 'medium',
        points: 20
      }
    ]
  },
  {
    id: 'cultura-pop',
    name: 'Cultura Pop',
    icon: '🎬',
    description: 'Teste seu conhecimento sobre filmes, música e entretenimento',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: 'Qual filme ganhou o Oscar de Melhor Filme em 2020?',
        options: [
          '1917',
          'Parasita',
          'Coringa',
          'Era Uma Vez em... Hollywood'
        ],
        correctAnswer: 1,
        explanation: 'Parasita (Parasite), do diretor sul-coreano Bong Joon-ho, ganhou o Oscar de Melhor Filme em 2020. Foi o primeiro filme de língua não inglesa a ganhar essa categoria na história do Oscar. O filme também ganhou Melhor Diretor, Melhor Filme Internacional e Melhor Roteiro Original.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: 2,
        question: 'Quem interpretou Tony Stark/Homem de Ferro no MCU?',
        options: [
          'Chris Evans',
          'Chris Hemsworth',
          'Robert Downey Jr.',
          'Mark Ruffalo'
        ],
        correctAnswer: 2,
        explanation: 'Robert Downey Jr. interpretou Tony Stark/Homem de Ferro no Universo Cinematográfico Marvel (MCU) de 2008 a 2019. Sua performance icônica definiu o personagem e ajudou a lançar todo o MCU, que se tornou a franquia de filmes de maior bilheteria da história.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 3,
        question: 'Qual banda britânica é conhecida como "The Fab Four"?',
        options: [
          'The Rolling Stones',
          'The Beatles',
          'Queen',
          'Led Zeppelin'
        ],
        correctAnswer: 1,
        explanation: 'The Beatles são conhecidos como "The Fab Four" (Os Fabulosos Quatro). A banda, formada por John Lennon, Paul McCartney, George Harrison e Ringo Starr, revolucionou a música pop nos anos 1960 e é considerada uma das bandas mais influentes de todos os tempos.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 4,
        question: 'Qual é o nome do protagonista da série Breaking Bad?',
        options: [
          'Jesse Pinkman',
          'Saul Goodman',
          'Hank Schrader',
          'Walter White'
        ],
        correctAnswer: 3,
        explanation: 'Walter White, interpretado por Bryan Cranston, é o protagonista de Breaking Bad. A série acompanha sua transformação de um professor de química do ensino médio em um dos maiores fabricantes de metanfetamina dos Estados Unidos. A série é amplamente considerada uma das melhores séries de TV de todos os tempos.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 5,
        question: 'Qual videogame é conhecido por seu battle royale em uma ilha?',
        options: [
          'Call of Duty',
          'Fortnite',
          'League of Legends',
          'Minecraft'
        ],
        correctAnswer: 1,
        explanation: 'Fortnite, desenvolvido pela Epic Games, popularizou o modo battle royale onde 100 jogadores lutam para ser o último sobrevivente em uma ilha que encolhe continuamente. O jogo se tornou um fenômeno cultural global desde seu lançamento em 2017, conhecido por suas danças, eventos ao vivo e colaborações com marcas famosas.',
        difficulty: 'easy',
        points: 10
      }
    ]
  }
];

export const achievements = [
  {
    id: 'first-win',
    name: 'Primeira Vitória',
    description: 'Complete seu primeiro quiz',
    icon: '🏆',
    color: 'text-yellow-500'
  },
  {
    id: 'perfect-score',
    name: 'Pontuação Perfeita',
    description: 'Acerte todas as questões de um quiz',
    icon: '⭐',
    color: 'text-blue-500'
  },
  {
    id: 'speed-demon',
    name: 'Velocista',
    description: 'Complete um quiz em menos de 2 minutos',
    icon: '⚡',
    color: 'text-purple-500'
  },
  {
    id: 'explorer',
    name: 'Explorador',
    description: 'Jogue todos os temas disponíveis',
    icon: '🗺️',
    color: 'text-green-500'
  },
  {
    id: 'master',
    name: 'Mestre',
    description: 'Acumule 1000 pontos',
    icon: '👑',
    color: 'text-red-500'
  },
  {
    id: 'consistent',
    name: 'Consistente',
    description: 'Complete 10 quizzes',
    icon: '🎯',
    color: 'text-indigo-500'
  }
];
