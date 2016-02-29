<?php
switch($_GET['serviceType']){
	case 0:getRecentInfo();break;//获取最近7天运动数据
	case 1:getSingleDateInfo();break;//获取指定日期的数据
	case 2:getMonthInfo();break;//获取指定月份的数据
	case 3:getYearInfo();break;//获取指定年份的数据
	case 4:getYearSleep();break;//获取年度睡眠情况
}
function getRecentInfo(){
	$userID=$_GET['userID'];
	$arr=array();
	for($i=0;$i<7;$i++){
		$tmpDate=date("Y-m-d",strtotime("-".$i." day"));
		$tmpFile=fopen("../data/dev_data/".$userID."/".$tmpDate.".json", "r");
		$arr[]=fread($tmpFile,filesize("../data/dev_data/".$userID."/".$tmpDate.".json"));
		fclose($tmpFile);
	}
	echo json_encode($arr);
}
function getSingleDateInfo(){
	$userID=$_GET['userID'];
	$date=$_GET['date'];
	$file=fopen("../data/dev_data/".$userID."/".$date.".json", "r");
	echo fread($file,filesize("../data/dev_data/".$userID."/".$date.".json"));
}
function getMonthInfo(){
	$userID=$_GET['userID'];
	$year=$_GET['year'];
	$month=$_GET['month'];
	$arr=array();
	//列出目录中的文件
	$dir = opendir("../data/dev_data/".$userID);
	while (($filename = readdir($dir)) !== false){
  		$tmpArr=split("-", $filename);
		if($tmpArr[0]==$year&&$tmpArr[1]==$month){
			$tmpFile=fopen("../data/dev_data/".$userID."/".$filename, "r");
			$arr[]=fread($tmpFile,filesize("../data/dev_data/".$userID."/".$filename));
		}
  	}
  	closedir($dir);
	echo json_encode($arr);
}
function getYearInfo(){
	$userID=$_GET['userID'];
	$year=$_GET['year'];
	$arr=array();
	$dir = opendir("../data/dev_data/".$userID);
	while (($filename = readdir($dir)) !== false){
  		$tmpArr=split("-", $filename);
		if($tmpArr[0]==$year){
			$tmpFile=fopen("../data/dev_data/".$userID."/".$filename, "r");
			$arr[intval($tmpArr[1])-1][]=fread($tmpFile,filesize("../data/dev_data/".$userID."/".$filename));
		}
  	}
	closedir($dir);
	$avgCal=array();	//每个月平均热量
	$avgDist=array();	//每个月平均距离
	$avgStep=array();	//每个月平均步数
	$mnum=count($arr);	//一年有几个月
	for($i=0;$i<$mnum;$i++){
		$mCal=0.0;		//一个月总共卡路里
		$mDist=0.0;		//一个月总共距离
		$mStep=0.0;		//一个月总共步数
		$dnum=count($arr[$i]);//一个月有几天
		for($j=0;$j<$dnum;$j++){
			$tmpJson=json_decode($arr[$i][$j]);
			$mCal+=$tmpJson->{'cal'};
			$mDist+=$tmpJson->{'dist'};
			$mStep+=$tmpJson->{'step'};
		}
		$avgCal[]=round($mCal/$dnum,2);
		$avgDist[]=round($mDist/$dnum,2);
		$avgStep[]=round($mStep/$dnum,2);
	}
	$result=array('monthNum'=>$mnum,'avgCalArr'=>$avgCal,'avgDistArr'=>$avgDist,'avgStepArr'=>$avgStep);
	echo json_encode($result);
}
function getYearSleep(){
	$userID=$_GET['userID'];
	$year=$_GET['year'];
	$arr=array();
	$dir = opendir("../data/dev_data/".$userID);
	while (($filename = readdir($dir)) !== false){
  		$tmpArr=split("-", $filename);
		if($tmpArr[0]==$year){
			$tmpFile=fopen("../data/dev_data/".$userID."/".$filename, "r");
			$arr[intval($tmpArr[1])-1][]=fread($tmpFile,filesize("../data/dev_data/".$userID."/".$filename));
		}
  	}
	closedir($dir);
	$avgSlp=array();	//每个月平均睡眠
	$avgDpSlp=array();	//每个月平均深度睡眠
	$mnum=count($arr);	//一年有几个月
	for($i=0;$i<$mnum;$i++){
		$mSlp=0.0;		//一个月总共睡眠
		$mDpSlp=0.0;	//一个月总共深度睡眠
		$dnum=count($arr[$i]);//一个月有几天
		for($j=0;$j<$dnum;$j++){
			$tmpJson=json_decode($arr[$i][$j]);
			$mSlp+=$tmpJson->{'sleeptime'};
			$mDpSlp+=$tmpJson->{'deepSleep'};
		}
		$avgSlp[]=round($mSlp/$dnum,2);
		$avgDpSlp[]=round($mDpSlp/$dnum,2);
	}
	$result=array('monthNum'=>$mnum,'avgSlpArr'=>$avgSlp,'avgDeepSleepArr'=>$avgDpSlp);
	echo json_encode($result);
}
 ?>