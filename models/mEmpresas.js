var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert
}

function getAll(cb){
	conn('select * from empresas', cb);
}

function insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, cb){
	conn("INSERT INTO empresas(nombre, razon_social, cuit, domicilio, telefono, mail, fax, contacto) "+
		"VALUES('"+nombre+"', '"+razon_social+"', '"+cuit+"', '"+domicilio+"', '"+telefono+"', '"+email+"', '"+fax+"', '"+contacto+"')", cb)
}