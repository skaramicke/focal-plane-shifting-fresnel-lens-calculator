class PlaneDrawer {
  static drawFocalPlane(x, size, label) {
    const ctx = canvasManager.ctx;
    const centerY = canvasManager.centerY;
    const scale = canvasManager.scale;

    // Calculate the height for display based on the actual size in mm
    const displayHeight = (size / 2) * scale;

    // Cap height to prevent going off canvas
    const maxAllowedHeight = canvasManager.canvas.height / 2 - 40;
    const cappedHeight = Math.min(displayHeight, maxAllowedHeight);

    // Draw vertical line for focal plane
    ctx.beginPath();
    ctx.moveTo(x, centerY - cappedHeight);
    ctx.lineTo(x, centerY + cappedHeight);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add arrows at ends
    this.drawArrow(x, centerY - cappedHeight, 0, -10);
    this.drawArrow(x, centerY + cappedHeight, 0, 10);

    // Add labels
    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, centerY - cappedHeight - 15);
    ctx.fillText(`${size.toFixed(1)} mm`, x, centerY + cappedHeight + 20);

    // Show scale reduction message if height was capped
    if (displayHeight > cappedHeight) {
      ctx.fillStyle = "#777";
      ctx.font = "10px Arial";
      ctx.fillText("(scaled to fit)", x, centerY + cappedHeight + 35);
    }
  }

  static drawLightRays(positions, originalSize, targetSize) {
    const ctx = canvasManager.ctx;
    const centerY = canvasManager.centerY;
    const scale = canvasManager.scale;

    // Convert sizes to pixel heights using the scale factor
    const origHeightPx = Math.min(
      (originalSize / 2) * scale,
      canvasManager.canvas.height / 2 - 50
    );
    const targetHeightPx = Math.min(
      (targetSize / 2) * scale,
      canvasManager.canvas.height / 2 - 50
    );

    const { originalPlaneX, lens1X, lens2X, targetPlaneX } = positions;

    // Draw three rays: top, center, and bottom
    this.drawRay(
      originalPlaneX,
      centerY - origHeightPx,
      lens1X,
      centerY - origHeightPx * 0.8,
      lens2X,
      centerY - targetHeightPx * 0.8,
      targetPlaneX,
      centerY - targetHeightPx
    );

    this.drawRay(
      originalPlaneX,
      centerY,
      lens1X,
      centerY,
      lens2X,
      centerY,
      targetPlaneX,
      centerY
    );

    this.drawRay(
      originalPlaneX,
      centerY + origHeightPx,
      lens1X,
      centerY + origHeightPx * 0.8,
      lens2X,
      centerY + targetHeightPx * 0.8,
      targetPlaneX,
      centerY + targetHeightPx
    );
  }

  static drawRay(x1, y1, x2, y2, x3, y3, x4, y4) {
    const ctx = canvasManager.ctx;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  static drawArrow(x, y, dx, dy) {
    const ctx = canvasManager.ctx;
    const headLength = 5;
    const headAngle = Math.PI / 6;

    // Calculate arrow head points
    const angle = Math.atan2(dy, dx);
    const x1 = x + headLength * Math.cos(angle + headAngle);
    const y1 = y + headLength * Math.sin(angle + headAngle);
    const x2 = x + headLength * Math.cos(angle - headAngle);
    const y2 = y + headLength * Math.sin(angle - headAngle);

    // Draw arrow head
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
