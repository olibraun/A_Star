let grid_width = 50;
let grid_height = grid_width;
let grid = [];

let start, goal, openSet, closedSet, path;

let loop = true;

let number_of_simulation_steps = 1;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let requestID;

function min(a, b) {
  return a < b ? a : b;
}

function max(a, b) {
  return a > b ? a : b;
}

function setup() {
  grid = [];
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
  path = [];
  start.g = 0;
  start.f = heuristic(start, goal);
  start.free = true;
  goal.free = true;

  context.clearRect(0, 0, width, height);
  grid.forEach(row => {
    row.forEach(cell => {
      cell.render();
    });
  });
}

function draw() {
  // A* loop
  for(let i = 0; i < number_of_simulation_steps; i++) {
    if(openSet.length > 0) {
      // current := the node in openSet having the lowest fScore value
      let current = openSet[0];
      openSet.forEach(node => {
        if(node.f < current.f) {
          current = node;
        }
      });
      if(current == goal) {
        loop = false;
        console.log('Done');
        console.log(current);
        // Find the path by working backwards
        reconstructPath(current);
        break;
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
            neighbor.g = tentative_gScore;
            neighbor.f = neighbor.g + heuristic(neighbor, goal);
          }
        }
      });
  
      // Find the path by working backwards
      reconstructPath(current);
    }
  }

  // drawing
  openSet.forEach(cell => {
    cell.render('#00FF00');
  });
  closedSet.forEach(cell => {
    cell.render('#FF0000');
  });
  path.forEach(cell => {
    cell.render('#0000FF');
  });
  if(loop) {
    requestID = requestAnimationFrame(draw);
  }
}

function reconstructPath(current) {
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.cameFrom) {
    path.push(temp.cameFrom);
    temp = temp.cameFrom;
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

function restartSimulation() {
  cancelAnimationFrame(requestID);
  grid_width = document.getElementById('grid_input').value;
  if(grid_width > 350) {
    grid_width = 350;
    document.getElementById('grid_input').value = 350;
    window.confirm('Size limited to 350.');
  }
  grid_height = grid_width;
  number_of_simulation_steps = document.getElementById('step_input').value;
  loop = true;
  setup();
  draw();
}

setup();
draw();