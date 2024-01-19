// canvas
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 354;
document.body.appendChild(canvas);

let backgroundImage,humanImage,enemyImage,enemy2Image,vegetableImage,gameoverImage,bulletImage;
let gameover = false; // true : gameover
let score = 0;

// 사람 좌표
let humanX = 0;
let humanY = canvas.height - 64;

// 총알
let bulletList = [] // 총알들을 저장하는 공간
function Bullet() {
    this.x = 0; 
    this.y = 0;
    this.init = function(){
        this.x = humanX + 12.5;
        this.y = humanY - 10;

        this.alive = true; //true면 살아있는 총알
        bulletList.push(this);
    }
    // 총알 발사
    this.update = function(){
        this.y -= 6;
    }

    // 총알이 적군에 맞았을 때
    this.checkHit = function() {
        for(let i = 0; i< enemyList.length; i++){
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+42){
                // 점수를 흭득하고 + 적군이 사라지게 됨
                score++;
                this.alive = false;
                enemyList.splice(i,1);
            }
        }
    }
}


// 랜덤 생성 함수
function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;
}
// 적군 만들기
let enemyList = [];
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function() {
        this.y = 0;
        this.x = generateRandomValue(0,canvas.width-42);
        enemyList.push(this);
    };
    // 적군이 내려오도록...
    this.update = function(){
        this.y += 1;

        // gameover
        if (this.y >= canvas.height -42 ) {
            gameover = true;
            console.log("gameover");
        }
    }
}




function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "./images/background.gif";

    humanImage = new Image();
    humanImage.src = "./images/human.png";

    enemyImage = new Image();
    enemyImage.src = "./images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "./images/gameover.png";
    
    bulletImage = new Image();
    bulletImage.src = "./images/bullet.png";
}

// 방향키를 누르면 x,y좌표가 바뀌게
let keysDown = {}; 
function setupKeyboardListener() {
    document.addEventListener('keydown',function(event){
        keysDown[event.keyCode] = true;
        // console.log('키다운객체에 들어간 값은?',keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        // console.log("버튼 클릭 후",keysDown);

        if(event.keyCode == 32){
            createBullet() // 총알 생성
        }
    })
}

function createBullet() {
    console.log("총알 생성");
    let b = new Bullet();
    b.init();
    // console.log("새로운 총알 리스트",bulletList);
}

function createEnemy() {
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    },800)
}

function update() {
    if(39 in keysDown){
        humanX += 10;
    //right
    }
    if(37 in keysDown){
        humanX -= 10;
    }
    //left

    // 사람이 경기장 밖으로 나가지 않도록...
    if(humanX <= 0){
        humanX = 0;
    }
    if(humanX >= canvas.width-64){
        humanX = canvas.width-64;
    }

    // 총알 y좌표 업데이트하는 함수 호출
    for(let i = 0; i < bulletList.length; i++){
        if ( bulletList[i].alive ) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    // 적군 y좌표 업데이트
    for(let i = 0; i<enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render() {
    // ctx.drawImage(image,dx,dy,dWidth,dHeight);
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
    ctx.drawImage(humanImage,humanX,humanY);

    ctx.fillText(score,20,30);
    ctx.fillStyle = '#111';
    ctx.font = '20px Arial';

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)
        }
    }

    for(let i=0; i<enemyList.length; i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y)
    }
}

function main() {
    if (!gameover) {
        update(); // 좌표 값 업데이트 
        render(); // 그려주다
        requestAnimationFrame(main);
    }else {
        ctx.drawImage(gameoverImage,200,10,200,200);
    }

}

loadImage();
setupKeyboardListener();
createEnemy();
main();



// 총알 만들기
// 1. 스페이스바를 누르면 발사
// 2. 총알이 발사 = 총알의 y값이 --, 총알의 x값은? 스페이스를 누른 순간의 우주선
// 3. 발사된 총알들은 총알 배열에 저장을 한다
// 4. 총알들은 x,y좌표 값이 있어야 한다
// 5. 총알 배열을 가지고 render (그려준다)


// 적군 만들기
// x,y,init,update
// 적군은 위치가 랜덤
// 적군은 밑으로 내려온다 (y좌표가 증가)
// 1초마다 하나씩 적군이 나옴
// 적군의 우주선이 바닥에 닿으면 게임오버
// 적군과 총알이 만나면 우주선이 사라진다 (점수 1점 흭득)