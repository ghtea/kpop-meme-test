import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type ChipProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: Ref<HTMLDivElement>
}

export const Chip: React.FunctionComponent<ChipProps> = memo(forwardRef<HTMLDivElement, ChipProps>(({
  children,
  onClick,
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge( 
    clsx("py-1 px-3 bg-zinc-100 dark:bg-zinc-900 rounded-full"), rest.className, clsx(onClick && "cursor-pointer")
  ),[rest.className, onClick])

  return (
    <div ref={ref}  {...rest} className={className}>
      {typeof children === "string"
        ? <span className="text-indigo-600 dark:text-indigo-500">{children}</span>
        : children
      }
    </div>
  )
}))

Chip.displayName = "Chip";