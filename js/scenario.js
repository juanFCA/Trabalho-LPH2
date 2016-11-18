function Map(){
  var largura = 45;
  var altura = 17;
  this.grid = [];
  for (var i = 0; i < altura; i++) {
    this.grid[i] = [];
    for (var j = 0; j < largura; j++) {
      if(i==0 || j==0 || i==8 || j==11 || i==16 || j==22 || j==33 || j==44){  
        this.grid[i][j] = 1;
      }
      else{
        this.grid[i][j] = 0;
      }
    }
  }
}
Map.prototype.setGrid = function(grid){
  this.grid = grid;
}
function Scenario(){
  this.level = 1;
  this.maps = [ new Map()];
}
Scenario.prototype.setMap = function(level,map){
  this.maps[level] = map;
}
Scenario.prototype.getMap = function(level){
  return this.maps[level];
}
Scenario.prototype.getCell = function(x, y){
  return this.maps[this.level].grid[x][y];
}
Scenario.prototype.getRows = function(){
  return this.maps[this.level].grid.length;
}
Scenario.prototype.getCols = function(){
  return this.maps[this.level].grid[0].length;
}

var SIZE = 4;
var tutorial = [];
for (var i=0; i<SIZE; i++) {  
  tutorial[i] = new Map();  
  tutorial[i].maps = tutorial[i];
  tutorial[i].level = i;
}  

var questTutorial = new Scenario();
for (var i=0; i<SIZE; i++) {  
  questTutorial.setMap(i, tutorial[i]);
}

// largura = SIZE(7)*NumCol(4)+NumCol+1(5)
//  altura = SIZE(7)*NumLin(2)+NumLin+1(3)