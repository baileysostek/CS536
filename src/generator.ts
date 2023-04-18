import { Map } from "./progrid/Map";

export function drunkardsWalk(map:Map, steps:number, fill_tile : number){
    // takes in a Map with all 1s
    let newMap = map;
    
    // walk start at the center
    let currentX = Math.floor(map.width/2); 
    let currentY = Math.floor(map.height/2); 

    // walk for the designated number of steps
    for(let i=0; i < steps; i++){
        // Set current tile to 0
        newMap.setTile(currentX, currentY, fill_tile);
        // Step in a random cardinal dirrection
        let randDirection = Math.floor(Math.random() * 4);
        console.log(randDirection);
        switch(randDirection) {
            case 0:
                if(newMap.xyOnMap(currentX+1, currentY)){currentX++;}            
                break;
            case 1:
                if(newMap.xyOnMap(currentX-1, currentY)){currentX--;}
                break;
            case 2:
                if(newMap.xyOnMap(currentX, currentY+1)){currentY++;}
                break;
            case 3:
                if(newMap.xyOnMap(currentX, currentY-1)){currentY--;}
                break;
            default:
                break;
          }
    }
    
    return newMap;
}


