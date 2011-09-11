<?php
header('Content-type: application/json; charset=utf-8');
require "info.php";
require_once '../SDK/API_Config.php';
require_once '../SDK/OpenTokSDK.php';

if($_POST['comm'] == 'login') {
	$user_name = $_POST['user_name'];

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
	 *  PHP Talks to MySQL
	 *  1) Check last time session was created
	 *  	A) if longer than 6hrs
	 *  		A.1
	 *  		- create new session
	 *  		A.2
	 *  		- add user to user_table
	 *  		A.3
	 *  		- add user to session
	 *  	B) if less than 6hrs
	 *  		B.1
	 *  		- add user to user_table
	 *  		B.2
	 *  		- add user to session
	 *  2) Check all user's last_access, if more than 10 minutes (600 seconds), remove them	
	 */
	
	# 1
	$session_birth_request = "SELECT * FROM BB_SESSION_TABLE ORDER BY session_id DESC LIMIT 1";
	$session_birth_request = submit_info($session_birth_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($session_birth_request)) || array_pop($rows));
	foreach ($rows as $row):
		$session_id =  "{$row['session_id']}";
		$session_birth = "{$row['session_birth']}";
		$tokBox_id = "{$row['session_tb_id']}";
		$tok_box_token = "{$row['session_tb_token']}";
	endforeach;
	
	
	
	# B
	if(time() - $session_birth < 21600 /*6hrs in seconds*/) {
		# B.1
		$curr_time = time();
		$add_user = "INSERT INTO BB_USER(user_name, user_stage, user_cycle, user_attach, bullets, points, last_access) 
					VALUES('$user_name','0','0','0','1','0', '$curr_time')";
		submit_info($add_user, $connection, false);
		$user_id = mysql_insert_id($connection);
		# B.2
		$user_to_session = "INSERT INTO BB_SESSION_X_USER(session_id, user_id) VALUES('$session_id','$user_id')";
		submit_info($user_to_session, $connection, false);
	}
	# A
	else if(time() - $session_birth >= 21600) {
		/**
	 	* Create the TokBox variables
	 	*/
		$tok_apiObj = new OpenTokSDK(API_Config::API_KEY, API_Config::API_SECRET);
		//echo"opentokSDK problem?<br />";
		//echo $_SERVER["REMOTE_ADDR"];
		$tok_session = $tok_apiObj->create_session($_SERVER["REMOTE_ADDR"]);
		//echo"session has been created<br />";
		$tokBox_id = (string) $tok_session->getSessionId();
		$tok_box_token = $tok_apiObj->generate_token();
		
		# A.1
		$curr_time = time();
		$create_session = "INSERT INTO BB_SESSION_TABLE(session_birth, session_tb_token, session_tb_id) VALUES('$curr_time','$tok_box_token','$tokBox_id')";
		submit_info($create_session, $connection, false);
		$session_id = mysql_insert_id($connection);
		# A.2
		$add_user = "INSERT INTO BB_USER(user_name, user_stage, user_cycle, user_attach, bullets, points, last_access) VALUES('$user_name','0','0','0','1','0', '$curr_time')";
		submit_info($add_user, $connection, false);
		$user_id = mysql_insert_id($connection);
		# A.3
		$user_to_session = "INSERT INTO BB_SESSION_X_USER(session_id, user_id) VALUES('$session_id','$user_id')";
		submit_info($user_to_session, $connection, false);
	}
	
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	$arr = array("err"=>'none', "session_id"=>$session_id, "user_id"=>$user_id, "tb_id"=>$tokBox_id, "tb_token"=>$tok_box_token);
	$output = json_encode($arr);
	echo $output;
}

//else {
//	$arr = array("err"=>'err');
//	$output = json_encode($arr);
//	echo $output;
//}

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