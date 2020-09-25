function EventHandler(){
  this.terrorsuccess = false
  this.currentterror ={}
  this.abductoralive = true
  this.nomorehostages = false
  this.turnsleft = 10
  this.conversationpoints = 0
  this.demand1flipped = false
  this.demand2flipped = false
  this.concedebutton = function(number){
    if (conversationpoints >= demandsingame[(number-1)].cost){
      conversationpoints -= demandsingame[(number-1)].cost
      demandsingame[(number-1)].concede()
      $('#conversationPointsP').html(conversationpoints)
      $('#concedebutton' + number).prop('disabled', true)
      $('#concedebutton' + number).html("Conceded")
  }
  this.preparedemands = function(){
    if (hostagetakerindividual.name === "Ann Greashopper") {
      demandsingame.push(demands[0])
      demandsingame.push(demands[getrandomint(4, 7)])
      this.setdemandcards(demandsingame[0], demandsingame[1])
    } else {
      demandsingame.push(demands[getrandomint(1, 4)])
      demandsingame.push(demands[getrandomint(4, 7)])
      this.setdemandcards(demandsingame[0], demandsingame[1])
    }
  }
  this.setdemandcards = function (firstid = 1, secondid = 6){
    $('#demand1title').html(demandcards[firstid-1].title)
    $('#demand1cost').html(' CP to concede: ' + demandcards[firstid-1].cost)
    for (i=0; i<demandcards[firstid-1].setreward.length; i++){
      $('#demand1reward').append(demandcards[firstid-1].setreward[i])
    }
    $('#demand1penalty').html('HOWEVER ' + demandcards[firstid-1].setpenalty)
    $('#demand2title').html(demandcards[secondid-1].title)
    $('#demand2cost').html(' CP to concede: ' + demandcards[secondid-1].cost)
    for (i=0; i<demandcards[secondid-1].setreward.length; i++){
      $('#demand2reward').append(demandcards[secondid-1].setreward[i])
    }
    $('#demand2penalty').html('HOWEVER ' + demandcards[secondid-1].setpenalty)
  }
  this.gameover = function(){
    if (this.abductoralive === false && allhostagessavedordead === true){
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
    if (timeleft >= 0) {
      $('#turnsleft').html('<strong>Turns remaining: ' + timeleft + "</strong>")
    } else {
      this.gameover()
    }
  }
  this.displayterror = function(){
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
    for (abductor in hostagetakerarray){
      if hostagetakerarray[abductor].name = "Arkayne Massua"
      hostagetakeringame = hostagetakerarray[0]
      hostagetakeringame.sethostages(0, hostagetakeringame.hostagenumber, 0)
      $('#textbox').hide()
      $('#hostagetakername').html(hostagetakeringame.name)
      $('#whatweknow').html(hostagetakeringame.description)
      events.preparedemands()
    }
  }
  this.phaseone = async function(){
    $('#phase3bar').removeClass('activated')
    $('#phase1bar').addClass('activated')
    $('#playphasebuttons').show()
    $('#buyphasebuttons').hide()
    $('#endphase1').show()
    $('#endphase2').hide()
    for (i = 0; i<discards.length; i++){
      available.push(discards[i])
    }
    while(discards.length > 0) {
      discards.pop();
    }
    if (document.getElementById('isInHand').innerHTML === "Discarded"){
      $('#isInHand').html("Available to buy")
    }
    conversationpoints = 0
    $('#conversationPointsP').html(this.conversationpoints)
    updatethreat(threatperturn)
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
