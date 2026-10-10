import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export const StreaksCard = (props: any) => {
    const { data: dailyStreaks } = props

    // const [dailyStreaks, setDailyStreaks] = useState<any | null>(null)

    // useEffect(() => {
    //     (async function () {
    //         let data = await getDailyStreaksAPI()
    //         let newData = data.map((curElem : any) => {
    //             curElem.date = checkDateCategory(curElem.date) 
    //             return { ...curElem }
    //         })
    //         console.log("The Data is: ", newData)
    //         console.log(((newData[newData.length - 1].totalScore - newData[newData.length - 2].totalScore) / newData[newData.length - 1].totalScore) * 100)
    //         console.log(((newData[newData.length - 1].totalNumberOfQuestions - newData[newData.length - 2].totalNumberOfQuestions) / newData[newData.length - 1].totalNumberOfQuestions) * 100)
    //         setDailyStreaks(newData)
    //     })()
        
    // }, [])



    return (
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            {/* Questions Attended Today */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription> Questions Attended Today </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dailyStreaks && dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions -  dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions ) / dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions) * 100 ) >= 0 && <TrendingUpIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions -  dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions ) / dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions) * 100 ) < 0 && <TrendingDownIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions -  dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions ) / dailyStreaks[dailyStreaks.length - 1].totalNumberOfQuestions) * 100 ).toFixed(2)}
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>


            {/* Questions Attended Yesterday */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription> Questions Attended Yesterday </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dailyStreaks && dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                           {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions - dailyStreaks[dailyStreaks.length - 3].totalNumberOfQuestions) / dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions) * 100) >= 0 && <TrendingUpIcon />}
                           {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions - dailyStreaks[dailyStreaks.length - 3].totalNumberOfQuestions) / dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions) * 100) < 0 && <TrendingDownIcon />}
                           {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions - dailyStreaks[dailyStreaks.length - 3].totalNumberOfQuestions) / dailyStreaks[dailyStreaks.length - 2].totalNumberOfQuestions) * 100).toFixed(2)}
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>

            {/* Correct Answers Today */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription> Correct Answers Today </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dailyStreaks && dailyStreaks[dailyStreaks.length - 1].totalScore}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalScore - dailyStreaks[dailyStreaks.length - 2].totalScore) / dailyStreaks[dailyStreaks.length - 1].totalScore) * 100) >= 0 && <TrendingUpIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalScore - dailyStreaks[dailyStreaks.length - 2].totalScore) / dailyStreaks[dailyStreaks.length - 1].totalScore) * 100) < 0 &&  <TrendingDownIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 1].totalScore - dailyStreaks[dailyStreaks.length - 2].totalScore) / dailyStreaks[dailyStreaks.length - 1].totalScore) * 100).toFixed(2)}
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>


            {/* Correct Answers Yesterday */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription> Correct Answers Yesterday </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {dailyStreaks && dailyStreaks[dailyStreaks.length - 2].totalScore}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalScore - dailyStreaks[dailyStreaks.length - 3].totalScore) / dailyStreaks[dailyStreaks.length - 2].totalScore) * 100) >= 0 && <TrendingUpIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalScore - dailyStreaks[dailyStreaks.length - 3].totalScore) / dailyStreaks[dailyStreaks.length - 2].totalScore) * 100) < 0 && <TrendingDownIcon />}
                            {dailyStreaks && (((dailyStreaks[dailyStreaks.length - 2].totalScore - dailyStreaks[dailyStreaks.length - 3].totalScore) / dailyStreaks[dailyStreaks.length - 2].totalScore) * 100).toFixed(2)}
                        </Badge>
                    </CardAction>
                </CardHeader>
                
            </Card>
        </div>
    )
}