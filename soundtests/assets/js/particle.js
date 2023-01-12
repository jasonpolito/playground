class Particle {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.acc = createVector(random(2), random(2));
        this.vel = createVector(0, 0);
        this.r = 50;
        this.osc = new p5.Oscillator('sine');
        this.osc.amp(0);
        this.osc.freq(tones[0]);
        this.osc.start();
        this.maxSpeed = this.r / 2;
        this.points = [this.pos];
        this.color = {
            r: random(50, 255),
            g: random(100, 255),
            b: random(200, 255),
            a: random(50, 255),
        }
    }

    update() {
        if (this.isOffScreen()) {
            this.handleEdges();
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        // this.points.push(this.pos.copy())
        // if (this.points.length > 20) {
        //     this.points = this.points.slice(0, 1);
        // }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    isOffScreen() {
        return this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0;
    }

    handleEdges(wrapScreen) {
        this.osc.freq(tones[beats % tones.length] - 150);
        this.osc.freq(tones[beats % tones.length] - 50, 0.1);
        this.osc.amp(1, 0.1);
        beats++;
        if (wrapScreen) {
            this.wrapScreen();
        } else {
            this.bounceScreen();
        }
        this.osc.amp(0, 0.5);
    }

    wrapScreen() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    bounceScreen() {
        if (this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height) {
            this.vel.y *= -1;
        }
        if (this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    render() {
        strokeWeight(this.r);
        stroke(this.color.r, this.color.g, this.color.b, this.color.a);
        point(this.pos.x, this.pos.y)
    }
}