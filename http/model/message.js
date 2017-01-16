/*
* @Author: limingyuan
* @Date:   2016-12-30 16:06:58
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-05 14:16:57
*/

import Redis from '../../common/redis.js'

class MsgQueue extends Redis{
	constructor(key){
		super();
		this.key = key;
	}

	async pushQueue(value){
		try{
			let ret = await this.lpush(key,value);
			console.log(`pushQueue:${ret}`);
		}catch(err){
			console.log(`err:${err}`);
		}
		this.quit();
	}

	popQueue(key){
		
	}
}

export default MsgQueue