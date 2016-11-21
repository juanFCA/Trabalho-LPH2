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