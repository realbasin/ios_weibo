var hit = document.getElementById("back");
var timer = null;
var num = 0;
var p=20;

var add = document.getElementById('add');
var max = document.getElementById('maximum');
var icon = document.getElementsByClassName('icon');
add.addEventListener("click", function() {
	max.style.display = 'block';
	add.style.display = 'none';
	timer = setInterval(function() {
		rotate();
	},25);
	weathFn();
	swi();
	for(var i=0;i<icon.length;i++){
		icon[i].style.transform = 'translateY('+0+'rem)';
	}
}, false);
hit.addEventListener('click',function(){
	back();
	clearInterval(timer);
	timer = setInterval(function() {
		oppositeRrotate();
	},25);
	
	drop(7,80);
	drop(6,120);
	drop(5,160);
	drop(4,200);
	drop(3,240);
	drop(2,280);
	drop(1,320);
	drop(0,360);
	drop(8,280);
	drop(9,240);
	drop(10,200);
	drop(11,160);
	drop(12,120);
	drop(13,80);
},false);
//旋转45deg函数
function drop(i,t){
	var time_one = setTimeout(function(){
		icon[i].style.transform='translateY('+40+'rem)';
	},t);
}

function oppositeRrotate(){
	num -= 3;
	if(num >= 0) {
		hit.style.transform = "rotateZ(" + num + "deg)";
	} else {
		add.style.display = 'block';
		max.style.display = 'none';
		clearInterval(timer);
	}
}
function rotate() {
	num += 3;
	if(num <= 45) {
		hit.style.transform = "rotateZ(" + num + "deg)";
	} else {
		clearInterval(timer);
	}
}
//返回上一页
function back() {
	plus.webview.close("pages/weather.html", "slide-out-bottom", 200);
}

function weathFn() {
	var r_left = document.getElementById("left");
	var r_spans = r_left.getElementsByTagName("span");
//	console.log(r_spans);
	var date_da = new Date();
	var r_year = date_da.getFullYear();
	var r_month = date_da.getMonth() + 1;
	if(r_month < 10) {
		r_month = "0" + r_month;
	}
	var r_day = date_da.getDate();
	if(r_day < 10) {
		r_day = "0" + r_day;
	}
	var r_week = date_da.getDay();
	switch(r_week) {
		case 1:
			r_week = "星期一";
			break;
		case 2:
			r_week = "星期二";
			break;
		case 3:
			r_week = "星期三";
			break;
		case 4:
			r_week = "星期四";
			break;
		case 5:
			r_week = "星期五";
			break;
		case 6:
			r_week = "星期六";
			break;
		default:
			r_week = "星期日";
			break;
	}
	r_spans[0].innerText = r_day;
	r_spans[1].innerText = r_week;
	r_spans[2].innerText = r_month + "/" + r_year;
	var address = '';
	if(plus.storage.getItem("address")){
		address = plus.storage.getItem("address");
		r_spans[3].innerText = address;
	}
	getCity();
}
//获取当前所在地的城市
function getCity() {
	plus.geolocation.getCurrentPosition(function(succ) {
		var arr = JSON.stringify(succ);
//		console.log(arr);
		arr = JSON.parse(arr);
		var city = arr['address']['city'];
		if(city!==plus.storage.getItem("address")){
			var r_left = document.getElementById("left");
			var r_spans = r_left.getElementsByTagName("span");
			r_spans[3].innerText = city;
			plus.storage.setItem('address',city);
		}
	});
}
//swiper插件
function swi(){
	var swi = new Swiper("#swi",{
//		autoplay: 2000,//自动播放
//		loop:true,//循环
		pagination : '.swiper-pagination',
	});
}
