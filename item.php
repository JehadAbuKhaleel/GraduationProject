<?php
include 'dbconfig.php';
 
// Create connection
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
 
// Populate User phone from JSON $obj array and store into $phone.
$data = $obj['data'];

if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
$sql = "SELECT * FROM items  WHERE qr_id='${data}'";
 
$result = $conn->query($sql);
 
if ($result->num_rows >0) {
    $sqlc = "UPDATE items SET count = count+1 WHERE qr_id='${data}'";
    $conn->query($sqlc);
 
 while($row = $result->fetch_assoc()) {
 
 $tem = $row;
 
 $json = json_encode($row);
 
 
 }
 
} else {
 echo "QR ID Not Exist !!!";
}
 echo $json;
$conn->close();
