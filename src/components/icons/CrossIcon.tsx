import { FC } from 'react'

type Props = {
  mainClassName?: string
  iconClassName?: string
}

const CrossIcon: FC<Props> = ({ mainClassName, iconClassName }) => (
  <svg
    className={mainClassName}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox={`0 0 24 24`}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        className={iconClassName}
        fill="#444"
        d="M12.5 10.44L7.06 5 5 7.06l5.44 5.44L5 17.94 7.06 20l5.44-5.44L17.94 20 20 17.94l-5.44-5.44L20 7.06 17.94 5z"
      />
    </g>
  </svg>
)

export default CrossIcon
