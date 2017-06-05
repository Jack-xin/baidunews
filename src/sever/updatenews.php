<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');
	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['update']; 
		$updatedata = json_decode($json, true);

		$sql = "UPDATE `news` SET `newstype` = '{$updatedata["newstype"]}',`newstitle` = '{$updatedata["newstitle"]}',`newssrc` = '{$updatedata["newssrc"]}',`newstime` = '{$updatedata["newstime"]}',`newshot` = '{$updatedata["newshot"]}',`newsimg` = '{$updatedata["newsimg"]}',`flag` = '{$updatedata["flag"]}' WHERE `id` = '{$updatedata["newsid"]}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>