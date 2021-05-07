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
$sql2 = "SELECT qr_id,company_name,product_name,PriceWithMargin FROM items";
$result = $mysqli->query($sql2);

// Fetching data from the database 
// and storing in array of objects 
while ($row = $result->fetch_array()) {
    $compdata[] = array(
        "company_name" => $row["company_name"],
        "product_name" => $row["product_name"],
        "PriceWithMargin" => $row["PriceWithMargin"],
        "qr_id" => $row["qr_id"],
    );

}
$results= array(
    "results" => $compdata,
);

// Creating a dynamic JSON file 
$file = "./utils/mock/itemsList.json";

// Converting data into JSON and putting 
// into the file 
// Checking for its creation 
if (file_put_contents(
    $file,
    json_encode($results)
));
else
    echo ("No Items");

// Closing the database 
$mysqli->close();
