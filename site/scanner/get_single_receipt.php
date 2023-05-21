<?php
// echo  dirname(__FILE__) . '\temp2.png';
    header('Access-Control-Allow-Origin: *');
    require('db.php');
    
    if (isset($_REQUEST['user_id'])) {

        $user_id = stripslashes($_REQUEST['user_id']);    // removes backslashes
        $user_id = mysqli_real_escape_string($con, $user_id);

        $receipt_id = stripslashes($_REQUEST['receipt_id']);    // removes backslashes
        $receipt_id = mysqli_real_escape_string($con, $receipt_id);
        // $user_id = 65;
        // $receipt_id = 29;

        // $query    = "SELECT * FROM `receipts` WHERE `user_id`='$user_id'";
        $query = "SELECT * FROM `receipts` WHERE `id`=$receipt_id AND `user_id`=$user_id LIMIT 1";
        $result = mysqli_query($con, $query) or die(mysql_error());
        
        if ($row = mysqli_fetch_array($result)) {
            echo json_encode(array('data' => $row)) ;
        }

    }
?>
