
import { UserSession, UserAnswer, Question } from '../types';

class SessionService {
  private sessions: UserSession[] = [];

  createSession(level: 'fresher' | 'experienced', domain: string): UserSession {
    const session: UserSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      level,
      domain,
      currentQuestionIndex: 0,
      answers: [],
      totalScore: 0,
      startTime: new Date(),
    };

    this.sessions.push(session);
    this.saveToLocalStorage();
    return session;
  }

  updateSession(sessionId: string, updates: Partial<UserSession>): UserSession | null {
    const sessionIndex = this.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return null;

    this.sessions[sessionIndex] = { ...this.sessions[sessionIndex], ...updates };
    this.saveToLocalStorage();
    return this.sessions[sessionIndex];
  }

  addAnswer(sessionId: string, answer: UserAnswer): UserSession | null {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return null;

    session.answers.push(answer);
    session.totalScore += answer.points;
    session.currentQuestionIndex++;

    this.saveToLocalStorage();
    return session;
  }

  evaluateAnswer(userAnswer: string, correctAnswer: string, question: Question): UserAnswer {
    // Enhanced evaluation logic for better accuracy
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = correctAnswer.toLowerCase().trim();
    
    // Extract key concepts from correct answer (words longer than 3 characters)
    const keyWords = normalizedCorrectAnswer
      .split(/[\s,.-]+/)
      .filter(word => word.length > 3)
      .filter(word => !['that', 'this', 'with', 'from', 'they', 'have', 'been', 'will', 'when', 'where', 'what', 'which', 'while', 'each', 'their', 'there', 'then', 'than', 'only', 'also', 'into', 'like', 'over', 'just', 'some', 'many', 'more', 'such', 'very', 'well', 'used', 'make', 'work', 'other', 'first', 'after', 'through'].includes(word));
    
    // Count matching key concepts in user answer
    const matchingWords = keyWords.filter(word => normalizedUserAnswer.includes(word));
    
    // Calculate match percentage - require at least 40% of key concepts to be mentioned
    const matchPercentage = keyWords.length > 0 ? matchingWords.length / keyWords.length : 0;
    const isCorrect = matchPercentage >= 0.4;
    
    console.log(`Question: ${question.question}`);
    console.log(`Key words: ${keyWords.join(', ')}`);
    console.log(`Matching words: ${matchingWords.join(', ')}`);
    console.log(`Match percentage: ${matchPercentage}`);
    console.log(`Is correct: ${isCorrect}`);
    
    return {
      questionId: question.id,
      userAnswer,
      isCorrect,
      points: isCorrect ? question.points : 0, // Only award points for correct answers
      timeSpent: 0, // Will be set when called
    };
  }

  getSession(sessionId: string): UserSession | null {
    return this.sessions.find(s => s.id === sessionId) || null;
  }

  getAllSessions(): UserSession[] {
    return this.sessions;
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('interview_sessions', JSON.stringify(this.sessions));
    } catch (error) {
      console.error('Failed to save sessions to localStorage:', error);
    }
  }

  loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('interview_sessions');
      if (saved) {
        this.sessions = JSON.parse(saved).map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined,
        }));
      }
    } catch (error) {
      console.error('Failed to load sessions from localStorage:', error);
      this.sessions = [];
    }
  }
}

export const sessionService = new SessionService();
