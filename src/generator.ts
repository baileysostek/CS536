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

export function maze(map:Map, wall_tile: number, floor_tile: number){
    // initialize Map with all 1s
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            map.setTile(i, j, wall_tile);
        }
    }
    
    // start at a random cell
    const startX = Math.floor(Math.random() * map.width);
    const startY = Math.floor(Math.random() * map.height);

    // Add the starting cell to the list of frontier cells
    let frontier = [[startX, startY]];

    while (frontier.length > 0) {
        // Choose a random frontier cell
        const index = Math.floor(Math.random() * frontier.length);
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
            const [nx, ny, mx, my] = neighbors[Math.floor(Math.random() * neighbors.length)];

            // Carve a path between the current cell and the neighbor
            map.setTile(nx, ny, floor_tile);
            map.setTile(mx, my, floor_tile);
        }
    }
    
    return map;
}

