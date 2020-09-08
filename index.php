<?php session_start(); /* Starts the session */

if (!isset($_SESSION['UserData']['Username'])) {
    header("location:login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en-US">

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
                  <div>
                    <p id="secondincommanddemand"></p>
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
                      <td class="border" id="phase1bar">Phase 1<br>Play Actions<br><button class="button btn-success" id="endphase1" onclick="phase2initialise()">End Phase</button></td>
                      <td class="border" id="phase2bar">Phase 2<br>Buy New Actions<br><button class="button btn-success" id="endphase2" onclick="phase3initialise()">End Phase</button></td>
                      <td class="border" id="phase3bar">Phase 3<br>Terror</td>
                    </tr>
                  </thead>
                </table>
                <table class="table border">
                  <thead>
                    <tr>
                      <td class='border' id="maininterface"> TEXT TO GO HERE TO DESCRIBE HOW GAME IS PROGRESSING</td>
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
                <div id="view1">
                  <div id="dice1">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"></p>
                    </div>
                    <div class="diceFace top">5<p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6<p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <div id="view2">
                  <div id="dice2">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"></p>
                    </div>
                    <div class="diceFace top">5<p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6<p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <div id="view3">
                  <div id="dice3">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"></p>
                    </div>
                    <div class="diceFace top">5<p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6<p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <div id="view4">
                  <div id="dice4">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4 <p class="fourondice"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"></p>
                    </div>
                    <div class="diceFace top">5 <p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6 <p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <div id="view5">
                  <div id="dice5">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4 <p class="fourondice"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20px" width="17px"></p>
                    </div>
                    <div class="diceFace top">5 <p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6 <p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <p>
                  <button onclick="playthiscardend()" id="playcard">Accept Roll</button> <button onclick="fourtofivemodalpopup()" id="fourtofivebutton">Convert 4 to 5</button> <span id="fourtofivetrueorfalse"></span> <button onclick=""
                    id="reroll">Reroll</button>
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
                          <p id="playphasebuttons"> <button id="playcardinhand" onclick="playthiscard()">Play Card</button> <button id="sacrificecardinhand" onclick="sacrifice()">Sacrifice for 1 CP</button> </p>
                          <p id="buyphasebuttons"><button id="buycardtohand" onclick="buyacard()">Buy Card</button>
                          </p>
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
    <div class="modal fade" id="4to5modal" tabindex="-1" role="dialog" aria-labelledby="modal for changing dice results" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Convert 4's to 5's</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Pick two cards to discard to convert a 4 to a 5</p>
            <p id="4sto5smainbody"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Not This Time</button>
            <button type="button" class="btn btn-primary" onclick="discardfourtofive()" id="discardbutton" data-dismiss="modal">Discard</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="terrormodal" tabindex="-1" role="dialog" aria-labelledby="modal for displaying terror cards" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="terrormodaltitle">Terror Phase!</h3>
          </div>
          <div class="modal-body">
            <h5 id="terrortitle"></h5>
            <p>Effect: <span id="terroreffect"></span></p>
            <p id="whathappened"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" onclick="terrorplay()" id="acceptterror" data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="winlosemodal" tabindex="-1" role="dialog" aria-labelledby="modal for displaying whether or not the game is won or lost" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="winorlose"></h2>
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p id="winorloseflufftext"></p>
            <p id="terroreffect">
              Number of hostages saved = <span id="howmanyhostagessaved"></span><br>
              Number of hostages killed = <span id="howmanyhostageskilled"></span><br>
              Abductor in custody/killed = <span id="abductoralive"></span>
            </p>
            <p id="whathappened"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="" id="acceptterror" data-dismiss="">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <div id="fireworks">
      <canvas id="canvas">canvas is not supported</canvas>
    </div>
  </div>
  <p><a href="logout.php">Click here</a> to Logout.</p>
  <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>
  <script src="./scripts/helper/Chart.js"></script>
  <script src="./scripts/helper/typewriter.js"></script>
  <script src="./scripts/helper/moment.min.js"></script>
  <script src="./scripts/helper/fireworks.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script type="text/javascript" src="scripts/conversationcards.js"></script>
  <script type="text/javascript" src="scripts/script.js"></script>
</body>

</html>