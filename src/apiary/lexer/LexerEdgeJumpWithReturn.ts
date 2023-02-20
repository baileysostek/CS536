import { LexerEdgeJump } from "./LexerEdgeJump";
import { LexerState } from "./LexerState";

export class LexerEdgeJumpWithReturn extends LexerEdgeJump {
  readonly return_state: LexerState;

  constructor(
    regex: RegExp,
    destination_state: LexerState,
    return_state: LexerState
  ) {
    super(regex, destination_state);
    this.return_state = return_state;
  }
}
