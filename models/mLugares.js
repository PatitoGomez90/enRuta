var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from lugares', cb);
}

function insert(nombre, cb){
	conn("insert into lugares(nombre, activa) values('"+nombre+"', 1)", cb);
}

function getById(id, cb){
	conn("select * from lugares where id = "+id, cb);
}

function update(id, nombre, activa, cb){
	conn("update lugares set nombre='"+nombre+"', activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from lugares where id="+id, cb);
}