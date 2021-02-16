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
    viewBox="0 0 24 24"
    width={48}
    height={48}
  >
    <path
      d="M5.4 10.91c3.9-3.88 10.23-3.88 14.12.02 1.09 1.09 1.9 2.4 2.39 3.82.21.61-.26 1.25-.91 1.25h-.1c-.42 0-.77-.28-.91-.67a7.93 7.93 0 00-1.88-2.99C15 9.23 9.93 9.22 6.81 12.32l1.97 1.97c.63.63.18 1.71-.71 1.71H3.49c-.55 0-1-.45-1-1v-4.59c0-.89 1.08-1.34 1.71-.71l1.2 1.21z"
      fill={`${color}`}
    />
  </svg>
)

export default UndoIcon
