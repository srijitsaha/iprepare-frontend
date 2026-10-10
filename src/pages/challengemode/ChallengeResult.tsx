import React, { useEffect, useState } from 'react';
import { CheckCircle2, User, Award, CheckSquare, Swords, ArrowLeft } from "lucide-react";
import { NavLink, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { viewChallengeResultAPI } from '@/API/challenge.API';

export const ChallengeResultView: React.FC = () => {
  const [challengeResult, setChallengeResult] = useState<any>(null)
  const params = useParams()

  const handleChallengeResult = async () => {
    try {
      const data = await viewChallengeResultAPI({ challengeId: params.challengeId })
      // User 1
      let user1TotalTimeInSeconds = Math.round(data.user1Result.totalTime / 1000)
      let user1TotalTimeSeconds = user1TotalTimeInSeconds % 60 < 10 ? `0${user1TotalTimeInSeconds % 60}` : user1TotalTimeInSeconds % 60
      let user1TotalTime = `${Math.floor(data.user1Result.totalTime / 1000 / 60)}:${user1TotalTimeSeconds}`

      data.user1Result.totalTimeSpent = user1TotalTime

      // User 2
      let user2TotalTimeInSeconds = Math.round(data.user2Result.totalTime / 1000)
      let user2TotalTimeSeconds = user2TotalTimeInSeconds % 60 < 10 ? `0${user2TotalTimeInSeconds % 60}` : user2TotalTimeInSeconds % 60
      let user2TotalTime = `${Math.floor(data.user2Result.totalTime / 1000 / 60)}:${user2TotalTimeSeconds}`
      
      data.user2Result.totalTimeSpent = user2TotalTime
      

      setChallengeResult(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleChallengeResult()
  }, [params])


  const user1 = challengeResult?.user1Result
  const user2 = challengeResult?.user2Result
  const leftUser = user1?.areYou ? user1 : user2
  const rightUser = leftUser === user1 ? user2 : user1


  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md selection:bg-surface-container-highest selection:text-primary">
      <main className="flex-1 w-full max-w-container-max mx-auto px-4 md:px-6 py-6 md:py-8">
        <div>


          {/* Victory Header */}
          

          <div className="text-center mb-6 relative">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-surface-container-high border border-outline-variant/60 shadow-sm">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-code text-code tracking-wider text-primary font-medium text-xs">
                RANKED MATCH COMPLETED
              </span>
            </div>


            {leftUser?.isWinner && challengeResult?.challengeInfo.winner != "Tied" && <img src='/assets/trophy-transparent.png' className='w-28 mx-auto my-4 shake-trophy' alt='Winner Trophy' />}

            {/* Main Title */}
            <h1 className="font-headline-lg text-4xl text-primary tracking-tight font-extrabold uppercase mb-2 flex items-center justify-center gap-3">
              <span className={`${leftUser?.isWinner == false && challengeResult?.challengeInfo.winner != "Tied" ? "text-red-600": "text-on-surface-variant/40"}  font-light select-none`}>—</span>

              {leftUser?.isWinner && challengeResult?.challengeInfo.winner != "Tied" && <span> VICTORY </span>}
              {leftUser?.isWinner == false && challengeResult?.challengeInfo.winner != "Tied" && <span className='text-red-700'> You Lose </span>}
              {challengeResult?.challengeInfo.winner == "Tied" && <span> Tied </span>}

              <span className={`${leftUser?.isWinner == false && challengeResult?.challengeInfo.winner != "Tied" ? "text-red-600": "text-on-surface-variant/40"}  font-light select-none`}>—</span>
            </h1>

            {/* Subtitle description */}
            <p className="font-body-md text-body-md text-on-surface font-medium mb-1">
              {challengeResult?.challengeInfo.board} • {challengeResult?.challengeInfo.subject} - {challengeResult?.challengeInfo.topic} ({challengeResult?.challengeInfo.totalQuestions} Qs / 10 Min)
            </p>

            {/* Motivational motto */}
            <p className="font-body-sm text-body-sm text-on-surface-variant italic">
              "Discipline equals freedom. Mastered under pressure."
            </p>
          </div>





          <div className="bg-surface-container-low rounded-lg border border-outline-variant p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-stretch">
              {/* Left Column: Current user should always stay on the left side of the VS divider */}
              <div className="md:col-span-5 bg-surface-container rounded-lg border border-primary/40 p-5 relative overflow-hidden flex flex-col justify-between">
                {leftUser?.isWinner && <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-primary text-black text-[10px] font-bold py-0.5 -right-9 top-3.5 w-30 text-center tracking-widest uppercase shadow-sm">
                    WINNER
                  </div>
                </div>}

                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        alt={`${leftUser?.firstName} ${leftUser?.lastName} portrait`}
                        className="w-14 h-14 rounded-full border-2 border-primary object-cover"
                        src={leftUser?.areYou ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCV1a18lkNIkZlFzAGyAYASuDVUzUYtaCF94RD582sk2fikxtvJUopMIFL0cU0vy6w7fp2SoicjbNMxx9ZxaUPy3Xkd0rA_jF0Lrf3yDTqTRU3Nk11DP0wCnzfGdh1M0kZSE15kQLHsy-CHa983KLj3bI23p-PmLzbMu2RVX5J2Sm9cmtvcWdoLr6dYPBU77JgBrrfwYAhNVz6jTsieAplHgRavQTPEd1CFhnXjHNl-8GT0Yz9x3B5D" : "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOZX8v8qB9Hwox5Om9jVoQShfJBk1N5GQQkxM5FpCo5gAx4TffjYak77smNd1bTJA9x4bbOs_Vr9Lqno0upZnUM1HQYgNghu93ibBBpzRdFGlixcMFP22hbzErrJXm2gCR6j5b2_wt-ELNVxOD3iQIK9WLa1bzW9z3m09jmg3qynFegKXtKnAnkAvIYEdSKc2GEnYrze-238UshqND1yB9DNSRyvOdXIG6ZBE-qf9T8xYQahxAt_N"}
                      />
                      <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest border border-outline-variant p-0.5 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-h3 text-h3 text-primary font-semibold text-lg md:text-xl">
                          {leftUser?.firstName} {leftUser?.lastName}
                        </h3>
                        {leftUser?.areYou === true && <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary border border-outline-variant font-medium">
                          YOU
                        </span>}
                        {leftUser?.areYou === false && <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary border border-outline-variant font-medium">
                          OPPONENT
                        </span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded bg-surface-container-low border border-outline-variant/60 mb-4">
                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        Score
                      </span>
                      <span className="font-h3 text-h3 text-primary font-bold text-xl md:text-2xl">
                        {leftUser?.score}<span className="text-body-sm text-on-surface-variant font-normal">/{leftUser?.totalQuestions}</span>
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        {Math.round((leftUser?.score ?? 0) / (leftUser?.totalQuestions || 1) * 100)}% Acc
                      </span>
                    </div>

                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        Time
                      </span>
                      <span className="font-h3 text-h3 text-primary font-bold text-xl md:text-2xl">
                        {leftUser?.totalTimeSpent}
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        Pace: {Math.round((leftUser?.totalTime ?? 0) / 1000 / (leftUser?.questionsAttended || 1))}s/Q
                      </span>
                    </div>

                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        XP Gain
                      </span>
                      <span className="font-h3 text-h3 text-primary font-bold text-xl md:text-2xl">
                        +{leftUser?.isWinner ? Math.round((leftUser?.score / leftUser?.totalQuestions * 200)) + (leftUser?.totalQuestions * 10):  Math.round((leftUser?.score / leftUser?.totalQuestions * 100))}
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        {leftUser?.isWinner ? `+Bonus ${leftUser?.bonusPoints}`:  `Standard`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-code text-code border-t border-outline-variant/40 pt-3 text-xs">
                  <span>
                    Accuracy: <strong className="text-primary font-bold">{leftUser?.score} Correct</strong>
                  </span>
                  {leftUser?.host && <span> <strong className="text-black font-bold bg-primary p-2 rounded-md"> Host </strong> </span>}
                </div>
              </div>

              <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-center py-2 md:py-0 relative">
                <div className="w-full md:w-px h-px md:h-full bg-outline-variant absolute" />
                <div className="relative z-10 bg-surface-container-low px-2 py-1 rounded-full border border-outline-variant font-code text-[12px] font-bold text-on-surface tracking-widest uppercase shadow-sm">
                  VS
                </div>
              </div>

              <div className="md:col-span-5 bg-surface-container rounded-lg border relative overflow-hidden border-outline-variant p-5 flex flex-col justify-between">
                {rightUser?.isWinner && <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-primary text-black text-[10px] font-bold py-0.5 -right-9 top-3.5 w-30 text-center tracking-widest uppercase shadow-sm">
                    WINNER
                  </div>
                </div>}

                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        alt={`${rightUser?.firstName} ${rightUser?.lastName} portrait`}
                        className="w-14 h-14 rounded-full border border-outline-variant object-cover grayscale opacity-90"
                        src={rightUser?.areYou ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCV1a18lkNIkZlFzAGyAYASuDVUzUYtaCF94RD582sk2fikxtvJUopMIFL0cU0vy6w7fp2SoicjbNMxx9ZxaUPy3Xkd0rA_jF0Lrf3yDTqTRU3Nk11DP0wCnzfGdh1M0kZSE15kQLHsy-CHa983KLj3bI23p-PmLzbMu2RVX5J2Sm9cmtvcWdoLr6dYPBU77JgBrrfwYAhNVz6jTsieAplHgRavQTPEd1CFhnXjHNl-8GT0Yz9x3B5D" : "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOZX8v8qB9Hwox5Om9jVoQShfJBk1N5GQQkxM5FpCo5gAx4TffjYak77smNd1bTJA9x4bbOs_Vr9Lqno0upZnUM1HQYgNghu93ibBBpzRdFGlixcMFP22hbzErrJXm2gCR6j5b2_wt-ELNVxOD3iQIK9WLa1bzW9z3m09jmg3qynFegKXtKnAnkAvIYEdSKc2GEnYrze-238UshqND1yB9DNSRyvOdXIG6ZBE-qf9T8xYQahxAt_N"}
                      />
                      <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest border border-outline-variant p-0.5 rounded-full flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-outline" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-h3 text-h3 text-on-surface font-semibold text-lg md:text-xl">
                          {rightUser?.firstName} {rightUser?.lastName}
                        </h3>
                        {rightUser?.areYou === true && <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary border border-outline-variant font-medium">
                          YOU
                        </span>}
                        {rightUser?.areYou === false && <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary border border-outline-variant font-medium">
                          OPPONENT
                        </span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded bg-surface-container-low border border-outline-variant/60 mb-4">
                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        Score
                      </span>
                      <span className="font-h3 text-h3 text-on-surface font-bold text-xl md:text-2xl">
                        {rightUser?.score}<span className="text-body-sm text-on-surface-variant font-normal">/{rightUser?.totalQuestions}</span>
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        {Math.round((rightUser?.score ?? 0) / (rightUser?.totalQuestions || 1) * 100)}% Acc
                      </span>
                    </div>

                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        Time
                      </span>
                      <span className="font-h3 text-h3 text-on-surface font-bold text-xl md:text-2xl">
                        {rightUser?.totalTimeSpent}
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        Pace: {Math.round((rightUser?.totalTime ?? 0) / 1000 / (rightUser?.questionsAttended || 1))}s/Q
                      </span>
                    </div>

                    <div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        XP Gain
                      </span>
                      <span className="font-h3 text-h3 text-on-surface font-bold text-xl md:text-2xl">
                        +{rightUser?.isWinner ? Math.round((rightUser?.score / rightUser?.totalQuestions * 200)) + (rightUser?.totalQuestions * 10):  Math.round((rightUser?.score / rightUser?.totalQuestions * 100))}
                      </span>
                      <span className="block font-code text-[11px] text-on-surface-variant">
                        {rightUser?.isWinner ? `+Bonus ${rightUser?.bonusPoints}`:  `Standard`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-code text-code border-t border-outline-variant/40 pt-3 text-xs">
                  <span>
                    Accuracy: <strong className="text-primary font-bold">{rightUser?.score} Correct</strong>
                  </span>
                  {rightUser?.host && <span> <strong className="text-black font-bold bg-primary p-2 rounded-md"> Host </strong> </span>}
                </div>
              </div>
            </div>
          </div>



          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <Button variant="outline" className="text-on-surface-variant hover:text-primary" asChild>
              <NavLink to={'/'}> <ArrowLeft className="w-4 h-4" /> Back to Home </NavLink>
            </Button>

            <Button variant="secondary" className="text-on-surface-variant hover:text-primary" asChild>
              <NavLink to={`/exams/reviewQuestions/${leftUser?.examId ? leftUser.examId : rightUser?.examId}`}>  <CheckSquare className="w-4 h-4 text-primary" /> Review Questions </NavLink>
            </Button>

            <Button variant="default" asChild>
              <NavLink to="/challenge-mode">  <Swords className="w-4 h-4" /> Challenge Again </NavLink>
            </Button>
          </div>


        </div>
      </main>
    </div>
  );
};