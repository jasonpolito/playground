const PARTICLE_COUNT = 50;
let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = new Particle;
        particles.push(particle);
    }
}

function draw() {
    background(0);
    particles.forEach(p => {
        p.update();
        p.render();
    })
}