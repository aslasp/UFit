<?php
$userID='unknown';
if(isset($_COOKIE['UFit_userID'])){
	$userID=$_COOKIE['UFit_userID'];
}
?>
<html>
	<head>
		<title>活动 - <?php echo $userID;?>的UFit</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<link rel="stylesheet" type="text/css" href="css/navbar.css"/>
		<script type="text/javascript" src="js/activities.js"></script>
		<style type="text/css">
			.container{
				position: relative;
				top:20px;
			}
		</style>
	</head>
	<body>
		<nav>
			<div class="nav-wrapper green">
      			<a href="#!" id='navbar_logo' class="brand-logo">UFit</a>
      			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      			<ul class="right hide-on-med-and-down">
        			<li><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li class='active'><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
      			<ul class="side-nav" id="mobile-demo">
        			<li><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li class="active"><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
    		</div>
  		</nav>
  		<div class="container row">
  			<div class="slider col s12 m12 l12">
    			<ul class="slides">
      				<li>
        				<img src="http://lorempixel.com/580/250/nature/1"> <!-- random image -->
        				<div class="caption center-align">
          					<h3>This is our big Tagline!</h3>
          					<h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        				</div>
      				</li>
      				<li>
        				<img src="http://lorempixel.com/580/250/nature/2"> <!-- random image -->
        				<div class="caption left-align">
          					<h3>Left Aligned Caption</h3>
          					<h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
        				</div>
      				</li>
      			</ul>
      		</div>
      		<div class="col s12 m6 l4">
  				<div id="activities_left_list" class="collection">
	  				<a href="#!" id="all_activities_btn" class="left_list_item collection-item active green">全部活动</a>
	  				<a href="#!" id="run_activities_btn" class="left_list_item collection-item green-text">跑步</a>
	  				<a href="#!" id="soccer_activities_btn" class="left_list_item collection-item green-text">足球</a>
	  				<a href="#!" id="basketball_activities_btn" class="left_list_item collection-item green-text">篮球</a>
	  				<a href="#!" id="badminton_activities_btn" class="left_list_item collection-item green-text">羽毛球</a>
	  				<a href="#!" id="tennis_activities_btn" class="left_list_item collection-item green-text">网球</a>
	  				<a href="#!" id="pingpong_activities_btn" class="left_list_item collection-item green-text">乒乓球</a>
	  				<a href="#!" id="swim_activities_btn" class="left_list_item collection-item green-text">游泳</a>
	  				<a href="#!" id="ride_activities_btn" class="left_list_item collection-item green-text">骑行</a>
	  				<a href="#!" id="yoga_activities_btn" class="left_list_item collection-item green-text">健美与瑜伽</a>
	  				<a href="#!" id="other_activities_btn" class="left_list_item collection-item green-text">其他活动</a>
  				</div>
  			</div>
  			<div id="activities_right_div" class="col s12 m6 l8">
  				<ul class="collection">
    				<li class="collection-item avatar">
      					<i class="material-icons circle">folder</i>
      					<span class="title">Title</span>
      					<p>First Line <br>
         					Second Line
      					</p>
      					<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    				</li>
    				<li class="collection-item avatar">
      					<i class="material-icons circle">folder</i>
      					<span class="title">Title</span>
      					<p>First Line <br>
         					Second Line
      					</p>
      					<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    				</li>   
				</ul>
  			</div>	
  		</div>
	</body>
</html>