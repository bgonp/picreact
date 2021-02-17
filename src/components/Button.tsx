import { FC } from 'react'
import classNames from 'classnames'
import { Link } from 'wouter'

import styles from 'styles/components/Button.module.css'

type Props = {
  asIcon?: boolean
  disabled?: boolean
  href?: string | null
  large?: boolean
  outlined?: boolean
  primary?: boolean
  secondary?: boolean
  title?: string
  to?: string | null
  onClick?: (() => void) | null
}

const Button: FC<Props> = ({
  asIcon = false,
  children,
  disabled = false,
  href = null,
  large = false,
  outlined = false,
  primary = false,
  secondary = false,
  title = '',
  to = null,
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
      <button className={className} type="button" title={title} onClick={onClick}>
        {children}
      </button>
    )

  if (!disabled && to !== null)
    return (
      <Link className={className} href={to} title={title}>
        {children}
      </Link>
    )

  if (!disabled && href !== null)
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        title={title}
      >
        {children}
      </a>
    )

  return (
    <button className={className} title={title} type="button" disabled>
      {children}
    </button>
  )
}

export default Button
