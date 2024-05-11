module tpNotes

#include("R.jl")

struct People
    name::String
end

Base.:+(p1::People, p2::People) = "$(string(p1.name)) and $(string(p2.name))"    

Base.length(p::People) = length(p.name) +1

end
