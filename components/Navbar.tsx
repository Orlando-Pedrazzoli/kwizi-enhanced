'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  Brain,
  BarChart3,
  Target,
  Clock,
  Bookmark,
  History,
  Settings,
  Moon,
  Sun,
  Zap,
  StickyNote,
  RefreshCw,
  BookMarked,
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userScore?: number;
  userLevel?: number;
  onShowHistory?: () => void;
  onShowNotes?: () => void;
  onShowProgress?: () => void;
  onShowSettings?: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  userScore = 0,
  userLevel = 1,
  onShowHistory,
  onShowNotes,
  onShowProgress,
  onShowSettings,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para efeito de blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const studyTools = [
    {
      name: 'Meu Progresso',
      icon: <BarChart3 className='w-5 h-5' />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      onClick: onShowProgress,
      description: 'Acompanhe seu desempenho',
    },
    {
      name: 'Histórico',
      icon: <History className='w-5 h-5' />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      onClick: onShowHistory,
      description: 'Revise questões anteriores',
    },
    {
      name: 'Minhas Notas',
      icon: <StickyNote className='w-5 h-5' />,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      onClick: onShowNotes,
      description: 'Anotações de estudo',
    },
    {
      name: 'Revisão',
      icon: <RefreshCw className='w-5 h-5' />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      onClick: () => {},
      description: 'Sistema de repetição espaçada',
    },
  ];

  return (
    <>
      {/* Navbar Principal */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl'
              : 'bg-white/95 backdrop-blur-xl shadow-xl'
            : darkMode
            ? 'bg-gray-900/80 backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 sm:h-20'>
            {/* Logo e Nome */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-3'
            >
              <div
                className='flex items-center gap-3 cursor-pointer'
                onClick={() => window.location.reload()}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 10,
                  }}
                  className='relative'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 animate-pulse' />
                  <div className='relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2.5 rounded-xl shadow-lg'>
                    <GraduationCap className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                  </div>
                </motion.div>
                <div className='hidden sm:block'>
                  <h1 className='text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    QuizLabHub
                  </h1>
                  <p className='text-[10px] text-gray-600 dark:text-gray-400 font-medium'>
                    Sua Plataforma de Estudo Pessoal
                  </p>
                </div>
                <div className='sm:hidden'>
                  <h1 className='text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    QLH
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Ferramentas de Estudo - Desktop */}
            <div className='hidden lg:flex items-center gap-2 xl:gap-3'>
              {studyTools.map((tool, index) => (
                <motion.button
                  key={tool.name}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={tool.onClick}
                  className={`group px-3 xl:px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    darkMode
                      ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className={`transition-transform group-hover:scale-110 ${tool.color}`}
                    >
                      {tool.icon}
                    </span>
                    <span className='hidden xl:inline'>{tool.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Status do Usuário */}
            <div className='flex items-center gap-2 sm:gap-3'>
              {/* Estatísticas de Estudo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='hidden sm:flex items-center gap-3'
              >
                {/* Pontuação */}
                <div className='flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20'>
                  <Target className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                  <div className='flex flex-col'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      Pontuação
                    </span>
                    <span className='text-sm font-bold text-gray-900 dark:text-white -mt-0.5'>
                      {userScore.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Nível */}
                <div className='flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20'>
                  <Zap className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                  <div className='flex flex-col'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      Nível
                    </span>
                    <span className='text-sm font-bold text-gray-900 dark:text-white -mt-0.5'>
                      {userLevel}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Ações Rápidas */}
              <div className='flex items-center gap-1 sm:gap-2'>
                {/* Modo Foco */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='relative p-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group'
                  aria-label='Modo Foco de Estudo'
                  title='Modo Foco de Estudo'
                >
                  <Brain className='w-5 h-5 text-green-600 dark:text-green-400 group-hover:rotate-12 transition-transform' />
                </motion.button>

                {/* Configurações */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onShowSettings}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'
                  aria-label='Configurações'
                  title='Configurações'
                >
                  <Settings className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                </motion.button>

                {/* Tema */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'
                  aria-label='Alternar tema'
                  title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
                >
                  <AnimatePresence mode='wait'>
                    {darkMode ? (
                      <motion.div
                        key='sun'
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                      >
                        <Sun className='w-5 h-5 text-yellow-500' />
                      </motion.div>
                    ) : (
                      <motion.div
                        key='moon'
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                      >
                        <Moon className='w-5 h-5 text-indigo-600' />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Menu Mobile */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className='lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'
                  aria-label='Menu'
                >
                  <AnimatePresence mode='wait'>
                    {isMobileMenuOpen ? (
                      <motion.div
                        key='close'
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                      >
                        <X className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                      </motion.div>
                    ) : (
                      <motion.div
                        key='menu'
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                      >
                        <Menu className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`lg:hidden overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}
            >
              <div className='container mx-auto px-4 py-4 space-y-2'>
                {/* Status Mobile */}
                <div className='flex items-center gap-3 pb-3 mb-3 border-b border-gray-200 dark:border-gray-700'>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className='flex-1 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl'
                  >
                    <Target className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                    <span className='text-sm font-bold text-gray-900 dark:text-white'>
                      {userScore.toLocaleString()} pts
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className='flex-1 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl'
                  >
                    <Zap className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                    <span className='text-sm font-bold text-gray-900 dark:text-white'>
                      Nível {userLevel}
                    </span>
                  </motion.div>
                </div>

                {/* Ferramentas de Estudo Mobile */}
                {studyTools.map((tool, index) => (
                  <motion.button
                    key={tool.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      tool.onClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      darkMode
                        ? 'text-gray-300 hover:bg-gray-700/50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                      <span className={tool.color}>{tool.icon}</span>
                    </div>
                    <div className='flex-1 text-left'>
                      <div className='font-medium'>{tool.name}</div>
                      <div className='text-xs opacity-75'>
                        {tool.description}
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Botão de Ação Rápida */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className='pt-3'
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'
                  >
                    <BookOpen className='w-5 h-5' />
                    Continuar Estudando
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para compensar navbar fixa */}
      <div className='h-16 sm:h-20' />
    </>
  );
}
