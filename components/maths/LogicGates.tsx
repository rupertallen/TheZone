
import React, { useState, useMemo } from 'react';
import { LOGIC_PROBLEMS, LogicProblem } from '../../data/logicProblems';

interface LogicGatesProps {
  onBack: () => void;
}

export const LogicGates: React.FC<LogicGatesProps> = ({ onBack }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [activeProblem, setActiveProblem] = useState<LogicProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'none', message: string }>({ type: 'none', message: '' });
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  const filteredProblems = useMemo(() => {
    if (selectedDifficulty === 'All') return LOGIC_PROBLEMS;
    return LOGIC_PROBLEMS.filter(p => p.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeProblem || feedback.type === 'correct') return;

    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = activeProblem.answer.toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback({ type: 'correct', message: 'Brilliant! That is correct.' });
      setSolvedIds(prev => new Set(prev).add(activeProblem.id));
    } else {
      setFeedback({ type: 'incorrect', message: 'Not quite. Try again!' });
      setTimeout(() => setFeedback({ type: 'none', message: '' }), 2000);
    }
  };

  const handleSelectProblem = (p: LogicProblem) => {
    setActiveProblem(p);
    setUserAnswer('');
    setFeedback({ type: 'none', message: '' });
    setShowHint(false);
  };

  const difficultyColors = {
    Easy: 'text-emerald-500 bg-emerald-500/10',
    Medium: 'text-amber-500 bg-amber-500/10',
    Hard: 'text-rose-500 bg-rose-500/10'
  };

  if (activeProblem) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-10 font-sans text-slate-800 animate-in fade-in duration-300 overflow-y-auto">
        <div className="max-w-3xl w-full flex flex-col items-center space-y-8 pb-10">
          <header className="w-full flex justify-between items-center shrink-0">
            <button 
              onClick={() => setActiveProblem(null)} 
              className="text-purple-600 font-bold flex items-center gap-2 hover:underline p-2 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Library
            </button>
            <div className={`px-4 py-1 rounded-full font-black uppercase text-[10px] tracking-widest ${difficultyColors[activeProblem.difficulty]}`}>
              {activeProblem.difficulty}
            </div>
          </header>

          <main className="w-full bg-white rounded-[40px] shadow-2xl border border-slate-200 p-8 sm:p-12 space-y-10">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{activeProblem.title}</h1>
              <div className="h-1.5 w-20 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-inner">
               <p className="text-xl sm:text-2xl text-slate-700 font-medium leading-relaxed italic">
                 "{activeProblem.question}"
               </p>
            </div>

            {feedback.type === 'correct' ? (
              <div className="space-y-6 animate-in zoom-in duration-500">
                <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900 uppercase italic">Solved!</h3>
                  <p className="text-emerald-700 leading-relaxed font-medium">
                    {activeProblem.explanation}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveProblem(null)}
                  className="w-full py-5 bg-purple-600 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-purple-700 transition-all uppercase italic tracking-tight"
                >
                  Next Puzzle
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckAnswer} className="space-y-6">
                <div className="relative group">
                  <input
                    autoFocus
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className={`w-full p-6 text-2xl font-black text-center border-4 rounded-2xl outline-none transition-all shadow-inner
                      ${feedback.type === 'incorrect' ? 'border-rose-500 bg-rose-50 animate-shake' : 'border-slate-200 bg-slate-50 focus:border-purple-500 focus:bg-white'}
                    `}
                  />
                  {feedback.type === 'incorrect' && (
                    <p className="absolute -bottom-8 left-0 right-0 text-center text-rose-500 font-bold animate-in fade-in slide-in-from-top-2">
                      {feedback.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit"
                    className="flex-grow py-5 bg-purple-600 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-purple-700 transition-all uppercase italic tracking-tight active:scale-95"
                  >
                    Check Answer
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="sm:w-24 py-5 bg-white border-2 border-slate-200 text-slate-400 font-black text-xl rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center shadow-lg group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform ${showHint ? 'scale-110 text-amber-500' : 'group-hover:scale-110'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </button>
                </div>

                {showHint && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl animate-in slide-in-from-top-4 duration-300">
                    <p className="text-amber-800 italic font-medium">
                      <span className="font-black uppercase text-xs tracking-widest mr-2">Hint:</span>
                      {activeProblem.hint}
                    </p>
                  </div>
                )}
              </form>
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 sm:p-10 font-sans text-slate-800 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        <header className="flex flex-col items-center relative">
          <button 
            onClick={onBack} 
            className="absolute left-0 top-0 text-purple-600 font-bold flex items-center gap-2 hover:underline p-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Maths Menu
          </button>
          
          <div className="bg-purple-100 text-purple-600 p-6 rounded-[2.5rem] mb-6 shadow-inner animate-in zoom-in duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter uppercase italic text-center">
            Logic Gates
          </h1>
          <p className="text-xl text-slate-500 mt-2 font-medium">The Puzzle Library</p>
        </header>

        <section className="flex flex-wrap justify-center gap-4">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all border-2
                ${selectedDifficulty === d 
                  ? 'bg-purple-600 text-white border-purple-700 shadow-xl scale-105' 
                  : 'bg-white text-slate-400 border-slate-200 hover:border-purple-300'
                }
              `}
            >
              {d}
            </button>
          ))}
        </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredProblems.map(problem => {
            const isSolved = solvedIds.has(problem.id);
            return (
              <button
                key={problem.id}
                onClick={() => handleSelectProblem(problem)}
                className={`group bg-white rounded-[32px] p-8 shadow-xl border-2 transition-all duration-300 flex flex-col h-full text-left relative overflow-hidden
                  ${isSolved ? 'border-emerald-500 shadow-emerald-500/10' : 'border-transparent hover:border-purple-400'}
                `}
              >
                {isSolved && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className={`px-3 py-1 rounded-full font-black uppercase text-[10px] tracking-widest w-fit mb-6 ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight tracking-tight group-hover:text-purple-600 transition-colors">
                  {problem.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">
                  {problem.question}
                </p>
                
                <div className={`w-full py-4 text-center font-black uppercase tracking-widest text-xs rounded-2xl border-2 transition-all
                  ${isSolved 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                    : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-700'
                  }
                `}>
                  {isSolved ? 'Review Puzzle' : 'Solve Puzzle'}
                </div>
              </button>
            );
          })}
        </main>
      </div>
    </div>
  );
};
