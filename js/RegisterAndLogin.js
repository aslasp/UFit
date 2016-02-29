$(document).ready(function(){
	$('.slider').slider({
    	full_width: true,
      	//height: 600,
      	indicators:false
    });
});
function isNameUsed() {
	var xmlhttp = getXmlHttp();
	var userID = $('#username_fld').val();
	xmlhttp.open("GET", "php/RegisterService.php?serviceType=0&userID=" + userID, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		deal_isNameUsed(xmlhttp)
	};
	xmlhttp.send();
}

function deal_isNameUsed(xmlhttp) {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var text = xmlhttp.responseText;
			if (text != 0) {
				$("#error_idExist").show();
				$("#reg_submit_btn").hide();
			} else {
				$("#error_idExist").hide();
				$("#reg_submit_btn").show();
			}
		}
	}
	//--------------------------------------------------

function isEmailUsed() {
	var xmlhttp = getXmlHttp();
	var email = $('#email_fld').val();
	xmlhttp.open("GET", "php/RegisterService.php?serviceType=1&email=" + email, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		deal_isEmailUsed(xmlhttp)
	};
	xmlhttp.send();
}

function deal_isEmailUsed(xmlhttp) {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var text = xmlhttp.responseText;
			if (text != 0) {
				$("#error_emailExist").show();
				$("#reg_submit_btn").hide();
			} else {
				$("#error_emailExist").hide();
				$("#reg_submit_btn").show();
			}
		}
	}
	//--------------------------------------------------

function pressPasswordIcon() {
	$("#password_icon").css('color', 'green');
	$("#password_fld").attr('type', 'text');
}

function releasePasswordIcon() {
		$("#password_icon").css('color', 'gray');
		$("#password_fld").attr('type', 'password');
	}
	//--------------------------------------------------

function submitRegister() {

	var userID = $('#username_fld').val();
	var password = $('#password_fld').val();
	var email = $('#email_fld').val();
	var age = $('#age_fld').val();
	var sex = $('#sex_fld').val();
	var height = $('#height_fld').val();
	var weight = $('#weight_fld').val();
	if (userID == '' || password == '' || email == '' || age == '' || sex == '' || height == '' || weight == '') {
		alert("请填写所有信息~");
	} else {
		var xmlhttp = getXmlHttp();
		xmlhttp.open("GET", "php/RegisterService.php?serviceType=2&userID=" + userID + "&password=" + password + "&email=" + email + "&age=" + age + "&sex=" + sex + "&height=" + height + "&weight=" + weight, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
			deal_register(xmlhttp)
		};
		xmlhttp.send();
	}
}

function deal_register(xmlhttp) {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var text = xmlhttp.responseText;
		if(text==0){
			alert("注册失败。");
		}else{
			window.location.href="home.php";
		}
	}
}
//---------------------------------------------
function submitLogin(){
	var userID=$('#username_login_fld').val();
	var password=$('#password_login_fld').val();
	var remember=document.getElementById('remember_btn').checked;
	if (userID == '' || password == '') {
		alert("用户名和密码都要填写的。");
	} else {
		var xmlhttp = getXmlHttp();
		xmlhttp.open("GET", "php/LoginService.php?serviceType=0&userID=" + userID + "&password=" + password + "&remember=" + remember, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
			deal_login(xmlhttp)
		};
		xmlhttp.send();
	}
}
function deal_login(xmlhttp) {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var text = xmlhttp.responseText;
		if(text==0){
			alert("用户名或密码错误");
		}
		else{
			window.location.href="home.php";
		}
	}
}
