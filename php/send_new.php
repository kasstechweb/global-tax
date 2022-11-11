<?php

header('Access-Control-Allow-Origin: *');


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
if(isset($_POST['email']) && $_POST['email'] != ''){
//Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->getSentMIMEMEssage();                                            //Send using SMTP
        $mail->Host       = 'smtp-relay.sendinblue.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'gtaxapp@employerservice.ca';                     //SMTP username
        $mail->Password   = '1nBOavYgPWXct4Nb';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('gtaxapp@employerservice.ca');
        $mail->addAddress('kasstechweb@gmail.com');               //Add a recipient
        $mail->addReplyTo($_POST['email']);

        //Attachments
        $check_attachments = '';
        if(isset($_FILES["files"])){
            $check_attachments = 'Please see the attachments with this email';
            foreach ($_FILES["files"]["error"] as $key => $error) {
                if ($error == UPLOAD_ERR_OK) {
                    $tmp_name = $_FILES["files"]["tmp_name"][$key];
                    // basename() may prevent filesystem traversal attacks;
                    // further validation/sanitation of the filename may be appropriate
                    $name = basename($_FILES["files"]["name"][$key]);
                    $uploaddir = __DIR__. "/uploads/";
                    $uploadfile = $uploaddir . $name;

                    if (move_uploaded_file($tmp_name, $uploadfile)) {
                        $mail->addAttachment($uploadfile);
                    }
                }
            }
        }else {
            $check_attachments = 'There is no attachemtns with this email';
        }

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'New message from Global Tax App';
        $comp = $_POST['company']?$_POST['company']:'';
        $body ='
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0;">
      <meta name="format-detection" content="telephone=no"/>
      <style>
         /* Reset styles */ 
         body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
         body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
         table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
         img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
         #outlook a { padding: 0; }
         .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
         .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
         /* Rounded corners for advanced mail clients only */ 
         @media all and (min-width: 560px) {
         .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px; }
         }
         @media only screen and (max-width: 665px) {
         .col-md {
         width:100%!important;
         }
         }
         /* Set color for auto links (addresses, dates, etc.) */ 
         a, a:hover {
         color: #FFFFFF!important;
         }
         .footer a, .footer a:hover {
         color: #828999;
         }
         .box {
         
         /*   height: 10rem;
         width: 10rem; */
         padding: 0.5rem 0.2rem;
         margin-bottom: 0.5rem;
         color: #fff!important;
         }
         .card {
         background: #424242;
         border: 0px;
         border-radius: 0.3rem;
         width: 100%;
         }
         .col-md {
         width:48%;
         float:left;
         margin: 0 0.3rem;
         }
         * {
         box-sizing: border-box;
         }
         /* Create two equal columns that floats next to each other */
         .column {
         float: left;
         width: 50%;
         padding: 10px;
         }
         /* Clear floats after the columns */
         .row:after {
         content: "";
         display: table;
         clear: both;
         }
         fieldset{
          margin-bottom:1rem
        }
        .im {
           color: #FFFFFF !important;
        }
      </style>
      <!-- MESSAGE SUBJECT -->
      <title>New message from Global Tax App</title>
   </head>
   <!-- BODY -->
   <!-- Set message background color (twice) and text color (twice) -->
   <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #2D3445;
      color: #FFFFFF;"
      bgcolor="#2D3445"
      text="#FFFFFF">
      <!-- SECTION / BACKGROUND -->
      <!-- Set message background color one again -->
      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
         <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
               bgcolor="#2D3445">
               <!-- WRAPPER -->
               <!-- Set wrapper width (twice) -->
               <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;" class="wrapper">
                  <tr>
                     <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 20px;
                        padding-bottom: 20px;">
                        <!-- PREHEADER -->
                        <!-- Set text color to background color -->
                        <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
                           color: #2D3445;" class="preheader">
                           '. $_POST['msg'] .'
                        </div>
                     </td>
                  </tr>
                  <!-- HEADER -->
                  <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                  <tr>
                     <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;  padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                        padding-top: 5px;
                        color: #FFFFFF;
                        font-family: sans-serif;" class="header">
                        New message from Global Tax App
                     </td>
                  </tr>
                  <!-- PARAGRAPH -->
                  <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                  <tr>
                     <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 15px; 
                        color: #FFFFFF;
                        font-family: sans-serif;" class="paragraph">
                        <fieldset style="border: 1px solid #565F73">
                           <legend style="color: #828999;">Personal Details</legend>
                           <div class="container">
                              <div class="row">
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Name:&nbsp;'. $_POST['name'] .'
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Company:&nbsp;'. $comp .'
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              <div class="row">
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Phone:&nbsp;'. $_POST['phone'] .'
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Email:&nbsp;'. $_POST['email'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              <div class="row">
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          SIN #:&nbsp;'. $_POST['sin'] .'
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Date of birth:&nbsp;'. $_POST['dob'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              <div class="row">
                                 <div class="">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Address:&nbsp;'. $_POST['address'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </fieldset>
                     </td>
                  </tr>
                  <tr>
                     <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        color: #FFFFFF;
                        font-family: sans-serif;" class="paragraph">
                        <fieldset style="border: 1px solid #565F73">
                           <legend style="color: #828999;">Marital Status and Spouse</legend>
                           <div class="container">
                              <div class="row">
                                 <div class="">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Marital Status:&nbsp;'. $_POST['marital_status'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>';
                              if($_POST['marital_status'] == 'Married'){
                                  $body .= '<div class="row">
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Spouse Name:&nbsp;'. $_POST['spouse_name'] .'
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Spouse SIN #:&nbsp;'. $_POST['spouse_sin'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>
                             <div class="row">
                                 <div class="col-md">
                                    <div class="row justify-content-center">
                                       <div class="box shadow">
                                          Spouse DOB:&nbsp;'. $_POST['spouse_dob'] .'
                                       </div>
                                    </div>
                                 </div>
                              </div>';
                              }else {
                                  $body .= '<span style="color: #828999;">No spouse added, user is not married</span>';
                              }
                              $body .='
                              
                           </div>
                        </fieldset>
                     </td>
                  </tr>
                  <tr>
                     <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        color: #FFFFFF;
                        font-family: sans-serif;" class="paragraph">
                        <fieldset style="border: 1px solid #565F73">
                           <legend style="color: #828999;">Children </legend>
                           <div class="container">
                           ';
        $children_names = json_decode($_POST['children_names']);
        if(isset($children_names) && !empty($children_names)){
            $children_dob = json_decode($_POST['children_dob']);
            $data = '';
            foreach ($children_names as $index => $name){
                $body .= '<div class="row">
                         <div class="col-md">
                            <div class="row justify-content-center">
                               <div class="box shadow">';
                $body .=  'Child #1 Name:&nbsp;'. $name;
                $body .= '</div>
                    </div>
                 </div>
                 <div class="col-md">
                    <div class="row justify-content-center">
                       <div class="box shadow">';
                $body .= 'Child #1 DOB:&nbsp;'. convert_dates($children_dob[$index]);
                $body .= '</div>
                        </div>
                     </div>
                  </div>';
            }
        }else {
            $body .= '<span style="color: #828999;">No Children added</span>';
        }

