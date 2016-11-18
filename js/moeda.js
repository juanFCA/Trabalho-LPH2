function Moeda(){
  this.imgY = 2;
  this.imgX = 1;
  this.x = 16+32*(1+Math.floor(Math.random()*18));
  this.y = 64;
}
Moeda.prototype = new SpriteInMap();
Moeda.prototype.constructor = Moeda;

Moeda.prototype.desenha = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(1,1);
  ctx.drawImage(imgPc,
    (this.imgX+Math.floor(this.iddle))*32,
    this.imgY*32,32,32,
    -16,-32,32,32);
  ctx.restore();
}
