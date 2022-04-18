import LexicalResult from "../LexicalResult";
import Token from "../static/Token";
import { BOUNDARIES } from "../static/sets";


const processBoundary = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    }
    let ch = str.charAt(pr.strIndex)
    if (BOUNDARIES.has(ch)) {
        pr.value += ch;
        pr.strIndex++;
        pr.type = Token.BOUNDARY;
    }
    return pr;
}

export default processBoundary