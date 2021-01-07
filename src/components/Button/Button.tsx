import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Link } from 'wouter'

import styles from './Button.module.css'

type Props = {
  children: ReactNode
  disabled?: boolean
  href?: string | null
  large?: boolean
  primary?: boolean
  secondary?: boolean
  to?: string | null
  onClick?: (() => void) | null
  white?: boolean
}

const Button: FC<Props> = ({
  children,
  disabled = false,
  href = null,
  large = false,
  primary = false,
  secondary = false,
  to = null,
  onClick = null,
  white = false,
}) => {
  const className = classNames(styles.button, {
    [styles.disabled]: disabled,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.large]: large,
    [styles.white]: white,
  })

  if (!disabled && onClick !== null)
    return (
      <button className={className} type="button" onClick={onClick}>
        {children}
      </button>
    )

  if (!disabled && to !== null)
    return (
      <Link className={className} href={to}>
        {children}
      </Link>
    )

  if (!disabled && href !== null)
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )

  return (
    <button className={className} type="button" disabled>
      {children}
    </button>
  )
}

export default Button
