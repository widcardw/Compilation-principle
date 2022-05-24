import type { Law } from './static'
import { EMPTY, END } from './static'

const getPredictiveTable = (terminators: string[], nonTerminators: string[], laws: Law[], selectSets: Record<string, string[]>) => {
  const inputSymbols = terminators.filter(t => t !== EMPTY).concat(END)
  // 初始化第一行
  const predictiveTable: Array<Array<string | Array<string | Law>>> = [['预测分析表', ...inputSymbols]]
  for (const n of nonTerminators) {
    // 初始化第一格，为非终结符
    const t: Array<string | Array<string | Law>> = [n]
    // 获取产生式左边为该非终结符的产生式
    const filtered_laws = laws.filter(law => law.left === n)
    // 如果该非终结符没有产生式，则该单元格为空
    if (filtered_laws.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of inputSymbols)
        t.push('')
      continue
    }
    // 对于每一个输入符号
    for (const i of inputSymbols) {
      let flag = false
      const cell: Array<string | Law> = []
      for (const law of filtered_laws) {
        const s = selectSets[JSON.stringify(law)]
        if (s.includes(i)) {
          cell.push(law)
          flag = true
        }
      }
      if (!flag)
        t.push('')
      else
        t.push(cell)
    }
    predictiveTable.push(t)
  }
  return predictiveTable
}

export default getPredictiveTable
