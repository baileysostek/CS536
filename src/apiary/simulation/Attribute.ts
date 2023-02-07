import { GLSLPrimativeType } from "./GLSLPrimativeTypes";

export class Attribute{
  name : string;
  type : GLSLPrimativeType;

  constructor(name : string, type : GLSLPrimativeType){
    this.name = name;
    this.type = type;
  }
}