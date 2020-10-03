function EventHandler(){
  this.randomnumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  this.terrorsuccess = false
  this.currentterror ={}
  this.abductoralive = true
  this.nomorehostages = false
  this.turnsleft = 10
  this.conversationpoints = 0
  this.currentcard = 0
  this.demand1flipped = false
  this.demand2flipped = false
  this.hand = [1,2,3,4,5,6]
  this.concedebutton = function(number){
    if (conversationpoints >= demandcardsingame[(number-1)].cost){
      conversationpoints -= demandcardsingame[(number-1)].cost
      demandcardsingame[(number-1)].concede()
      $('#conversationPointsP').html(conversationpoints)
      $('#concedebutton' + number).prop('disabled', true)
      $('#concedebutton' + number).html("Conceded")
    }
  }
  this.preparedemands = function(){
    if (hostagetakerarray[1].name === "Ann Greashopper") {
      demandcardsingame.push(demandcards[0])
      demandcardsingame.push(demandcards[this.randomnumber(4, 7)])
      this.setdemandcards(demandcardsingame[0].id, demandcardsingame[1].id)
    } else {
      demandcardsingame.push(demandcards[this.randomnumber(1, 4)])
      demandcardsingame.push(demandcards[this.randomnumber(4, 7)])
      this.setdemandcards()
    }
  }
  this.setdemandcards = function (){
    demandcardsingame[0].setreward()
    demandcardsingame[1].setreward()
    $('#demand1title').html(demandcardsingame[0].title)
    $('#demand1cost').html(' CP to concede: ' + demandcardsingame[0].cost)
    for (i=0; i<demandcardsingame[0].rewards.length; i++){
      $('#demand1reward').append(demandcardsingame[0].rewards[i] + " ")
    }
    $('#demand1penalty').html('HOWEVER ' + demandcardsingame[0].setpenalty())
    $('#demand2title').html(demandcardsingame[1].title)
    $('#demand2cost').html(' CP to concede: ' + demandcardsingame[1].cost)
    for (i=0; i<demandcardsingame[1].rewards.length; i++){
      $('#demand2reward').append(demandcardsingame[1].rewards[i] + " ")
    }
    $('#demand2penalty').html('HOWEVER ' + demandcardsingame[1].setpenalty())
  }
  this.gameover = function(){
    if (this.abductoralive === false && this.nomorehostages === true){
      let numbersaved = hostagechart['data']["datasets"][0]["data"][0]
      $('#winlosemodal').modal({backdrop: false, keyboard: false})
      if ((parseFloat(numbersaved)/parseFloat(hostagetaker.numberofhostages)) < 0.5){
        $('#winorlose').html("Pyrrhic Victory")
        $('#winorloseflufftext').html("Well, captain. You captured the hostage taker, but at what cost?  I don't think top brass will be happy with this.")
      } else if ((parseFloat(numbersaved)/parseFloat(hostagetaker.numberofhostages)) < 0.95){
        $('#winorlose').html("Victory")
        $('#winorloseflufftext').html("Well done, Cap! You captured the hostage taker, and even managed to save over half of the hostages! A fantastic job!.")
      } else {
        $('#winorlose').html("Amazing Victory!")
        $('#winorloseflufftext').html("Just wonderful, Cap! You captured the hostage taker, saved the day and all of the hostages to boot! I think you have a medal in your future!.")
      }
      $('#howmanyhostagessaved').html(numbersaved)
      $('#howmanyhostageskilled').html(hostagetaker.numberofhostages - numbersaved)
      $('#abductoralive').html('Yes')
      $('#fireworks').show()
    } else {
      if (timeleft >= 0){
        return
      } else {
        let numbersaved = hostagechart['data']["datasets"][0]["data"][0]
        let numberkilled = hostagechart['data']["datasets"][0]["data"][2]
        $('#winlosemodal').modal({backdrop: false, keyboard: false})
        $('#winorlose').html("Game Over")
        $('#winorloseflufftext').html("Oh my, captain.  That didn't go too well did it?  Remember, that the most important thing is to bring in the abductor. This will be a tough one to explain...")
        $('#howmanyhostagessaved').html(numbersaved)
        $('#howmanyhostageskilled').html(numberkilled)
        $('#abductoralive').html('No')
      }
    }
  }
  this.interfacehelp = ""
  this.interfaceabductor = ""
  this.interfacenegotiator = ""
  this.updatetime = function(){
    if (this.turnsleft >= 0) {
      $('#turnsleft').html('<strong>Turns remaining: ' + this.turnsleft + "</strong>")
    } else {
      this.gameover()
    }
  }
  this.displayterror = async function(){
    this.currentterror = terrorcarddeck.pop()
    $('#terrortitle').html(this.currentterror.title)
    if (this.currentterror.diceroll === true){
      let successtext = ""
      let failtext = ""
      switch(this.currentterror.threatsuccess) {
        case 'extrahostage':
          successtext = "An extra hostage is taken"
          terroroutcomepass = '1hostage'
          break;
        case 'noeffect':
          successtext = 'No effect this time'
          terroroutcomepass = 'noeffect'
          break;
        case 'hostageescape':
          successtext = 'The hostage escapes'
          terroroutcomepass = '1escape'
          break;
        default:
          false
      }
      switch(this.currentterror.threatfail) {
        case 'extrahostage':
          failtext = "Two extra hostages are taken"
          terroroutcomefail = '2hostage'
          break;
        case 'hostagekilled':
          failtext = 'A hostage is killed'
          terroroutcomefail = '1dead'
          break;
        default:
          false
      }
      $('#terroreffect').html('<ul><li>On Success: ' + successtext + '</li><li>On Fail: ' + failtext + '</li></ul>')
      let terrordice = diceingame.roll()
      $('#acceptterror').prop('disabled', true)
      await delayanimation(unlockterrorbutton, 2000)
      for (i=0; i<diceingame.number;i++){
        if (terrordice[i] > 4){
          this.terrorsuccess = true
        } else{
          this.terrorsuccess = false
        }
      }
    } else {
      let effecttext = ""
      switch(this.currentterror.effect) {
        case 'hostagekilled: 1':
          effecttext = "A hostage is killed"
          terroroutcomepass = '1dead'
          break;
        case 'threat: 1':
          effecttext = 'Threat increases by 1'
          terroroutcomepass = '1threat'
          break;
        case 'threat: 2':
          effecttext = 'Threat increases by 2'
          terroroutcomepass = '2threat'
          break;
        case 'timeremaining: -1':
          effecttext = 'Time remaining decreases by 1'
          terroroutcomepass = '-1time'
          break;
        case 'timeremaining: half':
          effecttext = 'Time remaining halves(rounding up)'
          terroroutcomepass = 'halftime'
          break;
        case 'hostageescape: 1':
          effecttext = 'A hostage is freed'
          terroroutcomepass = '1free'
          break;
        case 'threat: reset':
          effecttext = 'Threat is reset to 4'
          terroroutcomepass = 'resetthreat'
          break;
        default:
          false
      }
      $('#terroreffect').html(effecttext)
    }
    $('#terrormodal').modal({backdrop: false, keyboard: false})
  }
  this.preparegame = function(){
        hostagetakeringame = hostagetakerarray[1]
        hostagetakeringame.sethostages(0, hostagetakeringame.number, 0)
        $('#textbox').hide()
        $('#hostagetakername').html(hostagetakeringame.name)
        $('#whatweknow').html(hostagetakeringame.description)
        events.preparedemands()
    }
  this.phaseone = async function(){
    $('#phase3bar').removeClass('activated')
    $('#phase1bar').addClass('activated')
    $('#playphasebuttons').show()
    $('#buyphasebuttons').hide()
    $('#endphase1').show()
    $('#endphase2').hide()
    for (i = 0; i< player.discard.length; i++){
      player.availabletobuy.push(player.discard[i])
    }
    while(player.discard.length > 0) {
      player.discards.pop();
    }
    if (document.getElementById('isInHand').innerHTML === "Discarded"){
      $('#isInHand').html("Available to buy")
    }
    this.conversationpoints = 0
    $('#conversationPointsP').html(this.conversationpoints)
    // updatethreat(threatperturn)
  }
  this.phasetwo = function(){
    $('#phase1bar').removeClass('activated')
    $('#phase2bar').addClass('activated')
    $('#playphasebuttons').hide()
    $('#buyphasebuttons').show()
    $('#endphase1').hide()
    $('#endphase2').show()
  }
  this.phasethree =  async function() {
      $('#phase2bar').removeClass('activated')
      $('#phase3bar').addClass('activated')
      $('#buyphasebuttons').hide()
      $('#endphase2').hide()
      $('#endphase3').show()
      timeleft -= 1
      this.updatetime()
      this.displayterror()
  }
}
let events = new EventHandler()
