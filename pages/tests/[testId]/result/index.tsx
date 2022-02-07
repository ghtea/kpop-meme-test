import AES from "crypto-js/aes"
import type {NextPage} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {useCallback, useEffect, useMemo, useState} from "react"
import {Box, Button, Flex, Image} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {data} from "public/shared/data"

const ResultPage: NextPage = () => {
  const router = useRouter()

  const [score, setScore] = useState(0)

  // TODO: 답안지 정보를  localstorage 가 아닌 hash 로 저장할까?
  const testId = useMemo(()=>{
    const rawTestId = router.query.testId
    return typeof rawTestId === "string" ? rawTestId : ""
  }, [router.query.testId])

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
    // TODO: calculate score using answerChoices
    // TODO: then remove c queries and add encrypt score and save as s query
    // https://www.npmjs.com/package/crypto-js
  },[])

  const onClickRetry = useCallback(()=>{
    testId && router.push(`/tests/${testId}/questions?no=1`)
    // reset data in localstorage ?
  },[router, testId])

  const onClickCopyLink = useCallback(()=>{
    // copy link and let user know copied
  },[])

  return (
    <LayoutBasic>
      {(testId && score !== undefined) && (
        <Flex className="justify-start h-full">
          <Box className="mt-2 cursor-pointer">
            <Image alt={`${testId}-result-${score}`} src={`/shared/score-${score}.png`} width={375} height={324}/>
          </Box>
          <Flex className="px-12 mt-12">
            <Flex>
              <Button onClick={onClickRetry}>{"다시하기"}</Button>
            </Flex>
            <Flex className="mt-3 first:mt-0">
              <Button onClick={onClickCopyLink} >{"링크 복사"}</Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </LayoutBasic>
  )
}

export default ResultPage
