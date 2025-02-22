var documenterSearchIndex = {"docs":
[{"location":"system/#Running-System-Commands","page":"Running system commands","title":"Running System Commands","text":"","category":"section"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"Julia does not send system commands to a shell as described in the manual","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"This has a number of concequences:","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"File-names etc do not need to be escaped if parsed as an interpolated variable\nCommandline options are not split on space if parsed as an interpolated variable\nPiping and redirection using shell constructs like \"|\" and \">\" do not work.\nstdin and stderr are not collected by default.","category":"page"},{"location":"system/#Basic-usage","page":"Running system commands","title":"Basic usage","text":"","category":"section"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"Simply running a command is a combination of backticks and run():","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"o1 = run(`ls -lrt .`)","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"however, the output of the command is not collected:","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"julia> o1\nProcess(`ls -lrt .`, ProcessExited(0))\n","category":"page"},{"location":"system/#Redirecting-stdout-and-stderr","page":"Running system commands","title":"Redirecting stdout and stderr","text":"","category":"section"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"To redirect stdin and stdout to files, a pipeline is needed:","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"run(pipeline(`ls -lrth .`, stdout = \"/tmp/o1\", stderr=\"/tmp/e1\"))","category":"page"},{"location":"system/#Interpolations-of-commandline-options","page":"Running system commands","title":"Interpolations of commandline options","text":"","category":"section"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"Passing multiple options in a string does not work:","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"julia> o1 = \"-l -r\"\n\"-l -r\"\n\njulia> run(`ls $o1 .`)\nERROR: failed process: Process(`ls '-l -r' .`, ProcessExited(2)) [2]\n","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"The individual options need to be given as a vector","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"o2 = split(\"-l -r\")\nrun(`ls $o2 .`)","category":"page"},{"location":"system/#Piping","page":"Running system commands","title":"Piping","text":"","category":"section"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"The equivalent of a shell pipeline is the command pipeline():","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"run(pipeline(`ls $o2`, `sort -g`))","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"As noted above, the pipeline command (not run) takes keyword arguments stdin and stdout to re-direct the output.","category":"page"},{"location":"system/","page":"Running system commands","title":"Running system commands","text":"run(pipeline(pipeline(`ls $o2`, `sort -g`), stdout = \"/tmp/o1\"))","category":"page"},{"location":"vectors/#Working-with-vectors-etc","page":"Vectors","title":"Working with vectors etc","text":"","category":"section"},{"location":"vectors/#Element-membership","page":"Vectors","title":"Element membership","text":"","category":"section"},{"location":"vectors/#Is-All-of-r-in-x?","page":"Vectors","title":"Is All of r in x?","text":"","category":"section"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"all() can take function as first element: Ref: https://bkamins.github.io/julialang/2022/04/01/fast.html","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"f(x, r) = all(in(x), r) # function testing lookup speed\n\nf([1,2,3,4], [1,2,3]) ## true\n\nf([1,2,3], [1,2,3,4]) ## false","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"Simpler:","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"all([1,2,3] .∈  Ref([1,2,3,4])) ## true\n\nall([1,2,3,4 ] .∈  Ref([1,2,3])) ## false\n\nall(in.([1,2,3], Ref([1,2,3,4]))) ## true\n","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"For some reason all([1,2,3] .in  Ref([1,2,3,4])) fails.","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"From docs (currying .∈):","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"all([1,2,3] .∈([1,2,3,4],)) ## true\nall([1,2,3,4] .∈([1,2,3,],)) ## false","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"Using in looks a bit different:","category":"page"},{"location":"vectors/","page":"Vectors","title":"Vectors","text":"all(in([1,2,3,4]).([1,2,3])) ## true\nall(in([1,2,3]).([1,2,3,4])) ## false","category":"page"},{"location":"logging/#Logging","page":"Logging","title":"Logging","text":"","category":"section"},{"location":"logging/","page":"Logging","title":"Logging","text":"https://github.com/JuliaLogging","category":"page"},{"location":"logging/","page":"Logging","title":"Logging","text":"Default logging macros:\n@debug\n@info messages are displayed by default.\n@warn\n@error\ndisable_logging() is documented to set log level, but I can not get it to work\nEnable debug: ENV[\"JULIA_DEBUG\"]=\"all\"\nDisable debug: ENV[\"JULIA_DEBUG\"]=\"\"\nStandard log-levels are called \nLogging.Debug == Logging.LogLevel(-1000)\nLogging.Info == Logging.LogLevel(0)\nLogging.Warn == Logging.LogLevel(1000)\nLogging.Error == Logging.LogLevel(2000)\nmaxlog magic keyword kan be used to limit the number of times a message is logged.\nA backtrace can be using the other magic keyword exception=(ex, bt)","category":"page"},{"location":"logging/#Example","page":"Logging","title":"Example","text":"","category":"section"},{"location":"logging/","page":"Logging","title":"Logging","text":"for i = 1:10\n\t@info \"Count = $i\" maxlog=2\n\t@debug \"Progress = $i of 10\"\nend\n[ Info: Count = 1\n[ Info: Count = 2","category":"page"},{"location":"logging/","page":"Logging","title":"Logging","text":"julia> disable_logging(Logging.LogLevel(-1000))\nLogLevel(-999)\n\njulia> disable_logging(Logging.LogLevel(-1001))\nDebug\n\njulia> for i = 1:10\n               @info \"Count = $i\" maxlog=2\n               @debug \"Progress = $i of 10\"\n       end\n[ Info: Count = 1\n[ Info: Count = 2","category":"page"},{"location":"logging/","page":"Logging","title":"Logging","text":"julia> ENV[\"JULIA_DEBUG\"]=\"all\"\n\"all\"\n\njulia> for i = 1:10\n               @info \"Count = $i\" maxlog=2\n               @debug \"Progress = $i of 10\"\n       end\n[ Info: Count = 1\n┌ Debug: Progress = 1 of 10\n└ @ Main REPL[15]:3\n[ Info: Count = 2\n┌ Debug: Progress = 2 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 3 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 4 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 5 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 6 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 7 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 8 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 9 of 10\n└ @ Main REPL[15]:3\n┌ Debug: Progress = 10 of 10\n└ @ Main REPL[15]:3\n\njulia> ENV[\"JULIA_DEBUG\"]=\"\"\n\"\"\n\njulia> for i = 1:10\n               @info \"Count = $i\" maxlog=2\n               @debug \"Progress = $i of 10\"\n       end\n[ Info: Count = 1\n[ Info: Count = 2","category":"page"},{"location":"README/#tpNotes.jl","page":"README","title":"tpNotes.jl","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"<!–- (Image: Stable) –->  (Image: Dev) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"README/#Purpose","page":"README","title":"Purpose","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"This repo tracks my notes on things I learn in Julia.","category":"page"},{"location":"README/#Vocabulary","page":"README","title":"Vocabulary","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Standard idioms and their R equivalent.","category":"page"},{"location":"README/","page":"README","title":"README","text":"Some R function names are implemented in src/r.jl","category":"page"},{"location":"README/#Vectors","page":"README","title":"Vectors","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> extrema([1,2,3])\n(1, 3)\n\njulia> first(collect(1:10))\n1\n\njulia> last(collect(1:10))\n10\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"R","category":"page"},{"location":"README/","page":"README","title":"README","text":"> range(c(1,2,3))\n[1] 1 3\n> head(1:10,1)\n[1] 1\n> tail(1:10,1)\n[1] 10","category":"page"},{"location":"README/#Combinations","page":"README","title":"Combinations","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using DataFrames\njulia> rename(DataFrame(Base.Iterators.product([1,2], [\"A\",\"B\",\"C\"])), [\"Num\",\"Name\"])\n6×2 DataFrame\n Row │ Num    Name   \n     │ Int64  String \n─────┼───────────────\n   1 │     1  A\n   2 │     2  A\n   3 │     1  B\n   4 │     2  B\n   5 │     1  C\n   6 │     2  C\n\njulia> vec(string.([\"x\", \"y\"], [1 2 3])) ## note: col-vector, row-vector. Ref https://github.com/JuliaAcademy/DataFrames/blob/main/2.%20First%20steps%20with%20data%20frames.ipynb\n6-element Array{String,1}:\n \"x1\"\n \"y1\"\n \"x2\"\n \"y2\"\n \"x3\"\n \"y3\"\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"R","category":"page"},{"location":"README/","page":"README","title":"README","text":"setNames(expand.grid(c(1,2), c(\"A\",\"B\",\"C\")), c(\"Num\",\"Name\"))\n  Num Name\n1   1    A\n2   2    A\n3   1    B\n4   2    B\n5   1    C\n6   2    C\n","category":"page"},{"location":"README/#paste","page":"README","title":"paste","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"The R function paste does 2 things: 1. paste the elements of two string vectors together element by element; 2: collapse a string vector into a single string.","category":"page"},{"location":"README/#Combining","page":"README","title":"Combining","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"R:","category":"page"},{"location":"README/","page":"README","title":"README","text":"paste(c(\"a\", \"b\"), c(1,2))\n[1] \"a 1\" \"b 2\"\npaste(c(\"a\", \"b\"), c(1,2), sep=\"\")\n[1] \"a1\" \"b2\"","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> string.([\"a\", \"b\"], \" \", [1,2])\n2-element Vector{String}:\n \"a 1\"\n \"b 2\"\n\njulia> string.([\"a\", \"b\"], [1,2])\n2-element Vector{String}:\n \"a1\"\n \"b2\"","category":"page"},{"location":"README/#Collapse","page":"README","title":"Collapse","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"R","category":"page"},{"location":"README/","page":"README","title":"README","text":"> paste(c(\"a\", \"b\", \"c\"), collapse=\"\")\n[1] \"abc\"\n> paste(c(\"a\", \"b\", \"c\"), collapse=\", \")\n[1] \"a, b, c\"","category":"page"},{"location":"README/","page":"README","title":"README","text":"Julia:","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> join([\"a\", \"b\", \"c\"])\n\"abc\"\n\njulia> join([\"a\", \"b\", \"c\"], \", \")\n\"a, b, c\"\njulia> join([\"a\", \"b\", \"c\"], \", \", \" and \")\n\"a, b and c\"","category":"page"},{"location":"README/#Loop-over-rows-of-data-frame","page":"README","title":"Loop over rows of data frame","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Julia","category":"page"},{"location":"README/","page":"README","title":"README","text":"using DataFrames, DataFramesMeta\n\ndf_in = rename(DataFrame(Base.Iterators.product([1,2], [\"A\",\"B\",\"C\"])), [\"Num\",\"Name\"]);\n\n@eachrow df_in begin \n  @newcol Res1::Vector{String}\n  @newcol Res2::Vector{String}\n  :Res1 = string(:Num) * :Name\n  :Res2 = :Name * string(:Num)\nend\n\n6×4 DataFrame\n Row │ Num    Name    Res1    Res2   \n     │ Int64  String  String  String \n─────┼───────────────────────────────\n   1 │     1  A       1A      A1\n   2 │     2  A       2A      A2\n   3 │     1  B       1B      B1\n   4 │     2  B       2B      B2\n   5 │     1  C       1C      C1\n   6 │     2  C       2C      C2\n\n## Simpler for this case:\n@transform(df_in, Res1 = string.(:Num) .* :Name, Res2 = :Name .* string.(:Num))\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"The last form is much simpler, but only works if the function can be broardcasted (afaIk).","category":"page"},{"location":"README/#Lists-and-dicts","page":"README","title":"Lists and dicts","text":"","category":"section"},{"location":"README/#check-if-key-is-in-dict","page":"README","title":"check if key is in dict","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"julia> haskey(args,\"fit_file\")\ntrue","category":"page"},{"location":"README/","page":"README","title":"README","text":"> \"fit_file\" %in% names(args)","category":"page"},{"location":"README/#Collect-instances-into-a-dict","page":"README","title":"Collect instances into a dict","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"See https://discourse.julialang.org/t/collect-values-in-a-dict/64626","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> l = [x => x%3 for x in 1:10];\njulia> d = Dict{Int, Vector{Int}}()\njulia> for (x,y) in l\njulia>   push!(get!(Vector{Int},d,y), x) \njulia> end\njulia> d\n\nDict{Int64, Vector{Int64}} with 3 entries:\n  0 => [3, 6, 9]\n  2 => [2, 5, 8]\n  1 => [1, 4, 7, 10]","category":"page"},{"location":"README/","page":"README","title":"README","text":"Similar in R (not explicit pairs):","category":"page"},{"location":"README/","page":"README","title":"README","text":"> l <- (1:10)%%3\n> setNames(lapply(unique(l), function(x) which(l == x)), unique(l))\n`1`\n[1]  1  4  7 10\n\n$`2`\n[1] 2 5 8\n\n$`0`\n[1] 3 6 9","category":"page"},{"location":"README/#Development","page":"README","title":"Development","text":"","category":"section"},{"location":"README/#PkgTemplates","page":"README","title":"PkgTemplates","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"This repo was setup using this snippet:","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using PkgTemplates\njulia> t = Template(; \n    user=\"tp2750\",\n    dir=\".\",\n    authors=\"Thomas Poulsen\",\n    julia=v\"1.6\",\n    plugins=[\n        License(; name=\"GPL-2.0+\"),\n        Git(; manifest=false, ssh=true),\n        GitHubActions(;extra_versions=[\"nightly\"], x86=false, windows=false, osx=false), ## skip some defaults\n        Codecov(),\n        Documenter{GitHubActions}(),\n        Develop(),\n    ],\n  )\njulia> t(\"tpNotes\")","category":"page"},{"location":"README/","page":"README","title":"README","text":"Created the repo \"tpNotes.jl\" in GitHub and just did:","category":"page"},{"location":"README/","page":"README","title":"README","text":"tpNotes$ git push --set-upstream origin master","category":"page"},{"location":"README/","page":"README","title":"README","text":"Note that the project name in PkgTemplates doe not include \".jl\", but the repo-name does.","category":"page"},{"location":"README/","page":"README","title":"README","text":"After a bit the \"CI\" and \"codecov\" badges turn green. But the \"docs\" badges do not work out of the box.","category":"page"},{"location":"README/#Using-ssh","page":"README","title":"Using ssh","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Changing to use ssh. First check current with git remote -v. Then change it with git remote set-url origin ...:","category":"page"},{"location":"README/","page":"README","title":"README","text":"tpNotes$ git remote -v \norigin\thttps://github.com/tp2750/tpNotes.jl (fetch)\norigin\thttps://github.com/tp2750/tpNotes.jl (push)\n\ntpNotes$ git remote set-url origin  git@github.com:tp2750/tpNotes.jl.git","category":"page"},{"location":"README/","page":"README","title":"README","text":"Remember the .git at the end.","category":"page"},{"location":"README/#Documentation-using-Documenter.jl","page":"README","title":"Documentation using Documenter.jl","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Modules needed in documentation needs to be loaded in the make.jl file. This is also the place to control the sidebar (in the pages = [] argument to makedocs). It is good practice to split documentation in several files. See https://juliadocs.github.io/Documenter.jl/stable/man/guide/#Pages-in-the-Sidebar","category":"page"},{"location":"README/#Adding-keys-for-Documenter-and-Github-Actions","page":"README","title":"Adding keys for Documenter and Github Actions","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"For documentation to automatically build, generate keys by running DocumenterTools.genkeys and follow the instructions.","category":"page"},{"location":"README/","page":"README","title":"README","text":"OBS Remeber to set the proper workflow permissions: \"horizontal menu: Settings -> vertical menu: Actions -> General -> section: Workflow permissions: choose \"Read and write permissions\" and check the box: \"Allow GiHub Actions to create and approve pull requests\".  This is not needed to build documentation, but it is needed for compatHelper to create pull requests when dependencies need to be updated.","category":"page"},{"location":"README/","page":"README","title":"README","text":"(tpNotes) pkg> add DocumenterTools\njulia> using tpNotes\njulia> using DocumenterTools\njulia> DocumenterTools.genkeys(user = \"tp2750\", repo=\"tpNotes.jl\")","category":"page"},{"location":"README/","page":"README","title":"README","text":"Name the public key (deploy key) \"DOCUMENTERPUB\" and the private key (repository secret under Settings -> Secrets and variables -> Actions -> Repository secret) \"DOCUMENTERKEY\"-","category":"page"},{"location":"README/#Building-the-docs","page":"README","title":"Building the docs","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"to build the docs, cd to the docs folder, and jun make.jl in the context of the docs project:","category":"page"},{"location":"README/","page":"README","title":"README","text":"tpNotes.jl/docs$ julia --project=. make.jl \n","category":"page"},{"location":"README/","page":"README","title":"README","text":"In github, set github-pages to build from the branch: gh-pages in the / (root) folder.","category":"page"},{"location":"README/#Examples","page":"README","title":"Examples","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Code examples in documentation files can share context if they are named.  The documentation does not mention it, but it looks like named blocks have to be continuous (two blocks can not mix).","category":"page"},{"location":"README/","page":"README","title":"README","text":"Eg:","category":"page"},{"location":"README/","page":"README","title":"README","text":"<pre>","category":"page"},{"location":"README/","page":"README","title":"README","text":"  a = 3","category":"page"},{"location":"README/","page":"README","title":"README","text":"  print(a)","category":"page"},{"location":"README/","page":"README","title":"README","text":"</pre>","category":"page"},{"location":"README/#Overloading-Base-operator","page":"README","title":"Overloading Base operator","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Overloading a base binary operator (like +):","category":"page"},{"location":"README/","page":"README","title":"README","text":"Define my own struct.\nDefine a method of a base function using that struct. Use symbol notation for the operator.","category":"page"},{"location":"README/","page":"README","title":"README","text":"No import or export needed.","category":"page"},{"location":"README/#Example","page":"README","title":"Example","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"struct People\n    name::String\nend\n\nBase.:+(p1::People, p2::People) = \"$(string(p1.name)) and $(string(p2.name))\"","category":"page"},{"location":"README/","page":"README","title":"README","text":"Then we have","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using tpNotes\njulia> p1 = tpNotes.People(\"Søren\")\njulia> p2 = tpNotes.People(\"Mette\")\njulia> p1 + p2 == \"Søren and Mette\"\ntrue","category":"page"},{"location":"README/#Code-coverage","page":"README","title":"Code coverage","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Computing code coverage locally is done as described in the here (in the README of the Coverage.jl package).","category":"page"},{"location":"README/#PackageCompile","page":"README","title":"PackageCompile","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Remember to \"dev\" the local module from the \"app\" module. If not, you need to re-add every time you make changes to the actual module.","category":"page"},{"location":"README/#Misc","page":"README","title":"Misc","text":"","category":"section"},{"location":"README/#Which-project-is-active?","page":"README","title":"Which project is active?","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Base.active_project()","category":"page"},{"location":"README/#K-means","page":"README","title":"K-means","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"K-means","category":"page"},{"location":"README/","page":"README","title":"README","text":"https://juliastats.org/Clustering.jl/dev/kmeans.html","category":"page"},{"location":"README/","page":"README","title":"README","text":"Elements to cluster are in columns: (use x')","category":"page"},{"location":"README/","page":"README","title":"README","text":"using Clustering\njulia> x=vcat(0,repeat(1:1,10))\njulia> res = kmeans(x',2) ## or kmeans(reshape(x, 1,11),2) \njulia> res.centers\n1×2 Matrix{Float64}:\n 1.0  0.0\njulia> assignments(res)\n11-element Vector{Int64}:\n 2\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1","category":"page"},{"location":"README/#K-medoids","page":"README","title":"K-medoids","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"Selects a representing point.","category":"page"},{"location":"README/","page":"README","title":"README","text":"Needs distance matrix.","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> using Distances\njulia> x_dist = pairwise(Euclidean(), x'; dims=2)\n# or simply (https://discourse.julialang.org/t/pairwise-distances-from-a-single-column-or-vector/29415/6)\njulia> x_dist = [abs(i-j) for i in x, j in x]\n\njulia> res2 = kmedoids(x_dist, 2)\njulia> res2.medoids ## indices of medoid points\n2-element Vector{Int64}:\n 2\n 1\n# medoid points:\njulia> x[res2.medoids]\n2-element Vector{Int64}:\n 1\n 0\njulia> assignments(res2)\n11-element Vector{Int64}:\n 2\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n 1\n ```\n \n# Conversions\n\n## matrix to vector and back\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> m = [1 3 5; 2 4 6] 2×3 Matrix{Int64}:  1  3  5  2  4  6","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> vec(m) 6-element Vector{Int64}:  1  2  3  4  5  6","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> reshape(vec(m), size(m)) == m true","category":"page"},{"location":"README/","page":"README","title":"README","text":"\n\n# Tests\n## Comparing at stated precision\nhttps://discourse.julialang.org/t/compare-numbers-at-the-stated-precision/86719/10\nIn tests I’ll like to be able to write the following and the test to pass:\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia @test aresame(pi, 3.14)","category":"page"},{"location":"README/","page":"README","title":"README","text":"\nThe following works:\n\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia @test isapprox(pi, 3.14, atol = 0.005)","category":"page"},{"location":"README/","page":"README","title":"README","text":"\nBut then I need to adjust the absolute tolerance manually.\n\nI need a function to find the “number of significant digits” of a numeric literal and use that.\n\nThe following apparently works, but I’m wondering if this already exists?\n\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia function sigdigs(x)     xstring = string(convert(Float64,x))     length(xstring) - findlast('.',x_string) end","category":"page"},{"location":"README/","page":"README","title":"README","text":"function aresame(x,y)     toldigits = min(sigdigs(x), sigdigs(y))     tol = .49*0.1^(toldigits)     isapprox(x,y,atol=tol) end","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> aresame(pi,3.1) true","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> aresame(pi,3.14) true","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> aresame(pi,3.141) false","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia> aresame(pi,3.1415) false","category":"page"},{"location":"README/","page":"README","title":"README","text":"\n# Packages\nCool and useful packages\n\n## [TerminalPager.jl](https://github.com/ronisbr/TerminalPager.jl)\nGreat for browsing large tables:\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"using TerminalPager, DataFrames pager(DataFrame(rand(100, 100), :auto))","category":"page"},{"location":"README/","page":"README","title":"README","text":"\nPress ? to get navigation help:\n\n* Shift ->, Shift <- to move side-wise\n* u/d to move up/down by half a page or\n  Page-up/down for full page\n* < or g to go to top\n* > or G to go to end\n\n## [DefaultApplication.jl](https://github.com/tpapp/DefaultApplication.jl)\nBasically just calling `xdg-open`, but still useful.\n\n# Base functions\n\n* `repr` Create a string from any value using the show function.\n* replace(string, pattern => replacement; [count])\n\n# Reuse installed version of packages\nFrom julia 1.9 we can change the default package installation strategy to Pkg.PRESERVE_TIERED_INSTALLED to let the package manager try to install versions of packages while keeping as many versions of packages already installed as possible:\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia ENV[\"JULIAPKGPRESERVETIEREDINSTALLED\"] = true","category":"page"},{"location":"README/","page":"README","title":"README","text":"\nSee https://docs.julialang.org/en/v1/manual/environment-variables/#JULIA_PKG_PRESERVE_TIERED_INSTALLED,\nhttps://pkgdocs.julialang.org/v1/api/#Pkg.add\n\nFrom doc of Pkg.add:\n\nPkg resolves the set of packages in your environment using a tiered algorithm. The preserve keyword argument allows you to key into a specific tier in the resolve algorithm. The following table describes the argument values for preserve (in order of strictness):\n\n| Value | Description |\n| -- | -- |\n| PRESERVE_ALL_INSTALLED |  Like PRESERVE_ALL and only add those already installed |\n| PRESERVE_ALL | Preserve the state of all existing dependencies (including recursive dependencies) |\n| PRESERVE_DIRECT | Preserve the state of all existing direct dependencies |\n| PRESERVE_SEMVER | Preserve semver-compatible versions of direct dependencies |\n| PRESERVE_NONE | Do not attempt to preserve any version information |\n| PRESERVE_TIERED_INSTALLED | Like PRESERVE_TIERED except PRESERVE_ALL_INSTALLED is tried first |\n| PRESERVE_TIERED | Use the tier that will preserve the most version information while allowing version resolution to succeed (this is the default) | \n\t\n\n# startup.jl\n\nMy current `.julia/config/startup.jl` file\n\n","category":"page"},{"location":"README/","page":"README","title":"README","text":"julia ENV[\"JULIA_EDITOR\"] = \"emacs\"","category":"page"},{"location":"README/#ENV[\"JULIA*NUM*THREADS\"]3,1","page":"README","title":"ENV[\"JULIANUMTHREADS\"]=3,1","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"using Revise #using Infiltrator #using DrWatson","category":"page"},{"location":"README/#using-PkgTemplates","page":"README","title":"using PkgTemplates","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"ENV[\"pkgtemplate\"] = \"\"\"Template(;julia=v\"1.10\",user=\"tp2750\",dir = \".\", plugins=[Git(; manifest=false, ssh=true),Documenter{GitHubActions}(),GitHubActions(extraversions= [\"1.10\", \"1.11\")])\"\"\" @info \"\"\"To start a package, do:\\nusing PkgTemplates\\nt = eval(Meta.parse(ENV[\"pkg_template\"]))\\nt(\"MyPackage\")\"\"\"","category":"page"},{"location":"README/#ENV[\"JULIA*PKG*PRESERVE*TIERED*INSTALLED\"]-true","page":"README","title":"ENV[\"JULIAPKGPRESERVETIEREDINSTALLED\"] = true","text":"","category":"section"},{"location":"README/#@info-\"PRESERVE*TIERED*INSTALLED-set-by-JULIA*PKG*PRESERVE*TIERED*INSTALLED\"","page":"README","title":"@info \"PRESERVETIEREDINSTALLED set by JULIAPKGPRESERVETIEREDINSTALLED\"","text":"","category":"section"},{"location":"README/#@info-\"To-reset-to-default-do:-ENV[\\\"JULIA*PKG*PRESERVE*TIERED*INSTALLED\\\"]-true\"","page":"README","title":"@info \"To reset to default do: ENV[\\\"JULIAPKGPRESERVETIEREDINSTALLED\\\"] = true\"","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"@info \"To prefer already installed versions of libraries, set ENV[\\\"JULIAPKGPRESERVETIEREDINSTALLED\\\"] = true\\n Undo by ENV[\\\"JULIAPKGPRESERVETIEREDINSTALLED\\\"] = true\"","category":"page"},{"location":"README/#https://twitter.com/heyjoshday/status/1555527185028395010","page":"README","title":"https://twitter.com/heyjoshday/status/1555527185028395010","text":"","category":"section"},{"location":"README/#macro-dev()","page":"README","title":"macro dev()","text":"","category":"section"},{"location":"README/#pkg-Symbol(","page":"README","title":"pkg = Symbol(","text":"","category":"section"},{"location":"README/#replace(","page":"README","title":"replace(","text":"","category":"section"},{"location":"README/#readline(\"Project.toml\"),","page":"README","title":"readline(\"Project.toml\"),","text":"","category":"section"},{"location":"README/#\"name-\\\"\"-\"\",","page":"README","title":"\"name = \\\"\" => \"\",","text":"","category":"section"},{"location":"README/#'\"'-\"\"","page":"README","title":"'\"' => \"\"","text":"","category":"section"},{"location":"README/#)","page":"README","title":")","text":"","category":"section"},{"location":"README/#)-2","page":"README","title":")","text":"","category":"section"},{"location":"README/#esc(:(using-Pkg;-Pkg.activate(\".\");-using-Revise,-:pkg))","page":"README","title":"esc(:(using Pkg; Pkg.activate(\".\"); using Revise, pkg))","text":"","category":"section"},{"location":"README/#end","page":"README","title":"end","text":"","category":"section"},{"location":"README/###-https://discourse.julialang.org/t/what-is-in-your-startup-jl/18228/2?utp2750","page":"README","title":"## https://discourse.julialang.org/t/what-is-in-your-startup-jl/18228/2?u=tp2750","text":"","category":"section"},{"location":"README/#cdpkg(pkg)-cd(dirname(Base.find_package(string(pkg))))","page":"README","title":"cdpkg(pkg) = cd(dirname(Base.find_package(string(pkg))))","text":"","category":"section"},{"location":"README/#macro-cdpkg(pkg)","page":"README","title":"macro cdpkg(pkg)","text":"","category":"section"},{"location":"README/#cdpkg(pkg)","page":"README","title":"cdpkg(pkg)","text":"","category":"section"},{"location":"README/#return-nothing","page":"README","title":"return nothing","text":"","category":"section"},{"location":"README/#end-2","page":"README","title":"end","text":"","category":"section"},{"location":"README/","page":"README","title":"README","text":"```","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = tpNotes","category":"page"},{"location":"#tpNotes.jl","page":"Home","title":"tpNotes.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Purpose","page":"Home","title":"Purpose","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This repo tracks my notes on things I learn in Julia.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [tpNotes]","category":"page"}]
}
