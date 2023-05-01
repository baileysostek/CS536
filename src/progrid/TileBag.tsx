
export class TileBag{

  readonly bag : Array<number>;

  constructor( ...contents){
    this.bag = [];
    for(let content of contents){
      for(let sub_content of content){
        this.add(sub_content);
      }
    }
  }

  add (content : number) {
    this.bag.push(content);
  }

  get (index : number) : number {
    return this.bag[Math.floor(index * this.bag.length)];
  }
}