## scatter
x = 1:10
y = x.^2
z = sqrt.(x)
scatter([x x],[y z], label=["square" "root"])
## add to staccter
x2 = (1:10) - .5
z2 = (x2)
scatter!(x2,z2, label="line")
