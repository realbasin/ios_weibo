var home_page = document.getElementById('home_page');
var news_page = document.getElementById('news_page');
var find = document.getElementById('find');
var me = document.getElementById('me');
home_page.addEventListener('click',function(){
	var w = plus.webview.create('index.html');
	plus.webview.show(w);
	plus.webview.hide( plus.webview.currentWebview() );
},false);
news_page.addEventListener('click',function(){
	var w = plus.webview.create('news.html');
	plus.webview.show(w);
	plus.webview.hide( plus.webview.currentWebview() );
},false);
me.addEventListener('click',function(){
	var w = plus.webview.create('my.html');
	plus.webview.show(w);
	plus.webview.hide( plus.webview.currentWebview() );
},false);
find.addEventListener('click',function(){
	var w = plus.webview.create('discovery.html');
	plus.webview.show(w);
	plus.webview.hide( plus.webview.currentWebview() );
},false);