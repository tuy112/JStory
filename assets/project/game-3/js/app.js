class App {
    constructor() {
        this.canvas = document.getElementById('ball');\
        this.ctx = this.canvas.getContext('2d');

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        window.requestAnimationFrame(this.animate);
    }
    animate = () => {
        window.requestAnimationFrame(this.animate);
    }
}

// working
window.onload = () => {
    new App();
};
