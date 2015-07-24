//24/07/2015 - desde ahora "clasificacion horas " es "adicionales"
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
	conn('select * from clasificacion_hora', cb);
}

function insert(nombre, cb){
	conn("insert into clasificacion_hora(nombre, activa) values('"+nombre+"', 1)", cb);
}

function getById(id, cb){
	conn("select * from clasificacion_hora where id = "+id, cb);
}

function update(id, nombre, activa, cb){
	conn("update clasificacion_hora set nombre='"+nombre+"', activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from clasificacion_hora where id="+id, cb);
}

function getAllActivos(cb){
	conn("select * from clasificacion_hora where activa = 1", cb);
}