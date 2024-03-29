using tpNotes
using Test


using Rfunctions

@testset "tpNotes.jl" begin
    p1 = tpNotes.People("Søren")
    p2 = tpNotes.People("Mette")
    @test p1 + p2 == "Søren and Mette"
    @test "$(p1 + p2) says 2+2 is $(2 + 2)" == "Søren and Mette says 2+2 is 4"
    @test length(p1) == 6
end

@testset "R.jl" begin
@test  Rfunctions.c(1,2,3)  == [1,2,3]
    
end
