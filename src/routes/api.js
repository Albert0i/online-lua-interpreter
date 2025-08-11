// routes/api.js
import express from 'express';
const router = express.Router();

// Placeholder for future endpoints
router.get('/load', (req, res) => {
  const scriptName = req.query.name;

  if (!scriptName) {
    return res.status(400).json({
      success: false,
      message: 'Missing script name'
    });
  }

  // Simulate loading logic (e.g. from Redis, file, DB)
  const code = `return "${scriptName} loaded"`;

  return res.json({
      success: true,
      code,
      message: `${scriptName} loaded`
    });
  });

// Placeholder for future endpoints
router.put('/save', (req, res) => {
  const scriptName = req.body.name;
  const code = req.body.code;

  console.log('scriptName =', scriptName, ', code =', code)
  if (!scriptName || !code ) {
    return res.status(400).json({
      success: false,
      message: 'Missing Script name and/or code'
    });
  }

  return res.json({
      success: true,
      message: `${scriptName} saved`
    });
  });

// Placeholder for future endpoints
router.delete('/delete', (req, res) => {
  const scriptName = req.query.name;

  console.log('scriptName =', scriptName)
  if (!scriptName ) {
    return res.status(400).json({
      success: false,
      message: 'Missing Script name'
    });
  }

  return res.json({
      success: true,
      message: `${scriptName} deleted`
    });
  });

export default router;
