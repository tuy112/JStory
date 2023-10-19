const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 뱀 머리
let positionX = 0,
  positionY = 0;
const gridSize = 20,
  tileCount = 20;
let velocityX = 0,
  velocityY = 0;

// 뱀 몸통
const sankeBody = [];
let tailLength = 5;

// 고기
let meatX = 15,
  meatY = 15;

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      velocityX += -1;
      velocityY += 0;
      break;
    case 38:
      velocityX += 0;
      velocityY += -1;
      break;
    case 39:
      velocityX += 1;
      velocityY += 0;
      break;
    case 40:
      velocityX += 0;
      velocityY += 1;
      break;
  }
}

function game() {
  // 배경
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 뱀
  ctx.fillStyle = "lime";
  // ctx.fillRect(
  //   positionX * gridSize,
  //   positionY * gridSize,
  //   gridSize - 2,
  //   gridSize - 2
  // );
  for (let i = 0; i < sankeBody.length; i++) {
    ctx.fillRect(
      sankeBody[i].x * gridSize,
      sankeBody[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    // 게임 오버
    if (sankeBody[i].x === positionX && sankeBody[i].y === positionY) {
      tail = 5;
    }
  }

  // 뱀 몸통
  sankeBody.push({
    x: positionX,
    y: positionY,
  });
  while (sankeBody.length > tailLength) {
    sankeBody.shift();
  }

  // 고기
  ctx.fillStyle = "brown";
  ctx.fillRect(meatX * gridSize, meatY * gridSize, gridSize - 2, gridSize - 2);

  // 뱀과 고기 위치가 같으면...고기가 다른 위치로 이동되게..
  if (meatX == positionX && meatY == positionY) {
    meatX = Math.floor(Math.random() * tileCount);
    meatY = Math.floor(Math.random() * tileCount);
  }

  positionX += velocityX;
  positionY += velocityY;

  if (positionX < 0) {
    positionX = tileCount - 1;
  }
  if (positionX > tileCount - 1) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = tileCount - 1;
  }
  if (positionY > tileCount - 1) {
    positionY = 0;
  }
}

window.onload = () => {
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 15);
};
