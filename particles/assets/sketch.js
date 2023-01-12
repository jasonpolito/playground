const CAPACITY = 10;
const PARTICLE_COUNT = 500;
const PERCEPTION_RADIUS = 25;
let quadtree;
let boundary;
let flock = [];
let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    boundary = new QuadTreeSubdvision(0, 0, windowWidth, windowHeight);
    quadtree = new QuadTree(boundary, CAPACITY);
    // alignSlider = createSlider(0, 2, 1.5, 0.1);
    // cohesionSlider = createSlider(0, 2, 1, 0.1);
    // separationSlider = createSlider(0, 2, 2, 0.1);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = randomGaussian(width / 2, height / 8);
        let y = randomGaussian(width / 2, height / 8);
        let boid = new Boid(x, y);
        flock.push(boid);
    }
}

function rebuildTree() {
    quadtree = new QuadTree(boundary, CAPACITY);
    flock.forEach(item => quadtree.insert(item));
}

function draw() {
    background(0);
    rebuildTree();

    for (let boid of flock) {
        let others = quadtree.query(new QuadTreeSubdvision(boid.pos.x - PERCEPTION_RADIUS, boid.pos.y - PERCEPTION_RADIUS, PERCEPTION_RADIUS * 2, PERCEPTION_RADIUS * 2))
        boid.flock(others);
        boid.edges();
        boid.update();
        boid.render();
    }

    let focusMember = flock[0];
    let others = quadtree.query(new QuadTreeSubdvision(focusMember.pos.x - PERCEPTION_RADIUS, focusMember.pos.y - PERCEPTION_RADIUS, PERCEPTION_RADIUS * 2, PERCEPTION_RADIUS * 2))
    noFill();
    stroke(0, 255, 0);
    strokeWeight(0.25);
    circle(focusMember.pos.x, focusMember.pos.y, PERCEPTION_RADIUS * 2)
    for (const other of others) {
        strokeWeight(4);
        point(other.pos.x, other.pos.y)
    }
    stroke(255, 255, 100);
    strokeWeight(8);
    point(focusMember.pos.x, focusMember.pos.y)
    quadtree.render();

}