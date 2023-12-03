# Running System Commands

Julia does not send system commands to a shell as [described in the manual](https://docs.julialang.org/en/v1/manual/running-external-programs/)

This has a number of concequences:

* File-names etc do not need to be escaped if parsed as an interpolated variable
* Commandline options are not split on space if parsed as an interpolated variable
* Piping and redirection using shell constructs like "|" and ">" do not work.
* stdin and stderr are not collected by default.

## Basic usage

Simply running a command is a combination of backticks and run():

``` julia
o1 = run(`ls -lrt .`)
```

however, the output of the command is not collected:

``` julia
julia> o1
Process(`ls -lrt .`, ProcessExited(0))

```

## Redirecting stdout and stderr

To redirect stdin and stdout to files, a pipeline is needed:

``` julia
run(pipeline(`ls -lrth .`, stdout = "/tmp/o1", stderr="/tmp/e1"))
```

## Interpolations of commandline options

Passing multiple options in a string does not work:

``` julia
julia> o1 = "-l -r"
"-l -r"

julia> run(`ls $o1 .`)
ERROR: failed process: Process(`ls '-l -r' .`, ProcessExited(2)) [2]

```

The individual options need to be given as a vector

``` julia
o2 = split("-l -r")
run(`ls $o2 .`)
```

## Piping

The equivalent of a shell pipeline is the command `pipeline()`:

``` julia
run(pipeline(`ls $o2`, `sort -g`))
```

As noted above, the pipeline command (not run) takes keyword arguments `stdin` and `stdout` to re-direct the output.

``` julia
run(pipeline(pipeline(`ls $o2`, `sort -g`), stdout = "/tmp/o1"))
```
