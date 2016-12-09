function Frango(){
  SpriteInMap.call(this);
  this.imgY = 2;
  this.imgX = 3;
}
Frango.prototype = new SpriteInMap();
Frango.prototype.constructor = Frango;

Frango.prototype.desenha = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(1,1);
  ctx.drawImage(imgPc,
    this.imgX*32,
    this.imgY*32,32,32,
    -16,-32,32,32);
    if(this.debug){
      this.desenhaDebug(ctx);
    }

  ctx.restore();
}