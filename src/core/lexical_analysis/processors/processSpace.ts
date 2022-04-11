import LexicalResult from "../LexicalResult";
import Token from "../static/Token";

const processSpace = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.UNKNOWN
    }
    let ch = str.charAt(pr.strIndex)
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
        pr.value += ch;
        pr.strIndex++;
        pr.type=Token.WHITESPACE;
    }
    return pr;
}

export default processSpace;