window.onload=function(){
	$('.collection-item').click(function(){
		jumpTo($(this).attr('id'));
	});
	showRecent();

};
userID=$.cookie('UFit_userID');

function jumpTo(tabID){//处理功能跳转
	$('.collection-item').attr('class','collection-item green-text');
	document.getElementById(tabID).setAttribute('class','collection-item active green');
	switch(tabID){
		case 'recent_btn':showRecent();break;
		case 'exe_btn':showExercise();break;
		case 'sleep_btn':showSleep();break;
		case 'bmi_btn':showBMI();break;
		case 'heart_btn':showHeart();break;
		default:alert("未知的标签");
	}
}
function showRecent(){//选择近况时调用此方法
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=0&userID=" + userID, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		writeRecent(xmlhttp)
	};
	xmlhttp.send();
}
function writeRecent(xmlhttp){//写入近况html
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var jsonArr=jQuery.parseJSON(xmlhttp.responseText);
		var totalCal=0.0;//总卡路里消耗
		var goodSleep=0;//优质睡眠
		var totalDist=0.0;//总运动距离
		var totalSlp=0.0;
		var standardCal=3250.0;
		for(var i=0;i<7;i++){
			var tempJson=jQuery.parseJSON(jsonArr[i]);
			totalCal+=tempJson.cal;
			totalDist+=tempJson.dist;
			totalSlp+=tempJson.sleeptime;
			if(tempJson.sleeptime>7.0)
				goodSleep++;
		}
		var showTotalCal=totalCal;
		if(totalCal>standardCal)
			showTotalCal=standardCal;
		var goalRate=(showTotalCal/standardCal*100.0).toFixed(1);//用于图表显示
		var avgSlp=totalSlp/7.0;
		var recentHTML="<div id='goalChart' style='width:600px;height:300px'></div>\
		<div><p class='normalText'>近7天运动共消耗卡路里<span class='emText' >"+totalCal.toFixed(1)+"</span>千卡。</p></div>\
		<div><p class='normalText'>近7天运动总运动距离<span class='emText' >"+(totalDist/1000).toFixed(3)+"</span>公里。</p></div>\
		<div><p class='normalText'>日均睡眠时间<span class='emText' >"+avgSlp.toFixed(1)+"</span>小时，优质睡眠<span class='emText' >"+goodSleep+"</span>次。</p></div>";
		
		$('#my_health_right_div').html(recentHTML);
		var goalChart = echarts.init(document.getElementById('goalChart'));
		var goalOpt= {
			title:{text:"近7天运动目标完成率"},
			color:['#4caf50','#ffcc80'],
            series : [
                {
                    name:"近7天运动目标完成率",
                    type:"pie",
                    x:'center',
                    data:[{value:goalRate,name:'已完成'+goalRate+"%"},
                    {value:(100.0-goalRate).toFixed(1),name:'未完成'+(100-goalRate).toFixed(1)+"%"}],
                   	radius:['55%','75%'],
                   	startAngle:0,
                   	itemStyle:{
                   		normal:{
                   			labelLine:{show:true},
                   			label:{
                   				show:true
                   			}
                   		},
                   		emphasis: {
        					label: {
            					show: true,
					            position: 'center'
					        },
					        labelLine: {
					            show: false
					        }
					    }
                   	}
                }
            ]
        };
		goalChart.setOption(goalOpt);
	}
}
//--------------------------------------------------------------------------------------------------------------
function showExercise(){//选择运动情况时调用此方法
	var d=new Date();
	var zeroMonth='0';
	var zeroDay='0';
	if((d.getMonth()+1)>=10)
		zeroMonth='';
	if(d.getDate()>=10)
		zeroDay='';
	var nowDate=d.getFullYear()+'-'+zeroMonth+(d.getMonth()+1)+'-'+zeroDay+d.getDate();
	var exeHTML="<div class='row'>\
    <div class='col s12'>\
      <ul class='tabs'>\
        <li id='dTabTtl' class='tab col s4'><a href='#exeDTab'>每日运动统计</a></li>\
        <li class='tab col s4'><a id='mTabTtl' href='#exeMTab'>月度运动统计</a></li>\
        <li id='yTabTtl' class='tab col s4'><a href='#exeYTab'>全年运动统计</a></li>\
      </ul>\
    </div>\
    <div id='exeDTab' class='col s12 m12 l12'><br/>\
	    <input id='dtFld' type='date' value='"+nowDate+"' class='datepicker col s4 m2 l2'>\
		<span class='col s2 m2 l2'><a style='margin-top:5px;' class='btn-floating waves-effect waves-light green' onclick='exeDailyChange($(\"#dtFld\").val())'><i class='material-icons'>search</i></a></span>\
		<div id='dailyGoalChart' style='width:600px;height:300px'></div>\
		<br/><br/>\
		<div id='dailyInfo'></div>\
	</div>\
    <div id='exeMTab' class='col s12 m12 l12'><br/>\
    	<div class='input-field col s4 m4 l4'>\
    		<select id='yearFld'>\
      			<option value='2014'>2014</option>\
      			<option value='2015' selected>2015</option>\
      			<option value='2016'>2016</option>\
    		</select>\
    		<label>年</label>\
  		</div>\
  		<div class='input-field col s4 m4 l4'>\
    		<select id='monthFld'>\
      			<option value='01'>一月</option>\
      			<option value='02'>二月</option>\
      			<option value='03'>三月</option>\
      			<option value='04'>四月</option>\
      			<option value='05'>五月</option>\
      			<option value='06'>六月</option>\
      			<option value='07'>七月</option>\
      			<option value='08'>八月</option>\
      			<option value='09'>九月</option>\
      			<option value='10'>十月</option>\
      			<option value='11'>十一月</option>\
      			<option value='12' selected>十二月</option>\
    		</select>\
    		<label>月</label>\
  		</div>\
  		<span class='col s2 m2 l2'><a style='margin-top:10px;' class='btn-floating waves-effect waves-light green' onclick='exeMonthChange($(\"#yearFld\").val(),$(\"#monthFld\").val())'><i class='material-icons'>search</i></a></span>\
  		<div id='monthChart' style='width:650px;height:500px'></div>\
    </div>\
    <div id='exeYTab' class='col s12 m12 l12'><br/>\
    	<div class='input-field col s4 m4 l4'>\
    		<select id='YFld'>\
      			<option value='2014'>2014</option>\
      			<option value='2015' selected>2015</option>\
      			<option value='2016'>2016</option>\
    		</select>\
    		<label>年</label>\
  		</div>\
  		<span class='col s2 m2 l2'><a style='margin-top:10px;' class='btn-floating waves-effect waves-light green' onclick='exeYearChange($(\"#YFld\").val())'><i class='material-icons'>search</i></a></span>\
  		<div id='yearChart' style='width:650px;height:500px'></div>\
    </div>\
  </div>\
  <div class='col s12 m12 l12'><br/><br/><br/><p>消耗热量=基础代谢+身体活动总消耗+食物热效应。</p><br/><p>60分钟各项运动消耗热量表：</p>\
  	<table class='centered striped'>\
		<thead>\
          <tr>\
              <th data-field='category'>运动项目</th>\
              <th data-field='kcal'>60分钟消耗热量（千卡）</th>\
          </tr>\
        </thead>\
        <tbody>\
          <tr>\
            <td>游泳</td>\
            <td>1036</td>\
          </tr>\
          <tr>\
            <td>逛街</td>\
            <td>110</td>\
          </tr>\
          <tr>\
            <td>网球</td>\
            <td>352</td>\
          </tr>\
          <tr>\
            <td>高尔夫</td>\
            <td>186</td>\
          </tr>\
          <tr>\
            <td>滑雪</td>\
            <td>354</td>\
          </tr>\
          <tr>\
            <td>爬楼梯</td>\
            <td>480</td>\
          </tr>\
          <tr>\
            <td>跳绳</td>\
            <td>448</td>\
          </tr>\
          <tr>\
            <td>慢走</td>\
            <td>255</td>\
          </tr>\
          <tr>\
            <td>快走</td>\
            <td>555</td>\
          </tr>\
          <tr>\
            <td>慢跑</td>\
            <td>655</td>\
          </tr>\
          <tr>\
            <td>快跑</td>\
            <td>700</td>\
          </tr>\
          <tr>\
            <td>仰卧起坐</td>\
            <td>432</td>\
          </tr>\
        </tbody>\
	</table>\
  </div>";
	$('#my_health_right_div').html(exeHTML);
	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 ,// Creates a dropdown of 15 years to control year	
	});
	exeDailyChange(nowDate);
	exeMonthChange(d.getFullYear(),(d.getMonth()+1));
	exeYearChange(d.getFullYear());
	$('ul.tabs').tabs();
	$('select').material_select();
	
}
function exeDailyChange(dt){//近况处日期改变时调用此方法
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=1&userID=" + userID+"&date="+dt, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseExeDailyChange(xmlhttp)
	};
	xmlhttp.send();
}
function responseExeDailyChange(xmlhttp){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var goalRate=(result.cal/450.0*100.0).toFixed(1);
		if(result.cal>450.0)
			goalRate=100.0;
		var goalChart=echarts.init(document.getElementById('dailyGoalChart'));
		var goalOpt= {
			color:['#4caf50','#ffcc80'],
            series : [
                {
                    name:"今日运动目标完成率",
                    type:"pie",
                    x:'center',
                    data:[{value:goalRate,name:'已完成'+goalRate+"%"},
                    {value:(100-goalRate).toFixed(1),name:'未完成'+(100-goalRate).toFixed(1)+"%"}],
                   	radius:['55%','75%'],
                   	startAngle:0,
                   	itemStyle:{
                   		normal:{
                   			labelLine:{show:true},
                   			label:{
                   				show:true
                   			}
                   		},
                   		emphasis: {
        					label: {
            					show: true,
					            position: 'center'
					        },
					        labelLine: {
					            show: false
					        }
					    }
                   	}
                }
            ]
        };
		goalChart.setOption(goalOpt);
		var dailyInfoHTML="<p class='normalText'>运动消耗<span class='emText'>"+result.cal+"</span>千卡。</p>\
		<p class='normalText'>运动步数<span class='emText'>"+result.step+"</span>步。</p>\
		<p class='normalText'>运动里程<span class='emText'>"+result.dist+"</span>米。</p>";
		$('#dailyInfo').html(dailyInfoHTML);
	}
}
function exeMonthChange(year,month){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=2&userID=" + userID+"&year="+year+"&month="+month, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseMonthChange(xmlhttp,year,month)
	};
	xmlhttp.send();
}
function responseMonthChange(xmlhttp,year,month){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var stepArr=new Array();
		var calArr=new Array();
		var distArr=new Array();
		var xName=new Array();
		for(var i=0;i<result.length;i++){
			var tmpJson=jQuery.parseJSON(result[i]);
			stepArr[i]=tmpJson.step;
			calArr[i]=tmpJson.cal;
			distArr[i]=tmpJson.dist;
			xName[i]=(i+1)+'日';
		}
		var monthChart = echarts.init(document.getElementById('monthChart'));
		var monthOpt= {
			title:{text:year+"年"+month+"月运动统计",x:'center'},
			legend:{
				x:'left',
				data:['热量(千卡)','步数','距离(米)']
			},
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'bar',
					name:'热量(千卡)',
					data:calArr,
					markLine:{data:[{type:'average',name:'热量均值'}]}
				},
				{
					type:'bar',
					name:'步数',
					data:stepArr,
					markLine:{data:[{type:'average',name:'步数均值'}]}
				},
				{
					type:'bar',
					name:'距离(米)',
					data:distArr,
					markLine:{data:[{type:'average',name:'距离均值'}]}
				}
			]
        };
		monthChart.setOption(monthOpt);
	}
}
function exeYearChange(year){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=3&userID=" + userID+"&year="+year, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseYearChange(xmlhttp,year)
	};
	xmlhttp.send();
}
function responseYearChange(xmlhttp,year){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var yearChart = echarts.init(document.getElementById('yearChart'));
		var xName=new Array();
		for(var i=0;i<result.monthNum;i++)
			xName[i]=(i+1)+'月';
		var yearOpt= {
			title:{text:year+"年"+"运动统计",x:'center'},
			legend:{
				x:'left',
				data:['热量(千卡)','步数','距离(米)']
			},
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'bar',
					name:'热量(千卡)',
					data:result.avgCalArr,
					markLine:{data:[{type:'average',name:'热量均值'}]}
				},
				{
					type:'bar',
					name:'步数',
					data:result.avgStepArr,
					markLine:{data:[{type:'average',name:'步数均值'}]}
				},
				{
					type:'bar',
					name:'距离(米)',
					data:result.avgDistArr,
					markLine:{data:[{type:'average',name:'距离均值'}]}
				}
			]
        };
		yearChart.setOption(yearOpt);
	}
}
//--------------------------------------------------------------------------
function showSleep(){
	var d=new Date();
	var zeroMonth='0';
	var zeroDay='0';
	if((d.getMonth()+1)>=10)
		zeroMonth='';
	if(d.getDate()>=10)
		zeroDay='';
	var nowDate=d.getFullYear()+'-'+zeroMonth+(d.getMonth()+1)+'-'+zeroDay+d.getDate();
	var slpHTML="<div class='row'>\
    <div class='col s12'>\
      <ul class='tabs'>\
        <li id='dTabTtl' class='tab col s4'><a href='#slpDTab'>每日睡眠统计</a></li>\
        <li id='mTabTtl' class='tab col s4'><a href='#slpMTab'>月度睡眠统计</a></li>\
        <li id='yTabTtl' class='tab col s4'><a href='#slpYTab'>全年睡眠统计</a></li>\
      </ul>\
    </div>\
    <div id='slpDTab' class='col s12 m12 l12'><br/>\
	    <input id='dtFld' type='date' value='"+nowDate+"' class='datepicker col s4 m2 l2'>\
		<span class='col s2 m2 l2'><a style='margin-top:5px;' class='btn-floating waves-effect waves-light green' onclick='slpDailyChange($(\"#dtFld\").val())'><i class='material-icons'>search</i></a></span>\
		<div id='slpDailyChart' style='width:600px;height:300px'></div>\
		<br/><br/>\
		<div id='slpDailyInfo'></div>\
	</div>\
    <div id='slpMTab' class='col s12 m12 l12'><br/>\
    	<div class='input-field col s4 m4 l4'>\
    		<select id='yearFld'>\
      			<option value='2014'>2014</option>\
      			<option value='2015' selected>2015</option>\
      			<option value='2016'>2016</option>\
    		</select>\
    		<label>年</label>\
  		</div>\
  		<div class='input-field col s4 m4 l4'>\
    		<select id='monthFld'>\
      			<option value='01'>一月</option>\
      			<option value='02'>二月</option>\
      			<option value='03'>三月</option>\
      			<option value='04'>四月</option>\
      			<option value='05'>五月</option>\
      			<option value='06'>六月</option>\
      			<option value='07'>七月</option>\
      			<option value='08'>八月</option>\
      			<option value='09'>九月</option>\
      			<option value='10'>十月</option>\
      			<option value='11'>十一月</option>\
      			<option value='12' selected>十二月</option>\
    		</select>\
    		<label>月</label>\
  		</div>\
  		<span class='col s2 m2 l2'><a style='margin-top:10px;' class='btn-floating waves-effect waves-light green' onclick='slpMonthChange($(\"#yearFld\").val(),$(\"#monthFld\").val())'><i class='material-icons'>search</i></a></span>\
  		<div id='slpMonthChart' style='width:650px;height:500px'></div>\
    </div>\
    <div id='slpYTab' class='col s12 m12 l12'><br/>\
    	<div class='input-field col s4 m4 l4'>\
    		<select id='YFld'>\
      			<option value='2014'>2014</option>\
      			<option value='2015' selected>2015</option>\
      			<option value='2016'>2016</option>\
    		</select>\
    		<label>年</label>\
  		</div>\
  		<span class='col s2 m2 l2'><a style='margin-top:10px;' class='btn-floating waves-effect waves-light green' onclick='slpYearChange($(\"#YFld\").val())'><i class='material-icons'>search</i></a></span>\
  		<div id='slpYearChart' style='width:650px;height:500px'></div>\
    </div>\
  </div>\
  <div class='col s12 m12 l12'><br/><br/>\
  	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;睡眠是生命的需要，所以人不能没有睡眠，而且每天缺少的睡眠还要补上，否则会受到惩罚，很像欠债一定要还一样。</p>\
  	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从睡眠仪的检查结果来看，正常人在睡眠时有时眼球不活动或者只有很慢的浮动，这段时间比较长；但有时眼球很快地来回活动，这段时间比较短，与眼球慢动或快动的同时，脑电图出现不同的变化。由此，科学家把睡眠分成非快速眼动相睡眠和快速眼动相睡眠两部分，为书写方便起见，在文献中都用英文缩写的第一个大写字母来表示，非快速眼动相睡眠写作NREM，而快速眼动相睡眠写作REM。</p>\
  	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常睡眠时的基本规律是，正常成年人在睡眠一开始先进入NREM，由浅入深，大概经过60～90分钟后，转成REM，REM持续时间只有10～15分钟左右，然后又转成NREM，就这样周期性地交替出现NREM和REM，一夜出现4～6次，直到清醒为止。</p>\
  </div>";
	$('#my_health_right_div').html(slpHTML);
	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 ,// Creates a dropdown of 15 years to control year	
	});
	slpDailyChange(nowDate);
	slpMonthChange(d.getFullYear(),(d.getMonth()+1));
	slpYearChange(d.getFullYear());
	$('ul.tabs').tabs();
	$('select').material_select();
}
function slpDailyChange(dt){//睡眠近况处日期改变时调用此方法
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=1&userID=" + userID+"&date="+dt, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseSlpDailyChange(xmlhttp)
	};
	xmlhttp.send();
}
function responseSlpDailyChange(xmlhttp){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var deepSlpRate=(result.deepSleep/result.sleeptime*100.0).toFixed(1);
		var slpDailyChart=echarts.init(document.getElementById('slpDailyChart'));
		var slpDailyOpt= {
			color:['#4caf50','#ffcc80'],
            series : [
                {
                    name:"今日睡眠统计",
                    type:"pie",
                    x:'center',
                    data:[{value:deepSlpRate,name:'深度睡眠占'+deepSlpRate+"%"},
                    {value:(100-deepSlpRate).toFixed(1),name:'非深度睡眠占'+(100-deepSlpRate).toFixed(1)+"%"}],
                   	radius:['55%','75%'],
                   	startAngle:0,
                   	itemStyle:{
                   		normal:{
                   			labelLine:{show:true},
                   			label:{
                   				show:true
                   			}
                   		},
                   		emphasis: {
        					label: {
            					show: true,
					            position: 'center'
					        },
					        labelLine: {
					            show: false
					        }
					    }
                   	}
                }
            ]
        };
		slpDailyChart.setOption(slpDailyOpt);
		var dailyInfoHTML="<p class='normalText'>睡眠<span class='emText'>"+result.sleeptime+"</span>小时。</p>\
		<p class='normalText'>其中，深度睡眠<span class='emText'>"+result.deepSleep+"</span>小时。</p>";
		$('#slpDailyInfo').html(dailyInfoHTML);
	}
}
function slpMonthChange(year,month){
var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=2&userID=" + userID+"&year="+year+"&month="+month, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseSlpMonthChange(xmlhttp,year,month)
	};
	xmlhttp.send();
}
function responseSlpMonthChange(xmlhttp,year,month){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var sleepArr=new Array();
		var deepSleepArr=new Array();
		var xName=new Array();
		for(var i=0;i<result.length;i++){
			var tmpJson=jQuery.parseJSON(result[i]);
			sleepArr[i]=tmpJson.sleeptime;
			deepSleepArr[i]=tmpJson.deepSleep;
			xName[i]=(i+1)+'日';
		}
		var slpMonthChart = echarts.init(document.getElementById('slpMonthChart'));
		var slpMonthOpt= {
			title:{text:year+"年"+month+"月睡眠统计",x:'center'},
			legend:{
				x:'left',
				data:['睡眠(小时)','深度睡眠(小时)']
			},
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'bar',
					name:'睡眠(小时)',
					data:sleepArr,
					markLine:{data:[{type:'average',name:'睡眠均值'}]}
				},
				{
					type:'bar',
					name:'深度睡眠(小时)',
					data:deepSleepArr,
					markLine:{data:[{type:'average',name:'深度睡眠均值'}]}
				}
			]
        };
		slpMonthChart.setOption(slpMonthOpt);
	}
}
function slpYearChange(year){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=4&userID=" + userID+"&year="+year, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseSlpYearChange(xmlhttp,year)
	};
	xmlhttp.send();
}
function responseSlpYearChange(xmlhttp,year){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var slpYearChart = echarts.init(document.getElementById('slpYearChart'));
		var xName=new Array();
		for(var i=0;i<result.monthNum;i++)
			xName[i]=(i+1)+'月';
		var slpYearOpt= {
			title:{text:year+"年"+"睡眠统计",x:'center'},
			legend:{
				x:'left',
				data:['睡眠(小时)','深度睡眠(小时)']
			},
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'bar',
					name:'睡眠(小时)',
					data:result.avgSlpArr,
					markLine:{data:[{type:'average',name:'睡眠均值'}]}
				},
				{
					type:'bar',
					name:'深度睡眠(小时)',
					data:result.avgDeepSleepArr,
					markLine:{data:[{type:'average',name:'深度睡眠均值'}]}
				}
			]
        };
		slpYearChart.setOption(slpYearOpt);
	}
}
//-------------------------------------------------------------------------
function showBMI(){
	var bmiHTML="<br/><div id='bmiChart' style='width:650px;height:300px'></div><br/><br/>\
	<div class='center'>\
		<div class='input-field col s5 m5 l5'>\
        	<input id='heightFld' type='text'>\
          	<label class='active' for='heightFld'>身高(cm)</label>\
		</div> \
		<div class='input-field col s5 m5 l5'>\
        	<input id='weightFld' type='text'>\
          	<label class='active' for='weightFld'>体重(kg)</label>\
		</div> \
		<span class='col s2 m2 l2'><a style='margin-top:10px;' class='btn-floating waves-effect waves-light green' onclick='bmiChange($(\"#heightFld\").val(),$(\"#weightFld\").val())'><i class='material-icons'>search</i></a></span>\
		</div>\
		<div class='col s12 m12 l12'><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BMI指数（即身体质量指数，简称体质指数又称体重，英文为Body Mass Index，简称BMI），是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</p></div>\
	<div class='col s12 m12 l12'><p>BMI指数的中国参考标准：</p>\
	<table class='centered striped'>\
		<thead>\
          <tr>\
              <th data-field='category'>BMI分类</th>\
              <th data-field='who'>WHO标准</th>\
              <th data-field='asia'>亚洲标准</th>\
              <th data-field='China'>中国参考标准</th>\
              <th data-field='danger'>相关疾病发病的危险性</th>\
          </tr>\
        </thead>\
        <tbody>\
          <tr>\
            <td>偏瘦</td>\
            <td>&lt;18.5</td>\
            <td>&lt;18.5</td>\
            <td>&lt;18.5</td>\
            <td>低（但其他疾病危险性增加）</td>\
          </tr>\
          <tr>\
            <td>正常</td>\
            <td>18.5~24.9</td>\
            <td>18.5~22.9</td>\
            <td>18.5~23.9</td>\
            <td>平均水平</td>\
          </tr>\
          <tr>\
            <td>超重</td>\
            <td>&ge;25</td>\
            <td>&ge;23</td>\
            <td>&ge;24</td>\
            <td>&nbsp;</td>\
          </tr>\
          <tr>\
            <td>偏胖</td>\
            <td>25.0~29.9</td>\
            <td>23.0~24.9</td>\
            <td>24.0~27.9</td>\
            <td>增加</td>\
          </tr>\
          <tr>\
            <td>肥胖</td>\
            <td>30.0~34.9</td>\
            <td>25.0~29.9</td>\
            <td>&ge;28</td>\
            <td>中度增加</td>\
          </tr>\
          <tr>\
            <td>重度肥胖</td>\
            <td>35.0~39.9</td>\
            <td>&ge;30</td>\
            <td>&nbsp;</td>\
            <td>严重增加</td>\
          </tr>\
          <tr>\
            <td>极重度肥胖</td>\
            <td>&ge;40.0</td>\
            <td>&ge;40.0</td>\
            <td>&ge;40.0</td>\
            <td>非常严重增加</td>\
          </tr>\
        </tbody>\
	</table>\
	</div>";
	$('#my_health_right_div').html(bmiHTML);
	getDefaultBMI();
}
function getDefaultBMI(){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserService.php?serviceType=3&userID=" + userID, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result=jQuery.parseJSON(xmlhttp.responseText);
			$('#heightFld').val(result.height);
			$('#weightFld').val(result.weight);
			bmiChange(result.height,result.weight);
		}
	};
	xmlhttp.send();
}
function bmiChange(height,weight){
	var bmi=(weight/Math.pow(height/100.0,2.0)).toFixed(1);
	var bmiChart=echarts.init(document.getElementById('bmiChart'));
	var bmiOpt= {
		
		series:[
		{
			name:'BMI',
			type:'gauge',
			center:['50%','50%'],
			x:'center',
			radius:150,
			splitNum:20,
			axisTick:{
				splitNum:2,
				length:12
			},
			min:0,
			max:40,
			data:[
			{
				value:bmi,
				name:'BMI'
			}
			]
		}
		]
    };
	bmiChart.setOption(bmiOpt);
}

