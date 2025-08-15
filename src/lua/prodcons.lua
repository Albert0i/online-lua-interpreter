local ret, msg, joblist, output = true, '', 'joblist', {} 
local timestamp = unpack(redis.call('TIME'))
math.randomseed(tonumber(timestamp))

local function producer() 
	while true do
		local n = math.random(1, 10)
		for j=1, n do 
			redis.call('LPUSH', joblist, math.random(1, 10))
		end 
		coroutine.yield(n)
	end 
end 
local function consumer() 
	while true do
		local n = math.random(1, 30)
		for j=1, n do 
			local e = redis.call('RPOP', joblist)
			if not (e) then 
				n = j 
				break
			end
		end 
		coroutine.yield(n)
	end 
end 
local function print(m) 
	table.insert(output, m)
end 

local coprod = coroutine.create(producer)
local cocons = coroutine.create(consumer)

for i=1, 10 do 
	print(' len = '..redis.call('LLEN', joblist))
	ret, msg = coroutine.resume(coprod) 
	print(' ret ='..tostring(ret)..' produced = '..msg)
	print(' len = '..redis.call('LLEN', joblist))
	ret, msg = coroutine.resume(cocons) 
	print(' ret ='..tostring(ret)..' consumed = '..msg)
end

return output
