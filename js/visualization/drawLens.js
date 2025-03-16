class LensDrawer {
  static drawLens(x, diameter, label, focalLength) {
    const ctx = canvasManager.ctx;
    const centerY = canvasManager.centerY;
    const scale = canvasManager.scale;

    // Scale diameter for display
    const lensDisplayHeight = (diameter / 2) * scale;

    // Cap height to prevent going off canvas
    const maxAllowedHeight = canvasManager.canvas.height / 2 - 40;
    const cappedHeight = Math.min(lensDisplayHeight, maxAllowedHeight);

    // Draw lens shape (vertical line)
    ctx.beginPath();
    ctx.moveTo(x, centerY - cappedHeight);
    ctx.lineTo(x, centerY + cappedHeight);
    ctx.strokeStyle = "#0066cc";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Fresnel rings (simplified representation)
    this.drawFresnelRings(x, centerY, cappedHeight);

    // Add labels
    this.drawLabels(x, centerY, cappedHeight, label, focalLength, diameter);
  }

  static drawFresnelRings(x, centerY, height) {
    const ctx = canvasManager.ctx;
    const numRings = 7;
    const ringSpacing = height / numRings;

    for (let i = 1; i <= numRings; i++) {
      // Top rings
      ctx.beginPath();
      ctx.moveTo(x - 4, centerY - i * ringSpacing);
      ctx.lineTo(x + 4, centerY - i * ringSpacing);
      ctx.strokeStyle = "rgba(0, 102, 204, 0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bottom rings
      ctx.beginPath();
      ctx.moveTo(x - 4, centerY + i * ringSpacing);
      ctx.lineTo(x + 4, centerY + i * ringSpacing);
      ctx.stroke();
    }
  }

  static drawLabels(x, centerY, height, label, focalLength, diameter) {
    const ctx = canvasManager.ctx;

    ctx.fillStyle = "#0066cc";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, centerY - height - 10);
    ctx.fillText(`f = ${focalLength.toFixed(1)} mm`, x, centerY - height - 25);
    ctx.fillText(`Ø = ${diameter.toFixed(1)} mm`, x, centerY - height - 40);

    // Show scale reduction message if height was capped
    if (height < (diameter / 2) * canvasManager.scale) {
      ctx.fillStyle = "#777";
      ctx.font = "10px Arial";
      ctx.fillText("(scaled to fit)", x, centerY + height + 35);
    }
  }
}
