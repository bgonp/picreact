import { useContext, useMemo } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  ROUTE_CREATE,
  ROUTE_LOAD,
  ROUTE_PLAY,
  ROUTE_ROOT,
} from 'constants/router.constants'
import { MainContext } from 'contexts/MainContext'
import { createPuzzle } from 'utils/puzzleGenerator'

const Header = () => {
  const { code, setFinished, setPuzzle } = useContext(MainContext)

  const shareUrl = useMemo<string>(
    () => ROUTE_ROOT + generatePath(ROUTE_LOAD, { code }),
    [code]
  )

  return (
    <div id="header">
      <Link to={ROUTE_PLAY}>PLAY</Link>
      <Link to={ROUTE_CREATE}>CREATE</Link>
      <button onClick={() => setPuzzle(createPuzzle(10))}>NUEVO</button>
      <button onClick={() => setFinished(true)}>RESOLVER</button>
      <CopyToClipboard text={shareUrl}>
        <button>COPY LINK</button>
      </CopyToClipboard>
    </div>
  )
}

export default Header
