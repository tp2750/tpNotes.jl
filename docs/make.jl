using tpNotes
using Documenter

makedocs(;
    modules=[tpNotes],
    authors="Thomas Poulsen",
    repo="https://github.com/tp2750/tpNotes.jl/blob/{commit}{path}#L{line}",
    sitename="tpNotes.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://tp2750.github.io/tpNotes.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "README" => "README.md",
        "Logging" => "logging.md",
        "Running system commands" => "system.md",
        "Vectors" => "vectors.md",
    ],
)

deploydocs(;
    repo="github.com/tp2750/tpNotes.jl",
)
