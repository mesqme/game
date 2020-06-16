//                                BARBARIUM
// by Mikhail Kiyatkin

let knight;
let angle;
let prevAngle;
let knightSpeed = 4;
let knightLives = 3;
let minusLife;
let startKnight;
let deadKnight;
let knightCeleb;

let borderTop;
let borderBottom;
let borderLeft;
let borderRight;
let borderThickness = 72;

let forestLeft;
let forestRight;

let fenceR1;
let fenceR2;
let fenceL1;
let fenceL2;

let skeletons;
let skeleton;
let skelAngle = 0;
let skeletonSpeed = 2;
let deadSkel;
let anotherAttack;
let trigger;
let skelDeathX;
let skelDeathY;
let skelChangeDir = 1;
let skelKilled = 0;
let enemyX;
let enemyY;

let axe;
let nextAxe = 1;
let axes;

let heart;

let coin;
let coins;
let gold = 0;
let coinStats;

let door;

let backGroundSprite;

let gameName;
let authorSign;
let scoreSign;
let startGame;
let gameEnd;
let restartSign;
let instructions;
let howMove;
let howShoot;

let ifStart = 0;
let firstTry = 1;
let delayPar = 1;
let playOst = 1;

let stateChanged = false;

function preload() {
  pixelFont = loadFont('assets/PressStart2P-Regular.ttf');
  marioFont = loadFont('assets/Mario-Kart-DS.ttf');

  soundFormats('mp3', 'wav');
  hit = loadSound('assets/hit.wav');
  coinSound = loadSound('assets/coin.wav');
  throwSound = loadSound('assets/throw.wav');
  skelHit = loadSound('assets/skelHit.wav');
  exit = loadSound('assets/exit.wav');
  gameOver = loadSound('assets/gameOver.wav');
  ost = loadSound('assets/theme.wav');
  win = loadSound('assets/win.wav');
}


//                                            MAIN
function setup() {
  createCanvas(1000, 1000);
  createGroups();

  startingKnight();
  badEnd();
  goodEnd();

  createBackGround();
  createEnemies();
  knightSprite();
  borders();
  createForestLeft();
  createForestRight();
  createFenceR1();
  createFenceL1();
  createFenceR2();
  createFenceL2();
  createDoor();
  createHeart();
  goldScoreImg();
}

function draw() {
  if (ifStart == 0) {
    startingPage();
  }
  else if (ifStart == 1) {
    levelOne();
  }
  else if (ifStart == 100) {
    endGame();
  }
  else if (ifStart == 101) {
    endWell();
  }
}

function createGroups() {
  borderGroup = new Group();
  axes = new Group();
  skeletons = new Group();
  coins = new Group();
}


//                                    LEVELS

function startingPage() { //menu
  background(0);
  gameName = 'BARBARIUM'
  startGame = 'press ENTER to start';
  instructions = 'instructions';
  howMove = 'press UP-DOWN-LEFT-RIGHT to move';
  authorSign = 'prealpha version - 0.01';
  howShoot = 'press SPACE to throw';

  drawSprite(startKnight);
  startKnight.changeAnimation('standing');

  push();
  textFont(marioFont, 80);
  fill(223, 113, 38);
  text(gameName, 250, 420);
  pop();

  push();
  textFont(marioFont, 36);
  fill(255);
  text(startGame, 300, 500);
  pop();

  push();
  textFont(marioFont, 25);
  fill(255);
  text(instructions, 410, 600);
  pop();

  push();
  textFont(marioFont, 20);
  fill(255);
  text(howMove, 310, 650);
  text(howShoot, 390, 700);
  pop();

  push();
  textFont(marioFont, 20);
  fill(255);
  text(authorSign, 700, 900);
  pop();

  if (keyWentDown(13)) {
    ifStart = 1;
    ost.setVolume(0.1);
    ost.play();
    startKnight.changeAnimation('nothing');
    anotherAttack = 1;
    trigger = 1;
    knightLives = 3;
    knightInit();
    if (firstTry != 1) {
      if (skelKilled == 1) {
      //createNewEnemy();
      createEnemies();
      }
      gold = 0;
    }
  }
}

