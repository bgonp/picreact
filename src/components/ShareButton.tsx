import { FC } from 'react'

import Button from 'components/Button'
import { ShareIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { ROUTES } from 'constants/router.constants'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { createUrl } from 'utils/createUrl'
import { encodePuzzle } from 'utils/puzzleEncoder'
import { share } from 'utils/share'

type Props = {
  disabled?: boolean
  white?: boolean
}

const ShareButton: FC<Props> = ({ disabled = false, white = false }) => {
  const { notice } = useContext(ModalContext)
  const { puzzle } = useContext(PuzzleContext)

  const handleShare = () => {
    const code = encodePuzzle(puzzle)
    const url = createUrl(ROUTES.LOAD, { code })
    share(url, notice)
  }

  return (
    <Button
      asIcon
      disabled={disabled}
      primary={!white}
      onClick={handleShare}
      title="Share"
    >
      <ShareIcon color={white ? COLORS.FIRST : COLORS.WHITE} />
    </Button>
  )
}

export default ShareButton
