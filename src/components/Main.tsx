import { FC } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Router from 'router/Router'

import styles from 'styles/components/Main.module.css'

const Main: FC = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Router />
    </main>
    <Footer />
  </div>
)

export default Main
