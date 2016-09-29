var conn = require('../config/db').conn;

module.exports = {
	getChoferes: getChoferes,
	getById: getById,
	insert: insert,
	update: update,
	remove: remove
}

function getChoferes(cb){
	conn('select * from choferes', cb);
}

function getById(id, cb){
	conn("select * from choferes where id = "+id, cb);
}

function insert(nombre_completo, dni, id_sexo_fk, id_tractor_default_fk, id_semi_default_fk, cb){
	conn("INSERT INTO choferes(nombre_completo, dni, id_sexo_fk, id_tractor_default_fk, id_semi_default_fk, activo) "+
		"VALUES('"+nombre_completo+"', '"+dni+"', '"+id_sexo_fk+"', '"+id_tractor_default_fk+"', '"+id_semi_default_fk+"', '1')", cb)
}

function update(id, nombre_completo, dni, id_sexo_fk, id_tractor_default_fk, id_semi_default_fk, activo, cb){
	conn("UPDATE choferes SET "+
		"nombre_completo = '"+nombre_completo+"', "+
		"dni = '"+dni+"', "+
		"id_sexo_fk = '"+id_sexo_fk+"', "+
		"id_tractor_default_fk = '"+id_tractor_default_fk+"', "+
		"id_semi_default_fk = '"+id_semi_default_fk+"', "+
		"activo = '"+activo+"' "+
		"WHERE id = "+id, cb);
}

function remove(id, cb){
	conn("DELETE FROM choferes WHERE id = "+id, cb);
}