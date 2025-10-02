'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Brain,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  SkipForward,
  BookOpen,
  Zap,
  Award,
  Filter,
  BarChart3,
} from 'lucide-react';

interface ReviewItem {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  category: string;
  categoryIcon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: string;
  nextReviewDate: string;
  reviewCount: number;
  easeFactor: number; // Fator de facilidade para algoritmo SM-2
  interval: number; // Intervalo em dias até próxima revisão
  correctStreak: number;
  incorrectCount: number;
  averageResponseTime: number;
  confidence: number; // 0-100
}

interface SpacedRepetitionProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function SpacedRepetition({
  darkMode,
  onClose,
}: SpacedRepetitionProps) {
  const [reviewQueue, setReviewQueue] = useState<ReviewItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    timeSpent: 0,
    startTime: Date.now(),
  });
  const [filter, setFilter] = useState<'all' | 'due' | 'new' | 'difficult'>(
    'due'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Carregar itens para revisão
  useEffect(() => {
    const loadReviewQueue = () => {
      const saved = localStorage.getItem('spacedRepetitionQueue');
      if (saved) {
        const items: ReviewItem[] = JSON.parse(saved);
        // Filtrar itens que precisam ser revisados
        const now = new Date();
        const dueItems = items.filter(
          item => new Date(item.nextReviewDate) <= now
        );
        setReviewQueue(
          dueItems.sort(
            (a, b) =>
              new Date(a.nextReviewDate).getTime() -
              new Date(b.nextReviewDate).getTime()
          )
        );
      } else {
        // Criar alguns itens de exemplo
        const exampleItems: ReviewItem[] = [
          {
            id: '1',
            question: 'O que é o Virtual DOM no React?',
            answer:
              'Uma representação em JavaScript da árvore de elementos do DOM real',
            explanation:
              'O Virtual DOM é uma abstração do DOM real. React mantém uma cópia em memória da UI e a sincroniza com o DOM real através de um processo chamado reconciliação, tornando as atualizações mais eficientes.',
            category: 'Web Development',
            categoryIcon: '💻',
            difficulty: 'medium',
            lastReviewed: new Date(Date.now() - 86400000).toISOString(),
            nextReviewDate: new Date().toISOString(),
            reviewCount: 2,
            easeFactor: 2.5,
            interval: 1,
            correctStreak: 1,
            incorrectCount: 0,
            averageResponseTime: 15,
            confidence: 75,
          },
          {
            id: '2',
            question: 'Qual a diferença entre let e const em JavaScript?',
            answer: 'let permite reatribuição, const não permite',
            explanation:
              'let declara uma variável que pode ser reatribuída, enquanto const declara uma constante que não pode ser reatribuída (mas objetos e arrays podem ter seus conteúdos modificados).',
            category: 'Web Development',
            categoryIcon: '💻',
            difficulty: 'easy',
            lastReviewed: new Date(Date.now() - 172800000).toISOString(),
            nextReviewDate: new Date().toISOString(),
            reviewCount: 3,
            easeFactor: 2.8,
            interval: 3,
            correctStreak: 3,
            incorrectCount: 0,
            averageResponseTime: 10,
            confidence: 90,
          },
          {
            id: '3',
            question: 'O que é um closure em programação?',
            answer:
              'Uma função que tem acesso ao escopo externo, mesmo após a função externa ter retornado',
            explanation:
              'Closures permitem que funções internas acessem variáveis de funções externas, criando um escopo privado. São úteis para criar funções factory e manter estado privado.',
            category: 'Web Development',
            categoryIcon: '💻',
            difficulty: 'hard',
            lastReviewed: new Date(Date.now() - 259200000).toISOString(),
            nextReviewDate: new Date().toISOString(),
            reviewCount: 1,
            easeFactor: 2.0,
            interval: 1,
            correctStreak: 0,
            incorrectCount: 1,
            averageResponseTime: 25,
            confidence: 50,
          },
        ];
        setReviewQueue(exampleItems);
        localStorage.setItem(
          'spacedRepetitionQueue',
          JSON.stringify(exampleItems)
        );
      }
    };

    loadReviewQueue();
  }, []);

  // Algoritmo SM-2 para calcular próxima data de revisão
  const calculateNextReview = (item: ReviewItem, quality: number) => {
    // quality: 0-5 (0-1: incorreto, 2: difícil, 3: bom, 4: fácil, 5: muito fácil)
    let newEaseFactor =
      item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEaseFactor = Math.max(1.3, newEaseFactor);

    let newInterval = item.interval;
    if (quality < 3) {
      newInterval = 1;
    } else {
      if (item.reviewCount === 1) {
        newInterval = 1;
      } else if (item.reviewCount === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(item.interval * newEaseFactor);
      }
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    return {
      easeFactor: newEaseFactor,
      interval: newInterval,
      nextReviewDate: nextDate.toISOString(),
    };
  };

  const startReview = () => {
    if (reviewQueue.length > 0) {
      setCurrentItem(reviewQueue[0]);
      setIsReviewing(true);
      setSessionStats({
        ...sessionStats,
        startTime: Date.now(),
      });
    }
  };

  const handleResponse = (quality: number) => {
    if (!currentItem) return;

    const isCorrect = quality >= 3;
    const updates = calculateNextReview(currentItem, quality);

    const updatedItem: ReviewItem = {
      ...currentItem,
      ...updates,
      lastReviewed: new Date().toISOString(),
      reviewCount: currentItem.reviewCount + 1,
      correctStreak: isCorrect ? currentItem.correctStreak + 1 : 0,
      incorrectCount: isCorrect
        ? currentItem.incorrectCount
        : currentItem.incorrectCount + 1,
      confidence: Math.min(
        100,
        Math.max(0, currentItem.confidence + (isCorrect ? 10 : -15))
      ),
    };

    // Atualizar fila de revisão
    const updatedQueue = reviewQueue.filter(item => item.id !== currentItem.id);
    setReviewQueue(updatedQueue);

    // Salvar no localStorage
    const allItems = JSON.parse(
      localStorage.getItem('spacedRepetitionQueue') || '[]'
    );
    const updatedAllItems = allItems.map((item: ReviewItem) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(
      'spacedRepetitionQueue',
      JSON.stringify(updatedAllItems)
    );

    // Atualizar estatísticas da sessão
    setSessionStats({
      ...sessionStats,
      reviewed: sessionStats.reviewed + 1,
      correct: isCorrect ? sessionStats.correct + 1 : sessionStats.correct,
      incorrect: !isCorrect
        ? sessionStats.incorrect + 1
        : sessionStats.incorrect,
    });

    // Próximo item ou finalizar
    if (updatedQueue.length > 0) {
      setCurrentItem(updatedQueue[0]);
      setShowAnswer(false);
    } else {
      setIsReviewing(false);
      setCurrentItem(null);
    }
  };

  const skipItem = () => {
    if (reviewQueue.length > 1) {
      const [skipped, ...rest] = reviewQueue;
      setReviewQueue([...rest, skipped]);
      setCurrentItem(rest[0]);
      setShowAnswer(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (confidence >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      easy: {
        color:
          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        label: 'Fácil',
      },
      medium: {
        color:
          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        label: 'Médio',
      },
      hard: {
        color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        label: 'Difícil',
      },
    };
    return badges[difficulty as keyof typeof badges] || badges.medium;
  };

  const categories = Array.from(
    new Set(reviewQueue.map(item => item.category))
  );
  const stats = {
    totalDue: reviewQueue.length,
    todayReviews: sessionStats.reviewed,
    accuracy:
      sessionStats.reviewed > 0
        ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
        : 0,
    avgConfidence:
      reviewQueue.length > 0
        ? Math.round(
            reviewQueue.reduce((sum, item) => sum + item.confidence, 0) /
              reviewQueue.length
          )
        : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-white dark:bg-gray-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl'>
                <RefreshCw className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Revisão Espaçada Inteligente
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Sistema baseado no algoritmo SM-2 para máxima retenção
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'
            >
              ✕
            </button>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-4 gap-3'>
            <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl'>
              <div className='flex items-center gap-2 mb-1'>
                <Clock className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  Para Hoje
                </p>
              </div>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {stats.totalDue}
              </p>
            </div>
            <div className='bg-green-50 dark:bg-green-900/20 p-3 rounded-xl'>
              <div className='flex items-center gap-2 mb-1'>
                <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  Revisadas
                </p>
              </div>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {stats.todayReviews}
              </p>
            </div>
            <div className='bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl'>
              <div className='flex items-center gap-2 mb-1'>
                <Target className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  Precisão
                </p>
              </div>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {stats.accuracy}%
              </p>
            </div>
            <div className='bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl'>
              <div className='flex items-center gap-2 mb-1'>
                <Brain className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  Confiança
                </p>
              </div>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {stats.avgConfidence}%
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto'>
          {!isReviewing ? (
            <div className='p-6'>
              {/* Filter Bar */}
              <div className='flex gap-3 mb-6'>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                >
                  <option value='all'>Todas Categorias</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <div className='flex gap-2'>
                  {(['all', 'due', 'new', 'difficult'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        filter === f
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {f === 'all'
                        ? 'Todos'
                        : f === 'due'
                        ? 'Pendentes'
                        : f === 'new'
                        ? 'Novos'
                        : 'Difíceis'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              {reviewQueue.length === 0 ? (
                <div className='text-center py-12'>
                  <Brain className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <p className='text-lg font-medium text-gray-600 dark:text-gray-400'>
                    Nenhum item para revisar hoje!
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                    Continue estudando para adicionar mais itens à sua fila de
                    revisão.
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {reviewQueue.map(item => {
                    const difficultyBadge = getDifficultyBadge(item.difficulty);
                    const daysUntilReview = Math.ceil(
                      (new Date(item.nextReviewDate).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        className='bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700'
                      >
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-3'>
                              <span className='text-2xl'>
                                {item.categoryIcon}
                              </span>
                              <span className='font-medium text-gray-900 dark:text-white'>
                                {item.category}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyBadge.color}`}
                              >
                                {difficultyBadge.label}
                              </span>
                            </div>

                            <p className='text-gray-700 dark:text-gray-300 mb-3'>
                              {item.question}
                            </p>

                            <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                              <span className='flex items-center gap-1'>
                                <RefreshCw className='w-3 h-3' />
                                Revisões: {item.reviewCount}
                              </span>
                              <span className='flex items-center gap-1'>
                                <Zap className='w-3 h-3' />
                                Sequência: {item.correctStreak}
                              </span>
                              <span
                                className={`flex items-center gap-1 ${getConfidenceColor(
                                  item.confidence
                                )}`}
                              >
                                <Brain className='w-3 h-3' />
                                Confiança: {item.confidence}%
                              </span>
                              <span className='flex items-center gap-1'>
                                <Calendar className='w-3 h-3' />
                                {daysUntilReview <= 0
                                  ? 'Hoje'
                                  : `Em ${daysUntilReview} dias`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Start Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startReview}
                    className='w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'
                  >
                    <Play className='w-5 h-5' />
                    Iniciar Sessão de Revisão
                  </motion.button>
                </div>
              )}
            </div>
          ) : (
            <div className='p-6'>
              {/* Review Session */}
              {currentItem && (
                <div>
                  {/* Progress Bar */}
                  <div className='mb-6'>
                    <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2'>
                      <span>Progresso da Sessão</span>
                      <span>
                        {sessionStats.reviewed + 1} de{' '}
                        {reviewQueue.length + sessionStats.reviewed}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((sessionStats.reviewed + 1) /
                              (reviewQueue.length + sessionStats.reviewed)) *
                            100
                          }%`,
                        }}
                        className='h-full bg-gradient-to-r from-green-600 to-blue-600 rounded-full'
                      />
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <span className='text-2xl'>
                          {currentItem.categoryIcon}
                        </span>
                        <span className='font-medium text-gray-900 dark:text-white'>
                          {currentItem.category}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getDifficultyBadge(currentItem.difficulty).color
                          }`}
                        >
                          {getDifficultyBadge(currentItem.difficulty).label}
                        </span>
                      </div>
                      <button
                        onClick={skipItem}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                      >
                        <SkipForward className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                      </button>
                    </div>

                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
                      {currentItem.question}
                    </h3>

                    <AnimatePresence mode='wait'>
                      {!showAnswer ? (
                        <motion.button
                          key='show-answer'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowAnswer(true)}
                          className='w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all'
                        >
                          Mostrar Resposta
                        </motion.button>
                      ) : (
                        <motion.div
                          key='answer'
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4'>
                            <p className='font-medium text-green-900 dark:text-green-100 mb-2'>
                              Resposta:
                            </p>
                            <p className='text-green-800 dark:text-green-200'>
                              {currentItem.answer}
                            </p>
                          </div>

                          <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6'>
                            <p className='font-medium text-blue-900 dark:text-blue-100 mb-2'>
                              Explicação:
                            </p>
                            <p className='text-blue-800 dark:text-blue-200'>
                              {currentItem.explanation}
                            </p>
                          </div>

                          <div>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                              Como foi sua resposta?
                            </p>
                            <div className='grid grid-cols-2 sm:grid-cols-5 gap-2'>
                              <button
                                onClick={() => handleResponse(0)}
                                className='py-2 px-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium'
                              >
                                Errei
                              </button>
                              <button
                                onClick={() => handleResponse(2)}
                                className='py-2 px-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-sm font-medium'
                              >
                                Difícil
                              </button>
                              <button
                                onClick={() => handleResponse(3)}
                                className='py-2 px-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm font-medium'
                              >
                                Bom
                              </button>
                              <button
                                onClick={() => handleResponse(4)}
                                className='py-2 px-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm font-medium'
                              >
                                Fácil
                              </button>
                              <button
                                onClick={() => handleResponse(5)}
                                className='py-2 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium'
                              >
                                Muito Fácil
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Session Stats */}
                  <div className='grid grid-cols-3 gap-3'>
                    <div className='bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl text-center'>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Corretas
                      </p>
                      <p className='text-xl font-bold text-green-600 dark:text-green-400'>
                        {sessionStats.correct}
                      </p>
                    </div>
                    <div className='bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl text-center'>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Incorretas
                      </p>
                      <p className='text-xl font-bold text-red-600 dark:text-red-400'>
                        {sessionStats.incorrect}
                      </p>
                    </div>
                    <div className='bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl text-center'>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Restantes
                      </p>
                      <p className='text-xl font-bold text-blue-600 dark:text-blue-400'>
                        {reviewQueue.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
