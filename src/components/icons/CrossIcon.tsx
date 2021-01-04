import { Color } from 'models/Color'
import { FC } from 'react'

type Props = {
  color?: Color
}

const CrossIcon: FC<Props> = ({ color = Color.Black }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox={`0 0 24 24`}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill={color}
          d="M12.5 10.44L7.06 5 5 7.06l5.44 5.44L5 17.94 7.06 20l5.44-5.44L17.94 20 20 17.94l-5.44-5.44L20 7.06 17.94 5z"
        />
      </g>
    </svg>
  )
}

export default CrossIcon
