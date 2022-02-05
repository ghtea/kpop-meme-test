import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type BoxProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: Ref<HTMLDivElement>
}

export const Box: React.FunctionComponent<BoxProps> = memo(forwardRef<HTMLDivElement, BoxProps>(({
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx("w-auto"), rest.className
  ),[rest.className])

  return (
    <div ref={ref} {...rest} className={className}/>
  )
}))

Box.displayName = "Box";