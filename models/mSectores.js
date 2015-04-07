var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getSectorById: getSectorById,
	update: update,
	del: del,
	getUltimoCodigo: getUltimoCodigo
	}

function getAll(cb){
	conn("select * from sectores", cb);
}

function getAllActivos(cb){
	conn("select * from sectores where activa = 1", cb);
}

function insert(codigo, nombre, cb){
	conn("insert into sectores(codigo, nombre, activa) values("+codigo+", '"+nombre+"', 1)", cb)
}

function getSectorById(id, cb){
	conn("select * from sectores where id="+id, cb);
}

function update(id, codigo, nombre, activo, cb){
	conn("update sectores set codigo ="+codigo+", nombre='"+nombre+"', activa="+activo+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from sectores where id="+id, cb);
}

function getUltimoCodigo(cb){
	conn("select max(codigo) as codigo from sectores", cb);
}