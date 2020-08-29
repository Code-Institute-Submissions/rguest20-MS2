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
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
    <div class = "jumbotron" id = 'splash' >
      <div id="titleofgame">
        <h2>NEGOTIATION!</h2>
        <h5>A Game Of Saving Lives</h5>
      </div>
    </div>
    <div id="negotiationwrapper" class="row">
      <div id="negotiationwindow" class="col-12 row">
        <div id="leftside" class="col-3">
          <table class="table border">
            <thead>
              <td id="hostagetakerwindow">Hostage Taker</td>
            </thead>
            <tbody>
              <tr>
                <td id="demands">Demands</td>
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
                    <canvas id="hostages_data_display" aria-label="hostages map" role="img" style="position: relative; height: 8%; width:8%%;">
                      <p></p>
                    </canvas>
                  </div>
                  <div>
                    <p><small class="subtitle">Hostages</small></p>
                  </div>
                </div>
                <div id="conversation_points_div" class="border">
                  <p>Conversation Points:</p>
                  <p id="conversationPointsP">0</p>
                </div>
                <div id="threat_level_div" class="border">
                  <p>Threat Level</p>
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="3" aria-valuemin="0" aria-valuemax="10"></div>
                  </div>
                  <p><span style = "float: left;">1</span><span style = "float:right;">10</span></p>
                </div>
                <table class = "table border">
                  <thead>
                    <tr>
                      <td class = "border">Phase 1</td><td class = "border">Phase 2</td><td class = "border">Phase 3</td>
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
                <button onclick="rolldice()" id="rollbutton">Roll</button>
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
                          <p> <button id="playCard">Play Card</button> <button id="sacrificeCard">Sacrifice for 1 CP</button></p>
                          <p> <button id="buyCard">Buy Card</button>
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
    <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <script type="text/javascript" src="conversationcards.js"></script>
  <script src="./scripts/helper/Chart.js"></script>
  <script src="./scripts/helper/moment.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script>
    //initialize conversation cards
    function ConversationCard(id, title, cost, bigSuccess, smallSuccess, failure, endTurn) {
      this.id = id
      this.title = title
      this.cost = cost
      this.bigSuccess = bigSuccess
      this.smallSuccess = smallSuccess
      this.failure = failure
      this.endTurnIf = endTurn
    }

    //initilize
    let hand = [1, 2, 3, 4, 5, 6]
    let conversationcards = []
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
      data[card]['smallSuccessHostageRelease'] != "0" ? smallSuccessForCard.hostage = data[card]['smallSuccessHostageRelease'] : true
      data[card]['smallSuccess4to5'] === "true" ? smallSuccessForCard.fourtofive = true : true
      data[card]['smallSuccessRevealDemand'] === "true" ? smallSuccessForCard.demand = true : true
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
    window.onload = function(){
      $('#titleofgame').addClass('textappear')
      $('#splash').addClass('titlecarddisappear')
    }
//create chart for interface
    var ctx = $('#hostages_data_display');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Unknown',
          'Alive',
          'Dead',
        ],
        datasets: [{
          data: [1, 0, 0],
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
      $('#isInHand').append('No')
      for (id in hand) {
        if (Number(hand[id]) === currentcard.id) {
          $('#isInHand').empty()
          $('#isInHand').append('Yes')
        }
      }
    }

    // allow player to scroll through conversation cards
    let cardnumber = 0
    setCard()

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


    //functions to roll the dice for the game
    function randomised6() {
      let randomnumber = Math.ceil(Math.random() * 6)
      return randomnumber
    }

    function rolldice() {
      rolldie1()
      rolldie2()
    }

    async function rolldie1() {
      let randomnumberondie = randomised6()
      preparedie()
      await delayanimation()
      //needs tidying up//
      if (randomnumberondie === 1) {
        $("#dice").addClass('spintofront')
      } else if (randomnumberondie === 2) {
        $("#dice").addClass('spintoleft')
      } else if (randomnumberondie === 3) {
        $("#dice").addClass('spintoback')
      } else if (randomnumberondie === 4) {
        $("#dice").addClass('spintoright')
      } else if (randomnumberondie === 5) {
        $("#dice").addClass('spintotop')
      } else {
        $("#dice").addClass('spintobottom')
      }
    }

    async function rolldie2() {
      let randomnumberondie = randomised6()
      $("#dice2").addClass('roll')
      await delayanimation()
      //needs tidying up//
      if (randomnumberondie === 1) {
        $("#dice2").addClass('spintofront')
      } else if (randomnumberondie === 2) {
        $("#dice2").addClass('spintoleft')
      } else if (randomnumberondie === 3) {
        $("#dice2").addClass('spintoback')
      } else if (randomnumberondie === 4) {
        $("#dice2").addClass('spintoright')
      } else if (randomnumberondie === 5) {
        $("#dice2").addClass('spintotop')
      } else {
        $("#dice2").addClass('spintobottom')
      }
    }

    function delayanimation() {
      let waittime = new Promise(function(resolve) {
        resolve(setTimeout(removeroll, 2000))
      })
    }

    function preparedie() {
      $("#dice").removeClass('spintofront')
      $("#dice").removeClass('spintoback')
      $("#dice").removeClass('spintoleft')
      $("#dice").removeClass('spintoright')
      $("#dice").removeClass('spintotop')
      $("#dice").removeClass('spintobottom')
      $("#dice").addClass('roll')
      $("#dice2").removeClass('spintofront')
      $("#dice2").removeClass('spintoback')
      $("#dice2").removeClass('spintoleft')
      $("#dice2").removeClass('spintoright')
      $("#dice2").removeClass('spintotop')
      $("#dice2").removeClass('spintobottom')
      $('#rollbutton').prop('disabled', true);
    }

    function removeroll() {
      $('#rollbutton').prop('disabled', false);
      $("#dice").removeClass('roll')
      $("#dice2").removeClass('roll')
    }
  </script>
</body>

</html>
