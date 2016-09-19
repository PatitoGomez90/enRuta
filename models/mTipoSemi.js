var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select *, IF(activo = '1', 'Si', 'No') as activotxt from tipo_semi", cb);
}

function getById(id, cb){
	conn("select * from tipo_semi where id = "+id, cb);
}

function insert(descripcion, ejes, capacidad, cb){
	conn("INSERT INTO tipo_semi(descripcion, ejes, capacidad, activo) "+
		"VALUES('"+descripcion+"', "+ejes+", "+capacidad+", '1')", cb)
}

function update(id, descripcion, ejes, capacidad, activo, cb){
	conn("UPDATE tipo_semi SET "+
		"descripcion = '"+descripcion+"', "+
		"ejes = "+ejes+", "+
		"capacidad = "+capacidad+", "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM tipo_semi WHERE id = "+id, cb);
}