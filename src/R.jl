module Rfunctions

## Naming idea: FakeR.jl
## Fake it 'till you make it.

## implementation of R function names (or close)
## Nothing exported to not pollute the namespace
## Eg range() in julia is like seq in R, and range() in R is extrema in julia

"""
    R: capture.output()
    @capture_output print(a)
    Returns the output of the expression as a string
"""
macro capture_output(ex::Expr)
    ## See https://giordano.github.io/blog/2022-06-18-first-macro/
    ## eg sprint(io -> show(io,a))
    return :( sprint(io -> $(ex.args[1])(io,$(ex.args[2]))) )
end

"""
    R: range(c(1,2,3))
    julia: extrema([1,2,3])
    Nore range() in Julia has meaning similar to seq() in R
"""

range(v::Vector) = extrema(v)
    

c(a...) = [a...]


end
