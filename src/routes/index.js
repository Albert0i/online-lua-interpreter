// routes/index.js
import 'dotenv/config'
import express from 'express';
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  const result = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/scripts`)
  const data = await result.json()

  res.render('index', {
    subtitle: 'A programmatic way to interact with Redis, more challenging than Redis CLI and let alone Redis Insight',
    scripts: data.scripts, 
    lastEdit: data.lastEdit,
    keys: [],
    argv:[],
    code: '',
    output: 'Click on Run button to see the output'
  });
});

// POST /
router.post('/', async (req, res) => {
  const { keys, argv, code, nameHidden } = req.body;
  
  const result = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/scripts`)
  const data = await result.json()

  const evalResult = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/eval`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keys, argv, code, name: nameHidden })
    } )

  const evalOutput = await evalResult.json()

  res.render('index', {
    subtitle: 'A difficult way to interact with Redis, more harsh than Redis CLI, I assure, and let alone Redis Insight',
    scripts: data.scripts, 
    lastEdit: nameHidden,
    keys,
    argv,
    code,
    output: evalOutput.output
  })
});

export default router;
