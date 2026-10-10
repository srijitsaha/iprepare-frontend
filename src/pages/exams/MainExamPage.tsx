import { checkExamCompletedAPI, completeExamAPI, getQuestionsAPI, submitAnswerAPI, viewExamResultAPI } from "@/API/question.API"
import CountdownCircleTimer from "@/components/designs/CountdownCircleTimer"
import { ExamRules } from "@/components/designs/ExamRules"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRightIcon } from "lucide-react"

import { useState, useCallback, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { QuizResultView } from "./QuizResult"

export const MainExamPage = () => {
  const params = useParams()
  const [isExamStarted, setIsExamStarted] = useState<boolean>(false)
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false)
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(true)
  const [question, setQuestion] = useState<any>(null)
  const [userAnswer, setUserAnswer] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showResultContainer, setShowResultContainer] = useState<boolean>(false)
  const [examDetails, setExamDetails] = useState<any>(null)


  const handleGetQuestion = async () => {
    if(!isAnswerLocked) {
      return
    }

    try {
      const data = await getQuestionsAPI({ examId: params.examId })
      console.log(data.question)
      setQuestion({ question: data.question, options: data.options, _id: data._id })
      setIsExamStarted(true)
      setTotalQuestions(data.totalQuestions)
      setCurrentQuestionIndex(data.currentQuestionIndex)
      setIsAnswerLocked(false)
      setScore(data.score)
    } catch (error: any) {
      console.log(error)
    }
  }


  const handleChangeAnswer = async (value: string) => {
    if(isAnswerLocked) {
      return
    }

    const data = await submitAnswerAPI({ questionId: question._id, examId: params.examId, answer: value })
    setUserAnswer(value)
    setQuestion({ ...question, explaination: data.explaination, correct: data.correct, isCorrect: data.isCorrect })
    if(data.isCorrect) {
      setScore(score + 1)
    }
    setIsAnswerLocked(true)
    
    if(data.isCompleted) {
      setIsExamCompleted(true)
      setExamDetails({ board: data.board, subject: data.subject, topic: data.topic })
    }
  }


  const handleExamTimeOver = useCallback(async () => {
    try {
      const data = await completeExamAPI({ examId: params.examId })
      console.log(data, "Time's Up!")
    } catch (error: any) {
      console.log(error.response)
    }
  }, [params.examId])


  const handleViewExamResult = async () => {
    try {
      const data = await checkExamCompletedAPI({ examId: params.examId })
      if(data.isExamAlreadyCompleted) {
        setIsExamCompleted(true)
        const resultData = await viewExamResultAPI({ examId: params.examId })
        setExamDetails({ ...resultData })
        setShowResultContainer(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    handleViewExamResult()
  }, [params])


  const getOptionClassName = (option: string) => {
    if (!userAnswer || !question?.correct) return ""

    if (option === question.correct) {
      return "text-green-500 border-green-500"
    }

    if (option === userAnswer) {
      return "text-red-500 border-red-500"
    }

    return ""
  }


  if(isExamCompleted && showResultContainer) {
    return <QuizResultView data={{ ...examDetails, examId: params.examId }} />
  }

  return (
    <main className='h-screen w-full flex items-center justify-center'>
      <Card className={`${(isExamCompleted && showResultContainer) ? "w-full min-h-screen" : "w-1/2 min-h-2/3"} min-w-sm`}>
        <CardHeader className="">
          <CardTitle className="text-3xl p-4 w-full flex items-center justify-between">
            <div className="flex w-fit flex-col">
              <p> {question ? `Question ${currentQuestionIndex + 1} of ${totalQuestions}` : isExamStarted ? "Generating questions" : 'Exam Rules'} </p>
              <p className="text-green-400"> {question && `Score ${score}`} </p>
            </div>
            { isExamStarted && <CountdownCircleTimer duration={600} color="#ff5722" onComplete={handleExamTimeOver}   />}
          </CardTitle>
          <CardContent>
            {isExamStarted === false && <ExamRules /> }
            {isExamStarted == false && <Button variant="default" className="w-full mt-6" onClick={handleGetQuestion}>  Start Now  </Button>}

            {isExamStarted && question && !showResultContainer && <> 
                <h4 className="text-left text-xl font-semibold tracking-tight py-3">
                  {question.question}
                </h4>

                <RadioGroup className="max-w-sm" onValueChange={handleChangeAnswer} value={userAnswer}>
                  <FieldLabel htmlFor={question.options[0]}  className={getOptionClassName(question.options[0])}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle> {question.options[0]} </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={question.options[0]} id={question.options[0]} />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor={question.options[1]} className={getOptionClassName(question.options[1])}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle> {question.options[1]} </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={question.options[1]} id={question.options[1]} />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor={question.options[2]}  className={getOptionClassName(question.options[2])}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{question.options[2]}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={question.options[2]} id={question.options[2]} />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor={question.options[3]} className={getOptionClassName(question.options[3])}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{question.options[3]}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={question.options[3]} id={question.options[3]} />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              
                {question?.explaination && <p className="text-md mt-4 ml-2"> <b>Explanation</b> {question.explaination} </p>}

                {currentQuestionIndex + 1 < totalQuestions && 
                  <Button variant="outline" className="my-6" onClick={() => {
                    console.log(showResultContainer)
                    handleGetQuestion()
                }}> Next Question <ArrowRightIcon data-icon="inline-start" /> </Button>
                }
                {currentQuestionIndex + 1 == totalQuestions && 
                  <Button variant="outline" className="my-6" onClick={() => {
  
                    setShowResultContainer(true)
                  }}> Finish </Button>
                }
              </>
            }

            {isExamStarted == true && isExamCompleted == false && !question  && <>
                <Skeleton className="h-8 w-full my-3" />
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </>
            }



          </CardContent>
        </CardHeader>
      </Card>
    </main>
  )
}