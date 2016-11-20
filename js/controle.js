function inimigospersegue(){
	for(var i=0; i<NUM_ENEMIES; i++){
		inimigos[i] = new SpriteInMap();
		inimigos[i].imgY = 1;
		inimigos[i].x = 15*32-Math.random()*32+32*i;
		inimigos[i].persegue = function(pc){
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
function controle(){
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
				pc.vx =  80;
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
}