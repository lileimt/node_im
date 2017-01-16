/*
* @Author: limingyuan
* @Date:   2016-12-29 16:45:24
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-16 17:18:17
*/

import redis from 'redis'
import config from './config.js'

class Redis{
	constructor(){
		this.config = config.redis;
		this.client = redis.createClient(this.config);
	}

	hmget(key,field){
		return new Promise((resolve,reject)=>{
			this.client.hmget(key,field,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			})
		});
	}

	hmset(key,value){
		return new Promise((resolve,reject)=>{
			this.client.hmset(key,value,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			})
		})
	}

	llen(key){
		return new Promise((resolve,reject)=>{
			this.client.llen(key,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			})
		});
	}

	lpush(key,value){
		return new Promise((resolve,reject)=>{
			this.client.lpush(key,value,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}

	rpop(key){
		return new Promise((resolve,reject)=>{
			this.client.rpop(key,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}

	del(key){
		return new Promise((resolve,reject)=>{
			this.client.del(key,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}

	exists(key){
		return new Promise((resolve,reject)=>{
			this.client.exists(key,(err,res)=>{
				if(err){
					return reject(err);
				}
				resolve(res);
			});
		});
	}

	quit(){
		return new Promise((resolve,reject)=>{
			this.client.quit();
			resolve();
		})
	}
}

export default Redis