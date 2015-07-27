var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from categoria", cb);
}

function insert(nombre, activa, cb){
	conn("insert into categoria(nombre, activa) values ('"+nombre+"', "+activa+")", cb);
}

function getById(id, cb){
	conn("select * from categoria where id="+id, cb);
}

function update(id, nombre, activa, cb){
	conn("update categoria set id="+id+", nombre='"+nombre+"', activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from categoria where id="+id, cb);
}