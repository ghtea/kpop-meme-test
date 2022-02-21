import clsx from "clsx";
import React, {forwardRef, memo, Ref, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type ButtonProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
  ref?: Ref<HTMLButtonElement> 
  color?: "purple" | "pink"
}

export const Button: React.FunctionComponent<ButtonProps> = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  color = "pink",
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx(
      "w-full min-h-[40px] font-[17px] bg-transparent rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.1),inset_0px_4px_4px_rgba(0,0,0,0.25)]",
      "border-none appearance-none"      
    ),
    color === "purple" ? "active:bg-[#CED4F3]" : "active:bg-[#FCBFEB]",
    rest.className
  ),[color, rest.className])

  return (
    <button ref={ref} {...rest} className={className}/>
  )
}))

Button.displayName = "Button";


