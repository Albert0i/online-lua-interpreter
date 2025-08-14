###  A Primer on [Scripting with Lua](https://redis.io/docs/latest/develop/programmability/eval-intro/)
> "never let yourself be so far deceived as to doubt that."<br />The Castle by Franz Kafka


#### Prologue
I was much eager to obtain a good quick start guide on programming in [Lua](https://en.wikipedia.org/wiki/Lua) in Redis and it turns out I have to create my own... 

> Lua [syntax](https://en.wikipedia.org/wiki/Syntax_(programming_languages)) for control structures was mostly borrowed from [Modula](https://en.wikipedia.org/wiki/Modula) (`if`, `while`, `repeat/until`), but also had taken influence from [CLU](https://en.wikipedia.org/wiki/CLU_(programming_language)) (multiple assignments and multiple returns from function calls, as a simpler alternative to [reference parameters](https://en.wikipedia.org/wiki/Call_by_reference) or explicit [pointers](https://en.wikipedia.org/wiki/Pointer_(computer_programming))), [C++](https://en.wikipedia.org/wiki/C%2B%2B) ("neat idea of allowing a [local variable](https://en.wikipedia.org/wiki/Local_variable) to be declared only where we need it"[[6](https://en.wikipedia.org/wiki/Lua#cite_note-hopl2007-6)]), [SNOBOL](https://en.wikipedia.org/wiki/SNOBOL) and [AWK](https://en.wikipedia.org/wiki/AWK) ([associative arrays](https://en.wikipedia.org/wiki/Associative_array)). 

> In an article published in [Dr. Dobb's Journal](https://en.wikipedia.org/wiki/Dr._Dobb%27s_Journal), Lua's creators also state that LISP and Scheme with their single, ubiquitous data-structure mechanism (the [list](https://en.wikipedia.org/wiki/List_(abstract_data_type))) were a major influence on their decision to develop the table as the primary data structure of Lua.[[8](https://en.wikipedia.org/wiki/Lua#cite_note-ddj96-8)]

> Lua [semantics](https://en.wikipedia.org/wiki/Semantics) have been increasingly influenced by Scheme over time,[[6](https://en.wikipedia.org/wiki/Lua#cite_note-hopl2007-6)] especially with the introduction of [anonymous functions](https://en.wikipedia.org/wiki/Anonymous_function) and full [lexical scoping](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scope_vs._dynamic_scope). Several features were added in new Lua versions.

> Lua lets you run part of your application logic inside Redis. Such scripts can perform conditional updates across multiple keys, possibly combining several different data types atomically.

> Scripts are executed in Redis by an embedded execution engine. Presently, Redis supports a single scripting engine, the [Lua 5.1](https://www.lua.org/) interpreter. Please refer to the [Redis Lua API Reference](https://redis.io/docs/latest/develop/programmability/lua-api/) page for complete documentation. 


#### I. 
1. Comments 
In Lua, comment has two styles: 
```
-- This is a SQL-like single line comment. 

--[[
    This comment spans more 
    than one lines. 
    The syntax is a little weird. 
]]
```

2. Variables
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

3. Use `end` to mark end of scope
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

4. Use `goto` to quit endless loop
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

9. Output
You can use `redis.log` to output message to `redis.log`. 
```
redis.log(redis.LOG_WARNING, 'Something is terribly wrong')
```

Will produce a line similar to the following in your server's log:
```
[32343] 22 Mar 15:21:39 # Something is terribly wrong
```

10. Return
The standard way to reply 'Ok': 
```
redis.status_reply('Ok')
```

The standard way to reply an error: 
```
redis.error_reply('ERR My very special table error')
```

> **Note**: By convention, Redis uses the first word of an error string as a unique error code for specific errors or ERR for general-purpose errors. Scripts are advised to follow this convention, as shown in the example above, but this is not mandatory.

#### II. 


#### III. Bibliography 
1. [Programming in Lua (first edition)](https://www.lua.org/pil/contents.html)
2. [Lua 5.1 Reference Manual](https://www.lua.org/manual/5.1/)
3. [Lua Primer](https://fennel-lang.org/lua-primer)
4. [Lua Online Compiler & Interpreter](https://onecompiler.com/lua)
5. [The Castle by Franz Kafka](https://files.libcom.org/files/Franz%20Kafka-The%20Castle%20(Oxford%20World's%20Classics)%20(2009).pdf)


#### Epilogue 


### EOF(2025/08/15)
