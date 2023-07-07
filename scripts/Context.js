import words from "./words.js";
import jaro_winkler from "./jaro_winkler.js";
import EndOfGame from "./EndOfGame.js";

export default class Context {
    constructor(tries) {
        this.tries = tries;
        let index = Math.floor(Math.random() * words.length);
        this.secretWord = words[index];
    }
    play(word) {
        let d = jaro_winkler.distance(this.secretWord, word);
        let obj = { distance: d, endOfGame: EndOfGame.NONE };
        if(d === 1) {
            obj.endOfGame = EndOfGame.WIN;
            return obj;
        }
        this.tries--;
        if (this.tries === 0) {
            obj.secretWord = this.secretWord;
            obj.endOfGame = EndOfGame.LOSE;
        }
        return obj;
    }
}