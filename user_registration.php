<?php
 
// Importing DBConfig.php file.
include 'dbconfig.php';
 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
 // Populate User name from JSON $obj array and store into $name.
$name = $obj['name'];
 
// Populate User phone from JSON $obj array and store into $phone.
$phone = $obj['phone'];
 
// Populate Password from JSON $obj array and store into $password.
$password = $obj['password'];
$ia = $obj['ia'];
$email = $obj['email'];

//Checking phone is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM user_details WHERE phone='$phone' or email='$email'";
 
// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
 
if(isset($check)){
 
 $PhoneExistMSG = 'PhoneNumber OR Email Already Exist, Please Try Again !!!';
 
 // Converting the message into JSON format.
$PhoneExistJson = json_encode($PhoneExistMSG);
 
// Echo the message.
 echo $PhoneExistJson ; 
 
 }
 else{
 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into user_details (name,phone,password,email,ia) values ('$name','$phone','$password','$email','$ia')";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'User Registered Successfully' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 }
 mysqli_close($con);
