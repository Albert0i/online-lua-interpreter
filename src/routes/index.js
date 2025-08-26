// routes/index.js
import 'dotenv/config'
import express from 'express';
import { getClientIp } from '../utils.js'

const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  const result = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/scripts`)
  const data = await result.json()
  const authCookie = req.cookies[process.env.AUTH_COOKIE_NAME]
  const ip = getClientIp(req)
  console.log('ip =', ip)
  
  res.render('index', {
    subtitle: 'A programmatic way to interact with Redis, more challenging than Redis CLI and let alone Redis Insight',
    scripts: data.scripts, 
    lastEdit: data.lastEdit || 'noname.lua',
    keys: [],
    argv:[],
    code: '',
    output: 'Click on Run button to see the output', 
    resp: process.env.RESP,
    previewUrl: undefined,
    auth: authCookie
  });
});

// POST /
router.post('/', async (req, res) => {
  const { keys, argv, code, nameHidden } = req.body;
  
  const result = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/scripts`)
  const data = await result.json()
  const authCookie = req.cookies[process.env.AUTH_COOKIE_NAME]

  const evalResult = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/v1/eval`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keys, argv, code, name: nameHidden })
    } )

  const evalOutput = await evalResult.json()
  const previewUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}${nameHidden}`;
  
  res.render('index', {
    subtitle: 'A difficult way to interact with Redis, more harsh than Redis CLI, I assure, and let alone Redis Insight',
    scripts: data.scripts, 
    lastEdit: nameHidden,
    keys,
    argv,
    code,
    output: evalOutput.output,
    resp: process.env.RESP,
    previewUrl,
    auth: authCookie
  })
});


// Login page
router.get('/login', (req, res) => {
  const authCookie = req.cookies[process.env.AUTH_COOKIE_NAME]

  // Already login? 
  if (authCookie) {
    return res.redirect('/');
  }
  res.render('login', { message: null } );
})

// Login 
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {            
        // Setting a cookie with HttpOnly and Secure flags
        res.cookie(process.env.AUTH_COOKIE_NAME, Date.now(), {
                httpOnly: true,  // Prevents JavaScript access
                secure: true,    // Only sent over HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            }).redirect('/');
    } 
    else {
        res.render('login', { message: 'Invalid credentials' } );
    }
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME).redirect('/')
});


export default router;
