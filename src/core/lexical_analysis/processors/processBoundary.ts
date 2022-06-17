import type LexicalResult from '../LexicalResult'
import Token from '../static/Token'
import { BOUNDARIES } from '../static/sets'

const processBoundary = (str: string, strIndex: number): LexicalResult => {
  const pr: LexicalResult = {
    value: '',
    strIndex,
    type: Token.NONE,
  }
  const ch = str.charAt(pr.strIndex)
  if (BOUNDARIES.has(ch)) {
    pr.value += ch
    pr.strIndex++
    pr.type = Token.BOUNDARY
  }
  return pr
}

export default processBoundary
