import React from 'react'

export const ExamRules: React.FC = () => {
  return (
    <ol className="list-decimal px-4 flex flex-col gap-1 text-base">
      <li> You have 10 minutes to answer all questions. </li>
      <li> Do not switch tabs or windows. </li>
      <li> You can answer only one question at a time. </li>
      <li> You cannot skip or jump any questions. </li>
      <li> If you answer incorrect any questions, the correct answer will appear immediately with explanation. </li>
      <li> By clicking the start button, your quiz will start then and the timer will also start, and first question will appear. </li>
    </ol>
  )
}