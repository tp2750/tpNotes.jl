"""
   rangify([1:3;5:7;9])
   "1-3, 5-7, 9"
"""
function rangify(v)
  res = []
  e1=first(v)
  for i in 1:length(v)-1
    if v[i+1] == v[i] + 1  
       continue
    end
    push!(res, [e1, v[i]])
    e1 = v[i+1]
  end
  push!(res, [e1, v[end]])
  res1 = unique.(res)
  res2 = format_range.(res1)
  join(res2, ", ")
end

function format_range(v)
  if length(v) == 1
     return string(first(v))
  end
  "$(v[1])-$(v[2])"
end

# julia> rangify(kandidate_idx)
# "2-153, 155-167, 171, 179-182"
