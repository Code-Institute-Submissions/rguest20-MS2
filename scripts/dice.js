function randomised6() {
  let randomnumber = Math.ceil(Math.random() * 6)
  return randomnumber
}
function Dice(){
  this.number = 2
  this.randomnumber =[]
  this.set = function(){
    for (i = 1; i <= this.number; i++) {
      $('#dice' + (i)).removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
      $('#dice' + (i)).show()
    }
  }
  this.roll = async function(){
    this.randomnumber = [randomised6(), randomised6(), randomised6(), randomised6(), randomised6()]
    for (i = 1; i <= this.number; i++) {
      $('#dice' + (i)).removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
      $('#dice' + (i)).addClass('roll')
    }
    await delayanimation(function(){
      for (i = 1; i <= this.number; i++) {
        $('#dice' + (i)).removeClass('roll')
      }
    }, 2000)
    for (i = 0; i <= this.number; i++) {
      if (this.randomnumber[i] === 1) {
        $("#dice" + (i+1)).addClass('spintofront')
      } else if (randomnumberondie === 2) {
        $("#dice" + (i+1)).addClass('spintoleft')
      } else if (randomnumberondie === 3) {
        $("#dice" + (i+1)).addClass('spintoback')
      } else if (randomnumberondie === 4) {
        $("#dice" + (i+1)).addClass('spintoright')
      } else if (randomnumberondie === 5) {
        $("#dice" + (i+1)).addClass('spintobottom')
      } else {
        $("#dice" + (i+1)).addClass('spintotop')
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
diceingame.set()
