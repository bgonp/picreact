export const getHelpStatus = (target: number[], current: number[]): boolean[] => {
  const result: boolean[] = new Array(target.length).fill(false)
  if (current.length > target.length) return result

  const proposal = [...current]

  const indexes = [...target.keys()]
  for (const i of indexes) {
    if (target[i] !== proposal[0]) break
    proposal.shift()
    result[i] = true
    if (proposal.length === 0) return result
  }

  indexes.reverse()
  for (const i of indexes) {
    if (target[i] !== proposal[proposal.length - 1]) break
    proposal.pop()
    result[i] = true
    if (proposal.length === 0) return result
  }

  return result
}
