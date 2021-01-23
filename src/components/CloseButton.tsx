import { FC } from 'react'

import Button from 'components/Button'
import { CrossIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'

type Props = {
  disabled?: boolean
  primary?: boolean
  secondary?: boolean
  outlined?: boolean
  onClick: () => void
}

const CloseButton: FC<Props> = ({
  disabled = false,
  primary = false,
  secondary = false,
  outlined = false,
  onClick,
}) => {
  return (
    <Button
      asIcon
      disabled={disabled}
      primary={primary}
      secondary={secondary}
      outlined={outlined}
      onClick={onClick}
    >
      <CrossIcon color={primary || secondary ? COLORS.WHITE : COLORS.DARK} />
    </Button>
  )
}

export default CloseButton
