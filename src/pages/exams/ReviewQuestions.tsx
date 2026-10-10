import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { reviewExamAnswersAPI } from '@/API/question.API'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'
import { Bookmark } from 'lucide-react'
import { toggleQuestionBookmarkAPI } from '@/API/user.API'
import { toast } from 'sonner'

export const ReviewQuestions: React.FC = () => {
  const [reviewQuestions, setReviewQuestions] = useState<any>(null)
  const params = useParams()


  const handleReviewQuestions = async () => {
    try {
      const data = await reviewExamAnswersAPI({ examId: params.examId })
      setReviewQuestions(data.correctionAnswer)
    } catch (error: any) {
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }

  const getOptionClassName = (option: string, index: number) => {
    if (!reviewQuestions[index].userAnswered || !reviewQuestions[index]?.answer) return ""

    if (option === reviewQuestions[index].answer) {
      return "text-green-500 border-green-500 w-full"
    }

    if (option === reviewQuestions[index].userAnswered) {
      return "text-red-500 border-red-500 "
    }

    return ""
  }

  const handleToggleBookmark = async (index: number) => {
    try {
      const response = await toggleQuestionBookmarkAPI({ questionId: reviewQuestions[index]._id })
      toast.success(response.message, { position: 'top-right' })
      setReviewQuestions((previousQuestions: any) => {
        let newQuestions = [...previousQuestions]
        newQuestions[index] = { ...newQuestions[index], bookmarked: response.addedToBookmark}
        return newQuestions
      })
    } catch (error: any) {
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }


  useEffect(() => {
    handleReviewQuestions()
  }, [params.examId])


  return (
    <main className='min-h-screen w-full max-w-5xl flex flex-col mx-auto my-4 border border-[#444748]/30 rounded-xl shadow-2xl p-3'>
      <h1 className='text-3xl text-white'> Review Questions </h1>
      <Tabs defaultValue="all" className="my-3 w-full">
        <TabsList>
          <TabsTrigger value="all">All <Badge variant="default"> {reviewQuestions && reviewQuestions.length} </Badge> </TabsTrigger>
          <TabsTrigger value="correct">Correct <Badge variant="default"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == true).length} </Badge> </TabsTrigger>
          <TabsTrigger value="incorrect">Incorrect <Badge variant="destructive"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == false).length} </Badge> </TabsTrigger>
          <TabsTrigger value="didNotAnswer"> Did Not Answer <Badge variant="destructive"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == null).length} </Badge> </TabsTrigger>
        </TabsList>


        <TabsContent value="all" className='min-h-40 min-w-full w-full rounded-xl'>
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.map((curElem: any, index: number) => {
              return (
                <Card className='px-3 relative' key={curElem._id}>
                  <h4 className="text-left text-2xl font-semibold tracking-tight"> {index + 1}. {curElem.question} </h4>
                  
                  <Bookmark color='#ffff00' fill={curElem.bookmarked ? '#ffff00': 'none'} className='absolute top-3 right-3' onClick={() => handleToggleBookmark(index)} />

                  <RadioGroup className="w-full p-2" value={curElem.userAnswered} disabled={true}>
                    <FieldLabel htmlFor={curElem.options[0]} className={getOptionClassName(curElem.options[0], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[0]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[0]} id={curElem.options[0]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[1]} className={getOptionClassName(curElem.options[1], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[1]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[1]} id={curElem.options[1]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[2]} className={getOptionClassName(curElem.options[2], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{curElem.options[2]}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[2]} id={curElem.options[2]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[3]} className={getOptionClassName(curElem.options[3], index)}>
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

        </TabsContent>


        <TabsContent value="correct">
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == true).map((curElem: any, indexes: number) => {
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
        </TabsContent>


        <TabsContent value="incorrect">
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == false).map((curElem: any, indexes: number) => {
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
        </TabsContent>


        <TabsContent value="didNotAnswer">
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == null).map((curElem: any, indexes: number) => {
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
        </TabsContent>


      </Tabs>
    </main>
  )
}