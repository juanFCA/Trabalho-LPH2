function Moeda(){
  SpriteInMap.call(this);
  this.imgY = 2;
  this.imgX = 1;
  this.x = 64;
  this.y = 64;
}
Moeda.prototype = new SpriteInMap();
Moeda.prototype.constructor = Moeda;

Moeda.prototype.desenha = function(ctx){
    this.iddle+=14*dt;
    if(this.iddle>=2){
      this.iddle = 0;
    }
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(1,1);
  ctx.drawImage(imgPc,
    (this.imgX+Math.floor(this.iddle))*32,
    this.imgY*32,32,32,
    -16,-32,32,32);
    if(this.debug){
      this.desenhaDebug(ctx);
    }

  ctx.restore();
}
