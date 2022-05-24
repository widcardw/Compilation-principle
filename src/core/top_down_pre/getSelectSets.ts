import type { Law } from './static'
import { EMPTY } from './static'

const getSelectSets = (
  terminators: string[],
  nonTerminators: string[],
  laws: Law[],
  firstSets: Record<string, string[]>,
  followSets: Record<string, string[]>,
) => {
  const selectSets: Record<string, string[]> = {}
  for (const law of laws) {
    const { left, right } = law
    if (right.length === 0)
      continue

    if (nonTerminators.includes(right[0])) {
      const firstSet = Array.from(firstSets[right[0]])
      selectSets[JSON.stringify(law)] = firstSet
      if (firstSet.includes(EMPTY)) {
        const followSet = Array.from(followSets[right[0]])
        selectSets[JSON.stringify(law)].push(...followSet)
      }
    }
    else if (terminators.includes(right[0])) {
      if (right[0] !== EMPTY)
        selectSets[JSON.stringify(law)] = [right[0]]

      else
        selectSets[JSON.stringify(law)] = followSets[left]
    }
  }
  return selectSets
}

export default getSelectSets
