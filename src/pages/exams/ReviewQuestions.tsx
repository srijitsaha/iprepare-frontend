import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { reviewExamAnswersAPI } from '@/API/question.API'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'
import { Bookmark, Brain } from 'lucide-react'
import { toggleQuestionBookmarkAPI } from '@/API/user.API'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { MessagePattern } from '@/components/Chats/AskDoubtAboutQuestions'

export const ReviewQuestions: React.FC = () => {
  const [reviewQuestions, setReviewQuestions] = useState<any>(null)
  const [otherDetails, setOtherDetails] = useState<any>(null)
  const params = useParams()
  const [selectedWrongQuestionId, setSelectedWrongQuestionId] = useState<string | null>(null)


  const handleReviewQuestions = async () => {
    try {
      const data = await reviewExamAnswersAPI({ examId: params.examId })
      setReviewQuestions(data.correctionAnswer)


      // Formatting of startedAt timestamps
      let startedDate: string = new Date(data.startedAt).toLocaleDateString()
      data.startedAtDate = `${startedDate.replaceAll('/', '-')}`

      let startedTime: any = new Date(data.startedAt)
      data.startedAtTime = startedTime.toLocaleTimeString().split(':').slice(0, 2).join(':')



      // Calculating how much time was taken by the user to finish the exam
      let startedAt: number = Date.parse(data.startedAt)
      let completedAt: number = Date.parse(data.completedAt)

      let differenceInMilliSeconds: number = Math.round((completedAt - startedAt) / 1000)
      let minutesDifference: number = Math.floor(differenceInMilliSeconds / 60)
      let secondsDifference: number = Math.floor(differenceInMilliSeconds % 60)

      data.timeTaken = `${minutesDifference}:${secondsDifference}`

      setOtherDetails(data)
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


  const getOptionClassNameUserNotAnswered = (option: string, index: number) => {
    if(option === reviewQuestions[index].answer) {
      return "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary"
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

  console.log("Review Questions Rerendered")

  return (
    <main className='min-h-screen w-full max-w-5xl flex flex-col mx-auto my-4 border border-[#444748]/30 rounded-xl shadow-2xl p-3'>

      <section className='my-2 w-full h-max flex flex-col gap-2'>
        <h1 className='text-3xl text-white'> Review Questions </h1>
        <div className='w-full h-max flex gap-2 flex-wrap'>
          

          <Card className=''>
            <CardHeader>
              <CardTitle className='font-bold'> Subject </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-400 font-normal'> {otherDetails?.board} - {otherDetails?.subject} </p>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle className='font-bold'> Topic </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-400 font-normal'> {otherDetails?.topic} </p>
            </CardContent>
          </Card>
          

          <Card>
            <CardContent>
              <p className='text-gray-400 font-normal flex gap-3 items-center'> <b className='text-base leading-snug font-medium text-white'> Started at </b> {otherDetails?.startedAtDate} {otherDetails?.startedAtTime} </p>
              <p className='text-gray-400 font-normal flex gap-3 items-center'> <b className='text-base leading-snug font-medium text-white'> Time taken </b> {otherDetails?.timeTaken} minutes. </p>
            </CardContent>
          </Card>
        </div>

      </section>

      <Tabs defaultValue="all" className="my-3 w-full">
        <TabsList>
          <TabsTrigger value="all">All <Badge variant="default"> {reviewQuestions && reviewQuestions.length} </Badge> </TabsTrigger>
          <TabsTrigger value="correct">Correct <Badge variant="default"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == true).length} </Badge> </TabsTrigger>
          <TabsTrigger value="incorrect">Wrong <Badge variant="destructive"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == false).length} </Badge> </TabsTrigger>
          <TabsTrigger value="didNotAnswer"> Unanswered <Badge variant="destructive"> {reviewQuestions && reviewQuestions.filter((currElem: any) => currElem.isUserAnsweredCorrect == null).length} </Badge> </TabsTrigger>
        </TabsList>


        <TabsContent value="all" className='min-h-40 min-w-full w-full rounded-xl'>
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.map((curElem: any, index: number) => {
              return (
                <Card className='px-3 relative' key={curElem._id}>
                  <h4 className="text-left text-2xl font-semibold tracking-tight"> {index + 1}. {curElem.question} </h4>
                  
                  <Bookmark color='#ffff00' fill={curElem.bookmarked ? '#ffff00': 'none'} className='absolute top-3 right-3' onClick={() => handleToggleBookmark(index)} />

                  <RadioGroup className="w-full p-2" value={curElem.userAnswered == null ? curElem.answer : curElem.userAnswered} disabled={true}>
                    <FieldLabel htmlFor={curElem.options[0]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[0], index) : getOptionClassName(curElem.options[0], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[0]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[0]} id={curElem.options[0]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[1]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[1], index) : getOptionClassName(curElem.options[1], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[1]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[1]} id={curElem.options[1]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[2]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[2], index) : getOptionClassName(curElem.options[2], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{curElem.options[2]}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[2]} id={curElem.options[2]} />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={curElem.options[3]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[3], index) : getOptionClassName(curElem.options[3], index)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{curElem.options[3]}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[3]} id={curElem.options[3]} />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  <p className='p-2'> Explanation: {curElem.explaination} </p>
                  {curElem.isUserAnsweredCorrect != true && <Button className='py-1 w-fit h-max self-end' onClick={() => setSelectedWrongQuestionId(curElem._id)}> <Brain />  Ask AI </Button>}

                </Card>
              )
            })}
          </div>

        </TabsContent>


        <TabsContent value="correct">
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.map((curElem: any, indexes: number) => {
              if(curElem.isUserAnsweredCorrect == true) 
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
            {reviewQuestions && reviewQuestions.map((curElem: any, indexes: number) => {
              if(curElem.isUserAnsweredCorrect == false )
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
                  {curElem.isUserAnsweredCorrect != true && <Button className='py-1 w-fit h-max self-end' onClick={() => setSelectedWrongQuestionId(curElem._id)}> <Brain />  Ask AI </Button>}


                  
                </Card>
              )
            })}
          </div>
        </TabsContent>


        <TabsContent value="didNotAnswer">
          <div className='h-fit w-full flex flex-col rounded-xl border-0 gap-3'>
            {reviewQuestions && reviewQuestions.map((curElem: any, indexes: number) => {
              if(curElem.isUserAnsweredCorrect == null) 
              return (
                <Card className='px-3' key={curElem._id}>
                  <h4 className="text-left text-2xl font-semibold tracking-tight"> {indexes + 1}. {curElem.question} </h4>

                  <RadioGroup className="w-full p-2" value={curElem.answer} disabled={true}>

                    <FieldLabel htmlFor={curElem.options[0]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[0], indexes) : getOptionClassName(curElem.options[0], indexes)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[0]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[0]} id={curElem.options[0]} />
                      </Field>
                    </FieldLabel>

                    <FieldLabel htmlFor={curElem.options[1]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[1], indexes) : getOptionClassName(curElem.options[1], indexes)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle> {curElem.options[1]} </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[1]} id={curElem.options[1]} />
                      </Field>
                    </FieldLabel>

                    <FieldLabel htmlFor={curElem.options[2]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[2], indexes) : getOptionClassName(curElem.options[2], indexes)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{curElem.options[2]}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[2]} id={curElem.options[2]} />
                      </Field>
                    </FieldLabel>

                    <FieldLabel htmlFor={curElem.options[3]} className={curElem.userAnswered == null ? getOptionClassNameUserNotAnswered(curElem.options[3], indexes) : getOptionClassName(curElem.options[3], indexes)}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{curElem.options[3]}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={curElem.options[3]} id={curElem.options[3]} />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  <p className='p-2'> Explanation: {curElem.explaination} </p>
                  {curElem.isUserAnsweredCorrect != true && <Button className='py-1 w-fit h-max self-end' onClick={() => setSelectedWrongQuestionId(curElem._id)}> <Brain />  Ask AI </Button>}

                </Card>
              )
            })}
          </div>
        </TabsContent>
        {selectedWrongQuestionId != null && <MessagePattern setSelectedWrongQuestionId={setSelectedWrongQuestionId} selectedWrongQuestionId={selectedWrongQuestionId} examId={params.examId} />}

      </Tabs>
    </main>
  )
}