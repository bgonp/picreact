import copy from 'copy-to-clipboard'

import Button from 'components/Button'
import { ShareIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { ROUTES } from 'constants/router.constants'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { createUrl } from 'utils/createUrl'
import { encodePuzzle } from 'utils/puzzleEncoder'
import { FC } from 'react'

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
    copy(url)
    notice('Puzzle URL copied!')
  }

  return (
    <Button asIcon disabled={disabled} primary={!white} onClick={handleShare}>
      <ShareIcon color={white ? COLORS.FIRST : COLORS.WHITE} />
    </Button>
  )
}

export default ShareButton
