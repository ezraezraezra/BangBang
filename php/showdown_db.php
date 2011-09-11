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

if($_POST['comm'] == 'vs') {
	$user_id = $_POST['u_id'];
	$opponent_id = $_POST['o_id'];
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
	 * A) Check is user was previously challenged. If not, go to (B)
	 * C) Put user VS opponent
	 * D) Mark both user & opponent busy
	 */
	# A
	/*
	$in_challenge_request = "SELECT COUNT(battle_level) FROM BB_BATTLE WHERE user_id_A='".$user_id."' OR user_id_B='".$user_id."'";
	$in_challenge_request = submit_info($in_challenge_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($in_challenge_request)) || array_pop($rows));
	foreach ($rows as $row):
		$count =  "{$row['COUNT']}";
	endforeach;
	
	# B
	if($count == 0) {
	*/	
	
	
	# C
	$setup_vs = "INSERT INTO BB_BATTLE(user_id_A, user_id_B, battle_level) VALUES('".$user_id."','".$opponent_id."','1')";
	$setup_vs = submit_info($setup_vs, $connection, false);
	//while(($rows[] = mysql_fetch_assoc($users_request)) || array_pop($rows));
	//$index = 0;
	//foreach ($rows as $row):
	//	$user_id[$index] =  "{$row['user_id']}";
	//	$user_name[$index] = "{$row['user_name']}";
	//	$index++;
	//endforeach;
	
	# D
	$busy_battling = "UPDATE BB_USER A, BB_USER B SET A.user_stage='1', B.user_stage='1' WHERE A.user_id='".$user_id."' AND B.user_id='".$opponent_id."'";
	$busy_battling = submit_info($busy_battling, $connection, false);
	
	
	$arr = array("err"=>'none');
	$output = json_encode($arr);
	/*}
	else {
		$arr = array("err"=>'already');
		$output = json_encode($arr);
	}*/
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	//$arr = array("err"=>'none');
	//$output = json_encode($arr);
	echo $output;
}

