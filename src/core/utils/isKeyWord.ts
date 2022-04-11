import KeyWords from "../lexical_analysis/static/KeyWords";

export default (word: string): boolean => {
    return KeyWords.has(word);
}