function endGame() { //loosing
  background(0);
  playOst = 1;
  firstTry = 0;
  gameEnd = 'GAME OVER';
  authorSign = 'prealpha version - 0.01';
  restartSign = 'press ENTER to return to menu';

  drawSprite(deadKnight);
  deadKnight.changeAnimation('death');

  push();
  textFont(marioFont, 80);
  fill(48, 96, 130);
  text(gameEnd, 260, 420);
  pop();

  push();
  textFont(marioFont, 36);
  fill(255);
  text(restartSign, 220, 500);
  pop();

  push();
  textFont(marioFont, 20);
  fill(255);
  text(authorSign, 700, 900);
  pop();

  if (keyWentDown(13)) {
    document.location.reload(true);
    ifStart = 0;
    deadKnight.changeAnimation('nothing');
  }
}

function endWell() { // winning
  background(0);
  playOst = 1;
  firstTry = 0;
  gameEnd = 'WELL DONE';
  authorSign = 'prealpha version - 0.01';
  scoreSign = 'your score -   ' + gold;
  restartSign = 'press ENTER to return to menu';

  drawSprite(knightCeleb);
  knightCeleb.changeAnimation('celebrating');

  push();
  textFont(marioFont, 80);
  fill(223, 113, 38);
  text(gameEnd, 260, 420);
  pop();

  push();
  textFont(marioFont, 36);
  fill(255);
  text(scoreSign, 370, 500);
  pop();

  push();
  textFont(marioFont, 36);
  fill(255);
  text(restartSign, 220, 600);
  pop();

  push();
  textFont(marioFont, 20);
  fill(255);
  text(authorSign, 700, 900);
  pop();

  if (keyWentDown(13)) {
    document.location.reload(true);
    win.stop();
    ifStart = 0;
    knightCeleb.changeAnimation('nothing');
  }

  if (stateChanged) {
    stateChanged = false;
    let body  = document.querySelector('body');

    let form = document.createElement('form');
    form.setAttribute('class', 'form');

    let top3 = document.createElement('top3');
    top3.setAttribute('class', 'top3');

    let newBtn = document.createElement('button');
    newBtn.textContent = "Save";

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter name to save score');
    newInput.setAttribute('maxlength', 20);
    newInput.required = true;

    let allBtn = document.createElement('button');
    allBtn.textContent = "Top 3";


    body.appendChild(top3);
    body.appendChild(form);
    top3.appendChild(allBtn);
    form.appendChild(newInput);
    form.appendChild(newBtn);

    allBtn.addEventListener('click', (e) => {
        fetch('/top')
        .then(resp => resp.json())
        .then(data => console.log(data));
    });

    form.addEventListener('submit', (e) => {
        console.log("Button pressed");

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset = utf-8'
            },
            body: JSON.stringify({name: newInput.value, score:gold})
        })
        .then(resp => resp.json())
        .then(data => console.log(data));

        form.remove();
        e.preventDefault();
    });
  }
}


function levelOne() { //level 1
  drawSprites();
  checkHearts();
  if (trigger == 1) {
    checkKey();
  }
  skeletonMove();
  if (nextAxe == 1 && trigger == 1) {
    shoot();
  }
  borderCollide();
  checkDeath();
  triggerAttack();
  checkLife();
  getCoin();
  score();
  escape();
}


//                                    SPRITES SECTION

function knightSprite() { //creates main character - Loki
  knight = createSprite(width - borderThickness, height - borderThickness);
  knight.addAnimation('walkingKnightAxeRight', 'assets/knightAxeWalkRight_0001.png', 'assets/knightAxeWalkRight_0008.png');
  knight.addAnimation('walkingKnightAxeLeft', 'assets/knightAxeWalkLeft_0001.png', 'assets/knightAxeWalkLeft_0008.png');
  knight.addAnimation('gettingDamageRight', 'assets/damageRight_0001.png', 'assets/damageRight_0006.png');
  knight.addAnimation('gettingDamageLeft', 'assets/damageLeft_0001.png', 'assets/damageLeft_0006.png');
  knight.addAnimation('deathRight', 'assets/knightDeathRight_0001.png', 'assets/knightDeathRight_0024.png');
  knight.addAnimation('death', 'assets/knightDeathRight_0024.png');
  knight.changeAnimation('walkingKnightAxeLeft');
  knight.scale = 1.5;
  knight.restitution = 0;
}

