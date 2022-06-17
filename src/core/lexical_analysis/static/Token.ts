enum Token {
  CHAR = '字符',
  STRING = '字符串',
  NUMBER = '数字',
  IDENTIFIER = '标识符',
  OPERATOR = '运算符',
  KEYWORD = '关键字',
  WHITESPACE = '空白',
  COMMENT = '注释',
  NONE = '无',
  MULTILINE_COMMENT = '多行注释',
  PREPROCESSOR = '预处理器',
  BOUNDARY = '界限符',
  UNKNOWN = '未知',
}

export default Token
