
function tokenize(expr)
  local tokens = {}
  local i = 1
  local len = #expr

  local function peek(n)
    return expr:sub(i, i + (n or 0))
  end

  local function advance(n)
    i = i + (n or 1)
  end

  local function skip_whitespace()
    while i <= len and expr:sub(i, i):match("%s") do
      advance()
    end
  end

  while i <= len do
    skip_whitespace()
    local c = peek()

    -- Parentheses
    if c == "(" or c == ")" then
      table.insert(tokens, c)
      advance()

    -- Multi-char comparison operators
    elseif peek(1) == ">=" or peek(1) == "<=" or peek(1) == "<>" then
      table.insert(tokens, peek(1))
      advance(2)

    -- Single-char comparison or arithmetic operators
    elseif c == "=" or c == "<" or c == ">" or c == "+" or c == "-" or c == "*" or c == "/" then
      table.insert(tokens, c)
      advance()

    -- Quoted strings
    elseif c == "'" or c == '"' then
      local quote = c
      local j = i + 1
      while j <= len and expr:sub(j, j) ~= quote do
        j = j + 1
      end
      local str = expr:sub(i, j)
      table.insert(tokens, str)
      i = j + 1

    -- Identifiers and keywords
    elseif c:match("[%w_]") then
      local j = i
      while j <= len and expr:sub(j, j):match("[%w_]") do
        j = j + 1
      end
      local word = expr:sub(i, j - 1)
      table.insert(tokens, word)
      i = j

    else
      -- Unknown character, skip
      advance()
    end
  end

  return tokens
end

local function printTable(tbl, indent)
  indent = indent or 0
  local prefix = string.rep("  ", indent)
  for k, v in pairs(tbl) do
    if type(v) == "table" then
      print(prefix .. tostring(k) .. " = {")
      printTable(v, indent + 1)
      print(prefix .. "}")
    else
      print(prefix .. tostring(k) .. " = " .. tostring(v))
    end
  end
end

-- main 
local expr1 = "(role='admin' and updatedAt='') or (name='alberto')"
local expr2 = "id<=50 or name='alberto'"
local expr3 = "id=40+2"

print("expr1 = ", expr1)
printTable(tokenize(expr1), 4)  

print("expr2 = ", expr2)
printTable(tokenize(expr2), 4) 

print("expr3 = ", expr3)
printTable(tokenize(expr3), 4)  
