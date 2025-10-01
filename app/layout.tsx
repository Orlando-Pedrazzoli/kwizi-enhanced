import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'QuizLabHub - Domine as Habilidades Tech do Futuro',
  description:
    'Plataforma interativa de aprendizado em tecnologia. Teste seus conhecimentos em Web Development, UX/UI Design, Data Analytics, Cybersecurity, Data Science, DevOps & Cloud e AI Engineering.',
  keywords:
    'quiz, tecnologia, web development, ux design, data science, cybersecurity, devops, ai, machine learning, aprendizado interativo',
  authors: [{ name: 'QuizLabHub Team' }],
  openGraph: {
    title: 'QuizLabHub - Domine as Habilidades Tech do Futuro',
    description:
      'Aprenda tecnologia de forma interativa e divertida com quizzes gamificados',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'QuizLabHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuizLabHub - Plataforma de Aprendizado Tech',
    description:
      'Teste seus conhecimentos em tecnologia com quizzes interativos',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  icons: {
    icon: '/quiz.svg',
    shortcut: '/quiz.svg',
    apple: '/quiz.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className={inter.variable}>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <meta name='format-detection' content='telephone=no' />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
