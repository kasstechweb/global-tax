<?php
    header('Access-Control-Allow-Origin: *');
    require('db.php');
    // session_start();
    // When form submitted, check and create user session.
    if (isset($_REQUEST['user_id'])) {
        $user_id = stripslashes($_REQUEST['user_id']);    // removes backslashes
        $user_id = mysqli_real_escape_string($con, $user_id);
        // echo json_encode(array('_body' => md5($password)));
        // Check user is exist in the database
        $query    = "SELECT * FROM `receipts` WHERE `user_id`='$user_id'";
        $result = mysqli_query($con, $query) or die(mysql_error());
        // echo json_encode(array('_body' => $result));
        // $rows = mysqli_num_rows($result);
        $data = array();
        while ($row = mysqli_fetch_assoc($result))
        {
            // printf ("%s\n", $row['column_name_1']);
            // printf ("%s\n", $row['column_name_2']);
            // printf ("%s\n", $row['column_name_3']);
            array_push($data, $row);
        }
        // if ($row = mysqli_fetch_array($result)) {
            
        echo json_encode(array('_body' => 'Login success.', 'data' => $data));
            // $_SESSION['username'] = $username;
            // Redirect to user dashboard page
            // header("Location: dashboard.php");
        // } else {
        //     echo json_encode(array('_body' => 'Login not success.'));
            // echo "<div class='form'>
            //       <h3>Incorrect Username/password.</h3><br/>
            //       <p class='link'>Click here to <a href='login.php'>Login</a> again.</p>
            //       </div>";
        // }
    } else {

    }
?>
