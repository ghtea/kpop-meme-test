import type {NextPage} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {useCallback, useMemo} from "react"
import {Box, Flex, Image} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"

const TestPage: NextPage = () => {
  const router = useRouter()

  const testId = useMemo(()=>{
    const rawTestId = router.query.testId
    return typeof rawTestId === "string" ? rawTestId : ""
  }, [router.query.testId])

  const onClick = useCallback(()=>{
    testId && router.push(`/tests/${testId}/questions?no=1`)
  },[router, testId])

  return (
    <LayoutBasic>
      <Flex className="justify-center h-full">
        <Box onClick={onClick} className="mr-2 cursor-pointer">
          {testId && <Image alt={"food-start"} src={`/${testId}/start.png`} width={375} height={545}/>}
        </Box>
      </Flex>
    </LayoutBasic>
  )
}

export default TestPage
