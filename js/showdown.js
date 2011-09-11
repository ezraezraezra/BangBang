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
var $u_cycle = 1;
var t1;
var $user_id;
var $user_name;
var $sess_id;
var $user_num;
var $o_cam_num;

var oCam_salon = new Array();
var oCam_showdown = new Array();
oCam_showdown[0] = "151px";
oCam_showdown[1] = "639px";


showdown_audio.src = "audio/espana.mp3";
showdown_audio.loop = "loop";
showdown_audio.preload = "auto";
//showdown_audio.volume = 0.8;


win_audio.src = "audio/guadalajara.mp3";
win_audio.loop = "loop";
win_audio.preload = "auto";


loose_audio.src = "audio/cucaracha1.mp3";
loose_audio.loop = "loop";
loose_audio.preload = "auto";

var shot_audio = new Audio();
shot_audio.src = "audio/shoot.mp3";
shot_audio.preload = "auto";
shot_audio.volume = 0.5;

var reload_audio = new Audio();
reload_audio.src = "audio/reload.mp3";
reload_audio.preload = "auto";



function showdown(sess_id, opponent_id, opponent_name, u_name, user_id, user_num, o_cam_num) {
	$user_id = user_id;
	$user_name = u_name;
	$user_num = user_num;
	$o_id = opponent_id;
	$sess_id = sess_id;
	$o_cam_num = o_cam_num;
	//Need to check if you've been challenged or if the person you challenged has been challenged
	
	//Might have to move "vs" from the bottom of function to top, b/c if user was challenged by
	// someone else, screen must be populated with proper info, not with info user thought
	// he would be battling.
	// ## console.log("about to attemp showdown_db");
	if ($user_num == 1) {
		// ## console.log("adding to vs table.");
		$.post('php/showdown_db.php', {
			comm: 'vs',
			o_id: $o_id,
			u_id: $user_id,
		}, function(data){
			// ## console.log("vs added");
		});
	}
	
	
	$.post('php/showdown.php',
			{comm : 'display', o_id : opponent_id, o_name : opponent_name, user_name : u_name},
			function(data) {
				
				/* STOP LOGIN AUDIO */
				login_audio.pause();
				/* Showdown Audio start */
				showdown_audio.play();
				
				stage = 2;
				// ## console.log("This is o_id: "+opponent_id);
				// ## console.log("This is o_name: "+opponent_name);
				$("#app_body").append(data);
				$.getScript("js/showdown_canvas_left.js", function() {
					canvas_left_init();
				});
				$.getScript("js/showdown_canvas_right.js", function() {
					canvas_right_init();
				});
				
				})
				.success(function() {
					$("#cowboy_right").css("display","block");
					$("#showdown_container").fadeIn("slow");
					$("#uCamera").css("margin-top", "0px");
					
					oCam_salon[0] = $("#oCamera_" + $o_cam_num).css("top");
					oCam_salon[1] = $("#oCamera_" + $o_cam_num).css("left");
					
					// ## console.log("This is oCam_salon[0]: " + oCam_salon[0]);
					
					$("#oCamera_" + $o_cam_num).css("top", oCam_showdown[0]);
					$("#oCamera_" + $o_cam_num).css("left", oCam_showdown[1]);
					$("#oCamera_" + $o_cam_num).css("z-index", "10");
				//z-index: 10;
					/**Move opponent camera to correct position
					 * 		- Will need num of ws_sign to be passed to the function showdown
					 */
					
					
					$("#instruction_button").click(function() {
						$("#instruction_container").fadeOut("slow");
					});
						
				});
	$.post('php/showdown.php',
			{comm : 'controls', o_name : opponent_name},
			function(data) {
				$("#footer").html(data);
				})
				.success(function() {
					$("#game_button_container").fadeIn("slow");
					
					$("#shoot_button").click(function() {
						// ## console.log("Shoot was clicked!");
						user_action(1, $user_id, $o_id, $user_num);
					});
					$("#duck_button").click(function() {
						// ## console.log("Duck was clicked!");
						user_action(2, $user_id, $o_id, $user_num);
					});
					$("#reload_button").click(function() {
						// ## console.log("Reload was clicked!");
						user_action(3, $user_id, $o_id, $user_num);
					});
				});
	$.post('php/showdown.php',
		{comm : 'scoreboard'},
		function(data) {
			$("#app_body").append(data);
			$("#sb_left").html("5");
			$("#sb_right").html("5");
			//$("sb_left_bottom").html("reload");
			//$("sb_right_bottom").html("reload");
			$("#cowboy_left_move").html("- reloaded -");
			$("#cowboy_right_move").html("- reloaded -");
			})
			.success(function() {
				$("#score_board").fadeIn("show");
			});
			/*
	// ## console.log("about to attemp showdown_db");
	if ($user_num == 1) {
		// ## console.log("adding to vs table.");
		$.post('php/showdown_db.php', {
			comm: 'vs',
			o_id: $o_id,
			u_id: $user_id,
		}, function(data){
			// ## console.log("vs added");
		});
	}
	*/
		
}

