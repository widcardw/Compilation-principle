import type { Law } from './static'
import { EMPTY, END } from './static'

const getFollowOneLoop = (
  terminators: string[],
  nonTerminators: string[],
  laws: Law[],
  firstSets: Record<string, string[]>,
  followSets: Record<string, string[]>,
): boolean => {
  // debugger
  let flag = false
  for (const law of laws) {
    const right = law.right
    for (let i = 0; i < right.length - 1; i++) {
      // 如果存在产生式 A -> αBβ，那么 first(β) 中除空串外都在 follow(B) 中
      const B = right[i]
      if (!nonTerminators.includes(B))
        continue
      for (let j = i + 1; j < right.length; j++) {
        const partial_beta = right[j]
        for (const el of firstSets[partial_beta]) {
          if (el !== EMPTY && !followSets[B].includes(el)) {
            followSets[B].push(el)
            flag = true
          }
        }
        if (!firstSets[partial_beta].includes(EMPTY))
          break
      }
    }
    // 如果存在一个产生式规则 A -> αB
    // 或存在产生式规则 A -> αBβ，那么 first(β) 且 first(β) 包含空串
    // 那么 follow(A) 中所有符号都在 follow(B) 中
    const A = law.left
    let B = law.right[law.right.length - 1]
    if (nonTerminators.includes(B)) {
      for (const el of followSets[A]) {
        if (!followSets[B].includes(el)) {
          followSets[B].push(el)
          flag = true
        }
      }
    }

    for (let i = 0; i < right.length - 1; i++) {
      B = right[i]
      if (!nonTerminators.includes(B))
        continue
      let can_deduce_empty = true
      for (let j = i + 1; j < right.length; j++) {
        const partial_beta = right[j]
        if (!firstSets[partial_beta].includes(EMPTY)) {
          can_deduce_empty = false
          break
        }
      }
      if (can_deduce_empty) {
        for (const el of followSets[A]) {
          if (!followSets[B].includes(el)) {
            followSets[B].push(el)
            flag = true
          }
        }
      }
    }
  }
  return flag
}

const findGrammaStart = (nonTerminators: string[], laws: Law[]) => {
  for (const x of nonTerminators) {
    let flag = true
    for (const law of laws) {
      if (law.right.includes(x))
        flag = false
    }
    if (flag)
      return x
  }
  return null
}

const getFollowSets = (terminators: string[], nonTerminators: string[], laws: Law[], firstSets: Record<string, string[]>) => {
  const followSets: Record<string, string[]> = {}
  for (const t of terminators)
    followSets[t] = []
  for (const n of nonTerminators)
    followSets[n] = []
  let s = findGrammaStart(nonTerminators, laws)
  if (!s)
    s = nonTerminators[0]
    // throw new Error('No start symbol!')

  // 将结束符放入 follow(s)
  followSets[s].push(END)
  let flag = true
  do
    flag = getFollowOneLoop(terminators, nonTerminators, laws, firstSets, followSets)
  while (flag)
  return followSets
}

export default getFollowSets
