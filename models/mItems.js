var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getItemById: getItemById,
	update: update,
	del: del,
	getUltimoNumero: getUltimoNumero
}

function getAll(cb){
	conn("select * from items", cb);
}

function getAllActivos(cb){
	conn("select * from items where activa = 1 order by nombre", cb);
}

function insert(numero, nombre, cb){
	conn("insert into items(numero, nombre, activa) values("+numero+", '"+nombre+"', 1)", cb)
}

function getItemById(id, cb){
	conn("select * from items where id="+id, cb);
}

function update(id, numero, nombre, activo, cb){
	conn("update items set numero ="+numero+", nombre='"+nombre+"', activa="+activo+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from items where id="+id, cb);
}

function getUltimoNumero(cb){
	conn("select max(numero) as numero from items", cb);
}