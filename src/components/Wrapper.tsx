import { FC } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'

import styles from 'styles/components/Wrapper.module.css'

const Wrapper: FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Wrapper
