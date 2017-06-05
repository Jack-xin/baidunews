<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['newNews'];
		$data = json_decode($json, true);

		$sql = "INSERT INTO `subscribe`(`listvalue`, `listindex`, `listsrc`, `listtime`) VALUES ('{$data["listvalue"]}','{$data["listindex"]}','{$data["listsrc"]}','{$data["listtime"]}')";

		$result = mysqli_query($link, $sql);
		
	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>