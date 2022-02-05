import clsx from "clsx";
import React, {forwardRef, memo, Ref, RefObject, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type DividerProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: Ref<HTMLDivElement>
}

export const Divider: React.FunctionComponent<DividerProps> = memo(forwardRef<HTMLDivElement, DividerProps>(({
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx("flex flex-row justify-center w-full h-[1px]", rest.className)
  ),[rest.className])

  return (
    <div ref={ref} className={className}>
      <div className="flex-1 h-[1px] bg-neutral-200 dark:bg-neutral-800"/>
    </div>
  )
}))

Divider.displayName = "Divider";