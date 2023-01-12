class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.025;
        this.maxSpeed = 2;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    align(boids) {
        let perceptionRadius = PERCEPTION_RADIUS;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 24;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.pos);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(1.2);
        cohesion.mult(0.8); //cohesionSlider.value());
        separation.mult(1.5); //separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    render() {
        strokeWeight(2);
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}