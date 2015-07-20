var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del,
	getAllActivos: getAllActivos
}

function getAll(cb){
	conn('select * from items', cb);
}

function insert(nombre, numero, cb){
	conn("insert into imputacion_hora(nombre, numero, activa) values('"+nombre+"', "+numero+", 1)", cb);
}

function getById(id, cb){
	conn("select * from imputacion_hora where id = "+id, cb);
}

function update(id, nombre, numero, activa, cb){
	conn("update imputacion_hora set nombre='"+nombre+"', numero="+numero+", activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from imputacion_hora where id="+id, cb);
}

function getAllActivos(cb){
	conn("select * from imputacion_hora where activa = 1", cb);
}