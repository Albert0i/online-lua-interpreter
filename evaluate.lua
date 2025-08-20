-- Optional: pretty print table
function printTable(tbl, indent)
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

-- Optional: add space to left and right 
function addSpaces(expr) 
  return (expr:gsub(">=", " >= "))
              :gsub("<=", " <= ")
              :gsub("=", " = ")
              :gsub("<>", " <> ")
              :gsub("%(", " ( ")
              :gsub("%)", " ) ")
end

-- Operator precedence and associativity
local precedence = {
  ["not"] = { prec = 3, assoc = "right" },
  ["="]   = { prec = 2, assoc = "left" },
  ["<>"]  = { prec = 2, assoc = "left" },
  [">="]  = { prec = 2, assoc = "left" },
  ["<="]  = { prec = 2, assoc = "left" },
  ["and"] = { prec = 1, assoc = "left" },
  ["or"]  = { prec = 1, assoc = "left" }
}

-- Tokenizer: splits expression into tokens
local function tokenize(expr)
  local tokens = {}
  for token in expr:gmatch("[^%s]+") do
      table.insert(tokens, token)
  end
  
  return tokens
end

-- Infix to RPN using Shunting Yard algorithm
local function infix_to_rpn(expr_str)
  local output, stack = {}, {}
  local tokens = tokenize(expr_str)

  for _, token in ipairs(tokens) do
    if token == "(" then
      table.insert(stack, token)
    elseif token == ")" then
      while #stack > 0 and stack[#stack] ~= "(" do
        table.insert(output, table.remove(stack))
      end
      table.remove(stack) -- remove "("
    elseif precedence[token] then
      while #stack > 0 do
        local top = stack[#stack]
        local p1 = precedence[token]
        local p2 = precedence[top]
        if p2 and ((p1.assoc == "left" and p1.prec <= p2.prec) or
                   (p1.assoc == "right" and p1.prec < p2.prec)) then
          table.insert(output, table.remove(stack))
        else
          break
        end
      end
      table.insert(stack, token)
    else
      table.insert(output, token)
    end
  end

  while #stack > 0 do
    table.insert(output, table.remove(stack))
  end

  return output
end

-- Utility: strip quotes from string
local function stripQuotes(s)
  return s:match("^'(.*)'$") or s:match('^"(.*)"$') or s
end

-- Utility: convert to boolean
local function toBoolean(v)
  if type(v) == "string" then
    return v ~= "" and v ~= "false"
  end
  return not not v
end

-- RPN evaluator
local function evaluate_rpn(record, expr_table)
  local stack = {}
  for _, token in ipairs(expr_table) do
    if token == "=" then
      local b = stripQuotes(table.remove(stack))
      local a = table.remove(stack)
      table.insert(stack, tostring(record[a]) == b)

    elseif token == "<>" then
      local b = stripQuotes(table.remove(stack))
      local a = table.remove(stack)
      table.insert(stack, tostring(record[a]) ~= b)

    elseif token == ">=" then
      local b = tonumber(stripQuotes(table.remove(stack)))
      local a = tonumber(record[table.remove(stack)])
      table.insert(stack, a >= b)

    elseif token == "<=" then
      local b = tonumber(stripQuotes(table.remove(stack)))
      local a = tonumber(record[table.remove(stack)])
      table.insert(stack, a <= b)

    elseif token == "and" then
      local b = toBoolean(table.remove(stack))
      local a = toBoolean(table.remove(stack))
      table.insert(stack, a and b)

    elseif token == "or" then
      local b = toBoolean(table.remove(stack))
      local a = toBoolean(table.remove(stack))
      table.insert(stack, a or b)

    elseif token == "not" then
      local a = toBoolean(table.remove(stack))
      table.insert(stack, not a)

    else
      table.insert(stack, token)
    end
  end
  return toBoolean(stack[1])
end

-- Unified evaluation function
function evaluate_record(record, expression)
  local expr_table = type(expression) == "string" and infix_to_rpn(expression) or expression
  return evaluate_rpn(record, expr_table)
end

-- main
local row = {
  id = 42,
  name = "alberto",
  role = "admin", 
  email = "abc@mail.com",
  updatedAt = "",
  createdAt = "2025-08-20",
  updateIdent = 0
}

--local expr = "( role = 'admin' and updatedAt = '' ) or name = 'alberto'"
local expr = "(role='rookie' and updatedAt='' and email<>'') or (not (name='alberto'))"

print("Result:", evaluate_record(row, addSpaces(expr)))
