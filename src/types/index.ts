
export interface Question {
  id: number;
  question: string;
  domain: string;
  level: 'fresher' | 'experienced';
  correctAnswer: string;
  points: number;
  options?: string[];
}

export interface UserSession {
  id: string;
  level: 'fresher' | 'experienced';
  domain: string;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  totalScore: number;
  startTime: Date;
  endTime?: Date;
}

export interface UserAnswer {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}
