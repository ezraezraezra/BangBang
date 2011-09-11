<?php
header('Content-type: application/json; charset=utf-8');
require "info.php";

if($_POST['comm'] == 'ws-info') {
	$session_id = $_POST['session_id'];
	$user_id = $_POST['user_id'];
	/**
	 * Connecting to database
	 */
	$connection = mysql_connect($hostname, $user, $pwd);
	if(!$connection) {
		die("Error ".mysql_errno()." : ".mysql_error());
	}
	$db_selected = mysql_select_db($database, $connection);
	if(!$db_selected) {
		die("Error ".mysql_errno()." : ".mysql_error());
	}
	
	/**
	 * PHP Talks to MySQL
	 * A) Get all users in a session
	 * B) FUTURE: Get rid of old users before sending user info to client
	 * C) In session, detach users who haven't been active in the last 10 minutes (600 secs)
	 */
	//$users_request = "SELECT BB_USER.user_id, user_name FROM BB_USER, BB_SESSION_X_USER WHERE session_id = 1 AND BB_USER.user_id = BB_SESSION_X_USER.user_id";
	$curr_time = time();
	$old_time = $curr_time - 600;
	$users_request = "SELECT BB_USER.user_id, user_name, BB_USER.user_stage 
					FROM BB_USER, BB_SESSION_X_USER WHERE session_id = '".$session_id."' 
					AND BB_USER.user_id = BB_SESSION_X_USER.user_id 
					AND last_access > '".$old_time."' 
					AND last_access < '".$curr_time."'
					AND BB_USER.user_id NOT IN (SELECT user_id FROM BB_USER WHERE user_id = '".$user_id."')
					ORDER BY BB_USER.user_id ASC"; //DESC";// LIMIT 5";
	$users_request = submit_info($users_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($users_request)) || array_pop($rows));
	$index = 0;
	$users_id[0] = "meh";
	$user_name = "";
	foreach ($rows as $row):
		$users_id[$index] =  "{$row['user_id']}";
		$user_name[$index] = "{$row['user_name']}";
		$user_stage[$index] = "{$row['user_stage']}";
		$index = $index + 1;
	endforeach;
	
	
	
	
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	if($users_id[0] != 'meh') {
	
	$arr = array("err"=>'none', "users_id"=>$users_id, "users_name"=>$user_name, "users_stage"=>$user_stage);
	$output = json_encode($arr);
	echo $output;
	}
	else {
		$arr = array("err"=>'error');//, "users_id"=>'1', "users_name"=>'problem');
		$output = json_encode($arr);
		echo $output;
	}
}

if($_POST['comm'] == 'reset') {
	$u_id = $_POST['u_id'];
	$u_num = (int) $_POST['u_num'];
	
	/**
	 * Connecting to database
	 */
	$connection = mysql_connect($hostname, $user, $pwd);
	if(!$connection) {
		die("Error ".mysql_errno()." : ".mysql_error());
	}
	$db_selected = mysql_select_db($database, $connection);
	if(!$db_selected) {
		die("Error ".mysql_errno()." : ".mysql_error());
	}
	
	/**
	 * PHP Talks to MySQL
	 * A) Reset the following parameters:
	 * 		user_stage = 0
	 * 		user_cycle = 0
	 * 		bullets = 1
	 * 		points = 0
	 * 		last_access = time()
	 * B) Remove user's row from BB_BATTLE
	 */
	# A
	$reset_statement = "UPDATE BB_USER 
						SET user_stage='0', user_cycle='0', bullets='1', points='0' 
						WHERE user_id = '".$u_id."'";
	$reset_statement = submit_info($reset_statement, $connection, true);
	# B
	if($u_num == 1) {
		$reset_row = "SELECT user_id_A, user_id_B FROM BB_BATTLE WHERE user_id_A='".$u_id."'"; 
	}
	else {
		$reset_row = "SELECT user_id_A, user_id_B FROM BB_BATTLE WHERE user_id_B='".$u_id."'"; 
	}
	$reset_row = submit_info($reset_row, $connection, true);
	while(($rows[] = mysql_fetch_assoc($reset_row)) || array_pop($rows));
	foreach ($rows as $row):
		$user_id_A =  "{$row['user_id_A']}";
		$user_id_B = "{$row['user_id_B']}";
	endforeach;
	$reset_row = "UPDATE BB_BATTLE SET user_id_A='-".$user_id_A."', user_id_B='-".$user_id_B."' WHERE user_id_A='".$user_id_A."'";
	$reset_row = submit_info($reset_row, $connection, true);
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	$arr = array("err"=>'none');
	$output = json_encode($arr);
	echo $output;
	
}

function submit_info($data, $conn, $return) {
	$result = mysql_query($data,$conn);
	if(!$result) {
		die("Error ".mysql_errno()." : ".mysql_error());
	}
	else if($return == true) {
		return $result;
	}
}