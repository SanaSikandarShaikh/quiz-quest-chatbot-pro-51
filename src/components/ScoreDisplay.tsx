
import React from 'react';
import { UserSession } from '../types';
import { Trophy, Target, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScoreDisplayProps {
  session: UserSession;
  onRestart: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ session, onRestart }) => {
  const totalQuestions = session.answers.length;
  const correctAnswers = session.answers.filter(answer => answer.isCorrect).length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = session.endTime && session.startTime 
    ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 1000)
    : 0;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding Performance! 🎉", color: "text-green-600" };
    if (percentage >= 75) return { message: "Great Job! 👏", color: "text-blue-600" };
    if (percentage >= 60) return { message: "Good Effort! 👍", color: "text-yellow-600" };
    return { message: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Session Complete!</h2>
        <p className={`text-xl font-semibold ${performance.color}`}>{performance.message}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-600">{session.totalScore}</h3>
          <p className="text-gray-600">Total Score</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-600">{percentage}%</h3>
          <p className="text-gray-600">Accuracy</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600">{correctAnswers}/{totalQuestions}</h3>
          <p className="text-gray-600">Correct</p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-orange-600">{formatTime(totalTime)}</h3>
          <p className="text-gray-600">Time Taken</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Level:</span>
            <span className="ml-2 capitalize">{session.level}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Domain:</span>
            <span className="ml-2">{session.domain}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Questions:</span>
            <span className="ml-2">{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Question Breakdown:</h3>
        {session.answers.map((answer, index) => (
          <div key={answer.questionId} className={`p-4 rounded-lg border-l-4 ${
            answer.isCorrect 
              ? 'bg-green-50 border-green-400' 
              : 'bg-red-50 border-red-400'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">Question {index + 1}</span>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-semibold ${
                  answer.isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
                <span className="text-sm text-gray-600">+{answer.points} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Start New Session
        </Button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
