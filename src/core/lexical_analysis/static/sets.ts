export const OPERATORS = new Set<string>([
  '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':',
])

export const BOUNDARIES = new Set<string>([
  '(', ')', '[', ']', '{', '}', ',', ';', ':',
])

export const SPACES = new Set<string>([
  ' ', '\n', '\t', '\r',
])

export const OTHERS = new Set<string>([
  '\\', '#',
])
