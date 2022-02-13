import clsx from "clsx"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import {useRouter} from "next/router"
import {useCallback, useEffect, useMemo, useState} from "react"
import {Box, Flex, Button} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {data} from "public/shared/data"
import {getLocalStorage, setLocalStorage} from "utils/localStorage"

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
    return parseInt(rawNo) || 1
  }, [router.query.no])

  const testData = useMemo(()=>{
    return (data[testId as keyof typeof data]? data[testId as keyof typeof data] : undefined)
  }, [testId])

  const answerChoices = useMemo(()=>{
    const rawAnswerChoices = router.query.c
    const newAnswerChoices = Array.isArray(rawAnswerChoices) 
      ? rawAnswerChoices 
      : rawAnswerChoices 
        ? [rawAnswerChoices]
        : []
    const questionsLength = testData?.questions.length || 10;

    return [...newAnswerChoices, ...Array(questionsLength).fill(undefined)].slice(0,questionsLength).map(item => parseInt(item, 10))
  }, [router.query.c, testData?.questions.length])

  useEffect(()=>{
    console.log("answerChoices: ", answerChoices); // TODO: remove 
  },[answerChoices])

  const getNewAnswerChoices = useCallback((index, value)=>{
    const newAnswerChocies = [...answerChoices]
    newAnswerChocies.splice(index, 1, value);
    return newAnswerChocies
  },[answerChoices])

  const onClickOption = useCallback((value: number)=>{
    if (!testId) return;

    const newAnswerChoices = getNewAnswerChoices(questionNumber - 1, value)

    if (questionNumber < 10){
      router.push({
        pathname: `/tests/${testId}/questions`,
        query: {
          no: questionNumber + 1,
          c: newAnswerChoices,
        },
      })
    }
    else if (questionNumber === 10){
      router.push({
        pathname: `/tests/${testId}/result`,
        query: {
          c: newAnswerChoices,
        },
      })
    }
    else {
      router.push({
        pathname: `/tests/${testId}/questions`,
        query: {
          no: 1,
          c: newAnswerChoices,
        },
      })
    }
  },[getNewAnswerChoices, questionNumber, router, testId])

  const options = useMemo(()=>{
    return (testData?.questions[questionNumber-1]?.options || [])
  }, [questionNumber, testData?.questions])

  const progressPercentageString = useMemo(()=>{
    if (!testData) return "0%"
    return `${(questionNumber/testData.questions.length)*100}%`
  },[questionNumber, testData])

  useEffect(()=>{
    console.log("progressPercentageString: ", progressPercentageString); // TODO: remove 
  },[progressPercentageString])

  useEffect(()=>{
    setIsDoneAnimation(false)
    setTimeout(()=>{
      setIsDoneAnimation(true)
    },1000)
  },[questionNumber])

  return (
    <LayoutBasic>
      {testId && (
        <Flex className="justify-start h-full">
          <Box className={clsx(["mt-2 cursor-pointer", !isDoneAnimation && "animate-shake"])}>
            <Image alt={`${testId}-question-${questionNumber}`} src={`/${testId}/question-${questionNumber}.png`} width={375} height={324}/>
          </Box>
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
  )
}

export default QuestionsPage