function who_is_challenging_me(sess_id, u_id, u_name) {
	$sess_id = sess_id;
	$.post('php/showdown_db.php',
	{comm : 'who_opponent', user_id : u_id },
	function(data) {
		// ## console.log("Was challenged, so updating screen with proper info");
		$index = 1;
		found_cam = false;
		while(found_cam != true) {
			// ## console.log("Just checking: "+ $("#ws_button_" + $index).attr("db_id"));
			// ## console.log("Also checking: " + data.o_id);
			if(parseInt($("#ws_button_" + $index).attr("db_id")) == parseInt(data.o_id)) {
				// ## console.log("they are equal");
				found_cam = true;
			}
			else {
				// ## console.log("they are not equal");
				$index = $index + 1;
			}
		//	// ## console.log("looping inside the while loop of 'who_is_challenging_me'");
		}
		showdown($sess_id, data.o_id, data.o_name, u_name, u_id, 2, $index);
	});
}

function user_action(decision, u_id, o_id, u_num){
	$decision = decision;
	$u_id = u_id;
	$o_id = o_id;
	$u_num = u_num;
	
	//Stop users from overclicking (Crosslight effect)
	$("#game_button_container").fadeOut("slow", function(){
		$("#progress_showdown").fadeIn("slow", function() {//);
		//});
		
		
		$.post('php/showdown_db.php', {
			comm: 'move',
			u_move: $decision,
			u_cycle: $u_cycle,
			user_id: $u_id,
			opp_id: $o_id,
			user_num: $u_num
		}, function(data){
			$u_cycle = $u_cycle + 1;
			// ## console.log("USER has gone with move #" + $decision + " and the cycle has been updated to: " + $u_cycle);
			// ## console.log(data);
		}).success(function(){
			// ## console.log("Calculating winner");
			$.post('php/showdown_db.php', {
				comm: 'outcome',
				user_id: $u_id,
				opp_id: $o_id,
				user_num: $u_num
			}, function(data){
				// ## console.log(data);
				// Battle has been decided, display buttons
				if (data.answer == 'yes') {
					$("#progress_showdown").fadeOut("slow", function(){
						$("#game_button_container").fadeIn("slow", function(){
							update_scoreboard(data);
						});
					});
					//$("#game_button_container").fadeIn("show");
				
					//update_scoreboard(data);
				
				}
				// Battle hasn't been decided yet, keep checking
				else 
					if (data.answer == 'no') {
						// ## console.log("battle hasn't been decided yet, running timer");
						//t1=setTimeout("check_score("+$u_id+","+$o_id+",'"+$u_num+"')",2000);
						check_score($u_id, $o_id, $u_num);
					}
			});
		});
	});// This is for the game button fading out thingy.     Line 149
	});// This if for the progress button fading in thingy   Line 150
}

