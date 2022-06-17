import type LexicalResult from '../LexicalResult'
import Token from '../static/Token'

const processChar = (str: string, strIndex: number): LexicalResult => {
  const pr: LexicalResult = {
    value: '',
    strIndex,
    type: Token.NONE,
  }
  if (str.charAt(pr.strIndex) === '\'') {
    pr.value += str.charAt(pr.strIndex)
    pr.strIndex++
    let ch = str.charAt(pr.strIndex)
    while (pr.strIndex < str.length && ch !== '\'') {
      pr.value += ch
      pr.strIndex++
      ch = str.charAt(pr.strIndex)
    }
    if (ch === '\'') {
      pr.value += ch
      pr.strIndex++
      pr.type = Token.CHAR
    }
  }
  return pr
}

export default processChar
