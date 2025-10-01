'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Heart,
  ExternalLink,
  Star,
  Users,
  Award,
  BookOpen,
  Code,
  Palette,
  Database,
  Shield,
  Cpu,
  Cloud,
  Brain,
  Send,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();

  const categoryLinks = [
    {
      name: 'Web Development',
      href: '#web-dev',
      icon: <Code className='w-4 h-4' />,
    },
    {
      name: 'UX/UI Design',
      href: '#design',
      icon: <Palette className='w-4 h-4' />,
    },
    {
      name: 'Data Analytics',
      href: '#analytics',
      icon: <Database className='w-4 h-4' />,
    },
    {
      name: 'Cybersecurity',
      href: '#security',
      icon: <Shield className='w-4 h-4' />,
    },
    {
      name: 'Data Science',
      href: '#datascience',
      icon: <Cpu className='w-4 h-4' />,
    },
    {
      name: 'DevOps & Cloud',
      href: '#devops',
      icon: <Cloud className='w-4 h-4' />,
    },
    {
      name: 'AI Engineering',
      href: '#ai',
      icon: <Brain className='w-4 h-4' />,
    },
  ];

  const quickLinks = [
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Planos e Preços', href: '#pricing' },
    { name: 'Para Empresas', href: '#enterprise' },
    { name: 'Para Educadores', href: '#educators' },
    { name: 'Certificações', href: '#certifications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Eventos', href: '#events' },
  ];

  const supportLinks = [
    { name: 'Central de Ajuda', href: '#help-center' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Tutoriais', href: '#tutorials' },
    { name: 'Comunidade', href: '#community' },
    { name: 'Contato', href: '#contact' },
    { name: 'Status do Sistema', href: '#status' },
    { name: 'API Docs', href: '#api' },
  ];

  const legalLinks = [
    { name: 'Termos de Uso', href: '#terms' },
    { name: 'Política de Privacidade', href: '#privacy' },
    { name: 'Cookies', href: '#cookies' },
    { name: 'LGPD', href: '#lgpd' },
    { name: 'Licenças', href: '#licenses' },
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
    {
      icon: <Instagram className='w-5 h-5' />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <Facebook className='w-5 h-5' />,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <Youtube className='w-5 h-5' />,
      href: 'https://youtube.com',
      label: 'YouTube',
    },
  ];

  const stats = [
    {
      number: '100K+',
      label: 'Usuários Ativos',
      icon: <Users className='w-5 h-5' />,
    },
    {
      number: '500+',
      label: 'Questões',
      icon: <BookOpen className='w-5 h-5' />,
    },
    { number: '4.9/5', label: 'Avaliação', icon: <Star className='w-5 h-5' /> },
    {
      number: '50K+',
      label: 'Certificados',
      icon: <Award className='w-5 h-5' />,
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer
      className={`relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className={`absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            darkMode ? 'bg-purple-600' : 'bg-purple-400'
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            darkMode ? 'bg-blue-600' : 'bg-blue-400'
          }`}
        />
      </div>

      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20'>
        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='mb-12 sm:mb-16'
        >
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`text-center p-4 sm:p-6 rounded-2xl ${
                  darkMode
                    ? 'bg-gray-800/50 backdrop-blur-sm'
                    : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-3 ${
                    darkMode
                      ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20'
                      : 'bg-gradient-to-br from-purple-100 to-blue-100'
                  }`}
                >
                  {stat.icon}
                </div>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                  {stat.number}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Company Info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className='lg:col-span-2'
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 animate-pulse' />
                <div className='relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-lg'>
                  <GraduationCap className='w-8 h-8 text-white' />
                </div>
              </div>
              <div>
                <h2 className='text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  QuizLabHub
                </h2>
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  Domine o Futuro Tech
                </p>
              </div>
            </div>

            <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
              Transforme seu conhecimento em tecnologia com nossa plataforma
              interativa de aprendizado. Pratique, aprenda e evolua com quizzes
              gamificados e desafios diários.
            </p>

            {/* Newsletter */}
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                📬 Newsletter Semanal
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                Receba dicas, novidades e desafios exclusivos!
              </p>
              <form onSubmit={handleSubscribe} className='relative'>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='seu@email.com'
                  className={`w-full px-4 py-3 pr-12 rounded-xl ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500'
                      : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type='submit'
                  className='absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:shadow-lg transition-all'
                >
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <Sparkles className='w-4 h-4' />
                    </motion.div>
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className='text-sm text-green-600 dark:text-green-400 mt-2'
                >
                  ✨ Inscrição realizada com sucesso!
                </motion.p>
              )}
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-2 flex-wrap'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-xl transition-all ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='lg:col-span-1'
          >
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
              <BookOpen className='w-5 h-5 text-purple-600 dark:text-purple-400' />
              Categorias
            </h3>
            <ul className='space-y-2'>
              {categoryLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all'
                  >
                    <span className='transition-transform group-hover:translate-x-1'>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='lg:col-span-1'
          >
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
              <Zap className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
              Links Rápidos
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all'
                  >
                    <ChevronRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className='lg:col-span-1'
          >
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
              <Target className='w-5 h-5 text-green-600 dark:text-green-400' />
              Suporte
            </h3>
            <ul className='space-y-2'>
              {supportLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all'
                  >
                    <ChevronRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                    <span>{link.name}</span>
                    {link.name === 'Status do Sistema' && (
                      <span className='ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-800'
        >
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
            <div className='flex items-center gap-3'>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <p className='text-xs text-gray-500 dark:text-gray-500'>
                  Email
                </p>
                <a
                  href='mailto:contato@quizlabhub.com'
                  className='text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                >
                  contato@quizlabhub.com
                </a>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <Phone className='w-5 h-5 text-green-600 dark:text-green-400' />
              </div>
              <div>
                <p className='text-xs text-gray-500 dark:text-gray-500'>
                  WhatsApp
                </p>
                <a
                  href='tel:+5511999999999'
                  className='text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors'
                >
                  +55 (11) 99999-9999
                </a>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <MapPin className='w-5 h-5 text-purple-600 dark:text-purple-400' />
              </div>
              <div>
                <p className='text-xs text-gray-500 dark:text-gray-500'>
                  Localização
                </p>
                <p className='text-sm font-medium text-gray-900 dark:text-white'>
                  São Paulo, Brasil
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`py-6 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
              <span>© {currentYear} QuizLabHub</span>
              <span className='hidden sm:inline'>•</span>
              <span className='hidden sm:inline'>
                Todos os direitos reservados
              </span>
              <span>•</span>
              <span className='flex items-center gap-1'>
                Feito com{' '}
                <Heart className='w-4 h-4 text-red-500 animate-pulse' /> no
                Brasil
              </span>
            </div>

            <div className='flex items-center gap-4 text-sm'>
              {legalLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className='mt-6 flex items-center justify-center'
          >
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20'>
              <Trophy className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
              <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                Plataforma #1 em Educação Tech Interativa
              </span>
              <TrendingUp className='w-4 h-4 text-green-600 dark:text-green-400' />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
