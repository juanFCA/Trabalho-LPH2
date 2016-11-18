var SoundLib = function (){
  this.NUM_CANAIS = 10;
  this.sons = {};
  this.canais = [];
  for (var i = 0; i < this.NUM_CANAIS; i++) {
    this.canais[i] = {
      audio: new Audio(),
        fim: -1
    };
  }
};

SoundLib.prototype.load = function(nome, arquivo){
  this.sons[nome] = new Audio();
  this.sons[nome].src = arquivo;
  this.sons[nome].load();
};

SoundLib.prototype.play = function(nome){
  for (var i = 0; i < this.NUM_CANAIS; i++) {
    var agora = new Date();
    if(this.canais[i].fim<agora.getTime()){
      this.canais[i].audio.src = this.sons[nome].src;
      this.canais[i].audio.play();
      this.canais[i].fim = agora.getTime()+this.sons[nome].duration*1000;
      break;
    }
  }
};
