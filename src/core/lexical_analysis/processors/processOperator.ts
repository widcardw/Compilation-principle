import LexicalResult from "../LexicalResult";
import Token from "../static/Token";

const operators = new Set([
    '+', "-", "*", "/", "%", "=", "<", ">", "!", "&", "|", "^", "~", "?", ":"
])

const processOperator = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.UNKNOWN
    };
    let ch = str.charAt(strIndex);
    if (operators.has(ch)) {
        pr.value = ch;
        pr.strIndex++;
        pr.type = Token.OPERATOR;
    }
    return pr;
}

export default processOperator