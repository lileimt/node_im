/*
* @Author: limingyuan
* @Date:   2017-01-16 10:12:06
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 17:47:48
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

let GroupMsgs = {
	async getGroupMsgs(req,res){
		let group_id = req.params.group_id;
		let token = req.headers.authorization.split(' ')[1];
		let _token = new Token(token);
		try{
			let ret = await _token.getUserFromToken();
			console.log(`getChatMsgs:${ret}`);
			//let user = JSON.stringify(ret);
			//验证用户是否在该群组中
			let sql = `select id from groupmember where id=${group_id} and username="${ret}"`;
			let db = new DB();
			ret = await db.query(sql);
			if(ret){//查找用户成功
				sql = `select * from groupmsg where groupid=${group_id} order by sendtime asc`;
				db = new DB();
				ret = await db.query(sql);
				console.log(`sql:${sql}`);
				console.log(JSON.stringify(ret));
				res.send(success(ret));
			}else{
				res.send(failure(ret));
			}
		}catch(err){
			console.log(`getGroupMsgs:${err}`);
			res.send(failure(err));
		}
	},
	async getGroupMsg(req,res){
		let group_id = req.params.group_id;
		let msg_id = req.params.msg_id;
		let token = req.headers.authorization.split(' ')[1];
		let _token = new Token(token);
		try{
			let ret = await _token.getUserFromToken();
			console.log(`getChatMsgs:${ret}`);
			let user = JSON.stringify(ret);
			//验证用户是否在该群组中
			let sql = `select id from groupmember where id=${group_id} and username="${user.username}"`;
			let db = new DB();
			ret = await db.query(sql);
			if(ret){//查找用户成功
				sql = `select * from groupmsg where id=${msg_id}`;
				db = new DB();
				ret = await db.query(sql);
				console.log(`sql:${sql}`);
				console.log(JSON.stringify(ret));
				res.send(success(ret));
			}else{
				res.send(failure(ret));
			}
		}catch(err){
			console.log(`getGroupMsg:${err}`);
			res.send(failure(err));
		}
	},
	async postGroupMsg(req,res){
		let sendname = req.body.sendname;
		let groupid = req.body.groupid;
		let content = req.body.content;
		let token = req.headers.authorization.split(' ')[1];
		let _token = new Token(token);
		try{
			let ret = await _token.getUserFromToken();
			console.log(`getChatMsgs:${ret}`);
			//let user = JSON.stringify(ret);
			//验证用户是否在该群组中
			let sql = `select id from groupmember where id=${groupid} and username="${ret}"`;
			console.log(`sql:${sql}`);
			let db = new DB();
			ret = await db.query(sql);
			if(ret){//查找用户成功
				sql = `insert into groupmsg(groupid,sendname,content) values(${groupid},"${sendname}","${content}")`;
				db = new DB();
				ret = await db.query(sql);
				console.log(`sql:${sql}`);
				console.log(JSON.stringify(ret));
				//调用通知提醒接口
				var data = {
					sendname:sendname,
					groupid:groupid,
					action:"groupmsg",
					obj:{
						msg_id:ret.insertId
					}
				};
				post(data,req.headers.authorization);
				res.send(success(ret));
			}else{
				res.send(failure(ret));
			}
		}catch(err){
			console.log(`postGroupMsg:${err}`);
			res.send(failure(err));
		}
	},
	async withdrawGroupMsg(req,res){
		let msgid = req.params.msg_id;
		let db = new DB();
		let sql = `delete from groupmsg where id=${msgid}`;
		try{
			let ret = db.query(sql);
			console.log(`sql:${sql}`);
			console.log(JSON.stringify(ret));
			res.send(success(ret));
		}catch(err){
			console.log(`withdrawGroupMsg:${err}`);
			res.send(failure(err));
		}
	}
}

export default GroupMsgs