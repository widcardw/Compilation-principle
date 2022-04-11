export default (ch: string): boolean => {
    let len = ch.length;
    if (len !== 1) {
        throw new Error("More than one chars passed into function isNumber!")
    }
    let char = ch.charAt(0)
    return (char >= '0' && char <= '9');
}