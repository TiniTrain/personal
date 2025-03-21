var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");

let p1Score = 0;
let p2Score = 0;

document.getElementById("p1Score").innerHTML = "Player 1 Score: " + p1Score;
document.getElementById("p2Score").innerHTML = "Player 2 Score: " + p2Score;

let p1x = 20;
let p1y = 250;
let p2x = 1160;
let p2y = 250;
let p1Speed = 10;
let p2Speed = 8;

let ballX = 595;
let ballY = 290;
let ballXVelo = 4;
let ballYVelo = 0;

let hitNum = 0;

const drawCenterLine = () => {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600, 600);
  ctx.stroke();
};

const startingPlaces = () => {
  ctx.clearRect(0, 0, 1200, 600);

  ctx.fillStyle = "orange";
  ctx.fillRect(p1x, p1y, 20, 100);

  drawCenterLine();

  ctx.fillStyle = "pink";
  ctx.fillRect(ballX, ballY, 10, 10);

  ctx.fillStyle = "green";
  ctx.fillRect(p2x, p2y, 20, 100);
};

const moveRectangle2 = () => {
  ctx.clearRect(1150, 0, 50, 600);
  ctx.fillStyle = "green";

  if (p2y + 50 < ballY - 10) {
    p2y += p2Speed;
  } else if (p2y + 50 > ballY + 10) {
    p2y -= p2Speed;
  }

  ctx.fillRect(p2x, p2y, 20, 100);
};

const moveRectangle = (isUp) => {
  ctx.clearRect(p1x - 20, p1y - 100, 40, 200);
  ctx.fillStyle = "orange";
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
    calculateDistance(ballX, ballY, p1x + 30, p1y + 50) ||
    calculateDistance(p2x, p2y + 50, ballX, ballY)
  ) {
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
    p2Speed = Math.floor(Math.random() * 3) + 7;
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

  ctx.fillStyle = "pink";
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

  ctx.fillStyle = "pink";
  ctx.fillRect(ballX, ballY, 10, 10);

  //Why not working??
  setTimeout(5000);

  ballXVelo = temp;
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
  moveBall();
  moveRectangle2();
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
  if (event.code === "KeyW") {
    // ctx.clearRect(p1x, p1y, 20, 100);
    // p1y -= 10;
    // ctx.fillStyle = "orange";
    // ctx.fillRect(p1x, p1y, 20, 100);

    moveRectangle(true);
  }
  if (event.code === "KeyS") {
    // ctx.clearRect(p1x, p1y, 20, 100);
    // p1y += 10;
    // ctx.fillStyle = "orange";
    // ctx.fillRect(p1x, p1y, 20, 100);

    moveRectangle(false);
  }
});

startingPlaces();
