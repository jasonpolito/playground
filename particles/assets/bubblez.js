const PARTICLE_COUNT = 1000;
const BUBBLE_SCL = 60;
const NOISE_SCL = 0.8;
let quadtree, boundary;
let particles = [];
let zoff = 1;
let xoff = 1;
let yoff = 1;

class Bubble {
    constructor(x = random(width), y = random(height)) {
        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0.01);
        this.radius = random(1, 5);
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
    }

    render() {
        strokeWeight(this.radius);
        point(this.pos.x, this.pos.y);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    boundary = new QuadTreeSubdvision(0, 0, windowWidth, windowHeight);
    quadtree = new QuadTree(boundary);
    stroke(255)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0);
    particles.forEach((particle, i) => {
        const x = particle.pos.x + xoff;
        const y = particle.pos.y + yoff;
        const n = noise(x * NOISE_SCL, y * NOISE_SCL);
        const r = map(n, 0, 1, 0, BUBBLE_SCL);
        particle.r = r;
        const color = map(n, 0, 1, 0, 255)
        particle.color = {
            r: color,
            g: color,
            b: color,
        };
        particle.update();
        particle.render();
    })
    xoff += 0.0025;
    yoff += 0.0025;
    quadtree.render();
}