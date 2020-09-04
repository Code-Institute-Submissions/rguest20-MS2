<?php session_start(); /* Starts the session */

if (!isset($_SESSION['UserData']['Username'])) {
    header("location:login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Negotiation</title>
  <link href="./css/Chart.css" rel="stylesheet">
  <link href="./css/style2.css" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>

<body>
  <div id="portrait">
    <h1>Please Rotate Your Device To Play</h1>
    <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <div id="landscape">
    <div class="jumbotron" id='splash'>
      <div id="titleofgame">
        <h2>NEGOTIATION!</h2>
        <h5>A Game Of Saving Lives</h5>
      </div>
    </div>
    <div class="jumbotron" id='textbox'>
      <p id="skipintro" onclick="maingame()">X</p>
      <div id="textinbox">
        <p id="writetexthere"></p>
        <p id="buttoncontinue"><button id="clicktocontinue">Click To Continue</button></p>
        <div id="buttonchoice1">
          <p><button id="choice1">Who are you?? I'm very lost...</button></p>
          <p><button id="choice2">I'm a hostage negotiator. What happened?</button></p>
        </div>
        <div id="buttonchoice2">
          <p><button id="choice3">No, even with head trauma, I need to save these people!!! (tutorial)</button></p>
          <p><button id="choice4">You can probably handle this, just appeal to his sense of family...(main game)</button></p>
        </div>
      </div>
    </div>
    <div id="negotiationwrapper" class="row">
      <div id="negotiationwindow" class="col-12 row">
        <div id="leftside" class="col-3">
          <table class="table border">
            <thead>
              <td id="hostagetakerwindow">
                <h3>Hostage Taker</h3>
                <h5><span id="hostagetakername"></span></h5>
                <p id="whatweknow"></p>
                <h3 id="turnsleft"></h3>
              </td>
            </thead>
            <tbody>
              <tr>
                <td id="demands">
                  <h3>Demands</h3>
                  <div class="flip-card" id="demand1">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h3>DEMAND 1</h3>
                      </div>
                      <div class="flip-card-back" id="demand1inner">
                        <h5><span id="demand1title"></span></h5>
                        <p id='demand1text'></p>
                        <p id='demand1extra'></p>
                      </div>
                    </div>
                  </div>
                  <div class="flip-card" id="demand2">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h3>DEMAND 2</h3>
                      </div>
                      <div class="flip-card-back" id="demand2inner">
                        <h5><span id="demand2title"></span></h5>
                        <p id='demand2text'></p>
                        <p id='demand2extra'></p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="interface" class="col-6">
          <table class="table border">
            <thead>
              <td id="interfaceinside">
                <h3>Interface</h3>
                <div id="hostages_div" class="border">
                  <div>
                    <canvas id="hostages_data_display" aria-label="hostages graph" role="img" style="position: relative; height: 8%; width:8%%;">
                      <p></p>
                    </canvas>
                  </div>
                  <div>
                    <p><small class="subtitle">Hostages</small></p>
                  </div>
                </div>
                <div id="conversation_points_div" class="border">
                  <p>Conversation Points:</p>
                  <p id="conversationPointsP"></p>
                </div>
                <div id="threat_level_div" class="border">
                  <p>Threat Level</p>
                  <div class="progress">
                    <div class="progress-bar bg-warning" id="threatbar" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="7"></div>
                  </div>
                  <p><span style="float: left;">S</span><span style="float:right;">K</span></p>
                </div>
                <table class="table border">
                  <thead>
                    <tr>
                      <td class="border">Phase 1</td>
                      <td class="border">Phase 2</td>
                      <td class="border">Phase 3</td>
                    </tr>
                  </thead>
                </table>
                <table class="table border">
                  <thead>
                    <tr>
                      <td class='border' id="maininterface"></td>
                    </tr>
                  </thead>
                </table>
              </td>
            </thead>
          </table>
        </div>
        <div id="rightside" class="col-3">
          <table class="table border">
            <thead>
              <td id="diceroller">
                <h3>Dice Roller</h3>
                <div id="view">
                  <div id="dice">
                    <div class="diceFace front">1:</div>
                    <div class="diceFace right">2:</div>
                    <div class="diceFace back">3:</div>
                    <div class="diceFace left">4: <p>2 Cards</p>
                    </div>
                    <div class="diceFace top">5: <p>Success</p>
                    </div>
                    <div class="diceFace bottom">6: <p>Success</p>
                    </div>
                  </div>
                </div>
                <div id="view2">
                  <div id="dice2">
                    <div class="diceFace front">1:</div>
                    <div class="diceFace right">2:</div>
                    <div class="diceFace back">3:</div>
                    <div class="diceFace left">4: <p>2 Cards</p>
                    </div>
                    <div class="diceFace top">5: <p>Success</p>
                    </div>
                    <div class="diceFace bottom">6: <p>Success</p>
                    </div>
                  </div>
                </div>
                <div id="view3">
                  <div id="dice3">
                    <div class="diceFace front">1:</div>
                    <div class="diceFace right">2:</div>
                    <div class="diceFace back">3:</div>
                    <div class="diceFace left">4: <p>2 Cards</p>
                    </div>
                    <div class="diceFace top">5: <p>Success</p>
                    </div>
                    <div class="diceFace bottom">6: <p>Success</p>
                    </div>
                  </div>
                </div>
                <div id="view4">
                  <div id="dice4">
                    <div class="diceFace front">1:</div>
                    <div class="diceFace right">2:</div>
                    <div class="diceFace back">3:</div>
                    <div class="diceFace left">4: <p>2 Cards</p>
                    </div>
                    <div class="diceFace top">5: <p>Success</p>
                    </div>
                    <div class="diceFace bottom">6: <p>Success</p>
                    </div>
                  </div>
                </div>
                <div id="view5">
                  <div id="dice5">
                    <div class="diceFace front">1:</div>
                    <div class="diceFace right">2:</div>
                    <div class="diceFace back">3:</div>
                    <div class="diceFace left">4: <p>2 Cards</p>
                    </div>
                    <div class="diceFace top">5: <p>Success</p>
                    </div>
                    <div class="diceFace bottom">6: <p>Success</p>
                    </div>
                  </div>
                </div>
                <p>
                  <button onclick="rolldice()" id="rollbutton">Roll</button> <button onclick="moredice()" id="onemoredice"> +1 Die</button> <button onclick="lessdice()" id="onelessdice"> -1 Die</button>
                </p>
              </td>
            </thead>
            <tbody>
              <tr>
                <td id="cards">
                  <h3>Actions</h3>
                  <table class="table table-bordered innertable">
                    <thead>
                      <tr>
                        <th class="border" id="cardtablehead"><button class="button btn-sm btn-secondary" id="prevCard" value="previous" onclick="prevCard()">
                            << </button> <span id="titleOfCard"></span> <button id="nextCard" class="button btn-sm btn-secondary" value="Next" onclick="nextCard()">>></button></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>
                          <p>Cost: <span id="costOfCard"></span></p>
                          <p>On 2 successes: <span id="bigSuccessOutcome"></span></p>
                          <p>On 1 success: <span id="littleSuccessOutcome"></span></p>
                          <p>Failure: <span id="failureOutcome"></span></p>
                          <p>In Hand: <span id="isInHand"></span></p>
                          <p> <button id="playCard" onclick="playthiscard()">Play Card</button> <button id="sacrificeCard" onclick="sacrifice()">Sacrifice for 1 CP</button> <button id="buyCard">Buy Card</button></p>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <script type="text/javascript" src="conversationcards.js"></script>
  <script src="./scripts/helper/Chart.js"></script>
  <script src="./scripts/helper/typewriter.js"></script>
  <script src="./scripts/helper/moment.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script>
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
    //show splash screen
    window.onload = function() {
      $('#titleofgame').addClass('textappear')
      $('#splash').addClass('titlecarddisappear')
    }

    // create variables
    let numberofdice
    let conversationcards = []
    let hand = [1, 2, 3, 4, 5, 6, 18]
    let discards = []
    let available = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20]
    let cardnumber = 0
    let hostagedataset = [1, 0, 0]
    let demandsingame = []
    let nextdemandcard = 1
    let timeleft = 10
    updatetimeleft()
    let terroringame = []
    prepareterror()
    let threat = 6
    updatethreat()
    let conversationpoints = 0
    $('#conversationPointsP').html(conversationpoints)

    //random number generator
    function getrandomint(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    //set up terror for play
    function prepareterror() {
      for (i = 0; i < 10; i++) {
        let randomcard = getrandomint(1, terror.length)
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
    async function updatethreat() {
      let threatpercentage = (threat / 7) * 100
      console.log(threatpercentage)
      $('#threatbar').css("width", threatpercentage + "%")
      if (threatpercentage > 100) {
        let newhostageskilled = Math.round(((threatpercentage / 100) * 7) - 7)
        alterData(0, -newhostageskilled, +newhostageskilled)
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
        console.log(Math.round((threatpercentage / -100) * 7))
        let newhostagessaved = Math.round((threatpercentage / -100) * 7)
        alterData(+newhostagessaved, -newhostagessaved, 0)
        threatpercentage = 0
        numberofdice = 3
        await delayanimation(showdice, 1000)
      }
    }

    //time left to complete game update
    function updatetimeleft() {
      $('#turnsleft').html('<strong>Turns remaining: ' + timeleft + "</strong>")
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
      hostagedataset[0] += saved
      hostagedataset[1] += alive
      hostagedataset[2] += dead
      hostagechart.update()
    }

    // Creates the view for the conversation cards (bottom right)
    function setCard() {
      let currentcard = conversationcards[cardnumber]
      $('#cardnumber').empty()
      $('#cardnumber').append(currentcard.id)
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
      $('#isInHand').empty()
      $('#isInHand').append('Available to buy')
      for (id in hand) {
        if (Number(hand[id]) === currentcard.id) {
          $('#isInHand').empty()
          $('#isInHand').append('Yes')
        }
      }
      if (discards.includes(currentcard.id)) {
        $('#isInHand').empty()
        $('#isInHand').append('Discarded')
      }
    }

    //arrows to scroll through cards
    function nextCard() {
      if (cardnumber === 19) {
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
        $('#dice').removeClass('spintofront spintotop spintoback spintoleft spintoright spintobottom')
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

    async function playthiscard() {
      for (var i = 0; i < hand.length; i++) {
        if (hand[i] === cardnumber + 1) {
          await discards.push(hand[i])
          hand.splice(i, 1)
          setCard()
          diceresults = rolldice()
          let successes = 0
          //count successes
          for (i = 0; i < numberofdice; i++) {
            if (diceresults[i] > 4) {
              successes += 1
            }
          }
          //check outcome
          if (successes > 1) {
            await delayanimation(cardbigsuccess, 2000)
          } else if (successes === 1) {
            await delayanimation(cardsmallsuccess, 2000)
          } else {
            await delayanimation(cardfail, 2000)
          }
        }
      }
    }

    function cardbigsuccess() {
      let outcome = conversationcards[cardnumber]['bigSuccess']
      if ("conversationpoints" in outcome) {
        conversationpoints += parseInt(outcome['conversationpoints'])
        $('#conversationPointsP').html(conversationpoints)
      }
      if ("threat" in outcome) {
        threat += parseInt(outcome['threat'])
        updatethreat()
      }
      if ("hostage" in outcome) {
        alterData(parseInt(outcome['hostage']), -parseInt(outcome['hostage']), 0)
      }
      if ("demand" in outcome) {
        $('#demand' + nextdemandcard).addClass("flip-card-toggled")
        nextdemandcard += 1
      }
      if (outcome['abductorkilled']) {

      }
    }

    function cardsmallsuccess() {
      let outcome = conversationcards[cardnumber]['smallSuccess']
      if ("conversationpoints" in outcome) {
        conversationpoints += parseInt(outcome['conversationpoints'])
        $('#conversationPointsP').html(conversationpoints)
      }
      if ("threat" in outcome) {
        threat += parseInt(outcome['threat'])
        updatethreat()
      }
      if ("hostage" in outcome) {
        alterData(parseInt(outcome['hostage']), -parseInt(outcome['hostage']), 0)
      }
      if ("demand" in outcome) {
        $('#demand' + nextdemandcard).addClass("flip-card-toggled")
        nextdemandcard += 1
      }
      if (outcome['abductorkilled']) {

      }
    }

    function cardfail() {
      let outcome = conversationcards[cardnumber]['failure']
      if ("conversationpoints" in outcome) {
        conversationpoints += parseInt(outcome['conversationpoints'])
        $('#conversationPointsP').html(conversationpoints)
      }
      if ("threat" in outcome) {
        threat += parseInt(outcome['threat'])
        updatethreat()
      }
      if ("hostage" in outcome) {
        alterData(0, -parseInt(outcome['hostage']), parseInt(outcome['hostage']))
      }
      if ("demand" in outcome) {

      }
      if (outcome['abductorkilled']) {

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
        $("#dice").addClass('spintofront')
      } else if (randomnumberondie === 2) {
        $("#dice").addClass('spintoleft')
      } else if (randomnumberondie === 3) {
        $("#dice").addClass('spintoback')
      } else if (randomnumberondie === 4) {
        $("#dice").addClass('spintoright')
      } else if (randomnumberondie === 5) {
        $("#dice").addClass('spintobottom')
      } else {
        $("#dice").addClass('spintotop')
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
      $("#dice").removeClass('spintofront spintoback spintoleft spintoright spintotop spintobottom')
      $("#dice").addClass('roll')
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
      $("#dice").removeClass('roll')
      $("#dice2").removeClass('roll')
      $("#dice3").removeClass('roll')
      $("#dice4").removeClass('roll')
      $("#dice5").removeClass('roll')
    }
  </script>
</body>

</html>