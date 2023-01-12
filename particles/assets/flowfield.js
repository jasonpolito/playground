let particleCount = 5000;
let inc = 0.05;
let scl = 20;
let zoff = 0;
let cols;
let flowfield = [];
let particles = [];
let row;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = Math.floor(width / scl);
    rows = Math.floor(height / scl);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
    }
}

function draw() {
    background(0);
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let flowfieldIndex = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI * -1;
            let v = p5.Vector.fromAngle(angle);
            flowfield[flowfieldIndex] = v;
            v.setMag(0.025)
            // stroke(255, 40)
            // strokeWeight(1);
            // push();
            // translate(x * (width / cols), y * (height / rows))
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
            xoff += inc;
        }
        yoff += inc;

    }
    zoff += 0.005;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let x = Math.floor(p.pos.x / scl);
        let y = Math.floor(p.pos.y / scl);
        let index = x + y * cols;
        let v = flowfield[index];
        p.applyForce(v);
        p.update();
        p.render();
        if (p.isOffScreen()) {
            p.wrapScreen();
        }

    }
}