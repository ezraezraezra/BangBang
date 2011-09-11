<?php
echo "
		<h1>About BangBang</h1>
		<p><a href='http://ezraezraezra.com/bangbang/' target='_blank'>BangBang</a> is a multi-player, telepresence and strategy-based web game. The objective of the game is to survive the Mexican standoff</p>.
		<h2>The game's technology</h2> 
		<p>The web-app itself marriages emerging front-end technologies with tried and trusted back-end technologies. 
			Back-end technologies used in this project are PHP and MySQL, which are used to keep all players updated with the central database. 
			Front-end technologies used are: HTML5, CSS3, AJAX, JSON, JavaScript, jQuery, and OpenTok. 
			These technologies allow for user-rich experience on a web app that mimics the 'native-feel' of a desktop application.</p>
		<h2>Using video feeds</h2>
		<p>The OpenTok API was used to bring a realistic feel to the game. In many of today's games, a user interacts with other users via an avatar. 
			They never see the user's real face and his/her reactions. 
			By using a video feed to replace the avatar's face, the simple act of shooting at the opponent in a showdown turns into a dramatic and emotional Mexican standoff.
			The user can see the opponent's face, which brings a more realistic feel to the fight.<p>
		<h2>How the backend works</h2>
		<p>When the user logs onto the web app, the app checks the status of the last session. 
			If it has been over six hours, a new session is added to the session table. 
			The user, along with information vital to the individual user, is added to the user table. 
			The user's id and the latest session's id is added to the session_x_user table. 
			Once a user challenges another user, both of their id's are added to the battle table. 
			 Once the battle is over, the user is removed from the battle_table by turning their id's into negative numbers. 
			 When a user leaves a session, their session_id in the session_x_user table is set to its negative value. 
			 This action is done in order to keep data in the table to check for problems or bugs within the system.</p>	
		";

echo "
		<h1>Database Design</h1>
		<h2>Who's Battling Who Table</h2>
		<img src='bb_battle.jpg' alt='Who is Battleing Who Table' />
		<h2>Session Table</h2>
		<img src='bb_session_table.jpg' alt='Session Table' />
		<h2>Which User is in Which Session Table </h3>
		<img src='bb_session_x_user.jpg' alt='Which user is which session table' />
		<h2>User Data Table</h2>
		<img src='bb_user.jpg' alt='User data table' />
	";

echo "
		<h1>Screenshots</h1>
		<h2>Start and Waiting for Opponents</h2>
		<img src='waiting.jpg' alt='Entering BangBang' />
		<h2>Logging Into BanbBang</h2>
		<img src='start.jpg' alt='Logging into BangBang' />
		<h2>Bang Bang Salon</h2>
		<img src='saloon.jpg' alt='Salon of BangBang' />
		<h2>Rules</h2>
		<img src='rules.jpg' alt='Rules of BangBang' />
		<h2>Showdown</h2>
		<img src='showdown.jpg' alt='Showdown in BangBang' />
		<h2>Waiting for Both Players</h2>
		<img src='showdown1.jpg' alt='Waiting for both players in BangBang' />
		<h2>Game Outcome</h2>
		<img src='end-condition.jpg' alt='End Condition of BangBang' />
	";

?>