
document.addEventListener("DOMContentLoaded", runner);

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

function runner(){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  //Ball info
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;
  //paddle info
  let paddleHeight = 10;
  let paddleWidth  = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  //user controllers
  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
  //brick info
  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
    //2-dimensial brick array
    let bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0 , status: 1};
        }
    }

  //score variable
  let score = 0;
  let lives = 3;

  draw();

  //object draw
  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
    //paddle draw
  function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
    //bricks draw
  function drawBricks() {
    for(let c=0; c < brickColumnCount; c++) {
      for(let r=0; r < brickRowCount; r++) {
        if(bricks[c][r].status === 1) {
          let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

    //score draw
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

    //lives draw
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  //collision detection
  function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status === 1){
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
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
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    //Check that ball is within the canvas
    if((x + dx) > (canvas.width - ballRadius) || (x + dx) < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
      }
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    //check paddle within canvas, and check for user input
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;

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
      paddleX = relativeX - paddleWidth / 2;
    }
  }
}
