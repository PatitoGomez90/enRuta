var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select *, IF(activo = '1', 'Si', 'No') as activotxt from tipo_tractor", cb);
}

function getById(id, cb){
	conn("select * from tipo_tractor where id = "+id, cb);
}

function insert(descripcion, ejes, cb){
	conn("INSERT INTO tipo_tractor(descripcion, ejes, activo) "+
		"VALUES('"+descripcion+"', "+ejes+", '1')", cb)
}

function update(id, descripcion, ejes, activo, cb){
	conn("UPDATE tipo_tractor SET "+
		"descripcion = '"+descripcion+"', "+
		"ejes = "+ejes+", "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM tipo_tractor WHERE id = "+id, cb);
}