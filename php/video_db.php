<?php
header('Content-type: application/json; charset=utf-8');
require "info.php";

/*
 * Project:     BangBang
 * Description: A multiplayer telepresence stragegy-based web game
 * Website:     http://ezraezraezra.com/bangbang
 * 
 * Author:      Ezra Velazquez
 * Website:     http://ezraezraezra.com
 * Date:        May 2011
 * 
 */

if($_POST['comm'] == 'remove') {
	$session_id = $_POST['session_id'];
	$user_id = $_POST['user_id'];
	$opponent_id = $_POST['opponent_id'];
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
	 * A) Remove opponent from current session (put opponent in session 1)
	 */
	/*
	$remove_request = "UPDATE BB_SESSION_X_USER 
						SET session_id = '1' 
						WHERE user_id = '".$opponent_id."'";
	*/
	$remove_request = "UPDATE BB_SESSION_X_USER 
						SET session_id = '-".$session_id."' 
						WHERE user_id = '".$opponent_id."'";
	$remove_request = submit_info($remove_request, $connection, false);
	
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

?>