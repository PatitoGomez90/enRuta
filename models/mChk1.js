var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert
	}

function getAll(cb){
	conn('select * from chk1', cb);
}

function insert(nombre, masdatos, cb){
	conn("insert into chk1 (nombre, masdatos, activa) values('"+nombre+"', '"+masdatos+"', 1)", cb);
}