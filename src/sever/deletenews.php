<?php
	require 'config.php';

	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$del_news = $_POST['del_news_title'];
		
		$sql = "DELETE FROM `news` WHERE `newstitle`='{$del_news}'";

		$result = mysqli_query($link, $sql);

	} else {
		echo "sever faild";
		exit();
	}

	mysqli_close($link);
?>