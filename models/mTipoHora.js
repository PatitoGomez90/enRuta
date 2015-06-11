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

function insert(nombre, cb){
	conn("insert into tipohora(nombre) values('"+nombre+"')", cb)
}

function getTipoHoraById(id, cb){
	conn("select * from tipohora where id="+id, cb);
}

function update(id, nombre, cb){
	conn("update tipohora set nombre='"+nombre+"' where id="+id, cb);
}

function del(id, cb){
	conn("delete from tipohora where id="+id, cb);
}