function randomised6() {
  let randomnumber = Math.ceil(Math.random() * 6)
  return randomnumber
}
function Dice(){
  this.number = 2
  this.permanentchange = 0
  this.randomnumber =[]
  this.set = function(){
    for(i=2; i<=5; i++){
      $('#dice' + i).hide()
    }
    for (i = 1; i <= this.number; i++) {
      $('#dice' + (i)).removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
      $('#dice' + (i)).show()
    }
  }
  this.roll = function(){
    this.randomnumber = [randomised6(), randomised6(), randomised6(), randomised6(), randomised6()]
    for (i = 1; i <= this.number; i++) {
      $('#dice' + (i)).removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
      $('#dice' + (i)).addClass('roll')
    }
    delayanimation(this.delay, 2000)
    return this.randomnumber
  }
  this.delay = function(){
    diceingame.displayroll()
  }
  this.displayroll = function(){
    for (i = 1; i <= this.number; i++) {
      $('#dice' + (i)).removeClass('roll')
    }
    for (i = 1; i <= this.number; i++) {
      if (this.randomnumber[i-1] === 1) {
        $("#dice" + (i)).addClass('spintofront')
      } else if (this.randomnumber[i-1] === 2) {
        $("#dice" + (i)).addClass('spintoleft')
      } else if (this.randomnumber[i-1] === 3) {
        $("#dice" + (i)).addClass('spintoback')
      } else if (this.randomnumber[i-1] === 4) {
        $("#dice" + (i)).addClass('spintoright')
      } else if (this.randomnumber[i-1] === 5) {
        $("#dice" + (i)).addClass('spintobottom')
      } else {
        $("#dice" + (i)).addClass('spintotop')
      }
    }
  }
  this.add = function(){
    if (this.number <= 4) {
      $('#dice2').hide()
      $('#dice3').hide()
      $('#dice4').hide()
      $('#dice5').hide()
      this.number += 1
      this.set()
      }
    }
  this.remove = function(){
    if (numberofdice > 1) {
      $('#dice2').hide()
      $('#dice3').hide()
      $('#dice4').hide()
      $('#dice5').hide()
      this.number -= 1
      this.set()
    }
  }
}

diceingame = new Dice()
