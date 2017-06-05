<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');
	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['update']; 
		$updatedata = json_decode($json, true);

		$sql = "UPDATE `subscribe` SET `listvalue` = '{$updatedata["listvalue"]}',`listsrc` = '{$updatedata["listsrc"]}',`listtime` = '{$updatedata["listtime"]}',`listindex` = '{$updatedata["listindex"]}' WHERE `id` = '{$updatedata["listid"]}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>