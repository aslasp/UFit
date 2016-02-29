<?php
switch($_GET['serviceType']){
	case 0:userLogin();break;
	case 1:drLogin();break;
	case 2:adminLogin();break;
}
function userLogin(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="select count(*) from user where id='".$_GET['userID']."' and password='".$_GET['password']
	."'";
	$result=$co->query($sql)->fetch();
	$co=null;
	if($result[0]==0){
		echo 0;
	}
	else if($result[0]==1 && $_GET['remember']=='true'){
		$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
		setcookie('UFit_userID',$_GET['userID'],time()+60*60*24*365, '/', $domain, false);
		echo 1;
	}
	else if($result[0]==1 && $_GET['remember']=='false'){
		$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
		setcookie('UFit_userID',$_GET['userID'],time()+3600, '/', $domain, false);
		echo 2;
	}
}
function drLogin(){
	
}
function adminLogin(){
	
}
 ?>