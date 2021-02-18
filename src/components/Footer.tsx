import { FC } from 'react'

import { GitHubIcon } from 'components/icons'
import Button from 'components/Button'
import { COLORS } from 'constants/colors.constants'
import { URL_HOWTOPLAY, URL_LICENSE, URL_PROJECT } from 'constants/urls.constants'

import styles from 'styles/components/Footer.module.css'

const Footer: FC = () => (
  <footer className={styles.footer}>
    <Button href={URL_PROJECT}>
      <GitHubIcon color={COLORS.FIRST} />
      <strong>by bgonp</strong>
    </Button>
    <a className={styles.license} href={URL_LICENSE} target="_blank" rel="noreferrer">
      GNU General Public License
    </a>
    <Button href={URL_HOWTOPLAY} outlined>
      How to play
    </Button>
  </footer>
)

export default Footer
