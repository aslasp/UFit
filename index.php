<html>
	<head>
		<title>
			UFit
		</title>
		<!--惯常引用部分-->
		<link href="css/gicons.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/materialize.js"></script>
		<!--本页特殊部分-->
		<script type="text/javascript" src="js/xmlhttp.js"></script>
		<script type="text/javascript" src="js/RegisterAndLogin.js"></script>
		<?php
		if(isset($_COOKIE['UFit_userID'])){
			echo <<<HTML
			<script type='text/javascript'>
				window.onload=function(){
					window.location.href='home.php';
				}
			</script>
HTML;
		}
		 ?>
		<style type="text/css">
#btn_div {
	position: absolute;
	top: 460px;
	left: 0;
	right: 0;
	margin: auto;
	vertical-align: middle;
	z-index: 2;
}
.slider {
	z-index: 1;
}
#join_button {
	width: 140px;
	font-size: 18px;
	font-family: "宋体", "黑体";
}
#login_button {
	font-size: 13px;
	font-family: "宋体", "黑体";
}
#regbtn_div {
	margin-bottom: 14px;
}
#footer {
	position: absolute;
	top: 610px;
	left: 20px;
	z-index: 2;
	color: grey;
}
#reg_modal {
	width: 450px;
	height: 800px;
}
#login_modal {
	width: 420px;
	height: 330px;
}
.input-field input[type=text]:focus {
	border-bottom: 1px solid green;
}
.input-field input[type=password]:focus {
	border-bottom: 1px solid green;
}
.input-field input[type=email]:focus {
	border-bottom: 1px solid green;
}
.input-field input[type=text]:focus + label {
	color: green;
}
.input-field input[type=password]:focus + label {
	color: green;
}
.input-field input[type=email]:focus + label {
	color: green;
}
#error_idExist{
	color: red;
	font-size: 10px;
	position: relative;
	top: 40px;
}
#error_emailExist{
	color: red;
	font-size: 10px;
	position: relative;
	top: 40px;
}
#password_icon{
	color:gray;
	cursor: hand;
	position: relative;
	top: 40px;
}</style>
	</head>
	<body>
		<div class="slider fullscreen">
			<ul class="slides">
				<li>
					<img src="img/index1.jpg" />
					<div class="caption right-align">
						<h1 class="light grey-text text-lighten-3">
							UFit
						</h1>
						<h3 class="grey-text text-lighten-3">
							个人健康管理的最佳解决方案
						</h3>
					</div>
				</li>
				<li>
					<img src="img/index2.jpg" />
					<div class="caption center-align">
						<h1 class="light grey-text text-lighten-3">
							UFit
						</h1>
						<h3 class="grey-text text-lighten-3">
							用现代科技助力健康
						</h3>
					</div>
				</li>
				<li>
					<img src="img/index3.jpg" />
					<div class="caption left-align">
						<h1 class="light grey-text text-lighten-3">
							UFit
						</h1>
						<h3 class="light grey-text text-lighten-3">
							为您提供专业的医疗与健身咨询
						</h3>
					</div>
				</li>
			</ul>
		</div>
		<div class="center" id="btn_div">
			<div id="regbtn_div">
				<a id="join_button" class="btn-large green waves-effect waves-light modal-trigger" href="#reg_modal">
					立即加入
				</a>
			</div>
			<div>
				<a id="login_button" class="white-text modal-trigger" href="#login_modal">
					已有账号，登录
				</a>
			</div>
		</div>
		<!-- Modal Structure -->
		<div id="reg_modal" class="modal modal-fixed-footer">
			<div  class="row modal-content">
				<h5>
					新用户注册
				</h5>
				<div class="input-field col s9">
					<input id="username_fld" onblur="isNameUsed();" type="text" class="validate" length="20">
					<label for="username_fld">用户名</label>
					
				</div>
				<div id="error_idExist" hidden="true" class="col s3">用户名已存在</div>
				<div class="input-field col s9">
					<input id="password_fld" type="password" class="validate" length="20" >
					<label for="password_fld">密码</label>
				</div>
				<div class="col s3"><i id="password_icon" onmousemove="$('#password_icon').css('color','lightgray');" onmouseleave="$('#password_icon').css('color','gray');" onmousedown="pressPasswordIcon();" onmouseup="releasePasswordIcon();" class="material-icons">visibility</i></div>
				<div class="input-field col s9">
					<input id="email_fld" onblur="isEmailUsed();" type="email" class="validate">
					<label for="email_fld">邮箱</label>
				</div>
				<div id="error_emailExist" hidden="true" class="col s3">邮箱已存在</div>
				<div class="input-field col s5">
					<input id="age_fld" type="text" class="validate">
					<label for="age_fld">年龄</label>
				</div>
				<div class="input-field col s5">
					<select id="sex_fld">
						<option value="m" selected>男</option>
						<option value="f">女</option>
					</select>
					<label>性别</label>
				</div>
				<div class="input-field col s5">
					<input id="height_fld"= type="text" class="validate">
					<label for="height_fld">身高(cm)</label>
				</div>
				<div class="input-field col s5">
					<input id="weight_fld" type="text" class="validate">
					<label for="weight_fld">体重(kg)</label>
				</div>
			</div>
			<div class="modal-footer">
				<a id="reg_submit_btn" onclick="submitRegister()" class="modal-action modal-close waves-effect waves-light green btn">注册</a>
			</div>
		</div>
		<!-- Modal Structure -->
		<div id="login_modal" class="modal modal-fixed-footer">
			<div class="modal-content row">
				<h5>
					登录
				</h5>
					<div class="input-field col s10">
						<input id="username_login_fld" type="text" class="validate">
						<label for="username_login_fld">用户名</label>
						
					</div>
					<div class="input-field col s10">
						<input id="password_login_fld" type="password" class="validate">
						<label for="password_login_fld">密码</label>
					</div>
					<div class="col s10">
						<input type="checkbox" id="remember_btn" checked="checked" />
						<label for="remember_btn">记住我</label>
					</div>
			</div>
			<div class="modal-footer">
				<a id="login_submit_btn" onclick='submitLogin()' class="modal-action modal-close waves-effect waves-light green btn">
					登录
				</a>
			</div>
		</div>
		<div id="footer">
			© 2015 Copyright UFit Ltd. Made by 王宁131250079.
		</div>
	</body>
</html>