function borders() { //creates borders
  borderTop = createSprite(width/2, 24);
  borderTop.addAnimation('topBorder', 'assets/topBorder_0001.png');
  borderTop.changeAnimation('topBorder');
  borderTop.restitution = 0;
  borderGroup.add(borderTop);

  borderBottom = createSprite(width/2, height - 24);
  borderBottom.addAnimation('botBorder', 'assets/botBorder_0001.png');
  borderBottom.changeAnimation('botBorder');
  borderBottom.restitution = 0;
  borderGroup.add(borderBottom);

  borderLeft = createSprite(24, height/2);
  borderLeft.addAnimation('leftBorder', 'assets/leftBorder_0001.png');
  borderLeft.changeAnimation('leftBorder');
  borderLeft.restitution = 0;
  borderGroup.add(borderLeft);

  borderRight = createSprite(width - 24, height/2);
  borderRight.addAnimation('rightBorder', 'assets/rightBorder_0001.png');
  borderRight.changeAnimation('rightBorder');
  borderRight.restitution = 0;
  borderGroup.add(borderRight);
}

function enemy(enemyX, enemyY) { //creates a skeleton
  skeleton = createSprite(enemyX, enemyY);
  skeleton.scale = 2.25;
  skeleton.addAnimation('walkingSkeletonRight', 'assets/SkeletonWalk_0001.png', 'assets/SkeletonWalk_0012.png');
  skeleton.addAnimation('walkingSkeletonLeft', 'assets/SkeletonBackWalk_0002.png', 'assets/SkeletonBackWalk_0013.png');
  skeleton.addAnimation('deathSkeletonRight', 'assets/SkeletonDead_0001.png', 'assets/SkeletonDead_0015.png');
  skeleton.addAnimation('deathSkeletonLeft', 'assets/SkeletonDeadBack_0001.png', 'assets/SkeletonDeadBack_0015.png');
  skeleton.addAnimation('attackSkeletonRight', 'assets/SkeletonAttackRight_0001.png', 'assets/SkeletonAttackRight_0018.png');
  skeleton.addAnimation('attackSkeletonLeft', 'assets/SkeletonAttackLeft_0001.png', 'assets/SkeletonAttackLeft_0018.png');
  skeleton.restitution = 0;
  skeleton.setCollider('circle', 0, 0, 5);
  skeletons.add(skeleton);
}

function createEnemies() { //adds new mobs
    enemy(borderThickness, 800);
}

function createAxe() { //creates a moving and rotating axe
  axe = createSprite(knight.position.x, knight.position.y);
  axe.scale = 1.5;
  axe.addAnimation('shootingRight', 'assets/axe_0001.png', 'assets/axe_0016.png');
  axe.addAnimation('shootingLeft', 'assets/axeBack_0001.png', 'assets/axeBack_0016.png');
  axe.restitution = 0;
  axe.setCollider('circle', 0, 0, 10);
  axe.life = 60;
  axes.add(axe);
  nextAxe = 0;
  setTimeout(axeUpdate, 1400);
}

function axeUpdate() { //does not allow to throw an infinite number of axes
  nextAxe = 1;
}

function createCoin() { //creates coins after enemy's deaths
  coin = createSprite(skelDeathX, skelDeathY);
  coin.scale = 2;
  coin.addAnimation('bounce', 'assets/coin_0001.png', 'assets/coin_0008.png');
  coin.changeAnimation('bounce');
  coin.life = 300;
  coins.add(coin);
}

function createForestLeft() { //left part of the forest section
  forestLeft = createSprite(250, 400);
  forestLeft.scale = 1;
  forestLeft.addAnimation('forest', 'assets/forest_0001.png');
  forestLeft.changeAnimation('forest');
  forestLeft.restitution = 0;
  borderGroup.add(forestLeft);
}

function createForestRight() { //right part of the forest section
  forestRight = createSprite(750, 400);
  forestRight.scale = 1;
  forestRight.addAnimation('forest', 'assets/forest_0001.png');
  forestRight.changeAnimation('forest');
  forestRight.restitution = 0;
  borderGroup.add(forestRight);
}


function createDoor() { //creates exit 
  door = createSprite(width/2, 24);
  door.scale = 1;
  door.addAnimation('door', 'assets/openDoor_0001.png');
  door.changeAnimation('door');
  door.setCollider('circle', 0, 0, 30);
  door.restitution = 0;
}

