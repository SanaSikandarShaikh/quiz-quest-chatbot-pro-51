
import { UserSession, UserAnswer, Question } from '../types';
import { apiService } from './apiService';

class SessionService {
  private sessions: UserSession[] = [];

  async createSession(level: 'fresher' | 'experienced', domain: string): Promise<UserSession> {
    try {
      // Try to create session via API first
      const session = await apiService.createSession(level, domain);
      
      // Convert API response to match our UserSession type
      const userSession: UserSession = {
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      };
      
      this.sessions.push(userSession);
      this.saveToLocalStorage();
      return userSession;
    } catch (error) {
      console.error('Failed to create session via API, falling back to local:', error);
      
      // Fallback to local session creation
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
  }

  async updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession | null> {
    try {
      // Try to update via API first
      const updatedSession = await apiService.updateSession(sessionId, updates);
      
      const sessionIndex = this.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex] = {
          ...updatedSession,
          startTime: new Date(updatedSession.startTime),
          endTime: updatedSession.endTime ? new Date(updatedSession.endTime) : undefined,
        };
        this.saveToLocalStorage();
        return this.sessions[sessionIndex];
      }
    } catch (error) {
      console.error('Failed to update session via API, falling back to local:', error);
    }
    
    // Fallback to local update
    const sessionIndex = this.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return null;

    this.sessions[sessionIndex] = { ...this.sessions[sessionIndex], ...updates };
    this.saveToLocalStorage();
    return this.sessions[sessionIndex];
  }

  async addAnswer(sessionId: string, answer: UserAnswer): Promise<UserSession | null> {
    try {
      // Try to add answer via API
      const response = await apiService.addAnswer(
        sessionId, 
        answer.questionId, 
        answer.userAnswer, 
        answer.timeSpent
      );
      
      const session = this.sessions.find(s => s.id === sessionId);
      if (session) {
        session.answers.push(response.answer);
        session.totalScore = response.session.totalScore;
        session.currentQuestionIndex = response.session.currentQuestionIndex;
        this.saveToLocalStorage();
        return session;
      }
    } catch (error) {
      console.error('Failed to add answer via API, falling back to local:', error);
    }
    
    // Fallback to local answer handling
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
      points: isCorrect ? question.points : 0,
      timeSpent: 0,
    };
  }

  async getSession(sessionId: string): Promise<UserSession | null> {
    try {
      // Try to get session from API first
      const session = await apiService.getSession(sessionId);
      return {
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      };
    } catch (error) {
      console.error('Failed to get session from API, falling back to local:', error);
    }
    
    // Fallback to local session
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