function check_score(u_id, o_id, u_num) {
	$u_id = u_id;
	$o_id = o_id;
	$u_num = u_num;
	$temp_cycle = $u_cycle - 1;
	// ## console.log("in start of timer");
	// ## console.log("u_id: " +$u_id);
	// ## console.log("o_id: " + $o_id);
	// ## console.log("u_num: " + $u_num);
	// ## console.log("temp cycle: "+ $temp_cycle);
	$.post('php/showdown_db.php',
		{comm : 'score', user_num : $u_num, user_id : $u_id, opponent_id : $o_id, cycle : $temp_cycle},
		function(data) {
			if(data.answer == 'no') {
				t1=setTimeout("check_score("+$u_id+","+$o_id+",'"+$u_num+"')",2000);
			}
			else if(data.answer == 'yes') {
				clearTimeout(t1);
				// ## console.log(data);
				// ## console.log("Answer found!");
				update_scoreboard(data);
				//$("#game_button_container").fadeIn("show");
				
			}
		});
	
}

function update_scoreboard(data) {
	// Need to check for game over condition! (later, after lunch?)
	$u_hp = parseInt($("#sb_left").html());
	$o_hp = parseInt($("#sb_right").html());
	$u_points = parseInt(data.u_points);
	$o_points = parseInt(data.o_points);
					
	$u_hp = /*$u_hp*/ 5 - $o_points;
	$o_hp = /*$o_hp*/ 5 - $u_points;
	
	$u_attack = find_attack(parseInt(data.u_attack));
	$o_attack = find_attack(parseInt(data.o_attack));
	
	avatar_movement('u', parseInt(data.u_attack));
	avatar_movement('o', parseInt(data.o_attack));
					
	$("#sb_left").html($u_hp);
	$("#sb_right").html($o_hp);
	//$("#sb_left_bottom").html($u_attack);
	//$("#sb_right_bottom").html($o_attack);
	$("#cowboy_left_move").html($u_attack);
	$("#cowboy_right_move").html($o_attack);
	
	if($u_hp == 0) {
		final_audio = loose_audio;
		game_results("died");
		reset_cam_position('o');
		if($FB_user_id != 0) {
			FB.ui(
   				{
     				method: 'feed',
     				name: 'BangBang',
     				link: 'http://ezraezraezra.com/bangbang',
     				picture: 'http://ezraezraezra.com/bangbang/img/cowboy_user.png',
     				caption: 'Win the wild west!',
     				description: 'Challenge your friends and varmints in a gun slinging showdown to be the best outlaw in the wild west.',
     				message: 'That varmint will not want to cross my path next time'
   				},
   				function(response) {
   				}
 			);	
		}
		$("#progress_showdown").fadeOut("fast");
		$("#game_button_container").fadeOut("fast");	
	}
	else if($o_hp == 0) {
		final_audio = win_audio;
		game_results("survived");
		reset_cam_position('o');
		if($FB_user_id != 0) {
			FB.ui(
   				{
     				method: 'feed',
     				name: 'BangBang',
     				link: 'http://ezraezraezra.com/bangbang',
     				picture: 'http://ezraezraezra.com/bangbang/img/cowboy_user.png',
     				caption: 'Win the wild west!',
     				description: 'Challenge your friends and varmints in a gun slinging showdown to be the best outlaw in the wild west.',
     				message: 'Defeated a varmint in gun slinging showdown'
   				},
   				function(response) {
   				}
 			);	
		}
		$("#progress_showdown").fadeOut("fast");
		$("#game_button_container").fadeOut("fast");
	}
	else {
		$("#progress_showdown").fadeOut("fast", function() {
			$("#game_button_container").fadeIn("fast");
			// ## console.log("FADE IN CONTROLLERS TO PLAY AGAIN!");
		});
		//$("#game_button_container").fadeIn("fast");
		//// ## console.log("FADE IN CONTROLLERS TO PLAY AGAIN!");
	}
}

