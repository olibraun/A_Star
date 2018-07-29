const grid_width = 5;
const grid_height = 5;
let grid = [];

let start, goal, openSet, closedSet, path;

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
  goal = grid[grid_width - 1][grid_height - 1];
  openSet = [start];
  closedSet = [];
  start.g = 0;
  start.f = heuristic(start, goal);
  start.free = true;
  goal.free = true;
}

function draw() {
  // A* loop
  path = [];
  if(openSet.length > 0) {
    // current := the node in openSet having the lowest fScore value
    let current = openSet[0];
    openSet.forEach(node => {
      if(node.f < current.f) {
        current = node;
      }
    });
    if(current == goal) {
      noLoop();
      console.log('Done');
    }

    removeFromArray(openSet,current);
    closedSet.push(current);

    current.getNeighbors().forEach(neighbor => {
      if(!closedSet.includes(neighbor) && neighbor.free) {
        tentative_gScore = current.g + heuristic(current, neighbor);

        let pathImproved = false;
        if(openSet.includes(neighbor)) {
          if(tentative_gScore < neighbor.g) {
            neighbor.g = tentative_gScore;
            pathImproved = true;
          }
        } else {
          // Discover a new node
          openSet.push(neighbor);
          neighbor.g = tentative_gScore;
          pathImproved = true;
        }

        if(pathImproved) {
          neighbor.cameFrom = current;
          //neighbor.g = tentative_gScore;
          neighbor.f = neighbor.g + heuristic(neighbor, goal);
        }
      }
    });

    // Find the path by working backwards
    var temp = current;
    path.push(temp);
    while (temp.cameFrom) {
      path.push(temp.cameFrom);
      temp = temp.cameFrom;
    }
  }

  // drawing
  background(51);
  grid.forEach(row => {
    row.forEach(cell => {
      cell.render();
    });
  });
  openSet.forEach(cell => {
    cell.render(color(0, 255, 0));
  });
  closedSet.forEach(cell => {
    cell.render(color(255, 0, 0));
  });
  path.forEach(cell => {
    cell.render(color(0, 0, 255));
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
    if(random(1) < 0) {
      this.free = false;
    }
  }

  getNeighbors() {
    let result = [];
    let leftLimit = max(this.i - 1, 0);
    let rightLimit = min(this.i + 1, grid_width - 1);
    let topLimit = max(this.j - 1, 0);
    let bottomLimit = min(this.j + 1, grid_height - 1);
    for(let r = leftLimit; r <= rightLimit; r++) {
      for(let s = topLimit; s <= bottomLimit; s++) {
        if(r !== this.i || s !== this.j) {
          result.push(grid[r][s]);
        }
      }
    }
    return result;
  }

  render(color) {
    push();
    stroke(255);
    strokeWeight(.25);
    noFill();
    if(color) {
      fill(color);
    }
    if(!this.free) {
      fill(255);
    }
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

function heuristic(cella, cellb) {
  return Math.sqrt( (cella.x - cellb.x)**2 + (cella.y - cellb.y)**2 );
}

function removeFromArray(arr, elt) {
  for(let i = arr.length - 1; i >= 0; i--) {
    if(elt == arr[i]) {
      arr.splice(i, 1);
    }
  }
}