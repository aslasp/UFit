<?php
	$userID='wn13';
	$year='2015';
	$arr=array();
	$dir = opendir("data/dev_data/".$userID);
	while (($filename = readdir($dir)) !== false){
  		$tmpArr=split("-", $filename);

		if($tmpArr[0]==$year){
			$tmpFile=fopen("data/dev_data/".$userID."/".$filename, "r");
			$arr[intval($tmpArr[1])-1][]=fread($tmpFile,filesize("data/dev_data/".$userID."/".$filename));
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
 ?>