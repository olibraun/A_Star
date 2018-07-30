const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let grid_width = 50;
let grid_height = grid_width;
let grid = [];

class Cell {
  constructor(i,j) {
    this.i = i;
    this.j = j;
    this.width = width / grid_width;
    this.height = height / grid_height;
    this.x = i*this.width;
    this.y = j*this.height;
  }

  render(color) {
    context.rect(this.x, this.y, this.width, this.height);
    context.strokeStyle = '#000000';
    context.lineWidth = .25;
    if(color) {
      context.fillStyle = color;
    }
    context.fillStyle = '#FFFFFF';
    context.fill();
    context.stroke();
  }
}

for(let i = 0; i <= grid_width; i++) {
  if(!(grid[i])) {
    grid[i] = [];
  }
  for(let j = 0; j <= grid_height; j++) {
    grid[i][j] = new Cell(i, j);
  }
}

function draw(time) {
  context.clearRect(0, 0, width, height);
  grid.forEach(row => {
    row.forEach(cell => {
      cell.render();
    });
  });
  requestAnimationFrame(draw, time);
}

draw();