else if($_POST['comm'] == 'status') {
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
	 * A) Check is user should be in battle
	 */
	
	# A
	$status_request = "SELECT user_stage FROM BB_USER WHERE user_id = '".$user_id."'";
	$status_request = submit_info($status_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($status_request)) || array_pop($rows));
	foreach ($rows as $row):
		$status_response =  "{$row['user_stage']}";
	endforeach;
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	$arr = array("err"=>'none', "status"=>$status_response);
	$output = json_encode($arr);
	echo $output;
	
}
else if($_POST['comm'] == 'who_opponent') {
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
	 * A) Check who the opponent is
	 */
	
	# A
	$opponent_request = "SELECT user_id_A, user_name 
						FROM BB_BATTLE, BB_USER 
						WHERE user_id_B = '".$user_id."' 
						AND user_id = user_id_A";
	$opponent_request = submit_info($opponent_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($opponent_request)) || array_pop($rows));
	foreach ($rows as $row):
		$o_id =  "{$row['user_id_A']}";
		$o_name =  "{$row['user_name']}";
	endforeach;
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	$arr = array("err"=>'none', "o_id"=>$o_id, "o_name"=>$o_name);
	$output = json_encode($arr);
	echo $output;
}
else if ($_POST['comm'] == 'move') {
	$move = $_POST['u_move'];
	$cycle = $_POST['u_cycle'];
	$user_id = $_POST['user_id'];
	$opp_id = $_POST['oop_id'];
	$user_num = (string) $_POST['user_num'];
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
	 * A) Update user cycle
	 * B) Register user's input
	 */
	
	# A, # B
	$update_statement = "UPDATE BB_USER SET user_cycle = '".$cycle."', user_attach = '".$move."' WHERE user_id = '".$user_id."'";
	$update_statement = submit_info($update_statement, $connection, false);
	
	/**
	 * PHP Talks to MySQL
	 * A) Get user, opponent, and battle level
	 * B) If all equal, update battle level
	 */
	/*
	if($user_num == '1') {
		$level_request = "SELECT battle_level, A.user_cycle user_A, B.user_cycle user_b 
					FROM BB_USER A, BB_USER B, BB_BATTLE 
					WHERE user_id_A = '231' 
					AND A.user_id = '230' AND B.user_id = '231'";
	}
	else {
		$level_request = "SELECT battle_level, A.user_cycle user_A, B.user_cycle user_b 
					FROM BB_USER A, BB_USER B, BB_BATTLE 
					WHERE user_id_A = '230' 
					AND A.user_id = '230' AND B.user_id = '231'";
	}
	$level_request = submit_info($level_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($level_request)) || array_pop($rows));
	foreach ($rows as $row):
		$battle_level =  "{$row['battle_level']}";
		$user_A = "{$row['user_A']}";
		$user_B = "{$row['user_B']}";
	endforeach;
	
	if($battle_level == $user_A) {
		if($user_A == $user_B) {
			$arr = array("err"=>'match', "user_A_cycle"=>$user_A, "user_B_cycle"=>$user_B, "battle"=>$battle_level);
		}
	}
	else {
		$arr = array("err"=>'no match');
	} */
	
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	$arr = array("err"=>'none');
	$output = json_encode($arr);
	echo $output;
}
else if($_POST['comm']=='outcome') {
	$u_id = $_POST['user_id'];
	$o_id = $_POST['opp_id'];
	$user_num = (string) $_POST['user_num'];
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
	 * A) Get user, opponent, and battle level
	 * B) If all equal, update battle level
	 */
	
	if($user_num == '1') {
		$level_request = "SELECT battle_level, A.user_cycle aaa, B.user_cycle bbb 
					FROM BB_USER A, BB_USER B, BB_BATTLE 
					WHERE user_id_A = '".$u_id."' 
					AND A.user_id = '".$u_id."' AND B.user_id = '".$o_id."'";
	}
	else {
		$level_request = "SELECT battle_level, A.user_cycle aaa, B.user_cycle bbb 
					FROM BB_USER A, BB_USER B, BB_BATTLE 
					WHERE user_id_A = '".$o_id."' 
					AND A.user_id = '".$u_id."' AND B.user_id = '".$o_id."'";
	}
	/*
	$level_request = "SELECT battle_level, A.user_cycle aaa, B.user_cycle bbb 
					FROM BB_USER A, BB_USER B, BB_BATTLE 
					WHERE user_id_A = '207' 
					AND A.user_id = '207' AND B.user_id = '208'";
					*/
	$level_request = submit_info($level_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($level_request)) || array_pop($rows));
	foreach ($rows as $row):
		$battle_level =  "{$row['battle_level']}";
		$user_A = "{$row['aaa']}";
		$user_B = "{$row['bbb']}";
	endforeach;
	
	// Both are on the same battle level, find out who won the round
	if ($battle_level == $user_A && $user_A == $user_B) {
		/**
	 	 * PHP Talks to MySQL
	  	 * A) Get user and opponents move (user_attach), bullets (bullets), and points (points)
	 	 * B) Update score (via user's points)
	 	 * C) Increase battle level by one.
	 	 */
		
		# A, B
		$info_request = "SELECT u.user_attach ua , o.user_attach oa, u.bullets ub, o.bullets ob, u.points up, o.points op 
						FROM BB_USER u, BB_USER o 
						WHERE u.user_id = '".$u_id."' 
						AND o.user_id = '".$o_id."'";
		$info_request = submit_info($info_request, $connection, true);
		while(($rows[] = mysql_fetch_assoc($info_request)) || array_pop($rows));
		foreach ($rows as $row):
			$u_attack =  "{$row['ua']}";
			$o_attack = "{$row['oa']}";
			$u_bullets = "{$row['ub']}";
			$o_bullets = "{$row['ob']}";
			$u_points = "{$row['up']}";
			$o_points = "{$row['op']}";
		endforeach;
		
		if($o_points == "") {
			$o_points = 0;
		}
		if($u_points == "") {
			$u_points = 0;
		}
		
		// U shot
		if($u_attack == '1') {
			// O shot
			if($o_attack == '1') {
				// U has bullets
				if($u_bullets == '1') {
					// O has bullets
					if($o_bullets == '1') {
						// Draw
						$outcome_db = "UPDATE BB_USER u, BB_USER o 
									SET u.bullets='0', o.bullets='0' 
									WHERE u.user_id='".$u_id."' AND o.user_id='".$o_id."'";
					}
					// O has no bullets
					else if($o_bullets == '0') {
						// Opp dies
						$u_points = (int) $u_points + 1;
						$outcome_db = "UPDATE BB_USER SET bullets='0', points='".$u_points."' WHERE user_id='".$u_id."'";
					}
				}
				// U has no bullets
				else if($u_bullets == '0') {
					// O has bullets
					if($o_bullets == '1') {
						// User die
						$o_points = (int) $o_points + 1;
						$outcome_db = "UPDATE BB_USER SET bullets='0', points='".$o_points."' WHERE user_id='".$o_id."'";
					}
					// O has no bullets
					else if($o_bullets == '0') {
						// Draw
						$outcome_db = "UPDATE BB_USER u, BB_USER o 
									SET u.bullets='0', o.bullets='0' 
									WHERE u.user_id='".$u_id."' AND o.user_id='".$o_id."'";
					}
				}
			}
			// O duck
			else if($o_attack == '2') {
				// U has bullets
				if($u_bullets == '1') {
					$outcome_db = "UPDATE BB_USER SET bullets='0', points WHERE user_id='".$u_id."'";
				}
				// U has no bullets
				if($u_bullets == '0') {
					$outcome_db = "UPDATE BB_USER SET bullets='0', points WHERE user_id='".$u_id."'";
				}
			}
			// O reload
			else if($o_attack == '3') {
				// U has bullets
				if($u_bullets == '1') {
					$u_points = (int) $u_points + 1;
					$outcome_db = "UPDATE BB_USER u, BB_USER o SET u.bullets='0', o.bullets='1', u.points='".$u_points."' 
								WHERE u.user_id='".$u_id."' 
								AND o.user_id='".$o_id."'";
				}
				// U has no bullets
				if($u_bullets == '0') {
					$outcome_db = "UPDATE BB_USER SET bullets='1' WHERE user_id='".$o_id."'";
				}
			}
		}
		
		
		
		// U duck
		else if($u_attack == '2') {
			// O shot
			if($o_attack == '1') {
				// O has bullets
				if($o_bullets == '1') {
					$outcome_db = "UPDATE BB_USER SET bullets='0' WHERE user_id='".$o_id."'";
				}
				// O has no bullets
				if($o_bullets == '0') {
					$outcome_db = "UPDATE BB_USER SET bullets='0' WHERE user_id='".$o_id."'";
				}
			}
			// O duck
			if($o_attack == '2') {
				// This is a dud entry, since nothing is happening
				$outcome_db = "UPDATE BB_USER SET bullets='".$u_bullets."' WHERE user_id ='".$u_id."'";
			}
			// O reload
			if($o_attack == '3') {
				$outcome_db = "UPDATE BB_USER SET bullets='1' WHERE user_id='".$o_id."'";
			}
		}
		
		// U reload
		else if($u_attack =='3') {
			// O shot
			if($o_attack == '1') {
				// O has bullets
				if($o_bullets == '1') {
					$o_points = (int) $o_points + 1;
					$outcome_db = "UPDATE BB_USER u, BB_USER o SET u.bullets='1', o.bullets='0', o.points='".$o_points."' 
								WHERE u.user_id='".$u_id."' 
								AND o.user_id='".$o_id."'";
				}
				// O has no bullets
				else if($o_bullets == '0') {
					$outcome_db = "UPDATE BB_USER u, BB_USER o SET u.bullets='1', o.bullets='0' 
								WHERE u.user_id='".$u_id."' 
								AND o.user_id='".$o_id."'";
				}
			}
			// O duck
			if($o_attack =='2') {
				$outcome_db = "UPDATE BB_USER SET bullets='1'
							WHERE user_id='".$u_id."'";
			}
			// O reload
			if($o_attack =='3') {
				$outcome_db = "UPDATE BB_USER u, BB_USER o SET u.bullets='1', o.bullets='1'
							WHERE u.user_id='".$u_id."'
							AND o.user_id='".$o_id."'";
			}
		}
		$outcome_db = submit_info($outcome_db, $connection, false);
		
		
		# C
		$battle_level = (int) $battle_level + 1;
		if($user_num == 1) {
			$update_battle_level = "UPDATE BB_BATTLE SET battle_level='".$battle_level."' WHERE user_id_A='".$u_id."'";
		}
		else {
			$update_battle_level = "UPDATE BB_BATTLE SET battle_level='".$battle_level."' WHERE user_id_A='".$o_id."'";
		}
		$update_battle_level = submit_info($update_battle_level, $connection, false);
		
		

		//$arr = array("err"=>'none', "a"=>$user_A, "b"=>$user_B, "battle"=>$battle_level);
		$arr = array("err"=>'none', "answer"=>'yes', "u_points"=>$u_points, "o_points"=>$o_points, "u_attack"=>$u_attack, "o_attack"=>$o_attack);	
	}
	else {
		//$arr = array("err"=>'none', "a"=>'none', "b"=>'none', "battle"=>$battle_level);
		$arr = array("err"=>'none', "answer"=>'no');
	}
	
	//$arr = array("err"=>'none', "a"=>$user_A, "b"=>$user_B, "battle"=>$battle_level);
	
	
	
	
	$output = json_encode($arr);
	echo $output;
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
}
else if($_POST['comm'] == 'score') {
	$user_num = (string) $_POST['user_num'];
	$u_id = $_POST['user_id'];
	$o_id = $_POST['opponent_id'];
	$cycle = $_POST['cycle'];
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
	 * A) Get user and battle level
	 * B) If battle level is +1 of user, return score
	 */
	# A
	
	if($user_num == '1') {
		$level_request = "SELECT battle_level, user_cycle 
					FROM BB_USER, BB_BATTLE 
					WHERE user_id_A = '".$u_id."' 
					AND user_id = '".$u_id."'";
	}
	else {
		$level_request = "SELECT battle_level, user_cycle 
					FROM BB_USER A, BB_BATTLE 
					WHERE user_id_A = '".$o_id."' 
					AND user_id = '".$u_id."'";
	}
	$level_request = submit_info($level_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($level_request)) || array_pop($rows));
		foreach ($rows as $row):
			$u_cycle =  "{$row['user_cycle']}";
			$battle_level = "{$row['battle_level']}";
		endforeach;

	# B
	
	if((int)$battle_level == ((int)$u_cycle + 1)) {
		$points_request = "SELECT u.points up, o.points op, u.user_attach ua, o.user_attach oa
						FROM BB_USER u, BB_USER o 
						WHERE u.user_id='".$u_id."' 
						AND o.user_id='".$o_id."'";
		$points_request = submit_info($points_request, $connection, true);
		while(($rows[] = mysql_fetch_assoc($points_request)) || array_pop($rows));
		foreach ($rows as $row):
			$u_points =  "{$row['up']}";
			$o_points = "{$row['op']}";
			$u_attack = "{$row['ua']}";
			$o_attack = "{$row['oa']}";
		endforeach;
		
		$arr = array("err"=>'none', "answer"=>'yes', "u_points"=>$u_points, "o_points"=>$o_points, "u_attack"=>$u_attack, "o_attack"=>$o_attack);
	}
	else {
	
		$arr = array("err"=>'none', "answer"=>'no');
	}
	$output = json_encode($arr);
	echo $output;
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
	
}

