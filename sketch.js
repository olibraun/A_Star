const grid_width = 10;
const grid_height = 10;
let grid = [];

let start, goal, openSet, closedSet;

function setup() {
  createCanvas(800, 800);
  background(51);
  for(let i = 0; i <= grid_width; i++) {
    if(!(grid[i])) {
      grid[i] = [];
    }

    for(let j = 0; j <= grid_height; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  
  start = grid[0][0];
  goal = grid[grid_width][grid_height];
  openSet = [start];
  start.g = 0;
  start.f = heuristic(start, goal);
}

function draw() {
  // A* loop
  if(openSet.len > 0) {
    // current := the node in openSet having the lowest fScore value
    let current = openSet[0];
    openSet.forEach(node => {
      if(node.f < current.f) {
        current = node;
      }
    });
    if(current == goal) {
      console.log('reconstruct_path(cameFrom, current);');
    }

    //openSet.remove(current);
    closedSet.push(current);

    current.getNeighbors().forEach(neighbor => {
      if(!neighbor in closedSet) {
        tentative_gScore = current.g + heuristic(current, neighbor);

        if(!neighbor in openSet) {
          // Discover a new node
          openSet.push(neighbor);
        }
        if(tentative_gScore < neighbor.g) {
          neighbor.cameFrom = current;
          neighbor.g = tentative_gScore;
          neighbor.f = neighbor.g + heuristic(neighbor, goal);
        }
      }
    });
  }

  // drawing
  background(51);
  grid.forEach(row => {
    row.forEach(cell => {
      cell.render();
    });
  });
}

class Cell {
  constructor(i,j) {
    this.i = i;
    this.j = j;
    this.width = width / grid_width;
    this.height = height / grid_height;
    this.x = i*this.width;
    this.y = j*this.height;

    this.g = Infinity;
    this.f = Infinity;
    this.cameFrom = null;

    this.free = true;
  }

  getNeighbors() {
    return [];
  }

  render() {
    push();
    stroke(255);
    strokeWeight(.25);
    noFill();
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

function heuristic(a, b) {
  return 0;
}