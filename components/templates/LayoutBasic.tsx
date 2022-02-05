import React from "react"
import {Flex} from "components/atoms"

export const LayoutBasic: React.FunctionComponent = ({
  children
}) => {

  return (
    <Flex className="justify-center w-screen min-h-screen" >
      <Flex className="w-[375px] h-[600px] border border-red-700 border-solid">
        {children}
      </Flex>
    </Flex>
  )
}