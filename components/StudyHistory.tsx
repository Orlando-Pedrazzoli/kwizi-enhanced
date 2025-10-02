'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  BookOpen,
  TrendingUp,
  Target,
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronRight,
  Brain,
  Star,
  Bookmark,
} from 'lucide-react';

interface HistoryEntry {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: string;
  timeTaken: number;
  points: number;
  tags?: string[];
  isBookmarked?: boolean;
  reviewCount?: number;
  nextReviewDate?: string;
}

interface StudyHistoryProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function StudyHistory({ darkMode, onClose }: StudyHistoryProps) {
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
  const [filteredData, setFilteredData] = useState<HistoryEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'date' | 'category' | 'difficulty'>(
    'date'
  );

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setHistoryData(history);
      setFilteredData(history);
    }
  }, []);

  // Filtrar dados
  useEffect(() => {
    let filtered = [...historyData];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        item => item.difficulty === selectedDifficulty
      );
    }

    if (showOnlyIncorrect) {
      filtered = filtered.filter(item => !item.isCorrect);
    }

    if (showOnlyBookmarked) {
      filtered = filtered.filter(item => item.isBookmarked);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags?.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'category':
          return a.categoryName.localeCompare(b.categoryName);
        case 'difficulty':
          const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default: // date
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
      }
    });

    setFilteredData(filtered);
  }, [
    historyData,
    selectedCategory,
    selectedDifficulty,
    showOnlyIncorrect,
    showOnlyBookmarked,
    searchTerm,
    sortBy,
  ]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const toggleBookmark = (id: string) => {
    const updatedHistory = historyData.map(item =>
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    );
    setHistoryData(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const addToReview = (id: string) => {
    const item = historyData.find(h => h.id === id);
    if (item) {
      // Adicionar à fila de revisão espaçada
      const reviewQueue = JSON.parse(
        localStorage.getItem('reviewQueue') || '[]'
      );
      if (!reviewQueue.find((r: any) => r.id === id)) {
        reviewQueue.push({
          ...item,
          nextReviewDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toISOString(), // Revisar em 24h
          reviewCount: (item.reviewCount || 0) + 1,
        });
        localStorage.setItem('reviewQueue', JSON.stringify(reviewQueue));
      }
    }
  };

  const categories = Array.from(
    new Set(historyData.map(item => item.categoryId))
  ).map(id => {
    const item = historyData.find(h => h.categoryId === id);
    return {
      id,
      name: item?.categoryName || '',
      icon: item?.categoryIcon || '',
    };
  });

  const stats = {
    total: historyData.length,
    correct: historyData.filter(item => item.isCorrect).length,
    incorrect: historyData.filter(item => !item.isCorrect).length,
    bookmarked: historyData.filter(item => item.isBookmarked).length,
    avgTime:
      historyData.length > 0
        ? Math.round(
            historyData.reduce((sum, item) => sum + item.timeTaken, 0) /
              historyData.length
          )
        : 0,
    accuracyRate:
      historyData.length > 0
        ? Math.round(
            (historyData.filter(item => item.isCorrect).length /
              historyData.length) *
              100
          )
        : 0,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
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
        className='bg-white dark:bg-gray-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl'>
                <History className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Histórico de Estudos
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Revise todas as questões que você já respondeu
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

          {/* Stats Cards */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
            <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>Total</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                {stats.total}
              </p>
            </div>
            <div className='bg-green-50 dark:bg-green-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Corretas
              </p>
              <p className='text-xl font-bold text-green-600 dark:text-green-400'>
                {stats.correct}
              </p>
            </div>
            <div className='bg-red-50 dark:bg-red-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Incorretas
              </p>
              <p className='text-xl font-bold text-red-600 dark:text-red-400'>
                {stats.incorrect}
              </p>
            </div>
            <div className='bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>Salvos</p>
              <p className='text-xl font-bold text-yellow-600 dark:text-yellow-400'>
                {stats.bookmarked}
              </p>
            </div>
            <div className='bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Tempo Médio
              </p>
              <p className='text-xl font-bold text-purple-600 dark:text-purple-400'>
                {stats.avgTime}s
              </p>
            </div>
            <div className='bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Taxa Acerto
              </p>
              <p className='text-xl font-bold text-indigo-600 dark:text-indigo-400'>
                {stats.accuracyRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Buscar questões...'
                  className='w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            >
              <option value='all'>Todas Categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            >
              <option value='all'>Todas Dificuldades</option>
              <option value='easy'>🟢 Fácil</option>
              <option value='medium'>🟡 Médio</option>
              <option value='hard'>🔴 Difícil</option>
            </select>

            {/* Toggle Filters */}
            <div className='flex gap-2'>
              <button
                onClick={() => setShowOnlyIncorrect(!showOnlyIncorrect)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  showOnlyIncorrect
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <XCircle className='w-5 h-5 inline mr-1' />
                Erradas
              </button>
              <button
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  showOnlyBookmarked
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Star className='w-5 h-5 inline mr-1' />
                Salvos
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            >
              <option value='date'>Data</option>
              <option value='category'>Categoria</option>
              <option value='difficulty'>Dificuldade</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className='flex-1 overflow-y-auto p-6'>
          {filteredData.length === 0 ? (
            <div className='text-center py-12'>
              <Brain className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <p className='text-lg font-medium text-gray-600 dark:text-gray-400'>
                Nenhuma questão encontrada
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                Comece a estudar para ver seu histórico aqui!
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredData.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      {/* Header */}
                      <div className='flex items-center gap-3 mb-3'>
                        <span className='text-2xl'>{item.categoryIcon}</span>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium text-gray-900 dark:text-white'>
                              {item.categoryName}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                                item.difficulty
                              )}`}
                            >
                              {item.difficulty === 'easy'
                                ? 'Fácil'
                                : item.difficulty === 'medium'
                                ? 'Médio'
                                : 'Difícil'}
                            </span>
                            {item.isCorrect ? (
                              <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                            ) : (
                              <XCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                            )}
                          </div>
                          <div className='flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400'>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-3 h-3' />
                              {new Date(item.timestamp).toLocaleDateString(
                                'pt-BR'
                              )}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Clock className='w-3 h-3' />
                              {item.timeTaken}s
                            </span>
                            <span className='flex items-center gap-1'>
                              <Target className='w-3 h-3' />
                              {item.points} pts
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Question */}
                      <p className='text-gray-700 dark:text-gray-300 mb-2'>
                        {item.question}
                      </p>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedItems.has(item.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className='mt-4 space-y-3'
                          >
                            <div className='p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl'>
                              <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>
                                Sua resposta:
                              </p>
                              <p
                                className={`text-sm ${
                                  item.isCorrect
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}
                              >
                                {item.selectedAnswer}
                              </p>
                            </div>

                            {!item.isCorrect && (
                              <div className='p-3 bg-green-50 dark:bg-green-900/20 rounded-xl'>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>
                                  Resposta correta:
                                </p>
                                <p className='text-sm text-green-600 dark:text-green-400'>
                                  {item.correctAnswer}
                                </p>
                              </div>
                            )}

                            <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl'>
                              <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>
                                Explicação:
                              </p>
                              <p className='text-sm text-gray-700 dark:text-gray-300'>
                                {item.explanation}
                              </p>
                            </div>

                            {item.tags && item.tags.length > 0 && (
                              <div className='flex flex-wrap gap-2'>
                                {item.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full'
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col gap-2 ml-4'>
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                        title='Ver detalhes'
                      >
                        {expandedItems.has(item.id) ? (
                          <ChevronDown className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        ) : (
                          <ChevronRight className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        )}
                      </button>
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                        title='Salvar'
                      >
                        {item.isBookmarked ? (
                          <Star className='w-5 h-5 text-yellow-500 fill-yellow-500' />
                        ) : (
                          <Star className='w-5 h-5 text-gray-400' />
                        )}
                      </button>
                      <button
                        onClick={() => addToReview(item.id)}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                        title='Adicionar à revisão'
                      >
                        <RefreshCw className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
