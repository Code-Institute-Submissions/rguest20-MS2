$('#fireworks').hide()
console.log("I am running")
//hide splash screen - comment out to show
// $('#splash').hide()
$('#textbox').hide()
delayanimation(events.preparegame, 1000)
//show splash screen
window.onload = function() {
  $('#titleofgame').addClass('textappear')
  $('#splash').addClass('titlecarddisappear')
}

//initial preparation for game
events.updatetime()
diceingame.set()
// updatethreat()
$('#conversationPointsP').html(events.conversationpoints)
events.phaseone()
conversationcards[events.currentcard].setCard()
$('#buttoncontinue').hide()
$('#buttonchoice1').hide()
$('#buttonchoice2').hide()
threatbar.set()

let dicechangepermanent = 0
let threatperturn = 0
let initialsetup = true
let extradice = false
let fourtofivefromcard = false
let numberofdice
let cardnumber = 0
let cardsremoved = 0
let demandsingame = []
let nextdemandcard = 1
let timeleft = 10
let terroringame = []
let currentterror
let terroroutcome
let terroroutcomepass
let terroroutcomefail
let threatoutcome = "not required"
let threat = 4
let threatchangedouble = false
let conversationpoints = 0

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
  if (events.currentcard === (conversationcards.length-1)) {
    return
  } else {
    events.currentcard ++
    conversationcards[events.currentcard].setCard()
  }
}

function prevCard() {
  if (events.currentcard === 0) {
    return
  } else {
    events.currentcard --
    conversationcards[events.currentcard].setCard()
  }
}

//Playing cards - several functions
function buttondisable1(){
  $('#playcard').prop('disabled', false)
}

function buttondisable2(){
  $('#fourtofivebutton').prop('disabled', false)
}

function countboxes(){
  let boxchecknumber = $(":checkbox:checked").length
  if (boxchecknumber === 2){
    $('#discardbutton').prop('disabled', false)
  } else {
    $('#discardbutton').prop('disabled', true)
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

// //free cards
// function freecard(){
//   hand.push(conversationcards[cardnumber].id)
//   freecardnumber -= 1
//   setCard()
// }
