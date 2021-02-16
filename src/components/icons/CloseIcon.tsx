import { FC } from 'react'

import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/icons.module.css'

type Props = {
  color?: HexColor
}

const CloseIcon: FC<Props> = ({ color = COLORS.DARK }) => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={48}
    height={48}
  >
    <path
      d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
      fill={`${color}`}
    />
  </svg>
)

export default CloseIcon
