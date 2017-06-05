<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['newNews'];
		$data = json_decode($json, true);

		$sql = "INSERT INTO `news`(`newstype`, `newstitle`, `newssrc`, `newstime`, `newshot`, `newsimg`, `flag`) VALUES ('{$data["newstype"]}','{$data["newstitle"]}','{$data["newssrc"]}','{$data["newstime"]}','{$data["newshot"]}','{$data["newsimg"]}','{$data["flag"]}')";

		$result = mysqli_query($link, $sql);
		
	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>