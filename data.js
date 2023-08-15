const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//----------->  start screen --------------------------------------------------------------------
startScreen.addEventListener("click", start);

//for player to start game
let player = { speed: 5, score: 0 }; //player object has property speed which has value--key value property added score

//----------->  created key function ---------------------------------------------------------
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventdefault;
  keys[e.key] = true;
}

function keyUp(e) {
  e.preventdefault;
  keys[e.key] = false;
}

//--------------for coullusion function-----------------------------------------------------------
function isCollide(a, b) {
  //where 'a' reprecent the position of car && 'b' reprecent enemy car
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

//to make the ------------line moving-------------------------------------------------------------
function moveLines() {
  let lines = document.querySelectorAll(".lines");

  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed; //top to bottom white line speed --we did the same while making car move up and down
    item.style.top = item.y + "px"; // top position
  });
}
//----------END GAME function---------------------------------------------------------------------------------

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Your final Score is: " +
    player.score +
    " Press Here to Restart the Game";
}
//--- just like lines we have to move the Enemy with same logic -------------------------------------------------
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    //calling the collusion function to stop the game
    if (isCollide(car, item)) {
      endGame();
    }

    if (item.y >= 700) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed; //top to bottom white line speed --we did the same while making car move up and down
    item.style.top = item.y + "px"; // top position
  });
}

//-------------------declare GamePlay ()---------------------------------------------------------------
function gamePlay() {
  let car = document.querySelector(".car");

  //to know the position of the road------------- refrence:https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  let road = gameArea.getBoundingClientRect();
  //bottom: 721.6000366210938
  //  height: 721.6000366210938
  //  left: 330|| right: 730|| top: 0|| width: 400|| x: 330| y: 0
  if (player.start) {
    moveLines();
    moveEnemy(car);

    //condition to move the care up and down & left and right
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    } //to see the car coming from top
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    } //70 is my car hight
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    } //50 is my car width

    //--------------changing the value----------------------------------------------------------
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay); //we can have multipule loop inside our function
    //refrence: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    console.log(player.score++); //we will get our socre because we have already define score=0

    player.score++;
    let ps = player.score - 2;
    score.innerText = "Score: " + ps;
  }
}
//------------------------start function -----------------------------------------------------------
function start() {
  // gameArea.classList.remove("hide"); //massage on the screen hide
  startScreen.classList.add("hide"); ////massage on the screen show
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  //we need white line in middle loop
  for (i = 0; i < 5; i++) {
    //to create the line between the road
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = i * 150; //setting value for y property
    roadLine.style.top = roadLine.y + "px"; // goes in loop ---- this is top position
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  //car.innerText = " HEY CAR";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (i = 0; i < 3; i++) {
    //to create the line between the road
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (i + 1) * 350 * -1; //setting value for y property
    enemyCar.style.top = enemyCar.y + "px"; // goes in loop ---- this is top position
    // enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px"; // 350 because the total length is 400 we want less then that for enemy
    gameArea.appendChild(enemyCar);
  }
}
