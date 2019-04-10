class Paddle{
  static canvas = document.getElementById("canvas");
  constructor(height, width, color){
    this.x = (canvas.width - width) / 2;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
