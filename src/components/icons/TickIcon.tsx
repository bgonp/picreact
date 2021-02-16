import { FC } from 'react'

import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/icons.module.css'

type Props = {
  color?: HexColor
}

const TickIcon: FC<Props> = ({ color = COLORS.DARK }) => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width={448.8}
    height={448.8}
    viewBox="0 0 448.8 448.8"
  >
    <path
      d="M142.8 323.85L35.7 216.75 0 252.45l142.8 142.8 306-306-35.7-35.7z"
      fill={`${color}`}
    />
  </svg>
)

export default TickIcon
