'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  Star,
  Award,
  Target,
  Clock,
  Brain,
  Zap,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Globe,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { Card, Badge, Button, Tabs, Skeleton } from './ui';

interface LeaderboardEntry {
  rank: number;
  previousRank?: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  achievements: number;
  quizzesCompleted: number;
  accuracy: number;
  country?: string;
  isCurrentUser?: boolean;
  categoryScores?: Record<string, number>;
  weeklyXP?: number;
  streakDays?: number;
}

interface LeaderboardProps {
  currentUserId?: string;
  darkMode: boolean;
}

// Mock data generator
const generateMockLeaderboard = (count: number): LeaderboardEntry[] => {
  const usernames = [
    'TechMaster',
    'QuizNinja',
    'CodeWarrior',
    'DataGuru',
    'CloudExpert',
    'AIEnthusiast',
    'DevOpsHero',
    'SecurityPro',
    'FullStackDev',
    'MLScientist',
    'ReactMaster',
    'PythonPro',
    'JavaExpert',
    'NodeNinja',
    'DockerCaptain',
    'K8sMaster',
    'AWSArchitect',
    'AzureExpert',
    'GCPGuru',
    'BlockchainDev',
  ];

  const countries = [
    'BR',
    'US',
    'UK',
    'CA',
    'DE',
    'FR',
    'JP',
    'IN',
    'AU',
    'NL',
  ];

  return Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    previousRank:
      Math.random() > 0.5 ? i + Math.floor(Math.random() * 5) - 2 : undefined,
    userId: `user-${i + 1}`,
    username:
      usernames[i % usernames.length] + (i >= usernames.length ? i : ''),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    score: Math.floor(10000 - i * 100 - Math.random() * 50),
    level: Math.max(1, Math.floor(20 - i / 5)),
    achievements: Math.floor(30 - i / 3),
    quizzesCompleted: Math.floor(100 - i * 2),
    accuracy: Math.max(60, Math.floor(95 - i - Math.random() * 10)),
    country: countries[Math.floor(Math.random() * countries.length)],
    weeklyXP: Math.floor(500 - i * 10 - Math.random() * 20),
    streakDays: Math.floor(Math.random() * 30),
    categoryScores: {
      'web-development': Math.floor(1000 - i * 10 - Math.random() * 50),
      'data-science': Math.floor(900 - i * 10 - Math.random() * 50),
      devops: Math.floor(800 - i * 10 - Math.random() * 50),
    },
  }));
};

