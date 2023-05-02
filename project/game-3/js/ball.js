export class Ball {
    constructor( stageWidth, stageHeight, radius,speed ) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        // 원 크기
        const diameter = this.radius * 2;

        // 공의 시작지점
        this.x = (Math.floor(Math.random() * (stageWidth - (diameter * 2 )))+ diameter);
        this.y = (Math.floor(Math.random() * (stageHeight - (diameter * 2 )))+ diameter);
    }
    draw(ctx, stageWidth, stageHeight) {
        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = '#f5f5f5';

        this.bounce(stageWidth, stageHeight)
    }
}