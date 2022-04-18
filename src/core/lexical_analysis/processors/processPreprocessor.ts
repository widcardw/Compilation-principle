import LexicalResult from "../LexicalResult";
import Token from "../static/Token";

const processPreprocessor = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    }
    if (str.charAt(pr.strIndex) === '#') {
        pr.value += '#';
        pr.strIndex++;
        let ch = str.charAt(pr.strIndex);
        while (pr.strIndex < str.length && ch !== '\n') {
            pr.value += ch;
            pr.strIndex++;
            ch = str.charAt(pr.strIndex);
        }
        pr.type = Token.PREPROCESSOR;
    }
    return pr;
}

export default processPreprocessor;