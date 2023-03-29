import { Map } from "./progrid/Map";

export function drunkardsWalk(width, height, steps){
    const mapVals = new Map(width, height);

    // walk start at the center
    let currentX = Math.floor(width/2); 
    let currentY = Math.floor(height/2); 
    // walk for the designated number of steps
    for(let i=0; i < steps; i++){
        if(mapVals.xyOnMap(currentX, currentY)){
            mapVals.setTile(currentX, currentY, 1);
        }
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


