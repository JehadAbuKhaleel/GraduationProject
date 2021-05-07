<?php

// PHP program to connect with 
// localserver database 
$user = 'root';
$password = '';
$database = 'db';
$servername = 'localhost';

$mysqli = new mysqli(
    $servername,
    $user,
    $password,
    $database
);

if ($mysqli->connect_error) {
    die('Connect Error (' .
        $mysqli->connect_errno . ') ' .
        $mysqli->connect_error);
}

// SQL query to select data 
// from database 
$sql2 = "SELECT * FROM signup";
$result = $mysqli->query($sql2);

// Fetching data from the database 
// and storing in array of objects 
while ($row = $result->fetch_array()) {
    $compdata[] = array(
        "id" => $row["Id"],
        "name" => $row["UserName"],
        "email" => $row["Email"],
        "phone" => $row["phoneNumber"],
    );

}
$results= array(
    "results" => $compdata,
);

// Creating a dynamic JSON file 
$file = "./utils/mock/contactlistyyy.json";

// Converting data into JSON and putting 
// into the file 
// Checking for its creation 
if (file_put_contents(
    $file,
    json_encode($results)
));
else
    echo ("No Companies");

// Closing the database 
$mysqli->close();
