import { useState, useEffect, useCallback } from 'react';
import { UserProgress, GameState, QuizCategory, Achievement } from '@/types';

/**
 * Hook para gerenciar o tema (dark/light mode)
 */
export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Detectar preferência do sistema
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return { darkMode, setDarkMode, toggleTheme };
};

/**
 * Hook para gerenciar sons do jogo
 */
export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const savedSound = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('soundVolume');

    if (savedSound !== null) {
      setSoundEnabled(JSON.parse(savedSound));
    }

    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);

  const playSound = useCallback(
    (
      type: 'correct' | 'wrong' | 'achievement' | 'complete' | 'click' | 'hover'
    ) => {
      if (!soundEnabled) return;

      const sounds = {
        correct: '/sounds/correct.mp3',
        wrong: '/sounds/wrong.mp3',
        achievement: '/sounds/achievement.mp3',
        complete: '/sounds/complete.mp3',
        click: '/sounds/click.mp3',
        hover: '/sounds/hover.mp3',
      };

      try {
        const audio = new Audio(sounds[type]);
        audio.volume = volume;
        audio.play().catch(err => console.log('Error playing sound:', err));
      } catch (err) {
        console.log('Sound not available:', type);
      }
    },
    [soundEnabled, volume]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    volume,
    setVolume,
    playSound,
  };
};

/**
 * Hook para gerenciar progresso do usuário
 */
export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalScore: 0,
    quizzesCompleted: 0,
    categoriesPlayed: [],
    unlockedAchievements: [],
    bestScores: {},
    categoryLevels: {},
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    studyTime: 0,
    lastPlayed: new Date().toISOString(),
    userLevel: 1,
    xp: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
          const progress = JSON.parse(saved);
          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        'quizProgress',
        JSON.stringify({
          ...userProgress,
          lastPlayed: new Date().toISOString(),
        })
      );
    }
  }, [userProgress, loading]);

  const calculateUserLevel = useCallback(() => {
    const xp = userProgress.xp || 0;
    const levels = [
      0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 7800,
      9100, 10500, 12000, 13600, 15300, 17100, 20000,
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i]) {
        return i + 1;
      }
    }
    return 1;
  }, [userProgress.xp]);

  const updateProgress = useCallback(
    (updates: Partial<UserProgress>) => {
      setUserProgress(prev => ({
        ...prev,
        ...updates,
        userLevel: calculateUserLevel(),
      }));
    },
    [calculateUserLevel]
  );

  const addXP = useCallback(
    (amount: number) => {
      setUserProgress(prev => ({
        ...prev,
        xp: (prev.xp || 0) + amount,
        userLevel: calculateUserLevel(),
      }));
    },
    [calculateUserLevel]
  );

  const getAccuracyRate = useCallback(() => {
    if (userProgress.totalQuestionsAnswered === 0) return 0;
    return Math.round(
      (userProgress.correctAnswers / userProgress.totalQuestionsAnswered) * 100
    );
  }, [userProgress.totalQuestionsAnswered, userProgress.correctAnswers]);

  const getCategoryProgress = useCallback(
    (categoryId: string) => {
      const score = userProgress.bestScores[categoryId] || 0;
      const level = userProgress.categoryLevels[categoryId] || 0;
      const played = userProgress.categoriesPlayed.includes(categoryId);

      return { score, level, played };
    },
    [userProgress]
  );

  const unlockAchievement = useCallback(
    (achievementId: string) => {
      if (!userProgress.unlockedAchievements.includes(achievementId)) {
        setUserProgress(prev => ({
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        }));
        return true;
      }
      return false;
    },
    [userProgress.unlockedAchievements]
  );

  const resetProgress = useCallback(() => {
    const confirm = window.confirm(
      'Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.'
    );
    if (confirm) {
      setUserProgress({
        totalScore: 0,
        quizzesCompleted: 0,
        categoriesPlayed: [],
        unlockedAchievements: [],
        bestScores: {},
        categoryLevels: {},
        totalQuestionsAnswered: 0,
        correctAnswers: 0,
        studyTime: 0,
        lastPlayed: new Date().toISOString(),
        userLevel: 1,
        xp: 0,
      });
      localStorage.removeItem('quizProgress');
    }
  }, []);

  return {
    userProgress,
    loading,
    updateProgress,
    addXP,
    getAccuracyRate,
    getCategoryProgress,
    unlockAchievement,
    resetProgress,
  };
};

