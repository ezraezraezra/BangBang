var canvas_bl;  
var ctx_bl;
var x_bl = 0;
var a_y_bl = 10;
var a_bottom_bl = 15;
var a_top_bl = 0;
var h_y_bl = 0;
var a_dy_bl = .2;
var WIDTH_bl = 380;
var HEIGHT_bl = 424;

var arms_bl = new Image();
var legs_bl = new Image();
var hat_bl = new Image();
var face_bl = new Image();
var leg_r_bl = new Image();
var leg_l_bl = new Image();

function rect_bl(x,y,w,h) {
  ctx_bl.beginPath();
  ctx_bl.rect(x,y,w,h);
  ctx_bl.closePath();
  ctx_bl.fill();
} 
function clear_bl() {
  ctx_bl.clearRect(0, 0, WIDTH_bl, HEIGHT_bl);
}

function canvas_left_init() {
  canvas_bl = document.getElementById("battle_left");
  ctx_bl = canvas_bl.getContext("2d");
  
  arms_bl.src = "img/body_parts/arms.png";
  hat_bl.src = "img/body_parts/hat.png";
  face_bl.src = "img/body_parts/face.png";
  leg_r_bl.src = "img/body_parts/leg_right.png";
  leg_l_bl.src = "img/body_parts/leg_left.png";
  
  arms_bl.onload = function() {
  	ctx_bl.drawImage(arms_bl,0,0);
  };
  hat_bl.onload = function() {
  	ctx_bl.drawImage(hat_bl,0,0);
  };
  face_bl.onload = function() {
  	ctx_bl.drawImage(face_bl,0,0);
  };
  leg_r_bl.onload = function() {
  	ctx_bl.drawImage(leg_r_bl,0,0);
  };
  leg_l_bl.onload = function() {
  	ctx_bl.drawImage(leg_l_bl,0,0);
  };
  
  return setInterval(draw_bl, 10);
}


function draw_bl() {
  clear_bl();
  ctx_bl.fillStyle = "#82BF93";
  rect_bl(0,0,WIDTH_bl,HEIGHT_bl);
  ctx_bl.drawImage(arms_bl,x_bl,a_y_bl);
  ctx_bl.drawImage(leg_l_bl,0,0);
  ctx_bl.drawImage(leg_r_bl,0,0);
  ctx_bl.drawImage(hat_bl,x_bl,h_y_bl);
  ctx_bl.drawImage(face_bl,x_bl,h_y_bl);
  
  // Arm calculations		
  if (a_y_bl + a_dy_bl > /*15*/a_bottom_bl || a_y_bl + a_dy_bl < a_top_bl/*0*/)
    a_dy_bl = -a_dy_bl;
  	
  // Update everything
  a_y_bl += a_dy_bl;
}

function duck_bl(flag) {
	if(flag == true) {
		h_y_bl = 50;
		a_bottom_bl = 60;
		a_top_bl = 45;
		a_y_bl = 55;
	}
	else if(flag == false) {
		h_y_bl = 0;
		a_bottom_bl = 15;
		a_top_bl = 0;
		a_y_bl = 10;
	}	
}

function reload_bl(flag) {
	if(flag == true) {
		arms_bl.src = "img/body_parts/arms_reload.png";
	}
	else if(flag == false) {
		arms_bl.src = "img/body_parts/arms.png";
	}
}
