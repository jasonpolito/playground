class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    render() {
        strokeWeight(2);
        point(this.x, this.y);
    }
}