import { Clue, Puzzle } from 'models/Puzzle'

const CODE_FIRST_CHAR = 99

const sideSeparator = String.fromCharCode(CODE_FIRST_CHAR - 1)
const lineSeparator = String.fromCharCode(CODE_FIRST_CHAR - 2)

const isValidCode = (code: string): boolean => {
  const sides = code.split(sideSeparator)
  if (sides.length !== 2) return false
  const regex = new RegExp(`${lineSeparator}`, 'g')
  return sides[0].match(regex)?.length === sides[1].match(regex)?.length
}

const encodeSide = (side: Clue[][]): string =>
  side
    .map((line) =>
      line.reduce(
        (acc, clue) => acc + String.fromCharCode(clue.value + CODE_FIRST_CHAR),
        ''
      )
    )
    .join(lineSeparator)

const decodeLine = (code: string): Clue[] =>
  code
    .split('')
    .map((letter) => ({ value: letter.charCodeAt(0) - CODE_FIRST_CHAR, solved: false }))

const decodeSide = (code: string): Clue[][] =>
  code.split(lineSeparator).map((lineCode) => decodeLine(lineCode))

export const encodePuzzle = ({ columns, rows }: Puzzle): string =>
  `${encodeSide(columns)}${sideSeparator}${encodeSide(rows)}`

export const decodePuzzle = (code: string): Clue[][][] => {
  if (!isValidCode(code)) throw new Error('Wrong puzzle code')
  return code.split(sideSeparator).map((side) => decodeSide(side))
}
