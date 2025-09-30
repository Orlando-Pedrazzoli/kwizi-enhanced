# 🎯 Kwizi Enhanced - Quiz App Interativo de Nova Geração

Um aplicativo de quiz moderno, interativo e gamificado construído com Next.js 14, React, TypeScript e Tailwind CSS.

![Kwizi Enhanced](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Funcionalidades Principais

### 🎮 Experiência do Usuário
- **Pop-ups Explicativos Interativos**: Cada resposta vem com uma explicação detalhada, ajudando o usuário a entender o conceito
- **Feedback Visual Imediato**: Animações e cores indicam respostas corretas/incorretas de forma clara
- **Múltiplos Temas**: 6 categorias diversas (Programação, Ciências, História, Geografia, Matemática, Cultura Pop)
- **Sistema de Pontuação Dinâmico**: Pontos baseados na dificuldade das questões

### 🏆 Gamificação
- **Sistema de Conquistas**: 6 badges desbloqueáveis para motivar o aprendizado contínuo
  - 🏆 Primeira Vitória
  - ⭐ Pontuação Perfeita
  - ⚡ Velocista (< 2 minutos)
  - 🗺️ Explorador (todos os temas)
  - 👑 Mestre (1000+ pontos)
  - 🎯 Consistente (10+ quizzes)

- **Ranking Pessoal**: Acompanhe suas melhores pontuações por categoria
- **Estatísticas Detalhadas**: Monitore seu progresso total
- **Progresso Visual**: Barra de progresso animada durante o quiz

### 🎨 Design & UX (Seguindo as Melhores Práticas de 2025)
- **Dark Mode**: Alternância suave entre temas claro e escuro
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Micro-interações com Framer Motion
- **Acessibilidade**: Alto contraste, ARIA labels, navegação por teclado
- **Gradientes Modernos**: Cada categoria tem seu gradiente único
- **Interface Limpa**: Design minimalista e intuitivo

### 💾 Persistência de Dados
- **LocalStorage**: Progresso salvo automaticamente
- **Histórico Completo**: Todas as estatísticas são mantidas entre sessões

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone ou baixe o projeto**
```bash
cd kwizi-enhanced
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Abra no navegador**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
kwizi-enhanced/
├── app/
│   ├── layout.tsx          # Layout principal com metadata
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/
│   └── QuizApp.tsx         # Componente principal do quiz
├── data/
│   └── quizData.ts         # Dados dos quizzes e conquistas
├── public/                 # Arquivos estáticos
├── package.json            # Dependências
├── tailwind.config.js      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── README.md              # Este arquivo
```

## 🎓 Temas Disponíveis

### 💻 Programação
- Princípios DRY
- JavaScript (let vs var, closures)
- Padrões de Design
- TypeScript

### 🔬 Ciências
- Física (velocidade da luz)
- Biologia (cromossomos, fotossíntese)
- Química (partículas subatômicas)
- Cosmologia (Big Bang)

### 📜 História
- Independência do Brasil
- Presidentes dos EUA
- Segunda Guerra Mundial
- Antigas civilizações
- Revolução Industrial

### 🌍 Geografia
- Oceanos e rios
- População mundial
- Capitais
- Continentes

### 🔢 Matemática
- Raiz quadrada
- Número Pi
- Geometria
- Teorema de Pitágoras

### 🎬 Cultura Pop
- Cinema (Oscar, MCU)
- Música (The Beatles)
- Séries (Breaking Bad)
- Videogames (Fortnite)

## 🔧 Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca UI com hooks modernos
- **TypeScript**: Tipagem estática para código mais seguro
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Biblioteca de animações
- **Lucide React**: Ícones modernos e customizáveis

## 🎯 Melhorias em Relação ao Original

1. **Pop-ups Explicativos**: Sistema completo de feedback com explicações detalhadas
2. **Múltiplos Temas**: 6 categorias vs. 1 tema genérico
3. **Sistema de Conquistas**: Gamificação completa com badges
4. **Níveis de Dificuldade**: Questões classificadas (fácil, médio, difícil)
5. **Pontuação Dinâmica**: Pontos baseados na dificuldade
6. **Dark Mode**: Suporte completo a tema escuro
7. **Animações**: Transições suaves com Framer Motion
8. **Estatísticas**: Dashboard completo de progresso
9. **Melhor UX**: Interface moderna seguindo as tendências de 2025
10. **Persistência**: LocalStorage para salvar progresso
11. **Timer**: Cronômetro para medir tempo de conclusão
12. **Responsividade**: Design otimizado para todos os dispositivos

## 📊 Pesquisa de Mercado

Este projeto foi desenvolvido seguindo as melhores práticas de UX/UI para 2025:

- **Micro-interações**: Feedback visual instantâneo
- **Gamificação**: Elementos de jogo para aumentar engajamento
- **Acessibilidade**: Design inclusivo para todos os usuários
- **Performance**: Otimizado para carregamento rápido
- **Mobile-First**: Design responsivo prioritário
- **Dark Mode**: Suporte a preferências do sistema

## 🔮 Próximas Funcionalidades (Roadmap)

- [ ] Sistema de usuários e login
- [ ] Leaderboard global
- [ ] Modo multiplayer
- [ ] Criação de quizzes customizados
- [ ] Mais categorias de temas
- [ ] Integração com API externa
- [ ] Sons e efeitos sonoros
- [ ] Modo de treino (sem pontuação)
- [ ] Compartilhamento de resultados nas redes sociais
- [ ] Suporte a múltiplos idiomas

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 👨‍💻 Desenvolvimento

Para adicionar novos quizzes, edite o arquivo `data/quizData.ts` e siga a estrutura:

```typescript
{
  id: 'novo-tema',
  name: 'Novo Tema',
  icon: '🎨',
  description: 'Descrição do tema',
  color: 'from-color-500 to-color-600',
  questions: [
    {
      id: 1,
      question: 'Pergunta aqui?',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
      correctAnswer: 0, // índice da resposta correta
      explanation: 'Explicação detalhada...',
      difficulty: 'easy', // 'easy' | 'medium' | 'hard'
      points: 10
    }
  ]
}
```

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Feito com ❤️ usando Next.js e React**

🎯 Aprenda de forma interativa e divertida com Kwizi Enhanced!
