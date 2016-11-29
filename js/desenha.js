function desenha(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,tela.width,tela.height);
	ctx.save();
	ctx.scale(zoom,zoom);
	ctx.translate(-pc.x+tela.width/4,-pc.y+tela.height/4);
	for(var i=0; i<NUM_ENEMIES; i++){
		if(pc.imune<=0 && pc.vida>0 && inimigos[i].colidiuCom(pc)){
			pc.vy = 0;
			pc.imune = 3;
			pc.vida--;
			pc.vx = inimigos[i].vx;
			pc.vy = -150;
			soundLib.play("pcmorre");
		}
		if(machado.vang>0 && inimigos[i].colidiuCom(machado)){
			machado.x = -240;
			machado.y = -240;
			machado.vang = 0;
			inimigos[i].x = 20*32-Math.random()*32;
			inimigos[i].y = 32;
			inimigos[i].vy = 0;
			soundLib.play("monstromorre");
		}
	}
	
	for(var i=0; i<moeda[questTutorial.level].length; i++){
		if(moeda[questTutorial.level][i].colidiuCom(pc)){
			moeda[questTutorial.level].splice(i,1);
			pc.moedas++;
			soundLib.play("pegamoeda");
		}
	}

	for(var i=0; i<franguinho[questTutorial.level].length; i++){
		if(franguinho[questTutorial.level][i].colidiuCom(pc)){
			franguinho[questTutorial.level].splice(i,1);
			pc.stamina+=2;
			soundLib.play("pegamoeda");
		}
	}

	if(morcego.colidiuCom(pc) && pc.stamina > 1){
			pc.stamina = pc.stamina - 0.1;		
	}
	
	if(pc.stamina < 5){
		pc.stamina = pc.stamina + 0.0001;
	}	

	if(machado.vang>0 && morcego.colidiuCom(machado)){
		machado.x = -240;
		machado.y = -240;
		machado.vang = 0;
		morcego.x = 20*32-Math.random()*32;
		morcego.y = 32;
		morcego.vy = 0;
		soundLib.play("monstromorre");
	}

	pc.move(dt);
	morcego.move(dt);
	morcegoPersegue();
	morcego.persegue(pc);

	if(machado.vang>0){
		machado.moveSeVisivel(dt);
	}else if(pc.vx>=0){
		machado.x = pc.x-9;
		machado.y = pc.y-19;
		machado.angulo = -30;
	}else{
		machado.x = pc.x+9;
		machado.y = pc.y-19;
		machado.angulo = -30;
	}

	pc.imune -= dt;

	for(var i=0; i<NUM_ENEMIES; i++){
		if(pc.vida == 0 || pc.moedas == FASES*24){
			inimigos[i].move(-dt);
		}
		else{			
			inimigos[i].move(dt);
			inimigos[i].persegue(pc);
		}
	}
	desenhaMapa();
	machado.desenha(ctx);
	morcego.desenha(ctx);

	for(var i=0 ; i < moeda[questTutorial.level].length ; i++){
		moeda[questTutorial.level][i].move(dt);
		moeda[questTutorial.level][i].desenha(ctx);
	}

	for(var i=0 ; i < franguinho[questTutorial.level].length ; i++){
		franguinho[questTutorial.level][i].move(dt);
		franguinho[questTutorial.level][i].desenha(ctx);
	}

	if(pc.imune>0){
		ctx.globalAlpha = 0.2+0.6*Math.sin(8*pc.iddle*Math.PI);
	}else{
		ctx.globalAlpha = 1.0;
	}
	pc.desenha(ctx);
	ctx.globalAlpha=1.0;
	for(var i=0; i<NUM_ENEMIES; i++){
		inimigos[i].desenha(ctx);
	}
	ctx.restore();

	desenhaStatus();

	if(pc.vida == 0 || pc.moedas == FASES*24 || pc.iniciou == false){
		pc.move(-dt);
		machado.moveSeVisivel(-dt);
		statusJogo();
	}

}

function desenhaMapa(){
	var linhas = questTutorial.getRows();
	var colunas =  questTutorial.getCols();
	for (var l = 0; l < linhas; l++) {
		for (var c = 0; c < colunas; c++) {
			if(questTutorial.getCell(l,c)==0){
				ctx.drawImage(imgWall[questTutorial.level],c*32,l*32);
			}else if(questTutorial.getCell(l,c)==1){
				ctx.drawImage(imgBlock[questTutorial.level],c*32,l*32);
			}else if(questTutorial.getCell(l,c)>1){
				ctx.drawImage(imgDoor,c*32,l*32);
			}
		}
	}
}

function desenhaStatus(){
	for(var i = 0; i < pc.vida; i++){
		ctx.drawImage(imgVida, 10+15*i, 15, 32, 32);
	}
  	ctx.drawImage(imgPc, 1*32, 2*32, 32, 32, 560, 0, 52,52);
  	ctx.font = "24px serif";
	ctx.textBaseline = "hanging";
	ctx.fillStyle = "#FFD700";
  	ctx.fillText(" X "+pc.moedas,600,22);

	ctx.font = "18px serif";
	ctx.fillText("STAMINA:",200,22);
	if(pc.stamina > 2){
		ctx.fillStyle = "#FFD700";
	}else{
		ctx.fillStyle = "#F00";
	}
	ctx.fillRect(300,20,32*pc.stamina,16);
}

function statusJogo(){
	if (pc.iniciou == false){
		ctx.drawImage(imgStart, 0, 0, 680, 320);
	}
	if (pc.vida == 0) {
		ctx.drawImage(imgOver, 0, 0, 680, 320);
		ctx.drawImage(imgPc, 1*32, 2*32, 32, 32, 280, 230, 52,52);
  		ctx.font = "24px serif";
		ctx.textBaseline = "hanging";
		ctx.fillStyle = "#000000";
  		ctx.fillText(" = "+pc.moedas,320,250);
	}
	if (pc.moedas == FASES*24) {
		ctx.drawImage(imgWin, 0, 0, 680, 320);
		ctx.drawImage(imgPc, 1*32, 2*32, 32, 32, 280, 230, 52,52);
  		ctx.font = "24px serif";
		ctx.textBaseline = "hanging";
		ctx.fillStyle = "#000000";
  		ctx.fillText(" = "+pc.moedas,320,250);
	}

}
