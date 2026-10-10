import type React from "react"


export const SubmittedExam: React.FC = (props: any) => {
  console.log(props)

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl"> Exam Completed </h1>
      <p >
        <h4> {props.board} </h4>
        <h4> {props.subject} </h4>
        <h4> {props.topic} </h4>
      </p>
      
    </div>
  )
}