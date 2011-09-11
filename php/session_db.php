<?php
ignore_user_abort(TRUE);

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

	$s_id = $_GET['s_id'];
	$u_id = $_GET['u_id'];
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
	 * A) Remove user from session (via make sess_id negative in BB_SESSION_X_USER)
	 */
	
	# A
	$update_request = "UPDATE BB_SESSION_X_USER 
						SET session_id='-".$s_id."' 
						WHERE user_id='".$u_id."'";
	$update_request = submit_info($update_request, $connection, false);
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);


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