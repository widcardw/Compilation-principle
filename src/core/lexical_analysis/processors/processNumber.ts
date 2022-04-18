import Token from "../static/Token";
import isNumber from "../../utils/isNumber";
import LexicalResult from "../LexicalResult";

const processNumber = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    }
    let ch = str.charAt(pr.strIndex);
    if (isNumber(ch)) {
        pr.value += ch;
        pr.strIndex++;
        ch = str.charAt(pr.strIndex);
        while (pr.strIndex < str.length && isNumber(ch)) {
            pr.value += ch;
            pr.strIndex++;
            ch = str.charAt(pr.strIndex);
        }
        if (pr.strIndex < str.length) {
            if (ch === '.') {
                pr.value += ch;
                pr.strIndex++;
                ch = str.charAt(pr.strIndex);
                while (pr.strIndex < str.length && isNumber(ch)) {
                    pr.value += ch;
                    pr.strIndex++;
                    ch = str.charAt(pr.strIndex);
                }
            } 
            if (ch === 'E' || ch === 'e') {
                pr.value += ch;
                pr.strIndex++;
                ch = str.charAt(pr.strIndex);
                if (ch === '+' || ch === '-') {
                    pr.value += ch;
                    pr.strIndex++;
                    ch = str.charAt(pr.strIndex);
                }
                if (isNumber(ch)) {
                    pr.value += ch;
                    pr.strIndex++;
                    ch = str.charAt(pr.strIndex);
                    while (pr.strIndex < str.length && isNumber(ch)) {
                        pr.value += ch;
                        pr.strIndex++;
                        ch = str.charAt(pr.strIndex);
                    }
                } else {
                    pr.type = Token.UNKNOWN;
                    return pr;
                }
            }
        }
        pr.type = Token.NUMBER;
    }
    return pr;
}

export default processNumber