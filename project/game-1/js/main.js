// canvas 만들기
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


/*
var img1 = new Image();
img1.src = '../images/walking.png';
var img2 = new Image();
img2.src = '../images/knife.png';
*/

// 캐릭터 생성
var human = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        // ctx.drawImage(img1,this.x,this.y);
    }
}
// human.draw();


// 장매물
class Hurdle {
    constructor() {
        this.x = 800;
        this.y = 215;
        this.width = 20 ;
        this.height = 20;
    }
    draw() {
        ctx.fillStyle = "aqua";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        // ctx.drawImage(img2,this.x,this.y);
    }
}
var hurdle = new Hurdle();
hurdle.draw();



// 애니메이션
var timer = 0;
var hurdles = [];
var jumpTimer = 0;
var animation;

function frameStart() {
    animation = requestAnimationFrame(frameStart);
    timer++;

    ctx.clearRect(0,0,canvas.width,canvas.height); // 캔버스 클리어

    if (timer % 190  === 0) {
        let hurdle = new Hurdle();
        hurdles.push(hurdle);
        hurdle.draw();
    }
    hurdles.forEach((a, i, o)=>{
        // x좌표가 0미만이면 제거
        if (a.x < 0) {
            o.splice(i,1);
        } 
        a.x--;

        crush(human,a); // 충돌체크는 여기서..

        a.draw();
    })
    
    hurdle.draw();
    if ( jumping == true ) {
        human.y--;
        jumpTimer++;
    }
    if ( jumping == false) {
        if ( human.y < 200 ) {
            human.y++;
        }
    }
    if (jumpTimer > 80 ) {
        jumping = false;
        jumpTimer = 0;
    }
    human.draw();
}
frameStart();


// 스페이스바 누르면 점프 기능
var jumping = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space') {
        jumping = true;
    }
})

// 장애물 충돌 감지
function crush(human,hurdle) {
    var xdifer = hurdle.x - (human.x + human.width);
    var ydifer = hurdle.y - (human.y + human.height);
    if ( xdifer < 0 && ydifer < 0 ) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    }
}