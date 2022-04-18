import Token from "../static/Token";
import isAlpha from "../../utils/isAlpha";
import isKeyWord from "../../utils/isKeyWord";
import isNumber from "../../utils/isNumber";
import LexicalResult from "../LexicalResult";

const processorIdentifier = (str: string, strIndex: number): LexicalResult => {
    let pr: LexicalResult = {
        value: "",
        strIndex: strIndex,
        type: Token.NONE
    };
    if (str.charAt(pr.strIndex) === '_' || isAlpha(str.charAt(pr.strIndex))) {
        pr.value += str.charAt(pr.strIndex);
        pr.strIndex++;
        let ch = str.charAt(pr.strIndex);
        while (pr.strIndex < str.length && (isAlpha(ch) || isNumber(ch) || ch === "_")) {
            pr.value += ch;
            pr.strIndex++;
            ch = str.charAt(pr.strIndex);
        }
        if (isKeyWord(pr.value)) {
            pr.type = Token.KEYWORD;
        } else {
            pr.type = Token.IDENTIFIER;
        }
    }
    return pr;
}

export default processorIdentifier;