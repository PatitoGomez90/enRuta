var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select *, IF(tractores.activo = '1', 'Si', 'No') as activotxt, "+
		"tipo_tractor.descripcion as tipotractortxt "+
		"from tractores "+
		"LEFT JOIN tipo_tractor ON tipo_tractor.id = tractores.id_tipo_tractor_fk", cb);
}

function getById(id, cb){
	conn("select * from tractores where id = "+id, cb);
}

function insert(patente, marca, modelo, tipo_tractor, anio, cb){
	conn("INSERT INTO tractores(patente, marca, modelo, id_tipo_tractor_fk, anio, activo) "+
		"VALUES('"+patente+"', '"+marca+"', '"+modelo+"', "+tipo_tractor+", '"+anio+"', '1')", cb)
}

function update(id, patente, marca, modelo, tipo_tractor, anio, activo, cb){
	conn("UPDATE tractores SET "+
		"patente = '"+patente+"', "+
		"marca = '"+marca+"', "+
		"modelo = '"+modelo+"', "+
		"id_tipo_tractor_fk = "+tipo_tractor+", "+
		"anio = '"+anio+"', "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM tractores WHERE id = "+id, cb);
}

// id, patente, marca, modelo, tipo_tractor_fk, anio, activo

