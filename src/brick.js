class Brick{
  static all = [];
  constructor(x, y, width, height, padding, offsetTop, offsetLeft, status, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.status = status;
    this.color = color;
    Brick.all.push(this);
  }

  updateX(column){
    this.x = (column * (this.width + this.padding)) + this.offsetLeft;
  }

  updateY(row){
    this.y = (row * (this.height + this.padding)) + this.offsetTop;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