function createFenceR1() { //fences
  fenceR1 = createSprite(660, 875);
  fenceR1.scale = 1;
  fenceR1.addAnimation('fence', 'assets/fenceRight_0001.png');
  fenceR1.changeAnimation('fence');
  fenceR1.restitution = 0;
  borderGroup.add(fenceR1);
}

function createFenceL1() { //fences
  fenceL1 = createSprite(125, 875);
  fenceL1.scale = 1;
  fenceL1.addAnimation('fence', 'assets/fenceLeft_0001.png');
  fenceL1.changeAnimation('fence');
  fenceL1.restitution = 0;
  borderGroup.add(fenceL1);
}

function createFenceR2() { //fences
  fenceR2 = createSprite(875, 750);
  fenceR2.scale = 1;
  fenceR2.addAnimation('fence', 'assets/fenceLeft_0001.png');
  fenceR2.changeAnimation('fence');
  fenceR2.restitution = 0;
  borderGroup.add(fenceR2);
}

function createFenceL2() { //fences
  fenceL2 = createSprite(340, 750);
  fenceL2.scale = 1;
  fenceL2.addAnimation('fence', 'assets/fenceRight_0001.png');
  fenceL2.changeAnimation('fence');
  fenceL2.restitution = 0;
  borderGroup.add(fenceL2);
}

function createBackGround() { //background
  backGroundSprite = createSprite(width/2, height/2);
  backGroundSprite.scale = 1;
  backGroundSprite.addAnimation('background', 'assets/backGround_0001.png');
  backGroundSprite.changeAnimation('background');
}

function startingKnight() { //Loki animation in menu
  startKnight = createSprite(490, 250);
  startKnight.scale = 1;
  startKnight.addAnimation('standing', 'assets/knightAxe_0001.png', 'assets/knightAxe_0006.png');
  startKnight.addAnimation('nothing', '');
}

function badEnd() { //Loki animation when loose
  deadKnight = createSprite(480, 250);
  deadKnight.scale = 1;
  deadKnight.addAnimation('death', 'assets/knightEnd_0001.png');
  deadKnight.addAnimation('nothing', '');
}

function goodEnd() { //Loki animation when win
  knightCeleb = createSprite(480, 250);
  knightCeleb.scale = 1;
  knightCeleb.addAnimation('celebrating', 'assets/knightCeleb_0001.png', 'assets/knightCeleb_0004.png');
  knightCeleb.addAnimation('nothing', '');
}


//                                    MOVEMENT SECTION

function knightInit() { //returns Loki to the initial position
  knight.position.x = width - borderThickness; 
  knight.position.y = height - borderThickness;
  knight.changeAnimation('walkingKnightAxeLeft');
}

function checkKey() { //movement control with UP-DOWN-LEFT-RIGHT
  if (keyIsDown(UP_ARROW)) { 
    angle = 270;
    knight.setSpeed(knightSpeed, angle);
    if (prevAngle == 180) {
      knight.changeAnimation('walkingKnightAxeLeft');
    }
    else {
      knight.changeAnimation('walkingKnightAxeRight');
    }
  } 
  else if (keyIsDown(DOWN_ARROW)) {
    angle = 90; 
    knight.setSpeed(knightSpeed, angle);
    knight.changeAnimation('walkingKnightAxeRight');
    if (prevAngle == 180) {
      knight.changeAnimation('walkingKnightAxeLeft');
    }
    else {
      knight.changeAnimation('walkingKnightAxeRight');
    }
  } 
  else if (keyIsDown(RIGHT_ARROW)) { 
    angle = 0; 
    knight.setSpeed(knightSpeed, angle);
    knight.changeAnimation('walkingKnightAxeRight');
    prevAngle = angle;
  } 
  else if (keyIsDown(LEFT_ARROW)) { 
    angle = 180; 
    knight.setSpeed(knightSpeed, angle);
    knight.changeAnimation('walkingKnightAxeLeft');
    prevAngle = angle;
  } 
  else {
    knight.setSpeed(0, angle);
  }
}

function skeletonMove() { //desides where skeleton will go
  if (skeleton.getSpeed() == 0 && skeleton.getDirection() == 0) {
    skeleton.changeAnimation('walkingSkeletonRight');
    skeleton.setSpeed(skeletonSpeed, 0);
    skelChangeDir = 1;
  }
  else if (skeleton.getSpeed(0) == 0 && skeleton.getDirection() == 180){
    skeleton.changeAnimation('walkingSkeletonLeft');
    skeleton.setSpeed(skeletonSpeed, 180);
    skelChangeDir = -1;   
  }
  skeleton.overlap(borderGroup, changeSkelWalk);
}

