import { FC, Suspense } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Loading from 'components/Loading'

import styles from 'styles/components/Wrapper.module.css'

const Wrapper: FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default Wrapper
