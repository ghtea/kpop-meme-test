import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type FlexProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: Ref<HTMLDivElement>
}

export const Flex: React.FunctionComponent<FlexProps> = memo(forwardRef<HTMLDivElement, FlexProps>(({
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx("flex flex-col justify-start items-center w-full"), rest.className
  ),[rest.className])

  return (
    <div ref={ref} {...rest} className={className}/>
  )
}))

Flex.displayName = "Flex";

