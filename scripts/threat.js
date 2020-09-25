function ThreatBar (position){
  this.position = position
  this.set = function(){

  }
  this.value = 4
  this.maximum = 7
  this.minimum = 0
//this function will increase or decrease the threat value by a set amount
  this.increase = function(amount){

  }
  this.decrease = function(amount){

  }
  document.getElementById(position).outerHTML('<div class="progress-bar bg-warning" id="threatbar" role="progressbar" aria-valuenow="' + this.value + '" aria-valuemin="' + this.minimum + '" aria-valuemax="' + this.maximum + '"></div>')
}

threatbar = new ThreatBar ('progress')
