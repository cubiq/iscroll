<?php
//header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$start = isset($_GET['start']) ? (int)$_GET['start'] : 0;
$count = isset($_GET['count']) ? min((int)$_GET['count'], 2000) : 100;

$data = array();
for ( $i = $start; $i < $start+$count; $i++ ) {
	$data[] = $i;
}

echo json_encode($data);
