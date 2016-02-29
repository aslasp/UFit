window.onload=function(){
	getProfile($.cookie('UFit_userID'));
	$('.collection-item').click(function(){
		jumpTo($(this).attr('id'));
	});
};


function jumpTo(tabID){
	if(tabID=='logout_btn'){
		$.removeCookie('UFit_userID', { path: '/' });
		window.location.href='index.php';
	}
	else{
		$('.collection-item').attr('class','collection-item green-text');
		$('#logout_btn').attr('class','collection-item red-text');
		document.getElementById(tabID).setAttribute('class','collection-item active green');
		switch(tabID){
			case 'profile_btn':getProfile($.cookie('UFit_userID'));break;
			case 'safe_btn':getSafe();break;
			case 'privacy_btn':getPrivacy();break;
			case 'dataImport_btn':getDataImport();break;
		}
	}
}
function getProfile(userID){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserService.php?serviceType=0&userID=" + userID, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		writeProfile(xmlhttp)
	};
	xmlhttp.send();
}
function writeProfile(xmlhttp){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		profileJson=jQuery.parseJSON(xmlhttp.responseText);
		var userID=$.cookie('UFit_userID');
		var profileHTML=
		'<div class="col s9">\
			<p>用户名：'+userID+'</p>\
			<p>邮箱：'+profileJson.email+'</p>\
		</div>\
		<div class="input-field col s9">\
			<input id=\"realname_fld\" type=\"text\" value=\"'+profileJson.realname+'\" class=\"validate\" length=\"20\">\
			<label class=\"active\" for=\"realname_fld\">真实姓名</label>\
		</div>\
		<div class=\"input-field col s5\">\
			<input id=\"age_fld\" value=\"'+profileJson.age+'\" type=\"text\" class=\"validate\">\
			<label class=\"active\" for=\"age_fld\">年龄</label>\
		</div>\
		<div class=\"input-field col s5\">\
			<select id=\"sex_fld\">';
		if(profileJson.sex=='m')
			profileHTML=profileHTML+'<option value=\"m\" selected>男</option>\
				<option value=\"f\">女</option>';
		else
			profileHTML=profileHTML+'<option value=\"m\">男</option>\
				<option value=\"f\" selected>女</option>';	
		profileHTML=profileHTML+'</select>\
			<label>性别</label>\
		</div>\
		<div class=\"input-field col s5\">\
			<input id=\"height_fld\" value=\"'+profileJson.height+'\" type=\"text\" class=\"validate\">\
			<label class=\"active\" for=\"height_fld\">身高(cm)</label>\
		</div>\
		<div class=\"input-field col s5\">\
			<input id=\"weight_fld" value=\"'+profileJson.weight+'\" type=\"text" class=\"validate\">\
			<label class=\"active\" for=\"weight_fld\">体重(kg)</label>\
		</div>\
		<div class=\"input-field col s10\">\
          	<textarea id=\"introduction_fld\" class=\"materialize-textarea\">'+profileJson.introduction+'</textarea>\
          	<label class=\"active\" for=\"introduction_fld\">个人简介</label>\
        </div>\
        <div class=\"col s10\">\
        <a id=\"userInfoChange_submit_btn\" onclick=\"submitUserInfoChange()\" class=\"waves-effect waves-light green btn\">保存变更</a>\
        </div>';
		$('#user_right_div').html(profileHTML);
		$('select').material_select();
		$('input, textarea').characterCounter();
	}
}
function submitUserInfoChange(){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserService.php?serviceType=1&userID=" + $.cookie('UFit_userID')
	+"&realname="+$("#realname_fld").val()+"&age="+$("#age_fld").val()+"&sex="+$("#sex_fld").val()
	+"&height="+$("#height_fld").val()+"&weight="+$("#weight_fld").val()+"&introduction="+$("#introduction_fld").val(), true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var str="php/UserService.php?serviceType=1&userID=" + $.cookie('UFit_userID')
	+"&realname="+$("#realname_fld").val()+"&age="+$("#age_fld").val()+"&sex="+$("#sex_fld").val()
	+"&height="+$("#height_fld").val()+"&weight="+$("#weight_fld").val()+"&introduction="+$("#introduction_fld").val();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var text = xmlhttp.responseText;
			if(text!=1)
				alert("信息提交失败！");
			else{
				alert("修改成功~");
				getProfile($.cookie('UFit_userID'));
			}
				
		}
	};
	xmlhttp.send();
}

function getSafe(){
	$('#user_right_div').html('<div class=\"input-field col s9\">\
		<input id=\"ori_pswd_fld\" type=\"password\">\
		<label for=\"ori_pswd_fld\">原密码</label>\
	</div>\
	<div class=\"input-field col s9\">\
		<input id=\"new_pswd_fld\" type=\"password\">\
		<label for=\"new_pswd_fld\">新密码</label>\
	</div>\
	<div class=\"input-field col s9\">\
		<input id=\"repeat_pswd_fld\" type=\"password\">\
		<label for=\"repeat_pswd_fld\">确认新密码</label>\
	</div>\
	<div class=\"col s10\">\
	<p> </p>\
        <a id=\"changePswd_submit_btn\" onclick=\"submitPswdChange()\" class=\"waves-effect waves-light green btn\">修改密码</a>\
    </div>');
}
function submitPswdChange(){
	if($("#new_pswd_fld").val()!=$("#repeat_pswd_fld").val()){
		alert("两次密码不一致！");
	}
	else{
		var xmlhttp = getXmlHttp();
		xmlhttp.open("GET", "php/UserService.php?serviceType=2&userID=" + $.cookie('UFit_userID')
		+"&ori_pswd="+$("#ori_pswd_fld").val()+"&new_pswd="+$("#new_pswd_fld").val(), true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var text = xmlhttp.responseText;
				if(text==-1){
					alert("原密码输入错误，修改失败。");
				}else if(text==1){
					alert("修改成功！");
				}else{
					alert("修改失败。");
				}
				getSafe();
			}
		};
		xmlhttp.send();
	}
}
function getPrivacy(){
	$('#user_right_div').html('<p>privacy</p>');
}
function getDataImport(){
	$('#user_right_div').html('<p>dataImport</p>');
}
