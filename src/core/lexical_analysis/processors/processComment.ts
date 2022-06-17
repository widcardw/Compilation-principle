import type LexicalResult from '../LexicalResult'
import Token from '../static/Token'

const processComment = (str: string, strIndex: number): LexicalResult => {
  const pr: LexicalResult = {
    value: '',
    strIndex,
    type: Token.NONE,
  }
  if (str.charAt(pr.strIndex) === '/' && str.charAt(pr.strIndex + 1) === '/') {
    pr.value += '//'
    pr.strIndex += 2
    let ch = str[pr.strIndex]
    while (pr.strIndex < str.length && ch !== '\n') {
      pr.value += ch
      pr.strIndex++
      ch = str.charAt(pr.strIndex)
    }
    pr.type = Token.COMMENT
  }
  return pr
}

export default processComment
