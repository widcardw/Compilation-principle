import LexicalResult from "../LexicalResult";
import Token from "../static/Token";

const processMultiLineComment = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    }
    if (str.charAt(pr.strIndex) === '/' && str.charAt(pr.strIndex + 1) === '*') {
        pr.value += '/*';
        pr.strIndex += 2;
        let ch = str.charAt(pr.strIndex);
        while (true) {
            if (ch === '*' && str.charAt(pr.strIndex + 1) === '/') {
                pr.value += '*/';
                pr.strIndex += 2;
                pr.type = Token.MULTILINE_COMMENT;
                break;
            } else if (pr.strIndex >= str.length) {
                pr.type = Token.MULTILINE_COMMENT;
                break;
            } else {
                pr.value += ch;
                pr.strIndex++;
                ch = str.charAt(pr.strIndex);
            }
        }
    }
    return pr;
}

export default processMultiLineComment