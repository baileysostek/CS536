import { LexerStateStart } from "./LexerStateStart";
import { TokenType } from "./TokenType";

export class LexerStateStartAndEnd extends LexerStateStart {
  constructor(name: string, token_type?: TokenType) {
    super(name, token_type);
  }
}
