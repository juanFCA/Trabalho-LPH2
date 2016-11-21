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

	for(var i=0; i<NUM_ENEMIES1; i++){
		if(pc.imune<=0 && pc.vida>0 && inimigos1[i].colidiuCom(pc)){
			pc.vy = 0;
			pc.imune = 3;
			pc.vida -= 2;
			pc.vx = inimigos1[i].vx;
			pc.vy = -150;
			soundLib.play("pcmorre");
		}
		if(machado.vang>0 && inimigos1[i].colidiuCom(machado)){
			machado.x = -240;
			machado.y = -240;
			machado.vang = 0;
			inimigos1[i].x = Math.random()*32;
			soundLib.play("monstromorre");
		}
	}

	if(pc.vida==0){
		alert("Fim do Jogo - Total de Moedas : "+pc.moedas);
		return;
	}

	if(pc.moedas==FASES*24){
		alert("Venceu o Jogo - Total de Moedas : "+pc.moedas);
		return;
	}

	if(moeda.colidiuCom(pc)){
		pc.moedas++;
		soundLib.play("pegamoeda");
		moeda.x = 16+32*(1+Math.floor(Math.random()*18));
		moeda.y = 64;
	}

	pc.move(dt);
	moeda.move(dt);

	if(machado.vang>0){
		machado.moveSeVisivel(dt);
	}else{
		machado.x = pc.x-8;
		machado.y = pc.y-16;
		machado.angulo = -30;
	}

	pc.imune -= dt;

	for(var i=0; i<NUM_ENEMIES; i++){
		inimigos[i].move(dt);
		inimigos[i].persegue(pc);
	}

	for(var i=0; i<NUM_ENEMIES1; i++){
		inimigos1[i].move(dt);
		inimigos1[i].persegue(pc);
	}
	desenhaMapa();
	machado.desenha(ctx);
	moeda.desenha(ctx);
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
	for(var i=0; i<NUM_ENEMIES1; i++){
		inimigos1[i].desenha(ctx);
	}
	ctx.restore();
}

function desenhaMapa(){
	var linhas = questTutorial.getRows();
	var colunas =  questTutorial.getCols();
	for (var l = 0; l < linhas; l++) {
		for (var c = 0; c < colunas; c++) {
			if(questTutorial.getCell(l,c)==0){
				ctx.drawImage(imgWall[questTutorial.level],c*32,l*32);
			} else {
				ctx.drawImage(imgBlock[questTutorial.level],c*32,l*32);
			}
		}
	}
}