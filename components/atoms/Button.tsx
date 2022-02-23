import clsx from "clsx";
import React, {forwardRef, memo, Ref, useCallback, useMemo} from "react"
import {twMerge} from "tailwind-merge"

export type ButtonProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
  ref?: Ref<HTMLButtonElement> 
  color?: "purple" | "pink"
  disabled?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  color = "pink",
  disabled = false,
  onClick,
  ...rest
}, ref) => {
  const className = useMemo(()=>twMerge(
    clsx(
      "w-full min-h-[40px] font-[17px] bg-transparent rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.1),inset_0px_4px_4px_rgba(0,0,0,0.25)]",
      "border-none appearance-none"      
    ),
    color === "purple" ? "active:bg-[#CED4F3]" : "active:bg-[#FCBFEB]",
    disabled ? "cursor-default" : "cursor-pointer",
    rest.className
  ),[color, disabled, rest.className])

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event)=>{
    if (disabled) return;
    onClick?.(event)
  }, [disabled, onClick])

  return (
    <button 
      ref={ref} 
      {...rest}
      onClick={handleClick}
      className={className}
    />
  )
}))

Button.displayName = "Button";


