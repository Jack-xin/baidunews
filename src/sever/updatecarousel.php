<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');
	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['update']; 
		$updatedata = json_decode($json, true);

		$sql = "UPDATE `carouselnews` SET `carouseltype` = '{$updatedata["carouseltype"]}',`carouseltitle` = '{$updatedata["carouseltitle"]}',`carouselsrc` = '{$updatedata["carouselsrc"]}',`carouseltime` = '{$updatedata["carouseltime"]}',`carouselimg` = '{$updatedata["carouselimg"]}' WHERE `id` = '{$updatedata["carouselid"]}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>