class QuadTreeSubdvision {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(item) {
        let contains = (item.pos.x >= this.x &&
            item.pos.x < this.x + this.w &&
            item.pos.y >= this.y &&
            item.pos.y < this.y + this.h);
        return contains;
    }

    intersects(range) {
        const intersects = (
            this.x + this.w < range.x ||
            this.y + this.h > range.y ||
            this.x > range.x + range.w ||
            this.y > range.y + range.h
        );
        return intersects;
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.items = [];
        this.subdivisions = {};
        this.isDivided = false;
    }

    subdivide() {
        const {
            x,
            y,
            h,
            w
        } = this.boundary;
        const quadrants = {
            nw: [x, y],
            ne: [x + w / 2, y],
            sw: [x, y + h / 2],
            se: [x + w / 2, y + h / 2],
        }
        for (let key in quadrants) {
            this.subdivisions[key] = new QuadTree(new QuadTreeSubdvision(...quadrants[key], w / 2, h / 2), this.capacity);
        }
        this.isDivided = true;
    }

    insert(item) {

        if (!this.boundary.contains(item)) return false;

        if (this.items.length < this.capacity) {
            this.items.push(item);
        } else {
            if (!this.isDivided) {
                this.subdivide();
            }
            for (let key in this.subdivisions) {
                this.subdivisions[key].insert(item);
            }
        }
    }

    query(range, result) {
        if (!result) {
            result = [];
        }
        if (!this.boundary.intersects(range)) return result;

        for (let p of this.items) {
            if (range.contains(p)) {
                result.push(p);
            }
        }

        for (let key in this.subdivisions) {
            this.subdivisions[key].query(range, result);
        }

        return result;
    }

    render() {
        let {
            x,
            y,
            h,
            w
        } = this.boundary;
        stroke(255);
        strokeWeight(0.05);
        noFill();
        rect(x, y, w, h);
        if (this.isDivided) {
            for (let key in this.subdivisions) {
                this.subdivisions[key].render();
            }
        }
        // for (let p of this.items) {
        //     p.render()
        // }
    }
}