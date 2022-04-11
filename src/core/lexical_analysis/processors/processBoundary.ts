import LexicalResult from "../LexicalResult";
import Token from "../static/Token";

const boundaries = new Set([
    '(', ')', '[', ']', '{', '}', ',', ';', ':'
])

const processBoundary = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.UNKNOWN
    }
    let ch = str.charAt(pr.strIndex)
    if (boundaries.has(ch)) {
        pr.value += ch;
        pr.strIndex++;
        pr.type = Token.BOUNDARY;
    }
    return pr;
}

export default processBoundary