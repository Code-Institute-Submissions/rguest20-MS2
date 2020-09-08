//initialize conversation cards object
function ConversationCard(id, title, cost, bigSuccess, smallSuccess, failure, endTurn) {
  this.id = id
  this.title = title
  this.cost = cost
  this.bigSuccess = bigSuccess
  this.smallSuccess = smallSuccess
  this.failure = failure
  this.endTurnIf = endTurn
}

//hide splash screen - comment out to show
$('#splash').hide()
$('#textbox').hide()
delayanimation(maingame, 1000)
//show splash screen
window.onload = function() {
  $('#titleofgame').addClass('textappear')
  $('#splash').addClass('titlecarddisappear')
}

// create variables
let initialsetup = true
let extradice = false
let fourtofivefromcard = false
let numberofdice
let conversationcards = []
let hand = [1, 2, 3, 4, 5, 6]
let discards = []
let available = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
let cardnumber = 0
let cardsremoved = 0
let hostagedataset = [1, 0, 0]
let hostagestotal = 7
let demandsingame = []
let nextdemandcard = 1
let timeleft = 10
updatetimeleft()
let terroringame = []
let currentterror
let terroroutcome
let terroroutcomepass
let terroroutcomefail
let threatoutcome = "not required"
prepareterror()
let threat = 4
let threatchangedouble = false
updatethreat()
let conversationpoints =-111
$('#conversationPointsP').html(conversationpoints)
phase1initialise()

//set up  for first phase
async function phase1initialise(){
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
  $('#conversationPointsP').html(conversationpoints)
}

//second phase set up
function phase2initialise(){
$('#phase1bar').removeClass('activated')
$('#phase2bar').addClass('activated')
$('#playphasebuttons').hide()
$('#buyphasebuttons').show()
$('#endphase1').hide()
$('#endphase2').show()
}