if($_POST['comm'] == 'busy') {
	$user_id = $_POST['u_id'];
	$opponent_id = $_POST['o_id'];
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
	 * A) Check is user was previously challenged. If not, go to (B)
	 * B) Check is opponent is/was busy.
	 */
	
	$user_count = '0';
	$opponent_count = '0';
	
	# A
	$in_challenge_request = "SELECT COUNT(battle_level) FROM BB_BATTLE WHERE user_id_A='".$user_id."' OR user_id_B='".$user_id."'";
	$in_challenge_request = submit_info($in_challenge_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($in_challenge_request)) || array_pop($rows));
	foreach ($rows as $row):
		$user_count =  "{$row['COUNT(battle_level)']}";
	endforeach;
	# B
	$in_challenge_request = "SELECT COUNT(battle_level) FROM BB_BATTLE WHERE user_id_A='".$opponent_id."' OR user_id_B='".$opponent_id."'";
	$in_challenge_request = submit_info($in_challenge_request, $connection, true);
	while(($rows[] = mysql_fetch_assoc($in_challenge_request)) || array_pop($rows));
	foreach ($rows as $row):
		$opponent_count =  "{$row['COUNT(battle_level)']}";
	endforeach;
	
	
	if(($user_count =! true) || ($opponent_count != '0')) {
		$arr = array("err"=>'yes', "uuu"=>$user_count, "ooo"=>$opponent_count, "end"=>"The end");	
	}
	else {
		$arr = array("err"=>'none');
	}
	
	
	/**
 	* Close connection
 	*/
	mysql_close($connection);
	
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