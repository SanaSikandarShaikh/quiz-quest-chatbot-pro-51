
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Clock, Award, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string, timeSpent: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const [answer, setAnswer] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setAnswer('');
    setTimeSpent(0);
    setIsSubmitted(false);
  }, [question.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSubmitted) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer, timeSpent);
      setIsSubmitted(true);
      // Auto-reset after a short delay to prepare for next question
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 max-w-4xl mx-auto overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 -m-8 mb-6 p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Question {questionNumber} of {totalQuestions}</span>
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {question.domain}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              question.level === 'fresher' 
                ? 'bg-green-400/30 text-green-100' 
                : 'bg-orange-400/30 text-orange-100'
            }`}>
              {question.level}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeSpent)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Award className="w-4 h-4" />
              <span className="font-semibold">{question.points} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="relative">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your detailed answer here... Be specific and comprehensive!"
              className="min-h-[140px] text-lg border-2 border-purple-200 focus:border-purple-500 transition-all duration-300 rounded-2xl p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {answer.length} characters
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full">
              💡 <span className="font-medium">Tip:</span> Include key concepts and examples in your answer
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-bold disabled:opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Submit Answer</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-green-800 font-bold text-xl mb-2">Answer Submitted!</h4>
            <p className="text-green-700 font-medium">Your answer has been recorded. Loading next question...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
