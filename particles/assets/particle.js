class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.acc = createVector(random(), random());
        this.vel = createVector(0, 0);
        this.r = random(1, 6);
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
            this.wrapScreen();
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.points.push(this.pos.copy())
        if (this.points.length > 20) {
            this.points = this.points.slice(0, 1);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    isOffScreen() {
        return this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0;
    }

    wrapScreen() {
        if (false && Math.random() < 0.35) {
            this.pos = createVector(random(width), random(height));
        } else {
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
    }

    render() {
        strokeWeight(this.r);
        stroke(this.color.r, this.color.g, this.color.b, this.color.a);
        point(this.pos.x, this.pos.y)
        // noFill();
        // if (this.points.length > 1) {
        //     beginShape();
        //     vertex(this.points[0].x, this.points[0].y);
        //     vertex(this.points[1].x, this.points[1].y);
        //     // this.points.forEach(p => {
        //     //     vertex(p.x, p.y)
        //     //     vertex(p.x * 2, p.y * 2)
        //     // });
        //     endShape(CLOSE);
        // }
    }
}