function changeSkelWalk() { //turn skeleton
  if (skelChangeDir == 1) {
    skeletonBackWalk();
  }
  else if(skelChangeDir == -1) {
    skeletonStraightWalk();
  }
}

function skeletonStraightWalk() { //moves skeleton right 
  skeleton.setSpeed(skeletonSpeed, 0);
  skeleton.changeAnimation('walkingSkeletonRight');
  skelChangeDir = -skelChangeDir;
}

function skeletonBackWalk() { //moves skeleton left
  skeleton.setSpeed(skeletonSpeed, 180);
  skeleton.changeAnimation('walkingSkeletonLeft');
  skelChangeDir = -skelChangeDir;
}

function borderCollide() { //describes interference between sprites
  knight.collide(borderTop);
  knight.collide(borderBottom);
  knight.collide(borderLeft);
  knight.collide(borderRight);
  knight.collide(forestLeft);
  knight.collide(forestRight);
  knight.collide(fenceR1);
  knight.collide(fenceL1);
  knight.collide(fenceR2);
  knight.collide(fenceL2);
  skeletons.collide(borderGroup);
}

function skelStop() { //stops skeleton with no turn
  if (skeleton.getDirection() == 0) {
    skeleton.setSpeed(0, 0);
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.setSpeed(0, 180);
  }
}


//                                       ATTACK SECTION

function shoot() { //throws the axe
  if (keyWentDown(32)) {
    createAxe();
    if(angle == 180) {
      axe.changeAnimation('shootingLeft');
    }
    throwSound.setVolume(0.1);
    throwSound.play();
    axe.setSpeed(6, angle);
  } 
}

function checkDeath() { //checks axe overlapping skeleton
  axes.overlap(skeletons, skeletonDeath);
}

function skeletonDeath(axe, skeleton) { //skeleton death
  axe.remove();
  hit.setVolume(0.1);
  hit.play();

  if (skeleton.getDirection() == 0) {
    skeleton.setSpeed(0.1, 0);
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.setSpeed(0.1, 180);
  }

  if (skeleton.getDirection() == 0) {
    skeleton.changeAnimation('deathSkeletonRight');
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.changeAnimation('deathSkeletonLeft');
  }
  setTimeout(skeletonRemove, 800);
  //setTimeout(createNewEnemy, 800);
}

function createNewEnemy(){ //generates new skeletons (not used in sketch yet)
  enemy();
  if (skeleton.getDirection() == 0) {
    skeleton.setSpeed(0, 0);
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.setSpeed(0, 180);
  }
}

function skeletonRemove() { //skeleton sprite remove
  skelDeathX = skeleton.position.x;
  skelDeathY = skeleton.position.y;
  skelKilled = 1;
  skeleton.remove();
  createCoin();
}

function triggerAttack() { //checks Loki overlapping skeleton
  if (trigger == 1) {
    knight.overlap(skeletons, skeletonAttack);
  }
}

function makeAnotherAttack() { //does not allow skeleton to attack infinitely
  if (anotherAttack == 1) {
    skeletonAttack();
  }
}

function skeletonAttack() { //skeleton attack
  if (skeleton.getDirection() == 0) {
    skeleton.setSpeed(0.1, 0);
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.setSpeed(0.1, 180);
  }

  if (skeleton.getDirection() == 0) {
    skeleton.changeAnimation('attackSkeletonRight');
  }
  else if (skeleton.getDirection() == 180) {
    skeleton.changeAnimation('attackSkeletonLeft');
  }

  knight.setSpeed(0.1, angle);
  if (prevAngle == 0) {
    knight.changeAnimation('gettingDamageRight');
  }
  else if (prevAngle == 180) {
    knight.changeAnimation('gettingDamageLeft');
  }

  setTimeout(skelStop, 1000);
  delayDamage();
  setTimeout(delayAttack, 4000);
  setTimeout(afterDamage, 1000);
  setTimeout(skeletonMove, 1000);
}

function delayDamage() { //makes character immune to attack for some time after previous attcks
  knight.overlap(skeletons, dealDamage);
}

function dealDamage() { //reduces livies of Loki
  if (anotherAttack == 1) {
    knightLives -= 1;
    setTimeout(dealDamageSound, 300);
  }
  anotherAttack = 0;
}

