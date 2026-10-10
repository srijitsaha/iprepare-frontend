export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  userAnswer?: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  formula?: string;
}

export interface QuizResultData {
  id: string;
  score: number;
  totalQuestions: number;
  accuracy: number; // percentage, e.g. 90
  examBoard: string; // e.g. 'JEE Main'
  subject: string; // e.g. 'Physics'
  topic: string; // e.g. 'Thermodynamics'
  timeTakenMinutes: number;
  timeTakenSeconds: number;
  conceptMastery: number; // percentage, e.g. 95
  speedRating: number; // percentage, e.g. 82
  rank: number; // e.g. 42
  topPercentile: number; // e.g. 5
  studyInsight: string;
  incorrectCount: number;
  incorrectQuestions: Question[];
  allQuestions: Question[];
}

export interface NextStepCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: 'quiz' | 'video' | 'notes';
  durationOrLevel: string;
  actionTopic?: string;
}

export type ActiveTab = 'results' | 'dashboard' | 'review' | 'quiz_player' | 'ai_tutor';
