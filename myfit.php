<html>
<head>
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="css/user.css"
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <script src="js/echarts-all.js"></script>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>FitTime - Health</title>
</head>

<body>
<?php
include "header.php";
?>

<div class="container pagebody">
    <div class="row">
        <div class="col s3 ">
            <div class="collection z-depth-1">
                <a href="#!" class="collection-item grey-text text-darken-4 usernav" id="nav-discover">我的运动
                </a>
                <a href="#!" class="collection-item grey-text text-darken-4 usernav" id="nav-club">身体管理
                </a>
                <a href="#!" class="collection-item grey-text text-darken-4 usernav" id="nav-accessory">睡眠分析</a>

            </div>
        </div>
        <div class="col s9">
            <div class="z-depth-1 userrightpart" style="height: 1300px;">
                <label>您本周的健康情况</label>
                <div class="row">
                    <div class="col s6">
                        <div id="chart1" style="height: 200px;">

                        </div>
                    </div>
                    <div class="col s6">
                        运动目标完成56%
                    </div>
                    <div class="col s7">
                        有氧运动68%


                    </div>

                    <div class="col s8 offset-s4">
                        <div id="chart2" style="height: 200px;">

                        </div>
                    </div>
                    <div class="col s12">
                        <div id="chart3" style="height: 300px;">

                        </div>
                    </div>
                    <div class="col s12">
                        <div id="chart4" style="height: 300px;">

                        </div>
                    </div>
                </div>


            </div>


        </div>
    </div>

</div>

<script type="text/javascript">
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('chart1'));

    var option = {
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                    {value:3000, name:'未完成'},
                    {value:4000, name:'已完成'},
                ]
            }
        ]
    };

    // 为echarts对象加载数据
    myChart.setOption(option);

    var myChart2 = echarts.init(document.getElementById('chart2'));

    var option2 = {

        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                    {value:3000, name:'有氧'},
                    {value:4000, name:'无氧'},
                ]
            }
        ]
    };

    // 为echarts对象加载数据
    myChart2.setOption(option2);
    var myChart3 = echarts.init(document.getElementById('chart3'));
    var option3 = {
        title : {
            text: '一周内心率',
        },
        tooltip : {
            trigger: 'axis'
        },

        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} 次'
                }
            }
        ],
        series : [
            {
                name:'心率',
                type:'line',
                data:[11, 11, 35, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
    myChart3.setOption(option3);
    var myChart4 = echarts.init(document.getElementById('chart4'));
    myChart4.setOption(option3);
</script>

<? include "footer.php";
?>


</body>
</html>