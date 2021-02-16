import { FC } from 'react'

import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/icons.module.css'

type Props = {
  color?: HexColor
}

const RefreshIcon: FC<Props> = ({ color = COLORS.DARK }) => (
  <svg
    className={styles.icon}
    height={561}
    viewBox="0 0 561 561"
    width={561}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M280.5 76.5V0l-102 102 102 102v-76.5c84.15 0 153 68.85 153 153 0 25.5-7.65 51-17.85 71.4l38.25 38.25c17.85-33.15 30.6-68.85 30.6-109.65 0-112.2-91.8-204-204-204zm0 357c-84.15 0-153-68.85-153-153 0-25.5 7.65-51 17.85-71.4l-38.25-38.25C89.25 204 76.5 239.7 76.5 280.5c0 112.2 91.8 204 204 204V561l102-102-102-102v76.5z"
      fill={`${color}`}
    />
  </svg>
)

export default RefreshIcon
