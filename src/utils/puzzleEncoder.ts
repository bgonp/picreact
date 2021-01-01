import { Puzzle, PuzzleType } from 'models/Puzzle'

const OFFSET = 64

const letterToBooleans = (letter: string): boolean[] =>
  (letter.charCodeAt(0) - OFFSET)
    .toString(2)
    .padStart(5, '0')
    .split('')
    .map((boolean) => boolean === '1')

const booleansToLetter = (booleans: boolean[]): string => {
  if (booleans.length !== 5) throw new Error()
  const binary: string = booleans.reduce(
    (acc, boolean) => acc + (boolean ? '1' : '0'),
    ''
  )
  return String.fromCharCode(parseInt(binary, 2) + OFFSET)
}

export const decodePuzzle = (code: string): PuzzleType => {
  const matrix: boolean[][] = []
  const cells: boolean[] = code
    .split('')
    .reduce(
      (puzzle: boolean[], letter: string) => puzzle.concat(letterToBooleans(letter)),
      []
    )
  const size: number = Math.sqrt(cells.length)

  while (cells.length > 0) {
    matrix.push(cells.splice(0, size))
  }

  return new Puzzle(matrix)
}

export const encodePuzzle = (puzzle: PuzzleType): string => {
  let encoded = ''
  for (let column = 0; column < puzzle.size; column++) {
    for (let row = 0; row < puzzle.size; row += 5) {
      encoded += booleansToLetter([
        puzzle.isFilled(column, row),
        puzzle.isFilled(column, row + 1),
        puzzle.isFilled(column, row + 2),
        puzzle.isFilled(column, row + 3),
        puzzle.isFilled(column, row + 4),
      ])
    }
  }
  return encoded
}
