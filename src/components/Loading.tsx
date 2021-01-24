import { FC } from 'react'

import styles from 'styles/components/Loading.module.css'

const Loading: FC = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
  </div>
)

export default Loading
