const grid_width = 100;
const grid_height = 100;
let grid = [];

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
}

function draw() {
  background(51);
  grid.forEach(row => {
    row.forEach(cell => {
      cell.render();
    });
  });
}

class Cell {
  constructor(i,j) {
    this.width = width / grid_width;
    this.height = height / grid_height;
    this.x = i*this.width;
    this.y = j*this.height;
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