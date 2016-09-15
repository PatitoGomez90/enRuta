var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from empresas', cb);
}

function getById(id, cb){
	conn("select * from empresas where id = "+id, cb);
}

function insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, cb){
	conn("INSERT INTO empresas(nombre, razon_social, cuit, domicilio, telefono, mail, fax, contacto, activo) "+
		"VALUES('"+nombre+"', '"+razon_social+"', '"+cuit+"', '"+domicilio+"', '"+telefono+"', '"+email+"', '"+fax+"', '"+contacto+"', '1')", cb)
}

function update(id, nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, activo, cb){
	conn("UPDATE empresas SET "+
		"nombre = '"+nombre+"', "+
		"razon_social = '"+razon_social+"', "+
		"cuit = '"+cuit+"', "+
		"domicilio = '"+domicilio+"', "+
		"telefono = '"+telefono+"', "+
		"mail = '"+email+"', "+
		"fax = '"+fax+"', "+
		"contacto = '"+contacto+"', "+
		"activo = '"+activo+"' "+
		"WHERE id = "+id, cb);
}

function del(id, cb){
	conn("DELETE FROM empresas WHERE id = "+id, cb);
}