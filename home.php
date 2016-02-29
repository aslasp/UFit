<?php
$userID='unknown';
if(isset($_COOKIE['UFit_userID'])){
	$userID=$_COOKIE['UFit_userID'];
}
?>
<html>
	<head>
		<title>健康管理 - <?php echo $userID;?>的UFit</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<script type="text/javascript" src="js/myhealth.js"></script>
		<script type="text/javascript" src="js/echarts-all.js"></script>
		<link rel="stylesheet" type="text/css" href="css/navbar.css"/>
		<style type="text/css">
		.emText{color:#ff5722;font-size:22px}
		.normalText{color:#424242;font-size:16px}
		</style>
	</head>
	<body>
		<nav>
			<div class="nav-wrapper green">
      			<a href="#!" id='navbar_logo' class="brand-logo">UFit</a>
      			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      			<ul class="right hide-on-med-and-down">
        			<li class='active'><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
      			<ul class="side-nav" id="mobile-demo">
        			<li class='active'><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
    		</div>
  		</nav>
  		<div class="container row">
  			<div class="row s12 m12 l12">
  				<div class="card">
            		<div class="card-image">
              			<img src="img/titlePic.jpg">
              			<span class="card-title">欢迎你，<?php echo $userID;?></span>
            		</div>
            		<div class="card-content">
              			<p>查看最近身体状况和各项健康指标的统计数据。</p>
            		</div>
            		<!--<div class="card-action">
              			<a href="#">This is a link</a>
            		</div>-->
          		</div>
  			</div>
  			<div class="col s12 m6 l4">
  				<div id="myHealth_left_list" class="collection">
	  				<a href="#!" id="recent_btn" class="collection-item active green">近况总览</a>
	  				<a href="#!" id="exe_btn" class="collection-item green-text">运动统计</a>
	  				<a href="#!" id="sleep_btn" class="collection-item green-text">睡眠质量</a>
	  				<a href="#!" id="bmi_btn" class="collection-item green-text">BMI</a>
	  				<a href="#!" id="heart_btn" class="collection-item green-text">心血管健康</a>
  				</div>
  			</div>
  			<div id="my_health_right_div" class="col s12 m6 l8">
  				
  			</div>
  		</div>
	</body>
</html>