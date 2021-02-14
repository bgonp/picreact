import { FC } from 'react'

import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/icons.module.css'

type Props = {
  color?: HexColor
}

const ShareIcon: FC<Props> = ({ color = COLORS.DARK }) => (
  <svg
    className={styles.icon}
    height={507.45}
    viewBox="0 0 507.45 507.45"
    width={507.45}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M408 178.5c-20.4 0-38.25 7.65-51 20.4L175.95 94.35c2.55-5.1 2.55-12.75 2.55-17.85C178.5 33.15 145.35 0 102 0S25.5 33.15 25.5 76.5 58.65 153 102 153c20.4 0 38.25-7.65 51-20.4l181.05 104.55c-2.55 5.1-2.55 12.75-2.55 17.85 0 5.1 0 12.75 2.55 17.85L153 379.95c-12.75-12.75-30.6-20.4-51-20.4-40.8 0-73.95 33.15-73.95 73.95S61.2 507.45 102 507.45s73.95-33.15 73.95-73.95c0-5.1 0-10.2-2.55-17.85l181.05-107.1c12.75 12.75 30.6 20.4 51 20.4 43.35 0 76.5-33.15 76.5-76.5S451.35 178.5 408 178.5z"
      fill={`${color}`}
    />
  </svg>
)

export default ShareIcon
