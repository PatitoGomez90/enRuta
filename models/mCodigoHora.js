var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getCodigoHoraById: getCodigoHoraById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from codigohora", cb);
}

function getAllActivos(cb){
	conn("select * from codigohora order by nombre", cb);
}

function insert(nombre, numero, cb){
	conn("insert into codigohora(nombre, numero) values('"+nombre+"', "+numero+")", cb)
}

function getCodigoHoraById(id, cb){
	conn("select * from codigohora where id="+id, cb);
}

function update(id, nombre, numero, cb){
	conn("update codigohora set nombre='"+nombre+"', numero="+numero+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from codigohora where id="+id, cb);
}