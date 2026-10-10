import React, { useState } from 'react';
import { Trophy, Lightbulb, History, LayoutDashboard, Sparkles, SquareKanban } from 'lucide-react';
import { ConfettiCanvas } from '@/pages/exams/ConfettiCanvas';
import { Link } from 'react-router-dom';

export const QuizResultView: React.FC<any> = ({
  data
}) => {
  const [showConfetti, setShowConfetti] = useState((Math.round((data?.score / data?.totalQuestions) * 100) >= 80));

  return (
    <div className="w-full max-w-4xl bg-[#201f22] border border-[#444748]/30 rounded-xl shadow-2xl my-4 overflow-hidden mx-auto transition-all">
      <main className="flex flex-col gap-4 p-4 lg:p-6">
        
        {/* Hero Section (Condensed) */}
        {showConfetti && ''}
        <section className="relative overflow-hidden rounded-lg bg-[#2a2a2c] border border-[#444748]/30 flex flex-col items-center justify-center p-6 text-center lg:p-8">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FFBF00]/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center">
            {/* Trophy Icon */}
            <div 
              onClick={() => setShowConfetti((Math.round((data?.score / data?.totalQuestions) * 100) >= 50))}
              title="Click to replay confetti"
              className="mb-3 inline-flex p-3 rounded-full bg-[#FFBF00]/10 border border-[#FFBF00]/20 animate-float cursor-pointer hover:scale-110 transition-transform"
            >
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 80) && <Trophy className="size-8 text-[#FFBF00] fill-[#FFBF00]/30" />}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 50 && Math.round((data?.score / data?.totalQuestions) * 100) < 80) && <SquareKanban className="size-8 text-[#FFBF00] fill-[#FFBF00]/30" />}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 30 && Math.round((data?.score / data?.totalQuestions) * 100) < 50) && <SquareKanban className="size-8 text-on-surface-variant fill-[#FFBF00]/30" />}
              { (Math.round((data?.score / data?.totalQuestions) * 100) < 30) && <SquareKanban className="size-8 text-on-surface-variant fill-[#FFBF00]/30" />}
            </div>

            <h1 className={`${(Math.round((data?.score / data?.totalQuestions) * 100) > 30)? "text-[#FFBF00]": "text-red-400"}  text-3xl lg:text-5xl font-black tracking-tight mb-1`}>
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 80) && "Congratulations!!!"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 50 && Math.round((data?.score / data?.totalQuestions) * 100) < 80) && "Results are in"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 30 && Math.round((data?.score / data?.totalQuestions) * 100) < 50) && "Needs Improvements"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) < 30) && "Attempt Failed!"}
            </h1>
            <p className={`${(Math.round((data?.score / data?.totalQuestions) * 100) >= 80)? "text-[#FFBF00]": "text-white"} text-sm lg:text-base font-semibold uppercase tracking-widest`}>
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 80) && "Outstading Performance"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 50 && Math.round((data?.score / data?.totalQuestions) * 100) < 80) && "Good Effort, Keep Pushing"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) >= 30 && Math.round((data?.score / data?.totalQuestions) * 100) < 50) && "Review The Fundamentals"}
              { (Math.round((data?.score / data?.totalQuestions) * 100) < 30) && "Needs Improvements"}
            </p>

            <div className="mt-4 flex flex-col items-center">
              <span className="text-[#c4c7c8] text-[10px] font-medium mb-1 uppercase tracking-tighter">
                Your Score
              </span>
              <div className="text-white text-5xl lg:text-6xl font-black leading-none flex items-baseline">
                {data?.score}
                <span className="text-[#c4c7c8] text-2xl lg:text-3xl font-medium">
                  /{data?.totalQuestions}
                </span>
              </div>
            </div>
          </div>

          {/* Particle Confetti Canvas */}
          <ConfettiCanvas active={Math.round((data?.score / data?.totalQuestions) * 100) >= 50} />
        </section>


        {/* Stats Grid (Tighter) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#1c1b1d] border border-[#444748]/20 rounded-lg p-3 flex flex-col gap-0.5 hover:border-[#FFBF00]/30 transition-colors">
            <span className="text-[#c4c7c8] text-[9px] font-bold uppercase tracking-wider">
              Accuracy
            </span>
            <span className="text-white text-lg font-bold">{ Math.round((data?.score / data?.totalQuestions) * 100) }%</span>
          </div>

          <div className="bg-[#1c1b1d] border border-[#444748]/20 rounded-lg p-3 flex flex-col gap-0.5 hover:border-[#FFBF00]/30 transition-colors">
            <span className="text-[#c4c7c8] text-[9px] font-bold uppercase tracking-wider">
              Exam Board
            </span>
            <span className="text-white text-lg font-bold">{data?.board}</span>
          </div>

          <div className="bg-[#1c1b1d] border border-[#444748]/20 rounded-lg p-3 flex flex-col gap-0.5 hover:border-[#FFBF00]/30 transition-colors">
            <span className="text-[#c4c7c8] text-[9px] font-bold uppercase tracking-wider">
              Subject
            </span>
            <span className="text-white text-lg font-bold">{data?.subject}</span>
          </div>

          <div className="bg-[#1c1b1d] border border-[#444748]/20 rounded-lg p-3 flex flex-col gap-0.5 hover:border-[#FFBF00]/30 transition-colors">
            <span className="text-[#c4c7c8] text-[9px] font-bold uppercase tracking-wider">
              Time Taken
            </span>
            <span className="text-white text-lg font-bold">
              {Number.parseInt((data?.timeTaken / 60).toFixed(9))}:{(data?.timeTaken % 60) < 10 ? `0${Math.round(data?.timeTaken % 60)}` : Math.round(data?.timeTaken % 60)}{' '}
              <span className="text-[10px] font-normal text-[#c4c7c8]">min</span>
            </span>
          </div>
        </section>

        {/* Breakdown Section (Compact) */}
        <section className="grid lg:grid-cols-3 gap-4">
          
          {/* Accuracy Breakdown & Performance Summary */}
          <div className="lg:col-span-2 bg-[#1c1b1d] rounded-lg p-4 border border-[#444748]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm font-bold">Performance Summary</h3>
                <span className="text-[#c4c7c8] text-[10px] font-medium">
                  Topic: {data?.topic}
                </span>
              </div>

              <div className="space-y-3">
                {/* Concept Mastery Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#e5e1e4]">Concept Mastery</span>
                    <span className="text-[#FFBF00] font-bold">{data?.conceptMastery}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#353437] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFBF00] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${data?.conceptMastery}%` }}
                    />
                  </div>
                </div>

                {/* Speed Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#e5e1e4]">Speed</span>
                    <span className="text-white font-bold">{data?.speedRating}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#353437] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full opacity-80 transition-all duration-1000 ease-out"
                      style={{ width: `${data?.speedRating}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Study Insight Card */}
            <div className="mt-4 p-3 rounded-lg bg-[#2a2a2c]/50 border border-[#444748]/20 flex items-start gap-2.5">
              <div className="p-1.5 rounded-full bg-[#636565]/20 shrink-0 text-[#FFBF00]">
                <Lightbulb className="size-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-[10px] font-bold mb-0.5 flex items-center gap-1">
                    Study Insight
                  </h4>
                  <button className="text-[9px] text-[#FFBF00] hover:underline font-bold flex items-center gap-1 bg-[#FFBF00]/10 px-1.5 py-0.5 rounded"
                  >
                    <Sparkles className="size-2.5" /> Ask AI
                  </button>
                </div>
                <p className="text-[#c4c7c8] text-[10px] leading-snug">
                  {data?.studyInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col gap-3">
            {/* Rank / Percentile Donut */}
            <div className="bg-[#1c1b1d] p-4 border border-[#444748]/10 text-center flex flex-col items-center rounded-lg">
              <div className="relative size-20 mb-2">
                <svg className="size-full" viewBox="0 0 100 100">
                  <circle
                    className="text-[#353437] stroke-current"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-[#FFBF00] stroke-current transition-all duration-1000"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * data?.accuracy) / 100}
                    strokeLinecap="round"
                    strokeWidth="8"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-white text-lg font-black leading-none">
                    {data?.accuracy}%
                  </span>
                  <span className="text-[#c4c7c8] text-[8px] uppercase font-bold mt-0.5">
                    Rank {data?.rank}
                  </span>
                </div>
              </div>
              <p className="text-[#e5e1e4] text-[10px] font-medium">
                Top {data?.topPercentile}% this week
              </p>
            </div>

            {/* Review Incorrect Button */}
            <button
              className="w-full bg-error-container hover:bg-error-container/80 text-on-error-container py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-bold text-[11px] shadow-lg shadow-red-950/20 active:scale-[0.99]"
            >
              <History className="size-4" />
              <Link to={`/exams/reviewQuestions/${data?.examId}`}> Review Answered Questions </Link>  
            </button>
          </div>
        </section>

        {/* Bottom Actions (Condensed) */}
        <footer className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#444748]/20">
          <Link to="/dashboard"
            className="w-full sm:w-auto min-w-40 bg-white text-[#2f3131] hover:bg-opacity-90 py-3 px-6 rounded-lg font-black tracking-tight text-xs flex items-center justify-center gap-2 shadow-lg shadow-white/10 active:scale-[0.99] transition-all cursor-pointer"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </footer>

        {/* Suggestion Mini Grid (Next Steps) */}
        {/* <div className="flex flex-col gap-3 mt-2">
          <h3 className="text-[#c4c7c8] text-[9px] font-bold uppercase tracking-[0.2em] px-1">
            Next Steps
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {nextSteps?.map((step:any) => (
              <div
                key={step.id}
                onClick={() => onOpenNextStep(step)}
                className="group cursor-pointer bg-[#0e0e10] border border-[#444748]/20 rounded-lg p-3 flex gap-3 items-center transition-all hover:bg-[#1c1b1d] hover:border-[#FFBF00]/40"
              >
                <div
                  className="size-10 rounded-md bg-cover bg-center shrink-0 border border-[#444748]/30"
                  style={{ backgroundImage: `url('${step.imageUrl}')` }}
                />
                <div className="overflow-hidden">
                  <h4 className="text-white font-bold text-[11px] truncate group-hover:text-[#FFBF00] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[#c4c7c8] text-[9px] truncate">
                    {step.subtitle}
                  </p>
                </div>
                {step.type === 'video' ? (
                  <PlayCircle className="ml-auto size-5 text-[#c4c7c8] group-hover:text-[#FFBF00] shrink-0 opacity-70 transition-colors" />
                ) : (
                  <ChevronRight className="ml-auto size-5 text-[#c4c7c8] group-hover:text-[#FFBF00] shrink-0 opacity-70 transition-colors" />
                )}
              </div>
            ))}
          </div>
        </div> */}

      </main>
    </div>
  );
};