export default function Leaderboard({
  currentUserId = 'user-5',
  darkMode,
}: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<
    'daily' | 'weekly' | 'monthly' | 'all'
  >('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFriends, setShowOnlyFriends] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      const data = generateMockLeaderboard(100);
      // Marcar o usuário atual
      data.forEach(entry => {
        if (entry.userId === currentUserId) {
          entry.isCurrentUser = true;
        }
      });
      setLeaderboardData(data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUserId, timeFilter, categoryFilter]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className='w-6 h-6 text-yellow-500' />;
      case 2:
        return <Medal className='w-6 h-6 text-gray-400' />;
      case 3:
        return <Medal className='w-6 h-6 text-orange-600' />;
      default:
        return (
          <span className='text-lg font-bold text-gray-600 dark:text-gray-400'>
            #{rank}
          </span>
        );
    }
  };

  const getRankChange = (current: number, previous?: number) => {
    if (!previous) return null;

    const change = previous - current;
    if (change > 0) {
      return (
        <div className='flex items-center gap-1 text-green-600 dark:text-green-400'>
          <TrendingUp className='w-4 h-4' />
          <span className='text-xs font-semibold'>+{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className='flex items-center gap-1 text-red-600 dark:text-red-400'>
          <TrendingDown className='w-4 h-4' />
          <span className='text-xs font-semibold'>{change}</span>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-1 text-gray-500'>
          <Minus className='w-4 h-4' />
        </div>
      );
    }
  };

  const getLevelBadge = (level: number) => {
    if (level >= 15) {
      return { color: 'purple', title: 'Master' };
    } else if (level >= 10) {
      return { color: 'info', title: 'Expert' };
    } else if (level >= 5) {
      return { color: 'success', title: 'Advanced' };
    } else {
      return { color: 'warning', title: 'Beginner' };
    }
  };

  const filteredData = leaderboardData.filter(entry => {
    if (searchTerm) {
      return entry.username.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const topThree = filteredData.slice(0, 3);
  const restOfLeaderboard = filteredData.slice(3, 50);
  const currentUserData = leaderboardData.find(entry => entry.isCurrentUser);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='text-center'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='inline-block mb-4'
        >
          <div className='p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full'>
            <Trophy className='w-12 h-12 text-white' />
          </div>
        </motion.div>
        <h2 className='text-3xl sm:text-4xl font-black bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2'>
          Ranking Global
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          Compete com jogadores do mundo todo e suba no ranking!
        </p>
      </div>

      {/* Filters */}
      <Card padding='md'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Time Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              <Calendar className='inline w-4 h-4 mr-1' />
              Período
            </label>
            <div className='flex gap-2'>
              {(['daily', 'weekly', 'monthly', 'all'] as const).map(period => (
                <Button
                  key={period}
                  variant={timeFilter === period ? 'primary' : 'ghost'}
                  size='sm'
                  onClick={() => setTimeFilter(period)}
                >
                  {period === 'daily'
                    ? 'Hoje'
                    : period === 'weekly'
                    ? 'Semana'
                    : period === 'monthly'
                    ? 'Mês'
                    : 'Todos'}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              <Filter className='inline w-4 h-4 mr-1' />
              Categoria
            </label>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className={`
                w-full px-3 py-2 rounded-xl border
                ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            >
              <option value='all'>Todas as Categorias</option>
              <option value='web-development'>Web Development</option>
              <option value='data-science'>Data Science</option>
              <option value='devops'>DevOps & Cloud</option>
              <option value='ai'>AI Engineering</option>
            </select>
          </div>

          {/* Search */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              <Search className='inline w-4 h-4 mr-1' />
              Buscar
            </label>
            <input
              type='text'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder='Buscar jogador...'
              className={`
                w-full px-3 py-2 rounded-xl border
                ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
          </div>

          {/* Friends Filter */}
          <div className='flex items-end'>
            <Button
              variant={showOnlyFriends ? 'primary' : 'outline'}
              onClick={() => setShowOnlyFriends(!showOnlyFriends)}
              leftIcon={<Users className='w-4 h-4' />}
            >
              Amigos
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
          <div className='text-center'>
            <Globe className='w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400' />
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              10,234
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Jogadores Ativos
            </p>
          </div>
          <div className='text-center'>
            <Brain className='w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400' />
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              1.2M
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Questões Respondidas
            </p>
          </div>
          <div className='text-center'>
            <Target className='w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400' />
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              78%
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Taxa Média de Acerto
            </p>
          </div>
          <div className='text-center'>
            <Zap className='w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400' />
            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
              15.3K
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              XP Distribuído Hoje
            </p>
          </div>
        </div>
      </Card>

      {/* Top 3 Podium */}
      {!loading && topThree.length === 3 && (
        <div className='grid grid-cols-3 gap-4 mb-6'>
          {/* 2nd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='mt-8'
          >
            <Card
              variant='gradient'
              padding='md'
              hoverable
              className='text-center relative overflow-hidden'
            >
              <div className='absolute top-2 left-2'>
                <Badge variant='default' size='sm'>
                  2º
                </Badge>
              </div>
              <div className='relative w-20 h-20 mx-auto mb-3'>
                <Image
                  src={topThree[1].avatar || '/default-avatar.png'}
                  alt={topThree[1].username}
                  width={80}
                  height={80}
                  className='rounded-full border-4 border-gray-400'
                />
                <div className='absolute -bottom-1 -right-1'>
                  {getRankIcon(2)}
                </div>
              </div>
              <h3 className='font-bold text-gray-900 dark:text-white mb-1'>
                {topThree[1].username}
              </h3>
              <p className='text-2xl font-black text-gray-900 dark:text-white mb-2'>
                {topThree[1].score.toLocaleString()}
              </p>
              <Badge variant='info' size='xs'>
                Nível {topThree[1].level}
              </Badge>
            </Card>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              variant='gradient'
              padding='md'
              hoverable
              className='text-center relative overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className='absolute top-2 left-2'
              >
                <Badge variant='warning' size='sm'>
                  <Crown className='w-3 h-3 mr-1' />
                  1º
                </Badge>
              </motion.div>
              <div className='relative w-24 h-24 mx-auto mb-3'>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-50'
                />
                <Image
                  src={topThree[0].avatar || '/default-avatar.png'}
                  alt={topThree[0].username}
                  width={96}
                  height={96}
                  className='relative rounded-full border-4 border-yellow-500'
                />
                <div className='absolute -bottom-2 -right-2'>
                  {getRankIcon(1)}
                </div>
              </div>
              <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-1'>
                {topThree[0].username}
              </h3>
              <p className='text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2'>
                {topThree[0].score.toLocaleString()}
              </p>
              <div className='flex justify-center gap-2'>
                <Badge variant='warning' size='xs'>
                  Nível {topThree[0].level}
                </Badge>
                <Badge variant='purple' size='xs'>
                  <Trophy className='w-3 h-3 mr-1' />
                  {topThree[0].achievements}
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='mt-8'
          >
            <Card
              variant='gradient'
              padding='md'
              hoverable
              className='text-center relative overflow-hidden'
            >
              <div className='absolute top-2 left-2'>
                <Badge variant='default' size='sm'>
                  3º
                </Badge>
              </div>
              <div className='relative w-20 h-20 mx-auto mb-3'>
                <Image
                  src={topThree[2].avatar || '/default-avatar.png'}
                  alt={topThree[2].username}
                  width={80}
                  height={80}
                  className='rounded-full border-4 border-orange-600'
                />
                <div className='absolute -bottom-1 -right-1'>
                  {getRankIcon(3)}
                </div>
              </div>
              <h3 className='font-bold text-gray-900 dark:text-white mb-1'>
                {topThree[2].username}
              </h3>
              <p className='text-2xl font-black text-gray-900 dark:text-white mb-2'>
                {topThree[2].score.toLocaleString()}
              </p>
              <Badge variant='info' size='xs'>
                Nível {topThree[2].level}
              </Badge>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Current User Position */}
      {currentUserData && currentUserData.rank > 3 && (
        <Card
          variant='bordered'
          padding='md'
          className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='text-center'>
                {getRankIcon(currentUserData.rank)}
                {getRankChange(
                  currentUserData.rank,
                  currentUserData.previousRank
                )}
              </div>
              <div className='relative'>
                <Image
                  src={currentUserData.avatar || '/default-avatar.png'}
                  alt={currentUserData.username}
                  width={48}
                  height={48}
                  className='rounded-full border-2 border-blue-500'
                />
                <Badge
                  variant='success'
                  size='xs'
                  className='absolute -bottom-1 -right-1'
                >
                  Você
                </Badge>
              </div>
              <div>
                <h4 className='font-bold text-gray-900 dark:text-white'>
                  {currentUserData.username}
                </h4>
                <div className='flex gap-2 mt-1'>
                  <Badge
                    variant={getLevelBadge(currentUserData.level).color as any}
                    size='xs'
                  >
                    Nível {currentUserData.level}
                  </Badge>
                  <span className='text-xs text-gray-600 dark:text-gray-400'>
                    {currentUserData.accuracy}% precisão
                  </span>
                </div>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {currentUserData.score.toLocaleString()}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                pontos totais
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Main Leaderboard */}
      <Card padding='none'>
        <div className='overflow-x-auto'>
          {loading ? (
            <div className='p-6 space-y-4'>
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} height={60} variant='rounded' />
              ))}
            </div>
          ) : (
            <table className='w-full'>
              <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <tr>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    Posição
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    Jogador
                  </th>
                  <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    Nível
                  </th>
                  <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell'>
                    Quizzes
                  </th>
                  <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell'>
                    Precisão
                  </th>
                  <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell'>
                    Conquistas
                  </th>
                  <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    Pontuação
                  </th>
                  <th className='px-4 py-3'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                <AnimatePresence>
                  {restOfLeaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className={`
                        ${
                          entry.isCurrentUser
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                            : darkMode
                            ? 'hover:bg-gray-800'
                            : 'hover:bg-gray-50'
                        }
                        transition-colors cursor-pointer
                      `}
                      onClick={() =>
                        setExpandedUser(
                          expandedUser === entry.userId ? null : entry.userId
                        )
                      }
                    >
                      <td className='px-4 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          {getRankIcon(entry.rank)}
                          {getRankChange(entry.rank, entry.previousRank)}
                        </div>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`relative w-10 h-10 ${
                              entry.isCurrentUser
                                ? 'ring-2 ring-blue-500 rounded-full'
                                : ''
                            }`}
                          >
                            <Image
                              src={entry.avatar || '/default-avatar.png'}
                              alt={entry.username}
                              width={40}
                              height={40}
                              className='rounded-full'
                            />
                          </div>
                          <div>
                            <div className='flex items-center gap-2'>
                              <span className='font-medium text-gray-900 dark:text-white'>
                                {entry.username}
                              </span>
                              {entry.isCurrentUser && (
                                <Badge variant='success' size='xs'>
                                  Você
                                </Badge>
                              )}
                              {entry.country && (
                                <span className='text-xs text-gray-500'>
                                  {entry.country}
                                </span>
                              )}
                            </div>
                            {entry.streakDays && entry.streakDays > 7 && (
                              <div className='flex items-center gap-1 mt-1'>
                                <Zap className='w-3 h-3 text-orange-500' />
                                <span className='text-xs text-gray-600 dark:text-gray-400'>
                                  {entry.streakDays} dias de sequência
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-center'>
                        <Badge
                          variant={getLevelBadge(entry.level).color as any}
                          size='sm'
                        >
                          {entry.level}
                        </Badge>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-center hidden sm:table-cell'>
                        <span className='text-gray-900 dark:text-white font-medium'>
                          {entry.quizzesCompleted}
                        </span>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-center hidden md:table-cell'>
                        <div className='flex items-center justify-center gap-1'>
                          <span className='text-gray-900 dark:text-white font-medium'>
                            {entry.accuracy}%
                          </span>
                          {entry.accuracy >= 90 && (
                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          )}
                        </div>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-center hidden lg:table-cell'>
                        <div className='flex items-center justify-center gap-1'>
                          <Trophy className='w-4 h-4 text-yellow-600' />
                          <span className='text-gray-900 dark:text-white font-medium'>
                            {entry.achievements}
                          </span>
                        </div>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-right'>
                        <div>
                          <p className='text-xl font-bold text-gray-900 dark:text-white'>
                            {entry.score.toLocaleString()}
                          </p>
                          {entry.weeklyXP && (
                            <p className='text-xs text-gray-600 dark:text-gray-400'>
                              +{entry.weeklyXP} esta semana
                            </p>
                          )}
                        </div>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap'>
                        <motion.div
                          animate={{
                            rotate: expandedUser === entry.userId ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className='w-5 h-5 text-gray-400' />
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {/* Load More */}
        {!loading && filteredData.length > 50 && (
          <div className='p-4 text-center border-t border-gray-200 dark:border-gray-700'>
            <Button
              variant='ghost'
              leftIcon={<ChevronDown className='w-4 h-4' />}
            >
              Carregar mais
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
