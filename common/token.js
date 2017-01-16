/*
* @Author: limingyuan
* @Date:   2016-12-30 09:30:57
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 17:15:21
*/

import Redis from './redis.js'
import crypto from 'crypto'

class Token extends Redis{
	constructor(key,value = {}){
		super();
		this.key = key || '';
		this.value = value;
	}

	genToken(){
		let date = new Date().getTime();
		let str = `${this.key}:${date}`;
		let md5 = crypto.createHash('md5');
		return md5.update(str).digest('hex');
	}

	addToken(){	
		let token = this.genToken();
		console.log(`token:${token}`);
		let obj = {
			username:this.value[0].username || '',
			email:this.value[0].email || ''
		}
		console.log(JSON.stringify(obj));
		return new Promise((resolve,reject)=>{
			this.hmset(token,obj).then(res=>{
				this.quit();
				resolve(token);
			},err=>{
				this.quit();
				reject(`addToken:${err}`);
			});
		});
	}

	checkToken(){
		return new Promise((resolve,reject)=>{
			this.exists(this.key).then(res=>{
				this.quit();
				resolve(res);
			},err=>{
				this.quit();
				reject(`checkToken:${err}`);
			});
		});
	}

	getUserFromToken(){
		return new Promise((resolve,reject)=>{
			this.hmget(this.key,"username").then(res=>{
				this.quit();
				resolve(res);
			},err=>{
				this.quit();
				reject(`getUserFromToken:${err}`);
			});
		});
	}

	async delToken(){
		try{
			await this.del(this,key);
		}catch(err){
			console.log(`delToken error:${err}`);
		}
		this.quit();
	}
}

export default Token