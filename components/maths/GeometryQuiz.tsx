
import React, { useState, useMemo } from 'react';
import { GEOMETRY_QUESTIONS, GeometryQuestion } from '../../data/geometryData';

interface GeometryQuizProps {
  onBack: () => void;
}

export const GeometryQuiz: React.FC<GeometryQuizProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = GEOMETRY_QUESTIONS[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < GEOMETRY_QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-12 text-center space-y-8 shadow-2xl">
          <div className="w-24 h-24 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg text-4xl">
            🏆
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Quiz Over!</h2>
          <div className="space-y-2">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Your Final Score</p>
            <div className="text-7xl font-black tracking-tighter text-orange-500">
              {score}<span className="text-slate-700 text-4xl">/{GEOMETRY_QUESTIONS.length}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
             <button
               onClick={() => {
                 setCurrentIndex(0);
                 setScore(0);
                 setSelectedOption(null);
                 setShowExplanation(false);
                 setIsFinished(false);
               }}
               className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase italic tracking-tight"
             >
               Try Again
             </button>
             <button
               onClick={onBack}
               className="w-full py-4 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase italic tracking-tight"
             >
               Back to Menu
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-8 font-sans text-white overflow-y-auto">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={onBack} className="text-orange-500 font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quit Quiz
        </button>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Question</span>
          <span className="text-xl font-black text-white">{currentIndex + 1}/{GEOMETRY_QUESTIONS.length}</span>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Score</span>
          <span className="text-xl font-black text-orange-500">{score}</span>
        </div>
      </header>

      <main className="w-full max-w-3xl space-y-10">
        <div className="space-y-6">
          <div className="bg-white/5 p-8 sm:p-12 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tighter italic">
              "{currentQuestion.question}"
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.answer;
              const bgColor = showExplanation 
                ? isCorrect ? 'bg-emerald-500 border-emerald-600' : isSelected ? 'bg-rose-500 border-rose-600' : 'bg-white/5 border-white/10 opacity-40'
                : isSelected ? 'bg-orange-500 border-orange-600' : 'bg-white/5 border-white/10 hover:bg-white/10';

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption}
                  className={`p-6 rounded-[2rem] border-b-4 text-xl font-bold transition-all transform active:scale-95 ${bgColor}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="animate-in slide-in-from-bottom-6 fade-in duration-500 space-y-6">
            <div className={`p-8 rounded-[2rem] border-2 ${selectedOption === currentQuestion.answer ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
               <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2">{selectedOption === currentQuestion.answer ? 'Correct!' : 'Not quite!'}</h4>
               <p className="text-lg font-medium leading-relaxed italic">"{currentQuestion.explanation}"</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-5 bg-white text-slate-900 font-black text-xl rounded-2xl shadow-xl hover:bg-slate-100 transition-all uppercase italic tracking-tight"
            >
              {currentIndex === GEOMETRY_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
