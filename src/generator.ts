import { debug } from "console";
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

export function maze(map:Map, wall_tile: number, floor_tile: number){
    // initialize Map with all 1s
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            map.setTile(i, j, wall_tile);
        }
    }
    
    // start at a random cell
    const startX = Math.floor(randomFloat() * map.width);
    const startY = Math.floor(randomFloat() * map.height);

    // Add the starting cell to the list of frontier cells
    let frontier = [[startX, startY]];

    while (frontier.length > 0) {
        // Choose a random frontier cell
        const index = Math.floor(randomFloat() * frontier.length);
        const [x, y] = frontier[index];

        // Remove the cell from the frontier list
        frontier.splice(index, 1);

        // Find all neighbors of the cell that are not in the maze yet and add them to the frontier
        const neighbors = [];
        if (x > 1 && map.getTile(x-2, y) === wall_tile) {
            neighbors.push([x - 2, y, x - 1, y]);
            frontier.push([x - 2, y, x - 1, y]);
         }
        if (x < map.width - 2 && map.getTile(x+2, y) === wall_tile) {
            neighbors.push([x + 2, y, x + 1, y]);
            frontier.push([x + 2, y, x + 1, y]);
        }
        if (y > 1 && map.getTile(x, y-2) === wall_tile) {
            neighbors.push([x, y - 2, x, y - 1]);
            frontier.push([x, y - 2, x, y - 1]);
        }
        if (y < map.height - 2 && map.getTile(x, y+2) === wall_tile) {
            neighbors.push([x, y + 2, x, y + 1]);
            frontier.push([x, y + 2, x, y + 1]);
        }

        if (neighbors.length > 0) {
            // Choose a random neighbor to connect to
            const [nx, ny, mx, my] = neighbors[Math.floor(randomFloat() * neighbors.length)];

            // Carve a path between the current cell and the neighbor
            map.setTile(nx, ny, floor_tile);
            map.setTile(mx, my, floor_tile);
        }
    }
    
    return map;
}

function convertNoiseToTiles(map:Map){
    for(let y = 0; y < map.height; y++){
        for(let x = 0; x < map.width; x++){
            let currentHeight = map.getTile(x, y);
            // assign tile based on height data

        }
    }
}

export function cellularAutomata(map:Map, wall_tile: number, floor_tile: number, randomFillPercent: number){
    // randomly fill the map to initialize
        randFill(map, wall_tile, floor_tile, randomFillPercent, true);
    // smooth the map
        for(let i = 0; i < 5; i++){
            for(let x=0; x < map.width; x++){
                for(let y=0; y < map.height; y++){
                    let neighborWallTiles = getSurroundingWallCount(map, x, y, floor_tile);
                    //automota rules
                    if(neighborWallTiles > 4){
                        map.setTile(x, y, wall_tile);
                    }else if(neighborWallTiles < 4){
                        map.setTile(x, y, floor_tile);
                    }
                }
            }
        }

    // return the map
    return map;
}

function getSurroundingWallCount(map:Map, gridX: number, gridY: number, floor_tile: number){
    let wallCount = 0;
    // loop through 3x3 grid of neighbors
    for(let neighborX = gridX-1; neighborX <= gridX +1; neighborX++){
        for(let neighborY = gridY-1; neighborY <= gridY+1; neighborY++){
            // ignore starting tile & out of bounds
            if(neighborX >= 0 && neighborX < map.width && neighborY >= 0 && neighborY < map.height){
                //console.log("in bounds");
                if(neighborX != gridX || neighborY != gridY){
                    //console.log("not the origin");
                    // increment count for each adjacent wall
                    if(map.getTile(neighborX, neighborY) != floor_tile){
                        //console.log("this adjacent wall is not a floor");
                        wallCount++;
                    }else{
                        //console.log("the adjacent wall was a floor");
                    }
                }
            } else{
                // also increment on borders to enourage wall growth
                //console.log("out of bounds");
                wallCount++;
            }
        }
    }

    console.log(wallCount);
    return wallCount;
}

export function randFill(map:Map, wall_tile: number, floor_tile: number, randomFillPercent: number, includeborder: boolean){
    // randomly fill the map to initialize
    for(let x=0; x < map.width; x++){
        for(let y=0; y < map.height; y++){
            let rand = Math.random();
            if(includeborder && (x == 0 || y == 0 || x == map.width - 1 || y == map.height -1)){
                map.setTile(x,y,wall_tile);
            }else if(rand < randomFillPercent){
                map.setTile(x,y,wall_tile);
            }else{
                map.setTile(x,y,floor_tile);
            }
        }
    }
}

export function poissonDistribution(map:Map, placed_tile: number, floor_tile:number, radius: number){
    // take in a map initialized to -1
    // throw darts until you fail too many times
    // a dart hits if it lands on a -1.
    // when a dart hits, it becomes a placed_tile, and tiles within the radius become a floor tile
    let failedToHit = false;
    let throwsBeforeReject = 30;

    while(!failedToHit){
        for(let i = 0; i < throwsBeforeReject; i++){
            let randX = Math.floor(Math.random()*map.width);
            let randY = Math.floor(Math.random()*map.height);
            if(map.getTile(randX, randY) == -1){
                // place an object
                map.setTile(randX, randY, placed_tile);
                // change within range to floor
                for(let x = randX-radius; x < randX+radius; x++){
                    for(let y = randY-radius; y < randY+radius; y++){
                        // if on map & within radius
                        let dx = Math.abs(randX - x);
                        let dy = Math.abs(randY - y);
                        if(map.indexOnMap(map.xyToIndex(x, y)) && dx + dy <= radius && dx <= radius && dy <= radius){
                            // but only if it doesn't overwrite a placed object
                            if(map.getTile(x, y) != placed_tile){
                                map.setTile(x, y, floor_tile);
                            }
                        }
                    }
                }
                if(i == throwsBeforeReject -1){
                    failedToHit = true;
                }
            }
        }
    }

    // change all remaining -1s to floors
    for(let x = 0; x < map.width; x++){
        for(let y = 0; y < map.height; y++){
            if(map.getTile(x, y) == -1){
                map.setTile(x, y, floor_tile);
            }
        }
    }

    return map;
}

export function mapOverride(map1:Map, tileToReplace: number, map2:Map){
    for(let x=0; x < map1.width; x++){
        for(let y=0; y < map1.height; y++){
            if(map1.getTile(x, y) == tileToReplace){
                map1.setTile(x, y, map2.getTile(x, y));
            }
        }
    }
}