//third phase set up
async function phase3initialise() {
  $('#phase2bar').removeClass('activated')
  $('#phase3bar').addClass('activated')
  $('#buyphasebuttons').hide()
  $('#endphase2').hide()
  $('#endphase3').show()
  timeleft -= 1
  updatetimeleft()
  currentterror = terroringame.pop()
  $('#terrortitle').html(currentterror['title'])
  if (currentterror['dicerollneeded'] === true){
    let successtext = ""
    let failtext = ""
    switch(currentterror['threatsuccess']) {
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
    switch(currentterror['threatfail']) {
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
    let terrordice = rolldice()
    $('#acceptterror').prop('disabled', true)
    await delayanimation(unlockterrorbutton, 2000)
    for (i=0; i<numberofdice;i++){
      if (terrordice[i] > 4){
        threatoutcome = "success"
        break
      } else{
        threatoutcome =  "fail"
      }
    }
  } else {
    let effecttext = ""
    switch(currentterror['effect']) {
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

function unlockterrorbutton(){
  $('#acceptterror').prop('disabled', false)
}

function terrorplay(){
  if (threatoutcome === 'fail'){
    terroroutcome = terroroutcomefail
    threatoutcome = "not required"
  } else{
    terroroutcome = terroroutcomepass
  }
  switch (terroroutcome){
    case '1hostage':
      alterData(0,1,0)
      hostagestotal +=1
      break;
    case '2hostage':
      alterData(0,2,0)
      hostagestotal +=2
      break;
    case '1escape':
      alterData(1,-1,0)
      break;
    case '1dead':
      alterData(0,-1,1)
      break;
    case '-1time':
      timeleft -= 1
      updatetimeleft()
      break;
    case 'halftime':
      timeleft = Math.ceil(timeleft/2)
      updatetimeleft()
      break;
    case '1threat':
      threat += 1
      updatethreat()
      break;
    case '2threat':
      threat += 2
      updatethreat()
      break;
    case 'resetthreat':
      threat = 4
      updatethreat()
      break;
    case '1free':
      alterData(1,-1,0)
      break;
    case 'noeffect':
      break
    default:
      alert('This should never appear')
      break
  }
  phase1initialise()
  currentterror = ""
}

//set buttons to be disabled
$('#playcard').prop('disabled', true)
$('#fourtofivebutton').prop('disabled', true)
$('#reroll').prop('disabled', true)

//random number generator
function getrandomint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//set up terror for play
function prepareterror() {
  for (i = 0; i < 10; i++) {
    let randomcard = getrandomint(0, terror.length-1)
    terroringame.push(terror[randomcard])
    terror.splice(randomcard, 1)
  }
  return
}

//set up demands for play
function preparedemands() {
  if ($('#hostagetakername').html() === "Ann Greashopper") {
    demandsingame.push(demands[0])
    demandsingame.push(demands[getrandomint(4, 7)])
    displaydemands()
  } else {
    demandsingame.push(demands[getrandomint(1, 4)])
    demandsingame.push(demands[getrandomint(4, 7)])
    displaydemands()
  }
}

function displaydemands() {
  $('#demand1title').html(demandsingame[0]['title'])
  $('#demand1text').html(demandsingame[0]['text'])
  $('#demand2title').html(demandsingame[1]['title'])
  $('#demand2text').html(demandsingame[1]['text'])
}

//set up dice for play
let randomnumberondice = []
$('#dice3').hide()
$('#dice4').hide()
$('#dice5').hide()

//threat bar workings
async function updatethreat(change = 0) {
  threat += change
  let threatpercentage = (threat / 7) * 100
  $('#threatbar').css("width", threatpercentage + "%")
  if (threatpercentage > 100) {
    let newhostageskilled = Math.round(((threatpercentage / 100) * 7) - 7)
    alterData(0, -newhostageskilled, +newhostageskilled)
    threat = 7
    threatpercentage = 100
    numberofdice = 1
    await delayanimation(showdice, 1000)
  } else if (threatpercentage === 100) {
    $('#threatbar').removeClass('bg-warning')
    $('#threatbar').addClass('bg-danger')
    numberofdice = 1
    await delayanimation(showdice, 1000)
  } else if (threatpercentage > 20) {
    $('#threatbar').removeClass('bg-success')
    $('#threatbar').removeClass('bg-danger')
    $('#threatbar').addClass('bg-warning')
    numberofdice = 2
    await delayanimation(showdice, 1000)
  } else if (threatpercentage >= 0) {
    $('#threatbar').removeClass('bg-warning')
    $('#threatbar').addClass('bg-success')
    numberofdice = 3
    await delayanimation(showdice, 1000)
  } else if (threatpercentage < 0) {
    let newhostagessaved = Math.round((threatpercentage / -100) * 7)
    alterData(+newhostagessaved, -newhostagessaved, 0)
    threatpercentage = 0
    threat=0
    numberofdice = 3
    await delayanimation(showdice, 1000)
  }
}

//time left to complete game update
function updatetimeleft() {
  if (timeleft >= 0) {
    $('#turnsleft').html('<strong>Turns remaining: ' + timeleft + "</strong>")
  } else {
    alert('THE GAME IS OVER')

  }
}

//create conversation cards
for (card in data) {
  let bigSuccessForCard = {}
  data[card]['bigSuccessDice'] != "0" ? bigSuccessForCard.dice = data[card]['bigSuccessDice'] : true
  data[card]['bigSuccessConversationPoints'] != "0" ? bigSuccessForCard.conversationpoints = data[card]['bigSuccessConversationPoints'] : true
  data[card]['bigSuccessThreatChange'] != "0" ? bigSuccessForCard.threat = data[card]['bigSuccessThreatChange'] : true
  data[card]['bigSuccessHostageRelease'] != "0" ? bigSuccessForCard.hostage = data[card]['bigSuccessHostageRelease'] : true
  data[card]['bigSuccess4to5'] === "true" ? bigSuccessForCard.fourtofive = true : true
  data[card]['bigSuccessRevealDemand'] === "true" ? bigSuccessForCard.demand = true : true
  data[card]['bigSuccessAbductorKill'] === "true" ? bigSuccessForCard.abductorkilled = true : bigSuccessForCard.abductorkilled = false

  let smallSuccessForCard = {}
  data[card]['smallSuccessDice'] != "0" ? smallSuccessForCard.dice = data[card]['smallSuccessDice'] : true
  data[card]['smallSuccessConversationPoints'] != "0" ? smallSuccessForCard.conversationpoints = data[card]['smallSuccessConversationPoints'] : true
  data[card]['smallSuccessThreatChange'] != "0" ? smallSuccessForCard.threat = data[card]['smallSuccessThreatChange'] : true
  data[card]['smallSuccess4to5'] === "true" ? smallSuccessForCard.fourtofive = true : true
  data[card]['smallSuccessRevealDemand'] === "true" ? smallSuccessForCard.demand = true : true
  data[card]['smallSuccessHostageRelease'] != "0" ? smallSuccessForCard.hostage = data[card]['smallSuccessHostageRelease'] : true
  data[card]['smallSuccessAbductorKill'] === "true" ? smallSuccessForCard.abductorkilled = true : smallSuccessForCard.abductorkilled = false

  let failureForCard = {}
  data[card]['failureDice'] != "0" ? failureForCard.dice = data[card]['failureDice'] : true
  data[card]['failureConversationPoints'] != "0" ? failureForCard.conversationpoints = data[card]['failureConversationPoints'] : true
  data[card]['failureThreatChange'] != "0" ? failureForCard.threat = data[card]['failureThreatChange'] : true
  data[card]['failureHostageKill'] != "0" ? failureForCard.hostage = data[card]['failureHostageKill'] : true
  data[card]['failureCardRemove'] === "true" ? failureForCard.remove = true : true
  data[card]['failureAbductorEscape'] === "true" ? failureForCard.abductorescaped = true : failureForCard.abductorescaped = false

  let endTurnIf = ""
  if (data[card]['bigSuccessConversationEnd'] === "false" && data[card]['smallSuccessConversationEnd'] === "false" && data[card]['failureConversationEnd'] === "false") {
    endTurnIf = false
  } else if (data[card]['bigSuccessConversationEnd'] === "true" && data[card]['smallSuccessConversationEnd'] === "true" && data[card]['failureConversationEnd'] === "true") {
    endTurnIf = "all"
  } else if (data[card]['bigSuccessConversationEnd'] === "true") {
    endTurnIf = "big"
  } else if (data[card]['smallSuccessConversationEnd'] === "true") {
    endTurnIf = "small"
  } else {
    endTurnIf = "failure"
  }

  let convoCard = new ConversationCard(Number(data[card]['id']), data[card]['title'], data[card]['cost'], bigSuccessForCard, smallSuccessForCard, failureForCard, endTurnIf)
  conversationcards.push(convoCard)
}
//set 1st card once created
setCard()
$('#buttoncontinue').hide()
$('#buttonchoice1').hide()
$('#buttonchoice2').hide()
let introtext = ""
intro1()

//Introduction
async function intro1() {
  typeout("CAPTAIN!?!? \n\n Captain!? \n\n", $("#writetexthere"))
  await delayanimation(showbutton, 1300)
  document.getElementById("clicktocontinue").addEventListener("click", intro2)
}

async function intro2() {
  document.getElementById("clicktocontinue").removeEventListener("click", intro2)
  $('#buttoncontinue').hide()
  $("#writetexthere").empty()
  typeout("The bump to his head must be worse than we thought! \n\n Captain!?", $("#writetexthere"))
  await delayanimation(showbutton, 2000)
  document.getElementById("clicktocontinue").addEventListener("click", intro3)
}

async function intro3() {
  $('#buttoncontinue').remove()
  let result = ""
  $("#writetexthere").empty()
  typeout("Hang on, he's coming around. \n\n Do you remember who you are and what you do?", $("#writetexthere"))
  await delayanimation(showbutton2, 2500)
  document.getElementById("choice1").addEventListener("click", intro4)
  document.getElementById("choice2").addEventListener("click", intro5)
}

async function intro4() {
  $('#buttonchoice1').remove()
  $("#writetexthere").empty()
  typeout(
    "You're a hostage negotiator.  If there are people in peril, your job is to save them and get the hostage taker to give themselves up. \n\n We can't save everyone, but we can save at least half of the hostages... \n\n You look unwell, do you want to sit this one out?",
    $("#writetexthere"))
  await delayanimation(showbutton3, 6000)
  document.getElementById("choice3").addEventListener("click", tutorial)
  document.getElementById("choice4").addEventListener("click", maingame)
}

async function intro5() {
  $('#buttonchoice1').remove()
  $("#writetexthere").empty()
  typeout("You took a knock to the head! \n\n Worst time for it, given we've got a bit of a situation here. \n\n You still look a bit unwell, do you want to sit this one out?", $("#writetexthere"))
  await delayanimation(showbutton3, 5000)
  document.getElementById("choice3").addEventListener("click", tutorial)
  document.getElementById("choice4").addEventListener("click", maingame)
}

function tutorial() {
  $('#textbox').hide()
  alterData(-1, 2, 0)
  $('#hostagetakername').html(hostagetaker[0]['name'])
  $('#whatweknow').html(hostagetaker[0]['description'])
  preparedemands()
}

function maingame() {
  $('#textbox').hide()
  alterData(-1, 7, 0)
  $('#hostagetakername').html(hostagetaker[1]['name'])
  $('#whatweknow').html(hostagetaker[1]['description'])
  preparedemands()
}

function showbutton() {
  $('#buttoncontinue').show()
}

function showbutton2() {
  $('#buttonchoice1').show()
}

function showbutton3() {
  $('#buttonchoice2').show()
}

//typing function to write messages in a more interesting way
function typeout(message, position) {
  let messagetext = message
  let i = 0
  let result = messagetext[i]
  let typing = setInterval(function() {
      if (i == messagetext.length) {
        clearInterval(typing)
        return;
      }
      i++
      result += messagetext[i].replace("\n", "<br />")
      position.html(result)
    },
    30)
}

//create chart for interface
let chartposition = $('#hostages_data_display');
let hostagechart = new Chart(chartposition, {
  type: 'doughnut',
  data: {
    labels: [
      'Saved',
      'Alive',
      'Dead',
    ],
    datasets: [{
      data: hostagedataset,
      backgroundColor: [
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0 , 255, 0.2)',
        'rgba(255, 0 ,0 , 0.2)'
      ],
    }]
  },
  options: {
    responsive: true,
    legend: false
  }
})

//function to change the data in the chart
function alterData(saved, alive, dead) {
  if (initialsetup != true){
    let numbersaved = hostagechart['data']["datasets"][0]["data"][0]
    let numberalive = hostagechart['data']["datasets"][0]["data"][1]
    let numberdead = hostagechart['data']["datasets"][0]["data"][2]
    if ((numbersaved + numberdead + Math.abs(saved) + Math.abs(dead)) <= hostagestotal){
      hostagedataset[0] += saved
      hostagedataset[1] += alive
      hostagedataset[2] += dead
    } else if ((numbersaved + numberdead + Math.abs(saved) + Math.abs(dead)) === (hostagestotal + 1)) {
      if (saved > 0) {
        saved -=1
      }
      if (dead > 0) {
        dead -=1
      }
      alive +=1
      hostagedataset[0] += saved
      hostagedataset[1] += alive
      hostagedataset[2] += dead
    } else{
      return
    }
  } else {
    hostagedataset[0] += saved
    hostagedataset[1] += alive
    hostagedataset[2] += dead
    initialsetup = false
  }
  hostagechart.update()
}

// Creates the view for the conversation cards (bottom right)
function setCard() {
  let currentcard = conversationcards[cardnumber]
  $('#titleOfCard').empty()
  $('#titleOfCard').append(currentcard.title)
  $('#costOfCard').empty()
  $('#costOfCard').append(currentcard.cost)
  $('#bigSuccessOutcome').empty()
  $('#bigSuccessOutcome').append('<ul>')
  if ('conversationpoints' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append('<li> CP: ' + currentcard.bigSuccess['conversationpoints'] + '</li>')
  }
  if ('dice' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append('<li> Dice: ' + currentcard.bigSuccess['dice'] + '</li>')
  }
  if ('threat' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append('<li> THR: ' + currentcard.bigSuccess['threat'] + '</li>')
  }
  if ('fourtofive' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append("<li> 4's become 5's </li>")
  }
  if ('demand' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append('<li> Demand Reveal</li>')
  }
  if ('hostage' in currentcard.bigSuccess) {
    $('#bigSuccessOutcome').append('<li> Hostages Rescued: ' + currentcard.bigSuccess['hostage'] + '</li>')
  }
  if (currentcard.bigSuccess['abductorkilled'] === true) {
    $('#bigSuccessOutcome').append('<li> Abductor Killed </li>')
  }
  $('#bigSuccessOutcome').append('</ul>')
  $('#littleSuccessOutcome').empty()
  $('#littleSuccessOutcome').append('<ul>')
  if ('conversationpoints' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append('<li> CP: ' + currentcard.smallSuccess['conversationpoints'] + '</li>')
  }
  if ('dice' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append('<li> Dice: ' + currentcard.smallSuccess['dice'] + '</li>')
  }
  if ('threat' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append('<li> THR: ' + currentcard.smallSuccess['threat'] + '</li>')
  }
  if ('fourtofive' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append("<li> 4's become 5's </li>")
  }
  if ('demand' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append('<li> Demand Reveal </li>')
  }
  if ('hostage' in currentcard.smallSuccess) {
    $('#littleSuccessOutcome').append('<li> Hostages Rescued: ' + currentcard.smallSuccess['hostage'] + '</li>')
  }
  if (currentcard.smallSuccess['abductorkilled'] === true) {
    $('#littleSuccessOutcome').append('<li> Abductor Killed </li>')
  }
  $('#littleSuccessOutcome').append('</ul>')
  $('#failureOutcome').empty()
  $('#failureOutcome').append('<ul>')
  if ('conversationpoints' in currentcard.failure) {
    $('#failureOutcome').append('<li> CP: ' + currentcard.failure['conversationpoints'] + '</li>')
  }
  if ('dice' in currentcard.failure) {
    $('#failureOutcome').append('<li> Dice: ' + currentcard.failure['dice'] + '</li>')
  }
  if ('threat' in currentcard.failure) {
    $('#failureOutcome').append('<li> THR: ' + currentcard.failure['threat'] + '</li>')
  }
  if ('fourtofive' in currentcard.failure) {
    $('#failureOutcome').append("<li> 4's become 5's </li>")
  }
  if ('remove' in currentcard.failure) {
    $('#failureOutcome').append('<li> Card Lost Permanently </li>')
  }
  if ('hostage' in currentcard.failure) {
    $('#failureOutcome').append('<li> Hostages Killed: ' + currentcard.failure['hostage'] + '</li>')
  }
  if (currentcard.failure['abductorescaped'] === true) {
    $('#failureOutcome').append('<li> GAME OVER </li>')
    $('#failureOutcome').append('</ul>')
  }
  iscardinhand(currentcard)
}

function iscardinhand(card){
  $('#isInHand').empty()
  $('#isInHand').append('Available to buy')
  for (id in hand) {
    if (Number(hand[id]) === card.id) {
      $('#isInHand').empty()
      $('#isInHand').append('Yes')
    }
  }
  if (discards.includes(card.id)) {
    $('#isInHand').empty()
    $('#isInHand').append('Discarded')
  }
}

//arrows to scroll through cards
function nextCard() {
  if (cardnumber === (conversationcards.length-1)) {
    return
  } else {
    cardnumber++
    setCard()
  }
}

function prevCard() {
  if (cardnumber === 0) {
    return
  } else {
    cardnumber--
    setCard()
  }
}

//More or less dice
function moredice(value = 1) {
  if (numberofdice <= 4) {
    $('#dice2').hide()
    $('#dice3').hide()
    $('#dice4').hide()
    $('#dice5').hide()
    numberofdice += value
    showdice()
  }
}

function lessdice(value = 1) {
  if (numberofdice > 1) {
    $('#dice2').hide()
    $('#dice3').hide()
    $('#dice4').hide()
    $('#dice5').hide()
    numberofdice -= value
    showdice()
  }
}

function showdice() {
  $('#dice2').hide()
  $('#dice3').hide()
  $('#dice4').hide()
  $('#dice5').hide()
  for (i = 1; i <= numberofdice; i++) {
    $('#dice1').removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
    $('#dice' + (i)).removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
    $('#dice' + (i)).show()
  }
}

//Options for the Cards
let diceresult

function sacrifice() {
  for (var i = 0; i < hand.length; i++) {
    if (hand[i] === cardnumber + 1) {
      discards.push(hand[i])
      hand.splice(i, 1)
      setCard()
      conversationpoints += 1
      $('#conversationPointsP').html(conversationpoints)
    }
  }
}

//Playing cards - several functions

async function playthiscard() {
  for (var i = 0; i < hand.length; i++) {
    if (hand[i] === cardnumber + 1) {
      $('#nextCard').prop('disabled', true)
      $('#prevCard').prop('disabled', true)
      $('#playcardinhand').prop('disabled', true)
      $('#sacrificecardinhand').prop('disabled', true)
      $('#buycardtohand').prop('disabled', true)
      $('#endphase1').prop('disabled', true)
      diceresults = rolldice()
      await discards.push(hand[i])
      hand.splice(i, 1)
      await delayanimation(buttondisable1, 2000)
      setCard()
      for (i=0; i<numberofdice; i++){
        if (diceresults[i] === 4){
          await delayanimation(buttondisable2, 2000)
          break
        }
      }
    }
  }
}

function buttondisable1(){
  $('#playcard').prop('disabled', false)
}

function buttondisable2(){
  $('#fourtofivebutton').prop('disabled', false)
}

function fourtofivemodalpopup(){
  if (fourtofivefromcard === true) {
    for (i=0; i<numberofdice; i++){
      if (diceresults[i] === 4){
        diceresults[i] = 5
        $('#dice' + (i+1)).removeClass('spintoright')
        $('#dice' + (i+1)).addClass('spintobottom')
        break
      }
    }
    $('#fourtofivebutton').prop('disabled', true)
    for (i=0; i<numberofdice; i++){
      if (diceresults[i] === 4){
        buttondisable2()
        break
      }
    }
  }else{
    $('#4sto5smainbody').empty()
    for (card in hand){
      $('#4sto5smainbody').append('<input type="checkbox" onclick = "countboxes()" id="' + conversationcards[hand[card]-1].title +  '" name="' + conversationcards[hand[card]-1].title + '"<label for="' + conversationcards[hand[card]-1].title + '">' + conversationcards[hand[card]-1].title + '</label><br>')
    }
    for (i=0; i<numberofdice; i++){
      if (diceresults[i] === 4){
        $('#4to5modal').modal({'backdrop':false, 'keyboard':false})
        $('#discardbutton').prop('disabled', true)
        break
      }
    }
  }
}

function countboxes(){
  let boxchecknumber = $(":checkbox:checked").length
  if (boxchecknumber === 2){
    $('#discardbutton').prop('disabled', false)
  } else {
    $('#discardbutton').prop('disabled', true)
  }
}

function discardfourtofive(){
  for (i = 0; i<2 ; i++){
    let titletodiscard = $(":checkbox:checked")[i]['name']
    for (j=0; j<conversationcards.length; j++){
      if (conversationcards[j]['title'] === titletodiscard){
        let idtodiscard =  conversationcards[j]['id']
        for(k=0; k<hand.length; k++){
          if (hand[k] === idtodiscard){
            discards.push(idtodiscard)
            hand.splice(k,1)
          }
        }
      }
    }
  }
  for (i=0; i<numberofdice; i++){
    if (diceresults[i] === 4){
      diceresults[i] = 5
      $('#dice' + (i+1)).removeClass('spintoright')
      $('#dice' + (i+1)).addClass('spintobottom')
      break
    }
  }
  $('#fourtofivebutton').prop('disabled', true)
  for (i=0; i<numberofdice; i++){
    if (diceresults[i] === 4){
      buttondisable2()
      break
    }
  }
}

async function playthiscardend(){
  let successes = 0
  $('#playcard').prop('disabled', true)
  $('#fourtofivebutton').prop('disabled', true)
  $('#reroll').prop('disabled', true)
  $('#nextCard').prop('disabled', false)
  $('#prevCard').prop('disabled', false)
  $('#playcardinhand').prop('disabled', false)
  $('#sacrificecardinhand').prop('disabled', false)
  $('#buycardtohand').prop('disabled', false)
  $('#endphase1').prop('disabled', false)
  //count successes
  for (i = 0; i < numberofdice; i++) {
    if (diceresults[i] > 4) {
      successes += 1
    }
  }

  //check outcome
  if (successes > 1) {
    cardbigsuccess()
  } else if (successes === 1) {
    cardsmallsuccess()
  } else {
    cardfail()
  }
}


function cardbigsuccess() {
  let outcome = conversationcards[cardnumber]['bigSuccess']
  if ("conversationpoints" in outcome) {
    conversationpoints += parseInt(outcome['conversationpoints'])
    $('#conversationPointsP').html(conversationpoints)
  }
  if ("threat" in outcome) {
    let threatchange = parseInt(outcome['threat'])
    if (threatchangedouble === true && threatchange > 0){
      threatchange += threatchange
    }
    updatethreat(threatchange)
  }
  if ("hostage" in outcome) {
    alterData(parseInt(outcome['hostage']), -parseInt(outcome['hostage']), 0)
  }
  if ("demand" in outcome) {
    $('#demand' + nextdemandcard).addClass("flip-card-toggled")
    nextdemandcard += 1
  }
  if ("dice" in outcome) {
    moredice(2)
    extradice = true
  } else {
    updatethreat()
    extradice = false
  }
  if ("fourtofive" in outcome){
    fourtofivefromcard = true
    $('#fourtofivetrueorfalse').html("no cost to change fours to fives")
  } else {
    fourtofivefromcard = false
    $('#fourtofivetrueorfalse').empty()
  }
  if (outcome['abductorkilled']) {
    abductorkilled()
  }
}

function cardsmallsuccess() {
  let outcome = conversationcards[cardnumber]['smallSuccess']
  if ("conversationpoints" in outcome) {
    conversationpoints += parseInt(outcome['conversationpoints'])
    $('#conversationPointsP').html(conversationpoints)
  }
  if ("threat" in outcome) {
    let threatchange = parseInt(outcome['threat'])
    if (threatchangedouble === true && threatchange > 0){
      threatchange += threatchange
    }
    updatethreat(threatchange)
  }
  if ("hostage" in outcome) {
    alterData(parseInt(outcome['hostage']), -parseInt(outcome['hostage']), 0)
  }
  if ("demand" in outcome) {
    $('#demand' + nextdemandcard).addClass("flip-card-toggled")
    nextdemandcard += 1
  }
  if ("dice" in outcome) {
        moredice()
        extradice = true
      } else {
        updatethreat()
        extradice = false
  }
  if ("fourtofive" in outcome){
    fourtofivefromcard = true
    $('#fourtofivetrueorfalse').html("no cost to change fours to fives")
  } else {
    fourtofivefromcard = false
    $('#fourtofivetrueorfalse').empty()
  }
  if (outcome['abductorkilled']) {
    abductorkilled()
  }
}

function cardfail() {
  let outcome = conversationcards[cardnumber]['failure']
  if ("conversationpoints" in outcome) {
    conversationpoints += parseInt(outcome['conversationpoints'])
    $('#conversationPointsP').html(conversationpoints)
  }
  if ("threat" in outcome) {
    let threatchange = parseInt(outcome['threat'])
    if (threatchangedouble === true && threatchange > 0){
      threatchange += threatchange
    }
    updatethreat(threatchange)
  }
  if ("hostage" in outcome) {
    alterData(0, -parseInt(outcome['hostage']), parseInt(outcome['hostage']))
  }
  if ("remove" in outcome) {
    prevCard()
    conversationcards.splice(cardnumber + 1, 1)
  }
  if ("dice" in outcome) {
        lessdice()
        extradice = true
      } else {
        updatethreat()
        extradice = false
      }
  if (outcome['abductorescaped']) {
    gameover()
    }
    fourtofivefromcard = false
    $('#fourtofivetrueorfalse').empty()
    updatedice()
  }

function gameover(){
  alert("you have lost")
}

function abductorkilled() {
  $('#hostagetakername').html("Second in Command")
  $('#whatweknow').html("Apparently there was a second in command hiding in there as well.  He seems a lot less reasonable as well. Careful, Cap. Keep him cool!")
  $('#demand1').hide()
  $('#demand2').hide()
  typeout("The second in command has no demands.  However, he is a lot more unstable than his boss.  All increases in threat are now doubled.", $('#secondincommanddemand'))
  threatchangedouble = true
}

function updatedice(){
  if (!extradice){
    showdice()
  }
}

//functions to roll the dice for the game
function randomised6() {
  let randomnumber = Math.ceil(Math.random() * 6)
  return randomnumber
}

function rolldice() {
  randomnumberondice = [randomised6(), randomised6(), randomised6(), randomised6(), randomised6()]
  rolldie1()
  rolldie2()
  rolldie3()
  rolldie4()
  rolldie5()
  return randomnumberondice
}

async function rolldie1() {
  let randomnumberondie = Number(randomnumberondice[0])
  preparedie()
  await delayanimation(removeroll, 2000)

  if (randomnumberondie === 1) {
    $('#dice1').addClass('spintofront')
  } else if (randomnumberondie === 2) {
    $('#dice1').addClass('spintoleft')
  } else if (randomnumberondie === 3) {
    $('#dice1').addClass('spintoback')
  } else if (randomnumberondie === 4) {
    $('#dice1').addClass('spintoright')
  } else if (randomnumberondie === 5) {
    $('#dice1').addClass('spintobottom')
  } else {
    $('#dice1').addClass('spintotop')
  }
}

async function rolldie2() {
  let randomnumberondie = Number(randomnumberondice[1])
  await delayanimation(removeroll, 2000)

  if (randomnumberondie === 1) {
    $("#dice2").addClass('spintofront')
  } else if (randomnumberondie === 2) {
    $("#dice2").addClass('spintoleft')
  } else if (randomnumberondie === 3) {
    $("#dice2").addClass('spintoback')
  } else if (randomnumberondie === 4) {
    $("#dice2").addClass('spintoright')
  } else if (randomnumberondie === 5) {
    $("#dice2").addClass('spintobottom')
  } else {
    $("#dice2").addClass('spintotop')
  }
}

async function rolldie3() {
  let randomnumberondie = Number(randomnumberondice[2])
  await delayanimation(removeroll, 2000)

  if (randomnumberondie === 1) {
    $("#dice3").addClass('spintofront')
  } else if (randomnumberondie === 2) {
    $("#dice3").addClass('spintoleft')
  } else if (randomnumberondie === 3) {
    $("#dice3").addClass('spintoback')
  } else if (randomnumberondie === 4) {
    $("#dice3").addClass('spintoright')
  } else if (randomnumberondie === 5) {
    $("#dice3").addClass('spintobottom')
  } else {
    $("#dice3").addClass('spintotop')
  }
}

async function rolldie4() {
  let randomnumberondie = Number(randomnumberondice[3])
  await delayanimation(removeroll, 2000)

  if (randomnumberondie === 1) {
    $("#dice4").addClass('spintofront')
  } else if (randomnumberondie === 2) {
    $("#dice4").addClass('spintoleft')
  } else if (randomnumberondie === 3) {
    $("#dice4").addClass('spintoback')
  } else if (randomnumberondie === 4) {
    $("#dice4").addClass('spintoright')
  } else if (randomnumberondie === 5) {
    $("#dice4").addClass('spintobottom')
  } else {
    $("#dice4").addClass('spintotop')
  }
}

async function rolldie5() {
  let randomnumberondie = Number(randomnumberondice[4])
  await delayanimation(removeroll, 2000)

  if (randomnumberondie === 1) {
    $("#dice5").addClass('spintofront')
  } else if (randomnumberondie === 2) {
    $("#dice5").addClass('spintoleft')
  } else if (randomnumberondie === 3) {
    $("#dice5").addClass('spintoback')
  } else if (randomnumberondie === 4) {
    $("#dice5").addClass('spintoright')
  } else if (randomnumberondie === 5) {
    $("#dice5").addClass('spintobottom')
  } else {
    $("#dice5").addClass('spintotop')
  }
}

function delayanimation(funct, val) {
  let waittime = new Promise(function(resolve) {
    resolve(setTimeout(funct, val))
  })
  waittime.then(function() {
    clearTimeout()
  })
}

function preparedie() {
  $('#dice1').removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
  $('#dice1').addClass('roll')
  $("#dice2").removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
  $("#dice2").addClass('roll')
  $("#dice3").removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
  $("#dice3").addClass('roll')
  $("#dice4").removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
  $("#dice4").addClass('roll')
  $("#dice5").removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
  $("#dice5").addClass('roll')
  $('#rollbutton').prop('disabled', true);
}

function removeroll() {
  $('#rollbutton').prop('disabled', false);
  $('#dice1').removeClass('roll')
  $("#dice2").removeClass('roll')
  $("#dice3").removeClass('roll')
  $("#dice4").removeClass('roll')
  $("#dice5").removeClass('roll')
}

function buyacard(){
  let currentcardcost = parseInt(conversationcards[cardnumber].cost)
  if (!hand.includes(conversationcards[cardnumber].id) && !discards.includes(conversationcards[cardnumber].id)){
    if (conversationpoints >= currentcardcost){
      hand.push(conversationcards[cardnumber].id)
      conversationpoints -= currentcardcost
      $('#conversationPointsP').html(conversationpoints)
      setCard()
    }
  }
}
