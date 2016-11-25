function inimigospersegue(){
	for(var i=0; i<NUM_ENEMIES; i++){
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
	}

	for(var i=0; i<NUM_ENEMIES1; i++){
    inimigos1[i] = new SpriteInMap();
    inimigos1[i].imgY = 3;
    inimigos1[i].x = 10;
    inimigos1[i].persegue = function(pc){
      if(pc.x < this.x){
        this.vx = -35;
      }
      else if (pc.x > this.x){
        this.vx = +35;
      }
      else if(pc.y<this.y && questTutorial.getCell(this.my+1,this.mx)==1 && this.vy == 0 && questTutorial.getCell(this.my-1,this.mx)==0){
        this.vy -= 220;
      }

    };
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
			}else if(pc.vy == 0 && questTutorial.getCell(pc.my-1,pc.mx) == 1 && pc.skill == true){
				pc.vy = pc.vy +330;
			}
			e.preventDefault();
			break;
		case 39:
			pc.vx =  80;
			e.preventDefault();
			break;
		case 32:
				if(machado.vang>0 || pc.skill == true) return;
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
			break;
		case 17:
			if(pc.stamina > 1){
				pc.skill = true;
				pc.stamina --;
			}
			e.preventDefault();
			break;
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
		case 17:
			pc.skill = false;
			e.preventDefault();
			break;
	}
});

addEventListener('click', function(){
	pc.iniciou = true;
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

function geraMoedas(){
	for(var i = 0; i<moeda.length ; i++){
		moeda[i] = new Moeda();
		do{
			xis[i] = 1+Math.floor(Math.random()*43);
			yps[i] = 1+Math.floor(Math.random()*15);
			moeda[i].x = xis[i]*32-16;
			moeda[i].y = yps[i]*32;
		}while(questTutorial.getCell(yps[i],xis[i])==1);
		moeda[i].posiciona();	
	}
}