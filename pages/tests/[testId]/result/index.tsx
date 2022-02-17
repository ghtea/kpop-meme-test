import copy from "copy-to-clipboard";
import {AES, enc} from "crypto-js"
import type {NextPage} from "next"
import {useRouter} from "next/router"
import {useCallback, useEffect, useMemo, useState} from "react"
import {Box, Button, Flex, Image} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {data} from "public/shared/data"
import * as ga from "utils/ga"

const ResultPage: NextPage = () => {
  const router = useRouter()

  const [score, setScore] = useState(0)

  const testId = useMemo(()=>{
    const rawTestId = router.query.testId
    return typeof rawTestId === "string" ? rawTestId : ""
  }, [router.query.testId])

  const anotherTestId = useMemo(()=>{
    if (testId === "food") {
      return "knowledge"
    }
    else {
      return "food"
    }
  }, [testId])

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

  // calculate score
  useEffect(()=>{
    if (!testData || answerChoices.some(item => isNaN(item))) return;

    const answers = testData.questions.map(item => item.answer)
    const calculatedScore = answerChoices.reduce((acc, cur, index)=> {
      if (cur === answers[index]){
        ga.event({
          action: `score-${testId}-${index+1}`,
          params : {
            result: true
          }
        })

        return acc + 1
      }
      else {
        ga.event({
          action: `score-${testId}-${index+1}`,
          params : {
            result: false
          }
        })

        return acc
      }
    }, 0)    

    ga.event({
      action: `score-${testId}`,
      params : {
        result: calculatedScore
      }
    })

    const encryptedScoreText = AES.encrypt(calculatedScore.toString(), "foodfoodfoodfood").toString()
    
    router.push({
      pathname: `/tests/${testId}/result`,
      query: {
        s: encryptedScoreText
      },
    })
  },[answerChoices, router, testData, testId])

  // read encrypted score from query
  useEffect(()=>{
    const rawScore = router.query.s
    const encryptedScore = typeof rawScore === "string" ? rawScore : ""
    if (!encryptedScore) return;
    console.log("encryptedScore: ", encryptedScore); // TODO: remove
    const decryptedScore = parseInt(AES.decrypt(encryptedScore, "foodfoodfoodfood").toString(enc.Utf8), 10)

    setScore(decryptedScore)
  },[router.query.s, testId])

  const onClickRetry = useCallback(()=>{
    testId && router.push(`/tests/${testId}/questions?no=1`)
  },[router, testId])

  const onClickCopyLink = useCallback(()=>{
    // copy link and let user know copied
    copy(window.location.href)
    alert("링크가 복사되었습니다!")
  },[])

  const onClickAnotherTest = useCallback(()=>{
    router.push(`/tests/${anotherTestId}`)
  },[anotherTestId, router])

  return (
    <LayoutBasic>
      {(testId && score !== undefined) && (
        <Flex className="justify-start h-full">
          <Box className="mt-2 animate-descending cursor-pointer">
            <Image alt={`${testId}-result-${score}`} src={`/shared/score-${score}.png`} width={375} height={324}/>
          </Box>
          <Flex className="px-12 mt-12">
            <Flex className="animate-rising">
              <Button onClick={onClickRetry}>{"다시하기"}</Button>
            </Flex>
            <Flex className="mt-3 animate-rising">
              <Button onClick={onClickCopyLink} >{"링크 복사"}</Button>
            </Flex>
            <Flex className="mt-3 animate-rising">
              <Button onClick={onClickAnotherTest} >{"다른 테스트 하러가기"}</Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </LayoutBasic>
  )
}

export default ResultPage