function reset_cam_position(cam) {
	if (cam == 'u') {
		$("#uCamera").css("margin-top", "-800px");
	}
	else if(cam == 'o') {
		$("#oCamera_" + $o_cam_num).css("top", oCam_salon[0]);
		$("#oCamera_" + $o_cam_num).css("left", oCam_salon[1]);
		$("#oCamera_" + $o_cam_num).css("z-index", "5");
	}
}

function find_attack(attack) {
	switch(attack) {
		case 1:
			//return "shoot";
			shot_audio.play();
			return "- fired - ";
			break;
		case 2:
			//return "duck";
			return "- ducked - ";
			break;
		case 3:
			//return "reload";
			reload_audio.play();
			return "- reloaded -";
			break;
	}
}

function avatar_movement(avatar, attack) {
	if(avatar == 'u') {
		switch(attack) {
		case 1:
			duck_bl(false);
			reload_bl(false);
			$("#uCamera").css("top", oCam_showdown[0]);
			break;
		case 2:
			reload_bl(false);
			duck_bl(true);
			$("#uCamera").css("top", "201px");
			break;
		case 3:
			duck_bl(false);
			reload_bl(true);
			$("#uCamera").css("top", oCam_showdown[0]);
			break;
		}
	}
	else if (avatar == 'o') {
		switch(attack) {
		case 1:
			duck_br(false);
			reload_br(false);
			$("#oCamera_" + $o_cam_num).css("top", oCam_showdown[0]);
			break;
		case 2:
			reload_br(false);
			duck_br(true);
			$("#oCamera_" + $o_cam_num).css("top", "201px");
			break;
		case 3:
			duck_br(false);
			reload_br(true);
			$("#oCamera_" + $o_cam_num).css("top", oCam_showdown[0]);
			break;
		}
	}
}

function game_results(user_result) {
	/* AUDIO END */
	showdown_audio.pause();
	/*
	if(user_result == 'died') {
		final_audio = win_audio;
	}
	else if (user_result == 'survived') {
		final_audio = loose_audio;
	}
	*/
	//win_audio.play();
	final_audio.play();
	
	
	$("#fs_text").html(user_result);
	$("#cowboy_left_move").html("");
	$("#score_board").fadeOut("fast");
	$("#cowboy_right").fadeOut("slow", function() {
			$("#final_score").fadeIn("slow", function() {
				$("#fs_button").click(function() {
					// Battle is over, go back to salon
					// Will need to reset user's values (stage, cycle, bullets, points, last_access).
					reset_cam_position('u');
					$("#score_board").fadeOut("fast");
					$("#progress_showdown").fadeOut("fast");
					$("#game_button_container").fadeOut("fast");
					
					//$("#sb_left_bottom").html("reload");
					$("#cowboy_left_move").html("- reloaded -");
					
					$("#final_score").fadeOut("fast");
					$("#showdown_container").fadeOut("slow");
					
					/* Reset both battle canvases */
					duck_bl(false);
					duck_br(false);
					reload_bl(false);
					reload_br(false);
					
					
					//$("#cowboy_right").fadeIn("fast");
					$.post('php/salon_db.php', 
						{ comm : "reset", u_id : $user_id, u_num : $user_num}, 
						function(data) {
							
							/* STOP WIN/LOST AUDIO */
							//win_audio.pause();
							final_audio.pause();
							/* START LOGIN AUDIO */
							login_audio.play();
							
							// ## console.log("Current user's values reset");
							// ## console.log(data.err);
							
							//$.getScript("js/salon.js", function() {
								cont_salon = true;
								stage = 1;
								$("#empty_salon").css("display", "block");
								update_salon($sess_id, $user_id, $user_name);
								//$("#salon_container").fadeIn("slow");
							//});
						});
				//	$.getScript("js/salon.js", function() {
				//		update_salon($sess_id, $user_id, $user_name);
				//		//$("#salon_container").fadeIn("slow");
				//	});
				});
			});
	});
}
