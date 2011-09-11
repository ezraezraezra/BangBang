var o_index = 1;

function start_vid_feed(vid_id, vid_token){
 	var phase_2_counter = 0;
 	var PUBLISHER_WIDTH = 215;//220;
 	var PUBLISHER_HEIGHT = 150;//160;
	var SUBSCRIBER_WIDTH = 215;
	var SUBSCRIBER_HEIGHT = 150;
 	var subscribers = {};
 	//var session = TB.initSession("16e60438ef9691c5666bb8a4f463a7c68bcf0934"); // Sample session ID.
 	var session = TB.initSession(vid_id);
		session.addEventListener("sessionConnected", sessionConnectedHandler);
		session.addEventListener("streamCreated", streamCreatedHandler);
		session.addEventListener('streamDestroyed', streamDestroyedHandler);
		//session.connect(330921, "devtoken"); // OpenTok sample API key and sample token string. 
		//session.connect(475271, "devtoken");
		session.connect(475271, ""+ vid_token);
		function sessionConnectedHandler(event){
			publish();
		//subscribeToStreams(event.streams);
		//session.publish();
		}
		
		function publish(){
			// ## console.log("Publisher was called");
			var parentDiv = document.getElementById("uCamera");
			var div = document.createElement('div'); // Create a replacement div for the publisher
			div.setAttribute('id', 'opentok_publisher');
			parentDiv.appendChild(div);
			var publisherProps = {
				width: PUBLISHER_WIDTH,
				height: PUBLISHER_HEIGHT,
				microphoneEnabled: false
			};
			publisher = session.publish('opentok_publisher', publisherProps); // Pass the replacement div id to the publish method
		}
		
		function streamCreatedHandler(event){
			subscribeToStreams(event.streams);
		}
		
		//var o_index = 1;
		function subscribeToStreams(streams){
			for (i = 0; i < streams.length; i++) {
				var stream = streams[i];
				if (stream.connection.connectionId == session.connection.connectionId) {
					// ## console.log("go to next screen?")
					if (phase_2_counter == 0) {
						$("#progress_login_2").fadeOut(function() {
							$("#login_button_2").fadeIn();
						});
						//$("#login_button_2").fadeIn();
					}
					return;
				}
			if (stream.connection.connectionId != session.connection.connectionId) {
			 //session.subscribe(stream);
			 // ## console.log("setting up opponent cameras");
			 var parentDiv = document.getElementById("oCamera_" + o_index);
			 parentDiv.setAttribute("child", stream.streamId);
			 var div = document.createElement('div');
			 var divId = stream.streamId;	// Give the replacement div the id of the stream as its id
			 div.setAttribute('id', divId);
			 parentDiv.appendChild(div);
			 var subscriberProps = {
				width: SUBSCRIBER_WIDTH,
				height: SUBSCRIBER_HEIGHT,
				microphoneEnabled: false
			};
			 subscribers[stream.streamId] = session.subscribe(stream, divId, subscriberProps);
			 o_index = o_index + 1;
			 
			 
			 }
			}
		}
		
		function streamDestroyedHandler(event) {
			// This signals that a stream was destroyed. Any Subscribers will automatically be removed. 
			// This default behaviour can be prevented using event.preventDefault()
			// ## console.log("STREAM DESTROYED WAS CALLED");
			// ## console.log(subscribers[event.streams[0].streamId]);
			// ## console.log(event.streams[0].streamId);
			
			
			for(var i = 1; i < 5; i++) {
				if($("#oCamera_"+ i).attr("child") == event.streams[0].streamId) {
					// ## console.log("oCamera has found it");
					// ## console.log("opponent id: "+ $("#ws_button_" + i).attr("db_id"));
					// ## console.log("user id from video.js: "+ $u_id);
					$o_id = $("#ws_button_" + i).attr("db_id");
					temp_i = i;
					// ## console.log("session id from video.js: " +$sess_id);
					if(stage == 1) {
						cont_salon = false;
						$("#empty_salon").fadeIn("fast");
					}
					
					
					
					$.post('php/video_db.php',
						{comm : 'remove', user_id : $u_id, opponent_id : $o_id, session_id : $sess_id},
						function(data) {
							// ## console.log("stream destroyed called to video_db ran");
							// ## console.log("This is i: "+ temp_i);
							move_o_cam_up(temp_i);
							//$("#ws_"+temp_i).css("display", "none");
							
							
							
							$("#ws_"+1).css("display", "none");
							$("#ws_"+2).css("display", "none");
							$("#ws_"+3).css("display", "none");
							$("#ws_"+4).css("display", "none");
							
							
							$("#empty_salon").fadeIn("fast");
							o_index = o_index - 1;
							
							//cont_salon = true;
						//	if(stage == 1) {
						//		cont_salon = true;
						//		$("#empty_salon").fadeIn("fast");
						//	}
							
							
							
							if(parseInt(temp_i) == 1) {
								$("#oCamera_1").attr("id", "oCamera_5");
								$("#oCamera_2").attr("id", "oCamera_1");
								
								$("#oCamera_3").attr("id", "oCamera_2");
								$("#oCamera_4").attr("id", "oCamera_3");
								$("#oCamera_5").attr("id", "oCamera_4");
							}
							else if (parseInt(temp_i) == 2) {
								$("#oCamera_2").attr("id", "oCamera_5");
								$("#oCamera_3").attr("id", "oCamera_2");
								$("#oCamera_4").attr("id", "oCamera_3");
								$("#oCamera_5").attr("id", "oCamera_4");
							}
							else if (parseInt(temp_i) == 3) {
								$("#oCamera_3").attr("id", "oCamera_5");
								$("#oCamera_4").attr("id", "oCamera_3");
								$("#oCamera_5").attr("id", "oCamera_4");
							}
							
							else if (parseInt(temp_i) == 4) {
								//Nothing special
							}
							
							$("#oCamera_1").css("left", "32px");
							$("#oCamera_2").css("left", "272px");
							$("#oCamera_3").css("left", "512px");
							$("#oCamera_4").css("left", "752px");
							
							
							
							
							if(stage == 1) {
								cont_salon = true;
							}
							if(stage == 2) {
								$("#game_button_container").fadeOut("fast");
								$("#empty_salon").fadeOut("fast");
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
							}
							
					}); 
					
					
				}
				else {
					// ## console.log("oCamera no found it");
				}
			}
		}
		
		
	//});	
		
}