/**
 * Hook para gerenciar timer do quiz
 */
export const useQuizTimer = (onTimeUp?: () => void) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    setTimeElapsed(0);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    const finalTime = timeElapsed;
    setTimeElapsed(0);
    return finalTime;
  }, [timeElapsed]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeElapsed,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    formatTime,
  };
};

/**
 * Hook para gerenciar animações
 */
export const useAnimations = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('animationsEnabled');
    if (saved !== null) {
      setAnimationsEnabled(JSON.parse(saved));
    } else {
      // Respeitar preferência de movimento reduzido
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      setAnimationsEnabled(!prefersReducedMotion);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'animationsEnabled',
      JSON.stringify(animationsEnabled)
    );
  }, [animationsEnabled]);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => !prev);
  }, []);

  const getAnimationProps = useCallback(
    (animation: any) => {
      return animationsEnabled ? animation : {};
    },
    [animationsEnabled]
  );

  return { animationsEnabled, toggleAnimations, getAnimationProps };
};

/**
 * Hook para detectar tamanho da tela
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

/**
 * Hook para gerenciar notificações
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [permission, setPermission] =
    useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  }, []);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    },
    [permission]
  );

  const addInAppNotification = useCallback((notification: any) => {
    setNotifications(prev => [...prev, { ...notification, id: Date.now() }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    permission,
    requestPermission,
    showNotification,
    addInAppNotification,
    removeNotification,
    clearNotifications,
  };
};

/**
 * Hook para gerenciar conquistas/achievements
 */
export const useAchievements = (userProgress: UserProgress) => {
  const checkAchievements = useCallback(
    (
      newProgress: UserProgress,
      currentQuizScore?: number,
      timeTaken?: number
    ) => {
      const newAchievements: string[] = [];

      // Lista de checagens de conquistas
      const achievementChecks = [
        {
          id: 'first-win',
          condition: newProgress.quizzesCompleted === 1,
        },
        {
          id: 'perfect-score',
          condition: currentQuizScore !== undefined && currentQuizScore === 100,
        },
        {
          id: 'speed-demon',
          condition: timeTaken !== undefined && timeTaken < 120,
        },
        {
          id: 'explorer',
          condition: newProgress.categoriesPlayed.length >= 7,
        },
        {
          id: 'master',
          condition: newProgress.totalScore >= 1000,
        },
        {
          id: 'consistent',
          condition: newProgress.quizzesCompleted >= 10,
        },
        {
          id: 'expert',
          condition: newProgress.userLevel >= 10,
        },
        {
          id: 'scholar',
          condition: newProgress.totalQuestionsAnswered >= 500,
        },
        {
          id: 'perfectionist',
          condition:
            newProgress.correctAnswers >= 100 &&
            newProgress.correctAnswers / newProgress.totalQuestionsAnswered >=
              0.95,
        },
        {
          id: 'dedicated',
          condition: newProgress.studyTime >= 3600, // 1 hora
        },
      ];

      achievementChecks.forEach(check => {
        if (
          check.condition &&
          !newProgress.unlockedAchievements.includes(check.id)
        ) {
          newAchievements.push(check.id);
        }
      });

      return newAchievements;
    },
    []
  );

  return { checkAchievements };
};

/**
 * Hook para localStorage com fallback
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

/**
 * Hook para gerenciar atalhos de teclado
 */
export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      let shortcutKey = '';
      if (ctrl) shortcutKey += 'ctrl+';
      if (shift) shortcutKey += 'shift+';
      if (alt) shortcutKey += 'alt+';
      shortcutKey += key;

      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey]();
      } else if (shortcuts[key]) {
        shortcuts[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

/**
 * Hook para detectar se o usuário está online
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
