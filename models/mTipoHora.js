var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getTipoHoraById: getTipoHoraById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from tipohora", cb);
}

function getAllActivos(cb){
	conn("select * from tipohora order by nombre", cb);
}

function insert(nombre, codigo, cb){
	conn("insert into tipohora(nombre, codigo) values('"+nombre+"', '"+codigo+"')", cb)
}

function getTipoHoraById(id, cb){
	conn("select * from tipohora where id="+id, cb);
}

function update(id, nombre, codigo, cb){
	conn("update tipohora set nombre='"+nombre+"', codigo='"+codigo+"' where id="+id, cb);
}

function del(id, cb){
	conn("delete from tipohora where id="+id, cb);
}