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
$users_id = new Array();
$users_name = new Array();
var t1;
var t2;
var ws_num;
var cont_salon = true;

function salon(sess_id, u_id, u_name) {
	$u_id = u_id;
	$.post('php/salon.php',
			{comm : 'display'},
			function(data) {
				//$("#app_body").html(data);
				//$("#uCamera").css("margin-top", "-500px");
				$("#uCamera").after(data);
				})
				.success(function() {
					stage = 1;
					// ## console.log("THis is u_id before update_salon:" + u_id);
					update_salon(sess_id, u_id, u_name);
					
					
					
					// ## console.log("Before salon fadeIn");
					$("#salon_container").fadeIn("slow");
					
					clearInterval(interval_intro_l_canvas);
					clearInterval(interval_intro_r_canvas);
					
					$(".oCamera").css("z-index", "5");
					
					
					$(".ws_button").click(function() {
						// ## console.log($(this).parent().attr("id"));
						//// ## console.log($("#"+$(this).parent().attr("num")));
						// ## console.log("YOU CLICKED TO BATTLE:"+$("#"+$(this).parent().attr("id")).children(".ws_name").html());
						// ## console.log("YOU CLICKED TO BATTLE:"+$(this).attr("db_id"));
						
						//$o_cam_num = $("#"+$(this).parent().attr("num"));
						temp_val = $(this).parent().attr("id").split("_");
						$o_cam_num = parseInt(temp_val[1]);
						// ## console.log("This is oCamera's number: " + $o_cam_num);
						
						$o_id = $(this).attr("db_id");
						$o_name = $("#"+$(this).parent().attr("id")).children(".ws_name").html();
						
						clearTimeout(t1);
						cont_salon = false;
						
						// Fade Out to the Showdown
						// ## console.log("before showdown");
						//$("#salon_container").fadeOut("fast", function() {
						
						/*
						//Move all oCameras out of the screen
						for(index = 1; index < 5; index++) {
							$("#oCamera_"+index).css("top", "-400px");
						}
						*/
						
							$.post('php/showdown_db.php', {
								comm: 'busy',
								o_id: $o_id,
								u_id: $u_id,
							}, function(data){
								// ## console.log("busy being checked");
								// ## console.log(data.err)
								// ## console.log(data);
								// ## console.log("o_id: "+ $o_id);
								// ## console.log("u_id: "+ $u_id);
								if(data.err == 'none') {
									//Move all oCameras out of the screen
									for(index = 1; index < 5; index++) {
										$("#oCamera_"+index).css("top", "-400px");
									}
									
									$.getScript("js/showdown.js", function() {
										showdown(sess_id, $o_id, $o_name, u_name, u_id, 1, $o_cam_num);
							});
								}
								else {
									cont_salon = true;
									update_salon(sess_id,u_id,u_name);
								}
							});
							
							/*
							$.getScript("js/showdown.js", function() {
								showdown(sess_id, $o_id, $o_name, u_name, u_id, 1, $o_cam_num);
							});
							*/
						//});
					});
					//showdown_time(u_id);
				
				});
				//showdown_time(u_id);
				
	
	
}

function showdown_screen() {
	
}

function populate_signs(data, u_id) {
	$index = 0;
	$limit = 0;
	$u_id = "" + u_id + "";
	
	if (data.err != 'error') {
	
		if (data.users_id.length < 4) {
			$limit = data.users_id.length;
		}
		else {
			$limit = 4;
		}
		if (data.users_id != null) {
			while ($index < $limit) {
			
				//if (data.users_id.length > $index) {
				if ($u_id.toString() != data.users_id[$index]) {
					
					$("#empty_salon").css("display", "none");
						
					
					
					$("#ws_name_" + ($index + 1)).html(data.users_name[$index]);
					$users_id[$index] = data.users_name[$index];
					$("#ws_button_" + ($index + 1)).attr("db_id", data.users_id[$index]);
					$users_name[$index] = data.users_name[$index];
					
					if(data.users_stage[$index] == '0') {
						$button_display = "block";
					}
					else {
						$button_display = "none";
					}
					
					$("#" + $("#ws_button_" + ($index + 1)).parent().attr("id")).css("display", "block");
					$("#ws_button_" + ($index + 1)).css("display", $button_display);
					move_o_cam_down($index + 1);
					//$("#ws_"+($index + 1)).css("display","block");
					
					$index = $index + 1;
					//});
					
				//$("#ws_"+ ($index + 1)).css("display", "block");
				}
				else {
					$index = $index - 1;
				}
			//}
			}
		}
		for(x = $index + 1; x <5; x++) {
			$("#ws_"+ x).css("display", "none");
			$("#oCamera_" + x).css("top", "-400px");
		}
		
	}
	else {
		// ## console.log("WANTED SHOULD NOT BE SHOWN");
	}
	
	/**
	for(index = 0; index < 4; index++) {
		//if (data.users_id != null) {
			if (data.users_id.length > index) {
				if (u_id != data.users_id[index]) {
					$("#ws_name_" + (index + 1)).html(data.users_name[index]);
					$users_id[index] = data.users_name[index];
					$("#ws_button_" + (index + 1)).attr("db_id", data.users_id[index]);
					$users_name[index] = data.users_name[index];
				}
				else {
					index--;
				}
			}	
		//}
	} **/
}

