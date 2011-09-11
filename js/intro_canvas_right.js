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
var canvas_right;  
var ctx_right;
var x_right = 550;
var a_y_right = 0;
var ll_y_right = 0;
var lr_y_right = -10;
var dx_right = 2;
var a_dy_right = .2;
var ll_dy_right = .5;
var lr_dy_right = -.5;
var WIDTH_right = 416;
var HEIGHT_right = 424;
var arms_right = new Image();
var legs_right = new Image();
var hat_right = new Image();
var face_right = new Image();
var leg_left_right = new Image();
var leg_right_right = new Image();
var icr_index = 0;
var icr_boolean = true;
var interval_intro_r_canvas;

var icr_audio = new Audio();
icr_audio.src = "audio/shoot.mp3";
icr_audio.setAttribute("preload", "preload");

var spurs_audio = new Audio();
spurs_audio.src = "audio/spurs.mp3";
spurs_audio.setAttribute("preload", "preload");


function rect_right(x,y,w,h) {
  ctx_right.beginPath();
  ctx_right.rect(x,y,w,h);
  ctx_right.closePath();
  ctx_right.fill();
} 
function clear_right() {
  ctx_right.clearRect(0, 0, WIDTH_right, HEIGHT_right);
}

function intro_fight() {
	spurs_audio.play();
  canvas_right = document.getElementById("intro_canvas_right");
  ctx_right = canvas_right.getContext("2d");
  arms_right.src = "img/body_parts/right/arms.png";
  hat_right.src = "img/body_parts/hat.png";
  face_right.src = "img/body_parts/right/face.png";
  leg_right_right.src = "img/body_parts/right/right_leg.png";
  leg_left_right.src = "img/body_parts/right/left_leg.png";
  arms_right.onload = function() {
  	ctx_right.drawImage(arms_right,600,0);
  };
  hat_right.onload = function() {
  	ctx_right.drawImage(hat_right,600,0);
  };
  face_right.onload = function() {
  	ctx_right.drawImage(face_right,600,0);
  };
  leg_right_right.onload = function() {
  	ctx_right.drawImage(leg_right_right,600,0);
  };
  leg_left_right.onload = function() {
  	ctx_right.drawImage(leg_left_right,600,0);
  };
  //return setInterval(draw_right, 10);
  var interval_intro_r_canvas = setInterval(draw_right, 10);
}


function draw_right() {
  clear_right();
  ctx_right.fillStyle = "#82BF93";
  rect(0,0,WIDTH_right,HEIGHT_right);
  ctx_right.drawImage(arms_right,x_right,a_y_right);
  ctx_right.drawImage(leg_left_right,x_right,ll_y_right);
  ctx_right.drawImage(leg_right_right,x_right,lr_y_right);
  ctx_right.drawImage(hat_right,x_right,0);
  ctx_right.drawImage(face_right,x_right,0);

  // Keep moving character to the right side of screen
  if( x_right >= 0) {
  	x_right -= dx_right;
	// Leg calculations
	if(ll_y_right + ll_dy_right > 5 || ll_y_right + ll_dy_right < -5)
		ll_dy_right = -ll_dy_right;
	if(lr_y_right + lr_dy_right > -5 || lr_y_right + lr_dy_right < -15)
		lr_dy_right = -lr_dy_right;
  }
  else {
  	ll_y_right = 0;
	lr_y_right = 0;
	ll_dy_right = 0;
	lr_dy_right = 0;
	
	if (icr_boolean == true) {
		icr_index = icr_index + 1;
	}
	
	if(icr_index== 10) {
		spurs_audio.pause();
	}
	
	if(icr_index == 25) {
		
		icr_audio.play();
	}
	
	if(icr_index == 50) {
		
		icr_boolean = false;
		icr_index = icr_index + 1;
		
		$("#intro_canvas_right").fadeOut("slow", function() {
			$("#phase_1").fadeIn("fast", function() {
				$("#input_name").focus();
			});
		});
	}
  }
  
  // Arm calculations		
  if (a_y_right + a_dy_right > 15 || a_y_right + a_dy_right < 0)
    a_dy_right = -a_dy_right;
  	
  // Update everything
  a_y_right += a_dy_right;
  ll_y_right += ll_dy_right;
  lr_y_right += lr_dy_right;
}