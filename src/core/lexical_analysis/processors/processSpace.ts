import type LexicalResult from '../LexicalResult'
import Token from '../static/Token'

const processSpace = (str: string, strIndex: number): LexicalResult => {
  const pr: LexicalResult = {
    value: '',
    strIndex,
    type: Token.NONE,
  }
  const ch = str.charAt(pr.strIndex)
  if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
    pr.value += ch
    pr.strIndex++
    pr.type = Token.WHITESPACE
  }
  return pr
}

export default processSpace
