<?php
include "connect.php";
header("Content-Type: application/json; charset=UTF-8");

$getAll = $conn->prepare("SELECT * FROM items  WHERE Approve = 1 ORDER BY ItemID DESC ");
$getAll->execute();
$all = $getAll->fetchAll();

echo json_encode($all);
?>