import Token from './Token'

const ColorMap = new Map<Token, string>()

ColorMap.set(Token.NONE, 'black')
ColorMap.set(Token.BOUNDARY, 'orange')
ColorMap.set(Token.CHAR, 'crimson')
ColorMap.set(Token.STRING, 'crimson')
ColorMap.set(Token.COMMENT, 'grey')
ColorMap.set(Token.MULTILINE_COMMENT, 'lightgrey')
ColorMap.set(Token.UNKNOWN, 'RED')
ColorMap.set(Token.IDENTIFIER, 'blue')
ColorMap.set(Token.KEYWORD, 'darkcyan')
ColorMap.set(Token.NUMBER, 'green')
ColorMap.set(Token.OPERATOR, 'orange')
ColorMap.set(Token.PREPROCESSOR, 'purple')
ColorMap.set(Token.WHITESPACE, 'white')

export default ColorMap
