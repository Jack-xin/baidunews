<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {

		$carouseltype = $_GET['carouseltype'];

		if ($carouseltype) {
			// 前端按类型输出
			$sql = "SELECT * FROM `carouselnews` WHERE `carouseltype` = '{$carouseltype}' ORDER BY `carouseltime` DESC LIMIT 0, 3";

			$result = mysqli_query($link, $sql);

			$arr = array();
			while ($rows = mysqli_fetch_array($result, MYSQL_ASSOC)) {
			 	$count = count($rows);

			 	for ($i = 0; $i < $count; $i++) { 
			 		unset($rows[$i]);
			 	}

			 	array_push($arr, $rows);
			} 
			// sleep(1);
			echo json_encode($arr);
		} else {

			// 后台输出新闻列表
			$sql = "SELECT * FROM carouselnews";

			$result = mysqli_query($link, $sql);

			$arr = array();
			while ($rows = mysqli_fetch_array($result, MYSQL_ASSOC)) {
			 	$count = count($rows);

			 	for ($i = 0; $i < $count; $i++) { 
			 		unset($rows[$i]);
			 	}

			 	array_push($arr, $rows);
			} 

			echo json_encode($arr);
		}
		
	} else {
		echo "faild";
		exit();
	}

	mysqli_close($link);

?>