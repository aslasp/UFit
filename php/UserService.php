<?php
switch($_GET['serviceType']){
	case 0:getUserInfo();break;
	case 1:updateUserInfo();break;
	case 2:changePassword();break;
	case 3:getBMI();break;
	case 4:updateBMI();break;
}
function getUserInfo(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="select * from user where id='".$_GET['userID']."'";
	$result=$co->query($sql)->fetchAll();
	$co=null;
	$arr=array('userID'=>$result[0]['id'],'realname'=>$result[0]['realname'],'email'=>$result[0]['email'],
	'age'=>$result[0]['age'],'sex'=>$result[0]['sex'],'height'=>$result[0]['height'],
	'weight'=>$result[0]['weight'],'portrait'=>$result[0]['portrait'],'introduction'=>$result[0]['introduction']);
	
	echo json_encode($arr);
}
function updateUserInfo(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="update user set realname='".$_GET['realname']."',age=".$_GET['age']
	.",sex='".$_GET['sex']."',height=".$_GET['height'].",weight=".$_GET['weight'].",introduction='"
	.$_GET['introduction']."' where id='".$_GET['userID']."'";
	$result=$co->exec($sql);
	$co=null;
	echo $result;
}
function changePassword(){
	$co = new PDO("sqlite:../UFit.db");
	$checksql="select password from user where id='".$_GET['userID']."'";
	$checkResult=$co->query($checksql)->fetch();
	if($checkResult[0]!=$_GET['ori_pswd']){
		$co=null;
		echo -1;
	}
	else{
		$sql="update user set password='".$_GET['new_pswd']."' where id='".$_GET['userID']."'";
		$result=$co->exec($sql);
		$co=null;
		echo $result;
	}
}
function getBMI(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="select * from user where id='".$_GET['userID']."'";
	$result=$co->query($sql)->fetchAll();
	$co=null;
	$arr=array('userID'=>$result[0]['id'],'height'=>$result[0]['height'],'weight'=>$result[0]['weight']);
	echo json_encode($arr);
}
function updateBMI(){
	$co = new PDO("sqlite:../UFit.db");
	$sql="update user set height=".$_GET['height'].",weight=".$_GET['weight']." where id='".$_GET['userID']."'";
	$result=$co->exec($sql);
	$co=null;
	echo $result;
}
 ?>