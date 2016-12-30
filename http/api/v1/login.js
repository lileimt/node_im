/*
* @Author: limingyuan
* @Date:   2016-12-29 16:32:28
* @Last Modified by:   limingyuan
* @Last Modified time: 2016-12-30 14:44:51
*/
import DB from '../../../common/mysql.js'
import Token from '../../model/token.js'

async function login(req,res){
	console.log(req.body);
	let username = req.body.username || '';
	let password = req.body.password || '';
	let sql = `select * from user where username="${username}" and password="${password}"`;
	console.log(`sql:${sql}`);
	try{
		let db = new DB();
		let result = await db.query(sql);
		console.log('login:'+JSON.stringify(result));
		if(result.length){//用户名和密码正确，则生成token，添加到缓存中
			let token = new Token(username,result);
			let ret = await token.addToken(); 
			console.log(`${ret}`);
			res.send('login success');
		}else{   //返回数组为空，则没有查找到用户名和密码
			res.send('username or password is wrong');
		}
	}catch(err){
		res.send(`login failed:${err}`);
	}
}

export default login