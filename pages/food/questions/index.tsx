import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import {useRouter} from "next/router"
import {useCallback, useMemo, useState} from "react"
import {Box, Flex, Button} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {data} from "public/food/data"

const FoodTestPage: NextPage = () => {
  const router = useRouter()

  const questionNumber = useMemo(()=>{
    const rawNo = router.query.no
    if (typeof rawNo !== "string") return 1
    return parseInt(rawNo) || 1
  }, [router.query.no])

  const onClickOption = useCallback((value: number)=>{
    // TODO: save data to localStorage
    // getLocalStorage, setLocalStorage
    if (questionNumber < 10){
      router.push({
        pathname: "/food/questions",
        query: {no: questionNumber + 1},
      })
    }
    else if (questionNumber === 10){
      router.push({
        pathname: "/food/result",
      })
    }
    else {
      router.push({
        pathname: "/food/questions",
        query: {no: 1},
      })
    }
  },[questionNumber, router])

  const options = useMemo(()=>{
    return (data.questions[questionNumber-1]?.options || [])
  }, [questionNumber])

  return (
    <LayoutBasic>
      <Flex className="justify-start h-full">
        <Box className="mt-2 cursor-pointer">
          <Image alt={`food-question-${questionNumber}`} src={`/food/question-${questionNumber}.png`} width={375} height={324}/>
        </Box>
        {/* <Box onClick={onClick} className="cursor-pointer">
          <Image alt={`food-question-${questionNumber}`} src={"/shared/question-frame.png"} width={750} height={640}/>
        </Box> */}
        <Flex className="px-12 mt-12">
          {options.map((item, index) => (
            <Flex key={`option-${index}`} className="mt-3 first:mt-0">
              <Button onClick={()=>onClickOption(index)} >{item}</Button>
            </Flex>
          )) }
        </Flex>
      </Flex>
    </LayoutBasic>
  )
}

export default FoodTestPage
