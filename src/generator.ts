import { Map } from "./progrid/Map";

// Keep an instance of random
import * as random from "random-seed";
let random_instance = random.create();

export function getRandom(){
    return random_instance;
}

export function seedRandom(seed){
    random_instance = random.create(seed);
    return random_instance;
}

export function randomFloat(){
    return random_instance.random();
}

export function randomInt(min, max){
    return random_instance.intBetween(min, max);
}

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
        let randDirection = Math.floor(randomFloat() * 4);
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


