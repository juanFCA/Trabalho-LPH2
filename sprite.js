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
  this.life = 0;
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
    this.vx += this.ax*dt;
    this.vy += this.ay*dt + g*dt;

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
  //special enemie 
  for(var i=0; i<NUM_ENEMIES1; i++){
    inimigos1[i] = new SpriteInMap();
    inimigos1[i].imgY = 3;
    inimigos1[i].x = 10;
    inimigos1[i].persegue = function(pc){
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