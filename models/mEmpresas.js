var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert
}

function getAll(cb){
	conn('select * from empresas', cb);
}

function getById(id, cb){
	conn("select * from empresas where id = "+id, cb);
}

function insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, cb){
	conn("INSERT INTO empresas(nombre, razon_social, cuit, domicilio, telefono, mail, fax, contacto) "+
		"VALUES('"+nombre+"', '"+razon_social+"', '"+cuit+"', '"+domicilio+"', '"+telefono+"', '"+email+"', '"+fax+"', '"+contacto+"')", cb)
}

function update(id, nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, cb){
	conn("UPDATE SET ", cb);
}

function delete(id, cb){
	conn("DELETE empresas WHERE ", cb);
}