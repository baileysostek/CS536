import { LexerEdge } from "./LexerEdge";
import { LexerState } from "./LexerState";
import { TokenType } from "./TokenType";

export class LexerEdgeWithStateChange extends LexerEdge {
  private token_type: TokenType;

  constructor(
    regex: RegExp,
    destination_state: LexerState,
    token_type: TokenType
  ) {
    super(regex, destination_state);
    this.token_type = token_type;
  }

  getTokenType(): TokenType {
    return this.token_type;
  }
}
