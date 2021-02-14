import { FC } from 'react'

import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/icons.module.css'

type Props = {
  color?: HexColor
}

const UndoIcon: FC<Props> = ({ color = COLORS.DARK }) => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width={459}
    height={459}
    viewBox="0 0 459 459"
  >
    <path
      d="M178.5 140.25v-102L0 216.75l178.5 178.5V290.7c127.5 0 216.75 40.8 280.5 130.05-25.5-127.5-102-255-280.5-280.5z"
      fill={`${color}`}
    />
  </svg>
)

export default UndoIcon
