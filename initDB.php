<?php
function initDB() {
	$co = new PDO("sqlite:UFit.db");
	if ($co) {
		echo "UFit.db exist\n";
	}
}

/*$sql="create table user (username varchar(20) primary key,password varchar(20))";
 $connection->exec($sql);
 $data=$connection->query("select * from user")->fetchAll();
 echo $data[0]['username'];*/

function create_user_table() {
	$co = new PDO("sqlite:UFit.db");
	$sql = "create table user (
id varchar(20) primary key,
realname varchar,
password varchar(20) not null,
email varchar not null unique,
age int not null,
sex varchar not null,
height int not null,
weight double not null,
portrait varchar default 'data/portraits/unknown.png',
introduction varchar,
valid boolean default true)";
	$co -> exec($sql);
}

function create_instructor_table() {
	$co = new PDO("sqlite:UFit.db");
	$sql = "create table instructor(
id varchar(20) primary key,
realname varchar,
password varchar(20) not null,
email varchar unique,
age int not null,
sex varchar not null,
portrait varchar default 'data/portraits/unknown.png',
introduction varchar,
isDoctor boolean not null,
valid boolean default true)";
	$co -> exec($sql);
}

function create_admin_table() {
	$co = new PDO("sqlite:UFit.db");
	$sql = "create table admin(
id varchar(20) primary key,
password varchar(20) not null)";
	$co -> exec($sql);
}

function create_activity_table(){
	$co = new PDO("sqlite:UFit.db");
	$sql = "create table activity(id integer primary key AUTOINCREMENT,admin_id varchar(20),`type` int,ddl big int,introductionPath varchar(255));";
	$co -> exec($sql);
}
function create_join_activity_table(){
	$co = new PDO("sqlite:UFit.db");
	$sql = "create table join_activity(acid integer,uid varchar(20));";
	$co -> exec($sql);
}
//----------执行区域-------------

?>