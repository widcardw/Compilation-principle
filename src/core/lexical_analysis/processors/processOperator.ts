import LexicalResult from "../LexicalResult";
import Token from "../static/Token";
import { OPERATORS } from '../static/sets';


const processOperator = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    };
    let ch = str.charAt(strIndex);
    if (OPERATORS.has(ch)) {
        pr.value = ch;
        pr.strIndex++;
        pr.type = Token.OPERATOR;
    }
    return pr;
}

export default processOperator