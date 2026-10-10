import { getMistakenQuestionsAPI } from "@/API/user.API"
import { Card } from "@/components/ui/card"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"


export const MistakesNotebook = () => {
  const [mistakenQuestions, setMistakenQuestions] = useState<any[]>([])
  const [board, setBoard] = useState<string | undefined>(undefined)
  const [subject, setSubject] = useState<string | undefined>(undefined)
  const [topic, setTopic] = useState<string | undefined>(undefined)
  const [boardsList, setBoardsList] = useState<any>([])
  const [subjectsList, setSubjectsList] = useState<any>([])
  const [topicsList, setTopicsList] = useState<any>([])


  const normalizeMistakenQuestions = (payload: any) => {
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.mistakenQuestions)) return payload.mistakenQuestions
    if (Array.isArray(payload?.questions)) return payload.questions
    if (Array.isArray(payload?.data)) return payload.data
    return []
  }

  const handleMistakenQuestionsBoardsAPI = async () => {
    try {
      const data = await getMistakenQuestionsAPI({})
      setBoardsList(data?.distinctBoards ?? [])
      setSubjectsList([])
      setTopicsList([])
      setMistakenQuestions([])
    } catch (error) {
      console.log(error)
    }
  }


  const handleMistakenQuestionsSubjectsAPI = async () => {
    try {
      if (!board) {
        setSubjectsList([])
        setTopicsList([])
        setMistakenQuestions([])
        return
      }

      const data = await getMistakenQuestionsAPI({ board })
      setSubjectsList(data?.distinctSubjects ?? [])
      setTopicsList([])
      setMistakenQuestions([])
    } catch (error) {
      console.log(error)
    }
  }


  const handleMistakenQuestionsTopicsAPI = async () => {
    try {
      if (!board || !subject) {
        setTopicsList([])
        setMistakenQuestions([])
        return
      }

      const data = await getMistakenQuestionsAPI({ board, subject })
      setTopicsList(data?.distinctTopics ?? [])
      setMistakenQuestions([])
    } catch (error) {
      console.log(error)
    }
  }


  const handleMistakenQuestionsAPI = async () => {
    try {
      if (!board || !subject || !topic) {
        setMistakenQuestions([])
        return
      }

      const data = await getMistakenQuestionsAPI({ board, subject, topic })
      setMistakenQuestions(normalizeMistakenQuestions(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleMistakenQuestionsBoardsAPI()
  }, [])


  useEffect(() => {
    handleMistakenQuestionsSubjectsAPI()
  }, [board])


  useEffect(() => {
    handleMistakenQuestionsTopicsAPI()
  }, [board, subject])


  useEffect(() => {
    handleMistakenQuestionsAPI()
  }, [board, subject, topic])


  const getOptionClassName = (option: string, index: number) => {
    const currentQuestion = mistakenQuestions[index]
    if (!currentQuestion?.userAnswered || !currentQuestion?.answer) return ""

    if (option === currentQuestion.answer) {
      return "text-green-500 border-green-500 w-full"
    }

    if (option === currentQuestion.userAnswered) {
      return "text-red-500 border-red-500 "
    }

    return ""
  }


  return (
    <main className="min-h-screen w-full p-4">

      <section className="w-full h-fit flex justify-between items-center gap-3">

        <Field>
          <FieldLabel htmlFor="exam-subject"> Board </FieldLabel>
          <Select value={board} onValueChange={setBoard}>
            <SelectTrigger id="exam-subject">
              <SelectValue placeholder="Choose Subject" />
            </SelectTrigger>
            <SelectContent>
              {boardsList && boardsList.map((item: string) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>


        <Field>
          <FieldLabel htmlFor="exam-subject"> Subject </FieldLabel>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="exam-subject">
              <SelectValue placeholder="Choose Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectsList && subjectsList.map((item: string) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>


        <Field>
          <FieldLabel htmlFor="exam-topic"> Topic </FieldLabel>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger id="exam-subject">
              <SelectValue placeholder="Choose Topic" />
            </SelectTrigger>
            <SelectContent>
              {topicsList && topicsList.map((item: string) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

      </section>


      <div className='h-fit w-full my-8 flex flex-col rounded-xl border-0 gap-3'>
        {mistakenQuestions.length > 0 && mistakenQuestions.map((curElem: any, indexes: number) => {
          return (
            <Card className='px-3' key={curElem._id}>
              <h4 className="text-left text-2xl font-semibold tracking-tight"> {indexes + 1}. {curElem.question} </h4>

              <RadioGroup className="w-full p-2" value={curElem.userAnswered} disabled={true}>

                <FieldLabel htmlFor={curElem.options[0]} className={getOptionClassName(curElem.options[0], indexes)}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle> {curElem.options[0]} </FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={curElem.options[0]} id={curElem.options[0]} />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor={curElem.options[1]} className={getOptionClassName(curElem.options[1], indexes)}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle> {curElem.options[1]} </FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={curElem.options[1]} id={curElem.options[1]} />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor={curElem.options[2]} className={getOptionClassName(curElem.options[2], indexes)}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{curElem.options[2]}</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={curElem.options[2]} id={curElem.options[2]} />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor={curElem.options[3]} className={getOptionClassName(curElem.options[3], indexes)}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{curElem.options[3]}</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={curElem.options[3]} id={curElem.options[3]} />
                  </Field>
                </FieldLabel>

              </RadioGroup>
              <p className='p-2'> Explanation: {curElem.explaination} </p>

            </Card>
          )
        })}
      </div>
    </main>
  )
}