# Fresnel Lens Calculator

A web-based calculator and visualization tool for designing a two-lens Fresnel system to shift between different focal plane sizes. This is particularly useful for adapting cameras between different formats, such as medium format to digital sensors.

## Overview

This calculator helps design a two-Fresnel-lens system that can adapt between different image formats while maintaining image quality. The primary use case is for adapting larger format cameras (like medium format) to smaller digital sensors while preserving the original lens characteristics.

### Features

- Calculate optimal Fresnel lens parameters for format conversion
- Interactive visualization of the optical system
- Real-time updates with distance slider
- Automatic and manual lens separation options
- Complete system measurements including:
  - Focal lengths
  - Lens diameters
  - F-numbers
  - Magnification ratio

## Usage

1. Open `index.html` in a modern web browser
2. Input your parameters:

   - Original Focal Plane Size (default: 56mm for Hasselblad 500c/m)
   - Target Focal Plane Size (default: 21.5mm for Sony QX-1)
   - Distance Between Focal Planes
   - Optional: Manual Lens Separation

3. Click "Calculate" to see results
4. Use the slider to adjust the target position and see how it affects the system

## Technical Details

### Calculations

The calculator uses these key formulas:

- Magnification (M) = Target Size / Original Size
- For auto lens separation:
  - f1 = Total Distance / (1 + M)
  - f2 = M × f1
- For manual lens separation:
  - f1 = (Total Distance - Lens Separation) / (1 + M)
  - f2 = M × f1

### Visualization

The system provides a dynamic visualization showing:

- Original and target focal planes
- Two Fresnel lenses with their parameters
- Light ray paths
- System measurements

## Implementation

The application is built using vanilla JavaScript with a modular architecture:

```text
/
├── index.html           # Main HTML structure
├── css/
│   └── styles.css      # Styling
└── js/
    ├── main.js         # Application initialization
    ├── system.js       # System state management
    ├── calculator.js   # Lens calculations
    └── visualization/  # Canvas drawing modules
        ├── canvas.js
        ├── drawLens.js
        ├── drawPlanes.js
        └── drawMeasurements.js
```

## Browser Compatibility

The calculator requires a modern web browser with support for:

- ES6+ JavaScript
- Canvas API
- CSS Grid and Flexbox

## License

MIT License - Feel free to use and modify as needed.
