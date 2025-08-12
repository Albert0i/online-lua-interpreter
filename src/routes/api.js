// routes/api.js
import express from 'express';
import { redis } from '../redis/redis.js'
import { getScriptKeyName, getLastEditKey } from '../utils.js';

const router = express.Router();

// Get available scripts names and last edit
// scan 0 MATCH OLI:scripts:* COUNT 100 TYPE HASH
// GET OLI:lastEdit
router.get('/scripts', async (req, res) => {
  let cursor = '0';
  let keys = [];
  const scripts = [];

  do {
    // Returns [ cursor, keys ] in RESP2
    // Returns { cursor, keys } in RESP3
    const result = await redis.scan(cursor, {
      MATCH: getScriptKeyName(),
      COUNT: 100,
      TYPE: 'hash'
    });
    // Note the difference...

    cursor = result.cursor
    keys = result.keys 

    scripts.push(...keys);
  } while (cursor !== '0');

  return res.status(200).json({
    success: true, 
    scripts: scripts.map(script => script.split(':')[2]),
    lastEdit: await redis.get(getLastEditKey())
  })
})

// Load a script 
router.get('/load', async (req, res) => {
  const scriptName = req.query.name;

  if (!scriptName) {
    return res.status(400).json({
      success: false,
      message: 'Missing script name'
    });
  }

  return res.json({
      success: true,
      code: await redis.hGet(getScriptKeyName(scriptName), 'code'),
      message: `${scriptName} loaded`
    });
  });

// Save a script
router.put('/save', async (req, res) => {
  const scriptName = req.body.name;
  const code = req.body.code;

  const now = new Date(); 
  const isoDate = now.toISOString(); 

  //console.log('scriptName =', scriptName, ', code =', code)
  if (!scriptName || !code ) {
    return res.status(400).json({
      success: false,
      message: 'Missing Script name and/or code'
    });
  }

  await redis.multi()
             .hSet(getScriptKeyName(scriptName), { 
                code,
                updatedAt: isoDate,
             })
             .hIncrBy(getScriptKeyName(scriptName), 'updateIdent', 1)
             .set(getLastEditKey(), scriptName)
             .exec()

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