function move_o_cam_down(index) {
	switch(index)
	{
		case 1:
			$("#oCamera_1").css("top", "129px");
			$("#oCamera_1").css("left", "32px");
			break;
		case 2:
			$("#oCamera_2").css("top", "119px");
			$("#oCamera_2").css("left", "272px");
			break;
		case 3:
			$("#oCamera_3").css("top", "149px");
			$("#oCamera_3").css("left", "512px");
			break;
		case 4:
			$("#oCamera_4").css("top", "134px");
			$("#oCamera_4").css("left", "752px");
			break;
	}
}

function move_o_cam_up(index) {
	//switch(index)
	//{
	//	case 1:
			$("#oCamera_1").css("top", "-400px");
			$("#oCamera_1").css("left", "32px");
			// ## console.log("MOVING CAM 1 UP");
	//		break;
	//	case 2:
			$("#oCamera_2").css("top", "-400px");
			$("#oCamera_2").css("left", "272px");
			// ## console.log("MOVING CAM 2 UP");
	//		break;
	//	case 3:
			$("#oCamera_3").css("top", "-400px");
			$("#oCamera_3").css("left", "512px");
			// ## console.log("MOVING CAM 3 UP");
	//		break;
	//	case 4:
			$("#oCamera_4").css("top", "-400px");
			$("#oCamera_4").css("left", "752px");
			// ## console.log("MOVING CAM 4 UP");
	//		break;
	//}
}

function update_salon(sess_id, u_id, u_name) {
	$.post('php/salon_db.php',
		{comm : 'ws-info', session_id : sess_id, user_id : u_id},
		function(data) {
			if (cont_salon == true) {
				// ## console.log("before");
				// ## console.log(data);
				// ## console.log("after");
				populate_signs(data, u_id);
				showdown_time(sess_id, u_id, u_name);
				$u_name = u_name;
				// ## console.log("__" + $u_name);
				// ## console.log("Timer for updating salong is going!");
			}
			else {
				// ## console.log("Last time update_salon timer will be called this time around");
			}
			//showdown_time(u_id);
			//t1=setTimeout("update_salon("+sess_id+","+u_id+")",5000);
		});
	//// ## console.log("Outside Timer for updating salong is going!");
	//t1=setTimeout("update_salon("+sess_id+","+u_id+")",2000);
}

function showdown_time(sess_id, u_id, u_name) {
	$u_id = u_id;
	$sess_id = sess_id;
	$u_name = u_name;
	// ## console.log($u_name+"__");
	$.post('php/showdown_db.php',
		{comm : 'status', user_id : u_id},
		function(data) {
			// ## console.log("THe issue might be showdown_time");
			// ## console.log("This is the user id:"+ u_id);
			// ## console.log(data);
			
			if(data.status == '1') {
				clearTimeout(t1);
				cont_salon = false;
				//clearTimeout(t2);
				//showdown_screen();
				// ## console.log("IN BATTLE!");
				
				
				//Move all oCameras out of the screen
						for(index = 1; index < 5; index++) {
							$("#oCamera_"+index).css("top", "-400px");
						}
				
				
				$.getScript("js/showdown.js", function() {
						//showdown($o_id, $o_name, u_name, u_id);
						//Function that finds who's challenging this person, then go to the screen with all info needed
						who_is_challenging_me($sess_id, $u_id, $u_name);
				});
			}
			else {
				//t2=setTimeout("showdown_time("+$u_id+")", 5000);
				// ## console.log("About to send:"+$u_name);
				t1=setTimeout("update_salon("+$sess_id+","+$u_id+",'"+$u_name+"')",5000);
			}
			
			// ## console.log("Just Checking if user is in battle");
	});
}
