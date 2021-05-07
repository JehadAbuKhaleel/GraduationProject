<?php
include 'dbconfig.php';
 
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
$sql = "SELECT comp_name FROM new_items";
 
$result = $conn->query($sql);
 
if ($result->num_rows >0) {
 while($row = $result->fetch_assoc()) {
 $json = json_encode($row);
 
 }
    $sql = "DELETE FROM new_items";
    $conn->query($sql);
} else {
 $json = "false";
}
 echo $json;
$conn->close();
