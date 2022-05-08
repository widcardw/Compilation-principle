import type { Law, Pair } from './static'

const preProcessLaws = (inputLaws: Pair<string, string>[]) => {
  const realLaws: Law[] = []
  for (const law of inputLaws) {
    const { key, value } = law
    const rights = value.split('|')
    for (let right of rights) {
      right = right.trim()
      realLaws.push({ left: key, right: right.split(' ') })
    }
  }
  return realLaws
}

export default preProcessLaws
