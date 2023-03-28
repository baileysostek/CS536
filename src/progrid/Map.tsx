import { Cell } from "./Cell";

export class Map{

  readonly width  : number;
  readonly height : number;

  readonly grid : Array<Cell>;

  constructor(width : number, height : number){
    // Constructor specifies our width and height.
    this.width = width;
    this.height = height;

    // Setup our grid to be an empty grid of size width * height
    this.grid = new Array<Cell>(this.width * this.height);
    
  }

  build(){
    let save_file = { 
      "compressionlevel":-1,
      "width":this.width,
      "height":this.height,
      "infinite":false,
      "layers":[
        {
          "data":[
            87, 98,
            87, 85
          ],
          "height":2,
          "id":1,
          "name":"Tile Layer 1",
          "opacity":1,
          "type":"tilelayer",
          "visible":true,
          "width":2,
          "x":0,
          "y":0
        }
      ],
      "nextlayerid":2,
      "nextobjectid":1,
      "orientation":"orthogonal",
      "renderorder":"right-down",
      "tiledversion":"1.9.2",
      "tileheight":5,
      "tilesets":[
        {
         "firstgid":1,
         "source":"test.tsx"
        }],
      "tilewidth":5,
      "type":"map",
      "version":"1.9",
    }
  }
}