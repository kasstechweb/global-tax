<?php
// echo  dirname(__FILE__) . '\temp2.png';
    header('Access-Control-Allow-Origin: *');
    require('db.php');
    
    if (isset($_REQUEST['user_id'])) {

        $last_id = 0;

        $user_id = stripslashes($_REQUEST['user_id']);    // removes backslashes
        $user_id = mysqli_real_escape_string($con, $user_id);

        // $name = stripslashes($_REQUEST['logo_text']);    // removes backslashes
        // $name = mysqli_real_escape_string($con, $name);

        // $amount_before_tax = stripslashes($_REQUEST['subtotal']);    // removes backslashes
        // $amount_before_tax = mysqli_real_escape_string($con, $amount_before_tax);

        // $tax_amount = stripslashes($_REQUEST['gst']);    // removes backslashes
        // $tax_amount = mysqli_real_escape_string($con, $tax_amount);

        // $amount_after_tax = stripslashes($_REQUEST['total']);    // removes backslashes
        // $amount_after_tax = mysqli_real_escape_string($con, $amount_after_tax);

        // $query    = "SELECT * FROM `receipts` WHERE `user_id`='$user_id'";
        $query_last_id = "SELECT id FROM `receipts` ORDER BY id DESC LIMIT 1";
        $result_last_id = mysqli_query($con, $query_last_id) or die(mysql_error());
        // $last_id = '';
        if ($row = mysqli_fetch_array($result_last_id)) {
            if($row['id'] != ""){
                $last_id = $row['id'];
            }
            // echo json_encode(array('id' => $row['id'])) ;
        }
        
        // var_dump($last_id);
        // $user_id = 65;
        // $name = 'test';
        // $amount_before_tax = 33;
        // $tax_amount = 10;
        // $amount_after_tax = 44;

        // =============================== save the img =============================
        $image = '/media/' . ($last_id + 1) . '.jpg';

        // $imgData = str_replace(' ','+',$_POST['image']);
        // $imgData =  substr($imgData,strpos($imgData,",")+1);
        // $imgData = base64_decode($imgData);
        // // Path where the image is going to be saved
        // $filePath = dirname(__FILE__) . $image;
        // // Write $imgData into the image file
        // $file = fopen($filePath, 'w');
        // fwrite($file, $imgData);
        // fclose($file);
        // ============================ End save ================================

        // $user_id = 67;

        $verify_client_id = '';
        $verify_auth_username = '';
        $verify_auth_apikey = '';

        // get user api keys
        $query_user = "SELECT * FROM `users` WHERE `id`='$user_id' LIMIT 1";
        $result_user = mysqli_query($con, $query_user) or die(mysql_error());
        // $last_id = '';
        if ($row = mysqli_fetch_array($result_user)) {
            // if($row['id'] != ""){
            $verify_client_id = $row['verify_client_id'];
            $verify_auth_username = $row['verify_auth_username'];
            $verify_auth_apikey = $row['verify_auth_apikey'];
                // print_r($row);
                // $last_id = $row['id'];
            // }
            // echo json_encode(array('id' => $row['id'])) ;
        }
        // echo $verify_auth_apikey;
        // echo json_encode(array('user_id'=>$user_id,'verify_client_id' => $verify_client_id, 'verify_auth_username'=>$verify_auth_username, 'verify_auth_apikey'=>$verify_auth_apikey));
        // get data from verify // change file_url
        $full_img_url = 'https://employerservice.ca/gtax_receipt_scanner' . $image;
        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.veryfi.com/api/v8/partner/documents",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode([
            'file_url' => $full_img_url,
            'auto_delete' => true
        ]),
        CURLOPT_HTTPHEADER => [
            "Accept: application/json",
            "CLIENT-ID: $verify_client_id",
            "Content-Type: application/json",
            // "X-VERYFI-REQUEST-SIGNATURE: 4dcPUMTMDBf4IgPFlu1dw5zJO31FCj23hZUn6rGFeoIHhBDi2J6v5CLjNilmPSIiIK1zelhZMOoBkKDBLsmWTKch1cfvfKmOm8wM1KFk3dCsAPUo9yrEjGDx0N3wLb1m",
            "AUTHORIZATION: apikey $verify_auth_username:$verify_auth_apikey",
            "Accept: application/json",
            "X-VERYFI-REQUEST-TIMESTAMP: "
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        
        // if ($err) {
        // echo "cURL Error #:" . $err;
        // } else {
        // echo $response;
        // }
        // $response = [
        //         "account_number" => null,
        //         "bill_to" => [
        //             "address" => null,
        //             "name" => null,
        //             "parsed_address" => null,
        //             "vat_number" => null,
        //         ],
        //         "cashback" => null,
        //         "category" => "Meals & Entertainment",
        //         "created_date" => "2023-05-07 19:33:33",
        //         "currency_code" => "USD",
        //         "date" => "2004-10-31 20:21:00",
        //         "delivery_date" => null,
        //         "discount" => null,
        //         "document_reference_number" => "2004-10-31",
        //         "document_title" => null,
        //         "document_type" => "receipt",
        //         "due_date" => null,
        //         "duplicate_of" => null,
        //         "external_id" => null,
        //         "id" => 134844440,
        //         "img_file_name" => "134844440.png",
        //         "img_thumbnail_url" => null,
        //         "img_url" => null,
        //         "insurance" => null,
        //         "invoice_number" => "98",
        //         "is_duplicate" => false,
        //         "is_money_in" => false,
        //         "line_items" => [
        //             [
        //                 "date" => null,
        //                 "description" => "98 Meat Pty XChz
        //     Counter-Eat In",
        //                 "discount" => null,
        //                 "discount_rate" => null,
        //                 "end_date" => null,
        //                 "id" => 565732696,
        //                 "order" => 0,
        //                 "price" => null,
        //                 "quantity" => 1,
        //                 "reference" => null,
        //                 "section" => null,
        //                 "sku" => null,
        //                 "start_date" => null,
        //                 "tags" => [],
        //                 "tax" => null,
        //                 "tax_rate" => null,
        //                 "text" => "98 Meat Pty XChz
        //     Counter-Eat In",
        //                 "total" => null,
        //                 "type" => "food",
        //                 "unit_of_measure" => null,
        //                 "upc" => null,
        //             ],
        //         ],
        //         "meta" => [
        //             "owner" => "maxwebphp",
        //             "processed_pages" => 1,
        //             "source" => "api",
        //             "total_pages" => 1,
        //         ],
        //         "notes" => null,
        //         "ocr_text" => "2004-10-31
            
        //     YOUR GUEST NUMBER IS
        //         98
        //     IN-N-OUT BURGER LAS VEGAS EASTERN
        //     2004-10-31		8:21 PM
        //     165 15 98
        //     Cashier: SAM
        //     GUEST #: 98
        //     Counter-Eat In
        //     Dbibl
        //     98 Meat Pty XChz
        //     Counter-Eat In
        //     TAX 7.50%
        //     Amount Due		97.66
        //     CASH TENDER		$97.66
        //     Change			$.00
        //     2004-10-31
        //     THANK YOU!",
        //         "order_date" => null,
        //         "payment" => [
        //             "card_number" => null,
        //             "display_name" => "Cash",
        //             "terms" => null,
        //             "type" => "cash",
        //         ],
        //         "pdf_url" => null,
        //         "purchase_order_number" => null,
        //         "reference_number" => "VBBGI-44440",
        //         "rounding" => null,
        //         "service_end_date" => null,
        //         "service_start_date" => null,
        //         "ship_date" => null,
        //         "ship_to" => ["address" => null, "name" => null, "parsed_address" => null],
        //         "shipping" => null,
        //         "store_number" => "165",
        //         "subtotal" => 97.66,
        //         "tags" => [],
        //         "tax" => 7.5,
        //         "tax_lines" => [
        //             [
        //                 "base" => null,
        //                 "name" => null,
        //                 "order" => 0,
        //                 "rate" => null,
        //                 "total" => 7.5,
        //             ],
        //         ],
        //         "tip" => null,
        //         "total" => 97.66,
        //         "total_weight" => null,
        //         "tracking_number" => null,
        //         "updated_date" => "2023-05-07 19:33:33",
        //         "vendor" => [
        //             "abn_number" => null,
        //             "account_number" => null,
        //             "address" => null,
        //             "bank_name" => null,
        //             "bank_number" => null,
        //             "bank_swift" => null,
        //             "category" => "Fast Food",
        //             "email" => null,
        //             "fax_number" => null,
        //             "iban" => null,
        //             "lat" => null,
        //             "lng" => null,
        //             "logo" => "https://cdn.veryfi.com/logos/us/949103001.png",
        //             "name" => "In-n-out Burger",
        //             "phone_number" => "15 98",
        //             "raw_address" => null,
        //             "raw_name" => "In-N-Out Burger",
        //             "reg_number" => null,
        //             "type" => "Fast Food",
        //             "vat_number" => null,
        //             "web" => null,
        //         ],
        //     ];
        $response = json_decode($response);
        // echo json_encode( $response);
        // $subtotal = $response['subtotal'];
        // $tax = $response['tax'];
        // $total = $response['total'];
        // $logo = $response['vendor']['logo'];
        // $name = $response['vendor']['name'];
        $subtotal = $response->subtotal;
        $tax = $response->tax;
        $total = $response->total;
        $logo = $response->vendor->logo;
        $name = $response->vendor->name;

        $query = "INSERT into `receipts` (`user_id`, `name`, `image`, `subtotal`, `tax`, `total`, `logo`)
        VALUES ('$user_id', '$name', '$image', '$subtotal', '$tax', '$total', '$logo')";

        if (mysqli_query($con, $query)) {
            $inserted_id = mysqli_insert_id($con);
            // echo json_encode(array('inserted_id' => $inserted_id));
        }
        // $data = array();
        // while ($row = mysqli_fetch_assoc($result))
        // {
        //     array_push($data, $row);
        // }            
        // echo json_encode(array('_body' => 'Login success.', 'data' => $data));
        // $response = json_encode($response);
        echo json_encode(array('result' => $response, 'inserted_id' => $inserted_id));
    }
?>
