var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from categorias", cb);
}

function insert(nombre, cb){
	conn("insert into categorias(nombre, activa) values ('"+nombre+"', 1)", cb);
}

function getById(id, cb){
	conn("select * from categorias where id="+id, cb);
}

function update(id, nombre, activa, cb){
	conn("update categorias set nombre='"+nombre+"', activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from categorias where id="+id, cb);
}