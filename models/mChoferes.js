var conn = require('../config/db').conn;

module.exports = {
	getChoferes: getChoferes
}

function getChoferes(cb){
	conn('select * from choferes', cb);
}