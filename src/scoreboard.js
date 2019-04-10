class Scoreboard{
  constructor(score, lives){
    this.score = score;
    this.lives = lives;
  }

  draw(ctx){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.score, 8, 20);
    // cts.
    // ctx.font = "16px Arial";
    // ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+ this.lives, canvas.width-65, 20);
  }
}
