import { Icons } from '../Icons'

export type ImageProps = {
  width?: number | string
  height?: number | string
  className?: string
}

export default function LogoIcon(props: ImageProps) {
  return <Icons.logo />
}
