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

["Strange Case of Lua Table"](https://www.gutenberg.org/files/43/43-h/43-h.htm)

The *one and only one* data structure in Lua is table, which has two favours: 
- **Array style table** 
```
    local table1 = { "iong_dev", "active" }
```

Or *explicitly* specify the index: 
```    
    local table1 = { [1] = "iong_dev", [2] = "active" }
```

- **Dictionary style table** 
```
    local table2 = { name = "iong_dev", status = "active" }
```

The difference is subtle and intricacy elusive... 

The [unpack](https://www.luadocs.com/docs/functions/table/unpack) function returns the elements of a table as separate values, allowing you to easily use them in a function call or assign them to multiple variables.

**Syntax**
```
unpack(tableData, start, end)
```

- `tableData` - The table containing the elements to be unpacked.
- `start` - The index of the first element to unpack. Defaults to 1.
- `end` - The index of the last element to unpack. If omitted, unpacks all elements from start to the end of the table.

**Return**

The function returns the elements of the table as separate values. If the specified indices are out of range, it returns nil.

**Description**

The `unpack()` function is particularly useful for passing table elements as arguments to functions that expect multiple parameters. It allows you to work with table data in a more flexible way.

This function looks for numeric index starting from 1, which doesn't exist in dictionary style table. A call to 
```
    redis.log(redis.LOG_NOTICE, unpack(table1))
```

Will output: 'iong_dev active' in `redis.log`. Whereas a call to
```
    redis.log(redis.LOG_NOTICE, unpack(table2))
```

Results in an error. 
```
node:internal/modules/run_main:104
    triggerUncaughtException(
    ^

[SimpleError: ERR redis.log() requires two arguments or more. script: 9a81afe7c8515723aefe02c8e6f7e1a87be3d5f2, on @user_script:18.]
```

![alt nil error](img/nil-error.JPG)

This is because `unpack(table2)` returns `nil` which triggers the error.  Similarly, array style table has length; dictionary style table *HAS NOT*... Therefore, 
```
    return { #table1, #table2 }
```

Returns `[ 2, 0 ]` to the client. To set `myhash` with
```
    local table3 = { 'name', 'iong_dev', 'status', 'active', 'age', 59 }

    redis.call('HSET', 'myhash', unpack(table3))
```

Which effectively do a
```
    HSET myhash name iong_dev status active age 59
```

To encode with `cjson.encode` so that will see better
```
    redis.log(redis.LOG_NOTICE, cjson.encode(table1))
```
Will output: '["iong_dev","active"]' in `redis.log`

```    
    redis.log(redis.LOG_NOTICE, cjson.encode(table2))
```
Will output: '{"name":"iong_dev","status":"active"}' in `redis.log`

Last but not least, to return a dictionary style table using RESP3, instead of using
```
    redis.setresp(3)
    return { name = "iong_dev", status = "active" }
```

Which always gives `[]`, an empty array! You *should* use
```
    redis.setresp(3)
    return { map={ name = "iong_dev", status = "active" } }
```

Which gives
```
[Object: null prototype] { name: 'iong_dev', status: 'active' }
```

A *real* javascript objct! Be sure to precede the script call with
```
await redis.sendCommand(['HELLO', '3'])
```

As a bonus, what is the expected behaviour of this code? 
```
    local table4 = { name = "iong_dev", status = "active", 
                     [1]="berto_dev", [2]="inactive" } 

    redis.log(redis.LOG_NOTICE, unpack(table4))
    redis.log(redis.LOG_NOTICE, #table4)
```

- [Mastering Lua Unpack Table: A Quick Guide](https://luascripts.com/lua-unpack-table)


### EOF (2025/08/15)
