<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {

		$type = $_GET['hottype'];

		if ($type) {

			if ($type == 'hide') {
			// 默认只输出'推荐'类型
				$sql = "SELECT * FROM `hotnews` WHERE `hottype` = '推荐' ORDER BY `hottime` DESC LIMIT 0, 7";
			} else {
			// 前端按类型输出
				$sql = "SELECT * FROM `hotnews` WHERE `hottype` = '{$type}' ORDER BY `hottime` DESC LIMIT 0, 7";
			}
			
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
		} else {

			// 后台输出新闻列表
			$sql = "SELECT * FROM hotnews";

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