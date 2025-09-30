// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuizLabStudy - Aprenda de Forma Interativa',
  description:
    'Um quiz app moderno e interativo para aprender sobre diversos temas de forma divertida',
  icons: {
    icon: '/quiz-icon.svg',
    shortcut: '/quiz-icon.svg',
    apple: '/quiz-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
