<?php session_start(); /* Starts the session */

    /* Check Login form submitted */
    if (isset($_POST['Submit'])) {
        /* Define username and associated password array */
        $logins = array('Player' => 'code','player' => 'code');

        /* Check and assign submitted Username and Password to new variable */
        $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
        $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

        /* Check Username and Password existence in defined array */
        if (isset($logins[$Username]) && $logins[$Username] == $Password) {
            /* Success: Set session variables and redirect to Protected page  */
            $_SESSION['UserData']['Username']=$logins[$Username];
            header("location:index.php");
            exit;
        } else {
            /*Unsuccessful attempt: Set error message */
            $msg="<span style='color:red'>Invalid Login Details</span>";
        }
    }
?>
<!DOCTYPE html>
<html lang = "en">

<head>
  <meta charset="utf-8">
  <title>Disclaimer/Login</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link href="./css/style.css" rel="stylesheet">
</head>

<body>
  <div id="content" class="row">
    <div id="jumbotron" class="jumbotron col-12 offset-md-2 col-md-8">
      <h1 id="title">Milestone Project 2</h1>
      <p id="titlesub">This page is accessible by permission only. To obtain permission please email <a href="mailto:info@r-guest-developer.world">here</a></p>
      <br>
      <form method="post" name="login_form">
        <?php if (isset($msg)) {
    echo $msg;
}    ?>
        <h3>Access Control</h3>
        <div class="form-group">
          <label for="username"> Username</label>
          <input name="Username" type="text" class="form-control" value="Player" id="username">
        </div>
        <div class="form-group">
          <label for="password">Password is "code"</label>
          <input name="Password" type="password" class="form-control" id="password">
        </div>
        <input name="Submit" type="submit" value="Login" class="btn btn-primary">
      </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>

</html>
