<?php
$userID = 'unknown';
if (isset($_COOKIE['UFit_userID'])) {
	$userID = $_COOKIE['UFit_userID'];
}
?>
<html>
	<head>
		<title>顾问咨询 - <?php echo $userID; ?>的UFit</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<link rel="stylesheet" type="text/css" href="css/navbar.css"/>
		<link rel="stylesheet" type="text/css" href="css/comment.css"/>
	</head>
	<body>
		<nav>
			<div class="nav-wrapper green">
      			<a href="#!" id='navbar_logo' class="brand-logo">UFit</a>
      			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      			<ul class="right hide-on-med-and-down">
        			<li><a href="home.php">我的健康</a></li>
        			<li class='active'><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID; ?></a></li>
      			</ul>
      			<ul class="side-nav" id="mobile-demo">
        			<li><a href="home.php">我的健康</a></li>
        			<li class="active"><a href="consult.php">顾问咨询</a></li>
        			<li><a href="activities.php">活动</a></li>
        			<li><a href="friends.php">朋友</a></li>
        			<li><a href="user.php"><?php echo $userID; ?></a></li>
      			</ul>
    		</div>
  		</nav>
  		<div class="container row">
  			<div class="row s12 m12 l12">
  				<div class="card">
            		<div class="card-image">
              			<img src="img/consultTitlePic.jpg">
              			<span class="card-title">顾问咨询</span>
            		</div>
            		<div class="card-content">
              			<p>职业医师和健身教练在这里等你，让专业团队为你的健康保驾护航。</p>
            		</div>
          		</div>
  			</div>
  			<div class="col s12 m6 l4">
  				<ul class="collapsible popout" data-collapsible="accordion">
					<li>
				    	<div class="collapsible-header">陈医生</div>
				      	<div class="collapsible-body">
				      		<div class="card">
            					<div class="card-image">
              						<img src="img/tempDr1.png">
              						<span class="card-title">陈小林 医生</span>
            					</div>
            					<div class="card-content">
              						<p>教授、主任医师、博士生导师，中山大学附属眼科医院眼遗传与小儿眼病专科主任，兼任中华医学会广东遗传学委员会委员，美国眼科学会会员。擅长于各种常见和复杂疑难小儿眼病及先天性遗传性眼病如先天性泪囊炎，视网膜、视神经变性疾病，儿童近视及幼儿屈光不正的诊断与治疗和遗传咨询及基因诊断。</p>
            					</div>
            					<div class="card-action">
              						<a href="#">查看详情</a>
            					</div>
          					</div>
          				</div>
				    </li>
				    <li>
						<div class="collapsible-header">黎医生</div>
				      	<div class="collapsible-body">
				      		<div class="card">
            					<div class="card-image">
              						<img src="img/tempDr2.png">
              						<span class="card-title">黎介寿 医生</span>
            					</div>
            					<div class="card-content">
              						<p>教授、主任医师、博士生导师，中山大学附属眼科医院眼遗传与小儿眼病专科主任，兼任中华医学会广东遗传学委员会委员，美国眼科学会会员。擅长于各种常见和复杂疑难小儿眼病及先天性遗传性眼病如先天性泪囊炎，视网膜、视神经变性疾病，儿童近视及幼儿屈光不正的诊断与治疗和遗传咨询及基因诊断。</p>
            					</div>
            					<div class="card-action">
              						<a href="#">查看详情</a>
            					</div>
          					</div>
          				</div>
				    </li>
				</ul>
  			</div>
  			<div id="consult_right_div" class="col s12 m6 l8">
  				<div class="input-field">
          			<textarea id="ask_fld" class="materialize-textarea"></textarea>
          			<label for="ask_fld">进一步咨询</label>
        		</div>
        		<section class="comments">
    				<article class="comment">
      					<a class="comment-img" href="#non"><img src="img/tempDr2.png" alt="" width="50" height="50"></a>
      					<div class="comment-body">
        					<div class="text">
          						<p>妹子，约吗？</p>
        					</div>
        					<p class="attribution">by <a href="#non">黎医生</a> at 23:00pm, 4th Oct 2015</p>
      					</div>
    				</article>
      				<article class="comment">
      					<a class="comment-img" href="#non"><img src="img/tempDr1.png" alt="" width="50" height="50"></a>
      					<div class="comment-body">
        					<div class="text">
          						<p>不约，这么大年纪了不要这样好不好</p>
        					</div>
        						<p class="attribution">by <a href="#non">陈医生</a> at 23:20pm, 4th Oct 2015</p>
      					</div>
    				</article>
    				<article class="comment">
      					<a class="comment-img" href="#non"><img src="img/tes.jpg" alt="" width="50" height="50"></a>
      					<div class="comment-body">
        					<div class="text">
          						<p>你们能不能先关注一下我的病情_(:зゝ∠)_</p>
        					</div>
        						<p class="attribution">by <a href="#non">wn13</a> at 23:23pm, 4th Oct 2015</p>
      					</div>
    				</article>
  				</section>
  			</div>
  		</div>
	</body>
</html>