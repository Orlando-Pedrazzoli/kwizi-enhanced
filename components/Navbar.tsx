'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Menu,
  X,
  Home,
  Trophy,
  BarChart3,
  BookOpen,
  Users,
  HelpCircle,
  Github,
  Twitter,
  Linkedin,
  Moon,
  Sun,
  Sparkles,
  Code,
  Zap,
  Target,
  Brain,
} from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userScore?: number;
  userLevel?: number;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  userScore = 0,
  userLevel = 1,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  const navLinks = [
    {
      name: 'Início',
      href: '#home',
      icon: <Home className='w-4 h-4' />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Categorias',
      href: '#categories',
      icon: <BookOpen className='w-4 h-4' />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Rankings',
      href: '#rankings',
      icon: <Trophy className='w-4 h-4' />,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'Estatísticas',
      href: '#stats',
      icon: <BarChart3 className='w-4 h-4' />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Comunidade',
      href: '#community',
      icon: <Users className='w-4 h-4' />,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      name: 'Ajuda',
      href: '#help',
      icon: <HelpCircle className='w-4 h-4' />,
      color: 'from-red-500 to-pink-500',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className='w-5 h-5' />,
      href: 'https://github.com',
      label: 'GitHub',
    },
    {
      icon: <Twitter className='w-5 h-5' />,
      href: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: <Linkedin className='w-5 h-5' />,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
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
              <Link href='/' className='flex items-center gap-3'>
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
                    Domine o Futuro Tech
                  </p>
                </div>
                <div className='sm:hidden'>
                  <h1 className='text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    QLH
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Links de Navegação - Desktop */}
            <div className='hidden lg:flex items-center gap-2 xl:gap-3'>
              {navLinks.map(link => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setActiveSection(link.href.slice(1))}
                    className={`group relative px-3 xl:px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      activeSection === link.href.slice(1)
                        ? darkMode
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <span className='flex items-center gap-2'>
                      <span
                        className={`transition-transform group-hover:scale-110 ${
                          activeSection === link.href.slice(1)
                            ? `text-transparent bg-gradient-to-r ${link.color} bg-clip-text`
                            : ''
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </span>
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        layoutId='activeSection'
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${link.color}`}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Ações do Usuário */}
            <div className='flex items-center gap-2 sm:gap-3'>
              {/* Score Display - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20'
              >
                <Target className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                <span className='text-sm font-bold text-gray-900 dark:text-white'>
                  {userScore.toLocaleString()}
                </span>
                <span className='text-xs text-gray-600 dark:text-gray-400'>
                  pts
                </span>
              </motion.div>

              {/* Level Badge - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20'
              >
                <Zap className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <span className='text-sm font-bold text-gray-900 dark:text-white'>
                  Nível {userLevel}
                </span>
              </motion.div>

              {/* Quick Actions */}
              <div className='flex items-center gap-1 sm:gap-2'>
                {/* Modo Aprendizado Rápido */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='relative p-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group'
                  aria-label='Modo Aprendizado Rápido'
                >
                  <Brain className='w-5 h-5 text-green-600 dark:text-green-400 group-hover:rotate-12 transition-transform' />
                  <span className='absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                </motion.button>

                {/* Tema */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'
                  aria-label='Alternar tema'
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
                {/* User Stats Mobile */}
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

                {/* Navigation Links Mobile */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveSection(link.href.slice(1));
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === link.href.slice(1)
                          ? darkMode
                            ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white'
                            : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${link.color} bg-opacity-10`}
                      >
                        {link.icon}
                      </div>
                      <span className='font-medium'>{link.name}</span>
                      {activeSection === link.href.slice(1) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='ml-auto'
                        >
                          <Sparkles className='w-4 h-4 text-yellow-500' />
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Social Links Mobile */}
                <div className='pt-3 mt-3 border-t border-gray-200 dark:border-gray-700'>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mb-3 px-4'>
                    Conecte-se conosco
                  </p>
                  <div className='flex items-center gap-2 px-4'>
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all'
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Actions Mobile */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className='pt-3'
                >
                  <button className='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'>
                    <Code className='w-5 h-5' />
                    Começar Quiz Rápido
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
