<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['hotnews'];
		$data = json_decode($json, true);

		$sql = "INSERT INTO `hotnews`(`hottype`, `hottitle`, `hotsrc`, `hottime`) VALUES ('{$data["hottype"]}','{$data["hottitle"]}','{$data["hotsrc"]}','{$data["hottime"]}')";

		$result = mysqli_query($link, $sql);
		
	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>