<?php
    header('Access-Control-Allow-Origin: *');
    require('db.php');
    // session_start();
    // When form submitted, check and create user session.
    if (isset($_REQUEST['email'])) {
        $email = stripslashes($_REQUEST['email']);    // removes backslashes
        $email = mysqli_real_escape_string($con, $email);
        $password = stripslashes($_REQUEST['password']);        
        $password = mysqli_real_escape_string($con, $password);
        // echo json_encode(array('_body' => md5($password)));
        // Check user is exist in the database
        $query    = "SELECT * FROM `users` WHERE `email`='$email'
                     AND `password`='" . md5($password) . "'";
        $result = mysqli_query($con, $query) or die(mysql_error());
        // echo json_encode(array('_body' => $result));
        // $rows = mysqli_num_rows($result);
        if ($row = mysqli_fetch_array($result)) {
            
            echo json_encode(array('_body' => 'Login success.', 'user_id' => $row[0], 'email' => $row[1]));
            // $_SESSION['username'] = $username;
            // Redirect to user dashboard page
            // header("Location: dashboard.php");
        } else {
            echo json_encode(array('_body' => 'Login not success.'));
            // echo "<div class='form'>
            //       <h3>Incorrect Username/password.</h3><br/>
            //       <p class='link'>Click here to <a href='login.php'>Login</a> again.</p>
            //       </div>";
        }
    } else {

    }
?>
