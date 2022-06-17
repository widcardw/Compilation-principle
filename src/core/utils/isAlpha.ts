export default (ch: string): boolean => {
  const len = ch.length
  if (len !== 1)
    throw new Error('More than one chars passed into function isAlpha!')

  const char = ch.charAt(0)
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}
