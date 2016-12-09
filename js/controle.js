function morcegoPersegue(){
	morcego.persegue = function(pc){
			if(pc.x < this.x){
				this.vx = -50;
				this.dir = -1;
			}
			else if (pc.x > this.x){
				this.vx = +50;
				this.dir = 1;
			}
			if(pc.y>this.y && questTutorial.getCell(this.my-1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my+1,this.mx)==0){
				this.vy += 270;
			}
		};
}

function inimigosPersegue(){
	for(var i=0; i<inimigos[questTutorial.level].length; i++){
		inimigos[questTutorial.level][i].persegue = function(pc){
			if(pc.x < this.x){
				this.vx = -35;
				this.dir = -1;
			}
			else if (pc.x > this.x){
				this.vx = +35;
				this.dir = 1;
			}
			if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
				this.vy -= 220;
			}
		};
	}

	for(var i=0; i<inimigos1[questTutorial.level].length; i++){
		if(i==0){//inimigo shadow
			inimigos1[questTutorial.level][i].persegue = function(pc){
				if(pc.x < this.x){
					this.vx = -70;
					this.dir = -1;
				}
				else if (pc.x > this.x){
					this.vx = +70;
					this.dir = 1;
				}
				if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
					this.vy -= 220;
				}
			};
		} else{//inimigo strong
			inimigos1[questTutorial.level][i].persegue = function(pc){
				if(pc.x < this.x){
					this.vx = -15;
					this.dir = -1;
				}
				else if (pc.x > this.x){
					this.vx = +15;
					this.dir = 1;
				}
				if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
					this.vy -= 220;
				}
			};
		}
	}
}


addEventListener('keydown', function(e){
	switch(e.keyCode){
		case 37:
			pc.vx = -80;
			pc.dir = -1;
			e.preventDefault();
			break;
		case 38:
			if(pc.vy == 0 && questTutorial.getCell(pc.my+1,pc.mx) == 1){
				pc.vy = pc.vy -230;
			}else if(pc.vy == 0 && questTutorial.getCell(pc.my-1,pc.mx) == 1 && pc.skill == true){
				pc.vy = pc.vy +200;
			}
			e.preventDefault();
			break;
		case 39:
			pc.vx =  80;
			pc.dir = 1;
			e.preventDefault();
			break;
		case 32:
				if(machado.vang>0 || pc.skill == true) return;
				machado.vx = machado.vy = machado.ax = machado.ay = 0
				machado.x = pc.x;
				machado.y = pc.y-16;
				machado.vx = pc.dir*400;
				machado.vy = pc.vy;
				machado.vang = 560;
				soundLib.play("swing");
				e.preventDefault();
			break;
		case 40:
			if(questTutorial.getCell(Math.floor(pc.y/32),Math.floor(pc.x/32)) == 2 && questTutorial.level == FASES-1){
				questTutorial.level--;
				findDoor(2);
			}else if(questTutorial.getCell(Math.floor(pc.y/32),Math.floor(pc.x/32)) == 2){
				questTutorial.level++;
				geraMoedas();
				geraFranguinhos();
				geraInimigos();
				if(questTutorial.level == FASES-1){
					for(var a = 0; a < 90; a++){}
					findDoor(2);
				}else{
					for(var a = 0; a < 90; a++){}
					findDoor(3);
				}
			}else if(questTutorial.getCell(Math.floor(pc.y/32),Math.floor(pc.x/32)) == 3){
				questTutorial.level--;
				for(var a = 0; a < 90; a++){}
				findDoor(2);
			}
			break;
		case 17:
			if(pc.stamina > 1){
				pc.skill = true;
				pc.vy = pc.vy - 230;
			}
			e.preventDefault();
			break;
	}
});

addEventListener('keyup', function(e){
	switch(e.keyCode){
		case 37:
		case 39:
			pc.vx = 0;
			e.preventDefault();
			break;
		case 38:
			pc.ay = 0;
			e.preventDefault();
			break;
		case 17:
			pc.skill = false;
			if(pc.stamina >= 1) pc.stamina--;
			e.preventDefault();
			break;
	}
});

addEventListener('click', function(){
	pc.iniciou = true;
	//tela.style.cursor = "none";
});

function findDoor(d){
	door = d;

	for(var linhas = 16; linhas > 1; linhas--){
		for(var colunas = 44; colunas > 1; colunas--){
			if(questTutorial.getCell(linhas,colunas)==door){
				pc.y = linhas*32;
				pc.x = colunas*32;
			}
		}
	}
}

function geraMoedas(){
	for(var i = 0; i<moeda[questTutorial.level].length ; i++){
		moeda[questTutorial.level][i] = new Moeda();
		do{
			xi = 2+Math.floor(Math.random()*43);
			yi = 2+Math.floor(Math.random()*13);
		}while(questTutorial.getCell(yi,xi)!=0 || questTutorial.getCell(yi+1,xi)==0);
		moeda[questTutorial.level][i].x = (xi)*32;
		moeda[questTutorial.level][i].y = (yi+1)*32;
		moeda[questTutorial.level][i].mx = xi;
		moeda[questTutorial.level][i].my = yi;
	}
}

function geraFranguinhos(){
	for(var i = 0; i<franguinho[questTutorial.level].length ; i++){
		franguinho[questTutorial.level][i] = new Frango();
		do{
			xi = 2+Math.floor(Math.random()*43);
			yi = 2+Math.floor(Math.random()*13);
		}while(questTutorial.getCell(yi,xi)!=0 || questTutorial.getCell(yi+1,xi)==0);
		franguinho[questTutorial.level][i].x = (xi)*32;
		franguinho[questTutorial.level][i].y = (yi+1)*32;
		franguinho[questTutorial.level][i].mx = xi;
		franguinho[questTutorial.level][i].my = yi;
	}
}

function geraInimigos(){
	for(var i = 0; i<inimigos[questTutorial.level].length ; i++){
		inimigos[questTutorial.level][i] = new SpriteInMap();
		inimigos[questTutorial.level][i].imgY = 1;
		do{
			xi = 3+Math.floor(Math.random()*41);
			yi = 3+Math.floor(Math.random()*11);
		}while(questTutorial.getCell(yi,xi)!=0 || questTutorial.getCell(yi+1,xi)==0);
		inimigos[questTutorial.level][i].x = (xi)*32;
		inimigos[questTutorial.level][i].y = (yi+1)*32;
		inimigos[questTutorial.level][i].mx = xi;
		inimigos[questTutorial.level][i].my = yi;
	}

	for(var i = 0; i<inimigos1[questTutorial.level].length ; i++){
		inimigos1[questTutorial.level][i] = new SpriteInMap();
		if(i==0){
			inimigos1[questTutorial.level][i].imgY = 3;
		} else{
			inimigos1[questTutorial.level][i].imgY = 5;
		}
		do{
			xi = 3+Math.floor(Math.random()*41);
			yi = 3+Math.floor(Math.random()*11);
		}while(questTutorial.getCell(yi,xi)!=0 || questTutorial.getCell(yi+1,xi)==0);
		inimigos1[questTutorial.level][i].x = (xi)*32;
		inimigos1[questTutorial.level][i].y = (yi+1)*32;
		inimigos1[questTutorial.level][i].mx = xi;
		inimigos1[questTutorial.level][i].my = yi;
	}
}
