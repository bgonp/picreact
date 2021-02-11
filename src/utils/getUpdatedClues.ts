import { CellState, Clue } from 'models/Puzzle'

const getLineState = (line: CellState[]): { left: number[]; right: number[] } => {
  const left: number[] = []
  const right: number[] = []

  const indexes = [...Array(line.length).keys()]
  let counter = 0
  let leftChecked = false

  while (indexes.length > 0) {
    const index = indexes[leftChecked ? 'pop' : 'shift']() as number
    if (line[index] === CellState.Filled) {
      counter++
    } else {
      if (counter > 0) {
        ;(leftChecked ? right : left).push(counter)
        counter = 0
      }
      if (line[index] === CellState.Empty) {
        if (leftChecked) break
        leftChecked = true
      }
    }
  }

  return { left, right }
}

export const getUpdatedClues = (clues: Clue[], line: CellState[]): Clue[] => {
  const { left, right } = getLineState(line)
  const result = clues.map(({ value }) => ({ value, solved: false }))

  if (left.length + right.length > result.length) return result

  for (const i of left.keys()) {
    if (left[i] !== result[i].value) break
    result[i].solved = true
  }

  for (const i of right.keys()) {
    if (right[i] !== result[result.length - i - 1].value) break
    result[result.length - i - 1].solved = true
  }

  return result
}
