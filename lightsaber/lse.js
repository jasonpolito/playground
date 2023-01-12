class LightSaberEffect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext('2d');
        this.animate();
    }

    drawVideo() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
    }

    getLocations() {
        const locs = getMarkedLocations(this.ctx);
        return locs;
    }

    drawMarkedLocations() {
        const locs = this.getLocations();
        if (locs.length > 0) {
            for (let i = 0; i < locs.length; i++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'blue';
                this.ctx.rect(locs[i][0], locs[i][1], 1, 1);
                this.ctx.fill();
            }
            console.log('locations:', locs)
            const avg = average(locs);
            this.ctx.beginPath();
            this.ctx.fillStyle = 'red';
            this.ctx.arc(...avg, 10, 0, Math.PI * 2);
            this.ctx.fill();

            let start = getFarthestFrom(locs, avg);
            let end = getFarthestFrom(locs, start);
            let setA = []
            let setB = []
            for (let i = 0; i < locs.length; i++) {
                if (distance(start, locs[i]) < distance(end, locs[i])) {
                    setA.push(locs[i]);
                } else {
                    setB.push(locs[i]);
                }
            }
            start = average(setA);
            end = average(setB);
            this.ctx.beginPath();
            this.ctx.fillStyle = 'lime';
            this.ctx.arc(...start, 10, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle = 'orange';
            this.ctx.arc(...end, 10, 0, Math.PI * 2);
            this.ctx.fill();


            this.ctx.beginPath();
            this.ctx.strokeStyle = 'white';
            this.ctx.shadowColor = 'white';
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = distance(start, end) * 0.1;
            this.ctx.shadowBlur = distance(start, end) * 0.1;
            this.ctx.moveTo(...end)
            const length = 5;
            const tip = [
                start[0] + (end[0] - start[0]) * length,
                start[1] + (end[1] - start[1]) * length,
            ]
            this.ctx.lineTo(...tip)
            this.ctx.stroke();
        }
    }

    animate() {
        this.drawVideo();
        this.drawMarkedLocations();

        requestAnimationFrame(this.animate.bind(this));
    }
}