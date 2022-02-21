import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type TextProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
  appearance?: "default" | "hint" | "disabled"
  ref?: Ref<HTMLSpanElement>
}

export const Text: React.FunctionComponent<TextProps> = memo(forwardRef<HTMLSpanElement, TextProps>(({
  appearance = "default",
  ...rest
}, ref) => {
  const appearanceClassName = useMemo(()=>{
    if (appearance === "disabled"){
      return clsx("text-zinc-300 dark:text-zinc-500")
    } else if (appearance === "hint"){
      return clsx("text-zinc-500 dark:text-zinc-400")
    } else {
      return clsx("text-zinc-900 dark:text-zinc-300")
    }
  },[appearance])

  const className = useMemo(()=>twMerge(
    clsx(appearanceClassName, "w-auto text-center whitespace-pre-wrap"
    ), rest.className
  ),[rest.className, appearanceClassName])

  return (
    <span ref={ref} {...rest} className={className}/>
  )
}))

Text.displayName = "Text";