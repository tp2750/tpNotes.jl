#=
# Are two numbers "the same"?

See https://discourse.julialang.org/t/compare-numbers-at-the-stated-precision/86719/

## Background

In tests I'll like to be able to write the following and the test to pass:

```julia

@test aresame(pi, 3.14)
```

The folwing works [see manual](https://docs.julialang.org/en/v1/stdlib/Test/#Basic-Unit-Tests):

```julia

@test isapprox(pi, 3.14, atol = 0.005)
```

But then I need to adjust the absolute tolerance manually.

I need a function to find the "number og significant digits" of a numeric literal.

=#

function sigdigs(x)
    x_string = string(convert(Float64,x))
    length(x_string) - findlast('.',x_string)
end

function aresame(x,y)
    tol_digits = min(sigdigs(x), sigdigs(y))
    tol = .49*0.1^(tol_digits)
    isapprox(x,y,atol=tol)
end

#=
This looks like it is working:

=#

```julia
julia> aresame(pi,3.1)
true

julia> aresame(pi,3.14)
true

julia> aresame(pi,3.141)
false

julia> aresame(pi,3.1415)
false

julia> aresame(pi,3.14159)
true

julia> aresame(1,1)
true

julia> aresame(1,2)
false

julia> aresame(1,1.1)
false

julia> aresame(1,1.0)
true

julia> aresame(1,1.01)
true
```



