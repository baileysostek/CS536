import { Map } from "./progrid/Map";

export function drunkardsWalk(map:Map, width, height, steps){
    const mapVals = []
    // initialize with walls
    for(let i=0; i < width; i++){
        mapVals[i] = new Array(height).fill(1);
    }
    // walk start at the center
    let currentX = Math.floor(width/2); 
    let currentY = Math.floor(height/2); 
    // walk for the designated number of steps
    for(let i=0; i < steps; i++){
        mapVals[currentX][currentY] = 0;
        let randDirection = Math.floor(Math.random() * 4);
        console.log(randDirection);
        switch(randDirection) {
            case 0:
                if(currentX < width-1){currentX++;}                
                break;
            case 1:
                if(currentX > 0){currentX--;} 
                break;
            case 2:
                if(currentY < height-1){currentY++;} 
                break;
            case 3:
                if(currentY > 0){currentY--;} 
                break;
            default:
                break;
          }
    }
    //console.log(mapVals);
    return mapVals;
}
