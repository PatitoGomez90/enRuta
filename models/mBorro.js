var conn = require('../config/db').conn;

module.exports = {
	add: add
	}

function add(user, tabla, string, cb){
	var currentdate = new Date();
	day = currentdate.getDate();
	month = currentdate.getMonth();
	if (day<10)
		day = "0"+day;
	if (month<10)
		month = "0"+month;
	var date = currentdate.getFullYear()+"/"+ month + "/" + day + " "+ currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	
	conn("insert into borro(fecha, usuario, tabla, texto)values('"+ date +"','"+user+"','"+tabla+"','"+string+"') ", cb);
}