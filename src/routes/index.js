// routes/index.js
import express from 'express';
const router = express.Router();

// Simulated Lua execution function
// function executeLua(code, keys, argv) {
//   // Replace with actual Lua + Redis logic
//   if (!code.trim()) return { result: false, output: 'No code provided.' };
//   return { result: true, output: `Executed Lua:\n${code}\nKEYS: ${keys}\nARGV: ${argv}` };
// }

// GET /
router.get('/', (req, res) => {
 // const { result, output } = req.session.evalResult || {};
 // delete req.session.evalResult;
 res.render('index', {
    title: 'Online Lua Interpreter',
    subtitle: 'A difficult way to interact with Redis, more hash than Redis CLI, I assure, and let alone Redis Insight',
    scripts: ['OLI:scripts:init.lua', 'OLI:scripts:redis.lua', 'OLI:scripts:test.lua'],
    lastEdit: 'OLI:scripts:test.lua',
    keys: [],
    argv:[],
    code: 'return redis.REDIS_VERSION',
    output: 'Click on EVAL button to see the output'
  });
});

// POST /eval
router.post('/', (req, res) => {
  //const { code, keys, argv, scriptName } = req.body;
  //const { result, output } = executeLua(code, keys, argv);
  //req.session.evalResult = { result, output };
  //res.redirect('/');
  console.log('params =', req.body)

  res.render('index', {
    title: 'Online Lua Interpreter',
    subtitle: 'Write and run Lua scripts interactively',
    scripts: ['init.lua', 'redis.lua', 'test.lua'],
    lastEdit: req.body?.scriptName || 'test.lua',
    keys: [],
    argv:[],
    code: 'true',
    output: 'Check the output'
  })
});

router.post('/eval', (req, res) => {
  res.render('index', {
    title: 'Online Lua Interpreter',
    subtitle: 'Write, Run, and Debug Lua Scripts in Redis',
    scripts: [ "script1", "script2", "script3", "script4", "script5" ],
    lastEdit: "script1"
  });
});


export default router;

/*
 {
    title: 'Online Lua Inteerpreter',
    subtitle: 'Write, Run, and Debug Lua Scripts with Redis',
    scripts: [ "script1", "script2", "script3", "script4", "script5" ],
    lastEdit: "script1"
 }
*/