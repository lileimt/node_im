/*
* @Author: limingyuan
* @Date:   2017-01-06 10:11:44
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 14:32:08
*/

var http=require('http');  

function post(data,token){
	//发送 http Post 请求  
	//var data = {
	//	user_id:1,
	//	sender_id:2,
	//	sender_name:"张三",
	//	action:"notice",
	//	obj:{
	//		msg_id:1,
	//		title:"通知",
	//		schedule:new Date().getTime()+10000
	//	}
	//};
	var postData=JSON.stringify(data);
	//console.log(postData);  
	var options={  
	   host:'localhost',  
	   port:3000,  
	   path:'/v1/reminders',  
	   method:'POST',  
	   headers:{  
	   		'Content-Type':'application/json',
			'Authorization':token
	   }  
	}  
	//console.log(JSON.stringify(options));
	var req=http.request(options, function(res) {  
		res.setEncoding('utf-8');  
		res.on('data',function(chun){  
			console.info(chun);  
		});  
		res.on('end',function(){});  
	});  
	req.on('error',function(err){  
		console.error(err);  
	});  
	req.write(postData);  
	req.end();  
} 

export default post


