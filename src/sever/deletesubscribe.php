<?php
	require 'config.php';

	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$del_list = $_POST['del_listvalue'];
		
		$sql = "DELETE FROM `subscribe` WHERE `listvalue`='{$del_list}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>