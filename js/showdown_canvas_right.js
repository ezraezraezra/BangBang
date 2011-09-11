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
var canvas_br;  
var ctx_br;
var x_br = 0;
var a_y_br = 0;
var a_bottom_br = 15;
var a_top_br = 0;
var h_y_br = 0;
var a_dy_br = .2;
var WIDTH_br = 380;
var HEIGHT_br = 424;

var arms_br = new Image();
var legs_br = new Image();
var hat_br = new Image();
var face_br = new Image();
var leg_r_br = new Image();
var leg_l_br = new Image();

function rect_br(x,y,w,h) {
  ctx_br.beginPath();
  ctx_br.rect(x,y,w,h);
  ctx_br.closePath();
  ctx_br.fill();
} 
function clear_br() {
  ctx_br.clearRect(0, 0, WIDTH_br, HEIGHT_br);
}

function canvas_right_init() {
  canvas_br = document.getElementById("battle_right");
  ctx_br = canvas_br.getContext("2d");
  
  arms_br.src = "img/body_parts/right/arms.png";
  hat_br.src = "img/body_parts/hat.png";
  face_br.src = "img/body_parts/right/face.png";
  leg_r_br.src = "img/body_parts/right/right_leg.png";
  leg_l_br.src = "img/body_parts/right/left_leg.png";
  
  arms_br.onload = function() {
  	ctx_br.drawImage(arms_br,0,0);
  };
  hat_br.onload = function() {
  	ctx_br.drawImage(hat_br,0,0);
  };
  face_br.onload = function() {
  	ctx_br.drawImage(face_br,0,0);
  };
  leg_r_br.onload = function() {
  	ctx_br.drawImage(leg_r_br,0,0);
  };
  leg_l_br.onload = function() {
  	ctx_br.drawImage(leg_l_br,0,0);
  };
  
  return setInterval(draw_br, 10);
}


function draw_br() {
  clear_br();
  ctx_br.fillStyle = "#82BF93";
  rect_br(0,0,WIDTH_br,HEIGHT_br);
  ctx_br.drawImage(arms_br,x_br,a_y_br);
  ctx_br.drawImage(leg_l_br,0,0);
  ctx_br.drawImage(leg_r_br,0,0);
  ctx_br.drawImage(hat_br,x_br,h_y_br);
  ctx_br.drawImage(face_br,x_br,h_y_br);
  
  // Arm calculations		
  if (a_y_br + a_dy_br > /*15*/a_bottom_br || a_y_br + a_dy_br < a_top_br/*0*/)
    a_dy_br = -a_dy_br;
  	
  // Update everything
  a_y_br += a_dy_br;
}

function duck_br(flag) {
	if(flag == true) {
		h_y_br = 50;
		a_bottom_br = 60;
		a_top_br = 45;
		a_y_br = 45;
	}
	else if(flag == false) {
		h_y_br = 0;
		a_bottom_br = 15;
		a_top_br = 0;
		a_y_br = 0;
	}	
}

function reload_br(flag) {
	if(flag == true) {
		arms_br.src = "img/body_parts/right/arms_reload.png";
	}
	else if(flag == false) {
		arms_br.src = "img/body_parts/right/arms.png";
	}
}
