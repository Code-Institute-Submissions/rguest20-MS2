<?php session_start(); /* Starts the session */

if (!isset($_SESSION['UserData']['Username'])) {
    header("location:login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

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
    <p>This game displays best on a tablet/desktop</p>
    <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <div id="landscape">
    <div class="jumbotron" id='splash'>
      <div id="titleofgame">
        <h2>NEGOTIATION! Beta</h2>
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
                <h4 id="turnsleft"></h4>
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
                        <p id='demand1cost'></p>
                        <p><span id='demand1reward'></span></p>
                        <p id='demand1penalty'></p>
                        <button class="btn btn-primary btn-sm concedebutton" id="concedebutton1" onclick="events.pressconcede1()">Concede</button>
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
                        <p id='demand2cost'></p>
                        <p id='demand2reward'></p>
                        <p id='demand2penalty'></p>
                        <button class="btn btn-primary btn-sm concedebutton" id="concedebutton2" onclick="events.pressconcede2()">Concede</button>
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
                      <td class="border" id="phase1bar">Phase 1<br>Play Actions<br><button class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" id="endphase1" onclick="events.phasetwo()">End Phase</button></td>
                      <td class="border" id="phase2bar">Phase 2<br>Buy New Actions<br><button class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" id="endphase2" onclick="events.phasethree()">End Phase</button></td>
                      <td class="border" id="phase3bar">Phase 3<br>Terror</td>
                    </tr>
                  </thead>
                </table>
                <table class="table border">
                  <thead>
                    <tr>
                      <td class='border' id="maininterface">
                        <p>TEXT TO GO HERE TO DESCRIBE HOW GAME IS PROGRESSING</p>
                        <p>This is not available yet, but will be once the game is out of beta</p>
                        <p>NOT REQUIRED FOR FUNCTIONALITY</p>
                      </td>
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
                <h3 id="titlediceroller">Dice Roller</h3>
                <div id="view1">
                  <div id="dice1">
                    <div class="diceFace front">1</div>
                    <div class="diceFace right">2</div>
                    <div class="diceFace back">3</div>
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"></p>
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
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"></p>
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
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"></p>
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
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"></p>
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
                    <div class="diceFace left">4<p class="fourondice"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"><img src="assets/silhouette.png" alt="card" height = "20" width = "15"></p>
                    </div>
                    <div class="diceFace top">5 <p class="fiveorsix">&#x2729;</p>
                    </div>
                    <div class="diceFace bottom">6 <p class="fiveorsix">&#x2729;</p>
                    </div>
                  </div>
                </div>
                <div>
                </div>
                <button onclick="conversationcards[events.currentcard].acceptcard()" id="playcard" class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Accept Roll</button> <button onclick="modals.fourtofivepopup()" id="fourtofivebutton" class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Convert 4 to 5</button> <span id="fourtofivetrueorfalse"></span>
              </td>
            </thead>
            <tbody>
              <tr>
                <td id="cards">
                  <h3 id="actiontitle">Actions</h3>
                  <div id="playphasebuttons"> <button id="playcardinhand" onclick="conversationcards[events.currentcard].playcard()" class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Play Card</button> <button id="sacrificecardinhand" onclick="conversationcards[events.currentcard].sacrifice()" class="border border-orange-500 bg-orange-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline">Sacrifice for 1 CP</button> </div>
                  <div id="buyphasebuttons"><button id="buycardtohand" onclick="conversationcards[events.currentcard].buy()" class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Buy Card</button>
                  </div>
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
                          <p>Cost: <span id="costOfCard"></span> <button id="freecardbutton" class="button btn-primary btn-sm" onclick="">Get Card For Free</button></p>
                          <table id="actioninformation" class="table table-borderless">
                            <tr>
                              <td>
                                <p id="twosuccesses">On 2 successes: <span id="bigSuccessOutcome"></span></p>
                                <p id="onesuccess">On 1 success: <span id="littleSuccessOutcome"></span></p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p id="failurewriteout">Failure: <span id="failureOutcome"></span></p>
                                <p id="inhand">In Hand: <span id="isInHand"></span></p>
                              </td>
                            </tr>
                          </table>
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
            <p>Pick two actions to discard to convert a 4 to a 5</p>
            <p id="4sto5smainbody"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Not This Time</button>
            <button type="button" class="btn btn-primary" onclick="modals.discardfourtofive()" id="discardbutton" data-dismiss="modal">Discard</button>
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
            <button type="button" class="btn btn-danger" onclick="events.currentterror.play()" id="acceptterror" data-dismiss="modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="winlosemodal" tabindex="-1" role="dialog" aria-labelledby="modal for displaying whether or not the game is won or lost" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="winorlose"></h2>
          </div>
          <div class="modal-body">
            <p id="winorloseflufftext"></p>
            <p>
              Number of hostages saved = <span id="howmanyhostagessaved"></span><br>
              Number of hostages killed = <span id="howmanyhostageskilled"></span><br>
              Abductor in custody/killed = <span id="abductoralive"></span>
            </p>
            <p></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="" id="alldone" data-dismiss="">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>How to win</h3>
            <p>Negotiation is a solitaire game where you play the role of a hostage negotiator trying to bring an abductor in along with as many hostages as you can. To win you must not only take in the abductor, but also resolve the fates of as many
              hostages as you can. </p>
            <h3>How to lose</h3>
            <p>If, at any time, the abductor escapes or time runs out, you have lost.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#instructionsmodal2">Your Interface</button> <button type="button" class="btn btn-primary"
              data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal2" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>Interface</h3>
            <h5>Hostages</h5>
            <p>This bar will tell you how many hostages there are, how many you have saved and how many you have failed to save.</p>
            <h5>Conversation Points</h5>
            <p>Conversation points are used to buy extra more powerful actions. This represents the back and forth between the negotiator and the abductor as you work towards your ultimate goal. Each turn, these will refresh to zero, so use the
              points wisely to buy cards.</p>
            <h5>Threat</h5>
            <p>This bar represents the frustrations of the abductor. If this fills and more threat is added, hostages will die. If, however, you can empty this bar and reduce threat further then hostages may be let go. At high threats, your number of
              dice will decrease, whereas at low threat you will have more dice and thus more leverage to get your actions to work.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#instructionsmodal3">Actions and Dice</button> <button type="button" class="btn btn-primary"
              data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal3" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>Actions and Dice</h3>
            <h5>Playing Actions</h5>
            <p> On the right of the screen there are actions that you can select by using the &lt;&lt; and &gt;&gt; buttons. You will notice that there are different outcomes based on the number of successes you get. Once you play an action the dice
              will roll and on a &#x2729; you will obtain 1 success.</p>
            <p> If you get <img src="assets/silhouette.png" alt="card" height="20px" width="17px"><img src="assets/silhouette.png" alt="card" height="20" width="15">, then you can convert
              this to a success by discarding 2 actions. Either way, once you have done this, click 'accept roll' to continue </p>
            <h5>Discarding Actions</h5>
            <p>You can also discard an action to gain 1 conversation point. This is a key ability and I highly recommend you use it!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#instructionsmodal4">Demands</button> <button type="button" class="btn btn-primary" data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal4" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>Demands</h3>
            <h5>Flipping Demands</h5>
            <p> On the left of the screen there are 2 demands that your abductor has. Before you can see what these are you must flip the demand by playing an appropriate card.</p>
            <h5>Conceding Demands</h5>
            <p>You can concede the demand by clicking 'concede' if you have enough conversation points. This will give you a powerful one off benefit, but will come with a long term drawback. I suggest you use this sparingly.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#instructionsmodal5">Buying Actions</button> <button type="button" class="btn btn-primary"
              data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal5" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>Buying Actions</h3>
            <h5>Ending the play phase</h5>
            <p>To end the play phase, click "end phase" below the play phase. This will put you into the buy phase of the game</p>
            <h5>Buying cards</h5>
            <p>To buy an action, navigate to it and click 'buy'. This will work if you have enough conversation points and if the action was not used this round.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#instructionsmodal6">Terror</button> <button type="button" class="btn btn-primary" data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="instructionsmodal6" tabindex="-1" role="dialog" aria-labelledby="modal for giving instructions" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2>How to play</h2>
          </div>
          <div class="modal-body">
            <h3>Terror</h3>
            <h5>Ending the buy phase</h5>
            <p>To end the buy phase, click "end phase" below the buy phase. This will put you into the terror phase of the game</p>
            <h5>End of turn</h5>
            <p>At this point the abductor will respond with a terror event and time will tick down. These can throw a spanner in the works of some of your best plans, so be prepared.</p>
            <h2> Best Of Luck, Cap!!!</h2>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Quit</button>
          </div>
        </div>
      </div>
    </div>
    <div id="fireworks">
      <canvas id="canvas">canvas is not supported</canvas>
    </div>
  </div>
  <p id="logout"><a href="logout.php">Click here</a> to Logout.</p>
  <div id="credits">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <button id="instructionsbutton" class="button btn-secondary btn-sm" data-toggle="modal" data-target="#instructionsmodal">Instructions</button>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="./scripts/helper/Chart.js"></script>
  <script src="./scripts/player.js"></script>
  <script src="./scripts/demandcard.js"></script>
  <script src="./scripts/viewhandler.js"></script>
  <script src="./scripts/hostagetaker.js"></script>
  <script src="./scripts/dice.js"></script>
  <script src="./scripts/terrorcards.js"></script>
  <script src="./scripts/threat.js"></script>
  <script src="./scripts/helper/fireworks.js"></script>
  <script src="./scripts/modals.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script src="scripts/conversationcards.js"></script>
  <script src="scripts/script.js"></script>
</body>

</html>
