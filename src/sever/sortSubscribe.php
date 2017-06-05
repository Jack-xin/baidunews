<?php	
	require 'config.php';
	header('Content-type: text/html; charset=utf-8');

	mysqli_set_charset ($link,'utf8');

	if ($link) {
		$data = $_POST['newListIndex'];
		$newListIndex = json_decode($data, true);
		$num = count($newListIndex);

		foreach ($newListIndex as $key => $value) {

			$sql = "UPDATE `subscribe` SET `listindex`= '{$value}' WHERE `listvalue`='{$key}'";

			$result = mysqli_query($link, $sql);

		}

	} else {
		echo "faild";
		exit();
	}

	mysqli_close($link);
?>