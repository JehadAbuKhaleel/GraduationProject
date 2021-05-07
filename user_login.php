<?php
 
// Importing DBConfig.php file.
include 'dbconfig.php';
 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
 
// Populate User phone from JSON $obj array and store into $phone.
$phone = $obj['phone'];
 
// Populate Password from JSON $obj array and store into $password.
$password = $obj['password'];
 
//Checking phone is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM user_details WHERE phone='$phone'";
 
// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
 
if(isset($check)){
    $Sql_Query = mysqli_query($con, "SELECT phone,password FROM user_details WHERE phone='$phone' and password='$password'");
    if(mysqli_num_rows($Sql_Query) == 1){
 
        // If the record inserted successfully then show the message.
       $MSG = 'signed in successfully' ;
        
       // Converting the message into JSON format.
       $json = json_encode($MSG);
        
       // Echo the message.
        echo $json ;
        
        }
        else{
        
        $MSG = 'The phone number or password is incorrect !' ;
        
        // Converting the message into JSON format.
        $json = json_encode($MSG);
         
        // Echo the message.
         echo $json ;
        
        }
 }
 else{
    $PhoneExistMSG = 'Phone Number Not Exist, Please Sign Up !!!';
 
    // Converting the message into JSON format.
   $PhoneExistJson = json_encode($PhoneExistMSG);
    
   // Echo the message.
    echo $PhoneExistJson ;
 // Creating SQL query and insert the record into MySQL database table.

 }
 mysqli_close($con);
