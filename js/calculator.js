class FresnelCalculator {
  static calculateSystem() {
    const { originalSize, targetSize, distance, manualLensSeparation } =
      fresnelSystem.state;

    // Calculate magnification
    const magnification = targetSize / originalSize;

    let f1, f2, lensDistance;

    if (manualLensSeparation > 0) {
      // If lens separation is manually specified
      lensDistance = manualLensSeparation;

      // Using the formula: M = f2/f1 and d_total = f1 + lensDistance + f2
      f1 = (distance - lensDistance) / (1 + magnification);
      f2 = magnification * f1;

      // Validate the solution
      if (f1 <= 0 || f2 <= 0) {
        throw new Error(
          "Manual lens separation is too large for this configuration."
        );
      }
    } else {
      // Auto calculate lens parameters
      f1 = distance / (1 + magnification);
      f2 = magnification * f1;

      // Calculate the separation between lenses
      lensDistance = Math.max(10, distance - (f1 + f2));
    }

    // Calculate lens diameters (based on covering the respective focal planes)
    const lens1Diameter = originalSize * 1.2; // 20% larger than original focal plane
    const lens2Diameter = targetSize * 1.2; // 20% larger than target focal plane

    // Calculate f-numbers (f-number = focal length / diameter)
    const fNumber1 = f1 / lens1Diameter;
    const fNumber2 = f2 / lens2Diameter;

    // Update system state with calculated values
    fresnelSystem.updateCalculatedValues(
      f1,
      f2,
      lensDistance,
      magnification,
      lens1Diameter,
      lens2Diameter,
      fNumber1,
      fNumber2
    );

    return {
      f1,
      f2,
      lensDistance,
      magnification,
      lens1Diameter,
      lens2Diameter,
      fNumber1,
      fNumber2,
    };
  }
}
