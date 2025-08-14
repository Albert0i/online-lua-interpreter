###  A Primer on [Scripting with Lua](https://redis.io/docs/latest/develop/programmability/eval-intro/)
> "never let yourself be so far deceived as to doubt that."<br />The Castle by Franz Kafka


#### Prologue
I was much eager to obtain a good quick start guide on programming in [Lua](https://en.wikipedia.org/wiki/Lua) in Redis and it turns out I have to create my own... 

> Lua [syntax](https://en.wikipedia.org/wiki/Syntax_(programming_languages)) for control structures was mostly borrowed from [Modula](https://en.wikipedia.org/wiki/Modula) (`if`, `while`, `repeat/until`), but also had taken influence from [CLU](https://en.wikipedia.org/wiki/CLU_(programming_language)) (multiple assignments and multiple returns from function calls, as a simpler alternative to [reference parameters](https://en.wikipedia.org/wiki/Call_by_reference) or explicit [pointers](https://en.wikipedia.org/wiki/Pointer_(computer_programming))), [C++](https://en.wikipedia.org/wiki/C%2B%2B) ("neat idea of allowing a [local variable](https://en.wikipedia.org/wiki/Local_variable) to be declared only where we need it"[[6](https://en.wikipedia.org/wiki/Lua#cite_note-hopl2007-6)]), [SNOBOL](https://en.wikipedia.org/wiki/SNOBOL) and [AWK](https://en.wikipedia.org/wiki/AWK) ([associative arrays](https://en.wikipedia.org/wiki/Associative_array)). 

> In an article published in [Dr. Dobb's Journal](https://en.wikipedia.org/wiki/Dr._Dobb%27s_Journal), Lua's creators also state that LISP and Scheme with their single, ubiquitous data-structure mechanism (the [list](https://en.wikipedia.org/wiki/List_(abstract_data_type))) were a major influence on their decision to develop the table as the primary data structure of Lua.[[8](https://en.wikipedia.org/wiki/Lua#cite_note-ddj96-8)]

> Lua [semantics](https://en.wikipedia.org/wiki/Semantics) have been increasingly influenced by Scheme over time,[[6](https://en.wikipedia.org/wiki/Lua#cite_note-hopl2007-6)] especially with the introduction of [anonymous functions](https://en.wikipedia.org/wiki/Anonymous_function) and full [lexical scoping](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scope_vs._dynamic_scope). Several features were added in new Lua versions.

> Lua lets you run part of your application logic inside Redis. Such scripts can perform conditional updates across multiple keys, possibly combining several different data types atomically.

> Scripts are executed in Redis by an embedded execution engine. Presently, Redis supports a single scripting engine, the [Lua 5.1](https://www.lua.org/) interpreter. Please refer to the [Redis Lua API Reference](https://redis.io/docs/latest/develop/programmability/lua-api/) page for complete documentation. 


#### I. Content
##### 1. Comments 
In Lua, comment has two styles: 
```
-- This is a SQL-like single line comment. 

--[[
    This comment spans more 
    than one lines. 
    The syntax is a little weird. 
]]
```

##### 2. Variables
In Lua, variable definition not precedes with **local** is conceived to be  global scope and by convention global variable should starts with capital letter, although you are not restricted to do so. 
Under Redis, all variable definition *MUST* be local scope., you just can't use: 
```
Variable = "value"
```

Which incurs a: 
```
Error: ERR Error running script: @globals:9: Script attempted to create global variable 'Variable' stack traceback:  [G]: in function 'error'  @globals:9: in function <@globals:5>  @user_script:1: in main chunk  [G]: ?
```

You have to use: 
```
local variable = "value"
```

##### 3. Use `end` to mark end of scope
```
for i = 1, 5 do

end

while x < 10 do

  x = x + 1
end

repeat

  x = x + 1
until x > 10

function greet(name)
  print("Hello, " .. name)
end

do
  local temp = 42
  print(temp)
end

if x > 0 then
  print("Positive")
elseif x < 0 then
  print("Negative")
else
  print("Zero")
end
```

With the exception of `repeat until`:
```
repeat

  x = x + 1
until x > 10
```

##### 4. Use `goto` to quit endless loop
```
::start::
while true do
  local x = math.random()

  if x > 0.9 then
    goto done
  end
end

::done::
```

##### 5. 

##### 6. 

##### 7. 

##### 8. ["Strange Case of Lua Table"](https://www.gutenberg.org/files/43/43-h/43-h.htm)

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


##### 9. Output
You can use `redis.log` to output message to `redis.log`. 
```
redis.log(redis.LOG_WARNING, 'Something is terribly wrong')
```

Will produce a line similar to the following in your server's log:
```
[32343] 22 Mar 15:21:39 # Something is terribly wrong
```

##### 10. Return
The standard way to reply 'Ok': 
```
redis.status_reply('Ok')
```

The standard way to reply an error: 
```
redis.error_reply('ERR My very special table error')
```

> **Note**: By convention, Redis uses the first word of an error string as a unique error code for specific errors or ERR for general-purpose errors. Scripts are advised to follow this convention, as shown in the example above, but this is not mandatory.


#### II. Retrospection


#### III. Bibliography 
1. [Programming in Lua (first edition)](https://www.lua.org/pil/contents.html)
2. [Lua 5.1 Reference Manual](https://www.lua.org/manual/5.1/)
3. [Lua Primer](https://fennel-lang.org/lua-primer)
4. [Lua Online Compiler & Interpreter](https://onecompiler.com/lua)
5. [The Castle by Franz Kafka](https://files.libcom.org/files/Franz%20Kafka-The%20Castle%20(Oxford%20World's%20Classics)%20(2009).pdf)


#### Epilogue 


### EOF(2025/08/15)