function dealDamageSound() { //delays the sound of the attack
  skelHit.setVolume(1);
  skelHit.play();
}

function delayAttack() { //allows skeleton to attack
  anotherAttack = 1;
}

function afterDamage() { //Loki getting damage animation
  if (prevAngle == 180) {
    knight.changeAnimation('walkingKnightAxeLeft');
  }
  else {
    knight.changeAnimation('walkingKnightAxeRight');
  }
}

function checkLife() { //checks if Loki is still alive
  if (knightLives <= 0) {
    knight.setSpeed(0, angle);
    knight.changeAnimation('deathRight');
    anotherAttack = 0;
    trigger = 0;
    ost.stop();
    heart.changeAnimation('noHeart');
    setTimeout(knightDead, 600);
  }
}

function knightDead() { //Loki death animation
  if (delayPar == 1) {
    knight.changeAnimation('death');
    setTimeout(moveToBadEnd, 1000);
    gameOver.setVolume(0.1);
    gameOver.play();
    delayPar = 0;
    setTimeout(soundDelay, 2000);
  }
}

function moveToBadEnd() { //triggers the loosing screen
  ifStart = 100;
}

//                                        GAIN SMTH
function getCoin() { //Loki getting coins
  knight.overlap(coins, collectCoin);
}

function collectCoin() { //getting coins animation
  coinSound.setVolume(0.1);
  coinSound.play();
  gold += 1;
  coin.remove();
}

function escape() { //Loki finding exit
  knight.overlap(door, moveToGoodTime);
}

function moveToGoodTime() { //triggers the winning screen
  if (delayPar == 1) {
    setTimeout(moveToGood, 500);
    ost.stop();
    exit.setVolume(0.1);
    exit.play();
    delayPar = 0;
    setTimeout(soundDelay, 2000);
  }
}

function moveToGood() { //sub function for winning trigger
  stateChanged = true;
  ifStart = 101;
  win.setVolume(0.2);
  win.play();
}

function soundDelay() { //does not allow music to play infinitely
  delayPar = 1;
}

//                                         STATS
function createHeart() { //creates lives animation
  heart = createSprite(100, 72);
  heart.scale = 2;
  heart.addAnimation('single', 'assets/hearts_1.png');
  heart.addAnimation('double', 'assets/hearts_2.png');
  heart.addAnimation('tripple', 'assets/hearts_3.png');
  heart.addAnimation('noHeart', '');
  heart.changeAnimation('tripple');
}

function checkHearts() { //displays Loki's lives
  if (knightLives == 3) {
    heart.changeAnimation('tripple');
  }
  else if (knightLives == 2) {
    heart.changeAnimation('double');
  }
  else if (knightLives == 1) {
    heart.changeAnimation('single');
  }
  else if (knightLives == 0) {
    heart.changeAnimation('noHeart');
  }
}

function score() { //counts gained gold
  textFont(pixelFont, 10);
  fill(0);
  text(gold, 170, borderThickness + 6);
}

function goldScoreImg() { //draws gold icon
  coinStats = createSprite (160, borderThickness);
  coinStats.scale = 2;
  coinStats.addAnimation('justcoin', 'assets/coin_0001.png');
  coinStats.changeAnimation('justcoin');
}


function over() {
  background(255, 112, 112);
  text('GAME OVER', 40, 50, 50);
  text('press R to restart', 60, 80, 150);

  if (stateChanged) {
      stateChanged = false;
      let body  = document.querySelector('body');

      let form = document.createElement('form');
      form.setAttribute('class', 'form');

      let newBtn = document.createElement('button');
      newBtn.textContent = "Save";

      let newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');

      let allBtn = document.createElement('button');
      allBtn.textContent = "Top3";

      body.appendChild(allBtn);
      body.appendChild(form);
      form.appendChild(newInput);
      form.appendChild(newBtn);

      allBtn.addEventListener('click', (e) => {
          fetch('/top')
          .then(resp => resp.json())
          .then(data => console.log(data));
      });

      form.addEventListener('submit', (e) => {
          console.log("Button pressed");

          fetch('/save', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset = utf-8'
              },
              body: JSON.stringify({name: newInput.value, score:100})
          })
          .then(resp => resp.json())
          .then(data => console.log(data));

          e.preventDefault();
      });
  }
}
