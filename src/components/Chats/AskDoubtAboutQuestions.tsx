import * as React from "react"
import { ChevronLeftCircle, CopyIcon, Maximize2, Minimize2, PencilIcon, Send } from "lucide-react"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import type { AskDoubtProps } from "@/types/types"
import { askDoubtAboutAQuestionToAIAPI } from "@/API/question.API"


export const MessagePattern = React.memo(({ setSelectedWrongQuestionId, selectedWrongQuestionId, examId }: AskDoubtProps) => {
  const [copied, setCopied] = React.useState<boolean>(false)
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)
  // const [feedback, setFeedback] = React.useState<"like" | "dislike" | null>(null)
  const [messageInput, setMessageInput] = React.useState<string>("")
  const [messages, setMessages] = React.useState<any>([])
  const [fullScreen, setFullScreen] = React.useState<boolean>(false)
  const messagesEndRef = React.useRef<any>(null)


  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });


  const sendMessageToAI = async () => {
    console.log("Asking...")
    setIsProcessing(true)
    // For first message, the input will be empty
    if(messages.length  == 0) {
      setMessages((previousMessages: any[]) => [...previousMessages, { by: "user", message: "Ask doubt for this question" }])
    } else {
      setMessages((previousMessages: any[]) => [...previousMessages, { by: "user", message: messageInput }])
    }

    try {
      const response = await askDoubtAboutAQuestionToAIAPI({ message: messageInput, examId, questionId: selectedWrongQuestionId })
      console.log(response)
      setMessages((previousMessages: any[]) => [...previousMessages, { by: "ai", message: response.message, via: response.via }])
    } catch (error: any) {
      console.log(error)
      setMessages((previousMessages: any[]) => [...previousMessages, { by: "ai", message: error.response.data.message, via: error.response.data.via }])
    }
    scrollToBottom()
    setIsProcessing(false)
  }


  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])



  React.useEffect(() => {
    sendMessageToAI()
  }, [])



  React.useEffect(()=> {
    scrollToBottom()
  }, [messages])


  return (
    <div className={`mx-auto flex h-10/12 w-full flex-col gap-8 text-sm fixed bottom-[2vh] right-2 sm:right-1 md:right-3 lg:right-4 border border-white/90 rounded-md bg-background/95 ${fullScreen ? 'max-w-screen lg:px-5':'sm:max-w-sm lg:max-w-md'} transition-all ease-in-out duration-200 delay-75`} >
      <div className="h-fit w-full p-3 flex gap-2 items-center border-b-2 ">
        <ChevronLeftCircle onClick={() => setSelectedWrongQuestionId(null)} />
        <h1 className="text-2xl"> Ask Doubt </h1>
        <Button className="w-fit absolute right-3" onClick={(e: React.SyntheticEvent) => {
          e.stopPropagation()
          setFullScreen(!fullScreen)
        }}> {fullScreen ? <Minimize2 />: <Maximize2 />} </Button>
      </div>

      <section className="px-3 h-max flex gap-2 flex-col overflow-y-auto">

        {messages && messages.map((curElem: any) => {
          return (
            <Message align={curElem.by == "user" ? "end" : "start"}>
              <MessageContent className="gap-2">
                <Bubble align={curElem.by == "user" ? "end" : "start"} variant={curElem.by == "user" ? "default" : "tinted"}>
                  <BubbleContent className="overflow-x-auto">
                    <Markdown remarkPlugins={[remarkGfm]}>{curElem.message}</Markdown> 
                  </BubbleContent>
                </Bubble>
                <MessageFooter>
                  <MessageAction label="Copy" onClick={() => {
                    navigator.clipboard.writeText(curElem.message)
                    setCopied(true)
                  }}>
                    <CopyIcon />
                  </MessageAction>
                  <MessageAction label="Edit">
                    <PencilIcon />
                  </MessageAction>
                  {curElem.via}
                </MessageFooter>
              </MessageContent>
            </Message>
          )
        })}
        


        {isProcessing && <Message >
          <MessageContent className="gap-2">
            <Bubble align="start" variant="tinted">
              <BubbleContent>
                <div className="flex gap-2 items-center justify-center">
                  <span className="w-3 h-3 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-3 h-3 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-3 h-3 bg-current rounded-full animate-bounce"></span>
                </div>
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>}

        {/* For scrolling ref only */}
        <span ref={messagesEndRef}></span>
      </section>

      <section className="px-3 h-fit w-full flex sticky bottom-0 items-center">
        <Textarea placeholder="Type your doubt here." className="w-11/12 max-h-28" onChange={(e: any) => setMessageInput(e.target.value)} value={messageInput} disabled={isProcessing} />
        <Button variant="default" className="rounded-full" disabled={isProcessing  || (messageInput.length == 0)} onClick={() => sendMessageToAI()}>  <Send />  </Button>
      </section>
    </div>
  )
})

function MessageAction({
  label,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={label} {...props}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
