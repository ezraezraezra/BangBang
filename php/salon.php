<?php
require "info.php";

if($_POST['comm'] == 'display') {
	salon_display();
}

function salon_display() {
	echo '
			<div id="salon_container">
				<div id="empty_salon">
					<div class="progress_bar" id="progress_salon">
						<div id="progress_ball_1" class="progress_ball"></div>
						<div id="progress_ball_2" class="progress_ball"></div>
						<div id="progress_ball_3" class="progress_ball"></div>
						<div id="progress_ball_4" class="progress_ball"></div>
						<div id="progress_ball_5" class="progress_ball"></div>
						<div id="progress_ball_6" class="progress_ball"></div>
						<div id="progress_ball_7" class="progress_ball"></div>
						<div id="progress_ball_8" class="progress_ball"></div>
						<div id="progress_ball_9" class="progress_ball"></div>
						<div id="progress_ball_10" class="progress_ball"></div>
						<div id="progress_ball_11" class="progress_ball"></div>
						<div id="progress_ball_12" class="progress_ball"></div>
						<div id="progress_ball_13" class="progress_ball"></div>
						<div id="progress_ball_14" class="progress_ball"></div>
						<div id="progress_ball_15" class="progress_ball"></div>
						<div id="progress_ball_16" class="progress_ball"></div>
						<div id="progress_ball_17" class="progress_ball"></div>
						<div id="progress_ball_18" class="progress_ball"></div>
						<div id="progress_ball_19" class="progress_ball"></div>
						<div id="progress_ball_20" class="progress_ball"></div>
						<div id="progress_ball_21" class="progress_ball"></div>
						<div id="progress_ball_22" class="progress_ball"></div>
						<div id="progress_ball_23" class="progress_ball"></div>
						<div id="progress_ball_24" class="progress_ball"></div>
						<div id="progress_ball_25" class="progress_ball"></div>
					</div>
					the salon is currently empty.<br/>keep waiting for other varmints
					to<br/>muster the courage to show their faces<br/>in this town
				</div>
				<div class="wanted_sign" num="1" id="ws_1" style="margin-top:60px;">
					<div class="ws_title">WANTED</div>
					<div class="ws_name" id="ws_name_1">user name</div>
					<div class="ws_vid"></div>
					<div class="ws_button" id="ws_button_1" db_id="">challenge</div>
				</div>
				<div class="wanted_sign" num="2" id="ws_2" style="margin-top:50px;">
					<div class="ws_title">WANTED</div>
					<div class="ws_name" id="ws_name_2">user name</div>
					<div class="ws_vid"></div>
					<div class="ws_button" id="ws_button_2" db_id="">challenge</div>
				</div>
				<div class="wanted_sign" num="3" id="ws_3" style="margin-top:80px;">
					<div class="ws_title">WANTED</div>
					<div class="ws_name" id="ws_name_3">user name</div>
					<div class="ws_vid"></div>
					<div class="ws_button" id="ws_button_3" db_id="">challenge</div>
				</div>
				<div class="wanted_sign" num="4" id="ws_4" style="margin-top:65px;">
					<div class="ws_title">WANTED</div>
					<div class="ws_name" id="ws_name_4">user name</div>
					<div class="ws_vid"></div>
					<div class="ws_button" id="ws_button_4" db_id="">challenge</div>
				</div>
			</div>
	';
}

?>