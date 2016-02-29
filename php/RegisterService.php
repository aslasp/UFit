<?php 
switch($_GET['serviceType']){
	case 0:isNameExist();break;
	case 1:isEmailExist();break;
	case 2:register();break;
}
function isNameExist(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="select count(*) from user where id='".$_GET['userID']."'";
	$result=$co->query($sql)->fetch();
	$co=null;
	echo $result[0];
}
function isEmailExist(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="select count(*) from user where email='".$_GET['email']."'";
	$result=$co->query($sql)->fetch();
	$co=null;
	echo $result[0];
}
function register(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="insert into user(id,password,email,age,sex,height,weight) 
values('".$_GET['userID']."','".$_GET['password']."','".$_GET['email']."',".$_GET['age']
.",'".$_GET['sex']."',".$_GET['height'].",".$_GET['weight'].")";
	$result=$co->query($sql);
	$co=null;
	if($result==FALSE)
		echo 0;
	else{
		$pathname='../data/dev_data/'.$_GET['userID'];
		mkdir($pathname);
		$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
		setcookie('UFit_userID',$_GET['userID'],time()+60*60*24*365, '/', $domain, false);
		echo 1;
	}
}
?>