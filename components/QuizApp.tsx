'use client';

import { useState, useEffect } from 'react';
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
}

interface UserProgress {
  totalScore: number;
  quizzesCompleted: number;
  categoriesPlayed: string[];
  unlockedAchievements: string[];
  bestScores: { [key: string]: number };
}

export default function QuizApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [showAchievements, setShowAchievements] = useState(false);
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
  });

  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalScore: 0,
    quizzesCompleted: 0,
    categoriesPlayed: [],
    unlockedAchievements: [],
    bestScores: {},
  });

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem('quizProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    });
  };

  const selectAnswer = (answerIndex: number) => {
    if (gameState.showExplanation || !gameState.selectedCategory) return;

    const currentQuestion =
      gameState.selectedCategory.questions[gameState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isCorrect: isCorrect,
      showExplanation: true,
      score: isCorrect ? prev.score + currentQuestion.points : prev.score,
    }));

    // Atualizar respostas
    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestionIndex] = answerIndex;
    setGameState(prev => ({ ...prev, answers: newAnswers }));
  };

  const nextQuestion = () => {
    if (!gameState.selectedCategory) return;

    const nextIndex = gameState.currentQuestionIndex + 1;

    if (nextIndex >= gameState.selectedCategory.questions.length) {
      // Quiz completado
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

    const endTime = Date.now();
    const timeTaken = gameState.startTime
      ? (endTime - gameState.startTime) / 1000
      : 0;

    setGameState(prev => ({ ...prev, isQuizComplete: true, endTime }));

    // Atualizar progresso do usuário
    const categoryId = gameState.selectedCategory.id;
    const newProgress = { ...userProgress };

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
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Renderizar tela inicial (seleção de categoria)
  if (!gameState.selectedCategory) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? 'dark bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}
      >
        <div className='container mx-auto px-4 py-8 max-w-7xl'>
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='flex justify-between items-center mb-12'
          >
            <div>
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                QuizLabStudy
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                Aprenda de forma interativa e divertida! 🎯
              </p>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105'
                aria-label='Conquistas'
              >
                <Trophy
                  className={`w-6 h-6 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                />
              </button>
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

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'
          >
            <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl'>
                  <Target className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Pontuação Total
                  </p>
                  <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.totalScore}
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-green-100 dark:bg-green-900/30 rounded-xl'>
                  <CheckCircle2 className='w-8 h-8 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Quizzes Completados
                  </p>
                  <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.quizzesCompleted}
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl'>
                  <Award className='w-8 h-8 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Conquistas
                  </p>
                  <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {userProgress.unlockedAchievements.length}/
                    {achievements.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modal de Conquistas */}
          <AnimatePresence>
            {showAchievements && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                onClick={() => setShowAchievements(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto'
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
                    🏆 Suas Conquistas
                  </h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {achievements.map(achievement => {
                      const isUnlocked =
                        userProgress.unlockedAchievements.includes(
                          achievement.id
                        );
                      return (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isUnlocked
                              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-50'
                          }`}
                        >
                          <div className='flex items-start gap-3'>
                            <span className='text-3xl'>{achievement.icon}</span>
                            <div>
                              <h3
                                className={`font-bold ${achievement.color} ${
                                  !isUnlocked && 'text-gray-500'
                                }`}
                              >
                                {achievement.name}
                              </h3>
                              <p className='text-sm text-gray-600 dark:text-gray-400'>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categorias */}
          <div>
            <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
              Escolha um Tema
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {quizCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectCategory(category)}
                  className='group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left overflow-hidden'
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                  />

                  <div className='relative'>
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-5xl'>{category.icon}</span>
                      <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                        {category.questions.length} questões
                      </span>
                    </div>

                    <h3 className='text-2xl font-bold mb-2 text-gray-900 dark:text-white'>
                      {category.name}
                    </h3>

                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                      {category.description}
                    </p>

                    {userProgress.bestScores[category.id] && (
                      <div className='flex items-center gap-2 text-sm'>
                        <Trophy className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                        <span className='text-gray-700 dark:text-gray-300'>
                          Melhor: {userProgress.bestScores[category.id]} pts
                        </span>
                      </div>
                    )}
                  </div>

                  <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <ChevronRight className='w-6 h-6 text-gray-400' />
                  </div>
                </motion.button>
              ))}
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

    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? 'dark bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}
      >
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl'
          >
            <div className='text-center mb-8'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className='inline-block'
              >
                <div className='text-8xl mb-4'>
                  {percentage >= 80
                    ? '🎉'
                    : percentage >= 60
                    ? '👏'
                    : percentage >= 40
                    ? '👍'
                    : '💪'}
                </div>
              </motion.div>

              <h2 className='text-4xl font-bold mb-2 text-gray-900 dark:text-white'>
                {percentage >= 80
                  ? 'Excelente!'
                  : percentage >= 60
                  ? 'Muito Bem!'
                  : percentage >= 40
                  ? 'Bom Trabalho!'
                  : 'Continue Praticando!'}
              </h2>

              <p className='text-xl text-gray-600 dark:text-gray-400'>
                Quiz {gameState.selectedCategory.name} Concluído
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center'>
                <Target className='w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  Pontuação
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {gameState.score}/{maxScore}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-500'>
                  {percentage}%
                </p>
              </div>

              <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 text-center'>
                <CheckCircle2 className='w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-2' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  Corretas
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {
                    gameState.answers.filter(
                      (ans, idx) =>
                        ans ===
                        gameState.selectedCategory?.questions[idx].correctAnswer
                    ).length
                  }
                  /{gameState.selectedCategory.questions.length}
                </p>
              </div>

              <div className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center'>
                <Clock className='w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-2' />
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                  Tempo
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {formatTime(timeTaken)}
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={restartQuiz}
                className='flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all hover:scale-105'
              >
                <RotateCcw className='w-5 h-5' />
                Tentar Novamente
              </button>

              <button
                onClick={goHome}
                className='flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all hover:scale-105'
              >
                <Home className='w-5 h-5' />
                Página Inicial
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Renderizar quiz em andamento
  if (!gameState.selectedCategory) {
    return null; // Não deve acontecer, mas protege contra erro de TypeScript
  }

  const currentQuestion =
    gameState.selectedCategory.questions[gameState.currentQuestionIndex];
  const progress =
    ((gameState.currentQuestionIndex + 1) /
      gameState.selectedCategory.questions.length) *
    100;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'dark bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}
    >
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header do Quiz */}
        <div className='flex justify-between items-center mb-6'>
          <button
            onClick={goHome}
            className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105'
            aria-label='Voltar'
          >
            <Home className='w-5 h-5 text-gray-700 dark:text-gray-300' />
          </button>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-lg'>
              <Target className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              <span className='font-bold text-gray-900 dark:text-white'>
                {gameState.score} pts
              </span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className='p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105'
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

        {/* Barra de Progresso */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Questão {gameState.currentQuestionIndex + 1} de{' '}
              {gameState.selectedCategory.questions.length}
            </span>
            <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {Math.round(progress)}%
            </span>
          </div>
          <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full bg-gradient-to-r ${gameState.selectedCategory.color} transition-all`}
            />
          </div>
        </div>

        {/* Card da Questão */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={gameState.currentQuestionIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className='bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-6'
          >
            {/* Badge de Dificuldade */}
            <div className='flex items-center justify-between mb-6'>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  currentQuestion.difficulty === 'easy'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : currentQuestion.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}
              >
                {currentQuestion.difficulty === 'easy'
                  ? 'Fácil'
                  : currentQuestion.difficulty === 'medium'
                  ? 'Médio'
                  : 'Difícil'}
              </span>
              <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                <Zap className='w-5 h-5' />
                <span className='font-bold'>{currentQuestion.points} pts</span>
              </div>
            </div>

            {/* Questão */}
            <h3 className='text-2xl font-bold mb-8 text-gray-900 dark:text-white leading-relaxed'>
              {currentQuestion.question}
            </h3>

            {/* Opções */}
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
                      'bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-500';
                  } else if (isSelected && !isCorrect) {
                    buttonClass =
                      'bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-500';
                  }
                } else if (isSelected && gameState.selectedCategory) {
                  buttonClass = `bg-gradient-to-r ${gameState.selectedCategory.color} border-2 border-transparent text-white`;
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-5 rounded-xl font-medium text-left transition-all ${buttonClass} ${
                      showResult ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <span
                        className={
                          showResult && !isSelected && !isCorrect
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }
                      >
                        {option}
                      </span>
                      {showResult &&
                        (isCorrect ? (
                          <CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
                        ) : isSelected ? (
                          <XCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
                        ) : null)}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pop-up de Explicação */}
        <AnimatePresence>
          {gameState.showExplanation && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`rounded-3xl p-8 shadow-2xl mb-6 ${
                gameState.isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                  : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
              }`}
            >
              <div className='flex items-start gap-4 mb-4'>
                {gameState.isCorrect ? (
                  <div className='flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
                    <CheckCircle2 className='w-7 h-7 text-white' />
                  </div>
                ) : (
                  <div className='flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center'>
                    <XCircle className='w-7 h-7 text-white' />
                  </div>
                )}
                <div>
                  <h4
                    className={`text-2xl font-bold mb-2 ${
                      gameState.isCorrect
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-red-900 dark:text-red-100'
                    }`}
                  >
                    {gameState.isCorrect
                      ? '🎉 Resposta Correta!'
                      : '❌ Resposta Incorreta'}
                  </h4>
                  {!gameState.isCorrect && (
                    <p className='text-gray-700 dark:text-gray-300 mb-2'>
                      A resposta correta é:{' '}
                      <strong>
                        {currentQuestion.options[currentQuestion.correctAnswer]}
                      </strong>
                    </p>
                  )}
                </div>
              </div>

              <div className='bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 mb-6'>
                <h5 className='font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                  💡 Explicação:
                </h5>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  {currentQuestion.explanation}
                </p>
              </div>

              <button
                onClick={nextQuestion}
                className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg ${
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
                  'Ver Resultados'
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
