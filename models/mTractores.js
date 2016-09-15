var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from tractores', cb);
}

function getById(id, cb){
	conn("select * from tractores where id = "+id, cb);
}

function insert(patente, marca, modelo, tipo_tractor, anio, cb){
	conn("INSERT INTO tractores(nombre, razon_social, cuit, domicilio, telefono, mail, fax, contacto) "+
		"VALUES('"+nombre+"', '"+razon_social+"', '"+cuit+"', '"+domicilio+"', '"+telefono+"', '"+email+"', '"+fax+"', '"+contacto+"')", cb)
}

function update(id, patente, marca, modelo, tipo_tractor, anio, cb){
	conn("UPDATE tractores SET "+
		"nombre = '"+nombre+"', "+
		"razon_social = '"+razon_social+"', "+
		"cuit = '"+cuit+"', "+
		"domicilio = '"+domicilio+"', "+
		"telefono = '"+telefono+"', "+
		"mail = '"+email+"', "+
		"fax = '"+fax+"', "+
		"contacto = '"+contacto+"' "+
		"WHERE id = "+id, cb);
}

function del(id, cb){
	conn("DELETE FROM tractores WHERE id = "+id, cb);
}

// id, patente, marca, modelo, tipo_tractor_fk, anio, activo