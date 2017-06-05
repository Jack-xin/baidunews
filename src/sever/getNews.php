<?php
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {

		$newstype = $_GET['newstype'];

		if ($newstype) {
			// 前端按类型输出

			// 获取新闻总量
			$newsdata = mysqli_query($link, "SELECT COUNT(*) AS count FROM `news` WHERE `newstype` = '{$newstype}'");
			$totalnews = mysqli_fetch_array($newsdata, MYSQL_ASSOC);

			$pagesize = 10;        //每页获取新闻的数量
			$page = 1;             //默认从第一页开始
			$count = ceil($totalnews['count'] / $pagesize);  //总页数

			if (!isset($_GET['page'])) {
				$page = 1;
			} else {
				// 重置页数
				$page = $_GET['page'];
				if ($page > $count) {
					$page = $count;
					$pagesize = 0;
				}
			}

			// 返回总页数
			echo $count;

			// 获取新闻开始变量
			$limit = ($page - 1) * $pagesize;

			// 获取数据新闻数据
			$sql = "SELECT * FROM `news` WHERE `newstype` = '{$newstype}' ORDER BY `newstime` DESC LIMIT {$limit}, {$pagesize}";

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
			$sql = "SELECT * FROM news";

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