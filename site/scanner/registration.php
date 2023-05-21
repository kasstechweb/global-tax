<?php
    header('Access-Control-Allow-Origin: *');
    require('db.php');
    // When form submitted, insert values into the database.
    // try {
        if (isset($_REQUEST['email'])) {
            // removes backslashes
            // $username = stripslashes($_REQUEST['username']);
            //escapes special characters in a string
            // $username = mysqli_real_escape_string($con, $username);
            $email    = stripslashes($_REQUEST['email']);
            $email    = mysqli_real_escape_string($con, $email);
            $password = stripslashes($_REQUEST['password']);
            $password = mysqli_real_escape_string($con, $password);

            $verify_client_id    = stripslashes($_REQUEST['verify_client_id']);
            $verify_client_id    = mysqli_real_escape_string($con, $verify_client_id);
            $verify_auth_username    = stripslashes($_REQUEST['verify_auth_username']);
            $verify_auth_username    = mysqli_real_escape_string($con, $verify_auth_username);
            $verify_auth_apikey    = stripslashes($_REQUEST['verify_auth_apikey']);
            $verify_auth_apikey    = mysqli_real_escape_string($con, $verify_auth_apikey);

            $create_datetime = date("Y-m-d H:i:s");
            $query    = "INSERT into `users` (password, email, create_datetime, verify_client_id, verify_auth_username, verify_auth_apikey)
                        VALUES ('" . md5($password) . "', '$email', '$create_datetime', '$verify_client_id', '$verify_auth_username', '$verify_auth_apikey')";
            // $result   = mysqli_query($con, $query);
            // $data =  'Message has been sent';
            if (mysqli_query($con, $query)) {
                echo json_encode(array('_body' => 'You are registered successfully.'));
            } else {
                if(mysqli_errno($conn) == 1062)
                    echo json_encode(array('_body' => '$result'));
            }
        } else {
            echo json_encode(array('_body' => 'Required fields are missing.'));
        }
    // }  catch (Exception $e) {
    //     $data = "Error: {$e}";
    //     echo json_encode(array('_body' => $data));
    // }
    
?>
