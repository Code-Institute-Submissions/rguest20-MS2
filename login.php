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
<html>

<head>
	<meta charset="utf-8">
	<title>Disclaimer/Login</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
	<link href="./css/style.css" rel="stylesheet">
</head>

<body>
	<div id="Frame0">
		<h1>Milestone Project 2</h1>
		This page is accessible by permission only. To obtain permission please email <a href="mailto:info@r-guest-developer.world">here</a>

	</div>
	<br>
	<form action="" method="post" name="Login_Form">
		<?php if (isset($msg)) {
    echo $msg;
}
    ?>
		<tr>
			<td colspan="2" align="left" valign="top">
				<h3>Login</h3>
			</td>
		</tr>
		<tr>
			<td align="right" valign="top">Username</td>
			<td><input name="Username" type="text" class="Input" value="Player"></td>
		</tr>
		<tr>
			<td align="right">Password</td>
			<td><input name="Password" type="password" class="Input"></td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><input name="Submit" type="submit" value="Login" class="Button3"></td>
		</tr>
		</table>
	</form>
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>

</html>
