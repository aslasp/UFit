<?php
$userID='unknown';
if(isset($_COOKIE['UFit_userID'])){
	$userID=$_COOKIE['UFit_userID'];
}
?>
<html>
	<head>
		<title>个人设置 - <?php echo $userID;?>的UFit</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<link rel="stylesheet" type="text/css" href="css/navbar.css"/>
		<link rel="stylesheet" type="text/css" href="css/user.css"/>
		<script type="text/javascript" src="js/user.js"></script>
		<script type="text/javascript" src="js/RegisterAndLogin.js"></script>
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
        			<li><a href="friends.php">朋友</a></li>
        			<li class='active'><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
      			<ul class="side-nav" id="mobile-demo">
        			<li><a href="home.php">我的健康</a></li>
        			<li><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li class='active'><a href="user.php"><?php echo $userID;?></a></li>
      			</ul>
    		</div>
  		</nav>
  		<div class="container row">
  			<div class="row s12 m12 l12">
  				<div class="card">
            		<div class="card-image">
              			<img src="img/userTitlePic.jpg">
              			<span class="card-title">账户管理</span>
            		</div>
            		<div class="card-content">
              			<p>更新个人资料和账户安全设置。</p>
            		</div>
          		</div>
  			</div>
  			<div class="col s12 m6 l4">
  				<div id="user_left_list" class="collection">
	  				<a href="#!" id="profile_btn" class="collection-item active green">个人资料</a>
	  				<a href="#!" id="safe_btn" class="collection-item green-text">账号安全设置</a>
	  				<a href="#!" id="privacy_btn" class="collection-item green-text">隐私设置</a>
	  				<a href="#!" id="dataImport_btn" class="collection-item green-text">数据导入</a>
	  				<a href="#!" id="logout_btn" class="collection-item red-text">退出账号</a>
  				</div>
  			</div>
  			<div id="user_right_div" class="col s12 m6 l8">
  				
  			</div>
  		</div>
	</body>
</html>