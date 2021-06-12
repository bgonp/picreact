import { Component, ReactNode } from 'react'

import styles from 'styles/components/ErrorBoundary.module.css'

type State = {
  error: Error | null
}

export default class ErrorBoundary extends Component<Record<string, unknown>, State> {
  state = { error: null }

  static getDerivedStateFromError(error: Error): State {
    console.error(error)

    return { error }
  }

  render(): ReactNode {
    if (this.state.error) {
      return <div className={styles.error}>{'An unexpected error occurred'}</div>
    }

    return this.props.children
  }
}
