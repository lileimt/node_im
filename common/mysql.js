/*
* @Author: limingyuan
* @Date:   2016-12-29 16:45:09
* @Last Modified by:   limingyuan
* @Last Modified time: 2016-12-29 17:04:49
*/

import mysql from 'mysql'
import config from './config.js'

let pool = mysql.createPool(config.mysql);

class DB{
	constructor(){

	}

	query(sql){
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,conn)=>{
				if(err){
					console.log(`mysql connect err ${err}`);
					reject(err);
				}
				conn.query(sql,(err,results)=>{
					if(err){
						console.log(`mysql query err ${err}`);
						conn.release();
						reject(err);
					}
					conn.release();
					resolve(results);
				})
			});
		});
	}
}

export default DB