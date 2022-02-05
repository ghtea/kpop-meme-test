import type {NextPage} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {useCallback} from "react"
import {Box, Flex, Image} from "components/atoms"
import {LayoutBasic} from "components/templates/LayoutBasic"

const FoodPage: NextPage = () => {
  const router = useRouter()

  const onClick = useCallback(()=>{
    router.push("/food/questions?no=1")
  },[router])

  return (
    <LayoutBasic>
      <Flex className="justify-center h-full">
        <Box onClick={onClick} className="mr-2 cursor-pointer">
          <Image alt={"food-start"} src={"/food/start.png"} width={375} height={545}/>
        </Box>
      </Flex>
    </LayoutBasic>
  )
}

export default FoodPage
