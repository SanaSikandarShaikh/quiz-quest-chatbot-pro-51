
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, UserSession, Question } from '../types';
import { questions, domains } from '../data/questions';
import { sessionService } from '../services/sessionService';
import ChatMessage from './ChatMessage';
import QuestionCard from './QuestionCard';
import ScoreDisplay from './ScoreDisplay';
import { Button } from '@/components/ui/button';
import { Send, RotateCcw } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [selectedLevel, setSelectedLevel] = useState<'fresher' | 'experienced' | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionService.loadFromLocalStorage();
    addBotMessage("Hi! 👋 Welcome to the Interview Questions Generator! I'm here to help you practice interview questions. Let's start by selecting your experience level.", true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string, isTyping: boolean = false) => {
    const message: ChatMessageType = {
      id: `bot_${Date.now()}`,
      type: 'bot',
      content,
      timestamp: new Date(),
      isTyping,
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessageType = {
      id: `user_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const addSystemMessage = (content: string) => {
    const message: ChatMessageType = {
      id: `system_${Date.now()}`,
      type: 'system',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const handleLevelSelection = (level: 'fresher' | 'experienced') => {
    setSelectedLevel(level);
    addUserMessage(`I'm a ${level}`);
    setTimeout(() => {
      addBotMessage(`Great! You've selected ${level} level. Now, please choose a domain you'd like to practice:`, true);
    }, 500);
  };

  const handleDomainSelection = (domain: string) => {
    setSelectedDomain(domain);
    addUserMessage(`I want to practice ${domain}`);
    
    setTimeout(() => {
      if (selectedLevel) {
        startSession(selectedLevel, domain);
      }
    }, 500);
  };

  const startSession = (level: 'fresher' | 'experienced', domain: string) => {
    const session = sessionService.createSession(level, domain);
    setCurrentSession(session);
    
    const availableQuestions = questions.filter(q => 
      q.level === level && (domain === 'All' || q.domain === domain)
    );
    
    if (availableQuestions.length === 0) {
      addBotMessage("Sorry, no questions available for this combination. Please try a different selection.");
      return;
    }

    const firstQuestion = availableQuestions[0];
    setCurrentQuestion(firstQuestion);
    setGameState('playing');
    
    addSystemMessage(`Starting ${level} level ${domain} interview practice`);
    setTimeout(() => {
      addBotMessage(`Perfect! Let's begin with your ${level} level ${domain} practice session. I'll present you with questions and you can type your answers. Ready? Here's your first question! 🚀`, true);
    }, 1000);
  };

  const handleAnswer = (answer: string, timeSpent: number) => {
    if (!currentSession || !currentQuestion) return;

    const evaluation = sessionService.evaluateAnswer(answer, currentQuestion.correctAnswer, currentQuestion);
    evaluation.timeSpent = timeSpent;
    
    const updatedSession = sessionService.addAnswer(currentSession.id, evaluation);
    if (!updatedSession) return;

    setCurrentSession(updatedSession);
    addUserMessage(answer);

    setTimeout(() => {
      if (evaluation.isCorrect) {
        addBotMessage(`Excellent! ✅ That's correct! You earned ${evaluation.points} points. ${currentQuestion.correctAnswer}`, true);
      } else {
        addBotMessage(`Good attempt! ❌ Here's the correct answer: ${currentQuestion.correctAnswer}. Keep practicing!`, true);
      }

      setTimeout(() => {
        const availableQuestions = questions.filter(q => 
          q.level === updatedSession.level && 
          (selectedDomain === 'All' || q.domain === selectedDomain) &&
          !updatedSession.answers.some(a => a.questionId === q.id)
        );

        if (availableQuestions.length > 0 && updatedSession.answers.length < 5) {
          const nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
          setCurrentQuestion(nextQuestion);
          addBotMessage("Great! Let's continue with the next question. 📝", true);
        } else {
          finishSession(updatedSession);
        }
      }, 2000);
    }, 1000);
  };

  const finishSession = (session: UserSession) => {
    const finishedSession = sessionService.updateSession(session.id, { endTime: new Date() });
    if (finishedSession) {
      setCurrentSession(finishedSession);
    }
    setGameState('finished');
    setCurrentQuestion(null);
    
    setTimeout(() => {
      addBotMessage("Congratulations! 🎉 You've completed your interview practice session. Here are your results:", true);
    }, 500);
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentSession(null);
    setCurrentQuestion(null);
    setGameState('setup');
    setSelectedLevel(null);
    setSelectedDomain(null);
    
    setTimeout(() => {
      addBotMessage("Hi! 👋 Welcome back to the Interview Questions Generator! Ready for another practice session? Let's select your experience level.", true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Interview Questions Generator
            </h1>
            <p className="text-gray-600 text-lg">Practice with AI-powered interview questions tailored to your level</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Selection Buttons */}
                {gameState === 'setup' && (
                  <div className="p-6 border-t border-gray-100">
                    {!selectedLevel ? (
                      <div className="space-y-3">
                        <p className="text-gray-600 font-medium">Choose your experience level:</p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleLevelSelection('fresher')}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
                          >
                            Fresher
                          </Button>
                          <Button
                            onClick={() => handleLevelSelection('experienced')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                          >
                            Experienced
                          </Button>
                        </div>
                      </div>
                    ) : !selectedDomain ? (
                      <div className="space-y-3">
                        <p className="text-gray-600 font-medium">Select a domain:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {domains.map((domain) => (
                            <Button
                              key={domain}
                              onClick={() => handleDomainSelection(domain)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                            >
                              {domain}
                            </Button>
                          ))}
                          <Button
                            onClick={() => handleDomainSelection('All')}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm col-span-2"
                          >
                            All Domains
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Restart Button */}
                {gameState !== 'setup' && (
                  <div className="p-6 border-t border-gray-100">
                    <Button
                      onClick={restartChat}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Start New Session
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Question/Score Section */}
            <div className="lg:col-span-1">
              {gameState === 'playing' && currentQuestion && currentSession && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={currentSession.answers.length + 1}
                  totalQuestions={5}
                />
              )}

              {gameState === 'finished' && currentSession && (
                <ScoreDisplay
                  session={currentSession}
                  onRestart={restartChat}
                />
              )}

              {gameState === 'setup' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">How it works:</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <p>Choose your experience level (Fresher or Experienced)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <p>Select a domain or practice all domains</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                      <p>Answer questions and get instant feedback</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                      <p>Review your performance and improve</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