$body .='
                           </div>
                        </fieldset>
                     </td>
                  </tr>
                  <tr>
                     <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 15px; 
                        color: #FFFFFF;
                        font-family: sans-serif;" class="paragraph">Message:&nbsp;'. $_POST['msg'] .'</td>
                  </tr>
                  <!-- LINE -->
                  <!-- Set line color -->
                  <tr>
                     <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 30px;" class="line">
                        <hr
                           color="#565F73" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                     </td>
                  </tr>
                  <!-- FOOTER -->
                  <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                  <tr>
                     <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                        padding-top: 10px;
                        color: #828999;
                        font-family: sans-serif;" class="footer">
                        Attachments:&nbsp;'. $check_attachments .'
                     </td>
                  </tr>
                  <tr>
                     <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                        padding-bottom: 20px;
                        color: #828999;
                        font-family: sans-serif;" class="footer">
                        Time&nbsp;:&nbsp;'. date('l jS \of F Y h:i:s A') .' 
                     </td>
                  </tr>
                  <!-- End of WRAPPER -->
               </table>
               <!-- End of SECTION / BACKGROUND -->
            </td>
         </tr>
      </table>
   </body>
</html>';

        $mail->Body    = $body;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        if(isset($_FILES["files"])){
            foreach ($_FILES["files"]["error"] as $key => $error) {
                if ($error == UPLOAD_ERR_OK) {
                    $tmp_name = $_FILES["files"]["tmp_name"][$key];
                    $name = basename($_FILES["files"]["name"][$key]);
                    $uploaddir = __DIR__. "/uploads/";
                    $uploadfile = $uploaddir . $name;
                    unlink($uploadfile);
                }
            }

        }
        $data =  'Message has been sent';
    } catch (Exception $e) {
        $data = "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
    echo json_encode(array('_body' => $data));
}else {
    echo json_encode(array('_body' => 'no post'));
}


function convert_dates($original_date){
    // Creating timestamp from given date
    $timestamp = strtotime($original_date);

// Creating new date format from that timestamp
    $new_date = date("F j, Y", $timestamp);
    return $new_date;
}