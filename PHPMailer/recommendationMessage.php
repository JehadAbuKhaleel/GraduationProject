<?php 
include 'dbconfig.php';
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
$result = file_get_contents('php://input');
$obj = json_decode($result,true);
$email = $obj['email'];
$pas='';
    $sql = "SELECT password FROM user_details  WHERE email='$email'";
 
    $result = $con->query($sql);
     
    if ($result->num_rows >0) {
     while($row = $result->fetch_assoc()) {
     $pas = $row['password'];
     }
    }
    else {echo json_encode("Email Not Found ! \n Please make sure your email address is correct
        ");
        return;
}
    $result = "";
    require 'PHPMailerAutoload.php';
    $mail = new PHPMailer;

    $mail->isSMTP(); // send as HTML
    $mail->Host = "smtp.gmail.com"; // SMTP servers
    $mail->SMTPAuth = true; // turn on SMTP authentication
    $mail->Username = "JehadAssignment@gmail.com"; // Your mail
    $mail->Password = 'jehad12345'; // Your password mail
    $mail->Port = 587; //specify SMTP Port
    $mail->SMTPSecure = 'tls';                               
    //$mail->setFrom("JehadAssignment@gmail.com");
    $mail->addAddress($email);
    

    //$mail->addReplyTo('JehadAssignment@gmail.com');
    $mail->isHTML(true);
    $mail->Subject=$pas;
    $mail->Body='<h3>Your password is: <br>  </p>';
'</h3>';
    if(!$mail->send())
    {
        $result = "Something went worng. Please try again.";
    }
    else 
    {
        $result="The password has been sent to your E-mail, please check your E-mail";
        
    }
echo json_encode($result)
?>