class FresnelSystem {
  constructor() {
    this.state = {
      originalSize: 56, // Hasselblad 500c/m film diagonal
      targetSize: 21.5, // Sony QX-1 sensor diagonal
      distance: 50, // Default distance
      manualLensSeparation: 0,
      f1: 0,
      f2: 0,
      lensDistance: 0,
      magnification: 0,
      lens1Diameter: 0,
      lens2Diameter: 0,
      fNumber1: 0,
      fNumber2: 0,
    };
  }

  updateInputs(originalSize, targetSize, distance, manualLensSeparation) {
    this.state.originalSize = parseFloat(originalSize);
    this.state.targetSize = parseFloat(targetSize);
    this.state.distance = parseFloat(distance);
    this.state.manualLensSeparation = parseFloat(manualLensSeparation) || 0;
  }

  updateCalculatedValues(
    f1,
    f2,
    lensDistance,
    magnification,
    lens1Diameter,
    lens2Diameter,
    fNumber1,
    fNumber2
  ) {
    Object.assign(this.state, {
      f1,
      f2,
      lensDistance,
      magnification,
      lens1Diameter,
      lens2Diameter,
      fNumber1,
      fNumber2,
    });
  }

  validateInputs() {
    const { originalSize, targetSize, distance } = this.state;

    if (isNaN(originalSize) || isNaN(targetSize) || isNaN(distance)) {
      throw new Error("Please enter valid numbers for all fields.");
    }

    if (originalSize <= 0 || targetSize <= 0 || distance <= 0) {
      throw new Error("All values must be positive.");
    }

    return true;
  }
}

// Create global instance
const fresnelSystem = new FresnelSystem();
