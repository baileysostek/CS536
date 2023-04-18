import { LexerEdge } from "./LexerEdge";
import { LexerEdgeWithStateChange } from "./LexerEdgeWithStateChange";
import { LexerEdgeJump } from "./LexerEdgeJump";
import { LexerEdgeJumpWithReturn } from "./LexerEdgeJumpWithReturn";
import { LexerStateStart } from "./LexerStateStart";
import { TokenType } from "./TokenType";
import { Token } from "./Token";

export class LexerState{
  readonly name: string;
  readonly edges: Array<LexerEdge> = [];

  private token_type : TokenType = TokenType.UNDEFINED;

  private fail_callback : (accumulator : String) => boolean;

  constructor(name : string, token_type ?: TokenType){
    this.name = name;
    if(token_type){
      this.token_type = token_type;
    }
  }

  addEdge (regex : RegExp, destination : LexerState) : void {
    this.edges.push(new LexerEdge(regex, destination));
  }

  addEdgeWithStateChange (regex : RegExp, destination : LexerState, token_type : TokenType) : void {
    this.edges.push(new LexerEdgeWithStateChange(regex, destination, token_type));
  }

  jump(start : LexerStateStart) : void {
    for(let edge of start.edges){
      this.edges.push(new LexerEdgeJump(edge.regex, edge.destinationState));
    }
  }

  jumpWithReturn(start : LexerStateStart, return_state : LexerState) : void {
    for(let edge of start.edges){
      this.edges.push(new LexerEdgeJumpWithReturn(edge.regex, edge.destinationState, return_state));
    }
  }

  getTokenType(): TokenType{
    return this.token_type;
  }

  onFailure(accumulator : String) : boolean{
    if(this.fail_callback){
      return this.fail_callback(accumulator);
    }
    return false;
  }

  setFailCallback(fail_callback : (accumulator : String) => boolean){
    this.fail_callback = fail_callback;
  }
}