```@meta
CurrentModule = tpNotes
```

# tpNotes.jl

```@index
```

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



```@autodocs
Modules = [tpNotes]
```
