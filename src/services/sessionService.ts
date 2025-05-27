
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
    // Simple evaluation logic - in a real app, this would be more sophisticated
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = correctAnswer.toLowerCase().trim();
    
    // Check if user answer contains key concepts from correct answer
    const keyWords = normalizedCorrectAnswer.split(' ').filter(word => word.length > 3);
    const matchingWords = keyWords.filter(word => normalizedUserAnswer.includes(word));
    
    const isCorrect = matchingWords.length >= Math.ceil(keyWords.length * 0.3); // 30% match threshold
    
    return {
      questionId: question.id,
      userAnswer,
      isCorrect,
      points: isCorrect ? question.points : 0,
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
