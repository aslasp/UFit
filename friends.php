<?php
$userID='unknown';
if(isset($_COOKIE['UFit_userID'])){
	$userID=$_COOKIE['UFit_userID'];
}
?>
<html>
	<head>
		<title>朋友 - <?php echo $userID;?>的UFit</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<link rel="stylesheet" type="text/css" href="css/navbar.css"/>
	</head>
	<body>
		<nav>
			<div class="nav-wrapper green">
      			<a href="#!" id='navbar_logo' class="brand-logo">UFit</a>
      			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      			<ul class="right hide-on-med-and-down">
        			<li><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li class='active'><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
      			<ul class="side-nav" id="mobile-demo">
        			<li><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li class='active'><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
    		</div>
  		</nav>
	</body>
</html>