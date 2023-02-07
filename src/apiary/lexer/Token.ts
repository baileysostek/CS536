import { Position } from "../Position"
import { TokenType } from "./TokenType"

export class Token{

  readonly type : TokenType;
  private position: Position;
  readonly value : string;
  private children : Array<Token> = [];

  constructor(type : TokenType, position : Position, value : string){
    this.type = type;
    this.position = position;
    this.value = value;
  }

  addChildren(children : Array<Token>){
    for(let child of children){
      this.addChild(child);
    }
  }

  addChild(child : Token){
    this.children.push(child);
  }

  

}