### Online Lua Interpreter<br >
── A web-based Lua script editor and executor using Node.js, Redis, and TailwindCSS.

> "Foreverything is in a very low key there, except for the whims of the servants, ambition seeks its satisfaction in work up there, and as the work itself is what matters ambition is lost entirely, there is no room there for childish wishes."<br />The Castle by Franz Kafka

#### Prologue


#### I, Features
- Write and run Lua scripts
- Pass KEYS and ARGV parameters
- View output in real-time
- Save, load, and delete scripts


#### II. Setup
```
git clone https://github.com/Albert0i/online-lua-interpreter
cd online-lua-interpreter
npm install
```

`.env`
```
HOST=localhost
PORT=3000
RESP=3

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=123456
```

```
npm run dev 
```
![alt screen1](img/screen1.JPG)

[online demo](https://lua-interpreter.onrender.com/)

[Lua Online Compiler & Interpreter](https://onecompiler.com/lua)

#### III. Bibliography 
1. [Redis programmability](https://redis.io/docs/latest/develop/programmability/)
2. [Scripting with Lua](https://redis.io/docs/latest/develop/programmability/eval-intro/)
3. [Redis Lua API reference](https://redis.io/docs/latest/develop/programmability/lua-api/)
4. [Redis functions](https://redis.io/docs/latest/develop/programmability/functions-intro/)
5. [Lua 5.1 Reference Manual](https://www.lua.org/manual/5.1/)
6. [Debugging Lua scripts in Redis](https://redis.io/docs/latest/develop/programmability/lua-debugging/)
7. [The Castle by Franz Kafka](https://files.libcom.org/files/Franz%20Kafka-The%20Castle%20(Oxford%20World's%20Classics)%20(2009).pdf)


#### Epilogue 

[A Primer on Scripting with Lua](./luaPrimer.md)


### EOF (2025/08/15)
