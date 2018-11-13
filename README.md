

# dianzimoshuiping





	axios请求两种方式
	一： 参数以json形式
		axios({
			method: 'post/get',
			url: 'http: **********',
			params:{
				canshu1: '',
				canshu2: '',
			}
		}).then(function(res){
			console.log(res)
		})
		
	二： 参数以form表单形式
		
		axios({
			method: 'post/get',
			url: 'http: **********',
			data:{
				canshu1: '',
				canshu2: '',
			},
			transformRequest: [function(data) {
				let ret = ''
				for(let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(res){
			console.log(res)
		})
		




特殊接口请求

	// 新增事件
	var data = JSON.stringify({
		"name": window.app.webMsg.name + "",
		"url": window.app.webMsg.url + "",
		"userId": window.localStorage.getItem("userId"),
		"token": window.localStorage.getItem("token")
	});
		axios({
			method: 'post',
			url: JTURLAPI + '/app/website/save',
			data: data,
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			}
		}).then(function(res) {
			console.log(res)
			if(res.data.code == 0) {
			} else {
				$.toptip('新增失败', 'error');
			}
		})





数组去重 ES6方法

	function dedupe (array) {
		return Array.from(new Set(array));
	},
	直接调用dedupe方法   传入需要去重的数组；
	返回新数组；




动态创建变量以及赋值

    eval()能够计算字符串

    var defineStr = "var number_"+i.toString();
    eval(defineStr);
    这样就定义了一个变量
    倘若i值为1，那么动态的变量就为number_1
    后续一样可以通过这种形式为其赋值：

    eval("number_"+i.toString()+" = 120;");
    这样就为其变量number_1赋值为120了。
    但是这里绝对不能够这样去写：

    eval_r("number_"+i.toString()) = 120
    这样写是存在于法错误的。
    以上这种写法在IE内却有些行不通，得需要使用executeScript(string)来执行，判断如下：

    if(window.executeScript)
    {
    //IE浏览器
    window.executeScript(defineStr);
    }else
    {
    //Chrome、Firefox等非IE浏览器
    window.eval_r(defineStr);
    }