import Token from "./static/Token";

export default interface LexicalResult {
    type: Token;
    value: string;
    strIndex: number;
}