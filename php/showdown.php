<?php

if($_POST['comm'] == 'display') {
	$opponent_id = $_POST['o_id'];
	$opponent_name = $_POST['o_name'];
	$user_name = $_POST['user_name'];
	showdown_display($opponent_id, $opponent_name, $user_name);
}

if($_POST['comm'] == 'controls') {
	$opponent_name = $_POST['o_name'];
	showdown_control($opponent_name);
}

if($_POST['comm'] == 'scoreboard') {
	showdown_scoreboard();
}

function showdown_display($opponent_id, $opponent_name, $user_name) {
	echo '
		<div id="showdown_container">
			<div id="instruction_container">
				rules
				<div id="instruction_body">
					1) gun holds only one bullet<br/>
					2) must manually reload gun<br/>
					3) duck to avoid being shot<br/>
					4) if both shot, its a draw<br/>
					5) last one standing wins<br/>
				</div>
				<div id="instruction_button">bang</div>
			</div>
			<div id="cowboy_left">
				<div id="cowboy_left_img">
					<div id="canvas_showdown_left">
						<canvas id="battle_left" width="380" height="424"></canvas>
					</div>
				</div>
				<div id="cowboy_left_name" class="cowboy_name">'.$user_name.'</div>
				<div id="cowboy_left_move" class="cowboy_move">- reloaded -</div>
			</div>
			<div id="cowboy_right">
				<div id="cowboy_right_img">
					<div id="canvas_showdown_right">
						<canvas id="battle_right" width="380" height="424"></canvas>
					</div>
				</div>
				<div id="cowboy_right_name" class="cowboy_name">'.$opponent_name.'</div>
				<div id="cowboy_right_move" class="cowboy_move">- reloaded -</div>
			</div>
			<div id="final_score">
				you
				<div id="fs_text">survived</div>
				<div id="fs_button">go back to salon</div>
			</div>
		</div>
	';
}

function showdown_control($opponent_name) {
	echo '
		<div id="game_button_container">
			<div id="shoot_button">SHOOT</div>
			<div id="duck_button">DUCK</div>
			<div id="reload_button">RELOAD</div>
		</div>
		<div class="progress_bar" id="progress_showdown">
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
			waiting for <font style="color: red;">'.$opponent_name.'</font>\'s move
		</div>
	';
}

function showdown_scoreboard() {
	echo '
		<div id="score_board">
			<div id="sb_left" class="sb_sides">5</div>
			<div id="sb_divider" class="sb_sides">|</div>
			<div id="sb_right" class="sb_sides">5</div>
			<div id="sb_left_bottom" class="sb_bottom">hp</div>
			<div id="sb_right_bottom" class="sb_bottom">hp</div>
		</div>
	';
}

?>