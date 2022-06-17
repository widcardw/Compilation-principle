export default (ch: string): boolean => {
  const len = ch.length
  if (len !== 1)
    throw new Error('More than one chars passed into function isAlpha!')

  const char = ch.charCodeAt(0)
  return char >= 0x4E00 && char <= 0x9FA5
}
