import SuperconsIcon from "supercons"

export type IconProps = React.ComponentProps<(typeof SuperconsIcon)> & {

}

export const Icon: React.FunctionComponent<IconProps> = () => {
  return (
    <SuperconsIcon/>
  )
}