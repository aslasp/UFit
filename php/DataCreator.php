<?php
function createUserJson($userID,$date){
	$file=fopen("../data/dev_data/".$userID."/".$date.".json","w");
	$step=mt_rand(500,30000);
	$sleep=round((mt_rand(360, 600)+0.0)/60.0,1);
	$hr=array(mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(60, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 90),mt_rand(65, 90),mt_rand(65, 90)
	,mt_rand(65, 90),mt_rand(65,100),mt_rand(65, 100),mt_rand(65, 100),mt_rand(65, 90),mt_rand(65, 90),mt_rand(65, 90),mt_rand(65, 90),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85),mt_rand(65, 85));
	$sp=array(mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),
	mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130)
	,mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130),mt_rand(100, 130));
	$dp=array(mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),
	mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90),mt_rand(65,90));
	//dist单位_米，cal单位_千卡,睡眠_小时,sp收缩压(高压)，dp舒张压(低压)_毫米汞柱
	$arr=array('userID'=>$userID,'date'=>$date,'step'=>$step,'dist'=>($step*0.67),'cal'=>round($step/36.5,1),
	'sleeptime'=>$sleep,'deepSleep'=>round(($sleep+0.0)/mt_rand(2,5),1),'hr'=>$hr,'sp'=>$sp,'dp'=>$dp);
	fwrite($file, json_encode($arr));
	fclose($file);
}
//---运行区域--------------

$startDate="2016-01-02";
for($i=0;$i<1000;$i++){
	$date=date('Y-m-d',strtotime($startDate." -".$i." day"));
	createUserJson('bq13',$date);
	createUserJson('wn13',$date);
	createUserJson('qh13',$date);
}
 ?>