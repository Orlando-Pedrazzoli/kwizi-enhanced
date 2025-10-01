'use client';

import { useState, useEffect, useRef } from 'react';
import {
  quizCategories,
  QuizCategory,
  Question,
  achievements,
} from '@/data/quizData';
import {
  Award,
  Home,
  Moon,
  Sun,
  Trophy,
  Target,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Brain,
  BookOpen,
  TrendingUp,
  Star,
  Sparkles,
  GraduationCap,
  Code,
  Palette,
  Database,
  Shield,
  Cpu,
  Cloud,
  Volume2,
  VolumeX,
  Info,
  BarChart3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameState {
  selectedCategory: QuizCategory | null;
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  showExplanation: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  isQuizComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  streak: number;
  mode: 'competitive' | 'study';
}

interface UserProgress {
  totalScore: number;
  quizzesCompleted: number;
  categoriesPlayed: string[];
  unlockedAchievements: string[];
  bestScores: { [key: string]: number };
  categoryLevels: { [key: string]: number };
  totalQuestionsAnswered: number;
  correctAnswers: number;
  studyTime: number;
  lastPlayed: string;
}

export default function QuizApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    selectedCategory: null,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    showExplanation: false,
    selectedAnswer: null,
    isCorrect: null,
    isQuizComplete: false,
    startTime: null,
    endTime: null,
    streak: 0,
    mode: 'competitive',
  });

  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalScore: 0,
    quizzesCompleted: 0,
    categoriesPlayed: [],
    unlockedAchievements: [],
    bestScores: {},
    categoryLevels: {},
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    studyTime: 0,
    lastPlayed: new Date().toISOString(),
  });

  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);

      // Mostrar mensagem de boas-vindas se voltou após 24h
      const lastPlayedDate = new Date(progress.lastPlayed);
      const hoursSinceLastPlayed =
        (Date.now() - lastPlayedDate.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastPlayed > 24) {
        setShowWelcomeBack(true);
        setTimeout(() => setShowWelcomeBack(false), 5000);
      }
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound) {
      setSoundEnabled(JSON.parse(savedSound));
    }
  }, []);

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem(
      'quizProgress',
      JSON.stringify({
        ...userProgress,
        lastPlayed: new Date().toISOString(),
      })
    );
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Função para tocar sons
  const playSound = (
    type: 'correct' | 'wrong' | 'achievement' | 'complete'
  ) => {
    if (!soundEnabled) return;

    // Aqui você pode adicionar sons reais
    // Por enquanto, vamos simular com console.log
    console.log(`Playing sound: ${type}`);
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: any } = {
      'web-development': <Code className='w-6 h-6' />,
      'ux-ui-design': <Palette className='w-6 h-6' />,
      'data-analytics': <Database className='w-6 h-6' />,
      cybersecurity: <Shield className='w-6 h-6' />,
      'data-science-ml': <Cpu className='w-6 h-6' />,
      'devops-cloud': <Cloud className='w-6 h-6' />,
      'ai-engineering': <Brain className='w-6 h-6' />,
    };
    return icons[categoryId] || <BookOpen className='w-6 h-6' />;
  };

  const getCategoryLevel = (categoryId: string) => {
    const score = userProgress.bestScores[categoryId] || 0;
    if (score >= 300)
      return {
        level: 5,
        title: 'Expert',
        color: 'text-purple-600 dark:text-purple-400',
      };
    if (score >= 200)
      return {
        level: 4,
        title: 'Avançado',
        color: 'text-blue-600 dark:text-blue-400',
      };
    if (score >= 150)
      return {
        level: 3,
        title: 'Intermediário',
        color: 'text-green-600 dark:text-green-400',
      };
    if (score >= 100)
      return {
        level: 2,
        title: 'Aprendiz',
        color: 'text-yellow-600 dark:text-yellow-400',
      };
    if (score >= 50)
      return {
        level: 1,
        title: 'Iniciante',
        color: 'text-gray-600 dark:text-gray-400',
      };
    return {
      level: 0,
      title: 'Novo',
      color: 'text-gray-500 dark:text-gray-500',
    };
  };

  const selectCategory = (category: QuizCategory) => {
    setGameState({
      selectedCategory: category,
      currentQuestionIndex: 0,
      score: 0,
      answers: new Array(category.questions.length).fill(null),
      showExplanation: false,
      selectedAnswer: null,
      isCorrect: null,
      isQuizComplete: false,
      startTime: Date.now(),
      endTime: null,
      streak: 0,
      mode: gameState.mode,
    });
  };

  const selectAnswer = (answerIndex: number) => {
    if (gameState.showExplanation || !gameState.selectedCategory) return;

    const currentQuestion =
      gameState.selectedCategory.questions[gameState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    let newScore = gameState.score;
    let newStreak = gameState.streak;

    if (isCorrect) {
      playSound('correct');
      newStreak = gameState.streak + 1;
      // Bonus por streak
      const streakBonus = Math.min(newStreak * 2, 10);
      newScore = gameState.score + currentQuestion.points + streakBonus;
    } else {
      playSound('wrong');
      newStreak = 0;
      if (gameState.mode === 'competitive') {
        newScore = gameState.score;
      }
    }

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isCorrect: isCorrect,
      showExplanation: true,
      score: newScore,
      streak: newStreak,
    }));

    // Atualizar respostas
    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestionIndex] = answerIndex;
    setGameState(prev => ({ ...prev, answers: newAnswers }));

    // Atualizar estatísticas
    setUserProgress(prev => ({
      ...prev,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }));
  };

  const nextQuestion = () => {
    if (!gameState.selectedCategory) return;

    const nextIndex = gameState.currentQuestionIndex + 1;

    if (nextIndex >= gameState.selectedCategory.questions.length) {
      completeQuiz();
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        showExplanation: false,
        selectedAnswer: null,
        isCorrect: null,
      }));
    }
  };

  const completeQuiz = () => {
    if (!gameState.selectedCategory) return;

    playSound('complete');
    const endTime = Date.now();
    const timeTaken = gameState.startTime
      ? (endTime - gameState.startTime) / 1000
      : 0;

    setGameState(prev => ({ ...prev, isQuizComplete: true, endTime }));

    // Atualizar progresso do usuário
    const categoryId = gameState.selectedCategory.id;
    const newProgress = { ...userProgress };

    if (gameState.mode === 'competitive') {
      newProgress.totalScore += gameState.score;
      newProgress.quizzesCompleted += 1;

      if (!newProgress.categoriesPlayed.includes(categoryId)) {
        newProgress.categoriesPlayed.push(categoryId);
      }

      if (
        !newProgress.bestScores[categoryId] ||
        gameState.score > newProgress.bestScores[categoryId]
      ) {
        newProgress.bestScores[categoryId] = gameState.score;
      }
    }

    // Adicionar tempo de estudo
    newProgress.studyTime =
      (newProgress.studyTime || 0) + Math.floor(timeTaken);

    // Verificar conquistas
    checkAchievements(newProgress, timeTaken);

    setUserProgress(newProgress);
  };

  const checkAchievements = (progress: UserProgress, timeTaken: number) => {
    const newAchievements: string[] = [];

    // Primeira Vitória
    if (
      progress.quizzesCompleted === 1 &&
      !progress.unlockedAchievements.includes('first-win')
    ) {
      newAchievements.push('first-win');
    }

    // Pontuação Perfeita
    if (gameState.selectedCategory) {
      const maxScore = gameState.selectedCategory.questions.reduce(
        (sum, q) => sum + q.points,
        0
      );
      if (
        gameState.score === maxScore &&
        !progress.unlockedAchievements.includes('perfect-score')
      ) {
        newAchievements.push('perfect-score');
      }
    }

    // Velocista (menos de 2 minutos)
    if (
      timeTaken < 120 &&
      !progress.unlockedAchievements.includes('speed-demon')
    ) {
      newAchievements.push('speed-demon');
    }

    // Explorador (jogou todos os temas)
    if (
      progress.categoriesPlayed.length === quizCategories.length &&
      !progress.unlockedAchievements.includes('explorer')
    ) {
      newAchievements.push('explorer');
    }

    // Mestre (1000 pontos)
    if (
      progress.totalScore >= 1000 &&
      !progress.unlockedAchievements.includes('master')
    ) {
      newAchievements.push('master');
    }

    // Consistente (10 quizzes)
    if (
      progress.quizzesCompleted >= 10 &&
      !progress.unlockedAchievements.includes('consistent')
    ) {
      newAchievements.push('consistent');
    }

    if (newAchievements.length > 0) {
      playSound('achievement');
      setUserProgress(prev => ({
        ...prev,
        unlockedAchievements: [
          ...prev.unlockedAchievements,
          ...newAchievements,
        ],
      }));
    }
  };

  const restartQuiz = () => {
    if (gameState.selectedCategory) {
      selectCategory(gameState.selectedCategory);
    }
  };

  const goHome = () => {
    setGameState({
      selectedCategory: null,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      showExplanation: false,
      selectedAnswer: null,
      isCorrect: null,
      isQuizComplete: false,
      startTime: null,
      endTime: null,
      streak: 0,
      mode: gameState.mode,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracyRate = () => {
    if (userProgress.totalQuestionsAnswered === 0) return 0;
    return Math.round(
      (userProgress.correctAnswers / userProgress.totalQuestionsAnswered) * 100
    );
  };

  const getMotivationalMessage = () => {
    const accuracy = getAccuracyRate();
    if (accuracy >= 90) return '🔥 Você está em chamas! Continue assim!';
    if (accuracy >= 75) return '⭐ Excelente performance! Você está dominando!';
    if (accuracy >= 60) return '💪 Bom trabalho! Continue praticando!';
    if (accuracy >= 40) return '🎯 Você está no caminho certo! Não desista!';
    return '🚀 Toda jornada começa com o primeiro passo!';
  };

  // Renderizar tela inicial (seleção de categoria)
  if (!gameState.selectedCategory) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}
      >
        {/* Background animado */}
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
              darkMode ? 'bg-purple-600' : 'bg-purple-400'
            } animate-pulse`}
          />
          <div
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
              darkMode ? 'bg-blue-600' : 'bg-blue-400'
            } animate-pulse`}
          />
        </div>

        <div className='relative container mx-auto px-4 py-8 max-w-7xl'>
          {/* Mensagem de boas-vindas */}
          <AnimatePresence>
            {showWelcomeBack && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'
              >
                <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3'>
                  <Sparkles className='w-5 h-5 animate-pulse' />
                  <span className='font-semibold'>
                    Bem-vindo de volta! Pronto para mais aprendizado?
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='flex justify-between items-center mb-12'
          >
            <div>
              <h1 className='text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                QuizLabHub
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2'>
                <GraduationCap className='w-5 h-5' />
                Domine as habilidades tech do futuro
              </p>
            </div>
            <div className='flex gap-3'>
              {/* Modo de Estudo */}
              <button
                onClick={() =>
                  setGameState(prev => ({
                    ...prev,
                    mode: prev.mode === 'competitive' ? 'study' : 'competitive',
                  }))
                }
                className={`px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                  gameState.mode === 'study'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-white dark:bg-gray-800'
                }`}
                aria-label='Modo de jogo'
              >
                <div className='flex items-center gap-2'>
                  <BookOpen className='w-5 h-5' />
                  <span className='hidden md:inline text-sm font-medium'>
                    {gameState.mode === 'study' ? 'Modo Estudo' : 'Competitivo'}
                  </span>
                </div>
              </button>

              {/* Estatísticas */}
              <button
                onClick={() => setShowStats(!showStats)}
                className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 group'
                aria-label='Estatísticas'
              >
                <BarChart3
                  className={`w-6 h-6 transition-colors ${
                    darkMode
                      ? 'text-purple-400 group-hover:text-purple-300'
                      : 'text-purple-600 group-hover:text-purple-500'
                  }`}
                />
              </button>

              {/* Conquistas */}
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 relative group'
                aria-label='Conquistas'
              >
                <Trophy
                  className={`w-6 h-6 transition-colors ${
                    darkMode
                      ? 'text-yellow-400 group-hover:text-yellow-300'
                      : 'text-yellow-600 group-hover:text-yellow-500'
                  }`}
                />
                {userProgress.unlockedAchievements.length > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold'>
                    {userProgress.unlockedAchievements.length}
                  </span>
                )}
              </button>

              {/* Som */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105'
                aria-label='Alternar som'
              >
                {soundEnabled ? (
                  <Volume2 className='w-6 h-6 text-gray-700 dark:text-gray-300' />
                ) : (
                  <VolumeX className='w-6 h-6 text-gray-500 dark:text-gray-500' />
                )}
              </button>

              {/* Tema */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105'
                aria-label='Alternar tema'
              >
                {darkMode ? (
                  <Sun className='w-6 h-6 text-yellow-400' />
                ) : (
                  <Moon className='w-6 h-6 text-indigo-600' />
                )}
              </button>
            </div>
          </motion.header>

          {/* Dashboard Principal - Bento Box Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12'>
            {/* Card Principal - Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className='lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl'
            >
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
                    Seu Progresso
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {getMotivationalMessage()}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl ${
                    darkMode
                      ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30'
                      : 'bg-gradient-to-r from-purple-100 to-blue-100'
                  }`}
                >
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Taxa de Acerto
                  </span>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {getAccuracyRate()}%
                  </p>
                </div>
              </div>

              {/* Grid de Métricas */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-4'
                >
                  <Target className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-2' />
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Pontuação Total
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.totalScore}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-4'
                >
                  <CheckCircle2 className='w-8 h-8 text-green-600 dark:text-green-400 mb-2' />
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Quizzes
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.quizzesCompleted}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-4'
                >
                  <Award className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-2' />
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Conquistas
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.unlockedAchievements.length}/
                    {achievements.length}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-4'
                >
                  <Clock className='w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2' />
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Tempo Estudo
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                    {Math.floor((userProgress.studyTime || 0) / 60)}h
                  </p>
                </motion.div>
              </div>

              {/* Progresso por Categoria - Mini Cards */}
              <div className='mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Progresso por Categoria
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
                  {quizCategories.map(category => {
                    const level = getCategoryLevel(category.id);
                    const progress = userProgress.bestScores[category.id] || 0;
                    const maxScore = category.questions.length * 30;
                    const percentage = (progress / maxScore) * 100;

                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        className='bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 cursor-pointer'
                        onClick={() => selectCategory(category)}
                      >
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='text-xl'>{category.icon}</span>
                          <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
                            Nível {level.level}
                          </span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2'>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentage, 100)}%` }}
                            className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Card Lateral - Desafios Diários */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Sparkles className='w-6 h-6 text-yellow-500' />
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Desafios do Dia
                </h2>
              </div>

              <div className='space-y-4'>
                <div className='p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      Complete 3 Quizzes
                    </span>
                    <span className='text-xs bg-yellow-500 text-white px-2 py-1 rounded-full'>
                      +50 XP
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2'>
                    <div
                      className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                      style={{
                        width: `${Math.min(
                          (userProgress.quizzesCompleted % 3) * 33.33,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className='p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      Resposta Perfeita
                    </span>
                    <span className='text-xs bg-green-500 text-white px-2 py-1 rounded-full'>
                      +30 XP
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Acerte todas em um quiz
                  </p>
                </div>

                <div className='p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      Explorador Tech
                    </span>
                    <span className='text-xs bg-orange-500 text-white px-2 py-1 rounded-full'>
                      +100 XP
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Jogue todas as categorias
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Modal de Conquistas */}
          <AnimatePresence>
            {showAchievements && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4'
                onClick={() => setShowAchievements(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className='bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto'
                  onClick={e => e.stopPropagation()}
                >
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                      🏆 Suas Conquistas
                    </h2>
                    <button
                      onClick={() => setShowAchievements(false)}
                      className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'
                    >
                      <XCircle className='w-6 h-6' />
                    </button>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {achievements.map(achievement => {
                      const isUnlocked =
                        userProgress.unlockedAchievements.includes(
                          achievement.id
                        );
                      return (
                        <motion.div
                          key={achievement.id}
                          whileHover={isUnlocked ? { scale: 1.05 } : {}}
                          className={`p-6 rounded-2xl border-2 transition-all ${
                            isUnlocked
                              ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-50'
                          }`}
                        >
                          <div className='flex flex-col items-center text-center'>
                            <span className='text-5xl mb-3'>
                              {achievement.icon}
                            </span>
                            <h3
                              className={`font-bold text-lg ${
                                achievement.color
                              } ${!isUnlocked && 'text-gray-500'}`}
                            >
                              {achievement.name}
                            </h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                              {achievement.description}
                            </p>
                            {isUnlocked && (
                              <div className='mt-3 flex items-center gap-1'>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className='w-4 h-4 fill-yellow-400 text-yellow-400'
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Estatísticas */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4'
                onClick={() => setShowStats(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className='bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto'
                  onClick={e => e.stopPropagation()}
                >
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                      📊 Estatísticas Detalhadas
                    </h2>
                    <button
                      onClick={() => setShowStats(false)}
                      className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'
                    >
                      <XCircle className='w-6 h-6' />
                    </button>
                  </div>

                  <div className='space-y-6'>
                    {/* Performance Geral */}
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                        Performance Geral
                      </h3>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl'>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Questões Respondidas
                          </p>
                          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                            {userProgress.totalQuestionsAnswered}
                          </p>
                        </div>
                        <div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-xl'>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Respostas Corretas
                          </p>
                          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                            {userProgress.correctAnswers}
                          </p>
                        </div>
                        <div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl'>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Taxa de Acerto
                          </p>
                          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                            {getAccuracyRate()}%
                          </p>
                        </div>
                        <div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl'>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Tempo Total
                          </p>
                          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                            {Math.floor((userProgress.studyTime || 0) / 60)}h
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Performance por Categoria */}
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                        Performance por Categoria
                      </h3>
                      <div className='space-y-3'>
                        {quizCategories.map(category => {
                          const score =
                            userProgress.bestScores[category.id] || 0;
                          const maxScore = category.questions.length * 30;
                          const percentage = (score / maxScore) * 100;
                          const level = getCategoryLevel(category.id);

                          return (
                            <div
                              key={category.id}
                              className='bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl'
                            >
                              <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-3'>
                                  <span className='text-2xl'>
                                    {category.icon}
                                  </span>
                                  <div>
                                    <p className='font-semibold text-gray-900 dark:text-white'>
                                      {category.name}
                                    </p>
                                    <p className={`text-sm ${level.color}`}>
                                      {level.title} - Nível {level.level}
                                    </p>
                                  </div>
                                </div>
                                <div className='text-right'>
                                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                    {score}
                                  </p>
                                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                                    pontos
                                  </p>
                                </div>
                              </div>
                              <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3'>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${Math.min(percentage, 100)}%`,
                                  }}
                                  className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categorias com Design Moderno */}
          <div>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Escolha sua Trilha de Aprendizado
              </h2>
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  gameState.mode === 'study'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}
              >
                {gameState.mode === 'study'
                  ? '📚 Modo Estudo Ativo'
                  : '🎯 Modo Competitivo'}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {quizCategories.map((category, index) => {
                const level = getCategoryLevel(category.id);
                const hasPlayed =
                  userProgress.bestScores[category.id] !== undefined;

                return (
                  <motion.button
                    key={category.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => selectCategory(category)}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className='group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all text-left overflow-hidden'
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Card Content */}
                    <div className='relative'>
                      {/* Header */}
                      <div className='flex items-start justify-between mb-4'>
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10 group-hover:scale-110 transition-transform`}
                        >
                          <span className='text-3xl'>{category.icon}</span>
                        </div>
                        <span className='text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full'>
                          {category.questions.length} questões
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all'>
                        {category.name}
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2'>
                        {category.description}
                      </p>

                      {/* Progress */}
                      {hasPlayed ? (
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between text-sm'>
                            <span className={`font-semibold ${level.color}`}>
                              {level.title}
                            </span>
                            <span className='text-gray-600 dark:text-gray-400'>
                              {userProgress.bestScores[category.id]} pts
                            </span>
                          </div>
                          <div className='flex gap-1'>
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 flex-1 rounded-full ${
                                  i < level.level
                                    ? `bg-gradient-to-r ${category.color}`
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                          <Sparkles className='w-4 h-4' />
                          <span>Nova trilha disponível!</span>
                        </div>
                      )}

                      {/* Hover Action */}
                      <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <div className='p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white'>
                          <ChevronRight className='w-5 h-5' />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar tela de quiz completado
  if (gameState.isQuizComplete && gameState.selectedCategory) {
    const timeTaken =
      gameState.startTime && gameState.endTime
        ? (gameState.endTime - gameState.startTime) / 1000
        : 0;

    const maxScore = gameState.selectedCategory.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );
    const percentage = Math.round((gameState.score / maxScore) * 100);
    const correctCount = gameState.answers.filter(
      (ans, idx) =>
        ans === gameState.selectedCategory?.questions[idx].correctAnswer
    ).length;

    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}
      >
        <div className='container mx-auto px-4 py-8 max-w-5xl'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl'
          >
            {/* Header com Animação */}
            <div className='text-center mb-8'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className='inline-block mb-4'
              >
                <div className='text-8xl'>
                  {percentage >= 80
                    ? '🏆'
                    : percentage >= 60
                    ? '🎯'
                    : percentage >= 40
                    ? '💪'
                    : '📚'}
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              >
                {gameState.mode === 'study'
                  ? 'Sessão de Estudo Concluída!'
                  : percentage >= 80
                  ? 'Performance Excepcional!'
                  : percentage >= 60
                  ? 'Ótimo Trabalho!'
                  : percentage >= 40
                  ? 'Bom Progresso!'
                  : 'Continue Praticando!'}
              </motion.h2>

              <p className='text-xl text-gray-600 dark:text-gray-400'>
                {gameState.selectedCategory.name} •{' '}
                {gameState.mode === 'study'
                  ? 'Modo Estudo'
                  : 'Modo Competitivo'}
              </p>
            </div>

            {/* Cards de Resultados */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center'
              >
                <Target className='w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  {gameState.mode === 'study'
                    ? 'Questões Praticadas'
                    : 'Pontuação Final'}
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {gameState.mode === 'study'
                    ? `${correctCount}/${gameState.selectedCategory.questions.length}`
                    : gameState.score}
                </p>
                {gameState.mode === 'competitive' && (
                  <p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
                    de {maxScore} pontos
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 text-center'
              >
                <CheckCircle2 className='w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  Taxa de Acerto
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {percentage}%
                </p>
                <div className='mt-2 flex justify-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(percentage / 20)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center'
              >
                <Clock className='w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  Tempo Total
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {formatTime(timeTaken)}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
                  {Math.round(
                    timeTaken / gameState.selectedCategory.questions.length
                  )}
                  s por questão
                </p>
              </motion.div>
            </div>

            {/* Streak Bonus */}
            {gameState.mode === 'competitive' && gameState.streak > 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className='mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl text-center'
              >
                <div className='flex items-center justify-center gap-3'>
                  <Zap className='w-6 h-6 text-orange-500' />
                  <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Maior Sequência: {gameState.streak} respostas corretas
                    seguidas!
                  </span>
                </div>
              </motion.div>
            )}

            {/* Review de Questões */}
            <div className='mb-8'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                Revisão das Questões
              </h3>
              <div className='grid grid-cols-5 md:grid-cols-10 gap-2'>
                {gameState.answers.map((answer, idx) => {
                  const isCorrect =
                    answer ===
                    gameState.selectedCategory?.questions[idx].correctAnswer;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      className={`aspect-square rounded-lg flex items-center justify-center font-semibold text-sm ${
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {idx + 1}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Ações */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className='flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'
              >
                <RotateCcw className='w-5 h-5' />
                Tentar Novamente
              </motion.button>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goHome}
                className='flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'
              >
                <Home className='w-5 h-5' />
                Escolher Outra Categoria
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Renderizar quiz em andamento
  if (!gameState.selectedCategory) {
    return null;
  }

  const currentQuestion =
    gameState.selectedCategory.questions[gameState.currentQuestionIndex];
  const progress =
    ((gameState.currentQuestionIndex + 1) /
      gameState.selectedCategory.questions.length) *
    100;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header do Quiz */}
        <div className='flex justify-between items-center mb-6'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goHome}
            className='p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all'
            aria-label='Voltar'
          >
            <Home className='w-5 h-5 text-gray-700 dark:text-gray-300' />
          </motion.button>

          <div className='flex items-center gap-4'>
            {/* Streak Indicator */}
            {gameState.streak > 0 && gameState.mode === 'competitive' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className='flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-2xl shadow-lg'
              >
                <Zap className='w-5 h-5 text-white' />
                <span className='font-bold text-white'>
                  {gameState.streak}x combo!
                </span>
              </motion.div>
            )}

            {/* Score */}
            <div className='flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-lg'>
              <Target className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              <span className='font-bold text-gray-900 dark:text-white'>
                {gameState.mode === 'study'
                  ? `${gameState.currentQuestionIndex + 1}/${
                      gameState.selectedCategory.questions.length
                    }`
                  : `${gameState.score} pts`}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className='p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all'
              aria-label='Alternar som'
            >
              {soundEnabled ? (
                <Volume2 className='w-5 h-5 text-gray-700 dark:text-gray-300' />
              ) : (
                <VolumeX className='w-5 h-5 text-gray-500 dark:text-gray-500' />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className='p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all'
              aria-label='Alternar tema'
            >
              {darkMode ? (
                <Sun className='w-5 h-5 text-yellow-400' />
              ) : (
                <Moon className='w-5 h-5 text-indigo-600' />
              )}
            </button>
          </div>
        </div>

        {/* Barra de Progresso Aprimorada */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Questão {gameState.currentQuestionIndex + 1} de{' '}
              {gameState.selectedCategory.questions.length}
            </span>
            <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full bg-gradient-to-r ${gameState.selectedCategory.color} shadow-lg relative`}
            >
              <div className='absolute inset-0 bg-white/20 animate-pulse' />
            </motion.div>
          </div>
        </div>

        {/* Card da Questão com Animações */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={gameState.currentQuestionIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className='bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-6'
          >
            {/* Header da Questão */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${gameState.selectedCategory.color} bg-opacity-10`}
                >
                  {getCategoryIcon(gameState.selectedCategory.id)}
                </div>
                <div>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {gameState.selectedCategory.name}
                  </p>
                  <span
                    className={`text-sm font-bold ${
                      currentQuestion.difficulty === 'easy'
                        ? 'text-green-600 dark:text-green-400'
                        : currentQuestion.difficulty === 'medium'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {currentQuestion.difficulty === 'easy'
                      ? '🟢 Fácil'
                      : currentQuestion.difficulty === 'medium'
                      ? '🟡 Médio'
                      : '🔴 Difícil'}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full'>
                <Zap className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                <span className='font-bold text-purple-700 dark:text-purple-300'>
                  {currentQuestion.points} pts
                </span>
              </div>
            </div>

            {/* Questão */}
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className='text-2xl font-bold mb-8 text-gray-900 dark:text-white leading-relaxed'
            >
              {currentQuestion.question}
            </motion.h3>

            {/* Opções de Resposta */}
            <div className='space-y-4'>
              {currentQuestion.options.map((option, index) => {
                const isSelected = gameState.selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = gameState.showExplanation;

                let buttonClass =
                  'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600';

                if (showResult) {
                  if (isCorrect) {
                    buttonClass =
                      'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500';
                  } else if (isSelected && !isCorrect) {
                    buttonClass =
                      'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-500';
                  }
                } else if (isSelected && gameState.selectedCategory) {
                  buttonClass = `bg-gradient-to-r ${gameState.selectedCategory.color} border-2 border-transparent text-white`;
                }

                return (
                  <motion.button
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={!showResult ? { scale: 1.02, x: 10 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-5 rounded-2xl font-medium text-left transition-all ${buttonClass} ${
                      showResult ? 'cursor-not-allowed' : 'cursor-pointer'
                    } group`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                            isSelected && !showResult
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span
                          className={
                            isSelected && !showResult
                              ? 'text-white'
                              : showResult && !isSelected && !isCorrect
                              ? 'text-gray-500 dark:text-gray-500'
                              : 'text-gray-900 dark:text-white'
                          }
                        >
                          {option}
                        </span>
                      </div>
                      {showResult &&
                        (isCorrect ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
                          </motion.div>
                        ) : isSelected ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <XCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
                          </motion.div>
                        ) : null)}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pop-up de Explicação Melhorado */}
        <AnimatePresence>
          {gameState.showExplanation && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`rounded-3xl p-8 shadow-2xl mb-6 ${
                gameState.isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                  : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
              }`}
            >
              <div className='flex items-start gap-4 mb-6'>
                {gameState.isCorrect ? (
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring' }}
                    className='flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg'
                  >
                    <CheckCircle2 className='w-8 h-8 text-white' />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring' }}
                    className='flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg'
                  >
                    <XCircle className='w-8 h-8 text-white' />
                  </motion.div>
                )}
                <div className='flex-1'>
                  <h4
                    className={`text-2xl font-bold mb-2 ${
                      gameState.isCorrect
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-red-900 dark:text-red-100'
                    }`}
                  >
                    {gameState.isCorrect
                      ? ['🎉 Excelente!', '⭐ Perfeito!', '🚀 Incrível!'][
                          Math.floor(Math.random() * 3)
                        ]
                      : [
                          '💡 Quase lá!',
                          '📚 Vamos aprender!',
                          '🎯 Próxima você acerta!',
                        ][Math.floor(Math.random() * 3)]}
                  </h4>
                  {!gameState.isCorrect && (
                    <p className='text-gray-700 dark:text-gray-300 font-medium mb-2'>
                      Resposta correta:{' '}
                      <span className='font-bold text-gray-900 dark:text-white'>
                        {currentQuestion.options[currentQuestion.correctAnswer]}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className='bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 mb-6 backdrop-blur-sm'>
                <div className='flex items-center gap-2 mb-3'>
                  <Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                  <h5 className='font-bold text-gray-900 dark:text-white'>
                    Entenda o conceito:
                  </h5>
                </div>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  {currentQuestion.explanation}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl shadow-lg transition-all ${
                  gameState.isCorrect
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {gameState.currentQuestionIndex <
                gameState.selectedCategory.questions.length - 1 ? (
                  <>
                    Próxima Questão
                    <ChevronRight className='w-5 h-5' />
                  </>
                ) : (
                  <>
                    Ver Resultados
                    <TrendingUp className='w-5 h-5' />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
