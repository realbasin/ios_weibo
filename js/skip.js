function weiboSkip(ss){
	var m_url=ss;
	var id = m_url;
	plus.webview.open(m_url,id,{
	},"pop-in",500,function(){});
};
//function back(aa){
// 	plus.webview.close("aa", "pop-out", 500);	
//}