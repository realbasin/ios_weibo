addEventListener("load",function(){
	var top_left = document.getElementById('top_left');
	top_left.onclick = function(){
		plus.webview.close("mainBody.html","pop-out");
	}
	document.getElementById("top_right").onclick=function(){
		console.log('kalsdl');
		ws=plus.webview.currentWebview();
		ws.addEventListener("maskClick",function(){
			wc.close("auto");
		},false);
		ws.setStyle({mask:"rgba(0,0,0,0.5)"})
		wc=plus.webview.open('share_mask.html',"slide-in-bottom",{top:'60%',height:'40%',popGesture:"none"});
//				wc=plus.webview.currentWebview();
		wc.addEventListener('close',function(){
			ws.setStyle({mask:"none"});
			wc=null;
		},false);
	}
//	console.log(JSON.parse(plus.storage.getItem('key')));
	var weibo = JSON.parse(plus.storage.getItem('key'));
	var box = document.getElementById('con');
	var img_text = document.createElement('div');
	img_text.className = 'img_text';
	box.appendChild(img_text);
	var top_1 = document.createElement('div');
	top_1.className = 'top_1';
	img_text.appendChild(top_1);
	var tx = document.createElement('img');
	tx.className = 'tx';
	tx.src = weibo.user.profile_image_url;
	top_1.appendChild(tx);
	if(weibo.user.verified == true){
		var renzheng = document.createElement("img");
		renzheng.className = "renzheng";
		renzheng.src = "img/avatar_vip_golden@3x.png";
		top_1.appendChild(renzheng);
	}
	var name = document.createElement("p");
	name.className = 'name';
	name.innerText = weibo.user.screen_name;
	top_1.appendChild(name);
	var time = document.createElement('p');
	time.className = 'time';
	var date1 = new Date();
	var date2 = new Date(weibo.created_at);
	var s1 = date1.getTime()-date2.getTime();
	var leave1=s1%(24*3600*1000);
	var leave2=leave1%(3600*1000);
	var minutes=Math.floor(leave2/(60*1000));
	if(minutes==0){
	time.innerText = "1" + '分钟前';
	
	}else{
		time.innerText = minutes + '分钟前';
	}
	top_1.appendChild(time);
	var source = document.createElement('p');
	source.className = 'source';
	if(weibo.source){
		source.innerText = "来自";
	}else{
		source.innerText = "来自微博 weibo.com";
	}
	top_1.appendChild(source);
	var a = document.createElement('a');
	a.innerHTML = weibo.source;
	source.appendChild(a);
	var down = document.createElement('img');
	down.className = 'down';
	down.src = "img/card_icon_favorite.@3xpng.png";
	top_1.appendChild(down);
	var top_2 = document.createElement('div');
	top_2.className = 'top_2';
	top_2.innerHTML = weibo.text;
	img_text.appendChild(top_2);
	
	if(!weibo.retweeted_status){
						
	}else{
		var top_5 = document.createElement("div");
		top_5.className = 'top_5';
		img_text.appendChild(top_5);
		var top_51 = document.createElement("div");
		top_51.className = "top_51";
		top_5.appendChild(top_51);
		top_51.innerHTML = '<a class="two_name" href="">@'+weibo.retweeted_status.user.name+'</a>:'+weibo.retweeted_status.text;
		var ul_1 = document.createElement("ul");
		top_5.appendChild(ul_1);
		
		top_5.id = JSON.stringify(weibo.retweeted_status);
		top_5.onclick = function(){
			caBubble();
			plus.storage.setItem('key',this.id);
			plus.webview.open("mainBody_2.html",'mainBody_2.html',{},'pop-in',300,function(){});
		}
		
		for(var l=0;l<weibo.retweeted_status.pic_urls.length;l++){
			if(weibo.retweeted_status.pic_urls[l]){
				if(weibo.retweeted_status.pic_urls.length==1){
					var li_1 = document.createElement("li");
					li_1.className = "one_1";
					var tuwen_1 = document.createElement("img");
					tuwen_1.src = weibo.retweeted_status.pic_urls[l].thumbnail_pic;
					li_1.appendChild(tuwen_1);
					ul_1.appendChild(li_1);
				}else{
					if(weibo.retweeted_status.pic_urls.length==4){
						var li_1 = document.createElement("li");
						li_1.className = "four_1";
						var tuwen_1 = document.createElement("img");
						tuwen_1.src = weibo.retweeted_status.pic_urls[l].thumbnail_pic;
						li_1.appendChild(tuwen_1);
						ul_1.appendChild(li_1);
					}else{
						var li_1 = document.createElement("li");
						li_1.className = "two_1";
						var tuwen_1 = document.createElement("img");
						tuwen_1.src = weibo.retweeted_status.pic_urls[l].thumbnail_pic;
						li_1.appendChild(tuwen_1);
						ul_1.appendChild(li_1);
					}
				}
			}
		}
	}
	
	var top_3 = document.createElement('div');
	top_3.className = 'top_3';
	img_text.appendChild(top_3);
	var ul = document.createElement('ul');
	top_3.appendChild(ul);
	for(var j=0;j<weibo.pic_urls.length;j++){
		if(weibo.pic_urls[j]){
			if(weibo.pic_urls.length==1){
				var li = document.createElement("li");
				li.className = "one";
				var tuwen = document.createElement("img");
				tuwen.src = weibo.pic_urls[j].thumbnail_pic;
				li.appendChild(tuwen);
				ul.appendChild(li);
			}else{
				if(weibo.pic_urls.length==4){
					var li = document.createElement("li");
					li.className = "four";
					var tuwen = document.createElement("img");
					tuwen.src = weibo.pic_urls[j].thumbnail_pic;
					li.appendChild(tuwen);
					ul.appendChild(li);
				}else{
					var li = document.createElement("li");
					li.className = "two";
					var tuwen = document.createElement("img");
					tuwen.src = weibo.pic_urls[j].thumbnail_pic;
					li.appendChild(tuwen);
					ul.appendChild(li);
				}
			}
		}
	}
	
	
	var dynamic = document.createElement('div');
	dynamic.className = 'dynamic';
	img_text.appendChild(dynamic);
	var zhuan = document.createElement('span');
	zhuan.className = 'zhuan';
	dynamic.appendChild(zhuan);
	if(weibo.reposts_count > 0){
		zhuan.innerHTML = '转发&nbsp;'+weibo.reposts_count;
	}else{
		zhuan.innerHTML = '转发&nbsp;0';
	}
	var ping = document.createElement('span');
	ping.className = 'ping';
	dynamic.appendChild(ping);
	if(weibo.comments_count > 0){
		ping.innerHTML = '评论&nbsp;'+weibo.comments_count;
	}else{
		ping.innerHTML = '评论&nbsp;0';
	}
	var zan = document.createElement('span');
	zan.className = 'zan';
	dynamic.appendChild(zan);
	if(weibo.attitudes_count > 0){
		zan.innerHTML = '赞&nbsp;'+weibo.attitudes_count;
	}else{
		zan.innerHTML = '赞&nbsp;0';
	}
	var dibu = document.createElement('div');
	dibu.className = 'dibu';
	img_text.appendChild(dibu);
	var a1 = document.createElement('a');
	a1.innerText = '按热度';
	dibu.appendChild(a1);
	
	addEventListener('scroll',function(){
		var scHeight  =  document.documentElement.scrollTop || document.body.scrollTop;
		var text_name = document.getElementById("text_name");
		if(scHeight > 55){
			text_name.innerHTML = '<img src="'+weibo.user.profile_image_url+'"/>'+weibo.user.screen_name;
			text_name.style.fontSize = '1.5rem';
			text_name.style.fontWeight = 'normal';
		}else{
			text_name.innerText = '微博正文';
			text_name.style.fontSize = '1.8rem';
			text_name.style.fontWeight = '700';
		}
	},false);
},false)

function getEvent(){
	if(window.event){
		return window.event
		
	}
	var func = getEvent.caller;//找到该函数的调用着
	while(func != null){
		if(func.arguments[0]){
			return func.arguments[0];
		}
		func = func.caller;
	}
	return null;
}

function caBubble(){
	var event = getEvent();
	
	if(event.cancleBubble){
		event.cancleBubble();
	}
	else{
		event.stopPropagation();
	}
}