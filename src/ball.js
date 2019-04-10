class Ball{
  static canvas = document.getElementById("canvas");
  constructor(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  checkXBoundry(){
    if((this.x + this.dx) > (canvas.width - this.radius) || (this.x + this.dx) < this.radius) {
      this.dx = -this.dx;
      return true;
    }
    else{
      return false;
    }
  }

  checkYBoundry(){
    if(this.y + this.dy < this.radius) {
      this.dy = -this.dy;
      return true;
    }
    else{
      return false;
    }
  }
}
