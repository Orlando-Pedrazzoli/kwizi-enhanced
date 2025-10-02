'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Calendar,
  Award,
  Brain,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  BookOpen,
  Star,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';

interface ProgressData {
  totalScore: number;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  avgTimePerQuestion: number;
  studyTime: number;
  streakDays: number;
  bestCategory: string;
  weakestCategory: string;
  categoryProgress: Record<string, CategoryStats>;
  dailyActivity: DailyActivity[];
  learningCurve: LearningPoint[];
  difficultyDistribution: DifficultyStats;
}

interface CategoryStats {
  name: string;
  icon: string;
  questionsAnswered: number;
  correctAnswers: number;
  avgTime: number;
  lastPlayed: string;
  score: number;
  level: number;
  progress: number;
}

interface DailyActivity {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  score: number;
}

interface LearningPoint {
  date: string;
  accuracy: number;
  speed: number;
}

interface DifficultyStats {
  easy: { total: number; correct: number };
  medium: { total: number; correct: number };
  hard: { total: number; correct: number };
}

interface PersonalProgressProps {
  darkMode: boolean;
  onClose: () => void;
  userProgress: any;
}

export default function PersonalProgress({
  darkMode,
  onClose,
  userProgress,
}: PersonalProgressProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'all'>(
    'month'
  );
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    // Simular carregamento de dados de progresso
    const loadProgressData = () => {
      // Aqui você normalmente carregaria dados reais do localStorage ou API
      const mockData: ProgressData = {
        totalScore: userProgress?.totalScore || 2450,
        quizzesCompleted: userProgress?.quizzesCompleted || 23,
        totalQuestionsAnswered: userProgress?.totalQuestionsAnswered || 345,
        correctAnswers: userProgress?.correctAnswers || 276,
        avgTimePerQuestion: 15,
        studyTime: 3600, // em segundos
        streakDays: 7,
        bestCategory: 'Web Development',
        weakestCategory: 'Data Science',
        categoryProgress: {
          'web-development': {
            name: 'Web Development',
            icon: '💻',
            questionsAnswered: 120,
            correctAnswers: 102,
            avgTime: 12,
            lastPlayed: new Date().toISOString(),
            score: 850,
            level: 4,
            progress: 85,
          },
          'ux-ui-design': {
            name: 'UX/UI Design',
            icon: '🎨',
            questionsAnswered: 45,
            correctAnswers: 38,
            avgTime: 14,
            lastPlayed: new Date(Date.now() - 86400000).toISOString(),
            score: 380,
            level: 2,
            progress: 65,
          },
          'data-analytics': {
            name: 'Data Analytics',
            icon: '📊',
            questionsAnswered: 60,
            correctAnswers: 48,
            avgTime: 18,
            lastPlayed: new Date(Date.now() - 172800000).toISOString(),
            score: 480,
            level: 3,
            progress: 70,
          },
          cybersecurity: {
            name: 'Cybersecurity',
            icon: '🔒',
            questionsAnswered: 30,
            correctAnswers: 22,
            avgTime: 20,
            lastPlayed: new Date(Date.now() - 259200000).toISOString(),
            score: 220,
            level: 1,
            progress: 45,
          },
          'data-science': {
            name: 'Data Science',
            icon: '🤖',
            questionsAnswered: 50,
            correctAnswers: 35,
            avgTime: 22,
            lastPlayed: new Date(Date.now() - 345600000).toISOString(),
            score: 350,
            level: 2,
            progress: 50,
          },
          devops: {
            name: 'DevOps & Cloud',
            icon: '☁️',
            questionsAnswered: 25,
            correctAnswers: 20,
            avgTime: 16,
            lastPlayed: new Date(Date.now() - 432000000).toISOString(),
            score: 200,
            level: 1,
            progress: 40,
          },
          'ai-engineering': {
            name: 'AI Engineering',
            icon: '🧠',
            questionsAnswered: 15,
            correctAnswers: 11,
            avgTime: 19,
            lastPlayed: new Date(Date.now() - 518400000).toISOString(),
            score: 110,
            level: 1,
            progress: 30,
          },
        },
        dailyActivity: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString(),
          questionsAnswered: Math.floor(Math.random() * 20) + 5,
          correctAnswers: Math.floor(Math.random() * 15) + 3,
          timeSpent: Math.floor(Math.random() * 3600) + 600,
          score: Math.floor(Math.random() * 100) + 20,
        })).reverse(),
        learningCurve: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString(),
          accuracy: 60 + Math.random() * 30 + i * 0.5,
          speed: 25 - i * 0.3 - Math.random() * 5,
        })).reverse(),
        difficultyDistribution: {
          easy: { total: 120, correct: 105 },
          medium: { total: 150, correct: 115 },
          hard: { total: 75, correct: 46 },
        },
      };

      setProgressData(mockData);
    };

    loadProgressData();
  }, [userProgress]);

  if (!progressData) {
    return null;
  }

  const accuracyRate = Math.round(
    (progressData.correctAnswers / progressData.totalQuestionsAnswered) * 100
  );

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getLevelInfo = (level: number) => {
    const levels = [
      {
        name: 'Iniciante',
        color: 'text-gray-600 dark:text-gray-400',
        bg: 'bg-gray-100 dark:bg-gray-800',
      },
      {
        name: 'Aprendiz',
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-100 dark:bg-green-900/30',
      },
      {
        name: 'Intermediário',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-100 dark:bg-blue-900/30',
      },
      {
        name: 'Avançado',
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-100 dark:bg-purple-900/30',
      },
      {
        name: 'Expert',
        color: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-100 dark:bg-orange-900/30',
      },
    ];
    return levels[Math.min(level, levels.length - 1)];
  };

  const getInsights = () => {
    const insights = [];

    if (accuracyRate >= 80) {
      insights.push({
        type: 'success',
        icon: <Star className='w-5 h-5' />,
        text: 'Excelente taxa de acerto! Você está dominando o conteúdo.',
      });
    } else if (accuracyRate < 60) {
      insights.push({
        type: 'warning',
        icon: <Target className='w-5 h-5' />,
        text: 'Revise os conceitos das questões erradas para melhorar.',
      });
    }

    if (progressData.streakDays >= 7) {
      insights.push({
        type: 'success',
        icon: <Zap className='w-5 h-5' />,
        text: `${progressData.streakDays} dias consecutivos! Mantenha o ritmo!`,
      });
    }

    if (progressData.avgTimePerQuestion > 20) {
      insights.push({
        type: 'info',
        icon: <Clock className='w-5 h-5' />,
        text: 'Tente responder mais rapidamente para melhorar sua agilidade.',
      });
    }

    const weakCategory = Object.entries(progressData.categoryProgress).find(
      ([_, stats]) => stats.progress < 50
    );
    if (weakCategory) {
      insights.push({
        type: 'warning',
        icon: <RefreshCw className='w-5 h-5' />,
        text: `Pratique mais ${weakCategory[1].name} para equilibrar seu conhecimento.`,
      });
    }

    return insights;
  };

  const insights = getInsights();

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
        className='bg-white dark:bg-gray-800 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl'>
                <BarChart3 className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Meu Progresso de Estudos
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Análise completa do seu desempenho e evolução
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'>
                <Download className='w-5 h-5 text-gray-600 dark:text-gray-400' />
              </button>
              <button
                onClick={onClose}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'
              >
                ✕
              </button>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className='flex gap-2 mt-4'>
            {(['week', 'month', 'year', 'all'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {range === 'week'
                  ? 'Semana'
                  : range === 'month'
                  ? 'Mês'
                  : range === 'year'
                  ? 'Ano'
                  : 'Tudo'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>
          {/* Main Stats */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl'>
              <div className='flex items-center justify-between mb-3'>
                <Target className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                <TrendingUp className='w-5 h-5 text-green-600 dark:text-green-400' />
              </div>
              <p className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                {progressData.totalScore}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Pontuação Total
              </p>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl'>
              <div className='flex items-center justify-between mb-3'>
                <CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400' />
                <span className='text-xl font-bold text-green-600 dark:text-green-400'>
                  {accuracyRate}%
                </span>
              </div>
              <p className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                {progressData.correctAnswers}/
                {progressData.totalQuestionsAnswered}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Taxa de Acerto
              </p>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl'>
              <div className='flex items-center justify-between mb-3'>
                <Clock className='w-8 h-8 text-purple-600 dark:text-purple-400' />
                <Activity className='w-5 h-5 text-purple-600 dark:text-purple-400' />
              </div>
              <p className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                {formatTime(progressData.studyTime)}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Tempo de Estudo
              </p>
            </div>

            <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-2xl'>
              <div className='flex items-center justify-between mb-3'>
                <Zap className='w-8 h-8 text-yellow-600 dark:text-yellow-400' />
                <span className='text-2xl'>🔥</span>
              </div>
              <p className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                {progressData.streakDays} dias
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Sequência Atual
              </p>
            </div>
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                💡 Insights e Recomendações
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      insight.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : insight.type === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {insight.icon}
                    <p className='text-sm'>{insight.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Category Progress */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              📚 Progresso por Categoria
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {Object.entries(progressData.categoryProgress).map(
                ([key, stats]) => {
                  const levelInfo = getLevelInfo(stats.level);
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ y: -4 }}
                      className='bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700'
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-3'>
                          <span className='text-3xl'>{stats.icon}</span>
                          <div>
                            <h4 className='font-semibold text-gray-900 dark:text-white'>
                              {stats.name}
                            </h4>
                            <span
                              className={`text-xs font-medium ${levelInfo.color}`}
                            >
                              {levelInfo.name} • Nível {stats.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className='mb-4'>
                        <div className='flex justify-between items-center mb-1'>
                          <span className='text-xs text-gray-500'>
                            Progresso
                          </span>
                          <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                            {stats.progress}%
                          </span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.progress}%` }}
                            className='h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'
                          />
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className='grid grid-cols-2 gap-3 text-sm'>
                        <div className='bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg'>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Questões
                          </p>
                          <p className='font-semibold text-gray-900 dark:text-white'>
                            {stats.questionsAnswered}
                          </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg'>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Acertos
                          </p>
                          <p className='font-semibold text-green-600 dark:text-green-400'>
                            {Math.round(
                              (stats.correctAnswers / stats.questionsAnswered) *
                                100
                            )}
                            %
                          </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg'>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Tempo Médio
                          </p>
                          <p className='font-semibold text-gray-900 dark:text-white'>
                            {stats.avgTime}s
                          </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg'>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Pontos
                          </p>
                          <p className='font-semibold text-purple-600 dark:text-purple-400'>
                            {stats.score}
                          </p>
                        </div>
                      </div>

                      {/* Last Played */}
                      <p className='text-xs text-gray-500 dark:text-gray-400 mt-3'>
                        Último acesso:{' '}
                        {new Date(stats.lastPlayed).toLocaleDateString('pt-BR')}
                      </p>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>

          {/* Difficulty Analysis */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              🎯 Análise por Dificuldade
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {Object.entries(progressData.difficultyDistribution).map(
                ([difficulty, stats]) => {
                  const accuracy = Math.round(
                    (stats.correct / stats.total) * 100
                  );
                  const color =
                    difficulty === 'easy'
                      ? 'green'
                      : difficulty === 'medium'
                      ? 'yellow'
                      : 'red';

                  return (
                    <div
                      key={difficulty}
                      className='bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700'
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <span
                          className={`text-lg font-semibold capitalize text-${color}-600 dark:text-${color}-400`}
                        >
                          {difficulty === 'easy'
                            ? '🟢 Fácil'
                            : difficulty === 'medium'
                            ? '🟡 Médio'
                            : '🔴 Difícil'}
                        </span>
                        <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                          {accuracy}%
                        </span>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-600 dark:text-gray-400'>
                            Total
                          </span>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {stats.total}
                          </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-600 dark:text-gray-400'>
                            Corretas
                          </span>
                          <span className='font-medium text-green-600 dark:text-green-400'>
                            {stats.correct}
                          </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-600 dark:text-gray-400'>
                            Erradas
                          </span>
                          <span className='font-medium text-red-600 dark:text-red-400'>
                            {stats.total - stats.correct}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              📅 Atividade Recente
            </h3>
            <div className='bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700'>
              <div className='grid grid-cols-7 gap-2'>
                {progressData.dailyActivity.slice(-28).map((day, index) => {
                  const intensity =
                    day.questionsAnswered > 15
                      ? 'high'
                      : day.questionsAnswered > 8
                      ? 'medium'
                      : day.questionsAnswered > 0
                      ? 'low'
                      : 'none';

                  const bgColor =
                    intensity === 'high'
                      ? 'bg-green-600 dark:bg-green-500'
                      : intensity === 'medium'
                      ? 'bg-green-400 dark:bg-green-600'
                      : intensity === 'low'
                      ? 'bg-green-200 dark:bg-green-800'
                      : 'bg-gray-100 dark:bg-gray-700';

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded ${bgColor} hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer`}
                      title={`${new Date(day.date).toLocaleDateString(
                        'pt-BR'
                      )}: ${day.questionsAnswered} questões`}
                    />
                  );
                })}
              </div>
              <div className='flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400'>
                <span>Menos</span>
                <div className='flex gap-1'>
                  <div className='w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded' />
                  <div className='w-3 h-3 bg-green-200 dark:bg-green-800 rounded' />
                  <div className='w-3 h-3 bg-green-400 dark:bg-green-600 rounded' />
                  <div className='w-3 h-3 bg-green-600 dark:bg-green-500 rounded' />
                </div>
                <span>Mais</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
