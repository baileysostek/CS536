import { LexerState } from "./LexerState";

export class LexerEdge {
  readonly regex: RegExp;
  readonly destinationState: LexerState;

  constructor(regex: RegExp, destination_state: LexerState) {
    this.regex = regex;
    this.destinationState = destination_state;
  }
}
