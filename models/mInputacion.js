var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from inputacion_hora', cb);
}

function insert(nombre, cb){
	conn("insert into inputacion_hora(nombre, activa) values('"+nombre+"', 1)", cb);
}

function getById(id, cb){
	conn("select * from inputacion_hora where id = "+id, cb);
}

function update(id, nombre, activa, cb){
	conn("update inputacion_hora set nombre='"+nombre+"', activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from inputacion_hora where id="+id, cb);
}