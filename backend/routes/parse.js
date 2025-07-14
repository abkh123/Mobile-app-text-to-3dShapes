const express = require('express');
const router = express.Router();

// Utility function to extract numbers from string
function extractNumber(text, defaultVal = null) {
  if (typeof text !== 'string') return defaultVal;
  const match = text.match(/[-+]?\d*\.?\d+/);
  return match ? parseFloat(match[0]) : defaultVal;
}

// POST /api/parse
router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text input' });
  }

  const lower = text.toLowerCase();

  // Shape detection
  const shapeMap = {
    cube: 'Cube',
    box: 'Cube',
    square: 'Cube',
    sphere: 'Sphere',
    ball: 'Sphere',
    circle: 'Sphere',
    cylinder: 'Cylinder',
    tube: 'Cylinder',
  };

  let shape = 'Cube'; // default
  for (let keyword in shapeMap) {
    if (lower.includes(keyword)) {
      shape = shapeMap[keyword];
      break;
    }
  }

  // Extract dimensions
  let width = extractNumber(lower.split('width')[1]) || extractNumber(lower.split('length')[1]);
  let depth = extractNumber(lower.split('depth')[1]);
  let height = extractNumber(lower.split('height')[1]);
  let radius = extractNumber(lower.split('radius')[1]);

  // Default values based on shape
  if (shape === 'Cube') {
    width = width || 2;
    depth = depth || width;
    height = height || width;
  } else if (shape === 'Sphere') {
    radius = radius || 1;
  } else if (shape === 'Cylinder') {
    radius = radius || 1;
    height = height || 2;
  }

  const response = {
    shape,
    dimensions: {},
  };

  if (['Cube'].includes(shape)) {
    response.dimensions = { width, depth, height };
  } else if (['Sphere'].includes(shape)) {
    response.dimensions = { radius };
  } else if (['Cylinder'].includes(shape)) {
    response.dimensions = { radius, height };
  }

  res.json(response);
});

module.exports = router;