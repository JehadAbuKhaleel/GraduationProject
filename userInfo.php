<?php
include 'dbconfig.php';
 
// Create connection
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
 
// Populate User phone from JSON $obj array and store into $phone.
$ph = $obj['ph'];

if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
$sql = "SELECT name,phone,password,ia FROM user_details  WHERE phone='${ph}'";
 
$result = $conn->query($sql);
 
if ($result->num_rows >0) {
 
 
 while($row = $result->fetch_assoc()) {
 
 $json = json_encode($row);

 }
 
} else {
 echo "User Phone Not Exist !!!";
}
 echo $json;
$conn->close();
