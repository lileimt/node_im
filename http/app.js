/*
* @Author: limingyuan
* @Date:   2016-12-29 16:10:31
* @Last Modified by:   limingyuan
* @Last Modified time: 2017-01-05 14:39:16
*/

import express from 'express'
import bodyParser from 'body-parser'
import config from '../common/config.js'
import router from './router/router.js'
import login from './api/v1/login.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//登录接口
app.post('/v1/im/login',login);

app.use('/v1/im',router);

app.listen(config.http_port,()=>{
	console.log(`Start http server on port ${config.http_port}`);
})