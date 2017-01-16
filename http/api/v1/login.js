/*
* @Author: limingyuan
* @Date:   2016-12-29 16:32:28
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-05 16:27:26
*/
import DB from '../../../common/mysql.js'
import Token from '../../../common/token.js'

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
			//console.log(`${ret}`);
			res.send(ret);//将token发送给客户端
		}else{   //返回数组为空，则没有查找到用户名和密码
			res.send('username or password is wrong');
		}
	}catch(err){
		res.send(`login failed:${err}`);
	}
}

export default login