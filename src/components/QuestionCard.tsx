
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Clock, Award } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {question.domain}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            question.level === 'fresher' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {question.level}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeSpent)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{question.points} pts</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>
      </div>

      {!isSubmitted ? (
        <div className="space-y-4">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-green-800 font-semibold mb-2">Answer Submitted!</h4>
          <p className="text-green-700">Your answer has been recorded. Loading next question...</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
