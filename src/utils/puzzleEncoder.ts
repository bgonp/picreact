import { Clue, Puzzle } from 'models/Puzzle'

const CODE_FIRST_CHAR = 99

const sideSeparator = String.fromCharCode(CODE_FIRST_CHAR - 1)
const lineSeparator = String.fromCharCode(CODE_FIRST_CHAR - 2)

const isValidCode = (code: string): boolean => {
  const sides = code.split(sideSeparator)
  if (sides.length !== 2) return false
  const regex = new RegExp(`${lineSeparator}`, 'g')
  const size = (sides[0].match(regex)?.length || 0) + 1
  if (size - 1 !== sides[1].match(regex)?.length) return false
  return code.split('').every((letter) => {
    const value = letter.charCodeAt(0) - CODE_FIRST_CHAR
    return value >= -2 && value <= size
  })
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
  code.split('').map((letter) => {
    const value = letter.charCodeAt(0) - CODE_FIRST_CHAR
    return { value, solved: value === 0 }
  })

const decodeSide = (code: string): Clue[][] =>
  code.split(lineSeparator).map((lineCode) => decodeLine(lineCode))

export const encodePuzzle = ({ columns, rows }: Puzzle): string =>
  `${encodeSide(columns)}${sideSeparator}${encodeSide(rows)}`

export const decodePuzzle = (code: string): Clue[][][] => {
  if (!isValidCode(code)) throw new Error('Wrong puzzle code')
  return code.split(sideSeparator).map((side) => decodeSide(side))
}
