var documenterSearchIndex = {"docs":
[{"location":"README/#tpNotes.jl","page":"README","title":"tpNotes.jl","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"<!–- (Image: Stable) –->  (Image: Dev) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"README/#Purpose","page":"README","title":"Purpose","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"This repo tracks my notes on things I learn in Julia.","category":"page"},{"location":"README/#Vocabulary","page":"README","title":"Vocabulary","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Standard idioms and their R equivalent.","category":"page"},{"location":"README/#Vectors","page":"README","title":"Vectors","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> extrema([1,2,3])\n(1, 3)\n\njulia> first(collect(1:10))\n1\n\njulia> last(collect(1:10))\n10\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"R","category":"page"},{"location":"README/","page":"README","title":"README","text":"> range(c(1,2,3))\n[1] 1 3\n> head(1:10,1)\n[1] 1\n> tail(1:10,1)\n[1] 10","category":"page"},{"location":"README/#Combinations","page":"README","title":"Combinations","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using DataFrames\njulia> rename(DataFrame(Base.Iterators.product([1,2], [\"A\",\"B\",\"C\"])), [\"Num\",\"Name\"])\n6×2 DataFrame\n Row │ Num    Name   \n     │ Int64  String \n─────┼───────────────\n   1 │     1  A\n   2 │     2  A\n   3 │     1  B\n   4 │     2  B\n   5 │     1  C\n   6 │     2  C\n\njulia> vec(string.([\"x\", \"y\"], [1 2 3])) ## note: col-vector, row-vector. Ref https://github.com/JuliaAcademy/DataFrames/blob/main/2.%20First%20steps%20with%20data%20frames.ipynb\n6-element Array{String,1}:\n \"x1\"\n \"y1\"\n \"x2\"\n \"y2\"\n \"x3\"\n \"y3\"\n\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"R","category":"page"},{"location":"README/","page":"README","title":"README","text":"setNames(expand.grid(c(1,2), c(\"A\",\"B\",\"C\")), c(\"Num\",\"Name\"))\n  Num Name\n1   1    A\n2   2    A\n3   1    B\n4   2    B\n5   1    C\n6   2    C\n","category":"page"},{"location":"README/#Loop-over-rows-of-data-frame","page":"README","title":"Loop over rows of data frame","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"using DataFrames, DataFramesMeta\n\ndf_in = rename(DataFrame(Base.Iterators.product([1,2], [\"A\",\"B\",\"C\"])), [\"Num\",\"Name\"]);\n\n@eachrow df_in begin \n  @newcol Res1::Vector{String}\n  @newcol Res2::Vector{String}\n  :Res1 = string(:Num) * :Name\n  :Res2 = :Name * string(:Num)\nend\n\n6×4 DataFrame\n Row │ Num    Name    Res1    Res2   \n     │ Int64  String  String  String \n─────┼───────────────────────────────\n   1 │     1  A       1A      A1\n   2 │     2  A       2A      A2\n   3 │     1  B       1B      B1\n   4 │     2  B       2B      B2\n   5 │     1  C       1C      C1\n   6 │     2  C       2C      C2\n\n## Simpler for this case:\n@transform(df_in, Res1 = string.(:Num) .* :Name, Res2 = :Name .* string.(:Num))\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"The last form is much simpler, but only works if the function can be broardcasted (afaIk).","category":"page"},{"location":"README/#Development","page":"README","title":"Development","text":"","category":"section"},{"location":"README/#PkgTemplates","page":"README","title":"PkgTemplates","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"This repo was setup using this snippet:","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using PkgTemplates\njulia> t = Template(; \n    user=\"tp2750\",\n    dir=\".\",\n    authors=\"Thomas Poulsen\",\n    julia=v\"1.5.3\",\n    plugins=[\n        License(; name=\"GPL-2.0+\"),\n        Git(; manifest=false, ssh=false),\n        GitHubActions(;extra_versions=[\"nightly\"], x86=false, windows=false, osx=false), ## skip some defaults\n        Codecov(),\n        Documenter{GitHubActions}(),\n        Develop(),\n    ],\n  )\njulia> t(\"tpNotes\")","category":"page"},{"location":"README/","page":"README","title":"README","text":"Created the repo \"tpNotes.jl\" in Github and just did:","category":"page"},{"location":"README/","page":"README","title":"README","text":"tpNotes$ git push --set-upstream origin master","category":"page"},{"location":"README/","page":"README","title":"README","text":"Note that the project name in PkgTemplates doe not include \".jl\", but the repo-name does.","category":"page"},{"location":"README/","page":"README","title":"README","text":"After a bit the \"CI\" and \"codecov\" badges turn green. But the \"docs\" badges do not work out of the box.","category":"page"},{"location":"README/#Using-ssh","page":"README","title":"Using ssh","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Changing to use ssh. First check current with git remote -v. Then change it with git remote set-url origin ...:","category":"page"},{"location":"README/","page":"README","title":"README","text":"tpNotes$ git remote -v \norigin\thttps://github.com/tp2750/tpNotes.jl (fetch)\norigin\thttps://github.com/tp2750/tpNotes.jl (push)\n\ntpNotes$ git remote set-url origin  git@github.com:tp2750/tpNotes.jl.git","category":"page"},{"location":"README/","page":"README","title":"README","text":"Remember the .git at the end.","category":"page"},{"location":"README/#Adding-keys","page":"README","title":"Adding keys","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"For ducumentation to automatically build, generate keys by running DocumenterTools.genkeys and follow the instructions:","category":"page"},{"location":"README/","page":"README","title":"README","text":"(tpNotes) pkg> add DocumenterTools\njulia> using tpNotes\njulia> using DocumenterTools\njulia> DocumenterTools.genkeys(user = \"tp2750\", repo=\"tpNotes.jl\")","category":"page"},{"location":"README/","page":"README","title":"README","text":"Name the public key \"DOCUMENTERPUB\" and the private key \"DOCUMENTERKEY\"","category":"page"},{"location":"README/#Overloading-Base-operator","page":"README","title":"Overloading Base operator","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Overloading a base bianry operator (like +):","category":"page"},{"location":"README/","page":"README","title":"README","text":"Define my own struct.\nDefine a method of a base function using that struct. Use symbol notation for the operator.","category":"page"},{"location":"README/","page":"README","title":"README","text":"No import or export needed.","category":"page"},{"location":"README/#Example","page":"README","title":"Example","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"struct People\n    name::String\nend\n\nBase.:+(p1::People, p2::People) = \"$(string(p1.name)) and $(string(p2.name))\"","category":"page"},{"location":"README/","page":"README","title":"README","text":"Then we have","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using tpNotes\njulia> p1 = tpNotes.People(\"Søren\")\njulia> p2 = tpNotes.People(\"Mette\")\njulia> p1 + p2 == \"Søren and Mette\"\ntrue","category":"page"},{"location":"README/#Documentation-using-Documenter.jl","page":"README","title":"Documentation using Documenter.jl","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Modules needed in documentation needs to be loaded in the make.jl file. This is also the place to control the sidebar (in the pages = [] argument to makedocs). It is good practice to split documentation inseveral files. See https://juliadocs.github.io/Documenter.jl/stable/man/guide/#Pages-in-the-Sidebar","category":"page"},{"location":"README/#Examples","page":"README","title":"Examples","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Code examples in documentaion files can share context if they are named.  The documentation does not mention it, but it looks like named blocks have to be continuous (two blocks can not mix).","category":"page"},{"location":"README/","page":"README","title":"README","text":"Eg:","category":"page"},{"location":"README/","page":"README","title":"README","text":"<pre>","category":"page"},{"location":"README/","page":"README","title":"README","text":"  a = 3","category":"page"},{"location":"README/","page":"README","title":"README","text":"  print(a)","category":"page"},{"location":"README/","page":"README","title":"README","text":"</pre>","category":"page"},{"location":"README/#Code-coverage","page":"README","title":"Code coverage","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Computing code coverage locally is done as described in the here (in the README of the Coverage.jl package).","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = tpNotes","category":"page"},{"location":"#tpNotes.jl","page":"Home","title":"tpNotes.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Purpose","page":"Home","title":"Purpose","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This repo tracks my notes on things I learn in Julia.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [tpNotes]","category":"page"}]
}
