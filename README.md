# tpNotes.jl

<!--- [![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://tp2750.github.io/tpNotes.jl/stable) ---> 
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://tp2750.github.io/tpNotes.jl/dev)
[![Build Status](https://github.com/tp2750/tpNotes.jl/workflows/CI/badge.svg)](https://github.com/tp2750/tpNotes.jl/actions)
[![Coverage](https://codecov.io/gh/tp2750/tpNotes.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/tp2750/tpNotes.jl)

# Purpose

This repo tracks my notes on things I learn in Julia.

# Vocabulary

Standard idioms and their `R` equivalent.

Some R function names are implemented in `src/r.jl`

## Vectors

Julia

```{julia}
julia> extrema([1,2,3])
(1, 3)

julia> first(collect(1:10))
1

julia> last(collect(1:10))
10

```

R

```{r}
> range(c(1,2,3))
[1] 1 3
> head(1:10,1)
[1] 1
> tail(1:10,1)
[1] 10
```

## Combinations

Julia

```{julia}
julia> using DataFrames
julia> rename(DataFrame(Base.Iterators.product([1,2], ["A","B","C"])), ["Num","Name"])
6×2 DataFrame
 Row │ Num    Name   
     │ Int64  String 
─────┼───────────────
   1 │     1  A
   2 │     2  A
   3 │     1  B
   4 │     2  B
   5 │     1  C
   6 │     2  C

julia> vec(string.(["x", "y"], [1 2 3])) ## note: col-vector, row-vector. Ref https://github.com/JuliaAcademy/DataFrames/blob/main/2.%20First%20steps%20with%20data%20frames.ipynb
6-element Array{String,1}:
 "x1"
 "y1"
 "x2"
 "y2"
 "x3"
 "y3"

```

R

```{r}
setNames(expand.grid(c(1,2), c("A","B","C")), c("Num","Name"))
  Num Name
1   1    A
2   2    A
3   1    B
4   2    B
5   1    C
6   2    C

```
## `paste` 

The R function `paste` does 2 things: 1. paste the elements of two string vectors together element by element; 2: collapse a string vector into a single string.

### Combining

R:

```{r}
paste(c("a", "b"), c(1,2))
[1] "a 1" "b 2"
paste(c("a", "b"), c(1,2), sep="")
[1] "a1" "b2"
```
 
```{julia}
julia> string.(["a", "b"], " ", [1,2])
2-element Vector{String}:
 "a 1"
 "b 2"

julia> string.(["a", "b"], [1,2])
2-element Vector{String}:
 "a1"
 "b2"
```
### Collapse

R

```{r}
> paste(c("a", "b", "c"), collapse="")
[1] "abc"
> paste(c("a", "b", "c"), collapse=", ")
[1] "a, b, c"
```

Julia:

```{julia}
julia> join(["a", "b", "c"])
"abc"

julia> join(["a", "b", "c"], ", ")
"a, b, c"
julia> join(["a", "b", "c"], ", ", " and ")
"a, b and c"
```

## Loop over rows of data frame

Julia

```{julia}
using DataFrames, DataFramesMeta

df_in = rename(DataFrame(Base.Iterators.product([1,2], ["A","B","C"])), ["Num","Name"]);

@eachrow df_in begin 
  @newcol Res1::Vector{String}
  @newcol Res2::Vector{String}
  :Res1 = string(:Num) * :Name
  :Res2 = :Name * string(:Num)
end

6×4 DataFrame
 Row │ Num    Name    Res1    Res2   
     │ Int64  String  String  String 
─────┼───────────────────────────────
   1 │     1  A       1A      A1
   2 │     2  A       2A      A2
   3 │     1  B       1B      B1
   4 │     2  B       2B      B2
   5 │     1  C       1C      C1
   6 │     2  C       2C      C2

## Simpler for this case:
@transform(df_in, Res1 = string.(:Num) .* :Name, Res2 = :Name .* string.(:Num))

```

The last form is much simpler, but only works if the function can be broardcasted (afaIk).

## Lists and dicts

### check if key is in dict

```{julia}
julia> haskey(args,"fit_file")
true
```

```{r}
> "fit_file" %in% names(args)
```

### Collect instances into a dict
See https://discourse.julialang.org/t/collect-values-in-a-dict/64626
```{julia}
julia> l = [x => x%3 for x in 1:10];
julia> d = Dict{Int, Vector{Int}}()
julia> for (x,y) in l
julia>   push!(get!(Vector{Int},d,y), x) 
julia> end
julia> d

Dict{Int64, Vector{Int64}} with 3 entries:
  0 => [3, 6, 9]
  2 => [2, 5, 8]
  1 => [1, 4, 7, 10]
```

Similar in `R` (not explicit pairs):
```{r}
> l <- (1:10)%%3
> setNames(lapply(unique(l), function(x) which(l == x)), unique(l))
`1`
[1]  1  4  7 10

$`2`
[1] 2 5 8

$`0`
[1] 3 6 9
```


# Development

## PkgTemplates
This repo was setup using this snippet:

```{julia}
julia> using PkgTemplates
julia> t = Template(; 
    user="tp2750",
    dir=".",
    authors="Thomas Poulsen",
    julia=v"1.6",
    plugins=[
        License(; name="GPL-2.0+"),
        Git(; manifest=false, ssh=true),
        GitHubActions(;extra_versions=["nightly"], x86=false, windows=false, osx=false), ## skip some defaults
        Codecov(),
        Documenter{GitHubActions}(),
        Develop(),
    ],
  )
julia> t("tpNotes")
```

Created the repo "tpNotes.jl" in GitHub and just did:

```{bash}
tpNotes$ git push --set-upstream origin master
```

Note that the project name in PkgTemplates doe not include ".jl", but the repo-name does.

After a bit the "CI" and "codecov" badges turn green.
But the "docs" badges do not work out of the box.

## Using ssh

Changing to use ssh.
First check current with `git remote -v `.
Then change it with `git remote set-url origin ...`:

```{bash}
tpNotes$ git remote -v 
origin	https://github.com/tp2750/tpNotes.jl (fetch)
origin	https://github.com/tp2750/tpNotes.jl (push)

tpNotes$ git remote set-url origin  git@github.com:tp2750/tpNotes.jl.git
```

Remember the `.git` at the end.

# Documentation using Documenter.jl

Modules needed in documentation needs to be loaded in the `make.jl` file.
This is also the place to control the sidebar (in the `pages = []` argument to `makedocs`).
It is good practice to split documentation in several files. See https://juliadocs.github.io/Documenter.jl/stable/man/guide/#Pages-in-the-Sidebar

## Adding keys for Documenter and Github Actions

For documentation to automatically build, generate keys by running `DocumenterTools.genkeys` and follow the instructions.

**OBS** Remeber to set the proper workflow permissions: "horizontal menu: Settings -> vertical menu: Actions -> General -> section: Workflow permissions: choose "Read and write permissions" and check the box: "Allow GiHub Actions to create and approve pull requests". 
This is not needed to build documentation, but it is needed for compatHelper to create pull requests when dependencies need to be updated.


```{julia}
(tpNotes) pkg> add DocumenterTools
julia> using tpNotes
julia> using DocumenterTools
julia> DocumenterTools.genkeys(user = "tp2750", repo="tpNotes.jl")
```
Name the public key (deploy key) "DOCUMENTER_PUB" and the private key (repository secret under Settings -> Secrets and variables -> Actions -> Repository secret) "DOCUMENTER_KEY"-

## Building the docs

to build the docs, cd to the docs folder, and jun make.jl in the context of the docs project:

``` julia
tpNotes.jl/docs$ julia --project=. make.jl 

```

In github, set github-pages to build from the branch: `gh-pages` in the `/ (root)` folder.

## Examples

Code examples in documentation files can share context if they are named. 
The [documentation](https://juliadocs.github.io/Documenter.jl/stable/man/syntax/#@example-block) does not mention it, but it looks like named blocks have to be continuous (two blocks can not mix).

Eg:

<pre>
```@example 1
  a = 3
```
  
```@example 1
  print(a)
```
</pre>

# Overloading Base operator

Overloading a base binary operator (like `+`):

* Define my own `struct`.
* Define a method of a base function using that struct. Use symbol notation for the operator.

No import or export needed.

## Example

```{julia}
struct People
    name::String
end

Base.:+(p1::People, p2::People) = "$(string(p1.name)) and $(string(p2.name))"
```

Then we have

```{julia}
julia> using tpNotes
julia> p1 = tpNotes.People("Søren")
julia> p2 = tpNotes.People("Mette")
julia> p1 + p2 == "Søren and Mette"
true
```


# Code coverage

Computing code coverage locally is done as described in the [here](https://github.com/JuliaCI/Coverage.jl#working-locally) (in the README of the [Coverage.jl](https://github.com/JuliaCI/Coverage.jl) package).

# PackageCompile

Remember to "dev" the local module from the "app" module.
If not, you need to re-add every time you make changes to the actual module.

# Misc

## Which project is active?

```
Base.active_project()
```

# K-means
* K-means
https://juliastats.org/Clustering.jl/dev/kmeans.html

Elements to cluster are in _columns_: (use x')

```{julia}
using Clustering
julia> x=vcat(0,repeat(1:1,10))
julia> res = kmeans(x',2) ## or kmeans(reshape(x, 1,11),2) 
julia> res.centers
1×2 Matrix{Float64}:
 1.0  0.0
julia> assignments(res)
11-element Vector{Int64}:
 2
 1
 1
 1
 1
 1
 1
 1
 1
 1
 1
```

## K-medoids
Selects a representing point.

Needs distance matrix.

```{julia}
julia> using Distances
julia> x_dist = pairwise(Euclidean(), x'; dims=2)
# or simply (https://discourse.julialang.org/t/pairwise-distances-from-a-single-column-or-vector/29415/6)
julia> x_dist = [abs(i-j) for i in x, j in x]

julia> res2 = kmedoids(x_dist, 2)
julia> res2.medoids ## indices of medoid points
2-element Vector{Int64}:
 2
 1
# medoid points:
julia> x[res2.medoids]
2-element Vector{Int64}:
 1
 0
julia> assignments(res2)
11-element Vector{Int64}:
 2
 1
 1
 1
 1
 1
 1
 1
 1
 1
 1
 ```
 
# Conversions

## matrix to vector and back

```
julia> m = [1 3 5; 2 4 6]
2×3 Matrix{Int64}:
 1  3  5
 2  4  6

julia> vec(m)
6-element Vector{Int64}:
 1
 2
 3
 4
 5
 6
 
julia> reshape(vec(m), size(m)) == m
true
```


# Tests
## Comparing at stated precision
https://discourse.julialang.org/t/compare-numbers-at-the-stated-precision/86719/10
In tests I’ll like to be able to write the following and the test to pass:

```julia
@test aresame(pi, 3.14)
```

The following works:


```julia
@test isapprox(pi, 3.14, atol = 0.005)
```

But then I need to adjust the absolute tolerance manually.

I need a function to find the “number of significant digits” of a numeric literal and use that.

The following apparently works, but I’m wondering if this already exists?


```julia
function sigdigs(x)
    x_string = string(convert(Float64,x))
    length(x_string) - findlast('.',x_string)
end

function aresame(x,y)
    tol_digits = min(sigdigs(x), sigdigs(y))
    tol = .49*0.1^(tol_digits)
    isapprox(x,y,atol=tol)
end

julia> aresame(pi,3.1)
true

julia> aresame(pi,3.14)
true

julia> aresame(pi,3.141)
false

julia> aresame(pi,3.1415)
false
```

# Packages
Cool and useful packages

## [TerminalPager.jl](https://github.com/ronisbr/TerminalPager.jl)
Great for browsing large tables:

```
using TerminalPager, DataFrames
pager(DataFrame(rand(100, 100), :auto))
```

Press ? to get navigation help:

* Shift ->, Shift <- to move side-wise
* u/d to move up/down by half a page or
  Page-up/down for full page
* < or g to go to top
* > or G to go to end

## [DefaultApplication.jl](https://github.com/tpapp/DefaultApplication.jl)
Basically just calling `xdg-open`, but still useful.

# Base functions

* `repr` Create a string from any value using the show function.
* replace(string, pattern => replacement; [count])

# Reuse installed version of packages
From julia 1.9 we can change the default package installation strategy to Pkg.PRESERVE_TIERED_INSTALLED to let the package manager try to install versions of packages while keeping as many versions of packages already installed as possible:

``` julia
ENV["JULIA_PKG_PRESERVE_TIERED_INSTALLED"] = true
```

See https://docs.julialang.org/en/v1/manual/environment-variables/#JULIA_PKG_PRESERVE_TIERED_INSTALLED,
https://pkgdocs.julialang.org/v1/api/#Pkg.add

From doc of Pkg.add:

Pkg resolves the set of packages in your environment using a tiered algorithm. The preserve keyword argument allows you to key into a specific tier in the resolve algorithm. The following table describes the argument values for preserve (in order of strictness):

| Value | Description |
| -- | -- |
| PRESERVE_ALL_INSTALLED |  Like PRESERVE_ALL and only add those already installed |
| PRESERVE_ALL | Preserve the state of all existing dependencies (including recursive dependencies) |
| PRESERVE_DIRECT | Preserve the state of all existing direct dependencies |
| PRESERVE_SEMVER | Preserve semver-compatible versions of direct dependencies |
| PRESERVE_NONE | Do not attempt to preserve any version information |
| PRESERVE_TIERED_INSTALLED | Like PRESERVE_TIERED except PRESERVE_ALL_INSTALLED is tried first |
| PRESERVE_TIERED | Use the tier that will preserve the most version information while allowing version resolution to succeed (this is the default) | 
	

# startup.jl

My current `.julia/config/startup.jl` file


``` julia
ENV["JULIA_EDITOR"] = "emacs"
# ENV["JULIA_NUM_THREADS"]=3,1
using Revise
#using Infiltrator
#using DrWatson
## using PkgTemplates
ENV["pkg_template"] = """Template(;julia=v"1.10",user="tp2750",dir = ".", plugins=[Git(; manifest=false, ssh=true),Documenter{GitHubActions}(),GitHubActions(extra_versions= ["1.10", "1.11")])"""
@info """To start a package, do:\nusing PkgTemplates\nt = eval(Meta.parse(ENV["pkg_template"]))\nt("MyPackage")"""
## ENV["JULIA_PKG_PRESERVE_TIERED_INSTALLED"] = true
## @info "PRESERVE_TIERED_INSTALLED set by JULIA_PKG_PRESERVE_TIERED_INSTALLED"
## @info "To reset to default do: ENV[\"JULIA_PKG_PRESERVE_TIERED_INSTALLED\"] = true"
@info "To prefer already installed versions of libraries, set ENV[\"JULIA_PKG_PRESERVE_TIERED_INSTALLED\"] = true\n Undo by ENV[\"JULIA_PKG_PRESERVE_TIERED_INSTALLED\"] = true"

##   https://twitter.com/heyjoshday/status/1555527185028395010
# macro dev()
#     pkg = Symbol(
#     replace(
#     readline("Project.toml"),
#     "name = \"" => "",
#     '"' => ""
#        )
#     )
#     esc(:(using Pkg; Pkg.activate("."); using Revise, $pkg))
# end

# ## https://discourse.julialang.org/t/what-is-in-your-startup-jl/18228/2?u=tp2750
# cdpkg(pkg) = cd(dirname(Base.find_package(string(pkg))))

# macro cdpkg(pkg)
#     cdpkg(pkg)
#     return nothing
# end

```
