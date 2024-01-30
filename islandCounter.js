/**
 * Hello! This was made by Jacob Smith, primarily in the p5js web editor,
 * then ported over to an IDE to polish. This was inspired from a lesson I completed
 * on algoAcademy about recursively counting number of isolated groups in a matrix.
 * In this example, a user can draw 'islands' into an ocean or body of water, and
 * the program facilitates the graphics and counting process. A body of land
 * is considered its own island when all directly adjacent (not diagonal) pieces of
 * land are counted. For example:
 * Where 1 is land and 2 is water,
 * [0, 0, 0]
 * [1, 1, 0]
 * [0, 0, 0]
 * contains 1 island, consisting of (0,1) and (1,1). However,
 * [1, 0, 0]
 * [0, 1, 0]
 * [0, 0, 1]
 * contains 3 islands, being (0,0), (1,1), and (2,2)
 */

//====Settings====\\

//Size of canvas in pixels
canvasSize = 400
//Number of cells along one edge of square matrix
const numCells = 20;

//matrices of data
const cells = [];
const visited = [];
const colors = ['lightblue', 'yellow'];

const visitDirections = [[-1,0], [1,0],[0,-1],[0,1]];

//For click-dragging info (1 = land, 0 = water)
let dragMode = 1;

//Setup canvas to size and init all cells to water
function setup() {
  createCanvas(canvasSize, canvasSize * 1.2);
  for(let i = 0; i < numCells; i++){
    cells[i] = [];
    visited[i] = [];
    for(let j = 0; j < numCells; j++){
      cells[i][j] = 0;
      visited[i][j] = 0;
    }
  }
}

//Almight draw function
function draw() {
  background(220);
  drawCells();
  drawText();
}

//Returns number of islands in the matrix using a recursive Depth First Search
function countIslands(){
  //Reset visited
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      visited[i][j] = 0;
    }
  }
  //Depth first search to iteratively check
  let count = 0;
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      if(visited[i][j] == 0 && cells[i][j] == 1){
        count++;
        dfs(i, j); 
      }
    }
  }
  return count;
}

//Recursive depth first search checking non-visited cells
function dfs(i, j){
  //Check all directions
  for(let k = 0; k < 4; k++){
    let pair = visitDirections[k];
    if(isValidCell(pair[0] + i, pair[1] + j)){
      visited[pair[0] + i][pair[1] + j] = 1;
      dfs(pair[0] + i, pair[1] + j);
    }
  }
}

//Checks if a cell is valid for searching
//Must be inside the grid, be land, and be unvisited.
function isValidCell(i,j){
  return (i >= 0 && i < numCells && j >= 0 && j < numCells && cells[i][j] == 1 && visited[i][j] == 0);
}

//Draws each cell based on its cells[][] value.
function drawCells(){
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      fill(colors[cells[i][j]]);
      rect( (canvasSize / numCells) * i, (canvasSize / numCells) * j, (canvasSize / numCells), (canvasSize / numCells));
    }
  }
}

//Writes the number of islands counted at the bottom.
function drawText(){
  fill('black')
  textSize(canvasSize / 20)
  text("Number of islands: " + countIslands(), 0, canvasSize*1.1)
}

//For drawing new islands, toggles a cells value using xor.
function mousePressed(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    let row = floor(mouseX / (canvasSize / numCells));
    let col = floor(mouseY / (canvasSize / numCells));
    cells[row][col] ^= 1;
    dragMode = cells[row][col];
  }
}

//While mouse is being dragged, sets all touched cells to whatever its first action was
//e.x. clicking on water to turn it into land and dragging the cursor will turn
//All hovered-over water cells into land.
function mouseDragged(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    let row = floor(mouseX / (canvasSize / numCells));
    let col = floor(mouseY / (canvasSize / numCells));
    cells[row][col] = dragMode;
  }
}