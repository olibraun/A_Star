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
    if(Math.random(1) < 0.25) {
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
          // exclude self
          result.push(grid[r][s]);
        }
      }
    }
    return result;
  }

  render(color) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.strokeStyle = '#000000';
    context.lineWidth = .25;
    if(!this.free) {
      context.fillStyle = '#000000';
    } else {
      context.fillStyle = '#FFFFFF';
    }
    if(color) {
      context.fillStyle = color;
    }
    context.fill();
    context.stroke();
    context.closePath();
  }
}