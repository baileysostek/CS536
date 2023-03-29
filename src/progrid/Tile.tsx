export class Tile{

  // We will put the data needed to represent a cell here. 
  // Image?
  // Layer?
  // Rotation?

  readonly name: string;
  readonly id  : number;

  constructor(name : string, id : number){
    this.name = name;
    this.id = id;
  }
  
}