//-------------------------------------------------------------------------
function showHeart(){
	var d=new Date();
	var zeroMonth='0';
	var zeroDay='0';
	if((d.getMonth()+1)>=10)
		zeroMonth='';
	if(d.getDate()>=10)
		zeroDay='';
	var nowDate=d.getFullYear()+'-'+zeroMonth+(d.getMonth()+1)+'-'+zeroDay+d.getDate();
	var hrtHTML="<div class='row'>\
    <div class='col s12'>\
      <ul class='tabs'>\
        <li class='tab col s4'><a href='#hrtTab'>心率</a></li>\
        <li class='tab col s4'><a href='#bpTab'>血压</a></li>\
      </ul>\
    </div>\
    <div id='hrtTab' class='col s12 m12 l12'><br/>\
	    <input id='dtFld' type='date' value='"+nowDate+"' class='datepicker col s4 m2 l2'>\
		<span class='col s2 m2 l2'><a style='margin-top:5px;' class='btn-floating waves-effect waves-light green' onclick='hrtChange($(\"#dtFld\").val())'><i class='material-icons'>search</i></a></span>\
		<div id='hrtChart' style='width:650px;height:300px'></div><br/><br/>\
		<div>\
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心率变化与心脏疾病密切相关。如果心率超过160次/分钟，或低于40次/分钟，大多见于心脏病患者，如常伴有心悸、胸闷等不适感，应及早进行详细检查，以便针对病因进行治疗。</p>\
<p><strong style='font-weight:900'>1.心动过速</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成人安静时心率超过100次/分钟（一般不超过160次/分钟），称为窦性心动过速，常见于兴奋、激动、吸烟、饮酒、喝浓茶或咖啡后，或见于感染、发热、休克、贫血、缺氧、甲亢、心力衰竭等病理状态下，或见于应用阿托品、肾上腺素、麻黄素等药物后。</p>\
<p><strong style='font-weight:900'>2.心动过缓</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成人安静时心率低于60次/分钟（一般在45次/分钟以上），称为窦性心动过缓，可见于长期从事重体力劳动的健康人和运动员；或见于甲状腺机能低下、颅内压增高、阻塞性黄疸以及洋地黄、奎尼丁或心得安类药物过量。如果心率低于40次/分钟，应考虑有病态窦房结综合征、房室传导阻滞等情况。如果脉搏强弱不等、不齐且脉率少于心率，应考虑心房纤颤。</p>\
<p><strong style='font-weight:900'>3.正确看待窦性心动过缓</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;很多人都会有窦性心动过缓伴不齐，对于多数人来说是正常的，不必过于担心。窦性心动过缓是指心率低于60次/分钟的人，是否会出现此症状，与其心跳过缓的频率和引起心跳过缓的原因有关。在安静状态下，成年人的心率若在50～60次/分钟之间一般不会出现明显症状。尤其是一些训练有素的运动员以及长期从事体力劳动的人，在安静状态下即使其心率在40次/分钟左右也不会出现明显症状。但是一般人的心率若在40～50次/分钟之间，就会出现胸闷、乏力、头晕等症状，若其心率降至35～40次/分钟则会发生血流动力学改变，使心脑器官的供血受到影响，从而出现胸部闷痛、头晕、晕厥甚至猝死。如果自我感觉没有任何不适，不用去理会心电图所说的“窦性心动过缓伴不齐”，但如果出现胸闷、乏力、头晕等不适症状，应立即到医院进一步检查，比如动态心电图、心脏彩超等检查，了解心动过缓的病因，如果心跳过慢，可以通过安装心脏起搏器缓解症状，改善预后。</p>\
		</div>\
	</div>\
	<div id='bpTab' class='col s12 m12 l12'><br/>\
	    <input id='bpdtFld' type='date' value='"+nowDate+"' class='datepicker col s4 m2 l2'>\
		<span class='col s2 m2 l2'><a style='margin-top:5px;' class='btn-floating waves-effect waves-light green' onclick='bpChange($(\"#bpdtFld\").val())'><i class='material-icons'>search</i></a></span>\
		<div id='bpChart' style='width:650px;height:300px'></div><br/><br/>\
		<div>\
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人的血液输送到全身各部位需要一定的压力，这个压力就是血压。血管内血液对于单位面积血管壁的侧压力，即压强。由于血管分动脉、毛细血管和静脉，所以，也就有动脉血压、毛细血管压和静脉血压。通常所说的血压是指动脉血压 。当血管扩张时，血压下降；血管收缩时，血压升高。体循环动脉血压简称“血压”（blood pressure，BP）。血压是血液在血管内流动时，作用于血管壁的压力，它是推动血液在血管内流动的动力。心室收缩，血液从心室流入动脉，此时血液对动脉的压力最高，称为收缩压（systolic blood pressure ，SBP ）。心室舒张，动脉血管弹性回缩，血液仍慢慢继续向前流动，但血压下降，此时的压力称为舒张压（diastolic blood pressure，DBP）。</p>\
		<p>中国人平均正常血压参考值 (mmHg):</p>\
		<table class='centered striped'>\
		<thead>\
          <tr>\
              <th data-field='age'>年龄</th>\
              <th data-field='ms'>收缩压（男）</th>\
              <th data-field='md'>舒张压（男）</th>\
              <th data-field='fs'>收缩压（女）</th>\
              <th data-field='fd'>舒张压（女）</th>\
          </tr>\
        </thead>\
        <tbody>\
          <tr>\
            <td>16~20</td>\
            <td>115</td>\
            <td>73</td>\
            <td>110</td>\
            <td>70</td>\
          </tr>\
          <tr>\
            <td>21~25</td>\
            <td>115</td>\
            <td>73</td>\
            <td>110</td>\
            <td>71</td>\
          </tr>\
          <tr>\
            <td>26~30</td>\
            <td>115</td>\
            <td>75</td>\
            <td>112</td>\
            <td>73</td>\
          </tr>\
          <tr>\
            <td>31~35</td>\
            <td>117</td>\
            <td>76</td>\
            <td>114</td>\
            <td>74</td>\
          </tr>\
          <tr>\
            <td>36~40</td>\
            <td>120</td>\
            <td>80</td>\
            <td>116</td>\
            <td>77</td>\
          </tr>\
          <tr>\
            <td>41~45</td>\
            <td>124</td>\
            <td>81</td>\
            <td>122</td>\
            <td>78</td>\
          </tr>\
          <tr>\
            <td>46~50</td>\
            <td>128</td>\
            <td>82</td>\
            <td>128</td>\
            <td>79</td>\
          </tr>\
          <tr>\
            <td>51~55</td>\
            <td>134</td>\
            <td>84</td>\
            <td>134</td>\
            <td>80</td>\
          </tr>\
          <tr>\
            <td>56~60</td>\
            <td>137</td>\
            <td>84</td>\
            <td>139</td>\
            <td>82</td>\
          </tr>\
          <tr>\
            <td>61~65</td>\
            <td>148</td>\
            <td>86</td>\
            <td>145</td>\
            <td>83</td>\
          </tr>\
        </tbody>\
	</table>\
		</div>\
	</div>\
  </div>";
	$('#my_health_right_div').html(hrtHTML);
	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 ,// Creates a dropdown of 15 years to control year	
	});
	hrtChange(nowDate);
	bpChange(nowDate);
	$('ul.tabs').tabs();
	$('select').material_select();
}
function hrtChange(dt){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=1&userID=" + userID+"&date="+dt, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseHrtChange(xmlhttp)
	};
	xmlhttp.send();
}
function responseHrtChange(xmlhttp){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var xName=new Array();
		for(var i=0;i<24;i++)
			xName[i]=i+'时';
			
		var hrtChart=echarts.init(document.getElementById('hrtChart'));
		var hrtOpt= {
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'line',
					name:'心率',
					data:result.hr,
					markLine:{
						data:[
							[
						    {name: '正常值下限', value: 60, xAxis:-1, yAxis:60},
						    {name: '正常值下限', xAxis: 24, yAxis: 60}
						    ],
						    [
						    {name: '正常值上限', value:100, xAxis: -1, yAxis: 100},
						    {name: '正常值上限', xAxis:24, yAxis: 100}
						    ]
						]
					}
				}
			]
        };
		hrtChart.setOption(hrtOpt);
	}
}
//--------------------------------
function bpChange(dt){
	var xmlhttp = getXmlHttp();
	xmlhttp.open("GET", "php/UserHealthService.php?serviceType=1&userID=" + userID+"&date="+dt, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		responseBpChange(xmlhttp)
	};
	xmlhttp.send();
}
function responseBpChange(xmlhttp){
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var result=jQuery.parseJSON(xmlhttp.responseText);
		var xName=new Array();
		for(var i=0;i<24;i++)
			xName[i]=i+'时';
			
		var bpChart=echarts.init(document.getElementById('bpChart'));
		var bpOpt= {
			legend:{
				x:'left',
				data:['收缩压(mmHg)','舒张压(mmHg)']
			},
			xAxis:[
				{
					show:true,type:'category',data:xName
				}
			],
			yAxis:[
				{
					show:true,type:'value'
				}
			],
			tooltip:{trigger:'item'},
			series:[
				{
					type:'line',
					name:'收缩压(mmHg)',
					data:result.sp,
					markLine:{
						data:[
							[
						    {name: '收缩压正常值下限', value: 90, xAxis: 0, yAxis:90},
						    {name: '收缩压正常值下限', xAxis: 24, yAxis: 90}
						    ],
						    [
						    {name: '收缩压正常值上限', value:140, xAxis: 0, yAxis: 140},
						    {name: '收缩压正常值上限', xAxis: 24, yAxis: 140}
						    ]
						]
					}
				},
				{
					type:'line',
					name:'舒张压(mmHg)',
					data:result.dp,
					markLine:{
						data:[
							[
						    {name: '舒张压正常值下限', value: 60, xAxis: 0, yAxis:60},
						    {name: '舒张压正常值下限', xAxis: 24, yAxis: 60}
						    ],
						    [
						    {name: '舒张压正常值上限', value:90, xAxis: 0, yAxis: 90},
						    {name: '舒张压正常值上限', xAxis: 24, yAxis: 90}
						    ]
						]
					}
				}
			]
        };
		bpChart.setOption(bpOpt);
	}
}