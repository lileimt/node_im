/*
* @Author: limingyuan
* @Date:   2016-12-29 16:18:23
* @Last Modified by:   limingyuan
* @Last Modified time: 2016-12-30 11:40:28
*/

import express from 'express'
import login from '../api/v1/login.js'

const router = express.Router();

//router.use((req,res,next)=>{

//});

//登录接口
router.post('/login',login);


export default router

