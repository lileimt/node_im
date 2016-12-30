/*
* @Author: limingyuan
* @Date:   2016-12-29 15:52:32
* @Last Modified by:   limingyuan
* @Last Modified time: 2016-12-30 11:12:12
*/

require("babel-core/register")(
	{
		presets:['stage-3','es2015']
	}
);

require("babel-polyfill");
require("./http/app.js");
require("./websocket/app.js");