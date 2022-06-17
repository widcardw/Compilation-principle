import type LexicalResult from './LexicalResult'
import processBoundary from './processors/processBoundary'
import processChar from './processors/processChar'
import processComment from './processors/processComment'
import processError from './processors/processError'
import processIdentifier from './processors/processIdentifier'
import processMultiLineComment from './processors/processMultiLineComment'
import processNumber from './processors/processNumber'
import processOperator from './processors/processOperator'
import processPreprocessor from './processors/processPreprocessor'
import processSpace from './processors/processSpace'
import processString from './processors/processString'
import Token from './static/Token'

const lexialAnalysisProcess = (str: string): LexicalResult[] => {
  const results: LexicalResult[] = []
  let index = 0
  let res: LexicalResult
  while (index < str.length) {
    debugger
    let flag = false
    res = processSpace(str, index)
    index = res.strIndex
    if (res.type === Token.WHITESPACE) {
      results.push(res)
      flag = true
      continue
    }
    res = processChar(str, index)
    index = res.strIndex
    if (res.type === Token.CHAR) {
      results.push(res)
      flag = true
      continue
    }
    res = processString(str, index)
    index = res.strIndex
    if (res.type === Token.STRING) {
      results.push(res)
      flag = true
      continue
    }
    res = processPreprocessor(str, index)
    index = res.strIndex
    if (res.type === Token.PREPROCESSOR) {
      results.push(res)
      flag = true
      continue
    }
    res = processIdentifier(str, index)
    index = res.strIndex
    if (res.type === Token.IDENTIFIER || res.type === Token.KEYWORD) {
      results.push(res)
      flag = true
      continue
    }
    res = processBoundary(str, index)
    index = res.strIndex
    if (res.type === Token.BOUNDARY) {
      results.push(res)
      flag = true
      continue
    }
    res = processComment(str, index)
    index = res.strIndex
    if (res.type === Token.COMMENT) {
      results.push(res)
      flag = true
      continue
    }
    res = processMultiLineComment(str, index)
    index = res.strIndex
    if (res.type === Token.MULTILINE_COMMENT) {
      results.push(res)
      flag = true
      continue
    }
    res = processOperator(str, index)
    index = res.strIndex
    if (res.type === Token.OPERATOR) {
      results.push(res)
      flag = true
      continue
    }
    res = processNumber(str, index)
    index = res.strIndex
    if (res.type === Token.NUMBER || res.type === Token.UNKNOWN) {
      results.push(res)
      flag = true
      continue
    }
    if (!flag) {
      res = processError(str, index)
      index = res.strIndex
      results.push(res)
    }
  }
  return results
}

export default lexialAnalysisProcess
