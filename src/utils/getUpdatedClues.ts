import { CellState, Clue } from 'models/Puzzle'

const getLineGroups = (line: CellState[]): number[] => {
  let counter = 0
  const groups = line.reduce((acc, cell) => {
    if (cell === CellState.Filled) {
      counter++
    } else if (counter) {
      acc.push(counter)
      counter = 0
    }
    return acc
  }, [] as number[])

  return counter ? groups.concat(counter) : groups
}

const getLineBounds = (line: CellState[]): { left: number[]; right: number[] } => {
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

  if (counter) (leftChecked ? right : left).push(counter)

  return { left, right }
}

export const getUpdatedClues = (clues: Clue[], line: CellState[]): Clue[] => {
  const allFalse = clues.map(({ value }) => ({ value, solved: false }))
  const allTrue = clues.map(({ value }) => ({ value, solved: true }))

  const filledCount = line.filter((cell) => cell === CellState.Filled).length
  const cluesSum = clues.reduce((acc, clue) => acc + clue.value, 0)
  if (cluesSum === 0) return filledCount === 0 ? allTrue : allFalse
  if (filledCount > cluesSum) return allFalse

  const groups = getLineGroups(line)
  if (groups.length > clues.length) return allFalse
  if (clues.every(({ value }, i) => value === groups[i])) return allTrue

  const { left, right } = getLineBounds(line)
  for (const i of left.keys()) {
    if (left[i] !== clues[i].value) break
    allFalse[i].solved = true
  }
  for (const i of right.keys()) {
    if (right[i] !== clues[clues.length - i - 1].value) break
    allFalse[clues.length - i - 1].solved = true
  }

  return allFalse
}
