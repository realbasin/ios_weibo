var ACCESS_TOKEN="2.00snaQTCKR_NWDf317da4675FWGFPE";
function getDataByUrl(url,data,suc,err){
//	console.log('try to get data');
	var xhr = new plus.net.XMLHttpRequest();
//	var xhr=new XMLHttpRequest();
	var m_url = url;
	
	m_url = m_url+"?access_token="+ACCESS_TOKEN;
	var s='';
	for(var i in data){
		s = s+"&"+ i+"="+encodeURI(data[i]);
	} 
	m_url+=s;
//	console.log(m_url);
	xhr.open("GET",m_url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4)
		{
			if(xhr.status == 200){
				var obj = JSON.parse(xhr.responseText);
//				console.log('获取数据中...');
				suc(obj);
//				console.log(JSON.stringify(obj));
			}
			else{
//				console.log(xhr.status);
				err("获取数据失败");
			}
			 
		}
	}
}
//function sucTop(data,parentId){
//	console.log('in topic');
//	for(var i=0;i<data['statuses'].length;i++){
////		console.log(i);
//		
//	}
//}
