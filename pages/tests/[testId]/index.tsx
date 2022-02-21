import type {NextPage} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {useCallback, useMemo} from "react"
import {Box, Flex, Image, Button, Text} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {WEBSITE_TITLE} from "pages/_app"

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
    <>
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <LayoutBasic>
        <Flex className="relative justify-center h-full">
          {testId && (
            <Box className="absolute mr-2 cursor-pointer">
              <label htmlFor="start-button"><Image alt={"food-start"} src={`/${testId}/start.png`} width={375} height={600}/></label>
            </Box>
          ) }
          <Box className="absolute bottom-[172px] w-[200px]">
            <Button id="start-button" className="bg-white" onClick={onClick} color={testId === "food" ? "pink" : "purple"}>
              <Text className="mt-1 text-lg">{"˟˖﹡START﹡˖˟"}</Text>
            </Button>
          </Box>
        </Flex>
      </LayoutBasic>
    </>
  )
}

export default TestPage
