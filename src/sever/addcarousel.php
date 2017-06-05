<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$json = $_POST['newCarousel'];
		$data = json_decode($json, true);

		$sql = "INSERT INTO `carouselnews`(`carouseltype`, `carouseltitle`, `carouselsrc`, `carouseltime`, `carouselimg`) VALUES ('{$data["carouseltype"]}','{$data["carouseltitle"]}','{$data["carouselsrc"]}','{$data["carouseltime"]}','{$data["carouselimg"]}')";

		$result = mysqli_query($link, $sql);
		
	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>