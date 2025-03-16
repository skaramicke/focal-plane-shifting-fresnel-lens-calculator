class FresnelApp {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.calculateAndDraw();
  }

  initializeElements() {
    // Input elements
    this.originalSizeInput = document.getElementById("original-size");
    this.targetSizeInput = document.getElementById("target-size");
    this.distanceInput = document.getElementById("distance");
    this.lensSeparationInput = document.getElementById("lens-separation");
    this.calculateBtn = document.getElementById("calculate-btn");
    this.targetPositionSlider = document.getElementById("target-position");
    this.targetPositionValue = document.getElementById("target-position-value");

    // Result elements
    this.focalLength1Element = document.getElementById("focal-length-1");
    this.focalLength2Element = document.getElementById("focal-length-2");
    this.lensDistanceElement = document.getElementById("lens-distance");
    this.magnificationElement = document.getElementById("magnification");
    this.lens1DiameterElement = document.getElementById("lens1-diameter");
    this.lens2DiameterElement = document.getElementById("lens2-diameter");
    this.fNumber1Element = document.getElementById("f-number-1");
    this.fNumber2Element = document.getElementById("f-number-2");
    this.errorMessageElement = document.getElementById("error-message");
  }

  attachEventListeners() {
    this.calculateBtn.addEventListener("click", () => this.calculateAndDraw());
    this.targetPositionSlider.addEventListener("input", () =>
      this.handleTargetPositionChange()
    );
  }

  calculateAndDraw() {
    this.errorMessageElement.textContent = "";

    try {
      // Update system with current input values
      fresnelSystem.updateInputs(
        this.originalSizeInput.value,
        this.targetSizeInput.value,
        this.distanceInput.value,
        this.lensSeparationInput.value
      );

      // Validate inputs
      fresnelSystem.validateInputs();

      // Calculate new values
      const results = FresnelCalculator.calculateSystem();

      // Update display
      this.updateResultsDisplay(results);
      this.updateVisualization();
    } catch (error) {
      this.errorMessageElement.textContent = error.message;
    }
  }

  handleTargetPositionChange() {
    const newDistance = parseFloat(this.targetPositionSlider.value);
    this.targetPositionValue.textContent = newDistance;

    // Update distance in inputs and recalculate
    this.distanceInput.value = newDistance;
    this.calculateAndDraw();
  }

  updateResultsDisplay(results) {
    // Update all result elements with calculated values
    this.focalLength1Element.textContent = results.f1.toFixed(2);
    this.focalLength2Element.textContent = results.f2.toFixed(2);
    this.lensDistanceElement.textContent = results.lensDistance.toFixed(2);
    this.magnificationElement.textContent = results.magnification.toFixed(2);
    this.lens1DiameterElement.textContent = results.lens1Diameter.toFixed(2);
    this.lens2DiameterElement.textContent = results.lens2Diameter.toFixed(2);
    this.fNumber1Element.textContent = results.fNumber1.toFixed(2);
    this.fNumber2Element.textContent = results.fNumber2.toFixed(2);

    // Update slider range
    this.targetPositionSlider.value = fresnelSystem.state.distance;
    this.targetPositionSlider.max = Math.max(
      300,
      fresnelSystem.state.distance * 2
    );
    this.targetPositionValue.textContent = fresnelSystem.state.distance;
  }

  updateVisualization() {
    // Clear and prepare canvas
    canvasManager.clear();
    canvasManager.calculateScale();
    canvasManager.drawOpticalAxis();

    // Get positions for all components
    const positions = canvasManager.getPositions();
    const { originalSize, targetSize, lens1Diameter, lens2Diameter, f1, f2 } =
      fresnelSystem.state;

    // Draw system components
    PlaneDrawer.drawFocalPlane(
      positions.originalPlaneX,
      originalSize,
      "Original Plane"
    );
    PlaneDrawer.drawFocalPlane(
      positions.targetPlaneX,
      targetSize,
      "Target Plane"
    );

    LensDrawer.drawLens(positions.lens1X, lens1Diameter, "Lens 1", f1);
    LensDrawer.drawLens(positions.lens2X, lens2Diameter, "Lens 2", f2);

    PlaneDrawer.drawLightRays(positions, originalSize, targetSize);
    MeasurementDrawer.drawMeasurements(positions);
  }
}

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FresnelApp();
});
