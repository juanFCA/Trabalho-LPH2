function SpriteInMap(){
  this.x = 32*3;
  this.y = 32*2;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.mx = 3;
  this.my = 2;
  this.imgX = 0;
  this.imgY = 0;
  this.iddle = 0;
}
SpriteInMap.prototype.desenha = function(ctx){
    if(this.vx>=0){

      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.scale(1,1);
      ctx.drawImage(imgPc,
        (this.imgX+Math.floor(this.iddle))*32,
        this.imgY*32,32,32,
        -16,-32,32,32);
      ctx.restore();
    }else{
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.scale(-1,1);
      ctx.drawImage(imgPc,
        (this.imgX+Math.floor(this.iddle))*32,
        this.imgY*32,32,32,
        -16,-32,32,32);
      ctx.restore();
    }
    if(this.debug){
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(this.x-5,this.y-5);
      ctx.lineTo(this.x+5,this.y+5);
      ctx.lineTo(this.x+5,this.y-5);
      ctx.lineTo(this.x-5,this.y+5);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(this.mx*32, this.my*32,32,32);
    }
    if(this.vy!=0){
      this.imgX = 2;
    }else{
      this.imgX = 0;
    }
  };

SpriteInMap.prototype.move = function(dt){
    this.iddle+=dt;
    if(this.iddle>=2){
      this.iddle = 0;
    }
    this.vx = this.vx + this.ax*dt;
    this.vy = this.vy + this.ay*dt + g*dt;

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

SpriteInMap.prototype.colidiuCom = function(outro){
  if(this.x+16/2 < outro.x-16/2){
    return false;
  } else if(this.x-16/2 > outro.x+16/2){
    return false;
  }else if(this.y+16/2 < outro.y-16/2){
    return false;
  } else if(this.y-16/2 > outro.y+16/2){
    return false;
  } else{
    return true;
  }

}
