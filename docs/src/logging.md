# Logging

https://github.com/JuliaLogging

* Default logging macros:
  - `@debug`
  - `@info` messages are displayed by default.
  - `@warn`
  - `@error`
* `disable_logging()` is documented to set log level, but I can not get it to work
* Enable debug: `ENV["JULIA_DEBUG"]="all"`
* Disable debug: `ENV["JULIA_DEBUG"]=""`
* Standard log-levels are called 
  - `Logging.Debug == Logging.LogLevel(-1000)`
  - `Logging.Info == Logging.LogLevel(0)`
  - `Logging.Warn == Logging.LogLevel(1000)`
  - `Logging.Error == Logging.LogLevel(2000)`
* `maxlog` magic keyword kan be used to limit the number of times a message is logged.
* A backtrace can be using the other magic keyword `exception=(ex, bt)`

## Example

``` julia
for i = 1:10
	@info "Count = $i" maxlog=2
	@debug "Progress = $i of 10"
end
[ Info: Count = 1
[ Info: Count = 2
```

``` julia
julia> disable_logging(Logging.LogLevel(-1000))
LogLevel(-999)

julia> disable_logging(Logging.LogLevel(-1001))
Debug

julia> for i = 1:10
               @info "Count = $i" maxlog=2
               @debug "Progress = $i of 10"
       end
[ Info: Count = 1
[ Info: Count = 2
```

``` julia
julia> ENV["JULIA_DEBUG"]="all"
"all"

julia> for i = 1:10
               @info "Count = $i" maxlog=2
               @debug "Progress = $i of 10"
       end
[ Info: Count = 1
┌ Debug: Progress = 1 of 10
└ @ Main REPL[15]:3
[ Info: Count = 2
┌ Debug: Progress = 2 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 3 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 4 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 5 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 6 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 7 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 8 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 9 of 10
└ @ Main REPL[15]:3
┌ Debug: Progress = 10 of 10
└ @ Main REPL[15]:3

julia> ENV["JULIA_DEBUG"]=""
""

julia> for i = 1:10
               @info "Count = $i" maxlog=2
               @debug "Progress = $i of 10"
       end
[ Info: Count = 1
[ Info: Count = 2
```

