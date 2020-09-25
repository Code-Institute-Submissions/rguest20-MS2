$('#fireworks').hide()

//hide splash screen - comment out to show
// $('#splash').hide()
$('#textbox').hide()
delayanimation(maingame, 1000)
//show splash screen
window.onload = function() {
  $('#titleofgame').addClass('textappear')
  $('#splash').addClass('titlecarddisappear')
}

// create variables
let freecardnumber
let dicechangepermanent = 0
let threatperturn = 0
let initialsetup = true
let abductorkilledorcaptured = false
let extradice = false
let fourtofivefromcard = false
let numberofdice
let cardnumber = 0
let cardsremoved = 0
let hostagedataset = [1, 0, 0]
let hostagestotal = 7
let allhostagessavedordead = false
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
let conversationpoints = 0
$('#conversationPointsP').html(conversationpoints)
events.phaseone()

function unlockterrorbutton(){
  $('#acceptterror').prop('disabled', false)
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

//make concede button work
function concedebutton1(){
  if (conversationpoints >= demandsingame[0]['concedecost']){
    conversationpoints -= demandsingame[0]['concedecost']
    $('#conversationPointsP').html(conversationpoints)
    $('#concedebutton1').prop('disabled', true)
    $('#concedebutton1').html("Conceded")
    let demand1rewards = demandsingame[0]['concede']
    if ('hostage' in demand1rewards){
      let hostagessaved = demand1rewards['hostage']
      alterData(hostagessaved, -hostagessaved, 0)
    }
    if ('freecard' in demand1rewards){
      freecardnumber = demand1rewards['freecard']
    }
    if ('dice' in demand1rewards){
      moredice(demand1rewards['dice'])
    }
    if ('threat' in demand1rewards){
      updatethreat(demand1rewards['threat'])
    }
    let demand1penalties = demandsingame[0]['penalty']
    if ('timeleft' in demand1penalties){
      timeleft = 0
      updatetimeleft()
    }
    if ('dicepermanent' in demand1penalties){
      dicechangepermanent -=1
      updatethreat()
    }
    if ('threatmultiplier' in demand1penalties){
      threatchangedouble = true
    }
    if ('threatincreaseperturn' in demand1penalties){
      threatperturn = 2
    }
  }
}

function concedebutton2(){
  if (conversationpoints >= demandsingame[1]['concedecost']){
    conversationpoints -= demandsingame[1]['concedecost']
    $('#conversationPointsP').html(conversationpoints)
    $('#concedebutton2').prop('disabled', true)
    $('#concedebutton2').html("Conceded")
    let demand2rewards = demandsingame[1]['concede']
    if ('hostage' in demand2rewards){
      let hostagessaved = demand2rewards['hostage']
      alterData(hostagessaved, -hostagessaved, 0)
    }
    if ('freecard' in demand2rewards){
      freecardnumber = demand2rewards['freecard']
    }
    if ('dice' in demand2rewards){
      moredice(demand2rewards['dice'])
    }
    if ('threat' in demand2rewards){
      updatethreat(demand2rewards['threat'])
    }
    let demand2penalties = demandsingame[1]['penalty']
    if ('timeleft' in demand2penalties){
      timeleft = 0
      updatetimeleft()
    }
    if ('dicepermanent' in demand2penalties){
      dicechangepermanent -=1
      updatethreat()
    }
    if ('threatmultiplier' in demand2penalties){
      threatchangedouble = true
    }
    if ('threatincreaseperturn' in demand2penalties){
      threatperturn = 2
    }
  }
}

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
    showdice()
  } else if (threatpercentage === 100) {
    $('#threatbar').removeClass('bg-warning')
    $('#threatbar').addClass('bg-danger')
    numberofdice = 1 + dicechangepermanent
    if (numberofdice <= 0){
      numberofdice = 1
    }
    showdice()
  } else if (threatpercentage > 20) {
    $('#threatbar').removeClass('bg-success')
    $('#threatbar').removeClass('bg-danger')
    $('#threatbar').addClass('bg-warning')
    numberofdice = 2 + dicechangepermanent
    showdice()
  } else if (threatpercentage >= 0) {
    $('#threatbar').removeClass('bg-warning')
    $('#threatbar').addClass('bg-success')
    numberofdice = 3 + dicechangepermanent
    showdice()
  } else if (threatpercentage < 0) {
    let newhostagessaved = Math.round((threatpercentage / -100) * 7)
    alterData(+newhostagessaved, -newhostagessaved, 0)
    threatpercentage = 0
    threat=0
    numberofdice = 3 + dicechangepermanent
    showdice()
  }
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
      if (i == messagetext.length-1) {
        clearInterval(typing)
        return;
      }
      i++
      result += messagetext[i]
      position.html(result)
    },
    30)
}

//arrows to scroll through cards
function nextCard() {
  if (cardnumber === (conversationcards.length-1)) {
    return
  } else {
    cardnumber++

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
    abductorkilledorcaptured = true
    checkforvictory()
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
    abductorkilledorcaptured = true
    checkforvictory()
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
    timeleft = -1
    }
    fourtofivefromcard = false
    $('#fourtofivetrueorfalse').empty()
    updatedice()
  }

//abductor killed
function abductorkilled() {
  $('#hostagetakername').html("Second in Command")
  $('#whatweknow').html("Apparently there was a second in command hiding in there as well.  He seems a lot less reasonable as well. Careful, Cap. Keep him cool!")
  $('#demand1').hide()
  $('#demand2').hide()
  typeout("The second in command has no demands.  However, he is a lot more unstable than his boss.  All increases in threat are now doubled.", $('#secondincommanddemand'))
  threatchangedouble = true
}

// function to ensure that dice do not reset early
function updatedice(){
  if (!extradice){
    showdice()
  }
}

//functions to roll the dice for the game


function delayanimation(funct, val) {
  let waittime = new Promise(function(resolve) {
    resolve(setTimeout(funct, val))
  })
  waittime.then(function() {
    clearTimeout()
  })
}

//allows player to buy cards
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

//free cards
function freecard(){
  hand.push(conversationcards[cardnumber].id)
  freecardnumber -= 1
  setCard()
}
