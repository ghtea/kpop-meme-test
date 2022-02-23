import copy from "copy-to-clipboard";
import {AES, enc} from "crypto-js"
import type {NextPage} from "next"
import Head from "next/head";
import {useRouter} from "next/router"
import {useCallback, useEffect, useMemo, useState} from "react"
import {Box, Button, Flex, Image, Text} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {WEBSITE_TITLE} from "pages/_app";
import {data} from "public/shared/data"
import sentenceEffectOne from "public/shared/sentence-effect-1.png"
import sentenceEffectTwo from "public/shared/sentence-effect-2.png"
import sentenceEffectThree from "public/shared/sentence-effect-3.png"
import sentenceEffectFour from "public/shared/sentence-effect-4.png"
import {decrypt, encrypt} from "utils/crypto";

import * as ga from "utils/ga"

const ResultPage: NextPage = () => {
  const router = useRouter()

  const [score, setScore] = useState(-1)

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

  const sentence = useMemo(()=>{
    const testData = data[testId as keyof typeof data];
    if (!testData) return ""

    const scoreData = testData.scores.find(item => item.score === score)

    return scoreData ? scoreData.sentence : ""
  }, [score, testId])

  const sentenceEffect = useMemo(()=>{
    if (score >= 10){
      return sentenceEffectFour
    } else if (score >= 7){
      return sentenceEffectThree
    } else if (score >= 4){
      return sentenceEffectTwo
    } else if (score >= 0) {
      return sentenceEffectOne
    } else {
      return undefined
    }
  },[score])
  
  const answerChoices = useMemo(()=>{
    const rawAnswerChoices = router.query.c
    if (!rawAnswerChoices) return null

    const newAnswerChoices = typeof rawAnswerChoices === "string"
      ? rawAnswerChoices.split("-")
      : []
    const questionsLength = testData?.questions.length || 10;

    return [
      ...newAnswerChoices, ...Array(questionsLength).fill(undefined)
    ]
      .slice(0,questionsLength)
      .map(item => parseInt(item, 10))
  }, [router.query.c, testData?.questions.length])

  useEffect(()=>{
    if (!testData || !testId){
      return;
    }
    else if (answerChoices === null){
      return;
    }
    else {
      const notTriedQuestionIndex = answerChoices.findIndex(item => isNaN(item))
      if (notTriedQuestionIndex !== -1) {
        alert("문제를 다 풀지 않았습니다")
  
        router.push({
          pathname: `/tests/${testId}/questions`,
          query: {
            c: router.query.c,
            no: notTriedQuestionIndex + 1,
          },
        })
        return;
      }
      else {
        const answers = testData.questions.map(item => item.answer)
        const calculatedScore = answerChoices.reduce((acc, cur, index)=> {
          if (cur === answers[index]){
            // ga.event({
            //   action: `${testId}-question-${index+1}-correct`,
            // })
            ga.event({
              action: `${testId}-question-${index+1}`,
              params: {
                value: 1,
              }
            })
            return acc + 1
          }
          else {
            // ga.event({
            //   action: `${testId}-question-${index+1}-wrong`,
            // })
            ga.event({
              action: `${testId}-question-${index+1}`,
              params: {
                value: 0,
              }
            })
            return acc
          }
        }, 0)    
    
        ga.event({
          action: `${testId}-score`,
          params: {
            value: calculatedScore,
          }
        })
    
        const encryptedScoreText = encrypt(calculatedScore.toString())
        
        router.push({
          pathname: `/tests/${testId}/result`,
          query: {
            s: encryptedScoreText
          },
        })
      }
    }
  },[answerChoices, router, testData, testId])

  // read encrypted score from query
  useEffect(()=>{
    const rawScore = router.query.s
    const encryptedScore = typeof rawScore === "string" ? rawScore : ""
    if (!encryptedScore) return;
    const decryptedScore = parseInt(decrypt(encryptedScore), 10)

    setScore(decryptedScore)
  },[router.query.s, testId])

  const onClickRetry = useCallback(()=>{
    testId && router.push(`/tests/${testId}`)
  },[router, testId])

  const onClickCopyResultLink = useCallback(()=>{
    copy(window.location.href)
    alert("결과 링크가 복사되었습니다!")
  },[])

  const onClickAnotherTest = useCallback(()=>{
    router.push(`/tests/${anotherTestId}`)
  },[anotherTestId, router])

  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <LayoutBasic>
        {(testId && score !== undefined) && (
          <Flex className="justify-start h-full">
            <Box className="mt-2 animate-descending cursor-pointer">
              <Image alt={`${testId}-result-${score}`} src={`/shared/score-${score}.png`} width={375} height={324}/>
            </Box>
            <Flex className="relative w-[375px] h-[70px]">
              <Box className="absolute -top-2 w-[375px] h-[70px]">
                {sentenceEffect && <Image width={375} height={70} alt={"sentence-effect"} src={sentenceEffect} />}
              </Box>
              <Box className="absolute top-[8px]">
                <Text className="text-2xl">{sentence}</Text>
              </Box>
            </Flex>
            <Flex className="px-12 mt-4">
              <Flex className="animate-rising">
                <Button onClick={onClickRetry}>{"다시하기"}</Button>
              </Flex>
              <Flex className="mt-3 animate-rising">
                <Button onClick={onClickCopyResultLink} >{"결과 링크 복사"}</Button>
              </Flex>
              <Flex className="mt-3 animate-rising">
                <Button onClick={onClickAnotherTest} >{"다른 테스트 하러가기"}</Button>
              </Flex>
            </Flex>
          </Flex>
        )}
      </LayoutBasic>
    </>
  )
}

export default ResultPage
