# IslandCounterJs
A javascript island counter that takes advantage of a recursive depth first search.
Hello! This was made by Jacob Smith, primarily in the p5js web editor,
then ported over to an IDE to polish. This was inspired from a lesson I completed
on algoAcademy about recursively counting number of isolated groups in a matrix.
In this example, a user can draw 'islands' into an ocean or body of water, and
the program facilitates the graphics and counting process.

## What is an island?
A body of land
is considered its own island when all directly adjacent (not diagonal) pieces of
land are counted. For example:
Where 1 is land and 2 is water,

[0, 0, 0]\
[1, 1, 0]\
[0, 0, 0]

contains 1 island, consisting of (0,1) and (1,1). However,

[1, 0, 0]\
[0, 1, 0]\
[0, 0, 1]

contains 3 islands, being (0,0), (1,1), and (2,2)

## Examples
![image](https://github.com/loftzo/IslandCounterJs/assets/58479250/3736f07c-967f-4ec3-ad94-7cbf17ebf077)
![image](https://github.com/loftzo/IslandCounterJs/assets/58479250/10522bd7-6f02-442b-886e-d8ed7605aef1)

