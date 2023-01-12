const POINT_COUNT = 8;
const STEP = 500;

let beats = 0;
let points = [];
let tones = [200, 400, 500, 450, 500, 450, 500, 400];

function setup() {
    createCanvas(windowWidth, windowHeight);
    getAudioContext().resume();
    for (let i = 0; i < POINT_COUNT; i++) {
        points.push(new Particle());
    }

}

function draw() {
    background(0);
    points.forEach(point => {
        point.update();
        point.render();
    })
}