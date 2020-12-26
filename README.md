# tpNotes.jl

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://tp2750.github.io/tpNotes.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://tp2750.github.io/tpNotes.jl/dev)
[![Build Status](https://github.com/tp2750/tpNotes.jl/workflows/CI/badge.svg)](https://github.com/tp2750/tpNotes.jl/actions)
[![Coverage](https://codecov.io/gh/tp2750/tpNotes.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/tp2750/tpNotes.jl)

# Purpose

This repo tracks my notes on things I learn in Julia.

# Development

## PkgTemplates
This repo was setup using this snippet:

```{julia}
julia> using PkgTemplates
julia> t = Template(; 
    user="tp2750",
    dir=".",
    authors="Thomas Poulsen",
    julia=v"1.5.3",
    plugins=[
        License(; name="GPL-2.0+"),
        Git(; manifest=false, ssh=false),
        GitHubActions(;extra_versions=["nightly"], x86=false, windows=false, osx=false), ## skip some defaults
        Codecov(),
        Documenter{GitHubActions}(),
        Develop(),
    ],
  )
julia> t("tpNotes")
```

Created the repo "tpNotes.jl" in Github and just did:

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

## Adding keys

For ducumentation to automatically build, generate keys by running `DocumenterTools.genkeys` and follow the instructions:

```{julia}
(tpNotes) pkg> add DocumenterTools
julia> using tpNotes
julia> using DocumenterTools
julia> DocumenterTools.genkeys(user = "tp2750", repo="git@github.com:tp2750/tpNotes.jl.git")
```



# Overloading Base operator

Overloading a base bianry operator (like `+`):

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

# Documentation using Documenter.jl

Modules needed in documentation needs to be loaded in the `make.jl` file.
This is also the place to control the sidebar (in the `pages = []` argument to `makedocs`).
It is good practice to split documentation inseveral files. See https://juliadocs.github.io/Documenter.jl/stable/man/guide/#Pages-in-the-Sidebar

## Examples

Code examples in documentaion files can share context if they are named. 
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

# Code coverage

Computing code coverage locally is done as described in the [here](https://github.com/JuliaCI/Coverage.jl#working-locally) (in the README of the [Coverage.jl](https://github.com/JuliaCI/Coverage.jl) package).
