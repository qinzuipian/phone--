var JTURLAPI = 'http://47.93.33.135/elink-app';
// var JTURLAPI = 'http://192.168.1.6:8080/elink-app';

// var FLYPLAT = 'http://47.93.33.135:8080/';

// 封装原生js   判断dom元素是否含有某className    注意 ：  className这个参数只能是一个  不能是多个
function hasClass(dom, className) {
	className = className.replace(/^\s|\s$/g, "")
	return (
		" " + ((dom || {}).className || "").replace(/\s/g, " ") + " "
	).indexOf(" " + className + " ") >= 0
}

//封装http请求
var http = {};

http.quest = function (option, callback) {
	var url = option.url;
	var method = option.method;
	var data = option.data;
	var timeout = option.timeout || 0;

	var xhr = new XMLHttpRequest();
	(timeout > 0) && (xhr.timeout = timeout);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 400) {
				var result = xhr.responseText;
				try {
					result = JSON.parse(xhr.responseText);
				} catch (e) { }
				callback && callback(null, result);
			} else {
				callback && callback('status: ' + xhr.status);
			}
		}
	}.bind(this);
	xhr.open(method, url, true);
	if (typeof data === 'object') {
		try {
			data = JSON.stringify(data);
		} catch (e) { }
	}
	xhr.send(data);
	xhr.ontimeout = function () {
		callback && callback('timeout');
		console.log('%c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
	};
};

http.get = function (url, callback) {
	var option = url.url ? url : {
		url: url
	};
	option.method = 'get';
	this.quest(option, callback);
};

http.post = function (option, callback) {
	option.method = 'post';
	this.quest(option, callback);
};

//使用方法：

////普通get请求
//http.get('http://www.baidu.com',function(err,result){
//
//});
////定义超时时间(单位毫秒)
//http.get({url:'http://www.baidu.com',timeout:1000},function(err,result){
//
//});
////post请求
//http.post({url:'http://www.baidu.com',data:'123',timeout:1000},function(err,result){
//
//});