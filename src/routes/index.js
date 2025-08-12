// routes/index.js
import 'dotenv/config'
import express from 'express';
const router = express.Router();

// Simulated Lua execution function
// function executeLua(code, keys, argv) {
//   // Replace with actual Lua + Redis logic
//   if (!code.trim()) return { result: false, output: 'No code provided.' };
//   return { result: true, output: `Executed Lua:\n${code}\nKEYS: ${keys}\nARGV: ${argv}` };
// }

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
router.post('/', (req, res) => {
  const { keys, argv, code  } = req.body;
  console.log('params =', req.body)

  res.render('index', {
    subtitle: 'A difficult way to interact with Redis, more harsh than Redis CLI, I assure, and let alone Redis Insight',
    scripts: ['init.lua', 'do_this.lua', 'do_that.lua', 'do_nothing.lua'],
    lastEdit: '',
    keys,
    argv,
    code,
    output: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quibusdam esse modi odit, reiciendis nam fuga dolorem distinctio non labore atque? Eligendi beatae odio harum cumque excepturi asperiores quidem unde repudiandae corporis voluptatem id est architecto a, alias, sapiente praesentium quas doloribus illo voluptatum. Eligendi dignissimos fugiat quae corrupti voluptate voluptas dolor, debitis cupiditate autem natus, ullam provident sit accusantium dolore, sint atque. Blanditiis architecto asperiores quam perspiciatis? In eius incidunt ipsam, autem sunt ut consequuntur nemo quos eum voluptate, officiis a perferendis veniam, voluptatibus veritatis dolorum doloribus cupiditate explicabo dolor? Labore dolorum eos enim ducimus laborum tenetur eveniet facere.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quibusdam esse modi odit, reiciendis nam fuga dolorem distinctio non labore atque? Eligendi beatae odio harum cumque excepturi asperiores quidem unde repudiandae corporis voluptatem id est architecto a, alias, sapiente praesentium quas doloribus illo voluptatum. Eligendi dignissimos fugiat quae corrupti voluptate voluptas dolor, debitis cupiditate autem natus, ullam provident sit accusantium dolore, sint atque. Blanditiis architecto asperiores quam perspiciatis? In eius incidunt ipsam, autem sunt ut consequuntur nemo quos eum voluptate, officiis a perferendis veniam, voluptatibus veritatis dolorum doloribus cupiditate explicabo dolor? Labore dolorum eos enim ducimus laborum tenetur eveniet facere.
    `
  })
});

export default router;

/*
  {
      title: 'Online Lua Inteerpreter',
      subtitle: 'Write, Run, and Debug Lua Scripts with Redis',
      scripts: [ "script1", "script2", "script3", "script4", "script5" ],
      lastEdit: "script1"
  }
  {
      title: 'Online Lua Interpreter',
      subtitle: 'A difficult way to interact with Redis, more hash than Redis CLI, I assure, and let alone Redis Insight',
      scripts: ['init.lua', 'do_this.lua', 'do_that.lua', 'do_nothing.lua'],
      lastEdit: '',
      keys: [],
      argv:[],
      code: 'return redis.REDIS_VERSION',
      output: 'Click on Run button to see the output'
  }
*/
