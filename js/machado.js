function Machado(){
  this.angulo = 0;
  this.imgY = 2;
  this.vang = 0;
}

Machado.prototype = new SpriteInMap();
Machado.prototype.constructor = Machado;

Machado.prototype.desenha = function(ctx){
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate(this.angulo/180*Math.PI);
  ctx.scale(1,1);
  ctx.drawImage(imgPc,this.imgX,this.imgY*32,32,32,
    -16,-16,32,32);
  ctx.restore();
  this.angulo += this.vang*dt;
}
Machado.prototype.moveSeVisivel = function(dt){
  if(this.x<0 || this.y < 0 || this.x>tela.width || this.y> tela.height){
    this.vang = 0;
    return;
  }
  this.move(dt);
  if(this.vx == 0){
    this.x = -1000;
    this.vang = 0;
  }
}
