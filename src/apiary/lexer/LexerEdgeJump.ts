import { LexerEdge } from "./LexerEdge";
import { LexerState } from "./LexerState";

export class LexerEdgeJump extends LexerEdge{
  constructor( regex : RegExp , destinationState : LexerState ){
    super(regex, destinationState);
  }
}