export default (ch: string): boolean => {
    let len = ch.length
    if (len !== 1) {
        throw new Error("More than one chars passed into function isAlpha!")
    }
    let char = ch.charCodeAt(0)
    return char >= 0x4e00 && char <= 0x9fa5;
}