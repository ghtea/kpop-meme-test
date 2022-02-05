import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type CardProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: Ref<HTMLDivElement>
}

export const Card: React.FunctionComponent<CardProps> = memo(forwardRef<HTMLDivElement, CardProps>(({
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx("flex flex-col items-center p-4 w-auto bg-white dark:bg-[#070708] rounded-md border border-zinc-100 dark:border-zinc-900 border-solid"), rest.className
  ),[rest.className])

  return (
    <div ref={ref} {...rest} className={className}/>
  )
}))

Card.displayName = "Card";