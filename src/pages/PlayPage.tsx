import { FC, useContext } from 'react'

import Board from 'components/Board'
import { MainContext } from 'contexts/MainContext'
import { createPuzzle } from 'utils/puzzleGenerator'
import Header from 'components/Header'
import Footer from 'components/Footer'

const PlayPage: FC<{}> = () => {
  const { puzzle, setPuzzle } = useContext(MainContext)

  if (!puzzle) return <button onClick={() => setPuzzle(createPuzzle(10))}>JUGAR!</button>

  return (
    <div id="play-page">
      <Header />
      <Board puzzle={puzzle} />
      <Footer />
    </div>
  )
}

export default PlayPage
