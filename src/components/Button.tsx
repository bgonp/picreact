import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Link } from 'wouter'

import styles from 'styles/components/Button.module.css'

type Props = {
  children: ReactNode
  href?: string | null
  to?: string | null
  asIcon?: boolean
  disabled?: boolean
  large?: boolean
  primary?: boolean
  secondary?: boolean
  outlined?: boolean
  onClick?: (() => void) | null
}

const Button: FC<Props> = ({
  children,
  href = null,
  to = null,
  asIcon = false,
  disabled = false,
  large = false,
  primary = false,
  secondary = false,
  outlined = false,
  onClick = null,
}) => {
  const className = classNames(styles.button, {
    [styles.asIcon]: asIcon,
    [styles.disabled]: disabled,
    [styles.large]: large,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.outlined]: outlined,
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
      <a className={className} href={href} target="_blank" rel="nofollow noreferrer">
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
