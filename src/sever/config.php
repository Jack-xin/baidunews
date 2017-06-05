<?php
	header('Content-type: application/json; charset=utf-8');

	$servername = "localhost";  
	$username = "root";  
	$password = "qweasd";  
	$dbname = "baidunews";  

	$link = mysqli_connect($servername, $username, $password, $dbname);  

?>