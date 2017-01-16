/*
* @Author: limingyuan
* @Date:   2016-12-29 16:13:41
* @Last Modified by:   limingyuan
* @Last Modified time: 2016-12-30 16:12:21
*/

const config = {
	host:'localhost',
	http_port:3000,
	socket_port:3001,
	//chatmsg:'chatmsgqueue',
	//groupmsg:'groupmsgqueue',

	mysql:{
		host:'localhost',
		user:'root',
		password:'root',
		port:3306,
		database:'node_im_server'
	},

	redis:{
		host:'localhost',
		port:6379
	}
}

export default config