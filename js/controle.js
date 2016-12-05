function inimigospersegue(){
	for(var i=0; i<NUM_ENEMIES; i++){
		if(i<5){//inimigo simples
			inimigos[i] = new SpriteInMap();
			inimigos[i].imgY = 1;
			inimigos[i].x = 15*32-Math.random()*32+32*i;
			inimigos[i].posiciona();
			inimigos[i].persegue = function(pc){
				if(pc.x < this.x){
					this.vx = -35;
				}
				else if (pc.x > this.x){
					this.vx = +35;
				}
				if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
					this.vy -= 220;
				}
			};
		}else if(i===5){//inimigo shadow
			inimigos[i] = new SpriteInMap();
			inimigos[i].imgY = 3;
			inimigos[i].x = 15*32-Math.random()*32+32*i;
			inimigos[i].posiciona();
			inimigos[i].persegue = function(pc){
				if(pc.x < this.x){
					this.vx = -70;
				}
				else if (pc.x > this.x){
					this.vx = +70;
				}
				if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
					this.vy -= 220;
				}
			};
		}else{//inimigo strong
			inimigos[i] = new SpriteInMap();
			inimigos[i].imgY = 4;
			inimigos[i].x = 15*32-Math.random()*32+32*i;
			inimigos[i].posiciona();
			inimigos[i].persegue = function(pc){
				if(pc.x < this.x){
					this.vx = -15;
				}
				else if (pc.x > this.x){
					this.vx = +15;
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
			e.preventDefault();
			break;
		case 38:
			if(pc.vy == 0 && questTutorial.getCell(pc.my+1,pc.mx) == 1){
				pc.vy = pc.vy -230;
			}
			e.preventDefault();
			break;
		case 39:
			pc.vx = 80;
			e.preventDefault();
			break;
		case 32:
				if(machado.vang>0) return;
				machado.vx = machado.vy = machado.ax = machado.ay = 0
				machado.x = pc.x;
				machado.y = pc.y-16;
				machado.vx = (pc.vx>=0)?400:-400;
				machado.vy = 0;
				machado.vang = 560;
				soundLib.play("swing");
				e.preventDefault();
			break;
		case 40:
			if(questTutorial.getCell(Math.floor(pc.y/32),Math.floor(pc.x/32)) == 2 && questTutorial.level == 3){
				questTutorial.level--;
				for(var a = 0; a < 90; a++){}
				findDoor(2);
			}else if(questTutorial.getCell(Math.floor(pc.y/32),Math.floor(pc.x/32)) == 2){
				questTutorial.level++;
				if(questTutorial.level == 3){
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
	}
});

addEventListener('click', function(){
	pc.iniciou = true;
	tela.style.cursor = "none";
});

function findDoor(d){
	door = d;

	for(var linhas = 1; linhas < 16; linhas++){
		for(var colunas = 1; colunas < 44; colunas++){
			if(questTutorial.getCell(linhas,colunas)==door){
				pc.y = linhas*32;
				pc.x = colunas*32;
			}
		}
	}

}



