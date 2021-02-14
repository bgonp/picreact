import { FC } from 'react'

import { GitHubIcon } from 'components/icons'
import Button from 'components/Button'
import { COLORS } from 'constants/colors.constants'
import { URL_LICENSE, URL_PROJECT } from 'constants/urls.constants'

import styles from 'styles/components/Footer.module.css'

const Footer: FC = () => (
  <footer className={styles.footer}>
    <Button href={URL_PROJECT}>
      <GitHubIcon color={COLORS.FIRST} />
      <strong>by bgonp</strong>
    </Button>
    <Button href={URL_LICENSE} outlined>
      GNU General Public License
    </Button>
  </footer>
)

export default Footer
