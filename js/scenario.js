var count = 0;

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
  Map.prototype.setGrid(this.grid);
}


Map.prototype.setGrid = function(grid){
  this.grid = grid;

  var seed = 0;
  var portas = [];
  var i = 0;

  for(var lin= 8; lin < 16; lin+=8){
    for(var col = 0; col < 44; col+=11){
      if(col > 0){
        seed = [1+Math.floor(Math.random()*7)];
        this.grid[seed][col] = 0;
        portas[i] = 1*seed+(col/100);
        i++;
        seed = [9+Math.floor(Math.random()*7)];
        this.grid[seed][col] = 0;
        portas[i] = 1*seed+(col/100);
        i++;
      }
        seed = [1+col+Math.floor(Math.random()*10)];
        this.grid[8][seed] = 0;
        portas[i] = 8+(seed/100);
        i++;
    }
  }

  porta0Col = Math.floor((portas[0] - 8) * 100);
  porta0Lin = 8;

  porta1Lin = Math.floor(portas[1]);
  porta1Col = 11;

  porta2Lin = Math.floor(portas[2]);
  porta2Col = 11;

  porta3Lin = 8;
  porta3Col = Math.floor((portas[3] - 8) * 100);

  porta4Lin = Math.floor(portas[4]);
  porta4Col = 22;

  porta5Lin = Math.floor(portas[5]);
  porta5Col = 22;

  porta6Lin = 8;
  porta6Col = Math.floor((portas[6] - 8) * 100);

  porta7Lin = Math.floor(portas[7]);
  porta7Col = 33;

  porta8Lin = Math.floor(portas[8]);
  porta8Col = 33;

  porta9Lin = 8;
  porta9Col = Math.floor((portas[9] - 8) * 100);

      //CONSTRÓI O CENÁRIO ATRAVÉS DAS PORTAS

  for(var lin = 1; lin < 16; lin++){
    for(var col = 1; col < 44; col++){

      //PARTE DE CIMA

      if(lin < 8 && col < 11){

        if(lin != porta1Lin && lin != porta1Lin + 1 && lin != porta1Lin - 1 &&
        col != porta0Col && col != porta0Col+ 1 && col != porta0Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin < 8 && col < 22 && col > 11 && col != 22 && col != 33){

        if(lin != porta1Lin && lin != porta1Lin + 1 && lin != porta1Lin - 1 &&
        lin != porta4Lin && lin != porta4Lin + 1 && lin != porta4Lin - 1 &&
        col != porta3Col && col != porta3Col+ 1 && col != porta3Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin < 8 && col < 33 && col > 22 && col != 22 && col != 33){

        if(lin != porta4Lin && lin != porta4Lin + 1 && lin != porta4Lin - 1 &&
        lin != porta7Lin && lin != porta7Lin + 1 && lin != porta7Lin - 1 &&
        col != porta6Col && col != porta6Col+ 1 && col != porta6Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin < 8 && col < 44 && col > 33 && col != 22 && col != 33){

        if(lin != porta7Lin && lin != porta7Lin + 1 && lin != porta7Lin - 1 &&
        col != porta9Col && col != porta9Col+ 1 && col != porta9Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      //PARTE DE BAIXO

      if(lin > 8 && col < 11){

        if(lin != porta2Lin && lin != porta2Lin + 1 && lin != porta2Lin - 1 &&
        col != porta0Col && col != porta0Col+ 1 && col != porta0Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin > 8 && col > 11 && col < 22 && col != 11 && col != 22 && col != 33){

        if(lin != porta2Lin && lin != porta2Lin + 1 && lin != porta2Lin - 1 &&
        lin != porta5Lin && lin != porta5Lin + 1 && lin != porta5Lin - 1 &&
        col != porta3Col && col != porta3Col+ 1 && col != porta3Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin > 8 && col > 22 && col < 33 && col != 11 && col != 22 && col != 33){

        if(lin != porta5Lin && lin != porta5Lin + 1 && lin != porta5Lin - 1 &&
        lin != porta8Lin && lin != porta8Lin + 1 && lin != porta8Lin - 1 &&
        col != porta6Col && col != porta6Col+ 1 && col != porta6Col- 1){
          this.grid[lin][col] = 1;
        }
      }

      if(lin > 8 && col > 33 && col < 44 && col != 11 && col != 22 && col != 33){

        if(lin != porta8Lin && lin != porta8Lin + 1 && lin != porta8Lin - 1 &&
        col != porta9Col && col != porta9Col+ 1 && col != porta9Col- 1){
          this.grid[lin][col] = 1;
        }
      }

    }
  }

    //ACABAMENTO

  for(var lin= 1; lin < 16; lin++){
    for(var col = 1; col < 44; col++){
      if(lin > 0 && lin < 6 && col > 0 && col < 4){
        this.grid[lin][col] = 0;
      }

      if(this.grid[lin][col] == 1 && this.grid[lin-1][col-1] == 0 && this.grid[lin-1][col] == 0 &&
        this.grid[lin-1][col+1] == 0 && this.grid[lin][col+1] == 1 && this.grid[lin+1][col+1] == 1 &&
        this.grid[lin+1][col] == 1 && this.grid[lin+1][col-1] == 0 && this.grid[lin][col-1] == 0){
          this.grid[lin][col] = 0;
        }

      if(this.grid[lin][col] == 1 && this.grid[lin-1][col-1] == 0 && this.grid[lin-1][col] == 0 &&
        this.grid[lin-1][col+1] == 0 && this.grid[lin][col+1] == 0 && this.grid[lin+1][col+1] == 0 &&
        this.grid[lin+1][col] == 1 && this.grid[lin+1][col-1] == 1 && this.grid[lin][col-1] == 1){
          this.grid[lin][col] = 0;
        }

      if(lin == 15 && col == 1 || lin == 7 && col == 1){

        if(this.grid[lin-1][col] != 1 && this.grid[lin+1][col] != 0){
          this.grid[lin][col] = Math.floor(Math.random()*2);
        }
      }

    }
  }

if(count == 0 || count == 4){
  var NUM_PORTAIS = 2;
}else{
  var NUM_PORTAIS = 3;
}

  for(var i = 2; i <= NUM_PORTAIS; i++){
    var l = 0;
    var c = 0;

    while(this.grid[l][c] != 0 || this.grid[l+1][c] != 1){
      l = 1 + Math.floor(Math.random()*15);
      c = 12 + Math.floor(Math.random()*43);
    }

    this.grid[l][c] = i;
  }
}

function Scenario(){
  this.level = 0;
  this.maps = [new Map()];
}

Scenario.prototype.setMap = function(level,map){
  this.maps[level] = map;
  count++;
}

Scenario.prototype.getMap = function(level){
  return this.maps[level];
}

Scenario.prototype.getCell = function(y, x){
  if(x<0||y<0||this.maps[this.level].grid.length<y||this.maps[this.level].grid[0].length<x)
    return -1;
  return this.maps[this.level].grid[y][x];
}

Scenario.prototype.getRows = function(){
  return this.maps[this.level].grid.length;
}

Scenario.prototype.getCols = function(){
  return this.maps[this.level].grid[0].length;
}

var questTutorial = new Scenario();
var SIZE = 5;
var tutorial = [];

for (var i=0; i<=SIZE; i++) {
  tutorial[i] = new Map();
  questTutorial.setMap(i, tutorial[i]);
}
