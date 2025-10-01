// Tipos principais do QuizLabHub

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags?: string[];
  imageUrl?: string;
  hints?: string[];
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
  unlockLevel?: number;
  isPremium?: boolean;
  estimatedTime?: number;
  totalPoints?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    type: 'score' | 'quizzes' | 'streak' | 'perfect' | 'speed' | 'category';
    value: number;
  };
  xpReward?: number;
  badgeUrl?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserProgress {
  userId?: string;
  totalScore: number;
  quizzesCompleted: number;
  categoriesPlayed: string[];
  unlockedAchievements: string[];
  bestScores: Record<string, number>;
  categoryLevels: Record<string, number>;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  studyTime: number;
  lastPlayed: string;
  userLevel: number;
  xp: number;
  streakDays?: number;
  favoriteCategory?: string;
  learningPath?: string[];
  badges?: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  unlockedAt: string;
  category?: string;
}

export interface GameState {
  selectedCategory: QuizCategory | null;
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  showExplanation: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  isQuizComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  streak: number;
  mode: GameMode;
  hintsUsed?: number;
  timePerQuestion?: number[];
  bonusPoints?: number;
}

export type GameMode =
  | 'competitive'
  | 'study'
  | 'practice'
  | 'challenge'
  | 'multiplayer';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  achievements: number;
  rank?: number;
  country?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'streak' | 'category' | 'time';
  requirement: any;
  xpReward: number;
  expiresAt: string;
  progress: number;
  completed: boolean;
}

export interface StudySession {
  id: string;
  categoryId: string;
  startedAt: string;
  completedAt?: string;
  questionsAnswered: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  mode: GameMode;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  categories: string[];
  milestones: Milestone[];
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
  certificate?: Certificate;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  requirements: {
    categories?: string[];
    minScore?: number;
    minAccuracy?: number;
  };
  completed: boolean;
  unlockedAt?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuedAt: string;
  validUntil?: string;
  verificationCode: string;
  imageUrl?: string;
}

export interface UserSettings {
  soundEnabled: boolean;
  darkMode: boolean;
  notifications: boolean;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  colorBlindMode: boolean;
  autoSubmit: boolean;
  showTimer: boolean;
  showHints: boolean;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'challenge' | 'reminder' | 'update' | 'social';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

export interface SocialFeatures {
  friends: Friend[];
  challenges: MultiplayerChallenge[];
  messages: Message[];
  groups: StudyGroup[];
}

export interface Friend {
  userId: string;
  username: string;
  avatar?: string;
  level: number;
  status: 'online' | 'offline' | 'playing';
  lastSeen?: string;
}

export interface MultiplayerChallenge {
  id: string;
  challenger: Friend;
  challenged: Friend;
  category: string;
  status: 'pending' | 'active' | 'completed';
  winner?: string;
  scores: Record<string, number>;
  createdAt: string;
}

export interface Message {
  id: string;
  from: Friend;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'challenge' | 'achievement';
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: Friend[];
  admin: string;
  category?: string;
  weeklyGoal?: number;
  createdAt: string;
}

export interface Analytics {
  dailyStats: DailyStat[];
  weeklyProgress: WeeklyProgress;
  monthlyReport: MonthlyReport;
  learningCurve: LearningCurve;
  strongAreas: string[];
  weakAreas: string[];
}

export interface DailyStat {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  xpEarned: number;
  categories: string[];
}

export interface WeeklyProgress {
  week: number;
  startDate: string;
  endDate: string;
  totalQuestions: number;
  accuracy: number;
  avgTimePerQuestion: number;
  completedChallenges: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface MonthlyReport {
  month: string;
  year: number;
  summary: {
    totalQuizzes: number;
    totalScore: number;
    avgAccuracy: number;
    totalTime: number;
    achievements: number;
    rank?: number;
  };
  insights: string[];
  recommendations: string[];
}

export interface LearningCurve {
  data: Array<{
    date: string;
    accuracy: number;
    difficulty: number;
    speed: number;
  }>;
  trend: 'ascending' | 'plateau' | 'descending';
  projectedMastery: string;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  effect: {
    type: 'hint' | 'skip' | 'time' | 'points' | 'second_chance';
    value: number;
  };
  cost: number;
  quantity: number;
}

export interface Store {
  powerUps: PowerUp[];
  themes: Theme[];
  avatars: Avatar[];
  certificates: Certificate[];
  userCoins: number;
  userGems: number;
}

export interface Theme {
  id: string;
  name: string;
  preview: string;
  colors: Record<string, string>;
  price: number;
  isPremium: boolean;
  unlocked: boolean;
}

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  unlocked: boolean;
  animationUrl?: string;
}
