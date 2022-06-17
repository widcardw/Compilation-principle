export default (ch: string): boolean => {
  const len = ch.length
  if (len !== 1)
    throw new Error('More than one chars passed into function isNumber!')

  const char = ch.charAt(0)
  return (char >= '0' && char <= '9')
}
