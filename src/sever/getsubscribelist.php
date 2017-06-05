<?php
	require 'config.php';

	mysqli_set_charset ($link,'utf8');

	$sql = 'SELECT * FROM subscribe';

	$result = mysqli_query($link, $sql);

	if ($link) {
		//成功执行
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
		echo "faild";
		exit();
	}

	mysqli_close($link);
?>