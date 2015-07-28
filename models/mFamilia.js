var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivas: getAllActivas,
	insert: insert,
	getFamiliaPorId: getFamiliaPorId,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from Familia', cb);
}

function getAllActivas(cb){
	conn('select * from familia where activa =1', cb)
}

function insert(nombre, activa, cb){
	conn("insert into Familia( nombre, activa) values('"+nombre+"',"+activa+")", cb);
}

function getFamiliaPorId(id, cb){
	conn("select * from Familia where id ="+id, cb);
}

function getFamiliaPorDescripcion(descripcion, cb){
	conn("select * from Familia where descripcion="+ descripcion, cb);
}

function update(id, nombre, activa, cb){
	conn("UPDATE Familia SET nombre='"+nombre+"', activa='"+ activa+"' where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from Familia where id="+id , cb);
}