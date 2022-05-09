import type { Law } from './static'
import { EMPTY, END } from './static'

const getPredictiveTable = (terminators: string[], nonTerminators: string[], laws: Law[], selectSets: Record<string, string[]>) => {
  const inputSymbols = terminators.filter(t => t !== EMPTY).concat(END)
  const predictiveTable: Array<Array<string | Law>> = [['预测分析表', ...inputSymbols]]
  for (const n of nonTerminators) {
    const t: Array<string | Law> = [n]
    const filtered_laws = laws.filter(law => law.left === n)
    if (filtered_laws.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of inputSymbols)
        t.push('')
      continue
    }
    for (const i of inputSymbols) {
      let flag = false
      for (const law of filtered_laws) {
        const s = selectSets[JSON.stringify(law)]
        if (s.includes(i)) {
          t.push(law)
          flag = true
        }
      }
      if (!flag)
        t.push('')
    }
    predictiveTable.push(t)
  }
  return predictiveTable
}

export default getPredictiveTable
