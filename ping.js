var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");

let p1Score = 0;
let p2Score = 0;

document.getElementById("p1Score").innerHTML = "Player 1 Score: " + p1Score;
document.getElementById("p2Score").innerHTML = "Player 2 Score: " + p2Score;

let started = false;

const p1color = " #CC5B29";
const p2color = "#79B7D2";
const lineColor = "#CA44A1";
const ballColor = "#65CD85";

let p1x = 20;
let p1y = 250;
let p2x = 1160;
let p2y = 250;
let p1Speed = 10;
let p2Speed = 3;

let ballX = 595;
let ballY = 290;
let ballXVelo = 4;
let ballYVelo = 0;

let hitNum = 0;

const drawCenterLine = () => {
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600, 600);
  ctx.stroke();
};

const startingPlaces = () => {
  ctx.clearRect(0, 0, 1200, 600);

  ctx.fillStyle = p1color;
  ctx.fillRect(p1x, p1y, 20, 100);

  drawCenterLine();

  ctx.fillStyle = ballColor;
  ctx.fillRect(ballX, ballY, 10, 10);

  ctx.fillStyle = p2color;
  ctx.fillRect(p2x, p2y, 20, 100);
};

const moveRectangle2 = () => {
  ctx.clearRect(1150, 0, 50, 600);
  ctx.fillStyle = p2color;

  let difficultyControl = Math.floor(Math.random() * 3);

  if (difficultyControl >= 1) {
    if (p2y + 50 < ballY - 10) {
      p2y += p2Speed;
    } else if (p2y + 50 > ballY + 10) {
      p2y -= p2Speed;
    }
  }

  ctx.fillRect(p2x, p2y, 20, 100);
};

const moveRectangle = (isUp) => {
  ctx.clearRect(p1x - 20, p1y - 100, 40, 200);
  ctx.fillStyle = p1color;
  if (isUp) {
    p1y -= p1Speed * 2;
  } else {
    p1y += p1Speed * 2;
  }
  ctx.fillRect(p1x, p1y, 20, 100);
};

const moveBall = () => {
  ctx.clearRect(ballX - 20, ballY - 20, 40, 40);

  ballY += ballYVelo;
  ballX += ballXVelo;

  // if (ballXVelo >= 8) {
  //   ballXVelo = 7;
  // }

  // if (ballYVelo >= 8) {
  //   ballYVelo = 7;
  // }

  // if (ballY == targetY && ballX == targetX) {
  //   return;
  // }

  //Calculates distance for paddle collisions
  if (
    calculateDistance(ballX, ballY, p1x, p1y + 50) ||
    calculateDistance(p2x + 20, p2y + 50, ballX, ballY)
  ) {
    //fixes hitting bug
    if (ballXVelo > 0 && ballX < p2x) {
      ballX -= 20;
    } else if (ballXVelo < 0 && ballX > p1x) {
      ballX += 20;
    }
    ballXVelo *= -1;

    if (hitNum > 5 || ballYVelo == 0) {
      ballYVelo = Math.floor(Math.random() * 7) - 3;
    }

    hitNum++;
  }

  //wall boundaries
  if (ballY <= 0 || ballY >= 600) {
    ballYVelo *= -1;
  }

  //scoring
  if (ballX <= 0 || ballX >= 1200) {
    if (ballXVelo > 0) {
      p1Score++;
      document.getElementById("p1Score").innerHTML =
        "Player 1 Score: " + p1Score;
    } else {
      p2Score++;
      document.getElementById("p2Score").innerHTML =
        "Player 2 Score: " + p2Score;
    }
    //changes cpu speed
    p2Speed = Math.floor(Math.random() * 3) + 2;
    resetBall();
    //Both these lines arent working?
    //Figure out why
    // startingPlaces();
    // setTimeout(5000);
  }

  //redraw center line
  drawCenterLine();

  // Moves CPU
  moveRectangle2();

  //Redraws #9E5433 to help with bugs
  ctx.fillStyle = p1color;
  ctx.fillRect(p1x, p1y, 20, 100);

  ctx.fillStyle = ballColor;
  ctx.fillRect(ballX, ballY, 10, 10);

  setTimeout(moveBall, 10);
};

const resetBall = () => {
  ctx.clearRect(ballX, ballY, 10, 10);

  ballX = 595;
  ballY = 295;

  let temp = ballXVelo;

  ballXVelo = 0;
  ballYVelo = 0;

  ctx.fillStyle = ballColor;
  ctx.fillRect(ballX, ballY, 10, 10);

  //Why not working??
  setTimeout(function () {
    ballXVelo = temp;
  }, 3000);
};

const calculateDistance = (x1, y1, x2, y2) => {
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  let squaredDis = xDiff ** 2 + yDiff ** 2;

  if (Math.sqrt(squaredDis) < 50) {
    return true;
  } else {
    return false;
  }
};

startButton.onclick = () => {
  if (started == false) {
    moveBall();
    moveRectangle2();
    started = true;
  }
};

stopButton.onclick = () => {
  resetBall();
};

document.addEventListener("keydown", (event) => {
  // if (event.code === "KeyD") {
  //   x += 10;
  // }
  // if (event.code === "KeyA") {
  //   x -= 10;
  // }
  if (event.code === "KeyW" || event.code === "ArrowUp") {
    // ctx.clearRect(p1x, p1y, 20, 100);
    // p1y -= 10;
    // ctx.fillStyle = "#9E5433";
    // ctx.fillRect(p1x, p1y, 20, 100);

    moveRectangle(true);
  }
  if (event.code === "KeyS" || event.code === "ArrowDown") {
    // ctx.clearRect(p1x, p1y, 20, 100);
    // p1y += 10;
    // ctx.fillStyle = "#9E5433";
    // ctx.fillRect(p1x, p1y, 20, 100);

    moveRectangle(false);
  }
});

startingPlaces();
