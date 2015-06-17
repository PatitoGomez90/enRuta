var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById
}

function getAll(cb){
	conn('select * from chk1', cb);
}

function insert(nombre, masdatos, cb){
	conn("insert into chk1 (nombre, masdatos, activa) values('"+nombre+"', '"+masdatos+"', 1)", cb);
}

function getById(id, cb){
	conn("select * from chk1 where id = "+id, cb);
}