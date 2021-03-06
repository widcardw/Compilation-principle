import type LexicalResult from '../LexicalResult'
import { BOUNDARIES, OPERATORS, OTHERS, SPACES } from '../static/sets'
import Token from '../static/Token'

const processError = (str: string, strIndex: number): LexicalResult => {
  const pr: LexicalResult = {
    value: '',
    strIndex,
    type: Token.NONE,
  }
  const endSign: Set<string> = new Set([...BOUNDARIES, ...OPERATORS, ...OTHERS, ...SPACES])
  let ch: string = str.charAt(pr.strIndex)
  while (!endSign.has(ch)) {
    pr.value += ch
    pr.strIndex++
    ch = str.charAt(pr.strIndex)
  }
  pr.type = Token.UNKNOWN
  return pr
}

export default processError
