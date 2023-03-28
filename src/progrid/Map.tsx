import { Tile } from "./Tile";

export class Map{

  readonly width  : number;
  readonly height : number;

  readonly grid : Array<number>;

  constructor(width : number, height : number){
    // Constructor specifies our width and height.
    this.width = width;
    this.height = height;
    
    // Setup our grid to be an empty grid of size width * height
    this.grid = new Array<number>(this.width * this.height).fill(0);
  }

  setTile(pos_x:number, pos_y:number, id:number) {
    let index = this.xyToIndex(pos_x, pos_y);
    if(this.indexOnMap(index)){
      this.grid[index] = id;
    }
  }

  getTile(pos_x:number, pos_y:number) : number {
    let index = this.xyToIndex(pos_x, pos_y);
    if(this.indexOnMap(index)){
      return this.grid[index];
    }
    return -1;
  }

  xyOnMap(pos_x:number, pos_y:number) : boolean {
    return (pos_x >= 0 && pos_x < this.width) && (pos_y >= 0 && pos_y < this.height);
  }

  indexOnMap(index:number) : boolean {
    if(index < 0 || index >= this.grid.length){
      return false;
    }
    let pos = this.indexToXY(index);
    return this.xyOnMap(pos.pos_x, pos.pos_y);
  }

  xyToIndex(pos_x : number, pos_y : number) : number {
    return (pos_x + (pos_y * this.width));
  }

  indexToXY(index : number) : {pos_x : number, pos_y : number} {
    return {
      pos_x: index % this.width,
      pos_y: Math.floor(index / this.width)
    };
  }

  private serializeGrid():Array<number>{
    let out = new Array<number>(this.width * this.height).fill(0);
    for(let index in this.grid){
      out[index] = this.grid[index]; // TODO replace with .id when this is a tile instead of a number
    }
    return out;
  }

  build(){
    let save_file = { 
      "compressionlevel":-1, // Uncompressed, this is raw data.
      "width":this.width,
      "height":this.height,
      "infinite":false,
      "layers":[
        {
          "id":1,
          "name":"Tile Layer 1",
          "x":0,
          "y":0,
          "width":this.width,
          "height":this.height,
          "data": this.serializeGrid(),
          "type":"tilelayer",
          "opacity":1,
          "visible":true
        }
      ],
      "nextlayerid":2,
      "nextobjectid":1,
      "orientation":"orthogonal",
      "renderorder":"right-down",
      "tiledversion":"1.9.2",
      "tileheight":16,
      "tilesets":[
        {
         "firstgid":1,
         "source":"test.tsx"
        }],
      "tilewidth":16,
      "type":"map",
      "version":"1.9"
    }

    // 
    console.log("Test:", JSON.stringify(save_file));

    return save_file;
  }
}