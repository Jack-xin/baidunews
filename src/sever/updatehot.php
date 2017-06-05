<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');
	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['update']; 
		$updatedata = json_decode($json, true);

		$sql = "UPDATE `hotnews` SET `hottype` = '{$updatedata["hottype"]}',`hottitle` = '{$updatedata["hottitle"]}',`hotsrc` = '{$updatedata["hotsrc"]}',`hottime` = '{$updatedata["hottime"]}' WHERE `id` = '{$updatedata["hotid"]}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>