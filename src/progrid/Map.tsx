import { Cell } from "./Cell";

export class Map {
  readonly width: number;
  readonly height: number;

  readonly grid: Array<Cell>;

  constructor(width: number, height: number) {
    // Constructor specifies our width and height.
    this.width = width;
    this.height = height;

    // Setup our grid to be an empty grid of size width * height
    this.grid = new Array<Cell>(this.width * this.height);
  }

  build() {
    console.log("Build Save for this map", {});
  }
}
