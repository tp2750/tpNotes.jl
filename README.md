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

