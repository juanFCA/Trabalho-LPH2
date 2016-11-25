function Morcego(){
	this.imgY = 4;
}

Morcego.prototype = new SpriteInMap();
Morcego.prototype.constructor = Morcego;

Morcego.prototype.desenha = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(1,1);
  ctx.drawImage(imgPc,
    (this.imgX+Math.floor(this.iddle))*32,
    this.imgY*32,32,32,
    -16,-32,32,32);
  ctx.restore();
}

Morcego.prototype.move = function(dt){
    this.iddle+=dt;
    if(this.iddle>=2){
      this.iddle = 0;
    }
    this.vx = this.vx + this.ax*dt;
    this.vy = this.vy + this.ay*dt*2 + (-1)*g*dt/2;

    if(questTutorial.getCell(this.my,this.mx+1)==1 && this.vx>0){
      this.vx = Math.min(this.vx, ((this.mx+1)*32-1-this.x)/dt);
    }
    if(questTutorial.getCell(this.my,this.mx-1)==1 && this.vx<0){
      this.vx = -Math.min(Math.abs(this.vx), Math.abs((this.mx)*32+1-this.x)/dt);
    }
    this.x = (this.x + this.vx*dt);
    this.mx = Math.floor(this.x/32);
    if(questTutorial.getCell(this.my-1,this.mx)==1 && this.vy<0){
      this.vy = -Math.min(Math.abs(this.vy), (this.y-20-(this.my)*32)/dt);
    }
    if(questTutorial.getCell(this.my+1,this.mx)==1){
      this.vy = Math.min(this.vy, ((this.my+1)*32-this.y-1)/dt);
    }

    this.y = Math.round(this.y + this.vy*dt);
    this.my = Math.floor(this.y/32);
  };