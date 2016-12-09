function Inimigo(){
	

}

Inimigo.prototype = new SpriteInMap();
Inimigo.prototype.constructor = Inimigo;

Inimigo.prototype.moveQuadro = function(){
    this.iddle+=8*this.iv*dt;
    if(this.iddle>=2){
      this.iddle = 0;
    }
}