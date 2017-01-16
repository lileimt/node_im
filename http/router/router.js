/*
* @Author: limingyuan
* @Date:   2016-12-29 16:18:23
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 16:57:34
*/

import express from 'express'
import chatmsgs from '../api/v1/chatmsgs.js'
import groupmsgs from '../api/v1/groupmsgs.js'
import Token from '../../common/token.js'

const router = express.Router();

async function checkToken(token,callback){
	let _token = new Token(token);
	try{
		let ret = await _token.checkToken();
		callback(ret);
	}catch(err){
		console.log(`checkToken error:${err}`);
		callback(null);
	}
}

//token验证
router.use((req,res,next)=>{
	let auth = req.headers.authorization || '';
	let token = auth.split(' ')[1];
	console.log(`token:${token}`);
	checkToken(token,ret=>{
		if(ret){
			console.log('checkToken success');
			next();
		}else{
			res.send('token error');
		}
	});
});

//聊天消息接口
router.get('/chatmsgs',chatmsgs.getChatMsgs);
router.post('/chatmsg',chatmsgs.postChatMsg);
router.delete('/chatmsg/:msg_id',chatmsgs.withdrawChatMsg);
//群聊天消息接口
router.get('/:group_id/groupmsgs',groupmsgs.getGroupMsgs);
router.get('/:group_id/groupmsg/:msg_id',groupmsgs.getGroupMsg);
router.post('/groupmsg',groupmsgs.postGroupMsg);
router.delete('/groupmsg/:msg_id',groupmsgs.withdrawGroupMsg);

export default router

