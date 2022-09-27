# Working with vectors etc

# Element membership

## Is All of `r` in `x`?

`all()` can take function as first element:
Ref: https://bkamins.github.io/julialang/2022/04/01/fast.html

```@example
f(x, r) = all(in(x), r) # function testing lookup speed

f([1,2,3,4], [1,2,3]) ## true

f([1,2,3], [1,2,3,4]) ## false
```

Simpler:

```@example
all([1,2,3] .∈  Ref([1,2,3,4])) ## true

all([1,2,3,4 ] .∈  Ref([1,2,3])) ## false

all(in.([1,2,3], Ref([1,2,3,4]))) ## true

```

For some reason `all([1,2,3] .in  Ref([1,2,3,4]))` fails.

From docs (currying .∈):

```@example
all([1,2,3] .∈([1,2,3,4],)) ## true
all([1,2,3,4] .∈([1,2,3,],)) ## false
```

Using `in` looks a bit different:


```@example
all(in([1,2,3,4]).([1,2,3])) ## true
all(in([1,2,3]).([1,2,3,4])) ## false
```
