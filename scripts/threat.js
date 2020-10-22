function ThreatBar (){
  this.set = function(){
    let threatpercentage = (threatbar.value / 7) * 100
    console.log(threatpercentage)
    $('#threatbar').css("width", threatpercentage + "%")
  }
  this.threatdouble = false
  this.change = async function(change = 0){
    if (this.threatdouble === true){
      change += change
    }
    threatbar.value += change
    let threatpercentage = (threatbar.value / 7) * 100
    $('#threatbar').css("width", threatpercentage + "%")
    if (threatpercentage > 100) {
      hostagetakeringame.killhostage(Math.round(((threatpercentage / 100) * 7) - 7))
      threatbar.value = 7
      threatpercentage = 100
      diceingame.number = 1
      diceingame.set()
    } else if (threatpercentage === 100) {
      $('#threatbar').removeClass('bg-warning')
      $('#threatbar').addClass('bg-danger')
      diceingame.number = 1 + diceingame.permanentchange
      if (diceingame.number <= 0){
        diceingame.number = 1
      }
      diceingame.set()
    } else if (threatpercentage > 20) {
      $('#threatbar').removeClass('bg-success')
      $('#threatbar').removeClass('bg-danger')
      $('#threatbar').addClass('bg-warning')
      diceingame.number = 2 + diceingame.permanentchange
      diceingame.set()
    } else if (threatpercentage >= 0) {
      $('#threatbar').removeClass('bg-warning')
      $('#threatbar').addClass('bg-success')
      diceingame.number = 3 + diceingame.permanentchange
      diceingame.set()
    } else if (threatpercentage < 0) {
      hostagetakeringame.hostageescape(Math.round((threatpercentage / -100) * 7))
      threatpercentage = 0
      threatbar.value = 0
      diceingame.number = 3 + diceingame.permanentchange
      diceingame.set()
    }
  }
  this.value = 4
  this.maximum = 7
  this.minimum = 0
}

threatbar = new ThreatBar ()
