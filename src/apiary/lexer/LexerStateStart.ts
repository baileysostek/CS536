import { LexerState } from "./LexerState";
import { TokenType } from "./TokenType";

export class LexerStateStart extends LexerState{
  constructor(name : string, token_type ?: TokenType){
    super(name, token_type);
  }
}