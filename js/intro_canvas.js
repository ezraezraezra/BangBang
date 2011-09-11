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
var canvas;  
var ctx;
var x = 0;
var a_y = 0;
var ll_y = 0;
var lr_y = -10;
var dx = 2;
var a_dy = .2;
var ll_dy = .5;
var lr_dy = -.5;
var WIDTH = 900;
var HEIGHT = 424;
var arms = new Image();
var legs = new Image();
var hat = new Image();
var face = new Image();
var leg_left = new Image();
var leg_right = new Image();
var interval_intro_l_canvas;


function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
} 
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function intro_init() {
  canvas = document.getElementById("intro_canvas");
  ctx = canvas.getContext("2d");
  arms.src = "img/body_parts/arms.png";
  hat.src = "img/body_parts/hat.png";
  face.src = "img/body_parts/face.png";
  leg_right.src = "img/body_parts/leg_right.png";
  leg_left.src = "img/body_parts/leg_left.png";
  arms.onload = function() {
  	ctx.drawImage(arms,0,0);
  };
  hat.onload = function() {
  	ctx.drawImage(hat,0,0);
  };
  face.onload = function() {
  	ctx.drawImage(face,0,0);
  };
  leg_right.onload = function() {
  	ctx.drawImage(leg_right,0,0);
  };
  leg_left.onload = function() {
  	ctx.drawImage(leg_left,0,0);
  };
  //return setInterval(draw, 10);
  interval_intro_l_canvas = setInterval(draw, 10);
  
}


function draw() {
  clear();
  ctx.fillStyle = "#82BF93";
  rect(0,0,WIDTH,HEIGHT);
  ctx.drawImage(arms,x,a_y);
  ctx.drawImage(leg_left,x,ll_y);
  ctx.drawImage(leg_right,x,lr_y);
  ctx.drawImage(hat,x,0);
  ctx.drawImage(face,x,0);

  // Keep moving character to the right side of screen
  if( x + 380 <= WIDTH) {
  	x += dx;
	// Leg calculations
	if(ll_y + ll_dy > 5 || ll_y + ll_dy < -5)
		ll_dy = -ll_dy;
	if(lr_y + lr_dy > -5 || lr_y + lr_dy < -15)
		lr_dy = -lr_dy;
  }
  else {
  	ll_y = 0;
	lr_y = 0;
	ll_dy = 0;
	lr_dy = 0;
  }
  
  // Arm calculations		
  if (a_y + a_dy > 15 || a_y + a_dy < 0)
    a_dy = -a_dy;
  	
  // Update everything
  a_y += a_dy;
  ll_y += ll_dy;
  lr_y += lr_dy;
}