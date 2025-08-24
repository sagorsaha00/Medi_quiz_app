import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen, Target, Lightbulb } from 'lucide-react';

// Types
interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: string;
  explanation?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

interface QuestionState {
  selectedAnswer: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  showExplanation: boolean;
}

// Mock data - আপনার API থেকে আসবে
const mockQuestion: Question = {
  id: '1',
  question: 'What is the chemical formula for water?',
  options: ['H2O', 'CO2', 'NaCl', 'O2'],
  answer: 'H2O',
  category: 'Chemistry',
  explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, hence the formula H2O. This is one of the most fundamental compounds in chemistry.',
  difficulty: 'Easy'
};

const PracticeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(mockQuestion);
  const [questionState, setQuestionState] = useState<QuestionState>({
    selectedAnswer: null,
    isAnswered: false,
    isCorrect: null,
    showExplanation: false
  });
  const [stats, setStats] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle answer selection
  const handleAnswerSelect = (selectedOption: string) => {
    if (questionState.isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    
    setQuestionState({
      selectedAnswer: selectedOption,
      isAnswered: true,
      isCorrect,
      showExplanation: true
    });

    // Update stats
    setStats(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    // Show explanation after 500ms delay for better UX
    setTimeout(() => {
      setQuestionState(prev => ({ ...prev, showExplanation: true }));
    }, 500);
  };

  // Get next question
  const handleNextQuestion = async () => {
    setIsLoading(true);
    
    // Reset state
    setQuestionState({
      selectedAnswer: null,
      isAnswered: false,
      isCorrect: null,
      showExplanation: false
    });

    // Simulate API call - Replace with your actual API
    setTimeout(() => {
      // Here you would fetch a new question from your API
      // For now, we'll use the same question but with different ID
      setCurrentQuestion({
        ...mockQuestion,
        id: Math.random().toString(),
        question: 'What is the atomic number of Carbon?',
        options: ['6', '12', '14', '8'],
        answer: '6',
        explanation: 'Carbon has 6 protons in its nucleus, which defines its atomic number. This is a fundamental property that determines the element\'s place in the periodic table.',
        difficulty: 'Medium'
      });
      setIsLoading(false);
    }, 1000);
  };

  // Reset practice session
  const handleReset = () => {
    setStats({ correct: 0, total: 0, streak: 0 });
    setQuestionState({
      selectedAnswer: null,
      isAnswered: false,
      isCorrect: null,
      showExplanation: false
    });
  };

  // Get option styling based on state
  const getOptionStyle = (option: string) => {
    const baseStyle = "w-full p-4 text-left border-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02]";
    
    if (!questionState.isAnswered) {
      return `${baseStyle} border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white shadow-sm`;
    }

    if (option === currentQuestion.answer) {
      return `${baseStyle} border-green-400 bg-green-50 text-green-800 shadow-lg`;
    }

    if (option === questionState.selectedAnswer && !questionState.isCorrect) {
      return `${baseStyle} border-red-400 bg-red-50 text-red-800 shadow-lg`;
    }

    return `${baseStyle} border-gray-200 bg-gray-50 text-gray-500 opacity-60`;
  };

  // Get difficulty color
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Practice Quiz</h1>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-green-600">{stats.streak}</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-purple-600">{stats.total}</p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          
          {/* Category and Difficulty */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">{currentQuestion.category}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium  `}>
                {currentQuestion.difficulty || 'Easy'}
              </div>
            </div>
            
            <h2 className="text-xl font-bold leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="p-8">
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={questionState.isAnswered}
                  className={getOptionStyle(option)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </div>
                    
                    {questionState.isAnswered && option === currentQuestion.answer && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    
                    {questionState.isAnswered && 
                     option === questionState.selectedAnswer && 
                     !questionState.isCorrect && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result and Explanation */}
        {questionState.isAnswered && (
          <div className={`rounded-2xl shadow-xl p-6 mb-6 transform transition-all duration-500 ${
            questionState.isCorrect 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
          }`}>
            
            <div className="flex items-center gap-3 mb-4">
              {questionState.isCorrect ? (
                <>
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Correct! 🎉</h3>
                    <p className="opacity-90">Great job! You got it right.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Not quite right 💪</h3>
                    <p className="opacity-90">The correct answer is: <strong>{currentQuestion.answer}</strong></p>
                  </div>
                </>
              )}
            </div>

            {/* Explanation */}
            {currentQuestion.explanation && questionState.showExplanation && (
              <div className="bg-white/20 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-sm leading-relaxed opacity-95">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {questionState.isAnswered && (
            <button
              onClick={handleNextQuestion}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transform transition-all hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
              Next Question
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center gap-2 transform transition-all hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Practice makes perfect! Keep going to improve your skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuiz;