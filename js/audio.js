var login_audio = new Audio();
var loose_audio = new Audio();
var win_audio = new Audio();
var showdown_audio = new Audio();
showdown_audio.volume = 0.8;
var volume_boolean = false
var final_audio = win_audio;

$("#volume_image").click(function() {
	
	if(volume_boolean == true) {
		showdown_audio.volume = .8;
		login_audio.volume = 1;
		loose_audio.volume = 1;
		win_audio.volume = 1;
		$("#volume_image").attr("src", "img/volume_on.png");
		volume_boolean = false;
	}
	else {
		login_audio.volume = 0;
		loose_audio.volume = 0;
		win_audio.volume = 0;
		showdown_audio.volume = 0;
		$("#volume_image").attr("src", "img/volume_off.png");
		volume_boolean = true;
	}
});
