
document.addEventListener("DOMContentLoaded", runner);

function runner(){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  //Ball info
  let ball = new Ball(canvas.width / 2, canvas.height - 30, 2, -2, 10, "#0095DD");
  //paddle info
  let paddle = new Paddle(10, 75, "#0095DD");
  //user controllers
  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
  //brick info
  let brickRowCount = 3;
  let brickColumnCount = 5;
  //2-dimensial brick array
  let bricks = [];
  for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
          bricks[c][r] = new Brick(0, 0, 75, 20, 10, 30, 30, 1, "#0095DD");
      }
  }

  //score variable
  let scoreBoard = new Scoreboard(0, 3);

  draw();

  //bricks draw
  function drawBricks() {
    for(let c=0; c < brickColumnCount; c++) {
      for(let r=0; r < brickRowCount; r++) {
        if(bricks[c][r].status === 1) {
          bricks[c][r].updateX(c);
          bricks[c][r].updateY(r);
          bricks[c][r].draw(ctx);
        }
      }
    }
  }

  //collision detection
  function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
      for(let r = 0; r < brickRowCount; r++) {
        let brick = bricks[c][r];
        if(brick.status === 1){
          if(ball.x > brick.x && ball.x < brick.x+bricks[c][r].width && ball.y > brick.y && ball.y < brick.y+bricks[c][r].height) {
            ball.dy = -ball.dy;
            brick.status = 0;
            scoreBoard.score++;
            if(scoreBoard.score == brickRowCount * brickColumnCount) {
              alert("YOU WIN, CONGRATULATIONS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  //frame draw
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.draw(ctx);
    paddle.draw(ctx);
    scoreBoard.draw(ctx);
    collisionDetection();

    //Check that ball is within the canvas and move it
    if(ball.checkXBoundry()){}
    if(ball.checkYBoundry()){}
    else if(ball.y + ball.dy > canvas.height-ball.radius) {
      if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
      }
      else {
        scoreBoard.lives--;
        if(scoreBoard.lives === 0) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 30;
          ball.dx = 2;
          ball.dy = -2;
          paddle.x = (canvas.width - paddle.width) / 2;
        }
      }
    }

    //check paddle within canvas, and check for user input
    if(rightPressed && paddle.x < canvas.width - paddle.width) {
      paddle.x += 7;
    }
    else if(leftPressed && paddle.x > 0) {
      paddle.x -= 7;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
  }

  //event handlers
  function keyDownHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
      rightPressed = true;
    }
    else if(event.key === "left" || event.key === "ArrowLeft"){
      leftPressed = true;
    }
  }

  function keyUpHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
      rightPressed = false;
    }
    else if(event.key === "left" || event.key === "ArrowLeft"){
      leftPressed = false;
    }
  }

  function mouseMoveHandler(event){
    let relativeX = event.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
      paddle.x = relativeX - paddle.width / 2;
    }
  }
}
