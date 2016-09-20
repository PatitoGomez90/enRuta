var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select *, IF(activo = '1', 'Si', 'No') as activotxt from tipo_productos", cb);
}

function getById(id, cb){
	conn("select * from tipo_productos where id = "+id, cb);
}

function insert(descripcion, cb){
	conn("INSERT INTO tipo_productos(descripcion, activo) "+
		"VALUES('"+descripcion+"', '1')", cb)
}

function update(id, descripcion, activo, cb){
	conn("UPDATE tipo_productos SET "+
		"descripcion = '"+descripcion+"', "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM tipo_productos WHERE id = "+id, cb);
}