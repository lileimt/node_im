/*
* @Author: limingyuan
* @Date:   2016-12-30 15:21:24
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 17:30:51
*/

import DB from '../../../common/mysql.js'
import Token from '../../../common/token.js'
//import MsgQueue from '../../model/message.js'
import post from '../../model/request.js'

function success(value={}){
	let data = {
		error_code:0,
		error_msg:'success',
		data:value
	};
	return data;
}

function failure(value){
	let data = {
		error_code:1,
		error_msg:value
	};
	return data;
}

let ChatMsgs = {
	async getChatMsgs(req,res){
		let token = req.headers.authorization.split(' ')[1];
		let _token = new Token(token);
		try{
			let ret = await _token.getUserFromToken();
			console.log(`getChatMsgs:${ret}`);
			//let user = JSON.stringify(ret);
			let sql = `select * from chatmsg where sendname = "${ret}" or recvname = "${ret}" order by sendtime asc`;
			let db = new DB();
			ret = await db.query(sql);
			console.log(`sql:${sql}`);
			console.log(JSON.stringify(ret));
			res.send(success(ret));
		}catch(err){
			console.log(`getChatMsgs:${err}`);
			res.send(failure(err));
		}
	},
	async postChatMsg(req,res){
		console.log(JSON.stringify(req.body));
		let sendname = req.body.sendname;
		let recvname = req.body.recvname;
		let content = req.body.content;
		let db = new DB();
		let sql = `insert into chatmsg(sendname,recvname,content) values("${sendname}","${recvname}","${content}")`;
		try{
			let ret = await db.query(sql);
			console.log(`sql:${sql}`);
			console.log(JSON.stringify(ret));
			//调用通知提醒接口
			var data = {
				sendname:sendname,
				recvname:recvname,
				action:"chatmsg",
				obj:{
					msg_id:ret.insertId
				}
			};
			post(data,req.headers.authorization);
			res.send(success(ret));
		}catch(err){
			console.log(`postChatMsg:${err}`);
			res.send(failure(err));
		}
	},
	async withdrawChatMsg(req,res){
		let msgid = req.params.msg_id;
		let db = new DB();
		let sql = `delete from chatmsg where id=${msgid}`;
		try{
			let ret = db.query(sql);
			console.log(`sql:${sql}`);
			console.log(JSON.stringify(ret));
			res.send(success(ret));
		}catch(err){
			console.log(`withdrawChatMsg:${err}`);
			res.send(failure(err));
		}
	}
}

export default ChatMsgs