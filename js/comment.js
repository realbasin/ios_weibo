addEventListener('load',function(){
	var weibo = JSON.parse(plus.storage.getItem('key'));
	var url = 'https://api.weibo.com/2/comments/show.json';
	getDataByUrl(url,{id:weibo.id},successFN,errorFN);
},false);
	function successFN(obj){
		var img_text = document.getElementsByClassName('img_text')[0];
//		console.log(obj.comments[0].id);
		for(var i=0;i<obj.comments.length;i++){
			var wei = obj.comments[i];
			var pinglun = document.createElement('div');
			pinglun.className = 'pinglun';
			img_text.appendChild(pinglun);
			var p_1 = document.createElement("div");
			p_1.className = 'p_1';
			pinglun.appendChild(p_1);
			var tx_1 = document.createElement('img');
			tx_1.className = 'tx_1';
			tx_1.src = wei.user.profile_image_url;
			p_1.appendChild(tx_1);
			if(wei.user.verified == true){
				var renzheng_1 = document.createElement('img');
				renzheng_1.className = 'renzheng_1';
				renzheng_1.src = 'img/avatar_vip_golden@3x.png';
				p_1.appendChild(renzheng_1);
			}
			var name_1 = document.createElement('p');
			name_1.className = 'name_1';
			name_1.innerText = wei.user.name;
			p_1.appendChild(name_1);
			var time_1 = document.createElement('p');
			time_1.className = 'time_1';
			var myDate = new Date(wei.created_at);
			var month = myDate.getMonth()+1;
			var dates = myDate.getDate();
			var hours = myDate.getHours();
			var min = myDate.getMinutes();
			if(hours < 10){
				time_1.innerHTML = month+'-'+dates+'&nbsp;0'+hours+':'+min;				
			}else{
				if(min < 10){
					time_1.innerHTML = month+'-'+dates+'&nbsp;'+hours+':0'+min;
				}else{
					time_1.innerHTML = month+'-'+dates+'&nbsp;'+hours+':'+min;
				}
			}
			p_1.appendChild(time_1);
			var zan_1 = document.createElement('img');
			zan_1.className = 'zan_1';
			zan_1.src = 'img/nice.png';
			p_1.appendChild(zan_1);
			var ping_1 = document.createElement('img');
			ping_1.className = 'ping_1';
			ping_1.src = 'img/timeline_icon_comment@3x.png';
			p_1.appendChild(ping_1);
			var text_1 = document.createElement('div');
			text_1.className = 'text_1';
			pinglun.appendChild(text_1);
			var text_2 = document.createElement('p');
			text_2.className = 'text_2';
			text_2.innerText = wei.text;
			text_1.appendChild(text_2);
			var wire = document.createElement('div');
			wire.className = 'wire';
			pinglun.appendChild(wire);
		}
	}
	function errorFN(error){
		console.log(error);
	}
