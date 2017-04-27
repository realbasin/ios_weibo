addEventListener("load",function(){
	var url = "https://api.weibo.com/2/statuses/home_timeline.json";
	stopDef();
	getDataByUrl(url,{count:'50'},successFN,errorFN);
	//好友关注动态
	var top_left = document.getElementById('top_left');
	top_left.onclick = function(){
		plus.webview.open("theTrends.html",'theTrends.html',{},'pop-in',300,function(){});
	}
	var top_right = document.getElementById("top_right");
	var leida = document.getElementById('leida');
	var none = true;
	top_right.addEventListener("click",function(){
		none = false;
		top_right.src = 'img/navigationbar_icon_radar_highlighted@3x.png';
		leida.style.display = "block";
	},false);
	document.addEventListener("touchstart",function(){
		if(none){
		top_right.src = 'img/navigationbar_icon_radar@3x.png';
		leida.style.display = "none";
		}
		none = true;
	},false);
	document.addEventListener("touchmove",function(){
		if(none){
		top_right.src = 'img/navigationbar_icon_radar@3x.png';
		leida.style.display = "none";
		}
		none = true;
	},false);
},false);
			function successFN(obj){
				var inp = document.getElementById("seek");
				var box = document.getElementById("section");
				for(var i=0;i<obj.statuses.length;i++){
					
//					alert(JSON.stringify(obj.statuses[i]));
//				console.log(obj.statuses[i].id);
					var weibo = obj.statuses[i];
					var img_text = document.createElement("div");
					img_text.className = "img_text";
					box.appendChild(img_text);
//					var id = obj.statuses[i].id;
//					var uid = obj.statuses[i].user.id;
					
					
					
					var top_1 = document.createElement("div");
					top_1.className = "top_1";
					img_text.appendChild(top_1);
					var tx = document.createElement("img");
					tx.className = "tx";
					tx.src = obj.statuses[i].user.profile_image_url;
					top_1.appendChild(tx);
					if(weibo.user.verified == true){
						var renzheng = document.createElement("img");
						renzheng.className = "renzheng";
						renzheng.src = "img/avatar_vip_golden@3x.png";
						top_1.appendChild(renzheng);
					}
					var name = document.createElement("p");
					name.className = "name";
					name.innerText = obj.statuses[i].user.screen_name;
					top_1.appendChild(name);
					var time = document.createElement("p");
					time.className = 'time';
					var date1 = new Date();
					var date2 = new Date(obj.statuses[i].created_at);
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
					var source = document.createElement("p");
					source.className = "source";
					if(obj.statuses[i].source){
						source.innerText = "来自";
					}else{
						source.innerText = "来自微博 weibo.com";
					}
					top_1.appendChild(source);
					var a = document.createElement("a");
					a.innerHTML = obj.statuses[i].source;
					source.appendChild(a);
					var down = document.createElement("img");
					down.className = "down";
					down.src = "img/message_toolbar_popover_arrow@3x.png";
					top_1.appendChild(down);
					down.onclick = function(){
						if(weibo.favorited == true){
							var actionbuttons=[{title:"取消收藏"},{title:"帮上头条"},{title:"取消关注"},,{title:"屏蔽"},,{title:"举报"}];
						}else{
							var actionbuttons=[{title:"收藏"},{title:"帮上头条"},{title:"取消关注"},,{title:"屏蔽"},,{title:"举报"}];
						}
						var actionstyle={cancel:"取消",buttons:actionbuttons};
						caBubble();
						plus.nativeUI.actionSheet(actionstyle, function(e){
							console.log( "User pressed: "+e.index );
							if(e.index==0){
								
							}
							else if(e.index==1){
								save(path);
							}
						});
					}
					var top_2 = document.createElement("div");
					top_2.className = "top_2";
					top_2.innerHTML = obj.statuses[i].text;
					img_text.appendChild(top_2);
					var top_3 = document.createElement("div");
					top_3.className = "top_3";
					img_text.appendChild(top_3);
					
					var ul = document.createElement("ul");
					top_3.appendChild(ul);
					
					
					for(var j=0;j<obj.statuses[i].pic_urls.length;j++){
						if(obj.statuses[i].pic_urls[j]){
							if(obj.statuses[i].pic_urls.length==1){
								var li = document.createElement("li");
								li.className = "one";
								var tuwen = document.createElement("img");
								tuwen.src = weibo.pic_urls[j].thumbnail_pic;
								li.appendChild(tuwen);
								ul.appendChild(li);
							}else{
								if(obj.statuses[i].pic_urls.length==4){
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
					
					
					var top_4 = document.createElement("div");
					top_4.className = "top_4";
					img_text.appendChild(top_4);
					var forward = document.createElement("div");
					forward.className = "forward";
					top_4.appendChild(forward);
					if(obj.statuses[i].reposts_count > 0){
						forward.innerHTML = '<img src="img/more_icon_retweet@3x.png"/>'+obj.statuses[i].reposts_count;
					}else{
						forward.innerHTML = '<img src="img/more_icon_retweet@3x.png"/>'+"转发";
					}
					var comment = document.createElement("div");
					comment.className = "comment";
					top_4.appendChild(comment);
					if(obj.statuses[i].comments_count > 0){
						comment.innerHTML = '<img src="img/timeline_icon_comment@3x.png"/>'+obj.statuses[i].comments_count;
					}else{
						comment.innerHTML = '<img src="img/timeline_icon_comment@3x.png"/>'+"评论";
					}
					var nice = document.createElement("div");
					nice.className = "nice";
					top_4.appendChild(nice);
					if(obj.statuses[i].attitudes_count > 0){
						nice.innerHTML = '<img src="img/nice.png"/>'+obj.statuses[i].attitudes_count;
					}else{
						nice.innerHTML = '<img src="img/nice.png"/>'+"赞";
					}
					
//					img_text.setAttribute('uid',obj.statuses[i].user.id);
//					img_text.className+=' '+obj.statuses[i].user.id;
//					img_text.id=obj.statuses[i].id;
					img_text.id = JSON.stringify(weibo);
					//点击正文时跳转
					
					img_text.onclick = function(){
						plus.storage.setItem('key',this.id);
						plus.webview.open("mainBody.html",'mainBody.html',{},'pop-in',300,function(){});
//							console.log(this.id);
//							console.log(JSON.stringify(this.className).slice(10));
//						console.log(JSON.parse(plus.storage.getItem('key')).id);
					}

					}
			}
			function errorFN(error){
				console.log(error);
			}
			
	
			function stopDef(){
				var event = getEvent();
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
			}
			
			//取消浏览器默认事件
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
			
			//取消冒泡事件
            function caBubble(){
            	var event = getEvent();
            	
            	if(event.cancleBubble){
            		event.cancleBubble();
            	}
            	else{
            		event.stopPropagation();
            	}
            }