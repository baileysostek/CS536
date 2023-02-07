import { LexerState } from "./LexerState";
import { TokenType } from "./TokenType";

export class LexerStateEnd extends LexerState{
  constructor(name : string, token_type ?: TokenType){
    super(name, token_type);
  }
}