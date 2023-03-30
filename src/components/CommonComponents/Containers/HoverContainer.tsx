import { ReactChild } from 'react'

interface IProps {
  children?: ReactChild | ReactChild[] | Element | Element[]
}

export const HoverContainer = (props: IProps) => {
  return (
    <div className="hover-container">
      {props.children}
    </div>
  )
}