import type {NextPage, GetStaticProps, GetStaticPaths} from "next"
import {NextSeo} from "next-seo";
import {useRouter} from "next/router"
import {useCallback, useMemo} from "react"
import {Box, Flex, Image, Button, Text} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"
import {WEBSITE_TITLE} from "pages/_app"

type TestPageProps = {
  testId: string
}

const TestPage: NextPage<TestPageProps> = ({
  testId
}) => {
  const router = useRouter()

  const onClick = useCallback(()=>{
    testId && router.push(`/tests/${testId}/questions?no=1`)
  },[router, testId])

  const ogImgUrl = useMemo(()=>{
    return testId === "food" 
      ? "https://res.cloudinary.com/de1xj1rhy/image/upload/v1645698419/kpop-meme-test/og-food-start_jsgr1x.png"
      : "https://res.cloudinary.com/de1xj1rhy/image/upload/v1645698420/kpop-meme-test/og-knowledge-start_ovmyiy.png" 
  },[testId])

  const ogDescription = useMemo(()=>{
    if (testId === "food"){
      return "[음식편] 나는 아이돌 음식에 얼마나 진심일까..?"
    } else {
      return "[지식편] 케이팝 하시는 분들 모여주세요."
    }
  },[testId])

  const pageTitle = useMemo(()=>{
    if (testId === "food"){
      return `${WEBSITE_TITLE} - 음식편`
    } else {
      return `${WEBSITE_TITLE} - 지식편`
    }
  },[testId])

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={ogDescription}
        openGraph={{
          title: WEBSITE_TITLE,
          images: [
            {
              url: ogImgUrl,
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{params: {testId: "food"}}, {params: {testId: "knowledge"}}],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  const testId = context?.params?.testId || ""

  return {
    props: {
      testId: testId === "food" ? "food" : "knowledge"
    },
  }
}

export default TestPage
