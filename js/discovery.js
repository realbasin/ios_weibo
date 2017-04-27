addEventListener('load', function() {
				var four_tab = tab.getElementsByTagName('li');
				for(var i = 0; i < four_tab.length; i++) {
					four_tab[i].index=i;
					four_tab[i].onclick = function() {
						mySwiper2.slideTo(this.index,300,false);
						for(var i = 0; i < four_tab.length; i++) {
							four_tab[i].children[2].style.backgroundColor = "";
						}
						this.children[2].style.backgroundColor = "orange";
					}
				}
				plus.storage.clear();
//				console.log('清理完');
				var wb_url='https://api.weibo.com/2/statuses/public_timeline.json';
				getDataByUrl(wb_url,{count:'5'},mysuc,myerr,'wb_hot');
//				getDataByUrl(wb_url,{count:'50'},putData,err,'wb_hot');
				

			}, false);
			addEventListener('touchmove',function(e){
				var e=event||window.event;
//				console.log($(document).scrollTop());
				if($(document).scrollTop()>620){
					$('.bottom_1').hide();
					$('#c_top').hide(0,function(){  
						pullDown();
//						console.log('hide success');
						$('#tab').css({
							'position':'fixed',  
							'top':'0px',
							'z-index':'100',
							'width':'88%',
							'backgroundColor':'#fff',
						})
						$('#tab').css({
							'height':'44px',
						});  
						$('#swiper2').css('padding-top','32px');
					});  
					var turnback=$("<span class='turnback'>< </span>");
					turnback.appendTo($('#tab'));
					turnback.click(function(){
//						console.log('turnBack');
						$('.bottom_1').show();
						$('#c_top').show();
						$('#tab').css({
							'position':'static',
							'width':'80%',
							'height':'',
						});
						$('.turnback').remove();
						$('#swiper2').css('padding-top','0px');
						
//						$('#fill').remove();
					}).css({
							'font-size':'1.8rem',
						});
						$('#tab>li').css({'margin':'0',});
						
				}
//				if(e.touches[0].pageY>1126){
//				}
			},false);
//			addEventListener('touchstart',function(e){
//				var e=event||window.event;
//				console.log(e);
//			},false);
			
			document.querySelector('.search_bg').querySelector('input').onclick=goSearch;
			function goSearch(){
				plus.webview.open('searchPage.html');
			}
			

function mysuc(obj){
				var inp = document.getElementById("seek");
				var box = document.getElementById("wb_hot");
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
					var concern_btn = document.createElement('span');
					concern_btn.innerText = '+关注';
					concern_btn.className = 'concern_btn';
					top_1.appendChild(concern_btn);
					var down = document.createElement("img");
					down.className = "down";
					down.src = "img/livescreen_popup_close@3x.png";
					top_1.appendChild(down);
					down.onclick = function(){
						var actionbuttons=[{title:"不再看到此条微博"},{title:"减少批人的微博"},{title:"旧闻、重复"},,{title:"标题党、假新闻"},,{title:"举报"}];
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
function myerr(error){
	console.log(error);
}
function goDetails(wb_id){
	plus.webview.open('weiboText.html?id='+wb_id,'_self');
}
function plusReady(e){
	// 弹出系统选择按钮框
//	console.log(e);
	var e=event||window.event;
	e.cancelBubble=true;
	plus.nativeUI.actionSheet( {title:"微博提示",cancel:"取消",buttons:[{title:"不再看到此条微博"},{title:"减少此人的微博"},{title:"旧闻、重复"},{title:"标题党、假新闻"},{title:"举报"}]}, function(e){
//		console.log( "User pressed: "+e.index );
	} );
}

var ws=null;
var list=null;
// 扩展API加载完毕，现在可以正常调用扩展API 
function pullDown(){
	ws=plus.webview.currentWebview();
	ws.setPullToRefresh({support:true,
		height:"50px",
		range:"200px",
		contentdown:{
//			caption:"下拉可以刷新"
		},
		contentover:{
			caption:"释放立即刷新"
		},
		contentrefresh:{
			caption:"正在刷新..."
		}
	},onRefresh);
//	plus.nativeUI.toast("下拉可以刷新");
}
// DOM构建完成获取列表元素
document.addEventListener("DOMContentLoaded",function(){
	list=document.getElementById("wb_hot");
})
// 刷新页面
function onRefresh(){
	setTimeout(function(){
		if(list){
			list.innerText='';
			var wb_url='https://api.weibo.com/2/statuses/public_timeline.json';
			getDataByUrl(wb_url,{count:'20'},mysuc,myerr,'wb_hot');
//			console.log('refresh!!!!!!');
		}
		ws.endPullToRefresh();
	},2000);
}
//if(window.plus){
//	plusReady();
//}else{
//	document.addEventListener("plusready",plusReady,false);
//}
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