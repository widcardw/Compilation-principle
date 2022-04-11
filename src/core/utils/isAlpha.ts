export default (ch: string): boolean => {
    let len = ch.length
    if (len !== 1) {
        throw new Error("More than one chars passed into function isAlpha!")
    }
    let char = ch.charAt(0)
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}