import { FC, ReactElement } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'

import styles from './Wrapper.module.css'

type Props = {
  children: ReactElement
}

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Wrapper
