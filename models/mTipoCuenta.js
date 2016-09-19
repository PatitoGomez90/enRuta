var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select *, IF(activo = '1', 'Si', 'No') as activotxt from tipo_cuenta", cb);
}

function getById(id, cb){
	conn("select * from tipo_cuenta where id = "+id, cb);
}

function insert(nombre, descripcion, cb){
	conn("INSERT INTO tipo_cuenta(nombre, descripcion, activo) "+
		"VALUES('"+nombre+"', '"+descripcion+"', '1')", cb)
}

function update(id, nombre, descripcion, activo, cb){
	conn("UPDATE tipo_cuenta SET "+
		"nombre = '"+nombre+"', "+
		"descripcion = '"+descripcion+"', "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM tipo_cuenta WHERE id = "+id, cb);
}