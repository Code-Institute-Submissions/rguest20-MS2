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
  <link href="./css/style2.css" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>

<body>
  <div id="portrait">
    <h1>Please Rotate Your Device To Play</h1>
    <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <div id="landscape">
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
              <td id="interfaceinside">Interface</td>
            </thead>
          </table>
        </div>
        <div id="rightside" class="col-3">
          <table class="table border">
            <thead>
              <td id="diceroller"><h3 class="subtitle">Dice Roller</h3>
                <div id="view">
                  <div id="dice">
                    <div class="diceFace" id="front">Front</div>
                    <div class="diceFace" id="right">Right</div>
                    <div class="diceFace" id="back">Back</div>
                    <div class="diceFace" id="left">Left</div>
                    <div class="diceFace" id="top">Top</div>
                    <div class="diceFace" id="bottom">Bottom</div>
                  </div>
                </div>
                <button onclick="rollme()" id="rollbutton">Roll</button>
              </td>
            </thead>
            <tbody>
              <tr>
                <td id="cards">Cards</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p><a href="logout.php">Click here</a> to Logout.</p>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script>
  function randomised6(){
    let randomnumber = Math.ceil (Math.random() * 6)
    return randomnumber
  }

  async function rollme(){
  let randomnumberondie = randomised6()
  preparedie()
  await delayanimation()
  //needs tidying up//
  if (randomnumberondie === 1){
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

  function delayanimation(){
    let waittime = new Promise(function(resolve){
      resolve(setTimeout(removeroll, 2000))
    })
  }

  function preparedie(){
    $("#dice").removeClass('spintofront')
    $("#dice").removeClass('spintoback')
    $("#dice").removeClass('spintoleft')
    $("#dice").removeClass('spintoright')
    $("#dice").removeClass('spintotop')
    $("#dice").removeClass('spintobottom')
    $("#dice").addClass('roll')
    $('#rollbutton').prop('disabled', true);
  }

  function removeroll(){
    $('#rollbutton').prop('disabled', false);
    $("#dice").removeClass('roll')
  }

  </script>
</body>

</html>
