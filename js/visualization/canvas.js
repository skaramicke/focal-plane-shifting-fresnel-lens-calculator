class CanvasManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.margin = 50;
    this.centerY = this.canvas.height / 2;
    this.scale = 1;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  calculateScale() {
    const { originalSize, targetSize, lens1Diameter, lens2Diameter, distance } =
      fresnelSystem.state;

    // Calculate the maximum dimension in mm for scaling
    const allSizes = [originalSize, targetSize, lens1Diameter, lens2Diameter];
    const maxSizeMM = Math.max(...allSizes);

    // Adaptive scaling based on distance and size
    const distanceScale =
      (this.canvas.width - 2 * this.margin) / (distance * 1.2);
    const sizeScale = (this.canvas.height - 140) / maxSizeMM;

    this.scale = Math.min(distanceScale, sizeScale);
  }

  drawOpticalAxis() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.margin, this.centerY);
    this.ctx.lineTo(this.canvas.width - this.margin, this.centerY);
    this.ctx.strokeStyle = "#999";
    this.ctx.setLineDash([5, 5]);
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  getPositions() {
    const { distance } = fresnelSystem.state;

    return {
      originalPlaneX: this.margin,
      targetPlaneX: this.margin + distance * this.scale,
      lens1X: this.margin + fresnelSystem.state.f1 * this.scale,
      lens2X:
        this.margin +
        (fresnelSystem.state.f1 + fresnelSystem.state.lensDistance) *
          this.scale,
    };
  }
}

// Create global instance
const canvasManager = new CanvasManager("visualization");
