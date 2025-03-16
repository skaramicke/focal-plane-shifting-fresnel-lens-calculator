class MeasurementDrawer {
  static drawMeasurements(positions) {
    const { originalPlaneX, lens1X, lens2X, targetPlaneX } = positions;
    const centerY = canvasManager.centerY;
    const state = fresnelSystem.state;

    // Draw measurements for each component
    this.drawMeasurement(
      originalPlaneX,
      lens1X,
      centerY + 60,
      `${state.f1.toFixed(1)} mm`
    );

    this.drawMeasurement(
      lens2X,
      targetPlaneX,
      centerY + 60,
      `${state.f2.toFixed(1)} mm`
    );

    this.drawMeasurement(
      lens1X,
      lens2X,
      centerY + 100,
      `${state.lensDistance.toFixed(1)} mm`
    );

    this.drawMeasurement(
      originalPlaneX,
      targetPlaneX,
      centerY + 140,
      `${state.distance.toFixed(1)} mm`
    );
  }

  static drawMeasurement(x1, x2, y, label) {
    const ctx = canvasManager.ctx;

    // Draw horizontal line with arrows
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.strokeStyle = "#666";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw arrows at both ends
    PlaneDrawer.drawArrow(x1, y, -5, 0);
    PlaneDrawer.drawArrow(x2, y, 5, 0);

    // Add measurement label
    ctx.fillStyle = "#666";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, (x1 + x2) / 2, y - 5);
  }
}
