var stage = 0;
var temp_u_id = "nana";
var temp_s_id = "0";


login_audio.src = "audio/el_dos_negro.mp3";
login_audio.loop = "loop";
login_audio.preload = "auto";

function login(u_name) {
	if(u_name !="") {
		// ## console.log("NOT EMPTY");
		$("#normal_login").css("color", "white");
		phase_two_v2(u_name);	
	}
	else {
		$("#normal_login").css("color", "red");
		$("#input_name").focus();
	}
}


function phase_two_v2(u_name){
	$("#phase_1").fadeOut("fast", function(){
		$("#phase_2").fadeIn("fast");
	});
	
	/* START LOGIN AUDIO */
	login_audio.play();
	
	$.post('php/login.php', {
		comm: 'login',
		user_name: u_name
	}, function(data){
	
		// ## console.log(data.session_id);
		// ## console.log(data.user_id);
		// ## console.log("This is the TB ID");
		// ## console.log(data.tb_id);
		// ## console.log("This is dhte TB token");
		// ## console.log(data.tb_token);
		
		temp_s_id = data.session_id;
		temp_u_id = data.user_id;
		
		$.getScript("js/video.js", function(){
			start_vid_feed(data.tb_id, data.tb_token);
			$("#phase_2").fadeOut("fast", function(){
				$("#phase_2").html("Howdy <font style='color:red;'>" + $("#input_name").val() +
				"</font>,<br/>Make sure you can see your rugged face on the cowboy first, then click on the button bellow to ride into town.<br/>" +
				"<div class=\"progress_bar\" id=\"progress_login_2\">" +
							"<div id=\"progress_ball_1\" class=\"progress_ball\"></div>" +
							"<div id=\"progress_ball_2\" class=\"progress_ball\"></div>" +
							"<div id=\"progress_ball_3\" class=\"progress_ball\"></div>" +
						"</div>"+
				"<div id='login_button_2' class='login_button_class'>BANG!</div>");
				//$("#phase_1").fadeOut("fast", function(){
				$("#phase_2").fadeIn("fast", function(){
					$("#login_button_2").click(function(){
						//login_script();
						
						$("#uCamera").css("margin-top", "-1000px");
						// Fade Out to the Salon
						$("#login_container").fadeOut("fast", function(){
						
							// ## console.log(data.session_id);
							// ## console.log(data.user_id);
							//temp_s_id = data.session_id;
							//temp_u_id = data.user_id;
							$.getScript("js/salon.js", function(){
								salon(data.session_id, data.user_id, u_name);
								
							});
						});
					});
				});
			});
		});
		
	});
}

function phase_two(u_name) {
	$.getScript("js/video.js", function() {
		start_vid_feed();
	});
	
	// ## console.log("FB user id="+$FB_user_id);
	
	$("#phase_2").html("Howdy "+$("#input_name").val()+
		",<br/>Make sure you can see your rugged face on the cowboy first, then click on the button bellow to ride into town.<br/><div id='login_button_2' class='login_button_class'>BANG!</div>");
	$("#phase_1").fadeOut("fast", function() {
		$("#phase_2").fadeIn("fast", function() {
			$("#login_button_2").click(function() {
				//login_script();
				
				$("#uCamera").css("margin-top", "-1000px");
				// Fade Out to the Salon
				$("#login_container").fadeOut("fast", function() {
	
					$.post('php/login.php',
					{comm: 'login' , user_name: u_name},
					function (data) {
				
						// ## console.log(data.session_id);
						// ## console.log(data.user_id);
						temp_s_id = data.session_id;
						temp_u_id = data.user_id;
						$.getScript("js/salon.js", function() {
							salon(data.session_id, data.user_id, u_name);
				
						});
					});
				});	
			});
		});
	});
	//login_script();
}

function remove_user(){
	
	jQuery.ajaxSetup({async:false});
	$.get('php/session_db.php',
					{u_id: temp_u_id , s_id: temp_s_id});
	jQuery.ajaxSetup({async:true});
	
	/*
	script= document.createElement("script");
	script.type ='text/javascript';
	script.charset ='utf-8';
	script.src= "php/session_db.php?u_id=" +  temp_u_id +  "&s_id=" + temp_s_id;
	(document.getElementsByTagName('head')[0]).appendChild(script);
	*/
	
	
	/*
	alert("This is u_id: " + temp_u_id +"<br/> s_id: "+temp_s_id);
	var i = document.createElement("img");
	i.src= "php/session_db.php?u_id=" +  temp_u_id +  "&s_id=" + temp_s_id + "&f=" + Math.random();
	document.appendChild(i);
	alert("This is u_id: " + temp_u_id +"<br/> s_id: "+temp_s_id);
	return;*/
	
	
	// ## alert("This is u_id: " + temp_u_id +"<br/> s_id: "+temp_s_id);
	var i = document.createElement("img");
	i.src= "php/session_db.php?u_id=" +  temp_u_id +  "&s_id=" + temp_s_id + "&f=" + Math.random();
	document.appendChild(i);
	//alert("This is u_id: " + temp_u_id +"<br/> s_id: "+temp_s_id);
	return;
}
