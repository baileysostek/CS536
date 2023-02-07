import { Attribute } from "./Attribute";

export class Agent {

  name: string;
  attributes : Array<Attribute>;

  private buffer : Float32Array = new Float32Array();

  // We are going to use SSBOs to represent agents so we need to compute the size of each agent before we can allocate a buffer the size of the agent.
  constructor(name : string, attributes : Array<Attribute> = []){
    this.name = name;
    this.attributes = attributes;

    let size = this.calculateAgentSizeInFloats();
    // this.buffer.set
  }



  public calculateAgentSizeInFloats() : number {
    let size = 0;
    for(let attribute of this.attributes){
      size += attribute.type.size_in_floats;
    }
    return size;
  }
}