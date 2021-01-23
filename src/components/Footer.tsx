import { FC } from 'react'

import { GitHubIcon } from 'components/icons'
import Button from 'components/Button'
import { COLORS } from 'constants/colors.constants'

import styles from 'styles/components/Footer.module.css'

const Footer: FC = () => (
  <footer className={styles.footer}>
    <Button href="https://github.com/bgonp">
      <GitHubIcon color={COLORS.FIRST} />
      <strong>bgonp</strong>
    </Button>
  </footer>
)

export default Footer
