import clsx from "clsx"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import {useRouter} from "next/router"
import {useCallback, useEffect, useMemo, useState} from "react"
import {Box, Flex, Button, Text} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {WEBSITE_TITLE} from "pages/_app"
import {data} from "public/shared/data"

const QuestionsPage: NextPage = () => {
  const router = useRouter()

  const [isDoneAnimation, setIsDoneAnimation] = useState(false)
  
  const testId = useMemo(()=>{
    const rawTestId = router.query.testId
    return typeof rawTestId === "string" ? rawTestId : ""
  }, [router.query.testId])

  const questionNumber = useMemo(()=>{
    const rawNo = router.query.no
    if (typeof rawNo !== "string") return 1
    return parseInt(rawNo, 10) || 1
  }, [router.query.no])

  const testData = useMemo(()=>{
    return (data[testId as keyof typeof data]? data[testId as keyof typeof data] : undefined)
  }, [testId])

  const answerChoices = useMemo(()=>{
    const rawAnswerChoices = router.query.c
    const newAnswerChoices = typeof rawAnswerChoices === "string"
      ? rawAnswerChoices.split("-")
      : []
    const questionsLength = testData?.questions.length || 0;

    return [...newAnswerChoices, ...Array(questionsLength).fill(undefined)].slice(0,questionsLength).map(item => parseInt(item, 10))
  }, [router.query.c, testData?.questions.length])

  const getNewAnswerChoices = useCallback((index, value)=>{
    const newAnswerChocies = [...answerChoices]
    newAnswerChocies.splice(index, 1, value);
    return newAnswerChocies
  },[answerChoices])

  const onClickOption = useCallback((value: number)=>{
    if (!testId) return;

    const newAnswerChoicesQuery = getNewAnswerChoices(questionNumber - 1, value)
      .map(item => isNaN(item) ? "" : item) 
      .join("-")

    if (questionNumber < 10){
      router.push({
        pathname: `/tests/${testId}/questions`,
        query: {
          no: questionNumber + 1,
          c: newAnswerChoicesQuery,
        },
      })
    }
    else if (questionNumber === 10){
      router.push({
        pathname: `/tests/${testId}/result`,
        query: {
          c: newAnswerChoicesQuery,
        },
      })
    }
    else {
      router.push({
        pathname: `/tests/${testId}/questions`,
        query: {
          no: 1,
          c: newAnswerChoicesQuery,
        },
      })
    }
  },[getNewAnswerChoices, questionNumber, router, testId])

  const questionSentence = useMemo(()=>{
    return (testData?.questions[questionNumber-1]?.question || "")
  },[questionNumber, testData?.questions])

  const options = useMemo(()=>{
    return (testData?.questions[questionNumber-1]?.options || [])
  }, [questionNumber, testData?.questions])

  const progressPercentageString = useMemo(()=>{
    if (!testData) return "0%"
    return `${(questionNumber/testData.questions.length)*100}%`
  },[questionNumber, testData])

  useEffect(()=>{
    setIsDoneAnimation(false)
    setTimeout(()=>{
      setIsDoneAnimation(true)
    },1000)
  },[questionNumber])

  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <LayoutBasic>
        {testId && (
          <Flex className="justify-start h-full">
            <Flex className={clsx(["relative w-[375px] h-[324px]", !isDoneAnimation && "animate-shake"])}>
              <Box className={"absolute bottom-4 cursor-pointer"}>
                <Image alt={`${testId}-question-${questionNumber}`} src={`/${testId}/question-${questionNumber}.jpg`} width={324} height={200}/>
              </Box>
              <Box className={"flex absolute top-[60px] right-1/2 flex-row justify-center items-center w-9/12 h-12 translate-x-1/2"}>
                <Text className="text-lg">{questionSentence}</Text>
              </Box>
              <Box className="absolute">
                <Image alt={"question frame"} src={"/shared/question-frame.png"} width={375} height={324}/>
              </Box>
            </Flex>
            <Flex className="px-4 mt-0">
              <Flex className="items-start h-3 bg-[#E8EDF5] rounded-[6px]">
                <Flex style={{width: progressPercentageString}} className={"h-3 bg-[#BEBEBE] rounded-[6px]"}></Flex>
              </Flex>
            </Flex>
            <Flex className="px-12 mt-6">
              {options.map((item, index) => (
                <Flex key={`option-${index}`} className="mt-3 first:mt-0">
                  <Button 
                    onClick={()=>onClickOption(index)} 
                    className={clsx(!isDoneAnimation && "animate-rising")}
                  >{item}</Button>
                </Flex>
              )) }
            </Flex>
          </Flex>
        )}
      </LayoutBasic>
    </>
  )
}

export default QuestionsPage
