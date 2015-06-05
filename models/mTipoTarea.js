var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getTipoTareaById: getTipoTareaById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from tipotarea', cb);
}

function getTipoTareaById(id, cb){
	conn("select * from tipotarea where id = "+id, cb);
}

function insert(descripcion, cb){
	conn("insert into tipotarea(descripcion, activa) values('"+descripcion+"', 1)", cb);
}

function update(id, descripcion, activa, cb){
	conn("update tipotarea set descripcion ='"+descripcion+"', activa ="+activa+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from tipotarea where id = "+id, cb);
}