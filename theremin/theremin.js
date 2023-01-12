class LightSaberEffect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext('2d');
        const audioCtx = new AudioContext();
        this.osc = audioCtx.createOscillator();
        this.panner = audioCtx.createStereoPanner();
        this.osc.connect(audioCtx.destination);
        this.panner.connect(audioCtx.destination);
        this.osc.frequency.value = 0;
        this.panner.pan.value = 0;
        // this.osc.pan.value = 0;
        this.osc.start();
        this.animate();
    }

    drawVideo() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
    }

    getLocations() {
        const locs = getMarkedLocations(this.ctx);
        return locs;
    }

    drawLine(center) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'lime';
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(0, center[1]);
        this.ctx.lineTo(this.canvas.width, center[1])
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(center[0], 0);
        this.ctx.lineTo(center[0], this.canvas.height)
        this.ctx.stroke();
    }

    setFrequency(center) {
        const p = 1 - (center[1] / this.canvas.height);
        const freq = 200 + 500 * p;
        this.osc.frequency.value = freq;
    }

    animate() {
        this.drawVideo();
        const locs = this.getLocations();
        if (locs.length > 0) {
            const center = average(locs);

            this.setFrequency(center);
            this.drawLine(center);
        } else {
            this.osc.frequency.value = 0;

        }
        requestAnimationFrame(this.animate.bind(this));
    }
}