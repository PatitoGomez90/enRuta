var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select semis.*, IF(semis.activo = '1', 'Si', 'No') as activotxt, "+
		"tipo_semi.descripcion as tiposemitxt "+
		"from semis "+
		"LEFT JOIN tipo_semi ON tipo_semi.id = semis.id_tipo_semi_fk", cb);
}

function getById(id, cb){
	conn("select semis.* from semis where id = "+id, cb);
}

function insert(patente, marca, modelo, tipo_semi, anio, cb){
	conn("INSERT INTO semis(patente, marca, modelo, id_tipo_semi_fk, anio, activo) "+
		"VALUES('"+patente+"', '"+marca+"', '"+modelo+"', "+tipo_semi+", '"+anio+"', '1')", cb)
}

function update(id, patente, marca, modelo, tipo_semi, anio, activo, cb){
	conn("UPDATE semis SET "+
		"patente = '"+patente+"', "+
		"marca = '"+marca+"', "+
		"modelo = '"+modelo+"', "+
		"id_tipo_semi_fk = "+tipo_semi+", "+
		"anio = '"+anio+"', "+
		"activo = '"+activo+"' "+
		"WHERE id ="+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM semis WHERE id = "+id, cb);
}