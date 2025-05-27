
const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async healthCheck() {
    return this.request('/health');
  }

  async getQuestions(level?: string, domain?: string) {
    const params = new URLSearchParams();
    if (level) params.append('level', level);
    if (domain) params.append('domain', domain);
    
    const queryString = params.toString();
    return this.request(`/questions${queryString ? `?${queryString}` : ''}`);
  }

  async createSession(level: string, domain: string) {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify({ level, domain }),
    });
  }

  async getSession(sessionId: string) {
    return this.request(`/sessions/${sessionId}`);
  }

  async addAnswer(sessionId: string, questionId: number, userAnswer: string, timeSpent: number) {
    return this.request(`/sessions/${sessionId}/answers`, {
      method: 'POST',
      body: JSON.stringify({
        questionId,
        userAnswer,
        timeSpent,
      }),
    });
  }

  async updateSession(sessionId: string, updates: any) {
    return this.request(`/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
}

export const apiService = new ApiService();
