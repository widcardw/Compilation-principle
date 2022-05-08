import type { Law } from './static'
import { EMPTY } from './static'

const emptyInAllFirstSet = (firstSets: Record<string, string[]>, law: Law, rightIndex: number) => {
  for (let j = 0; j < rightIndex; j++) {
    const yj = law.right[j]
    if (!firstSets[yj].includes(EMPTY))
      return false
  }
  return true
}

const getFirstOneLoop = (terminators: string[], nonTerminators: string[], laws: Law[], firstSets: Record<string, string[]>) => {
  let f = false
  for (const x of nonTerminators) {
    for (const law of laws) {
      // 且 X -> Y1...Yk
      if (x === law.left) {
        for (const a of terminators) {
          // 对于某一个 i
          for (let i = 0; i < law.right.length; i++) {
            const yi = law.right[i]
            // a 在 first(Yi) 中
            if (firstSets[yi].includes(a)) {
              // @empty 在所有的 first(Y1)...first(Yi-1) 中
              const flag = emptyInAllFirstSet(firstSets, law, i)
              // 把 a 加入 first(X) 中
              if (flag && !firstSets[x].includes(a)) {
                firstSets[x].push(a)
                f = true
              }
            }
          }
        }
        if (!firstSets[x].includes(EMPTY) && emptyInAllFirstSet(firstSets, law, law.right.length)) {
          firstSets[x].push(EMPTY)
          f = true
        }
      }
    }
  }
  return f
}

const getFirstSets = (terminators: string[], nonTerminators: string[], laws: Law[]) => {
  const firstSets: Record<string, string[]> = {}
  // 1. 初始化
  for (const nonTerminator of nonTerminators)
    firstSets[nonTerminator] = []
  for (const terminator of terminators)
    firstSets[terminator] = [terminator]
  // debugger
  // 2. 计算
  // 如果 x 为终结符
  let f = true
  do
    f = getFirstOneLoop(terminators, nonTerminators, laws, firstSets)
  while (f)
  /* for (const law of laws) {
    // 2.1. 计算 first(A)
    const { left, right } = law
    const firstSet = firstSets[left]

    // 对于文法右边每个非终结符
    for (const symbol of right) {
      // 2.2. 如果是终结符
      if (terminators.includes(symbol)) {
        // 2.3.1. 将终结符添加到 first(A)
        firstSet.push(symbol)
        break
      }
      // 2.3. 如果是非终结符
      else if (nonTerminators.includes(symbol)) {
        // 2.2.1. 获取 first(A)
        const nextFirstSet = firstSets[symbol]
        // 2.2.2. 合并 first(A)
        for (const nextSymbol of nextFirstSet) {
          if (!firstSet.includes(nextSymbol))
            firstSet.push(nextSymbol)
        }
      }
      else {
        throw new Error(`Unknown symbol: ${symbol}`)
      }
    }
  } */
  return firstSets
}

export default getFirstSets
