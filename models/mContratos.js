var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from contratos', cb);
}

function getById(id, cb){
	conn("select * from contratos where id = "+id, cb);
}

function insert(nombre, numero, cb){
	conn("insert into contratos(nombre, numero, activa) values('"+nombre+"', '"+numero+"', 1)", cb);
}

function update(id, nombre, numero, activa, cb){
	conn("update contratos set nombre ='"+nombre+"', numero = '"+numero+"', activa ="+activa+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from contratos where id = "+id, cb);
}