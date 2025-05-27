
import React, { useState } from 'react';
import { UserSession, Question } from '../types';
import { Trophy, Target, Clock, TrendingUp, Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScoreDisplayProps {
  session: UserSession;
  availableQuestions: Question[];
  onRestart: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ session, availableQuestions, onRestart }) => {
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  
  const totalQuestions = session.answers.length;
  const correctAnswers = session.answers.filter(answer => answer.isCorrect).length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = session.endTime && session.startTime 
    ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 1000)
    : 0;

  const getEligibilityStatus = () => {
    if (percentage >= 80) return { 
      status: "Highly Eligible", 
      message: "Congratulations! You've demonstrated exceptional knowledge and are highly qualified for this role.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle
    };
    if (percentage >= 65) return { 
      status: "Eligible", 
      message: "Well done! You've shown good understanding and meet the requirements for this role.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: CheckCircle
    };
    if (percentage >= 45) return { 
      status: "Partially Eligible", 
      message: "You have potential but may need additional preparation. Consider reviewing the topics and trying again.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: AlertCircle
    };
    return { 
      status: "Not Eligible", 
      message: "More preparation is needed. We recommend studying the core concepts and retaking the assessment.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: XCircle
    };
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding Performance! 🎉", color: "text-green-600" };
    if (percentage >= 75) return { message: "Great Job! 👏", color: "text-blue-600" };
    if (percentage >= 60) return { message: "Good Effort! 👍", color: "text-yellow-600" };
    return { message: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const eligibility = getEligibilityStatus();
  const performance = getPerformanceMessage();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getQuestionById = (questionId: number): Question | undefined => {
    return availableQuestions.find(q => q.id === questionId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
        <p className={`text-xl font-semibold ${performance.color} mb-4`}>{performance.message}</p>
        <p className="text-gray-600">You have successfully completed all {totalQuestions} questions</p>
      </div>

      {/* Eligibility Status */}
      <div className={`${eligibility.bgColor} ${eligibility.borderColor} border-2 rounded-xl p-6 mb-8`}>
        <div className="flex items-center justify-center mb-4">
          <eligibility.icon className={`w-8 h-8 ${eligibility.color} mr-3`} />
          <h3 className={`text-2xl font-bold ${eligibility.color}`}>
            {eligibility.status}
          </h3>
        </div>
        <p className={`text-center ${eligibility.color} font-medium`}>
          {eligibility.message}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-600">{session.totalScore}</h3>
          <p className="text-gray-600">Total Score</p>
          <p className="text-xs text-gray-500 mt-1">out of {availableQuestions.length * 10} possible</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-600">{percentage}%</h3>
          <p className="text-gray-600">Accuracy</p>
          <p className="text-xs text-gray-500 mt-1">Pass threshold: 65%</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600">{correctAnswers}/{totalQuestions}</h3>
          <p className="text-gray-600">Correct</p>
          <p className="text-xs text-gray-500 mt-1">Questions answered correctly</p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-orange-600">{formatTime(totalTime)}</h3>
          <p className="text-gray-600">Time Taken</p>
          <p className="text-xs text-gray-500 mt-1">Average: {formatTime(Math.round(totalTime / totalQuestions))} per question</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
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
            <span className="ml-2">{totalQuestions} / 20</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Status:</span>
            <span className={`ml-2 font-semibold ${eligibility.color}`}>{eligibility.status}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Complete Answer Review:</h3>
          <Button
            onClick={() => setShowDetailedReview(!showDetailedReview)}
            variant="outline"
            className="flex items-center gap-2"
          >
            {showDetailedReview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetailedReview ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        <div className="space-y-4">
          {session.answers.map((answer, index) => {
            const question = getQuestionById(answer.questionId);
            return (
              <div key={answer.questionId} className={`p-4 rounded-lg border-l-4 ${
                answer.isCorrect 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">Question {index + 1} of 20</span>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-semibold ${
                      answer.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-sm text-gray-600">+{answer.points} pts</span>
                  </div>
                </div>
                
                {showDetailedReview && question && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Question:</p>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                        {question.question}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                        {answer.userAnswer}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</p>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                        {question.correctAnswer}
                      </p>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Domain: {question.domain}</span>
                      <span>Level: {question.level}</span>
                      <span>Time: {formatTime(answer.timeSpent)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Take New Assessment
        </Button>
        {percentage < 65 && (
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold"
          >
            Retake Assessment
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
