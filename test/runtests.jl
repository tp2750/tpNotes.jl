using tpNotes
using Test

@testset "tpNotes.jl" begin
    p1 = tpNotes.People("Søren")
    p2 = tpNotes.People("Mette")
    @test p1 + p2 == "Søren and Mette"
end
